/* sessions/s2.js — SPEC Sesi 2 (struktur halaman dan ID field).
 * Sumber: WORKBOOK_S2-team-workbook-v2.pptx (ekstrak python-pptx, 16 Okt 2026).
 * Label dan instruksi disalin persis dari workbook. Tanggal tercetak diganti placeholder
 * ({{interviews_due}}; kontrak v3.2 butir 8).
 * Tambahan app yang bukan kotak workbook ditandai appOnly (diputuskan Fai 16 Okt):
 *   s2.p9.interviews (catatan wawancara), s2.p9.q_extra (pertanyaan ke-7–8).
 * ID FIELD DIKUNCI SETELAH S2 DIRILIS: boleh menambah, tidak boleh mengganti nama/menghapus.
 */
window.CB = window.CB || {}; CB.specs = CB.specs || {};
(function () {
  var EVIDENCE_TYPES = ["Audience interviews", "Surveys", "Observation", "Competitor or comparable-product analysis", "Social media or platform analytics", "Prototype testing", "Landing-page or concept testing", "Pricing-response testing", "Distribution-partner interviews", "Secondary market data", "Sales or pre-order evidence", "Community feedback", "Expert review"];
  CB.EVIDENCE_TYPES = EVIDENCE_TYPES;
  CB.specs.S2 = {
    id: "S2", n: 2,
    title: "Audience & Market Evidence Pack",
    wbCover: "SESSION 2 TEAM WORKBOOK",
    coverNote: "Fill this together as a team, outside class. Customer side before product side. Past behaviour beats stated intention. A guess in italics is not a fact.",
    coverExtra: "Lima wawancara boleh menyusul sampai <b>{{interviews_due}}</b> (ikut file Minggu 2).",
    fillOrder: [2, 3, 4, 5, 6, 7, 8, 9],
    pages: [
      {
        p: 2, title: "Evidence Review", layout: "grid", cols: 3,
        sub: "Sort what you gathered since Session 1. Be brutal — most first drafts are mostly guesses.",
        footer: "Each claim goes into exactly ONE column — not the same claim walked across all three. A claim with no named source and no number is never a FACT, however confidently it was said out loud. An empty FACT column is honest: write 0 as a fact, e.g. “0 interviews so far.”",
        fields: [
          { id: "s2.p2.fact", type: "list", label: "FACT", hint: "Source + number, always. Something you observed or someone told you directly. Write it as “9 of 14 people said X”, not as a conclusion about why.",
            addText: "+ Tambah fakta",
            itemFields: [
              { k: "text", label: "Klaim", type: "text", ph: "mis. 0 interviews so far" },
              { k: "source", label: "Sumber", type: "text", ph: "siapa / di mana" },
              { k: "number", label: "Angka", type: "text", ph: "mis. 9 of 14" },
              { k: "kind", label: "Jenis bukti (silabus §7)", type: "select", options: EVIDENCE_TYPES }
            ] },
          { id: "s2.p2.interpretation", type: "list", label: "INTERPRETATION", hint: "Your reasonable reading of a fact — still needs testing.", addText: "+ Tambah interpretasi",
            itemFields: [{ k: "text", label: "", type: "longtext" }] },
          { id: "s2.p2.guess", type: "list", label: "GUESS", hint: "What you assume or hope is true, with no evidence yet.", addText: "+ Tambah tebakan",
            itemFields: [{ k: "text", label: "", type: "longtext" }] }
        ]
      },
      {
        p: 3, title: "Segmentation Matrix",
        sub: "2–4 candidate segments — real groups that would change your decisions.",
        footer: "A segment is only real if it would change what you design. If not — delete the column.",
        fields: [
          { id: "s2.p3.category", type: "parts", label: "FIRST, NAME THE CATEGORY YOU ARE COMPETING IN", hint: "(decide this before the segments — it sets who counts as a competitor on page 6)",
            parts: [{ k: "compete_in", label: "We compete in", ph: "kategori yang dipilih audiens saat memutuskan" }, { k: "because", label: "because", ph: "alasannya" }],
            previewTpl: "We compete in {compete_in}, because {because}." },
          { id: "s2.p3.segments", type: "segments", min: 2, max: 4,
            rows: [
              { k: "name", label: "SEGMENT NAME" }, { k: "who", label: "WHO THEY ARE" }, { k: "want", label: "WHAT THEY WANT" },
              { k: "where", label: "WHERE THEY ARE" }, { k: "pay", label: "DO THEY PAY?" }, { k: "evidence", label: "EVIDENCE WE HAVE" }
            ] }
        ]
      },
      {
        p: 4, title: "Audience Priority Score",
        sub: "Score each segment 1–5. Highest total = your primary audience candidate.",
        footer: "Add each row up before you name the primary. The total decides which segment you design for — not which one the team likes talking about.",
        fields: [
          { id: "s2.p4.scores", type: "segscore", from: "s2.p3.segments", rowLabel: "SEGMENT",
            criteria: [{ k: "attractive", label: "ATTRACTIVE" }, { k: "accessible", label: "ACCESSIBLE" }, { k: "strategic_fit", label: "STRATEGIC FIT" }, { k: "revenue_potential", label: "REVENUE POTENTIAL" }] },
          { id: "s2.p4.primary", type: "longtext", label: "PRIMARY AUDIENCE (highest total):", hint: "— write it here —", output: true },
          { id: "s2.p4.secondary", type: "longtext", label: "SECONDARY AUDIENCE (runner-up, to activate later):", hint: "— write it here. If two segments tie, write the reason you broke the tie —" }
        ]
      },
      {
        p: 5, title: "Value Proposition Canvas", layout: "canvas2",
        sub: "Customer side FIRST, from evidence. Product side second — only after.",
        footer: "Every item on the right must point at a named item on the left. If it doesn't — it's a feature you like, not value.",
        columns: [
          { head: "CUSTOMER", ids: ["s2.p5.jobs", "s2.p5.pains", "s2.p5.gains"] },
          { head: "PRODUCT", ids: ["s2.p5.products_services", "s2.p5.pain_relievers", "s2.p5.gain_creators"] }
        ],
        fields: [
          { id: "s2.p5.jobs", type: "longtext", label: "CUSTOMER · JOBS", hint: "What are they trying to get done? Functional, emotional, social." },
          { id: "s2.p5.pains", type: "longtext", label: "CUSTOMER · PAINS", hint: "What annoys, blocks, or worries them today?" },
          { id: "s2.p5.gains", type: "longtext", label: "CUSTOMER · GAINS", hint: "What would delight them beyond the minimum?" },
          { id: "s2.p5.products_services", type: "longtext", label: "PRODUCT · PRODUCTS & SERVICES", hint: "What do we actually offer?" },
          { id: "s2.p5.pain_relievers", type: "longtext", label: "PRODUCT · PAIN RELIEVERS", hint: "How do we remove those SPECIFIC named pains?" },
          { id: "s2.p5.gain_creators", type: "longtext", label: "PRODUCT · GAIN CREATORS", hint: "How do we deliver those SPECIFIC named gains?" },
          { id: "s2.p5.insight", type: "parts", label: "INSIGHT SENTENCE", hint: "Write it AFTER the customer side. The BUT must be one of your named pains above.", output: true,
            parts: [{ k: "who", label: "[Who]" }, { k: "motivation", label: "wants [motivation]" }, { k: "barrier", label: "BUT [barrier]" }, { k: "opportunity", label: "SO [opportunity]" }],
            previewTpl: "{who} wants {motivation} — BUT {barrier} — SO {opportunity}" },
          { id: "s2.p5.but_source", type: "enum", label: "BUT comes from a pain someone SAID to us  /  BUT is our assumption (circle one)",
            options: [{ v: "said", label: "BUT comes from a pain someone SAID to us" }, { v: "assumption", label: "BUT is our assumption" }] }
        ]
      },
      {
        p: 6, title: "Competitor Benchmark Matrix",
        sub: "Fill from evidence you can point at — name the real brand, their real page, poster, or pricing.",
        footer: "Row 1 is not optional: name the actual brand in every column. A column you cannot name is a category you have not researched. Write UNKNOWN where you have not checked — a blank cell reads as forgotten, UNKNOWN reads as honest.",
        fields: [
          { id: "s2.p6.matrix", type: "table", rowLabel: "",
            columns: [{ k: "us", label: "US" }, { k: "direct", label: "DIRECT" }, { k: "indirect", label: "INDIRECT" }, { k: "substitute", label: "SUBSTITUTE" }, { k: "benchmark", label: "BENCHMARK" }],
            rows: [
              { k: "who", label: "Who exactly?" }, { k: "audience", label: "Audience" }, { k: "promise", label: "Promise" }, { k: "price", label: "Price" },
              { k: "channel", label: "Channel" }, { k: "identity", label: "Identity/tone" }, { k: "strength", label: "Their strength" }, { k: "weakness", label: "Their weakness" }
            ] }
        ]
      },
      {
        p: 7, title: "Perceptual (Positioning) Map",
        sub: "Axes must be things the AUDIENCE cares about — not things that flatter you.",
        footer: "An empty quadrant is only an opportunity if the audience wants what's there. Empty because valuable, or empty because unwanted?",
        fields: [
          { id: "s2.p7.axes", type: "parts",
            parts: [{ k: "axis1_high", label: "AXIS 1 · high end", ph: "— label —" }, { k: "axis1_low", label: "AXIS 1 · low end", ph: "— label —" }, { k: "axis2_left", label: "AXIS 2 · left", ph: "— label —" }, { k: "axis2_right", label: "AXIS 2 · right", ph: "— label —" }] },
          { id: "s2.p7.points", type: "map2d", axesFrom: "s2.p7.axes", namesFrom: { field: "s2.p6.matrix", row: "who", cols: ["us", "direct", "indirect", "substitute", "benchmark"] } },
          { id: "s2.p7.quadrant_notes", type: "longtext", label: "QUADRANT NOTES", hint: "Plot yourself and every brand you named on page 6 as a labelled dot (drag a small shape onto the grid). Then, one line per player: which quadrant, and why. Every brand named on page 6 must appear here — if it does not fit on these axes, the axes are wrong." }
        ]
      },
      {
        p: 8, title: "Assumption-Risk Matrix", layout: "grid", cols: 2,
        sub: "The top-left box is the only one that matters today — it's your validation plan.",
        footer: "Which single assumption, if wrong, kills the whole project? That's the one you test this week.",
        fields: [
          { id: "s2.p8.test_first", type: "longtext", label: "HIGH IMPORTANCE · LOW CERTAINTY", hint: "TEST FIRST — write your assumptions here. If wrong, the project is in real trouble.", output: true },
          { id: "s2.p8.monitor", type: "longtext", label: "HIGH IMPORTANCE · HIGH CERTAINTY", hint: "Monitor. You're confident and it matters, but don't spend testing time here." },
          { id: "s2.p8.test_later", type: "longtext", label: "LOW IMPORTANCE · LOW CERTAINTY", hint: "Test later, if ever." },
          { id: "s2.p8.ignore", type: "longtext", label: "LOW IMPORTANCE · HIGH CERTAINTY", hint: "Ignore for now." }
        ]
      },
      {
        p: 9, title: "Interview Guide & Validation Plan", layout: "groups",
        sub: "6–8 questions. No pitching. No ‘would you’. Past behaviour only.",
        footer: "FIELDWORK DUE {{interviews_due}}: 5 interviews minimum, with people who are NOT your friends. Raw notes, not summaries.",
        groups: [
          { head: "", ids: ["s2.p9.q1_warmup", "s2.p9.q2_past", "s2.p9.q3_pain", "s2.p9.q4_workaround", "s2.p9.q5_decision", "s2.p9.q6_close"], cols: 2 },
          { head: "", ids: ["s2.p9.q_extra"] },
          { head: "", ids: ["s2.p9.riskiest_assumption", "s2.p9.validation_method"], cols: 2 },
          { head: "Catatan wawancara (tambahan app)", ids: ["s2.p9.interviews"], appOnly: true }
        ],
        fields: [
          { id: "s2.p9.q1_warmup", type: "text", label: "1 · Warm-up about THEM", hint: "— your question here —" },
          { id: "s2.p9.q2_past", type: "text", label: "2 · Past behaviour", hint: "— your question here —" },
          { id: "s2.p9.q3_pain", type: "text", label: "3 · The pain", hint: "— your question here —" },
          { id: "s2.p9.q4_workaround", type: "text", label: "4 · The workaround", hint: "— your question here —" },
          { id: "s2.p9.q5_decision", type: "text", label: "5 · The decision", hint: "— your question here —" },
          { id: "s2.p9.q6_close", type: "text", label: "6 · The open close", hint: "— your question here —" },
          { id: "s2.p9.q_extra", type: "list", appOnly: true, label: "Pertanyaan 7–8 (opsional)", max: 2, addText: "+ Tambah pertanyaan", emptyText: "Workbook meminta 6–8 pertanyaan. Tambahkan kalau perlu.",
            itemFields: [{ k: "text", label: "", type: "text" }] },
          { id: "s2.p9.riskiest_assumption", type: "copytext", label: "OUR RISKIEST ASSUMPTION (from page 8)", hint: "— copy it here —", copyFrom: "s2.p8.test_first", copyLabel: "Salin dari hlm. 8 (TEST FIRST)" },
          { id: "s2.p9.validation_method", type: "longtext", label: "VALIDATION METHOD", hint: "— interviews, test, etc. Name who does it and by when. —" },
          { id: "s2.p9.interviews", type: "list", appOnly: true, label: "Interview notes", addText: "+ Tambah wawancara",
            hint: "Satu entri per wawancara. Jangan tulis nama lengkap atau nomor telepon; cukup inisial atau deskripsi. Catatan mentah, bukan ringkasan.",
            emptyText: "Belum ada wawancara tercatat. Minimal 5 per proyek; boleh dipakai bersama dalam satu grup, tapi interpretasinya tulis sendiri.",
            itemFields: [
              { k: "date", label: "Tanggal", type: "date" },
              { k: "who", label: "Siapa (inisial/deskripsi)", type: "text", ph: "mis. ibu 2 anak, Depok" },
              { k: "segment", label: "Segmen", type: "text", ph: "segmen dari hlm. 3" },
              { k: "outside", label: "Di luar tim & bukan teman?", type: "select", options: ["Ya", "Tidak"] },
              { k: "notes", label: "Catatan mentah", type: "longtext" }
            ] }
        ]
      }
    ]
  };
})();
