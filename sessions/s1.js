/* sessions/s1.js — SPEC Sesi 1 (struktur halaman dan ID field).
 * Sumber: WORKBOOK_S1-What_Is_a_Brand_Really_v2.pptx (ekstrak python-pptx, 16 Okt 2026).
 * Label dan instruksi disalin persis dari workbook. Tanggal tercetak di workbook
 * diganti placeholder {{due}} (kontrak v3.2 butir 8).
 * ID FIELD DIKUNCI SETELAH S1 DIRILIS: boleh menambah, tidak boleh mengganti nama/menghapus.
 */
window.CB = window.CB || {}; CB.specs = CB.specs || {};
CB.specs.S1 = {
  id: "S1", n: 1,
  title: "Commercial Brand Audit",
  wbCover: "SESSION 1 TEAM WORKBOOK",
  coverNote: "Fill this together as a team, outside class. Facts only, present tense. UNKNOWN is a legal answer — zero UNKNOWNs tells your lecturer you're bluffing.",
  // Urutan isi yang diajarkan di kelas (Bedah Mendalam S1 v5): 2 → 3 → 5 → 4 → 6 → 7 bawah → 7 atas → 8
  fillOrder: [2, 3, 5, 4, 6, 7, 8],
  pages: [
    {
      p: 2, title: "Brand Audit Canvas", tag: "GATE 1 PACK",
      sub: "Your project AS IT IS TODAY — not your dreams. Fill INSIDE first (left), then OUTSIDE (right). Box 8 is the output.",
      layout: "canvas2",
      columns: [
        { head: "INSIDE — what we have", ids: ["s1.p2.b1_product_truth", "s1.p2.b3_identity_assets", "s1.p2.b5_touchpoints_today", "s1.p2.b7_evidence_on_hand"] },
        { head: "OUTSIDE — what they think", ids: ["s1.p2.b2_current_audience", "s1.p2.b4_current_perception", "s1.p2.b6_competitors_benchmarks", "s1.p2.b8_gaps"] }
      ],
      fields: [
        { id: "s1.p2.b1_product_truth", type: "longtext", label: "1 · PRODUCT TRUTH", hint: "What is it, honestly? What stage? What actually works today?" },
        { id: "s1.p2.b2_current_audience", type: "longtext", label: "2 · CURRENT AUDIENCE", hint: "Who engages TODAY? Real numbers. Zero is an acceptable answer." },
        { id: "s1.p2.b3_identity_assets", type: "longtext", label: "3 · IDENTITY ASSETS", hint: "Name? Logo? Colors? Handles? Anything registered?" },
        { id: "s1.p2.b4_current_perception", type: "longtext", label: "4 · CURRENT PERCEPTION", hint: "What do OUTSIDERS say, in their words? If never asked: UNKNOWN." },
        { id: "s1.p2.b5_touchpoints_today", type: "longtext", label: "5 · TOUCHPOINTS TODAY", hint: "Every place someone can meet this brand + its condition." },
        { id: "s1.p2.b6_competitors_benchmarks", type: "longtext", label: "6 · COMPETITORS & BENCHMARKS", hint: "Who fights for this audience's time and money? Who's the judge?" },
        { id: "s1.p2.b7_evidence_on_hand", type: "longtext", label: "7 · EVIDENCE ON HAND", hint: "What proof do we actually possess?" },
        { id: "s1.p2.b8_gaps", type: "longtext", label: "8 · GAPS & RISKS", hint: "Every UNKNOWN + everything that scares us. This box is the point.", output: true }
      ]
    },
    {
      p: 3, title: "Product-to-Brand Map", layout: "grid", cols: 3,
      sub: "Trace the chain left to right, in order — no skipping. You may not fill box 5 before box 3.",
      footer: "Money follows feeling — not the other way around.",
      fields: [
        { id: "s1.p3.b1_core_product", type: "longtext", label: "1 · CORE PRODUCT", hint: "The literal thing you're making." },
        { id: "s1.p3.b2_user_experience", type: "longtext", label: "2 · USER EXPERIENCE", hint: "What it's actually like to use / watch / play." },
        { id: "s1.p3.b3_emotional_benefit", type: "longtext", label: "3 · EMOTIONAL BENEFIT", hint: "How it makes them FEEL." },
        { id: "s1.p3.b4_social_benefit", type: "longtext", label: "4 · SOCIAL BENEFIT", hint: "What it lets them SHOW to others." },
        { id: "s1.p3.b5_commercial_objective", type: "longtext", label: "5 · COMMERCIAL OBJECTIVE", hint: "The business result we want from that feeling." },
        { id: "s1.p3.b6_brand_meaning", type: "longtext", label: "6 · BRAND MEANING", hint: "The one phrase that should pop into a stranger's head." }
      ]
    },
    {
      p: 4, title: "Stakeholder Map", layout: "grid", cols: 2,
      sub: "For every name: what do they WANT from this project, and what POWER do they have to help or block it?",
      footer: "The most-forgotten box: who could give this project money — or stop it from launching?",
      fields: [
        { id: "s1.p4.internal_high", type: "longtext", label: "INTERNAL · HIGH POWER", hint: "e.g. PM/Business lead, lead engineer, lecturer/supervisor" },
        { id: "s1.p4.external_high", type: "longtext", label: "EXTERNAL · HIGH POWER", hint: "e.g. publisher, platform, sponsor, campus — the money-holders live here. Don't leave this empty." },
        { id: "s1.p4.internal_low", type: "longtext", label: "INTERNAL · LOW POWER", hint: "e.g. individual contributors, junior members" },
        { id: "s1.p4.external_low", type: "longtext", label: "EXTERNAL · LOW POWER", hint: "e.g. individual audience members — weak alone, powerful together (Session 6 preview)" }
      ]
    },
    {
      p: 5, title: "Brand Touchpoint Inventory",
      sub: "One row per touchpoint. 'Doesn't exist' is neutral. 'Exists and looks abandoned' is a withdrawal — revive it or take it down.",
      fields: [
        { id: "s1.p5.touchpoints", type: "table",
          columns: [{ k: "status", label: "STATUS  (live / draft / doesn't exist)" }, { k: "owner", label: "OWNER" }, { k: "deposit", label: "DEPOSIT or WITHDRAWAL?" }],
          rows: [
            { k: "product_interface", label: "Product interface" }, { k: "packaging", label: "Packaging" },
            { k: "event_presence", label: "Event presence" }, { k: "social_media", label: "Social media" },
            { k: "trailer", label: "Trailer" }, { k: "pitch_deck", label: "Pitch deck" },
            { k: "website", label: "Website" }, { k: "community", label: "Community" },
            { k: "merchandising", label: "Merchandising" }, { k: "customer_service", label: "Customer service" }
          ], rowLabel: "TOUCHPOINT", allowExtraRows: true }
      ]
    },
    {
      p: 6, title: "Commercial Readiness Scorecard", tag: "GATE 1 PACK", lowest: 3,
      sub: "Score 1–5. Every score needs a one-line justification — the justification matters more than the number. At least one score must be a 1 or 2.",
      footer: "YOUR THREE LOWEST SCORES:  these become your stage-one priorities on page 7  →",
      fields: [
        { id: "s1.p6.audience_clarity", type: "score", label: "Audience clarity" },
        { id: "s1.p6.differentiation", type: "score", label: "Differentiation" },
        { id: "s1.p6.identity_consistency", type: "score", label: "Identity consistency" },
        { id: "s1.p6.commercial_viability", type: "score", label: "Commercial viability" },
        { id: "s1.p6.distribution_readiness", type: "score", label: "Distribution readiness" },
        { id: "s1.p6.evidence_quality", type: "score", label: "Evidence quality" }
      ]
    },
    {
      p: 7, title: "Stage-One Commitment & Cross-Stream Requests", tag: "GATE 1 PACK: TOP HALF", layout: "groups",
      groups: [
        { head: "OUR THREE PRIORITY COMMERCIAL-BRANDING PROBLEMS", ids: ["s1.p7.problem1", "s1.p7.problem2", "s1.p7.problem3"], badge: "isi terakhir" },
        { head: "WHAT WE NEED FROM OTHER STREAMS  ·  what / why (which gap it fixes) / by when", ids: ["s1.p7.req_designer", "s1.p7.req_engineer", "s1.p7.req_content"], cols: 3, badge: "isi dulu" }
      ],
      sub: "Problems, not solutions. 'We don't know if parents would pay' is a problem. 'We will lower the price' is a solution you haven't earned yet.",
      fields: [
        { id: "s1.p7.problem1", type: "trace", label: "PROBLEM 1", hint: "— one sentence, about audience or money, testable —", traceFrom: ["s1.p2.b8_gaps", "s1.p6.*<=2"] },
        { id: "s1.p7.problem2", type: "trace", label: "PROBLEM 2", hint: "— one sentence, about audience or money, testable —", traceFrom: ["s1.p2.b8_gaps", "s1.p6.*<=2"] },
        { id: "s1.p7.problem3", type: "trace", label: "PROBLEM 3", hint: "— one sentence, about audience or money, testable —", traceFrom: ["s1.p2.b8_gaps", "s1.p6.*<=2"] },
        // Tambahan app (diputuskan Fai 16 Okt): bukti uji 1 Gate 1. Dirender di "Cek kelengkapan", bukan di halaman hlm. 7.
        { id: "s1.p7.problem1_commercial", type: "longtext", appOnly: true, label: "PROBLEM 1 · kenapa ini masalah komersial?", hint: "Satu kalimat: apa yang berubah dalam keputusan orang membayar atau memilih kalau masalah ini selesai?" },
        { id: "s1.p7.problem2_commercial", type: "longtext", appOnly: true, label: "PROBLEM 2 · kenapa ini masalah komersial?", hint: "Satu kalimat: apa yang berubah dalam keputusan orang membayar atau memilih kalau masalah ini selesai?" },
        { id: "s1.p7.problem3_commercial", type: "longtext", appOnly: true, label: "PROBLEM 3 · kenapa ini masalah komersial?", hint: "Satu kalimat: apa yang berubah dalam keputusan orang membayar atau memilih kalau masalah ini selesai?" },
        { id: "s1.p7.req_designer", type: "longtext", label: "From our DESIGNER / ARTIST", hint: "what / why (which gap it fixes) / by when" },
        { id: "s1.p7.req_engineer", type: "longtext", label: "From our ENGINEER / TECHNICAL", hint: "what / why (which gap it fixes) / by when" },
        { id: "s1.p7.req_content", type: "longtext", label: "From our CONTENT / PRODUCTION", hint: "what / why (which gap it fixes) / by when" }
      ]
    },
    {
      p: 8, title: "Decision Log", workLabel: "Log-mu · Decision Log S1",
      sub: "One line per decision, starting today. This log is 20% of your grade's evidence — and your individual protection.",
      footer: "Duplicate this page when it fills up. It will fill up — that's the point.",
      // Kontrak v3.3: hlm. 8 kembali menjadi field biasa di sessions.S1, diisi di akhir Sesi 1.
      // Leadership Log (silabus §9D) adalah halaman terpisah: leadership.html, data di leadership_log.
      fields: [{
        id: "s1.p8.log", type: "list", addText: "+ Tambah keputusan",
        emptyText: "Belum ada keputusan. Isi di akhir Sesi 1, setelah halaman 2–7 selesai.",
        itemFields: [
          { k: "when", label: "WHEN", type: "text", ph: "mis. 12 weeks pre-release" },
          { k: "decided", label: "WHAT WE DECIDED", type: "longtext" },
          { k: "why", label: "WHY", type: "longtext" },
          { k: "evidence", label: "EVIDENCE", type: "longtext" }
        ]
      }]
    }
  ]
};
