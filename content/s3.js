/* content/s3.js — teks Sesi 3: teori, kenapa penting, deeper read, cek terbalik, contoh empat kasus.
 * Sumber teori: Sesi-3-Bedah-Mendalam_v4.md (Keller & Swaminathan, 2020, Strategic Brand Management ed. 5;
 * Aaker, 2014, Aaker on Branding), silabus §8 Sesi 3 (SLO, CLO 2, enam In-Class Tools) dan §13 (Gate 2),
 * dan deeper-read dari claude/S3-workbook-tool_v2.html.
 * Contoh: verbatim dari S3-worked-example-{Jumbo,Gojek,DisneyMarvel,LEGO-Technic}-v2.pptx (14 Okt 2026).
 *  - Slide 8 (Gate 2 Verdict) TIDAK ditampilkan dengan baris STATUS-nya. Hanya isi ketiga tes dan jenis tindak lanjut,
 *    tanpa tanggal; tanggal tenggat diganti kalimat tanpa tanggal.
 *  - Tanggal kalender dihapus dari seluruh contoh (kontrak v3.2 butir 8).
 *  - Posisi slider: hanya sebagian yang tertulis sebagai angka di slide; sisanya estimasi (dicatat di ex.note hlm. 5).
 * Konten tidak boleh memuat tanggal kalender atau kata status Gate.
 */
window.CB = window.CB || {}; CB.content = CB.content || {};
(function () {
  var CAVEAT = "Contoh ini rekonstruksi ilustratif, bukan data bersumber. Tiru cara berpikirnya, bukan angkanya.";
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
<li>Template satu kalimat: <i>For [segment] who [insight], [name] is the [category] that [benefit], because [proof].</i> Tiap blank harus datang dari Sesi 2.</li>
<li>Cara mengerjakan: <b>tiap anggota menulis drafnya sendiri dulu, tanpa diskusi</b>. Baru kemudian digabung jadi satu kalimat tim. Perbedaan antar-draf itulah yang mengasah kalimatnya.</li>
<li>Uji pesaing setelah kalimat jadi: <i>"Could a competitor say this exact sentence?"</i> Kalau bisa, ia masih deskripsi kategori. Sebutkan satu hal di kalimatmu yang pesaing benar-benar <b>tidak bisa</b> klaim.</li>
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
        callout: "<b>Urutan kerja yang diajarkan di kelas:</b> kerjakan <b>hlm. 3</b> (kolom difference memasok blank [benefit]) dan kotak <b>PURPOSE</b> di hlm. 4 lebih dulu, baru kembali ke halaman ini. Nomor halaman bukan urutan pengerjaan.",
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Tiap blank bisa kamu tunjuk asalnya di Sesi 2 (primary audience, insight sentence, kategori, kolom difference)?",
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
              "s3.p2.draft": { label: "WHERE EACH BLANK CAME FROM", text: "Segment = Session 2's primary audience (families with young children). Insight = first half of Session 2's insight: “Indonesian parents want cinema outings that feel culturally theirs, BUT quality family films are almost all imported…” Category = Session 2's competitor-matrix frame. Proof = checkable: years of production at Visinema Studios." },
              "s3.p2.final": "For Indonesian families who want cinema outings that feel culturally theirs, Jumbo is the animated family film that proves local stories can be told at world-class quality, because it has been in production for years at Visinema Studios.",
              "s3.p2.test": "Could a competitor say this exact sentence? Imported studios can't claim 'our culture.' Local studios without the same production investment can't claim 'world-class quality' with equal credibility. Notice this blocks TWO different competitors for TWO different reasons — a sentence that only disqualifies one kind of rival usually just relocates the fight."
            },
            note: "Every blank traces back to Session 2. A blank that cannot be traced means the earlier work was invented, not researched."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Merged after solo drafts: the disagreement between drafts is what sharpened this.", caveat: CAVEAT,
            values: {
              "s3.p2.draft": { label: "WHERE EACH BLANK CAME FROM", text: "Segment + insight = Session 2's primary audience (existing GoRide riders) and their pain: not wanting to re-enter payment or address details. Category = 'food-ordering service', the frame diners already use. Proof = saved addresses, GoPay balance, live driver fleet — all real today, all verifiable." },
              "s3.p2.final": "For existing GoRide riders who want food to arrive with the same effort as booking a ride, GoFood is the food-ordering service that lives inside the app they already use, because their address, their payment method, and the drivers are already there today.",
              "s3.p2.test": "Could a competitor say this exact sentence? A dedicated food app cannot — it has to be downloaded and set up first. A warung cannot — no driver network. But another super-app COULD say a near-identical sentence tomorrow. The team wrote that down honestly instead of pretending otherwise."
            },
            note: "Every blank traces back to Session 2. A blank that cannot be traced means the earlier work was invented, not researched."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Watch what is deliberately LEFT OUT of the positioning sentence: the connected universe appears nowhere in it, on purpose.", caveat: CAVEAT,
            values: {
              "s3.p2.draft": { label: "WHERE EACH BLANK CAME FROM", text: "Segment + insight = Session 2's primary audience and their named pain: not wanting to feel they need to read comics first. Category = 'superhero film', the frame the audience will use whether the studio likes it or not. Proof = the script structure and the casting — both real decisions already made. The connected universe is deliberately excluded: naming it would create the exact homework fear the sentence exists to remove." },
              "s3.p2.final": "For moviegoers who want a great blockbuster without homework, Iron Man is the superhero film that works completely on its own, because it is a self-contained origin story carried by a lead performance that assumes you know nothing.",
              "s3.p2.test": "Could a competitor say this exact sentence? An adaptation of a famous hero cannot claim 'assumes you know nothing' — its whole marketing rests on you already knowing. A sequel cannot. That is the block. The uncomfortable part: this sentence is a claim about an ABSENCE, which is much harder to put in a trailer than a presence."
            },
            note: "Every blank traces back to Session 2. A blank that cannot be traced means the earlier work was invented, not researched."
          },
          lego: {
            name: "LEGO Technic", sub: "The first version of this sentence packed two ideas and scored 2 on CLEAR from a peer team. This is the rewrite with one idea; v2 is not yet re-scored.", caveat: CAVEAT,
            values: {
              "s3.p2.draft": { label: "WHERE EACH BLANK CAME FROM", text: "Segment + insight = Session 2's primary audience and their named pain: scepticism that more expensive automatically means more worthwhile. Category = 'building set', not 'toy' — chosen deliberately. Proof = the pre-launch reviewer demo. NOTE: that demo is PLANNED, not done. It is a proof that does not exist yet, and the team labelled it that way instead of writing it as fact." },
              "s3.p2.final": "For experienced Technic builders who doubt that a higher price means more real engineering, the Technic flagship is the building set where every added function can be watched working before you buy, because a pre-launch reviewer demo will show each mechanism moving (PLANNED — not yet held).",
              "s3.p2.test": "Could a competitor say this exact sentence? A scale-model kit cannot — it is detailed but static. A core LEGO set cannot — it is not priced on function. A specialist mechanical kit could claim the function but not the fit tolerance hobbyists take for granted. v1 scored 2 on Clear; rewritten to one idea."
            },
            note: "Every blank traces back to Session 2. A blank that cannot be traced means the earlier work was invented, not researched."
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
              "s3.p3.difference": "A distinctly Indonesian setting, characters, and cultural texture combined with genuinely global-standard production values — a combination no local or imported competitor has yet claimed."
            },
            anno: { "s3.p3.difference": "Notice: the difference column only means something because the parity column is filled first. Difference without parity is just a curiosity." }
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
<p><b>Uji penolakan untuk PURPOSE:</b> <i>"What does this purpose make you REFUSE to do?"</i> Kalau jawabannya "tidak ada", itu good copy, bukan purpose. Penolakan yang sah harus menutup opsi yang <b>tersedia</b>, <b>menguntungkan</b>, dan <b>berbiaya untuk dilepas</b>. "Kami menolak menipu pelanggan" bukan penolakan yang dicari. Tuliskan uji penolakannya di dalam kotak PURPOSE itu sendiri (workbook tidak punya kotak terpisah untuk itu).</p>
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
            "PURPOSE menyebut satu hal yang ditolak, dan hal itu tersedia, menguntungkan, serta berbiaya untuk dilepas?",
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
              "s3.p4.promise": "A film that feels unmistakably Indonesian, made at a quality that needs no apology.",
              "s3.p4.personality": "Warm, proud, quietly confident, never cynical.",
              "s3.p4.rtb": "Years of production (in development since April 2020). Made by Visinema Studios with Springboard Entertainment and Anami Films. Written by Ryan Adriandhy and Widya Arifianti. WEAK SPOT: all checkable, none shown to the public yet."
            },
            note: "Coherence check: purpose (refuses dilution) → personality (never cynical) → promise (needs no apology). Same idea, three boxes."
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
<li>Lalu tulis <b>kenapa</b> di kotak "WHY WE PLACED IT THERE", satu baris per slider, dikaitkan ke positioning statement di hlm. 2.</li>
</ul>
<p><b>2. Promise–Proof Matrix.</b> Daftar semua promise dari kotak PROMISE (hlm. 4), dan di sebelahnya bukti yang <b>nyata dan bernama</b> untuk tiap promise. <i>A promise with no proof isn't strategy — it's hope.</i> Promise tanpa bukti bernama <b>diperkecil sampai jadi benar</b>: bukan dihapus, dan bukan dibiarkan berdiri apa adanya.</p>`
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
            "Promise yang belum punya bukti sudah diperkecil, bukan dihapus dan bukan dibiarkan?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Committed positions on every slider — none of them parked in the middle.", caveat: CAVEAT,
            values: {
              "s3.p5.sliders": { label: "SLIDERS", items: ["Playful ↔ Serious: 30/100", "Mass ↔ Niche: 30/100 (angka dari slide)", "Warm ↔ Cool: 8/100", "Bold ↔ Safe: 15/100", "Modern ↔ Classic: 70/100"] },
              "s3.p5.why_placed": "Mass at 0.30 is off-centre on purpose, and it is the placement worth studying: the team started with a passionate niche — families craving local pride — but aims the whole platform at eventually feeling mass-market natural. That is the RESULT of a decision, not an absence of one, which is what separates it from a slider parked in the middle. Playful-not-silly ties to the parity point on family humour. Bold ties directly to the purpose's ambitious claim, while Classic reflects deliberately conventional storytelling craft.",
              "s3.p5.promise_proof": { items: ["‘World-class quality’ → years of production and the production companies' credits. Real, but not yet public.", "‘Authentically Indonesian’ → a story written for the film by Ryan Adriandhy and Widya Arifianti; whether it is wholly original: UNKNOWN.", "‘A story for the whole family’ → dual emotional layers designed for kids AND parents (Session 2 VPC)."] }
            },
            note: SLIDER_NOTE + " A promise with no named proof gets shrunk until it is true — not deleted, and not left standing as written."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Committed positions on every slider — none of them parked in the middle.", caveat: CAVEAT,
            values: {
              "s3.p5.sliders": { label: "SLIDERS", items: ["Playful ↔ Serious: 62/100 (estimasi)", "Mass ↔ Niche: 12/100 (angka dari slide)", "Warm ↔ Cool: 42/100 (estimasi)", "Bold ↔ Safe: 78/100 (angka dari slide)", "Modern ↔ Classic: 25/100 (estimasi)"] },
              "s3.p5.why_placed": "Mass at 0.12 is the most committed placement on the page — the whole positioning depends on already having millions of riders. Safe at 0.78 is deliberate and is the opposite of the Marvel example: this brand wins by reusing what is proven, so 'bold' would contradict the purpose box. Warm sits near the middle for a reason the team named: functional-first, warm only where it costs nothing.",
              "s3.p5.promise_proof": { items: ["‘One-tap ordering’ → saved addresses and GoPay, live in production today. Real proof.", "‘Drivers already nearby’ → existing GoRide fleet density in Jakarta. Real proof.", "‘Reliable food delivery’ → NO PROOF. Zero diner interviews (Session 2), 50 merchants in one district. The team shrank this promise to ‘reliable in the pilot district first’ rather than delete it."] }
            },
            note: SLIDER_NOTE + " A promise with no named proof gets shrunk until it is true — not deleted, and not left standing as written."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Committed positions on every slider — none of them parked in the middle.", caveat: CAVEAT,
            values: {
              "s3.p5.sliders": { label: "SLIDERS", items: ["Playful ↔ Serious: 32/100 (angka dari slide)", "Mass ↔ Niche: 8/100 (estimasi)", "Warm ↔ Cool: 55/100 (estimasi)", "Bold ↔ Safe: 5/100 (angka dari slide)", "Modern ↔ Classic: 28/100 (estimasi)"] },
              "s3.p5.why_placed": "Bold at 0.05 is the most extreme placement across all four worked examples, and it is honest: Marvel's slate was financed through a $525 million non-recourse debt structure collateralised by film rights to ten characters. Playful at 0.32 is the tone decision that separates it from camp — witty, not silly. Warm slightly past the middle is the one genuinely uncertain placement, and the team flagged it rather than pretending it was decided.",
              "s3.p5.promise_proof": { items: ["‘You can start here’ → the script itself: no prior film required to follow it. Real proof, but only after viewing.", "‘Worth your ticket’ → UNKNOWN. No general-audience test screening has happened (Session 2).", "‘More to come, if you want it’ → a post-credits tease designed to cost nothing to ignore. Real, and cheap to deliver."] }
            },
            note: SLIDER_NOTE + " A promise with no named proof gets shrunk until it is true — not deleted, and not left standing as written."
          },
          lego: {
            name: "LEGO Technic", sub: "Committed positions on every slider — none of them parked in the middle.", caveat: CAVEAT,
            values: {
              "s3.p5.sliders": { label: "SLIDERS", items: ["Playful ↔ Serious: 80/100 (angka dari slide)", "Mass ↔ Niche: 75/100 (angka dari slide)", "Warm ↔ Cool: 68/100 (estimasi)", "Bold ↔ Safe: 62/100 (angka dari slide)", "Modern ↔ Classic: 58/100 (estimasi)"] },
              "s3.p5.why_placed": "Serious at 0.80 inside a toy company is the placement that needs defending, and the team defends it: this sub-line's buyer is an adult who resents being talked down to. Niche at 0.75 is a deliberate rejection of the teen segment scored higher on Attractive in Session 2. Safe at 0.62 is the post-2003 discipline showing up as a personality decision, not just a finance one.",
              "s3.p5.promise_proof": { items: ["‘Price buys function’ → internal cost-to-function mapping. WEAK: the buyer cannot verify it.", "‘It actually works’ → pre-launch reviewer demo. PLANNED, not done — the strongest proof on the page is the one that does not exist yet.", "‘Still a LEGO set’ → decades of fit tolerance. Strongest real proof, and entirely inherited."] }
            },
            note: SLIDER_NOTE + " A promise with no named proof gets shrunk until it is true — not deleted, and not left standing as written."
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
<p><b>Aturan:</b> pilar bukan ide baru. Setiap pilar harus bisa <b>dilacak ke atas</b> ke atap, dan <b>dilacak balik</b> ke kotak yang spesifik di hlm. 4 (Brand Platform), kolom difference di hlm. 3, atau matriks di hlm. 5. Pilar yang tidak mendukung atap adalah gangguan, sebagus apa pun ia berdiri sendiri. Karena itu rumah ini dibangun dengan cara <b>memanen</b> tiga ide yang sudah ada, bukan mengarang pilar baru.</p>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> workbook sendiri menyebutnya: <i>"This becomes your entire Session 6 campaign — build it well now."</i> Rumah ini menjadi kerangka kampanye Sesi 6, dan menjadi bahan pesan di brief Sesi 4.</p>
<p>Di Gate 2, tes <b>Platform</b> memeriksa apakah pilar message house bisa dilacak ke halaman 3–5. Panel di atas menampilkan PROMISE, REASONS TO BELIEVE, dan PROMISE → PROOF-mu, supaya kamu bisa menunjuk dari mana tiap pilar datang.</p>`,
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
            "Tunjuk tiap pilar: ia datang dari halaman dan kotak mana (hlm. 3, 4, atau 5)? Kalau tidak bisa ditunjuk, itu ide baru yang menyelinap lewat pintu belakang.",
            "Kalau atap dihapus, apakah ketiga pilar masih menunjuk ke hal yang sama?",
            "Tiap proof point bisa dicek orang luar? Proof yang masih rencana sudah diberi tanda?",
            "Hanya ada satu ajakan utama di CTA, dan ia melayani atap?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "The roof and pillars that become Session 6's entire campaign skeleton.", caveat: CAVEAT,
            values: {
              "s3.p6.roof": "“Proof that Indonesian stories can be told at world-class quality.”",
              "s3.p6.pillar1": "Behind the craft — The years of work and the people who did it — from the reasons-to-believe box.",
              "s3.p6.pillar2": "A story for the family — One film that works for children and parents at the same time — straight from Session 2's VPC.",
              "s3.p6.pillar3": "Proudly ours — The cultural pride angle, aimed at Session 2's secondary audience — from the purpose box.",
              "s3.p6.proof1": "Years of production, named production companies, technical detail.",
              "s3.p6.proof2": "Dual-layered emotional storytelling designed for both audiences at once.",
              "s3.p6.proof3": "Original Indonesian setting, story, and cultural specificity — not a localised adaptation.",
              "s3.p6.cta": "Watch the making-of, then bring the whole family."
            },
            note: "Notice how this house was built: not top-down, but by harvesting three ideas that already existed on earlier pages and checking they support the same roof. Each pillar traces to a different box — none were invented fresh for the campaign."
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
              "s3.p6.cta": "Try one order from the home screen."
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
              "s3.p6.cta": "Watch the trailer — it explains itself — then see it opening weekend."
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
              "s3.p6.cta": "Watch the mechanism run, then compare the function list."
            },
            note: "All three pillars are variations of one claim: the price is honest. That is a coherent house, and it is also a narrow one. If a hobbyist decides the price is fair after five minutes, this house has nothing left to say to them — which is a real risk the team should carry into Session 6."
          }
        }
      },

      /* ================= hlm. 7 — Strategic Critique — Gate 2 Check ================= */
      7: {
        theory: {
          title: "Baca ini dulu",
          src: "Silabus §13 (Gate 2) dan kartu lima kriteria playbook",
          html: `
<p>Halaman 7 adalah <b>kartu umpan balik sejawat</b>, bukan halaman isian di app ini. Tim lain diberi platform-mu (hlm. 2–6) dan menilai 1–5 pada lima kriteria:</p>
<ul>
<li><b>CLEAR</b> — mudah dipahami dalam satu kali baca?</li>
<li><b>RELEVANT</b> — cocok dengan bukti Sesi 2-mu?</li>
<li><b>DISTINCTIVE</b> — bisakah pesaing mengucapkannya?</li>
<li><b>CREDIBLE</b> — bukti nyatanya ada?</li>
<li><b>COMMERCIALLY USEFUL</b> — memberi instruksi jelas kepada desainer dan tim penjualan?</li>
</ul>
<p>Penilaian dilakukan di workbook tim yang kamu review, sesuai pairing yang diumumkan di chat kelas. App ini tidak menyimpan skor dan tidak menjalankan penilaian sejawat.</p>
<p><b>Aturan kartu:</b> dua kriteria atau lebih bernilai 1–2 berarti tulis rencana singkat untuk kriteria itu: <b>apa, siapa, kapan</b>. Rencana itu menjadi bagian kondisi Gate 2, bukan hukuman.</p>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> kartu ini <b>bukan Gate 2</b>. Gate 2 (silabus §13) adalah <i>"sufficient audience evidence and a defendable positioning"</i>, dan dibaca dari dokumenmu di luar kelas lewat tiga tes: <b>Evidence</b> (workbook Sesi 1–2 dan catatan wawancara mentah), <b>Positioning</b> (hlm. 2), dan <b>Platform</b> (hlm. 4–6). Kartu hanya petunjuk tambahan untuk tes Positioning.</p>
<p>Ambang bukti sama untuk semua tim: menyentuh segmen primer, minimal dua jenis bukti dari daftar silabus §7, dan salah satunya dari audiens primer <b>di luar lingkar tim</b>. Skor kartu yang bagus tidak menutup kekurangan bukti.</p>`,
        deeper: {
          summary: "Deeper read — kenapa kartu BUKAN Gate 2, dan skor rendah mana yang murah diperbaiki",
          html: `
<p>Sebuah tim bisa lolos aturan kartu dan <b>tetap</b> punya celah di Gate 2 kalau bukti audiensnya belum cukup: kartu hanya menguji separuh syarat Gate. Sebaliknya, skor kartu yang rendah tidak otomatis berarti Gate gagal.</p>
<p><b>Pilah skor rendah jadi tiga jenis sebelum bertindak:</b></p>
<ul>
<li>Masalah <b>tulisan</b> (Clear, Relevant, Distinctive, Commercially useful rendah) — murah, bisa diperbaiki dalam satu rapat tim. Contoh LEGO Technic: sentence v1 memuat dua gagasan, ditulis ulang jadi satu.</li>
<li>Masalah <b>bukti</b> (Credible rendah) — butuh fieldwork dengan orang di luar tim yang belum dikerjakan siapa pun. Menulis ulang kalimat tidak memperbaikinya. Contoh Gojek: bukti ada untuk ride, bukan untuk food.</li>
<li>Masalah <b>keputusan</b> — tim belum memilih. Ini yang paling mahal.</li>
</ul>
<p>Kesalahan paling umum: menghabiskan seminggu menulis ulang kalimat, padahal yang gagal adalah ketiadaan bukti. Kalimat yang ditulis ulang tiba di Sesi 4 dengan skor yang sama persis.</p>`
        },
        callout: "<b>Halaman ini tidak punya isian di app.</b> Kerjakan penilaian di workbook tim yang ditugaskan kepadamu, dan baca skor yang masuk ke platform-mu sebagai petunjuk, bukan keputusan Gate.",
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Kamu bisa memilah tiap skor rendah: masalah tulisan, bukti, atau keputusan?",
            "Untuk dua skor 1–2 atau lebih, ada rencana singkat: apa, siapa, kapan?",
            "Kamu tidak memperlakukan skor kartu sebagai status Gate 2?",
            "Hasil kartu sudah dipakai sebagai prioritas perbaikan sebelum Sesi 4?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Scored by a peer team. Not a clean sweep of 5s: that is the honest part.", caveat: CAVEAT, values: {},
            notice: "CLEAR 4 — Mostly clear: 'world-class quality' could be one notch more specific. RELEVANT 5 — Matches Session 2's evidence and chosen primary audience directly. DISTINCTIVE 4 — Strong, though 'quality' claims are common language; the proof is what separates it. CREDIBLE 3 — Proof EXISTS but nothing has been shown publicly yet: still genuinely unproven. COMMERCIALLY USEFUL 4 — Gives clear direction to design and marketing teams for Session 4. Card reading: no score at 1–2. Credible 3 = the proof exists but the world hasn't tested it; no rewrite fixes that.",
            note: "Gate 2 dibaca dari dokumen, bukan dari kartu. TEST 1 · EVIDENCE: GAP. On file: comparable-film data (Frozen 2 held Indonesia's animated-film record until Jumbo) and the Session 2 benchmark. From parents OUTSIDE the team: UNKNOWN. Interview notes are not reproduced for a real brand. TEST 2 · POSITIONING: PASS. Every blank traces to Session 1–2. A competitor can't say ‘our culture’ or match the production claim. TEST 3 · PLATFORM: PASS. Purpose passes the refusal test; the three pillars trace to the RTB, VPC and Purpose boxes. RTB are real but not yet public. Next action: 5 parent interviews (Session 2 plan), past behaviour only. Owner: producer. Closing test: 3 or more of 5 say they skipped a local film on looks alone; if fewer, rewrite the BUT. Test 1 stays UNKNOWN by design: we do not invent interviews for a real brand. The threshold is the same for all four cases."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Scored by a peer team. Two weak scores, both honest: each gets its own plan, owner and date.", caveat: CAVEAT, values: {},
            notice: "CLEAR 5 — A rider understands it in one read. No jargon, no abstraction. RELEVANT 4 — Matches Session 2's primary audience and their stated pain exactly. DISTINCTIVE 2 — Another super-app could say a near-identical sentence. 'Convenience' is the most crowded claim in the category. CREDIBLE 2 — Proof exists for RIDES, not for FOOD, and the claim is about food. Still zero diner interviews. COMMERCIALLY USEFUL 4 — Tells a designer to keep the existing UI and a seller to target existing riders first. Card reading: two criteria scored 2, so each needs a plan. The two fixes differ in kind: Distinctive needs a rewritten sentence, Credible needs fieldwork nobody has done yet. Only one of those can be fixed in a room. The card is feedback, not the Gate.",
            note: "Gate 2 dibaca dari dokumen, bukan dari kartu. TEST 1 · EVIDENCE: GAP. On file: public competitor data (GrabFood, GoFood and ShopeeFood all widely used — Snapcart 2021) and Session 2 GoRide usage data. From GoRide riders OUTSIDE the team on food ordering: UNKNOWN. TEST 2 · POSITIONING: PASS. Blanks trace to Session 2. Only another super-app could copy the sentence, and the team wrote that down. Card: two scores of 2 (Distinctive, Credible), each gets a plan. TEST 3 · PLATFORM: PASS. Canvas is coherent (refuse a separate app → reuse before rebuild → works like rides). RTB prove the delivery mechanism, not the food: flagged. ‘Reliable food’ already shrunk to the pilot district. Two fixes of different kind: a rewrite (cheap) and fieldwork (needs people outside the team). Fix shown, not hidden — draft v2 (one idea: the vetted list): “For GoRide riders in our pilot district who worry a first food order will go wrong, GoFood is the in-app food service that opens with only merchants we checked first, because the 50-merchant launch list was vetted before any rider saw it.” Not yet re-scored. Rider interviews: owner GoFood product lead; closing test: 3+ of 5 describe hesitating to order food after a bad delivery; if fewer, rewrite the BUT."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Scored by a peer team. Not a clean sweep of 5s: that is the honest part.", caveat: CAVEAT, values: {},
            notice: "CLEAR 4 — Understandable in one read, though 'without homework' is casual language for a strategy document. RELEVANT 3 — It matches the audience the team CHOSE, but Session 2 marked that audience's evidence as UNKNOWN, so relevance can't be checked against real data. DISTINCTIVE 5 — No other film in the category can claim it assumes zero prior knowledge. Genuinely uncopyable here. CREDIBLE 1 — No general-audience screening has happened. Every reason to believe is only visible after the ticket is bought. COMMERCIALLY USEFUL 4 — Gives marketing a clear instruction: sell the man, not the mythology. Card reading: only one criterion scored 1–2, so the card alone raises no plan. But the card is a tool, not the Gate: Gate 2 also asks for sufficient audience evidence.",
            note: "Gate 2 dibaca dari dokumen, bukan dari kartu. TEST 1 · EVIDENCE: GAP. On file: two comparables, both secondary market data — Hellboy (2004) $99.8M worldwide on a $60M budget; Blade (1998) $131.2M on $45M. Same KIND twice. Moviegoers outside the team: UNKNOWN. TEST 2 · POSITIONING: PASS. Blanks trace to Session 2. ‘Assumes you know nothing’ can't be claimed by a famous-hero adaptation or a sequel. Card: only Credible is 1; Relevant is 3 because audience evidence is thin. TEST 3 · PLATFORM: PASS. Canvas coherent (character over fame → no homework → you can start here). RTB are visible only after purchase: flagged. Pillar 3 is worded as an option, not a requirement. The card passes, but Gate 2 asks for two KINDS of evidence, one from the primary audience outside the team. Only one kind is on file. Next action: 5 interviews or a screening with moviegoers who do NOT read comics (Session 2 plan). Owner: marketing lead. Closing test: 3+ of 5 can say what the film is about and would buy a ticket; if fewer, rewrite the BUT. Hellboy is a Dark Horse comic (Sony); Blade has Marvel Comics source material but was made by New Line — neither is a Marvel Studios film. Secondary data (The Numbers); gross vs budget ignores marketing."
          },
          lego: {
            name: "LEGO Technic", sub: "Scored by a peer team on v1 of the sentence. Note WHERE the low score sits: on CLEAR (the writing), not on CREDIBLE.", caveat: CAVEAT, values: {},
            notice: "CLEAR 2 — Two ideas fighting in one sentence: the audience benefit and the pricing logic. Long, and needs a second read. RELEVANT 5 — Points straight at Session 2's riskiest assumption: willingness to pay for real added function. DISTINCTIVE 4 — No direct competitor claims price-set-by-function; scale-model kits can't, core LEGO doesn't. CREDIBLE 3 — The strongest proof, the reviewer demo, is planned, not done. Pricing sensitivity remains untested. COMMERCIALLY USEFUL 5 — Tells the design team what to build and the pricing team what it may not do. Card reading (scored on v1): one score of 2, so the card rule triggers no plan. The fix is cheap and is shown on page 2.",
            note: "Gate 2 dibaca dari dokumen, bukan dari kartu. TEST 1 · EVIDENCE: PASS. Community feedback from Technic hobbyists outside the team (public Brickset reviews of existing sets) plus competitor analysis (Mould King, CaDA, Liebherr set). Price tolerance at the flagship price: UNKNOWN → Gate 4. TEST 2 · POSITIONING: PASS. Competitor test holds (scale kits are static, core LEGO is not priced on function). Card scored v1: one score of 2 (Clear). v2 keeps one idea; not yet re-scored. TEST 3 · PLATFORM: PASS. The most internally consistent canvas of the four. RTB: two of three real; the reviewer demo is PLANNED. The message house is narrow: one claim, ‘the price is honest’. All three tests pass; the two open items are next actions, not conditions: a peer re-score of v2 (owner: brand lead) and scheduling the pre-launch reviewer demo (owner: product lead, date UNKNOWN). Pricing test belongs to Gate 4. A pass still carries UNKNOWNs: it means the evidence and the sentence are good enough to build Session 4 on, not that the strategy is proven."
          }
        }
      }
    }
  };
})();
