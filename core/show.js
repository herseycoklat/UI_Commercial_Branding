/* core/show.js — teks TAMPILAN yang berbeda dari teks workbook PPT (v0.5.0, 5 Nov 2026).
 *
 * Spec (sessions/sN.js) menyimpan teks workbook APA ADANYA, karena tools/audit.py mencocokkannya dengan PPT.
 * Bila sebuah objek spec (halaman, kotak, kolom isian) punya properti `show: { kunci: nilai }`, nilai itu
 * MENGGANTIKAN kunci yang sama saat ditampilkan ke mahasiswa; aslinya disimpan di `_orig`.
 * Dipakai sekarang untuk satu keperluan: kata "Gate" tidak tampil ke mahasiswa (dokumen 64, keputusan Fai 5 Nov).
 *   mis. { p: 9, title: "… — Gate 3 Check", show: { title: "… " } }
 * Audit membaca spec MENTAH (sebelum applyShow) untuk parity PPT, dan spec TAMPIL untuk larangan kata Gate.
 * Idempoten: aman dipanggil berkali-kali. Tidak mengubah ID field maupun bentuk data. */
(function (root) {
  "use strict";
  function walk(o, seen) {
    if (!o || typeof o !== "object" || seen.indexOf(o) >= 0) return;
    seen.push(o);
    if (Array.isArray(o)) { o.forEach(function (x) { walk(x, seen); }); return; }
    if (o.show && typeof o.show === "object" && !Array.isArray(o.show) && !o._shown) {
      o._orig = o._orig || {};
      Object.keys(o.show).forEach(function (k) {
        if (!(k in o._orig)) o._orig[k] = o[k];
        o[k] = o.show[k];
      });
      o._shown = true;
    }
    Object.keys(o).forEach(function (k) { if (k !== "show" && k !== "_orig") walk(o[k], seen); });
  }
  function applyShow(spec) { walk(spec, []); return spec; }
  if (root.CB) root.CB.applyShow = applyShow;
  if (typeof module !== "undefined" && module.exports) module.exports = applyShow;
})(typeof window !== "undefined" ? window : this);
