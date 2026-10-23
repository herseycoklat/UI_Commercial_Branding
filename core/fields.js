/* core/fields.js — komponen field.
 * Setiap komponen menerima (sessId, field) dan mengembalikan elemen DOM.
 * Nilai disimpan lewat CB.setField(sessId, field.id, value).
 * Leadership Log punya halaman sendiri (core/leadership.js) dan menulis ke
 * CB.data.leadership_log (kontrak v3.3). Decision Log S1 (s1.p8.log) = tipe "list".
 * Bentuk nilai per tipe (JANGAN diubah setelah rilis; tambah saja):
 *   longtext / text : "teks"
 *   table           : { rows: { <baris>: { <kolom>: "teks" } }, extra: [ { label, <kolom>... } ] }
 *   score           : { score: 1–5, justification: "teks" }
 *   trace           : { text: "teks", trace: [ "<id sumber>" ] }
 *   list            : { items: [ { id, <k>: "teks" } ] }
 */
(function () {
  "use strict";
  var CB = window.CB, U = CB.util;
  var F = {};

  function autosize(ta, min) {
    ta.style.height = "auto";
    ta.style.height = Math.max(ta.scrollHeight + 2, min || 76) + "px";
  }
  function fid(f) { return "f_" + f.id.replace(/\./g, "_"); }
  function changed(id) { if (CB.emit) CB.emit("change", id); }
  function clone(o) { return JSON.parse(JSON.stringify(o || {})); }
  function boxHead(box, f, forId) {
    box.appendChild(U.el("label", { for: forId, text: f.label }));
    if (f.hint) box.appendChild(U.el("div", { class: "hint", text: f.hint }));
  }
  function textarea(id, value, onInput, min) {
    var ta = U.el("textarea", { id: id, rows: "3", placeholder: "— tulis di sini —" });
    ta.value = value || "";
    ta.addEventListener("input", function () { onInput(ta.value); autosize(ta, min); });
    setTimeout(function () { autosize(ta, min); }, 0);
    return ta;
  }

  /* ---------- longtext ---------- */
  F.longtext = function (sessId, f) {
    var box = U.el("div", { class: "box" + (f.output ? " output" : "") });
    boxHead(box, f, fid(f));
    var ta = textarea(fid(f), CB.getField(sessId, f.id), function (v) { CB.setField(sessId, f.id, v); changed(f.id); });
    ta.setAttribute("data-fid", f.id);
    box.appendChild(ta);
    return box;
  };

  /* ---------- text ---------- */
  F.text = function (sessId, f) {
    var box = U.el("div", { class: "box" });
    boxHead(box, f, fid(f));
    var inp = U.el("input", { id: fid(f), type: "text", "data-fid": f.id, class: "line" });
    inp.value = CB.getField(sessId, f.id) || "";
    inp.addEventListener("input", function () { CB.setField(sessId, f.id, inp.value); changed(f.id); });
    box.appendChild(inp);
    return box;
  };

  /* ---------- table (baris tetap dari workbook + baris tambahan) ---------- */
  F.table = function (sessId, f) {
    var wrap = U.el("div", { class: "box tablebox" });
    var val = clone(CB.getField(sessId, f.id)); val.rows = val.rows || {}; val.extra = val.extra || [];
    function commit() { CB.setField(sessId, f.id, clone(val)); changed(f.id); }
    var scroller = U.el("div", { class: "tscroll" });
    var t = U.el("table", { class: "wbtable" + (f.narrowHead ? " narrowhead" : ""), "data-fid": f.id });
    var hasAct = !!(f.allowExtraRows || val.extra.length);
    var thead = U.el("thead"), hr = U.el("tr");
    hr.appendChild(U.el("th", { text: f.rowLabel || "" }));
    f.columns.forEach(function (c) { hr.appendChild(U.el("th", { text: c.label })); });
    if (hasAct) hr.appendChild(U.el("th", { class: "act", text: "" }));
    thead.appendChild(hr); t.appendChild(thead);
    var tb = U.el("tbody"); t.appendChild(tb);
    function cell(get, set, ph) {
      var td = U.el("td");
      /* f.wrapCells: teks panjang turun ke bawah (kotak memanjang otomatis), tidak bergulung ke samping */
      var inp = f.wrapCells ? U.el("textarea", { class: "cell grow", rows: "1", placeholder: ph || "" })
        : U.el("input", { type: "text", class: "cell", placeholder: ph || "" });
      inp.value = get() || "";
      inp.addEventListener("input", function () { set(inp.value); commit(); if (f.wrapCells) autosize(inp, 36); });
      td.appendChild(inp);
      if (f.wrapCells) requestAnimationFrame(function () { autosize(inp, 36); });
      return td;
    }
    function draw() {
      tb.innerHTML = "";
      f.rows.forEach(function (r) {
        var tr = U.el("tr");
        tr.appendChild(U.el("th", { scope: "row", text: r.label }));
        val.rows[r.k] = val.rows[r.k] || {};
        f.columns.forEach(function (c) {
          tr.appendChild(cell(function () { return val.rows[r.k][c.k]; }, function (v) { val.rows[r.k][c.k] = v; }));
        });
        if (hasAct) tr.appendChild(U.el("td", { class: "act" }));
        tb.appendChild(tr);
      });
      val.extra.forEach(function (row, i) {
        var tr = U.el("tr", { class: "extra" });
        tr.appendChild(cell(function () { return row.label; }, function (v) { row.label = v; }, "touchpoint lain"));
        f.columns.forEach(function (c) {
          tr.appendChild(cell(function () { return row[c.k]; }, function (v) { row[c.k] = v; }));
        });
        var td = U.el("td", { class: "act" });
        var del = U.el("button", { type: "button", class: "iconbtn", title: "Hapus baris", "aria-label": "Hapus baris", text: "✕" });
        del.onclick = function () { val.extra.splice(i, 1); commit(); draw(); };
        td.appendChild(del); tr.appendChild(td);
        tb.appendChild(tr);
      });
    }
    draw();
    scroller.appendChild(t); wrap.appendChild(scroller);
    if (f.allowExtraRows) {
      var add = U.el("button", { type: "button", class: "addbtn", text: "+ Tambah baris" });
      add.onclick = function () { val.extra.push({ label: "" }); commit(); draw(); };
      wrap.appendChild(add);
    }
    return wrap;
  };

  /* ---------- score (1–5 + justifikasi satu baris) ---------- */
  F.score = function (sessId, f) {
    var row = U.el("div", { class: "scorerow", "data-fid": f.id });
    var val = clone(CB.getField(sessId, f.id));
    function commit() { CB.setField(sessId, f.id, clone(val)); changed(f.id); }
    var id = fid(f);
    row.appendChild(U.el("label", { for: id, class: "dim", text: f.label }));
    var sel = U.el("select", { id: id, "aria-label": "Skor " + f.label });
    sel.appendChild(U.el("option", { value: "", text: "—" }));
    [1, 2, 3, 4, 5].forEach(function (n) { sel.appendChild(U.el("option", { value: String(n), text: String(n) })); });
    sel.value = val.score ? String(val.score) : "";
    function paint() { sel.className = "scoresel" + (val.score && val.score <= 2 ? " low" : ""); }
    paint();
    sel.onchange = function () { val.score = sel.value ? parseInt(sel.value, 10) : null; paint(); commit(); };
    row.appendChild(sel);
    var j = U.el("input", { type: "text", class: "line", placeholder: "JUSTIFICATION — one honest line", "aria-label": "Justifikasi " + f.label });
    j.value = val.justification || "";
    j.addEventListener("input", function () { val.justification = j.value; commit(); });
    row.appendChild(j);
    return row;
  };

  /* ---------- trace (teks + jejak ke sumber) ---------- */
  function traceSources(sessId, f) {
    var out = [];
    (f.traceFrom || []).forEach(function (src) {
      var m = /^(s\d+\.p\d+)\.\*<=(\d)$/.exec(src);
      if (m) {
        var page = CB.findPage(m[1]);
        (page ? page.fields : []).forEach(function (sf) {
          var v = CB.getField(sessId, sf.id) || {};
          if (v.score && v.score <= parseInt(m[2], 10)) out.push({ id: sf.id, label: "Skor " + v.score + " · " + sf.label + " (" + CB.pageLabel(sf.id) + ")", detail: v.justification || "" });
        });
      } else {
        var sf2 = CB.findField(src);
        var txt = CB.getField(sessId, src);
        if (sf2) out.push({ id: src, label: sf2.label + " (" + CB.pageLabel(src) + ")", detail: typeof txt === "string" ? txt : "" });
      }
    });
    return out;
  }
  CB.traceSources = traceSources;
  F.trace = function (sessId, f) {
    var box = U.el("div", { class: "box tracebox" });
    var val = clone(CB.getField(sessId, f.id)); val.trace = val.trace || [];
    function commit() { CB.setField(sessId, f.id, clone(val)); changed(f.id); }
    boxHead(box, f, fid(f));
    var ta = textarea(fid(f), val.text, function (v) { val.text = v; commit(); }, 56);
    ta.setAttribute("data-fid", f.id);
    box.appendChild(ta);
    var tr = U.el("div", { class: "traceopts" });
    tr.appendChild(U.el("div", { class: "tlabel", text: "Masalah ini berasal dari (pilih minimal satu):" }));
    var list = U.el("div"); tr.appendChild(list);
    function draw() {
      list.innerHTML = "";
      var srcs = traceSources(sessId, f);
      if (!srcs.length) list.appendChild(U.el("div", { class: "small muted", text: "Belum ada sumber. Isi kotak 8 di Brand Audit Canvas dan beri skor 1–2 di Commercial Readiness Scorecard." }));
      srcs.forEach(function (s) {
        var lb = U.el("label", { class: "chk" });
        var cb = U.el("input", { type: "checkbox" });
        cb.checked = val.trace.indexOf(s.id) >= 0;
        cb.onchange = function () {
          var i = val.trace.indexOf(s.id);
          if (cb.checked && i < 0) val.trace.push(s.id);
          if (!cb.checked && i >= 0) val.trace.splice(i, 1);
          commit();
        };
        lb.appendChild(cb);
        var sp = U.el("span"); sp.appendChild(U.el("b", { text: s.label }));
        if (s.detail) sp.appendChild(U.el("span", { class: "tdetail", text: " — " + (s.detail.length > 140 ? s.detail.slice(0, 140) + "…" : s.detail) }));
        lb.appendChild(sp); list.appendChild(lb);
      });
    }
    draw();
    CB.on("change", function (id) { if (id && id !== f.id && (/\.p6\./.test(id) || /b8_gaps$/.test(id))) draw(); });
    box.appendChild(tr);
    return box;
  };

  /* ---------- list (daftar item, tiap item bisa punya beberapa isian) ----------
   * f.itemFields: [{k, label, type: "text"|"longtext"|"select"|"date", options:[...], ph}]
   * nilai: { items: [ { id, <k>: ... } ] } */
  function itemInput(it, spec, onChange) {
    var w = U.el("div", { class: "lfield " + (spec.type || "text") });
    var id = "li_" + it.id + "_" + spec.k;
    w.appendChild(U.el("label", { for: id, text: spec.label }));
    var el;
    if (spec.type === "longtext") {
      el = textarea(id, it[spec.k], function (v) { it[spec.k] = v; onChange(); }, 56);
    } else if (spec.type === "select") {
      el = U.el("select", { id: id });
      el.appendChild(U.el("option", { value: "", text: "—" }));
      spec.options.forEach(function (o) { el.appendChild(U.el("option", { value: o, text: o })); });
      el.value = it[spec.k] || "";
      el.onchange = function () { it[spec.k] = el.value; onChange(); };
    } else {
      el = U.el("input", { id: id, type: spec.type === "date" ? "date" : "text", class: "line", placeholder: spec.ph || "" });
      el.value = it[spec.k] || "";
      el.addEventListener("input", function () { it[spec.k] = el.value; onChange(); });
      el.addEventListener("change", function () { it[spec.k] = el.value; onChange(); });
    }
    w.appendChild(el);
    return w;
  }
  F.list = function (sessId, f) {
    var box = U.el("div", { class: "box listbox" + (f.output ? " output" : ""), "data-fid": f.id });
    if (f.label) box.appendChild(U.el("label", { text: f.label }));
    if (f.hint) box.appendChild(U.el("div", { class: "hint", text: f.hint }));
    var val = clone(CB.getField(sessId, f.id)); val.items = val.items || [];
    function commit() { CB.setField(sessId, f.id, clone(val)); changed(f.id); }
    var list = U.el("div", { class: "litems" });
    function draw() {
      list.innerHTML = "";
      if (!val.items.length) list.appendChild(U.el("div", { class: "small muted", text: f.emptyText || "Belum ada isian." }));
      val.items.forEach(function (it, i) {
        var row = U.el("div", { class: "litem" + ((f.itemFields || []).length > 1 ? " multi" : "") });
        (f.itemFields || [{ k: "text", label: "", type: "text" }]).forEach(function (spec) { row.appendChild(itemInput(it, spec, commit)); });
        var del = U.el("button", { type: "button", class: "iconbtn", text: "✕", title: "Hapus", "aria-label": "Hapus item " + (i + 1) });
        del.onclick = function () { val.items.splice(i, 1); commit(); draw(); };
        row.appendChild(del);
        list.appendChild(row);
      });
    }
    draw(); box.appendChild(list);
    if (!f.max || val.items.length < f.max) {
      var add = U.el("button", { type: "button", class: "addbtn", text: f.addText || "+ Tambah" });
      add.onclick = function () {
        if (f.max && val.items.length >= f.max) return;
        val.items.push({ id: U.uuid() }); commit(); draw();
        var last = list.lastElementChild; if (last) { var t = last.querySelector("input,textarea,select"); if (t) t.focus(); }
      };
      box.appendChild(add);
    }
    return box;
  };

  /* ---------- parts (kalimat berongga, mis. "We compete in ___, because ___") ----------
   * f.parts: [{k, before, after, ph}] · nilai: { <k>: "teks" } */
  F.parts = function (sessId, f) {
    var box = U.el("div", { class: "box partsbox" + (f.output ? " output" : ""), "data-fid": f.id });
    if (f.label) box.appendChild(U.el("label", { text: f.label }));
    if (f.hint) box.appendChild(U.el("div", { class: "hint", text: f.hint }));
    var val = clone(CB.getField(sessId, f.id));
    function commit() { CB.setField(sessId, f.id, clone(val)); changed(f.id); }
    var preview = f.previewTpl ? U.el("div", { class: "partpreview" }) : null;
    function upd() {
      if (!preview) return;
      preview.textContent = f.previewTpl.replace(/\{(\w+)\}/g, function (_, k) { return (val[k] || "").trim() || "[" + k + "]"; });
    }
    var grid = U.el("div", { class: "partgrid" });
    f.parts.forEach(function (p) {
      var w = U.el("div", { class: "part" });
      var id = fid(f) + "_" + p.k;
      w.appendChild(U.el("label", { for: id, text: p.label }));
      var inp = p.long ? textarea(id, val[p.k], function (v) { val[p.k] = v; commit(); upd(); }, 44) : U.el("input", { id: id, type: "text", class: "line", placeholder: p.ph || "" });
      if (!p.long) { inp.value = val[p.k] || ""; inp.addEventListener("input", function () { val[p.k] = inp.value; commit(); upd(); }); }
      w.appendChild(inp); grid.appendChild(w);
    });
    box.appendChild(grid);
    if (preview) { upd(); box.appendChild(preview); }
    return box;
  };

  /* ---------- enum (pilih satu) · nilai: "<option value>" ---------- */
  F.enum = function (sessId, f) {
    var box = U.el("div", { class: "box enumbox", "data-fid": f.id });
    box.appendChild(U.el("label", { text: f.label }));
    if (f.hint) box.appendChild(U.el("div", { class: "hint", text: f.hint }));
    var cur = CB.getField(sessId, f.id) || "";
    var row = U.el("div", { class: "enumrow", role: "radiogroup" });
    f.options.forEach(function (o) {
      var lb = U.el("label", { class: "chk" });
      var r = U.el("input", { type: "radio", name: fid(f), value: o.v });
      r.checked = cur === o.v;
      r.onchange = function () { CB.setField(sessId, f.id, o.v); changed(f.id); };
      lb.appendChild(r); lb.appendChild(U.el("span", { text: o.label }));
      row.appendChild(lb);
    });
    box.appendChild(row);
    return box;
  };

  /* ---------- segments (kolom segmen 2–4 × baris tetap) ----------
   * f.rows: [{k,label}] (baris pertama = nama segmen) · nilai: { items: [ {id, <k>...} ] } */
  F.segments = function (sessId, f) {
    var wrap = U.el("div", { class: "box tablebox", "data-fid": f.id });
    var val = clone(CB.getField(sessId, f.id)); val.items = val.items || [];
    if (!val.items.length) { val.items = [{ id: U.uuid() }, { id: U.uuid() }]; }
    function commit() { CB.setField(sessId, f.id, clone(val)); changed(f.id); }
    var sc = U.el("div", { class: "tscroll" }); var t = U.el("table", { class: "wbtable seg" + (f.narrowHead ? " narrowhead" : "") });
    sc.appendChild(t); wrap.appendChild(sc);
    var bar = U.el("div", { class: "segbar" }); wrap.appendChild(bar);
    function draw() {
      t.innerHTML = "";
      f.rows.forEach(function (r, ri) {
        var tr = U.el("tr");
        tr.appendChild(U.el("th", { scope: "row", text: r.label }));
        val.items.forEach(function (it) {
          var td = U.el("td");
          var inp = ri === 0 ? U.el("input", { type: "text", class: "cell strong", placeholder: "nama segmen" }) : U.el("textarea", { class: "cell", rows: "3" });
          inp.value = it[r.k] || "";
          inp.addEventListener("input", function () { it[r.k] = inp.value; commit(); });
          td.appendChild(inp); tr.appendChild(td);
        });
        t.appendChild(tr);
      });
      var tr2 = U.el("tr"); tr2.appendChild(U.el("th"));
      val.items.forEach(function (it, i) {
        var td = U.el("td", { class: "act" });
        if (val.items.length > (f.min || 2)) {
          var del = U.el("button", { type: "button", class: "iconbtn", text: "Hapus kolom" });
          del.onclick = function () { val.items.splice(i, 1); commit(); draw(); };
          td.appendChild(del);
        }
        tr2.appendChild(td);
      });
      t.appendChild(tr2);
      bar.innerHTML = "";
      if (val.items.length < (f.max || 4)) {
        var add = U.el("button", { type: "button", class: "addbtn", text: "+ Tambah segmen" });
        add.onclick = function () { val.items.push({ id: U.uuid() }); commit(); draw(); };
        bar.appendChild(add);
      }
    }
    draw();
    if (!CB.getField(sessId, f.id)) commit();
    return wrap;
  };

  /* ---------- segscore (skor 1–5 per segmen dari field lain, total dihitung) ----------
   * f.from: id field segments · f.criteria: [{k,label}] · nilai: { <segId>: { <k>: n } } */
  F.segscore = function (sessId, f) {
    var wrap = U.el("div", { class: "box tablebox", "data-fid": f.id });
    var sc = U.el("div", { class: "tscroll" }); wrap.appendChild(sc);
    var best = U.el("div", { class: "lowest" }); wrap.appendChild(best);
    function draw() {
      var val = clone(CB.getField(sessId, f.id));
      var segs = ((CB.getField(sessId, f.from) || {}).items || []);
      var t = U.el("table", { class: "wbtable" });
      var hr = U.el("tr"); hr.appendChild(U.el("th", { text: f.rowLabel || "SEGMENT" }));
      f.criteria.forEach(function (c) { hr.appendChild(U.el("th", { text: c.label })); });
      hr.appendChild(U.el("th", { text: "TOTAL" }));
      t.appendChild(hr);
      var totals = [];
      segs.forEach(function (s) {
        var tr = U.el("tr");
        tr.appendChild(U.el("th", { scope: "row", text: s.name || "(segmen tanpa nama)" }));
        val[s.id] = val[s.id] || {};
        var tot = U.el("td", { class: "total" });
        function sum() { var n = 0, all = true; f.criteria.forEach(function (c) { if (val[s.id][c.k]) n += val[s.id][c.k]; else all = false; }); return { n: n, all: all }; }
        f.criteria.forEach(function (c) {
          var td = U.el("td");
          var sel = U.el("select", { class: "scoresel", "aria-label": c.label + " " + (s.name || "") });
          sel.appendChild(U.el("option", { value: "", text: "—" }));
          [1, 2, 3, 4, 5].forEach(function (n) { sel.appendChild(U.el("option", { value: String(n), text: String(n) })); });
          sel.value = val[s.id][c.k] ? String(val[s.id][c.k]) : "";
          sel.onchange = function () {
            val[s.id][c.k] = sel.value ? parseInt(sel.value, 10) : null;
            CB.setField(sessId, f.id, clone(val)); changed(f.id);
            var r = sum(); tot.textContent = r.all ? String(r.n) : "—"; drawBest();
          };
          td.appendChild(sel); tr.appendChild(td);
        });
        var r0 = sum(); tot.textContent = r0.all ? String(r0.n) : "—";
        tr.appendChild(tot); t.appendChild(tr);
        totals.push({ s: s, sum: sum });
      });
      function drawBest() {
        var done = totals.map(function (x) { var r = x.sum(); return { name: x.s.name || "(tanpa nama)", n: r.n, all: r.all }; }).filter(function (x) { return x.all; });
        best.innerHTML = "";
        if (!segs.length) { best.textContent = "Isi Segmentation Matrix (hlm. 3) dulu; segmennya muncul di sini otomatis."; return; }
        if (done.length < segs.length) { best.textContent = "Total tertinggi muncul setelah semua skor terisi."; return; }
        done.sort(function (a, b) { return b.n - a.n; });
        var tie = done.length > 1 && done[0].n === done[1].n;
        best.innerHTML = "<b>Total tertinggi:</b> " + U.esc(done[0].name) + " (" + done[0].n + ")" + (tie ? " — <b>seri</b> dengan " + U.esc(done[1].name) + ". Tulis alasan kamu memecah seri di SECONDARY AUDIENCE." : ".");
      }
      sc.innerHTML = ""; sc.appendChild(t); drawBest();
    }
    draw();
    CB.on("change", function (id) { if (id === f.from) draw(); });
    return wrap;
  };

  /* ---------- map2d (Perceptual Map: titik bernama di dua sumbu) ----------
   * f.axesFrom: id field parts sumbu · f.namesFrom: {field, row} untuk usulan nama
   * nilai: { points: [ {id, name, x: 0–1, y: 0–1} ] }  (x kiri→kanan, y bawah→atas) */
  F.map2d = function (sessId, f) {
    var box = U.el("div", { class: "box mapbox", "data-fid": f.id });
    if (f.label) box.appendChild(U.el("label", { text: f.label }));
    if (f.hint) box.appendChild(U.el("div", { class: "hint", text: f.hint }));
    var val = clone(CB.getField(sessId, f.id)); val.points = val.points || [];
    function commit() { CB.setField(sessId, f.id, clone(val)); changed(f.id); }
    var layout = U.el("div", { class: "maplayout" });
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 400 400"); svg.setAttribute("class", "mapsvg"); svg.setAttribute("role", "img");
    layout.appendChild(svg);
    var side = U.el("div", { class: "mapside" }); layout.appendChild(side);
    box.appendChild(layout);
    function axes() { return CB.getField(sessId, f.axesFrom) || {}; }
    function sv(tag, attrs, text) { var e = document.createElementNS(NS, tag); Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); }); if (text != null) e.textContent = text; return e; }
    var drag = null;
    function toXY(evt) {
      var r = svg.getBoundingClientRect();
      var x = (evt.clientX - r.left) / r.width, y = 1 - (evt.clientY - r.top) / r.height;
      return { x: Math.min(0.97, Math.max(0.03, x)), y: Math.min(0.97, Math.max(0.03, y)) };
    }
    function drawSvg() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var a = axes();
      svg.appendChild(sv("rect", { x: 0, y: 0, width: 400, height: 400, class: "mapbg" }));
      svg.appendChild(sv("line", { x1: 200, y1: 14, x2: 200, y2: 386, class: "mapaxis" }));
      svg.appendChild(sv("line", { x1: 14, y1: 200, x2: 386, y2: 200, class: "mapaxis" }));
      svg.appendChild(sv("text", { x: 200, y: 12, class: "maplab", "text-anchor": "middle" }, a.axis1_high || "AXIS 1 · high end"));
      svg.appendChild(sv("text", { x: 200, y: 396, class: "maplab", "text-anchor": "middle" }, a.axis1_low || "AXIS 1 · low end"));
      svg.appendChild(sv("text", { x: 6, y: 192, class: "maplab", "text-anchor": "start" }, a.axis2_left || "AXIS 2 · left"));
      svg.appendChild(sv("text", { x: 394, y: 192, class: "maplab", "text-anchor": "end" }, a.axis2_right || "AXIS 2 · right"));
      val.points.forEach(function (pt) {
        var g = sv("g", { class: "mappt", tabindex: "0" });
        var cx = pt.x * 400, cy = (1 - pt.y) * 400;
        g.appendChild(sv("circle", { cx: cx, cy: cy, r: 9 }));
        g.appendChild(sv("text", { x: cx + 12, y: cy + 4, class: "mapname" }, pt.name || "?"));
        g.addEventListener("pointerdown", function (e) { drag = pt; svg.setPointerCapture(e.pointerId); e.preventDefault(); });
        g.addEventListener("keydown", function (e) {
          var d = 0.02, k = e.key;
          if (k === "ArrowLeft") pt.x = Math.max(0.03, pt.x - d); else if (k === "ArrowRight") pt.x = Math.min(0.97, pt.x + d);
          else if (k === "ArrowUp") pt.y = Math.min(0.97, pt.y + d); else if (k === "ArrowDown") pt.y = Math.max(0.03, pt.y - d); else return;
          e.preventDefault(); commit(); drawSvg(); var again = svg.querySelectorAll(".mappt")[val.points.indexOf(pt)]; if (again) again.focus();
        });
        svg.appendChild(g);
      });
    }
    svg.addEventListener("pointermove", function (e) { if (!drag) return; var p = toXY(e); drag.x = p.x; drag.y = p.y; drawSvg(); });
    svg.addEventListener("pointerup", function () { if (drag) { drag = null; commit(); } });
    function suggested() {
      if (!f.namesFrom) return [];
      var m = CB.getField(sessId, f.namesFrom.field) || {};
      var row = (m.rows || {})[f.namesFrom.row] || {};
      return (f.namesFrom.cols || []).map(function (c) { return (row[c] || "").trim(); }).filter(function (n) { return n && !/^UNKNOWN/i.test(n); });
    }
    function drawSide() {
      side.innerHTML = "";
      side.appendChild(U.el("div", { class: "small muted", text: "Seret titik di peta untuk memindahkannya (atau pilih titik lalu pakai tombol panah)." }));
      val.points.forEach(function (pt, i) {
        var row = U.el("div", { class: "litem" });
        var inp = U.el("input", { type: "text", class: "line", "aria-label": "Nama titik " + (i + 1) });
        inp.value = pt.name || "";
        inp.addEventListener("input", function () { pt.name = inp.value; commit(); drawSvg(); });
        var del = U.el("button", { type: "button", class: "iconbtn", text: "✕", title: "Hapus titik" });
        del.onclick = function () { val.points.splice(i, 1); commit(); drawSvg(); drawSide(); };
        row.appendChild(inp); row.appendChild(del); side.appendChild(row);
      });
      var add = U.el("button", { type: "button", class: "addbtn", text: "+ Tambah titik" });
      add.onclick = function () { val.points.push({ id: U.uuid(), name: "", x: 0.5, y: 0.5 }); commit(); drawSvg(); drawSide(); };
      side.appendChild(add);
      var sug = suggested().filter(function (n) { return !val.points.some(function (p) { return (p.name || "").trim().toLowerCase() === n.toLowerCase(); }); });
      if (sug.length) {
        var b = U.el("button", { type: "button", class: "addbtn", text: "+ Tambahkan " + sug.length + " nama dari hlm. 6 yang belum ada" });
        b.onclick = function () {
          var base = val.points.length, tot = base + sug.length;
          sug.forEach(function (n, i) {
            var a = (2 * Math.PI * (base + i)) / Math.max(tot, 1) + 0.4;
            val.points.push({ id: U.uuid(), name: n, x: 0.5 + 0.3 * Math.cos(a), y: 0.5 + 0.3 * Math.sin(a) });
          });
          commit(); drawSvg(); drawSide();
        };
        side.appendChild(b);
      }
    }
    drawSvg(); drawSide();
    CB.on("change", function (id) { if (id === f.axesFrom) drawSvg(); if (f.namesFrom && id === f.namesFrom.field) drawSide(); });
    return box;
  };

  /* ---------- sliders (pasangan kutub, mis. Playful ↔ Serious) ----------
   * f.pairs: [{k, left, right}] · nilai: { <k>: 0–1 } (0 = kutub kiri, 1 = kutub kanan).
   * Posisi baru tersimpan setelah slider disentuh; slider yang belum disentuh = belum berkomitmen. */
  F.sliders = function (sessId, f) {
    var box = U.el("div", { class: "box slidersbox", "data-fid": f.id });
    if (f.label) box.appendChild(U.el("label", { text: f.label }));
    if (f.hint) box.appendChild(U.el("div", { class: "hint", text: f.hint }));
    var val = clone(CB.getField(sessId, f.id));
    function commit() { CB.setField(sessId, f.id, clone(val)); changed(f.id); }
    f.pairs.forEach(function (pr) {
      var row = U.el("div", { class: "sliderrow" });
      var id = fid(f) + "_" + pr.k;
      row.appendChild(U.el("label", { class: "pole l", for: id, text: pr.left }));
      var inp = U.el("input", { id: id, type: "range", min: "0", max: "100", step: "1", "aria-label": pr.left + " sampai " + pr.right });
      var set = typeof val[pr.k] === "number";
      inp.value = set ? String(Math.round(val[pr.k] * 100)) : "50";
      var st = U.el("span", { class: "slval small muted" });
      function paint() { inp.className = set ? "" : "untouched"; st.textContent = set ? Math.round(val[pr.k] * 100) + "" : "belum dipilih"; }
      paint();
      function upd() { set = true; val[pr.k] = parseInt(inp.value, 10) / 100; paint(); commit(); }
      inp.addEventListener("input", upd); inp.addEventListener("change", upd);
      row.appendChild(inp);
      row.appendChild(U.el("span", { class: "pole r", text: pr.right }));
      row.appendChild(st);
      box.appendChild(row);
    });
    return box;
  };

  /* ---------- copyfrom: longtext dengan tombol salin dari field lain (TARIK) ---------- */
  F.copytext = function (sessId, f) {
    var box = F.longtext(sessId, f);
    var b = U.el("button", { type: "button", class: "addbtn", text: f.copyLabel || "Salin dari sumber" });
    b.onclick = function () {
      var src = CB.getField(sessId, f.copyFrom) || "";
      var ta = box.querySelector("textarea");
      ta.value = src; CB.setField(sessId, f.id, src); changed(f.id); autosize(ta);
    };
    box.appendChild(b);
    return box;
  };

  /* ---------- teks cetak per tipe ---------- */
  F.printText = function (f, v, sessId) {
    if (v == null || v === "") return "";
    if (typeof v === "string") return v;
    if (f.type === "score") return (v.score ? v.score + " / 5" : "—") + (v.justification ? " — " + v.justification : "");
    if (f.type === "trace") {
      var src = (v.trace || []).map(function (id) { return CB.pageLabel(id) + " " + ((CB.findField(id) || {}).label || id); });
      return (v.text || "") + (src.length ? "\n[Jejak: " + src.join("; ") + "]" : "");
    }
    if (f.type === "table") {
      var rows = [];
      (f.rows || []).forEach(function (r) {
        var x = (v.rows || {})[r.k] || {};
        var cells = f.columns.map(function (c) { return x[c.k] || "—"; });
        if (cells.some(function (c) { return c !== "—"; })) rows.push(r.label + ": " + cells.join(" · "));
      });
      (v.extra || []).forEach(function (x) { rows.push((x.label || "(tanpa nama)") + ": " + f.columns.map(function (c) { return x[c.k] || "—"; }).join(" · ")); });
      return rows.join("\n");
    }
    if (f.type === "list") {
      return (v.items || []).map(function (it, i) {
        return (i + 1) + ". " + (f.itemFields || [{ k: "text" }]).map(function (s) { return it[s.k] ? (s.label ? s.label + ": " : "") + it[s.k] : ""; }).filter(Boolean).join(" · ");
      }).join("\n");
    }
    if (f.type === "parts") {
      if (f.previewTpl) return f.previewTpl.replace(/\{(\w+)\}/g, function (_, k) { return v[k] || "____"; });
      return f.parts.map(function (p) { return p.label + ": " + (v[p.k] || "—"); }).join("\n");
    }
    if (f.type === "enum") { var o = (f.options || []).filter(function (x) { return x.v === v; })[0]; return o ? o.label : v; }
    if (f.type === "segments") {
      return (v.items || []).map(function (it, i) {
        return (i + 1) + ". " + f.rows.map(function (r) { return r.label + ": " + (it[r.k] || "—"); }).join(" · ");
      }).join("\n");
    }
    if (f.type === "segscore") {
      var segs = ((CB.getField(sessId, f.from) || {}).items || []);
      return segs.map(function (s) {
        var x = v[s.id] || {}, n = 0;
        var parts = f.criteria.map(function (c) { n += x[c.k] || 0; return c.label + " " + (x[c.k] || "—"); });
        return (s.name || "(tanpa nama)") + ": " + parts.join(", ") + " · TOTAL " + n;
      }).join("\n");
    }
    if (f.type === "sliders") {
      return f.pairs.map(function (pr) {
        var x = v[pr.k];
        return pr.left + " – " + pr.right + ": " + (typeof x === "number" ? Math.round(x * 100) + "/100 (0 = " + pr.left + ", 100 = " + pr.right + ")" : "belum dipilih");
      }).join("\n");
    }
    if (f.type === "map2d") return (v.points || []).map(function (p) { return (p.name || "?") + " (" + Math.round(p.x * 100) + ", " + Math.round(p.y * 100) + ")"; }).join("; ");
    return JSON.stringify(v);
  };
  F.printValue = function (v) { return typeof v === "string" ? v : (v == null ? "" : JSON.stringify(v)); };

  CB.fields = F;
})();
