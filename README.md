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

**Rollback.** Di GitHub: *Commits* → pilih commit sebelum masalah → *Revert*.

## Struktur

```
index.html            halaman utama: identitas, status sesi, ringkasan Leadership Log, impor file
leadership.html       Leadership Log (silabus §9D): tab sendiri di samping Workbook tiap sesi, terbuka sejak Week 1
s1.html …             satu halaman per sesi (shell tipis)
core/app.js           data, autosave, versi, submit/impor, rilis
core/session.js       render halaman sesi dari spec + konten, cetak PDF
core/fields.js        komponen isian
core/checks.js        cek kelengkapan (rule-based); S1 disusun mengikuti tiga uji Gate 1
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
