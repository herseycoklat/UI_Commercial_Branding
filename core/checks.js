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

/* ---------- S2: cek bukti dan kelengkapan (informasi, bukan lulus/gagal) ---------- */
(function () {
  "use strict";
  var CB = window.CB;
  function txt(v) { return typeof v === "string" ? v.trim() : ""; }
  var WOULD = /\b(would you|will you|would it|apakah (kamu|anda) (akan|mau)|maukah|kalau ada .* (mau|akan))/i;
  CB.checks.S2 = function (data) {
    var c = ((data.sessions && data.sessions.S2) || {}).current || {};
    var out = [];
    var facts = (c["s2.p2.fact"] || {}).items || [];
    var factsFilled = facts.filter(function (f) { return txt(f.text); });
    var noSrc = factsFilled.filter(function (f) { return !txt(f.source) || !txt(f.number); }).length;
    out.push({ label: factsFilled.length ? "FACT: " + factsFilled.length + " klaim" + (noSrc ? ", " + noSrc + " belum punya sumber atau angka (pindahkan ke INTERPRETATION kalau tidak ada)" : ", semua bersumber dan berangka") : "FACT masih kosong. Kosong itu jujur, tapi tulis 0 sebagai fakta (mis. \"0 interviews so far\")", where: "S2 · hlm. 2", state: factsFilled.length ? (noSrc ? "warn" : "ok") : "no" });
    var iv = (c["s2.p9.interviews"] || {}).items || [];
    var outside = iv.filter(function (x) { return x.outside === "Ya" && txt(x.notes); }).length;
    var kinds = {};
    factsFilled.forEach(function (f) { if (f.kind) kinds[f.kind] = 1; });
    if (outside) kinds["Audience interviews"] = 1;
    var nk = Object.keys(kinds).length;
    out.push({ label: "Jenis bukti (silabus §7): " + nk + (nk ? " — " + Object.keys(kinds).join(", ") : "") + ". Gate 2 meminta minimal dua jenis, salah satunya dari audiens primer di luar lingkar tim.", where: "S2 · hlm. 2 dan 9", state: nk >= 2 ? "ok" : "warn" });
    out.push({ label: "Wawancara dengan orang di luar tim, bercatatan: " + outside + " dari minimal 5" + (outside < 5 ? ". Boleh menyusul sampai " + CB.fill("{{interviews_due}}", "S2") + "." : "."), where: "S2 · hlm. 9", state: outside >= 5 ? "ok" : "warn" });
    var cat = c["s2.p3.category"] || {};
    out.push({ label: "Kalimat kategori \"We compete in…, because…\" lengkap", where: "S2 · hlm. 3", state: txt(cat.compete_in) && txt(cat.because) ? "ok" : "no" });
    var segs = ((c["s2.p3.segments"] || {}).items || []).filter(function (s) { return txt(s.name); });
    out.push({ label: "Segmen bernama: " + segs.length + " (2–4)", where: "S2 · hlm. 3", state: segs.length >= 2 && segs.length <= 4 ? "ok" : "no" });
    var sc = c["s2.p4.scores"] || {};
    var scored = segs.filter(function (s) { var x = sc[s.id] || {}; return x.attractive && x.accessible && x.strategic_fit && x.revenue_potential; }).length;
    out.push({ label: "Semua segmen diberi empat skor (" + scored + "/" + segs.length + ")", where: "S2 · hlm. 4", state: segs.length && scored === segs.length ? "ok" : "no" });
    out.push({ label: "PRIMARY dan SECONDARY AUDIENCE ditulis", where: "S2 · hlm. 4", state: txt(c["s2.p4.primary"]) && txt(c["s2.p4.secondary"]) ? "ok" : "no" });
    var vpc = ["jobs", "pains", "gains", "products_services", "pain_relievers", "gain_creators"].filter(function (k) { return txt(c["s2.p5." + k]); }).length;
    out.push({ label: "Enam kotak Value Proposition Canvas terisi (" + vpc + "/6)", where: "S2 · hlm. 5", state: vpc === 6 ? "ok" : "no" });
    var ins = c["s2.p5.insight"] || {};
    var insOk = ["who", "motivation", "barrier", "opportunity"].every(function (k) { return txt(ins[k]); });
    out.push({ label: "Insight sentence lengkap (Who · motivation · BUT · SO) dan sumber BUT dipilih", where: "S2 · hlm. 5", state: insOk && c["s2.p5.but_source"] ? "ok" : "no" });
    var m = (c["s2.p6.matrix"] || {}).rows || {};
    var who = m.who || {};
    var cols = ["us", "direct", "indirect", "substitute", "benchmark"];
    var named = cols.filter(function (k) { return txt(who[k]); }).length;
    out.push({ label: "Baris \"Who exactly?\" terisi di kelima kolom (" + named + "/5; UNKNOWN boleh, kosong tidak)", where: "S2 · hlm. 6", state: named === 5 ? "ok" : "no" });
    var ax = c["s2.p7.axes"] || {};
    var axOk = ["axis1_high", "axis1_low", "axis2_left", "axis2_right"].every(function (k) { return txt(ax[k]); });
    var pts = ((c["s2.p7.points"] || {}).points || []).map(function (p) { return txt(p.name).toLowerCase(); });
    var names = cols.map(function (k) { return txt(who[k]); }).filter(function (n) { return n && !/^UNKNOWN/i.test(n); });
    var missing = names.filter(function (n) { return pts.indexOf(n.toLowerCase()) < 0; });
    out.push({ label: "Dua sumbu berlabel" + (axOk ? "" : " (belum lengkap)") + "; nama dari hlm. 6 yang belum ada di peta: " + (missing.length ? missing.join(", ") : "tidak ada"), where: "S2 · hlm. 7", state: axOk && !missing.length && pts.length ? "ok" : "no" });
    out.push({ label: "Kotak TEST FIRST (HIGH IMPORTANCE · LOW CERTAINTY) terisi", where: "S2 · hlm. 8", state: txt(c["s2.p8.test_first"]) ? "ok" : "no" });
    var qs = ["q1_warmup", "q2_past", "q3_pain", "q4_workaround", "q5_decision", "q6_close"].map(function (k) { return txt(c["s2.p9." + k]); });
    var qn = qs.filter(Boolean).length;
    out.push({ label: "Enam pertanyaan wawancara terisi (" + qn + "/6)", where: "S2 · hlm. 9", state: qn === 6 ? "ok" : "no" });
    var would = qs.filter(function (q) { return WOULD.test(q); }).length;
    out.push({ label: would ? would + " pertanyaan terdengar hipotetis (\"would you…\"). Tanyakan masa lalu: \"Ceritakan terakhir kali…\"" : "Tidak ada pertanyaan \"would you\"", where: "S2 · hlm. 9", state: would ? "warn" : (qn ? "ok" : "pending") });
    out.push({ label: "Riskiest assumption disalin dari hlm. 8 dan VALIDATION METHOD menyebut siapa dan kapan", where: "S2 · hlm. 9", state: txt(c["s2.p9.riskiest_assumption"]) && txt(c["s2.p9.validation_method"]) ? "ok" : "no" });
    return out;
  };
})();
