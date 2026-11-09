// Layar dosen: kendali layar, hasil anonim, kehadiran per NIM.
import * as B from './backend.js';
import { SCREENS, SCREEN_BY_ID, SESI_LIST, JENIS_LIST, matchFilter } from './screens.js';
import { h, clear } from './dom.js';
import { aggregateScreen } from './aggregate.js';
import { collectFlags, markSummary } from './flags.js';
import { renderResults } from './results.js';
import { konteksBox } from './render.js';
import { attendanceRows, attendanceColumns, toCsvTable } from './csv.js';
import { downloadText } from './download.js';

const root = document.getElementById('app');
const INIT_STATE = { active: '', open: false, revealed: false };

const S = {
  user: null, state: null, sel: SCREENS[0].id, answers: {}, hidden: {}, spot: null,
  online: 0, peak: 0, lat: [], roster: null, tab: 'kelas', att: null, attBusy: false, confirmEnd: false, openHidden: false, err: '',
  filter: { sesi: '', jenis: '' }, opened: {}, confirmReset: false, attAnswers: null,
  keyOn: {}, // layar kunciTerpisah (L1): tanda kunci ditampilkan setelah dosen klik, hanya di layar dosen
};
const pct = (arr, q) => { const a = [...arr].sort((x, y) => x - y); return a[Math.max(0, Math.ceil(q * a.length) - 1)]; };
let started = false;
let watchedId = null;
let offAnswers = null;
let offHidden = null;

let raf = 0;
const draw = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(paint); };

// ---------- masuk ----------
function viewMsg(...kids) { clear(root).append(h('div', { class: 'dwrap' }, ...kids)); }

function viewLogin(err) {
  viewMsg(
    h('h1', {}, 'Kelas Live · Dosen'),
    h('p', {}, 'Masuk dengan akun Google dosen.'),
    err ? h('div', { class: 'err' }, err) : null,
    h('button', { class: 'primary', type: 'button', onclick: async () => {
      try { await B.googleLogin(); } catch (e) { viewLogin(`Gagal masuk: ${e.code || e.message}`); }
    } }, 'Masuk dengan Google'),
    B.emulator ? h('button', { class: 'ghost', id: 'emu-login', type: 'button', onclick: () => B.emuLecturerLogin() }, 'Masuk uji (emulator)') : null,
  );
}

function viewNotDosen(uid) {
  viewMsg(
    h('h1', {}, 'Akun ini belum terdaftar sebagai dosen'),
    h('p', {}, 'Sekali saja: salin UID di bawah, lalu tempel di Firebase console pada Realtime Database di node ', h('code', {}, 'dosen'), ' (nama = UID, nilai = true). Setelah itu klik Periksa lagi.'),
    h('code', { class: 'uid', id: 'uid' }, uid),
    h('div', { class: 'actions' },
      h('button', { class: 'primary', type: 'button', onclick: () => check(S.user) }, 'Periksa lagi'),
      h('button', { class: 'ghost', type: 'button', onclick: () => navigator.clipboard?.writeText(uid) }, 'Salin UID'),
      h('button', { class: 'ghost', type: 'button', onclick: () => B.logout() }, 'Keluar')),
  );
}

async function check(user) {
  let ok = false;
  try { ok = await B.isDosen(); } catch { return viewLogin('Tidak bisa terhubung ke database. Coba lagi.'); }
  if (!ok) return viewNotDosen(user.uid);
  start();
}

// ---------- langganan data ----------
function watchSelected() {
  if (watchedId === S.sel) return;
  offAnswers?.(); offHidden?.();
  watchedId = S.sel;
  S.answers = {}; S.hidden = {};
  S.seenT = null;
  offAnswers = B.watchAnswers(S.sel, (a) => {
    // Latensi jawaban -> layar dosen: waktu server saat jawaban ditulis (t) vs jam layar ini saat jawaban tiba.
    const ts = Object.values(a).map((x) => x?.t || 0);
    if (S.seenT != null) {
      for (const t of ts) {
        const d = Date.now() - t;
        if (t > S.seenT && d > -3000 && d < 60000) { S.lat.push(Math.max(0, d)); if (S.lat.length > 300) S.lat.shift(); }
      }
    }
    S.seenT = Math.max(S.seenT ?? 0, ...ts, 0);
    S.answers = a;
    draw();
  });
  offHidden = B.watchHidden(S.sel, (x) => { S.hidden = x; draw(); });
}

function start() {
  if (started) { draw(); return; }
  started = true;
  B.watchState((st) => {
    if (!st) { B.setStateAll(INIT_STATE); return; }
    const first = !S.state;
    S.state = st;
    if (first && st.active) S.sel = st.active;
    watchSelected();
    draw();
  });
  B.getRoster().then((r) => { S.roster = r; draw(); }).catch(() => { S.roster = []; });
  B.watchPresence((n) => { S.online = n; if (n > S.peak) { S.peak = n; B.bumpPeak(n); } draw(); });
  B.watchPeak((p) => { S.peak = Math.max(S.peak, p); draw(); });
  B.watchSpot((v) => { S.spot = v; draw(); });
  B.watchOpened((o) => { S.opened = o; recompute(); draw(); });
  watchSelected();
  draw();
}

// ---------- aksi ----------
const act = (p) => B.updateState(p).catch((e) => { S.err = `Gagal menyimpan: ${e.code || e.message}`; draw(); });
const openScreen = (id) => {
  B.setSpot(null);
  B.markOpened(id).catch((e) => { S.err = `Gagal mencatat layar dibuka: ${e.code || e.message}`; draw(); });
  return act({ active: id, open: true, revealed: false, penutup: false });
};
const visible = () => SCREENS.filter((s) => matchFilter(s, S.filter));
const select = (id) => { S.sel = id; S.openHidden = false; watchSelected(); draw(); };
const step = (d) => {
  const ids = visible().map((s) => s.id);
  if (!ids.length) return;
  const i = ids.indexOf(S.sel);
  select(ids[i < 0 ? 0 : Math.max(0, Math.min(ids.length - 1, i + d))]);
};
const setFilter = (k, v) => {
  S.filter = { ...S.filter, [k]: v };
  const ids = visible().map((s) => s.id);
  if (S.tab === 'kelas' && ids.length && !ids.includes(S.sel)) select(ids[0]);
  recompute(); draw();
};
const label = (s) => `${s.no}. ${s.judul}${s.slide ? ` (slide ${s.slide})` : ''}`;

// Filter sesi × jenis: dipakai di daftar layar, laporan kehadiran, dan CSV kehadiran.
function filterBar() {
  const mk = (k, list, all) => h('select', { id: `f-${k}`, 'aria-label': `Filter ${k}`, onchange: (e) => setFilter(k, e.target.value) },
    h('option', { value: '', selected: !S.filter[k] }, all), list.map((v) => h('option', { value: v, selected: S.filter[k] === v }, v)));
  return h('div', { class: 'ctlrow wrap filt' }, h('span', { class: 'muted' }, 'Filter:'), mk('sesi', SESI_LIST, 'Semua sesi'), mk('jenis', JENIS_LIST, 'Semua jenis'));
}

// ---------- tampilan ----------
function topbar() {
  const cls = S.online >= 100 ? 'pill danger' : S.online >= 90 ? 'pill warn' : 'pill';
  return h('header', { class: 'dtop' },
    h('strong', {}, 'Kelas Live · Dosen'),
    h('span', { class: cls, id: 'conn', title: 'Batas paket gratis: 100 koneksi bersamaan' },
      `Terhubung ${S.online} · puncak ${S.peak}`, S.online >= 90 ? ' — mendekati batas 100' : ''),
    S.lat.length >= 5 ? h('span', { class: 'pill', id: 'lat', title: 'Dari jawaban ditulis di server sampai tiba di layar ini (perkiraan; tergantung jam perangkat)' },
      `Latensi p95 ${(pct(S.lat, 0.95) / 1000).toFixed(1)} dtk · median ${(pct(S.lat, 0.5) / 1000).toFixed(1)} (n=${S.lat.length})`) : null,
    h('nav', {},
      h('button', { class: 'tab' + (S.tab === 'kelas' ? ' on' : ''), type: 'button', onclick: () => { S.tab = 'kelas'; draw(); } }, 'Layar'),
      h('button', { class: 'tab' + (S.tab === 'hadir' ? ' on' : ''), type: 'button', onclick: () => { S.tab = 'hadir'; draw(); } }, 'Kehadiran'),
      h('button', { class: 'tab', type: 'button', onclick: () => B.logout() }, 'Keluar')));
}

function controls() {
  const st = S.state;
  const sc = SCREEN_BY_ID[S.sel];
  const isActive = st.active === S.sel;
  const list = visible();
  if (!list.some((s) => s.id === S.sel)) list.unshift(sc); // layar terpilih tetap terlihat walau di luar filter
  const sel = h('select', { id: 'sel', 'aria-label': 'Pilih layar', onchange: (e) => select(e.target.value) },
    list.map((s) => h('option', { value: s.id, selected: s.id === S.sel }, `${label(s)}  [${s.sesi} · ${s.jenis}]`)));
  const btns = [];
  if (!isActive || !st.open) btns.push(h('button', { id: 'btn-open', class: 'primary', type: 'button', onclick: () => openScreen(S.sel) }, isActive ? 'Buka lagi' : 'Buka layar ini'));
  if (isActive && st.open) btns.push(h('button', { id: 'btn-close', class: 'primary', type: 'button', onclick: () => act({ open: false }) }, 'Tutup layar'));
  if (isActive) btns.push(h('button', { id: 'btn-reveal', class: st.revealed ? 'ghost' : 'primary', type: 'button', onclick: () => act({ revealed: !st.revealed }) }, st.revealed ? 'Sembunyikan hasil' : 'Tampilkan hasil'));
  if (sc.kunciTerpisah && (!isActive || st.revealed)) btns.push(h('button', { id: 'btn-key', class: S.keyOn[sc.id] ? 'ghost' : 'primary', type: 'button',
    onclick: () => { S.keyOn = { ...S.keyOn, [sc.id]: !S.keyOn[sc.id] }; draw(); } }, S.keyOn[sc.id] ? 'Sembunyikan tanda' : 'Tandai yang dilaporkan'));
  btns.push(h('button', { id: 'btn-end', class: 'ghost', type: 'button', onclick: () => {
    if (!S.confirmEnd) { S.confirmEnd = true; draw(); setTimeout(() => { S.confirmEnd = false; draw(); }, 4000); return; }
    S.confirmEnd = false; B.setSpot(null); act({ active: '', open: false, revealed: false, penutup: true });
  } }, S.confirmEnd ? 'Yakin? Klik lagi untuk Penutup' : 'Penutup'));

  let status = 'Belum ada layar dibuka.';
  const act0 = SCREEN_BY_ID[st.active];
  if (st.penutup) status = 'Penutup: mahasiswa melihat Catatanku dan Unduh CSV.';
  else if (act0) status = `Layar aktif: ${label(act0)} · ${st.open ? 'terbuka' : 'ditutup'}${st.revealed ? ' · hasil tampil' : ''}`;

  return h('div', { class: 'ctl' },
    filterBar(),
    h('div', { class: 'ctlrow' },
      h('button', { class: 'ghost sq', type: 'button', 'aria-label': 'Layar sebelumnya', onclick: () => step(-1) }, '◀'), sel,
      h('button', { class: 'ghost sq', type: 'button', 'aria-label': 'Layar berikutnya', onclick: () => step(1) }, '▶')),
    h('div', { class: 'ctlrow wrap' }, btns),
    h('div', { class: 'statusline', id: 'statusline' }, status),
    S.err ? h('div', { class: 'err' }, S.err) : null);
}

function kelasView() {
  const st = S.state;
  const sc = SCREEN_BY_ID[S.sel];
  const isActive = st.active === S.sel;
  const agg = aggregateScreen(sc, S.answers, S.hidden);
  const total = S.roster?.length;
  const gate = isActive && !st.revealed;

  const head = h('div', { class: 'qbox' },
    h('div', { class: 'qmeta' }, `${sc.no} · ${sc.sesi} · ${sc.jenis} · ${sc.segmen} · ${sc.mode}`),
    h('h2', {}, sc.judul),
    konteksBox(sc),
    h('div', { class: 'qtext' }, sc.fields.map((f) => h('p', {}, f.label))));

  // teks resmi penghitung: "12 dari 58 sudah masuk" (58 = jumlah NIM di roster)
  const counter = h('div', { class: 'counter', id: 'counter' },
    total ? `${agg.masuk} dari ${total} sudah masuk` : `${agg.masuk} sudah masuk`);

  let body;
  if (gate) {
    body = h('div', { class: 'gate' }, 'Hasil disembunyikan. Klik "Tampilkan hasil" kalau sudah waktunya.');
  } else {
    body = renderResults(sc, agg, {
      answers: S.answers, hidden: S.hidden, spot: S.spot && S.spot.screen === sc.id ? S.spot : null,
      flags: collectFlags(sc, S.answers, S.hidden), marks: markSummary(sc, S.answers, S.hidden),
      showKey: sc.kunciTerpisah ? !!S.keyOn[sc.id] : undefined,
      openHidden: S.openHidden, onToggleHidden: (o) => { S.openHidden = o; },
      onHide: (nim) => B.setHidden(sc.id, nim, true),
      onUnhide: (nim) => B.setHidden(sc.id, nim, false),
      onSpot: (nim) => B.setSpot(nim && !(S.spot && S.spot.ref === nim) ? { screen: sc.id, ref: nim } : null),
    });
    if (!isActive) body.prepend(h('div', { class: 'tag' }, 'Layar ini tidak sedang dibuka'));
  }
  return [controls(), head, counter, body];
}

async function loadAttendance() {
  S.attBusy = true; draw();
  try {
    const [roster, answers] = await Promise.all([B.getRoster(), B.getAllAnswers()]);
    S.roster = roster;
    S.attAnswers = answers;
    recompute();
  } catch (e) { S.err = `Gagal memuat kehadiran: ${e.code || e.message}`; }
  S.attBusy = false; draw();
}
// hitung ulang dari data yang sudah dimuat (filter berubah / riwayat layar dibuka berubah)
function recompute() {
  if (!S.attAnswers || !S.roster) return;
  S.att = attendanceRows(S.roster, S.attAnswers, visible(), S.opened);
}

function resetOpened() {
  if (!S.confirmReset) { S.confirmReset = true; draw(); setTimeout(() => { S.confirmReset = false; draw(); }, 5000); return; }
  S.confirmReset = false;
  B.clearOpened().catch((e) => { S.err = `Gagal mengosongkan: ${e.code || e.message}`; draw(); });
}

function hadirView() {
  const rows = S.att;
  const openedList = SCREENS.filter((s) => S.opened[s.id]);
  const shown = visible().filter((s) => S.opened[s.id]);
  const f = S.filter;
  const fname = `kehadiran${f.sesi ? '-' + f.sesi : ''}${f.jenis ? '-' + f.jenis : ''}.csv`;
  return [h('div', { class: 'ctl' },
    filterBar(),
    h('div', { class: 'ctlrow wrap' },
      h('button', { id: 'btn-att', class: 'primary', type: 'button', disabled: S.attBusy, onclick: loadAttendance }, S.attBusy ? 'Memuat…' : rows ? 'Perbarui' : 'Muat kehadiran'),
      h('button', { id: 'btn-att-csv', class: 'ghost', type: 'button', disabled: !rows,
        onclick: () => downloadText(fname, toCsvTable(attendanceColumns(visible(), S.opened), rows)) }, 'Unduh CSV')),
    h('p', { class: 'muted', id: 'att-info' }, `Pembagi = layar yang benar-benar dibuka di kelas ini (sesuai filter): ${shown.length} layar. Layar yang tidak dibuka tidak dihitung. Tidak ada ambang "aktif".`),
    h('div', { class: 'opened' },
      h('strong', {}, `Riwayat layar dibuka: ${openedList.length}`),
      openedList.length ? h('p', { class: 'muted', id: 'opened-list' }, openedList.map(label).join(' · ')) : h('p', { class: 'muted', id: 'opened-list' }, 'Belum ada layar dibuka.'),
      h('p', { class: 'muted' }, 'Sebelum kelas: kosongkan riwayat supaya layar yang dibuka saat uji tidak masuk pembagi. Jawaban uji tidak ikut terhapus; hapus node answers di Firebase console bila uji memakai NIM sungguhan.'),
      h('button', { id: 'btn-reset-opened', class: 'ghost', type: 'button', onclick: resetOpened },
        S.confirmReset ? 'Yakin? Klik lagi untuk mengosongkan' : 'Kosongkan riwayat layar dibuka')),
    S.err ? h('div', { class: 'err' }, S.err) : null),
  rows ? h('table', { class: 'atab', id: 'atab' },
    h('thead', {}, h('tr', {}, h('th', {}, 'NIM'), h('th', {}, 'Dijawab'), h('th', {}, 'Insight'), h('th', {}, 'Kelas'), h('th', {}, ''))),
    h('tbody', {}, rows.map((r) => h('tr', {}, h('td', {}, r.nim), h('td', {}, `${r.dijawab} dari ${r.dibuka}`),
      h('td', {}, `${r.insight_dijawab}/${r.insight_dibuka}`), h('td', {}, `${r.kelas_dijawab}/${r.kelas_dibuka}`),
      h('td', {}, h('div', { class: 'bt' }, h('div', { class: 'bf', style: `width:${r.dibuka ? (r.dijawab / r.dibuka) * 100 : 0}%` })))))))
    : h('p', { class: 'muted' }, 'Klik Muat kehadiran setelah kelas (atau kapan saja).')];
}

function paint() {
  if (!S.user || !S.state) return;
  const y = window.scrollY;
  clear(root).append(h('div', { class: 'dwrap wide' }, topbar(), ...(S.tab === 'kelas' ? kelasView() : hadirView())));
  window.scrollTo(0, y);
}

// ---------- mulai ----------
if (!B.ready) {
  viewMsg(h('h1', {}, 'Kelas Live belum dikonfigurasi'), h('p', {}, 'Isi config.js dengan config web Firebase.'));
} else {
  B.init();
  B.watchAuth((user) => {
    S.user = user && !user.isAnonymous ? user : null;
    if (!S.user) { if (started) { location.reload(); return; } return viewLogin(); } // langganan lama mati saat keluar
    check(S.user);
  });
}
