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

    /* doc 73 §8: AUDIENCE brief = audiens utama S2 (peringatan, tidak memblokir; doc 73 §1 aturan 4) */
    var s2aud = txt((((data.sessions || {}).S2) || {}).current && data.sessions.S2.current["s2.p4.primary"]);
    var aud = txt(c["s4.p5.audience"]);
    if (aud) out.push({ group: "i9", key: "b2a", label: s2aud && aud.indexOf(s2aud) >= 0 ? "AUDIENCE memuat audiens utama Sesi 2 persis." : "AUDIENCE tidak memuat audiens utama Sesi 2 persis. Salin dari panel atas, atau perbarui Sesi 2 bila memang berubah.", where: "S4 · hlm. 5", state: s2aud && aud.indexOf(s2aud) >= 0 ? "ok" : "warn" });

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

/* ---------- S5: hal inti 10 (Business Model Canvas), 11 (Pricing + survival line), 12 (Your three bets) ----------
 * doc 73 §1 aturan 4: input baru dihitung, tidak memblokir. Isian S1–S3 yang tampil di hlm. 2 hanya peringatan bila kosong
 * ("belum diisi" ≠ "tidak cocok"). Teks tanpa kata Gate (doc 64). */
(function () {
  "use strict";
  var CB = window.CB;
  function txt(v) { return typeof v === "string" ? v.trim() : ""; }
  function cur(data, sid) { return (((data.sessions || {})[sid]) || {}).current || {}; }
  function items(v) { return (v && Array.isArray(v.items)) ? v.items : []; }
  function t(x) { return String(x || "").trim(); }
  CB.checkGroups.S5 = {
    i10: { title: "10 · Business Model Canvas (page 2)", help: "Tujuh kotak ditulis; Customer Segments dan Value Propositions tampil dari Sesi 2 dan 3. Biaya ditandai GROWS atau tetap, satu PRIMARY, satu tabrakan, satu kalimat." },
    i11: { title: "11 · Pricing + survival line (page 4)", help: "Setiap angka punya origin. Satu kalimat ABOVE / AT / BELOW (atau NOT MONEY) dengan alasan dari positioning. Survival line ditulis walau GUESS." },
    i12: { title: "12 · Your three bets (page 8)", help: "Maksimal tiga baris. Baris 1 = taruhan yang bisa diuji ke orang sungguhan; ujinya lewat Concept Card di kelas. Minimal satu baris nama (kind legal; cek: satu orang, satu tanggal)." }
  };
  CB.checks.S5 = function (data) {
    var c = cur(data, "S5"), out = [];
    /* ---- i10 · page 2 (canvas) ---- */
    var boxes = ["kp", "ka", "kr", "cr", "ch"].filter(function (k) { return txt(c["s5.p2." + k]); }).length;
    var costs = items(c["s5.p2.cost"]).filter(function (it) { return t(it.cost); });
    var revs = items(c["s5.p2.rev"]).filter(function (it) { return t(it.stream); });
    var n7 = boxes + (costs.length ? 1 : 0) + (revs.length ? 1 : 0);
    out.push({ group: "i10", key: "c1", label: "Kanvas: " + n7 + "/7 kotak yang kamu tulis terisi (Key Partners, Key Activities, Key Resources, Customer Relationships, Channels, Cost Structure, Revenue Streams).", where: "S5 · hlm. 2", state: n7 === 7 ? "ok" : "no" });
    var up = [["s1.p7.problem1", "S1", "masalah utama Sesi 1"], ["s2.p4.primary", "S2", "audiens utama Sesi 2"], ["s3.p2.final", "S3", "positioning Sesi 3"]].filter(function (u) {
      var v = cur(data, u[1])[u[0]]; return !(typeof v === "string" ? v.trim() : (v && t(v.text)));
    });
    if (up.length) out.push({ group: "i10", key: "c2", label: "Belum tampil di kanvas: " + up.map(function (u) { return u[2]; }).join(", ") + ". Isi di halaman asalnya, atau impor file terakhirmu.", where: "S5 · hlm. 2", state: "warn" });
    var unmarked = costs.filter(function (it) { return !it.grows; }).length, grows = costs.filter(function (it) { return it.grows === "grows"; }).length;
    out.push({ group: "i10", key: "c3", label: !costs.length ? "Cost Structure masih kosong." : (unmarked ? unmarked + " biaya belum ditandai GROWS atau tetap." : "Cost Structure: " + costs.length + " biaya, " + grows + " ditandai GROWS."), where: "S5 · hlm. 2", state: costs.length && !unmarked ? "ok" : "no" });
    var prim = revs.filter(function (it) { return it.role === "primary"; }).length, unsure = txt(c["s5.p2.rev_unsure"]);
    out.push({ group: "i10", key: "c4", label: prim === 1 ? "Revenue Streams: satu PRIMARY." : prim > 1 ? "Revenue Streams: " + prim + " baris ditandai PRIMARY. Pilih satu; yang lain turunan." : unsure ? "Belum ada PRIMARY, dan kamu menulis apa yang perlu diketahui dulu (sah untuk minggu ini)." : "Revenue Streams belum punya PRIMARY. Tandai satu, atau tulis apa yang perlu kamu ketahui dulu.", where: "S5 · hlm. 2", state: prim === 1 || (prim === 0 && unsure && revs.length) ? "ok" : "no" });
    var cl = c["s5.p2.clash"] || {};
    out.push({ group: "i10", key: "c5", label: t(cl.clash) && t(cl.action) ? "Satu tabrakan ditulis, dengan yang akan kamu lakukan." : "Tabrakan: tulis kotak mana bertabrakan dan yang akan kamu lakukan (keduanya).", where: "S5 · hlm. 2", state: t(cl.clash) && t(cl.action) ? "ok" : "no" });
    out.push({ group: "i10", key: "c6", label: txt(c["s5.p2.sentence"]) ? "Kanvas dibaca sebagai satu kalimat." : "OUR CANVAS AS ONE SENTENCE masih kosong.", where: "S5 · hlm. 2", state: txt(c["s5.p2.sentence"]) ? "ok" : "no" });

    /* ---- i11 · page 4 (pricing) ---- */
    var rows = items(c["s5.p4.rows"]).filter(function (it) { return t(it.item) || t(it.figure) || t(it.reference); });
    var incomplete = rows.filter(function (it) {
      var base = t(it.item) && t(it.figure) && t(it.reference) && t(it.volume) && it.o_price && it.o_volume;
      var unk = (it.o_price === "unknown" || it.o_volume === "unknown") && !t(it.o_note);
      return !base || unk;
    }).length;
    out.push({ group: "i11", key: "d1", label: !rows.length ? "Belum ada baris harga. Satu baris per hal yang dibayar orang." : (incomplete ? incomplete + " dari " + rows.length + " baris belum lengkap (lima kolom + origin harga dan volume; UNKNOWN butuh tindakan, pemilik, kapan)." : rows.length + " baris harga, semua angka punya origin."), where: "S5 · hlm. 4", state: rows.length && !incomplete ? "ok" : "no" });
    if (rows.length && rows.every(function (it) { return it.o_price === "measured" && it.o_volume === "measured"; }))
      out.push({ group: "i11", key: "d2", label: "Semua origin MEASURED. Itu hampir selalu salah: cek lagi mana yang sebenarnya COMPARABLE atau GUESS.", where: "S5 · hlm. 4", state: "warn" });
    var ln = c["s5.p4.line"] || {};
    var lineOk = ln.status && t(ln.note) && (ln.status !== "not_money" || t(ln.gives));
    out.push({ group: "i11", key: "d3", label: lineOk ? "Harga terhadap reference: " + String(ln.status).replace("_", " ").toUpperCase() + ", dengan alasan." : !ln.status ? "Pilih ABOVE, AT, BELOW, atau NOT MONEY, lalu tulis alasannya." : (ln.status === "not_money" && !t(ln.gives) ? "NOT MONEY: tulis apa yang mereka berikan." : "Tulis alasannya (\"because ___\", dari positioning Sesi 3)."), where: "S5 · hlm. 4", state: lineOk ? "ok" : "no" });
    var sv = c["s5.p4.survival"] || {};
    var svOk = sv.status && t(sv.note);
    out.push({ group: "i11", key: "d4", label: svOk ? "Survival line ditulis: " + (sv.status === "positive" ? "POSITIVE" : sv.status === "negative" ? "NEGATIVE (normal di tahap ini)" : "UNKNOWN, dengan bagian yang belum diketahui") + "." : "Survival line: pilih hasilnya dan tulis hitungannya, walau GUESS.", where: "S5 · hlm. 4", state: svOk ? "ok" : "no" });
    if (svOk && !(t(sv.money_in) && t(sv.money_out))) out.push({ group: "i11", key: "d5", label: "Survival line: isi juga uang masuk dan biaya untuk satu pelanggan, supaya hitungannya bisa dibaca.", where: "S5 · hlm. 4", state: "warn" });

    /* ---- i12 · page 8 (your three bets) ---- */
    var bets = items(c["s5.p8.bets"]);
    var full = bets.filter(function (b) { return b.kind && t(b.bet) && t(b.wrong) && t(b.test) && t(b.who) && t(b.when); }).length;
    out.push({ group: "i12", key: "e1", label: !bets.length ? "Belum ada taruhan." : full + " dari " + bets.length + " baris lengkap (kind, we bet that, if we're wrong, cara uji atau cek, siapa, kapan).", where: "S5 · hlm. 8", state: bets.length && full === bets.length ? "ok" : "no" });
    /* v0.8.4: baris nama = namerow Yes DAN kind legal (penilaian W4: Yes sering dipilih di baris 1 sebagai "baris penting").
     * Hanya logika cek; nilai tersimpan tidak diubah. */
    var named = bets.filter(function (b) { return b.namerow === "yes" && b.kind === "legal"; }).length;
    var legalNo = []; bets.forEach(function (b, i) { if (b.kind === "legal" && b.namerow !== "yes") legalNo.push(i + 1); });
    out.push({ group: "i12", key: "e2", label: named ? "Ada baris nama (kind legal: siapa pemilik nama dan aset utama)." : legalNo.length ? "Belum ada baris nama. Baris " + legalNo.join(", ") + " berjenis legal: kalau isinya tentang siapa pemilik nama proyekmu, pilih Yes di \"Name row?\"." : "Belum ada baris nama. Minimal satu baris berjenis legal tentang siapa pemilik nama proyek dan aset utamamu, dengan Yes di \"Name row?\".", where: "S5 · hlm. 8", state: named ? "ok" : "no" });
    bets.forEach(function (b, i) {
      if (b.namerow === "yes" && b.kind !== "legal")
        out.push({ group: "i12", key: "e2w", label: "Baris " + (i + 1) + " ditandai baris nama, tetapi kind-nya bukan legal. Baris nama adalah baris tentang siapa pemilik nama proyekmu; kalau bukan, kosongkan \"Name row?\" di baris ini.", where: "S5 · hlm. 8", state: "warn" });
    });
    if (bets[0] && (bets[0].namerow === "yes" || bets[0].kind === "legal"))
      out.push({ group: "i12", key: "e3", label: "Baris 1 adalah taruhan yang bisa diuji ke orang sungguhan lewat Concept Card. Baris nama (legal) adalah cek; pindahkan ke baris 2 atau 3.", where: "S5 · hlm. 8", state: "warn" });
    out.push({ group: "i12", key: "e4", label: "Baris 1 tidak kamu uji sendiri. Ujinya lewat Concept Card di kelas.", where: "S5 · hlm. 8", state: "info" });
    return out;
  };

  /* ---------- S6: hal inti 13 (Customer Journey, page 4), 14 (Message, page 5), 15 (KPI Tree, page 9) ----------
   * Acuan: slide 12 "Check Before You Submit" worked example S6 v3: satu orang + enam langkah + satu fix (apa/siapa/kapan);
   * satu pesan + ≥2 reasons + satu ask; empat langkah + tiga baris cek. Hanya terisi/tidak; isinya dibaca penilai. */
  CB.checkGroups.S6 = {
    i13: { title: "13 · Customer Journey (page 4)", help: "Satu orang dari audiens utama Sesi 2, enam langkah sampai share, satu friksi diperbaiki: apa yang berubah, siapa, kapan." },
    i14: { title: "14 · Message (page 5)", help: "Satu pesan utama dari janji positioning, 2–3 reasons yang masing-masing menunjuk baris REAL Promise → Proof Sesi 3, satu ajakan." },
    i15: { title: "15 · KPI Tree (page 9)", help: "Empat langkah (target, per minggu, pendorong, sinyal awal), lalu cek Conversion, Revenue, Brand. UNKNOWN boleh, dengan siapa dan kapan." }
  };
  CB.checks.S6 = function (data) {
    var c = cur(data, "S6"), out = [];
    /* ---- i13 · page 4 (journey) ---- */
    if (!txt(cur(data, "S2")["s2.p4.primary"])) out.push({ group: "i13", key: "j0", label: "Audiens utama Sesi 2 (hlm. 4) belum ada di browser ini. Isi di Sesi 2, atau impor file terakhirmu: halaman ini dan kartu memakainya.", where: "S2 · hlm. 4", state: "warn" });
    out.push({ group: "i13", key: "j1", label: txt(c["s6.p4.person"]) ? "Satu orang ditulis." : "OUR ONE PERSON masih kosong: satu nama dan satu baris.", where: "S6 · hlm. 4", state: txt(c["s6.p4.person"]) ? "ok" : "no" });
    var jr = (c["s6.p4.journey"] || {}).rows || {}, steps = ["discover", "evaluate", "access", "purchase", "experience", "share"];
    var filled = steps.filter(function (k) { var r = jr[k] || {}; return t(r.where) || t(r["do"]) || t(r.stop); });
    out.push({ group: "i13", key: "j2", label: filled.length === 6 ? "Enam langkah terisi, sampai share." : filled.length + " dari 6 langkah terisi" + (filled.length && filled.length < 6 ? " (belum: " + steps.filter(function (k) { return filled.indexOf(k) < 0; }).join(", ") + ")" : "") + ". Jalan yang berhenti di purchase belum journey.", where: "S6 · hlm. 4", state: filled.length === 6 ? "ok" : "no" });
    var ac = jr.access || {};
    if (filled.length && !t(ac.where) && !t(ac["do"])) out.push({ group: "i13", key: "j3", label: "Langkah ACCESS kosong: baris WHERE di Concept Card diambil dari sini.", where: "S6 · hlm. 4", state: "warn" });
    var fx = c["s6.p4.fix"] || {}, fxOk = t(fx.change) && t(fx.who) && t(fx.when);
    out.push({ group: "i13", key: "j4", label: fxOk ? "Satu friksi diperbaiki: apa, siapa, kapan." : "Satu friksi: tulis apa yang berubah, siapa, dan kapan (ketiganya).", where: "S6 · hlm. 4", state: fxOk ? "ok" : "no" });
    /* ---- i14 · page 5 (message) ---- */
    out.push({ group: "i14", key: "m1", label: txt(c["s6.p5.main"]) ? "Satu pesan utama ditulis." : "MAIN MESSAGE masih kosong.", where: "S6 · hlm. 5", state: txt(c["s6.p5.main"]) ? "ok" : "no" });
    var rs = items(c["s6.p5.reasons"]), rsOk = rs.filter(function (r) { return t(r.says) && t(r.proof); });
    out.push({ group: "i14", key: "m2", label: rsOk.length >= 2 ? rsOk.length + " reasons, masing-masing dengan proof." : rsOk.length + " reason lengkap. Tulis minimal dua, masing-masing WHAT IT SAYS dan PROOF.", where: "S6 · hlm. 5", state: rsOk.length >= 2 ? "ok" : "no" });
    var real = items(cur(data, "S3")["s3.p5.promise_proof"]).filter(function (x) { return x && x.status === "nyata" && t(x.promise); });
    function nz(s) { return t(s).toLowerCase().replace(/[“”"'’.,:;!?()\-–—]/g, " ").replace(/\s+/g, " ").trim(); }
    if (rsOk.length && !real.length) out.push({ group: "i14", key: "m3", label: "Promise → Proof Sesi 3 belum punya baris REAL. Reason hanya boleh menunjuk baris REAL: tandai yang sudah nyata di Sesi 3, atau kecilkan janjinya.", where: "S3 · hlm. 5", state: "warn" });
    else if (rsOk.length) {
      var miss = rsOk.filter(function (r) { var p = nz(r.proof); return !real.some(function (x) { var q = nz(x.promise); return q && (p.indexOf(q) >= 0 || q.indexOf(p) >= 0); }); });
      if (miss.length) out.push({ group: "i14", key: "m4", label: miss.length + " reason belum menyebut promise baris REAL mana pun secara persis. Tulis promise baris itu di kolom PROOF (cek sendiri; bisa jadi kamu menulisnya dengan kata lain).", where: "S6 · hlm. 5", state: "warn" });
    }
    out.push({ group: "i14", key: "m5", label: txt(c["s6.p5.ask"]) ? "Satu ajakan ditulis." : "ONE ASK masih kosong.", where: "S6 · hlm. 5", state: txt(c["s6.p5.ask"]) ? "ok" : "no" });
    /* ---- i15 · page 9 (KPI tree) ---- */
    var tg = c["s6.p9.target"] || {}, tgN = ["who", "does", "howmany", "when"].filter(function (k) { return t(tg[k]); }).length;
    out.push({ group: "i15", key: "k1", label: tgN === 4 ? "Target: siapa, melakukan apa, berapa, kapan." : "Target: " + tgN + " dari 4 bagian terisi (siapa · melakukan apa · berapa · kapan).", where: "S6 · hlm. 9", state: tgN === 4 ? "ok" : "no" });
    var st = ["s6.p9.breakdown", "s6.p9.drivers", "s6.p9.signal"].filter(function (id) { return txt(c[id]); }).length;
    out.push({ group: "i15", key: "k2", label: st === 3 ? "Langkah 2–4 terisi (per minggu, pendorong, sinyal awal)." : "Langkah 2–4: " + st + " dari 3 terisi.", where: "S6 · hlm. 9", state: st === 3 ? "ok" : "no" });
    var ck = (c["s6.p9.check"] || {}).rows || {}, ckN = ["conversion", "revenue", "brand"].filter(function (k) { return t((ck[k] || {}).where); });
    out.push({ group: "i15", key: "k3", label: ckN.length === 3 ? "Cek Conversion, Revenue, Brand terisi." : "Cek: " + ckN.length + " dari 3 baris terisi. Brand cukup rencana cara mengukur; UNKNOWN boleh dengan siapa dan kapan.", where: "S6 · hlm. 9", state: ckN.length === 3 ? "ok" : "no" });
    var ask = txt(c["s6.p5.ask"]);
    if (ask && t(tg.does) && !(CB.sameAction ? CB.sameAction(ask, tg.does) : nz(ask) === nz(tg.does))) out.push({ group: "i15", key: "k4", label: "Langkah 1 (\"" + t(tg.does) + "\") dan ajakan hlm. 5 (\"" + ask + "\") kata-katanya jauh berbeda. Keduanya harus aksi yang sama: cek sendiri.", where: "S6 · hlm. 9", state: "warn" });
    out.push({ group: "i15", key: "k5", label: "Concept Card dirakit dari hlm. 4, 5, 9 dan Sesi 2, 3, 5: lihat sesudah hlm. 9.", where: "S6 · kartu", state: "info" });
    return out;
  };

  /* v0.9.0 (S7): hlm. 2 test plan · hlm. 4 revision log · hlm. 5 governance · hlm. 9 pitch view. Hanya hal yang bisa dicek mesin. */
  CB.checks.S7 = function (data) {
    var c = cur(data, "S7"), out = [];
    function team(s) { return /\b(the team|team|tim|semua|all of us|kami semua)\b/i.test(t(s)); }
    function two(s) { return /\s(dan|and|&|\+|with|dengan)\s|,|\//i.test(t(s)); }
    /* ---- i16 · page 2 (test plan) ---- */
    var b1 = items(cur(data, "S5")["s5.p8.bets"])[0] || {};
    out.push({ group: "i16", key: "e0", label: t(b1.bet) ? "Taruhan baris 1 Sesi 5 tampil di page 2." : "THE BET WE TEST kosong: taruhan baris 1 Sesi 5 (hlm. 8) belum diisi di browser ini. Isi di sana, atau impor file terakhirmu.", where: "S5 · hlm. 8", state: t(b1.bet) ? "ok" : "no" });
    out.push({ group: "i16", key: "e1", label: txt(c["s7.p2.who"]) ? "WHO WE ASK ditulis." : "WHO WE ASK masih kosong: orang yang cocok dengan FOR WHOM, dan berapa.", where: "S7 · hlm. 2", state: txt(c["s7.p2.who"]) ? "ok" : "no" });
    var ac = c["s7.p2.action"] || {}, acOk = (ac.status === "do" || ac.status === "pay") && t(ac.note);
    out.push({ group: "i16", key: "e2", label: acOk ? "Aksi yang diminta: " + ac.status.toUpperCase() + ", ditulis." : "WHAT WE ASK THEM TO DO: pilih DO atau PAY dan tulis aksinya.", where: "S7 · hlm. 2", state: acOk ? "ok" : "no" });
    var pr = txt(c["s7.p2.prediction"]);
    out.push({ group: "i16", key: "e3", label: pr ? "Prediksi ditulis." : "OUR PREDICTION masih kosong: \"___ of ___ will ___\", ditulis sebelum uji.", where: "S7 · hlm. 2", state: pr ? "ok" : "no" });
    if (pr && !/\d/.test(pr)) out.push({ group: "i16", key: "e4", label: "Prediksi belum memuat angka. Tanpa angka, hasil apa pun bisa dibaca sebagai berhasil.", where: "S7 · hlm. 2", state: "warn" });
    /* ---- i17 · page 4 (revision log) ---- */
    var rw = items(c["s7.p4.rows"]).filter(function (x) { return x && (t(x.line) || t(x.before) || t(x.after) || t(x.evidence)); });
    var full = rw.filter(function (x) { return t(x.line) && t(x.after) && t(x.evidence) && (x.strength === "strong" || x.strength === "weak"); });
    out.push({ group: "i17", key: "r1", label: full.length ? full.length + " baris lengkap (line, after, evidence, STRONG/WEAK)." : "Belum ada baris lengkap. Satu baris per perubahan: line, before, after, evidence, STRONG atau WEAK.", where: "S7 · hlm. 4", state: full.length ? "ok" : "no" });
    if (rw.length > full.length) out.push({ group: "i17", key: "r2", label: (rw.length - full.length) + " baris belum lengkap: tanpa bukti atau tanpa STRONG/WEAK. Tanpa bukti, tidak ada baris.", where: "S7 · hlm. 4", state: "warn" });
    /* ---- i18 · page 5 (governance) ---- */
    [["s7.p5.decides", "g1", "Baris 1 (siapa memutus pesan utama)"], ["s7.p5.master", "g2", "Baris 2 (file master dan aturan versi)"], ["s7.p5.ask_before", "g3", "Baris 3 (siapa wajib ditanya sebelum aset kreatif berubah)"]].forEach(function (r) {
      var v = txt(c[r[0]]);
      out.push({ group: "i18", key: r[1], label: r[2] + (v ? " terisi." : " masih kosong."), where: "S7 · hlm. 5", state: v ? "ok" : "no" });
    });
    ["s7.p5.decides", "s7.p5.ask_before"].forEach(function (id, i) {
      var v = txt(c[id]); if (!v) return;
      if (team(v)) out.push({ group: "i18", key: "g4" + i, label: "Baris " + (i ? 3 : 1) + " menyebut tim, bukan satu nama: \"" + v + "\". \"The team\" bukan pemilik.", where: "S7 · hlm. 5", state: "warn" });
      else if (two(v)) out.push({ group: "i18", key: "g5" + i, label: "Baris " + (i ? 3 : 1) + " tampaknya berisi dua nama: \"" + v + "\". Dua nama berarti tidak ada yang memutus. Cek sendiri.", where: "S7 · hlm. 5", state: "warn" });
    });
    /* ---- i19 · page 9 (pitch view) ---- */
    var steps = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) { return c["s7.p9.step" + n] || {}; });
    var marked = steps.filter(function (v) { return v.status === "ok" || v.status === "no"; }).length;
    out.push({ group: "i19", key: "v1", label: marked === 8 ? "Delapan langkah diberi ✓ atau ✗." : marked + " dari 8 langkah diberi ✓ atau ✗.", where: "S7 · hlm. 9", state: marked === 8 ? "ok" : "no" });
    var open = steps.map(function (v, i) { return v.status === "no" && !t(v.note) ? i + 1 : 0; }).filter(Boolean);
    if (open.length) {
      var box = txt(c["s7.p9.cant"]);
      out.push({ group: "i19", key: "v2", label: box ? "Langkah ✗ yang belum diperbaiki (" + open.join(", ") + ") ditulis di WHAT WE COULDN'T FIX YET." : "Langkah " + open.join(", ") + " masih ✗ tanpa perbaikan: tulis di WHAT WE COULDN'T FIX YET (langkah, kenapa, apa yang akan dilakukan, kapan).", where: "S7 · hlm. 9", state: box ? "ok" : "no" });
    }
    var fixed = steps.filter(function (v) { return v.status === "no" && t(v.note); }).length;
    if (fixed && !full.length) out.push({ group: "i19", key: "v3", label: "Ada ✗ yang sudah diperbaiki, tapi page 4 belum punya baris. Setiap perbaikan dicatat satu baris di page 4 (buktinya WEAK).", where: "S7 · hlm. 4", state: "warn" });
    if (marked === 8 && !steps.some(function (v) { return v.status === "no"; })) out.push({ group: "i19", key: "v4", label: "Semua langkah ✓. Cek lagi dengan jujur: halaman yang semuanya ✓ biasanya kurang dipercaya, bukan lebih.", where: "S7 · hlm. 9", state: "info" });
    out.push({ group: "i19", key: "v5", label: "Concept Card sembilan baris (baris 9 khusus tim) dirakit dari halamanmu: lihat sesudah hlm. 9.", where: "S7 · kartu", state: "info" });
    return out;
  };

  /* Kandidat hlm. 8 (doc 73 §3, doc 82 §3): ditampilkan di samping tabel, bukan picker, tidak disimpan. */
  CB.s5Candidates = function (data) {
    var c5 = cur(data, "S5"), out = [];
    function add(src, href, text) { out.push({ src: src, href: href, text: text }); }
    items(c5["s5.p4.rows"]).forEach(function (it) {
      var lab = { guess: "GUESS", unknown: "UNKNOWN" };
      var parts = [];
      if (lab[it.o_price]) parts.push("price " + lab[it.o_price]);
      if (lab[it.o_volume]) parts.push("volume " + lab[it.o_volume]);
      if (parts.length) add("Today · page 4 (pricing)", "#p4", (t(it.item) || "(baris tanpa nama)") + ": " + parts.join(", ") + (t(it.o_note) ? " · " + t(it.o_note) : ""));
    });
    var sv = c5["s5.p4.survival"] || {};
    if (sv.status === "negative" || sv.status === "unknown") add("Today · page 4 (pricing)", "#p4", "Survival line " + sv.status.toUpperCase() + (t(sv.note) ? ": " + t(sv.note) : ""));
    var cl = c5["s5.p2.clash"] || {};
    if (t(cl.clash)) add("Today · page 2 (canvas)", "#p2", "Clash: " + t(cl.clash) + (t(cl.action) ? " · what we will do: " + t(cl.action) : ""));
    items(cur(data, "S3")["s3.p5.promise_proof"]).forEach(function (it) {
      if (it.status === "planned" || it.status === "unknown") add("Earlier · S3 Promise → Proof", "s3.html#p5", (it.status === "planned" ? "PLANNED: " : "UNKNOWN: ") + (t(it.promise) || "(promise tanpa teks)"));
    });
    var c4 = cur(data, "S4");
    if (txt(c4["s4.p6.have"]) || txt(c4["s4.p6.need"])) add("Earlier · S4 brand codes", "s4.html#p6", "Codes: " + [txt(c4["s4.p6.have"]), txt(c4["s4.p6.need"])].filter(Boolean).join(" · ") + " — owners written: " + (txt(c4["s4.p6.owners"]) || "none yet"));
    var name = txt(c4["s4.p2.product"]) || t((data.identifier || {}).project_name);
    add("Earlier · your project's name", txt(c4["s4.p2.product"]) ? "s4.html#p2" : "index.html", (name || "(nama proyek belum ditulis)") + " — who owns this name today? A person, the team, or UNKNOWN.");
    items(c5["s5.p5.partners"]).forEach(function (it) { if (it.status === "aspirational") add("Page 5 (partners)", "#p5", "ASPIRATIONAL partner: " + (t(it.partner) || "(tanpa nama)")); });
    items(c5["s5.p6.channels"]).forEach(function (it) {
      var cst = t(it.cost);
      if (cst && /\b(jam|hours?)\b/i.test(cst) && !/(rp|%|\$|rupiah|percent)/i.test(cst)) add("Page 6 (channels)", "#p6", "Hours-only channel: " + (t(it.channel) || "(tanpa nama)") + " · " + cst);
    });
    items(c5["s5.p7.assets"]).forEach(function (it) { if (/not yet|belum/i.test(t(it.owner) + " " + t(it.licence))) add("Page 7 (IP)", "#p7", "NOT YET AGREED: " + (t(it.asset) || "(aset tanpa nama)")); });
    return out;
  };
  CB.renderCandidates = function (sessId, pg, host) {
    var U = CB.util;
    var box = U.el("div", { class: "candbox" });
    box.appendChild(U.el("div", { class: "candhead" }, "<b>" + U.esc(pg.candidates.head) + "</b> · already there, from your own pages (not a picker: copy what you choose into a row)"));
    box.appendChild(U.el("p", { class: "small muted", text: pg.candidates.text }));
    var ul = U.el("ul", { class: "candlist" }); box.appendChild(ul);
    function draw() {
      ul.innerHTML = "";
      var list = CB.s5Candidates(CB.data);
      list.forEach(function (x) {
        var li = U.el("li");
        li.appendChild(U.el("a", { class: "candsrc", href: x.href, text: x.src }));
        li.appendChild(document.createTextNode(" " + x.text));
        ul.appendChild(li);
      });
    }
    draw(); if (CB.on) CB.on("change", draw);
    host.appendChild(box);
  };
})();

/* ---------- status hal inti, dipakai panel sesi dan peta rantai di beranda (v0.6.0, doc 74) ---------- */
(function () {
  "use strict";
  var CB = window.CB;
  CB.CORE_TOTAL = 9;
  /* v0.7.0: jumlah hal inti = hal inti sesi yang sudah dirilis (S1–S4 = 9, + S5 = 12). Angka per sesi tetap di sini supaya
   * halaman sesi lama (yang tidak memuat spec S5) tetap menulis angka yang sama dengan beranda. */
  var CORE_COUNT = { S1: 1, S2: 3, S3: 2, S4: 3, S5: 3, S6: 3, S7: 4 };
  CB.coreTotal = function () {
    var n = 0;
    Object.keys(CORE_COUNT).forEach(function (sid) { if (sid <= "S4" || !CB.isReleased || CB.isReleased(sid)) n += CORE_COUNT[sid]; });
    return n;
  };
  /* Satu hal inti terisi = baris cek kelompoknya tidak ada yang "no" atau "pending". "warn" tetap dihitung terisi. */
  CB.coreDone = function (rows, it) {
    var mine = rows.filter(function (r) { return r.group === it.k; });
    return mine.length > 0 && mine.every(function (r) { return r.state !== "no" && r.state !== "pending"; });
  };
  /* Rantai sembilan hal inti S1–S4 berurutan (n 1…9), hanya sesi yang dirilis (atau mode pratinjau). */
  CB.coreChain = function (data) {
    var out = [];
    ["S1", "S2", "S3", "S4", "S5", "S6", "S7"].forEach(function (sid) {
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

