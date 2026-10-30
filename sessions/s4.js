/* sessions/s4.js — SPEC Sesi 4 (struktur halaman dan ID field). DRAF PERTAMA 30 Okt 2026.
 * Sumber: WORKBOOK_S4-team-workbook-v2.pptx (14 Okt 2026). Teks slide 1–9 = ekstrak teks di Project Knowledge
 * (biner .pptx tidak dilampirkan di chat ini), disalin ke tools/extracts/S4.md. Label, hint, subjudul, footer persis workbook.
 * Keputusan desain draf (menunggu Fai):
 *  - Urutan linear hlm. 2 → 9 (Bedah S4 v2 §2.4: tiap halaman memakai keluaran halaman sebelumnya).
 *  - Satu kotak workbook = satu field. Kotak yang di workbook punya bagian bernama dipecah di dalam field yang sama
 *    (tipe parts/list/status), tanpa menambah kotak: OUR MODEL (pilih model + kalimat), WHAT FLOWS IN/OUT (IN dan OUT),
 *    WHAT WE WILL DO ABOUT IT (satu tindakan per baris: pemilik, kapan, uji penutupan), REJECTED → REWROTE (dua sisi),
 *    hlm. 9 (daftar 5–7 kriteria: pertanyaan, tes Gate 3, jawaban yang lolos, jawaban, bukti).
 *  - Tipe baru "status" (core/fields.js): pilih status + catatan (+ isian tambahan). Dipakai hlm. 4 (CLEAR/TAKEN/UNKNOWN)
 *    dan hlm. 7 (dibutuhkan / sebagian / tidak dibutuhkan + siapa + kapan).
 *  - Footer hlm. 9 workbook TIDAK dipakai: memuat kata status Gate dan tanggal. Penjelasannya pindah ke callout (tanpa status).
 *  - Tanggal tercetak di cover workbook tidak dipakai; tenggat dibaca dari config.
 * ID FIELD DIKUNCI SETELAH S4 DIRILIS: boleh menambah, tidak boleh mengganti nama/menghapus.
 */
window.CB = window.CB || {}; CB.specs = CB.specs || {};
(function () {
  var TM = [{ v: "clear", label: "CLEAR" }, { v: "taken", label: "TAKEN" }, { v: "unknown", label: "UNKNOWN" }];
  var CH = [{ v: "needed", label: "Dibutuhkan" }, { v: "partly", label: "Sebagian dibutuhkan" }, { v: "not_needed", label: "Not needed, because…" }];
  var CHX = [{ k: "who", label: "Who makes it?", ph: "nama atau peran" }, { k: "when", label: "When?", ph: "tonggak, mis. sebelum Sesi 6" }];
  function tm(id, label, hint) { return { id: id, type: "status", label: label, hint: hint, options: TM, noteLabel: "Apa yang dicek dan apa hasilnya", notePh: "tulis sumber, kata kunci, kelas, dan hasil pencarian — jangan menebak" }; }
  function ch(id, label, hint) { return { id: id, type: "status", label: label, hint: hint, options: CH, extras: CHX, noteLabel: "Apa yang dibutuhkan di kanal ini (atau alasan tidak dibutuhkan)", notePh: "" }; }

  CB.specs.S4 = {
    id: "S4", n: 4,
    title: "Cross-Stream Brand Identity and Experience Brief",
    wbCover: "SESSION 4 TEAM WORKBOOK",
    coverNote: "Fill this in as a team, outside class — class covers the theory and the pattern. Everything on these pages gets read and executed by someone OUTSIDE your team: write for a stranger.",
    coverExtra: "Isi di HTML tool ini, lalu kirim file JSON lewat Form yang sama seperti minggu lalu. Semua halaman (hlm. 2–9) ada di satu file. Gate 3 dibaca dari file ini.",
    fillOrder: [2, 3, 4, 5, 6, 7, 8, 9],
    pages: [
      {
        p: 2, title: "Brand Architecture Map",
        sub: "Draw the lines where trust flows — not where legal ownership sits.",
        footer: "If your studio released something bad tomorrow, would this title be damaged? If yes, they're connected — draw the line. If the diagram looks like an org chart, redraw it.",
        carry: { title: "Bawaan dari sesi sebelumnya (hanya tampil, tidak disalin)", items: [
          { id: "s3.p2.final", label: "POSITIONING STATEMENT (S3 hlm. 2)" },
          { id: "s1.p2.b3_identity_assets", label: "IDENTITY ASSETS (S1 hlm. 2)" }
        ] },
        layout: "groups",
        groups: [
          { head: "", ids: ["s4.p2.parent", "s4.p2.product", "s4.p2.subnames"], cols: 3 },
          { head: "", ids: ["s4.p2.model", "s4.p2.model_why"] },
          { head: "", ids: ["s4.p2.flows"] }
        ],
        fields: [
          { id: "s4.p2.parent", type: "longtext", label: "PARENT / STUDIO NAME", hint: "Who is behind this? Write it even if it's just your team's working studio name." },
          { id: "s4.p2.product", type: "longtext", label: "PRODUCT / TITLE", hint: "The thing you are actually making this semester.", output: true },
          { id: "s4.p2.subnames", type: "longtext", label: "SUB-NAMES, EXTENSIONS, EVENTS", hint: "Characters, merchandise lines, sequels, screenings, tournaments. Write UNKNOWN if undecided." },
          { id: "s4.p2.model", type: "enum", label: "OUR MODEL", hint: "Circle one and write the sentence: branded house / house of brands / endorsed / sub-brand.",
            options: [{ v: "branded_house", label: "Branded house" }, { v: "house_of_brands", label: "House of brands" }, { v: "endorsed", label: "Endorsed" }, { v: "sub_brand", label: "Sub-brand" }] },
          { id: "s4.p2.model_why", type: "parts", hint: "“We are a ______ because ______.”",
            parts: [{ k: "model", label: "We are a", ph: "model yang kamu pilih" }, { k: "because", label: "because", ph: "alasan: kepercayaan apa yang mengalir masuk, kerusakan apa yang dibatasi", long: true }],
            previewTpl: "We are a {model} because {because}." },
          { id: "s4.p2.flows", type: "parts", label: "WHAT FLOWS IN, WHAT COULD FLOW OUT", hint: "What trust does the parent lend this product? And if this product failed publicly, what else would be damaged?",
            parts: [{ k: "in", label: "IN", ph: "kepercayaan apa yang dipinjamkan induk ke produk ini", long: true }, { k: "out", label: "OUT", ph: "kalau produk ini gagal di depan publik, nama apa lagi yang ikut rusak? sebut namanya", long: true }] }
        ]
      },
      {
        p: 3, title: "Naming Evaluation Matrix",
        sub: "Score 1–5 on every criterion, with one line of reason. A name that is already locked still gets scored.",
        footer: "A low score you cannot fix is exactly what justifies paying to fix it another way. Scoring your own locked name 4s and 5s produces nothing usable.",
        carry: { title: "Yang dinilai dan dasarnya (hanya tampil, tidak disalin)", items: [
          { id: "s4.p2.product", label: "PRODUCT / TITLE (hlm. 2) — nama yang dinilai" },
          { id: "s3.p2.final", label: "POSITIONING STATEMENT (S3 hlm. 2) — dasar MEANINGFUL" }
        ] },
        fields: [
          { id: "s4.p3.meaningful", type: "score", label: "MEANINGFUL", hint: "Does it support the positioning?" },
          { id: "s4.p3.distinctive", type: "score", label: "DISTINCTIVE & FINDABLE", hint: "Does it stand out — and can it be searched for?" },
          { id: "s4.p3.pronounceable", type: "score", label: "PRONOUNCEABLE", hint: "Can your audience say it and spell it after hearing it once?" },
          { id: "s4.p3.protectable", type: "score", label: "PROTECTABLE", hint: "Could this realistically be registered?" },
          { id: "s4.p3.growth", type: "score", label: "ROOM TO GROW", hint: "Still true with a sequel, spin-off, or merchandise?" },
          { id: "s4.p3.mitigation", type: "longtext", label: "MITIGATION FOR EVERY SCORE OF 1–2", hint: "If the name can't change, what will you do instead? (Register a stylised mark rather than the word · always lock the wordmark to another element · secure a qualified handle · budget for paid search)" }
        ]
      },
      {
        p: 4, title: "Trademark Preliminary Checklist",
        sub: "A first pass. Mark every source CLEAR, TAKEN, or UNKNOWN — never guess.",
        footer: "This is an introduction so you know when to ask a professional. It is not legal advice, and a first-pass search is not a clearance.",
        carry: { title: "Nama yang dicek (hanya tampil, tidak disalin)", items: [
          { id: "s4.p2.product", label: "PRODUCT / TITLE (hlm. 2)" }
        ] },
        fields: [
          tm("s4.p4.djki", "DJKI DATABASE", "Registered marks in Indonesia. Write the class you checked."),
          tm("s4.p4.web", "GOOGLE & WEB", "Who already uses this word commercially?"),
          tm("s4.p4.appstores", "APP STORES", "Relevant if a game, app, or companion product is possible."),
          tm("s4.p4.handles", "SOCIAL HANDLES & DOMAIN", "Is the bare handle available? Which qualified variants are?"),
          tm("s4.p4.languages", "MEANING IN OTHER LANGUAGES", "Including major regional languages, not only export markets."),
          { id: "s4.p4.actions", type: "list", label: "WHAT WE WILL DO ABOUT IT", hint: "One action per TAKEN or UNKNOWN: owner, date, closing test. An UNKNOWN with no action stays UNKNOWN in Session 8.",
            addText: "+ Tambah tindakan", emptyText: "Belum ada tindakan. Setiap sumber berstatus TAKEN atau UNKNOWN butuh satu baris.",
            itemFields: [
              { k: "source", label: "Untuk sumber", type: "select", empty: "— pilih sumber —", options: [{ v: "djki", label: "DJKI DATABASE" }, { v: "web", label: "GOOGLE & WEB" }, { v: "appstores", label: "APP STORES" }, { v: "handles", label: "SOCIAL HANDLES & DOMAIN" }, { v: "languages", label: "MEANING IN OTHER LANGUAGES" }] },
              { k: "action", label: "Action", type: "longtext" },
              { k: "owner", label: "Owner", type: "text" },
              { k: "when", label: "Date (kapan)", type: "text", ph: "tulis sendiri" },
              { k: "closed", label: "Closing test (selesai kalau…)", type: "text" }] }
        ]
      },
      {
        p: 5, title: "Creative Brand Brief", layout: "grid", cols: 2,
        sub: "The core artefact. Written for a designer who has never met your team.",
        footer: "Test every line: is it a requirement, or a solution wearing a requirement's clothes? Could a stranger act on this without one spoken conversation?",
        carry: { title: "Bawaan dari sesi sebelumnya (hanya tampil, tidak disalin)", items: [
          { id: "s2.p4.primary", label: "PRIMARY AUDIENCE (S2 hlm. 4) — untuk AUDIENCE" },
          { id: "s3.p2.final", label: "POSITIONING STATEMENT (S3 hlm. 2) — dikutip persis di POSITIONING TO EXPRESS" },
          { id: "s3.p4.personality", label: "PERSONALITY (S3 hlm. 4)" },
          { id: "s3.p5.sliders", label: "BRAND PERSONALITY SPECTRUM (S3 hlm. 5) — untuk PERSONALITY & TONE" }
        ] },
        fields: [
          { id: "s4.p5.objective", type: "longtext", label: "OBJECTIVE", hint: "What do you need made, and what must it achieve?" },
          { id: "s4.p5.audience", type: "longtext", label: "AUDIENCE", hint: "Who is it for? Straight from Session 2." },
          { id: "s4.p5.positioning", type: "copytext", copyFrom: "s3.p2.final", copyLabel: "Salin kalimat positioning Sesi 3", label: "POSITIONING TO EXPRESS", hint: "Your Session 3 sentence. Which part must the identity carry?" },
          { id: "s4.p5.tone", type: "longtext", label: "PERSONALITY & TONE OF VOICE", hint: "Write pairs: “warm, not sweet”. Add one right and one wrong sentence." },
          { id: "s4.p5.mandatory", type: "longtext", label: "MANDATORY ELEMENTS", hint: "Requirements, not solutions. Things that must be true of any answer." },
          { id: "s4.p5.prohibited", type: "longtext", label: "PROHIBITED ELEMENTS", hint: "What must NOT appear — and the strategic reason why." },
          { id: "s4.p5.accessibility", type: "longtext", label: "ACCESSIBILITY REQUIREMENTS", hint: "Contrast, thumbnail legibility, never colour alone, captions." },
          { id: "s4.p5.rejected", type: "parts", label: "A LINE WE REJECTED → REWROTE", hint: "Keep the dictating version visible next to the fix.",
            parts: [{ k: "rejected", label: "REJECTED (versi yang mendikte)", ph: "baris asli yang menyebut solusi", long: true }, { k: "rewritten", label: "REWRITTEN (persyaratannya)", ph: "persyaratan strategis di balik baris itu", long: true }] }
        ]
      },
      {
        p: 6, title: "Brand Codes Inventory", layout: "grid", cols: 2,
        sub: "Maximum five. The elements that identify you with the logo deleted.",
        footer: "Expect this page to get SHORTER as you work. A team that ends with five strong codes on the first pass usually hasn't applied the no-logo test at all.",
        carry: { title: "Bawaan (hanya tampil, tidak disalin)", items: [
          { id: "s1.p2.b3_identity_assets", label: "IDENTITY ASSETS (S1 hlm. 2) — aset yang sudah ada" },
          { id: "s4.p5.mandatory", label: "MANDATORY ELEMENTS (hlm. 5)" }
        ] },
        fields: [
          { id: "s4.p6.have", type: "longtext", label: "CODES WE ALREADY HAVE", hint: "Colour, shape, sound, typography, character. Only the ones that genuinely repeat." },
          { id: "s4.p6.need", type: "longtext", label: "CODES WE STILL NEED", hint: "What's missing? Write UNKNOWN where nothing exists yet — that's a gap, not an omission." },
          { id: "s4.p6.owners", type: "longtext", label: "OWNER OF EACH CODE", hint: "Who approves a change to it? A code with no owner drifts within a month." },
          { id: "s4.p6.nologo", type: "longtext", label: "THE NO-LOGO TEST", hint: "For each code: would this still identify us if the logo were deleted? Cross out everything that fails." }
        ]
      },
      {
        p: 7, title: "Multisensory Identity Map", layout: "grid", cols: 2,
        sub: "Six channels. Where one isn't needed, write “not needed, because…” — never blank.",
        footer: "Filling all six enthusiastically is usually wishful thinking rather than ambition. Name who makes each one and when — that's what separates a plan from a wish.",
        carry: { title: "Bawaan dari halaman sebelumnya (hanya tampil, tidak disalin)", items: [
          { id: "s4.p6.have", label: "CODES WE ALREADY HAVE (hlm. 6)" },
          { id: "s4.p6.need", label: "CODES WE STILL NEED (hlm. 6)" }
        ] },
        fields: [
          ch("s4.p7.visual", "VISUAL", "Character, palette, wordmark, layout, application"),
          ch("s4.p7.verbal", "VERBAL", "Tone in trailers, captions, press, in-product copy"),
          ch("s4.p7.sonic", "SONIC", "A motif, ident, or signature sound — separate from the score"),
          ch("s4.p7.motion", "MOTION", "How things move, appear, and transition"),
          ch("s4.p7.spatial", "SPATIAL", "Venues, lobbies, booths, events, screenings"),
          ch("s4.p7.interactive", "INTERACTIVE / BEHAVIOURAL", "App, game, service behaviour, how you reply to people")
        ]
      },
      {
        p: 8, title: "Touchpoint Consistency Matrix",
        sub: "One row per touchpoint. How does the promise actually show up there?",
        footer: "At least one row must be a touchpoint built later by someone outside this room. That's the row where brands actually break.",
        carry: { title: "Bawaan (hanya tampil, tidak disalin)", items: [
          { id: "s3.p4.promise", label: "PROMISE (S3 hlm. 4)" },
          { id: "s3.p6.roof", label: "MASTER MESSAGE (S3 hlm. 6)" },
          { id: "s1.p5.touchpoints", label: "TOUCHPOINT INVENTORY (S1 hlm. 5)" }
        ] },
        fields: [
          { id: "s4.p8.matrix", type: "table", rowLabel: "Touchpoint", wrapCells: true, allowExtraRows: true,
            rows: [
              { k: "product", label: "PRODUCT — the thing itself" },
              { k: "campaign", label: "CAMPAIGN — trailer, poster, social" },
              { k: "platform", label: "PLATFORM — thumbnails, listings, store pages" },
              { k: "event", label: "EVENT — screenings, launches, booths" },
              { k: "packaging", label: "PACKAGING & MERCHANDISE — usually built later, by other people" },
              { k: "community", label: "COMMUNITY — fan work, reposts, replies" }
            ],
            columns: [{ k: "how", label: "How the brand promise is expressed here" }, { k: "who", label: "who is responsible for it" }] }
        ]
      },
      {
        p: 9, title: "Creative Approval Checklist — Gate 3 Check",
        sub: "5–7 binary criteria; two checkers, same answer. Mark YES, NO, or UNKNOWN.",
        carry: { title: "Bahan kriteria (hanya tampil, tidak disalin)", items: [
          { id: "s4.p5.mandatory", label: "MANDATORY ELEMENTS (hlm. 5)" },
          { id: "s4.p5.prohibited", label: "PROHIBITED ELEMENTS (hlm. 5)" },
          { id: "s4.p5.accessibility", label: "ACCESSIBILITY REQUIREMENTS (hlm. 5)" }
        ] },
        fields: [
          { id: "s4.p9.criteria", type: "list", addText: "+ Tambah kriteria", max: 7,
            emptyText: "Belum ada kriteria. Tulis 5 sampai 7.",
            guide: "<p>Setiap baris = <b>satu pertanyaan ya/tidak</b> yang bisa dijawab dua pemeriksa terpisah dengan hasil sama. \"Apakah terasa premium?\" gagal; \"Apakah wordmark terbaca hitam-putih pada lebar 120 piksel?\" lolos.</p><p><b>Jawaban yang lolos</b> tidak selalu YES: untuk kriteria larangan (\"Apakah ada elemen yang hanya mengandalkan warna?\"), jawaban yang lolos adalah NO. Yang belum bisa dicek ditulis UNKNOWN (termasuk yang belum diuji), bukan dicentang.</p>",
            itemFields: [
              { k: "q", label: "Criterion — a yes/no question", type: "longtext" },
              { k: "test", label: "Gate 3 test", type: "select", empty: "— pilih tes —", options: [{ v: "architecture", label: "architecture (hlm. 2)" }, { v: "naming", label: "naming (hlm. 3–4)" }, { v: "brief", label: "brief (hlm. 5–9)" }] },
              { k: "pass_on", label: "Jawaban yang lolos", type: "select", empty: "— pilih —", options: [{ v: "yes", label: "YES" }, { v: "no", label: "NO" }] },
              { k: "answer", label: "Jawaban hari ini", type: "select", empty: "— belum dijawab —", options: [{ v: "yes", label: "YES" }, { v: "no", label: "NO" }, { v: "unknown", label: "UNKNOWN (belum dicek)" }] },
              { k: "evidence", label: "Bukti — apa yang dilihat pemeriksa", type: "longtext" }] }
        ]
      }
    ]
  };
})();
