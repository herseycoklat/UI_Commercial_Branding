/* sessions/s6.js — SPEC Sesi 6 (struktur halaman dan ID field). Dibangun 17 Nov 2026.
 * Sumber: WORKBOOK_S6-team-workbook-v3.pptx (17 Nov 2026). Ekstrak teks = tools/extracts/S6.md.
 * Label, hint, subjudul, footer, bar "What this page answers" / "Optional. …", strip "GOES ON THE CARD" persis workbook v3.
 * Keputusan yang diikuti: PROJECT-CONTEXT v40 blok 0000000000, butir 78 (g)+(h), 79; doc 73 §1 (tampilkan, jangan ketik ulang);
 * prompt doc 91; keputusan Fai 17 Nov di chat HTML tools S6:
 *  - Hal inti: hlm. 4 (Customer Journey, n 13), hlm. 5 (Message, n 14), hlm. 9 (KPI Tree, n 15). hlm. 2, 3, 6, 7, 8, 10 = boleh dilewati.
 *  - "reasons", bukan "pillars". hlm. 7 baris WAITING ON. Judul hlm. 10 "Launch Risk & Contingency". Tanpa kata Gate.
 *  - hlm. 5 kolom PROOF = teks (bukan picker); baris REAL S3 tampil di atas, cek kelengkapan memberi peringatan lunak
 *    bila teks PROOF tidak cocok dengan promise baris REAL mana pun.
 *  - Concept Card (8 baris) dirakit dari halaman asal, baca-saja, tampil sesudah hlm. 9 (spec.conceptCard). Baris kosong =
 *    "not filled yet" + tautan ke halaman asal (butir 79: tidak diketik langsung di kartu). Tombol unduh PDF + layar penuh.
 * ID FIELD DIKUNCI SETELAH S6 DIRILIS: boleh menambah, tidak boleh mengganti nama/menghapus.
 */
window.CB = window.CB || {}; CB.specs = CB.specs || {};
(function () {
  var REAL = { id: "s3.p5.promise_proof", filter: { k: "status", eq: "nyata" }, k: "promise", k2: "proof", countOthers: true,
    label: "REAL rows of Promise → Proof (S3 hlm. 5)" };

  CB.specs.S6 = {
    id: "S6", n: 6,
    title: "Go-to-Market and Brand Activation Plan",
    wbCover: "SESSION 6 TEAM WORKBOOK",
    coverNote: "How does the brand meet people? One thread runs through the three core pages: one person (page 4), one message (page 5), one number (page 9). Together they fill three rows of your Concept Card; the other five rows come from Sessions 2, 3 and 5.",
    hideDue: true,
    coverExtra: "Core pages (4, 5, 9) are required; optional pages (2, 3, 6, 7, 8, 10) are filled only when you need them, and their minimum is already on a core page. Your Concept Card is built from your pages and shown after page 9: an empty row shows \"not filled yet\". Batas unggah diumumkan dosen di kelas dan di grup kelas.",
    importPrompt: true,
    fillOrder: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    conceptCard: { after: 9 },
    core: {
      intro: "This session has 3 must-dos: page 4 (journey), page 5 (message) and page 9 (KPI tree). Other pages are optional. Your Concept Card is built from them, after page 9.",
      items: [
        { n: 13, k: "i13", chain: "Customer Journey", label: "Page 4 (journey)", page: 4, where: "hlm. 4" },
        { n: 14, k: "i14", chain: "Message", label: "Page 5 (message)", page: 5, where: "hlm. 5" },
        { n: 15, k: "i15", chain: "KPI Tree", label: "Page 9 (KPI tree)", page: 9, where: "hlm. 9" }
      ]
    },
    pages: [
      /* ================= hlm. 2 — Go-to-Market Canvas (opsional) ================= */
      {
        p: 2, title: "Go-to-Market Canvas", skip: true, short: "page 2 (canvas)",
        min: "Fill it when your team needs to agree on one direction. Its minimum is already in page 9 (KPI tree), your Session 2 audience and your Session 5 price.",
        sub: "Your whole plan in one sentence. Boxes 1–4 first; boxes 5–8 last, after your other pages exist.",
        footer: "Common mistake: \"go viral\" as a goal. No number, it is a wish; no date, a mood. Every plan has at least one contradiction; if you can't find yours, you filled the page but haven't read it yet.",
        layout: "groups",
        groups: [
          { head: "BOXES 1–4 · FIRST", cols: 2, ids: ["s6.p2.goal", "s6.p2.audience", "s6.p2.money", "s6.p2.date"] },
          { head: "BOXES 5–8 · LAST, FROM YOUR OTHER PAGES", cols: 2, ids: ["s6.p2.message", "s6.p2.channels", "s6.p2.hours", "s6.p2.top"] },
          { appOnly: true, head: "", cols: 2, ids: ["s6.p2.sentence", "s6.p2.contra"] }
        ],
        fields: [
          { id: "s6.p2.goal", type: "longtext", label: "1 · GOAL", hint: "Who does what, how many, by when. The same as page 9, step 1." },
          { id: "s6.p2.audience", type: "shown", label: "2 · AUDIENCE", hint: "Shown from Session 2. If the buyer and the user differ, both.",
            from: [{ id: "s2.p4.primary", label: "Primary audience (S2 hlm. 4)" }],
            extraLabel: "Buyer ≠ user? Write both (optional)", extraPh: "mis. yang membayar orang tua, yang memakai anak." },
          { id: "s6.p2.money", type: "shown", label: "3 · THE MONEY LINE", hint: "Your PRIMARY from Session 5, and the price that brings it in.",
            from: [{ id: "s5.p2.rev", filter: { k: "role", eq: "primary" }, k: "stream", label: "PRIMARY (S5 hlm. 2)" }, { id: "s5.p4.rows", label: "Prices (S5 hlm. 4)" }],
            extraLabel: "The price that brings it in (optional)", extraPh: "mis. Rp2.500.000 per pemutaran sekolah" },
          { id: "s6.p2.date", type: "text", label: "4 · DATE", hint: "Launch date or milestone. An estimate is fine: say so." },
          { id: "s6.p2.message", type: "shown", label: "5 · MAIN MESSAGE", hint: "From page 5, word for word.",
            from: [{ id: "s6.p5.main", label: "Main message (page 5)" }] },
          { id: "s6.p2.channels", type: "longtext", label: "6 · CHANNELS", hint: "The two or three that matter (page 6, or your page 4 discover and access steps)." },
          { id: "s6.p2.hours", type: "text", label: "7 · HOURS", hint: "MUST hours per person per week (page 8)." },
          { id: "s6.p2.top", type: "shown", label: "8 · TOP NUMBER", hint: "From page 9, step 1. Does it match box 1?",
            from: [{ id: "s6.p9.target", label: "Target (page 9, step 1)" }],
            extraLabel: "Does it match box 1? (optional)", extraPh: "YES, atau apa bedanya" },
          { id: "s6.p2.sentence", type: "longtext", label: "THE PLAN IN ONE SENTENCE", hint: "\"We want THESE PEOPLE to DO THIS, reached through THESE CHANNELS, and we will know by THIS NUMBER, by THIS DATE.\" Read all eight boxes aloud as one sentence." },
          { id: "s6.p2.contra", type: "longtext", label: "ONE CONTRADICTION, KEPT VISIBLE", hint: "One place where the plan contradicts itself, and what you do about it: change a box, or keep it visible on page 9 or 10." }
        ]
      },

      /* ================= hlm. 3 — Audience Funnel (opsional) ================= */
      {
        p: 3, title: "Audience Funnel", skip: true, short: "page 3 (funnel)",
        min: "Fill it when you have numbers or estimates per stage. Its minimum is already in page 4 (journey) and page 9 (KPI tree), step 2.",
        sub: "How many people move forward, and where most stop. The funnel counts many people; the journey follows one.",
        footer: "Common mistake: \"they feel curious\". You cannot count it; \"they open the trailer link\" you can. Tag every number MEASURED, COMPARABLE or GUESS. A sheet where every origin says MEASURED is almost always wrong.",
        fields: [
          { id: "s6.p3.funnel", type: "table", rowLabel: "STAGE", wrapCells: true,
            columns: [{ k: "does", label: "WHAT THE PERSON DOES: A BEHAVIOUR YOU COULD SEE" }, { k: "howmany", label: "HOW MANY" }, { k: "origin", label: "ORIGIN" }],
            rows: [{ k: "awareness", label: "Awareness" }, { k: "consideration", label: "Consideration" }, { k: "conversion", label: "Conversion" }, { k: "retention", label: "Retention" }, { k: "advocacy", label: "Advocacy" }] },
          { id: "s6.p3.drop", type: "longtext", label: "WHERE MOST PEOPLE STOP, AND WHY WE THINK SO", hint: "The biggest drop between two stages. Page 4 (journey) shows why one person stops there; a GUESS here can become a risk on page 10." }
        ]
      },

      /* ================= hlm. 4 — Customer Journey Map (inti) ================= */
      {
        p: 4, title: "Customer Journey Map", short: "page 4 (journey)",
        answers: "why one person moves forward or stops.",
        sub: "One person from your primary audience, six steps, one friction you fix.",
        footer: "Common mistake: drawing it for \"everyone\", or stopping at purchase. If the walk ends at purchase, you drew a sales funnel, not a journey. Not a consumer product? Read \"purchase\" as \"decides to use it\".",
        strip: { head: "GOES ON THE CARD", text: "Your access step becomes the row WHERE." },
        shownTop: { label: "PRIMARY AUDIENCE · SESSION 2, PAGE 4 · SHOWN, NOT RETYPED", hint: "Shown from Session 2, page 4. To change it, change it there.",
          from: [{ id: "s2.p4.primary", label: "Primary audience (S2 hlm. 4)" }] },
        fields: [
          { id: "s6.p4.person", type: "longtext", label: "OUR ONE PERSON", hint: "— a name and one line: who they are, and the moment they first meet you —" },
          { id: "s6.p4.journey", type: "table", rowLabel: "STEP", wrapCells: true,
            columns: [{ k: "where", label: "WHERE IT HAPPENS" }, { k: "do", label: "WHAT THEY DO, THINK OR ASK" }, { k: "stop", label: "WHAT COULD STOP THEM" }],
            rows: [{ k: "discover", label: "DISCOVER first time they meet it" }, { k: "evaluate", label: "EVALUATE where they could pick something else" },
              { k: "access", label: "ACCESS where and when they can get it" }, { k: "purchase", label: "PURCHASE the real decision, real price" },
              { k: "experience", label: "EXPERIENCE using it, the day after" }, { k: "share", label: "SHARE telling or bringing others" }] },
          { id: "s6.p4.fix", type: "parts", label: "ONE FRICTION WE FIX: WHAT CHANGES · WHO · BY WHEN", hint: "Which step, what changes, who does it, by when. Then check the other steps: does your fix break one of them?",
            parts: [{ k: "step", label: "Which step", ph: "mis. discover" }, { k: "change", label: "What changes", ph: "mis. tambah kartu judul dua detik di setiap klip", long: true },
              { k: "who", label: "Who does it", ph: "satu nama atau peran" }, { k: "when", label: "By when", ph: "satu tanggal atau milestone" },
              { k: "check", label: "Checked against the other steps: does the fix break one of them?", ph: "mis. tidak mengubah langkah sesudah discover", long: true }] }
        ]
      },

      /* ================= hlm. 5 — Message and Content Matrix (inti) ================= */
      {
        p: 5, title: "Message and Content Matrix", short: "page 5 (message)",
        answers: "what your primary audience hears, and why they should believe it.",
        sub: "One main message, 2–3 reasons with their proof, one ask. Nothing new: it comes from Session 3.",
        footer: "Common mistake: writing for everyone, or inventing a new message. A message with no link to Session 3 is a new strategy written at the last minute. A reason may only point to a REAL row; an UNKNOWN promise is not a reason yet.",
        strip: { head: "GOES ON THE CARD", text: "Main message → the big row MAIN MESSAGE. Proof → WHY BELIEVE IT (from your Session 3 REAL rows). Ask → WHAT WE ASK YOU TO DO." },
        shownTop: { label: "YOUR POSITIONING AND YOUR REAL PROMISE → PROOF ROWS · SESSION 3 · SHOWN, NOT RETYPED",
          hint: "Shown from Session 3: your positioning statement (page 2) and the rows of your Promise → Proof table marked REAL (page 5). To change them, change them there.",
          from: [{ id: "s3.p2.final", label: "Positioning (S3 hlm. 2)" }, REAL] },
        fields: [
          { id: "s6.p5.main", type: "longtext", label: "MAIN MESSAGE · ONE SENTENCE", hint: "One sentence, from the promise in your positioning. Not a new idea." },
          { id: "s6.p5.reasons", type: "list", wbColumns: true, label: "REASON (SUPPORTING MESSAGE)", max: 3,
            tip: "Two reasons are enough; a third is optional. Each reason points to one REAL row of your Session 3 Promise → Proof (shown above).",
            addText: "+ Tambah reason", emptyText: "Belum ada reason. Tulis dua: kenapa pesan utamamu benar, masing-masing dengan baris REAL Sesi 3 yang membuktikannya.",
            rowTags: ["Reason 1", "Reason 2", "Reason 3 (optional)"],
            itemFields: [
              { appOnly: true, k: "name", label: "Short name (optional)", type: "text", ph: "mis. Made here" },
              { k: "says", label: "WHAT IT SAYS", type: "longtext", ph: "— why the main message is true, in your audience's words —" },
              { k: "proof", label: "PROOF: WHICH REAL ROW OF YOUR SESSION 3 PROMISE → PROOF", type: "longtext", ph: "— which REAL row: write the promise of that row —" }] },
          { id: "s6.p5.ask", type: "longtext", label: "ONE ASK", hint: "One action only. The same action as step 1 of page 9 (KPI tree)." },
          { id: "s6.p5.test", type: "status", label: "THE TEST", hint: "Read each line to your primary audience. Does it still keep the promise in your positioning? YES or NOT YET, and which line.",
            options: [{ v: "yes", label: "YES" }, { v: "notyet", label: "NOT YET" }],
            noteLabel: "Which line, and why", notePh: "mis. reason 2 terdengar seperti PR: NOT YET, ubah katanya" }
        ]
      },

      /* ================= hlm. 6 — Paid–Owned–Earned–Shared Media Map (opsional) ================= */
      {
        p: 6, title: "Paid–Owned–Earned–Shared Media Map", skip: true, short: "page 6 (media)",
        min: "Fill it when you use more than two channels, or rely on ads, a partner or a KOL. Its minimum is already in page 4 (journey), the discover and access steps.",
        sub: "Which channels, doing what, at what cost. At student scale the real budget is hours.",
        footer: "Common mistake: \"Instagram\" with no role, or \"free\" with no hours. Free in rupiah, but how many hours a week, and whose?",
        fields: [
          { id: "s6.p6.media", type: "table", rowLabel: "MEDIA", wrapCells: true,
            columns: [{ k: "role", label: "ROLE: DOING WHAT, FOR WHICH STEP" }, { k: "cost", label: "COST: RUPIAH, OR HOURS WITH A NAME" }],
            rows: [{ k: "paid", label: "Paid · rented" }, { k: "owned", label: "Owned · you control it" }, { k: "earned", label: "Earned · others talk" }, { k: "shared", label: "Shared · your community makes things" }] }
        ]
      },

      /* ================= hlm. 7 — Campaign Calendar (opsional) ================= */
      {
        p: 7, title: "Campaign Calendar", skip: true, short: "page 7 (calendar)",
        min: "Fill it when you have a launch date and more than two people. Its minimum is already in page 4 (journey): your one fix, with who and when.",
        sub: "What happens which week, and who owns it. Work backwards from the date.",
        footer: "Common mistake: everything in launch week, or a line with no owner. A calendar line with no owner is a wish. A WAITING ON row with no date is a risk nobody is watching.",
        fields: [
          { id: "s6.p7.from", type: "longtext", label: "WORKING BACKWARDS FROM", hint: "The launch date or milestone from page 2, box 4. An estimate is fine: write that it is one." },
          { id: "s6.p7.calendar", type: "table", rowLabel: "", wrapCells: true,
            columns: [{ k: "pre", label: "PRE-LAUNCH" }, { k: "launch", label: "LAUNCH" }, { k: "post", label: "POST-LAUNCH" }],
            rows: [{ k: "dates", label: "Dates" }, { k: "what", label: "What happens" }, { k: "owner", label: "Owner + hours / week" }, { k: "waiting", label: "WAITING ON" }] }
        ]
      },

      /* ================= hlm. 8 — Budget Priority Matrix (opsional) ================= */
      {
        p: 8, title: "Budget Priority Matrix", skip: true, short: "page 8 (budget)",
        min: "Fill it when your plan needs more hours than you have. Its minimum is already in page 4 (journey): one fix with an owner.",
        sub: "What you cut, so the plan fits the hours you really have.",
        footer: "Common mistake: nothing marked CUT. A plan with nothing cut has not been prioritised. About 20 hours per person per week is this course's working limit, not a syllabus rule.",
        fields: [
          { id: "s6.p8.rows", type: "list", appOnly: true, wbColumns: true, label: "ACTIVITY · RUPIAH · HOURS / WEEK · EFFECT ON YOUR TOP NUMBER · PRIORITY",
            addText: "+ Tambah aktivitas", emptyText: "Belum ada aktivitas. Mulai dari baris di page 7 (calendar), atau dari satu fix di page 4 (journey).",
            itemFields: [
              { k: "activity", label: "ACTIVITY", type: "text", ph: "— an activity from page 7, or from your one fix on page 4 —" },
              { k: "rupiah", label: "RUPIAH", type: "text", ph: "— or 0 —" },
              { k: "hours", label: "HOURS / WEEK", type: "text", ph: "— hours, one person —" },
              { k: "effect", label: "EFFECT ON YOUR TOP NUMBER", type: "select", empty: "— HIGH / MEDIUM / LOW —", options: [{ v: "high", label: "HIGH" }, { v: "medium", label: "MEDIUM" }, { v: "low", label: "LOW" }] },
              { k: "priority", label: "PRIORITY", type: "select", empty: "— MUST / SHOULD / COULD / CUT —", options: [{ v: "must", label: "MUST" }, { v: "should", label: "SHOULD" }, { v: "could", label: "COULD" }, { v: "cut", label: "CUT" }] }] },
          { id: "s6.p8.test", type: "longtext", label: "THE HOURS TEST", hint: "Total MUST hours ÷ number of people = ____ hours per person per week. Above about 20, before other classes? Cut." },
          { id: "s6.p8.cut", type: "longtext", label: "WHAT WE CUT FIRST, AND WHY", hint: "The least valuable line, not the least fun one. One sentence on why." }
        ]
      },

      /* ================= hlm. 9 — KPI Tree (inti) ================= */
      {
        p: 9, title: "KPI Tree", short: "page 9 (KPI tree)",
        answers: "which number says it worked, and which earlier numbers warn you in time.",
        sub: "Four steps: start from the target, break it down, find what drives it, watch an early signal.",
        footer: "Common mistake: putting the biggest number on top, or an output (\"post 20 times\") instead of what people do. UNKNOWN is fine, with who finds out and by when.",
        strip: { head: "GOES ON THE CARD", text: "The top number (step 1) → WHAT WE ASK YOU TO DO." },
        carry: { title: "Already there (read-only): your ask on page 5, and your Session 5 price for the Revenue row", items: [
          { id: "s6.p5.ask", label: "ONE ASK (page 5) — step 1 counts this same action" },
          { id: "s5.p4.rows", label: "PRICES (S5 hlm. 4) — the Revenue row starts from here" }
        ] },
        layout: "groups",
        groups: [
          { appOnly: true, head: "", cols: 2, ids: ["s6.p9.target", "s6.p9.breakdown", "s6.p9.drivers", "s6.p9.signal"] },
          { head: "THEN CHECK: DOES YOUR TREE COVER ALL THREE?", cols: 1, ids: ["s6.p9.check"] }
        ],
        fields: [
          { id: "s6.p9.target", type: "parts", label: "1 · TARGET", hint: "Who · does what (your ask on page 5) · how many · by when.",
            parts: [{ k: "who", label: "Who", ph: "mis. keluarga dengan anak SD" }, { k: "does", label: "Does what (your ask on page 5)", ph: "mis. ikut pemutaran di sekolah anaknya" },
              { k: "howmany", label: "How many", ph: "mis. ±120" }, { k: "when", label: "By when", ph: "satu tanggal" }] },
          { id: "s6.p9.breakdown", type: "longtext", label: "2 · BREAK IT DOWN", hint: "Per week or per day. How many each week does the target need?" },
          { id: "s6.p9.drivers", type: "longtext", label: "3 · WHAT DRIVES IT", hint: "The one or two things that make the weekly number move." },
          { id: "s6.p9.signal", type: "longtext", label: "4 · EARLY SIGNAL", hint: "A number that moves before the result. Its baseline today, or UNKNOWN + who finds out + when." },
          { id: "s6.p9.check", type: "table", rowLabel: "CHECK", wrapCells: true,
            columns: [{ k: "where", label: "WHERE IT SITS IN YOUR TREE, OR UNKNOWN + WHO + WHEN" }],
            rows: [{ k: "conversion", label: "Conversion" }, { k: "revenue", label: "Revenue" }, { k: "brand", label: "Brand" }] }
        ]
      },

      /* ================= hlm. 10 — Launch Risk & Contingency (opsional) ================= */
      {
        p: 10, title: "Launch Risk & Contingency", skip: true, short: "page 10 (risk)",
        min: "Fill it when bets on your Session 5 page 8 are still untested. Its minimum is already in page 9 (KPI tree): every UNKNOWN has who finds out and when.",
        sub: "If something goes wrong, how you will see it coming, and what you will do.",
        footer: "Common mistake: a list of fears with no \"then\". A risk without a plan is only a worry. Start from your Session 5 bets: they do not disappear on launch day.",
        shownTop: { label: "YOUR THREE BETS · SESSION 5, PAGE 8 · SHOWN, NOT RETYPED", hint: "Shown from Session 5, page 8 (your three bets). Start here.",
          from: [{ id: "s5.p8.bets", label: "Your three bets (S5 hlm. 8)" }] },
        fields: [
          { id: "s6.p10.risks", type: "list", appOnly: true, wbColumns: true, label: "RISK: WHAT HAPPENS · EARLY-WARNING SIGN · IF X, THEN Y · OWNER",
            addText: "+ Tambah risiko", emptyText: "Belum ada risiko. Mulai dari taruhan Sesi 5 di atas.", max: 5,
            itemFields: [
              { k: "risk", label: "RISK: WHAT HAPPENS", type: "longtext", ph: "— what happens —" },
              { k: "sign", label: "EARLY-WARNING SIGN", type: "longtext", ph: "— what you would see first —" },
              { k: "ifthen", label: "IF X, THEN Y", type: "longtext", ph: "— if ___, then we ___ —" },
              { k: "owner", label: "OWNER", type: "text", ph: "— one name —" }] }
        ]
      }
    ]
  };
})();
