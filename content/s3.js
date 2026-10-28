/* content/s3.js — teks Sesi 3: teori, kenapa penting, deeper read, cek terbalik, contoh empat kasus.
 * Sumber teori: Sesi-3-Bedah-Mendalam_v4.md (Keller & Swaminathan, 2020, Strategic Brand Management ed. 5;
 * Aaker, 2014, Aaker on Branding), silabus §8 Sesi 3 (SLO, CLO 2, enam In-Class Tools) dan §13 (Gate 2),
 * dan deeper-read dari claude/S3-workbook-tool_v2.html.
 * Contoh: verbatim dari S3-worked-example-{Jumbo,Gojek,DisneyMarvel,LEGO-Technic}-v2.pptx (14 Okt 2026).
 *  - Slide 8 (Gate 2 Verdict) TIDAK ditampilkan dengan baris STATUS-nya. Hanya isi ketiga tes dan jenis tindak lanjut,
 *    tanpa tanggal; tanggal tenggat diganti kalimat tanpa tanggal.
 *  - Tanggal kalender dihapus dari seluruh contoh (kontrak v3.2 butir 8).
 *  - Posisi slider: hanya sebagian yang tertulis sebagai angka di slide; sisanya estimasi (dicatat di ex.note hlm. 5).
 *  - 28 Okt 2026 (brief claude/42, patch kontrak v3.5): Jumbo v2 (positioning, THE TEST, difference, promise, roof);
 *    contoh mengisi semua kolom baru (jejak sumber, status janji, asal pilar, form penilai, rencana).
 *    Penilai 1 = skor kartu worked example slide 7; Penilai 2 = ILUSTRASI, skornya dipilih supaya kriteria rendahnya
 *    sama dengan worked example. Identitas penilai contoh jelas fiktif. Baris WHY yang tidak tertulis di slide ditandai.
 * Konten tidak boleh memuat tanggal kalender atau kata status Gate.
 */
window.CB = window.CB || {}; CB.content = CB.content || {};
(function () {
  var CAVEAT = "Contoh ini rekonstruksi ilustratif, bukan data bersumber. Tiru cara berpikirnya, bukan angkanya.";
  var SUB2 = " Penilai 2 is an ILLUSTRATION (not data), chosen so the low criteria stay the same as the worked example. Reviewer names, NIMs and emails are fictitious.";
  var SLIDER_NOTE = "Posisi slider di contoh dibaca dari letak titik di slide; hanya sebagian yang tertulis sebagai angka, sisanya estimasi. 0 = kutub kiri, 100 = kutub kanan. Tiru alasannya, bukan angkanya.";

  CB.content.S3 = {
    pages: {
      /* ================= hlm. 2 — Brand Positioning Statement ================= */
      2: {
        theory: {
          title: "Baca ini dulu",
          src: "Keller & Swaminathan (2020), Strategic Brand Management, ed. 5; Aaker (2014), Aaker on Branding",
          html: `
<p>Positioning <b>bukan</b> deskripsi produk. Positioning adalah posisi di <b>kepala audiens</b>, relatif terhadap alternatif yang mereka pertimbangkan. Jadi ukurannya bukan "apakah kalimat ini bagus", tapi <b>"siapa yang tidak bisa mengucapkan kalimat ini?"</b></p>
<ul>
<li>Positioning selalu berbiaya. Sebuah kalimat yang tidak melepaskan apa pun belum memilih apa pun. Klaim yang bisa diucapkan semua pesaing tidak bernilai, karena nilainya ditentukan oleh apa yang <i>tidak bisa diucapkan lawan</i>.</li>
<li>Tiga syarat, wajib terpenuhi <b>bersamaan</b>: <b>EMPTY</b> (belum diklaim pesaing), <b>WANTED</b> (audiens benar-benar peduli), <b>BELIEVABLE</b> (kamu kredibel mengklaimnya). Yang paling sering gagal adalah <b>wanted</b>, bukan empty: posisi kosong sering kosong justru karena tidak ada yang menginginkannya.</li>
<li>Template satu kalimat: <i>For [segment] who [insight], [name] is the [category] that [benefit], because [proof].</i> Tiap blank harus datang dari Sesi 2 atau dari halaman Sesi 3 yang sudah kamu isi. Tunjuk asalnya di kotak <b>JEJAK SUMBER TIAP BLANK</b>: itu yang dibaca Gate 2 Tes 2.</li>
<li>Cara mengerjakan: <b>tiap anggota menulis drafnya sendiri dulu, tanpa diskusi</b>. Baru kemudian digabung jadi satu kalimat tim. Perbedaan antar-draf itulah yang mengasah kalimatnya.</li>
<li>Uji pesaing setelah kalimat jadi: <i>"Could a competitor say this exact sentence?"</i> Uji <b>per bagian</b>, bukan kalimat utuh sekaligus. Kalau semua bagian bisa ditiru, ia masih deskripsi kategori. Sebutkan satu hal di kalimatmu yang pesaing benar-benar <b>tidak bisa</b> klaim.</li>
</ul>
<p>Satu kalimat, satu gagasan. Kalau bukti yang kamu tulis belum ada, jangan disamarkan: tandai <b>PLANNED</b> atau <b>UNKNOWN</b> di dalam kalimat.</p>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> kalimat yang kamu kunci di sini menjadi <i>"team constitution"</i>. Brand Platform (hlm. 4), Message House (hlm. 6), brief identitas Sesi 4, sampai pitch di Sesi 8 akan diuji balik terhadap kalimat ini.</p>
<p>Di Gate 2 (silabus §13: <i>"The team has sufficient audience evidence and a defendable positioning"</i>), halaman ini adalah inti tes <b>Positioning</b>: setiap blank harus bisa ditelusuri ke Sesi 1–2, kalimat lolos uji pesaing, dan memuat satu gagasan. Itu sebabnya panel di atas menampilkan hasil Sesi 2-mu: kalau sebuah blank tidak ketemu di sana, jangan diada-adakan, kembali ke bukti.</p>`,
        deeper: {
          summary: "Deeper read — Tangga Manfaat (Aaker, 2014): mesin pengisi blank [benefit]",
          html: `
<p>Tim yang macet di blank <b>[benefit]</b> hampir selalu berhenti di anak tangga paling bawah dari empat anak tangga: <b>fitur → manfaat fungsional → manfaat emosional → manfaat sosial/ekspresi diri</b>. "Nobody buys concert merch for the cotton quality": uang sungguhan ada di dua anak tangga atas.</p>
<p>Ini sumbu yang <b>berbeda</b> dari POP/POD di hlm. 3, meski sering dikira sama:</p>
<ul>
<li>POP/POD menjawab klaim <b>mana</b> yang diambil (sumbu kompetitif).</li>
<li>Tangga manfaat menjawab klaim itu hidup di <b>tingkat</b> mana (sumbu kedalaman).</li>
</ul>
<p>Naikkan POD di tangga, jangan naikkan POP. Pertanyaan pengeceknya: <i>"Kalau kami berhasil melakukan ini dengan sempurna, apakah seseorang benar-benar mengubah keputusannya?"</i> Jawaban "ya" di anak tangga 3 atau 4 biasanya langsung memunculkan positioning yang sesungguhnya.</p>
<p>Contoh LEGO Technic: fitur = mekanisme yang bergerak; fungsional = bisa dibangun dan dijalankan; emosional = kepuasan menyelesaikan sesuatu yang benar-benar sulit; sosial = "saya paham cara kerja mesin". Harga premium dibayar di dua anak tangga atas.</p>`
        },
        callout: "<b>Urutan kerja yang diajarkan di kelas:</b> kerjakan <b>hlm. 3</b> (kolom difference memasok blank [benefit]) dan kotak <b>PURPOSE</b> di hlm. 4 lebih dulu, baru kembali ke halaman ini. Nomor halaman bukan urutan pengerjaan.<br><b>Wawancara atau bukti baru minggu ini?</b> Tambahkan di Sesi 2 (hlm. 2 dan 9). Ikut terbaca saat Gate 2.",
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Tiap blank punya sumber di JEJAK SUMBER (primary audience, insight sentence, kategori, kolom difference, bukti)?",
            "Kalimat memuat satu gagasan, bukan dua yang saling berebut?",
            "Kalau pesaing terdekat mengucapkan kalimat yang sama persis, apakah ia bohong? Kalau tidak, kalimatmu belum memilih.",
            "Bukti yang belum ada sudah ditandai PLANNED atau UNKNOWN di dalam kalimat?",
            "Kamu menulis draf sendiri dulu sebelum digabung dengan tim?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Merged after solo drafts: the disagreement between drafts is what sharpened this.", caveat: CAVEAT,
            values: {
              "s3.p2.draft": { label: "WHERE EACH BLANK CAME FROM", text: "Segment = Session 2's primary audience (families with young children, the highest total when three groups were scored). Insight = the BUT half of Session 2's insight: parents doubt a local film can be as good as an imported one. In Session 2 that BUT is still an ASSUMPTION (no parent interviewed yet), and it stays marked as one. Category = Session 2's category frame: animated family film. Benefit = page 3's combined difference. Proof = checkable: years of production at Visinema Studios." },
              "s3.p2.sources": { label: "JEJAK SUMBER TIAP BLANK", cols: ["Blank", "Sumber", "Catatan"], rows: [["[segment]", "PRIMARY AUDIENCE (S2 hlm. 4)", "Families with young children."], ["[insight]", "INSIGHT SENTENCE (S2 hlm. 5)", "Only the BUT half. Still an ASSUMPTION in Session 2: no parent interviewed yet."], ["[category]", "KATEGORI (S2 hlm. 3)", "Animated family film, so the benchmark is Pixar."], ["[benefit]", "WHERE WE WIN (S3 hlm. 3)", "The combination: made by an Indonesian studio AND at Pixar-level quality."], ["[proof]", "REASONS TO BELIEVE (S3 hlm. 4)", "Years of production at Visinema Studios. Checkable, not yet shown publicly."]] },
              "s3.p2.final": "For Indonesian families who doubt a local film can be as good as an imported one, Jumbo is the animated family film made by an Indonesian studio to world-class production standards, because it has been in production for years at Visinema Studios.",
              "s3.p2.test": "Pixar can make a film feel culturally specific (Coco). It cannot claim 'made by an Indonesian studio'. Local studios can claim that, but are perceived as lower in production quality. Only the combination survives."
            },
            anno: { "s3.p2.final": "v2. The earlier sentence ('cinema outings that feel culturally theirs') failed the part-by-part test: Pixar can make a film feel local. What survives is narrower than what the team first wrote, and the insight it rests on is still an assumption." },
            note: "Every blank traces back to your Session 2 workbook. A blank you can't trace means Session 2 needs more work."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Merged after solo drafts: the disagreement between drafts is what sharpened this.", caveat: CAVEAT,
            values: {
              "s3.p2.draft": { label: "WHERE EACH BLANK CAME FROM", text: "Segment + insight = Session 2's primary audience (existing GoRide riders) and their pain: not wanting to re-enter payment or address details. Category = 'food-ordering service', the frame diners already use. Proof = saved addresses, GoPay balance, live driver fleet — all real today, all verifiable." },
              "s3.p2.sources": { label: "JEJAK SUMBER TIAP BLANK", cols: ["Blank", "Sumber", "Catatan"], rows: [["[segment]", "PRIMARY AUDIENCE (S2 hlm. 4)", "Existing GoRide riders."], ["[insight]", "CUSTOMER · PAINS (S2 hlm. 5)", "Not wanting to re-enter payment or address details."], ["[category]", "COMPETITOR BENCHMARK MATRIX (S2 hlm. 6)", "'Food-ordering service'. Session 2's category sentence is still empty in this case: a gap to fix, not a source."], ["[benefit]", "WHERE WE WIN (S3 hlm. 3)", "Zero new setup."], ["[proof]", "REASONS TO BELIEVE (S3 hlm. 4)", "Saved addresses, GoPay balance, live driver fleet. Proves delivery, not food."]] },
              "s3.p2.final": "For existing GoRide riders who want food to arrive with the same effort as booking a ride, GoFood is the food-ordering service that lives inside the app they already use, because their address, their payment method, and the drivers are already there today.",
              "s3.p2.test": "Could a competitor say this exact sentence? A dedicated food app cannot — it has to be downloaded and set up first. A warung cannot — no driver network. But another super-app COULD say a near-identical sentence tomorrow. The team wrote that down honestly instead of pretending otherwise."
            },
            note: "Every blank traces back to your Session 2 workbook. A blank you can't trace means Session 2 needs more work."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Watch what is deliberately LEFT OUT of the positioning sentence: the connected universe appears nowhere in it, on purpose.", caveat: CAVEAT,
            values: {
              "s3.p2.draft": { label: "WHERE EACH BLANK CAME FROM", text: "Segment + insight = Session 2's primary audience and their named pain: not wanting to feel they need to read comics first. Category = 'superhero film', the frame the audience will use whether the studio likes it or not. Proof = the script structure and the casting — both real decisions already made. The connected universe is deliberately excluded: naming it would create the exact homework fear the sentence exists to remove." },
              "s3.p2.sources": { label: "JEJAK SUMBER TIAP BLANK", cols: ["Blank", "Sumber", "Catatan"], rows: [["[segment]", "PRIMARY AUDIENCE (S2 hlm. 4)", "Moviegoers who don't read comics."], ["[insight]", "CUSTOMER · PAINS (S2 hlm. 5)", "Not wanting to feel they must read comics first. Audience evidence still UNKNOWN in Session 2."], ["[category]", "COMPETITOR BENCHMARK MATRIX (S2 hlm. 6)", "'Superhero film'. Session 2's category sentence is still empty in this case: a gap to fix."], ["[benefit]", "WHERE WE WIN (S3 hlm. 3)", "Asks nothing of you before you sit down."], ["[proof]", "REASONS TO BELIEVE (S3 hlm. 4)", "Script structure and casting: real decisions, visible only after viewing."]] },
              "s3.p2.final": "For moviegoers who want a great blockbuster without homework, Iron Man is the superhero film that works completely on its own, because it is a self-contained origin story carried by a lead performance that assumes you know nothing.",
              "s3.p2.test": "Could a competitor say this exact sentence? An adaptation of a famous hero cannot claim 'assumes you know nothing' — its whole marketing rests on you already knowing. A sequel cannot. That is the block. The uncomfortable part: this sentence is a claim about an ABSENCE, which is much harder to put in a trailer than a presence."
            },
            note: "Every blank traces back to your Session 2 workbook. A blank you can't trace means Session 2 needs more work."
          },
          lego: {
            name: "LEGO Technic", sub: "The first version of this sentence packed two ideas and scored 2 on CLEAR from a peer team. This is the rewrite with one idea; v2 is not yet re-scored.", caveat: CAVEAT,
            values: {
              "s3.p2.draft": { label: "WHERE EACH BLANK CAME FROM", text: "Segment + insight = Session 2's primary audience and their named pain: scepticism that more expensive automatically means more worthwhile. Category = 'building set', not 'toy' — chosen deliberately. Proof = the pre-launch reviewer demo. NOTE: that demo is PLANNED, not done. It is a proof that does not exist yet, and the team labelled it that way instead of writing it as fact." },
              "s3.p2.sources": { label: "JEJAK SUMBER TIAP BLANK", cols: ["Blank", "Sumber", "Catatan"], rows: [["[segment]", "PRIMARY AUDIENCE (S2 hlm. 4)", "Experienced Technic builders."], ["[insight]", "CUSTOMER · PAINS (S2 hlm. 5)", "Scepticism that a higher price means more real engineering."], ["[category]", "COMPETITOR BENCHMARK MATRIX (S2 hlm. 6)", "'Building set', not 'toy', chosen deliberately. Session 2's category sentence is still empty in this case: a gap to fix."], ["[benefit]", "WHERE WE WIN (S3 hlm. 3)", "Functions that genuinely work, shown before purchase."], ["[proof]", "PROMISE → PROOF hlm. 5 · Baris 2: It actually works", "The reviewer demo. PLANNED, not done."]] },
              "s3.p2.final": "For experienced Technic builders who doubt that a higher price means more real engineering, the Technic flagship is the building set where every added function can be watched working before you buy, because a pre-launch reviewer demo will show each mechanism moving (PLANNED — not yet held).",
              "s3.p2.test": "Could a competitor say this exact sentence? A scale-model kit cannot — it is detailed but static. A core LEGO set cannot — it is not priced on function. A specialist mechanical kit could claim the function but not the fit tolerance hobbyists take for granted. v1 scored 2 on Clear; rewritten to one idea."
            },
            note: "Every blank traces back to your Session 2 workbook. A blank you can't trace means Session 2 needs more work."
          }
        }
      },

      /* ================= hlm. 3 — Points of Parity & Points of Difference ================= */
      3: {
        theory: {
          title: "Baca ini dulu",
          src: "Keller & Swaminathan (2020), Strategic Brand Management, ed. 5",
          html: `
<p><b>First be good enough. THEN be different.</b> Itu urutan wajibnya, bukan slogan.</p>
<ul>
<li><b>Points of Parity (POP) = tiket masuk.</b> Hal yang tidak harus unik milikmu, bisa dimiliki bersama pesaing, tapi <b>wajib ada</b> supaya kamu dianggap pemain yang sah di kategori ini. Kamu tidak menang dengan ini; tanpanya kamu bahkan tidak masuk perlombaan.</li>
<li><b>Points of Difference (POD) = alasan kamu dipilih.</b> Sesuatu yang diasosiasikan audiens kuat dengan kamu, dinilai positif, dan diyakini tidak akan ditemukan sebaik itu di pesaing. POD yang layak lolos dua sisi: <b>desirable</b> (relevan dan distinctive bagi audiens) dan <b>deliverable</b> (benar-benar bisa kamu wujudkan, sulit ditiru).</li>
<li><b>POD tidak pernah dievaluasi kalau POP gagal.</b> Kesalahan paling umum: terobsesi mencari yang beda sampai lupa tiket masuknya. Tim juga suka mengisi difference dan melewatkan parity. Jangan kosongkan kolom kiri.</li>
</ul>
<p>Kedua kolom diturunkan dari <b>Competitor Benchmark Matrix</b> Sesi 2 (kolom "Their strength" untuk parity, celah di "Their weakness" untuk difference), bukan dari imajinasi.</p>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> kolom <b>difference</b> memasok blank <b>[benefit]</b> di kalimat positioning (hlm. 2). Kalau kalimat ditulis lebih dulu, blank itu gampang diisi dari tebakan, bukan dari analisis pesaing Sesi 2. Itu sebabnya halaman ini dikerjakan <b>lebih dulu</b> daripada halaman 2.</p>
<p>Halaman ini juga fondasi dua kriteria kartu kritik di hlm. 7: <b>Distinctive</b> dan <b>Credible</b>. Kalau difference-mu lemah, kritik itu akan menandainya.</p>`,
        deeper: {
          summary: "Deeper read — tiga jenis POP dan jebakan keseimbangan",
          html: `
<p><b>POP ternyata ada tiga jenis, bukan satu kotak datar:</b></p>
<ul>
<li><b>Category POPs</b> — fitur dasar yang wajib dimiliki agar dianggap pemain yang sah di industri ini.</li>
<li><b>Competitive POPs</b> — asosiasi yang sengaja dibangun untuk menetralkan POD milik pesaing tertentu, supaya itu tidak lagi jadi alasan audiens menolakmu.</li>
<li><b>Correlational POPs</b> — trade-off negatif yang diasumsikan audiens menyertai atribut positifmu. Kalau produkmu sangat murah (sebuah POD), orang bisa mengira kualitasnya rendah; correlational POP adalah usaha membuktikan produk itu murah <i>tapi tetap reliable</i>.</li>
</ul>
<p><b>Kuncinya keseimbangan:</b> POD menarik perhatian, tapi POP yang membangun kepercayaan. Terlalu fokus mengejar keunikan berisiko kehilangan kredibilitas. Terlalu fokus menyamai pesaing berisiko jadi brand "me-too" yang tenggelam.</p>
<p><b>Parity kadang mahal, kadang diwariskan.</b> Di contoh Marvel, "effects that don't look cheap" adalah satu baris anggaran sungguhan. Di contoh LEGO Technic, parity diwariskan dari merek, bukan diraih produk ini, dan itu bisa membuat tim merasa lebih maju dari kenyataan. Di contoh Gojek, parity justru kolom yang sulit.</p>`
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Kolom parity terisi (bukan kosong), dan tiap isinya hal yang membosankan tapi wajib?",
            "Tiap isi kolom bisa kamu tunjuk asalnya di Competitor Benchmark Matrix Sesi 2?",
            "Difference-mu menjawab \"berbeda dari siapa?\" dengan nama, bukan dengan kata \"lebih baik\"?",
            "Difference-mu desirable bagi audiens primer dan deliverable oleh timmu sendiri?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Derived directly from Session 2's Competitor Benchmark Matrix.", caveat: CAVEAT,
            values: {
              "s3.p3.parity": "Professional animation quality matching global standards. A story that holds attention for the full runtime. Family-appropriate humour and pacing. Competent voice acting and sound design.",
              "s3.p3.difference": "An animated family film made by an Indonesian studio, at production quality on par with Pixar — no single competitor has both."
            },
            anno: { "s3.p3.difference": "v2, tested part by part: local studios can claim 'made in Indonesia' but are perceived as lower in production quality; Pixar can claim the quality but not 'made in Indonesia'. Only the combination survives. And it only means something because parity is filled first: Pixar-level quality has not been seen by the public yet." }
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Derived directly from Session 2's Competitor Benchmark Matrix.", caveat: CAVEAT,
            values: {
              "s3.p3.parity": "Enough merchants that the search result isn't empty. Food that arrives warm and intact. An accurate delivery-time estimate. Order tracking that actually updates. Someone answering when an order goes wrong.",
              "s3.p3.difference": "Zero new setup: same account, same saved address, same GoPay balance, same drivers already on the road for rides. The user risks nothing to try it once."
            },
            anno: { "s3.p3.parity": "Notice the parity column is the harder one here. GoFood's difference is already true on day one — its parity is not: the 50-merchant pilot list fails 'enough merchants' by the team's own admission." }
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Derived directly from Session 2's Competitor Benchmark Matrix.", caveat: CAVEAT,
            values: {
              "s3.p3.parity": "Blockbuster-scale action and effects. A story that holds together for two hours. An ending that pays off. A lead the audience wants to watch. Effects that don't look cheap next to that summer's other releases.",
              "s3.p3.difference": "A superhero film that asks nothing of you before you sit down — grounded and witty instead of camp, and complete in itself."
            },
            anno: { "s3.p3.parity": "Marvel's parity column is more expensive than most teams'. ‘Effects that don't look cheap’ is a real line item: Iron Man's reported production budget was about $150 million, plus about $75 million for marketing. Parity items are not always cheap or boring — sometimes the entry ticket IS the budget." }
          },
          lego: {
            name: "LEGO Technic", sub: "Derived directly from Session 2's Competitor Benchmark Matrix.", caveat: CAVEAT,
            values: {
              "s3.p3.parity": "LEGO's brick fit and durability standard. Instructions clear enough to survive a long build. Every part in the box. A finished model sturdy enough to be handled, not just displayed. No gaps a hobbyist forum would photograph.",
              "s3.p3.difference": "Mechanical functions that genuinely work rather than decorate — documented and demonstrated before purchase, not discovered after."
            },
            anno: { "s3.p3.parity": "This parity column is inherited, not earned. Every item is already true because it is LEGO, which is why this team could fill it in two minutes. That is a real advantage — and a real trap: an inherited parity column can make a team feel further ahead than it is, because none of it was proven by THIS product." }
          }
        }
      },

      /* ================= hlm. 4 — Brand Platform Canvas ================= */
      4: {
        theory: {
          title: "Baca ini dulu",
          src: "Aaker (2014), Aaker on Branding; Keller & Swaminathan (2020)",
          html: `
<p>Delapan kotak bukan delapan definisi lepas. Mereka tiga rumpun yang menjawab tiga pertanyaan:</p>
<ul>
<li><b>ARAH</b> (purpose, vision, mission) — kenapa kita ada dan ke mana kita pergi. Dibedakan oleh orientasi waktu: purpose tidak berwaktu, vision menghadap masa depan, mission menghadap hari ini. Vision = tujuan, mission = kendaraan.</li>
<li><b>KARAKTER</b> (values, essence, personality) — siapa kita. Values = batas perilaku, essence = kompas internal 2–4 kata, personality = cara bicara.</li>
<li><b>JANJI</b> (promise, reasons to believe) — apa yang audiens dapat dan kenapa harus percaya. Satu-satunya pasangan wajib: satu klaim, satu bukti.</li>
</ul>
<p>Lima kotak pertama internal; promise, personality, dan reasons to believe menghadap ke luar. <b>Positioning ada di luar kedelapannya</b>: ia ditulis di hlm. 2, bukan kotak kesembilan.</p>
<p><b>Uji penolakan untuk PURPOSE:</b> <i>"What does this purpose make you REFUSE to do?"</i> Kalau jawabannya "tidak ada", itu good copy, bukan purpose. Penolakan yang sah harus <b>menggoda</b>, <b>tersedia</b>, dan <b>menguntungkan</b>: opsi yang benar-benar bisa kalian ambil dan ada biayanya untuk dilepas. "Kami menolak menipu pelanggan" bukan penolakan yang dicari. <b>Tulis juga apa yang ditolak</b> di dalam kotak PURPOSE itu sendiri (workbook tidak punya kotak terpisah untuk itu).</p>
<p>Setiap kotak 1–2 kalimat. Kalau butuh paragraf, belum disuling.</p>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> platform yang kuat bukan delapan ide di delapan kotak. Ia <b>satu ide yang dinyatakan delapan cara untuk delapan keperluan</b>. Ini yang diperiksa tes <b>Platform</b> di Gate 2: canvas koheren (dua kotak acak bisa dijelaskan hubungannya), Promise punya bukti bernama atau dipersempit.</p>
<p>Kotak <b>PERSONALITY</b> menjadi input langsung untuk brief identitas Sesi 4. Kotak <b>PROMISE</b> dan <b>REASONS TO BELIEVE</b> menjadi tulang punggung Promise–Proof Matrix (hlm. 5) dan Message House (hlm. 6). Kanvas ini adalah sumber bahan, bukan tugas yang berdiri sendiri.</p>`,
        deeper: {
          summary: "Deeper read — tujuh pasangan kata yang selalu tertukar, dan tiga pola purpose-washing",
          html: `
<p>Delapan kata ini gampang tumpang tindih kalau hanya dibaca sebagai definisi. Garis pemisah tiap pasangan beserta satu pertanyaan uji:</p>
<ul>
<li><b>Purpose vs. Mission</b> — purpose tidak bisa "selesai dikerjakan", mission bisa. <i>Uji: kalau kalimat ini tuntas tahun depan, apakah kalian bubar?</i> Kalau tidak, itu mission.</li>
<li><b>Purpose vs. Vision</b> — purpose tetap benar meski kalian gagal; vision batal kalau gagal. <i>Uji: kalau proyek ini gagal total, kalimat ini masih benar?</i> Kalau ya, itu purpose.</li>
<li><b>Vision vs. Mission</b> — vision menggambarkan keadaan dunia; mission menyebut aktivitas. <i>Uji: ada kata kerja operasional?</i> Kalau ya, itu mission.</li>
<li><b>Values vs. Personality</b> — values dibayar dengan pengorbanan; personality dibayar dengan konsistensi nada. <i>Uji: kalimat ini muncul di rapat keputusan sulit, atau saat menulis caption?</i></li>
<li><b>Essence vs. Promise</b> — essence untuk internal; promise bisa ditagih audiens. <i>Uji: bisakah audiens komplain kalau ini tidak terpenuhi?</i> Kalau ya, itu promise.</li>
<li><b>Promise vs. Reasons to believe</b> — promise adalah klaim; RTB bisa diverifikasi orang luar. <i>Uji: bisakah orang di luar tim mengecek kebenarannya tanpa mempercayai kata-kata kalian?</i> Kalau ya, itu RTB.</li>
<li><b>Personality vs. Essence</b> — personality soal cara menyampaikan; essence soal isi yang disampaikan.</li>
</ul>
<p><b>Purpose Workshop: pisahkan empat hal yang sering bercampur</b> sebelum menulis PURPOSE: <i>commercial objective</i> (apa yang kita butuhkan), <i>audience benefit</i> (apa yang mereka dapat), <i>broader purpose</i> (kenapa ini layak ada), dan <i>creator/founder ambition</i> (kenapa kamu peduli). Hanya yang ketiga yang masuk ke kotak PURPOSE.</p>
<p><b>Tiga pola purpose-washing yang sering lolos tanpa disadari:</b></p>
<ul>
<li><b>Tujuan komersial berbaju purpose</b> — "purpose kami membuat produk hebat yang menguntungkan". Uji penolakannya menghasilkan "tidak ada".</li>
<li><b>Penolakan palsu</b> — menolak sesuatu yang memang tidak pernah jadi opsi ("kami menolak mengecewakan pelanggan").</li>
<li><b>Purpose yang hanya menyentuh komunikasi, bukan operasi</b> — perubahannya berhenti di tagline atau warna kemasan. Pertanyaan pembongkarnya: <i>"Apa yang berubah di dalam OPERASI kalian, bukan di dalam PESAN kalian?"</i></li>
</ul>`
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Pilih dua kotak secara acak. Bisakah timmu menjelaskan bagaimana keduanya membela gagasan yang sama?",
            "PURPOSE menyebut satu hal yang ditolak, dan hal itu menggoda, tersedia, dan menguntungkan?",
            "PURPOSE tidak sama dengan MISSION, VALUES tidak sama dengan PERSONALITY, REASONS TO BELIEVE bukan promise yang diulang?",
            "Tiap kotak 1–2 kalimat?",
            "REASONS TO BELIEVE bisa dicek orang di luar timmu? Bukti yang masih rencana sudah ditandai PLANNED atau UNKNOWN?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Eight components, read together as one coherent idea, not eight separate answers.", caveat: CAVEAT,
            values: {
              "s3.p4.purpose": "To prove Indonesian creative talent can compete globally without compromising who they are. Refusal test: refuses to dilute local specificity to seem more ‘global.’",
              "s3.p4.vision": "A future where Indonesian animation is a trusted global category, not an exception people are surprised by.",
              "s3.p4.mission": "Make one flagship film at uncompromising quality, told authentically from Indonesia, to prove the model works.",
              "s3.p4.values": "Craft over speed. Authenticity over imitation. Respect for the audience's intelligence, even in a family film.",
              "s3.p4.essence": "“Proudly ours.”",
              "s3.p4.promise": "A film made in Indonesia, at a quality that needs no apology.",
              "s3.p4.personality": "Warm, proud, quietly confident, never cynical.",
              "s3.p4.rtb": "Years of production (in development since April 2020). Made by Visinema Studios with Springboard Entertainment and Anami Films. Written by Ryan Adriandhy and Widya Arifianti. WEAK SPOT: all checkable, none shown to the public yet."
            },
            note: "Coherence check: purpose (refuses dilution) → personality (never cynical) → promise (needs no apology). Same idea, three boxes. Random pair that caught a weak word: the purpose is about WHO makes the film, the old promise ('feels unmistakably Indonesian') was about how it FEELS, and a feeling can be copied by Pixar. The promise was sharpened to 'made in Indonesia' (v2). Promise → RTB is only half connected: the effort is proven, the quality has not been seen by the public."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Eight components, read together as one coherent idea, not eight separate answers.", caveat: CAVEAT,
            values: {
              "s3.p4.purpose": "To take daily friction out of urban life by reusing trust already earned, not by asking for it again. Refusal test: refuses to launch food as a separate standalone app, even though a separate app would give the food team full control of its own brand.",
              "s3.p4.vision": "One app people open without thinking, for the ordinary needs of a city day.",
              "s3.p4.mission": "Add a new service only when the existing infrastructure — drivers, payment, addresses — can carry it on day one.",
              "s3.p4.values": "Reuse before rebuild. Don't launch a service until it works as reliably as the one before it. Boring reliability over launch spectacle.",
              "s3.p4.essence": "“It already works.”",
              "s3.p4.promise": "Anything new inside Gojek works the same way rides already do.",
              "s3.p4.personality": "Familiar, practical, unfussy. Speaks like an app that has nothing to prove — never flashy, never discount-shouting.",
              "s3.p4.rtb": "Live driver fleet. GoPay already funded. Saved addresses. Years of ride reliability. WEAK SPOT: every one of these proves the delivery mechanism, not the food."
            },
            note: "Coherence check: purpose (refuses a separate app) → value (reuse before rebuild) → promise (works the same way rides do). One idea, three boxes. But read the RTB box against the promise — the proof stops exactly where the food starts."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Eight components, read together as one coherent idea, not eight separate answers.", caveat: CAVEAT,
            values: {
              "s3.p4.purpose": "To prove a character can carry a film on who he is, not on how famous he already is. Refusal test: refuses to cast for name recognition over fit — the lead casting was opposed by Marvel executives, so the refusal was not free.",
              "s3.p4.vision": "A world audiences follow because they want to, never because they feel behind.",
              "s3.p4.mission": "Make every film work completely on its own first, and only then let it connect.",
              "s3.p4.values": "The story before the setup. Never make the audience feel like they missed a meeting. Earn the next film instead of assuming it.",
              "s3.p4.essence": "“No homework required.”",
              "s3.p4.promise": "You can start here.",
              "s3.p4.personality": "Witty, grounded, self-aware. Talks like a smart adult who is not taking himself too seriously — never solemn, never camp.",
              "s3.p4.rtb": "Self-contained script. A lead performance built to carry it alone. Grounded tone. Optional post-credits tease. WEAK SPOT: all four are qualities of the film — none can be verified by a stranger before buying a ticket."
            },
            note: "Coherence check: purpose (character over fame) → essence (no homework) → promise (you can start here). One idea, three boxes. Now read the RTB box: this is the honest problem — the reasons to believe are only visible AFTER the purchase they are supposed to justify."
          },
          lego: {
            name: "LEGO Technic", sub: "Eight components, read together as one coherent idea, not eight separate answers.", caveat: CAVEAT,
            values: {
              "s3.p4.purpose": "To keep the word 'advanced' an engineering promise instead of a marketing word. Refusal test: refuses to raise the price using piece count or a licence alone — even when that is the cheapest way to charge more.",
              "s3.p4.vision": "A line adults reach for when they want to understand how a mechanism works, not just own one.",
              "s3.p4.mission": "Ship fewer, deeper flagship sets, each with a function that did not exist in the line before.",
              "s3.p4.values": "Function over piece count. Publish the mechanism before the price. Never sell complexity that only exists on the box.",
              "s3.p4.essence": "“It actually works.”",
              "s3.p4.promise": "Every extra unit of price buys a function, not a sticker.",
              "s3.p4.personality": "Precise, plain-spoken, unshowy. Talks to an expert as an equal — no exclamation marks, no 'ultimate'.",
              "s3.p4.rtb": "Decades of fit tolerance. Documented function list. Pre-launch reviewer demo — PLANNED, not delivered. Two of three are real; one is a promise about a proof."
            },
            note: "Coherence check: purpose (refuses price-by-piece-count) → value (publish the mechanism before the price) → promise (price buys function). One idea, three boxes, and all three trace back to the discipline lesson of LEGO's 2004 crisis (a £174 million loss, per Wikipedia). This is the most internally consistent canvas of the four cases — which makes the low CLEAR score on page 7 more interesting, not less."
          }
        }
      },

      /* ================= hlm. 5 — Personality Spectrum & Promise–Proof Matrix ================= */
      5: {
        theory: {
          title: "Baca ini dulu",
          src: "Aaker (2014), Aaker on Branding (diadaptasi); Keller & Swaminathan (2020)",
          html: `
<p>Halaman ini memuat <b>dua alat</b>. Keduanya diturunkan dari hlm. 4, bukan dikarang baru.</p>
<p><b>1. Personality Spectrum — komitmen, bukan rata-rata.</b> Lima pasangan slider berlawanan (playful–serious, mass–niche, warm–cool, bold–safe, modern–classic) mengubah kata kabur seperti "seru" atau "modern" menjadi instruksi yang bisa dipakai desainer. Alat ini praktis dan <b>terinspirasi</b> dari gagasan brand personality Aaker; ia bukan reproduksi lima dimensi Aaker (1997), jadi jangan menyebutnya kerangka Aaker 1997.</p>
<ul>
<li>Aturan utama: <b>pilih posisi, jangan parkir di tengah</b>. Brand yang "agak playful, agak serius, agak hangat, agak dingin" tidak punya kepribadian; ia punya rata-rata.</li>
<li>Slider yang belum kamu sentuh di app ditampilkan pucat dan dihitung <b>belum dipilih</b>. Pilih, jangan biarkan di tengah.</li>
<li>Lalu tulis <b>kenapa</b> di kotak "WHY WE PLACED IT THERE", satu baris per slider, dikaitkan ke positioning statement di hlm. 2. Slider yang dekat tengah wajib punya baris yang menjelaskan kenapa belum diputuskan.</li>
</ul>
<p><b>2. Promise–Proof Matrix.</b> Daftar setiap janji dari platform-mu (kotak PROMISE, kalimat positioning, klaim lain di kanvas), dan di sebelahnya bukti yang <b>nyata dan bernama</b> untuk tiap janji. <i>A promise with no proof isn't strategy — it's hope.</i></p>
<ul>
<li>Bukti yang baik lolos tiga syarat: <b>verifiable</b> (orang asing bisa mengeceknya tanpa percaya pada kita), <b>specific</b> (angka, nama, dokumen, sesuatu yang bisa dicoba), <b>relevant</b> (kalau bukti ini benar, janjinya ikut benar).</li>
<li>Setiap janji diberi satu <b>status</b>: <b>Nyata</b> (lolos tiga syarat hari ini), <b>PLANNED</b> (akan ada; wajib <i>owner</i> dan <i>deadline</i>, kalau tidak hanya niat), atau <b>UNKNOWN</b> (belum ada, belum ada rencana). Hati-hati bukti nyata yang hanya terlihat dari dalam: bagi audiens itu belum ada.</li>
<li>Janji UNKNOWN <b>dikecilkan sampai jadi benar</b>, bukan dihapus dan bukan dibiarkan. Empat cara: <b>tempat</b> (di mana sudah benar?), <b>waktu</b> (kapan akan benar?), <b>siapa</b> (untuk siapa sudah benar?), <b>seberapa</b> (bagian mana yang sudah benar?).</li>
<li>Setiap pilar Message House (hlm. 6) harus punya baris di tabel ini. Kalau belum ada, tambahkan barisnya.</li>
</ul>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> Personality Spectrum tidak bisa diisi jujur sebelum kotak PERSONALITY di hlm. 4 ada, dan Promise–Proof Matrix secara harfiah butuh daftar promise dari hlm. 4 sebagai kolom kirinya. Keduanya adalah audit atas kanvas.</p>
<p>Hasil slider menjadi bahan brief identitas Sesi 4. Matriks promise–proof langsung dibaca di tes <b>Platform</b> Gate 2: Promise yang tidak punya bukti bernama harus sudah diperkecil, bukan dibiarkan.</p>`,
        deeper: {
          summary: "Deeper read — posisi \"tengah\" vs \"mendekati tengah\", dan tiga pilihan untuk promise tanpa bukti",
          html: `
<p><b>Dua hal yang terlihat identik di kertas, tapi artinya berlawanan.</b> Posisi tengah <b>tanpa alasan</b> berarti tim belum memutuskan. Posisi mendekati tengah yang <b>ditandai</b> sebagai keputusan sadar ("belum diputuskan karena…") adalah instruksi kerja yang sah untuk desainer. Yang membedakan keduanya bukan letak titik, tapi ada-tidaknya kalimat penjelas. Tanyakan: <i>"Bisakah saya menjelaskan dalam satu kalimat kenapa posisi INI, bukan yang di sebelahnya?"</i> Kalau tidak bisa, titik itu diletakkan berdasarkan perasaan.</p>
<p><b>Saat sebuah promise tidak punya bukti bernama, ada tiga pilihan, dan biasanya hanya satu yang benar:</b></p>
<ul>
<li><b>Pertahankan apa adanya dan berharap tidak ditanya</b> — paling umum, paling berbahaya. Promise jadi harapan, bukan strategi.</li>
<li><b>Hapus</b> — lebih aman secara teknis, tapi membuat platform diam soal hal yang paling ingin diketahui audiens.</li>
<li><b>Perkecil sampai jadi benar</b> — mis. "andal" menjadi "andal di distrik pilot dulu". Promise yang diperkecil bisa ditepati, bisa dicek, dan bisa dibesarkan lagi begitu buktinya datang.</li>
</ul>
<p>Pilihan ketiga hampir selalu benar, dan hampir tidak pernah jadi pilihan pertama tim, karena terasa seperti mengakui kelemahan. Padahal mengakui dan memperkecil jauh lebih kredibel daripada diam-diam berharap tidak ada yang bertanya.</p>
<p>Perhatikan juga bukti yang <b>hanya mengulang promise</b>, bukti yang <b>masih rencana</b> (PLANNED), dan bukti yang <b>diwariskan</b> dari merek induk. Ketiganya harus diberi label apa adanya.</p>`
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Kelima slider sudah kamu sentuh dan tidak ada yang parkir di tengah tanpa alasan?",
            "Tiap baris WHY WE PLACED IT THERE terkait ke kalimat positioning di hlm. 2?",
            "Setiap promise dari kotak PROMISE di hlm. 4 muncul di PROMISE → PROOF?",
            "Tiap bukti bernama (siapa, apa, di mana), bukan sekadar mengulang promise?",
            "Promise yang belum punya bukti sudah diperkecil, bukan dihapus dan bukan dibiarkan?",
            "Setiap baris punya status; PLANNED punya owner dan deadline; UNKNOWN punya janji yang dikecilkan?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Committed positions on every slider — none of them parked in the middle.", caveat: CAVEAT,
            values: {
              "s3.p5.sliders": { label: "SLIDERS", items: ["Playful ↔ Serious: 30/100", "Mass ↔ Niche: 30/100 (angka dari slide)", "Warm ↔ Cool: 8/100", "Bold ↔ Safe: 15/100", "Modern ↔ Classic: 70/100"] },
              "s3.p5.why_placed": { label: "WHY WE PLACED IT THERE (satu baris per slider)", items: ["Playful – Serious: playful, not silly — ties to the parity point on family humour.", "Mass – Niche: off-centre on purpose. Starts with a passionate niche (families craving local pride) but aims the platform at eventually feeling natural for every family. The result of a decision, not an absence of one.", "Warm – Cool: " + "(not stated on the worked-example slide — a gap, not an answer to copy)" + " The PERSONALITY box says 'warm', so the line should say why.", "Bold – Safe: bold ties directly to the purpose's ambitious claim.", "Modern – Classic: classic reflects deliberately conventional storytelling craft."] },
              "s3.p5.promise_proof": { label: "PROMISE → PROOF", cols: ["Promise", "Proof", "Status", "Owner · deadline / janji yang dikecilkan"], rows: [["World-class quality", "Years of production and the production companies' credits. Real, but only visible from the inside: not yet shown publicly.", "Nyata (bisa dicek orang luar hari ini)", "Fix: make it public (behind-the-scenes)."], ["Authentically Indonesian", "A story written for the film by Ryan Adriandhy and Widya Arifianti; whether it is wholly original: UNKNOWN.", "UNKNOWN (belum ada)", "Shrunk (seberapa): 'made in Indonesia' — the part that can be checked."], ["Made in Indonesia (v2)", "Visinema Studios, an Indonesian studio; Indonesian writers named in the credits.", "Nyata (bisa dicek orang luar hari ini)", "—"], ["A story for the whole family", "Two emotional layers, for children and for parents (Session 2 VPC). Design intent, not yet tested with an audience.", "UNKNOWN (belum ada)", "Shrunk (seberapa): 'designed with one layer for children and one for parents'. Row added for Pillar 2."]] }
            },
            note: SLIDER_NOTE + " A promise with no named proof gets shrunk until it is true — not deleted, and not left standing as written. WHY lines marked 'not stated' are honest gaps in the worked example."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Committed positions on every slider — none of them parked in the middle.", caveat: CAVEAT,
            values: {
              "s3.p5.sliders": { label: "SLIDERS", items: ["Playful ↔ Serious: 62/100 (estimasi)", "Mass ↔ Niche: 12/100 (angka dari slide)", "Warm ↔ Cool: 42/100 (estimasi)", "Bold ↔ Safe: 78/100 (angka dari slide)", "Modern ↔ Classic: 25/100 (estimasi)"] },
              "s3.p5.why_placed": { label: "WHY WE PLACED IT THERE (satu baris per slider)", items: ["Playful – Serious: " + "(not stated on the worked-example slide — a gap, not an answer to copy)", "Mass – Niche: the most committed placement on the page — the whole positioning depends on already having millions of riders.", "Warm – Cool: near the middle for a reason the team named: functional first, warm only where it costs nothing.", "Bold – Safe: safe on purpose, the opposite of the Marvel example. This brand wins by reusing what is proven, so 'bold' would contradict the purpose box.", "Modern – Classic: " + "(not stated on the worked-example slide — a gap, not an answer to copy)"] },
              "s3.p5.promise_proof": { label: "PROMISE → PROOF", cols: ["Promise", "Proof", "Status", "Owner · deadline / janji yang dikecilkan"], rows: [["One-tap ordering", "Saved addresses and GoPay, live in production today.", "Nyata (bisa dicek orang luar hari ini)", "—"], ["Drivers already nearby", "Existing GoRide fleet density in the pilot district.", "Nyata (bisa dicek orang luar hari ini)", "—"], ["Reliable food delivery", "None for the food side: zero diner interviews (Session 2), 50 merchants in one district. The fleet proves the driver arrives, not that the food arrives right.", "UNKNOWN (belum ada)", "Shrunk (tempat): 'reliable in the pilot district first'."], ["We checked these places first", "The 50-merchant launch list, vetted before launch.", "Nyata (bisa dicek orang luar hari ini)", "Valid only while the list keeps growing after launch. Row added for Pillar 3."]] }
            },
            note: SLIDER_NOTE + " A promise with no named proof gets shrunk until it is true — not deleted, and not left standing as written. WHY lines marked 'not stated' are honest gaps in the worked example."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Committed positions on every slider — none of them parked in the middle.", caveat: CAVEAT,
            values: {
              "s3.p5.sliders": { label: "SLIDERS", items: ["Playful ↔ Serious: 32/100 (angka dari slide)", "Mass ↔ Niche: 8/100 (estimasi)", "Warm ↔ Cool: 55/100 (estimasi)", "Bold ↔ Safe: 5/100 (angka dari slide)", "Modern ↔ Classic: 28/100 (estimasi)"] },
              "s3.p5.why_placed": { label: "WHY WE PLACED IT THERE (satu baris per slider)", items: ["Playful – Serious: the tone decision that separates it from camp — witty, not silly.", "Mass – Niche: " + "(not stated on the worked-example slide — a gap, not an answer to copy)", "Warm – Cool: slightly past the middle and NOT decided yet. The team flagged it instead of pretending.", "Bold – Safe: the most extreme placement across all four cases, and honest: the slate was financed through a $525 million non-recourse debt structure collateralised by film rights to ten characters.", "Modern – Classic: " + "(not stated on the worked-example slide — a gap, not an answer to copy)"] },
              "s3.p5.promise_proof": { label: "PROMISE → PROOF", cols: ["Promise", "Proof", "Status", "Owner · deadline / janji yang dikecilkan"], rows: [["You can start here", "The script itself: no prior film required to follow it. Visible only after viewing.", "Nyata (bisa dicek orang luar hari ini)", "—"], ["Worth your ticket", "No general-audience test screening has happened (Session 2).", "UNKNOWN (belum ada)", "Shrunk (seberapa): 'you can enjoy it without having seen any other film'."], ["More to come, if you want it", "A post-credits tease designed to cost nothing to ignore.", "Nyata (bisa dicek orang luar hari ini)", "—"]] }
            },
            note: SLIDER_NOTE + " A promise with no named proof gets shrunk until it is true — not deleted, and not left standing as written. WHY lines marked 'not stated' are honest gaps in the worked example."
          },
          lego: {
            name: "LEGO Technic", sub: "Committed positions on every slider — none of them parked in the middle.", caveat: CAVEAT,
            values: {
              "s3.p5.sliders": { label: "SLIDERS", items: ["Playful ↔ Serious: 80/100 (angka dari slide)", "Mass ↔ Niche: 75/100 (angka dari slide)", "Warm ↔ Cool: 68/100 (estimasi)", "Bold ↔ Safe: 62/100 (angka dari slide)", "Modern ↔ Classic: 58/100 (estimasi)"] },
              "s3.p5.why_placed": { label: "WHY WE PLACED IT THERE (satu baris per slider)", items: ["Playful – Serious: serious inside a toy company is the placement that needs defending: this buyer is an adult who resents being talked down to.", "Mass – Niche: a deliberate rejection of the teen segment that scored higher on Attractive in Session 2.", "Warm – Cool: " + "(not stated on the worked-example slide — a gap, not an answer to copy)", "Bold – Safe: the post-2003 discipline showing up as a personality decision, not just a finance one.", "Modern – Classic: " + "(not stated on the worked-example slide — a gap, not an answer to copy)"] },
              "s3.p5.promise_proof": { label: "PROMISE → PROOF", cols: ["Promise", "Proof", "Status", "Owner · deadline / janji yang dikecilkan"], rows: [["Price buys function", "Internal cost-to-function mapping. Real, but only visible from the inside: the buyer cannot verify it.", "Nyata (bisa dicek orang luar hari ini)", "Weak: to the buyer this proof does not exist yet. Fix: publish the function-per-tier breakdown."], ["It actually works", "Pre-launch reviewer demo. The strongest proof on the page is the one that does not exist yet.", "PLANNED (akan ada)", "Owner: product lead · Deadline: before launch; date not set yet (UNKNOWN)."], ["Still a LEGO set", "Decades of fit tolerance. Strongest real proof, and entirely inherited.", "Nyata (bisa dicek orang luar hari ini)", "Inherited from the LEGO name, not earned by this set."]] }
            },
            note: SLIDER_NOTE + " A promise with no named proof gets shrunk until it is true — not deleted, and not left standing as written. WHY lines marked 'not stated' are honest gaps in the worked example."
          }
        }
      },

      /* ================= hlm. 6 — Message House ================= */
      6: {
        theory: {
          title: "Baca ini dulu",
          src: "Kerangka komunikasi standar industri, diselaraskan dengan Keller & Swaminathan (2020)",
          html: `
<p>Message House adalah rangka pesan berbentuk rumah:</p>
<ul>
<li><b>Atap</b> — satu master message.</li>
<li><b>Tiga pilar</b> — pesan pendukung. Tiap pilar punya satu <b>proof point</b>, bukti untuk pilar itu.</li>
<li><b>Pintu</b> — satu <b>call to action</b>: apa yang audiens harus lakukan berikutnya. Workbook hanya punya <b>satu</b> kotak CTA; tulis satu ajakan utama yang melayani atap.</li>
</ul>
<p><b>Aturan:</b> pilar bukan ide baru. Setiap pilar harus bisa <b>dilacak ke atas</b> ke atap, dan <b>dilacak balik</b> ke kotak yang spesifik di hlm. 4 (Brand Platform), kolom difference di hlm. 3, atau matriks di hlm. 5. Pilar yang tidak mendukung atap adalah gangguan, sebagus apa pun ia berdiri sendiri. Karena itu rumah ini dibangun dengan cara <b>memanen</b> tiga ide yang sudah ada, bukan mengarang pilar baru.</p>
<p><b>Enam langkah:</b> (1) tulis atap, biasanya versi pendek kalimat positioning; (2) kumpulkan 5–7 kandidat pilar dari kotak WHERE WE WIN, Purpose, kotak lain di kanvas, dan kebutuhan audiens Sesi 2; (3) pilih tiga yang menjawab "kenapa atap ini benar" dan berbeda satu sama lain; (4) cari bukti tiap pilar di tabel janji dan bukti (hlm. 5); belum ada, tambah barisnya; (5) satu pintu; (6) cek dua arah di kotak <b>ASAL DAN BUKTI TIAP PILAR</b>: ke atas (kalau pilar dicabut, atap lebih lemah?) dan ke bawah (asal dan baris buktinya bisa ditunjuk?).</p>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> workbook sendiri menyebutnya: <i>"This becomes your entire Session 6 campaign — build it well now."</i> Rumah ini menjadi kerangka kampanye Sesi 6, dan menjadi bahan pesan di brief Sesi 4.</p>
<p>Di Gate 2, tes <b>Platform</b> memeriksa apakah setiap pilar bisa ditunjuk <b>asal dan buktinya</b>. Panel di atas menampilkan PROMISE, REASONS TO BELIEVE, dan PROMISE → PROOF-mu; kotak di bawah Message House mencatat asal dan baris bukti tiap pilar.</p>`,
        deeper: {
          summary: "Deeper read — mengubah kelemahan jadi pesan: kapan sah, kapan jadi eufemisme",
          html: `
<p>Salah satu pilar yang paling sering jadi titik ajar terbaik adalah pilar yang berangkat dari fakta <b>terlemah</b> di platform, misalnya daftar merchant yang hanya 50, lalu dibingkai ulang jadi pesan positif (bukan "cuma 50", tapi "sudah diseleksi").</p>
<p><b>Teknik ini sah hanya kalau dua syarat terpenuhi bersamaan:</b></p>
<ul>
<li>Reframing-nya <b>benar</b> dari sudut pandang audiens: daftar pendek yang diseleksi memang jadi manfaat nyata, bukan sekadar permainan kata.</li>
<li>Kelemahan di baliknya sedang <b>diperbaiki</b>, bukan dibiarkan kecil selamanya sambil terus memakai bingkai yang sama.</li>
</ul>
<p>Begitu salah satu syarat hilang, kalimat yang sama berhenti jadi pesan jujur dan menjadi eufemisme. Teknik ini juga bekerja sekali, pada satu kelemahan. Dipakai di ketiga pilar sekaligus, kesannya tim tidak mau mengakui apa pun yang kurang.</p>
<p>Dua jebakan lain dari contoh: pilar yang memasarkan <b>opsi</b> (bukan fitur) harus ditulis supaya penonton yang mengabaikannya tetap merasa filmnya utuh; dan rumah yang semua pilarnya adalah variasi satu klaim itu koheren sekaligus sempit.</p>`
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Tiap pilar punya asal di kotak ASAL DAN BUKTI TIAP PILAR? Kalau tidak bisa ditunjuk, itu ide baru yang menyelinap lewat pintu belakang.",
            "Tiap pilar punya baris di tabel janji dan bukti (hlm. 5), dan proof point-nya tidak mengklaim lebih dari baris itu?",
            "Kalau atap dihapus, apakah ketiga pilar masih menunjuk ke hal yang sama?",
            "Tiap proof point bisa dicek orang luar? Proof yang masih rencana sudah diberi tanda?",
            "Hanya ada satu ajakan utama di CTA, dan ia melayani atap?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "The roof and pillars that become Session 6's entire campaign skeleton.", caveat: CAVEAT,
            values: {
              "s3.p6.roof": "“A family film made in Indonesia, at world-class quality.”",
              "s3.p6.pillar1": "Behind the craft — The years of work and the people who did it — from the reasons-to-believe box.",
              "s3.p6.pillar2": "A story for the family — One film that works for children and parents at the same time — straight from Session 2's VPC.",
              "s3.p6.pillar3": "Proudly ours — The cultural pride angle, aimed at Session 2's secondary audience — from the purpose box.",
              "s3.p6.proof1": "Years of production, named production companies, technical detail.",
              "s3.p6.proof2": "Dual-layered emotional storytelling designed for both audiences at once.",
              "s3.p6.proof3": "Made by Visinema Studios, an Indonesian studio, with Indonesian writers. Whether the story is wholly original: UNKNOWN.",
              "s3.p6.cta": "Watch the making-of, then bring the whole family.",
              "s3.p6.origins": { label: "ASAL DAN BUKTI TIAP PILAR", cols: ["Pilar", "Asal", "Baris bukti (hlm. 5)"], rows: [["PILLAR 1 · Behind the craft", "Kotak Reasons to Believe (hlm. 4)", "Baris 1: World-class quality — Nyata, not yet public"], ["PILLAR 2 · A story for the family", "Kebutuhan audiens: gains (Sesi 2 hlm. 5)", "Baris 4: A story for the whole family — UNKNOWN, still design intent"], ["PILLAR 3 · Proudly ours", "Kotak Purpose (hlm. 4)", "Baris 3: Made in Indonesia — Nyata"]] }
            },
            anno: { "s3.p6.roof": "Roof v2 (proposed), aligned with the v2 positioning. The earlier roof ('Proof that Indonesian stories can be told at world-class quality') leaned on 'Indonesian stories', which Pixar can also make feel local.", "s3.p6.proof3": "Changed with v2: the earlier proof point claimed an 'original' story, which page 5 marks UNKNOWN. A proof point cannot claim more than its row." },
            note: "Notice how this house was built: not top-down, but by harvesting three ideas that already existed on earlier pages and checking they support the same roof. Each pillar traces to a different box — none were invented fresh for the campaign. Pillar 2's proof is still design intent: its row says so."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "The roof and pillars that become Session 6's entire campaign skeleton.", caveat: CAVEAT,
            values: {
              "s3.p6.roof": "“The app you already trust now brings the food too.”",
              "s3.p6.pillar1": "No new app, no new setup — The barrier to trying it once is nearly zero.",
              "s3.p6.pillar2": "The drivers are already outside — Delivery speed is inherited from the ride network, not built from scratch.",
              "s3.p6.pillar3": "We checked these places first — A short, vetted list instead of a long, unreliable one.",
              "s3.p6.proof1": "Saved address and GoPay balance already in the account — nothing to enter.",
              "s3.p6.proof2": "Existing GoRide fleet density in the pilot district.",
              "s3.p6.proof3": "Curated 50-merchant pilot. Honest weakness: 50 is small, and the team says so.",
              "s3.p6.cta": "Try one order from the home screen.",
              "s3.p6.origins": { label: "ASAL DAN BUKTI TIAP PILAR", cols: ["Pilar", "Asal", "Baris bukti (hlm. 5)"], rows: [["PILLAR 1 · No new app, no new setup", "Kotak WHERE WE WIN (hlm. 3)", "Baris 1: One-tap ordering — Nyata"], ["PILLAR 2 · The drivers are already outside", "Kotak Reasons to Believe (hlm. 4)", "Baris 2: Drivers already nearby — Nyata"], ["PILLAR 3 · We checked these places first", "Kotak WHAT WE MUST MATCH / parity (hlm. 3)", "Baris 4: We checked these places first — Nyata, added for this pillar"]] }
            },
            note: "Pillar 3 is the interesting one. It turns the weakest fact on the whole platform — a tiny merchant list — into a message, by reframing 'few' as 'checked'. That is legitimate. It stops being legitimate the moment the list stays small after launch."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "The roof and pillars that become Session 6's entire campaign skeleton.", caveat: CAVEAT,
            values: {
              "s3.p6.roof": "“You don't need to know anything to start here.”",
              "s3.p6.pillar1": "A man, not a myth — Grounded tone, real-world stakes, no mythology to catch up on.",
              "s3.p6.pillar2": "Come for him — The lead performance is the reason to buy the ticket, not the character's history.",
              "s3.p6.pillar3": "There's more, if you want it — The universe is offered, never required.",
              "s3.p6.proof1": "The script's contained, single-location origin structure.",
              "s3.p6.proof2": "Casting choice and early footage reactions (industry only — flagged in Session 2).",
              "s3.p6.proof3": "A post-credits scene the audience can skip without losing anything.",
              "s3.p6.cta": "Watch the trailer — it explains itself — then see it opening weekend.",
              "s3.p6.origins": { label: "ASAL DAN BUKTI TIAP PILAR", cols: ["Pilar", "Asal", "Baris bukti (hlm. 5)"], rows: [["PILLAR 1 · A man, not a myth", "Kotak Personality (hlm. 4)", "Baris 1: You can start here — Nyata, visible after viewing"], ["PILLAR 2 · Come for him", "Kotak Reasons to Believe (hlm. 4)", "Baris 2: Worth your ticket — UNKNOWN"], ["PILLAR 3 · There's more, if you want it", "Kotak Mission (hlm. 4)", "Baris 3: More to come, if you want it — Nyata"]] }
            },
            note: "Pillar 3 is doing something unusual: it markets an option, not a feature. It has to be worded so that a viewer who ignores it entirely still feels the film was complete. Written slightly wrong, this same pillar becomes the homework threat the whole platform was built to avoid."
          },
          lego: {
            name: "LEGO Technic", sub: "The roof and pillars that become Session 6's entire campaign skeleton.", caveat: CAVEAT,
            values: {
              "s3.p6.roof": "“Advanced should mean it works — not that it costs more.”",
              "s3.p6.pillar1": "Watch the mechanism — Show the function moving before anyone is asked to pay for it.",
              "s3.p6.pillar2": "Priced by function — The price list is defended by a function list.",
              "s3.p6.pillar3": "Still a LEGO set — The new complexity does not cost the reliability they already rely on.",
              "s3.p6.proof1": "Pre-launch demo to hobbyist reviewers. Planned for the build phase — not yet scheduled.",
              "s3.p6.proof2": "Published function-per-tier breakdown. Honest gap: buyers still take the costing on trust.",
              "s3.p6.proof3": "Decades of fit and durability standard — inherited, not earned here.",
              "s3.p6.cta": "Watch the mechanism run, then compare the function list.",
              "s3.p6.origins": { label: "ASAL DAN BUKTI TIAP PILAR", cols: ["Pilar", "Asal", "Baris bukti (hlm. 5)"], rows: [["PILLAR 1 · Watch the mechanism", "Kotak WHERE WE WIN (hlm. 3)", "Baris 2: It actually works — PLANNED"], ["PILLAR 2 · Priced by function", "Kotak Promise (hlm. 4)", "Baris 1: Price buys function — Nyata, internal only"], ["PILLAR 3 · Still a LEGO set", "Kotak WHAT WE MUST MATCH / parity (hlm. 3)", "Baris 3: Still a LEGO set — Nyata, inherited"]] }
            },
            note: "All three pillars are variations of one claim: the price is honest. That is a coherent house, and it is also a narrow one. If a hobbyist decides the price is fair after five minutes, this house has nothing left to say to them — which is a real risk the team should carry into Session 6."
          }
        }
      },

      /* ================= hlm. 7 — Strategic Critique — Gate 2 Check ================= */
      7: {
        theory: {
          title: "Baca ini dulu",
          src: "Silabus §8 Sesi 3 (aktivitas Strategic critique) dan §13 (Gate 2)",
          html: `
<p>Yang dinilai di halaman ini adalah <b>kalimat positioning</b> (hlm. 2). Minta <b>minimal dua teman dari kelompok lain</b> membacanya, lalu setiap teman mengisi <b>satu form</b> langsung di app ini: nama, NIM, email, skor 1–5 untuk lima kriteria, dan satu kalimat alasan per skor. Untuk CREDIBLE, penilai boleh melihat tabel janji dan bukti (hlm. 5).</p>
<ul>
<li><b>CLEAR</b> — bisa dipahami dalam sekali baca?</li>
<li><b>RELEVANT</b> — sesuai kebutuhan audiens yang sudah ditemukan tim?</li>
<li><b>DISTINCTIVE</b> — bisakah pesaing mengucapkan kalimat ini?</li>
<li><b>CREDIBLE</b> — apakah buktinya benar-benar ada?</li>
<li><b>COMMERCIALLY USEFUL</b> — apakah kalimat ini memberi tahu desainer dan penjual apa yang harus dilakukan?</li>
</ul>
<p>Lima kriteria ini dari silabus (aktivitas <i>Strategic critique</i>), kata yang sama dipakai di rubrik akhir. Pembuat kalimat selalu merasa kalimatnya jelas karena tahu maksudnya; orang luar membaca apa yang benar-benar tertulis.</p>
<p><b>Membaca hasil:</b> app menghitung rata-rata semua penilai per kriteria. <b>Rata-rata 2 atau lebih rendah = rendah.</b> Tidak ada kriteria rendah: catat masukannya. Satu kriteria rendah: sebaiknya diperbaiki. <b>Dua kriteria rendah atau lebih: wajib rencana untuk setiap kriteria itu</b> (apa, siapa, kapan). Rencana itu menjadi bagian kondisi Gate 2.</p>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> form ini <b>masukan, bukan Gate 2</b>. Gate 2 (silabus §13) adalah <i>"sufficient audience evidence and a defendable positioning"</i>, dan dibaca dari dokumenmu di luar kelas lewat tiga tes: <b>Evidence</b> (Sesi 2 dan catatan wawancara mentah), <b>Positioning</b> (hlm. 2, termasuk rencana untuk kriteria rendah dari form ini), dan <b>Platform</b> (hlm. 4–6).</p>
<p>Skor rendah tidak membuat gagal; skor rendah <b>tanpa rencana</b> yang membuat gagal. Sebaliknya, form yang bagus tidak menutup kekurangan bukti: ambang Tes 1 sama untuk semua tim (minimal dua jenis bukti, minimal satu dari audiens utama di luar tim).</p>`,
        deeper: {
          summary: "Deeper read — kenapa kartu BUKAN Gate 2, dan skor rendah mana yang murah diperbaiki",
          html: `
<p>Sebuah tim bisa lolos aturan form penilai dan <b>tetap</b> punya celah di Gate 2 kalau bukti audiensnya belum cukup: form penilai hanya menguji separuh syarat Gate. Sebaliknya, skor rendah tidak otomatis berarti Gate gagal.</p>
<p><b>Pilah skor rendah jadi tiga jenis sebelum bertindak:</b></p>
<ul>
<li>Masalah <b>tulisan</b> (Clear, Relevant, Distinctive, Commercially useful rendah) — murah, bisa diperbaiki dalam satu rapat tim. Contoh LEGO Technic: sentence v1 memuat dua gagasan, ditulis ulang jadi satu.</li>
<li>Masalah <b>bukti</b> (Credible rendah) — butuh fieldwork dengan orang di luar tim yang belum dikerjakan siapa pun. Menulis ulang kalimat tidak memperbaikinya. Contoh Gojek: bukti ada untuk ride, bukan untuk food.</li>
<li>Masalah <b>keputusan</b> — tim belum memilih. Ini yang paling mahal.</li>
</ul>
<p>Kesalahan paling umum: menghabiskan seminggu menulis ulang kalimat, padahal yang gagal adalah ketiadaan bukti. Kalimat yang ditulis ulang tiba di Sesi 4 dengan skor yang sama persis.</p>`
        },
        callout: "<b>Cara mengisi:</b> penilai yang mengisi form, bukan pemilik file. Karena kelas online, serahkan perangkatmu ke penilai atau beri akses kendali layar saat ia mengisi. NIM penilai dicek saat Gate 2 dibaca: harus terdaftar dan dari kelompok lain. Teman satu kelompok tidak boleh menilai.",
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Minimal dua penilai dari kelompok lain sudah mengisi form, masing-masing dengan alasan untuk setiap skor?",
            "Kamu bisa memilah tiap kriteria rendah: masalah tulisan (Clear, Distinctive) atau masalah bukti (Credible, Relevant)?",
            "Untuk dua kriteria rendah atau lebih, setiap kriteria punya rencana: apa, siapa, kapan?",
            "Kamu tidak memperlakukan skor penilai sebagai status Gate 2?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Scored by two classmates from other groups. Not a clean sweep of 5s: that is the honest part." + SUB2, caveat: CAVEAT,
            values: {
              "s3.p7.reviews": { label: "FORM PENILAI", cols: ["Kriteria", "Penilai 1 (skor kartu worked example)", "Penilai 2 (ILUSTRASI, bukan data)", "Rata-rata"], rows: [["Identitas", "Penilai Contoh 1 · NIM 0000000001 · contoh1@example.com", "Penilai Contoh 2 (ILUSTRASI) · NIM 0000000002 · contoh2@example.com", "—"], ["CLEAR", "4 — Mostly clear: 'world-class production standards' could be one notch more specific.", "4 — Clear on first read; 'world-class' is still a little general.", "4"], ["RELEVANT", "5 — Matches Session 2's evidence and chosen primary audience directly.", "4 — Matches the families chosen in Session 2, but the doubt it answers is still an assumption.", "4,5"], ["DISTINCTIVE", "4 — 'Made by an Indonesian studio' is the part Pixar cannot claim.", "3 — That one part holds; the rest of the sentence any studio could say.", "3,5"], ["CREDIBLE", "3 — Proof EXISTS but nothing has been shown publicly yet: still genuinely unproven.", "3 — Years of production can be checked; the quality itself has not been seen.", "3"], ["COMMERCIALLY USEFUL", "4 — Gives clear direction to design and marketing teams for Session 4.", "4 — Tells design to show the studio and the craft; tells sales who to target.", "4"]] },
              "s3.p7.plans": "No criterion averages 2 or lower, so no plan is required. Credible averages 3: the proof exists but the world hasn't tested it; no rewrite fixes that."
            },
            note: "Gate 2 dibaca dari dokumen, bukan dari form penilai. TEST 1 · EVIDENCE: GAP. Two kinds on file: comparable-film data (Frozen 2 held Indonesia's animated-film record until Jumbo) and competitor analysis (the Session 2 benchmark). From parents OUTSIDE the team: UNKNOWN. Interview notes are not reproduced for a real brand. TEST 2 · POSITIONING: PASS. Every blank traces to Session 1–2 (the insight is marked as an assumption). Pixar can't claim 'made by an Indonesian studio'. No two low criteria. TEST 3 · PLATFORM: PASS. Purpose passes the refusal test; each pillar has an origin and a row on page 5. RTB are real but not yet public. Next action: 5 parent interviews (Session 2 plan), past behaviour only. Owner: producer. Closing test: 3 or more of 5 say they skipped a local film on looks alone; if fewer, rewrite the BUT. Test 1 stays UNKNOWN by design: we do not invent interviews for a real brand. The threshold is the same for all four cases."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Scored by two classmates from other groups. Two criteria average 2 or lower, so each gets its own plan." + SUB2, caveat: CAVEAT,
            values: {
              "s3.p7.reviews": { label: "FORM PENILAI", cols: ["Kriteria", "Penilai 1 (skor kartu worked example)", "Penilai 2 (ILUSTRASI, bukan data)", "Rata-rata"], rows: [["Identitas", "Penilai Contoh 1 · NIM 0000000001 · contoh1@example.com", "Penilai Contoh 2 (ILUSTRASI) · NIM 0000000002 · contoh2@example.com", "—"], ["CLEAR", "5 — A rider understands it in one read. No jargon, no abstraction.", "4 — Understandable in one read, slightly long.", "4,5"], ["RELEVANT", "4 — Matches Session 2's primary audience and their stated pain exactly.", "4 — Matches riders' pain about re-entering details.", "4"], ["DISTINCTIVE", "2 — Another super-app could say a near-identical sentence. 'Convenience' is the most crowded claim in the category.", "2 — GrabFood could say almost the same sentence inside the Grab app.", "2 · rendah"], ["CREDIBLE", "2 — Proof exists for RIDES, not for FOOD, and the claim is about food. Still zero diner interviews.", "1 — Nothing shows the food side works; no diner has been asked.", "1,5 · rendah"], ["COMMERCIALLY USEFUL", "4 — Tells a designer to keep the existing UI and a seller to target existing riders first.", "3 — Clear for design; sellers still don't know what to say about food quality.", "3,5"]] },
              "s3.p7.plans": { label: "RENCANA UNTUK KRITERIA RENDAH", items: ["DISTINCTIVE (rata-rata 2) — Apa: rewrite the sentence around one idea only GoFood can claim (the vetted launch list) and ask both reviewers to re-score it. Siapa: brand lead. Kapan: before the Session 4 brief is written. A writing fix: cheap.", "CREDIBLE (rata-rata 1,5) — Apa: 5 interviews with GoRide riders outside the team about their last food order, past behaviour only. Siapa: GoFood product lead. Kapan: before Gate 2 is read again. An evidence fix: no rewrite can close it."] }
            },
            note: "Gate 2 dibaca dari dokumen, bukan dari form penilai. TEST 1 · EVIDENCE: GAP. On file: public competitor data (GrabFood, GoFood and ShopeeFood all widely used — Snapcart 2021) and Session 2 GoRide usage data. From GoRide riders OUTSIDE the team on food ordering: UNKNOWN. TEST 2 · POSITIONING: PASS. Blanks trace to Session 2 (the category sentence is still empty there: a gap). Only another super-app could copy the sentence, and the team wrote that down. Two criteria average 2 or lower (Distinctive, Credible), and each has a plan. Without the plans, Test 2 would fail. TEST 3 · PLATFORM: PASS. Canvas is coherent (refuse a separate app → reuse before rebuild → works like rides). RTB prove the delivery mechanism, not the food: flagged. ‘Reliable food’ already shrunk to the pilot district. Pillar 3 has its own row. Fix shown, not hidden — draft v2 (one idea: the vetted list): “For GoRide riders in our pilot district who worry a first food order will go wrong, GoFood is the in-app food service that opens with only merchants we checked first, because the 50-merchant launch list was vetted before any rider saw it.” Not yet re-scored. Closing test for the interviews: 3+ of 5 describe hesitating to order food after a bad delivery; if fewer, rewrite the BUT."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Scored by two classmates from other groups. Only one low criterion: the form raises no required plan, the Gate still can." + SUB2, caveat: CAVEAT,
            values: {
              "s3.p7.reviews": { label: "FORM PENILAI", cols: ["Kriteria", "Penilai 1 (skor kartu worked example)", "Penilai 2 (ILUSTRASI, bukan data)", "Rata-rata"], rows: [["Identitas", "Penilai Contoh 1 · NIM 0000000001 · contoh1@example.com", "Penilai Contoh 2 (ILUSTRASI) · NIM 0000000002 · contoh2@example.com", "—"], ["CLEAR", "4 — Understandable in one read, though 'without homework' is casual language for a strategy document.", "4 — Clear; 'without homework' is casual but understandable.", "4"], ["RELEVANT", "3 — Matches the audience the team CHOSE, but Session 2 marked that audience's evidence as UNKNOWN.", "3 — Fits the chosen audience; their evidence is still UNKNOWN.", "3"], ["DISTINCTIVE", "5 — No other film in the category can claim it assumes zero prior knowledge.", "4 — Hard for a sequel to claim; another first film of an unknown hero could get close.", "4,5"], ["CREDIBLE", "1 — No general-audience screening has happened. Every reason to believe is only visible after the ticket is bought.", "2 — Only the script supports it, and only after you have watched.", "1,5 · rendah"], ["COMMERCIALLY USEFUL", "4 — Gives marketing a clear instruction: sell the man, not the mythology.", "4 — Tells marketing to sell the man, not the mythology.", "4"]] },
              "s3.p7.plans": "Only CREDIBLE averages 2 or lower (1,5), so a plan is advised, not required. But the form is a tool, not the Gate: Gate 2 also asks for sufficient audience evidence."
            },
            note: "Gate 2 dibaca dari dokumen, bukan dari form penilai. TEST 1 · EVIDENCE: GAP. On file: two comparables, both secondary market data — Hellboy (2004) $99.8M worldwide on a $60M budget; Blade (1998) $131.2M on $45M. Same KIND twice. Moviegoers outside the team: UNKNOWN. TEST 2 · POSITIONING: PASS. Blanks trace to Session 2. ‘Assumes you know nothing’ can't be claimed by a famous-hero adaptation or a sequel. Only Credible averages 2 or lower; Relevant averages 3 because audience evidence is thin. TEST 3 · PLATFORM: PASS. Canvas coherent (character over fame → no homework → you can start here). RTB are visible only after purchase: flagged. Pillar 2's row is UNKNOWN and shrunk. The form passes, but Gate 2 asks for two KINDS of evidence, one from the primary audience outside the team. Only one kind is on file. Next action: 5 interviews or a screening with moviegoers who do NOT read comics (Session 2 plan). Owner: marketing lead. Closing test: 3+ of 5 can say what the film is about and would buy a ticket; if fewer, rewrite the BUT. Hellboy is a Dark Horse comic (Sony); Blade has Marvel Comics source material but was made by New Line — neither is a Marvel Studios film. Secondary data (The Numbers); gross vs budget ignores marketing."
          },
          lego: {
            name: "LEGO Technic", sub: "Scored by two classmates from other groups on v1 of the sentence. Note WHERE the low score sits: on CLEAR (the writing), not on CREDIBLE." + SUB2, caveat: CAVEAT,
            values: {
              "s3.p7.reviews": { label: "FORM PENILAI", cols: ["Kriteria", "Penilai 1 (skor kartu worked example)", "Penilai 2 (ILUSTRASI, bukan data)", "Rata-rata"], rows: [["Identitas", "Penilai Contoh 1 · NIM 0000000001 · contoh1@example.com", "Penilai Contoh 2 (ILUSTRASI) · NIM 0000000002 · contoh2@example.com", "—"], ["CLEAR", "2 — Two ideas fighting in one sentence: the audience benefit and the pricing logic. Needs a second read.", "2 — I had to read it twice: benefit and price logic compete.", "2 · rendah"], ["RELEVANT", "5 — Points straight at Session 2's riskiest assumption: willingness to pay for real added function.", "4 — Speaks to the price scepticism named in Session 2.", "4,5"], ["DISTINCTIVE", "4 — No direct competitor claims price-set-by-function; scale-model kits can't, core LEGO doesn't.", "4 — Scale kits can't claim working function; mechanical kits can't claim LEGO fit.", "4"], ["CREDIBLE", "3 — The strongest proof, the reviewer demo, is planned, not done.", "3 — Fit tolerance is real; the demo is only planned.", "3"], ["COMMERCIALLY USEFUL", "5 — Tells the design team what to build and the pricing team what it may not do.", "4 — Design knows what to show; pricing knows its limit.", "4,5"]] },
              "s3.p7.plans": "Only CLEAR averages 2 or lower (2), so no plan is required. The fix is cheap and is shown on page 2: one idea per sentence."
            },
            note: "Gate 2 dibaca dari dokumen, bukan dari form penilai. TEST 1 · EVIDENCE: PASS. Community feedback from Technic hobbyists outside the team (public Brickset reviews of existing sets) plus competitor analysis (Mould King, CaDA, Liebherr set). Price tolerance at the flagship price: UNKNOWN → Gate 4. TEST 2 · POSITIONING: PASS. Competitor test holds (scale kits are static, core LEGO is not priced on function). One low criterion on v1 (Clear). v2 keeps one idea; not yet re-scored. TEST 3 · PLATFORM: PASS. The most internally consistent canvas of the four. RTB: two of three real; the reviewer demo is PLANNED with an owner, its date not set yet. The message house is narrow: one claim, ‘the price is honest’. All three tests pass; the open items are next actions, not conditions: a peer re-score of v2 (owner: brand lead) and scheduling the pre-launch reviewer demo (owner: product lead, date UNKNOWN). Pricing test belongs to Gate 4. A pass still carries UNKNOWNs: it means the evidence and the sentence are good enough to build Session 4 on, not that the strategy is proven."
          }
        }
      }
    }
  };
})();
