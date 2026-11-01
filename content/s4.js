/* content/s4.js — teks Sesi 4: teori, kenapa penting, deeper read, cek terbalik, contoh empat kasus. DRAF PERTAMA 30 Okt 2026.
 * Sumber teori: claude/Sesi-4-Bedah-Mendalam_v2.md dan claude/Week3-Sesi4-skrip-final-v2 (Aaker & Joachimsthaler, 2000,
 * California Management Review 42(4); Keller & Swaminathan, 2020, Strategic Brand Management ed. 5; Wheeler, 2017,
 * Designing Brand Identity ed. 5 — lima kriteria nama = "kerangka kelas, bersandar pada Wheeler", bukan kutipan;
 * WIPO, 2017, Making a Mark; UU No. 20/2016 Pasal 1(1), 3, 4, 21(1)(a)), silabus §4, §8 Sesi 4, §13 (Gate 3), §15.
 * Contoh: verbatim dari S4-worked-example-{Jumbo,Gojek,Marvel,LEGO-Technic}-v2.pptx (14 Okt 2026, ekstrak teks Project).
 *  - Tanggal kalender diganti tonggak: "by Fri 13 Nov" → "before Session 5"; "by Wed 11 Nov" / "Wed 11 Nov" → "before Gate 3 is read";
 *    "Wed 18 Nov" → "before Gate 4 is read". Tidak ada perubahan lain pada kalimat contoh.
 *  - Slide 9 (kotak LECTURER'S READING) dan slide 10 (Gate 3 Verdict) TIDAK ditampilkan dengan baris status. Isi ketiga tes
 *    (PASS / PASS WITH CONDITION + alasannya) ditampilkan sebagai catatan hlm. 9, seperti catatan Gate 2 di S3 hlm. 7.
 *  - Slide 11 (Open Actions, Gojek dan LEGO) dirangkum di catatan hlm. 9 tanpa kalimat status.
 *  - Kotak WHAT WE WILL DO ABOUT IT ditampilkan verbatim sebagai satu paragraf; worked example tidak menulis uji penutupan
 *    untuk setiap tindakan, jadi tidak dikarang (lihat anotasi).
 *  - Kolom "Gate 3 test" dan "jawaban yang lolos" di hlm. 9 tidak tertulis per baris di worked example; yang tertulis hanya
 *    jawaban (mis. "NO · PASS"). Tidak dikarang.
 * Konten tidak boleh memuat tanggal kalender atau kata status Gate.
 */
window.CB = window.CB || {}; CB.content = CB.content || {};
(function () {
  var CAVEAT = "Contoh ini rekonstruksi ilustratif: fakta internal tim adalah asumsi pengajaran, fakta publik bersumber di catatan pembicara worked example. Tiru pola berpikirnya, bukan isinya.";
  var ACT_ANNO = "Worked example menulis satu baris per sumber TAKEN atau UNKNOWN: sumber — owner · kapan · closed when. Di app, satu baris tindakan berisi Untuk sumber, Action (apa yang dikerjakan), Owner, Date, dan Closing test (selesai kalau…). Satu sumber, satu baris.";

  CB.content.S4 = {
    pages: {
      /* ================= hlm. 2 — Brand Architecture Map ================= */
      2: {
        theory: {
          title: "Baca ini dulu",
          src: "Aaker & Joachimsthaler (2000), The Brand Relationship Spectrum, California Management Review 42(4); Keller & Swaminathan (2020), Strategic Brand Management, ed. 5",
          html: `
<p>Mulai hari ini dokumenmu <b>dieksekusi orang lain</b>: desainer, animator, penulis konten, vendor merchandise. Ukuran mutunya berubah dari "apakah tim kami paham?" menjadi <b>"could a stranger act on this?"</b> Silabus §4 menyebut peran PM di identitas visual: <i>develop and approve the strategic identity brief</i>, bukan ikut mendesain.</p>
<p>Halaman ini menjawab satu pertanyaan sebelum yang lain: nama-nama di proyekmu saling berhubungan bagaimana? Ada empat model (Aaker & Joachimsthaler, 2000):</p>
<ul>
<li><b>Branded house</b> — satu nama induk, semua produk memakainya (contoh kelas: Gojek, GoRide, GoFood, GoPay).</li>
<li><b>House of brands</b> — tiap produk punya nama sendiri, induknya hampir tidak terlihat.</li>
<li><b>Endorsed</b> — produk punya identitas sendiri, induk muncul sebagai penjamin ("Visinema presents Jumbo").</li>
<li><b>Sub-brand</b> — nama turunan yang selalu menempel ke nama induk (LEGO Technic).</li>
</ul>
<p>Model tidak dipilih dari definisi. Ia dipilih dari <b>dua pertanyaan</b>: seberapa banyak <b>kepercayaan boleh mengalir MASUK</b> dari induk, dan seberapa banyak <b>kerusakan boleh mengalir KELUAR</b> kalau produk ini gagal. Keduanya satu pipa yang dibaca dari dua arah: tidak ada model yang meminjamkan kepercayaan tanpa meminjamkan jalur kerusakan.</p>
<p>Cara mengisi:</p>
<ol>
<li>Tulis induk, produk, dan sub-nama. Sub-nama yang belum diputuskan ditulis <b>UNKNOWN</b>. Jangan mengarang nama supaya peta terlihat lengkap.</li>
<li>Tarik garis di tempat <b>kepercayaan mengalir</b>, bukan di tempat kepemilikan hukum. Ujinya: "Kalau studio kami merilis sesuatu yang buruk besok, apakah judul ini ikut rusak?" Ya = terhubung. Bagan organisasi (studio → divisi → tim) bukan arsitektur brand.</li>
<li>Baru setelah itu pilih model dan tulis kalimatnya: <i>"We are a ___ because ___."</i> Kalau model dipilih lebih dulu, petanya akan digambar untuk membenarkan pilihan itu.</li>
<li>Di kotak terakhir tulis <b>IN</b> (kepercayaan apa yang dipinjamkan induk) dan <b>OUT</b> (kalau produk ini gagal di publik, <b>nama apa lagi</b> yang ikut rusak). OUT harus menyebut nama yang konkret.</li>
</ol>
<p>Proyekmu tidak punya studio? Tulis nama studio kerja timmu. Brand yang sudah ada (milik klien atau orang lain) dibaca sebagai audit: arsitektur yang sekarang, apakah konsisten, dan apa rekomendasimu.</p>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> ini <b>Tes 1 Gate 3 (Brand architecture)</b>. Silabus §13: <i>"The brand architecture, naming direction, and identity brief are strategically coherent."</i> Brief yang sangat baik di atas arsitektur yang tidak koheren tetap tidak lolos. Lolos kalau model ditulis dalam satu kalimat, garis punya alasan kepercayaan atau kerusakan, dan sisi OUT menyebut nama yang konkret.</p>
<p>Keputusan di sini dipakai terus: nama siapa yang dinilai di hlm. 3, apakah logo induk wajib muncul di brief hlm. 5, dan di Sesi 5 (partnership dan IP) siapa yang memegang merek apa. CLO 3 (Cross-Stream Brand Integration) dimulai dari sini.</p>`,
        deeper: {
          summary: "Deeper read — arsitektur internal boleh lebih besar daripada yang dilihat audiens",
          html: `
<p>Contoh Marvel mengajarkan satu hal yang sering salah ditiru. Studio bisa punya peta internal yang besar (rencana film berikutnya, sebuah universe), tetapi yang ditunjukkan ke audiens hanya satu film. Itu sah. Yang <b>tidak</b> sah: meminta audiens percaya pada sebuah universe sebelum mereka percaya pada satu film.</p>
<p>Kalau proyekmu punya lapisan seperti itu (seri, musim berikutnya, karakter lain), tulis lapisannya di peta, dan tulis juga <b>aturan</b> apa yang boleh dilihat audiens, di aset mana, sampai kapan. Lapisan yang aturannya masih niat (belum tertulis) adalah celah di Tes 1, bukan di brief.</p>
<p>Satu tanda bahaya lagi: tim yang menjawab "tidak ada yang rusak" untuk semua pasangan nama. Bisa benar-benar house of brands, bisa juga belum memikirkannya; di kertas keduanya sama. Tanyakan: <i>"Then what is the studio name doing on this page?"</i></p>`
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Petamu terlihat seperti bagan organisasi? Kalau ya, gambar ulang di tempat kepercayaan mengalir.",
            "Model dipilih setelah garis digambar, dan kalimat \"We are a … because …\" menyebut alasan kepercayaan atau kerusakan?",
            "Sisi OUT menyebut nama konkret yang ikut rusak, bukan \"reputasi kami\"?",
            "Sub-nama yang belum diputuskan ditulis UNKNOWN, bukan dikarang?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Lines drawn where trust flows — the model was chosen on the damage question, not the trust one.", caveat: CAVEAT,
            values: {
              "s4.p2.parent": "Visinema Studios — an established Indonesian studio with existing titles in different tones and formats.",
              "s4.p2.product": "Jumbo — a feature animated family film. The title is already public and cannot be changed.",
              "s4.p2.subnames": "Character names, merchandise, a sequel, a school screening programme. None named — UNKNOWN. Owner: marketing lead, before Session 5.",
              "s4.p2.model": "ENDORSED BRAND",
              "s4.p2.model_why": { label: "OUR MODEL — the sentence", text: "“Visinema presents Jumbo.” The title gets its own identity and borrows credibility it hasn't earned yet. Not a branded house: that would force every future Visinema title to inherit Jumbo's family-animation promise — the opposite of what a studio with a varied slate needs." },
              "s4.p2.flows": "IN: Visinema's production credibility makes an unproven title worth an audience's time — this is the obvious benefit, and it's why teams pick endorsed models. OUT: if Jumbo underperforms, Visinema’s next release (UNKNOWN) is not automatically damaged: audiences do not see the two as one line."
            },
            notice: "Notice which question actually decided it. Trust flowing in is available under three of the four models. The model was chosen to LIMIT what flows out — that's the decision a team can defend at Gate 3."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "One name, one trust account — so every line runs both ways, and the damage line is the one to draw.", caveat: CAVEAT,
            values: {
              "s4.p2.parent": "Gojek — trusted for getting around the city. The name, the green, the app icon, saved addresses and the GoPay balance already work.",
              "s4.p2.product": "GoFood — food ordering inside the same app, in pilot with a small merchant list. GoRide and GoPay already sit under the same “Go” prefix.",
              "s4.p2.subnames": "Names a merchant or a driver will see for a food order — none chosen, so UNKNOWN. Owner: GoFood product lead, before Session 5.",
              "s4.p2.model": "BRANDED HOUSE",
              "s4.p2.model_why": { label: "OUR MODEL — the sentence", text: "“One name, one trust account: anything new is Gojek plus a word for what it does.” GoFood has no separate identity, and the team chose that on purpose. Chosen because the same riders use every product." },
              "s4.p2.flows": "IN: the rider’s trust, saved address and GoPay balance — the proof that pillars 1 and 2 of the Message House use. OUT: late, cold or wrong food lands on GoRide and GoPay too, and a payment bug lands on GoFood. The team accepted this and wrote a rule for it (an open action with an owner)."
            },
            anno: { "s4.p2.flows": "Kalimat terakhir di worked example menulis \"(last slide)\": aturan kegagalan pesanan makanan ada di slide Open Actions, dengan owner customer ops lead." },
            notice: "Notice the pipe runs both ways. Choosing a branded house “because it is efficient” is a preference; naming what breaks when GoFood fails in public is the decision."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Lines drawn where trust flows — an architecture bigger inside than outside, on purpose.", caveat: CAVEAT,
            values: {
              "s4.p2.parent": "Marvel Studios — new as a film producer, on a comic name with decades of trust. Iron Man is among the first films it produced itself.",
              "s4.p2.product": "Iron Man — a standalone origin film. The title is the character’s name and is already public.",
              "s4.p2.subnames": "A sequel, a tease, merchandise, a universe layer. The layer has no public name — UNKNOWN. Owner: studio head, after opening weekend.",
              "s4.p2.model": "ENDORSED BRAND + INTERNAL UNIVERSE LAYER",
              "s4.p2.model_why": { label: "OUR MODEL — the sentence", text: "“A Marvel Studios film.” Iron Man gets its own identity and borrows credibility the studio has not yet earned in film. Not a branded house: every future film would inherit Iron Man’s witty, grounded promise. The universe layer stays internal and is not sold to the audience." },
              "s4.p2.flows": "IN: the Marvel name makes the character worth a look for comic readers; general audiences extend little trust yet. OUT: if Iron Man underperforms, the next films and the financing story are hit at once — the slate was financed through one credit facility."
            },
            notice: "Notice what is NOT on the public side of the diagram. The internal map is bigger than the one the audience sees, and that is allowed. What it may not do is ask the audience to believe in a universe before they have believed in one film."
          },
          lego: {
            name: "LEGO Technic", sub: "Lines drawn where trust flows — and the line that carries the proof is shown on the pack.", caveat: CAVEAT,
            values: {
              "s4.p2.parent": "The LEGO Group — trusted for brick fit, durability and the price discipline it learned after its early-2000s financial crisis.",
              "s4.p2.product": "LEGO Technic flagship set — the line’s premium tier, with real motorised mechanics. The Technic name is established and not up for change.",
              "s4.p2.subnames": "A name for the flagship tier, later flagship sets, a function-per-tier list. None named — UNKNOWN. Owner: brand manager, before Session 5.",
              "s4.p2.model": "SUB-BRAND, PARENT MARK ON PACK",
              "s4.p2.model_why": { label: "OUR MODEL — the sentence", text: "“We are a sub-brand because the expert buyer wants an identity of their own, and it must still say LEGO.” The parent mark stays on the pack front. Not stand-alone: the parent’s fit tolerance is our strongest proof, so it must show." },
              "s4.p2.flows": "IN: decades of fit tolerance and durability — the proof that pillar 3 of the Message House (“Still a LEGO set”) depends on. OUT: if the flagship feels like a cash grab, the damage lands on the parent’s price discipline, whether or not the box says LEGO."
            },
            notice: "Notice that the trust line to the parent exists in the buyer’s head either way. The decision is to show it on the pack. Hiding it would keep the risk and lose the proof."
          }
        }
      },

      /* ================= hlm. 3 — Naming Evaluation Matrix ================= */
      3: {
        theory: {
          title: "Baca ini dulu",
          src: "Kerangka penamaan kelas, bersandar pada Wheeler (2017), Designing Brand Identity, ed. 5",
          html: `
<p>Lima kriteria memecah "saya suka nama ini" menjadi lima klaim yang bisa dibantah satu per satu:</p>
<ul>
<li><b>Meaningful</b> — mendukung kalimat positioning Sesi 3 (tampil di panel atas). Sebelum kalimat itu ada, kriteria ini tidak punya arti.</li>
<li><b>Distinctive &amp; findable</b> — menonjol, dan bisa dicari tanpa tenggelam di hasil lain.</li>
<li><b>Pronounceable</b> — audiens bisa mengucapkan dan mengejanya setelah sekali dengar.</li>
<li><b>Protectable</b> — realistis untuk didaftarkan sebagai merek.</li>
<li><b>Room to grow</b> — masih benar kalau ada sekuel, spin-off, atau merchandise.</li>
</ul>
<p>Empat risiko yang paling sering muncul: <b>common-word trap</b> (kata kamus biasa gagal di distinctive <i>dan</i> protectable sekaligus), <b>makna di bahasa lain</b> (termasuk bahasa daerah), <b>phonetic collision</b> (terdengar mirip nama lain di kelas yang sama), dan <b>growth ceiling</b> (nama yang mendeskripsikan produk pertama mengikat produk kedua).</p>
<p><b>Nama yang sudah terkunci tetap dinilai.</b> Di kebanyakan proyek nyata matriks ini datang terlambat untuk mengganti nama, karena judulnya sudah publik. Fungsinya berubah: dari memilih nama menjadi <b>memberi harga pada risikonya</b>. Skor rendah yang tidak bisa diperbaiki adalah satu-satunya alasan yang membenarkan biaya mitigasi.</p>
<ol>
<li>Beri skor 1–5 di kelima kriteria, dengan <b>satu baris alasan untuk setiap skor</b>, termasuk yang tinggi. Angka tanpa kalimat tidak bisa diperdebatkan.</li>
<li>Untuk setiap skor 1–2 yang tidak bisa diperbaiki dengan ganti nama, tulis mitigasi berupa <b>tindakan yang bisa dianggarkan</b> (daftarkan merek berstilir, kunci wordmark ke elemen lain, satu handle berkualifikasi, anggaran pencarian berbayar).</li>
<li>Semua 4 dan 5? Kemungkinan besar kamu sedang membela, bukan menilai. Kalibrasi: nilai satu nama pesaing dengan matriks yang sama, lalu bandingkan.</li>
</ol>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> hlm. 3 dan 4 adalah <b>Tes 2 Gate 3 (Naming direction)</b>. Lolos kalau lima kriteria dinilai dengan alasan dan setiap skor 1–2 punya mitigasi yang bisa dianggarkan. Skor rendah tidak membuat gagal; skor rendah <b>tanpa mitigasi</b> yang membuat gagal.</p>
<p>Mitigasi di sini punya harga, dan harga itu masuk ke Sesi 5 (model bisnis dan biaya). Contoh: nama yang tidak distinctive berarti anggaran pencarian berbayar lebih besar. Nama yang tidak protectable berarti merek berstilir, bukan kata saja.</p>`,
        deeper: {
          summary: "Deeper read — kenapa skor rendah justru berguna",
          html: `
<p>Lihat dua pola di contoh. Jumbo memberi dua skor 2 (Distinctive &amp; Findable, Protectable) pada nama yang sudah publik. Tanpa dua skor itu tertulis, keputusan "daftarkan wordmark bersama karakter" dan "anggarkan pencarian berbayar" tidak bisa dibela di depan siapa pun yang memegang uang.</p>
<p>LEGO Technic memberi skor 2 di Room to Grow, dan itu bukan masalah nama: itu arsitektur (hlm. 2) yang muncul lagi. Sub-brand yang menamai seluruh lini tidak menyisakan nama untuk tier unggulannya. Jadi mitigasinya nama tier, bukan ganti nama.</p>
<p>Polanya: skor rendah adalah <b>tagihan</b>. Tulis tagihannya, tulis siapa yang membayar, dan kapan.</p>`
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Kelima skor punya satu baris alasan, termasuk skor yang tinggi?",
            "Setiap skor 1–2 muncul di kotak mitigasi dengan tindakan yang bisa dianggarkan?",
            "Meaningful dinilai terhadap kalimat positioning Sesi 3, bukan terhadap rasa suka?",
            "Kalau semua skormu 4–5: sudah kamu bandingkan dengan satu nama pesaing?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Scored honestly on a name that is already locked. Two 2s, and neither can be fixed by renaming.", caveat: CAVEAT,
            values: {
              "s4.p3.meaningful": { score: 3, justification: "Names the character and signals scale and warmth — but says nothing about the positioning. It's a character name, not a strategy name." },
              "s4.p3.distinctive": { score: 2, justification: "An ordinary word in everyday Indonesian use (sizes, portions, retail names), so crowded search results are expected. Exactly how crowded: UNKNOWN until the team searches." },
              "s4.p3.pronounceable": { score: 5, justification: "Two syllables, identical in Indonesian and English, spelled right after hearing it once. The strongest score on the page." },
              "s4.p3.protectable": { score: 2, justification: "A common dictionary word is hard to monopolise, and registrations in other classes are likely to exist already." },
              "s4.p3.growth": { score: 4, justification: "Works for a sequel and for merchandise. Doesn't describe a single product, so nothing is boxed in." },
              "s4.p3.mitigation": { label: "MITIGATION — the name is public, so the fix isn't a rename", text: "Register the stylised wordmark together with the character device rather than the word alone · never publish the word without the character element · standardise on one qualified handle (“JumboTheMovie”) across every platform · accept that paid search will cost more than for a distinctive name, and budget for it in Session 5." }
            },
            notice: "Two scores of 2, and no rename can fix either. Writing them down anyway is what justifies the mitigation budget — which is the entire reason this page still exists for a locked name."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Scored honestly on a live name. One 2 — a common-word trap that can be managed.", caveat: CAVEAT,
            values: {
              "s4.p3.meaningful": { score: 5, justification: "Says what it is and where it lives: a “Go” product that is about food. Nothing to explain to an existing rider." },
              "s4.p3.distinctive": { score: 2, justification: "“Food” is a plain word, so the bare name is weak in search and in app listings. Findable inside the app; hard to find outside it." },
              "s4.p3.pronounceable": { score: 5, justification: "Two syllables, read the same in Indonesian and English, spelled right after hearing it once." },
              "s4.p3.protectable": { score: 3, justification: "The “Go” family prefix carries protection; “Food” cannot be monopolised on its own. Strength depends on registering the combined mark." },
              "s4.p3.growth": { score: 4, justification: "The pattern stretches to new services, though not every future product fits “Go” plus one word — a future grocery or parcel line will test it." },
              "s4.p3.mitigation": { label: "MITIGATION — the name is the family’s, so the fix is protection, not a rename", text: "Register the combined “GoFood” mark and its logo form in the relevant classes — never lean on the word “Food” alone · let search lean on the “Go” family and brand-qualified queries · confirm the filing route with legal · owner: GoFood product lead with legal counsel, before Session 5." }
            },
            notice: "A 2 on a common-word name is not a reason to rename; it is a reason to protect the combination and to say so in writing, with an owner and a date."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Scored honestly on a name that is already locked. One 2, and a rename cannot fix it.", caveat: CAVEAT,
            values: {
              "s4.p3.meaningful": { score: 4, justification: "Says what the character is in plain words, so no comic knowledge is needed. Says nothing about the film’s tone." },
              "s4.p3.distinctive": { score: 2, justification: "Two ordinary English words, shared with a well-known triathlon brand and with metalwork, so crowded results are expected. Exactly how the film ranks: UNKNOWN until searched." },
              "s4.p3.pronounceable": { score: 5, justification: "Plain words, said the same way in Indonesian and English, and spelled right after hearing them once." },
              "s4.p3.protectable": { score: 3, justification: "Decades as a character name help, but the common-word pair overlaps other brands. Film-class cover is UNKNOWN until page 4 is done." },
              "s4.p3.growth": { score: 3, justification: "Fine for sequels. But it names one man, so the universe layer cannot live under this title — the studio name has to carry it." },
              "s4.p3.mitigation": { label: "MITIGATION — the name is public, so the fix isn’t a rename", text: "Never publish the words without the helmet silhouette beside them · keep the endorsement line (“A Marvel Studios film”) locked to the title so search lands on the studio · standardise one qualified handle across platforms · budget paid search in Session 5 for a name that is not distinctive." }
            },
            notice: "A 2 that no rename can fix is what justifies the lockup rule and the search budget. The 3 on Room to Grow is the page 2 architecture decision showing up again."
          },
          lego: {
            name: "LEGO Technic", sub: "Scored honestly on a name that is already locked. One 2 — and it is the architecture again.", caveat: CAVEAT,
            values: {
              "s4.p3.meaningful": { score: 4, justification: "“Technic” says technical in one word, which supports “every function works”. It says nothing about whether you can see it working." },
              "s4.p3.distinctive": { score: 3, justification: "A near-word of “technical”, so it reads as ordinary, and an unrelated audio brand (Technics) is spelled almost the same. The LEGO prefix fixes search." },
              "s4.p3.pronounceable": { score: 4, justification: "Said the same way in Indonesian and English — it sounds like “teknik”. The “ch” spelling is the only slip after hearing it once." },
              "s4.p3.protectable": { score: 4, justification: "The line name sits under the parent’s long-held marks. The flagship tier has no name of its own yet, so there is nothing to register." },
              "s4.p3.growth": { score: 2, justification: "Names the whole line, so the flagship tier has no name, and every future “bigger” set would also be called Technic." },
              "s4.p3.mitigation": { label: "MITIGATION — the fix is a tier name, not a rename", text: "Name the tier by what it does, not how big it is — drawn from the function list, never “Pro” or “Ultimate” (the voice rule bans both) · keep the parent mark in the lockup · register the tier name in classes 28 and 41 only once it is chosen · owner: brand manager, name chosen before Session 5." }
            },
            notice: "A 2 on Room to Grow is what a sub-brand costs, not a rename problem. Writing it down turns “later” into an owner and a date."
          }
        }
      },

      /* ================= hlm. 4 — Trademark Preliminary Checklist ================= */
      4: {
        theory: {
          title: "Baca ini dulu",
          src: "WIPO (2017), Making a Mark; UU No. 20/2016 tentang Merek dan Indikasi Geografis (Pasal 1(1), 3, 4, 21(1)(a))",
          html: `
<p class="callout"><b>Ini pengantar supaya kamu tahu kapan harus bertanya ke profesional. Ini bukan nasihat hukum, dan pencarian pertama di halaman ini bukan clearance.</b> Pertanyaan hukum yang spesifik dibawa ke legal adviser.</p>
<p>Dua rezim yang sering tertukar:</p>
<ul>
<li><b>Hak cipta</b> melindungi <b>karya</b> (naskah, gambar, musik, footage) dan timbul otomatis begitu karya itu ada.</li>
<li><b>Merek</b> melindungi <b>nama dan logo sebagai tanda dagang</b>, dan <b>tidak otomatis</b>. UU 20/2016 Pasal 3: hak atas merek diperoleh setelah merek terdaftar.</li>
</ul>
<p>Intuisi "saya yang membuat, jadi milik saya" benar untuk hak cipta, dan justru karena benar di satu rezim, ia sering dipindahkan diam-diam ke rezim merek, di mana ia salah.</p>
<p>Dua hal khusus Indonesia: (1) pendaftaran lewat <b>DJKI</b>, dan permohonan ditolak bila mirip merek yang lebih dulu terdaftar atau dimohonkan pihak lain (Pasal 21(1)(a); logika ini biasa diringkas "first-to-file"). (2) Merek didaftarkan <b>per kelas barang/jasa</b> (Pasal 4). Judulmu bisa aman sebagai film dan jadi masalah begitu dicetak di kaos. Jadi "aman" tidak pernah pernyataan global; tanya <b>"aman untuk apa, tepatnya?"</b></p>
<ol>
<li>Cari nama utamamu di lima sumber. Tandai masing-masing <b>CLEAR</b>, <b>TAKEN</b>, atau <b>UNKNOWN</b>. Di catatan tulis apa yang kamu cari dan hasilnya. Untuk DJKI, tulis kelas yang kamu cek.</li>
<li>CLEAR hanya untuk yang benar-benar dicek, dan sebut cakupannya ("CLEAR untuk Bahasa Indonesia dan Inggris; bahasa daerah belum dicek"). CLEAR karena tidak ada yang mencari adalah tebakan.</li>
<li>Untuk setiap TAKEN atau UNKNOWN, tulis <b>satu tindakan</b> di kotak bawah: owner, kapan, dan uji penutupan (selesai kalau apa).</li>
</ol>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> bagian kedua dari <b>Tes 2 Gate 3 (Naming direction)</b>. Lolos kalau kelas yang dicek disebut, dan setiap UNKNOWN atau TAKEN punya owner, tanggal, dan uji penutupan. <b>UNKNOWN itu jawaban sah.</b> UNKNOWN tanpa tindakan yang tidak sah: ia akan tetap UNKNOWN sampai Sesi 8.</p>
<p>Di Sesi 5 (Gate 4, IP logic), UNKNOWN di halaman ini muncul lagi sebagai lubang: lini merchandise tidak bisa dijual di kelas barang yang belum dicek.</p>`,
        deeper: {
          summary: "Deeper read — kelas barang/jasa yang biasanya relevan",
          html: `
<p>Worked example menyebut beberapa kelas. Di sistem klasifikasi internasional yang dipakai DJKI, kelas yang paling sering muncul di proyek kelas ini antara lain: <b>41</b> (hiburan dan pendidikan, termasuk film dan event), <b>25</b> (pakaian), <b>28</b> (mainan dan permainan), <b>9</b> (perangkat lunak dan aplikasi), <b>43</b> (jasa makanan dan minuman). Cek ke daftar kelas resmi di situs DJKI; jangan berhenti di daftar ini.</p>
<p>Untuk brand nyata di contoh, hasil pencarian DJKI <b>tidak dikarang</b>: kolomnya sengaja UNKNOWN dan dilabeli. Yang kamu tiru polanya. Untuk proyekmu sendiri, kamu bisa mencarinya sungguhan.</p>`
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Kelima sumber punya status, dan tidak ada yang berbunyi \"mungkin aman\"?",
            "Catatan DJKI menyebut kelas yang dicek?",
            "Setiap CLEAR menyebut apa yang dicek (dan apa yang belum)?",
            "Setiap TAKEN atau UNKNOWN punya satu baris tindakan dengan owner, kapan, dan uji penutupan?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "A first-pass check, honestly recorded. Every UNKNOWN and TAKEN has one action: owner, date, closing test.", caveat: CAVEAT,
            values: {
              "s4.p4.djki": "UNKNOWN — Not searched here, so no result is claimed. Food and retail classes are likely crowded; class 41 is UNKNOWN. Illustrative reconstruction.",
              "s4.p4.web": "TAKEN — Already a trading name elsewhere (e.g. a Dutch supermarket chain). No clean space; record the search date.",
              "s4.p4.appstores": "UNKNOWN — Not checked. Only relevant if a game or companion app happens, and that hasn't been decided.",
              "s4.p4.handles": "UNKNOWN — Not checked here. A bare handle is unlikely to be free; the plan is one qualified handle, UNKNOWN until the marketing lead checks before Gate 3 is read.",
              "s4.p4.languages": "CLEAR — Means “very large” in English and Bahasa Indonesia; nothing embarrassing in either. Regional languages not checked.",
              "s4.p4.actions": { items: ["1 · DJKI — Visinema legal counsel · before Session 5 · closed when the result is filed with the classes searched (41 now; merchandise after the Session 5 plan).", "2 · Google & Web — producer · before Session 5 · closed when the filing route (stylised wordmark plus character device, never the bare word) is written on one page.", "3 · App stores — marketing lead · Session 5 · closed when the merch plan says app yes or no; if yes, the store search is recorded here.", "4 · Handles — marketing lead · before Gate 3 is read · closed when one qualified handle per platform is recorded, before anything is printed."] }
            },
            anno: { "s4.p4.actions": ACT_ANNO },
            notice: "Three UNKNOWNs, one TAKEN and one scoped CLEAR is an honest page. The failure mode is writing CLEAR because nobody looked."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "A first-pass check, honestly recorded. Every UNKNOWN and TAKEN has one action: owner, date, closing test.", caveat: CAVEAT,
            values: {
              "s4.p4.djki": "UNKNOWN — Assumed, not verified: “Go” family marks sit under the parent’s registrations; legal counsel confirms. “GoFood” mark and logo form: not searched. Illustrative reconstruction.",
              "s4.p4.web": "TAKEN — “Go food” is made of plain words, so generic results are expected; only brand-qualified searches can find us. The word “Food” alone cannot be protected.",
              "s4.p4.appstores": "CLEAR — Scoped CLEAR: GoFood launches inside the Gojek app, so no separate store listing exists to clear. If a standalone app is ever proposed, this row reopens.",
              "s4.p4.handles": "CLEAR — Scoped CLEAR: no separate GoFood handle is planned; the parent’s official accounts carry it. A food-specific handle would be a Session 6 decision.",
              "s4.p4.languages": "CLEAR — Reads naturally in Bahasa Indonesia and English; nothing embarrassing found in either. Regional languages and other markets not checked.",
              "s4.p4.actions": { items: ["1 · DJKI — legal counsel, asked by the GoFood product lead · before Session 5 · closed when a written answer is filed, naming the classes covered and the filing route for the “Go” family.", "2 · Google & Web — GoFood product lead · before Session 5 · closed when the decision is recorded: the combined mark and logo form are filed, the word “Food” alone is not."] }
            },
            anno: { "s4.p4.actions": ACT_ANNO },
            notice: "One honest UNKNOWN, one TAKEN that is really a common-word warning, three scoped CLEARs. A CLEAR that says what it covers is worth more than a bare one."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "A first-pass check, honestly recorded. Every UNKNOWN and TAKEN has one action: owner, date, closing test.", caveat: CAVEAT,
            values: {
              "s4.p4.djki": "UNKNOWN — Not searched in this example, so no result is claimed. Entertainment class 41 and merchandise classes 25 and 28 are open: UNKNOWN. Illustrative reconstruction of a team check.",
              "s4.p4.web": "TAKEN — In wide use — the triathlon brand and decades of comic coverage. No clean space, so the film must win search by pairing with the studio name.",
              "s4.p4.appstores": "UNKNOWN — Not checked. Only relevant if a game tie-in is licensed, which is a Session 5 decision.",
              "s4.p4.handles": "UNKNOWN — Not checked here. A bare handle is unlikely to be free, so the plan is a qualified variant; availability is UNKNOWN until the marketing lead checks it before Gate 3 is read.",
              "s4.p4.languages": "CLEAR — Nothing offensive found in English and Bahasa Indonesia. Regional languages not checked — this CLEAR covers those two only.",
              "s4.p4.actions": { items: ["1 · DJKI — studio legal counsel · before Session 5 · closed when the result is filed with the classes searched (41, 28, 25) and the search date.", "2 · Google & Web — marketing lead · before Gate 3 is read · closed when the lockup rule (title never without the helmet silhouette) is in the key-art specs.", "3 · App stores — licensing lead · Session 5 · closed when the game tie-in decision is minuted; if licensed, the store search is recorded here.", "4 · Handles — marketing lead · before Gate 3 is read · closed when one qualified handle per platform is recorded, before key art is printed."] }
            },
            anno: { "s4.p4.actions": ACT_ANNO },
            notice: "Three UNKNOWNs, one TAKEN and one scoped CLEAR is an honest page. The failure mode is writing CLEAR because nobody looked."
          },
          lego: {
            name: "LEGO Technic", sub: "A first-pass check, honestly recorded. Every UNKNOWN and TAKEN has one action: owner, date, closing test.", caveat: CAVEAT,
            values: {
              "s4.p4.djki": "UNKNOWN — Assumed to sit under the parent’s registrations — the parent’s legal team confirms, not this team. No tier name yet, so nothing to search. Illustrative reconstruction.",
              "s4.p4.web": "TAKEN — “Technic” reads as an ordinary word, and an audio brand called Technics is spelled almost the same. The LEGO prefix resolves search; the bare word does not.",
              "s4.p4.appstores": "UNKNOWN — Not checked. Only relevant if the flagship’s motorised functions need a control app — a product decision that is still open.",
              "s4.p4.handles": "CLEAR — No separate Technic handle is planned: the parent’s official accounts carry the line (teaching assumption). A tier handle would be a Session 6 decision.",
              "s4.p4.languages": "CLEAR — “Technic” reads as “teknik” in Bahasa Indonesia. Nothing embarrassing found in English and Bahasa Indonesia; other languages not checked.",
              "s4.p4.actions": { items: ["1 · DJKI — brand manager asks the parent legal team · before Session 5 · closed when a written answer naming the classes covered (28, 41) is filed.", "2 · Google & Web — brand manager · before Session 5 · closed when the parent-link rule is filed with brand leadership’s signature.", "3 · App stores — product lead · Session 5 · closed when the minutes say whether the flagship needs a control app; if yes, the store search is recorded here."] }
            },
            anno: { "s4.p4.actions": ACT_ANNO },
            notice: "An honest page: two UNKNOWNs, one TAKEN, two scoped CLEARs. The CLEAR on handles says what it covers and when it reopens."
          }
        }
      },

      /* ================= hlm. 5 — Creative Brand Brief ================= */
      5: {
        theory: {
          title: "Baca ini dulu",
          src: "Silabus §4 dan §15; Wheeler (2017), Designing Brand Identity, ed. 5 (proses brief)",
          html: `
<p>Ini <b>artefak inti</b> Sesi 4. Pembacanya desainer yang tidak pernah bertemu timmu. Satu uji untuk seluruh brief: <b>could a designer who has never met your team act on this?</b> Kalau butuh satu percakapan lisan supaya masuk akal, brief-nya belum selesai, dan di proyek nyata percakapan itu tidak terjadi.</p>
<p>Peranmu di halaman ini <b>director, bukan artist</b>: menetapkan apa yang harus benar dan bagaimana hasilnya dinilai, bukan menggambarnya. Kalau PM menulis "pakai merah bata", dia mengambil pekerjaan desainer, dan kalau hasilnya tidak disukai yang tersisa hanya debat selera.</p>
<p><b>Direct, don't dictate.</b> Brief yang menyebut <b>solusi</b> ("logonya biru dan bulat") hanya menghasilkan tebakanmu sendiri, dikerjakan orang yang lebih terampil. Brief yang menyebut <b>persyaratan dan aturan penilaiannya</b> ("harus terbaca hitam-putih di ukuran thumbnail") bisa kembali sebagai tiga jawaban yang tidak terpikirkan, dan kamu tetap punya dasar objektif untuk memilih.</p>
<p>Delapan kotak, dan dari mana isinya:</p>
<ul>
<li><b>Objective</b> — apa yang perlu dibuat, dan harus mencapai apa.</li>
<li><b>Audience</b> — dari Sesi 2 (panel atas). Jangan menulis audiens baru di sini.</li>
<li><b>Positioning to express</b> — kalimat Sesi 3, <b>persis</b>, tidak diparafrase. Tombol "Salin" mengambilnya dari hlm. 2 Sesi 3; tambahkan bagian mana yang wajib dibawa identitas.</li>
<li><b>Personality &amp; tone of voice</b> — dari Personality Spectrum Sesi 3, ditulis sebagai <b>pasangan</b>: "warm, not sweet". Tiga kata sifat ("fun, bold, friendly") dibaca lima cara oleh lima penulis; pasangan menutup ruang tafsir dengan menyebut tetangga terdekat yang salah. Tambahkan satu kalimat yang benar dan satu yang salah.</li>
<li><b>Mandatory</b> — persyaratan yang harus benar di jawaban apa pun.</li>
<li><b>Prohibited</b> — yang tidak boleh muncul, <b>dengan alasan strategisnya</b>. Larangan tanpa alasan adalah selera.</li>
<li><b>Accessibility</b> — kontras, terbaca di thumbnail, warna tidak pernah satu-satunya pembawa makna, takarir. Bagian brief yang sepenuhnya biner, jadi tulis dengan angka atau kondisi yang bisa dicek.</li>
<li><b>Rejected → rewrote</b> — satu baris yang tadinya menyebut solusi, dan versi persyaratannya. Keduanya tetap terlihat.</li>
</ul>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> ini pusat <b>Tes 3 Gate 3 (Identity brief)</b> dan inti <b>CLO 3</b>: menerjemahkan strategi menjadi brief yang bisa dieksekusi stream lain. Lolos kalau kedelapan bagian terisi dan minimal satu baris ditolak lalu ditulis ulang.</p>
<p>Setelah halaman ini selesai, kirim brief-nya ke creative stream (atau satu orang di luar timmu) dan catat satu pertanyaan yang mereka ajukan. <i>"A brief that raises no questions probably wasn't read."</i> Pertanyaan itu menunjukkan bagian mana yang ambigu. Brief ini masuk Dossier Sesi 8 (butir 12–14).</p>`,
        deeper: {
          summary: "Deeper read — menerjemahkan solusi menjadi persyaratan",
          html: `
<p>Kalau kamu menulis instruksi visual eksplisit, jangan dihapus diam-diam. Terjemahkan dengan satu pertanyaan: <i>"That's the designer's decision. What's the STRATEGIC requirement behind it?"</i></p>
<p>Contoh di empat kasus: "palet oranye hangat dan tekstur gambar tangan" → "harus terasa hangat dan buatan tangan, bukan sempurna-mesin" (Jumbo). "Beri GoFood warna terang sendiri" → "harus ditemukan dalam satu detik dan tetap jelas Gojek" (Gojek). Pada LEGO, baris yang ditolak ("matte black, stencil, tanpa logo LEGO di depan") ternyata menyembunyikan kesalahan arsitektur: tampilan yang didikte diam-diam menghapus induknya. Menerjemahkannya menjadi persyaratan membuat kesalahan itu terlihat.</p>
<p>Tanda bahaya: brief yang rapi tanpa satu pun baris yang ditolak biasanya berarti tidak ada yang menguji barisnya.</p>`
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Positioning dikutip persis dari Sesi 3, dan audiens sama dengan Sesi 2?",
            "Tone ditulis sebagai pasangan, dengan satu kalimat benar dan satu salah?",
            "Setiap baris mandatory adalah persyaratan, bukan solusi yang menyamar?",
            "Setiap larangan punya alasan strategis?",
            "Bisakah orang asing bertindak berdasarkan brief ini tanpa bertanya satu kali pun?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Written for a designer who has never met the team — including the line the team had to reject.", caveat: CAVEAT,
            values: {
              "s4.p5.objective": "Give the design and animation team enough direction to build a visual and verbal identity for the film, its campaign, and its first merchandise — without dictating the artwork.",
              "s4.p5.audience": "Indonesian families with young children (primary, Session 2). Secondary: adults who want to back local creative work.",
              "s4.p5.positioning": "“For Indonesian families who doubt a local film can be as good as an imported one, Jumbo is the animated family film made by an Indonesian studio to world-class production standards…” (Session 3 sentence, v2.) The identity must carry BOTH halves; either alone is a different film.",
              "s4.p5.tone": "Warm, not sweet. Proud, not defensive. Confident, not loud. RIGHT: “Made here. Made properly.” WRONG: “Finally, an Indonesian film you won't be embarrassed by.”",
              "s4.p5.mandatory": "Legible in black and white at thumbnail size · one character element that works without the wordmark · feels hand-made, not machine-perfect · works on a cinema poster AND a 40mm merch tag.",
              "s4.p5.prohibited": "No batik or wayang motifs as decorative shorthand for “Indonesian” — specificity must come from the story's own setting. No imitation of imported house styles.",
              "s4.p5.accessibility": "Contrast that survives print and small screens · colour never the sole carrier of meaning · Indonesian captions on the trailer from first release, not added later.",
              "s4.p5.rejected": { label: "A LINE WE REJECTED → REWROTE", text: "REJECTED: “Use a warm orange palette and hand-drawn textures.” REWRITTEN: “Must feel warm and hand-made rather than machine-perfect.”" }
            },
            notice: "Read the prohibited box again. “No batik as decorative shorthand” is a strategic requirement, not a taste rule — it protects the claim that the film is authentically local rather than decoratively local. That is what a prohibition is for."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Written for a designer who has never met the team — including the line the team had to reject.", caveat: CAVEAT,
            values: {
              "s4.p5.objective": "Give the product design, motion and merchant-onboarding teams enough direction to make GoFood read as “one more thing Gojek already does” — not as a new app.",
              "s4.p5.audience": "Existing GoRide riders in Jakarta (primary, Session 2). Secondary: office workers ordering lunch, once the core experience is proven with riders.",
              "s4.p5.positioning": "“…the food-ordering service that lives inside the app they already use.” (Session 3 sentence in force; replace it with the v2 draft only after the peer re-score that the brand lead owes.) Show reuse, not novelty.",
              "s4.p5.tone": "Familiar, practical, unfussy. Nothing to prove. RIGHT: “Your usual address. Your GoPay. Dinner.” WRONG: “CRAZY DISCOUNTS! Order NOW!!”",
              "s4.p5.mandatory": "Gojek green and icon on every GoFood screen · home-screen entry built from the same components as rides · saved address and GoPay as default, never re-asked · same order tracker as rides.",
              "s4.p5.prohibited": "No separate palette, logo or navigation — it tells the rider this is a new app. No discount-shouting. No claim the pilot cannot keep, such as “thousands of restaurants”.",
              "s4.p5.accessibility": "Order status never relies on colour alone · text legible at small phone sizes · Bahasa Indonesia first, in plain words · contrast that holds outdoors in daylight.",
              "s4.p5.rejected": { label: "A LINE WE REJECTED → REWROTE", text: "REJECTED: “Give GoFood its own bright colour so it stands out from rides.” REWRITTEN: “GoFood must be found in a second and still be unmistakably Gojek; any accent is a tint of the Gojek green.”" }
            },
            notice: "Read the rejected line again. A new service wanting to be noticed is a reasonable instinct, and it would have quietly turned a branded house into a house of brands — spending the trust the branded house exists to reuse."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Written for a designer who has never met the team — including the line the team had to reject.", caveat: CAVEAT,
            values: {
              "s4.p5.objective": "Give the design, trailer and key-art teams enough direction to introduce Iron Man to people who have never read the comic — without dictating the artwork or mentioning the wider universe.",
              "s4.p5.audience": "General moviegoers who don’t know the character (primary, Session 2). Secondary: comic readers, who arrive anyway and must never feel talked down to.",
              "s4.p5.positioning": "“…the superhero film that works completely on its own” (Session 3 sentence, unchanged). The identity must carry BOTH halves: complete in itself, and a lead worth watching.",
              "s4.p5.tone": "Witty, not silly. Grounded, not solemn. Self-aware, not smug. RIGHT: “Start here. No homework.” WRONG: “Fans have waited decades for this.”",
              "s4.p5.mandatory": "Legible in black and white at thumbnail size · helmet works without the wordmark · studio endorsement line on every asset · needs no comic knowledge · works on a poster AND a 40mm tag.",
              "s4.p5.prohibited": "No universe map, team-up teaser or other hero’s name in the poster or trailer — it creates the homework fear the film exists to remove. No “for fans of…” language. The tease stays post-credits.",
              "s4.p5.accessibility": "Contrast that survives print and small screens · colour never the sole carrier of meaning · captions in Indonesian as well as English on the trailer from first release, not added later.",
              "s4.p5.rejected": { label: "A LINE WE REJECTED → REWROTE", text: "REJECTED: “Show the armour in red and gold with glowing effects.” REWRITTEN: “Must feel built by a person, not generic sci-fi — the character engineered it himself.”" }
            },
            notice: "Read the prohibited box again. “No universe teasers in the trailer” is a strategic requirement, not a taste rule — it protects the promise that you can start here. That is what a prohibition is for."
          },
          lego: {
            name: "LEGO Technic", sub: "Written for a designer who has never met the team — including the line the team had to reject.", caveat: CAVEAT,
            values: {
              "s4.p5.objective": "Give the packaging, photography and film teams enough direction to make the flagship read as expert-grade AND unmistakably LEGO — without dictating the artwork.",
              "s4.p5.audience": "Existing Technic hobbyists (primary, Session 2). Secondary: teen builders graduating up, who must not be talked down to either.",
              "s4.p5.positioning": "“…the Technic flagship is the building set where every added function can be watched working before you buy, because a pre-launch reviewer demo will show each mechanism moving (PLANNED — not yet held).” (Session 3, v2.)",
              "s4.p5.tone": "Precise, not cold. Plain-spoken, not blunt. Unshowy, not dull. RIGHT: “Every part moves for a reason.” WRONG: “The ULTIMATE engineering experience!”",
              "s4.p5.mandatory": "LEGO mark on the front of the pack · every named function shown moving before purchase · legible in black and white at thumbnail size · beam shape works without the wordmark · function list on the pack.",
              "s4.p5.prohibited": "No blueprint-only look that drops the LEGO identity — it throws away the proof we inherit. No “ultimate”, “pro” or piece count as the headline. No toy cues that talk down to an adult.",
              "s4.p5.accessibility": "Instruction steps never rely on colour alone to tell parts apart · contrast that survives print · text legible at instruction-page size · captions on every demo video.",
              "s4.p5.rejected": { label: "A LINE WE REJECTED → REWROTE", text: "REJECTED: “Matte black, cool grey, stencil lettering, no LEGO logo on the front.” REWRITTEN: “Must read as engineering equipment and as LEGO at a glance; the parent mark stays on the front.”" }
            },
            notice: "Read the rejected line again. It was a solution, and it hid the architecture error: the dictated look quietly removed the parent. Translating it into a requirement is how the error became visible."
          }
        }
      },

      /* ================= hlm. 6 — Brand Codes Inventory ================= */
      6: {
        theory: {
          title: "Baca ini dulu",
          src: "Wheeler (2017), Designing Brand Identity, ed. 5; silabus Sesi 4 (brand codes)",
          html: `
<p><b>Brand codes</b> = himpunan kecil elemen berulang (warna, bentuk, suara, tipografi, karakter) yang mengidentifikasi kamu <b>tanpa logo</b>. Argumennya aritmetika, bukan estetika: proyek kecil tidak bisa menang dengan anggaran, tapi bisa menang dengan pengulangan, dan pengulangan itu murah. Tiga kode di sepuluh tempat mengalahkan sepuluh kode yang dipakai sekali.</p>
<ol>
<li>Daftar kandidat kode yang <b>sudah ada</b> (panel atas menampilkan aset dari Sesi 1). Hanya yang benar-benar berulang.</li>
<li>Terapkan <b>uji tanpa-logo</b> ke setiap kandidat: kalau logonya dihapus, apakah ini masih mengidentifikasi kita? Tulis hasilnya: lolos, lolos lemah, atau gagal. Yang gagal bukan kode, itu dekorasi. Coret (tulis bahwa ia dicoret).</li>
<li>Tulis kode yang <b>masih dibutuhkan</b>. Yang belum ada ditulis UNKNOWN: itu celah yang diberi nama, bukan kelalaian.</li>
<li>Tulis <b>pemilik</b> tiap kode: orang yang menyetujui perubahannya. Kode tanpa pemilik bergeser dalam sebulan.</li>
</ol>
<p><b>Maksimal lima.</b> Halaman ini seharusnya makin <b>pendek</b> saat dikerjakan. Daftar yang makin panjang berarti uji tanpa-logo belum diterapkan.</p>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> bagian dari <b>Tes 3 Gate 3</b>: kode maksimal lima, masing-masing dengan pemilik. Kode adalah kosakata; hlm. 7 menempatkan kosakata itu di enam kanal, dan hlm. 9 biasanya punya satu kriteria yang memakainya ("identitas memakai minimal dua kode bernama"). Urutannya tidak bisa dibalik.</p>
<p>Di Sesi 7 (governance), pemilik kode di halaman ini menjadi bahan aturan siapa yang boleh mengubah apa setelah peluncuran.</p>`,
        deeper: {
          summary: "Deeper read — kenapa \"lolos lemah\" tetap ditulis",
          html: `
<p>Tiga dari empat contoh menulis satu kode yang hanya <b>lolos lemah</b>: palet hangat Jumbo, palet merah-emas Marvel, abu-abu dingin LEGO, suara \"praktis\" Gojek. Semuanya umum di kategorinya sehingga tidak bertahan sendirian. Ditulis supaya tim tidak mengandalkannya sebagai satu-satunya pengenal, dan supaya hlm. 9 tidak memakainya sebagai bukti.</p>
<p>Tes cepat dari kelas: sebut satu brand yang kamu kenali tanpa logonya. Apa persisnya yang diulang? Itu yang sedang kamu cari untuk proyekmu sendiri.</p>`
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Paling banyak lima kode yang bertahan?",
            "Setiap kandidat punya hasil uji tanpa-logo, dan yang gagal ditulis sebagai dicoret?",
            "Setiap kode, termasuk yang masih dibutuhkan, punya nama pemilik?",
            "Kode yang belum ada ditulis UNKNOWN, bukan dihilangkan?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Four candidates tested. Two kept, one only weakly — the shortening is the result.", caveat: CAVEAT,
            values: {
              "s4.p6.have": "The character silhouette — recognisable at small size and already appearing in early material. A warm, saturated palette established by the production design.",
              "s4.p6.need": "A sonic signature. UNKNOWN — no sound identity is on file. Owner: composer, via the marketing lead, before Session 5. A gap with a name, an owner and a date.",
              "s4.p6.owners": "Silhouette — art director. Palette — art director. Sonic signature — composer, via the marketing lead. Every code has a name beside it, because a code with no owner drifts.",
              "s4.p6.nologo": "Silhouette: PASSES. Palette: PASSES weakly — warm saturated palettes are common in family animation and it doesn't survive alone. Everything else the team listed (a specific font, a poster layout) FAILED and was cut."
            },
            notice: "The honest output of this page is a shortening, not a list. A team that finishes its first pass with five strong codes has usually not applied the no-logo test at all."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Six candidates tested. Four kept, one only weakly, two cut — the shortening is the result.", caveat: CAVEAT,
            values: {
              "s4.p6.have": "The Gojek green and app icon. The “Go” naming pattern. The driver-on-the-map order tracker, same as rides. A plain-spoken voice (weak).",
              "s4.p6.need": "One signal that says “food” inside the Gojek family without a new look. UNKNOWN — no candidate exists yet. Owner: product designer, before Session 5.",
              "s4.p6.owners": "Green and icon — design lead. “Go” pattern — brand lead. Tracker — product designer. Voice — GoFood product lead. Food signal — product designer. A code with no owner drifts.",
              "s4.p6.nologo": "Green, “Go” pattern, tracker: PASS. Voice: PASSES weakly (practical tone is common among apps). A separate GoFood badge and a food-photography hero style FAILED and were cut; the badge also made GoFood look like a separate app."
            },
            notice: "The honest output of this page is a shortening, not a list. A team that finishes its first pass with five strong codes has usually not applied the no-logo test at all."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Five candidates tested. Three kept, one only weakly — the shortening is the result.", caveat: CAVEAT,
            values: {
              "s4.p6.have": "The helmet silhouette — recognisable at small size, and it works without the wordmark. The “start here” voice: plain, funny, never explaining the mythology. A red-and-gold palette from the suit design.",
              "s4.p6.need": "A sonic signature. UNKNOWN — no studio sound identity exists, and the composer’s brief covers the score only. Owner: music supervisor. Decide before Session 5. A gap with a name, an owner and a date.",
              "s4.p6.owners": "Silhouette — art director. Voice — marketing lead. Palette — art director. Sonic signature — music supervisor. Every code has a name beside it. A code with no owner drifts within a month, so each name is written down here.",
              "s4.p6.nologo": "Silhouette: PASSES. Voice: PASSES — the same register identifies the studio across trailer and social. Palette: PASSES weakly — red and gold is common in superhero marketing and doesn’t survive alone. A specific typeface and a poster layout FAILED and were cut."
            },
            notice: "The honest output of this page is a shortening, not a list. A team that finishes its first pass with five strong codes has usually not applied the no-logo test at all."
          },
          lego: {
            name: "LEGO Technic", sub: "Six candidates tested. Four kept, one only weakly, two cut — the shortening is the result.", caveat: CAVEAT,
            values: {
              "s4.p6.have": "The liftarm beam shape, readable at small size without the wordmark. A mechanism-in-motion image. The plain-spoken voice. A cool grey and black palette.",
              "s4.p6.need": "A parent-link rule: the one thing that makes a Technic pack read as LEGO at a glance. UNKNOWN — not yet written. Owner: brand manager, with brand-leadership sign-off, before Session 5.",
              "s4.p6.owners": "Beam shape — design lead. Motion image — marketing lead. Voice — marketing lead. Palette — design lead. Parent-link rule — brand manager. A code with no owner drifts.",
              "s4.p6.nologo": "Beam shape, motion image, voice: PASS. Palette: PASSES weakly (cool grey is common). Stencil typeface and blueprint layout FAILED and were cut; the blueprint also pushed the pack away from LEGO."
            },
            notice: "The honest output of this page is a shortening, not a list. A team that finishes its first pass with five strong codes has usually not applied the no-logo test at all."
          }
        }
      },

      /* ================= hlm. 7 — Multisensory Identity Map ================= */
      7: {
        theory: {
          title: "Baca ini dulu",
          src: "Silabus Sesi 4 (sonic, motion, spatial, and interactive identity); Wheeler (2017)",
          html: `
<p>Identitas bukan hanya yang terlihat. Silabus meminta enam kanal: <b>visual, verbal, sonic, motion, spatial, interactive/behavioural</b>. Halaman ini menempatkan kode dari hlm. 6 ke kanal-kanal itu, dan memutuskan kanal mana yang memang dibutuhkan.</p>
<ol>
<li>Untuk tiap kanal pilih: <b>dibutuhkan</b>, <b>sebagian dibutuhkan</b>, atau <b>not needed, because…</b></li>
<li>Kanal yang dibutuhkan: tulis apa yang dibutuhkan, <b>siapa yang membuat</b>, dan <b>kapan</b> (tonggak, mis. "sebelum Sesi 6", juga boleh). Itu yang membedakan rencana dari keinginan.</li>
<li>Kanal yang tidak dibutuhkan: tulis alasannya, dan kapan baris ini dibuka lagi. <b>Tidak boleh kosong</b>: kotak kosong tidak bisa dibedakan dari kotak yang terlupa.</li>
</ol>
<p>Hati-hati dua arah. Mengisi keenam kanal dengan antusias biasanya angan-angan. Menulis "not needed" di empat kotak biasanya sedang menggambarkan <b>anggaran</b>, bukan medium. Kalau memang soal anggaran, tulis "tidak ada anggaran" dengan kata-kata itu, karena dua alasan itu menghasilkan keputusan berbeda di Sesi 5.</p>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> bagian dari <b>Tes 3 Gate 3</b>: enam kanal terisi atau beralasan. Output silabus butir 6 (<i>sonic, motion, interactive, or spatial requirements where relevant</i>) ada di halaman ini.</p>
<p>Di Sesi 6 (go-to-market, Gate 5), kanal yang dibutuhkan di sini menjadi rencana kanal dan jadwal aktivasi. Kanal yang ditulis "dibutuhkan" tanpa pembuat dan waktu akan muncul lagi di sana sebagai baris yang tidak bisa dijadwalkan.</p>`,
        deeper: {
          summary: "Deeper read — sonic dan motion untuk proyek kecil",
          html: `
<p>Sonic tidak sama dengan musik latar. Yang dimaksud motif pendek, ident, atau bunyi khas yang <b>terpisah dari score</b> dan bisa diulang di banyak tempat. Untuk proyek non-film, kanal sonic bisa berupa bunyi notifikasi, bunyi pembuka video, atau bunyi produk itu sendiri (LEGO: suara mekanisme berjalan di video demo, direkam, bukan musik).</p>
<p>Motion adalah cara sesuatu bergerak, muncul, dan berpindah. Ia ikut aturan brief: Jumbo menulis \"motion that reads as drawn, not tweened\" karena brief-nya mewajibkan kesan buatan tangan.</p>
<p>Interactive/behavioural mencakup cara kamu membalas orang. Untuk proyek layanan, ini sering kanal terpenting (Gojek: alur pemesanan adalah produknya).</p>`
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Keenam kanal punya pilihan, dan tidak ada yang kosong?",
            "Setiap kanal yang dibutuhkan menyebut siapa yang membuat dan kapan?",
            "Setiap \"not needed\" punya alasan, dan alasannya medium, bukan anggaran yang disamarkan?",
            "Kode dari hlm. 6 benar-benar muncul di kanal yang tepat?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Only one channel is a genuine “not needed” — and it comes with a condition attached.", caveat: CAVEAT,
            values: {
              "s4.p7.visual": "Required, central. Character design, palette, wordmark, poster system, merchandise application. Art director owns it; work is already underway.",
              "s4.p7.verbal": "Required, owned. Tone for trailers, captions and press. Owner: marketing lead, who writes the tone brief before Session 5. Risk: outside press and social teams will improvise without it.",
              "s4.p7.sonic": "Required, and late. This is a film; sound is native to the medium. Needed: a short motif for trailers and idents, separate from the score. Owner: composer, via the marketing lead, before Session 5.",
              "s4.p7.motion": "Required. Title animation and ident behaviour. Must follow the hand-made rule — motion that reads as drawn, not tweened.",
              "s4.p7.spatial": "Partially required. Cinema lobby standees and school screening events. Low priority until a release date is fixed; revisit in Session 6.",
              "s4.p7.interactive": "Not needed, because… There is no app, game, or interactive companion planned. If the Session 5 merchandise plan adds one, this row changes."
            },
            notice: "Four of six fully needed, one partly, one not at all — a film genuinely uses most channels. A team writing “not needed” in four boxes is usually describing their budget rather than their medium, and should say so in those words."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Only one channel is a genuine “not needed” — and it comes with a condition attached.", caveat: CAVEAT,
            values: {
              "s4.p7.visual": "Required, central. Green, app icon, the home-screen entry, the order tracker and the merchant list. Product designer owns it; the first screens reuse existing components.",
              "s4.p7.verbal": "Required, owned. Order messages, notifications, merchant onboarding and support replies, all in the “familiar, practical” voice. GoFood product lead owns it. Risk: support agents will improvise.",
              "s4.p7.sonic": "Not needed, because… The existing order-update tone is reused. A new sound would make GoFood feel like a separate app. This row reopens only if voice ordering is added.",
              "s4.p7.motion": "Required. The tracker is the proof of pillar 2: the rider sees the driver already on the road. Same animation pattern as GoRide. Product designer.",
              "s4.p7.spatial": "Partially required. Driver jackets and food bags are seen in the street, and the same drivers carry both services. Bag design is a cost decision for Session 5. Ops lead.",
              "s4.p7.interactive": "Required, central. The ordering flow is the product: saved address, GoPay and re-order are the experience. Product designer, with engineering lead on tracking."
            },
            notice: "Four of six fully needed, one partly, one not at all — a food order touches most channels. A team writing “not needed” in four boxes is usually describing their budget rather than their medium, and should say so in those words."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Only one channel is a genuine “not needed” — and it comes with a condition attached.", caveat: CAVEAT,
            values: {
              "s4.p7.visual": "Required, central. Helmet silhouette, palette, title lockup, key art, merchandise application. Art director owns it; the first key-art round is underway.",
              "s4.p7.verbal": "Required, owned. Tone for trailers, press and social: “start here, no homework.” Marketing lead owns it. Risk: outside press and social teams will improvise.",
              "s4.p7.sonic": "Required, and late. A trailer without a sound identity wastes a code. Needed: a short studio motif for trailers and the post-credits scene, separate from the score. Music supervisor, before Session 5.",
              "s4.p7.motion": "Required. Title animation and studio ident behaviour. Must follow the built-by-a-person rule from the brief — engineered, not generic CGI.",
              "s4.p7.spatial": "Partially required. Cinema standees and the premiere. Low priority until a release date is fixed, and no standee may show the universe layer. Revisit in Session 6.",
              "s4.p7.interactive": "Not needed, because… No game or companion app is planned. A game tie-in is a Session 5 licensing decision; if it happens this row changes and the app-store check on page 4 reopens."
            },
            notice: "Four of six fully needed, one partly, one not at all — a film genuinely uses most channels. A team writing “not needed” in four boxes is usually describing their budget rather than their medium, and should say so in those words."
          },
          lego: {
            name: "LEGO Technic", sub: "Only one channel is a genuine “not needed” — and it comes with a condition attached.", caveat: CAVEAT,
            values: {
              "s4.p7.visual": "Required, central. Beam shape, palette, pack lockup with the parent mark, instruction pages, shelf application. Design lead owns it; the first round of mock-ups is underway.",
              "s4.p7.verbal": "Required, owned. Tone for the pack, product page and reviewer briefings: “every part moves for a reason”. Marketing lead owns it. Risk: retailers will write their own copy.",
              "s4.p7.sonic": "Partially required. The sound of the mechanism running matters in demo videos, and it needs recording, not music. A signature motif is not needed. Marketing lead; revisit at Session 6.",
              "s4.p7.motion": "Required. The demo loop is pillar 1 of the Message House: the mechanism must be seen moving before anyone pays. Real footage, not animation. Marketing lead.",
              "s4.p7.spatial": "Required. Specialty retailer shelves and hobbyist conventions. A mechanism must be able to run on the shelf. Retail lead, before the first convention booth is booked.",
              "s4.p7.interactive": "Not needed, because… No new app is planned; the parent’s existing instructions app is reused. If the motorised functions need a control app, this row changes and the app-store check on page 4 reopens."
            },
            notice: "Four of six fully needed, one partly, one not at all — a flagship set genuinely uses most channels. A team writing “not needed” in four boxes is usually describing their budget rather than their medium, and should say so in those words."
          }
        }
      },

      /* ================= hlm. 8 — Touchpoint Consistency Matrix ================= */
      8: {
        theory: {
          title: "Baca ini dulu",
          src: "Wheeler (2017), brand touchpoints; silabus Sesi 4 (packaging and merchandise; user-interface and product-experience consistency)",
          html: `
<p>Touchpoint = setiap tempat orang bertemu brand-mu. Janji brand (panel atas: Promise dan Master Message Sesi 3) dikatakan sekali, tetapi <b>ditepati atau dilanggar</b> di enam tempat ini.</p>
<ol>
<li>Untuk tiap baris, tulis bagaimana janji itu <b>benar-benar</b> muncul di sana: wujudnya, aturannya, yang tidak boleh terjadi. "Jaga konsistensi brand" bukan isi baris, itu harapan.</li>
<li>Tulis <b>siapa yang bertanggung jawab</b> di tiap baris. Baris tanpa nama tidak akan pernah diperiksa.</li>
<li>Pastikan <b>minimal satu baris dibuat belakangan oleh orang di luar timmu</b>: vendor kemasan, licensee merchandise, tim toko, halaman checkout, email konfirmasi. Poster dan trailer dibuat orang yang duduk di rapat brand; touchpoint yang merusak brand hampir selalu yang dibuat paling akhir, oleh orang yang hanya memegang dokumen. Centang kolom <b>Dibuat orang di luar tim</b> pada baris itu (kolom ini tambahan app; tidak ada di workbook).</li>
</ol>
<p>Ada touchpoint lain yang penting untuk proyekmu (mis. layanan pelanggan, kemasan pengiriman)? Tambahkan baris.</p>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> bagian dari <b>Tes 3 Gate 3</b>: minimal satu touchpoint dibuat orang luar, dan tiap baris punya penanggung jawab. Ini output silabus butir 8 (<i>touchpoint consistency criteria</i>) dan menjawab Session Learning Outcome: <i>"a consistent system of product and communication touchpoints."</i></p>
<p>Di Sesi 6, baris-baris ini menjadi titik aktivasi go-to-market; di Sesi 7, penanggung jawabnya menjadi bahan aturan governance.</p>`,
        deeper: {
          summary: "Deeper read — komunitas tidak bisa dikendalikan, tapi bisa dibekali",
          html: `
<p>Baris COMMUNITY paling sering dikosongkan karena terasa di luar kendali. Memang tidak bisa dikendalikan, dan tidak perlu. Yang bisa dilakukan: membuat kode mudah ditiru (Jumbo: \"a silhouette people can draw is a code that spreads for free\"), dan menyepakati satu kalimat untuk hal yang pasti dibicarakan orang (Marvel: \"stay if you want to\" untuk adegan setelah kredit).</p>
<p>Baris PACKAGING &amp; MERCHANDISE adalah ujian brief di hlm. 5: orang yang membuatnya hanya memegang dokumenmu. Kalau aturan 40mm atau aturan logo induk tidak tertulis di brief, mereka tidak akan tahu.</p>`
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Keenam baris menulis wujud janji yang nyata, bukan \"jaga konsistensi\"?",
            "Setiap baris punya penanggung jawab bernama?",
            "Minimal satu baris dibuat belakangan oleh orang di luar tim, dan aturannya ada di brief hlm. 5?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Six rows. The last two are the ones the team almost skipped.", caveat: CAVEAT,
            values: {
              "s4.p8.matrix": { keys: ["product", "campaign", "platform", "event", "packaging", "community"], cols: ["Touchpoint", "How the brand promise is expressed here — and who is responsible for it"], rows: [
                ["PRODUCT — the film itself", "The promise is kept or broken here first. Production quality IS the promise; no identity work compensates for a film that doesn't hold attention. Owner: producer."],
                ["CAMPAIGN — trailer, poster, social", "Must carry both halves of the positioning. Highest-visibility touchpoint, and the one the team naturally over-focuses on. Owner: marketing lead."],
                ["PLATFORM — thumbnail, listing page", "Where the black-and-white thumbnail rule earns its place: the poster gets shrunk to 200 pixels and the character element is all that survives. Owner: art director."],
                ["EVENT — screenings, premiere", "Warm, proud, non-defensive tone has to hold live, with a host improvising and nobody holding the brief. Owner: marketing lead."],
                ["PACKAGING & MERCH — built later, by a licensee", "Made months from now by people who were never in this room, working from a style guide. Most likely place for the brand to break. Needs the 40mm rule and the character-alone element. Owner: art director."],
                ["COMMUNITY — fan art, reposts", "Cannot be controlled, and shouldn't be. What CAN be done: make the codes easy to copy. A silhouette people can draw is a code that spreads for free. Owner: marketing lead."]] }
            },
            notice: "Merchandise is made by strangers from a document, and community expression can't be controlled at all — which is exactly why both need decisions made now rather than reactions later."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Six rows. The last two are the ones the team almost skipped.", caveat: CAVEAT,
            values: {
              "s4.p8.matrix": { keys: ["product", "campaign", "platform", "event", "packaging", "community"], cols: ["Touchpoint", "How the brand promise is expressed here — and who is responsible for it"], rows: [
                ["PRODUCT — the thing itself", "The promise is kept or broken here first: the home-screen entry, the tracker and the order must work as rides do. Owner: product designer, with engineering lead."],
                ["CAMPAIGN — trailer, poster, social", "In-app banner, push and social. Must show reuse (“nothing to enter”) before it shows any offer, and must not claim more merchants than the pilot has. Owner: marketing lead."],
                ["PLATFORM — thumbnails, listings, store pages", "Gojek’s existing app listing and the merchant list page: the green and the “Go” name must survive a small thumbnail. Owner: GoFood product lead."],
                ["EVENT — screenings, launches, booths", "Merchant onboarding sessions and district launch: a host who can show the order flow live and answer the commission question. Owner: business development lead."],
                ["PACKAGING & MERCHANDISE — usually built later, by other people", "Food bags, merchant stickers and driver jackets are made by vendors from a document, never meeting the design lead. Needs the colour rule. Owner: ops lead."],
                ["COMMUNITY — fan work, reposts, replies", "Merchant groups, driver communities and rider reviews. Cannot be controlled; can be given a code and a voice to follow. Owner: community and customer ops lead."]] }
            },
            notice: "Bags and stickers are made by strangers from a document, and merchants and drivers will talk about GoFood whether or not the team does — which is exactly why both need decisions made now rather than reactions later."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Six rows. The last two are the ones the team almost skipped.", caveat: CAVEAT,
            values: {
              "s4.p8.matrix": { keys: ["product", "campaign", "platform", "event", "packaging", "community"], cols: ["Touchpoint", "How the brand promise is expressed here — and who is responsible for it"], rows: [
                ["PRODUCT — the film itself", "The promise is kept or broken here first: the film must work, start to finish, for someone who knows nothing. If it needs the comic, no campaign fixes that. Owner: director."],
                ["CAMPAIGN — trailer, poster, social", "Must show the man and the wit, never the mythology. Highest-visibility touchpoint, and where a universe teaser will be most tempting to add. Owner: marketing lead."],
                ["PLATFORM — thumbnail, listing page", "The poster shrinks to 200 pixels and only the helmet silhouette survives. The endorsement line must still read. Owner: art director."],
                ["EVENT — screenings, premiere", "A host improvising on stage will mention “the universe”. A one-page host brief with the prohibited box on it fixes that. Owner: events lead."],
                ["PACKAGING & MERCH — built later, by a licensee", "Made by licensees months from now, from a style guide, by people who were never in this room. Needs the helmet-alone rule, the 40mm rule and a no-universe-art rule. Owner: licensing lead."],
                ["COMMUNITY — fan art, reposts", "The fan community is a deposit, but a niche one; mainstream has none yet. Cannot be controlled. What can: keep the silhouette easy to copy, and agree one line on the tease — “stay if you want to”."]] }
            },
            notice: "Merchandise is made by strangers from a document, and the community will discuss the post-credits scene whether the studio likes it or not — which is exactly why both need decisions made now rather than reactions later."
          },
          lego: {
            name: "LEGO Technic", sub: "Six rows. The last two are the ones the team almost skipped.", caveat: CAVEAT,
            values: {
              "s4.p8.matrix": { keys: ["product", "campaign", "platform", "event", "packaging", "community"], cols: ["Touchpoint", "How the brand promise is expressed here — and who is responsible for it"], rows: [
                ["PRODUCT — the thing itself", "The promise is kept or broken here first: every function named on the pack has to work as shown, and the build has to survive a long session. Owner: engineering lead."],
                ["CAMPAIGN — trailer, poster, social", "Mechanism demo, reviewer outreach, press. Must show the function moving before it talks about price. Highest-visibility touchpoint. Owner: marketing lead."],
                ["PLATFORM — thumbnails, listings, store pages", "Product page and retailer listings: the parent mark and the function list must survive a 200-pixel thumbnail. Owner: e-commerce lead."],
                ["EVENT — screenings, launches, booths", "Hobbyist conventions and maker fairs: the demo has to run live, with a host who knows the function list by heart. Owner: events lead."],
                ["PACKAGING & MERCHANDISE — usually built later, by other people", "Shelf and shelf-talkers are made by retailers’ own teams, from a document, and never meet the design lead. Needs the parent-link rule and the function list. Owner: retail lead."],
                ["COMMUNITY — fan work, reposts, replies", "Hobbyist reviews, forums and support. Sceptical of price creep; complex builds have no dedicated technical support yet. Owner: community manager."]] }
            },
            notice: "Shelves are dressed by strangers from a document, and the community will review the price whether the studio likes it or not — which is exactly why both need decisions made now rather than reactions later."
          }
        }
      },

      /* ================= hlm. 9 — Creative Approval Checklist — Gate 3 Check ================= */
      9: {
        theory: {
          title: "Baca ini dulu",
          src: "Silabus Sesi 4 (approval criteria for multidisciplinary outputs; Approval gate 90–100 menit), §15 (evaluated against agreed criteria), §13 (Gate 3)",
          html: `
<p>Halaman ini mengubah selera menjadi sesuatu yang bisa diperiksa. Tulis <b>5–7 kriteria biner</b> (ya/tidak) untuk menerima atau menolak hasil kerja kreatif. <i>"Anyone can have taste. Only a brief makes taste checkable."</i></p>
<ol>
<li><b>Uji dua-pemeriksa:</b> dua orang memeriksa terpisah, apakah jawabannya sama? "Apakah terasa premium?" gagal. "Apakah wordmark terbaca hitam-putih pada lebar 120 piksel?" lolos. Kriteria yang dijawab berbeda belum biner.</li>
<li>Tulis <b>source page</b>: halaman 2–8 tempat aturan itu tertulis (boleh lebih dari satu). Lalu tandai kriteria itu milik <b>tes Gate 3</b> yang mana: architecture, naming, atau brief. Kebanyakan kriteria biasanya milik brief; satu kriteria arsitektur (mis. "logo induk wajib ada di depan kemasan") membuat Tes 1 bisa diperiksa. Kalau semua kriteriamu berasal dari satu tes, tulis kenapa dua tes lainnya tidak punya.</li>
<li>Tulis <b>jawaban yang lolos</b>. Untuk kriteria larangan ("Apakah ada elemen yang hanya mengandalkan warna?"), jawaban yang lolos adalah NO.</li>
<li>Jawab hari ini: YES, NO, atau UNKNOWN. Yang belum bisa dicek (belum ada karya, belum diuji ke orang luar) ditulis UNKNOWN, bukan dicentang. Checklist yang semuanya tercentang biasanya ditulis setelah karyanya jadi.</li>
</ol>
<p><b>Cara memilih:</b> kumpulkan 10–15 aturan dari hlm. 2–8, coret yang bukan ya/tidak, urutkan dengan pertanyaan <i>"seberapa mahal kalau salah dan sudah tercetak?"</i>, simpan 5–7, lalu beri setiap kriteria source page dan tes Gate 3-nya. Bahan paling mudah ada di kotak Mandatory, Prohibited, dan Accessibility hlm. 5 (panel atas). Lebih dari tujuh butir, checklist berhenti dipakai: pilih.</p>
<p><b>Pertanyaan dari creative stream.</b> Kirim brief hlm. 5 ke creative stream (atau satu orang di luar timmu), lalu bawa pulang <b>satu pertanyaan</b>. Penanya harus dari stream selain Product Manager; nama PM timmu sendiri tidak dihitung. Tulis pertanyaannya, siapa yang bertanya dan dari stream apa, dan bagian mana (hlm. 2–8) yang ternyata ambigu. Belum ada yang bertanya? Pilih <b>UNKNOWN</b> dan tulis pemilik dan tanggal ditanyakannya. UNKNOWN yang ditulis lengkap berbeda dari kotak yang dibiarkan kosong. Yang dicek hanya ada atau tidaknya, bukan mutu pertanyaannya.</p>`
        },
        why: `<p><b class='k'>Kenapa halaman ini penting:</b> ini output silabus butir 9 (<i>creative approval checklist</i>) dan sisi kedua CLO 3: <i>decision criteria</i> untuk stream lain. Kamu menulis kriteria, jawabannya, dan satu pertanyaan dari creative stream; <b>Gate 3 tidak diputuskan di halaman ini</b>. Gate 3 dibaca dari file-mu setelah dikumpulkan.</p>
<p>Gate 3 membaca tiga tes satu per satu: <b>architecture</b> (hlm. 2), <b>naming direction</b> (hlm. 3–4), <b>identity brief</b> (hlm. 5–9). Pertanyaannya bukan "lolos atau tidak", tetapi "tes mana yang bermasalah?" Status ditentukan oleh tes yang terlemah, dan ambangnya sama untuk semua orang. Kondisi Gate 2 yang masih terbuka tidak hilang: ia ikut terbawa ke Gate 3. UNKNOWN yang punya owner, tanggal, dan uji penutupan tidak menggagalkan tes.</p>`,
        deeper: {
          summary: "Deeper read — tiga tes Gate 3 dan apa yang dicari di tiap tes",
          html: `
<ul>
<li><b>Tes 1 · Brand architecture (hlm. 2).</b> Model ditulis dalam satu kalimat; garis punya alasan kepercayaan atau kerusakan; sisi OUT menyebut nama yang konkret. Bila ada lapisan internal (seri, universe), aturan apa yang boleh dilihat audiens sudah tertulis, bukan niat.</li>
<li><b>Tes 2 · Naming direction (hlm. 3–4).</b> Lima kriteria dinilai dengan alasan; setiap skor 1–2 punya mitigasi yang bisa dianggarkan; kelas yang dicek disebut; setiap UNKNOWN atau TAKEN punya owner, tanggal, dan uji penutupan.</li>
<li><b>Tes 3 · Identity brief (hlm. 5–9).</b> Delapan bagian brief terisi dengan minimal satu baris ditolak dan ditulis ulang; kode maksimal lima dengan pemilik; enam kanal terisi atau beralasan; minimal satu touchpoint dibuat orang luar (ditandai di hlm. 8); 5–7 kriteria biner yang lolos uji dua-pemeriksa; kotak pertanyaan creative stream terisi, atau UNKNOWN dengan pemilik dan tanggal.</li>
</ul>
<p>Kenapa Gate ini ada sebelum Sesi 5 dan 6: silabus §13 melarang masuk produksi berbiaya tinggi atau eksekusi promosi saat gate strategis utama belum disetujui. Brief yang tidak koheren membuat semua uang yang dikeluarkan setelahnya terbuang.</p>`
        },
        callout: "<b>Gate 3 dibaca dari dokumenmu, tidak diputuskan olehmu.</b> Kamu menulis kriteria, jawabannya, dan satu pertanyaan dari creative stream; penilai membaca tiga tes (architecture hlm. 2, naming direction hlm. 3–4, identity brief hlm. 5–9) setelah file dikumpulkan. Kondisi Gate 2 yang masih terbuka ikut terbawa. Contoh di bawah menampilkan isi ketiga tes untuk tiap kasus, bukan statusnya.",
        tigaTes: {
          "title": "Cek tiga tes Gate 3",
          "intro": "Gate 3 dibaca dari dokumenmu lewat tiga tes, satu per satu. Pertanyaannya bukan \"lolos atau tidak\", tetapi \"tes mana yang bermasalah?\". Di bawah ini apa yang dicek di tiap tes, dan bagaimana kelihatannya di contoh Jumbo dan LEGO Technic (isinya diambil langsung dari panel contoh).",
          "cara": "Gate 3 tidak diperiksa live. Yang dibaca adalah file JSON dari HTML tool ini, unggahan terakhir yang masuk lewat Form. Batas unggah, hari penilaian, dan hari hasil keluar diumumkan dosen di kelas dan di grup kelas; app tidak menampilkannya. Hasil ditentukan oleh tes yang paling lemah dari ketiganya. Kondisi Gate 2 yang masih terbuka pada hari file dibaca ikut terbawa. Silabus §13: tim tidak melanjutkan ke produksi berbiaya tinggi atau eksekusi promosi selama gate strategis utama belum disetujui.",
          "tests": [
            {
              "k": "t1",
              "title": "Tes 1 · Brand architecture",
              "pages": "hlm. 2",
              "items": [
                {
                  "k": "t1a",
                  "text": "Model ditulis dalam satu kalimat (\"We are a … because …\")."
                },
                {
                  "k": "t1b",
                  "text": "Setiap garis punya alasan kepercayaan atau kerusakan."
                },
                {
                  "k": "t1c",
                  "text": "Sisi OUT menyebut sepasang nama yang konkret."
                }
              ]
            },
            {
              "k": "t2",
              "title": "Tes 2 · Naming direction",
              "pages": "hlm. 3–4",
              "items": [
                {
                  "k": "t2a",
                  "text": "Lima kriteria dinilai, masing-masing dengan alasan."
                },
                {
                  "k": "t2b",
                  "text": "Setiap skor 1–2 punya mitigasi yang bisa dianggarkan."
                },
                {
                  "k": "t2c",
                  "text": "Setiap UNKNOWN atau TAKEN punya pemilik, tanggal, dan uji penutupan."
                }
              ]
            },
            {
              "k": "t3",
              "title": "Tes 3 · Identity brief",
              "pages": "hlm. 5–9",
              "items": [
                {
                  "k": "t3a",
                  "text": "Delapan bagian brief terisi dan bisa dipakai orang asing."
                },
                {
                  "k": "t3b",
                  "text": "Minimal satu baris ditolak dan ditulis ulang."
                },
                {
                  "k": "t3c",
                  "text": "Kode maksimal lima, masing-masing dengan pemilik."
                },
                {
                  "k": "t3d",
                  "text": "Enam kanal terisi, atau diberi alasan \"not needed, because…\"."
                },
                {
                  "k": "t3e",
                  "text": "Minimal satu touchpoint dibuat orang di luar tim."
                },
                {
                  "k": "t3f",
                  "text": "Lima sampai tujuh kriteria biner, masing-masing dengan halaman asal dan tes."
                },
                {
                  "k": "t3g",
                  "text": "Satu pertanyaan dari creative stream: terisi, atau UNKNOWN dengan pemilik dan tanggal."
                }
              ]
            }
          ],
          "cases": {
            "jumbo": {
              "name": "Jumbo",
              "items": {
                "t1a": {
                  "refs": [
                    "s4.p2.model_why"
                  ]
                },
                "t1b": {
                  "read": "Both lines are drawn."
                },
                "t1c": {
                  "refs": [
                    "s4.p2.flows"
                  ]
                },
                "t2a": {
                  "scores": [
                    "s4.p3.meaningful",
                    "s4.p3.distinctive",
                    "s4.p3.pronounceable",
                    "s4.p3.protectable",
                    "s4.p3.growth"
                  ],
                  "read": "Scored honestly: Distinctive & Findable and Protectable are both 2, with mitigation named and budgeted for Session 5."
                },
                "t2b": {
                  "refs": [
                    "s4.p3.mitigation"
                  ],
                  "read": "The name is locked, so the mitigation is the decision."
                },
                "t2c": {
                  "refs": [
                    "s4.p4.actions"
                  ],
                  "read": "Every UNKNOWN and the TAKEN on the trademark page carries an owner, a date and a closing test."
                },
                "t3a": {
                  "read": "A stranger can act without a conversation: requirements, not solutions; a prohibited box with its strategic reason; one line rejected and rewritten."
                },
                "t3b": {
                  "refs": [
                    "s4.p5.rejected"
                  ]
                },
                "t3c": {
                  "refs": [
                    "s4.p6.owners"
                  ],
                  "read": "Codes cut to two (one weak), each with an owner."
                },
                "t3d": {
                  "refs": [
                    "s4.p7.interactive"
                  ],
                  "read": "Six channels."
                },
                "t3e": {
                  "read": "Six touchpoints, two built by outsiders."
                },
                "t3f": {
                  "refs": [
                    "s4.p9.criteria"
                  ],
                  "read": "Checklist: five pass, two open. Column check: all seven come from the brief; none guards the architecture or the naming. That gap is real, so we leave it visible."
                },
                "t3g": {
                  "refs": [
                    "s4.p9.creative_question"
                  ]
                }
              },
              "after": {
                "t1": "Sub-names are UNKNOWN with an owner and a date. No checklist criterion guards this decision."
              }
            },
            "lego": {
              "name": "LEGO Technic",
              "items": {
                "t1a": {
                  "refs": [
                    "s4.p2.model_why"
                  ]
                },
                "t1b": {
                  "read": "Sub-brand model chosen and lines drawn on trust: the parent’s fit tolerance flows in; a cash-grab reading flows out to the parent’s price discipline."
                },
                "t1c": {
                  "refs": [
                    "s4.p2.flows"
                  ]
                },
                "t2a": {
                  "scores": [
                    "s4.p3.meaningful",
                    "s4.p3.distinctive",
                    "s4.p3.pronounceable",
                    "s4.p3.protectable",
                    "s4.p3.growth"
                  ],
                  "read": "Scored honestly: Room to Grow is a 2, with an owner and a date for the tier name."
                },
                "t2b": {
                  "refs": [
                    "s4.p3.mitigation"
                  ]
                },
                "t2c": {
                  "refs": [
                    "s4.p4.actions"
                  ],
                  "read": "Two UNKNOWNs and the TAKEN on the trademark check each carry an owner, a date and a closing test — parent legal team via brand manager, before Session 5; parent-link rule, brand manager, same date; app stores, product lead, Session 5."
                },
                "t3a": {
                  "read": "A stranger can act: requirements, not solutions; a prohibited box with its strategic reason; a rejected line rewritten as a requirement."
                },
                "t3b": {
                  "refs": [
                    "s4.p5.rejected"
                  ]
                },
                "t3c": {
                  "refs": [
                    "s4.p6.owners"
                  ],
                  "read": "Codes cut to four with owners."
                },
                "t3d": {
                  "refs": [
                    "s4.p7.interactive"
                  ],
                  "read": "Six channels."
                },
                "t3e": {
                  "read": "Six touchpoints, two built by outsiders."
                },
                "t3f": {
                  "refs": [
                    "s4.p9.criteria"
                  ],
                  "read": "Checklist: five pass, two open. Column check: criterion 5 is the only one that guards the architecture; the other six come from the brief."
                },
                "t3g": {
                  "refs": [
                    "s4.p9.creative_question"
                  ]
                }
              },
              "after": {
                "t1": "The parent mark stays on the pack front (page 9, criterion 5 passes). Tier names are UNKNOWN, with an owner and a date."
              }
            }
          }
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Lima sampai tujuh kriteria, masing-masing satu pertanyaan ya/tidak?",
            "Bacakan satu kriteria ke teman: apakah dua orang akan menjawab sama?",
            "Setiap kriteria punya source page dan tesnya, dan minimal satu kriteria menguji arsitektur?",
            "Yang belum bisa dicek ditulis UNKNOWN, bukan YES?",
            "Kotak pertanyaan creative stream terisi (penanya bukan PM timmu), atau UNKNOWN dengan pemilik dan tanggal?",
            "Kondisi Gate 2-mu (kalau ada) sudah ditutup, atau masih terbuka dengan owner dan waktunya?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Five pass — a NO is the passing answer on 4 and 5. Two stay open, and that is honest.", caveat: CAVEAT,
            values: {
              "s4.p9.criteria": { cols: ["NO.", "SOURCE PAGE", "YES/NO QUESTION", "GATE 3 TEST", "ANSWER"], keys: ["c1", "c2", "c3", "c4", "c5", "c6", "c7"], rows: [
                ["1", "p. 5", "Does the wordmark stay legible in black and white at 120 pixels wide?", "BRIEF", "YES · PASS"],
                ["2", "p. 5", "Does the character element work with the wordmark removed?", "BRIEF", "YES · PASS"],
                ["3", "p. 6", "Does the identity use at least two of our named brand codes?", "BRIEF", "YES · PASS"],
                ["4", "p. 5", "Does any element rely on colour alone to carry meaning?", "BRIEF", "NO · PASS"],
                ["5", "p. 5", "Does it use borrowed cultural motifs as decorative shorthand?", "BRIEF", "NO · PASS"],
                ["6", "pp. 5, 8", "Does it work on both a cinema poster and a 40mm merchandise tag?", "BRIEF", "UNKNOWN"],
                ["7", "p. 5", "Do both outside readers (brief unseen) call the tone proud or warm, not defensive?", "BRIEF", "UNTESTED"]] },
              "s4.p9.creative_question": { label: "QUESTION FROM YOUR CREATIVE STREAM", text: "UNKNOWN. The brief has not reached the animation lead yet, so no outside reader has asked anything. Owner: producer. Due: before Gate 3 is read. Written down, not left blank." }
            },
            note: "Gate 3 dibaca dari dokumen; contoh ini menampilkan isi ketiga tes, bukan statusnya. TEST 1 · BRAND ARCHITECTURE (p. 2, 9): PASS. Endorsed brand chosen on the damage question: Jumbo may borrow the studio’s credibility, but a weak result does not automatically hurt the next release. Both lines are drawn. Sub-names are UNKNOWN with an owner and a date. No checklist criterion guards this decision. TEST 2 · NAMING DIRECTION (pp. 3–4): PASS. Scored honestly: Distinctive & Findable and Protectable are both 2, with mitigation named and budgeted for Session 5. Three UNKNOWNs on the trademark page each carry an owner and a date. The name is locked, so the mitigation is the decision. TEST 3 · IDENTITY BRIEF (pp. 5–9): PASS. A stranger can act without a conversation: requirements, not solutions; a prohibited box with its strategic reason; one line rejected and rewritten. Codes cut to two (one weak), each with an owner; six channels; six touchpoints, two built by outsiders. Checklist: five pass, two open. Carried from Gate 2: five parent interviews, owner producer, before Gate 3 is read. Until it closes, low-cost work only, no high-cost production (syllabus §13). Criteria 6 and 7 stay open until two checkers from outside the team test them. CREATIVE-STREAM QUESTION: UNKNOWN, with an owner and a date. COLUMN CHECK: all seven come from the brief; none guards the architecture or the naming. That gap is real, so we leave it visible.",
            notice: "Notice: two 2s on the naming page did not stop the pass. A pass means the weakness is written down with a budget and an owner, not that it went away."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Five pass — a NO is the passing answer on 4 and 5. Two stay open because they need real riders.", caveat: CAVEAT,
            values: {
              "s4.p9.criteria": { cols: ["NO.", "SOURCE PAGE", "YES/NO QUESTION", "GATE 3 TEST", "ANSWER"], keys: ["c1", "c2", "c3", "c4", "c5", "c6", "c7"], rows: [
                ["1", "pp. 5, 8", "Does the GoFood entry on the home screen stay recognisable in black and white at 120 pixels wide?", "BRIEF", "YES · PASS"],
                ["2", "pp. 5–6", "Does a GoFood screen still read as Gojek with the logo covered?", "BRIEF", "YES · PASS"],
                ["3", "p. 6", "Does the identity use at least two of our named brand codes?", "BRIEF", "YES · PASS"],
                ["4", "p. 5", "Does any order-status step rely on colour alone?", "BRIEF", "NO · PASS"],
                ["5", "p. 2", "Does GoFood use its own palette, logo or navigation separate from the Gojek app?", "ARCHITECTURE", "NO · PASS"],
                ["6", "pp. 5, 8", "Can a rider who has never seen GoFood find and place an order from the home screen without help?", "BRIEF", "UNKNOWN"],
                ["7", "p. 5", "Do at least 4 of 5 riders (brief unseen) call the tone familiar or practical, not flashy?", "BRIEF", "UNTESTED"]] },
              "s4.p9.creative_question": { label: "QUESTION FROM YOUR CREATIVE STREAM (illustrative)", text: "“Mandatory says Gojek green on every GoFood screen. Does that include the restaurant’s own photo banner, which has its own colours?” Asked by: app UI designer. Ambiguous section: p. 5, Mandatory." }
            },
            note: "Gate 3 dibaca dari dokumen; contoh ini menampilkan isi ketiga tes, bukan statusnya. TEST 1 · BRAND ARCHITECTURE (p. 2, 9): PASS. Branded house chosen on the damage question, not on efficiency. Damage line drawn: a failed food order lands on GoRide and GoPay, a payment bug on GoFood. The team accepted it and wrote a food-failure rule (an open action, with an owner). Page 9, criterion 5 passes. TEST 2 · NAMING DIRECTION (pp. 3–4): PASS. Scored honestly: Distinctive & Findable is a 2, a common-word trap with a mitigation, an owner and a date. One UNKNOWN on the trademark check — legal counsel, asked by the GoFood product lead, before Session 5. The scoped CLEARs say what they cover. TEST 3 · IDENTITY BRIEF (pp. 5–9): PASS. A stranger can act: requirements, not solutions; a prohibited box with its reason; a rejected line rewritten. Codes cut to four with owners; six channels; six touchpoints, two built by outsiders. Checklist: five pass; criteria 6 and 7 need real riders, folded into the Gate 2 interviews. Carried from Gate 2: v2 re-score (brand lead) and five real-rider interviews (GoFood product lead), before Gate 3 is read. OPEN ACTIONS (owner · when · closed when): (1) 5 interviews with real GoRide riders who are not colleagues, about past behaviour only, plus the home screen and a tracker mock-up for criteria 6 and 7 — GoFood product lead · before Gate 3 is read · raw notes filed unedited; criteria 6 and 7 answered YES or NO by two checkers. (2) Re-score the v2 positioning draft so another super-app could not say it — brand lead · before Gate 3 is read · a peer team re-scores Distinctive at 3 or higher. (3) Write the food-failure rule on one page — customer ops lead · before Session 5 · rule filed with ops sign-off, and tried once on a pretend incident. (4) Legal counsel searches the combined “GoFood” mark and logo form — legal counsel, asked by GoFood product lead · before Session 5 · written answer filed, naming the classes covered. Rows 1 and 2 close the carried condition; rows 3 and 4 are owned actions. CREATIVE-STREAM QUESTION: answered (illustrative). COLUMN CHECK: criterion 5 is the only one that guards the architecture; the other six come from the brief.",
            notice: "Notice: a carried condition is not a new defect. What is open is evidence from outside the team, and it already has an owner and a date."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Five pass — a NO is the passing answer on 4 and 5. Two stay open, and that is honest.", caveat: CAVEAT,
            values: {
              "s4.p9.criteria": { cols: ["NO.", "SOURCE PAGE", "YES/NO QUESTION", "GATE 3 TEST", "ANSWER"], keys: ["c1", "c2", "c3", "c4", "c5", "c6", "c7"], rows: [
                ["1", "p. 5", "Does the title lockup stay legible in black and white at 120 pixels wide?", "BRIEF", "YES · PASS"],
                ["2", "pp. 5–6", "Does the helmet silhouette work with the wordmark removed?", "BRIEF", "YES · PASS"],
                ["3", "p. 6", "Does the identity use at least two of our named brand codes?", "BRIEF", "YES · PASS"],
                ["4", "p. 2", "Does any public asset show or name another hero or the connected universe?", "ARCHITECTURE", "NO · PASS"],
                ["5", "p. 5", "Does any element rely on colour alone to carry meaning?", "BRIEF", "NO · PASS"],
                ["6", "pp. 5, 8", "Does it work on both a cinema poster and a 40mm merchandise tag?", "BRIEF", "UNKNOWN"],
                ["7", "p. 5", "Do both outside readers (brief unseen) call the tone witty and plain, not “for fans”?", "BRIEF", "UNTESTED"]] },
              "s4.p9.creative_question": { label: "QUESTION FROM YOUR CREATIVE STREAM (illustrative)", text: "“Prohibited bans other heroes’ names on the poster. Does a crowd of unnamed silhouettes behind the helmet count as a universe tease?” Asked by: poster designer. Ambiguous section: p. 5, Prohibited." }
            },
            note: "Gate 3 dibaca dari dokumen; contoh ini menampilkan isi ketiga tes, bukan statusnya. TEST 1 · BRAND ARCHITECTURE (p. 2): PASS WITH CONDITION. Model and lines are clear: endorsed brand plus an internal universe layer, damage case written. Gap: the rule for what the audience may see of that layer is an intention, not a document. ACTION: one-page rule — what is shown, in which asset, until when. OWNER: studio head. WHEN: before Gate 4 is read. CLOSED WHEN: filed and signed by the marketing and licensing leads. TEST 2 · NAMING DIRECTION (pp. 3–4): PASS. Scored honestly: Distinctive & Findable is a 2, with mitigation named and budgeted. Three UNKNOWNs on the trademark check each carry an action, an owner and a date — DJKI search, studio legal counsel, before Session 5; qualified handle, marketing lead, before Gate 3 is read; app stores, licensing lead, Session 5. TEST 3 · IDENTITY BRIEF (pp. 5–9): PASS. A stranger can act without a conversation: requirements, not solutions; a prohibited box with its strategic reason; one line rejected and rewritten. Codes cut to three with owners; six channels with owners; six touchpoints, two built by outsiders; a binary checklist — five pass, two open. The weakness sits in brand architecture — one of the three. Gate 2’s condition (five screenings with non-comic readers, marketing lead) carries over if still open. Until the rule exists, no high-cost production or promotion that shows the universe layer (syllabus §13). CREATIVE-STREAM QUESTION: answered (illustrative). COLUMN CHECK: criterion 4 is the only one that guards the architecture; the other six come from the brief.",
            notice: "Notice: the same threshold applies to every case. What differs here is WHERE the weakness sits — in the architecture, not the brief — which is why the fix is a one-page rule and not a rewritten brief."
          },
          lego: {
            name: "LEGO Technic", sub: "Five pass — a NO is the passing answer on 4. Two stay open, and that is honest.", caveat: CAVEAT,
            values: {
              "s4.p9.criteria": { cols: ["NO.", "SOURCE PAGE", "YES/NO QUESTION", "GATE 3 TEST", "ANSWER"], keys: ["c1", "c2", "c3", "c4", "c5", "c6", "c7"], rows: [
                ["1", "p. 5", "Does the Technic wordmark stay legible in black and white at 120 pixels wide?", "BRIEF", "YES · PASS"],
                ["2", "pp. 5–6", "Does the liftarm beam shape work with the wordmark removed?", "BRIEF", "YES · PASS"],
                ["3", "p. 6", "Does the identity use at least two of our named brand codes?", "BRIEF", "YES · PASS"],
                ["4", "p. 5", "Does any instruction step rely on colour alone to tell parts apart?", "BRIEF", "NO · PASS"],
                ["5", "p. 2", "Does the brief require the parent LEGO mark on the front of the pack and above the fold of the product page?", "ARCHITECTURE", "YES · PASS"],
                ["6", "pp. 5, 8", "Does every function named on the pack have a demonstration an outsider can watch?", "BRIEF", "UNKNOWN"],
                ["7", "p. 5", "Do both hobbyist readers (brief unseen) call the tone plain-spoken, not showy?", "BRIEF", "UNTESTED"]] },
              "s4.p9.creative_question": { label: "QUESTION FROM YOUR CREATIVE STREAM (illustrative)", text: "“Prohibited bans a blueprint-only look. Does a faint blueprint grid behind a product photo count as blueprint-only?” Asked by: packaging designer. Ambiguous section: p. 5, Prohibited." }
            },
            note: "Gate 3 dibaca dari dokumen; contoh ini menampilkan isi ketiga tes, bukan statusnya. TEST 1 · BRAND ARCHITECTURE (p. 2, 9): PASS. Sub-brand model chosen and lines drawn on trust: the parent’s fit tolerance flows in; a cash-grab reading flows out to the parent’s price discipline. The parent mark stays on the pack front (page 9, criterion 5 passes). Tier names are UNKNOWN, with an owner and a date. TEST 2 · NAMING DIRECTION (pp. 3–4): PASS. Scored honestly: Room to Grow is a 2, with an owner and a date for the tier name. Two UNKNOWNs on the trademark check each carry an action, an owner and a date — parent legal team via brand manager, before Session 5; app stores, product lead, Session 5. TEST 3 · IDENTITY BRIEF (pp. 5–9): PASS. A stranger can act: requirements, not solutions; a prohibited box with its strategic reason; a rejected line rewritten as a requirement. Codes cut to four with owners; six channels; six touchpoints, two built by outsiders. Checklist: five pass, two open. Gate 2 carries nothing. TRACKED ACTIONS (none is a condition): (1) Write the parent-link rule on one page — brand manager, with brand-leadership sign-off · before Session 5 · rule filed with brand leadership’s signature on it. (2) Parent legal team confirms the line-name registrations in classes 28 and 41; the tier name is searched in the same classes once chosen — brand manager asks the parent legal team · before Session 5 · written answer filed, naming the classes covered. (3) Hold the PLANNED pre-launch reviewer demo so each named function is seen moving — marketing lead · date proposed before Session 5; UNKNOWN until fixed · raw notes from the reviewers filed unedited; criterion 6 answered YES or NO by two checkers. If one slips past its date, say so in the next workbook update. CREATIVE-STREAM QUESTION: answered (illustrative). COLUMN CHECK: criterion 5 is the only one that guards the architecture; the other six come from the brief.",
            notice: "Notice: same threshold as the other three cases; the facts differ, so the open items are written down as UNKNOWNs with owners, not as conditions. A PLANNED reviewer demo is a plan, not a gap."
          }
        }
      }
    },
    /* Mode kelas (skrip Kelas Live v3): tautan langsung ke panel contoh. Parameter: kelas=1 · hlm · kasus (jumbo|gojek|marvel|lego) · sorot (kunci kotak, pisah koma) · urut=1 (sorot satu per satu, tombol panah) · panel=tigates · bagian=cara. Daftar lengkap: s4.html?kelas=daftar */
    kelasLinks: [
      {
        "step": "Hlm. 2 · langkah 3 · Lihat Jumbo",
        "q": "hlm=2&kasus=jumbo"
      },
      {
        "step": "Hlm. 2 · langkah 5 · LEGO Technic",
        "q": "hlm=2&kasus=lego"
      },
      {
        "step": "Hlm. 3 · langkah 2 · Lihat Jumbo (dua skor 2)",
        "q": "hlm=3&kasus=jumbo&sorot=distinctive,protectable"
      },
      {
        "step": "Hlm. 3 · langkah 4 · LEGO Technic (Room to grow)",
        "q": "hlm=3&kasus=lego&sorot=growth"
      },
      {
        "step": "Hlm. 4 · langkah 2 · Lihat Jumbo",
        "q": "hlm=4&kasus=jumbo"
      },
      {
        "step": "Hlm. 4 · langkah 4 · LEGO Technic",
        "q": "hlm=4&kasus=lego"
      },
      {
        "step": "Hlm. 5 · langkah 2 · Jumbo: Mandatory, Rejected→Rewrote",
        "q": "hlm=5&kasus=jumbo&sorot=mandatory,rejected"
      },
      {
        "step": "Hlm. 5 · langkah 4 · LEGO: baris REJECTED",
        "q": "hlm=5&kasus=lego&sorot=rejected"
      },
      {
        "step": "Hlm. 5 · (putaran kedua) Jumbo: Prohibited, Tone, Accessibility",
        "q": "hlm=5&kasus=jumbo&sorot=prohibited,tone,accessibility"
      },
      {
        "step": "Hlm. 5 · (putaran kedua) LEGO: Prohibited",
        "q": "hlm=5&kasus=lego&sorot=prohibited"
      },
      {
        "step": "Hlm. 6 · langkah 2 · Lihat Jumbo",
        "q": "hlm=6&kasus=jumbo"
      },
      {
        "step": "Hlm. 6 · langkah 4 · LEGO Technic",
        "q": "hlm=6&kasus=lego"
      },
      {
        "step": "Hlm. 7 · langkah 2 · Jumbo, satu kanal per tekan →",
        "q": "hlm=7&kasus=jumbo&urut=1"
      },
      {
        "step": "Hlm. 7 · langkah 4 · LEGO, jawaban contoh, satu kanal per tekan →",
        "q": "hlm=7&kasus=lego&urut=1"
      },
      {
        "step": "Hlm. 8 · langkah 2 · Jumbo: baris Packaging & Merch",
        "q": "hlm=8&kasus=jumbo&sorot=packaging"
      },
      {
        "step": "Hlm. 8 · langkah 4 · LEGO (buka setelah poll ditutup)",
        "q": "hlm=8&kasus=lego"
      },
      {
        "step": "Hlm. 9 · langkah 2 · Jumbo, satu kriteria per tekan →",
        "q": "hlm=9&kasus=jumbo&urut=1"
      },
      {
        "step": "Gate 3 · langkah 2 · Cek tiga tes (Jumbo)",
        "q": "panel=tigates&kasus=jumbo"
      },
      {
        "step": "Gate 3 · langkah 2 · Cek tiga tes (LEGO)",
        "q": "panel=tigates&kasus=lego"
      },
      {
        "step": "Gate 3 · langkah 3 · Cara baca",
        "q": "panel=tigates&kasus=jumbo&bagian=cara"
      }
    ]
  };
})();
