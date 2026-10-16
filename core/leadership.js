/* core/leadership.js — halaman Leadership Log (kontrak v3.3).
 * Silabus §9D "Individual Product Manager/Business Leadership Log" (komponen individual 10%, §10).
 * Satu entri = satu butir §9D. Data di CB.data.leadership_log.entries (di luar sessions):
 *   { id, date, created_at, updated_at, category, text, ref }
 * category = salah satu kunci CATS di bawah (sama dengan sembilan butir §9D).
 * Mengubah Log tidak mengubah status atau versi sesi mana pun.
 * Contoh di panduan = ilustrasi, bukan jawaban yang harus ditiru. */
(function () {
  "use strict";
  var CB = window.CB, U = CB.util;

  var CATS = [
    { k: "decisions_led", en: "Decisions led",
      what: "Keputusan yang kamu pimpin: kamu yang mengusulkan, memfasilitasi pilihannya, dan memastikan keputusan diambil. Bukan keputusan yang kebetulan kamu ikuti.",
      ex: "Memimpin keputusan memilih jendela rilis Lebaran setelah membandingkan opsi dengan data box office film keluarga. Rujukan: S1 hlm. 8, baris 1.",
      from: "Setiap sesi. Tiap Gate memuat keputusan." },
    { k: "meetings_facilitated", en: "Meetings facilitated",
      what: "Rapat atau diskusi yang kamu pimpin: kamu menyiapkan agenda, menjaga alurnya, dan memastikan hasilnya tercatat.",
      ex: "Memfasilitasi rapat tim untuk memilih tiga masalah di hlm. 7 dan mencatat hasilnya. Rujukan: S1 hlm. 7.",
      from: "S1 (memilih tiga masalah), S7 (pembagian keputusan dan tata kelola)." },
    { k: "research_conducted", en: "Research conducted",
      what: "Riset yang kamu kerjakan sendiri: wawancara, analisis data sekunder, tes kecil. Tulis apa yang kamu lakukan, dengan siapa, dan apa temuannya.",
      ex: "Mewawancarai orang tua di luar industri film tentang film keluarga terakhir yang mereka pilih. Catatan mentah di S2 hlm. 9.",
      from: "S2 (wawancara dan Evidence Pack), lalu S3, S5, S6 saat ada uji." },
    { k: "commercial_documents", en: "Commercial documents produced",
      what: "Dokumen komersial yang kamu tulis atau susun. Sebut dokumennya dan bagian mana yang kamu kerjakan.",
      ex: "Menyusun Brand Audit Canvas dan menulis kotak 8 (GAPS & RISKS). Rujukan: S1 hlm. 2.",
      from: "Setiap sesi menghasilkan dokumen; paket akhir di S7–S8." },
    { k: "contributions_other_streams", en: "Contributions to other streams",
      what: "Apa yang kamu berikan atau minta ke stream lain (desain, teknis, konten/produksi): permintaan yang jelas, masukan komersial, keputusan yang kamu bantu.",
      ex: "Menulis permintaan ke tim konten: 5–10 menit footage behind-the-scenes, dibutuhkan dalam tiga minggu untuk tes audiens luar. Rujukan: S1 hlm. 7 (bawah).",
      from: "S1 hlm. 7 (bawah), S4 (identity brief), S6–S7." },
    { k: "conflicts_addressed", en: "Conflicts or coordination problems addressed",
      what: "Konflik atau masalah koordinasi yang kamu tangani: apa yang bentrok, peran siapa yang terlibat, apa yang kamu lakukan, dan hasilnya.",
      ex: "Tim ingin segera mengunci poster; kamu minta tes ke audiens luar dulu karena umpan balik internal hanya sampel ramah; disepakati tes dulu.",
      from: "Kapan saja, paling sering saat beberapa stream bertemu (S4–S7)." },
    { k: "evidence_used", en: "Evidence used",
      what: "Bukti yang kamu pakai untuk sebuah keputusan atau dokumen, jenisnya, dan keterbatasannya.",
      ex: "Memakai sekitar 50 reaksi screening untuk skor Evidence quality. Semuanya dari orang industri, jadi hanya sampel ramah. Rujukan: S1 hlm. 6.",
      from: "S2 (jenis bukti), S3, S6." },
    { k: "changes_initiated", en: "Changes initiated",
      what: "Perubahan yang kamu mulai: kamu melihat ada yang perlu diubah lalu menggerakkannya, mis. merevisi dokumen setelah feedback atau menutup kondisi sebuah Gate.",
      ex: "Mengusulkan menunda lini merchandise sampai setelah pekan pembukaan karena belum ada bukti resonansi. Rujukan: S1 hlm. 8, baris 3.",
      from: "Setelah feedback tiap minggu (Kamis), terutama saat ada revisi atau kondisi Gate." },
    { k: "personal_reflection", en: "Personal reflection",
      what: "Refleksimu sendiri: apa yang kamu pelajari, apa yang akan kamu lakukan berbeda, di mana kamu keliru. Jujur lebih berguna daripada rapi.",
      ex: "Kami menulis \"kami akan menurunkan harga\" sebagai masalah. Itu solusi. Lain kali aku tulis dulu apa yang belum kami ketahui.",
      from: "Akhir tiap minggu, setelah membaca feedback." }
  ];
  CB.LEAD_CATS = CATS;
  function cat(k) { return CATS.filter(function (c) { return c.k === k; })[0] || null; }
  function today() { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }

  function guideCard() {
    var card = U.el("section", { class: "card" });
    card.appendChild(U.el("h2", { text: "Apa yang perlu diisi" }));
    card.appendChild(U.el("p", { class: "lead", text: "Silabus §9D meminta tiap mahasiswa mencatat sembilan hal ini. Satu entri = satu butir. Kamu tidak harus mengisi semuanya setiap minggu; isi yang memang terjadi." }));
    var ul = U.el("ul");
    [
      "<b>Tulis kerjamu sendiri</b>, bukan keputusan tim yang kebetulan kamu ikuti. Written defence di akhir semester disusun dari entri Log-mu, dan jawaban yang tidak bisa menunjuk kerjamu sendiri akan terlihat.",
      "<b>Isi di hari kejadian.</b> Log yang ditulis dari ingatan berminggu-minggu kemudian adalah tebakan.",
      "<b>Beri tanggal dan satu rujukan:</b> halaman workbook (mis. \"S2 hlm. 9\") atau dokumen bukti. Entri tanpa rujukan sulit diperiksa.",
      "<b>Saran ritme:</b> setelah membaca feedback tiap Kamis, tambah entri untuk apa yang kamu putuskan, ubah, atau pelajari. Ini saran, bukan syarat nilai.",
      "Proyek individu sama saja: yang dicatat tetap kerjamu sendiri."
    ].forEach(function (t) { ul.appendChild(U.el("li", null, t)); });
    card.appendChild(ul);
    var det = U.el("details", { open: "" });
    det.appendChild(U.el("summary", { text: "Sembilan butir §9D: yang dihitung, contoh, dan kapan biasanya muncul" }));
    var sc = U.el("div", { class: "tscroll" });
    var t = U.el("table", { class: "wbtable leadguide" });
    var hr = U.el("tr");
    ["Butir §9D", "Yang dihitung", "Contoh ilustratif", "Biasanya muncul dari"].forEach(function (h) { hr.appendChild(U.el("th", { text: h })); });
    var th = U.el("thead"); th.appendChild(hr); t.appendChild(th);
    var tb = U.el("tbody");
    CATS.forEach(function (c) {
      var tr = U.el("tr");
      tr.appendChild(U.el("td", { text: c.en }));
      tr.appendChild(U.el("td", { text: c.what }));
      tr.appendChild(U.el("td", { text: c.ex }));
      tr.appendChild(U.el("td", { text: c.from }));
      tb.appendChild(tr);
    });
    t.appendChild(tb); sc.appendChild(t); det.appendChild(sc);
    det.appendChild(U.el("p", { class: "small muted" }, "Contoh memakai kasus Jumbo sebagai ilustrasi. Itu skenario belajar, bukan jawaban yang harus ditiru: tulis kerjamu sendiri."));
    card.appendChild(det);
    return card;
  }

  function entriesCard(onSave) {
    var card = U.el("section", { class: "card", id: "entri" });
    card.appendChild(U.el("h2", { text: "Entri-mu" }));
    var entries = CB.data.leadership_log.entries;
    var strip = U.el("div", { class: "catstrip" });
    card.appendChild(strip);
    var list = U.el("div");
    card.appendChild(list);

    function touch(e) { e.updated_at = U.isoLocal(); CB.save(); drawStrip(); }
    function drawStrip() {
      strip.innerHTML = "";
      CATS.forEach(function (c) {
        var n = entries.filter(function (e) { return e.category === c.k && (e.text || "").trim(); }).length;
        strip.appendChild(U.el("span", { class: "catchip" + (n ? " has" : "") }, U.esc(c.en) + " · <b>" + n + "</b>"));
      });
    }
    function draw() {
      list.innerHTML = "";
      if (!entries.length) list.appendChild(U.el("p", { class: "small muted", text: "Belum ada entri. Mulai dari satu hal yang kamu putuskan atau kerjakan hari ini." }));
      entries.forEach(function (e, i) {
        var box = U.el("div", { class: "leadentry" });
        var head = U.el("div", { class: "head" });
        head.appendChild(U.el("span", { class: "small muted", text: (e.updated_at ? "Diubah " + U.fmtDate(e.updated_at) : "Entri baru") }));
        var del = U.el("button", { type: "button", class: "iconbtn", text: "Hapus", title: "Hapus entri" });
        del.onclick = function () {
          CB.modal({ title: "Hapus entri ini?", paras: ["Entri yang dihapus tidak bisa dikembalikan, kecuali dari file yang pernah kamu unduh."], buttons: [{ label: "Batal", value: false, cls: "ghost" }, { label: "Hapus", value: true, cls: "primary" }] })
            .then(function (ok) { if (ok) { entries.splice(i, 1); CB.save(); drawStrip(); draw(); } });
        };
        head.appendChild(del); box.appendChild(head);

        var row = U.el("div", { class: "row2" });
        var d1 = U.el("div");
        var did = "ld_" + e.id;
        d1.appendChild(U.el("label", { for: did, text: "TANGGAL" }));
        var di = U.el("input", { type: "date", id: did }); di.value = e.date || "";
        di.onchange = function () { e.date = di.value; touch(e); };
        d1.appendChild(di);
        var d2 = U.el("div");
        var cid = "lc_" + e.id;
        d2.appendChild(U.el("label", { for: cid, text: "BUTIR §9D" }));
        var sel = U.el("select", { id: cid });
        sel.appendChild(U.el("option", { value: "", text: "— pilih butir —" }));
        CATS.forEach(function (c) { sel.appendChild(U.el("option", { value: c.k, text: c.en })); });
        sel.value = e.category || "";
        d2.appendChild(sel);
        row.appendChild(d1); row.appendChild(d2); box.appendChild(row);

        var note = U.el("div", { class: "catnote" });
        function setNote() { var c = cat(sel.value); note.textContent = c ? c.what : "Pilih butir yang paling pas. Kalau satu kejadian menyentuh dua butir, buat dua entri."; }
        setNote();
        sel.onchange = function () { e.category = sel.value; setNote(); touch(e); };
        box.appendChild(note);

        var tid = "lt_" + e.id;
        box.appendChild(U.el("label", { for: tid, text: "APA YANG KAMU KERJAKAN ATAU PUTUSKAN" }));
        var ta = U.el("textarea", { id: tid, placeholder: "— tulis kerjamu sendiri, di hari kejadian —" });
        ta.value = e.text || "";
        ta.addEventListener("input", function () { e.text = ta.value; touch(e); nudge(); });
        box.appendChild(ta);

        var rid = "lr_" + e.id;
        var rl = U.el("label", { for: rid, text: "RUJUKAN" }); rl.style.marginTop = "8px";
        box.appendChild(rl);
        var ri = U.el("input", { type: "text", id: rid, placeholder: "Halaman workbook atau dokumen bukti, mis. S2 hlm. 9" });
        ri.value = e.ref || "";
        ri.addEventListener("input", function () { e.ref = ri.value; touch(e); nudge(); });
        box.appendChild(ri);
        var nd = U.el("div", { class: "small muted" }); nd.style.marginTop = "4px";
        function nudge() {
          var msgs = [];
          if ((e.text || "").trim() && !(e.ref || "").trim()) msgs.push("Tanpa rujukan, entri ini sulit diperiksa.");
          if ((e.text || "").trim() && !e.category) msgs.push("Pilih butir §9D.");
          nd.textContent = msgs.join(" ");
        }
        nudge(); box.appendChild(nd);
        list.appendChild(box);
      });
    }
    var add = U.el("button", { type: "button", class: "btn", text: "+ Tambah entri" });
    add.onclick = function () {
      var now = U.isoLocal();
      entries.unshift({ id: U.uuid(), date: today(), created_at: now, updated_at: now, category: "", text: "", ref: "" });
      CB.save(); drawStrip(); draw();
      var t = list.querySelector("select"); if (t) t.focus();
    };
    card.appendChild(add);
    drawStrip(); draw();
    return card;
  }

  CB.bootLeadership = function () {
    var top = document.getElementById("topbar"), main = document.getElementById("main");
    CB.loadConfig().then(function () {
      var nim = CB.activeNim();
      CB.data = nim ? CB.loadLocal(nim) : null;
      if (!CB.data) { location.href = "index.html?perlu=identitas"; return; }
      CB.renderTopbar(top, "Leadership Log");
      document.title = "Leadership Log — Capstone: Commercial Branding";
      if (!CB.isReleased("S1")) {
        main.innerHTML = '<div class="banner info"><b>Leadership Log belum dibuka.</b> Halaman ini terbuka bersama Sesi 1. <a href="index.html">Kembali ke halaman utama</a>.</div>';
        return;
      }
      if (CB.preview) main.appendChild(U.el("div", { class: "banner preview" }, "<b>Mode pratinjau dosen.</b> Buka <code>?pratinjau=0</code> untuk keluar."));

      var intro = U.el("section", { class: "card" });
      intro.appendChild(U.el("h2", { text: "Leadership Log" }));
      intro.appendChild(U.el("p", { class: "lead", text: "Catatan individualmu sepanjang kursus (silabus §9D). Komponen nilai individual 10% (§10)." }));
      intro.appendChild(U.el("p", { class: "small" }, "Halaman ini terbuka sampai akhir semester dan ikut di <b>setiap file</b> yang kamu unduh lewat Submit sesi apa pun. Menambah atau mengubah entri tidak mengubah status sesi mana pun. Bedanya dengan Decision Log S1 (hlm. 8): Decision Log adalah catatan keputusan Sesi 1 yang diisi sekali di akhir Sesi 1; Leadership Log adalah catatan kerjamu sendiri yang bertambah tiap minggu."));
      main.appendChild(intro);
      main.appendChild(guideCard());
      main.appendChild(entriesCard());

      var bar = document.getElementById("actionbar");
      bar.innerHTML = "";
      var inner = U.el("div", { class: "inner" });
      inner.appendChild(U.el("a", { class: "btn ghost", href: "index.html", text: "← Halaman utama" }));
      var st = U.el("span", { class: "save", text: CB.storageOK ? "Tersimpan otomatis di browser ini. Ikut terunduh saat kamu Submit sesi." : "Browser ini memblokir penyimpanan. Unduh file lewat Submit sesi sebelum menutup tab." });
      inner.appendChild(st); bar.appendChild(inner);
      CB.onSave(function (ok) { st.textContent = ok ? "Tersimpan di browser " + U.fmtDate(new Date().toISOString()) + ". Belum terkirim ke dosen." : "Gagal menyimpan di browser. Unduh file sekarang lewat Submit sesi."; });
    }).catch(function (e) { CB.showError(main, e.message); });
  };
})();
