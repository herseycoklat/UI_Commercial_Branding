// Load test Kelas Live: N "mahasiswa" (default 60) login anonim, memakai NIM uji TEST0001..TESTnnnn, lalu menjawab
// setiap layar yang dibuka dosen. Dosen (Fai) mengklik layar di halaman dosen sambil skrip ini berjalan.
//
// Pakai:  node loadtest/run.mjs [--n=60] [--jitter=8000] [--burst-from=4] [--screens=5] [--minutes=15] [--emu]
//   --jitter      : jawaban tersebar acak 0..jitter ms setelah layar terlihat (kelas nyata: 5-20 dtk)
//   --burst-from  : mulai layar ke-N yang dibuka, semua menjawab dalam ~1 dtk (kasus terburuk)
//   --screens     : berhenti setelah sekian layar selesai dijawab
// Syarat: roster Firebase berisi TEST0001..TEST00nn (setup.html > centang NIM uji). Jangan jalankan saat ada mahasiswa asli online.
// Catatan: Firebase membatasi pembuatan akun anonim (~100/jam per IP). Satu kali jalan memakai N akun, jangan diulang berkali-kali dalam sejam.
import { writeFileSync } from 'node:fs';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, connectAuthEmulator } from 'firebase/auth';
import { getDatabase, ref, set, onValue, onDisconnect, serverTimestamp, connectDatabaseEmulator } from 'firebase/database';
import { FIREBASE_CONFIG } from '../config.js';
import { SCREENS } from '../screens.js';
import { encode } from '../validate.js';

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')).map(([k, v]) => [k, v ?? true]));
const N = +args.n || 60;
const JITTER = +args.jitter || 8000;
const BURST_FROM = +args['burst-from'] || 99;
const STOP_AFTER = +args.screens || 5;
const MAX_MS = (+args.minutes || 15) * 60000;
const EMU = !!args.emu;
const DEMO = { apiKey: 'demo-key', projectId: 'demo-kelas-live', databaseURL: 'http://127.0.0.1:9000/?ns=demo-kelas-live' };

const pct = (arr, q) => { if (!arr.length) return NaN; const a = [...arr].sort((x, y) => x - y); return a[Math.max(0, Math.ceil(q * a.length) - 1)]; };
const fmt = (x) => (Number.isNaN(x) ? '-' : `${Math.round(x)}`);
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const WORDS = ['brand', 'logo', 'warna', 'kemasan', 'nama', 'produk', 'merah', 'tim', 'aturan', 'kode', 'hangat', 'modern', 'kuat', 'jelas'];

function randomValues(sc) {
  const v = {};
  for (const f of sc.fields) {
    if (f.type === 'single') v[f.id] = pick(f.options).v;
    else if (f.type === 'multi') {
      const pool = f.options.filter((o) => o.v !== f.exclusive);
      const k = f.max || (f.min === 0 ? Math.floor(Math.random() * 3) : 1 + Math.floor(Math.random() * 3));
      v[f.id] = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(k, pool.length)).map((o) => o.v);
    } else if (f.type === 'text') {
      if (f.optional && Math.random() < 0.3) continue;
      v[f.id] = Array.from({ length: 1 + Math.floor(Math.random() * 6) }, () => pick(WORDS)).join(' ').slice(0, f.max);
    } else if (f.type === 'grid') v[f.id] = Object.fromEntries(f.rows.map((r) => [r.v, pick(f.cols).v]));
  }
  return encode(sc, v);
}

// ---------- klien ----------
const clients = [];
const stats = {}; // screenId -> {opened, seen:[], ack:[], fail:[], bytes, done}
const order = SCREENS.map((s) => s.id);
let completed = 0;
let lastChange = Date.now();
const startedAt = Date.now();

async function makeClient(i) {
  const app = initializeApp(EMU ? DEMO : FIREBASE_CONFIG, `c${i}`);
  const auth = getAuth(app);
  const db = getDatabase(app);
  if (EMU) { connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true }); connectDatabaseEmulator(db, '127.0.0.1', 9000); }
  const t0 = Date.now();
  const { user } = await signInAnonymously(auth);
  const nim = `TEST${String(i).padStart(4, '0')}`;
  await set(ref(db, `seat/${user.uid}`), nim);
  await set(ref(db, `claims/${nim}`), user.uid);
  const pr = ref(db, `presence/${user.uid}`);
  onDisconnect(pr).remove();
  await set(pr, true);
  return { i, nim, db, answered: new Set(), setupMs: Date.now() - t0 };
}

function onState(c, st) {
  if (!st || !st.active || !st.open || c.answered.has(st.active)) return;
  const id = st.active;
  const sc = SCREENS.find((s) => s.id === id);
  if (!sc) return;
  c.answered.add(id);
  const S = (stats[id] ??= { opened: Date.now(), seen: [], ack: [], fail: [], bytes: 0, n: 0, printed: false });
  S.seen.push(Date.now());
  lastChange = Date.now();
  const burst = order.indexOf(id) + 1 >= BURST_FROM || Object.keys(stats).length >= BURST_FROM;
  setTimeout(async () => {
    const values = randomValues(sc);
    const t = performance.now();
    try {
      await set(ref(c.db, `answers/${id}/${c.nim}`), { values, t: serverTimestamp() });
      S.ack.push(performance.now() - t);
      S.bytes += JSON.stringify(values).length + 40;
    } catch (e) { S.fail.push(e.code || e.message); }
    S.n += 1;
    if (S.n === N && !S.printed) { S.printed = true; report(id); completed += 1; lastChange = Date.now(); }
  }, Math.random() * (burst ? 1000 : JITTER));
}

function report(id) {
  const S = stats[id];
  const spread = S.seen.length ? Math.max(...S.seen) - Math.min(...S.seen) : NaN;
  console.log(`layar ${id.padEnd(14)} jawaban ${S.ack.length}/${N}  gagal ${S.fail.length}  | tulis→ack ms: median ${fmt(pct(S.ack, 0.5))}  p95 ${fmt(pct(S.ack, 0.95))}  maks ${fmt(Math.max(...S.ack, 0))}  | state tiba ke semua klien dalam ${fmt(spread)} ms`);
}

// ---------- jalan ----------
console.log(`Menyiapkan ${N} klien ${EMU ? '(emulator)' : '(Firebase sungguhan: ' + FIREBASE_CONFIG.projectId + ')'}…`);
const queue = Array.from({ length: N }, (_, k) => k + 1);
const errs = [];
await Promise.all(Array.from({ length: 10 }, async () => {
  while (queue.length) {
    const i = queue.shift();
    try { clients.push(await makeClient(i)); } catch (e) { errs.push(`${i}: ${e.code || e.message}`); }
  }
}));
const setup = clients.map((c) => c.setupMs);
console.log(`Klien siap: ${clients.length}/${N}  login+klaim NIM: median ${fmt(pct(setup, 0.5))} ms, p95 ${fmt(pct(setup, 0.95))} ms`);
if (errs.length) console.log(`  gagal masuk (${errs.length}): ${[...new Set(errs.map((e) => e.split(': ')[1]))].join(', ')}  contoh: ${errs.slice(0, 3).join(' | ')}`);
if (!clients.length) process.exit(2);

for (const c of clients) onValue(ref(c.db, 'live/state'), (s) => onState(c, s.val()));
console.log('Menunggu dosen membuka layar… (di halaman dosen: Buka layar ini, tunggu ±20 dtk, Tampilkan hasil, lanjut)');

await new Promise((resolve) => {
  const iv = setInterval(() => {
    const idle = Date.now() - lastChange;
    if (completed >= STOP_AFTER || Date.now() - startedAt > MAX_MS || (completed > 0 && idle > 90000)) { clearInterval(iv); resolve(); }
  }, 1000);
});

// ---------- ringkasan ----------
const ids = Object.keys(stats);
for (const id of ids) if (!stats[id].printed) report(id);
const allAck = ids.flatMap((id) => stats[id].ack);
const bytes = ids.reduce((s, id) => s + stats[id].bytes, 0);
const failures = ids.flatMap((id) => stats[id].fail);
console.log(`\nRINGKASAN  klien ${clients.length}  layar ${ids.length}  jawaban ${allAck.length}  gagal ${failures.length}`);
console.log(`tulis→ack  median ${fmt(pct(allAck, 0.5))} ms  p95 ${fmt(pct(allAck, 0.95))} ms  maks ${fmt(Math.max(...allAck, 0))} ms`);
console.log(`data tertulis ≈ ${(bytes / 1024).toFixed(1)} KB (${ids.length} layar) → satu kelas penuh 25 layar ≈ ${((bytes / Math.max(1, ids.length)) * 25 / 1024).toFixed(0)} KB; kuota unduh harian 360 MB`);
console.log(`koneksi: ${clients.length} klien + 1 dosen ≈ ${clients.length + 1} (batas 100)`);
if (failures.length) console.log(`jenis gagal: ${[...new Set(failures)].join(', ')}`);
const out = process.env.LOADTEST_OUT || `loadtest-${Date.now()}.json`;
writeFileSync(out, JSON.stringify({ n: clients.length, mode: EMU ? 'emulator' : 'sungguhan', jitter: JITTER, stats: Object.fromEntries(ids.map((id) => [id, { ack: stats[id].ack, fail: stats[id].fail, seen: stats[id].seen.map((t) => t - Math.min(...stats[id].seen)) }])) }));
console.log(`detail: ${out}`);
setTimeout(() => process.exit(0), 500); // onDisconnect menghapus presence saat koneksi putus
