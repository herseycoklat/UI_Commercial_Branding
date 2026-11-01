// Layar dosen: kendali layar, hasil anonim, kehadiran per NIM.
import * as B from './backend.js';
import { SCREENS, SCREEN_BY_ID, SCREEN_IDS } from './screens.js';
import { h, clear } from './dom.js';
import { aggregateScreen } from './aggregate.js';
import { collectFlags, markSummary } from './flags.js';
import { renderResults } from './results.js';
import { attendanceRows, attendanceColumns, toCsvTable } from './csv.js';
import { downloadText } from './download.js';

const root = document.getElementById('app');
const INIT_STATE = { active: '', open: false, revealed: false };

const S = {
  user: null, state: null, sel: SCREENS[0].id, answers: {}, hidden: {}, spot: null,
  online: 0, peak: 0, roster: null, tab: 'kelas', att: null, attBusy: false, confirmEnd: false, openHidden: false, err: '',
};
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
  offAnswers = B.watchAnswers(S.sel, (a) => { S.answers = a; draw(); });
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
  watchSelected();
  draw();
}

// ---------- aksi ----------
const act = (p) => B.updateState(p).catch((e) => { S.err = `Gagal menyimpan: ${e.code || e.message}`; draw(); });
const openScreen = (id) => { B.setSpot(null); return act({ active: id, open: true, revealed: false, penutup: false }); };
const select = (id) => { S.sel = id; S.openHidden = false; watchSelected(); draw(); };
const step = (d) => select(SCREEN_IDS[Math.max(0, Math.min(SCREEN_IDS.length - 1, SCREEN_IDS.indexOf(S.sel) + d))]);

// ---------- tampilan ----------
function topbar() {
  const cls = S.online >= 100 ? 'pill danger' : S.online >= 90 ? 'pill warn' : 'pill';
  return h('header', { class: 'dtop' },
    h('strong', {}, 'Kelas Live · Dosen'),
    h('span', { class: cls, id: 'conn', title: 'Batas paket gratis: 100 koneksi bersamaan' },
      `Terhubung ${S.online} · puncak ${S.peak}`, S.online >= 90 ? ' — mendekati batas 100' : ''),
    h('nav', {},
      h('button', { class: 'tab' + (S.tab === 'kelas' ? ' on' : ''), type: 'button', onclick: () => { S.tab = 'kelas'; draw(); } }, 'Layar'),
      h('button', { class: 'tab' + (S.tab === 'hadir' ? ' on' : ''), type: 'button', onclick: () => { S.tab = 'hadir'; draw(); } }, 'Kehadiran'),
      h('button', { class: 'tab', type: 'button', onclick: () => B.logout() }, 'Keluar')));
}

function controls() {
  const st = S.state;
  const sc = SCREEN_BY_ID[S.sel];
  const isActive = st.active === S.sel;
  const sel = h('select', { id: 'sel', 'aria-label': 'Pilih layar', onchange: (e) => select(e.target.value) },
    SCREENS.map((s) => h('option', { value: s.id, selected: s.id === S.sel }, `${s.no}. ${s.judul}`)));
  const btns = [];
  if (!isActive || !st.open) btns.push(h('button', { id: 'btn-open', class: 'primary', type: 'button', onclick: () => openScreen(S.sel) }, isActive ? 'Buka lagi' : 'Buka layar ini'));
  if (isActive && st.open) btns.push(h('button', { id: 'btn-close', class: 'primary', type: 'button', onclick: () => act({ open: false }) }, 'Tutup layar'));
  if (isActive) btns.push(h('button', { id: 'btn-reveal', class: st.revealed ? 'ghost' : 'primary', type: 'button', onclick: () => act({ revealed: !st.revealed }) }, st.revealed ? 'Sembunyikan hasil' : 'Tampilkan hasil'));
  btns.push(h('button', { id: 'btn-end', class: 'ghost', type: 'button', onclick: () => {
    if (!S.confirmEnd) { S.confirmEnd = true; draw(); setTimeout(() => { S.confirmEnd = false; draw(); }, 4000); return; }
    S.confirmEnd = false; B.setSpot(null); act({ active: '', open: false, revealed: false, penutup: true });
  } }, S.confirmEnd ? 'Yakin? Klik lagi untuk Penutup' : 'Penutup'));

  let status = 'Belum ada layar dibuka.';
  const act0 = SCREEN_BY_ID[st.active];
  if (st.penutup) status = 'Penutup: mahasiswa melihat Catatanku dan Unduh CSV.';
  else if (act0) status = `Layar aktif: ${act0.no}. ${act0.judul} · ${st.open ? 'terbuka' : 'ditutup'}${st.revealed ? ' · hasil tampil' : ''}`;

  return h('div', { class: 'ctl' },
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
    h('div', { class: 'qmeta' }, `${sc.no} dari ${SCREENS.length} · ${sc.segmen} · ${sc.mode}`),
    h('h2', {}, sc.judul),
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
    S.att = attendanceRows(roster, answers, SCREEN_IDS);
  } catch (e) { S.err = `Gagal memuat kehadiran: ${e.code || e.message}`; }
  S.attBusy = false; draw();
}

function hadirView() {
  const rows = S.att;
  return [h('div', { class: 'ctl' },
    h('div', { class: 'ctlrow wrap' },
      h('button', { id: 'btn-att', class: 'primary', type: 'button', disabled: S.attBusy, onclick: loadAttendance }, S.attBusy ? 'Memuat…' : rows ? 'Perbarui' : 'Muat kehadiran'),
      h('button', { id: 'btn-att-csv', class: 'ghost', type: 'button', disabled: !rows, onclick: () => downloadText('kehadiran-sesi4.csv', toCsvTable(attendanceColumns(SCREEN_IDS), rows)) }, 'Unduh CSV')),
    h('p', { class: 'muted' }, `Setiap NIM dihitung dari jumlah layar yang dijawab, dari ${SCREENS.length} layar. Tidak ada ambang "aktif".`),
    S.err ? h('div', { class: 'err' }, S.err) : null),
  rows ? h('table', { class: 'atab', id: 'atab' },
    h('thead', {}, h('tr', {}, h('th', {}, 'NIM'), h('th', {}, 'Dijawab'), h('th', {}, ''))),
    h('tbody', {}, rows.map((r) => h('tr', {}, h('td', {}, r.nim), h('td', {}, `${r.dijawab} dari ${r.dari}`),
      h('td', {}, h('div', { class: 'bt' }, h('div', { class: 'bf', style: `width:${(r.dijawab / r.dari) * 100}%` })))))))
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
