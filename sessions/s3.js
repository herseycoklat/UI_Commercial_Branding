/* sessions/s3.js — SPEC Sesi 3 (struktur halaman dan ID field).
 * Sumber: WORKBOOK_S3-team-workbook-v3.pptx (28 Okt 2026; teks slide 1–7 diekstrak dengan python-pptx, lihat tools/extracts/S3.md).
 * Label, hint, subjudul, footer disalin persis dari workbook. Tanggal tercetak tidak dipakai di app.
 * Keputusan desain Sesi 3:
 *  - pg.carry = panel "bawaan dari sesi sebelumnya": nilai ditampilkan, tidak pernah disalin diam-diam.
 *  - Tipe field "sliders" (hlm. 5): lima pasang kutub, nilai 0–1.
 *  - Patch kontrak v3.5 (28 Okt 2026, brief claude/42; keputusan Fai 26–28 Okt):
 *    hlm. 7 = form penilai teman (s3.p7.reviews) + rencana kriteria rendah (s3.p7.plans), menggantikan kontrak V17;
 *    status janji di s3.p5.promise_proof (status/owner/deadline/shrunk); jejak asal s3.p2.sources dan s3.p6.origins;
 *    s3.p5.why_placed = satu baris per slider (tipe "lines"; isian lama satu kotak disimpan di _legacy oleh migrate()).
 *  - fillOrder mengikuti urutan kelas (skrip v3 slide 9): hlm. 3 → (kotak Purpose hlm. 4) → hlm. 2 → hlm. 4 → 5 → 6 → 7.
 *  - Tidak ada batas unggah (config noUploadDeadline): app tidak menampilkan tenggat untuk S3.
 * ID FIELD DIKUNCI SETELAH S3 DIRILIS: boleh menambah, tidak boleh mengganti nama/menghapus.
 */
window.CB = window.CB || {}; CB.specs = CB.specs || {};
(function () {
  CB.specs.S3 = {
    id: "S3", n: 3,
    title: "Brand Strategy Platform",
    wbCover: "SESSION 3 TEAM WORKBOOK",
    coverNote: "Fill this together as a team, outside class. Every blank must trace back to Session 2. A promise with no proof isn't strategy — it's hope.",
    hideDue: true,
    coverExtra: "Isi di HTML tool ini, lalu kumpulkan file JSON lewat Form yang sama seperti minggu lalu. <b>Tidak ada batas waktu unggah</b>; hari baca diumumkan di chat kelas, dan unggahan terakhir yang dibaca. Wawancara atau bukti baru minggu ini? Tambahkan di <b>Sesi 2</b> (hlm. 2 dan 9). Ikut terbaca saat Gate 2.",
    fillOrder: [3, 2, 4, 5, 6, 7],
    pages: [
      {
        p: 2, title: "Brand Positioning Statement",
        sub: "Draft ALONE first; note where each blank comes from. Then merge — with evidence, not votes.",
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
          { id: "s3.p2.sources", type: "sources", appOnly: true, label: "JEJAK SUMBER TIAP BLANK (tambahan app)", from: "s3.p2.draft",
            hint: "Tunjuk asal setiap blank. Pilih satu sumber per blank; tulis di catatan bagian mana yang dipakai. Blank tanpa sumber = belum bisa dipertahankan di Gate 2.",
            blanks: [
              { k: "segment", label: "[segment]", opts: [{ id: "s2.p4.primary", label: "PRIMARY AUDIENCE (S2 hlm. 4)" }] },
              { k: "insight", label: "[insight]", opts: [{ id: "s2.p5.insight", label: "INSIGHT SENTENCE (S2 hlm. 5)" }, { id: "s2.p5.pains", label: "CUSTOMER · PAINS (S2 hlm. 5)" }] },
              { k: "category", label: "[category]", opts: [{ id: "s2.p3.category", label: "KATEGORI (S2 hlm. 3)" }, { id: "s2.p6.matrix", label: "COMPETITOR BENCHMARK MATRIX (S2 hlm. 6)" }] },
              { k: "benefit", label: "[benefit]", opts: [{ id: "s3.p3.difference", label: "WHERE WE WIN (S3 hlm. 3)" }] },
              { k: "proof", label: "[proof]", rows: "s3.p5.promise_proof", opts: [{ id: "s3.p4.rtb", label: "REASONS TO BELIEVE (S3 hlm. 4)" }] }
            ] },
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
          { id: "s3.p5.why_placed", type: "lines", pairsFrom: "s3.p5.sliders", label: "WHY WE PLACED IT THERE", hint: "One line per slider — tie it to your positioning statement." },
          { id: "s3.p5.promise_proof", type: "list", label: "PROMISE → PROOF", addText: "+ Tambah promise",
            hint: "List every promise from your platform and its real, named proof. Mark each: REAL · PLANNED (owner + deadline) · UNKNOWN → shrink it until it is true (place · time · who · how much). Never delete it, never leave it standing.",
            guide: "<p><b>Bukti yang baik:</b> <i>verifiable</i> (bisa dicek orang luar tanpa harus percaya pada kita), <i>specific</i> (angka, nama, dokumen, sesuatu yang bisa dicoba), <i>relevant</i> (membuktikan janji yang sama, bukan janji lain).</p><p><b>Status:</b> <b>REAL (nyata)</b> = lolos tiga syarat hari ini. <b>PLANNED</b> = akan ada; tulis <i>owner</i> dan <i>deadline</i>. <b>UNKNOWN</b> = belum ada; janji dikecilkan, bukan dihapus. Empat cara mengecilkan janji: <b>tempat, waktu, siapa, seberapa</b>.</p><p>Setiap pilar Message House (hlm. 6) harus punya baris di tabel ini. Belum ada? Tambahkan barisnya dulu.</p>",
            emptyText: "Belum ada promise. Mulai dari kotak PROMISE di hlm. 4.",
            itemFields: [{ k: "promise", label: "Promise", type: "text" }, { k: "proof", label: "Proof (nyata, bernama)", type: "longtext" },
              { k: "status", label: "Status bukti", type: "select", empty: "— belum dipilih —", options: [{ v: "nyata", label: "REAL · nyata (bisa dicek orang luar hari ini)" }, { v: "planned", label: "PLANNED · akan ada (owner + deadline)" }, { v: "unknown", label: "UNKNOWN · belum ada (kecilkan janjinya)" }] },
              { k: "owner", label: "Owner (siapa yang mengerjakan bukti)", type: "text", showIf: { k: "status", eq: "planned" } },
              { k: "deadline", label: "Deadline (kapan)", type: "text", ph: "tulis sendiri", showIf: { k: "status", eq: "planned" } },
              { k: "shrunk", label: "Janji setelah dikecilkan (tempat, waktu, siapa, seberapa)", type: "longtext", showIf: { k: "status", eq: "unknown" } }] }
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
          { head: "", ids: ["s3.p6.cta"] },
          { head: "", ids: ["s3.p6.origins"] }
        ],
        fields: [
          { id: "s3.p6.roof", type: "longtext", label: "MASTER MESSAGE (the roof)", output: true },
          { id: "s3.p6.pillar1", type: "longtext", label: "PILLAR 1", hint: "Why the roof is true — taken from WHERE WE WIN, Purpose, the canvas or audience needs" },
          { id: "s3.p6.pillar2", type: "longtext", label: "PILLAR 2", hint: "Why the roof is true — taken from WHERE WE WIN, Purpose, the canvas or audience needs" },
          { id: "s3.p6.pillar3", type: "longtext", label: "PILLAR 3", hint: "Why the roof is true — taken from WHERE WE WIN, Purpose, the canvas or audience needs" },
          { id: "s3.p6.proof1", type: "longtext", label: "PROOF POINT", hint: "Copy it from your Promise → Proof table. Not there yet? Add the row first." },
          { id: "s3.p6.proof2", type: "longtext", label: "PROOF POINT", hint: "Copy it from your Promise → Proof table. Not there yet? Add the row first." },
          { id: "s3.p6.proof3", type: "longtext", label: "PROOF POINT", hint: "Copy it from your Promise → Proof table. Not there yet? Add the row first." },
          { id: "s3.p6.cta", type: "longtext", label: "CALL TO ACTION (the door)", hint: "what should the audience do next?" },
          { id: "s3.p6.origins", type: "origins", appOnly: true, label: "ASAL DAN BUKTI TIAP PILAR (tambahan app)", rows: "s3.p5.promise_proof",
            hint: "Cek dua arah. Ke atas: kalau pilar ini dicabut, apakah atap lebih lemah? Ke bawah: tiap pilar datang dari kotak mana, dan baris mana di tabel janji dan bukti yang membuktikannya? Belum ada barisnya? Tambahkan dulu.",
            pillars: [{ k: "pillar1", id: "s3.p6.pillar1" }, { k: "pillar2", id: "s3.p6.pillar2" }, { k: "pillar3", id: "s3.p6.pillar3" }],
            opts: [{ id: "s3.p3.difference", label: "Kotak WHERE WE WIN (hlm. 3)" }, { id: "s3.p3.parity", label: "Kotak WHAT WE MUST MATCH / parity (hlm. 3)" },
              { id: "s3.p4.purpose", label: "Kotak Purpose (hlm. 4)" }, { id: "s3.p4.mission", label: "Kotak Mission (hlm. 4)" }, { id: "s3.p4.values", label: "Kotak Values (hlm. 4)" },
              { id: "s3.p4.promise", label: "Kotak Promise (hlm. 4)" }, { id: "s3.p4.personality", label: "Kotak Personality (hlm. 4)" }, { id: "s3.p4.rtb", label: "Kotak Reasons to Believe (hlm. 4)" },
              { id: "s2.p5.pains", label: "Kebutuhan audiens: pains (Sesi 2 hlm. 5)" }, { id: "s2.p5.gains", label: "Kebutuhan audiens: gains (Sesi 2 hlm. 5)" }] }
        ]
      },
      {
        p: 7, title: "Strategic Critique — Gate 2 Check",
        sub: "2+ classmates from OTHER groups score your positioning statement (page 2) — one form each, in the HTML tool.",
        footer: "GATE 2 CHECK:  This card is feedback, not the Gate. Each reviewer writes name, NIM, email and one reason per score; teammates can't review. Any criterion averaging 2 or lower is low. Two or more low criteria → write a plan for each (what, who, by when). It becomes part of your Gate 2 condition.",
        carry: { title: "Yang dinilai (tampil saja)", items: [
          { id: "s3.p2.final", label: "POSITIONING STATEMENT (hlm. 2)" },
          { id: "s3.p5.promise_proof", label: "PROMISE → PROOF (hlm. 5), boleh dilihat untuk CREDIBLE" }
        ] },
        fields: [
          { id: "s3.p7.reviews", type: "reviews", appOnly: true, label: "FORM PENILAI (diisi oleh penilai, bukan pemilik file)",
            guide: "<p><b>Aturan untuk penilai:</b> baca lima kriteria dulu, baru kalimatnya. Satu kalimat alasan untuk setiap skor. Jangan beri 5 untuk semua; tulis kelemahan yang paling mungkin. Penilai yang mengisi, bukan pemilik file. Teman satu kelompok tidak boleh menilai.</p><p class='small muted'>Nama, NIM, dan email penilai ikut tersimpan di file ini dan hanya dipakai untuk kuliah (cek NIM terdaftar dan beda kelompok, cek acak oleh dosen).</p>",
            criteria: [
              { k: "clear", label: "CLEAR", q: "Is it easy to understand in one read?", id: "Bisa dipahami dalam sekali baca?" },
              { k: "relevant", label: "RELEVANT", q: "Does it match your Session 2 evidence?", id: "Sesuai kebutuhan audiens yang sudah ditemukan tim?" },
              { k: "distinctive", label: "DISTINCTIVE", q: "Could a competitor say this?", id: "Bisakah pesaing mengucapkan kalimat ini?" },
              { k: "credible", label: "CREDIBLE", q: "Does real proof exist?", id: "Apakah buktinya benar-benar ada? (boleh melihat tabel janji dan bukti)" },
              { k: "useful", label: "COMMERCIALLY USEFUL", q: "Does it tell a designer and a seller what to do?", id: "Apakah kalimat ini memberi tahu desainer dan penjual apa yang harus dilakukan?" }
            ] },
          { id: "s3.p7.plans", type: "plans", appOnly: true, from: "s3.p7.reviews", label: "RINGKASAN DAN RENCANA (dihitung otomatis)",
            hint: "Kriteria rendah = rata-rata semua penilai 2 atau lebih rendah. Dua kriteria rendah atau lebih: wajib rencana untuk setiap kriteria itu." }
        ]
      }
    ]
  };
})();
