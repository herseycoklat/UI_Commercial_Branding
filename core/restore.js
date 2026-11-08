/* core/restore.js — halaman Pulihkan (pulihkan.html).
 * Menampilkan cadangan otomatis (CB.backupLocal) untuk NIM yang aktif, atau NIM yang diketik.
 * Tiap cadangan bisa diunduh sebagai file .json atau dikembalikan ke browser.
 * Mengembalikan cadangan juga mencadangkan isian browser saat ini dulu, jadi tidak ada yang hilang.
 * Tidak ditautkan dari hub; dosen membagikan link-nya bila mahasiswa salah mengimpor file. */
(function () {
  "use strict";
  var CB = window.CB, U = CB.util;

  function summary(raw) {
    try {
      var d = CB.migrate(JSON.parse(raw)), c = CB.filledCounts(d);
      var parts = Object.keys(c).filter(function (k) { return k !== "_lead"; }).sort().map(function (k) { return k + ": " + c[k] + " isian"; });
      parts.push("Leadership Log: " + c._lead + " entri");
      return { ok: true, text: parts.join(" · "), saved: d.saved_at, name: d.identifier.full_name };
    } catch (e) { return { ok: false, text: "Cadangan ini tidak terbaca (" + e.message + ")." }; }
  }

  function render(main, nim) {
    main.innerHTML = "";
    var card = U.el("section", { class: "card" });
    card.appendChild(U.el("h2", { text: "Pulihkan isian dari cadangan" }));
    card.appendChild(U.el("p", { class: "lead", text: "Sebelum isian di browser ini ditimpa (misalnya saat kamu memakai file lama lewat “Lanjutkan dari file”), app menyimpan cadangannya di sini. Maksimal tiga cadangan terakhir per NIM, hanya di browser ini." }));
    var row = U.el("div"); row.style.cssText = "display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:10px 0 4px";
    var inp = U.el("input", { type: "text", inputmode: "numeric", placeholder: "NIM", class: "line" }); inp.style.maxWidth = "220px"; inp.value = nim || "";
    var go = U.el("button", { class: "btn", type: "button", text: "Tampilkan cadangan" });
    go.onclick = function () { render(main, inp.value.trim()); };
    row.appendChild(inp); row.appendChild(go); card.appendChild(row);
    main.appendChild(card);
    if (!nim) return;

    var list = CB.listBackups(nim);
    var lc = U.el("section", { class: "card" });
    lc.appendChild(U.el("h2", { text: "Cadangan untuk NIM " + nim }));
    var cur = CB.loadLocal(nim);
    lc.appendChild(U.el("p", { class: "small muted", text: cur ? "Isian di browser saat ini: disimpan " + U.fmtDate(cur.saved_at) + " · " + summary(JSON.stringify(cur)).text : "Belum ada isian di browser ini untuk NIM ini." }));
    if (!list.length) lc.appendChild(U.el("p", { text: "Belum ada cadangan untuk NIM ini di browser ini." }));
    list.forEach(function (b, i) {
      var sm = summary(b.raw);
      var box = U.el("div", { class: "box" }); box.style.marginTop = "10px";
      box.appendChild(U.el("div", null, "<b>Cadangan " + (i + 1) + "</b> · dibuat " + U.esc(U.fmtDate(b.at)) + (b.reason ? " · " + U.esc(b.reason) : "")));
      box.appendChild(U.el("div", { class: "small", text: (sm.saved ? "Isian disimpan " + U.fmtDate(sm.saved) + " · " : "") + sm.text }));
      var br = U.el("div"); br.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;margin-top:8px";
      var dl = U.el("button", { class: "btn ghost", type: "button", text: "Unduh sebagai file .json" });
      dl.onclick = function () {
        var blob = new Blob([b.raw], { type: "application/json" }), url = URL.createObjectURL(blob);
        var a = U.el("a", { href: url, download: nim + "_cadangan_" + String(b.at).slice(0, 16).replace(/[:T]/g, "-") + ".json" });
        document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1500);
      };
      var rs = U.el("button", { class: "btn primary", type: "button", text: "Kembalikan ke browser" });
      if (!sm.ok) rs.disabled = true;
      rs.onclick = function () {
        CB.modal({ title: "Kembalikan cadangan " + (i + 1) + "?", paras: ["Isian browser saat ini disimpan dulu sebagai cadangan, jadi bisa dikembalikan lagi.", "Setelah ini, buka halaman sesi seperti biasa dan Submit ulang bila perlu."],
          buttons: [{ label: "Batal", value: false, cls: "ghost" }, { label: "Kembalikan", value: true, cls: "primary" }] })
          .then(function (ok) {
            if (!ok) return;
            if (CB.restoreBackup(nim, i)) { CB.setActive(nim); render(main, nim); CB.modal({ title: "Cadangan dikembalikan", paras: ["Isian NIM " + U.esc(nim) + " sudah kembali ke versi cadangan. <a href='index.html'>Buka halaman utama</a>."] }); }
            else CB.modal({ title: "Gagal", paras: ["Cadangan tidak bisa dikembalikan (penyimpanan browser penuh atau cadangan rusak). Unduh cadangan sebagai file, lalu pakai “Lanjutkan dari file”."] });
          });
      };
      br.appendChild(dl); br.appendChild(rs); box.appendChild(br);
      lc.appendChild(box);
    });
    main.appendChild(lc);
  }

  CB.bootRestore = function () {
    var top = document.getElementById("topbar"), main = document.getElementById("main");
    var nim = CB.activeNim();
    CB.data = nim ? CB.loadLocal(nim) : null;
    CB.renderTopbar(top, "Pulihkan isian");
    render(main, nim);
  };
})();
