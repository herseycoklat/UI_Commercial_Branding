/* core/session.js — merender halaman sesi dari SPEC (sessions/sN.js) + KONTEN (content/sN.js).
 * Halaman workbook yang belum punya konten tidak dirender (ditandai "menyusul" di navigasi). */
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

  function renderField(sessId, f) {
    var comp = CB.fields[f.type];
    if (!comp) { var x = U.el("div", { class: "box" }); x.textContent = "[komponen " + f.type + " belum tersedia]"; return x; }
    return comp(sessId, f);
  }

  function renderExamples(sessId, pg, ct, host) {
    var bar = U.el("div", { class: "exbar" });
    bar.appendChild(U.el("span", { class: "lbl", text: "Masih bingung setelah baca teori? Lihat contoh:" }));
    var panel = U.el("div", { class: "expanel hidden" });
    var active = null;
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
        var order = pg.columns ? pg.columns[0].ids.concat(pg.columns[1].ids) : pg.fields.map(function (f) { return f.id; });
        // urut nomor kotak supaya mudah dibandingkan
        order = pg.fields.map(function (f) { return f.id; }).filter(function (id) { return order.indexOf(id) >= 0; });
        order.forEach(function (fid) {
          var f = pg.fields.filter(function (x) { return x.id === fid; })[0];
          var v = ex.values[fid]; if (v == null) return;
          var bx = U.el("div", { class: "exbox" });
          bx.appendChild(U.el("b", { text: f.label }));
          bx.appendChild(U.el("div", { class: "exval", text: v }));
          if (ex.anno && ex.anno[fid]) bx.appendChild(U.el("div", { class: "anno", text: ex.anno[fid] }));
          panel.appendChild(bx);
        });
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

  function renderPage(sessId, spec, pg, ct) {
    var card = U.el("section", { class: "card", id: "p" + pg.p });
    var head = U.el("div", { class: "pagehead" });
    head.appendChild(U.el("span", { class: "num", text: String(pg.p) }));
    var ht = U.el("div");
    ht.appendChild(U.el("h2", { text: pg.title }));
    var lab = U.el("span", { class: "pglabel", text: sessId + " · hlm. " + pg.p }); ht.appendChild(lab);
    if (pg.tag) ht.appendChild(U.el("span", { class: "tag", text: pg.tag }));
    if (pg.sub) ht.appendChild(U.el("p", { class: "wbsub", text: pg.sub }));
    head.appendChild(ht); card.appendChild(head);

    // Teori
    var tb = U.el("div", { class: "theorybox" });
    var det = U.el("details", { class: "theory-collapse", open: "" });
    var sm = U.el("summary");
    sm.innerHTML = U.esc(ct.theory.title) + ' <span class="small muted" style="font-family:var(--sans);font-weight:normal;font-style:italic">· ' + U.esc(ct.theory.src) + "</span>";
    det.appendChild(sm);
    var body = U.el("div", null, ct.theory.html); body.style.marginTop = "8px";
    det.appendChild(body);
    if (ct.why) det.appendChild(U.el("div", { class: "why" }, ct.why));
    if (ct.deeper) {
      var nd = U.el("details", { class: "nuance" });
      nd.appendChild(U.el("summary", { text: ct.deeper.summary }));
      nd.appendChild(U.el("div", { class: "nbody" }, ct.deeper.html));
      det.appendChild(nd);
    }
    tb.appendChild(det); card.appendChild(tb);

    // Isian
    var wa = U.el("div", { class: "workarea" });
    wa.appendChild(U.el("div", { class: "wahead", text: "Isianmu" }));
    var byId = {}; pg.fields.forEach(function (f) { byId[f.id] = f; });
    if (pg.layout === "canvas2" && pg.columns) {
      var grid = U.el("div", { class: "canvas2" });
      pg.columns.forEach(function (col) {
        var c = U.el("div");
        c.appendChild(U.el("div", { class: "colhead", text: col.head }));
        col.ids.forEach(function (id) { c.appendChild(renderField(sessId, byId[id])); });
        grid.appendChild(c);
      });
      wa.appendChild(grid);
    } else {
      pg.fields.forEach(function (f) { wa.appendChild(renderField(sessId, f)); });
    }
    if (pg.footer) wa.appendChild(U.el("p", { class: "footrule", text: pg.footer }));
    card.appendChild(wa);

    renderReverse(sessId, ct, card);
    renderExamples(sessId, pg, ct, card);
    return card;
  }

  function renderChecks(sessId, built, host) {
    var fn = CB.checks[sessId]; if (!fn) return;
    var card = U.el("section", { class: "card", id: "cek" });
    card.appendChild(U.el("h2", { text: "Cek kelengkapan" + (sessId === "S1" ? " — Gate 1" : "") }));
    card.appendChild(U.el("p", { class: "lead", text: "Ini pemeriksaan kelengkapan berbasis aturan, bukan penilaian. Keputusan Gate dibaca dari file yang kamu kumpulkan." }));
    var sumEl = U.el("div", { class: "checksum" }); card.appendChild(sumEl);
    var list = U.el("div", { class: "checks" }); card.appendChild(list);
    function draw() {
      var rows = fn(CB.data, built);
      sumEl.textContent = CB.checkSummary(rows);
      list.innerHTML = "";
      rows.forEach(function (r) {
        var row = U.el("div", { class: "checkrow " + r.state });
        row.appendChild(U.el("span", { class: "ic", text: { ok: "✓", no: "✗", warn: "!", pending: "…" }[r.state] }));
        var t = U.el("div");
        if (r.reflection) {
          var lb = U.el("label", { class: "chk" }); lb.style.cssText = "display:flex;gap:8px;cursor:pointer";
          var cb = U.el("input", { type: "checkbox" });
          cb.checked = !!CB.sess(sessId).reflections[r.reflection];
          cb.onchange = function () { CB.sess(sessId).reflections[r.reflection] = cb.checked; CB.save(); draw(); };
          lb.appendChild(cb); lb.appendChild(U.el("span", { text: r.label }));
          t.appendChild(lb);
        } else t.appendChild(U.el("div", { text: r.label }));
        t.appendChild(U.el("div", { class: "where", text: r.state === "pending" ? r.where + " · halaman belum tersedia di app" : r.where }));
        row.appendChild(t); list.appendChild(row);
      });
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
      var byId = {}; pg.fields.forEach(function (f) { byId[f.id] = f; });
      function box(f) {
        var b = U.el("div", { class: "pp-box" + (f.output ? " output" : "") });
        b.appendChild(U.el("b", { text: f.label }));
        b.appendChild(U.el("div", { text: CB.fields.printValue(CB.getField(sessId, f.id)) || "—" }));
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
      } else pg.fields.forEach(function (f) { pp.appendChild(box(f)); });
      if (pg.footer) pp.appendChild(U.el("div", { class: "pp-foot", text: pg.footer }));
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
      if (!CB.isReleased(sessId)) {
        main.innerHTML = '<div class="banner info"><b>Sesi ini belum dibuka.</b> Halaman sesi dibuka sesuai jadwal kelas. <a href="index.html">Kembali ke halaman utama</a>.</div>';
        return;
      }
      if (CB.preview) main.appendChild(U.el("div", { class: "banner preview" }, "<b>Mode pratinjau dosen.</b> Sesi yang belum dirilis ikut terlihat. Buka <code>?pratinjau=0</code> untuk keluar."));
      var built = builtPages(spec, content);

      var intro = U.el("section", { class: "card" });
      intro.appendChild(U.el("h2", { text: "Sesi " + spec.n + " · " + spec.title }));
      intro.appendChild(U.el("p", { class: "lead", text: spec.coverNote }));
      intro.appendChild(U.el("p", { class: "small" }, "Tenggat pengumpulan file Minggu " + U.esc(cfg.week) + ": <b>" + U.esc(CB.fill("{{due}}", sessId)) + "</b>. Semua halaman sesi ini dikumpulkan dalam satu file."));
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
            "File ini berisi " + U.esc(range) + " dan Leadership Log-mu. Simpan file ini — ini satu-satunya salinan kerjamu, dan minggu depan kamu melanjutkan dari file ini. Kumpulkan file TERBARU saja lewat Google Form, pilih Minggu " + U.esc(cfg.week) + ".",
            "Di iPhone/iPad, file tersimpan di aplikasi Files (folder Downloads).",
            "<span class='small muted'>Cek kelengkapan saat ini: " + U.esc(CB.checkSummary(rows)) + "</span>"
          ],
          buttons: [{ label: "Batal", value: false, cls: "ghost" }, { label: "Unduh file", value: true, cls: "primary" }]
        }).then(function (go) {
          if (!go) return;
          var name = CB.submitSession(sessId, { rows: rows });
          st.textContent = "File diunduh: " + name;
          CB.modal({ title: "File sudah diunduh", paras: ["Nama file: <b>" + U.esc(name) + "</b>", CB.config.form_url ? "Kumpulkan lewat <a href='" + U.esc(CB.config.form_url) + "' target='_blank' rel='noopener'>Google Form</a>, pilih Minggu " + U.esc(cfg.week) + "." : "Kumpulkan lewat Google Form yang diumumkan dosen, pilih Minggu " + U.esc(cfg.week) + "."] });
        });
      };
      if (location.hash) { var t = document.querySelector(location.hash); if (t) setTimeout(function () { t.scrollIntoView(); }, 50); }
    }).catch(function (e) { CB.showError(main, e.message); });
  };
})();
