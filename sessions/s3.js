/* sessions/s3.js — SPEC Sesi 3 (struktur halaman dan ID field).
 * Sumber: WORKBOOK_S3-team-workbook-v2.pptx (teks slide 1–7; lihat tools/extracts/S3.md).
 * Label, hint, subjudul, footer disalin persis dari workbook. Tanggal tercetak tidak dipakai di app.
 * Keputusan desain Sesi 3 (16 Okt 2026, menunggu konfirmasi Fai; dicatat di log):
 *  - Hlm. 7 (Strategic Critique) = halaman statis tanpa field. Modul peer critique TIDAK dibangun (kontrak V17).
 *    Subjudul hlm. 7 dipotong sebelum kalimat bertanggal ("Due Wed 4 Nov") karena app tidak menampilkan tanggal kalender.
 *  - pg.carry = panel "bawaan dari sesi sebelumnya": nilai ditampilkan, tidak pernah disalin diam-diam.
 *  - Tipe field baru "sliders" (hlm. 5): lima pasang kutub, nilai 0–1.
 * ID FIELD DIKUNCI SETELAH S3 DIRILIS: boleh menambah, tidak boleh mengganti nama/menghapus.
 */
window.CB = window.CB || {}; CB.specs = CB.specs || {};
(function () {
  CB.specs.S3 = {
    id: "S3", n: 3,
    title: "Brand Strategy Platform",
    wbCover: "SESSION 3 TEAM WORKBOOK",
    coverNote: "Fill this together as a team, outside class. Every blank must trace back to Session 2. A promise with no proof isn't strategy — it's hope.",
    fillOrder: [2, 3, 4, 5, 6, 7],
    pages: [
      {
        p: 2, title: "Brand Positioning Statement",
        sub: "Draft ALONE first, no discussion. Then merge as a team.",
        carry: { title: "Bawaan dari Sesi 2 (hanya tampil, tidak disalin)", items: [
          { id: "s2.p4.primary", label: "PRIMARY AUDIENCE" },
          { id: "s2.p5.insight", label: "INSIGHT SENTENCE" },
          { id: "s2.p3.category", label: "KATEGORI" }
        ] },
        fields: [
          { id: "s3.p2.draft", type: "parts",
            parts: [{ k: "segment", label: "[segment]", ph: "dari PRIMARY AUDIENCE S2" }, { k: "insight", label: "[insight]", ph: "dari insight sentence S2", long: true },
              { k: "name", label: "[name] is the", ph: "nama brand" }, { k: "category", label: "[category]", ph: "kategori yang kamu pilih" },
              { k: "benefit", label: "[benefit]", ph: "manfaat utama", long: true }, { k: "proof", label: "[proof]", ph: "bukti bernama", long: true }],
            previewTpl: "For {segment} who {insight} {name} is the {category} that {benefit} because {proof}." },
          { id: "s3.p2.final", type: "longtext", label: "OUR FINAL MERGED STATEMENT", hint: "— write your team's one sentence here —", output: true },
          { id: "s3.p2.test", type: "longtext", label: "THE TEST", hint: "Could a competitor say this exact sentence? If yes, keep revising. Name one thing in your sentence a competitor genuinely could NOT claim." }
        ]
      },
      {
        p: 3, title: "Points of Parity & Points of Difference", layout: "grid", cols: 2,
        sub: "Derive both columns from your Session 2 Competitor Matrix — not imagination.",
        footer: "First be good enough. THEN be different. A beautifully different product that fails the basics never gets a chance to be different.",
        carry: { title: "Bawaan dari Sesi 2 (hanya tampil, tidak disalin)", items: [
          { id: "s2.p6.matrix", label: "COMPETITOR BENCHMARK MATRIX" },
          { id: "s2.p7.quadrant_notes", label: "QUADRANT NOTES (peta posisi)" }
        ] },
        fields: [
          { id: "s3.p3.parity", type: "longtext", label: "WHAT WE MUST MATCH (parity)", hint: "The entry ticket — what you must be good at just to be taken seriously. Don't leave this empty." },
          { id: "s3.p3.difference", type: "longtext", label: "WHERE WE WIN (difference)", hint: "Why they pick you over the alternatives — the thing only you can credibly claim." }
        ]
      },
      {
        p: 4, title: "Brand Platform Canvas", layout: "grid", cols: 2,
        sub: "Eight boxes. Each 1–2 sentences — if it needs a paragraph, it isn't distilled yet.",
        footer: "Coherence check: pick any two boxes at random — can your team explain how they connect?",
        carry: { title: "Bawaan dari halaman sebelumnya (hanya tampil, tidak disalin)", items: [
          { id: "s3.p2.final", label: "POSITIONING STATEMENT (hlm. 2)" },
          { id: "s2.p5.pains", label: "CUSTOMER PAINS (S2)" }
        ] },
        fields: [
          { id: "s3.p4.purpose", type: "longtext", label: "PURPOSE", hint: "Why do we deserve to exist, beyond profit? What does it make us REFUSE to do?" },
          { id: "s3.p4.vision", type: "longtext", label: "VISION", hint: "The future state we're working toward. Rarely changes." },
          { id: "s3.p4.mission", type: "longtext", label: "MISSION", hint: "What we DO, day to day, to move toward that vision." },
          { id: "s3.p4.values", type: "longtext", label: "VALUES", hint: "Principles that guide us — even when inconvenient. What would cost us something to keep?" },
          { id: "s3.p4.essence", type: "longtext", label: "ESSENCE", hint: "The brand in 2–4 words. Internal use only." },
          { id: "s3.p4.promise", type: "longtext", label: "PROMISE", hint: "The one thing the audience can always expect from us." },
          { id: "s3.p4.personality", type: "longtext", label: "PERSONALITY", hint: "If the brand walked in as a person — how would they talk?" },
          { id: "s3.p4.rtb", type: "longtext", label: "REASONS TO BELIEVE", hint: "The proof that makes the promise credible." }
        ]
      },
      {
        p: 5, title: "Brand Personality Spectrum & Promise–Proof Matrix",
        sub: "Commit to a position on every slider — don't sit in the middle.",
        fields: [
          { id: "s3.p5.sliders", type: "sliders",
            pairs: [{ k: "playful_serious", left: "Playful", right: "Serious" }, { k: "mass_niche", left: "Mass", right: "Niche" }, { k: "warm_cool", left: "Warm", right: "Cool" },
              { k: "bold_safe", left: "Bold", right: "Safe" }, { k: "modern_classic", left: "Modern", right: "Classic" }] },
          { id: "s3.p5.why_placed", type: "longtext", label: "WHY WE PLACED IT THERE", hint: "One line per slider — tie it to your positioning statement." },
          { id: "s3.p5.promise_proof", type: "list", label: "PROMISE → PROOF", addText: "+ Tambah promise",
            hint: "List every promise from your platform, and the real, named proof for each. No proof named = shrink the promise.",
            emptyText: "Belum ada promise. Mulai dari kotak PROMISE di hlm. 4.",
            itemFields: [{ k: "promise", label: "Promise", type: "text" }, { k: "proof", label: "Proof (nyata, bernama)", type: "longtext" }] }
        ]
      },
      {
        p: 6, title: "Message House", layout: "groups",
        sub: "This becomes your entire Session 6 campaign — build it well now.",
        footer: "Every pillar must trace back UP to the roof. A pillar that doesn't support the master message is a distraction.",
        carry: { title: "Bawaan dari halaman sebelumnya (hanya tampil, tidak disalin)", items: [
          { id: "s3.p4.promise", label: "PROMISE (hlm. 4)" },
          { id: "s3.p4.rtb", label: "REASONS TO BELIEVE (hlm. 4)" },
          { id: "s3.p5.promise_proof", label: "PROMISE → PROOF (hlm. 5)" }
        ] },
        groups: [
          { head: "", ids: ["s3.p6.roof"] },
          { head: "", ids: ["s3.p6.pillar1", "s3.p6.pillar2", "s3.p6.pillar3", "s3.p6.proof1", "s3.p6.proof2", "s3.p6.proof3"], cols: 3 },
          { head: "", ids: ["s3.p6.cta"] }
        ],
        fields: [
          { id: "s3.p6.roof", type: "longtext", label: "MASTER MESSAGE (the roof)", output: true },
          { id: "s3.p6.pillar1", type: "longtext", label: "PILLAR 1", hint: "Supporting message — must trace back to the roof" },
          { id: "s3.p6.pillar2", type: "longtext", label: "PILLAR 2", hint: "Supporting message — must trace back to the roof" },
          { id: "s3.p6.pillar3", type: "longtext", label: "PILLAR 3", hint: "Supporting message — must trace back to the roof" },
          { id: "s3.p6.proof1", type: "longtext", label: "PROOF POINT", hint: "— the evidence for this pillar —" },
          { id: "s3.p6.proof2", type: "longtext", label: "PROOF POINT", hint: "— the evidence for this pillar —" },
          { id: "s3.p6.proof3", type: "longtext", label: "PROOF POINT", hint: "— the evidence for this pillar —" },
          { id: "s3.p6.cta", type: "longtext", label: "CALL TO ACTION (the door)", hint: "what should the audience do next?" }
        ]
      },
      {
        p: 7, title: "Strategic Critique — Gate 2 Check",
        sub: "Swap your platform with the team assigned to you. Score 1–5 on each criterion.",
        footer: "GATE 2 CHECK:  Gate 2 asks for sufficient audience evidence AND a defendable positioning. This card is feedback, not the Gate. Two or more scores of 1–2 means: write a short plan for those criteria (what, who, by when). It becomes part of your Gate 2 condition.",
        fields: []
      }
    ]
  };
})();
