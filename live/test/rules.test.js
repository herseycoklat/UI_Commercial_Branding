// Uji aturan keamanan RTDB dengan emulator.
// Jalankan: npm run test:rules   (memakai `firebase emulators:exec`)
import test, { before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const TS = () => firebase.database.ServerValue.TIMESTAMP;
const [host, port] = (process.env.FIREBASE_DATABASE_EMULATOR_HOST || '127.0.0.1:9000').split(':');
const NIM_A = '2306000001';
const NIM_B = '2306000002';

let env;
before(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-kelas-live',
    database: { rules: readFileSync(new URL('../database.rules.json', import.meta.url), 'utf8'), host, port: Number(port) },
  });
});
after(async () => { await env?.cleanup(); });

beforeEach(async () => {
  await env.clearDatabase();
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.database();
    await db.ref('roster').set({ [NIM_A]: true, [NIM_B]: true });
    await db.ref('dosen').set({ DOSEN: true, DOSEN_ANON: true });
    await db.ref('live/state').set({ active: 'q1', open: true, revealed: false });
  });
});

const anon = (uid) => env.authenticatedContext(uid, { firebase: { sign_in_provider: 'anonymous' } }).database();
const dosen = () => env.authenticatedContext('DOSEN', { firebase: { sign_in_provider: 'google.com' } }).database();
const guest = () => env.unauthenticatedContext().database();

// mahasiswa sudah masuk dengan NIM: seat + claims
async function login(uid, nim) {
  const db = anon(uid);
  await assertSucceeds(db.ref(`seat/${uid}`).set(nim));
  await assertSucceeds(db.ref(`claims/${nim}`).set(uid));
  return db;
}
const ans = (values = { brand: 'Gojek' }) => ({ values, t: TS() });

test('tanpa login: tidak bisa baca apa pun', async () => {
  await assertFails(guest().ref('live/state').get());
  await assertFails(guest().ref('answers').get());
});

test('mahasiswa bisa baca state, tidak bisa menulisnya', async () => {
  const db = anon('A');
  await assertSucceeds(db.ref('live/state').get());
  await assertFails(db.ref('live/state').set({ active: 'poll1', open: true, revealed: true }));
  await assertFails(db.ref('live/state/open').set(false));
});

test('mahasiswa tidak bisa membaca roster, NIM, jawaban orang lain, hidden, dosen, presence', async () => {
  const a = await login('A', NIM_A);
  await assertSucceeds(a.ref(`answers/q1/${NIM_A}`).set(ans()));
  const b = await login('B', NIM_B);
  for (const p of ['roster', `roster/${NIM_A}`, 'claims', 'seat', 'answers', 'answers/q1', `answers/q1/${NIM_A}`, 'hidden', 'dosen', 'dosenState', 'presence', '/']) {
    await assertFails(b.ref(p).get());
  }
});

test('mahasiswa tidak bisa menebak NIM lewat seat/claims orang lain', async () => {
  await login('A', NIM_A);
  const b = anon('B');
  await assertFails(b.ref('seat/A').get());
  await assertFails(b.ref(`claims/${NIM_A}`).get()); // B belum duduk di NIM itu
});

test('seat: hanya NIM yang ada di roster, hanya milik uid sendiri, format dijaga', async () => {
  const db = anon('A');
  await assertFails(db.ref('seat/A').set('9999999999')); // tidak ada di roster
  await assertFails(db.ref('seat/B').set(NIM_A)); // uid orang lain
  await assertFails(db.ref('seat/A').set('../x'));
  await assertSucceeds(db.ref('seat/A').set(NIM_A));
});

test('claims: butuh seat dengan NIM yang sama', async () => {
  const db = anon('A');
  await assertFails(db.ref(`claims/${NIM_A}`).set('A')); // belum ada seat
  await assertSucceeds(db.ref('seat/A').set(NIM_A));
  await assertFails(db.ref(`claims/${NIM_B}`).set('A')); // seat NIM lain
  await assertFails(db.ref(`claims/${NIM_A}`).set('B')); // mengaku uid lain
  await assertSucceeds(db.ref(`claims/${NIM_A}`).set('A'));
});

test('jawaban: boleh saat layar aktif dan terbuka, bisa diedit selama terbuka', async () => {
  const a = await login('A', NIM_A);
  await assertSucceeds(a.ref(`answers/q1/${NIM_A}`).set(ans({ brand: 'Gojek', dari: 'warna' })));
  await assertSucceeds(a.ref(`answers/q1/${NIM_A}`).set(ans({ brand: 'Nike', dari: 'bentuk' })));
  const got = await assertSucceeds(a.ref(`answers/q1/${NIM_A}`).get());
  assert.equal(got.val().values.brand, 'Nike');
});

test('jawaban ditolak: layar lain, layar ditutup, NIM orang lain, tanpa claim', async () => {
  const a = await login('A', NIM_A);
  await assertFails(a.ref(`answers/poll1/${NIM_A}`).set(ans())); // bukan layar aktif
  await assertFails(a.ref(`answers/q1/${NIM_B}`).set(ans())); // NIM orang lain
  await assertFails(anon('Z').ref(`answers/q1/${NIM_A}`).set(ans())); // tidak punya claim
  await env.withSecurityRulesDisabled((ctx) => ctx.database().ref('live/state/open').set(false));
  await assertFails(a.ref(`answers/q1/${NIM_A}`).set(ans())); // sudah ditutup
});

test('jawaban ditolak: cap waktu palsu, anak tambahan, teks terlalu panjang', async () => {
  const a = await login('A', NIM_A);
  await assertFails(a.ref(`answers/q1/${NIM_A}`).set({ values: { brand: 'x' }, t: 123 }));
  await assertFails(a.ref(`answers/q1/${NIM_A}`).set({ values: { brand: 'x' }, t: TS(), extra: 1 }));
  await assertFails(a.ref(`answers/q1/${NIM_A}`).set(ans({ brand: 'x'.repeat(301) })));
  await assertSucceeds(a.ref(`answers/q1/${NIM_A}`).set(ans({ brand: 'x'.repeat(300) })));
});

test('jawaban: multi dan grid (anak berisi string pendek) lolos, anak panjang ditolak', async () => {
  const a = await login('A', NIM_A);
  await env.withSecurityRulesDisabled((ctx) => ctx.database().ref('live/state').set({ active: 'h7-tebak2', open: true, revealed: false }));
  await assertSucceeds(a.ref(`answers/h7-tebak2/${NIM_A}`).set(ans({ grid: { visual: 'needed', sonic: 'partly' } })));
  await assertSucceeds(a.ref(`answers/h7-tebak2/${NIM_A}`).set(ans({ grid: ['a', 'b'] })));
  await assertFails(a.ref(`answers/h7-tebak2/${NIM_A}`).set(ans({ grid: { visual: 'y'.repeat(101) } })));
});

test('perangkat kedua: yang terakhir menang, perangkat lama tidak bisa menjawab lagi tapi melihat pengambilalihan', async () => {
  const a = await login('A', NIM_A);
  await assertSucceeds(a.ref(`answers/q1/${NIM_A}`).set(ans()));
  const a2 = await login('A2', NIM_A); // perangkat kedua, NIM sama
  const claim = await assertSucceeds(a.ref(`claims/${NIM_A}`).get()); // perangkat lama masih boleh melihat
  assert.equal(claim.val(), 'A2');
  await assertFails(a.ref(`answers/q1/${NIM_A}`).set(ans({ brand: 'baru' })));
  await assertSucceeds(a2.ref(`answers/q1/${NIM_A}`).set(ans({ brand: 'baru' })));
});

test('mahasiswa hanya bisa membaca jawabannya sendiri', async () => {
  const a = await login('A', NIM_A);
  const b = await login('B', NIM_B);
  await assertSucceeds(a.ref(`answers/q1/${NIM_A}`).set(ans()));
  await assertSucceeds(a.ref(`answers/q1/${NIM_A}`).get());
  await assertFails(b.ref(`answers/q1/${NIM_A}`).get());
});

test('presence: hanya uid sendiri, hanya dosen yang membaca', async () => {
  const a = anon('A');
  await assertSucceeds(a.ref('presence/A').set(true));
  await assertFails(a.ref('presence/B').set(true));
  await assertFails(a.ref('presence').get());
  await assertSucceeds(dosen().ref('presence').get());
});

test('dosen (Google + terdaftar): baca semua, tulis state, sembunyikan, roster', async () => {
  const a = await login('A', NIM_A);
  await assertSucceeds(a.ref(`answers/q1/${NIM_A}`).set(ans()));
  const d = dosen();
  for (const p of ['roster', 'claims', 'answers', 'answers/q1', 'presence', 'hidden', 'dosenState']) await assertSucceeds(d.ref(p).get());
  await assertSucceeds(d.ref('live/state').set({ active: 'poll1', open: true, revealed: false }));
  await assertSucceeds(d.ref(`hidden/q1/${NIM_A}`).set(true));
  await assertSucceeds(d.ref('dosenState/spot').set({ screen: 'q1', ref: NIM_A }));
});

test('uid dosen tapi bukan login Google: tidak bisa menulis state', async () => {
  await assertFails(anon('DOSEN_ANON').ref('live/state').set({ active: 'q1', open: false, revealed: false }));
});

test('mahasiswa tidak bisa mendaftarkan diri jadi dosen atau mengubah roster/hidden', async () => {
  const a = anon('A');
  await assertFails(a.ref('dosen/A').set(true));
  await assertFails(a.ref(`roster/9999999999`).set(true));
  await assertFails(a.ref(`hidden/q1/${NIM_A}`).set(true));
  await assertFails(a.ref('dosenState/spot').set('x'));
});
