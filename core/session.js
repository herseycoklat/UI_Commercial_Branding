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

  function renderField(sessId, f) {
    var comp = CB.fields[f.type];
    if (!comp) { var x = U.el("div", { class: "box" }); x.textContent = "[komponen " + f.type + " belum tersedia]"; return x; }
    return comp(sessId, f);
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
      v.rows.forEach(function (r) { var tr = U.el("tr"); r.forEach(function (c, i) { tr.appendChild(U.el(i ? "td" : "th", { text: c })); }); t.appendChild(tr); });
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
    CASES.forEach(function (c) {
      var ex = ct.examples && ct.examples[c.k];
      var b = U.el("button", { class: "chip", type: "button", text: ex ? c.label : c.label + " (menyusul)" });
      if (!ex) b.disabled = true;
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
          var bx = U.el("div", { class: "exbox" });
          bx.appendChild(U.el("b", { text: (v && v.label) || f.label || pg.title }));
          bx.appendChild(exampleValue(byId[f.id], v));
          if (ex.anno && ex.anno[f.id]) bx.appendChild(U.el("div", { class: "anno", text: ex.anno[f.id] }));
          panel.appendChild(bx);
        });
        if (ex.notice) panel.appendChild(U.el("div", { class: "exnotice", text: ex.notice }));
        if (ex.note) panel.appendChild(U.el("div", { class: "exnote", text: ex.note }));
        panel.classList.remove("hidden");
      };
      bar.appendChild(b);
    });
    host.appendChild(bar); host.appendChild(panel);
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
        var val = U.el("div", { class: "carryval" + (txt ? "" : " empty"), text: txt || "Belum diisi di " + CB.pageLabel(it.id) + ". Kembali dan isi dulu; halaman ini harus bisa ditelusuri ke sana." });
        row.appendChild(val); body.appendChild(row);
      });
    }
    draw(); CB.on("change", draw);
    host.appendChild(box);
  }

  function renderPage(sessId, spec, pg, ct) {
    var card = U.el("section", { class: "card", id: "p" + pg.p });
    var head = U.el("div", { class: "pagehead" });
    head.appendChild(U.el("span", { class: "num", text: String(pg.p) }));
    var ht = U.el("div");
    ht.appendChild(U.el("h2", { text: pg.title }));
    ht.appendChild(U.el("span", { class: "pglabel", text: sessId + " · hlm. " + pg.p }));
    if (pg.tag) ht.appendChild(U.el("span", { class: "tag", text: pg.tag }));
    if (pg.sub) ht.appendChild(U.el("p", { class: "wbsub", text: pg.sub }));
    head.appendChild(ht); card.appendChild(head);

    // Teori
    var tb = U.el("div", { class: "theorybox" });
    var det = U.el("details", { class: "theory-collapse", open: "" });
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
    tb.appendChild(det); card.appendChild(tb);
    if (ct.callout) card.appendChild(U.el("div", { class: "callout" }, ct.callout));

    // Isian
    renderCarry(sessId, pg, card);
    var wa = U.el("div", { class: "workarea" });
    if (pg.fields.length) wa.appendChild(U.el("div", { class: "wahead", text: pg.workLabel || "Isianmu" }));
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
        wa.appendChild(sec);
      });
    } else {
      pg.fields.forEach(function (f) { wa.appendChild(renderField(sessId, f)); });
    }
    if (pg.lowest) renderLowest(sessId, pg, wa);
    if (pg.footer) wa.appendChild(U.el("p", { class: "footrule", text: CB.fill(pg.footer, sessId) }));
    card.appendChild(wa);

    renderReverse(sessId, ct, card);
    if (ct.examples) renderExamples(sessId, pg, ct, card);
    return card;
  }

  /* Cek kelengkapan. Baris diberi key supaya elemen dipakai ulang antar-gambar ulang
   * (kotak isian di dalam baris tidak boleh kehilangan fokus saat mengetik).
   * Baris: { key, group?, label, where, state: ok|no|warn|pending|info, input?: {id, ph} }
   * Judul kelompok: CB.checkGroups[sessId][group] = { title, help }. */
  function renderChecks(sessId, built, host) {
    var fn = CB.checks[sessId]; if (!fn) return null;
    var card = U.el("section", { class: "card", id: "cek" });
    card.appendChild(U.el("h2", { text: "Cek kelengkapan" + ({ S1: " — Gate 1", S2: " — bukti S2 (informasi)", S3: " — kesiapan Gate 2" }[sessId] || "") }));
    card.appendChild(U.el("p", { class: "lead", text: "Ini pemeriksaan kelengkapan berbasis aturan, bukan penilaian. Keputusan Gate dibaca dari file yang kamu kumpulkan." }));
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

  function buildPrint(sessId, spec, built) {
    var root = document.getElementById("print-root");
    if (!root) { root = U.el("div", { id: "print-root" }); document.body.appendChild(root); }
    root.innerHTML = "";
    var id = CB.data.identifier;
    spec.pages.forEach(function (pg) {
      if (built.indexOf(pg.p) < 0) return;
      var pp = U.el("div", { class: "pp" });
      pp.appendChild(U.el("div", { class: "pp-id", text: id.full_name + " · NIM " + id.nim + " · " + id.group_id + " · " + id.project_name }));
      var h = U.el("div", { class: "pp-head" });
      h.appendChild(U.el("div", { class: "pp-num", text: String(pg.p) }));
      h.appendChild(U.el("div", { class: "pp-title", text: pg.title + "  ·  " + sessId + " · hlm. " + pg.p }));
      pp.appendChild(h);
      if (pg.sub) pp.appendChild(U.el("p", { class: "pp-sub", text: pg.sub }));
      var byId = byIdOf(pg);
      function box(f) {
        var b = U.el("div", { class: "pp-box" + (f.output ? " output" : "") });
        b.appendChild(U.el("b", { text: f.label || pg.title }));
        b.appendChild(U.el("div", { text: CB.fields.printText(f, CB.getField(sessId, f.id), sessId) || "—" }));
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
      var spec = CB.specs[sessId], content = CB.content[sessId] || { pages: {} };
      var cfg = CB.sessionCfg(sessId) || {};
      CB.renderTopbar(top, "Sesi " + spec.n + " · " + spec.title);
      document.title = "Sesi " + spec.n + " — " + spec.title;
      if (CB.isReleased("S1")) CB.renderTabs(top, sessId, "workbook");
      if (!CB.isReleased(sessId)) {
        main.innerHTML = '<div class="banner info"><b>Sesi ini belum dibuka.</b> Halaman sesi dibuka sesuai jadwal kelas. <a href="index.html">Kembali ke halaman utama</a>.</div>';
        return;
      }
      if (CB.preview) main.appendChild(U.el("div", { class: "banner preview" }, "<b>Mode pratinjau dosen.</b> Sesi yang belum dirilis ikut terlihat. Buka <code>?pratinjau=0</code> untuk keluar."));
      var built = builtPages(spec, content);

      var intro = U.el("section", { class: "card" });
      intro.appendChild(U.el("h2", { text: "Sesi " + spec.n + " · " + spec.title }));
      intro.appendChild(U.el("p", { class: "lead", text: spec.coverNote }));
      intro.appendChild(U.el("p", { class: "small" }, "Tenggat pengumpulan file Minggu " + U.esc(cfg.week) + ": <b>" + U.esc(CB.fill("{{due}}", sessId)) + "</b>. Semua halaman sesi ini dikumpulkan dalam satu file." + (spec.coverExtra ? " " + CB.fill(spec.coverExtra, sessId) : "")));
      var nav = U.el("nav", { class: "sessnav", "aria-label": "Halaman workbook" });
      spec.fillOrder.forEach(function (p, i) {
        var pg = spec.pages.filter(function (x) { return x.p === p; })[0];
        var ok = built.indexOf(p) >= 0;
        var a = U.el("a", { href: ok ? "#p" + p : "javascript:void(0)", class: ok ? "" : "pending" });
        a.innerHTML = '<span class="ord">' + (i + 1) + ".</span>hlm. " + p + " · " + U.esc(pg.title) + (ok ? "" : " (menyusul)");
        nav.appendChild(a);
      });
      intro.appendChild(U.el("p", { class: "small muted", text: "Urutan isi yang disarankan (sama dengan urutan di kelas):" }));
      intro.appendChild(nav);
      main.appendChild(intro);

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
      inner.appendChild(back); inner.appendChild(pr); inner.appendChild(sb); inner.appendChild(st);
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
      if (location.hash) { var t = document.querySelector(location.hash); if (t) setTimeout(function () { t.scrollIntoView(); }, 50); }
    }).catch(function (e) { CB.showError(main, e.message); });
  };
})();
