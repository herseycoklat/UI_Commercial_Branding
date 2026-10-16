/* core/fields.js — komponen field.
 * Setiap komponen menerima (sessId, field) dan mengembalikan elemen DOM.
 * Nilai disimpan lewat CB.setField(sessId, field.id, value), kecuali komponen "log"
 * yang menulis ke CB.data.leadership_log (kontrak v3.2 bagian 4).
 * Bentuk nilai per tipe (JANGAN diubah setelah rilis; tambah saja):
 *   longtext / text : "teks"
 *   table           : { rows: { <baris>: { <kolom>: "teks" } }, extra: [ { label, <kolom>... } ] }
 *   score           : { score: 1–5, justification: "teks" }
 *   trace           : { text: "teks", trace: [ "<id sumber>" ] }
 *   log             : (di leadership_log.entries)
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
    var t = U.el("table", { class: "wbtable", "data-fid": f.id });
    var thead = U.el("thead"), hr = U.el("tr");
    hr.appendChild(U.el("th", { text: f.rowLabel || "" }));
    f.columns.forEach(function (c) { hr.appendChild(U.el("th", { text: c.label })); });
    hr.appendChild(U.el("th", { class: "act", text: "" }));
    thead.appendChild(hr); t.appendChild(thead);
    var tb = U.el("tbody"); t.appendChild(tb);
    function cell(get, set, ph) {
      var td = U.el("td");
      var inp = U.el("input", { type: "text", class: "cell", placeholder: ph || "" });
      inp.value = get() || "";
      inp.addEventListener("input", function () { set(inp.value); commit(); });
      td.appendChild(inp); return td;
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
        tr.appendChild(U.el("td", { class: "act" }));
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

  /* ---------- log (Decision Log = Leadership Log, di leadership_log) ---------- */
  var LOG_MAIN = [
    { k: "decided", label: "WHAT WE DECIDED" },
    { k: "why", label: "WHY" },
    { k: "evidence", label: "EVIDENCE" }
  ];
  var LOG_9D = [
    { k: "decisions_led", label: "Decisions led" },
    { k: "meetings_facilitated", label: "Meetings facilitated" },
    { k: "research_conducted", label: "Research conducted" },
    { k: "commercial_documents", label: "Commercial documents produced" },
    { k: "contributions_other_streams", label: "Contributions to other streams" },
    { k: "conflicts_addressed", label: "Conflicts or coordination problems addressed" },
    { k: "evidence_used", label: "Evidence used" },
    { k: "changes_initiated", label: "Changes initiated" },
    { k: "personal_reflection", label: "Personal reflection" }
  ];
  CB.LOG_MAIN = LOG_MAIN; CB.LOG_9D = LOG_9D;
  function today() { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  F.log = function (sessId, f) {
    var wrap = U.el("div", { class: "logwrap", "data-fid": f.id });
    var list = U.el("div", { class: "loglist" });
    var entries = CB.data.leadership_log.entries;
    function touch(e) { e.updated_at = U.isoLocal(); CB.save(); changed(f.id); }
    function draw() {
      list.innerHTML = "";
      if (!entries.length) list.appendChild(U.el("p", { class: "small muted", text: "Belum ada entri. Tambahkan keputusan pertamamu hari ini." }));
      entries.forEach(function (e, i) {
        var card = U.el("div", { class: "logentry" });
        var top = U.el("div", { class: "loghead" });
        var dl = U.el("label", { class: "small", text: "DATE " }); dl.style.fontWeight = "bold";
        var di = U.el("input", { type: "date", class: "datein", "aria-label": "Tanggal entri " + (i + 1) });
        di.value = e.date || "";
        di.onchange = function () { e.date = di.value; touch(e); };
        dl.appendChild(di); top.appendChild(dl);
        top.appendChild(U.el("span", { class: "small muted", text: "Entri " + (i + 1) + (e.updated_at ? " · diubah " + U.fmtDate(e.updated_at) : "") }));
        var del = U.el("button", { type: "button", class: "iconbtn", text: "Hapus", title: "Hapus entri" });
        del.onclick = function () {
          CB.modal({ title: "Hapus entri " + (i + 1) + "?", paras: ["Entri yang dihapus tidak bisa dikembalikan, kecuali dari file yang pernah kamu unduh."], buttons: [{ label: "Batal", value: false, cls: "ghost" }, { label: "Hapus", value: true, cls: "primary" }] })
            .then(function (ok) { if (ok) { entries.splice(i, 1); CB.save(); changed(f.id); draw(); } });
        };
        top.appendChild(del); card.appendChild(top);
        var grid = U.el("div", { class: "loggrid" });
        LOG_MAIN.forEach(function (c) {
          var b = U.el("div", { class: "box" });
          var id = "log_" + e.id + "_" + c.k;
          b.appendChild(U.el("label", { for: id, text: c.label }));
          b.appendChild(textarea(id, e[c.k], function (v) { e[c.k] = v; touch(e); }, 56));
          grid.appendChild(b);
        });
        card.appendChild(grid);
        var det = U.el("details", { class: "log9d" });
        var sum9 = U.el("summary");
        var upd9 = function () { sum9.textContent = "Butir Leadership Log (silabus §9D) · " + LOG_9D.filter(function (c) { return (e[c.k] || "").trim(); }).length + "/9 terisi · boleh kosong per entri"; };
        upd9(); det.appendChild(sum9);
        var g9 = U.el("div", { class: "loggrid" });
        LOG_9D.forEach(function (c) {
          var b = U.el("div", { class: "box" });
          var id = "log_" + e.id + "_" + c.k;
          b.appendChild(U.el("label", { for: id, text: c.label }));
          b.appendChild(textarea(id, e[c.k], function (v) { e[c.k] = v; touch(e); upd9(); }, 44));
          g9.appendChild(b);
        });
        det.appendChild(g9); card.appendChild(det);
        list.appendChild(card);
      });
    }
    draw();
    wrap.appendChild(list);
    var add = U.el("button", { type: "button", class: "btn", text: "+ Tambah entri keputusan" });
    add.onclick = function () {
      var now = U.isoLocal();
      entries.push({ id: U.uuid(), date: today(), created_at: now, updated_at: now, decided: "", why: "", evidence: "" });
      CB.save(); changed(f.id); draw();
      var last = list.lastElementChild; if (last) { var t = last.querySelector("textarea"); if (t) t.focus(); }
    };
    wrap.appendChild(add);
    return wrap;
  };

  /* ---------- teks cetak per tipe ---------- */
  F.printText = function (f, v, sessId) {
    if (f.type === "log") {
      var es = CB.data.leadership_log.entries;
      if (!es.length) return "";
      return es.map(function (e, i) {
        var lines = [(i + 1) + ". " + (e.date || "") + " — " + (e.decided || "")];
        if (e.why) lines.push("   WHY: " + e.why);
        if (e.evidence) lines.push("   EVIDENCE: " + e.evidence);
        LOG_9D.forEach(function (c) { if ((e[c.k] || "").trim()) lines.push("   " + c.label + ": " + e[c.k]); });
        return lines.join("\n");
      }).join("\n");
    }
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
    return JSON.stringify(v);
  };
  F.printValue = function (v) { return typeof v === "string" ? v : (v == null ? "" : JSON.stringify(v)); };

  CB.fields = F;
})();
