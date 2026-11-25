/* core/pitch.js — Sesi 7 hlm. 9 "Your pitch view: the final check" (v0.9.0, 26 Nov 2026). Hanya dimuat s7.html.
 * Kolom YOUR PITCH VIEW SAYS DIRAKIT dari halaman asal S1–S7 (+ identitas S4) dan tidak menyimpan apa pun (konvensi 42).
 * Sumber per langkah = spec S7 `pv` (log kit S7 22 Nov §4; workbook v3.4 hlm. 9). Yang disimpan hanya ✓ / ✗ + "IF ✗: WHERE WE FIXED IT"
 * (field status s7.p9.step1–8) dan kotak s7.p9.cant. Sumber khusus (`calc`):
 *   p4rows = ringkasan Revision Log S7 hlm. 4 · ask = baris WHAT WE ASK YOU TO DO kartu (S6 hlm. 9 langkah 1) ·
 *   name = S4 hlm. 2 PRODUCT / TITLE, atau nama proyek bila kosong. */
(function () {
  "use strict";
  var CB = window.CB;
  function t(v) { return typeof v === "string" ? v.trim() : ""; }

  CB.pitchSourceText = function (src) {
    if (src.calc === "p4rows") {
      var its = ((CB.getField("S7", "s7.p4.rows") || {}).items || []).filter(function (x) { return x && (t(x.line) || t(x.after) || t(x.evidence)); });
      if (!its.length) return "";
      var st = its.filter(function (x) { return x.strength === "strong"; }).length, wk = its.filter(function (x) { return x.strength === "weak"; }).length;
      return its.length + (its.length === 1 ? " row" : " rows") + " (" + st + " STRONG · " + wk + " WEAK" + (its.length - st - wk ? " · " + (its.length - st - wk) + " not marked" : "") + ")\n" +
        its.map(function (x, i) { return (i + 1) + ". " + (t(x.line) || "(line?)") + ": " + (t(x.after) || "—") + " · evidence: " + (t(x.evidence) || "—") + (x.strength ? " · " + x.strength.toUpperCase() : ""); }).join("\n");
    }
    if (src.calc === "ask") return t((CB.getField("S6", "s6.p9.target") || {}).does);
    if (src.calc === "name") {
      var nm = t(CB.getField("S4", "s4.p2.product"));
      if (nm) return nm;
      var pj = t(((CB.data || {}).identifier || {}).project_name);
      return pj ? pj + " (your project name; Session 4 page 2 is empty)" : "";
    }
    return CB.shownSource(src);
  };

  function sourceEl(src) {
    if (!src.calc) return CB.shownSourceEl(src);
    var U = CB.util, row = U.el("div", { class: "shownsrc" }), head = U.el("div", { class: "shownhead" });
    head.appendChild(U.el("b", { text: src.label }));
    head.appendChild(U.el("a", { class: "shownlink", href: CB.sessionHref(src.id), text: "ubah di halaman asal →" }));
    row.appendChild(head);
    var body = U.el("div", { class: "shownval pvcalc" });
    function draw() { var x = CB.pitchSourceText(src); body.textContent = x || "Belum diisi → " + CB.pageLabel(src.id); body.classList.toggle("empty", !x); }
    draw(); if (CB.on) CB.on("change", draw);
    row.appendChild(body);
    return row;
  }

  CB.renderPitch = function (sessId, pg, host, renderField) {
    var U = CB.util;
    pg.fields.forEach(function (f) {
      if (!f.pv) { host.appendChild(renderField(f)); return; }
      var parts = f.label.split(" → ");
      var row = U.el("div", { class: "pvrow", "data-fid": f.id });
      row.appendChild(U.el("div", { class: "pvhead" }, U.esc(parts[0]) + (parts[1] ? ' <span class="pvfix">→ fix in ' + U.esc(parts[1]) + "</span>" : "")));
      var body = U.el("div", { class: "pvbody" });
      var says = U.el("div", { class: "pvsays" });
      says.appendChild(U.el("div", { class: "pvlbl", text: "YOUR PITCH VIEW SAYS" }));
      f.pv.forEach(function (src) { says.appendChild(sourceEl(src)); });
      var chk = U.el("div", { class: "pvcheck" });
      chk.appendChild(U.el("div", { class: "pvlbl", text: "ASK YOURSELF" }));
      chk.appendChild(U.el("div", { class: "pvask", text: f.hint }));
      chk.appendChild(U.el("div", { class: "pvlbl", text: "✓ / ✗" }));
      chk.appendChild(renderField(f));
      body.appendChild(says); body.appendChild(chk); row.appendChild(body);
      function mark() { var v = CB.getField(sessId, f.id) || {}; row.classList.toggle("mark-ok", v.status === "ok"); row.classList.toggle("mark-no", v.status === "no"); }
      mark(); if (CB.on) CB.on("change", mark);
      host.appendChild(row);
    });
  };

  /* Cetak: satu tabel seperti workbook hlm. 9, lalu kotak WHAT WE COULDN'T FIX YET. */
  CB.pitchPrint = function (sessId, pg) {
    var U = CB.util, wrap = U.el("div");
    var tb = U.el("table", { class: "pp-table" }), hr = U.el("tr");
    ["STEP → WHERE TO FIX", "YOUR PITCH VIEW SAYS", "ASK YOURSELF", "✓ / ✗", "IF ✗: WHERE WE FIXED IT"].forEach(function (h) { hr.appendChild(U.el("th", { text: h })); });
    var th = U.el("thead"); th.appendChild(hr); tb.appendChild(th);
    var body = U.el("tbody");
    pg.fields.forEach(function (f) {
      if (!f.pv) return;
      var v = CB.getField(sessId, f.id) || {};
      var says = f.pv.map(function (src) { var x = CB.pitchSourceText(src); return src.label + ": " + (x || "not filled yet"); }).join("\n");
      var tr = U.el("tr");
      [f.label, says, f.hint, v.status === "ok" ? "✓" : v.status === "no" ? "✗" : "—", t(v.note) || "—"].forEach(function (c, i) {
        var td = U.el(i ? "td" : "th", { text: c }); td.style.whiteSpace = "pre-wrap"; tr.appendChild(td);
      });
      body.appendChild(tr);
    });
    tb.appendChild(body); wrap.appendChild(tb);
    pg.fields.forEach(function (f) {
      if (f.pv) return;
      var b = U.el("div", { class: "pp-box" }); b.style.marginTop = "6pt";
      b.appendChild(U.el("b", { text: f.label }));
      b.appendChild(U.el("div", { text: CB.fields.printText(f, CB.getField(sessId, f.id), sessId) || "—" }));
      wrap.appendChild(b);
    });
    return wrap;
  };
})();
