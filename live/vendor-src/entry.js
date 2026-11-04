// Hanya fungsi Firebase yang dipakai Kelas Live. Dibundel sekali ke ../vendor/firebase.js (tanpa CDN).
export { initializeApp, deleteApp } from 'firebase/app';
export {
  getAuth, signInAnonymously, onAuthStateChanged, GoogleAuthProvider,
  signInWithPopup, signInWithCredential, signOut, connectAuthEmulator,
} from 'firebase/auth';
export {
  getDatabase, ref, set, get, onValue, onDisconnect, serverTimestamp, remove, update,
  connectDatabaseEmulator, runTransaction,
} from 'firebase/database';
