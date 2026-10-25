/* =====================================================================
 * Workbook App — Capstone: Commercial Branding · core/app.js
 *
 * ATURAN YANG TIDAK BOLEH DILANGGAR (kontrak claude/36 v3.2):
 * 1. ID field berformat s{sesi}.p{halaman workbook}.{kotak}, mis. "s1.p2.b8_gaps".
 *    Setelah sebuah sesi dirilis, ID-nya DIKUNCI: boleh MENAMBAH ID baru,
 *    TIDAK BOLEH mengganti nama atau menghapus ID lama.
 * 2. File JSON versi lama harus selalu bisa dibuka oleh versi app yang baru.
 *    Semua perubahan bentuk data ditangani di migrate(), jangan di tempat lain.
 * 3. App mahasiswa tidak pernah menampilkan kata status Gate
 *    (APPROVED / APPROVED WITH A CONDITION / REVISION DUE).
 * 4. Leadership Log (silabus §9D) disimpan di data.leadership_log, di luar data.sessions,
 *    dan punya halaman sendiri (leadership.html). Mengubah Log TIDAK mengubah status
 *    atau versi sesi mana pun. Decision Log S1 (field s1.p8.log) adalah field biasa
 *    di sessions.S1 (kontrak v3.3).
 * 5. NIM dikunci setelah layar identitas disimpan. Impor file memuat identitas
 *    file itu dan menimpa data browser untuk NIM yang sama (dengan konfirmasi).
 * Tanpa server, tanpa library CDN, tanpa build step.
 * ===================================================================== */
(function () {
  "use strict";

  var APP_VERSION = "0.2.5";
  var SCHEMA = "cb-student/1";
  var KEY_ACTIVE = "cb_active_nim";
  var KEY_PREFIX = "cb_student_";
  var KEY_EXPORTED = "cb_exported_";
  var FORBIDDEN_WORDS = /\b(APPROVED WITH A CONDITION|APPROVED|REVISION DUE)\b/;

  var CB = (window.CB = window.CB || {});
  CB.APP_VERSION = APP_VERSION;
  CB.SCHEMA = SCHEMA;
  CB.specs = CB.specs || {};      // diisi sessions/sN.js
  CB.content = CB.content || {};  // diisi content/sN.js
  CB.config = null;
  CB.projects = null;
  CB.groupAliases = {}; // ID proyek lama -> ID baru (config/projects.json "aliases"), mis. proyek yang digabung
  CB.data = null;

  /* ---------- util ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") e.className = attrs[k];
      else if (k === "text") e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    });
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0; return (c === "x" ? r : (r & 3) | 8).toString(16);
    });
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function isoLocal(d) {
    // ISO 8601 dengan offset zona perangkat, mis. 2026-10-26T21:04:00+07:00
    d = d || new Date();
    var off = -d.getTimezoneOffset(), sign = off >= 0 ? "+" : "-";
    off = Math.abs(off);
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + "T" +
      pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds()) +
      sign + pad(Math.floor(off / 60)) + ":" + pad(off % 60);
  }
  var HARI = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  var BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  function fmtDate(iso, withTime) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d)) return "";
    var s = HARI[d.getDay()] + " " + d.getDate() + " " + BULAN[d.getMonth()];
    if (withTime !== false) s += " " + pad(d.getHours()) + "." + pad(d.getMinutes());
    return s;
  }
  CB.util = { $: $, el: el, esc: esc, uuid: uuid, isoLocal: isoLocal, fmtDate: fmtDate };

  /* ---------- storage (selalu dibungkus try/catch) ---------- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) { } }
  CB.storageOK = (function () { try { var t = "__cb"; localStorage.setItem(t, "1"); localStorage.removeItem(t); return true; } catch (e) { return false; } })();

  /* ---------- skema & migrasi ---------- */
  function blankData(identity) {
    return {
      schema: SCHEMA,
      app_version: APP_VERSION,
      student_id: uuid(),
      identifier: {
        nim: identity.nim, full_name: identity.full_name || "", email: identity.email || "",
        group_id: identity.group_id || "", project_name: identity.project_name || ""
      },
      sessions: {},
      leadership_log: { field_id: "leadership_log", entries: [] },
      saved_at: isoLocal()
    };
  }

  /* v0.1 menyimpan Decision Log S1 dan sembilan butir §9D dalam satu entri di leadership_log.
   * v0.2 (kontrak v3.3): kolom workbook (WHEN/DECIDED/WHY/EVIDENCE) pindah ke sessions.S1 "s1.p8.log";
   * tiap butir §9D yang terisi menjadi satu entri Leadership Log berkategori. Aman diulang. */
  var CATS_9D = ["decisions_led", "meetings_facilitated", "research_conducted", "commercial_documents",
    "contributions_other_streams", "conflicts_addressed", "evidence_used", "changes_initiated", "personal_reflection"];
  function migrateLegacyLog(d) {
    var keep = [], moved = [], more = [];
    d.leadership_log.entries.forEach(function (e) {
      if (e.category) { keep.push(e); return; }
      var isLegacy = ["decided", "why", "evidence"].concat(CATS_9D).some(function (k) { return e[k] !== undefined; });
      if (!isLegacy) { keep.push(e); return; }
      if ((e.decided || "").trim() || (e.why || "").trim() || (e.evidence || "").trim()) {
        moved.push({ id: e.id || uuid(), when: e.date || "", decided: e.decided || "", why: e.why || "", evidence: e.evidence || "" });
      }
      CATS_9D.forEach(function (k) {
        if ((e[k] || "").trim()) {
          more.push({ id: uuid(), date: e.date || "", created_at: e.created_at || "", updated_at: e.updated_at || "", category: k, text: e[k], ref: "" });
        }
      });
    });
    if (moved.length) {
      var s1 = d.sessions.S1 = d.sessions.S1 || { status: "draft", current: {}, changed_since_submit: false, versions: [], reflections: {} };
      var cur = s1.current["s1.p8.log"] = s1.current["s1.p8.log"] || { items: [] };
      cur.items = (cur.items || []).concat(moved);
      if (s1.versions && s1.versions.length) s1.changed_since_submit = true;
    }
    d.leadership_log.entries = keep.concat(more);
  }
  function migrate(d) {
    // Satu-satunya tempat yang boleh mengubah bentuk data lama.
    if (!d || typeof d !== "object") throw new Error("Bukan file workbook.");
    if (d.schema !== SCHEMA) throw new Error("Skema file tidak dikenal (" + (d.schema || "kosong") + "). File ini bukan file workbook app ini.");
    if (!d.identifier || !/^\d+$/.test(String(d.identifier.nim || ""))) throw new Error("File tidak memuat NIM yang valid.");
    d.sessions = d.sessions || {};
    Object.keys(d.sessions).forEach(function (k) {
      var s = d.sessions[k];
      s.current = s.current || {};
      s.versions = s.versions || [];
      s.status = s.status || (s.versions.length ? "submitted" : "draft");
      if (typeof s.changed_since_submit !== "boolean") s.changed_since_submit = false;
      s.reflections = s.reflections || {};
    });
    if (!d.leadership_log) d.leadership_log = { field_id: "leadership_log", entries: [] };
    d.leadership_log.field_id = "leadership_log";
    d.leadership_log.entries = d.leadership_log.entries || [];
    migrateLegacyLog(d);
    if (!d.student_id) d.student_id = uuid();
    // Proyek yang digabung: file/data lama dengan group_id lama dipetakan ke ID baru.
    var gid = d.identifier.group_id, to = CB.groupAliases && CB.groupAliases[gid];
    if (to) { d.identifier.group_id = to; d.identifier.project_name = CB.projectName(to) || d.identifier.project_name; }
    d.app_version = APP_VERSION; // dicatat ulang saat disimpan oleh versi ini
    return d;
  }
  CB.migrate = migrate;

  function sess(id) {
    var s = CB.data.sessions[id];
    if (!s) s = CB.data.sessions[id] = { status: "draft", current: {}, changed_since_submit: false, versions: [], reflections: {} };
    return s;
  }
  CB.sess = sess;

  /* ---------- simpan / muat ---------- */
  var saveTimer = null, saveListeners = [];
  CB.onSave = function (fn) { saveListeners.push(fn); };
  function saveNow() {
    if (!CB.data) return;
    CB.data.saved_at = isoLocal();
    var ok = lsSet(KEY_PREFIX + CB.data.identifier.nim, JSON.stringify(CB.data));
    saveListeners.forEach(function (fn) { fn(ok); });
  }
  CB.save = function () { clearTimeout(saveTimer); saveTimer = setTimeout(saveNow, 350); };
  CB.saveNow = saveNow;
  CB.loadLocal = function (nim) {
    var raw = lsGet(KEY_PREFIX + nim);
    if (!raw) return null;
    try { return migrate(JSON.parse(raw)); } catch (e) { return null; }
  };
  CB.activeNim = function () { return lsGet(KEY_ACTIVE); };
  CB.setActive = function (nim) { lsSet(KEY_ACTIVE, nim); };
  CB.signOut = function () { saveNow(); lsDel(KEY_ACTIVE); CB.data = null; };
  CB.hasUnexported = function () {
    if (!CB.data) return false;
    var last = lsGet(KEY_EXPORTED + CB.data.identifier.nim);
    if (!last) return Object.keys(CB.data.sessions).some(function (k) { return Object.keys(CB.data.sessions[k].current).length; }) || CB.data.leadership_log.entries.length > 0;
    return CB.data.saved_at > last;
  };

  /* ---------- identitas ---------- */
  CB.validateIdentity = function (f) {
    var e = {};
    var n1 = String(f.nim1 || "").trim(), n2 = String(f.nim2 || "").trim();
    if (!n1) e.nim1 = "NIM wajib diisi.";
    else if (!/^\d+$/.test(n1)) e.nim1 = "NIM hanya boleh angka.";
    else if (n1.length < 8 || n1.length > 14) e.nim1 = "Panjang NIM tidak wajar. Periksa lagi.";
    if (!e.nim1) {
      if (!n2) e.nim2 = "Ketik NIM sekali lagi.";
      else if (n1 !== n2) e.nim2 = "Kedua NIM tidak sama.";
    }
    if (!String(f.full_name || "").trim()) e.full_name = "Nama lengkap wajib diisi.";
    var em = String(f.email || "").trim();
    if (!em) e.email = "Email wajib diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) e.email = "Format email tidak benar.";
    if (!f.group_id) e.group_id = "Pilih proyekmu.";
    else if (f.group_id === CB.CUSTOM_PROJECT && String(f.project_custom || "").trim().length < 3) e.project_custom = "Tulis nama proyekmu (minimal 3 huruf).";
    return e;
  };
  CB.CUSTOM_PROJECT = "LAIN"; // proyek yang tidak ada di daftar; nama diketik sendiri
  CB.projectName = function (gid, custom) {
    if (gid === CB.CUSTOM_PROJECT) return String(custom || "").trim();
    var p = (CB.projects || []).filter(function (x) { return x.group_id === gid; })[0];
    return p ? p.project_name : "";
  };
  CB.startStudent = function (f) {
    var nim = String(f.nim1).trim();
    var existing = CB.loadLocal(nim);
    var d = existing || blankData({ nim: nim });
    d.identifier.full_name = String(f.full_name).trim();
    d.identifier.email = String(f.email).trim();
    d.identifier.group_id = f.group_id;
    d.identifier.project_name = CB.projectName(f.group_id, f.project_custom);
    CB.data = d; CB.setActive(nim); saveNow();
    return { resumed: !!existing };
  };
  CB.updateIdentity = function (f) { // NIM tidak ikut: dikunci
    var id = CB.data.identifier;
    id.full_name = String(f.full_name).trim();
    id.email = String(f.email).trim();
    id.group_id = f.group_id;
    id.project_name = CB.projectName(f.group_id, f.project_custom);
    saveNow();
  };

  /* ---------- config & rilis ---------- */
  CB.preview = (function () {
    try {
      if (/[?&]pratinjau=1\b/.test(location.search)) sessionStorage.setItem("cb_preview", "1");
      if (/[?&]pratinjau=0\b/.test(location.search)) sessionStorage.removeItem("cb_preview");
      return sessionStorage.getItem("cb_preview") === "1";
    } catch (e) { return /[?&]pratinjau=1\b/.test(location.search); }
  })();
  CB.loadConfig = function () {
    function get(url) {
      return fetch(url, { cache: "no-cache" }).then(function (r) {
        if (!r.ok) throw new Error(url + " tidak ditemukan (" + r.status + ")");
        return r.text();
      }).then(function (t) {
        try { return JSON.parse(t); } catch (e) { throw new Error(url + " rusak: " + e.message); }
      });
    }
    return Promise.all([get("config/course.json"), get("config/projects.json")]).then(function (r) {
      CB.config = r[0]; CB.projects = r[1].projects || []; CB.groupAliases = r[1].aliases || {};
      return CB.config;
    });
  };
  CB.sessionCfg = function (id) { return (CB.config && CB.config.sessions && CB.config.sessions[id]) || null; };
  CB.isReleased = function (id) {
    var c = CB.sessionCfg(id);
    if (!c || !c.release) return false;
    if (CB.preview) return true;
    var t = Date.parse(c.release);
    return !isNaN(t) && Date.now() >= t;
  };
  CB.fill = function (text, sessId) {
    // Placeholder tanggal dari config. Konten tidak pernah memuat tanggal kalender.
    var c = CB.sessionCfg(sessId) || {};
    return String(text)
      .replace(/\{\{due\}\}/g, c.due ? fmtDate(c.due) : "tenggat minggu ini")
      .replace(/\{\{interviews_due\}\}/g, c.interviews_due ? fmtDate(c.interviews_due) : "tenggat wawancara")
      .replace(/\{\{week\}\}/g, c.week != null ? c.week : "");
  };

  /* ---------- pencarian spec ---------- */
  function specOf(id) { var m = /^s(\d+)\./.exec(id); return m ? CB.specs["S" + m[1]] : null; }
  CB.findPage = function (prefix) { // "s1.p6"
    var m = /^s(\d+)\.p(\d+)/.exec(prefix), sp = specOf(prefix);
    if (!m || !sp) return null;
    return sp.pages.filter(function (p) { return p.p === parseInt(m[2], 10); })[0] || null;
  };
  CB.findField = function (id) {
    var pg = CB.findPage(id);
    return pg ? pg.fields.filter(function (f) { return f.id === id; })[0] || null : null;
  };
  CB.pageLabel = function (id) {
    var m = /^s(\d+)\.p(\d+)/.exec(id);
    return m ? "S" + m[1] + " · hlm. " + m[2] : id;
  };

  /* ---------- field ---------- */
  CB.getField = function (sessId, fid) { return sess(sessId).current[fid]; };
  CB.setField = function (sessId, fid, val) {
    var s = sess(sessId);
    s.current[fid] = val;
    if (s.versions.length) s.changed_since_submit = true;
    CB.save();
  };

  /* ---------- submit = unduh JSON ---------- */
  function fileStamp(d) {
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + "-" + pad(d.getHours()) + pad(d.getMinutes());
  }
  CB.fileName = function (sessId, d) {
    return CB.data.identifier.nim + "_sd-" + sessId + "_" + fileStamp(d || new Date()) + ".json";
  };
  function download(name, text) {
    var blob = new Blob([text], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = el("a", { href: url, download: name });
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1500);
  }
  CB.submitSession = function (sessId, checks) {
    var s = sess(sessId);
    var now = new Date();
    s.versions.push({
      v: s.versions.length + 1,
      submitted_at: isoLocal(now),
      fields: JSON.parse(JSON.stringify(s.current)),
      checks: checks || {}
    });
    s.status = s.versions.length > 1 ? "revised" : "submitted";
    s.changed_since_submit = false;
    saveNow();
    var name = CB.fileName(sessId, now);
    download(name, JSON.stringify(CB.data, null, 2));
    lsSet(KEY_EXPORTED + CB.data.identifier.nim, CB.data.saved_at);
    return name;
  };
  CB.submittedRange = function (sessId) {
    // "S1–S2": sesi terakhir yang ada isinya, untuk teks dialog
    var n = parseInt(sessId.slice(1), 10);
    return n > 1 ? "S1–S" + n : "S1";
  };

  /* ---------- impor ---------- */
  CB.importFile = function (file) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onerror = function () { reject(new Error("File tidak bisa dibaca.")); };
      r.onload = function () {
        var d;
        try { d = migrate(JSON.parse(r.result)); } catch (e) { reject(e); return; }
        resolve(d);
      };
      r.readAsText(file);
    });
  };
  CB.acceptImport = function (d) {
    CB.data = d; CB.setActive(d.identifier.nim); saveNow();
    lsSet(KEY_EXPORTED + d.identifier.nim, CB.data.saved_at);
  };

  /* ---------- modal sederhana ---------- */
  CB.modal = function (opts) {
    return new Promise(function (resolve) {
      var back = el("div", { class: "modal-back", role: "dialog", "aria-modal": "true" });
      var m = el("div", { class: "modal" });
      m.appendChild(el("h3", { text: opts.title || "" }));
      (opts.paras || []).forEach(function (p) { m.appendChild(el("p", null, p)); });
      var row = el("div", { class: "row" });
      (opts.buttons || [{ label: "OK", value: true, cls: "primary" }]).forEach(function (b) {
        var bt = el("button", { class: "btn " + (b.cls || ""), type: "button", text: b.label });
        bt.onclick = function () { back.remove(); resolve(b.value); };
        row.appendChild(bt);
      });
      m.appendChild(row); back.appendChild(m); document.body.appendChild(back);
      var first = row.querySelector(".btn.primary") || row.querySelector(".btn");
      if (first) first.focus();
    });
  };

  /* ---------- peringatan tutup tab ----------
   * Pindah antarhalaman app (index, sN, Leadership Log) tidak pernah memicu peringatan:
   * isian sudah tersimpan otomatis di browser, jadi tidak ada yang hilang.
   * Peringatan hanya muncul saat tab ditutup / keluar dari app, dan bisa dimatikan
   * lewat kotak centang di action bar (disimpan per browser). */
  var KEY_NO_LEAVE_WARN = "cb_no_leave_warning";
  var internalNavAt = 0;
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a || a.hasAttribute("download") || (a.target && a.target !== "_self")) return;
    try { if (new URL(a.href, location.href).origin === location.origin) internalNavAt = Date.now(); } catch (err) { }
  }, true);
  CB.leaveWarnOff = function () { return lsGet(KEY_NO_LEAVE_WARN) === "1"; };
  CB.setLeaveWarnOff = function (off) { if (off) lsSet(KEY_NO_LEAVE_WARN, "1"); else lsDel(KEY_NO_LEAVE_WARN); };
  CB.leaveWarnToggle = function () {
    var lab = el("label", { class: "leavewarn small" });
    var cb = el("input", { type: "checkbox" });
    cb.checked = CB.leaveWarnOff();
    cb.onchange = function () { CB.setLeaveWarnOff(cb.checked); };
    lab.appendChild(cb);
    lab.appendChild(document.createTextNode(" Jangan ingatkan lagi saat menutup tab"));
    return lab;
  };
  window.addEventListener("beforeunload", function (e) {
    if (Date.now() - internalNavAt < 3000) return;
    if (CB.leaveWarnOff()) return;
    if (CB.data && CB.hasUnexported()) { e.preventDefault(); e.returnValue = ""; }
  });

  /* ---------- penjaga kata terlarang (dipakai uji & saat render) ---------- */
  CB.assertNoStatusWords = function (root) {
    var t = (root || document.body).innerText || "";
    return !FORBIDDEN_WORDS.test(t);
  };

  /* ---------- topbar umum ---------- */
  CB.renderTopbar = function (host, subtitle) {
    var id = CB.data && CB.data.identifier;
    host.innerHTML =
      '<div class="brand">Workbook · Capstone: Commercial Branding<small>' + esc(subtitle || "") + "</small></div>" +
      (id ? '<div class="whois"><b>' + esc(id.full_name) + "</b> · NIM " + esc(id.nim) + "<br>" + esc(id.group_id) + " · " + esc(id.project_name) + "</div>" : "");
  };
  /* Tab: Workbook sesi | Leadership Log. Leadership Log terbuka sejak S1 dan ikut di setiap file. */
  CB.renderTabs = function (host, sessId, active) {
    var wrap = document.createElement("nav");
    wrap.className = "tabs"; wrap.setAttribute("aria-label", "Bagian halaman");
    var a1 = document.createElement("a");
    a1.href = sessId ? sessId.toLowerCase() + ".html" : "index.html";
    a1.textContent = sessId ? "Workbook " + sessId : "Halaman utama";
    var a2 = document.createElement("a");
    a2.href = "leadership.html" + (sessId ? "?dari=" + sessId : "");
    a2.textContent = "Leadership Log";
    (active === "leadership" ? a2 : a1).className = "on";
    wrap.appendChild(a1); wrap.appendChild(a2);
    host.parentNode.insertBefore(wrap, host.nextSibling);
    return wrap;
  };
  CB.showError = function (host, msg) {
    host.innerHTML = '<div class="banner err"><b>App tidak bisa dimuat.</b> ' + esc(msg) +
      "<br>Coba muat ulang halaman. Kalau tetap gagal, kabari dosen lewat kanal kelas.</div>";
  };
})();
