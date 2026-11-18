/* core/card.js — Concept Card (v0.8.0, Sesi 6). Dibangun 17 Nov 2026.
 * Delapan baris, label persis deck S6 v6 (slide 1, R4) dan slide 11 worked example S6 v3:
 *   Name · FOR WHOM · MAIN MESSAGE (besar) · positioning (kecil) · WHY BELIEVE IT · WHERE · PRICE · WHAT WE ASK YOU TO DO.
 * Kartu DIRAKIT dari halaman asal dan tidak menyimpan apa pun (doc 73 §1 aturan 2; butir 79 diputuskan Fai 17 Nov:
 * baris kosong tetap "not filled yet" + tautan, tidak diketik langsung di kartu). Tidak ada field baru, jadi tidak ada ID yang dikunci.
 * Sumber: Name = identitas proyek · FOR WHOM = s2.p4.primary · MAIN MESSAGE = s6.p5.main · positioning = s3.p2.final ·
 *   WHY BELIEVE IT = bukti baris REAL s3.p5.promise_proof (satu sumber; hlm. 5 tidak membuat kolom bukti kedua) ·
 *   WHERE = s6.p4.journey baris access · PRICE = s5.p4.rows (atau NOT MONEY s5.p4.line) · WHAT WE ASK YOU TO DO = s6.p9.target "does".
 * Peringatan hanya untuk hal yang bisa dicek mesin; makna kartu dibaca mahasiswa dan dosen.
 * Unduh PDF = cetak browser satu halaman (tanpa server, tanpa CDN). Layar penuh untuk diproyeksikan di kelas. */
(function () {
  "use strict";
  var CB = window.CB;

  function t(v) { return typeof v === "string" ? v.trim() : ""; }
  function get(sid, id) { return CB.getField ? CB.getField(sid, id) : null; }
  function items(v) { return (v && v.items) || []; }
  function norm(s) { return t(s).toLowerCase().replace(/[“”"'’.,:;!?()\-–—]/g, " ").replace(/\s+/g, " ").trim(); }
  /* v0.8.1: ajakan hlm 5 dan langkah 1 hlm 9 biasanya ditulis dengan panjang berbeda. Dianggap "aksi yang sama" bila
   * minimal separuh kata kunci kalimat yang lebih pendek muncul di kalimat lain. Dipakai juga oleh core/checks.js. */
  var STOP = { the: 1, and: 1, for: 1, you: 1, your: 1, our: 1, with: 1, from: 1, this: 1, that: 1, page: 1, step: 1, same: 1, action: 1,
    yang: 1, dan: 1, untuk: 1, dari: 1, dengan: 1, kamu: 1, kami: 1, sama: 1, hlm: 1, langkah: 1 };
  function words(s) { return norm(s).split(" ").filter(function (w) { return w.length >= 3 && !STOP[w]; }); }
  CB.sameAction = function (a, b) {
    var A = words(a), B = words(b); if (!A.length || !B.length) return true;
    var small = A.length <= B.length ? A : B, big = small === A ? B : A;
    var hit = small.filter(function (w) { return big.some(function (x) { return x === w || (w.length >= 5 && x.length >= 5 && (x.indexOf(w.slice(0, 5)) === 0 || w.indexOf(x.slice(0, 5)) === 0)); }); }).length;
    return hit / small.length >= 0.5;
  };

  CB.cardRows = function () {
    var id = (CB.data && CB.data.identifier) || {};
    var real = items(get("S3", "s3.p5.promise_proof")).filter(function (x) { return x && x.status === "nyata"; });
    var why = real.map(function (x) { return t(x.proof) || t(x.promise); }).filter(Boolean).join("; ");
    var jr = ((get("S6", "s6.p4.journey") || {}).rows || {}).access || {};
    var line = get("S5", "s5.p4.line") || {};
    var price = line.status === "not_money" && t(line.gives) ? "Not paid with money: " + t(line.gives)
      : items(get("S5", "s5.p4.rows")).map(function (x) { return [t(x.item), t(x.figure)].filter(Boolean).join(": "); }).filter(Boolean).join("; ");
    var tg = get("S6", "s6.p9.target") || {};
    return [
      { k: "name", label: "Name", value: t(id.project_name), from: "Your project name", href: "index.html" },
      { k: "forwhom", label: "FOR WHOM", value: t(get("S2", "s2.p4.primary")), from: "Session 2, page 4", href: "s2.html#p4" },
      { k: "main", label: "MAIN MESSAGE", value: t(get("S6", "s6.p5.main")), from: "Session 6, page 5", href: "s6.html#p5", s6: true, big: true },
      { k: "positioning", label: "positioning", value: t(get("S3", "s3.p2.final")), from: "Session 3, page 2", href: "s3.html#p2", small: true },
      { k: "why", label: "WHY BELIEVE IT", value: why, from: "Session 3, Promise → Proof, REAL rows", href: "s3.html#p5" },
      { k: "where", label: "WHERE", value: t(jr.where) || t(jr["do"]), from: "Session 6, page 4, access", href: "s6.html#p4", s6: true },
      { k: "price", label: "PRICE", value: price, from: "Session 5, page 4", href: "s5.html#p4" },
      { k: "ask", label: "WHAT WE ASK YOU TO DO", value: t(tg.does), from: "Session 6, page 9, step 1", href: "s6.html#p9", s6: true }
    ];
  };

  /* Peringatan yang bisa dicek mesin (tidak memblokir). */
  CB.cardNotes = function (rows) {
    var out = [], empty = rows.filter(function (r) { return !r.value; });
    if (empty.length) out.push({ state: "no", text: empty.length + " dari 8 baris belum diisi: " + empty.map(function (r) { return r.label; }).join(", ") + ". Isi di halaman asalnya (tautan di tiap baris)." });
    var pp = items(get("S3", "s3.p5.promise_proof")).filter(function (x) { return x && t(x.promise); });
    if (pp.length && !pp.some(function (x) { return x.status === "nyata"; }))
      out.push({ state: "warn", text: "WHY BELIEVE IT kosong karena Promise → Proof Sesi 3 belum punya baris REAL. Reason di page 5 (message) hanya boleh menunjuk baris REAL." });
    var ask = t(get("S6", "s6.p5.ask")), does = t((get("S6", "s6.p9.target") || {}).does);
    if (ask && does && !CB.sameAction(ask, does))
      out.push({ state: "warn", text: "Ajakan di page 5 (message): \"" + ask + "\" · langkah 1 di page 9 (KPI tree): \"" + does + "\". Kata-katanya jauh berbeda, padahal keduanya harus aksi yang sama: cek sendiri." });
    var line = get("S5", "s5.p4.line") || {};
    if (line.status === "not_money") out.push({ state: "info", text: "PRICE menampilkan apa yang mereka berikan, bukan angka (S5 page 4: NOT MONEY)." });
    return out;
  };

  function cardEl(rows, opt) {
    var U = CB.util, live = !(opt && opt.example);
    var c = U.el("div", { class: "ccard" });
    rows.forEach(function (r) {
      var row = U.el("div", { class: "ccrow" + (r.s6 ? " s6" : "") + (r.big ? " big" : "") + (r.small ? " small" : "") + (r.k === "name" ? " name" : "") + (r.value ? "" : " empty"), "data-key": r.k });
      row.appendChild(U.el("div", { class: "cclabel", text: r.label }));
      row.appendChild(U.el("div", { class: "ccval", text: r.value || "not filled yet" }));
      var src = U.el("div", { class: "ccsrc" });
      src.appendChild(document.createTextNode(r.from));
      if (live && r.href) src.appendChild(U.el("a", { class: "cclink", href: r.href, text: r.value ? " · change it there →" : " · fill it there →" }));
      row.appendChild(src);
      c.appendChild(row);
    });
    return c;
  }

  /* Halaman cetak satu halaman (dipakai tombol Unduh PDF dan cetak sesi). */
  CB.cardPrintPage = function () {
    var U = CB.util, id = (CB.data && CB.data.identifier) || {};
    var pp = U.el("div", { class: "pp ppcard" });
    pp.appendChild(U.el("div", { class: "pp-id", text: (id.full_name || "") + " · NIM " + (id.nim || "") + " · " + (id.group_id || "") + " · " + (id.project_name || "") }));
    pp.appendChild(U.el("div", { class: "pp-title", text: "Concept Card" }));
    pp.appendChild(U.el("p", { class: "pp-sub", text: "Built from your pages. To change a row, change its page." }));
    pp.appendChild(cardEl(CB.cardRows(), { example: true }));
    pp.appendChild(U.el("div", { class: "pp-foot", text: "Dicetak dari Workbook App · " + U.fmtDate(new Date().toISOString()) }));
    return pp;
  };
  CB.downloadCard = function () {
    var U = CB.util, root = document.getElementById("print-root");
    if (!root) { root = U.el("div", { id: "print-root" }); document.body.appendChild(root); }
    if (CB.saveNow) CB.saveNow();
    root.innerHTML = ""; root.appendChild(CB.cardPrintPage());
    var id = (CB.data && CB.data.identifier) || {}, old = document.title;
    document.title = "ConceptCard_" + (id.nim || "") + "_" + String(id.project_name || "").replace(/[^\w]+/g, "-");
    window.print();
    setTimeout(function () { document.title = old; }, 500);
  };

  CB.renderConceptCard = function (sessId, ct) {
    var U = CB.util;
    var sec = U.el("section", { class: "card cardsec", id: "kartu" });
    var head = U.el("div", { class: "pagehead" });
    head.appendChild(U.el("span", { class: "num", text: "★" }));
    var ht = U.el("div");
    ht.appendChild(U.el("h2", { text: "Your Concept Card" }));
    ht.appendChild(U.el("span", { class: "pglabel", text: sessId + " · built from your pages (not a page to fill)" }));
    ht.appendChild(U.el("p", { class: "wbsub", text: "Built from your pages. To change a row, change its page. The three highlighted rows come from Session 6." }));
    head.appendChild(ht); sec.appendChild(head);

    var wrap = U.el("div", { class: "ccwrap" });
    var tools = U.el("div", { class: "cctools" });
    var bPdf = U.el("button", { type: "button", class: "btn", text: "Unduh PDF kartu" });
    var bFull = U.el("button", { type: "button", class: "btn ghost", text: "Layar penuh" });
    tools.appendChild(bPdf); tools.appendChild(bFull);
    tools.appendChild(U.el("span", { class: "small muted", text: " PDF: pilih \"Save as PDF\" / \"Simpan sebagai PDF\" di jendela cetak." }));
    var host = U.el("div", { class: "cchost" });
    var bExit = U.el("button", { type: "button", class: "btn ghost ccexit", text: "Keluar layar penuh (Esc)" });
    wrap.appendChild(bExit);
    var notes = U.el("ul", { class: "ccnotes" });
    wrap.appendChild(host);
    sec.appendChild(tools); sec.appendChild(wrap); sec.appendChild(notes);
    if (ct && ct.intro) {
      var det = U.el("details", { class: "theory-collapse ccintro" });
      det.appendChild(U.el("summary", { text: "Where each row comes from, and what happens if it is empty (R4)" }));
      det.appendChild(U.el("div", { class: "why" }, ct.intro));
      sec.appendChild(det);
    }
    function draw() {
      host.innerHTML = "";
      var rows = CB.cardRows();
      host.appendChild(cardEl(rows));
      notes.innerHTML = "";
      CB.cardNotes(rows).forEach(function (n) { notes.appendChild(U.el("li", { class: "ccn " + n.state, text: n.text })); });
    }
    draw(); if (CB.on) CB.on("change", draw);
    bPdf.onclick = function () { CB.downloadCard(); };
    bFull.onclick = function () {
      if (wrap.requestFullscreen && !document.fullscreenElement) { wrap.requestFullscreen().catch(function () { wrap.classList.toggle("ccfull"); }); }
      else if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
      else wrap.classList.toggle("ccfull");
    };
    bExit.onclick = function () { if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen(); wrap.classList.remove("ccfull"); };
    wrap.addEventListener("click", function (ev) { if (wrap.classList.contains("ccfull") && ev.target === wrap) wrap.classList.remove("ccfull"); });
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape") wrap.classList.remove("ccfull"); });

    /* contoh empat kasus: kartu (slide 11 WE) + Check Before You Submit (slide 12 WE) */
    if (ct && ct.examples) {
      var bar = U.el("div", { class: "exbar" });
      bar.appendChild(U.el("span", { class: "lbl", text: "Lihat kartu contoh:" }));
      var panel = U.el("div", { class: "expanel hidden" }), active = null;
      ["jumbo", "gojek", "marvel", "lego"].forEach(function (k) {
        var ex = ct.examples[k]; if (!ex) return;
        var b = U.el("button", { class: "chip", type: "button", text: ex.chip });
        b.onclick = function () {
          bar.querySelectorAll(".chip").forEach(function (o) { o.classList.remove("active"); });
          if (active === k) { active = null; panel.classList.add("hidden"); return; }
          active = k; b.classList.add("active"); panel.innerHTML = "";
          panel.appendChild(U.el("h4", { text: "Contoh — " + ex.name + " · Concept Card" }));
          if (ex.how) panel.appendChild(U.el("div", { class: "exbox" }, "<b>HOW TO USE THIS EXAMPLE</b><div class='exval'>" + U.esc(ex.how).replace(/\n/g, "<br>") + "</div>"));
          panel.appendChild(cardEl(ex.rows.map(function (r, i) { return { k: ["name", "forwhom", "main", "positioning", "why", "where", "price", "ask"][i], label: r[0], value: r[1], from: r[2], s6: [2, 5, 7].indexOf(i) >= 0, big: i === 2, small: i === 3 }; }), { example: true }));
          panel.appendChild(U.el("div", { class: "exnotice", text: ex.cardNotice }));
          var bx = U.el("div", { class: "exbox" }); bx.appendChild(U.el("b", { text: "CHECK BEFORE YOU SUBMIT (the three core pages and the card, YES or NOT YET)" }));
          var sc = U.el("div", { class: "tscroll" }), tb = U.el("table", { class: "wbtable ex" });
          var hr = U.el("tr"); ["PAGE", "WHAT IT ASKS", "OUR ANSWER", "EVIDENCE"].forEach(function (h) { hr.appendChild(U.el("th", { text: h })); }); tb.appendChild(hr);
          ex.check.forEach(function (r) { var tr = U.el("tr"); r.forEach(function (c, i) { tr.appendChild(U.el(i ? "td" : "th", { text: c, class: i === 2 ? (c === "YES" ? "ccyes" : "ccnot") : "" })); }); tb.appendChild(tr); });
          sc.appendChild(tb); bx.appendChild(sc); panel.appendChild(bx);
          panel.appendChild(U.el("div", { class: "exbox" }, "<b>STILL OPEN, EACH WITH AN OWNER</b><div class='exval'>" + U.esc(ex.open) + "</div>"));
          panel.appendChild(U.el("div", { class: "exnotice", text: ex.checkNotice }));
          if (ex.note) panel.appendChild(U.el("div", { class: "exnote", text: ex.note }));
          panel.classList.remove("hidden");
        };
        bar.appendChild(b);
      });
      sec.appendChild(bar); sec.appendChild(panel);
    }
    return sec;
  };
})();
