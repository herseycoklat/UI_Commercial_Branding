/* core/session.js — merender halaman sesi dari SPEC (sessions/sN.js) + KONTEN (content/sN.js).
 * Halaman workbook yang belum punya konten tidak dirender (ditandai "menyusul" di navigasi).
 * Layout yang tersedia (pg.layout): "canvas2" (dua kolom bernama), "grid" (pg.cols kolom),
 * "groups" (blok berjudul, pg.groups), default = tumpuk. */
(function () {
  "use strict";
  var CB = window.CB, U = CB.util;
  var CASES = [
    { k: "jumbo", label: "Jumbo" },
    { k: "gojek", label: "Gojek / GoFood" },
    { k: "marvel", label: "Disney/Marvel (Iron Man)" },
    { k: "lego", label: "LEGO Technic" }
  ];
  var listeners = {};
  CB.emit = function (ev, x) { (listeners[ev] || []).forEach(function (fn) { fn(x); }); };
  CB.on = function (ev, fn) { (listeners[ev] = listeners[ev] || []).push(fn); };

  function builtPages(spec, content) {
    return spec.pages.filter(function (pg) { return content.pages && content.pages[pg.p]; }).map(function (pg) { return pg.p; });
  }
  function byIdOf(pg) { var m = {}; pg.fields.forEach(function (f) { m[f.id] = f; }); return m; }

  /* Fitur yang sengaja dimatikan (dokumen 64, 5 Nov 2026): panel "cek tiga tes" S4 hlm. 9 disembunyikan dari mahasiswa.
   * Kodenya dan datanya (content/s4.js → tigaTes) tetap ada; nyalakan lagi dengan CB.FEATURES.tigaTes = true. */
  CB.FEATURES = CB.FEATURES || { tigaTes: false };

  /* Lipatan "Boleh dilewati": label kecil diredam + penanda "sudah ada isian" bila bagian itu sudah berisi.
   * Tidak ada data yang dihapus atau disembunyikan dari file; hanya tampilan yang dilipat. */
  function makeSkip(sessId, label, ids, node, cls) {
    var det = U.el("details", { class: "skip " + (cls || "") });
    var sm = U.el("summary");
    sm.appendChild(U.el("span", { class: "skiptag", text: "Boleh dilewati" }));
    if (label) sm.appendChild(U.el("span", { class: "skiplbl", text: label }));
    var fb = U.el("span", { class: "skipfilled hidden", text: "sudah ada isian" });
    sm.appendChild(fb);
    sm.appendChild(U.el("span", { class: "skiphint", text: "klik untuk membuka" }));
    det.appendChild(sm);
    det.appendChild(node);
    function upd() { fb.classList.toggle("hidden", !ids.some(function (id) { return CB.isFilled(CB.getField(sessId, id)); })); }
    upd(); CB.on("change", upd);
    return det;
  }
  /* Buka lipatan yang membungkus elemen target (tautan #pN, #cek, atau loncatan dari panel Hal inti). */
  function openAround(el) {
    var inner = el && el.querySelector && el.querySelector(":scope > details.skippage"); /* target = kartu halaman yang dilipat */
    if (inner) inner.open = true;
    for (var n = el; n && n !== document.body; n = n.parentElement) if (n.tagName === "DETAILS" && n.classList.contains("skip")) n.open = true;
  }
  CB.openAround = openAround;
  function renderField(sessId, f) {
    var comp = CB.fields[f.type], node;
    if (!comp) { node = U.el("div", { class: "box" }); node.textContent = "[komponen " + f.type + " belum tersedia]"; }
    else node = comp(sessId, f);
    return f.skip ? makeSkip(sessId, f.skipLabel || f.label || "", [f.id], node, "skipfield") : node;
  }

  /* ---------- contoh empat kasus ---------- */
  function exampleValue(f, v) {
    var d = U.el("div", { class: "exval" });
    if (typeof v === "string") { d.textContent = v; return d; }
    if (v.cols && v.rows) {
      var sc = U.el("div", { class: "tscroll" });
      var t = U.el("table", { class: "wbtable ex" });
      var hr = U.el("tr"); v.cols.forEach(function (c) { hr.appendChild(U.el("th", { text: c })); });
      t.appendChild(hr);
      v.rows.forEach(function (r, ri) {
        var tr = U.el("tr"); r.forEach(function (c, i) { tr.appendChild(U.el(i ? "td" : "th", { text: c })); });
        if (v.keys && v.keys[ri]) tr.setAttribute("data-key", v.keys[ri]); /* kunci baris untuk sorotan mode kelas */
        t.appendChild(tr);
      });
      sc.appendChild(t); d.appendChild(sc); return d;
    }
    if (v.items) {
      var ul = U.el("ul", { class: "exlist" });
      v.items.forEach(function (x) { ul.appendChild(U.el("li", { text: x })); });
      d.appendChild(ul); return d;
    }
    if (v.score != null) {
      var s = U.el("span", { class: "exscore" + (v.score <= 2 ? " low" : ""), text: String(v.score) });
      d.appendChild(s); d.appendChild(document.createTextNode(" " + (v.justification || "")));
      return d;
    }
    d.textContent = v.text || "";
    return d;
  }
  function renderExamples(sessId, pg, ct, host) {
    var bar = U.el("div", { class: "exbar" });
    bar.appendChild(U.el("span", { class: "lbl", text: "Masih bingung setelah baca teori? Lihat contoh:" }));
    var panel = U.el("div", { class: "expanel hidden" });
    var active = null;
    var byId = byIdOf(pg);
    var btns = {}, api = { panel: panel, bar: bar };
    CASES.forEach(function (c) {
      var ex = ct.examples && ct.examples[c.k];
      var b = U.el("button", { class: "chip", type: "button", text: ex ? c.label : c.label + " (menyusul)" });
      if (!ex) b.disabled = true;
      btns[c.k] = b;
      b.onclick = function () {
        if (active === c.k) { active = null; panel.classList.add("hidden"); b.classList.remove("active"); return; }
        active = c.k;
        bar.querySelectorAll(".chip").forEach(function (o) { o.classList.remove("active"); });
        b.classList.add("active");
        panel.innerHTML = "";
        panel.appendChild(U.el("h4", { text: "Contoh — " + ex.name + " · " + pg.title }));
        if (ex.sub) panel.appendChild(U.el("div", { class: "exsub", text: ex.sub + (ex.caveat ? " " + ex.caveat : "") }));
        pg.fields.forEach(function (f) {
          var v = ex.values[f.id]; if (v == null) return;
          var bx = U.el("div", { class: "exbox", "data-key": f.id.split(".").pop() });
          bx.appendChild(U.el("b", { text: (v && v.label) || f.label || pg.title }));
          bx.appendChild(exampleValue(byId[f.id], v));
          if (ex.anno && ex.anno[f.id]) bx.appendChild(U.el("div", { class: "anno", text: ex.anno[f.id] }));
          panel.appendChild(bx);
        });
        if (ex.notice) panel.appendChild(U.el("div", { class: "exnotice", text: ex.notice }));
        if (ex.note) panel.appendChild(U.el("div", { class: "exnote", text: ex.note }));
        panel.classList.remove("hidden");
        panel.classList.remove("hasSorot"); sorotIdx = -1;
      };
      bar.appendChild(b);
    });
    /* ---- sorotan (dipakai mode kelas, tetap aman untuk mahasiswa): klik kotak atau baris = sorot; klik lagi = lepas ---- */
    var sorotIdx = -1;
    function steps() {
      var out = [];
      panel.querySelectorAll(".exbox").forEach(function (bx) {
        var rows = bx.querySelectorAll("tr[data-key]");
        if (rows.length) rows.forEach(function (r) { out.push(r); }); else out.push(bx);
      });
      return out;
    }
    function setSorot(els) {
      panel.querySelectorAll(".sorot,.sorotInside").forEach(function (x) { x.classList.remove("sorot"); x.classList.remove("sorotInside"); });
      els.forEach(function (e) { e.classList.add("sorot"); var bx = e.closest(".exbox"); if (bx && bx !== e) bx.classList.add("sorotInside"); });
      panel.classList.toggle("hasSorot", els.length > 0);
      if (els[0] && els[0].scrollIntoView) els[0].scrollIntoView({ block: "center", behavior: "smooth" });
    }
    panel.addEventListener("click", function (ev) {
      var el = ev.target.closest && (ev.target.closest("tr[data-key]") || ev.target.closest(".exbox[data-key]"));
      if (!el || !panel.contains(el)) return;
      if (el.classList.contains("sorot")) { setSorot([]); sorotIdx = -1; } else { setSorot([el]); sorotIdx = steps().indexOf(el); }
    });
    api.open = function (k) { if (btns[k] && !btns[k].disabled && active !== k) btns[k].click(); return !!(btns[k] && active === k); };
    api.sorotKeys = function (keys) {
      var els = [];
      panel.querySelectorAll("[data-key]").forEach(function (e) { if (keys.indexOf(e.getAttribute("data-key")) >= 0) els.push(e); });
      setSorot(els); return els.length;
    };
    api.step = function (d) {
      var st = steps(); if (!st.length) return;
      sorotIdx = Math.max(0, Math.min(st.length - 1, sorotIdx + d));
      setSorot([st[sorotIdx]]);
    };
    api.clear = function () { setSorot([]); sorotIdx = -1; };
    host.appendChild(bar); host.appendChild(panel);
    host._ex = api;
    return api;
  }

  /* ---------- panel "cek tiga tes" (S4 hlm. 9): isi tiap tes + bukti dari contoh Jumbo dan LEGO ----------
   * Data: content.pages[9].tigaTes. Bukti diambil dari nilai contoh di content (bukan ditulis ulang) supaya tetap verbatim. */
  function renderTigaTes(sessId, spec, content, host) {
    var tg = content.pages[9] && content.pages[9].tigaTes;
    if (!tg || !CB.FEATURES.tigaTes) return null;
    var card = U.el("section", { class: "tigates", id: "tigates" });
    card.appendChild(U.el("h3", { text: tg.title }));
    card.appendChild(U.el("p", { class: "tgintro", text: tg.intro }));
    var bar = U.el("div", { class: "exbar" });
    bar.appendChild(U.el("span", { class: "lbl", text: "Lihat di contoh:" }));
    var body = U.el("div", { class: "tgbody" });
    var cur = null, btns = {};
    function exVal(caseK, id) {
      var pn = parseInt(id.split(".")[1].slice(1), 10);
      var ex = content.pages[pn] && content.pages[pn].examples && content.pages[pn].examples[caseK];
      return ex && ex.values ? ex.values[id] : null;
    }
    function fieldOf(id) { return CB.findField ? CB.findField(id) : null; }
    function draw() {
      body.innerHTML = "";
      tg.tests.forEach(function (t) {
        var tb = U.el("div", { class: "tgtest", "data-key": t.k });
        tb.appendChild(U.el("h4", { text: t.title + "  ·  " + t.pages }));
        t.items.forEach(function (it) {
          var row = U.el("div", { class: "tgitem", "data-key": it.k });
          row.appendChild(U.el("div", { class: "tgrule", text: it.text }));
          var ev = cur && tg.cases[cur] && tg.cases[cur].items[it.k];
          if (ev) {
            var eb = U.el("div", { class: "tgev" });
            if (ev.scores) {
              eb.appendChild(U.el("div", { class: "tgscores", text: ev.scores.map(function (id) { var v = exVal(cur, id) || {}, f = fieldOf(id) || {}; return (f.label || id) + " " + (v.score || "—"); }).join("  ·  ") }));
            }
            (ev.refs || []).forEach(function (id) {
              var v = exVal(cur, id); if (v == null) return;
              var f = fieldOf(id) || { id: id };
              var one = U.el("div", { class: "tgref" });
              one.appendChild(U.el("b", { text: (v && v.label) || f.label || id }));
              one.appendChild(exampleValue(f, v));
              eb.appendChild(one);
            });
            if (ev.read) eb.appendChild(U.el("div", { class: "tgread", text: ev.read }));
            row.appendChild(eb);
          }
          tb.appendChild(row);
        });
        var aft = cur && tg.cases[cur] && tg.cases[cur].after && tg.cases[cur].after[t.k];
        if (aft) tb.appendChild(U.el("div", { class: "tgread tgafter", text: aft }));
        body.appendChild(tb);
      });
      var cara = U.el("div", { class: "tgcara", "data-key": "cara" });
      cara.appendChild(U.el("h4", { text: "Cara baca" }));
      cara.appendChild(U.el("p", { text: tg.cara }));
      body.appendChild(cara);
    }
    Object.keys(tg.cases).forEach(function (k) {
      var b = U.el("button", { class: "chip", type: "button", text: tg.cases[k].name });
      btns[k] = b;
      b.onclick = function () {
        cur = cur === k ? null : k;
        Object.keys(btns).forEach(function (x) { btns[x].classList.toggle("active", x === cur); });
        draw();
      };
      bar.appendChild(b);
    });
    card.appendChild(bar); card.appendChild(body);
    draw();
    var api = {
      el: card,
      open: function (k) { if (tg.cases[k] && cur !== k) btns[k].click(); },
      focusPart: function (key) {
        var t = body.querySelector('[data-key="' + key + '"]');
        body.classList.toggle("hasSorot", !!t);
        body.querySelectorAll(".sorot").forEach(function (x) { x.classList.remove("sorot"); });
        if (t) { t.classList.add("sorot"); t.scrollIntoView({ block: "center" }); }
      }
    };
    host.appendChild(card);
    return api;
  }

  function renderReverse(sessId, ct, host) {
    if (!ct.reverse) return;
    var r = U.el("div", { class: "reverse" });
    r.appendChild(U.el("h4", { text: ct.reverse.title || "Cek terbalik" }));
    var ul = U.el("ul");
    ct.reverse.items.forEach(function (t) { ul.appendChild(U.el("li", { text: t })); });
    r.appendChild(ul);
    if (ct.reverse.unknownCounter) {
      var cnt = U.el("p", { class: "small muted" }); cnt.style.margin = "8px 0 0";
      var upd = function () {
        var n = 0;
        ct.reverse.unknownCounter.forEach(function (fid) {
          var v = CB.getField(sessId, fid);
          if (typeof v === "string") n += (v.match(/\bUNKNOWN\b/g) || []).length;
        });
        cnt.innerHTML = "Hitungan otomatis: kata <b>UNKNOWN</b> muncul <b>" + n + "</b> kali di Canvas-mu." + (n === 0 ? " Periksa lagi kotak 4 dan 7." : "");
      };
      upd(); CB.on("change", upd);
      r.appendChild(cnt);
    }
    host.appendChild(r);
  }

  /* Tiga skor terendah (hlm. 6) — dihitung, bukan field */
  function renderLowest(sessId, pg, host) {
    var box = U.el("div", { class: "lowest" });
    function draw() {
      var arr = pg.fields.map(function (f) { var v = CB.getField(sessId, f.id) || {}; return { label: f.label, score: v.score }; })
        .filter(function (x) { return x.score; });
      box.innerHTML = "";
      if (arr.length < pg.fields.length) { box.appendChild(U.el("span", { class: "small muted", text: "Tiga skor terendahmu muncul di sini setelah keenam skor terisi." })); return; }
      arr.sort(function (a, b) { return a.score - b.score; });
      box.appendChild(U.el("b", { text: "Tiga skor terendahmu: " }));
      box.appendChild(document.createTextNode(arr.slice(0, pg.lowest).map(function (x) { return x.label + " (" + x.score + ")"; }).join(", ") + ". Bawa ketiganya ke hlm. 7."));
    }
    draw(); CB.on("change", draw);
    host.appendChild(box);
  }

  /* Field tabel di panel bawaan tampil sebagai tabel baca-saja, sama bentuknya dengan halaman asalnya. */
  function carryTable(f, v) {
    v = v || {}; var rows = v.rows || {}, extra = v.extra || [];
    var sc = U.el("div", { class: "tscroll carrytable" });
    var t = U.el("table", { class: "wbtable ro" + (f.narrowHead ? " narrowhead" : "") });
    var hr = U.el("tr"); hr.appendChild(U.el("th", { text: f.rowLabel || "" }));
    f.columns.forEach(function (c) { hr.appendChild(U.el("th", { text: c.label })); });
    var th = U.el("thead"); th.appendChild(hr); t.appendChild(th);
    var tb = U.el("tbody"); t.appendChild(tb);
    function tr(label, get) {
      var r = U.el("tr"); r.appendChild(U.el("th", { scope: "row", text: label }));
      f.columns.forEach(function (c) { var x = String(get(c.k) || "").trim(); r.appendChild(U.el("td", { class: x ? "" : "empty", text: x || "—" })); });
      tb.appendChild(r);
    }
    f.rows.forEach(function (r) { tr(r.label, function (k) { return (rows[r.k] || {})[k]; }); });
    extra.forEach(function (r) { tr(r.label || "(baris tambahan)", function (k) { return r[k]; }); });
    sc.appendChild(t); return sc;
  }

  /* Panel bawaan: nilai dari sesi/halaman sebelumnya ditampilkan, TIDAK disalin diam-diam. */
  function renderCarry(sessId, pg, host) {
    var c = pg.carry; if (!c) return;
    var box = U.el("div", { class: "carry" });
    box.appendChild(U.el("h4", { text: c.title || "Bawaan dari sesi sebelumnya" }));
    var body = U.el("div"); box.appendChild(body);
    function draw() {
      body.innerHTML = "";
      c.items.forEach(function (it) {
        var m = /^s(\d+)\./.exec(it.id), sid = m ? "S" + m[1] : sessId;
        var f = CB.findField(it.id), v = CB.getField(sid, it.id);
        var txt = f ? CB.fields.printText(f, v, sid) : "";
        var row = U.el("div", { class: "carryrow" });
        row.appendChild(U.el("b", { text: it.label }));
        row.appendChild(U.el("span", { class: "small muted", text: " · " + CB.pageLabel(it.id) }));
        var val = (txt && f && f.type === "table") ? carryTable(f, v)
          : U.el("div", { class: "carryval" + (txt ? "" : " empty"), text: txt || "Belum diisi di " + CB.pageLabel(it.id) + ". Kembali dan isi dulu; halaman ini harus bisa ditelusuri ke sana." });
        row.appendChild(val); body.appendChild(row);
      });
    }
    draw(); CB.on("change", draw);
    host.appendChild(box);
  }

  /* ---------- hal inti (dokumen 64) ---------- */
  function coreItemsOf(spec) { return (spec.core && spec.core.items) || []; }
  /* Status satu hal inti = baris cek kelengkapan kelompoknya (group === item.k) tidak ada yang "belum" (no) atau menunggu (pending).
   * Baris "warn" (cek sendiri) tetap dihitung terisi: yang diminta hanya terisi, bukan benar. */
  function coreStatus(rows, it) {
    var mine = rows.filter(function (r) { return r.group === it.k; });
    return mine.length > 0 && mine.every(function (r) { return r.state !== "no" && r.state !== "pending"; });
  }
  CB.coreStatus = function (sessId, built) {
    var spec = CB.specs[sessId], fn = CB.checks[sessId]; if (!spec || !fn) return [];
    var rows = fn(CB.data, built || builtPages(spec, CB.content[sessId] || { pages: {} }));
    return coreItemsOf(spec).map(function (it) { return { n: it.n, k: it.k, label: it.label, page: it.page, done: coreStatus(rows, it) }; });
  };
  function renderCore(sessId, spec, built, host) {
    var items = coreItemsOf(spec); if (!items.length) return null;
    var card = U.el("section", { class: "card corecard", id: "inti" });
    card.appendChild(U.el("h2", { text: "Hal inti Sesi " + spec.n }));
    card.appendChild(U.el("p", { class: "lead coreintro", text: spec.core.intro }));
    var list = U.el("div", { class: "corelist" });
    var els = items.map(function (it) {
      var row = U.el("a", { class: "corerow", href: "#p" + it.page });
      var ic = U.el("span", { class: "coreic" });
      var tx = U.el("span", { class: "coretx" });
      tx.appendChild(U.el("b", { text: it.n + " · " + it.label }));
      if (it.note) tx.appendChild(U.el("span", { class: "corenote", text: " (" + it.note + ")" }));
      tx.appendChild(U.el("span", { class: "corewhere", text: it.where }));
      var st = U.el("span", { class: "corest" });
      row.appendChild(ic); row.appendChild(tx); row.appendChild(st);
      row.addEventListener("click", function () { var t = document.getElementById("p" + it.page); if (t) openAround(t); });
      list.appendChild(row);
      return { it: it, row: row, ic: ic, st: st };
    });
    card.appendChild(list);
    var sum = U.el("p", { class: "small muted coresum" }); card.appendChild(sum);
    function draw() {
      var fn = CB.checks[sessId]; var rows = fn ? fn(CB.data, built) : [];
      var n = 0;
      els.forEach(function (e) {
        var done = coreStatus(rows, e.it); if (done) n++;
        e.row.classList.toggle("done", done);
        e.ic.textContent = done ? "✔" : "○";
        e.st.textContent = done ? "terisi" : "belum";
      });
      sum.textContent = n + " dari " + els.length + " hal inti terisi.";
    }
    draw(); CB.on("change", draw);
    host.appendChild(card);
    return card;
  }

  function renderPage(sessId, spec, pg, ct) {
    var card = U.el("section", { class: "card", id: "p" + pg.p });
    var head = U.el("div", { class: "pagehead" });
    head.appendChild(U.el("span", { class: "num", text: String(pg.p) }));
    var ht = U.el("div");
    ht.appendChild(U.el("h2", { text: pg.title }));
    ht.appendChild(U.el("span", { class: "pglabel", text: sessId + " · hlm. " + pg.p }));
    if (pg.tag) ht.appendChild(U.el("span", { class: "tag", text: pg.tag }));
    var coreIt = coreItemsOf(spec).filter(function (it) { return it.page === pg.p; })[0];
    if (coreIt) ht.appendChild(U.el("span", { class: "coretag", text: "Hal inti " + coreIt.n + (coreIt.where.indexOf("(") > 0 ? " · " + coreIt.where.slice(coreIt.where.indexOf("(") + 1, -1) : "") }));
    if (pg.skip) ht.appendChild(U.el("span", { class: "skiptag pgskip", text: "Boleh dilewati" }));
    if (pg.sub) ht.appendChild(U.el("p", { class: "wbsub", text: pg.sub }));
    head.appendChild(ht); card.appendChild(head);
    var host = card;
    if (pg.skip) {
      host = U.el("div", { class: "skipbody" });
      card.appendChild(makeSkip(sessId, "Teori, isian, dan contoh halaman ini", pg.fields.map(function (f) { return f.id; }), host, "skippage"));
    }

    // Teori
    var tb = U.el("div", { class: "theorybox" });
    var det = U.el("details", { class: "theory-collapse" });
    var sm = U.el("summary");
    sm.innerHTML = U.esc(ct.theory.title) + ' <span class="small muted" style="font-family:var(--sans);font-weight:normal;font-style:italic">· ' + U.esc(ct.theory.src) + "</span>";
    det.appendChild(sm);
    var body = U.el("div", null, CB.fill(ct.theory.html, sessId)); body.style.marginTop = "8px";
    det.appendChild(body);
    if (ct.why) det.appendChild(U.el("div", { class: "why" }, CB.fill(ct.why, sessId)));
    if (ct.deeper) {
      var nd = U.el("details", { class: "nuance" });
      nd.appendChild(U.el("summary", { text: ct.deeper.summary }));
      nd.appendChild(U.el("div", { class: "nbody" }, CB.fill(ct.deeper.html, sessId)));
      det.appendChild(nd);
    }
    tb.appendChild(det); host.appendChild(tb);
    if (ct.callout) host.appendChild(U.el("div", { class: "callout" }, ct.callout));

    // Isian
    renderCarry(sessId, pg, host);
    var wa = U.el("div", { class: "workarea" });
    if (pg.fields.length) wa.appendChild(U.el("div", { class: "wahead", text: pg.workLabel || "Workbook" }));
    if (pg.strip) { var sp = U.el("div", { class: "wbstrip" }); sp.appendChild(U.el("b", { text: pg.strip.head })); sp.appendChild(document.createTextNode("  " + pg.strip.text)); wa.appendChild(sp); }
    var byId = byIdOf(pg);
    if (pg.layout === "canvas2" && pg.columns) {
      var grid = U.el("div", { class: "canvas2" });
      pg.columns.forEach(function (col) {
        var c = U.el("div");
        c.appendChild(U.el("div", { class: "colhead", text: col.head }));
        col.ids.forEach(function (id) { c.appendChild(renderField(sessId, byId[id])); });
        grid.appendChild(c);
      });
      wa.appendChild(grid);
      var inCols = [].concat.apply([], pg.columns.map(function (c) { return c.ids; }));
      pg.fields.forEach(function (f) { if (inCols.indexOf(f.id) < 0) wa.appendChild(renderField(sessId, f)); });
    } else if (pg.layout === "grid") {
      var g = U.el("div", { class: "fgrid cols" + (pg.cols || 2) });
      pg.fields.forEach(function (f) { g.appendChild(renderField(sessId, f)); });
      wa.appendChild(g);
    } else if (pg.layout === "groups") {
      pg.groups.forEach(function (gr) {
        var sec = U.el("div", { class: "fgroup" });
        if (gr.head) sec.appendChild(U.el("div", { class: "colhead" }, U.esc(gr.head) + (gr.badge ? ' <span class="gbadge">' + U.esc(gr.badge) + "</span>" : "")));
        var gg = U.el("div", { class: "fgrid cols" + (gr.cols || 1) });
        gr.ids.forEach(function (id) { gg.appendChild(renderField(sessId, byId[id])); });
        sec.appendChild(gg);
        wa.appendChild(gr.skip ? makeSkip(sessId, gr.skipLabel || gr.head, gr.ids, sec, "skipfield") : sec);
      });
    } else {
      pg.fields.forEach(function (f) { wa.appendChild(renderField(sessId, f)); });
    }
    if (pg.lowest) renderLowest(sessId, pg, wa);
    if (pg.footer) wa.appendChild(U.el("p", { class: "footrule", text: CB.fill(pg.footer, sessId) }));
    host.appendChild(wa);

    renderReverse(sessId, ct, host);
    if (ct.examples) renderExamples(sessId, pg, ct, host);
    if (ct.tigaTes) card._tg = renderTigaTes(sessId, spec, { pages: CB.content[sessId].pages }, host);
    return card;
  }


  /* ---------- mode kelas (dosen berbagi layar lewat Zoom) ----------
   * s4.html?kelas=1&hlm=5&kasus=jumbo&sorot=mandatory,rejected  → hanya panel contoh, huruf besar, kotak yang disebut menyala.
   * Parameter: hlm · kasus (jumbo|gojek|marvel|lego) · sorot (kunci kotak/baris, pisah koma) · urut=1 (sorot satu per satu, tombol → ←)
   *            · panel=tigates (+ bagian=cara) · kelas=daftar (daftar tautan semua langkah). Tidak menyimpan atau mengubah isian apa pun. */
  function kelasUrl(sessId, q) { return sessId.toLowerCase() + ".html?kelas=1" + (q ? "&" + q : ""); }
  function renderKelas(sessId, spec, content, built, main, P) {
    document.body.classList.add("kelas");
    main.innerHTML = "";
    var kb = U.el("div", { class: "kbar" });
    function klink(text, href, cls) { var a = U.el("a", { class: "kbtn" + (cls ? " " + cls : ""), href: href, text: text }); kb.appendChild(a); return a; }
    var kasus = P.get("kasus") || "";
    if (P.get("kelas") === "daftar") {
      kb.appendChild(U.el("span", { class: "ktitle", text: "Mode kelas · Sesi " + spec.n + " · daftar tautan" }));
      klink("Keluar", sessId.toLowerCase() + ".html");
      main.appendChild(kb);
      var c0 = U.el("section", { class: "card kdaftar" });
      c0.appendChild(U.el("h2", { text: "Tautan langkah [HTML TOOL] · Kelas Live Sesi " + spec.n }));
      c0.appendChild(U.el("p", { class: "lead", text: "Buka tautan dari browser kelas yang identitasnya sudah terisi (halaman utama, sekali saja). Di panel: klik kotak atau baris = sorot, klik lagi = lepas; tombol → dan ← menggeser sorotan satu per satu; Esc = lepas semua." }));
      var tb = U.el("table", { class: "wbtable" });
      var hr = U.el("tr"); ["#", "Langkah skrip", "Tautan"].forEach(function (h) { hr.appendChild(U.el("th", { text: h })); }); tb.appendChild(hr);
      ((content.kelasLinks) || []).forEach(function (l, i) {
        var tr = U.el("tr");
        tr.appendChild(U.el("td", { text: String(i + 1) }));
        tr.appendChild(U.el("td", { text: l.step }));
        var td = U.el("td"); td.appendChild(U.el("a", { href: kelasUrl(sessId, l.q), text: "buka" }));
        var cp = U.el("button", { type: "button", class: "iconbtn", text: "salin", title: "Salin tautan lengkap" });
        cp.onclick = function () { var abs = new URL(kelasUrl(sessId, l.q), location.href).href; if (navigator.clipboard) navigator.clipboard.writeText(abs).then(function () { cp.textContent = "tersalin"; }, function () { cp.textContent = abs; }); else cp.textContent = abs; };
        td.appendChild(document.createTextNode(" ")); td.appendChild(cp);
        tr.appendChild(td); tb.appendChild(tr);
      });
      var sc = U.el("div", { class: "tscroll" }); sc.appendChild(tb); c0.appendChild(sc);
      main.appendChild(c0);
      return;
    }
    var hlm = parseInt(P.get("hlm"), 10) || 0;
    var isTg = P.get("panel") === "tigates";
    var pg = spec.pages.filter(function (x) { return x.p === hlm; })[0];
    kb.appendChild(U.el("span", { class: "ktitle", text: "Mode kelas · Sesi " + spec.n + (pg && !isTg ? " · hlm. " + hlm : "") }));
    var ord = spec.fillOrder.filter(function (p) { return built.indexOf(p) >= 0; });
    var qk = function (extra) { return kelasUrl(sessId, (kasus ? "kasus=" + encodeURIComponent(kasus) + "&" : "") + extra); };
    if (pg && !isTg) {
      var i = ord.indexOf(hlm);
      if (i > 0) klink("‹ hlm. " + ord[i - 1], qk("hlm=" + ord[i - 1]));
      if (i >= 0 && i < ord.length - 1) klink("hlm. " + ord[i + 1] + " ›", qk("hlm=" + ord[i + 1]));
    }
    if (CB.FEATURES.tigaTes && content.pages[9] && content.pages[9].tigaTes) klink("Cek tiga tes", qk("panel=tigates"));
    klink("Daftar tautan", kelasUrl(sessId, "").replace("kelas=1", "kelas=daftar"));
    klink("Keluar", sessId.toLowerCase() + ".html");
    main.appendChild(kb);
    var card = U.el("section", { class: "card kcard" });
    main.appendChild(card);
    var api = null, tg = null;
    if (isTg) {
      tg = renderTigaTes(sessId, spec, content, card);
      if (!tg) { card.appendChild(U.el("p", { text: "Halaman atau kasus tidak ditemukan. Buka daftar tautan." })); return; }
      if (kasus) tg.open(kasus);
      if (P.get("bagian")) tg.focusPart(P.get("bagian"));
    } else if (pg && content.pages[hlm] && content.pages[hlm].examples) {
      var head = U.el("div", { class: "pagehead" });
      head.appendChild(U.el("span", { class: "num", text: String(pg.p) }));
      var ht = U.el("div"); ht.appendChild(U.el("h2", { text: pg.title }));
      if (pg.sub) ht.appendChild(U.el("p", { class: "wbsub", text: pg.sub }));
      head.appendChild(ht); card.appendChild(head);
      api = renderExamples(sessId, pg, content.pages[hlm], card);
      if (kasus && !api.open(kasus)) card.appendChild(U.el("p", { class: "small muted", text: "Kasus \"" + kasus + "\" belum tersedia di halaman ini." }));
      if (P.get("sorot")) api.sorotKeys(P.get("sorot").split(","));
      if (P.get("urut")) api.step(1);
    } else {
      card.appendChild(U.el("p", { text: "Halaman atau kasus tidak ditemukan. Buka daftar tautan." }));
      return;
    }
    if (api) document.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowRight" || ev.key === "ArrowDown" || ev.key === "PageDown") { ev.preventDefault(); api.step(1); }
      else if (ev.key === "ArrowLeft" || ev.key === "ArrowUp" || ev.key === "PageUp") { ev.preventDefault(); api.step(-1); }
      else if (ev.key === "Escape") api.clear();
    });
  }

  /* Cek kelengkapan. Baris diberi key supaya elemen dipakai ulang antar-gambar ulang
   * (kotak isian di dalam baris tidak boleh kehilangan fokus saat mengetik).
   * Baris: { key, group?, label, where, state: ok|no|warn|pending|info, input?: {id, ph} }
   * Judul kelompok: CB.checkGroups[sessId][group] = { title, help }. */
  function renderChecks(sessId, built, host) {
    var fn = CB.checks[sessId]; if (!fn) return null;
    var card = U.el("section", { class: "card", id: "cek" });
    card.appendChild(U.el("h2", { text: "Cek kelengkapan — hal inti Sesi " + CB.specs[sessId].n }));
    card.appendChild(U.el("p", { class: "lead", text: "Ini pemeriksaan kelengkapan berbasis aturan, bukan penilaian. Yang dihitung hanya hal inti; bagian yang boleh dilewati tidak pernah muncul sebagai kurang." }));
    var intro = CB.checkIntro && CB.checkIntro[sessId];
    if (intro) card.appendChild(U.el("p", { class: "small" }, intro));
    card.appendChild(U.el("p", { class: "small muted checklegend", text: "✓ terpenuhi · ✗ belum terpenuhi · ! cek lagi sendiri · … menunggu halaman lain · i informasi" }));
    var sumEl = U.el("div", { class: "checksum" }); card.appendChild(sumEl);
    var list = U.el("div", { class: "checks" }); card.appendChild(list);
    var els = {};
    var groups = (CB.checkGroups && CB.checkGroups[sessId]) || {};
    var IC = { ok: "✓", no: "✗", warn: "!", pending: "…", info: "i" };

    function makeRow(r) {
      var row = U.el("div", { class: "checkrow" });
      var ic = U.el("span", { class: "ic" });
      var t = U.el("div");
      var lab = U.el("div", { class: "clabel" });
      t.appendChild(lab);
      var ta = null;
      if (r.input) {
        ta = U.el("textarea", { id: "chk_" + r.input.id.replace(/\./g, "_"), rows: "2", placeholder: r.input.ph || "— tulis di sini —" });
        ta.value = CB.getField(sessId, r.input.id) || "";
        ta.addEventListener("input", function () {
          CB.setField(sessId, r.input.id, ta.value);
          CB.emit("change", r.input.id);
          ta.style.height = "auto"; ta.style.height = Math.max(ta.scrollHeight + 2, 54) + "px";
        });
        t.appendChild(ta);
        setTimeout(function () { ta.style.height = "auto"; ta.style.height = Math.max(ta.scrollHeight + 2, 54) + "px"; }, 0);
      }
      var wh = U.el("div", { class: "where" });
      t.appendChild(wh);
      row.appendChild(ic); row.appendChild(t);
      return { row: row, ic: ic, lab: lab, wh: wh };
    }
    function makeGroup(g) {
      var d = U.el("div", { class: "checkgroup" });
      d.appendChild(U.el("h3", { text: g.title }));
      if (g.help) d.appendChild(U.el("p", { class: "small muted", text: g.help }));
      return { row: d };
    }
    function draw() {
      var rows = fn(CB.data, built);
      sumEl.textContent = CB.checkSummary(rows);
      var seen = {}, idx = 0, lastGroup = null;
      function place(o, key) {
        seen[key] = true;
        var cur = list.children[idx];
        if (cur !== o.row) list.insertBefore(o.row, cur || null);
        idx++;
      }
      rows.forEach(function (r, i) {
        if (r.group && r.group !== lastGroup && groups[r.group]) {
          var gk = "g:" + r.group;
          if (!els[gk]) els[gk] = makeGroup(groups[r.group]);
          place(els[gk], gk);
        }
        lastGroup = r.group || null;
        var k = r.key || ("r" + i);
        if (!els[k]) els[k] = makeRow(r);
        var o = els[k];
        o.row.className = "checkrow " + r.state;
        o.ic.textContent = IC[r.state] || "";
        o.lab.textContent = r.label;
        o.wh.textContent = r.state === "pending" ? r.where + " · belum diisi" : r.where;
        place(o, k);
      });
      Object.keys(els).forEach(function (k) { if (!seen[k]) { els[k].row.remove(); delete els[k]; } });
    }
    draw(); CB.on("change", draw);
    host.appendChild(card);
    return function () { return fn(CB.data, built); };
  }

  /* Halaman sampul cetak: memuat informasi yang ada di halaman utama (identitas, sesi, cara kerja). */
  function buildCover(sessId, spec, built) {
    var id = CB.data.identifier, cfg = CB.sessionCfg(sessId) || {};
    var st = CB.data.sessions[sessId], last = st && st.versions && st.versions.length ? st.versions[st.versions.length - 1] : null;
    var lead = (CB.data.leadership_log && CB.data.leadership_log.entries || []).filter(function (e) { return (e.text || "").trim(); }).length;
    var c = U.el("div", { class: "pp pp-cover" });
    c.appendChild(U.el("div", { class: "pc-course", text: (CB.config.course || "Capstone: Commercial Branding") + " · Workbook" }));
    c.appendChild(U.el("div", { class: "pc-title", text: "Sesi " + spec.n + " · " + spec.title }));
    if (spec.coverNote) c.appendChild(U.el("p", { class: "pc-note", text: spec.coverNote }));
    var cols = U.el("div", { class: "pc-cols" });
    function dl(head, pairs) {
      var d = U.el("div", { class: "pc-box" });
      d.appendChild(U.el("div", { class: "pc-h", text: head }));
      pairs.forEach(function (p) {
        var r = U.el("div", { class: "pc-r" });
        r.appendChild(U.el("span", { class: "pc-k", text: p[0] })); r.appendChild(U.el("span", { class: "pc-v", text: p[1] || "—" }));
        d.appendChild(r);
      });
      return d;
    }
    cols.appendChild(dl("Identitas", [["Nama", id.full_name], ["NIM", id.nim], ["Email", id.email], ["Proyek", id.group_id + " · " + id.project_name]]));
    var sesPairs = [["Minggu", String(cfg.week || "—")]];
    if (!cfg.hide_release_date) sesPairs.push(["Dibuka", cfg.release ? U.fmtDate(cfg.release) : "—"]);
    sesPairs = sesPairs.concat([
      (spec.hideDue || cfg.no_upload_deadline) ? ["Batas unggah", (cfg.deadline_note ? cfg.deadline_note : "tanpa batas unggah (hari baca diumumkan di chat kelas)").replace(/^./, function (m) { return m.toUpperCase(); })] : ["Tenggat file", cfg.due ? U.fmtDate(cfg.due) : "—"],
      ["Status", last ? "Submitted " + U.fmtDate(last.submitted_at) + (st.versions.length > 1 ? " · versi " + st.versions.length : "") + (st.changed_since_submit ? " · ada perubahan belum di-submit" : "") : "Belum di-submit"],
      ["Leadership Log", lead + " entri (ikut di setiap file)"]]);
    if (spec.coverExtra) { var tmp = U.el("div", null, CB.fill(spec.coverExtra, sessId)); sesPairs.push(["Catatan", tmp.textContent]); }
    cols.appendChild(dl("Sesi", sesPairs));
    c.appendChild(cols);
    var cols2 = U.el("div", { class: "pc-cols" });
    var toc = U.el("div", { class: "pc-box" });
    toc.appendChild(U.el("div", { class: "pc-h", text: "Daftar isi: " + spec.title }));
    spec.fillOrder.forEach(function (p, i) {
      var pg = spec.pages.filter(function (x) { return x.p === p; })[0];
      if (built.indexOf(p) < 0) return;
      var r = U.el("div", { class: "pc-r" });
      r.appendChild(U.el("span", { class: "pc-k pc-n", text: (i + 1) + "." })); r.appendChild(U.el("span", { class: "pc-v", text: "hlm. " + p + " · " + pg.title }));
      toc.appendChild(r);
    });
    cols2.appendChild(toc);
    var how = U.el("div", { class: "pc-box" });
    how.appendChild(U.el("div", { class: "pc-h", text: "Cara kerja" }));
    ["Buka sesi, isi halaman workbook-nya. Isianmu tersimpan otomatis di browser ini.",
      "Tekan Submit di halaman sesi. App mengunduh satu file .json berisi semua sesi dan Leadership Log-mu.",
      "Kumpulkan file TERBARU lewat Google Form" + (CB.config.form_url ? " (" + CB.config.form_url + ")" : "") + ", pilih minggunya.",
      "Kalau pindah perangkat atau browser, tekan Lanjutkan dari file dan pilih file terakhirmu."
    ].forEach(function (t, i) {
      var r = U.el("div", { class: "pc-r" });
      r.appendChild(U.el("span", { class: "pc-k pc-n", text: (i + 1) + "." })); r.appendChild(U.el("span", { class: "pc-v", text: t }));
      how.appendChild(r);
    });
    how.appendChild(U.el("p", { class: "pc-ai", text: "Hasil kerjamu dibaca dan dinilai dengan bantuan AI. Dosen membaca ulang bila kamu meminta atau bila sistem menandai." }));
    cols2.appendChild(how);
    c.appendChild(cols2);
    c.appendChild(U.el("div", { class: "pp-foot", text: "Dicetak dari Workbook App · " + U.fmtDate(new Date().toISOString()) + " · arsip pribadi, bukan file pengumpulan." }));
    return c;
  }

  function buildPrint(sessId, spec, built) {
    var root = document.getElementById("print-root");
    if (!root) { root = U.el("div", { id: "print-root" }); document.body.appendChild(root); }
    root.innerHTML = "";
    var id = CB.data.identifier;
    root.appendChild(buildCover(sessId, spec, built));
    spec.pages.forEach(function (pg) {
      if (built.indexOf(pg.p) < 0) return;
      var pp = U.el("div", { class: "pp" });
      pp.appendChild(U.el("div", { class: "pp-id", text: id.full_name + " · NIM " + id.nim + " · " + id.group_id + " · " + id.project_name }));
      var h = U.el("div", { class: "pp-head" });
      h.appendChild(U.el("div", { class: "pp-num", text: String(pg.p) }));
      h.appendChild(U.el("div", { class: "pp-title", text: pg.title + "  ·  " + sessId + " · hlm. " + pg.p }));
      pp.appendChild(h);
      if (pg.sub) pp.appendChild(U.el("p", { class: "pp-sub", text: pg.sub }));
      if (pg.strip) pp.appendChild(U.el("p", { class: "pp-sub", text: pg.strip.head + ": " + pg.strip.text }));
      var byId = byIdOf(pg);
      function ptable(heads, rows) {
        var t = U.el("table", { class: "pp-table" });
        var tr = U.el("tr");
        heads.forEach(function (h) { tr.appendChild(U.el("th", { text: h })); });
        var th = U.el("thead"); th.appendChild(tr); t.appendChild(th);
        var tb = U.el("tbody");
        rows.forEach(function (r) {
          var x = U.el("tr");
          r.forEach(function (c, i) { x.appendChild(U.el(i === 0 && heads.length > 1 && r.label1 ? "th" : "td", { text: c || "—" })); });
          tb.appendChild(x);
        });
        t.appendChild(tb); return t;
      }
      function box(f) {
        var b = U.el("div", { class: "pp-box" + (f.output ? " output" : "") });
        var v = CB.getField(sessId, f.id);
        if (f.type === "table") {
          // Tabel sungguhan: semua baris tetap tampil, yang kosong ditandai "—".
          v = v || {};
          var rows = (f.rows || []).map(function (r) {
            var x = (v.rows || {})[r.k] || {};
            var a = [r.label].concat(f.columns.map(function (c) { return x[c.k]; }));
            if (f.rowFlag) a.push(x[f.rowFlag.k] ? "✓" : "");
            a.label1 = true; return a;
          });
          (v.extra || []).forEach(function (x) {
            var a = [x.label || "(tanpa nama)"].concat(f.columns.map(function (c) { return x[c.k]; }));
            if (f.rowFlag) a.push(x[f.rowFlag.k] ? "✓" : "");
            a.label1 = true; rows.push(a);
          });
          b.appendChild(U.el("b", { text: f.label || pg.title }));
          var tt = ptable([f.rowLabel || ""].concat(f.columns.map(function (c) { return c.label; }), f.rowFlag ? [f.rowFlag.label] : []), rows);
          if (f.narrowHead) tt.classList.add("pp-narrow"); // kolom judul ramping, kolom isian sama lebar (sama dengan layar)
          b.appendChild(tt);
          b.classList.add("pp-tablebox");
          return b;
        }
        if (f.type === "segscore") {
          // Tabel seperti workbook: SEGMENT · kriteria · TOTAL (TOTAL hanya bila semua skor terisi).
          v = v || {};
          var segs = ((CB.getField(sessId, f.from) || {}).items || []);
          var srows = segs.map(function (s) {
            var x = v[s.id] || {}, n = 0, all = true;
            var a = [s.name || "(segmen tanpa nama)"].concat(f.criteria.map(function (c) { if (x[c.k]) n += x[c.k]; else all = false; return x[c.k] ? String(x[c.k]) : ""; }));
            a.push(all ? String(n) : ""); a.label1 = true; return a;
          });
          b.appendChild(U.el("b", { text: f.label || pg.title }));
          var st = ptable([f.rowLabel || "SEGMENT"].concat(f.criteria.map(function (c) { return c.label; }), ["TOTAL"]), srows.length ? srows : [["—"]]);
          st.classList.add("pp-score");
          b.appendChild(st);
          b.classList.add("pp-tablebox");
          return b;
        }
        if (f.type === "list" && f.itemFields) {
          var items = (v && v.items) || [];
          b.appendChild(U.el("b", { text: f.label || pg.title }));
          b.appendChild(ptable(["#"].concat(f.itemFields.map(function (c) { return c.label || c.k; })),
            items.length ? items.map(function (it, i) { return [String(i + 1)].concat(f.itemFields.map(function (c) {
              if (c.showIf && it[c.showIf.k] !== c.showIf.eq) return "";
              if (c.type === "pages") return Array.isArray(it[c.k]) ? it[c.k].map(function (n) { return "hlm. " + n; }).join(", ") : "";
              return c.type === "select" ? CB.optLabel(c, it[c.k]) : it[c.k];
            })); }) : [["—"]]));
          b.classList.add("pp-tablebox");
          return b;
        }
        b.appendChild(U.el("b", { text: f.label || pg.title }));
        b.appendChild(U.el("div", { text: CB.fields.printText(f, v, sessId) || "—" }));
        return b;
      }
      if (pg.layout === "canvas2" && pg.columns) {
        var g = U.el("div", { class: "pp-grid" });
        pg.columns.forEach(function (col) {
          var c = U.el("div"); c.appendChild(U.el("div", { class: "pp-colh", text: col.head }));
          col.ids.forEach(function (fid) { var bx = box(byId[fid]); bx.style.marginTop = "5pt"; c.appendChild(bx); });
          g.appendChild(c);
        });
        pp.appendChild(g);
        var inCols2 = [].concat.apply([], pg.columns.map(function (c) { return c.ids; }));
        pg.fields.forEach(function (f) { if (inCols2.indexOf(f.id) < 0) { var bx2 = box(f); bx2.style.marginTop = "5pt"; pp.appendChild(bx2); } });
      } else if (pg.layout === "grid") {
        var g2 = U.el("div", { class: "pp-grid c" + (pg.cols || 2) });
        pg.fields.forEach(function (f) { g2.appendChild(box(f)); });
        pp.appendChild(g2);
      } else if (pg.layout === "groups") {
        pg.groups.forEach(function (gr) {
          if (gr.head) pp.appendChild(U.el("div", { class: "pp-colh", text: gr.head }));
          var g3 = U.el("div", { class: "pp-grid c" + (gr.cols || 1) });
          gr.ids.forEach(function (fid) { g3.appendChild(box(byId[fid])); });
          pp.appendChild(g3);
        });
      } else pg.fields.forEach(function (f) { var bx = box(f); bx.style.marginTop = "5pt"; pp.appendChild(bx); });
      if (pg.footer) pp.appendChild(U.el("div", { class: "pp-foot", text: CB.fill(pg.footer, sessId) }));
      pp.appendChild(U.el("div", { class: "pp-foot", text: "Dicetak dari Workbook App · " + U.fmtDate(new Date().toISOString()) + " · arsip pribadi, bukan file pengumpulan." }));
      root.appendChild(pp);
    });
  }

  CB.bootSession = function (sessId) {
    var top = document.getElementById("topbar"), main = document.getElementById("main");
    CB.loadConfig().then(function () {
      var nim = CB.activeNim();
      CB.data = nim ? CB.loadLocal(nim) : null;
      if (!CB.data) { location.href = "index.html?perlu=identitas"; return; }
      if (CB.applyShow) Object.keys(CB.specs).forEach(function (k) { CB.applyShow(CB.specs[k]); }); /* teks tampilan tanpa kata Gate (core/show.js) */
      var spec = CB.specs[sessId], content = CB.content[sessId] || { pages: {} };
      var cfg = CB.sessionCfg(sessId) || {};
      CB.renderTopbar(top, "Sesi " + spec.n + " · " + spec.title);
      document.title = "Sesi " + spec.n + " — " + spec.title;
      if (CB.isReleased("S1")) CB.renderTabs(top, sessId, "workbook");
      if (!CB.isReleased(sessId)) {
        main.innerHTML = '<div class="banner info"><b>Sesi ini belum dibuka.</b> Halaman sesi dibuka sesuai jadwal kelas. <a href="index.html">Kembali ke halaman utama</a>.</div>';
        return;
      }
      var built = builtPages(spec, content);
      var qp = new URLSearchParams(location.search);
      if (qp.get("kelas")) { renderKelas(sessId, spec, content, built, main, qp); return; }

      var intro = U.el("section", { class: "card" });
      intro.appendChild(U.el("h2", { text: "Sesi " + spec.n + " · " + spec.title }));
      intro.appendChild(U.el("p", { class: "lead", text: spec.coverNote }));
      var introNote = (spec.hideDue ? "" : "Tenggat pengumpulan file Minggu " + U.esc(cfg.week) + ": <b>" + U.esc(CB.fill("{{due}}", sessId)) + "</b>. Semua halaman sesi ini dikumpulkan dalam satu file.") + (spec.coverExtra ? " " + CB.fill(spec.coverExtra, sessId) : "");
      if (introNote.trim()) intro.appendChild(U.el("p", { class: "small" }, introNote));
      var nav = U.el("nav", { class: "sessnav", "aria-label": "Halaman workbook" });
      spec.fillOrder.forEach(function (p, i) {
        var pg = spec.pages.filter(function (x) { return x.p === p; })[0];
        var ok = built.indexOf(p) >= 0;
        var a = U.el("a", { href: ok ? "#p" + p : "javascript:void(0)", class: ok ? "" : "pending" });
        var ci = coreItemsOf(spec).filter(function (it) { return it.page === p; })[0];
        a.innerHTML = '<span class="ord">' + (i + 1) + ".</span>hlm. " + p + " · " + U.esc(pg.title) + (ok ? "" : " (menyusul)") +
          (ci ? ' <span class="navcore">hal inti</span>' : (pg.skip ? ' <span class="navskip">boleh dilewati</span>' : ""));
        nav.appendChild(a);
      });
      intro.appendChild(U.el("p", { class: "small muted", text: "Daftar isi: " + spec.title }));
      intro.appendChild(nav);
      main.appendChild(intro);
      renderCore(sessId, spec, built, main);

      spec.fillOrder.forEach(function (p) {
        if (built.indexOf(p) < 0) return;
        var pg = spec.pages.filter(function (x) { return x.p === p; })[0];
        main.appendChild(renderPage(sessId, spec, pg, content.pages[p]));
      });
      var getChecks = renderChecks(sessId, built, main);

      // Action bar
      var bar = document.getElementById("actionbar");
      bar.innerHTML = "";
      var inner = U.el("div", { class: "inner" });
      var back = U.el("a", { class: "btn ghost", href: "index.html", text: "← Halaman utama" });
      var pr = U.el("button", { class: "btn", type: "button", text: "Cetak / Simpan PDF" });
      var sb = U.el("button", { class: "btn primary", type: "button", text: "Submit " + sessId + " (unduh file)" });
      var st = U.el("span", { class: "save", text: CB.storageOK ? "Tersimpan otomatis di browser ini." : "Browser ini memblokir penyimpanan. Unduh file sebelum menutup tab." });
      inner.appendChild(back); inner.appendChild(pr); inner.appendChild(sb); inner.appendChild(st); inner.appendChild(CB.leaveWarnToggle());
      bar.appendChild(inner);
      CB.onSave(function (ok) { st.textContent = ok ? "Tersimpan di browser " + U.fmtDate(new Date().toISOString()) + ". Belum terkirim ke dosen." : "Gagal menyimpan di browser. Unduh file sekarang."; });
      pr.onclick = function () { CB.saveNow(); buildPrint(sessId, spec, built); window.print(); };
      sb.onclick = function () {
        var rows = getChecks ? getChecks() : [];
        var range = CB.submittedRange(sessId);
        CB.modal({
          title: "Submit " + sessId,
          paras: [
            "File ini berisi workbook " + U.esc(range) + " dan seluruh isi tab Leadership Log-mu sampai hari ini (Leadership Log tidak perlu dikumpulkan terpisah). Simpan file ini — ini satu-satunya salinan kerjamu, dan minggu depan kamu melanjutkan dari file ini. Kumpulkan file TERBARU saja lewat Google Form, pilih Minggu " + U.esc(cfg.week) + ".",
            "<span class='small muted'>Cek kelengkapan saat ini: " + U.esc(CB.checkSummary(rows)) + "</span>"
          ],
          buttons: [{ label: "Batal", value: false, cls: "ghost" }, { label: "Unduh file", value: true, cls: "primary" }]
        }).then(function (go) {
          if (!go) return;
          var name = CB.submitSession(sessId, { rows: rows });
          st.textContent = "File diunduh: " + name;
          CB.modal({ title: "File sudah diunduh", paras: ["Nama file: <b>" + U.esc(name) + "</b>. Biasanya ada di folder Downloads.", CB.config.form_url ? "Kumpulkan lewat <a href='" + U.esc(CB.config.form_url) + "' target='_blank' rel='noopener'>Google Form</a>, pilih Minggu " + U.esc(cfg.week) + "." : "Kumpulkan lewat Google Form yang diumumkan dosen, pilih Minggu " + U.esc(cfg.week) + "."] });
        });
      };
      /* tautan #pN / #cek ke bagian yang dilipat: buka dulu, baru gulir */
      function goHash() { if (!location.hash) return; var t = null; try { t = document.querySelector(location.hash); } catch (e) { } if (t) { openAround(t); setTimeout(function () { t.scrollIntoView(); }, 50); } }
      document.addEventListener("click", function (ev) {
        var a = ev.target.closest && ev.target.closest('a[href^="#"]'); if (!a) return;
        var t = null; try { t = document.querySelector(a.getAttribute("href")); } catch (e) { }
        if (t) openAround(t);
      });
      window.addEventListener("hashchange", goHash);
      goHash();
    }).catch(function (e) { CB.showError(main, e.message); });
  };
})();
