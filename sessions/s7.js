/* sessions/s7.js — SPEC Sesi 7 (struktur halaman dan ID field). Dibangun 25–26 Nov 2026.
 * Sumber: WORKBOOK_S7-team-workbook-v3.4.pptx (25 Nov 2026). Ekstrak teks = tools/extracts/S7.md.
 * Label, hint, subjudul, footer, bar "What this page answers" / "Optional. …", strip persis workbook v3.4.
 * Keputusan yang diikuti: PROJECT-CONTEXT v50 blok 0000000000000 dan 000000000000, butir 107, 112–114; keputusan Fai
 * 25 Nov 22.25 di chat HTML S7 (spesifikasi field disetujui):
 *  - Hal inti: hlm. 2 (test plan, n 16), hlm. 4 (revision log, n 17), hlm. 5 (governance, n 18), hlm. 9 (pitch view, n 19).
 *    hlm. 3, 6, 7, 8 = opsional, tetap dengan field sesuai workbook v3.4.
 *  - hlm. 2: THE BET WE TEST + CATEGORY (S5 hlm. 8 baris 1) dan FOR WHOM (S2 hlm. 4) TAMPIL, tidak diketik (konvensi 42).
 *    WHAT WE ASK THEM TO DO = status DO/PAY + catatan. OUR PREDICTION = teks bebas dengan contoh "___ of ___ will ___".
 *  - hlm. 9: delapan field status (✓ / ✗ + IF ✗: WHERE WE FIXED IT) + satu kotak WHAT WE COULDN'T FIX YET.
 *    Kolom YOUR PITCH VIEW SAYS dirakit dari halaman asal (core/pitch.js, `pv`), tidak menyimpan apa pun.
 *  - Concept Card sembilan baris (baris 9 = taruhan, khusus tim) sesudah hlm. 9: spec.conceptCard.bet.
 * ID FIELD DIKUNCI SETELAH S7 DIRILIS: boleh menambah, tidak boleh mengganti nama/menghapus/mengganti tipe.
 */
window.CB = window.CB || {}; CB.specs = CB.specs || {};
(function () {
  var REAL = { id: "s3.p5.promise_proof", filter: { k: "status", eq: "nyata" }, k: "promise", k2: "proof", countOthers: true,
    label: "REAL rows of Promise → Proof (S3 hlm. 5)" };
  var MARK = [{ v: "ok", label: "✓" }, { v: "no", label: "✗" }];
  /* askRefs (tampilan saja, 26 Nov, permintaan Fai): pernyataan yang dirujuk pertanyaan ASK YOURSELF dan belum tampil di
   * kolom kiri langkah itu, dikutip di bawah pertanyaannya. Tidak menyimpan apa pun. */
  function step(n, label, ask, pv, refs) {
    return { id: "s7.p9.step" + n, type: "status", label: label, hint: ask, options: MARK,
      noteLabel: "IF ✗: WHERE WE FIXED IT", notePh: "— if ✗: session · page —", pv: pv, askRefs: refs || [] };
  }

  CB.specs.S7 = {
    id: "S7", n: 7,
    title: "Testing and Brand Governance Plan",
    wbCover: "SESSION 7 TEAM WORKBOOK",
    coverNote: "Is any of it actually true, and who keeps it true after this course? Four core pages: one test plan (page 2), one revision log (page 4), one governance matrix (page 5), and your pitch view, the final check (page 9), checked step by step. The other four pages are optional; their minimum is already on a core page.",
    hideDue: true,
    coverExtra: "Page 2 tests the bet behind your card. Every change you make because of evidence becomes a row on page 4. Page 5 names who keeps the brand the same after this course. Page 9 is your final task: your whole story as a pitch view, checked step by step. Your Concept Card, now with a ninth row for the team only, is shown after page 9. Batas pengumpulan diumumkan dosen di kelas dan di grup kelas.",
    importPrompt: true,
    fillOrder: [2, 3, 4, 5, 6, 7, 8, 9],
    conceptCard: { after: 9, bet: true },
    core: {
      intro: "This session has 4 must-dos: page 2 (test plan), page 4 (revision log), page 5 (governance) and page 9 (pitch view), your final task. Other pages are optional.",
      items: [
        { n: 16, k: "i16", chain: "Test plan", label: "Page 2 (test plan)", page: 2, where: "hlm. 2" },
        { n: 17, k: "i17", chain: "Revision Log", label: "Page 4 (revision log)", page: 4, where: "hlm. 4" },
        { n: 18, k: "i18", chain: "Governance", label: "Page 5 (governance)", page: 5, where: "hlm. 5" },
        { n: 19, k: "i19", chain: "Pitch view", label: "Page 9 (pitch view)", page: 9, where: "hlm. 9" }
      ]
    },
    pages: [
      /* ================= hlm. 2 — Experiment Report Card (inti) ================= */
      {
        p: 2, title: "Experiment Report Card", short: "page 2 (test plan)",
        answers: "how you will find out whether your card and its bet are true, with the number written before you look.",
        sub: "Two boxes shown from your pages, three you write, one optional. The number is written before the test, never after.",
        footer: "Common mistake: asking people whether they like it. That is SAY, and it tells you they are polite. Ask them to do something. Asking classmates and calling it evidence: a class test is practice; your classmates are not your FOR WHOM.",
        strip: { head: "CARD · ROW 9", text: "Row 9 of your card, WHAT WE'RE BETTING ON, is the bet on this page. It is for the team: don't show it to the person you test." },
        layout: "groups",
        groups: [
          { appOnly: true, head: "", cols: 2, ids: ["s7.p2.bet", "s7.p2.forwhom"] },
          { appOnly: true, head: "", cols: 1, ids: ["s7.p2.who", "s7.p2.action", "s7.p2.prediction", "s7.p2.result"] }
        ],
        fields: [
          { id: "s7.p2.bet", type: "shown", label: "THE BET WE TEST + CATEGORY · SESSION 5, PAGE 8, ROW 1 · SHOWN, NOT RETYPED",
            hint: "Shown from Session 5, page 8 (your three bets), row 1, with its category. To change them, change them there.",
            from: [{ id: "s5.p8.bets", item: 0, k: "bet", label: "Row 1 · WE BET THAT… (S5 hlm. 8)" }, { id: "s5.p8.bets", item: 0, k: "kind", opt: true, label: "Category (S5 hlm. 8, KIND)" }] },
          { id: "s7.p2.forwhom", type: "shown", label: "FOR WHOM · SESSION 2, PAGE 4 · SHOWN, NOT RETYPED",
            hint: "Shown from Session 2, page 4: the FOR WHOM row of your card.",
            from: [{ id: "s2.p4.primary", label: "Primary audience (S2 hlm. 4)" }] },
          { id: "s7.p2.who", type: "longtext", label: "WHO WE ASK", hint: "— people who match FOR WHOM. Not your team, not your friends. How many? —" },
          { id: "s7.p2.action", type: "status", label: "WHAT WE ASK THEM TO DO · DO OR PAY",
            hint: "— one action on the DO or PAY rung. Usually your WHAT WE ASK YOU TO DO row; if that cannot prove the bet wrong, choose one that can, and write the gap here —",
            options: [{ v: "do", label: "DO" }, { v: "pay", label: "PAY" }],
            noteLabel: "The action (and the gap, if it is not your card's WHAT WE ASK YOU TO DO)", notePh: "mis. bayar deposit Rp50.000 yang tidak dikembalikan (PAY). Kartu meminta pemutaran gratis (DO), yang tidak bisa membuktikan taruhan ini salah." },
          { id: "s7.p2.prediction", type: "longtext", label: "OUR PREDICTION · BEFORE THE TEST", hint: "— \"___ of ___ will ___.\" Written before the test —",
            tip: "Example: \"12 of 40 parents will pay a Rp50,000 deposit.\" Write the number before you ask anyone, never after." },
          { id: "s7.p2.result", type: "longtext", label: "RESULT (OPTIONAL)", hint: "— optional. \"Not tested yet\" is a valid answer. A class result is labelled practice —" }
        ]
      },

      /* ================= hlm. 3 — Evidence Strength Matrix (opsional) ================= */
      {
        p: 3, title: "Evidence Strength Matrix", skip: true, short: "page 3 (evidence)",
        min: "Fill it when you have more than one finding. Its minimum is already in page 4 (revision log), the STRONG / WEAK column. Not required and not scored on its own. If you fill it, feedback reads it, and your defence may ask about it.",
        sub: "Every finding on one ladder, with who and how many, and what it does not prove.",
        footer: "Common mistake: a finding without \"how many out of how many\". A sheet where every row is strong is almost always wrong; a sheet where every row is weak is a finding about your evidence.",
        strip: { head: "STRONG FINDING OR WEAK SIGNAL", text: "Strong: people did or paid something, they are outside your team, and the pattern showed up more than once. Weak: only words, one source, friends, or a class practice test." },
        fields: [
          { id: "s7.p3.rows", type: "list", wbColumns: true, label: "Evidence Strength Matrix",
            addText: "+ Tambah temuan", emptyText: "Belum ada temuan. Satu baris per temuan: uji kelas, umpan balik mingguan, atau uji sendiri.",
            itemFields: [
              { k: "finding", label: "FINDING", type: "longtext", ph: "— what you saw or heard —" },
              { k: "rung", label: "RUNG", type: "select", empty: "— SAY / DO / PAY —", options: [{ v: "say", label: "SAY" }, { v: "do", label: "DO" }, { v: "pay", label: "PAY" }] },
              { k: "who", label: "WHO, HOW MANY", type: "text", ph: "— who · how many out of how many —" },
              { k: "strength", label: "STRONG / WEAK", type: "select", empty: "— STRONG / WEAK —", options: [{ v: "strong", label: "STRONG" }, { v: "weak", label: "WEAK" }, { v: "notyet", label: "NOT YET (not tested yet)" }] },
              { k: "notprove", label: "WHAT IT DOES NOT PROVE", type: "longtext", ph: "— what it does not prove —" }] }
        ]
      },

      /* ================= hlm. 4 — Strategy Revision Log (inti) ================= */
      {
        p: 4, title: "Strategy Revision Log", short: "page 4 (revision log)",
        answers: "what you changed because of evidence, and how strong that evidence is.",
        sub: "One row per change. No evidence, no row.",
        footer: "Common mistake: a row with no evidence, or evidence that is really a preference. Changing the positioning because of one comment. Zero rows: if nothing changed, either nothing was tested or nothing was heard. A fix found by the page 9 check, or your own reasoning, is WEAK; a big change with no strong finding goes in the page 9 box.",
        fields: [
          { id: "s7.p4.rows", type: "list", wbColumns: true, label: "Strategy Revision Log",
            addText: "+ Tambah baris perubahan", emptyText: "Belum ada baris. Satu baris per perubahan, masing-masing dengan buktinya dan STRONG atau WEAK.",
            itemFields: [
              { k: "line", label: "LINE · WHERE IT LIVES", type: "text", ph: "— the line, and the page it lives on —" },
              { k: "before", label: "BEFORE", type: "longtext", ph: "— the old line —" },
              { k: "after", label: "AFTER", type: "longtext", ph: "— the new line —" },
              { k: "evidence", label: "EVIDENCE", type: "longtext", ph: "— what made you change it: class test, weekly feedback, other teams' cards, your own test, or the page 9 check (always WEAK) —" },
              { k: "strength", label: "STRONG / WEAK", type: "select", empty: "— STRONG / WEAK —", options: [{ v: "strong", label: "STRONG" }, { v: "weak", label: "WEAK" }] }] }
        ]
      },

      /* ================= hlm. 5 — Brand Governance Matrix (inti) ================= */
      {
        p: 5, title: "Brand Governance Matrix", short: "page 5 (governance)",
        answers: "who keeps the brand the same after this course ends.",
        sub: "Three rows. One decision, one name.",
        footer: "Common mistake: \"the team\" in any row. An owner here who is not the owner on Session 4 page 6. Row 3 left empty on a solo project.",
        strip: { head: "THE LINE (§15)", text: "Strategy is yours; creative execution belongs to the creative stream, and each must ask the other. Row 3 still needs a name if you work alone." },
        shownTop: { label: "OWNER OF EACH CODE · SESSION 4, PAGE 6 · SHOWN, NOT RETYPED", hint: "Owners are shown from Session 4, page 6. To change an owner, change it there.",
          from: [{ id: "s4.p6.owners", label: "Owner of each code (S4 hlm. 6)" }] },
        fields: [
          { id: "s7.p5.decides", type: "text", label: "1 · WHO DECIDES IF THE MAIN MESSAGE CHANGES", hint: "— one name —" },
          { id: "s7.p5.master", type: "longtext", label: "2 · WHERE THE MASTER FILE OF YOUR BRAND CODES LIVES, AND WHICH VERSION COUNTS", hint: "— one place, one version rule. Owners are shown from Session 4, page 6 —" },
          { id: "s7.p5.ask_before", type: "text", label: "3 · WHO MUST BE ASKED BEFORE A CREATIVE ASSET CHANGES", hint: "— one name. Required if you work alone: a lecturer, a classmate from a creative stream, or a future collaborator —" },
          { id: "s7.p5.never", type: "longtext", label: "NEVER CHANGES WITHOUT THE OWNER (OPTIONAL)", hint: "— positioning, main message, core brand codes… —" },
          { id: "s7.p5.adapt", type: "longtext", label: "MAY ADAPT (OPTIONAL)", hint: "— formats, tone per platform, seasonal material… —" }
        ]
      },

      /* ================= hlm. 6 — Decision-Rights Matrix (opsional) ================= */
      {
        p: 6, title: "Decision-Rights Matrix", skip: true, short: "page 6 (decision rights)",
        min: "Fill it when more than two people make brand decisions. Its minimum is already in page 5 (governance), rows 1 and 3. Not required and not scored on its own. If you fill it, feedback reads it, and your defence may ask about it.",
        sub: "For each kind of decision: who decides, who is consulted, who does the work, who is told.",
        footer: "Common mistake: the PM in the DECIDES column of every row. Creative calls sit with the creative stream; the PM is consulted (§15).",
        fields: [
          { id: "s7.p6.matrix", type: "table", label: "Decision-Rights Matrix", rowLabel: "DECISION", wrapCells: true, allowExtraRows: true, extraPh: "— another kind of decision —",
            columns: [{ k: "decides", label: "DECIDES" }, { k: "consulted", label: "CONSULTED BEFORE" }, { k: "does", label: "DOES THE WORK" }, { k: "told", label: "TOLD AFTER" }],
            rows: [{ k: "message", label: "Main message changes" }, { k: "asset", label: "A creative asset changes" }, { k: "price", label: "Price changes" }] }
        ]
      },

      /* ================= hlm. 7 — Brand Risk Register (opsional) ================= */
      {
        p: 7, title: "Brand Risk Register", skip: true, short: "page 7 (risk register)",
        min: "Fill it when a partner, a promise or an asset could embarrass the brand in public. Its minimum is already in page 5 (governance), row 1: who decides. Not required and not scored on its own. If you fill it, feedback reads it, and your defence may ask about it.",
        sub: "Risks to trust, not to the schedule. Each with a first response and one spokesperson.",
        footer: "Common mistake: a schedule risk on this page (those stay on Session 6 page 10). If no promise breaks, it is not a reputation risk. \"We will clarify\" is not a first response.",
        shownTop: { label: "YOUR PROMISE → PROOF · SESSION 3 · SHOWN, NOT RETYPED", hint: "Each risk here breaks one of these promises. A risk that breaks none is not a reputation risk.",
          from: [{ id: "s3.p5.promise_proof", label: "Promise → Proof (S3 hlm. 5)" }] },
        fields: [
          { id: "s7.p7.risks", type: "list", wbColumns: true, label: "Brand Risk Register",
            addText: "+ Tambah risiko", emptyText: "Belum ada risiko. Mulai dari janji Sesi 3 di atas: apa yang bisa mematahkannya di depan publik?",
            itemFields: [
              { k: "risk", label: "RISK", type: "longtext", ph: "— what could embarrass the brand in public —" },
              { k: "promise", label: "PROMISE IT BREAKS", type: "text", ph: "— which Session 3 promise —" },
              { k: "sign", label: "FIRST SIGN", type: "longtext", ph: "— what you would see first —" },
              { k: "first24", label: "FIRST 24 HOURS", type: "longtext", ph: "— what, where, by when —" },
              { k: "decides", label: "DECIDES", type: "text", ph: "— one name —" },
              { k: "spokesperson", label: "SPOKESPERSON", type: "text", ph: "— one name —" }] }
        ]
      },

      /* ================= hlm. 8 — KPI Dashboard (opsional) ================= */
      {
        p: 8, title: "KPI Dashboard", skip: true, short: "page 8 (KPI dashboard)",
        min: "Fill it when you will keep measuring after launch. Its minimum is already in Session 6, page 9 (KPI tree). Not required and not scored on its own. If you fill it, feedback reads it, and your defence may ask about it.",
        sub: "Your Session 6 KPI tree, measured more than once: method, frequency, owner.",
        footer: "Common mistake: \"periodically\" as a frequency, \"the team\" as an owner. A new number may only replace a baseline that counts the same thing: a sign-up is not a sale.",
        strip: { head: "BRAND INDICATORS", text: "Recognition: people know you when shown. Recall: they name you without help, the harder test. Association: the words that come to mind — strong, favourable, and yours alone?" },
        shownTop: { label: "YOUR KPI TREE · SESSION 6, PAGE 9 · SHOWN, NOT RETYPED", hint: "Target, break-down, what drives it, early signal; plus Conversion, Revenue and Brand. Each row below is one of them.",
          from: [{ id: "s6.p9.target", label: "1 · TARGET (S6 hlm. 9)" }, { id: "s6.p9.signal", label: "4 · EARLY SIGNAL (S6 hlm. 9)" }, { id: "s6.p9.check", label: "Conversion · Revenue · Brand (S6 hlm. 9)" }] },
        fields: [
          { id: "s7.p8.dash", type: "table", label: "KPI Dashboard", rowLabel: "INDICATOR", wrapCells: true,
            columns: [{ k: "baseline", label: "BASELINE" }, { k: "target", label: "TARGET" }, { k: "method", label: "METHOD" }, { k: "source", label: "SOURCE" }, { k: "frequency", label: "FREQUENCY" }, { k: "owner", label: "OWNER" }],
            rows: [{ k: "target", label: "Target (Session 6, step 1)" }, { k: "signal", label: "Early signal (step 4)" }, { k: "revenue", label: "Revenue" }, { k: "brand", label: "Brand: recognition, recall or association" }] }
        ]
      },

      /* ================= hlm. 9 — Your pitch view: the final check (inti, tugas akhir) ================= */
      {
        p: 9, title: "Your pitch view: the final check", short: "pitch view",
        answers: "does your whole story hold together, from the problem to the ask? Your pitch view, checked step by step.",
        sub: "Your final task. Your pitch view on one page: ✓ or ✗ at each step. Fix each ✗ at the page it comes from.",
        footer: "In the tool, the pitch-view column fills itself from your pages: you don't type it. Your three defence questions come from your own pages, Sessions 1–7; one asks about this chain.",
        strip: { head: "1. Read your pitch view step by step.", text: "2. ✓ or ✗ at each step.  3. A ✗: fix it at the page named, then log it on page 4." },
        layout: "pitch",
        fields: [
          step(1, "1 · The problem → Session 1", "Is your problem still a problem for the people in step 2?",
            [{ id: "s1.p7.problem1", label: "Problem 1 (S1 hlm. 7)" }],
            [{ id: "s2.p4.primary", label: "\"the people in step 2\" · primary audience (S2 hlm. 4)" }]),
          step(2, "2 · Who, and how we know → Session 2", "Is your card's FOR WHOM your primary audience from Session 2, with an insight behind it?",
            [{ id: "s2.p4.primary", label: "Primary audience (S2 hlm. 4)" }, { id: "s2.p5.insight", label: "Insight sentence (S2 hlm. 5)" }],
            [{ calc: "card", row: "forwhom", id: "s2.p4.primary", label: "\"your card's FOR WHOM\" · Concept Card (built from S2 hlm. 4)" }]),
          step(3, "3 · Why us → Session 3", "Does every promise in your positioning have a REAL proof?",
            [{ id: "s3.p2.final", label: "Positioning (S3 hlm. 2)" }, REAL]),
          step(4, "4 · The money story → Session 5", "Is the price on your card your Session 5 price, and above your survival line?",
            [{ id: "s5.p2.rev", filter: { k: "role", eq: "primary" }, k: "stream", label: "PRIMARY revenue (S5 hlm. 2)" }, { id: "s5.p4.rows", label: "Price (S5 hlm. 4)" }, { id: "s5.p4.survival", label: "Survival line (S5 hlm. 4)" }],
            [{ calc: "card", row: "price", id: "s5.p4.rows", label: "\"the price on your card\" · Concept Card PRICE (built from S5 hlm. 4)" }]),
          step(5, "5 · The road to the audience → Session 6", "Is the ask in your message the same action as the top of your KPI tree?",
            [{ id: "s6.p4.journey", row: "access", label: "Access step (S6 hlm. 4)" }, { id: "s6.p5.main", label: "Main message (S6 hlm. 5)" }, { id: "s6.p5.ask", label: "One ask (S6 hlm. 5)" }, { id: "s6.p9.target", label: "Top of the KPI tree (S6 hlm. 9, step 1)" }]),
          step(6, "6 · What we tested and changed → Session 7", "Is there a test plan with a number written before the test, and at least one page-4 row whose evidence comes from people (class test, feedback, your own test), not only from this check?",
            [{ id: "s7.p2.prediction", label: "Our prediction (page 2)" }, { id: "s7.p2.result", label: "Result (page 2)" }, { calc: "p4rows", id: "s7.p4.rows", label: "Revision log (page 4)" }]),
          step(7, "7 · The ask and what's next → Sessions 5 and 7", "Is your open bet written down, with one name who decides?",
            [{ calc: "ask", id: "s6.p9.target", label: "The ask on your card (S6 hlm. 9, step 1)" }, { id: "s5.p8.bets", item: 0, k: "bet", label: "Open bet: row 1 (S5 hlm. 8)" }, { id: "s7.p5.decides", label: "Who decides (page 5, row 1)" }]),
          step(8, "8 · Brand identity (not in the pitch view) → Session 4", "Do your name and brand codes still promise what your positioning promises?",
            [{ calc: "name", id: "s4.p2.product", label: "Name (S4 hlm. 2, or your project name)" }, { id: "s4.p6.have", label: "Brand codes you have (S4 hlm. 6)" }],
            [{ id: "s3.p2.final", label: "\"what your positioning promises\" · positioning (S3 hlm. 2)" }]),
          { id: "s7.p9.cant", type: "longtext", label: "WHAT WE COULDN'T FIX YET", hint: "— only the steps still ✗: which step, why, and what you will do, by when. A big change with no strong finding goes here —" }
        ]
      }
    ]
  };
})();
