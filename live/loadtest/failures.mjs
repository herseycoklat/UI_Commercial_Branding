// Uji skenario gagal terhadap Firebase SUNGGUHAN (Rules yang benar-benar terpasang), memakai NIM uji TEST0001/TEST0002.
// Butuh dosen membuka satu layar (fase 1) lalu menutupnya (fase 2). Pakai: node loadtest/failures.mjs [--emu]
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, connectAuthEmulator } from 'firebase/auth';
import { getDatabase, ref, set, get, onValue, serverTimestamp, goOffline, goOnline, connectDatabaseEmulator } from 'firebase/database';
import { FIREBASE_CONFIG } from '../config.js';
import { SCREEN_BY_ID, SCREEN_IDS } from '../screens.js';
import { encode } from '../validate.js';

const EMU = process.argv.includes('--emu');
const DEMO = { apiKey: 'demo-key', projectId: 'demo-kelas-live', databaseURL: 'http://127.0.0.1:9000/?ns=demo-kelas-live' };
let fails = 0;
const check = (name, ok, detail = '') => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : `  ← ${detail}`}`); if (!ok) fails++; };
const pick = (a) => a[Math.floor(Math.random() * a.length)];

function values(sc) {
  const v = {};
  for (const f of sc.fields) {
    if (f.type === 'single') v[f.id] = pick(f.options).v;
    else if (f.type === 'multi') { const pool = f.options.filter((o) => o.v !== f.exclusive); v[f.id] = pool.slice(0, f.max || 1).map((o) => o.v); }
    else if (f.type === 'text') v[f.id] = 'uji skenario gagal';
    else if (f.type === 'grid') v[f.id] = Object.fromEntries(f.rows.map((r) => [r.v, f.cols[0].v]));
  }
  return encode(sc, v);
}

async function client(name) {
  const app = initializeApp(EMU ? DEMO : FIREBASE_CONFIG, name);
  const auth = getAuth(app);
  const db = getDatabase(app);
  if (EMU) { connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true }); connectDatabaseEmulator(db, '127.0.0.1', 9000); }
  const { user } = await signInAnonymously(auth);
  return { name, db, uid: user.uid };
}
const R = (c, p) => ref(c.db, p);
const denied = (p) => p.then(() => false, (e) => /permission/i.test(`${e?.code} ${e?.message}`));
const ok = (p) => p.then(() => true, () => false);
const answer = (c, id, nim, vals) => set(R(c, `answers/${id}/${nim}`), { values: vals, t: serverTimestamp() });

const A = await client('A'); // perangkat pertama NIM1
const B = await client('B'); // perangkat kedua NIM1
const C = await client('C'); // mahasiswa lain NIM2
const NIM1 = 'TEST0001', NIM2 = 'TEST0002';

console.log('--- Fase 0: tanpa dosen ---');
check('A masuk dengan NIM1', await ok(set(R(A, `seat/${A.uid}`), NIM1)) && await ok(set(R(A, `claims/${NIM1}`), A.uid)));
let seenByA = null; const tClaim = { t: 0 };
onValue(R(A, `claims/${NIM1}`), (s) => { if (s.val() === B.uid) seenByA = Date.now() - tClaim.t; });
await new Promise((r) => setTimeout(r, 800));
tClaim.t = Date.now();
check('B masuk dengan NIM1 yang sama (perangkat terakhir menang)', await ok(set(R(B, `seat/${B.uid}`), NIM1)) && await ok(set(R(B, `claims/${NIM1}`), B.uid)));
await new Promise((r) => setTimeout(r, 1500));
check(`A (perangkat lama) diberi tahu soal pengambilalihan${seenByA != null ? ` dalam ${seenByA} ms` : ''}`, seenByA != null);
check('C masuk dengan NIM2', await ok(set(R(C, `seat/${C.uid}`), NIM2)) && await ok(set(R(C, `claims/${NIM2}`), C.uid)));
check('NIM yang tidak ada di roster ditolak', await denied(set(R(C, `seat/${C.uid}`), 'TEST9999')));
check('format NIM aneh ditolak', await denied(set(R(C, `seat/${C.uid}`), '../x')));
for (const p of ['answers', 'answers/poll1', `answers/poll1/${NIM1}`, 'roster', `roster/${NIM1}`, 'claims', `claims/${NIM1}`, `seat/${A.uid}`, 'seat', 'dosenState', 'hidden', 'presence', 'dosen']) {
  check(`mahasiswa tidak bisa membaca /${p}`, await denied(get(R(C, p))));
}
check('mahasiswa tidak bisa menulis state layar', await denied(set(R(C, 'live/state/open'), false)));
check('mahasiswa tidak bisa mendaftar jadi dosen', await denied(set(R(C, `dosen/${C.uid}`), true)));
check('mahasiswa tidak bisa mengubah roster', await denied(set(R(C, 'roster/TEST9999'), true)));

console.log('\n>>> Fai: sekarang BUKA satu layar saja di halaman dosen (mis. Poll 1). Saya menunggu…');
let state = null;
onValue(R(C, 'live/state'), (s) => { state = s.val(); });
while (!(state?.open && state.active)) await new Promise((r) => setTimeout(r, 300));
const id = state.active;
const sc = SCREEN_BY_ID[id];
console.log(`--- Fase 1: layar "${id}" terbuka ---`);
const other = SCREEN_IDS.find((x) => x !== id);
check('B (perangkat baru) bisa menjawab', await ok(answer(B, id, NIM1, values(sc))));
check('A (perangkat lama) tidak bisa menjawab lagi', await denied(answer(A, id, NIM1, values(sc))));
check('C bisa menjawab', await ok(answer(C, id, NIM2, values(sc))));
check('C bisa mengedit jawabannya selagi layar terbuka', await ok(answer(C, id, NIM2, values(sc))));
check('C tidak bisa menjawab atas nama NIM lain', await denied(answer(C, id, NIM1, values(sc))));
check('C tidak bisa menjawab layar yang bukan layar aktif', await denied(answer(C, other, NIM2, values(sc))));
check('cap waktu palsu ditolak', await denied(set(R(C, `answers/${id}/${NIM2}`), { values: values(sc), t: 123 })));
check('anak tambahan ditolak', await denied(set(R(C, `answers/${id}/${NIM2}`), { values: values(sc), t: serverTimestamp(), x: 1 })));
check('teks 301 karakter ditolak', await denied(set(R(C, `answers/${id}/${NIM2}`), { values: { x: 'y'.repeat(301) }, t: serverTimestamp() })));
check('C tidak bisa membaca jawaban B', await denied(get(R(C, `answers/${id}/${NIM1}`))));
const own = await get(R(C, `answers/${id}/${NIM2}`));
check('C bisa membaca jawabannya sendiri', own.exists());

// jawaban tertunda saat koneksi putus
const pend = values(sc);
const marker = Object.keys(pend)[0];
goOffline(C.db);
const p = answer(C, id, NIM2, pend);
await new Promise((r) => setTimeout(r, 1500));
let settledEarly = false; p.then(() => { settledEarly = true; }, () => { settledEarly = true; });
await new Promise((r) => setTimeout(r, 300));
check('saat offline, jawaban menunggu (belum terkonfirmasi)', !settledEarly);
goOnline(C.db);
check('setelah tersambung, jawaban tertunda terkirim otomatis', await Promise.race([ok(p), new Promise((r) => setTimeout(() => r(false), 10000))]));

console.log('\n>>> Fai: sekarang klik TUTUP LAYAR. Saya menunggu…');
while (state?.open && state.active === id) await new Promise((r) => setTimeout(r, 300));
console.log('--- Fase 2: layar ditutup ---');
await new Promise((r) => setTimeout(r, 500));
check('jawaban setelah layar ditutup ditolak (B)', await denied(answer(B, id, NIM1, values(sc))));
check('mengedit setelah ditutup ditolak (C)', await denied(answer(C, id, NIM2, values(sc))));
const after = await get(R(C, `answers/${id}/${NIM2}`));
check('jawaban lama tetap utuh setelah penolakan', after.exists() && typeof after.val().t === 'number');

console.log(fails ? `\n${fails} GAGAL` : '\nSEMUA LOLOS');
setTimeout(() => process.exit(fails ? 1 : 0), 500);
