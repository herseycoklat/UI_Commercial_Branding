// Halaman mahasiswa: NIM -> menunggu -> layar jawaban -> Catatanku / Unduh CSV.
import * as B from './backend.js';
import { SCREENS, SCREEN_BY_ID } from './screens.js';
import { h, clear, mount } from './dom.js';
import { buildForm } from './render.js';
import { encode, decode } from './validate.js';
import { catatankuRows, toCsv, csvFileName } from './csv.js';
import { downloadText } from './download.js';

const root = document.getElementById('app');
const NIM_RE = /^[0-9A-Za-z]{4,20}$/;

// ---------- penyimpanan lokal (di browser mahasiswa; gagal diam-diam bila diblokir) ----------
const mem = {};
const LS = {
  get(k, d) { if (k in mem) return mem[k]; try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { mem[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* diblokir */ } },
  del(k) { delete mem[k]; try { localStorage.removeItem(k); } catch { /* diblokir */ } },
};

let nim = null;
let myUid = null;
let state = null; // live/state
let view = 'kelas'; // 'kelas' | 'catatan'
let takenOver = false;
let mine = {}; // screenId -> {values(encoded), t, sent, rejected, skipped}
let drafts = {}; // screenId -> nilai formulir mentah
let lastKey = '';
let statusEl = null;
let session = 0; // naik setiap login/keluar; pekerjaan async dari sesi lama dibuang
let offTimer = null;
let exiting = false;
let stopPresence = null;

const persist = () => { LS.set(`kl.mine.${nim}`, mine); LS.set(`kl.draft.${nim}`, drafts); };

// ---------- kerangka ----------
const topbar = h('header', { class: 'top' });
const banner = h('div', { class: 'banner', hidden: true, role: 'status' });
const main = h('main', { class: 'main' });
root.append(topbar, banner, main);

function drawTop() {
  clear(topbar);
  topbar.append(h('strong', {}, 'Kelas Live'));
  if (nim) {
    topbar.append(h('span', { class: 'who' }, `NIM •••${nim.slice(-4)}`));
    if (!state?.penutup) {
      topbar.append(h('button', { class: 'link', type: 'button', onclick: () => { view = view === 'catatan' ? 'kelas' : 'catatan'; render(); } },
        view === 'catatan' ? 'Kembali' : 'Catatanku'));
    }
    topbar.append(h('button', { class: 'link out', type: 'button', onclick: openExit }, 'Keluar'));
  }
}

function setBanner(msg) { banner.hidden = !msg; banner.textContent = msg || ''; }

// ---------- tampilan ----------
function viewLogin(msg) {
  nim = null;
  drawTop();
  setBanner('');
  const inp = h('input', { id: 'nim', class: 'txt', type: 'text', inputmode: 'numeric', autocomplete: 'off', autocapitalize: 'off', placeholder: 'NIM', 'aria-label': 'NIM' });
  const err = h('div', { class: 'err', role: 'alert' }, msg || '');
  const btn = h('button', { class: 'primary', type: 'submit' }, 'Masuk');
  const form = h('form', { class: 'login', onsubmit: async (e) => {
    e.preventDefault();
    btn.disabled = true;
    err.textContent = '';
    const msg2 = await login(inp.value.trim());
    if (msg2) { err.textContent = msg2; btn.disabled = false; }
  } }, h('label', { for: 'nim' }, 'Masukkan NIM kamu'), inp, err, btn);
  mount(main, form);
}

async function login(value) {
  if (!NIM_RE.test(value)) return 'NIM tidak valid. Isi dengan angka NIM kamu.';
  try {
    myUid = await B.signInAnon(); // akun anonim baru dibuat saat masuk, bukan saat halaman dibuka
    await B.claimNim(value);
  } catch (e) {
    return e.code === 'NIM_UNKNOWN'
      ? 'NIM ini tidak ada di daftar kelas. Periksa lagi, atau kabari dosen.'
      : 'Tidak bisa terhubung. Periksa koneksi lalu coba lagi.';
  }
  nim = value;
  LS.set('kl.nim', nim);
  view = 'kelas';
  startSession();
  return '';
}

function startSession() {
  mine = LS.get(`kl.mine.${nim}`, {});
  drafts = LS.get(`kl.draft.${nim}`, {});
  takenOver = false;
  session += 1;
  stopPresence = B.startPresence();
  B.watchClaim(nim, (v) => {
    if (v && v !== myUid && !takenOver) { takenOver = true; render(); }
  });
  B.watchState((st) => {
    state = st;
    const key = `${st?.active ?? ''}|${st?.open ?? false}|${st?.penutup ?? false}`;
    if (key !== lastKey) { lastKey = key; render(); }
    flush();
  });
  clearTimeout(offTimer);
  B.watchConnected((on) => {
    clearTimeout(offTimer);
    if (on) { setBanner(''); flush(); }
    else offTimer = setTimeout(() => setBanner('Tidak ada koneksi. Jawabanmu disimpan di perangkat ini dan dikirim otomatis begitu tersambung.'), 2500);
  });
  render();
}

function render() {
  drawTop();
  statusEl = null;
  if (takenOver) return viewTakenOver();
  if (state?.penutup) return viewCatatan(true); // Penutup menang atas tampilan Catatanku biasa
  if (view === 'catatan') return viewCatatan(false);
  const sc = SCREEN_BY_ID[state?.active];
  if (!sc) return viewWaiting();
  return state.open ? viewQuestion(sc) : viewClosed(sc);
}

const viewWaiting = () => mount(main, h('div', { class: 'center' }, h('p', { class: 'big' }, 'Kamu sudah masuk. Menunggu pertanyaan.')));

function viewTakenOver() {
  mount(main, h('div', { class: 'center' },
    h('p', { class: 'big' }, 'NIM ini dipakai di perangkat lain.'),
    h('p', {}, 'Satu NIM hanya bisa aktif di satu perangkat. Kalau itu bukan kamu, kabari dosen.'),
    h('button', { class: 'primary', type: 'button', onclick: async () => {
      try { await B.claimNim(nim); takenOver = false; render(); } catch { setBanner('Tidak bisa terhubung. Coba lagi.'); }
    } }, 'Pakai di perangkat ini')));
}

function statusText(id) {
  const e = mine[id];
  if (!e) return '';
  if (e.skipped) return 'Kamu melewati layar ini.';
  if (e.rejected) return 'Jawabanmu tidak diterima karena layar sudah ditutup. Jawabanmu tetap tersimpan di Catatanku di perangkat ini.';
  if (e.sent) return 'Terkirim ✓ Kamu masih bisa mengubah jawabanmu sampai layar ditutup.';
  return 'Menunggu koneksi… jawabanmu tersimpan dan akan dikirim otomatis.';
}
function updateStatus() { if (statusEl && state?.active) statusEl.textContent = statusText(state.active); }

function titleBlock(sc) {
  const mode = { tebak: 'Tebak', terapkan: 'Terapkan', poll: 'Poll' }[sc.mode];
  return h('div', { class: 'qhead' }, h('span', { class: 'chip-mode' }, mode), h('span', { class: 'seg' }, sc.segmen));
}

function viewQuestion(sc) {
  const entry = mine[sc.id];
  if (entry?.skipped) {
    return mount(main, titleBlock(sc), h('p', { class: 'note' }, 'Kamu melewati layar ini.'),
      h('button', { class: 'ghost', type: 'button', onclick: () => { delete mine[sc.id]; persist(); render(); } }, 'Isi sekarang'));
  }
  const initial = entry ? decode(sc, entry.values) : drafts[sc.id] || {};
  const submit = h('button', { class: 'primary', type: 'button' }, entry ? 'Kirim perubahan' : 'Kirim jawaban');
  const form = buildForm(sc, {
    initial,
    onChange: ({ values }) => { drafts[sc.id] = values; persist(); },
  });
  submit.addEventListener('click', () => {
    if (!form.showErrors()) return;
    submit.disabled = true;
    submitAnswer(sc, form.values());
    submit.textContent = 'Kirim perubahan';
    submit.disabled = false;
  });
  statusEl = h('div', { class: 'status', role: 'status' }, statusText(sc.id));
  const extra = [];
  if (sc.skippable) {
    extra.push(h('button', { class: 'ghost', type: 'button', onclick: () => { mine[sc.id] = { skipped: true, t: Date.now() }; persist(); render(); } }, 'Lewati'));
  }
  mount(main, titleBlock(sc), form.el, h('div', { class: 'actions' }, submit, ...extra), statusEl,
    sc.pengingat ? h('p', { class: 'note' }, sc.pengingat) : null);
}

function viewClosed(sc) {
  const e = mine[sc.id];
  let msg = 'Layar ini sudah ditutup.';
  if (e?.skipped) msg = 'Layar ini sudah ditutup. Kamu melewatinya.';
  else if (e?.sent) msg = 'Layar ditutup. Jawabanmu sudah masuk. Terima kasih!';
  else if (e) msg = 'Layar ditutup sebelum jawabanmu terkirim, jadi tidak diterima. Jawabanmu tetap tersimpan di Catatanku di perangkat ini.';
  mount(main, titleBlock(sc), h('div', { class: 'center' }, h('p', { class: 'big' }, msg)),
    sc.pengingat && e && !e.skipped ? h('p', { class: 'note' }, sc.pengingat) : null);
}

// ---------- kirim ----------
function submitAnswer(sc, values) {
  const old = mine[sc.id];
  const e = { values: encode(sc, values), t: Date.now(), sent: false };
  // simpan jawaban terkirim sebelumnya: kalau perubahan ini dibuang saat Keluar, yang lama kembali
  const prev = old?.sent ? { values: old.values, t: old.t } : old?.prev;
  if (prev) e.prev = prev;
  mine[sc.id] = e;
  drafts[sc.id] = values;
  persist();
  updateStatus();
  push(sc.id);
}

async function push(id) {
  const e = mine[id];
  if (!e || e.skipped || e.sent) return;
  delete e.rejected;
  const sid = session;
  try {
    await B.sendAnswer(id, nim, e.values);
    if (sid !== session) return;
    if (mine[id] === e) { e.sent = true; delete e.rejected; delete e.prev; }
  } catch (err) {
    if (sid !== session) return;
    if (mine[id] === e && B.isDenied(err)) e.rejected = true; // layar sudah ditutup/ganti
  }
  persist();
  updateStatus();
  if (e.rejected && state?.active === id && !state.open && view === 'kelas') render();
}

// Kirim ulang yang belum terkirim; yang layarnya sudah lewat/ditutup ditandai tidak diterima.
function flush() {
  if (!nim || !state) return;
  for (const [id, e] of Object.entries(mine)) {
    if (e.skipped || e.sent) continue;
    if (state.active === id && state.open) push(id);
    else if (!e.rejected) { e.rejected = true; persist(); }
  }
  updateStatus();
}

// ---------- Catatanku & CSV ----------
function decodedMine() {
  return Object.fromEntries(Object.entries(mine)
    .filter(([id, e]) => SCREEN_BY_ID[id] && !e.skipped && e.values)
    .map(([id, e]) => [id, { values: decode(SCREEN_BY_ID[id], e.values), t: e.t }]));
}

function viewCatatan(penutup) {
  const rows = catatankuRows(nim, decodedMine(), SCREENS);
  const groups = [];
  for (const r of rows) {
    const k = `${r.halaman}|${r.bagian}`;
    let g = groups.find((x) => x.k === k);
    if (!g) groups.push((g = { k, halaman: r.halaman, bagian: r.bagian, items: [] }));
    g.items.push(r);
  }
  const dl = h('button', { class: penutup ? 'primary' : 'ghost', type: 'button', disabled: !rows.length,
    onclick: () => downloadText(csvFileName(nim), toCsv(rows)) }, 'Unduh CSV');
  mount(main, 
    h('h2', {}, penutup ? 'Terima kasih! Ini Catatanku.' : 'Catatanku'),
    h('p', { class: 'note' }, 'Jawaban pribadimu, urut sesuai halaman workbook. Tersimpan di perangkat ini; hanya kamu yang melihatnya.'),
    dl,
    !rows.length ? h('p', { class: 'note' }, 'Belum ada jawaban Catatanku.') : null,
    groups.map((g) => h('section', { class: 'cat' },
      h('h3', {}, `Halaman ${g.halaman} · ${g.bagian}`),
      g.items.map((r) => h('div', { class: 'qa' }, h('div', { class: 'q' }, r.pertanyaan), h('div', { class: 'a' }, r.jawaban))))),
  );
}

// ---------- Keluar ----------
const pendingIds = () => Object.entries(mine).filter(([, e]) => e && e.values && !e.skipped && !e.sent && !e.rejected).map(([id]) => id);

function openExit() {
  if (!nim || exiting || document.querySelector('.modal-back')) return;
  const opener = document.activeElement;
  const hasCat = catatankuRows(nim, decodedMine(), SCREENS).length > 0;
  const pend = pendingIds();
  const close = () => { back.remove(); document.removeEventListener('keydown', onKey); opener?.focus?.(); };
  const onKey = (ev) => { if (ev.key === 'Escape' && !exiting) close(); };
  const cancel = h('button', { class: 'ghost', type: 'button', onclick: close }, 'Batal');
  const go = h('button', { class: 'primary danger', type: 'button', onclick: async () => {
    exiting = true; go.disabled = true; cancel.disabled = true; go.textContent = 'Keluar…';
    document.removeEventListener('keydown', onKey);
    await doLogout();
    back.remove();
    exiting = false;
  } }, 'Keluar');
  const back = h('div', { class: 'modal-back' },
    h('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'xt' },
      h('h2', { id: 'xt' }, 'Keluar dari kelas?'),
      h('p', {}, 'Jawaban yang sudah terkirim tetap tersimpan. Kamu bisa masuk lagi dengan NIM yang sama.'),
      pend.length ? h('p', { class: 'warnbox', role: 'alert' }, 'Ada jawaban yang belum terkirim. Tunggu tersambung dulu, atau keluar dan jawaban itu hilang.') : null,
      hasCat ? h('div', { class: 'xcat' }, h('p', {}, 'Catatanku ada di perangkat ini. Unduh CSV dulu?'),
        h('button', { class: 'ghost', type: 'button', onclick: () => downloadText(csvFileName(nim), toCsv(catatankuRows(nim, decodedMine(), SCREENS))) }, 'Unduh CSV')) : null,
      h('div', { class: 'actions xact' }, cancel, go)));
  document.addEventListener('keydown', onKey);
  document.body.append(back);
  cancel.focus(); // fokus awal di Batal supaya tidak keluar tanpa sengaja
}

const withTimeout = (p, ms) => Promise.race([p, new Promise((r) => setTimeout(r, ms))]);

async function doLogout() {
  const leaving = nim;
  // 1. jawaban tertunda dibuang (peringatan sudah menyatakan hilang); yang sudah terkirim/ditolak tetap di Catatanku
  for (const id of pendingIds()) {
    const prev = mine[id].prev;
    if (prev) { mine[id] = { values: prev.values, t: prev.t, sent: true }; drafts[id] = decode(SCREEN_BY_ID[id], prev.values); }
    else { delete mine[id]; delete drafts[id]; }
  }
  persist();
  session += 1; // hentikan kelanjutan async sesi ini
  clearTimeout(offTimer);
  // 2. lepas penanda hadir + kursi di Firebase (menunggu paling lama 3 dtk; offline tidak boleh menahan keluar)
  try {
    await withTimeout(Promise.allSettled([stopPresence?.(), B.releaseSeat()]), 3000);
  } catch { /* abaikan */ }
  stopPresence = null;
  // 3. sign out, buang app lama beserta antrean tulisnya, mulai app bersih
  try { await withTimeout(B.signOutNow(), 3000); } catch { /* abaikan */ }
  await B.resetApp();
  // 4. hapus sesi lokal (Catatanku `kl.mine.<nim>` TIDAK dihapus), kembali ke kotak NIM
  LS.del('kl.nim');
  nim = null; myUid = null; state = null; takenOver = false; view = 'kelas';
  mine = {}; drafts = {}; lastKey = ''; statusEl = null;
  setBanner('');
  viewLogin();
  void leaving;
}

// ---------- mulai ----------
async function boot() {
  if (!B.ready) {
    drawTop();
    mount(main, h('div', { class: 'center' }, h('p', { class: 'big' }, 'Kelas Live belum aktif.'), h('p', {}, 'Tunggu aba-aba dosen.')));
    return;
  }
  B.init();
  document.addEventListener('visibilitychange', () => { if (!document.hidden) flush(); });
  const saved = LS.get('kl.nim', null);
  if (saved && NIM_RE.test(saved)) {
    try { myUid = await B.signInAnon(); await B.claimNim(saved); nim = saved; startSession(); return; } catch { /* jatuh ke login */ }
  }
  viewLogin();
}
boot();
