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
    await B.claimNim(value);
  } catch (e) {
    return e.code === 'NIM_UNKNOWN'
      ? 'NIM ini tidak ada di daftar kelas. Periksa lagi, atau kabari dosen.'
      : 'Tidak bisa terhubung. Periksa koneksi lalu coba lagi.';
  }
  nim = value;
  LS.set('kl.nim', nim);
  startSession();
  return '';
}

function startSession() {
  mine = LS.get(`kl.mine.${nim}`, {});
  drafts = LS.get(`kl.draft.${nim}`, {});
  takenOver = false;
  B.startPresence();
  B.watchClaim(nim, (v) => {
    if (v && v !== myUid && !takenOver) { takenOver = true; render(); }
  });
  B.watchState((st) => {
    state = st;
    const key = `${st?.active ?? ''}|${st?.open ?? false}|${st?.penutup ?? false}`;
    if (key !== lastKey) { lastKey = key; render(); }
    flush();
  });
  let offTimer = null;
  B.watchConnected((on) => {
    clearTimeout(offTimer);
    if (on) { setBanner(''); flush(); }
    else offTimer = setTimeout(() => setBanner('Tidak ada koneksi. Jawabanmu disimpan di perangkat ini dan dikirim otomatis begitu tersambung.'), 2500);
  });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) flush(); });
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
  const e = { values: encode(sc, values), t: Date.now(), sent: false };
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
  try {
    await B.sendAnswer(id, nim, e.values);
    if (mine[id] === e) { e.sent = true; delete e.rejected; }
  } catch (err) {
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

// ---------- mulai ----------
async function boot() {
  if (!B.ready) {
    drawTop();
    mount(main, h('div', { class: 'center' }, h('p', { class: 'big' }, 'Kelas Live belum aktif.'), h('p', {}, 'Tunggu aba-aba dosen.')));
    return;
  }
  B.init();
  try {
    myUid = await B.signInAnon();
  } catch {
    drawTop();
    mount(main, h('div', { class: 'center' }, h('p', { class: 'big' }, 'Tidak bisa terhubung.'), h('p', {}, 'Periksa koneksi lalu muat ulang halaman.')));
    return;
  }
  const saved = LS.get('kl.nim', null);
  if (saved && NIM_RE.test(saved)) {
    try { await B.claimNim(saved); nim = saved; startSession(); return; } catch { /* jatuh ke login */ }
  }
  viewLogin();
}
boot();
