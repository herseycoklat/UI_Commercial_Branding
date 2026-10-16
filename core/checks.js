/* core/checks.js — "Cek kelengkapan" (rule-based, bukan penilaian).
 * Mesin ini TIDAK pernah memakai kata status Gate. Hasilnya hanya:
 *   ok      = terpenuhi
 *   no      = belum terpenuhi
 *   warn    = perlu kamu cek sendiri
 *   pending = halaman belum tersedia / belum diisi sama sekali
 * Aturan Gate 1: kontrak claude/35 (v2) bagian 7. */
(function () {
  "use strict";
  var CB = window.CB;

  function txt(v) { return typeof v === "string" ? v.trim() : ""; }
  var SOLUTION = /\b(we will|we'll|we are going to|kami akan|kita akan|akan kami|lower|raise|build|launch|menurunkan|menaikkan|membangun|meluncurkan)\b/i;

  var DIMS = ["audience_clarity", "differentiation", "identity_consistency", "commercial_viability", "distribution_readiness", "evidence_quality"];

  CB.checks = {
    S1: function (data, built) {
      var s = (data.sessions && data.sessions.S1) || { current: {} };
      var c = s.current || {};
      var out = [];
      function has(p) { return built.indexOf(p) >= 0; }

      // hlm. 2 — kotak 8
      out.push({
        label: "Kotak 8 · GAPS & RISKS di Brand Audit Canvas terisi",
        where: "S1 · hlm. 2",
        state: has(2) ? (txt(c["s1.p2.b8_gaps"]) ? "ok" : "no") : "pending"
      });

      // hlm. 6 — enam skor + justifikasi + minimal satu skor 1–2
      if (!has(6)) {
        out.push({ label: "Enam skor 1–5, masing-masing dengan justifikasi satu baris", where: "S1 · hlm. 6", state: "pending" });
        out.push({ label: "Minimal satu skor bernilai 1 atau 2", where: "S1 · hlm. 6", state: "pending" });
      } else {
        var filled = 0, justified = 0, low = 0;
        DIMS.forEach(function (d) {
          var v = c["s1.p6." + d] || {};
          if (v.score) filled++;
          if (txt(v.justification)) justified++;
          if (v.score && v.score <= 2) low++;
        });
        out.push({ label: "Enam skor 1–5, masing-masing dengan justifikasi satu baris (" + Math.min(filled, justified) + "/6)", where: "S1 · hlm. 6", state: filled === 6 && justified === 6 ? "ok" : "no" });
        out.push({ label: "Minimal satu skor bernilai 1 atau 2", where: "S1 · hlm. 6", state: low >= 1 ? "ok" : "no" });
      }

      // hlm. 7 atas — tiga masalah + jejak + bukan solusi
      if (!has(7)) {
        out.push({ label: "Tiga masalah terisi, masing-masing tertaut ke kotak 8 atau skor 1–2", where: "S1 · hlm. 7 (atas)", state: "pending" });
      } else {
        var probs = [1, 2, 3].map(function (i) { return c["s1.p7.problem" + i] || {}; });
        var written = probs.filter(function (p) { return txt(p.text); }).length;
        var valid = function (id) {
          if (id === "s1.p2.b8_gaps") return !!txt(c["s1.p2.b8_gaps"]);
          var v = c[id]; return !!(v && v.score && v.score <= 2);
        };
        var traced = probs.filter(function (p) { return txt(p.text) && (p.trace || []).some(valid); }).length;
        out.push({ label: "Tiga masalah terisi (" + written + "/3)", where: "S1 · hlm. 7 (atas)", state: written === 3 ? "ok" : "no" });
        out.push({ label: "Tiap masalah tertaut ke kotak 8 atau ke skor 1–2 (" + traced + "/3)", where: "S1 · hlm. 7 (atas)", state: traced === 3 ? "ok" : "no" });
        var sol = probs.filter(function (p) { return SOLUTION.test(txt(p.text)); }).length;
        out.push({ label: sol ? sol + " masalah terdengar seperti solusi (\"we will…\", \"kami akan…\"). Tulis sebagai hal yang belum diketahui." : "Tidak ada masalah yang terdengar seperti solusi", where: "S1 · hlm. 7 (atas)", state: sol ? "warn" : (written ? "ok" : "pending") });
      }

      // Refleksi tim (dinyatakan sendiri, tidak diperiksa mesin)
      out.push({
        label: "Dinyatakan sendiri, belum diperiksa: memperbaiki tiap masalah mengubah apakah orang membayar atau memilih",
        where: "refleksi",
        state: s.reflections && s.reflections.commercial ? "ok" : "warn",
        reflection: "commercial"
      });
      return out;
    }
  };

  CB.checkSummary = function (rows) {
    var no = rows.filter(function (r) { return r.state === "no"; }).length;
    var pend = rows.filter(function (r) { return r.state === "pending"; }).length;
    var warn = rows.filter(function (r) { return r.state === "warn"; }).length;
    if (no === 0 && pend === 0 && warn === 0) return "Semua butir kelengkapan terpenuhi.";
    var parts = [];
    if (no) parts.push(no + " belum terpenuhi");
    if (warn) parts.push(warn + " perlu kamu cek sendiri");
    if (pend) parts.push(pend + " menunggu halaman lain");
    return parts.join(" · ") + ".";
  };
})();
