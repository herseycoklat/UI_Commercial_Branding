// Satu-satunya modul yang bicara dengan Firebase. UI tidak memanggil SDK langsung.
import * as F from './vendor/firebase.js';
import { FIREBASE_CONFIG } from './config.js';

// Mode emulator hanya jalan di localhost dan hanya dengan ?emu=1 (untuk uji; tidak aktif di situs sungguhan).
const EMU = typeof location !== 'undefined' && new URLSearchParams(location.search).has('emu') &&
  ['localhost', '127.0.0.1'].includes(location.hostname);
const DEMO = {
  apiKey: 'demo-key', authDomain: 'demo-kelas-live.firebaseapp.com', projectId: 'demo-kelas-live',
  databaseURL: 'http://127.0.0.1:9000/?ns=demo-kelas-live',
};

export const emulator = EMU;
export const ready = EMU || !!FIREBASE_CONFIG;

let app, auth, db;
export function init() {
  if (app) return;
  app = F.initializeApp(EMU ? DEMO : FIREBASE_CONFIG);
  auth = F.getAuth(app);
  db = F.getDatabase(app);
  if (EMU) {
    F.connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    F.connectDatabaseEmulator(db, '127.0.0.1', 9000);
  }
}
const R = (p) => F.ref(db, p);
// Keluar: buang seluruh koneksi + antrean tulis (jawaban tertunda ikut hilang), lalu mulai app baru yang bersih.
export async function resetApp() {
  const old = app;
  app = auth = db = undefined;
  try { await F.deleteApp(old); } catch { /* sudah mati */ }
  init();
}
export const isDenied = (e) => /permission[_ ]denied/i.test(`${e?.code ?? ''} ${e?.message ?? e}`);

// ---------- auth ----------
export const uid = () => auth.currentUser?.uid;
export async function signInAnon() {
  await auth.authStateReady();
  if (auth.currentUser && auth.currentUser.isAnonymous) return auth.currentUser.uid;
  if (auth.currentUser) await F.signOut(auth); // sesi dosen di browser yang sama
  return (await F.signInAnonymously(auth)).user.uid;
}
export const watchAuth = (cb) => F.onAuthStateChanged(auth, cb);
export const googleLogin = () => F.signInWithPopup(auth, new F.GoogleAuthProvider());
export const logout = () => F.signOut(auth);
// Hanya emulator: login "Google" palsu supaya halaman dosen bisa diuji tanpa akun sungguhan.
export async function emuLecturerLogin() {
  if (!EMU) throw new Error('hanya emulator');
  const cred = F.GoogleAuthProvider.credential(JSON.stringify({ sub: 'dosen-uji', email: 'dosen-uji@example.test', email_verified: true }));
  await F.signInWithCredential(auth, cred);
}

// ---------- mahasiswa ----------
export async function claimNim(nim) {
  const u = uid();
  try {
    await F.set(R(`seat/${u}`), nim);
  } catch (e) {
    if (isDenied(e)) throw Object.assign(new Error('NIM_UNKNOWN'), { code: 'NIM_UNKNOWN' });
    throw e;
  }
  await F.set(R(`claims/${nim}`), u); // perangkat terakhir menang
}
export const watchClaim = (nim, cb) => F.onValue(R(`claims/${nim}`), (s) => cb(s.val()), () => {});
export const watchState = (cb) => F.onValue(R('live/state'), (s) => cb(s.val()));
export const watchConnected = (cb) => F.onValue(R('.info/connected'), (s) => cb(!!s.val()));
// Mengembalikan stop(): lepas pemantau, batalkan onDisconnect, hapus penanda hadir (Rules: presence/{uid} boleh dihapus pemiliknya).
export function startPresence() {
  const pr = R(`presence/${uid()}`);
  const off = F.onValue(R('.info/connected'), (s) => {
    if (s.val()) { F.onDisconnect(pr).remove(); F.set(pr, true).catch(() => {}); }
  });
  return () => { off(); return Promise.allSettled([F.onDisconnect(pr).cancel(), F.remove(pr)]); };
}
// Lepas kursi (Rules: seat/{uid} boleh dihapus pemiliknya). Klaim NIM sengaja tidak disentuh: Rules tidak mengizinkan penghapusan klaim.
export const releaseSeat = () => F.remove(R(`seat/${uid()}`));
export const signOutNow = () => F.signOut(auth);
export const sendAnswer = (screenId, nim, values) =>
  F.set(R(`answers/${screenId}/${nim}`), { values, t: F.serverTimestamp() });

// ---------- dosen ----------
export async function isDosen() {
  try { await F.get(R('dosenState')); return true; } catch (e) { if (isDenied(e)) return false; throw e; }
}
export const setStateAll = (o) => F.set(R('live/state'), o);
export const updateState = (p) => F.update(R('live/state'), p);
export const watchAnswers = (id, cb) => F.onValue(R(`answers/${id}`), (s) => cb(s.val() || {}));
export const watchHidden = (id, cb) => F.onValue(R(`hidden/${id}`), (s) => cb(s.val() || {}));
export const setHidden = (id, nim, on) => (on ? F.set(R(`hidden/${id}/${nim}`), true) : F.remove(R(`hidden/${id}/${nim}`)));
export const watchSpot = (cb) => F.onValue(R('dosenState/spot'), (s) => cb(s.val()));
export const setSpot = (v) => (v ? F.set(R('dosenState/spot'), v) : F.remove(R('dosenState/spot')));
export const watchPresence = (cb) => F.onValue(R('presence'), (s) => cb(s.size));
export const watchPeak = (cb) => F.onValue(R('dosenState/peak'), (s) => cb(s.val() || 0));
export const bumpPeak = (n) => F.runTransaction(R('dosenState/peak'), (cur) => ((cur || 0) >= n ? undefined : n));
export const getRoster = async () => Object.keys((await F.get(R('roster'))).val() || {});
export const getAllAnswers = async () => (await F.get(R('answers'))).val() || {};
