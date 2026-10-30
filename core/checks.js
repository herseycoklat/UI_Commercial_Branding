/* core/checks.js — "Cek kelengkapan" (rule-based, bukan penilaian).
 * Mesin ini TIDAK pernah memakai kata status Gate. Hasilnya hanya:
 *   ok      = terpenuhi
 *   no      = belum terpenuhi
 *   warn    = perlu kamu cek sendiri
 *   pending = halaman belum tersedia / belum diisi sama sekali
 *   info    = informasi, tidak ikut hitungan
 * S1 disusun mengikuti TIGA UJI Gate 1 (silabus §13 + student guide S1), bukan mengikuti alat:
 *   uji 1 komersial (panduan, dibaca penilai) · uji 2 bukti · uji 3 masalah bukan solusi.
 * Kontrak v3.3. */
(function () {
  "use strict";
  var CB = window.CB;

  function txt(v) { return typeof v === "string" ? v.trim() : ""; }
  // Frasa tindakan yang hampir pasti solusi, di mana saja dalam kalimat.
  var STRONG = /\b(we will|we'll|we are going to|we should|kami akan|kita akan|akan kami|kami harus|kita harus)\b/i;
  // Kata kerja tindakan hanya dihitung bila membuka kalimat ("Lower the price"), bukan di tengah ("a new build").
  var STARTS = /^\s*(lower|raise|build|launch|redesign|create|menurunkan|menaikkan|membangun|meluncurkan|turunkan|naikkan|bangun|luncurkan)\b/i;
  function soundsLikeSolution(t) { return STRONG.test(t) || STARTS.test(t); }

  var DIMS = ["audience_clarity", "differentiation", "identity_consistency", "commercial_viability", "distribution_readiness", "evidence_quality"];

  CB.checkIntro = {
    S1: "Gate 1 membaca tiga masalah di hlm. 7 dengan <b>tiga uji</b>. Daftar di bawah disusun mengikuti tiga uji itu. App hanya memeriksa apa yang bisa diperiksa mesin; isi kalimatmu dibaca penilai."
  };
  CB.checkGroups = {
    S1: {
      u1: { title: "Uji 1 · Komersial, bukan kreatif", help: "Baca tiap masalah di atas lalu tanya: kalau ini selesai, apa yang berubah dalam keputusan orang membayar atau memilih? Kalau jawabannya hanya tampilan atau cara produk dibuat jadi lebih bagus, tulis ulang di hlm. 7. Contoh lolos (ilustrasi): \"Kami belum tahu apakah orang tua percaya animasi lokal sebanding dengan film impor sehingga mau membeli tiket.\" Contoh gagal (ilustrasi): \"Poster kami belum terlihat modern.\" Tidak ada kotak isian dan tidak ada status di sini: penilai membaca kalimat masalahmu." },
      u2: { title: "Uji 2 · Didukung bukti dari halamanmu sendiri", help: "Lolos kalau masalah bisa ditunjuk ke satu UNKNOWN jujur (Canvas kotak 8) atau satu skor rendah (Scorecard). Gagal kalau tebakan menit terakhir tanpa jejak." },
      u3: { title: "Uji 3 · Ditulis sebagai masalah, bukan solusi", help: "Lolos kalau ditulis sebagai hal yang belum diketahui atau belum terbukti (\"kami tidak tahu apakah orang tua mau membayar\"). Gagal kalau ditulis sebagai tindakan (\"kami akan menurunkan harga\")." },
      x: { title: "Di luar Gate 1", help: "Tidak memengaruhi Gate 1." }
    }
  };

  CB.checks = {
    S1: function (data, built) {
      var s = (data.sessions && data.sessions.S1) || { current: {} };
      var c = s.current || {};
      var out = [];
      function has(p) { return built.indexOf(p) >= 0; }
      var probs = [1, 2, 3].map(function (i) { return c["s1.p7.problem" + i] || {}; });
      function snippet(t) { t = txt(t); return t ? " · \"" + (t.length > 70 ? t.slice(0, 70) + "…" : t) + "\"" : ""; }

      // ---- Uji 1: komersial (panduan; tanpa isian, mesin tidak bisa menilainya) ----
      [1, 2, 3].forEach(function (i) {
        var t = txt(probs[i - 1].text);
        out.push({
          key: "u1p" + i, group: "u1",
          label: "Masalah " + i + ": " + (t || "belum diisi, isi dulu di hlm. 7"),
          where: "S1 · hlm. 7 · dibaca penilai",
          state: "info"
        });
      });

      // ---- Uji 2: bukti ----
      out.push({
        key: "u2b8", group: "u2",
        label: "Kotak 8 · GAPS & RISKS di Brand Audit Canvas terisi",
        where: "S1 · hlm. 2",
        state: has(2) ? (txt(c["s1.p2.b8_gaps"]) ? "ok" : "no") : "pending"
      });
      var low = 0;
      if (!has(6)) {
        out.push({ key: "u2sc", group: "u2", label: "Enam skor 1–5, masing-masing dengan justifikasi satu baris", where: "S1 · hlm. 6", state: "pending" });
      } else {
        var filled = 0, justified = 0;
        DIMS.forEach(function (d) {
          var v = c["s1.p6." + d] || {};
          if (v.score) filled++;
          if (txt(v.justification)) justified++;
          if (v.score && v.score <= 2) low++;
        });
        out.push({ key: "u2sc", group: "u2", label: "Enam skor 1–5, masing-masing dengan justifikasi satu baris (" + Math.min(filled, justified) + "/6)", where: "S1 · hlm. 6", state: filled === 6 && justified === 6 ? "ok" : "no" });
      }
      if (!has(7)) {
        out.push({ key: "u2tr", group: "u2", label: "Tiap masalah tertaut ke kotak 8 atau ke skor 1–2", where: "S1 · hlm. 7 (atas)", state: "pending" });
      } else {
        var valid = function (id) {
          if (id === "s1.p2.b8_gaps") return !!txt(c["s1.p2.b8_gaps"]);
          var v = c[id]; return !!(v && v.score && v.score <= 2);
        };
        var traced = probs.filter(function (p) { return txt(p.text) && (p.trace || []).some(valid); }).length;
        out.push({ key: "u2tr", group: "u2", label: "Tiap masalah tertaut ke kotak 8 atau ke skor 1–2 (" + traced + "/3). Tautkan lewat centang sumber di bawah tiap masalah.", where: "S1 · hlm. 7 (atas)", state: traced === 3 ? "ok" : "no" });
      }
      if (has(6)) {
        out.push({ key: "u2lo", group: "u2", label: "Skor 1 atau 2 di hlm. 6: " + low + ". Tidak wajib. Kalau tidak ada, tautkan masalahmu ke kotak 8.", where: "S1 · hlm. 6", state: "info" });
      }

      // ---- Uji 3: masalah, bukan solusi ----
      if (!has(7)) {
        out.push({ key: "u3w", group: "u3", label: "Tiga masalah terisi", where: "S1 · hlm. 7 (atas)", state: "pending" });
        out.push({ key: "u3s", group: "u3", label: "Tidak ada masalah yang terdengar seperti solusi", where: "S1 · hlm. 7 (atas)", state: "pending" });
      } else {
        var written = probs.filter(function (p) { return txt(p.text); }).length;
        out.push({ key: "u3w", group: "u3", label: "Tiga masalah terisi (" + written + "/3)", where: "S1 · hlm. 7 (atas)", state: written === 3 ? "ok" : "no" });
        var sol = probs.filter(function (p) { return soundsLikeSolution(txt(p.text)); }).length;
        out.push({
          key: "u3s", group: "u3",
          label: sol ? sol + " masalah mungkin terdengar seperti solusi (\"kami akan…\", \"turunkan…\"). Cek lagi: tulis sebagai hal yang belum kamu ketahui." : "Tidak ada masalah yang terdengar seperti solusi",
          where: "S1 · hlm. 7 (atas)",
          state: sol ? "warn" : (written ? "ok" : "pending")
        });
      }

      // ---- Di luar Gate 1 ----
      var dl = ((c["s1.p8.log"] || {}).items || []).filter(function (x) { return txt(x.decided); }).length;
      out.push({
        key: "xdl", group: "x",
        label: "Decision Log S1 (hlm. 8): " + dl + " keputusan." + (dl ? "" : " Isi di akhir Sesi 1, setelah halaman 2–7 selesai.") + " Keempat contoh kasus masing-masing berisi tiga.",
        where: "S1 · hlm. 8", state: "info"
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

/* ---------- S3: cek kelengkapan mengikuti TIGA TES Gate 2 (silabus §13); bukan penilaian, bukan status ---------- */
(function () {
  "use strict";
  var CB = window.CB;
  function txt(v) { return typeof v === "string" ? v.trim() : ""; }
  var REFUSE = /\b(refuse|refuses|refusal|menolak|tolak|penolakan|tidak akan|won't|will not|never)\b/i;

  CB.checkIntro = CB.checkIntro || {};
  CB.checkIntro.S3 = "Gate 2 dibaca dari dokumenmu lewat <b>tiga tes</b>: Evidence, Positioning, Platform. Daftar di bawah mengikuti tiga tes itu. App hanya memeriksa apa yang bisa diperiksa mesin (terisi, berjejak, bukti bernama, berstatus); isi dan kekuatannya dibaca penilai. Form penilai hlm. 7 ikut dihitung di Tes 2: jumlah penilai, kriteria rendah (rata-rata 2 atau lebih rendah), dan rencana untuk kriteria rendah. Gate 2 dibaca <b>per file</b>: versimu sendiri sah dikumpulkan walau belum sempat sync dengan tim.";
  CB.checkGroups = CB.checkGroups || {};
  CB.checkGroups.S3 = {
    e: { title: "Tes 1 · Evidence (dibawa dari Sesi 2, informasi)", help: "Gate 2 meminta minimal dua jenis bukti dari daftar silabus §7 (lima wawancara = satu jenis), dan minimal satu bukti dari audiens utama di luar tim. Angka di bawah dibaca dari halaman Sesi 2-mu; app tidak menilainya. Bukti baru? Tambahkan di Sesi 2." },
    p: { title: "Tes 2 · Positioning (hlm. 2, 3, 7)", help: "Lolos kalau setiap bagian kalimat bisa ditunjuk asalnya, ada satu bagian yang tidak bisa diklaim pesaing, dan dua kriteria rendah atau lebih di form penilai masing-masing punya rencana." },
    f: { title: "Tes 3 · Platform (hlm. 4–6)", help: "Lolos kalau dua kotak acak nyambung, setiap janji punya bukti atau sudah dikecilkan, dan setiap pilar Message House bisa ditunjuk asal dan baris buktinya." }
  };
  function words(t) { return (t || "").toLowerCase().split(/[^a-z0-9À-ɏ]+/).filter(function (w) { return w.length >= 4; }); }

  CB.checks.S3 = function (data) {
    var all = data.sessions || {};
    var c = (all.S3 || {}).current || {};
    var s2 = (all.S2 || {}).current || {};
    var out = [];

    /* Tes 1 · Evidence */
    var iv = (s2["s2.p9.interviews"] || {}).items || [];
    var outsideIv = iv.filter(function (x) { return x.outside === "Ya" && txt(x.notes); });
    var outside = outsideIv.length;
    var kinds = {};
    ((s2["s2.p2.fact"] || {}).items || []).forEach(function (f) { if (txt(f.text) && f.kind) kinds[f.kind] = 1; });
    if (outside) kinds["Audience interviews"] = 1;
    var nk = Object.keys(kinds).length;
    out.push({ group: "e", key: "e1", label: "Jenis bukti di FACT Sesi 2: " + nk + (nk ? " (" + Object.keys(kinds).join(", ") + ")" : "") + ". Gate 2 meminta minimal dua.", where: "S2 · hlm. 2 dan 9", state: nk >= 2 ? "info" : "warn" });
    out.push({ group: "e", key: "e2", label: "Wawancara di luar tim yang bercatatan: " + outside + ". Gate 2: minimal 1 dari audiens utama di luar tim. Silabus menganjurkan 5.", where: "S2 · hlm. 9", state: outside >= 1 ? "info" : "warn" });
    var prim = txt(s2["s2.p4.primary"]);
    out.push({ group: "e", key: "e3", label: prim ? "PRIMARY AUDIENCE tertulis di Sesi 2, jadi segmen di kalimat positioning punya sumber." : "PRIMARY AUDIENCE di Sesi 2 masih kosong; blank [segment] di hlm. 2 belum punya sumber.", where: "S2 · hlm. 4", state: prim ? "info" : "no" });
    var pw = words(prim);
    var match = outsideIv.filter(function (x) { var sw = words(x.segment); return sw.some(function (w) { return pw.indexOf(w) >= 0; }); }).length;
    out.push({ group: "e", key: "e4", label: !outside ? "Belum ada wawancara di luar tim, jadi belum ada bukti dari audiens utama di luar tim." :
      (match ? match + " wawancara di luar tim menulis segmen yang mirip PRIMARY AUDIENCE (pencocokan kata, bukan penilaian)." : "Tidak ada wawancara di luar tim yang kolom segmennya mirip PRIMARY AUDIENCE secara kata. Kalau isinya memang audiens utama, samakan penulisannya; kalau bukan, Gate 2 belum punya bukti dari audiens utama."),
      where: "S2 · hlm. 4 dan 9", state: !outside ? "warn" : "info" });

    /* Tes 2 · Positioning */
    var d = c["s3.p2.draft"] || {};
    var blanks = ["segment", "insight", "name", "category", "benefit", "proof"];
    var bn = blanks.filter(function (k) { return txt(d[k]); }).length;
    out.push({ group: "p", key: "p1", label: "Draf keenam blank kalimat positioning terisi (" + bn + "/6)", where: "S3 · hlm. 2", state: bn === 6 ? "ok" : "no" });
    var src = c["s3.p2.sources"] || {};
    var traced = ["segment", "insight", "category", "benefit", "proof"];
    var noSrc = traced.filter(function (k) { var x = src[k] || {}; return !x.src || (x.src === "other" && !txt(x.note)); });
    out.push({ group: "p", key: "p7", label: noSrc.length ? "Jejak sumber: " + noSrc.length + " dari 5 blank belum punya sumber (" + noSrc.map(function (k) { return "[" + k + "]"; }).join(", ") + ")." : "Kelima blank punya sumber yang ditunjuk.", where: "S3 · hlm. 2", state: noSrc.length ? "warn" : "ok" });
    out.push({ group: "p", key: "p2", label: "OUR STATEMENT (YOUR VERSION → SYNCED) ditulis (versimu, atau kalimat tim setelah sync)", where: "S3 · hlm. 2", state: txt(c["s3.p2.final"]) ? "ok" : "no" });
    out.push({ group: "p", key: "p3", label: "THE TEST dijawab: satu hal di kalimatmu yang pesaing tidak bisa klaim", where: "S3 · hlm. 2", state: txt(c["s3.p2.test"]) ? "ok" : "no" });
    var fin = txt(c["s3.p2.final"]);
    var marked = /PLANNED|UNKNOWN/.test(fin + " " + (d.proof || ""));
    out.push({ group: "p", key: "p4", label: marked ? "Ada bukti yang ditandai PLANNED atau UNKNOWN di dalam kalimat (jujur, bukan kekurangan)" : "Tidak ada tanda PLANNED atau UNKNOWN. Kalau semua bukti sudah ada hari ini, itu baik. Kalau ada yang masih rencana, tandai di kalimat.", where: "S3 · hlm. 2", state: fin ? (marked ? "info" : "warn") : "pending" });
    var par = txt(c["s3.p3.parity"]), dif = txt(c["s3.p3.difference"]);
    out.push({ group: "p", key: "p5", label: "Kolom parity terisi (jangan dikosongkan)", where: "S3 · hlm. 3", state: par ? "ok" : "no" });
    out.push({ group: "p", key: "p6", label: "Kolom difference terisi", where: "S3 · hlm. 3", state: dif ? "ok" : "no" });
    var rf = CB.findField("s3.p7.reviews") || { criteria: [] };
    var rv = c["s3.p7.reviews"];
    var sum = CB.peerSummary ? CB.peerSummary(rv, rf.criteria) : { n: 0, items: [], low: [], avg: {} };
    var own = data.identifier && data.identifier.nim;
    var issues = sum.items.filter(function (it) { return CB.reviewIssues(it, rf.criteria, own).length; }).length;
    out.push({ group: "p", key: "p8", label: "Penilai teman yang memberi skor: " + sum.n + " (minimal 2 dari kelompok lain)" + (issues ? "; " + issues + " form masih perlu dicek (identitas, skor tanpa alasan, atau kelima skor 5)." : "."), where: "S3 · hlm. 7", state: sum.n >= 2 && !issues ? "ok" : (sum.n ? "warn" : "no") });
    var plans = c["s3.p7.plans"] || {};
    var lowLab = sum.low.map(function (k) { return (rf.criteria.filter(function (x) { return x.k === k; })[0] || {}).label || k; });
    var noPlan = sum.low.filter(function (k) { var x = plans[k] || {}; return !(txt(x.what) && txt(x.who) && txt(x.when)); });
    out.push({ group: "p", key: "p9", label: !sum.n ? "Kriteria rendah dan rencana: menunggu skor penilai." :
      sum.low.length >= 2 ? sum.low.length + " kriteria rendah (" + lowLab.join(", ") + "). " + (noPlan.length ? noPlan.length + " belum punya rencana lengkap (apa, siapa, kapan)." : "Semuanya punya rencana lengkap.") :
      sum.low.length === 1 ? "Satu kriteria rendah (" + lowLab[0] + "): sebaiknya diperbaiki; rencana tidak wajib." : "Tidak ada kriteria dengan rata-rata 2 atau lebih rendah.",
      where: "S3 · hlm. 7", state: !sum.n ? "pending" : sum.low.length >= 2 ? (noPlan.length ? "no" : "ok") : "info" });

    /* Tes 3 · Platform */
    var boxes = ["purpose", "vision", "mission", "values", "essence", "promise", "personality", "rtb"];
    var bf = boxes.filter(function (k) { return txt(c["s3.p4." + k]); }).length;
    out.push({ group: "f", key: "f1", label: "Delapan kotak Brand Platform Canvas terisi (" + bf + "/8)", where: "S3 · hlm. 4", state: bf === 8 ? "ok" : "no" });
    var pur = txt(c["s3.p4.purpose"]);
    out.push({ group: "f", key: "f2", label: pur ? (REFUSE.test(pur) ? "PURPOSE menyebut hal yang ditolak. Cek sendiri: apakah penolakan itu menggoda, tersedia, dan menguntungkan untuk dilepas?" : "PURPOSE belum menyebut hal yang ditolak. Tanya: what does this purpose make you REFUSE to do?") : "PURPOSE masih kosong", where: "S3 · hlm. 4", state: pur ? (REFUSE.test(pur) ? "warn" : "no") : "pending" });
    var sl = c["s3.p5.sliders"] || {};
    var keys = ["playful_serious", "mass_niche", "warm_cool", "bold_safe", "modern_classic"];
    var wp = c["s3.p5.why_placed"];
    var lines = typeof wp === "string" ? {} : (wp || {});
    var sn = keys.filter(function (k) { return typeof sl[k] === "number"; }).length;
    var mid = keys.filter(function (k) { return typeof sl[k] === "number" && sl[k] >= 0.45 && sl[k] <= 0.55; });
    var midNoWhy = mid.filter(function (k) { return !txt(lines[k]); }).length;
    out.push({ group: "f", key: "f3", label: "Kelima slider dipilih (" + sn + "/5)" + (mid.length ? "; " + mid.length + " dekat tengah" + (midNoWhy ? ", " + midNoWhy + " di antaranya belum diberi alasan. Tulis kenapa belum diputuskan" : ", semuanya diberi alasan") : ""), where: "S3 · hlm. 5", state: sn === 5 ? (midNoWhy ? "warn" : "ok") : "no" });
    var ln = keys.filter(function (k) { return txt(lines[k]); }).length;
    var legacy = typeof wp === "string" ? txt(wp) : txt(lines._legacy);
    out.push({ group: "f", key: "f4", label: "WHY WE PLACED IT THERE: " + ln + "/5 baris terisi" + (legacy && ln < 5 ? " (ada isian lama satu kotak; pindahkan ke baris per slider)" : ""), where: "S3 · hlm. 5", state: ln === 5 ? "ok" : (ln || legacy ? "warn" : "no") });
    var pp = ((c["s3.p5.promise_proof"] || {}).items || []).filter(function (x) { return txt(x.promise); });
    var noStatus = pp.filter(function (x) { return !x.status; }).length;
    var nyataNoProof = pp.filter(function (x) { return x.status === "nyata" && !txt(x.proof); }).length;
    var planBad = pp.filter(function (x) { return x.status === "planned" && !(txt(x.owner) && txt(x.deadline)); }).length;
    var unkBad = pp.filter(function (x) { return x.status === "unknown" && !txt(x.shrunk); }).length;
    var probs = [];
    if (noStatus) probs.push(noStatus + " tanpa status");
    if (nyataNoProof) probs.push(nyataNoProof + " berstatus nyata tapi buktinya belum ditulis");
    if (planBad) probs.push(planBad + " PLANNED tanpa owner atau deadline");
    if (unkBad) probs.push(unkBad + " UNKNOWN tanpa janji yang dikecilkan");
    out.push({ group: "f", key: "f5", label: !pp.length ? "PROMISE → PROOF masih kosong" : pp.length + " janji didaftar" + (probs.length ? ": " + probs.join(", ") + "." : "; semuanya punya bukti atau sudah dikecilkan."), where: "S3 · hlm. 5", state: !pp.length ? "no" : (probs.length ? "warn" : "ok") });
    var house = ["roof", "pillar1", "pillar2", "pillar3", "proof1", "proof2", "proof3", "cta"].filter(function (k) { return txt(c["s3.p6." + k]); }).length;
    out.push({ group: "f", key: "f6", label: "Message House terisi (" + house + "/8: atap, tiga pilar, tiga proof point, CTA)", where: "S3 · hlm. 6", state: house === 8 ? "ok" : "no" });
    var org = c["s3.p6.origins"] || {};
    var ppIds = ((c["s3.p5.promise_proof"] || {}).items || []).map(function (x) { return x.id; });
    var pillBad = ["pillar1", "pillar2", "pillar3"].filter(function (k) { var x = org[k] || {}; return !x.source || !x.proof_ref || ppIds.indexOf(x.proof_ref) < 0; });
    out.push({ group: "f", key: "f7", label: pillBad.length ? pillBad.length + " dari 3 pilar belum punya asal atau baris bukti di tabel janji dan bukti (" + pillBad.map(function (k) { return k.replace("pillar", "PILLAR "); }).join(", ") + ")." : "Ketiga pilar punya asal dan baris bukti di tabel janji dan bukti.", where: "S3 · hlm. 6", state: pillBad.length ? "warn" : "ok" });
    return out;
  };
})();

/* ---------- S4: cek kelengkapan mengikuti TIGA TES Gate 3 (silabus §13; Bedah S4 v2, Mekanisme Gate 3); bukan penilaian, bukan status ---------- */
(function () {
  "use strict";
  var CB = window.CB;
  function txt(v) { return typeof v === "string" ? v.trim() : ""; }
  var SRC = { djki: "DJKI DATABASE", web: "GOOGLE & WEB", appstores: "APP STORES", handles: "SOCIAL HANDLES & DOMAIN", languages: "MEANING IN OTHER LANGUAGES" };
  var DIMS = [["meaningful", "MEANINGFUL"], ["distinctive", "DISTINCTIVE & FINDABLE"], ["pronounceable", "PRONOUNCEABLE"], ["protectable", "PROTECTABLE"], ["growth", "ROOM TO GROW"]];
  var CHANNELS = [["visual", "VISUAL"], ["verbal", "VERBAL"], ["sonic", "SONIC"], ["motion", "MOTION"], ["spatial", "SPATIAL"], ["interactive", "INTERACTIVE"]];

  CB.checkIntro = CB.checkIntro || {};
  CB.checkIntro.S4 = "Gate 3 dibaca dari dokumenmu lewat <b>tiga tes</b>: Brand architecture (hlm. 2), Naming direction (hlm. 3–4), Identity brief (hlm. 5–9). Daftar di bawah mengikuti tiga tes itu. App hanya memeriksa apa yang bisa diperiksa mesin (terisi, berpemilik, berstatus, berjumlah); koherensi dan isinya dibaca penilai. UNKNOWN yang punya owner, waktu, dan uji penutupan tidak menggagalkan tes. Kondisi Gate 2 yang masih terbuka ikut terbawa ke Gate 3; app tidak bisa melihatnya.";
  CB.checkGroups = CB.checkGroups || {};
  CB.checkGroups.S4 = {
    a: { title: "Tes 1 · Brand architecture (hlm. 2)", help: "Lolos kalau model ditulis dalam satu kalimat, garis punya alasan kepercayaan atau kerusakan, dan sisi OUT menyebut nama yang konkret." },
    n: { title: "Tes 2 · Naming direction (hlm. 3–4)", help: "Lolos kalau lima kriteria dinilai dengan alasan, setiap skor 1–2 punya mitigasi yang bisa dianggarkan, kelas yang dicek disebut, dan setiap UNKNOWN atau TAKEN punya owner, waktu, dan uji penutupan." },
    b: { title: "Tes 3 · Identity brief (hlm. 5–9)", help: "Lolos kalau delapan bagian brief terisi dengan satu baris ditolak dan ditulis ulang, kode maksimal lima dengan pemilik, enam kanal terisi atau beralasan, minimal satu touchpoint dibuat orang luar, dan 5–7 kriteria biner." }
  };

  CB.checks.S4 = function (data) {
    var c = (((data.sessions || {}).S4) || {}).current || {};
    var out = [];

    /* Tes 1 · Architecture */
    var basic = ["parent", "product", "subnames"].filter(function (k) { return txt(c["s4.p2." + k]); }).length;
    out.push({ group: "a", key: "a1", label: "Parent, product, dan sub-nama terisi (" + basic + "/3). Sub-nama yang belum diputuskan ditulis UNKNOWN.", where: "S4 · hlm. 2", state: basic === 3 ? "ok" : "no" });
    var mw = c["s4.p2.model_why"] || {};
    out.push({ group: "a", key: "a2", label: c["s4.p2.model"] ? "Model dipilih" + (txt(mw.because) ? " dan kalimat \"because\" ditulis." : "; kalimat \"We are a … because …\" belum ditulis.") : "Model belum dipilih.", where: "S4 · hlm. 2", state: c["s4.p2.model"] && txt(mw.because) ? "ok" : "no" });
    var fl = c["s4.p2.flows"] || {};
    out.push({ group: "a", key: "a3", label: "WHAT FLOWS IN / OUT: IN " + (txt(fl.in) ? "terisi" : "kosong") + ", OUT " + (txt(fl.out) ? "terisi" : "kosong") + ". Cek sendiri: apakah OUT menyebut nama konkret yang ikut rusak?", where: "S4 · hlm. 2", state: txt(fl.in) && txt(fl.out) ? "warn" : "no" });

    /* Tes 2 · Naming */
    var scored = DIMS.filter(function (d) { var v = c["s4.p3." + d[0]] || {}; return v.score; });
    var noWhy = scored.filter(function (d) { return !txt((c["s4.p3." + d[0]] || {}).justification); });
    out.push({ group: "n", key: "n1", label: "Skor terisi " + scored.length + "/5" + (noWhy.length ? "; " + noWhy.length + " tanpa alasan (" + noWhy.map(function (d) { return d[1]; }).join(", ") + ")." : (scored.length ? ", semuanya beralasan." : ".")), where: "S4 · hlm. 3", state: scored.length === 5 && !noWhy.length ? "ok" : "no" });
    var low = scored.filter(function (d) { return (c["s4.p3." + d[0]] || {}).score <= 2; });
    var mit = txt(c["s4.p3.mitigation"]);
    out.push({ group: "n", key: "n2", label: !scored.length ? "Skor rendah dan mitigasi: menunggu skor." :
      low.length ? low.length + " skor 1–2 (" + low.map(function (d) { return d[1]; }).join(", ") + "). " + (mit ? "Kotak mitigasi terisi; cek sendiri bahwa setiap skor rendah punya tindakan yang bisa dianggarkan." : "Kotak mitigasi masih kosong.") :
      "Tidak ada skor 1–2. Kalau semua skormu 4–5, bandingkan dengan satu nama pesaing: kamu menilai atau membela?",
      where: "S4 · hlm. 3", state: !scored.length ? "pending" : low.length ? (mit ? "warn" : "no") : "info" });
    var st = Object.keys(SRC).map(function (k) { return [k, (c["s4.p4." + k] || {}).status]; });
    var noSt = st.filter(function (x) { return !x[1]; });
    out.push({ group: "n", key: "n3", label: noSt.length ? noSt.length + " dari 5 sumber trademark belum diberi status (" + noSt.map(function (x) { return SRC[x[0]]; }).join(", ") + ")." : "Kelima sumber trademark punya status CLEAR, TAKEN, atau UNKNOWN.", where: "S4 · hlm. 4", state: noSt.length ? "no" : "ok" });
    var djn = txt((c["s4.p4.djki"] || {}).note);
    out.push({ group: "n", key: "n4", label: djn ? (/\b(class|kelas)\b|\b\d{1,2}\b/i.test(djn) ? "Catatan DJKI menyebut kelas yang dicek." : "Catatan DJKI belum menyebut kelas yang dicek. CLEAR di satu kelas bukan pernyataan global.") : "Catatan DJKI masih kosong: tulis apa yang dicari, di kelas apa, dan hasilnya.", where: "S4 · hlm. 4", state: djn && /\b(class|kelas)\b|\b\d{1,2}\b/i.test(djn) ? "ok" : "warn" });
    var acts = ((c["s4.p4.actions"] || {}).items || []);
    var open = st.filter(function (x) { return x[1] === "taken" || x[1] === "unknown"; });
    var noAct = open.filter(function (x) { return !acts.some(function (a) { return a.source === x[0] && txt(a.action); }); });
    var incomplete = acts.filter(function (a) { return txt(a.action) && !(txt(a.owner) && txt(a.when) && txt(a.closed)); }).length;
    out.push({ group: "n", key: "n5", label: !open.length ? "Tidak ada sumber TAKEN atau UNKNOWN, jadi tidak ada tindakan wajib." :
      open.length + " sumber TAKEN/UNKNOWN. " + (noAct.length ? noAct.length + " belum punya baris tindakan (" + noAct.map(function (x) { return SRC[x[0]]; }).join(", ") + ")." : "Semuanya punya baris tindakan.") + (incomplete ? " " + incomplete + " tindakan belum lengkap (owner, kapan, uji penutupan)." : ""),
      where: "S4 · hlm. 4", state: !open.length ? (noSt.length ? "pending" : "info") : (noAct.length || incomplete ? "no" : "ok") });

    /* Tes 3 · Identity brief */
    var bk = ["objective", "audience", "positioning", "tone", "mandatory", "prohibited", "accessibility"];
    var bn = bk.filter(function (k) { return txt(c["s4.p5." + k]); }).length;
    var rj = c["s4.p5.rejected"] || {};
    var rjOk = txt(rj.rejected) && txt(rj.rewritten);
    out.push({ group: "b", key: "b1", label: "Brief: " + (bn + (rjOk ? 1 : 0)) + "/8 bagian terisi" + (rjOk ? "" : "; REJECTED → REWROTE butuh kedua sisi (versi yang ditolak dan versi persyaratannya)") + ".", where: "S4 · hlm. 5", state: bn === 7 && rjOk ? "ok" : "no" });
    var s3pos = txt((((data.sessions || {}).S3) || {}).current && data.sessions.S3.current["s3.p2.final"]);
    var pos = txt(c["s4.p5.positioning"]);
    out.push({ group: "b", key: "b2", label: !pos ? "POSITIONING TO EXPRESS masih kosong." : (s3pos && pos.indexOf(s3pos) >= 0 ? "POSITIONING TO EXPRESS memuat kalimat Sesi 3 persis." : "POSITIONING TO EXPRESS tidak memuat kalimat Sesi 3 persis. Kutip, jangan parafrase (atau perbarui kalimat Sesi 3 bila memang sudah berubah)."), where: "S4 · hlm. 5", state: !pos ? "no" : (s3pos && pos.indexOf(s3pos) >= 0 ? "ok" : "warn") });
    var cd = ["have", "need", "owners", "nologo"].filter(function (k) { return txt(c["s4.p6." + k]); }).length;
    out.push({ group: "b", key: "b3", label: "Brand Codes Inventory: " + cd + "/4 kotak terisi. Cek sendiri: paling banyak lima kode, masing-masing dengan pemilik.", where: "S4 · hlm. 6", state: cd === 4 ? "warn" : "no" });
    var chBad = [], chNone = [];
    CHANNELS.forEach(function (x) {
      var v = c["s4.p7." + x[0]] || {};
      if (!v.status) { chNone.push(x[1]); return; }
      if (v.status === "not_needed" ? !txt(v.note) : !txt(v.who)) chBad.push(x[1]);
    });
    out.push({ group: "b", key: "b4", label: (chNone.length ? chNone.length + " kanal belum dipilih (" + chNone.join(", ") + "). " : "Keenam kanal dipilih. ") + (chBad.length ? chBad.length + " belum lengkap: kanal yang dibutuhkan butuh \"who\", kanal \"not needed\" butuh alasan (" + chBad.join(", ") + ")." : ""), where: "S4 · hlm. 7", state: chNone.length || chBad.length ? "no" : "ok" });
    var mx = c["s4.p8.matrix"] || {}, rows = mx.rows || {};
    var tp = ["product", "campaign", "platform", "event", "packaging", "community"];
    var tpFull = tp.filter(function (k) { var r = rows[k] || {}; return txt(r.how) && txt(r.who); }).length;
    out.push({ group: "b", key: "b5", label: "Touchpoint Consistency Matrix: " + tpFull + "/6 baris punya isi dan penanggung jawab. Cek sendiri: minimal satu baris dibuat belakangan oleh orang di luar tim.", where: "S4 · hlm. 8", state: tpFull === 6 ? "warn" : "no" });
    var cr = ((c["s4.p9.criteria"] || {}).items || []).filter(function (x) { return txt(x.q); });
    var crBad = cr.filter(function (x) { return !x.test || !x.answer || !x.pass_on; }).length;
    var tests = {}; cr.forEach(function (x) { if (x.test) tests[x.test] = 1; });
    out.push({ group: "b", key: "b6", label: cr.length + " kriteria ditulis (5–7)" + (crBad ? "; " + crBad + " belum lengkap (tes, jawaban yang lolos, atau jawaban hari ini)." : "."), where: "S4 · hlm. 9", state: cr.length >= 5 && cr.length <= 7 && !crBad ? "ok" : "no" });
    if (cr.length) {
      var allPass = cr.every(function (x) { return x.answer && x.answer === x.pass_on; });
      out.push({ group: "b", key: "b7", label: allPass ? "Semua kriteria terjawab lolos. Checklist yang semuanya lolos biasanya ditulis setelah karyanya jadi: yang belum bisa dicek tulis UNKNOWN." : "Ada kriteria yang belum lolos atau masih UNKNOWN (jujur, bukan kekurangan).", where: "S4 · hlm. 9", state: allPass ? "warn" : "info" });
      out.push({ group: "b", key: "b8", label: "Tes yang diuji kriteria: " + (Object.keys(tests).join(", ") || "belum ada") + "." + (tests.architecture ? "" : " Belum ada kriteria arsitektur; satu kriteria arsitektur membuat Tes 1 bisa diperiksa."), where: "S4 · hlm. 9", state: "info" });
    }
    return out;
  };
})();
