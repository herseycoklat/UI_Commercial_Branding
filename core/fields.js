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
  function optV(o) { return typeof o === "string" ? o : o.v; }
  function optL(o) { return typeof o === "string" ? o : o.label; }
  CB.optLabel = function (spec, v) { var o = (spec.options || []).filter(function (x) { return optV(x) === v; })[0]; return o ? optL(o) : (v || ""); };
  function itemInput(it, spec, onChange, onSelect) {
    var w = U.el("div", { class: "lfield " + (spec.type || "text") + " k_" + spec.k });
    var id = "li_" + it.id + "_" + spec.k;
    w.appendChild(U.el("label", { for: id, text: spec.label }));
    var el;
    if (spec.type === "longtext") {
      el = textarea(id, it[spec.k], function (v) { it[spec.k] = v; onChange(); }, 56);
    } else if (spec.type === "select") {
      el = U.el("select", { id: id });
      el.appendChild(U.el("option", { value: "", text: spec.empty || "—" }));
      spec.options.forEach(function (o) { el.appendChild(U.el("option", { value: optV(o), text: optL(o) })); });
      el.value = it[spec.k] || "";
      el.onchange = function () { it[spec.k] = el.value; onChange(); if (onSelect) onSelect(); };
    } else {
      el = U.el("input", { id: id, type: spec.type === "date" ? "date" : "text", class: "line", placeholder: spec.ph || "" });
      el.value = it[spec.k] || "";
      el.addEventListener("input", function () { it[spec.k] = el.value; onChange(); });
      el.addEventListener("change", function () { it[spec.k] = el.value; onChange(); });
    }
    w.appendChild(el);
    return w;
  }
  /* list.itemFields[].showIf = { k, eq } : isian hanya tampil bila item[k] === eq (nilainya tetap disimpan bila disembunyikan).
   * list.guide = HTML petunjuk tambahan app (di bawah hint workbook). */
  F.list = function (sessId, f) {
    var box = U.el("div", { class: "box listbox" + (f.output ? " output" : ""), "data-fid": f.id });
    if (f.label) box.appendChild(U.el("label", { text: f.label }));
    if (f.hint) box.appendChild(U.el("div", { class: "hint", text: f.hint }));
    if (f.guide) box.appendChild(U.el("div", { class: "lguide" }, f.guide));
    var val = clone(CB.getField(sessId, f.id)); val.items = val.items || [];
    var mine = false;
    function commit() { mine = true; CB.setField(sessId, f.id, clone(val)); changed(f.id); mine = false; }
    var list = U.el("div", { class: "litems" });
    function draw() {
      list.innerHTML = "";
      if (!val.items.length) list.appendChild(U.el("div", { class: "small muted", text: f.emptyText || "Belum ada isian." }));
      val.items.forEach(function (it, i) {
        var row = U.el("div", { class: "litem" + ((f.itemFields || []).length > 1 ? " multi" : ""), "data-iid": it.id });
        (f.itemFields || [{ k: "text", label: "", type: "text" }]).forEach(function (spec) {
          if (spec.showIf && it[spec.showIf.k] !== spec.showIf.eq) return;
          row.appendChild(itemInput(it, spec, commit, draw));
        });
        var del = U.el("button", { type: "button", class: "iconbtn", text: "✕", title: "Hapus", "aria-label": "Hapus item " + (i + 1) });
        del.onclick = function () { val.items.splice(i, 1); commit(); draw(); };
        row.appendChild(del);
        list.appendChild(row);
      });
    }
    draw(); box.appendChild(list);
    // Item bisa ditambah dari halaman lain (mis. tombol di hlm. 6): muat ulang supaya tidak tertimpa.
    CB.on("change", function (id) { if (id === f.id && !mine) { val = clone(CB.getField(sessId, f.id)); val.items = val.items || []; draw(); } });
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

  /* ====================== Tipe Sesi 3 untuk Gate 2 (patch kontrak v3.5) ====================== */
  function snip(t, n) { t = (t || "").replace(/\s+/g, " ").trim(); n = n || 160; return t.length > n ? t.slice(0, n) + "…" : t; }
  function sidOf(id) { var m = /^s(\d+)\./.exec(id); return m ? "S" + m[1] : null; }
  /* Isi sumber untuk ditampilkan: "sN.pM.x" atau "s3.p5.promise_proof#<itemId>". */
  function sourceText(ref) {
    if (!ref) return "";
    var parts = ref.split("#"), id = parts[0], sid = sidOf(id), f = CB.findField(id);
    if (!sid || !f) return "";
    var v = CB.getField(sid, id);
    if (parts[1]) {
      var it = ((v || {}).items || []).filter(function (x) { return x.id === parts[1]; })[0];
      if (!it) return "";
      return (it.promise || "(tanpa janji)") + " → " + (it.proof || "(bukti belum ditulis)") + (it.status ? " [" + CB.optLabel(ppStatusSpec(), it.status) + "]" : "");
    }
    return F.printText(f, v, sid);
  }
  CB.sourceText = sourceText;
  function ppStatusSpec() {
    var f = CB.findField("s3.p5.promise_proof");
    return ((f && f.itemFields) || []).filter(function (x) { return x.k === "status"; })[0] || { options: [] };
  }
  function ppItems() { return ((CB.getField("S3", "s3.p5.promise_proof") || {}).items || []); }
  function ppLabel(it, i) { return "Baris " + (i + 1) + ": " + snip(it.promise || "(janji belum ditulis)", 70); }
  function sel(id, options, value, onChange) {
    var s = U.el("select", { id: id });
    options.forEach(function (o) { s.appendChild(U.el("option", { value: o.v, text: o.label })); });
    s.value = value || "";
    if (s.value !== (value || "")) { s.appendChild(U.el("option", { value: value, text: "(sumber lama tidak ditemukan)" })); s.value = value; }
    s.onchange = function () { onChange(s.value); };
    return s;
  }
  function lineInput(id, value, ph, onInput) {
    var i = U.el("input", { id: id, type: "text", class: "line", placeholder: ph || "" });
    i.value = value || "";
    i.addEventListener("input", function () { onInput(i.value); });
    return i;
  }

  /* ---------- lines: satu baris per pasangan slider ----------
   * f.pairsFrom = ID field sliders · nilai: { <pairKey>: "teks", _legacy?: "isian lama satu kotak" } */
  F.lines = function (sessId, f) {
    var box = U.el("div", { class: "box linesbox", "data-fid": f.id });
    if (f.label) box.appendChild(U.el("label", { text: f.label }));
    if (f.hint) box.appendChild(U.el("div", { class: "hint", text: f.hint }));
    var raw = CB.getField(sessId, f.id);
    var val = typeof raw === "string" ? { _legacy: raw } : clone(raw);
    if (val._legacy) box.appendChild(U.el("div", { class: "legacy small", text: "Isian lama (satu kotak), tetap disimpan: " + val._legacy }));
    var src = CB.findField(f.pairsFrom) || { pairs: [] };
    var marks = {};
    function commit() { CB.setField(sessId, f.id, clone(val)); changed(f.id); }
    src.pairs.forEach(function (pr) {
      var row = U.el("div", { class: "lineitem" });
      var id = fid(f) + "_" + pr.k;
      var lab = U.el("label", { for: id });
      lab.appendChild(U.el("b", { text: pr.left + " – " + pr.right }));
      marks[pr.k] = U.el("span", { class: "small muted" });
      lab.appendChild(marks[pr.k]);
      row.appendChild(lab);
      row.appendChild(lineInput(id, val[pr.k], "kenapa di posisi ini? kaitkan ke kalimat positioning", function (v) { val[pr.k] = v; commit(); }));
      box.appendChild(row);
    });
    function paint() {
      var sv = CB.getField(sessId, f.pairsFrom) || {};
      src.pairs.forEach(function (pr) {
        var x = sv[pr.k];
        marks[pr.k].textContent = typeof x === "number" ? " · posisi " + Math.round(x * 100) + "/100" + (x >= 0.45 && x <= 0.55 ? " (dekat tengah: tulis kenapa belum diputuskan)" : "") : " · slider belum dipilih";
      });
    }
    paint(); CB.on("change", function (id) { if (id === f.pairsFrom) paint(); });
    return box;
  };

  /* ---------- sources: sumber tiap blank kalimat positioning ----------
   * f.blanks: [{k, label, opts:[{id, label}], rows?: "<list id>"}] · f.from = ID field parts
   * nilai: { <k>: { src: "<id>" | "<listId>#<itemId>" | "other", note: "teks" } } */
  F.sources = function (sessId, f) {
    var box = U.el("div", { class: "box sourcesbox", "data-fid": f.id });
    if (f.label) box.appendChild(U.el("label", { text: f.label }));
    if (f.hint) box.appendChild(U.el("div", { class: "hint", text: f.hint }));
    var val = clone(CB.getField(sessId, f.id));
    function commit() { CB.setField(sessId, f.id, clone(val)); changed(f.id); }
    var body = U.el("div"); box.appendChild(body);
    var dyn = {};
    f.blanks.forEach(function (b) {
      var row = U.el("div", { class: "srcrow" });
      var head = U.el("div", { class: "srchead" });
      head.appendChild(U.el("b", { text: b.label }));
      var cur = U.el("span", { class: "small muted" }); head.appendChild(cur);
      row.appendChild(head);
      var selWrap = U.el("div", { class: "srcsel" }); row.appendChild(selWrap);
      var snipEl = U.el("div", { class: "srcsnip small" }); row.appendChild(snipEl);
      var v = val[b.k] = val[b.k] || {};
      var note = lineInput(fid(f) + "_" + b.k + "_note", v.note, "catatan: bagian mana yang dipakai, atau sumber lain", function (t) { v.note = t; commit(); });
      row.appendChild(note);
      dyn[b.k] = { cur: cur, selWrap: selWrap, snip: snipEl, b: b };
      body.appendChild(row);
    });
    function draw() {
      var d = CB.getField(sessId, f.from) || {};
      f.blanks.forEach(function (b) {
        var o = dyn[b.k], v = val[b.k];
        o.cur.textContent = d[b.k] ? " · isianmu: " + snip(d[b.k], 90) : " · blank ini belum diisi di draf";
        var opts = [{ v: "", label: "— pilih sumber —" }].concat(b.opts.map(function (x) { return { v: x.id, label: x.label }; }));
        if (b.rows) ppItems().forEach(function (it, i) { opts.push({ v: b.rows + "#" + it.id, label: "PROMISE → PROOF hlm. 5 · " + ppLabel(it, i) }); });
        opts.push({ v: "other", label: "Sumber lain (tulis di catatan)" });
        o.selWrap.innerHTML = "";
        o.selWrap.appendChild(sel(fid(f) + "_" + b.k, opts, v.src, function (x) { v.src = x; commit(); paintSnip(b.k); }));
        paintSnip(b.k);
      });
    }
    function paintSnip(k) {
      var v = val[k], o = dyn[k];
      if (!v.src) { o.snip.textContent = ""; o.snip.className = "srcsnip small"; return; }
      if (v.src === "other") { o.snip.textContent = v.note ? "" : "Tulis sumbernya di catatan."; o.snip.className = "srcsnip small warn"; return; }
      var t = sourceText(v.src);
      o.snip.textContent = t ? "Isi sumber: " + snip(t, 200) : "Sumber ini masih kosong. Isi dulu di " + CB.pageLabel(v.src) + ".";
      o.snip.className = "srcsnip small" + (t ? "" : " warn");
    }
    draw();
    CB.on("change", function (id) { if (id && id !== f.id && (id === f.from || id === "s3.p5.promise_proof" || /^s2\./.test(id) || /^s3\.p[34]\./.test(id))) draw(); });
    return box;
  };

  /* ---------- origins: asal dan baris bukti tiap pilar Message House ----------
   * f.pillars: [{k, id}] · f.opts: [{id, label}] · f.rows = ID list janji→bukti
   * nilai: { <k>: { source: "<id>", proof_ref: "<itemId>" } } */
  F.origins = function (sessId, f) {
    var box = U.el("div", { class: "box originsbox", "data-fid": f.id });
    if (f.label) box.appendChild(U.el("label", { text: f.label }));
    if (f.hint) box.appendChild(U.el("div", { class: "hint", text: f.hint }));
    var val = clone(CB.getField(sessId, f.id));
    function commit() { CB.setField(sessId, f.id, clone(val)); changed(f.id); }
    var body = U.el("div", { class: "origgrid" }); box.appendChild(body);
    function draw() {
      body.innerHTML = "";
      var items = ppItems();
      f.pillars.forEach(function (p, pi) {
        var v = val[p.k] = val[p.k] || {};
        var col = U.el("div", { class: "origcol" });
        col.appendChild(U.el("b", { text: "PILLAR " + (pi + 1) }));
        col.appendChild(U.el("div", { class: "small muted", text: snip(CB.getField(sessId, p.id), 90) || "(pilar belum ditulis)" }));
        var l1 = U.el("label", { class: "small", for: fid(f) + "_" + p.k + "_src", text: "Asal pilar" }); col.appendChild(l1);
        col.appendChild(sel(fid(f) + "_" + p.k + "_src", [{ v: "", label: "— pilih kotak asal —" }].concat(f.opts.map(function (o) { return { v: o.id, label: o.label }; })), v.source, function (x) { v.source = x; commit(); draw(); }));
        if (v.source) col.appendChild(U.el("div", { class: "srcsnip small", text: snip(sourceText(v.source), 140) || "Kotak asal ini masih kosong." }));
        var l2 = U.el("label", { class: "small", for: fid(f) + "_" + p.k + "_ref", text: "Baris bukti di PROMISE → PROOF (hlm. 5)" }); col.appendChild(l2);
        col.appendChild(sel(fid(f) + "_" + p.k + "_ref", [{ v: "", label: items.length ? "— pilih baris —" : "— tabel janji dan bukti masih kosong —" }].concat(items.map(function (it, i) { return { v: it.id, label: ppLabel(it, i) }; })), v.proof_ref, function (x) { v.proof_ref = x; commit(); draw(); }));
        var row = items.filter(function (it) { return it.id === v.proof_ref; })[0];
        if (row) {
          var miss = [];
          if (!row.status) miss.push("status belum dipilih");
          if (!(row.proof || "").trim()) miss.push("bukti belum ditulis");
          col.appendChild(U.el("div", { class: "srcsnip small" + (miss.length ? " warn" : ""), text: sourceText(f.rows + "#" + row.id) + (miss.length ? " · " + miss.join(", ") : "") }));
        } else if (v.proof_ref) {
          col.appendChild(U.el("div", { class: "srcsnip small warn", text: "Baris yang dipilih sudah dihapus dari tabel. Pilih lagi." }));
        }
        var add = U.el("button", { type: "button", class: "addbtn small", text: "+ Tambah baris di tabel janji dan bukti" });
        add.onclick = function () {
          var pv = clone(CB.getField(sessId, f.rows)); pv.items = pv.items || [];
          var it = { id: U.uuid(), promise: (CB.getField(sessId, p.id) || "").trim() };
          pv.items.push(it);
          CB.setField(sessId, f.rows, pv); changed(f.rows);
          v.proof_ref = it.id; commit(); draw();
        };
        col.appendChild(add);
        body.appendChild(col);
      });
    }
    draw();
    CB.on("change", function (id) { if (id && id !== f.id && (id === f.rows || /^s3\.p6\.pillar/.test(id) || /^s3\.p[34]\./.test(id) || /^s2\.p5\./.test(id))) draw(); });
    return box;
  };

  /* ---------- reviews: form penilai teman (satu form = satu penilai) ----------
   * f.criteria: [{k, label, q, id}] · nilai: { items: [ { id, name, nim, email, scores:{<k>:1–5}, reasons:{<k>:"teks"} } ] } */
  CB.peerSummary = function (val, criteria) {
    var items = ((val || {}).items || []).filter(function (it) {
      return Object.keys(it.scores || {}).some(function (k) { return it.scores[k] >= 1; });
    });
    var avg = {}, low = [];
    criteria.forEach(function (c) {
      var xs = items.map(function (it) { return (it.scores || {})[c.k]; }).filter(function (x) { return typeof x === "number" && x >= 1 && x <= 5; });
      avg[c.k] = xs.length ? xs.reduce(function (a, b) { return a + b; }, 0) / xs.length : null;
      if (avg[c.k] != null && avg[c.k] <= 2) low.push(c.k);
    });
    return { n: items.length, items: items, avg: avg, low: low };
  };
  CB.reviewIssues = function (it, criteria, ownNim) {
    var out = [], sc = it.scores || {}, rs = it.reasons || {};
    if (!(it.name || "").trim()) out.push("nama penilai kosong");
    var nim = (it.nim || "").trim();
    if (!nim) out.push("NIM penilai kosong");
    else if (!/^\d+$/.test(nim)) out.push("NIM hanya angka");
    else if (ownNim && nim === String(ownNim)) out.push("NIM penilai sama dengan NIM pemilik file: penilai harus orang lain");
    if (!(it.email || "").trim()) out.push("email penilai kosong");
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(it.email.trim())) out.push("format email belum benar");
    var miss = criteria.filter(function (c) { return !sc[c.k]; }).length;
    if (miss) out.push(miss + " skor belum dipilih");
    var noReason = criteria.filter(function (c) { return sc[c.k] && !(rs[c.k] || "").trim(); }).length;
    if (noReason) out.push(noReason + " skor tanpa alasan");
    if (criteria.every(function (c) { return sc[c.k] === 5; })) out.push("kelima skor 5: jangan beri 5 untuk semua; tulis kelemahan yang paling mungkin");
    return out;
  };
  F.reviews = function (sessId, f) {
    var box = U.el("div", { class: "box reviewsbox", "data-fid": f.id });
    if (f.label) box.appendChild(U.el("label", { text: f.label }));
    if (f.guide) box.appendChild(U.el("div", { class: "lguide" }, f.guide));
    var val = clone(CB.getField(sessId, f.id)); val.items = val.items || [];
    if (!val.items.length) val.items.push({ id: U.uuid() }); // form default 1 (disimpan saat mulai diisi)
    function commit() { CB.setField(sessId, f.id, clone(val)); changed(f.id); }
    var list = U.el("div", { class: "rvlist" }); box.appendChild(list);
    var countEl = U.el("div", { class: "rvcount small" });
    function own() { return CB.data && CB.data.identifier && CB.data.identifier.nim; }
    function paintCount() {
      var n = CB.peerSummary(val, f.criteria).n;
      countEl.textContent = n < 2 ? "Baru " + n + " penilai yang memberi skor. Minimal 2 penilai dari kelompok lain." : n + " penilai sudah memberi skor.";
      countEl.className = "rvcount small " + (n < 2 ? "warn" : "ok");
    }
    function draw() {
      list.innerHTML = "";
      val.items.forEach(function (it, i) {
        it.scores = it.scores || {}; it.reasons = it.reasons || {};
        var card = U.el("div", { class: "rvcard", "data-iid": it.id });
        var hd = U.el("div", { class: "rvhead" });
        hd.appendChild(U.el("b", { text: "Penilai " + (i + 1) }));
        if (val.items.length > 1) {
          var del = U.el("button", { type: "button", class: "iconbtn rvdel", text: "Hapus form", "aria-label": "Hapus form penilai " + (i + 1) });
          del.onclick = function () {
            CB.modal({ title: "Hapus form Penilai " + (i + 1) + "?", paras: ["Skor dan alasan dari penilai ini ikut terhapus."], buttons: [{ label: "Batal", value: false, cls: "ghost" }, { label: "Hapus", value: true, cls: "primary" }] })
              .then(function (go) { if (!go) return; val.items.splice(i, 1); commit(); draw(); paintCount(); });
          };
          hd.appendChild(del);
        }
        card.appendChild(hd);
        var idg = U.el("div", { class: "rvid" });
        var warn = U.el("div", { class: "rvwarn small" });
        function paintWarn() {
          var started = it.name || it.nim || it.email || Object.keys(it.scores).length;
          var iss = started ? CB.reviewIssues(it, f.criteria, own()) : [];
          warn.textContent = iss.length ? "Perlu dicek: " + iss.join(" · ") : "";
          warn.style.display = iss.length ? "" : "none";
        }
        function upd() { commit(); paintWarn(); paintCount(); }
        [["name", "Nama penilai", "nama lengkap"], ["nim", "NIM penilai", "angka saja"], ["email", "Email penilai", "email kampus"]].forEach(function (x) {
          var w = U.el("div", { class: "lfield" });
          var id = "rv_" + it.id + "_" + x[0];
          w.appendChild(U.el("label", { for: id, text: x[1] }));
          var inp = lineInput(id, it[x[0]], x[2], function (v) { it[x[0]] = v; upd(); });
          if (x[0] === "nim") inp.setAttribute("inputmode", "numeric");
          if (x[0] === "email") inp.setAttribute("type", "email");
          w.appendChild(inp); idg.appendChild(w);
        });
        card.appendChild(idg);
        f.criteria.forEach(function (c) {
          var r = U.el("div", { class: "rvcrit" });
          var t = U.el("div", { class: "rvq" });
          t.appendChild(U.el("b", { text: c.label }));
          t.appendChild(U.el("span", { class: "small", text: " " + c.q }));
          t.appendChild(U.el("div", { class: "small muted", text: c.id }));
          r.appendChild(t);
          var g = U.el("div", { class: "rvscore", role: "radiogroup", "aria-label": c.label + " skor 1–5" });
          [1, 2, 3, 4, 5].forEach(function (n) {
            var lb = U.el("label", { class: "chk" });
            var rd = U.el("input", { type: "radio", name: "rv_" + it.id + "_" + c.k, value: String(n) });
            rd.checked = it.scores[c.k] === n;
            rd.onchange = function () { it.scores[c.k] = n; upd(); };
            lb.appendChild(rd); lb.appendChild(U.el("span", { text: String(n) }));
            g.appendChild(lb);
          });
          r.appendChild(g);
          r.appendChild(lineInput("rv_" + it.id + "_" + c.k + "_why", it.reasons[c.k], "satu kalimat alasan untuk skor ini", function (v) { it.reasons[c.k] = v; upd(); }));
          card.appendChild(r);
        });
        card.appendChild(warn); paintWarn();
        list.appendChild(card);
      });
    }
    draw();
    var add = U.el("button", { type: "button", class: "addbtn", text: "+ Tambah penilai" });
    add.onclick = function () { val.items.push({ id: U.uuid() }); commit(); draw(); paintCount(); var c = list.lastElementChild; if (c) { var t = c.querySelector("input"); if (t) t.focus(); } };
    box.appendChild(add);
    box.appendChild(countEl); paintCount();
    return box;
  };

  /* ---------- plans: ringkasan rata-rata + rencana per kriteria rendah ----------
   * f.from = ID field reviews · nilai: { <k>: { what, who, when } } (when = teks bebas, bukan pemilih tanggal) */
  F.plans = function (sessId, f) {
    var box = U.el("div", { class: "box plansbox", "data-fid": f.id });
    if (f.label) box.appendChild(U.el("label", { text: f.label }));
    if (f.hint) box.appendChild(U.el("div", { class: "hint", text: f.hint }));
    var src = CB.findField(f.from) || { criteria: [] };
    var val = clone(CB.getField(sessId, f.id));
    function commit() { CB.setField(sessId, f.id, clone(val)); changed(f.id); }
    var sumEl = U.el("div", { class: "plsum" }); box.appendChild(sumEl);
    var msg = U.el("div", { class: "plmsg small" }); box.appendChild(msg);
    var boxes = U.el("div", { class: "plboxes" }); box.appendChild(boxes);
    var lastLow = null;
    function fmt(x) { return x == null ? "—" : (Math.round(x * 10) / 10).toString().replace(".", ","); }
    function draw() {
      var s = CB.peerSummary(CB.getField(sessId, f.from), src.criteria);
      sumEl.innerHTML = "";
      var sc = U.el("div", { class: "tscroll" }); var t = U.el("table", { class: "wbtable pltable" });
      var hr = U.el("tr"); hr.appendChild(U.el("th", { text: "Kriteria" }));
      s.items.forEach(function (it, i) { hr.appendChild(U.el("th", { text: "Penilai " + (i + 1) })); });
      hr.appendChild(U.el("th", { text: "Rata-rata" })); t.appendChild(hr);
      src.criteria.forEach(function (c) {
        var tr = U.el("tr", { class: s.low.indexOf(c.k) >= 0 ? "low" : "" });
        tr.appendChild(U.el("th", { text: c.label }));
        s.items.forEach(function (it) { tr.appendChild(U.el("td", { text: (it.scores || {})[c.k] ? String(it.scores[c.k]) : "—" })); });
        tr.appendChild(U.el("td", { class: "avg", text: fmt(s.avg[c.k]) + (s.low.indexOf(c.k) >= 0 ? " · rendah" : "") }));
        t.appendChild(tr);
      });
      sc.appendChild(t); sumEl.appendChild(sc);
      var lowNames = s.low.map(function (k) { return src.criteria.filter(function (c) { return c.k === k; })[0].label; });
      var m = "";
      if (!s.n) m = "Ringkasan muncul setelah penilai pertama memberi skor.";
      else if (!s.low.length) m = "Tidak ada kriteria dengan rata-rata 2 atau lebih rendah. Catat masukannya.";
      else if (s.low.length === 1) m = "Satu kriteria rendah (" + lowNames[0] + "): sebaiknya diperbaiki. Rencana tidak wajib.";
      else m = s.low.length + " kriteria rendah (" + lowNames.join(", ") + "). Tulis rencana untuk masing-masing: apa, siapa, kapan. Rencana ini menjadi bagian kondisi Gate 2.";
      if (s.n && s.n < 2) m += " Hasil masih sementara: baru " + s.n + " penilai.";
      msg.textContent = m;
      msg.className = "plmsg small " + (s.low.length >= 2 ? "warn" : "");
      var key = s.low.length >= 2 ? s.low.join(",") : "";
      if (key === lastLow) return; // jangan gambar ulang kotak saat sedang mengetik
      lastLow = key; boxes.innerHTML = "";
      if (!key) return;
      s.low.forEach(function (k) {
        var c = src.criteria.filter(function (x) { return x.k === k; })[0];
        var v = val[k] = val[k] || {};
        var b = U.el("div", { class: "plbox", "data-crit": k });
        b.appendChild(U.el("b", { text: "Rencana untuk " + c.label + " (rata-rata " + fmt(s.avg[k]) + ")" }));
        [["what", "Apa yang dikerjakan", "mis. tulis ulang kalimat jadi satu gagasan, lalu minta dinilai ulang"], ["who", "Siapa (nama atau peran di tim)", "mis. brand lead"], ["when", "Kapan", "tulis sendiri, mis. sebelum brief Sesi 4"]].forEach(function (x) {
          var w = U.el("div", { class: "lfield" });
          var id = fid(f) + "_" + k + "_" + x[0];
          w.appendChild(U.el("label", { for: id, text: x[1] }));
          w.appendChild(x[0] === "what" ? textarea(id, v[x[0]], function (t) { v[x[0]] = t; commit(); }, 44) : lineInput(id, v[x[0]], x[2], function (t) { v[x[0]] = t; commit(); }));
          b.appendChild(w);
        });
        boxes.appendChild(b);
      });
    }
    draw(); CB.on("change", function (id) { if (id === f.from) draw(); });
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
        return (i + 1) + ". " + (f.itemFields || [{ k: "text" }]).map(function (s) {
          if (s.showIf && it[s.showIf.k] !== s.showIf.eq) return "";
          var x = s.type === "select" ? CB.optLabel(s, it[s.k]) : it[s.k];
          return x ? (s.label ? s.label + ": " : "") + x : "";
        }).filter(Boolean).join(" · ");
      }).join("\n");
    }
    if (f.type === "lines") {
      var lp = (CB.findField(f.pairsFrom) || { pairs: [] }).pairs;
      return (v._legacy ? "(isian lama) " + v._legacy + "\n" : "") + lp.map(function (pr) { return pr.left + " – " + pr.right + ": " + (v[pr.k] || "—"); }).join("\n");
    }
    if (f.type === "sources") {
      return f.blanks.map(function (b) {
        var x = v[b.k] || {}, lab = x.src === "other" ? "sumber lain" : x.src ? (x.src.indexOf("#") > 0 ? "PROMISE → PROOF hlm. 5" : CB.pageLabel(x.src) + " " + ((CB.findField(x.src) || {}).label || x.src)) : "—";
        return b.label + " ← " + lab + (x.note ? " (" + x.note + ")" : "");
      }).join("\n");
    }
    if (f.type === "origins") {
      var items = ppItems();
      return f.pillars.map(function (p, i) {
        var x = v[p.k] || {}, o = (f.opts || []).filter(function (q) { return q.id === x.source; })[0];
        var ri = -1; items.forEach(function (it, j) { if (it.id === x.proof_ref) ri = j; });
        return "PILLAR " + (i + 1) + ": asal " + (o ? o.label : "—") + " · bukti " + (ri >= 0 ? ppLabel(items[ri], ri) : "—");
      }).join("\n");
    }
    if (f.type === "reviews") {
      return (v.items || []).map(function (it, i) {
        return "Penilai " + (i + 1) + ": " + (it.name || "—") + " · NIM " + (it.nim || "—") + "\n" + f.criteria.map(function (c) {
          return "  " + c.label + " " + ((it.scores || {})[c.k] || "—") + ((it.reasons || {})[c.k] ? " — " + it.reasons[c.k] : "");
        }).join("\n");
      }).join("\n");
    }
    if (f.type === "plans") {
      var cr = (CB.findField(f.from) || { criteria: [] }).criteria;
      var low = CB.peerSummary(CB.getField(sessId, f.from), cr).low;
      return low.length < 2 ? "" : low.map(function (k) {
        var x = v[k] || {}, c = cr.filter(function (q) { return q.k === k; })[0];
        return c.label + ": apa " + (x.what || "—") + " · siapa " + (x.who || "—") + " · kapan " + (x.when || "—");
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
