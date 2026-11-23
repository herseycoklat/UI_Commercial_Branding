# Kelas Live (Sesi 4–7, Capstone: Commercial Branding)

Mahasiswa menjawab 56 layar dari HP (3 tebakan pengantar I1–I3 + 25 layar Sesi 4 + 13 layar Sesi 5, L1–L13 + 4 layar Sesi 6, L1–L4 + 11 layar Sesi 7, L1–L6 dan Uji kartu #1–#5); jawaban muncul anonim di layar dosen. Ini alat kelas, **bukan** tempat pengumpulan tugas (penilaian tetap lewat HTML tool, JSON, dan Form).

| Halaman | Untuk | Keterangan |
|---|---|---|
| `/live/` | mahasiswa | NIM, layar jawaban, Catatanku, Unduh CSV, Keluar |
| `/live/dosen.html` | dosen | login Google; buka/tutup layar, Tampilkan hasil, filter sesi × jenis, kehadiran (pembagi = layar yang dibuka), kosongkan riwayat layar dibuka |
| `/live/setup.html` | dosen | membuat berkas impor roster + UID dosen (jalan lokal di browser, tidak mengirim apa pun) |

## Data NIM dan jawaban TIDAK PERNAH masuk repo
Roster, NIM, dan jawaban hanya ada di Firebase (project `kelas-live-combrand`, Realtime Database `asia-southeast1`). Di repo hanya ada kode, Rules, dan config web yang memang publik. NIM uji `TEST0001`..`TEST0060` fiktif.

## Arsitektur singkat
- **Layar = data.** `screens.js` berisi 45 layar: I1–I3 (pengantar Gojek, doc 63) + 25 layar skrip v3 Lampiran E + L1–L13 Sesi 5 (Lampiran C skrip gabungan S5 v1, doc 85) + L1–L4 Sesi 6 (skrip kelas S6 v1, id `s6-l1`…`s6-l4`). Tiap layar berlabel `sesi` (S1–S6) dan `jenis` (insight/kelas). Sesi 5: `konteks` tampil di atas pertanyaan (L4, L5, L12, L13); L1 memakai urutan acak tetap di HP (`urutan`) dan `kunciTerpisah`: hasil tampil dulu tanpa tanda, lalu dosen klik **Tandai yang dilaporkan**. Sesi 6: L1–L3 memakai pola `kunciTerpisah` yang sama (tombol **Tandai kunci**, properti `labelKunci`); L1 dan L4 punya `konteks` (L4 = kartu Jumbo teks pendek); L4 tanpa kunci, dan tiap opsinya membawa properti `dosen` (SAY / DO / PAY / DITOLAK) yang hanya digambar di layar dosen (`results.js`), tidak pernah di HP. Teks L1–L4 diuji otomatis terhadap kutipan skrip di `test/fixtures/s6-skrip-v1.md`. Sesi 7 (id `s7-l1`…`s7-l6`, `s7-uk1`…`s7-uk5`): L1/L2/L4/L5 acak tetap + `kunciTerpisah` (kunci L2/L5 boleh ditandai belakangan saat layar tidak aktif; tanda diingat browser dosen); L3, L6, dan Uji kartu #1–#5 satu template `ujiKartu` (SAY/DO/PAY/Tidak + "Kenapa?" opsional, tanpa kunci). Di layar dosen tiap isi "Kenapa?" diberi label pilihan orang itu, Tidak dan SAY dulu; tombol **Unduh hasil** menyimpan persentase + teks (anonim) satu layar sebagai CSV. Teks diuji terhadap `test/fixtures/s7-kelas-live.md`. Satu renderer (`render.js`) menggambar semua jenis isian: single, multi, text, grid.
- **Logika murni** (diuji di Node): `aggregate.js` (hasil), `flags.js` (⚠ kombinasi tidak konsisten dan penanda kunci, dua hal terpisah), `csv.js`, `validate.js`.
- **Backend:** `backend.js` satu-satunya yang memanggil Firebase. SDK dibundel sekali ke `vendor/firebase.js` (`npm run build:vendor`, versi dikunci lewat `package-lock.json`), tanpa CDN.
- **Keamanan:** `database.rules.json`. Mahasiswa hanya bisa membaca `live/state` dan jawabannya sendiri; menulis jawaban hanya saat layar aktif dan terbuka; tidak bisa membaca NIM, roster, atau jawaban orang lain. Dosen = login Google + UID terdaftar di `/dosen`. Satu perangkat aktif per NIM (perangkat terakhir menang).
- **Keterbatasan yang diketahui:** NIM bisa ditebak satu per satu oleh orang yang sudah login anonim (roster hanya diperiksa keberadaannya). Perlindungan tambahan (App Check) belum dipasang. Paket gratis membatasi 100 koneksi bersamaan; kelas ±60.

## Menjalankan uji
```
cd live && npm install
npm test                 # 38 uji logika (Node)
npm run test:rules:jar   # 19 uji Rules (emulator; test:rules bila CLI Firebase bisa ke localhost)
npm run test:e2e         # 107 pemeriksaan browser + emulator (termasuk tombol Keluar, I1–I3, L1–L13, filter, pembagi)
node loadtest/run.mjs    # load test, Firebase sungguhan, NIM uji (butuh dosen membuka layar)
node loadtest/failures.mjs   # skenario gagal terhadap Rules sungguhan
```
Cadangan kalau Kelas Live mati: `FALLBACK.md`.

## Usulan retensi data (perlu keputusan dosen)
1. Setelah kehadiran diekspor (tab Kehadiran → Unduh CSV), hapus node `answers`, `claims`, `seat`, `presence`, `hidden`, `dosenState` dari Firebase console.
2. Hapus node `roster` setelah semester selesai. Hapus pengguna anonim lewat Authentication → Users.
3. Berkas CSV kehadiran disimpan di drive dosen, bukan di repo.
4. Catatanku mahasiswa tersimpan di browser mereka sendiri (bukan di server) dan hilang bila data situs dihapus.

## Sebelum kelas: kosongkan riwayat layar dibuka
Pembagi kehadiran = layar yang pernah dibuka dosen (`dosenState/opened`). Layar yang dibuka saat uji ikut tercatat. Di halaman dosen, tab Kehadiran, klik **Kosongkan riwayat layar dibuka** dua kali. Jawaban uji TIDAK ikut terhapus (Rules tidak mengizinkan dosen menghapus jawaban); kalau uji memakai NIM sungguhan, hapus node `answers` dan `hidden` di Firebase console.

## Impor roster (sebelum kelas)
Impor menimpa seluruh database. Pakai `setup.html`. **Jangan** mencentang NIM uji untuk kelas sungguhan.
