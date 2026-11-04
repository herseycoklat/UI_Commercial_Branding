# Kelas Live (Sesi 4, Capstone: Commercial Branding)

Mahasiswa menjawab 25 layar dari HP; jawaban muncul anonim di layar dosen. Ini alat kelas, **bukan** tempat pengumpulan tugas (penilaian tetap lewat HTML tool, JSON, dan Form).

| Halaman | Untuk | Keterangan |
|---|---|---|
| `/live/` | mahasiswa | NIM, layar jawaban, Catatanku, Unduh CSV, Keluar |
| `/live/dosen.html` | dosen | login Google; buka/tutup layar, Tampilkan hasil, kehadiran |
| `/live/setup.html` | dosen | membuat berkas impor roster + UID dosen (jalan lokal di browser, tidak mengirim apa pun) |

## Data NIM dan jawaban TIDAK PERNAH masuk repo
Roster, NIM, dan jawaban hanya ada di Firebase (project `kelas-live-combrand`, Realtime Database `asia-southeast1`). Di repo hanya ada kode, Rules, dan config web yang memang publik. NIM uji `TEST0001`..`TEST0060` fiktif.

## Arsitektur singkat
- **Layar = data.** `screens.js` berisi 25 layar (teks dari skrip v3 Lampiran E). Satu renderer (`render.js`) menggambar semua jenis isian: single, multi, text, grid.
- **Logika murni** (diuji di Node): `aggregate.js` (hasil), `flags.js` (⚠ kombinasi tidak konsisten dan penanda kunci, dua hal terpisah), `csv.js`, `validate.js`.
- **Backend:** `backend.js` satu-satunya yang memanggil Firebase. SDK dibundel sekali ke `vendor/firebase.js` (`npm run build:vendor`, versi dikunci lewat `package-lock.json`), tanpa CDN.
- **Keamanan:** `database.rules.json`. Mahasiswa hanya bisa membaca `live/state` dan jawabannya sendiri; menulis jawaban hanya saat layar aktif dan terbuka; tidak bisa membaca NIM, roster, atau jawaban orang lain. Dosen = login Google + UID terdaftar di `/dosen`. Satu perangkat aktif per NIM (perangkat terakhir menang).
- **Keterbatasan yang diketahui:** NIM bisa ditebak satu per satu oleh orang yang sudah login anonim (roster hanya diperiksa keberadaannya). Perlindungan tambahan (App Check) belum dipasang. Paket gratis membatasi 100 koneksi bersamaan; kelas ±60.

## Menjalankan uji
```
cd live && npm install
npm test                 # 33 uji logika (Node)
npm run test:rules:jar   # 19 uji Rules (emulator; test:rules bila CLI Firebase bisa ke localhost)
npm run test:e2e         # 73 pemeriksaan browser + emulator (termasuk tombol Keluar)
node loadtest/run.mjs    # load test, Firebase sungguhan, NIM uji (butuh dosen membuka layar)
node loadtest/failures.mjs   # skenario gagal terhadap Rules sungguhan
```
Cadangan kalau Kelas Live mati: `FALLBACK.md`.

## Usulan retensi data (perlu keputusan dosen)
1. Setelah kehadiran diekspor (tab Kehadiran → Unduh CSV), hapus node `answers`, `claims`, `seat`, `presence`, `hidden`, `dosenState` dari Firebase console.
2. Hapus node `roster` setelah semester selesai. Hapus pengguna anonim lewat Authentication → Users.
3. Berkas CSV kehadiran disimpan di drive dosen, bukan di repo.
4. Catatanku mahasiswa tersimpan di browser mereka sendiri (bukan di server) dan hilang bila data situs dihapus.

## Impor roster (sebelum kelas)
Impor menimpa seluruh database. Pakai `setup.html`. **Jangan** mencentang NIM uji untuk kelas sungguhan.
