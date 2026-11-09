/* sessions/s5.js — SPEC Sesi 5 (struktur halaman dan ID field). Dibangun 9 Nov 2026.
 * Sumber: WORKBOOK_S5-team-workbook-v3.pptx (dibangun dari claude/84, 9 Nov 2026). Ekstrak teks = tools/extracts/S5.md.
 * Label, hint, subjudul, footer persis workbook v3. Teks app (bukan workbook) ditandai appOnly / tip / ph.
 * Keputusan yang diikuti: doc 73 §3 (perubahan S5), doc 82 (label "Filling page N", hlm. 8 baru), doc 86 (contoh empat kasus).
 *  - Hal inti: hlm. 2 (BMC, n 10), hlm. 4 (Pricing + survival line, n 11), hlm. 8 (Your Brand's Three Bets, n 12).
 *    hlm. 3, 5, 6, 7, 9 = boleh dilewati (minimumnya sudah ada di halaman inti).
 *  - "Tampilkan, jangan ketik ulang" (doc 73 §1 aturan 2): masalah S1 tampil di atas kanvas; Customer Segments dan
 *    Value Propositions menampilkan audiens S2 dan positioning + promise S3 read-only (tipe "shown"), dengan satu kotak
 *    tambahan opsional untuk segmen lain / buyer ≠ user / apa yang diterima segmen lain. Nilai tersimpan = teks tambahan saja.
 *  - hlm. 4: baris Price Competitor Matrix S2 tampil di samping (carry dengan `row: "price"`).
 *  - hlm. 8: maksimal 3 baris; baris 1 berlabel "1 · TESTED BEFORE SESSION 7"; baris yang ditandai baris nama berlabel
 *    "NAME ROW (A CHECK)". Daftar kandidat tampil di samping (dihitung dari halaman lain, tidak disimpan).
 *    Aturan lama "rank by how fast a risk would damage you" dan semua teks Gate tidak dipakai (doc 82 §3).
 * ID FIELD DIKUNCI SETELAH S5 DIRILIS: boleh menambah, tidak boleh mengganti nama/menghapus.
 */
window.CB = window.CB || {}; CB.specs = CB.specs || {};
(function () {
  var ORIGIN = [{ v: "measured", label: "MEASURED" }, { v: "comparable", label: "COMPARABLE" }, { v: "guess", label: "GUESS" }, { v: "unknown", label: "UNKNOWN" }];

  CB.specs.S5 = {
    id: "S5", n: 5,
    title: "Commercialization Blueprint",
    wbCover: "SESSION 5 TEAM WORKBOOK",
    coverNote: "Where does the money come from, and what do you own? One rule runs through every page: every number carries its origin (MEASURED, COMPARABLE, GUESS, or UNKNOWN with an action). A number with no origin can't be argued with by anyone, including you next week.",
    hideDue: true,
    coverExtra: "Core pages (2, 4, 8) are required; optional pages (3, 5, 6, 7, 9) are filled only when you need them, and their minimum is already on a core page. Row 1 of page 8 is what you test with real people before Session 7. Batas unggah diumumkan dosen di kelas dan di grup kelas.",
    importPrompt: true,
    fillOrder: [2, 3, 4, 5, 6, 7, 8, 9],
    core: {
      intro: "This session has 3 must-dos: page 2 (canvas), page 4 (pricing) and page 8 (your three bets). Other pages are optional.",
      items: [
        { n: 10, k: "i10", chain: "Business Model Canvas", label: "Page 2 (canvas)", page: 2, where: "hlm. 2" },
        { n: 11, k: "i11", chain: "Pricing + survival line", label: "Page 4 (pricing)", page: 4, where: "hlm. 4" },
        { n: 12, k: "i12", chain: "Your three bets", label: "Page 8 (your three bets)", page: 8, where: "hlm. 8" }
      ]
    },
    pages: [
      /* ================= hlm. 2 — Business Model Canvas ================= */
      {
        p: 2, title: "Business Model Canvas", short: "page 2 (canvas)",
        checks: "for everything you give customers, can you point to the money that pays for it?",
        sub: "Nine boxes read as one sentence. Two boxes are copied from Sessions 2 and 3, not rewritten.",
        footer: "If the sentence sounds strange spoken aloud, the model is wrong, not the wording. Every canvas has at least one clash; if you can't find yours, you filled the page but haven't read it yet.",
        shownTop: { label: "OUR SESSION 1 MAIN PROBLEM · SHOWN, NOT RETYPED", hint: "Shown from Session 1 (your main problem). To change it, change it there.",
          from: [{ id: "s1.p7.problem1", label: "PROBLEM 1 (S1 hlm. 7)" }] },
        layout: "bmc",
        fields: [
          { id: "s5.p2.kp", type: "longtext", label: "KEY PARTNERS", hint: "Who does what you don't: platforms, venues, suppliers, licensees.", area: "kp" },
          { id: "s5.p2.ka", type: "longtext", label: "KEY ACTIVITIES", hint: "What you must do again and again for this to work at all.", area: "ka" },
          { id: "s5.p2.kr", type: "longtext", label: "KEY RESOURCES", hint: "What you must have, including the intangible: the name, IP, access.", area: "kr" },
          { id: "s5.p2.vp", type: "shown", label: "VALUE PROPOSITIONS · S3", hint: "From your Session 3 positioning and promise, word for word. What each segment actually receives.", area: "vp",
            from: [{ id: "s3.p2.final", label: "Positioning (S3 hlm. 2)" }, { id: "s3.p5.promise_proof", item: 0, k: "promise", label: "Promise, row 1 of Promise → Proof (S3 hlm. 5)" }],
            extraLabel: "What each other segment receives (optional)", extraPh: "mis. sekolah: hari program yang relevan. Kosongkan bila hanya satu segmen." },
          { id: "s5.p2.cr", type: "longtext", label: "CUSTOMER RELATIONSHIPS", hint: "One-off or ongoing? And who keeps it going?", area: "cr" },
          { id: "s5.p2.ch", type: "longtext", label: "CHANNELS", hint: "How they find it, buy it, and receive it.", area: "ch" },
          { id: "s5.p2.cs", type: "shown", label: "CUSTOMER SEGMENTS · S2", hint: "From Session 2, word for word. If the buyer and the user differ, write both.", area: "cs",
            from: [{ id: "s2.p4.primary", label: "Primary audience (S2 hlm. 4)" }],
            extraLabel: "Buyer ≠ user, or other segments (optional)", extraPh: "mis. yang membayar orang tua, yang memakai anak. Segmen kedua: sekolah." },
          { id: "s5.p2.cost", type: "list", label: "COST STRUCTURE · MARK WHAT GROWS", hint: "Your three largest costs. Mark which ones GROW as the audience grows. Hours count.", area: "cost",
            addText: "+ Tambah biaya", emptyText: "Belum ada biaya. Tulis tiga biaya terbesar, termasuk jam kerja.",
            itemFields: [{ k: "cost", label: "Biaya", type: "text", ph: "mis. promosi · sewa · 6 jam seminggu (social lead)" },
              { k: "grows", label: "Ikut naik saat audiens bertambah?", type: "select", empty: "— tandai —", options: [{ v: "grows", label: "GROWS" }, { v: "fixed", label: "Tetap" }] }] },
          { id: "s5.p2.rev", type: "list", label: "REVENUE STREAMS · MARK ONE PRIMARY", hint: "Where money enters. More than one is fine; mark ONE as PRIMARY.", area: "rev",
            addText: "+ Tambah sumber uang", emptyText: "Belum ada sumber uang. Tulis di mana uang masuk, lalu tandai satu PRIMARY.",
            itemFields: [{ k: "stream", label: "Sumber uang", type: "text", ph: "mis. tiket · komisi per pesanan · sponsor" },
              { k: "role", label: "PRIMARY?", type: "select", empty: "— tandai —", options: [{ v: "primary", label: "PRIMARY" }, { v: "other", label: "Turunan / tambahan" }] }] },
          { id: "s5.p2.rev_unsure", type: "longtext", appOnly: true, area: "rev", label: "Belum bisa memilih PRIMARY? (tambahan app)",
            hint: "Tulis apa yang perlu kamu ketahui dulu untuk memilih. Diisi hanya kalau belum ada baris PRIMARY." },
          { id: "s5.p2.clash", type: "parts", label: "ONE CLASH IN OUR CANVAS, AND WHAT WE WILL DO", hint: "Read the canvas as one sentence first. Then write one clash and what you will do: change one box, make it conditional and later, or carry it to page 8 (your three bets).", area: "clash",
            parts: [{ k: "clash", label: "The clash: which box says what, and why both can't be true", ph: "mis. Revenue Streams: royalti merchandise · Key Partners: belum ada licensee", long: true },
              { k: "action", label: "What we will do", ph: "ubah satu kotak · jadikan bersyarat dan nanti · bawa ke page 8 (your three bets)", long: true }] },
          { id: "s5.p2.sentence", type: "longtext", label: "OUR CANVAS AS ONE SENTENCE", hint: "THIS audience gets THIS value through THIS channel, paying THIS way, at THIS cost.", area: "sent" }
        ]
      },

      /* ================= hlm. 3 — Revenue Model Comparison (opsional) ================= */
      {
        p: 3, title: "Revenue Model Comparison", skip: true, short: "page 3 (revenue models)",
        min: "Its minimum is already in page 2 (canvas), Revenue Streams: one PRIMARY, with a reason. Fill this page when you are torn between two models.",
        sub: "At least two options. The second may be the one you reject, as long as you write why.",
        footer: "\"No revenue\" is not an answer: a free project still runs on something (sponsorship, grants, institutions, or someone's unpaid hours). A single option is never really chosen; it is just the first one that came to mind.",
        layout: "grid", cols: 2,
        fields: [
          { id: "s5.p3.a", type: "parts", label: "OPTION A",
            parts: [{ k: "name", label: "Option name", ph: "mis. cinema first (chosen)" },
              { k: "how", label: "HOW IT WORKS", ph: "One sentence. How money actually enters, and in what order.", long: true },
              { k: "must", label: "WHAT MUST BE TRUE", ph: "Assumptions, not convictions. Each can become a bet on page 8 (your three bets).", long: true },
              { k: "evidence", label: "WHAT EVIDENCE WOULD SETTLE IT", ph: "Not \"we are confident\": something checkable, and who could check it.", long: true }] },
          { id: "s5.p3.b", type: "parts", label: "OPTION B",
            parts: [{ k: "name", label: "Option name", ph: "mis. streaming deal first (rejected)" },
              { k: "how", label: "HOW IT WORKS", ph: "One sentence. How money actually enters, and in what order.", long: true },
              { k: "must", label: "WHAT MUST BE TRUE", ph: "Assumptions, not convictions.", long: true },
              { k: "evidence", label: "WHAT EVIDENCE WOULD SETTLE IT", ph: "Not \"we are confident\": something checkable, and who could check it.", long: true }] },
          { id: "s5.p3.primary", type: "longtext", label: "OUR PRIMARY MODEL", hint: "\"We are primarily a ______ business, because ______.\" One model is PRIMARY; the rest follow from it. If you can't choose yet, write what you would need to know first." }
        ]
      },

      /* ================= hlm. 4 — Pricing Assumption Sheet ================= */
      {
        p: 4, title: "Pricing Assumption Sheet", short: "page 4 (pricing)",
        checks: "is your price compared with what people already pay, and does one customer bring in more than they cost you?",
        sub: "Every figure carries its origin. Separate the prices you decide from the prices someone else decides.",
        footer: "No naked numbers. A GUESS is not a failure: it makes the row a candidate for page 8 (your three bets). A sheet where every origin says MEASURED is almost always wrong.",
        carry: { title: "Already there: the Price row of your Session 2 Competitor Benchmark Matrix (read-only)", items: [
          { id: "s2.p6.matrix", row: "price", label: "PRICE ROW · COMPETITOR BENCHMARK MATRIX (S2 hlm. 6) — your reference price comes from here; no reference yet? write GUESS" },
          { id: "s3.p2.final", label: "POSITIONING (S3 hlm. 2) — the reason for ABOVE / AT / BELOW comes from here" }
        ] },
        fields: [
          { id: "s5.p4.rows", type: "list", appOnly: true, wbColumns: true, label: "WHAT IS PRICED · THE FIGURE · REFERENCE PRICE · VOLUME ASSUMED · ORIGIN",
            addText: "+ Tambah hal yang diberi harga", emptyText: "Belum ada baris. Satu baris per hal yang dibayar orang: tiket, unit, paket, slot sponsor.",
            guide: "<p>Satu baris = satu hal yang dibayar orang. Kolomnya sama dengan tabel workbook: <b>WHAT IS PRICED · THE FIGURE · REFERENCE PRICE · VOLUME ASSUMED · ORIGIN</b>. Harga yang bukan kamu yang menentukan ditulis <b>\"set by ___\"</b>. Origin ditulis terpisah untuk harga dan volume; UNKNOWN wajib punya tindakan, pemilik, dan kapan.</p>",
            itemFields: [
              { k: "item", label: "WHAT IS PRICED", type: "text", ph: "— a ticket, a unit, a package, a sponsor slot —" },
              { k: "figure", label: "THE FIGURE", type: "text", ph: "— your price, or \"set by ___\" if it isn't yours —" },
              { k: "reference", label: "REFERENCE PRICE", type: "longtext", ph: "— the price already in your audience's head (lihat baris Price S2 di atas) —" },
              { k: "volume", label: "VOLUME ASSUMED", type: "text", ph: "— how many, over what period —" },
              { appOnly: true, k: "o_price", label: "ORIGIN · price", type: "select", empty: "— origin harga —", options: ORIGIN },
              { appOnly: true, k: "o_volume", label: "ORIGIN · volume", type: "select", empty: "— origin volume —", options: ORIGIN },
              { appOnly: true, k: "o_note", label: "Origin note: name the comparable, or the action + owner + when for UNKNOWN", type: "longtext", ph: "mis. COMPARABLE: lima toko dicek · UNKNOWN: tanya distributor, PM, dalam 2 minggu" }] },
          { id: "s5.p4.line", type: "status", label: "OUR PRICE AGAINST THE REFERENCE: ABOVE / AT / BELOW, BECAUSE…",
            hint: "Our price is ABOVE / AT / BELOW the reference, because ______ (from your Session 3 positioning). Not paid with money? Write what they give instead: time, attention, an email, a recommendation.",
            options: [{ v: "above", label: "ABOVE" }, { v: "at", label: "AT" }, { v: "below", label: "BELOW" }, { v: "not_money", label: "NOT MONEY" }],
            noteLabel: "Our price is ___ the reference, because ___ (from your Session 3 positioning)",
            notePh: "mis. Our character tee is ABOVE the reference, because the character design is exclusive and our positioning promises …",
            extras: [{ k: "gives", label: "NOT MONEY: what they give instead ___", ph: "waktu, perhatian, email, rekomendasi — dan berapa nilainya bagimu (boleh GUESS)" }] },
          { id: "s5.p4.survival", type: "status", label: "THE SURVIVAL LINE · ONE CUSTOMER, ONE RECEIPT",
            hint: "Money one customer brings  −  cost to win and serve that one customer  =  ______.  Negative is normal this early; not knowing is not. If a piece is unknowable today, write which piece and why.",
            extrasFirst: true,
            extras: [{ k: "money_in", label: "Money one customer brings", ph: "harga × seberapa sering mereka membeli · tulis GUESS bila tebakan" },
              { k: "money_out", label: "Cost to win and serve that one customer", ph: "promosi, diskon, membuat, mengirim, bagian platform, jam kerja" }],
            options: [{ v: "positive", label: "POSITIVE" }, { v: "negative", label: "NEGATIVE" }, { v: "unknown", label: "UNKNOWN (which piece, and why)" }],
            noteLabel: "= the result, written out (and which pieces are GUESS or UNKNOWN)",
            notePh: "mis. Rp2.500.000 masuk, ±Rp600.000 + 8 jam keluar: positif. Merchandise: bagian licensee UNKNOWN (PM)." }
        ]
      },

      /* ================= hlm. 5 — Partnership Ecosystem Map (opsional) ================= */
      {
        p: 5, title: "Partnership Ecosystem Map", skip: true, short: "page 5 (partners)",
        min: "Its minimum is already in page 2 (canvas), Key Partners. A partner you don't have yet can be a bet on page 8 (your three bets).",
        sub: "Write every row from the partner's side. The GET column is what makes a row real.",
        footer: "If you can't finish the GET sentence, mark the row ASPIRATIONAL instead of inventing a benefit. Institutional partners (campus, schools, libraries, communities) are the most reachable and the most often forgotten.",
        fields: [
          { id: "s5.p5.partners", type: "list", appOnly: true, wbColumns: true, label: "PARTNER · WHAT THEY GIVE · WHAT THEY GET · STATUS",
            addText: "+ Tambah partner", emptyText: "Belum ada partner.",
            itemFields: [
              { k: "partner", label: "PARTNER", type: "text", ph: "— platform, venue, publisher, sponsor, community, retailer, institution —" },
              { k: "give", label: "WHAT THEY GIVE", type: "longtext", ph: "— what you receive from them —" },
              { k: "get", label: "WHAT THEY GET", type: "longtext", ph: "— finish: \"they would do this because they get ___\" —" },
              { k: "status", label: "STATUS", type: "select", empty: "— status —", options: [{ v: "contacted", label: "CONTACTED" }, { v: "identified", label: "IDENTIFIED" }, { v: "aspirational", label: "ASPIRATIONAL" }] }] },
          { id: "s5.p5.next", type: "longtext", label: "AT LEAST ONE ROW CONTACTED OR IDENTIFIED", hint: "And name one partner you could realistically contact within the next two weeks. That row is worth more than every famous name on the page." }
        ]
      },

      /* ================= hlm. 6 — Distribution Channel Matrix (opsional) ================= */
      {
        p: 6, title: "Distribution Channel Matrix", skip: true, short: "page 6 (channels)",
        min: "Its minimum is already in page 2 (canvas), Channels. A \"free\" channel costs hours: put them in Cost Structure.",
        sub: "Page 5 was WHO. This page is THROUGH WHAT. The same company can appear on both, in different roles.",
        footer: "A channel with no invoice is not a free channel: free in rupiah, but how many hours a week, and whose? An empty cost cell means the cost hasn't been found yet, not that it is zero.",
        fields: [
          { id: "s5.p6.channels", type: "list", appOnly: true, wbColumns: true, label: "CHANNEL · REACH · COST · CONTROL",
            addText: "+ Tambah kanal", emptyText: "Belum ada kanal. Tulis empat sampai enam.", max: 6,
            itemFields: [
              { k: "channel", label: "CHANNEL", type: "text", ph: "— four to six rows —" },
              { k: "reach", label: "REACH", type: "text", ph: "— a rough number is fine; a number is required —" },
              { k: "cost", label: "COST: RUPIAH, PERCENT, OR HOURS", type: "longtext", ph: "— rupiah, percent, or hours with a person's name —" },
              { k: "control", label: "CONTROL", type: "select", empty: "— control —", options: [{ v: "high", label: "HIGH" }, { v: "medium", label: "MEDIUM" }, { v: "low", label: "LOW" }, { v: "none", label: "NONE" }] }] },
          { id: "s5.p6.finding", type: "longtext", label: "AT LEAST ONE HIGH-CONTROL CHANNEL; IF YOU HAVE NONE, THAT IS A FINDING", hint: "Usually an owned channel: an account, a community, a mailing list, a site. No HIGH row? Write it here; it can become a bet on page 8 (your three bets)." }
        ]
      },

      /* ================= hlm. 7 — IP Asset Inventory (opsional) ================= */
      {
        p: 7, title: "IP Asset Inventory", skip: true, short: "page 7 (IP)",
        min: "Its minimum is already in page 8 (your three bets): at least one row on the name and key asset.",
        sub: "Everything you MADE and everything you BORROWED. Write NOT YET AGREED rather than inventing an owner.",
        footer: "An AI-generated asset is UNKNOWN until you have checked its terms, not a guess. This is an introduction so you know when to ask a professional; it is not legal advice.",
        fields: [
          { id: "s5.p7.assets", type: "list", appOnly: true, wbColumns: true, label: "ASSET · CREATOR · OWNER · LICENCE STATUS · RISK",
            addText: "+ Tambah aset", emptyText: "Belum ada aset.",
            itemFields: [
              { k: "asset", label: "ASSET", type: "text", ph: "— design, script, score, title, logo, font, stock, AI-generated —" },
              { k: "creator", label: "CREATOR", type: "text", ph: "— who actually made it —" },
              { k: "owner", label: "OWNER", type: "text", ph: "— or NOT YET AGREED —" },
              { k: "licence", label: "LICENCE STATUS", type: "longtext", ph: "— owned / licensed, and the limits —" },
              { k: "risk", label: "RISK: WHAT BREAKS", type: "text", ph: "— what breaks if this is wrong —" }] },
          { id: "s5.p7.money", type: "longtext", label: "WHICH LINE OF MONEY DEPENDS ON OWNING SOMETHING YOU DON'T YET OWN?", hint: "Licensing and merchandising both do. Whatever you write here belongs in your name row on page 8 (your three bets). Every NOT YET AGREED row leaves with one action and one name." }
        ]
      },

      /* ================= hlm. 8 — Your Brand's Three Bets ================= */
      {
        p: 8, title: "Your Brand's Three Bets", kicker: "COMMERCIAL RISK REGISTER", short: "page 8 (your three bets)",
        checks: "what must be true for your brand to survive, and how will you find out before it's too late?",
        sub: "Three rows at most. Almost nothing here is new: you marked it on the pages before.",
        footer: "Row 1 is the bet you test with real people before Session 7. A name row is a check, not a test: one person, one date. The rows are not ranked.",
        candidates: { head: "CANDIDATES", text: "WHERE ROWS COME FROM · today: a GUESS on page 4 (pricing), a negative or unknown survival line, the clash on page 2 (canvas). Earlier: an S3 promise still UNKNOWN or PLANNED, an S4 code with no owner, your project's name. If you filled pages 5–7: an ASPIRATIONAL partner, an hours-only channel, a NOT YET AGREED asset." },
        fields: [
          { id: "s5.p8.bets", type: "list", appOnly: true, wbColumns: true, label: "ROW · KIND · WE BET THAT… IF WE'RE WRONG… · HOW WE TEST OR CHECK IT · WHO / WHEN",
            tip: "At least one row is about WHO OWNS your project's name and key asset. It is a check, not a test: one person, one date.",
            addText: "+ Tambah taruhan", emptyText: "Belum ada taruhan. Baris 1 = taruhan yang kamu uji ke orang sungguhan sebelum Sesi 7.", max: 3,
            rowTags: ["1 · TESTED BEFORE SESSION 7", "2", "3"], flagTag: { k: "namerow", eq: "yes", text: "NAME ROW (A CHECK)" },
            itemFields: [
              { k: "kind", label: "KIND", type: "select", empty: "— desirability / viability / feasibility / legal —", options: [{ v: "desirability", label: "Desirability · will people want it?" }, { v: "viability", label: "Viability · does the money work?" }, { v: "feasibility", label: "Feasibility · can we make and deliver it?" }, { v: "legal", label: "Legal · are we allowed to?" }] },
              { k: "bet", label: "WE BET THAT…", type: "longtext", ph: "We bet that ___." },
              { k: "wrong", label: "IF WE'RE WRONG…", type: "longtext", ph: "If we're wrong, ___. The consequence, not just a name." },
              { k: "test", label: "HOW WE TEST OR CHECK IT", type: "longtext", ph: "— one concrete action with real people in the next two weeks —" },
              { k: "who", label: "WHO", type: "text", ph: "one person's name" },
              { k: "when", label: "WHEN", type: "text", ph: "one date or milestone, mis. before Session 7 · within 2 weeks" },
              { appOnly: true, k: "namerow", label: "Name row? (who owns the name and key asset)", type: "select", empty: "— no —", options: [{ v: "yes", label: "Yes: this is our name row (a check)" }] }] }
        ]
      },

      /* ================= hlm. 9 — Roadmap (opsional) ================= */
      {
        p: 9, title: "Roadmap", skip: true, short: "page 9 (roadmap)",
        min: "Its minimum is already in page 8 (your three bets), row 1: what you test first.",
        sub: "Three milestones. Milestone 1 tests row 1 from page 8 (your three bets).",
        footer: "A roadmap is an order of testing, not an order of building. If milestone 1 is production or promotion, you are building on a guess nobody has checked.",
        layout: "grid", cols: 3,
        fields: [
          { id: "s5.p9.m1", type: "parts", label: "MILESTONE 1 · months 0 to ___", hint: "This milestone TESTS row 1 from page 8 (your three bets). Not production. Not promotion. What will you know at the end that you don't know now?",
            parts: [{ k: "months", label: "Months 0 to", ph: "mis. 2" }, { k: "plan", label: "What we do", ph: "", long: true }] },
          { id: "s5.p9.m2", type: "parts", label: "MILESTONE 2 · months ___ to ___", hint: "What only becomes possible once milestone 1 has an answer, and what you will do differently if the answer is the bad one.",
            parts: [{ k: "months", label: "Months", ph: "mis. 2 to 4" }, { k: "plan", label: "What we do", ph: "", long: true }] },
          { id: "s5.p9.m3", type: "parts", label: "MILESTONE 3 · months ___ to 12", hint: "What you do from a position of evidence rather than hope. Name the evidence you expect to be holding by then.",
            parts: [{ k: "months", label: "Months … to 12", ph: "mis. 4" }, { k: "plan", label: "What we do", ph: "", long: true }] }
        ]
      }
    ]
  };
})();
