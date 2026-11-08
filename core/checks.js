/* core/checks.js — "Cek kelengkapan" (rule-based, bukan penilaian).
 * Mesin ini TIDAK memakai kata status Gate dan, sejak v0.5.0 (dokumen 64, 5 Nov 2026), TIDAK menyebut kata Gate sama sekali.
 * Yang dihitung HANYA hal inti sesi (sessions/sN.js → core.items). Setiap baris membawa group = kunci hal inti (i1…i9);
 * bagian yang boleh dilewati tidak punya baris, jadi tidak pernah muncul sebagai "kurang".
 * Status baris:
 *   ok      = terpenuhi
 *   no      = belum terpenuhi
 *   warn    = perlu kamu cek sendiri (tetap dihitung terisi di panel Hal inti)
 *   pending = halaman belum tersedia / belum diisi sama sekali
 *   info    = informasi, tidak ikut hitungan
 * Kontrak v3.7. */
(function () {
  "use strict";
  var CB = window.CB;

  function txt(v) { return typeof v === "string" ? v.trim() : ""; }
  // Frasa tindakan yang hampir pasti solusi, di mana saja dalam kalimat.
  var STRONG = /\b(we will|we'll|we are going to|we should|kami akan|kita akan|akan kami|kami harus|kita harus)\b/i;
  // Kata kerja tindakan hanya dihitung bila membuka kalimat ("Lower the price"), bukan di tengah ("a new build").
  var STARTS = /^\s*(lower|raise|build|launch|redesign|create|menurunkan|menaikkan|membangun|meluncurkan|turunkan|naikkan|bangun|luncurkan)\b/i;
  function soundsLikeSolution(t) { return STRONG.test(t) || STARTS.test(t); }

  CB.checkIntro = {};
  CB.checkGroups = {
    S1: { i1: { title: "1 · Masalah komersial utama (cukup satu)", help: "Satu masalah saja sudah cukup. Tulis sebagai hal yang belum kamu ketahui atau belum terbukti, bukan sebagai tindakan. Baris di bawah hanya memeriksa terisi dan nada kalimat; isinya dibaca penilai." } }
  };

  CB.checks = {
    S1: function (data, built) {
      var c = ((data.sessions && data.sessions.S1) || { current: {} }).current || {};
      var out = [];
      var has = built.indexOf(7) >= 0;
      var p1 = c["s1.p7.problem1"] || {};
      var t = txt(p1.text);
      out.push({
        key: "i1w", group: "i1",
        label: has ? "Masalah 1 terisi" + (t ? ": \"" + (t.length > 70 ? t.slice(0, 70) + "…" : t) + "\"" : ". Isi di hlm. 7 (atas).") : "Masalah 1 terisi",
        where: "S1 · hlm. 7 (atas)",
        state: has ? (t ? "ok" : "no") : "pending"
      });
      var sol = soundsLikeSolution(t);
      out.push({
        key: "i1s", group: "i1",
        label: sol ? "Masalah 1 mungkin terdengar seperti solusi (\"kami akan…\", \"turunkan…\"). Cek lagi: tulis sebagai hal yang belum kamu ketahui." : "Masalah 1 tidak terdengar seperti solusi",
        where: "S1 · hlm. 7 (atas)",
        state: t ? (sol ? "warn" : "ok") : "pending"
      });
      out.push({
        key: "i1k", group: "i1",
        label: "Tanya dirimu: kalau masalah ini selesai, apa yang berubah dalam keputusan orang membayar atau memilih? Kalau jawabannya hanya tampilan yang lebih bagus, tulis ulang. Tidak ada kotak isian; penilai membaca kalimatmu.",
        where: "S1 · hlm. 7 (atas) · dibaca penilai", state: "info"
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

/* ---------- S2: hal inti 2, 3, 4 ---------- */
(function () {
  "use strict";
  var CB = window.CB;
  function txt(v) { return typeof v === "string" ? v.trim() : ""; }
  CB.checkGroups.S2 = {
    i2: { title: "2 · Audiens utama", help: "Satu segmen utama, ditulis dengan jelas." },
    i3: { title: "3 · Insight dan kebutuhan", help: "Value Proposition Canvas, kalimat insight, dan asal BUT-nya." },
    i4: { title: "4 · Kompetitor", help: "Competitor Benchmark Matrix: nama brand nyata di setiap kolom. UNKNOWN boleh, kosong tidak." }
  };
  CB.checks.S2 = function (data) {
    var c = ((data.sessions && data.sessions.S2) || {}).current || {};
    var out = [];
    out.push({ key: "i2a", group: "i2", label: "PRIMARY AUDIENCE ditulis", where: "S2 · hlm. 4", state: txt(c["s2.p4.primary"]) ? "ok" : "no" });
    var vpc = ["jobs", "pains", "gains", "products_services", "pain_relievers", "gain_creators"].filter(function (k) { return txt(c["s2.p5." + k]); }).length;
    out.push({ key: "i3a", group: "i3", label: "Enam kotak Value Proposition Canvas terisi (" + vpc + "/6)", where: "S2 · hlm. 5", state: vpc === 6 ? "ok" : "no" });
    var ins = c["s2.p5.insight"] || {};
    var insOk = ["who", "motivation", "barrier", "opportunity"].every(function (k) { return txt(ins[k]); });
    out.push({ key: "i3b", group: "i3", label: "Insight sentence lengkap (Who · motivation · BUT · SO) dan sumber BUT dipilih", where: "S2 · hlm. 5", state: insOk && c["s2.p5.but_source"] ? "ok" : "no" });
    var m = (c["s2.p6.matrix"] || {}).rows || {};
    var who = m.who || {};
    var cols = ["us", "direct", "indirect", "substitute", "benchmark"];
    var named = cols.filter(function (k) { return txt(who[k]); }).length;
    out.push({ key: "i4a", group: "i4", label: "Baris \"Who exactly?\" terisi di kelima kolom (" + named + "/5; UNKNOWN boleh, kosong tidak)", where: "S2 · hlm. 6", state: named === 5 ? "ok" : "no" });
    return out;
  };
})();

/* ---------- S3: hal inti 5 (Positioning) dan 6 (Promise → Proof) ---------- */
(function () {
  "use strict";
  var CB = window.CB;
  function txt(v) { return typeof v === "string" ? v.trim() : ""; }

  CB.checkGroups.S3 = {
    i5: { title: "5 · Positioning (hlm. 2)", help: "Keenam blank terisi, setiap blank bisa ditunjuk asalnya, dan ada satu hal di kalimatmu yang tidak bisa diklaim pesaing." },
    i6: { title: "6 · Promise → Proof (hlm. 5, bagian bawah)", help: "Setiap janji punya bukti bernama, atau sudah dikecilkan. Janji tanpa bukti nyata ditandai PLANNED (dengan owner dan deadline) atau UNKNOWN (dengan janji yang dikecilkan)." }
  };

  CB.checks.S3 = function (data) {
    var all = data.sessions || {};
    var c = (all.S3 || {}).current || {};
    var out = [];

    /* hal inti 5 · Positioning */
    var d = c["s3.p2.draft"] || {};
    var blanks = ["segment", "insight", "name", "category", "benefit", "proof"];
    var bn = blanks.filter(function (k) { return txt(d[k]); }).length;
    out.push({ group: "i5", key: "p1", label: "Draf keenam blank kalimat positioning terisi (" + bn + "/6)", where: "S3 · hlm. 2", state: bn === 6 ? "ok" : "no" });
    var src = c["s3.p2.sources"] || {};
    var traced = ["segment", "insight", "category", "benefit", "proof"];
    var noSrc = traced.filter(function (k) { var x = src[k] || {}; return !x.src || (x.src === "other" && !txt(x.note)); });
    out.push({ group: "i5", key: "p7", label: noSrc.length ? "Jejak sumber: " + noSrc.length + " dari 5 blank belum punya sumber (" + noSrc.map(function (k) { return "[" + k + "]"; }).join(", ") + ")." : "Kelima blank punya sumber yang ditunjuk.", where: "S3 · hlm. 2", state: noSrc.length ? "warn" : "ok" });
    out.push({ group: "i5", key: "p2", label: "OUR STATEMENT (YOUR VERSION → SYNCED) ditulis (versimu, atau kalimat tim setelah sync)", where: "S3 · hlm. 2", state: txt(c["s3.p2.final"]) ? "ok" : "no" });
    out.push({ group: "i5", key: "p3", label: "THE TEST dijawab: satu hal di kalimatmu yang pesaing tidak bisa klaim", where: "S3 · hlm. 2", state: txt(c["s3.p2.test"]) ? "ok" : "no" });
    var fin = txt(c["s3.p2.final"]);
    var marked = /PLANNED|UNKNOWN/.test(fin + " " + (d.proof || ""));
    out.push({ group: "i5", key: "p4", label: marked ? "Ada bukti yang ditandai PLANNED atau UNKNOWN di dalam kalimat (jujur, bukan kekurangan)" : "Tidak ada tanda PLANNED atau UNKNOWN. Kalau semua bukti sudah ada hari ini, itu baik. Kalau ada yang masih rencana, tandai di kalimat.", where: "S3 · hlm. 2", state: fin ? (marked ? "info" : "warn") : "pending" });

    /* hal inti 6 · Promise → Proof */
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
    out.push({ group: "i6", key: "f5", label: !pp.length ? "PROMISE → PROOF masih kosong" : pp.length + " janji didaftar" + (probs.length ? ": " + probs.join(", ") + "." : "; semuanya punya bukti atau sudah dikecilkan."), where: "S3 · hlm. 5", state: !pp.length ? "no" : (probs.length ? "warn" : "ok") });
    return out;
  };
})();

/* ---------- S4: hal inti 7 (Touchpoint), 8 (Brand codes), 9 (Brief) ---------- */
(function () {
  "use strict";
  var CB = window.CB;
  function txt(v) { return typeof v === "string" ? v.trim() : ""; }

  CB.checkGroups.S4 = {
    i7: { title: "7 · Touchpoint (Everywhere) (hlm. 8)", help: "Enam baris touchpoint punya isi dan penanggung jawab, dan minimal satu baris dibuat orang di luar tim." },
    i8: { title: "8 · Brand codes (Like yourself) (hlm. 6)", help: "Paling banyak lima kode, masing-masing dengan pemilik, dan lolos tes tanpa logo." },
    i9: { title: "9 · Brief (Looking) (hlm. 5)", help: "Delapan bagian brief terisi, termasuk satu baris yang ditolak dan ditulis ulang, dan kalimat positioning dikutip persis dari Sesi 3." }
  };

  CB.checks.S4 = function (data) {
    var c = (((data.sessions || {}).S4) || {}).current || {};
    var out = [];

    /* hal inti 9 · Brief (hlm. 5) */
    var bk = ["objective", "audience", "positioning", "tone", "mandatory", "prohibited", "accessibility"];
    var bn = bk.filter(function (k) { return txt(c["s4.p5." + k]); }).length;
    var rj = c["s4.p5.rejected"] || {};
    var rjOk = txt(rj.rejected) && txt(rj.rewritten);
    out.push({ group: "i9", key: "b1", label: "Brief: " + (bn + (rjOk ? 1 : 0)) + "/8 bagian terisi" + (rjOk ? "" : "; REJECTED → REWROTE butuh kedua sisi (versi yang ditolak dan versi persyaratannya)") + ".", where: "S4 · hlm. 5", state: bn === 7 && rjOk ? "ok" : "no" });
    var s3pos = txt((((data.sessions || {}).S3) || {}).current && data.sessions.S3.current["s3.p2.final"]);
    var pos = txt(c["s4.p5.positioning"]);
    out.push({ group: "i9", key: "b2", label: !pos ? "POSITIONING TO EXPRESS masih kosong." : (s3pos && pos.indexOf(s3pos) >= 0 ? "POSITIONING TO EXPRESS memuat kalimat Sesi 3 persis." : "POSITIONING TO EXPRESS tidak memuat kalimat Sesi 3 persis. Kutip, jangan parafrase (atau perbarui kalimat Sesi 3 bila memang sudah berubah)."), where: "S4 · hlm. 5", state: !pos ? "no" : (s3pos && pos.indexOf(s3pos) >= 0 ? "ok" : "warn") });

    /* hal inti 8 · Brand codes (hlm. 6) */
    var cd = ["have", "need", "owners", "nologo"].filter(function (k) { return txt(c["s4.p6." + k]); }).length;
    out.push({ group: "i8", key: "b3", label: "Brand Codes Inventory: " + cd + "/4 kotak terisi. Cek sendiri: paling banyak lima kode, masing-masing dengan pemilik.", where: "S4 · hlm. 6", state: cd === 4 ? "warn" : "no" });

    /* hal inti 7 · Touchpoint (hlm. 8) */
    var mx = c["s4.p8.matrix"] || {}, rows = mx.rows || {};
    var tp = ["product", "campaign", "platform", "event", "packaging", "community"];
    var tpFull = tp.filter(function (k) { var r = rows[k] || {}; return txt(r.how) && txt(r.who); }).length;
    var outside = tp.filter(function (k) { return (rows[k] || {}).outside; }).length + (mx.extra || []).filter(function (x) { return x.outside && (txt(x.label) || txt(x.how)); }).length;
    out.push({ group: "i7", key: "b5", label: "Touchpoint Consistency Matrix: " + tpFull + "/6 baris punya isi dan penanggung jawab; " + (outside ? outside + " baris ditandai dibuat orang di luar tim." : "belum ada baris yang ditandai dibuat orang di luar tim (minimal satu)."), where: "S4 · hlm. 8", state: tpFull === 6 && outside >= 1 ? "ok" : "no" });
    return out;
  };
})();

/* ---------- status hal inti, dipakai panel sesi dan peta rantai di beranda (v0.6.0, doc 74) ---------- */
(function () {
  "use strict";
  var CB = window.CB;
  CB.CORE_TOTAL = 9;
  /* Satu hal inti terisi = baris cek kelompoknya tidak ada yang "no" atau "pending". "warn" tetap dihitung terisi. */
  CB.coreDone = function (rows, it) {
    var mine = rows.filter(function (r) { return r.group === it.k; });
    return mine.length > 0 && mine.every(function (r) { return r.state !== "no" && r.state !== "pending"; });
  };
  /* Rantai sembilan hal inti S1–S4 berurutan (n 1…9), hanya sesi yang dirilis (atau mode pratinjau). */
  CB.coreChain = function (data) {
    var out = [];
    ["S1", "S2", "S3", "S4"].forEach(function (sid) {
      var spec = (CB.specs || {})[sid], fn = CB.checks[sid];
      if (!spec || !spec.core || !fn || (CB.isReleased && !CB.isReleased(sid))) return;
      var rows = fn(data || CB.data, spec.pages.map(function (p) { return p.p; }));
      spec.core.items.forEach(function (it) {
        out.push({ sid: sid, n: it.n, k: it.k, chain: it.chain || it.label, label: it.label, page: it.page, where: it.where, done: CB.coreDone(rows, it) });
      });
    });
    return out.sort(function (a, b) { return a.n - b.n; });
  };
})();

