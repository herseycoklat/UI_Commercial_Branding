# Workbook App — Capstone: Commercial Branding

Situs statis (tanpa server, tanpa build step, tanpa library CDN). Mahasiswa mengisi workbook per sesi; data tersimpan di browser dan di file `.json` yang mereka unduh lalu kumpulkan lewat Google Form. Brief: `claude/36-kontrak-workbook-app-v3.md` (v3.2) dan patch `claude/40-patch-kontrak-v3.3.md` di Project.

## Aturan yang tidak boleh dilanggar

1. **ID field dikunci setelah sesi dirilis.** Format `s{sesi}.p{halaman workbook}.{kotak}`. Boleh menambah ID, tidak boleh mengganti nama atau menghapus. `tools/field-ids.lock.json` mencatat ID yang sudah dikunci; `tools/audit.py` gagal bila ada yang hilang.
2. **File versi lama harus selalu bisa dibuka.** Perubahan bentuk data hanya di `migrate()` dalam `core/app.js`.
3. App mahasiswa tidak pernah menampilkan APPROVED / APPROVED WITH A CONDITION / REVISION DUE.
4. Konten tidak memuat tanggal kalender; semua tanggal dari `config/course.json`.

## Tugas rutin dosen

**Mengubah tanggal rilis atau tenggat.** Buka `config/course.json` di GitHub → ikon pensil → ubah tanggal (format `2026-10-21T00:00:00+07:00`) → *Commit changes*. Sesi terbuka otomatis saat tanggal rilis lewat. Kalau file ini rusak (mis. koma hilang), app menampilkan pesan "App tidak bisa dimuat" — kembalikan perubahan lewat *History* file itu.

**Melihat sesi sebelum dirilis.** Tambahkan `?pratinjau=1` di alamat, mis. `https://domain/index.html?pratinjau=1`. Keluar dengan `?pratinjau=0`.

**Mengisi link Google Form.** Isi `"form_url"` di `config/course.json`.

**Mengoreksi typo konten.** Teks halaman ada di `content/sN.js`; label kotak di `sessions/sN.js` (label harus persis workbook — jalankan audit setelah mengubah).

**Hal inti dan "Boleh dilewati" (v0.5.0).** Hal inti per sesi ada di `core.items` pada `sessions/sN.js`; halaman atau kotak yang boleh dilewati diberi `skip: true` (dilipat default, tidak pernah dihitung kurang). Cek kelengkapan di `core/checks.js` hanya memuat baris hal inti (`group` = kunci hal inti). Teks tampil tanpa kata "Gate" diatur lewat `show: { … }` di spec (`core/show.js`), supaya teks workbook PPT di spec tetap utuh untuk audit. Panel "cek tiga tes" S4 dimatikan lewat `CB.FEATURES.tigaTes = false` di `core/session.js`.

**Penanda MUST-DO dan peta rantai (v0.6.0).** Tiap hal inti punya `chain` (nama di peta beranda) dan nomor `n` 1–9; halaman wajib berlabel "MUST-DO · n of 9" dan disorot di navigasi. `CB.coreChain()` di `core/checks.js` menghitung status rantai untuk beranda (sesi yang belum dirilis tidak ikut). Petunjuk satu baris di atas kotak memakai properti spec `tip` (teks app, bukan workbook).

**Rollback.** Di GitHub: *Commits* → pilih commit sebelum masalah → *Revert*.

## Struktur

```
index.html            halaman utama: identitas, status sesi, ringkasan Leadership Log, impor file
leadership.html       Leadership Log (silabus §9D): tab sendiri di samping Workbook tiap sesi, terbuka sejak Week 1
s1.html …             satu halaman per sesi (shell tipis)
core/app.js           data, autosave, versi, submit/impor, rilis
core/session.js       render halaman sesi dari spec + konten, cetak PDF
core/fields.js        komponen isian
core/checks.js        cek kelengkapan (rule-based); hanya menghitung hal inti sesi
core/hub.js           halaman utama
core/leadership.js    halaman Leadership Log: panduan sembilan butir §9D + entri
sessions/sN.js        SPEC: halaman, label persis workbook, ID field
content/sN.js         teks: teori, kenapa penting, deeper read, contoh 4 kasus
config/course.json    tanggal rilis & tenggat, link Form
config/projects.json  dropdown proyek (diturunkan dari daftar-proyek.csv; tanpa nama anggota)
tools/audit.py        audit parity spec ↔ ekstrak workbook
```

## Menambah sesi baru (untuk chat pembangun)

1. Tulis `sessions/sN.js` (spec, label persis workbook) dan `content/sN.js` (teks + contoh 4 kasus).
2. Salin `s1.html` menjadi `sN.html`, ganti nama file spec/konten dan `bootSession("SN")`.
3. Tambahkan `"SN"` ke `LIVE_PAGES` di `core/hub.js`.
4. Jalankan audit, lalu `--lock` saat sesi dirilis.

## Setiap kali deploy perubahan kode
Naikkan nomor versi di `core/app.js` (`APP_VERSION`) dan di semua tag `?v=` pada file `*.html` (angkanya sama). Tanpa ini browser mahasiswa bisa memakai file JS/CSS lama dari cache sampai ±10 menit.

## Audit sebelum deploy

```
python3 tools/audit.py S1 tools/extracts/S1.md
python3 tools/audit.py S2 tools/extracts/S2.md
# saat sesi dirilis: tambahkan --lock untuk mencatat ID di tools/field-ids.lock.json
```

## Dua log yang berbeda (kontrak v3.3)

- **Decision Log S1** = `s1.p8.log`, field biasa di `sessions.S1`, diisi di akhir Sesi 1, ikut status dan versi S1.
- **Leadership Log** = `leadership_log.entries[]` di level atas file, satu entri per butir §9D (`category`, `text`, `ref`, `date`). Menambah entri tidak mengubah status sesi mana pun.
- File v0.1 (satu entri berisi kolom workbook dan sembilan butir §9D) otomatis dipindahkan oleh `migrate()` di `core/app.js`.

## Proyek di luar daftar
Di pilihan Proyek (halaman utama) ada opsi "+ Proyek lain (tidak ada di daftar)". Memilihnya memunculkan kotak nama proyek. Di file hasil unduhan: `identifier.group_id = "LAIN"` dan `identifier.project_name` = nama yang diketik. Penerima file mengelompokkan tim lewat `group_id`, jadi semua file ber-ID `LAIN` perlu dicocokkan manual lewat nama proyek atau ditambahkan ke `config/projects.json`.

## Kontrak data mahasiswa (8 Nov 2026) — wajib diikuti semua chat yang mengubah app

Format file tetap `cb-student/1` sampai kursus selesai. Tujuannya: file Week 1 sampai Final selalu terbuka utuh di versi app mana pun.

1. **Field yang sudah dirilis tidak boleh dihapus, diganti nama, atau diganti tipe.** Kalau bentuknya harus berubah: buat ID baru, dan tampilkan isian lama sebagai "isian lama" lewat `migrate()` (contoh: `s3.p5.why_placed` → `{_legacy}`), lalu daftarkan perubahan itu di `MIGRASI_SAH` di `tools/tests/regresi_json.py`.
2. **Setiap sesi dikunci pada hari rilisnya:** `python3 tools/audit.py SN tools/extracts/SN.md --lock` (mengunci ID **dan** bentuk data: `field-ids.lock.json` + `field-types.lock.json`), lalu `python3 tools/kamus_field.py > docs/kamus-field.md`. Bentuk data dikunci per keluarga: text/longtext/copytext/enum sama-sama "teks"; tipe lain dikunci namanya.
3. **Yang baru hanya menambah ID.** Kunci tak dikenal di file dibiarkan dan ikut diunduh ulang.
4. **Tampilkan, jangan salin** (doc 73 aturan 2): halaman hilir membaca `sessions.SN.current` milik sesi hulu, tidak menyimpan salinannya.
5. **Satu file berisi semua sesi.** File terbaru per NIM adalah yang dibaca. Penilai merujuk ID dari `docs/kamus-field.md`, bukan dari ingatan atau dokumen lama; field kosong = "belum diisi", bukan galat.
6. **Impor tidak boleh menghilangkan isian diam-diam.** `CB.acceptImport` selalu mencadangkan data browser (maks. 3 per NIM, `cb_backup_<NIM>`), dan memberi peringatan kedua bila file lebih lama atau isiannya lebih sedikit. Pemulihan: `pulihkan.html` (tidak ditautkan dari hub; dosen membagikan link bila perlu). Bila penyimpanan penuh, isian utama didahulukan dan cadangan dikorbankan.
7. **Sebelum setiap push ke main:** `bash tools/cek_rilis.sh` (audit semua sesi + kunci). Sebelum rilis yang menyentuh `sessions/*.js`, `core/fields.js`, `core/session.js` atau `migrate()`: `bash tools/cek_rilis.sh --penuh`. Laporkan keluarannya di laporan chat. Rincian uji regresi: `python3 tools/tests/regresi_json.py buat-contoh <folder>` lalu `python3 tools/tests/regresi_json.py uji <folder>`. Tambahkan file mahasiswa asli (diunduh dari Drive Form) ke folder yang sama bila ada, **di luar repo**. Rilis hanya bila semua file "utuh".
