/* core/hub.js — halaman utama: identitas, status sesi, Leadership Log, impor file. */
(function () {
  "use strict";
  var CB = window.CB, U = CB.util;
  var SESSION_IDS = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];
  // Sesi yang halamannya sudah ada di repo. Ditambah oleh chat pembangun saat sesi baru di-deploy.
  var LIVE_PAGES = ["S1"];

  function fld(id, label, input, help) {
    var d = U.el("div", { class: "fld" });
    d.appendChild(U.el("label", { for: id, text: label }));
    d.appendChild(input);
    if (help) d.appendChild(U.el("div", { class: "help", text: help }));
    d.appendChild(U.el("div", { class: "err", id: "err_" + id }));
    return d;
  }
  function inp(id, type, extra) {
    var i = U.el("input", Object.assign({ id: id, name: id, type: type || "text", autocomplete: "off" }, extra || {}));
    return i;
  }
  function projectSelect(id, value) {
    var s = U.el("select", { id: id, name: id });
    s.appendChild(U.el("option", { value: "", text: "— pilih proyekmu —" }));
    var groups = { group: "Proyek grup", individual: "Proyek individu" };
    Object.keys(groups).forEach(function (t) {
      var og = U.el("optgroup", { label: groups[t] });
      CB.projects.filter(function (p) { return p.type === t; }).forEach(function (p) {
        og.appendChild(U.el("option", { value: p.group_id, text: p.group_id + " · " + p.project_name }));
      });
      s.appendChild(og);
    });
    if (value) s.value = value;
    return s;
  }
  function showErrs(errs, ids) {
    ids.forEach(function (k) { var e = document.getElementById("err_" + k); if (e) e.textContent = errs[k] || ""; });
  }

  function importButton(label) {
    var wrap = U.el("span");
    var file = U.el("input", { type: "file", accept: ".json,application/json", class: "hidden", id: "importFile" });
    var b = U.el("button", { class: "btn", type: "button", text: label || "Lanjutkan dari file (.json)" });
    b.onclick = function () { file.click(); };
    file.onchange = function () {
      var f = file.files[0]; file.value = ""; if (!f) return;
      CB.importFile(f).then(function (d) {
        var nim = d.identifier.nim, local = CB.loadLocal(nim);
        var cur = CB.data && CB.data.identifier.nim;
        var paras = ["File milik <b>" + U.esc(d.identifier.full_name) + "</b> · NIM " + U.esc(nim) + " · " + U.esc(d.identifier.group_id) + ".",
          "Disimpan terakhir: " + U.esc(U.fmtDate(d.saved_at)) + "."];
        if (cur && cur !== nim) paras.push("Kamu sedang masuk sebagai NIM " + U.esc(cur) + ". Setelah impor, kamu masuk sebagai NIM " + U.esc(nim) + ".");
        if (local) paras.push("Browser ini sudah menyimpan data untuk NIM " + U.esc(nim) + " (terakhir " + U.esc(U.fmtDate(local.saved_at)) + "). <b>Data browser itu akan ditimpa isi file.</b>");
        return CB.modal({ title: "Lanjutkan dari file?", paras: paras, buttons: [{ label: "Batal", value: false, cls: "ghost" }, { label: "Ya, pakai file ini", value: true, cls: "primary" }] })
          .then(function (ok) { if (ok) { CB.acceptImport(d); render(); } });
      }).catch(function (e) {
        CB.modal({ title: "File tidak bisa dibuka", paras: [U.esc(e.message), "Pastikan kamu memilih file .json yang diunduh dari app ini."] });
      });
    };
    wrap.appendChild(b); wrap.appendChild(file);
    return wrap;
  }

  function identityForm(main) {
    var card = U.el("section", { class: "card" });
    card.appendChild(U.el("h2", { text: "Masuk ke workbook" }));
    card.appendChild(U.el("p", { class: "lead", text: "Isi sekali di perangkat ini. NIM menjadi pengenal file kerjamu dan tidak bisa diubah setelah disimpan." }));
    var g = U.el("div", { class: "formgrid" });
    var n1 = inp("nim1", "text", { inputmode: "numeric", pattern: "[0-9]*" });
    var n2 = inp("nim2", "text", { inputmode: "numeric", pattern: "[0-9]*" });
    var nm = inp("full_name", "text", { autocomplete: "name" });
    var em = inp("email", "email", { autocomplete: "email" });
    var gp = projectSelect("group_id");
    g.appendChild(fld("nim1", "NIM", n1, "Angka saja, sesuai NIM UI."));
    g.appendChild(fld("nim2", "Ketik NIM sekali lagi", n2));
    var fn = fld("full_name", "Nama lengkap", nm); g.appendChild(fn);
    g.appendChild(fld("email", "Email", em, "Pakai email yang sama dengan akun Google untuk Form pengumpulan."));
    var gpf = fld("group_id", "Proyek", gp, "Proyek grup dan individu ada di daftar ini."); gpf.classList.add("full"); g.appendChild(gpf);
    card.appendChild(g);
    var row = U.el("div"); row.style.cssText = "display:flex;gap:10px;flex-wrap:wrap;margin-top:16px;align-items:center";
    var go = U.el("button", { class: "btn primary", type: "button", text: "Simpan dan mulai" });
    go.onclick = function () {
      var f = { nim1: n1.value, nim2: n2.value, full_name: nm.value, email: em.value, group_id: gp.value };
      var errs = CB.validateIdentity(f);
      showErrs(errs, ["nim1", "nim2", "full_name", "email", "group_id"]);
      if (Object.keys(errs).length) return;
      var r = CB.startStudent(f);
      render(r.resumed ? "Data lama untuk NIM ini ditemukan di browser dan dilanjutkan." : null);
    };
    row.appendChild(go);
    row.appendChild(U.el("span", { class: "muted small", text: "atau" }));
    row.appendChild(importButton());
    card.appendChild(row);
    main.appendChild(card);
  }

  function sessionStatus(id) {
    var s = CB.data.sessions[id];
    if (!s || !s.versions.length) {
      var any = s && Object.keys(s.current || {}).some(function (k) { var v = s.current[k]; return v && (typeof v !== "string" || v.trim()); });
      return { pill: any ? "draf" : "belum", cls: "", text: any ? "Ada isian, belum di-submit" : "Belum ada isian" };
    }
    var last = s.versions[s.versions.length - 1];
    return {
      pill: "submitted", cls: s.changed_since_submit ? "changed" : "done",
      text: "Submitted " + U.fmtDate(last.submitted_at) + (s.versions.length > 1 ? " · versi " + s.versions.length : "") + (s.changed_since_submit ? " · ada perubahan belum di-submit" : "")
    };
  }

  function dashboard(main, notice) {
    var id = CB.data.identifier;
    if (notice) main.appendChild(U.el("div", { class: "banner info", text: notice }));

    // Identitas
    var card = U.el("section", { class: "card" });
    card.appendChild(U.el("h2", { text: "Identitas" }));
    var g = U.el("div", { class: "formgrid" }); g.style.marginTop = "12px";
    var lockd = U.el("div", { class: "locked", text: id.nim + " · terkunci" });
    g.appendChild(fld("nimlock", "NIM", lockd, "NIM tidak bisa diubah. Kalau salah, minta dosen membantu."));
    var nm = inp("full_name", "text"); nm.value = id.full_name;
    var em = inp("email", "email"); em.value = id.email;
    var gp = projectSelect("group_id", id.group_id);
    g.appendChild(fld("full_name", "Nama lengkap", nm));
    g.appendChild(fld("email", "Email", em));
    var gpf = fld("group_id", "Proyek", gp); gpf.classList.add("full"); g.appendChild(gpf);
    card.appendChild(g);
    var row = U.el("div"); row.style.cssText = "display:flex;gap:10px;flex-wrap:wrap;margin-top:14px;align-items:center";
    var sv = U.el("button", { class: "btn", type: "button", text: "Simpan perubahan identitas" });
    var msg = U.el("span", { class: "small muted" });
    sv.onclick = function () {
      var f = { nim1: id.nim, nim2: id.nim, full_name: nm.value, email: em.value, group_id: gp.value };
      var errs = CB.validateIdentity(f);
      showErrs(errs, ["full_name", "email", "group_id"]);
      if (Object.keys(errs).length) return;
      CB.updateIdentity(f); msg.textContent = "Tersimpan."; CB.renderTopbar(document.getElementById("topbar"), "Halaman utama");
    };
    var out = U.el("button", { class: "btn ghost", type: "button", text: "Bukan kamu? Masuk sebagai mahasiswa lain" });
    out.onclick = function () {
      var warn = CB.hasUnexported() ? ["Ada perubahan yang belum kamu unduh. Data tetap tersimpan di browser ini untuk NIM " + U.esc(id.nim) + "."] : [];
      CB.modal({ title: "Keluar dari NIM " + id.nim + "?", paras: warn.concat(["Mahasiswa lain bisa masuk dengan NIM-nya sendiri di perangkat ini."]), buttons: [{ label: "Batal", value: false, cls: "ghost" }, { label: "Keluar", value: true, cls: "primary" }] })
        .then(function (ok) { if (ok) { CB.signOut(); render(); } });
    };
    row.appendChild(sv); row.appendChild(msg); row.appendChild(out);
    card.appendChild(row);
    main.appendChild(card);

    // Disclaimer AI + cara kerja
    var how = U.el("section", { class: "card" });
    how.appendChild(U.el("h2", { text: "Cara kerja" }));
    var ol = U.el("ol", { class: "steps" });
    ["Buka sesi, isi halaman workbook-nya. Isianmu tersimpan otomatis di browser ini.",
      "Tekan <b>Submit</b> di halaman sesi. App mengunduh satu file .json berisi semua sesi dan Leadership Log-mu.",
      "Kumpulkan file TERBARU lewat Google Form" + (CB.config.form_url ? " (<a href='" + U.esc(CB.config.form_url) + "' target='_blank' rel='noopener'>buka Form</a>)" : "") + ", pilih minggunya.",
      "Minggu berikutnya, kalau pindah perangkat atau browser, tekan <b>Lanjutkan dari file</b> dan pilih file terakhirmu."
    ].forEach(function (t) { ol.appendChild(U.el("li", null, t)); });
    how.appendChild(ol);
    how.appendChild(U.el("div", { class: "banner info" }, "Hasil kerjamu dibaca dan dinilai dengan bantuan AI. Dosen membaca ulang bila kamu meminta atau bila sistem menandai."));
    var ir = U.el("div"); ir.style.marginTop = "6px"; ir.appendChild(importButton("Lanjutkan dari file (.json)"));
    how.appendChild(ir);
    main.appendChild(how);

    // Sesi
    var sc = U.el("section", { class: "card" });
    sc.appendChild(U.el("h2", { text: "Sesi" }));
    var list = U.el("div", { class: "sesslist" }); list.style.marginTop = "12px";
    var shown = 0;
    SESSION_IDS.forEach(function (sid) {
      if (!CB.isReleased(sid) || LIVE_PAGES.indexOf(sid) < 0) return;
      shown++;
      var cfg = CB.sessionCfg(sid), st = sessionStatus(sid);
      var r = U.el("div", { class: "sessrow" });
      var l = U.el("div");
      l.appendChild(U.el("div", { class: "name", text: "Sesi " + sid.slice(1) + (cfg.title ? " · " + cfg.title : "") }));
      var meta = U.el("div", { class: "meta" });
      meta.innerHTML = '<span class="status-pill ' + st.cls + '">' + U.esc(st.pill) + "</span>" + U.esc(st.text) + " · Minggu " + U.esc(cfg.week) + ", tenggat " + U.esc(U.fmtDate(cfg.due));
      l.appendChild(meta); r.appendChild(l);
      r.appendChild(U.el("a", { class: "btn", href: sid.toLowerCase() + ".html", text: "Buka" }));
      list.appendChild(r);
    });
    if (!shown) list.appendChild(U.el("p", { class: "muted", text: "Belum ada sesi yang dibuka. Sesi pertama dibuka sesuai jadwal kelas." }));
    sc.appendChild(list);
    main.appendChild(sc);

    // Leadership Log
    var lg = U.el("section", { class: "card" });
    lg.appendChild(U.el("h2", { text: "Leadership Log" }));
    var ents = CB.data.leadership_log.entries;
    var last = ents.length ? ents[ents.length - 1] : null;
    lg.appendChild(U.el("p", { class: "lead", text: "Decision Log (S1 · hlm. 8). Terbuka sepanjang semester, satu entri per keputusan. Ikut di setiap file yang kamu unduh." }));
    lg.appendChild(U.el("p", null, "<b>" + ents.length + "</b> entri" + (last ? " · terakhir " + U.esc(U.fmtDate(last.updated_at || last.created_at)) : "")));
    if (CB.isReleased("S1")) lg.appendChild(U.el("a", { class: "btn", href: "s1.html#p8", text: "Buka Leadership Log" }));
    else lg.appendChild(U.el("p", { class: "small muted", text: "Log terbuka bersama Sesi 1." }));
    main.appendChild(lg);
  }

  function render(notice) {
    var top = document.getElementById("topbar"), main = document.getElementById("main");
    main.innerHTML = "";
    var nim = CB.activeNim();
    CB.data = nim ? CB.loadLocal(nim) : null;
    CB.renderTopbar(top, "Halaman utama");
    if (CB.preview) main.appendChild(U.el("div", { class: "banner preview" }, "<b>Mode pratinjau dosen.</b> Sesi yang belum dirilis ikut terlihat. Buka <code>?pratinjau=0</code> untuk keluar."));
    if (!CB.storageOK) main.appendChild(U.el("div", { class: "banner err" }, "Browser ini memblokir penyimpanan lokal (mis. mode privat). Isianmu hilang saat tab ditutup. Pakai browser biasa, atau unduh file sesering mungkin."));
    if (/perlu=identitas/.test(location.search) && !CB.data) main.appendChild(U.el("div", { class: "banner info", text: "Isi identitas dulu sebelum membuka halaman sesi." }));
    if (CB.data) dashboard(main, notice); else identityForm(main);
  }

  CB.bootHub = function () {
    var main = document.getElementById("main");
    CB.loadConfig().then(function () { render(); }).catch(function (e) { CB.showError(main, e.message); });
  };
})();
