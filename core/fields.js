/* core/fields.js — komponen field.
 * Setiap komponen menerima (sessId, field) dan mengembalikan elemen DOM.
 * Nilai disimpan lewat CB.setField(sessId, field.id, value).
 * Komponen yang belum dipakai halaman mana pun belum dibuat; tambahkan di sini,
 * jangan di file sesi. */
(function () {
  "use strict";
  var CB = window.CB, U = CB.util;

  function autosize(ta) {
    ta.style.height = "auto";
    ta.style.height = Math.max(ta.scrollHeight + 2, 76) + "px";
  }

  var F = {};

  // Kotak isian bebas (kotak Canvas, peta, dsb.)
  F.longtext = function (sessId, f) {
    var box = U.el("div", { class: "box" + (f.output ? " output" : "") });
    var tid = "f_" + f.id.replace(/\./g, "_");
    box.appendChild(U.el("label", { for: tid, text: f.label }));
    if (f.hint) box.appendChild(U.el("div", { class: "hint", text: f.hint }));
    var ta = U.el("textarea", { id: tid, "data-fid": f.id, rows: "3", placeholder: "— tulis di sini —" });
    ta.value = CB.getField(sessId, f.id) || "";
    ta.addEventListener("input", function () { CB.setField(sessId, f.id, ta.value); autosize(ta); CB.emit && CB.emit("change", f.id); });
    box.appendChild(ta);
    setTimeout(function () { autosize(ta); }, 0);
    return box;
  };

  // Satu baris singkat
  F.text = function (sessId, f) {
    var box = U.el("div", { class: "box" });
    var tid = "f_" + f.id.replace(/\./g, "_");
    box.appendChild(U.el("label", { for: tid, text: f.label }));
    if (f.hint) box.appendChild(U.el("div", { class: "hint", text: f.hint }));
    var inp = U.el("input", { id: tid, type: "text", "data-fid": f.id });
    inp.style.cssText = "width:100%;padding:8px 9px;border:1px solid var(--line);border-radius:6px;background:var(--field);";
    inp.value = CB.getField(sessId, f.id) || "";
    inp.addEventListener("input", function () { CB.setField(sessId, f.id, inp.value); CB.emit && CB.emit("change", f.id); });
    box.appendChild(inp);
    return box;
  };

  // Teks cetak untuk nilai field apa pun
  F.printValue = function (v) {
    if (v == null || v === "") return "";
    if (typeof v === "string") return v;
    return JSON.stringify(v);
  };

  CB.fields = F;
})();
