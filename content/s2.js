/* content/s2.js — teks Sesi 2: teori, kenapa penting, deeper read, cek terbalik, contoh empat kasus.
 * Sumber teori: Sesi-2-Bedah-Mendalam_v4.md (Kotler, Keller & Chernev 2022; Osterwalder et al. 2014;
 * Bland & Osterwalder 2019), silabus §7, §8 Sesi 2, §13, §15; claude/13 (ambang Gate 2 D1/D2).
 * Contoh: verbatim dari S2-worked-example-{jumbo,gojek,marvel,lego}.pptx (v2, 14 Okt 2026).
 * Baris di Competitor Benchmark Matrix contoh diurutkan sesuai urutan workbook (Who exactly? di atas).
 * Konten tidak boleh memuat tanggal kalender; pakai {{due}} / {{interviews_due}}.
 */
window.CB = window.CB || {}; CB.content = CB.content || {};
(function () {
  var CAVEAT = "Contoh ini rekonstruksi ilustratif, bukan data bersumber. Tiru cara berpikirnya, bukan angkanya.";
  var SEG_ROWS = ["WHO THEY ARE", "WHAT THEY WANT", "WHERE THEY ARE", "DO THEY PAY?", "EVIDENCE WE HAVE"];
  var SCORE_COLS = ["SEGMENT", "ATTRACTIVE", "ACCESSIBLE", "STRATEGIC FIT", "REVENUE POTENTIAL", "TOTAL"];
  var MX_COLS = ["", "US", "DIRECT", "INDIRECT", "SUBSTITUTE", "BENCHMARK"];
  function seg(names, rows) { return { cols: [""].concat(names), rows: SEG_ROWS.map(function (r, i) { return [r].concat(rows[i]); }) }; }
  var NO_NOTES = "Worked example tidak merekonstruksi catatan wawancara untuk brand nyata. Catatan wawancaramu ditulis di daftar \"Interview notes\".";

  CB.content.S2 = {
    pages: {
      /* ================= hlm. 2 — Evidence Review ================= */
      2: {
        theory: {
          title: "Baca ini dulu",
          src: "Silabus §15 (evidence, interpretation, assumption) dan §7 (evidence requirements)",
          html:
            "<p>Sesi 1 bekerja dari apa yang kamu tahu tentang produkmu. Sesi 2 meminta setiap klaim tentang dunia luar menunjukkan sumbernya. Pilah setiap klaim ke <b>tepat satu</b> kolom:</p>" +
            "<ul>" +
            "<li><b>FACT</b> — sesuatu yang kamu lihat sendiri atau dikatakan langsung oleh seseorang. Wajib ada sumber dan angkanya: \"9 dari 14 orang bilang X\", bukan kesimpulan kenapa.</li>" +
            "<li><b>INTERPRETATION</b> — bacaan yang masuk akal atas sebuah fakta. Tetap perlu diuji.</li>" +
            "<li><b>GUESS</b> — yang kamu asumsikan atau harapkan benar, tanpa bukti.</li>" +
            "</ul>" +
            "<p>Contoh: \"remaja suka horor\" terdengar seperti fakta, tapi tanpa sumber dan angka ia tebakan. \"Empat dari enam teman saya bilang begitu\" adalah fakta, dan langsung terlihat lemahnya: sampel teman.</p>" +
            "<p>Di app, tiap FACT punya isian <b>Sumber</b>, <b>Angka</b>, dan <b>Jenis bukti</b> (daftar silabus §7), supaya jenis buktimu terhitung.</p>"
        },
        why:
          "<p><b class='k'>Kenapa halaman ini penting:</b> Sesi 2 tidak memeriksa Gate, tapi menyiapkan separuh bukti untuk Gate 2: <i>\"sufficient audience evidence and a defendable positioning\"</i>. Ambangnya: bukti menyentuh segmen primer, minimal <b>dua jenis bukti</b> dari daftar §7, salah satunya dari audiens primer di luar lingkar tim. Kolom FACT inilah tempat kamu menghitungnya dengan jujur.</p>" +
          "<p>Bahan halaman ini datang dari kotak 4 dan 7 Brand Audit Canvas di Sesi 1. Kebiasaan memilah fakta dari tebakan dipakai lagi di sesi-sesi berikutnya, terutama saat menulis angka pendapatan.</p>",
        deeper: {
          summary: "Deeper read — kolom FACT yang pendek itu normal",
          html:
            "<ul>" +
            "<li><b>Kolom FACT kosong itu jujur.</b> Tulis nol sebagai fakta: \"0 interviews so far\". Ketiadaan yang jujur tetap fakta.</li>" +
            "<li><b>Satu klaim, satu kolom.</b> Jangan menulis klaim yang sama di tiga kolom dengan kata berbeda. Kalau kamu ragu, ia bukan FACT.</li>" +
            "<li><b>Tebakan biasanya lebih besar dari faktanya.</b> Di contoh Gojek, setiap GUESS adalah klaim yang jauh lebih besar dari fakta yang mendasarinya. Celah itulah yang ditutup fieldwork minggu ini.</li>" +
            "</ul>"
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Setiap FACT bisa menjawab: siapa yang mengatakan, dan berapa orang?",
            "Tidak ada klaim yang sama muncul di dua kolom?",
            "Kalau kolom FACT kosong, kamu menulis nol sebagai fakta?",
            "Jenis bukti tiap FACT sudah dipilih?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "What this team actually had, sorted honestly — every FACT carries its source and a number.", caveat: CAVEAT,
            values: {
              "s2.p2.fact": { items: ["Teaser trailer: ~500K views on the official YouTube channel (public counter, checked 2 weeks ago)", "~50 reactions logged at the internal test screening (studio's own notes, industry guests only)", "0 interviews with real target families so far"] },
              "s2.p2.interpretation": { items: ["Some comments mention ‘finally, a local film that looks this good’", "The reaction was mostly positive among industry insiders", "Families likely care about the holiday-outing ritual"] },
              "s2.p2.guess": { items: ["Most people who see the trailer will buy tickets", "General audiences will react the same way", "Parents will trust local animation without proof"] }
            },
            notice: "Notice: the FACT column is short, and two of the three facts are numbers with a named source attached. The third fact is a zero — an honest absence is still a fact. That's normal in week 2, and it's exactly why fieldwork gets assigned today."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "What this team actually had, sorted honestly.", caveat: CAVEAT,
            values: {
              "s2.p2.fact": { items: ["GoRide riders open the app several times a week for transport", "A small pilot merchant list exists in one district", "No diner interviews have been conducted yet"] },
              "s2.p2.interpretation": { items: ["Riders already trust the app with location and payment info — for a different purpose", "The team can test with a limited, controllable rollout first", "The evidence-quality gap flagged in Session 1 is still open"] },
              "s2.p2.guess": { items: ["Riders will automatically extend that trust to ordering food", "50 merchants will be enough to feel reliable city-wide", "Diners will report the same convenience-driven behaviour the team expects"] }
            },
            notice: "Notice: every guess here is a bigger claim than the fact it's built on. That gap is exactly what this session exists to close."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "What this team actually had, sorted honestly.", caveat: CAVEAT,
            values: {
              "s2.p2.fact": { items: ["Comic sales data for Iron Man exists, spanning decades", "Early footage reactions exist only from internal/industry screenings", "No general-public test screening with non-comic-readers has happened yet"] },
              "s2.p2.interpretation": { items: ["There's a small, loyal existing fan base who already cares about the character", "The witty, grounded tone seems to land with people already inclined to like the genre", "The team's biggest audience question — will strangers to the character show up — remains unanswered"] },
              "s2.p2.guess": { items: ["That fan base is large or vocal enough to guarantee mainstream success", "General audiences with no comic-book interest will react the same way", "Marketing alone, without word-of-mouth, will fill theatres opening weekend"] }
            },
            notice: "Notice: every fact this team has describes comic readers. Every open question is about the much bigger group who never read a single issue."
          },
          lego: {
            name: "LEGO Technic", sub: "What this team actually had, sorted honestly.", caveat: CAVEAT,
            values: {
              "s2.p2.fact": { items: ["Existing Technic sets have a consistent, proven sales history at their current price range", "Hobbyist community reviews of existing sets are detailed and technically engaged", "No pricing-sensitivity test has been run with real hobbyists at the proposed flagship price"] },
              "s2.p2.interpretation": { items: ["There's a real, paying audience for mechanical complexity within LEGO's core brand", "This audience cares specifically about genuine function, not just piece count or price", "Session 1's single biggest question — will hobbyists pay this much — remains completely untested"] },
              "s2.p2.guess": { items: ["That same audience will automatically pay significantly more for a meaningfully bigger step up", "Real function alone will be enough to justify a much higher price, regardless of how it's marketed", "Positive community sentiment about the existing line will translate directly into willingness to pay more"] }
            },
            notice: "Notice: every fact here is about the EXISTING line. The question that actually matters — what happens at a higher price — has zero facts supporting it yet."
          }
        }
      },

      /* ================= hlm. 3 — Segmentation Matrix ================= */
      3: {
        theory: {
          title: "Baca ini dulu",
          src: "Kotler, Keller & Chernev (2022), Marketing Management — segmentation, targeting, positioning",
          html:
            "<p><b>\"Everyone\" bukan pelanggan.</b> Everyone adalah cara sopan untuk bilang \"kami belum memutuskan\". Kamu tidak melarang siapa pun membeli; kamu mengecualikan mereka dari <b>keputusan desain</b>.</p>" +
            "<ul>" +
            "<li><b>Kategori dulu.</b> \"We compete in ___, because ___.\" Kalimat ini menentukan siapa yang dihitung sebagai pesaing di hlm. 6. Pilih kategori yang benar-benar dipilih audiens saat memutuskan.</li>" +
            "<li><b>Segmen nyata mengubah keputusan.</b> \"Orang usia 18–34\" adalah rentang umur. \"Orang tua yang memilih film liburan untuk anak di bawah 10 tahun\" mengubah poster, jam tayang, paket tiket. Uji tiap kolom: apa yang kita lakukan BERBEDA untuk kelompok ini? Kalau tidak ada, hapus kolomnya.</li>" +
            "<li><b>Tulis nama segmen sebagai manusia nyata</b>, bukan \"Segmen A\". Nama yang terasa seperti orang sungguhan menghasilkan kolom WHAT THEY WANT yang lebih konkret.</li>" +
            "<li><b>DO THEY PAY? = siapa yang membayar</b>, bukan siapa yang memakai. Pengguna, pembeli, dan influencer bisa tiga orang berbeda (anak menonton, orang tua membayar, teman anak merekomendasikan). Untuk proyek dengan sponsor, distributor, atau platform: siapa yang menandatangani, siapa yang memakai?</li>" +
            "</ul>"
        },
        why:
          "<p><b class='k'>Kenapa halaman ini penting:</b> SLO Sesi 2 berbunyi <i>\"Students can define commercially meaningful audience segments and formulate evidence-based audience insights.\"</i> Halaman ini adalah awal corong: 2–4 kandidat, yang lalu dipersempit menjadi satu primary di hlm. 4.</p>" +
          "<p>Segmen yang kamu pilih nanti mengisi blank <i>[segment]</i> di Positioning Statement Sesi 3, dan kalimat kategori menentukan siapa yang masuk Competitor Benchmark Matrix di hlm. 6.</p>",
        deeper: {
          summary: "Deeper read — segmen terkuat sering punya bukti terlemah",
          html:
            "<ul>" +
            "<li><b>Jangan mengarang dukungan untuk jawaban yang sudah kamu suka.</b> Di Jumbo, segmen terkuat (keluarga) justru punya bukti paling lemah, dan tim menulis UNKNOWN.</li>" +
            "<li><b>Biaya menjangkau berbeda per segmen.</b> Di Gojek, hanya satu segmen yang gratis dijangkau karena sudah ada di dalam aplikasi.</li>" +
            "<li><b>Siapa yang bisa menjawab pertanyaanmu?</b> Di LEGO Technic, hanya satu segmen yang punya patokan harga untuk bereaksi. Segmen lain tidak bisa bilang apakah harga terasa mahal.</li>" +
            "</ul>"
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Kalimat kategori ditulis sebelum segmen?",
            "Tiap segmen akan menghasilkan poster, pesan, atau kanal yang berbeda?",
            "DO THEY PAY? menyebut siapa yang membayar?",
            "EVIDENCE WE HAVE jujur (UNKNOWN kalau belum ada)?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Category named first — then three candidate segments, each of which would change what the team designs.", caveat: CAVEAT,
            values: {
              "s2.p3.category": "“Indonesian family cinema in the holiday release window — because that is the choice a parent is actually making that week. Not ‘animation’ in general, and not ‘Indonesian film’ in general.”",
              "s2.p3.segments": seg(["FAMILIES WITH YOUNG CHILDREN", "YOUNG ADULTS, NATIONAL PRIDE", "ANIMATION ENTHUSIASTS"], [
                ["Parents of kids under 12, planning a holiday outing", "18–30, active on social media, care about local creative work", "Students and hobbyists who follow animation as a craft"],
                ["A safe, fun outing everyone in the family enjoys", "To support and be seen supporting Indonesian creativity", "Technical craft, animation quality, production process"],
                ["Cinemas, school groups, family social media", "Twitter/X, TikTok, local film communities", "Niche forums, animation studios' own channels"],
                ["Yes — the parent buys 3–5 tickets at once", "Yes, but individually — one ticket at a time", "Yes, individually, but smaller in number"],
                ["UNKNOWN — no interviews yet, only assumption", "Positive trailer comments, informal, never counted", "~50 industry-insider reactions — a friendly sample"]
              ])
            },
            notice: "Notice: each segment would produce a genuinely different poster, message, and channel — that's what makes them real. And the strongest segment has the WEAKEST evidence. The team writes UNKNOWN rather than inventing support for the answer it already prefers."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Three candidate diner segments — each reachable and convinced differently.", caveat: CAVEAT,
            values: {
              "s2.p3.segments": seg(["EXISTING GORIDE RIDERS", "OFFICE WORKERS ORDERING LUNCH", "DINERS WHO VALUE LOCAL WARUNGS"], [
                ["Already use Gojek for rides, multiple times a week", "Urban professionals in office districts, tight lunch breaks", "Value-driven urban consumers who want to support small business"],
                ["Convenience — minimal new decisions or new apps", "Fast, reliable delivery within a short break", "An easy way to order from small local merchants"],
                ["Already inside the Gojek app itself", "Office buildings, LinkedIn/Instagram, lunch-hour windows", "Social campaigns about local merchants"],
                ["Yes — same GoPay method already in use", "Yes — personal or expensed", "Yes, individually"],
                ["GoRide usage data — not food-specific", "UNKNOWN — no data on this group's app habits yet", "Anecdotal only — no real data"]
              ])
            },
            notice: "Notice: segment 1 is the ONLY one that costs nothing to reach — they're already inside the product."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Three candidate segments — note how differently ‘accessible’ and ‘valuable’ split here.", caveat: CAVEAT,
            values: {
              "s2.p3.segments": seg(["EXISTING COMIC READERS", "GENERAL BLOCKBUSTER MOVIEGOERS", "RDJ / DRAMA AUDIENCE"], [
                ["Long-time Marvel comic fans, small in number", "The mainstream summer-movie crowd, no comic history", "Follow the lead actor from his other films"],
                ["A faithful, respectful adaptation of a character they love", "A satisfying couple of hours — spectacle, story, fun", "A strong performance and a comeback story"],
                ["Comic stores, conventions, existing fan forums", "Everywhere — broad trailers, general marketing, wide release", "Entertainment press, awards-adjacent coverage"],
                ["Yes, individually, reliably", "Yes — this group is the box office", "Yes, individually"],
                ["Decades of comic sales, not film demand", "UNKNOWN — no data on how they'll respond to this character", "UNKNOWN — assumed interest, not measured"]
              ])
            },
            notice: "Notice: the segment the studio needs most (general moviegoers) is also the one it knows least about."
          },
          lego: {
            name: "LEGO Technic", sub: "Three candidate segments — only one of them can actually test the pricing question.", caveat: CAVEAT,
            values: {
              "s2.p3.segments": seg(["EXISTING TECHNIC HOBBYISTS", "TEEN BUILDERS GRADUATING UP", "ADULT HOBBYISTS NEW TO LEGO"], [
                ["Already buy advanced Technic sets, know the current price range", "Outgrowing core LEGO sets, looking for a bigger challenge", "Engineering/model-building hobbyists who've never bought LEGO specifically"],
                ["Real mechanical complexity that justifies the price", "A meaningful next step up from what they already own", "Genuine engineering challenge, brand doesn't matter to them"],
                ["Existing Technic community, hobbyist forums", "Inside LEGO's own customer base, but hard to catch at the 'ready to graduate' moment", "Model-building and engineering communities, outside LEGO's usual channels"],
                ["Yes — proven, at current price levels", "Yes, but no baseline for premium pricing yet", "Yes, individually, but need to be found first"],
                ["Years of sales data — but at the CURRENT price, not the new one", "UNKNOWN — no data on this specific transition moment", "UNKNOWN — outside LEGO's existing data entirely"]
              ])
            },
            notice: "Notice: only segment 1 has a PRICE BASELINE to react to. The other two can't tell you if a price feels expensive — they have nothing to compare it to."
          }
        }
      },

      /* ================= hlm. 4 — Audience Priority Score ================= */
      4: {
        theory: {
          title: "Baca ini dulu",
          src: "Kotler, Keller & Chernev (2022) — kriteria memilih target",
          html:
            "<p>Empat pertanyaan menentukan apakah sebuah segmen layak dipilih. Skor tiap segmen 1–5:</p>" +
            "<ul>" +
            "<li><b>ATTRACTIVE</b> — jumlahnya cukup, dan punya uang untuk dibelanjakan?</li>" +
            "<li><b>ACCESSIBLE</b> — bisa kamu jangkau tanpa anggaran iklan besar?</li>" +
            "<li><b>STRATEGIC FIT</b> — produkmu memang menyelesaikan masalah mereka?</li>" +
            "<li><b>REVENUE POTENTIAL</b> — ada bukti mereka membelanjakan uang untuk hal semacam produkmu?</li>" +
            "</ul>" +
            "<p>Sejuta orang yang tidak bisa kamu jangkau nilainya lebih kecil daripada seribu orang yang bisa. Intuisi akan menarikmu ke segmen terbesar; ACCESSIBLE yang menahannya.</p>" +
            "<p><b>Primary</b> adalah audiens yang kamu desain untuknya. <b>Secondary</b> adalah audiens yang kamu aktifkan nanti. Tulis juga alasan kenapa yang lain bukan primary. Total dihitung otomatis; kalau seri, tulis alasan memecahnya.</p>"
        },
        why:
          "<p><b class='k'>Kenapa halaman ini penting:</b> ini satu-satunya titik komitmen eksplisit di Sesi 2. Primary audience mengisi Value Proposition Canvas di hlm. 5 dan blank <i>[segment]</i> di Positioning Statement Sesi 3, lalu dipakai lagi di brief identitas Sesi 4 dan rencana kanal Sesi 6. Kalau primary-nya kabur, semua halaman sesudahnya ikut kabur.</p>",
        deeper: {
          summary: "Deeper read — empat pola memilih primary di empat kasus",
          html:
            "<ul>" +
            "<li><b>Paling cocok:</b> Jumbo memilih keluarga (total tertinggi), padahal anak muda paling mudah dijangkau. Anak muda jadi secondary karena murah diaktifkan nanti.</li>" +
            "<li><b>Paling mudah dijangkau:</b> Gojek memilih rider yang sudah ada: nol biaya akuisisi. Revenue potential tetap skor terlemah, ditulis apa adanya.</li>" +
            "<li><b>Paling sulit, tapi menentukan:</b> Marvel memilih penonton umum, kelompok tersulit diyakinkan, karena hanya mereka yang punya potensi pendapatan untuk menutup risiko pendanaan.</li>" +
            "<li><b>Satu-satunya yang bisa menjawab:</b> LEGO Technic memilih hobbyist yang sudah ada karena hanya mereka yang bisa menjawab pertanyaan harga dari Sesi 1.</li>" +
            "</ul>"
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Penjumlahan tiap baris sudah dicek?",
            "Primary adalah total tertinggi, atau kamu menulis alasan kalau memilih yang lain?",
            "Secondary dan alasan memecah seri (kalau ada) tertulis?",
            "Kamu bisa menjelaskan kenapa segmen lain bukan dasar keputusan desain?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Families win on total — but young adults score highest on accessibility alone.", caveat: CAVEAT,
            values: {
              "s2.p4.scores": { cols: SCORE_COLS, rows: [["Families with young children", "5", "4", "5", "5", "19"], ["Young adults, national pride", "3", "5", "3", "2", "13"], ["Animation enthusiasts", "2", "3", "3", "2", "10"]] },
              "s2.p4.primary": "PRIMARY AUDIENCE (5+4+5+5 = 19):  Families with young children — the audience we DESIGN for. This decides the poster, the tone, and the running time.",
              "s2.p4.secondary": "SECONDARY AUDIENCE (3+5+3+2 = 13):  Young adults, national pride — the audience we ACTIVATE, not design for. They become the word-of-mouth engine in Session 6. Not a consolation prize: they scored HIGHEST of all three on accessibility, which is exactly why they are cheap to activate later."
            }
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Existing riders win on accessibility — but revenue potential is still unproven.", caveat: CAVEAT,
            values: {
              "s2.p4.scores": { cols: SCORE_COLS, rows: [["Existing GoRide riders", "5", "5", "5", "3", "18"], ["Office workers, lunch delivery", "4", "3", "3", "4", "14"], ["Diners who value local warungs", "2", "2", "3", "2", "9"]] },
              "s2.p4.primary": "Existing GoRide riders (18) — designed for. Zero acquisition cost, but revenue potential is still the weakest score — unproven, not assumed.",
              "s2.p4.secondary": "Office workers ordering lunch (14) — activated once the core experience is proven with riders first."
            }
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "The pattern breaks here — the hardest group to convince wins primary.", caveat: CAVEAT,
            values: {
              "s2.p4.scores": { cols: SCORE_COLS, rows: [["General blockbuster moviegoers", "5", "3", "2", "5", "15"], ["Existing comic readers", "2", "5", "5", "2", "14"], ["RDJ / drama audience", "3", "3", "4", "3", "13"]] },
              "s2.p4.primary": "General blockbuster moviegoers (15) — designed for. Low accessibility and low strategic fit TODAY, but the only group with the revenue potential to justify the financing risk.",
              "s2.p4.secondary": "Existing comic readers (14) — activated, not designed for. They show up opening night regardless, and their early reaction becomes social proof for the primary group."
            }
          },
          lego: {
            name: "LEGO Technic", sub: "Strategic fit — not size — decides the winner here.", caveat: CAVEAT,
            values: {
              "s2.p4.scores": { cols: SCORE_COLS, rows: [["Existing Technic hobbyists", "3", "5", "5", "3", "16"], ["Teen builders graduating up", "5", "3", "2", "4", "14"], ["Adult hobbyists, new to LEGO", "3", "2", "3", "3", "11"]] },
              "s2.p4.primary": "Existing Technic hobbyists (16) — designed for. Teens score higher on Attractive (5) and Revenue Potential (4), but they have no price baseline — they literally cannot answer Session 1's riskiest question.",
              "s2.p4.secondary": "Teen builders graduating up (14) — activated once pricing and function are proven with hobbyists first. The larger long-term growth audience, held for later."
            }
          }
        }
      },

      /* ================= hlm. 5 — Value Proposition Canvas ================= */
      5: {
        theory: {
          title: "Baca ini dulu",
          src: "Osterwalder, Pigneur, Bernarda & Smith (2014), Value Proposition Design",
          html:
            "<p>Hanya untuk <b>primary audience</b>. <b>Sisi pelanggan dulu</b> (jobs, pains, gains), sisi produk kedua. Kalau mulai dari produk, kotak pelanggan akan terisi hal-hal yang kebetulan diselesaikan produkmu.</p>" +
            "<ul>" +
            "<li><b>Jobs</b> — apa yang sedang mereka coba selesaikan: fungsional (mengisi sore bersama keluarga), emosional (merasa dekat, bangga), sosial (punya bahan obrolan). Produk media mendapat sebagian besar uangnya dari job emosional dan sosial.</li>" +
            "<li><b>Pains</b> — apa yang mengganggu, menghambat, atau mengkhawatirkan mereka hari ini. Pain yang sah adalah yang <b>diucapkan</b> seseorang kepadamu; kalau tidak, tandai sebagai asumsi.</li>" +
            "<li><b>Gains</b> — apa yang menyenangkan melebihi ekspektasi minimum. \"Pengalaman yang berkesan\" itu gain, bukan job.</li>" +
            "</ul>" +
            "<p><b>Setiap item di kanan harus menunjuk item bernama di kiri.</b> Kalau tidak punya pasangan, itu fitur yang kamu sukai, bukan value.</p>" +
            "<p><b>Insight sentence</b> ditulis terakhir: [Who] wants [motivation] — BUT [barrier] — SO [opportunity]. Insight bukan fakta, ia <b>tension</b>. BUT-nya wajib salah satu pain di kotak kiri. <b>The BUT is where the business lives.</b></p>"
        },
        why:
          "<p><b class='k'>Kenapa halaman ini penting:</b> insight sentence menjadi blank <i>[insight]</i> di Positioning Statement Sesi 3. Kalau BUT-nya berasal dari pain yang diucapkan orang, kalimat positioningmu berdiri di atas bukti. Kalau dari asumsi, itu tetap jujur, asal ditandai, dan diuji lewat wawancara di hlm. 9.</p>",
        deeper: {
          summary: "Deeper read — kalimat insight yang bisa dilacak ke halaman",
          html:
            "<ul>" +
            "<li><b>Setiap bagian kalimat menunjuk satu kotak.</b> Di Gojek: <i>want</i> = jobs, <i>BUT</i> = pains, <i>SO</i> = pain relievers.</li>" +
            "<li><b>Asumsi yang dilabeli itu jujur.</b> Semua contoh menandai BUT sebagai asumsi karena belum ada wawancara. Itu lebih baik daripada mengklaim \"didengar\".</li>" +
            "<li><b>Sempit dengan sengaja.</b> LEGO Technic: satu segmen, satu hambatan. Kalimat insight yang mencoba memuat semuanya tidak bisa diuji.</li>" +
            "<li><b>Kalau kalimatmu tetap berdiri tanpa kata BUT,</b> itu deskripsi, bukan insight.</li>" +
            "</ul>"
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Sisi pelanggan terisi sebelum sisi produk?",
            "Tiap pain reliever dan gain creator menunjuk pain atau gain bernama di kiri?",
            "BUT di insight sentence adalah salah satu pain di kotak kiri?",
            "Sumber BUT (diucapkan orang / asumsi) sudah dipilih dengan jujur?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "For the PRIMARY audience: families. Customer side filled first, from evidence gaps and honest inference.", caveat: CAVEAT,
            values: {
              "s2.p5.jobs": "Fill a holiday afternoon with something everyone enjoys. Feel close as a family. Have something to talk about afterward.",
              "s2.p5.pains": "Worry the film won't hold the kids' attention. Fear that ‘local’ means lower quality — the quality family films they know are almost all imported. [ASSUMPTION] Cost of taking the whole family.",
              "s2.p5.gains": "A story that makes the adults feel something too. Characters the kids talk about for weeks after.",
              "s2.p5.products_services": "A feature animated film with a character-driven, emotionally layered story — built for repeat family viewing.",
              "s2.p5.pain_relievers": "High production quality directly relieves the ‘local means lower quality’ fear. Humour + emotional depth serve both kids and parents at once.",
              "s2.p5.gain_creators": "A memorable character designed to create ongoing play and conversation — and future merchandise.",
              "s2.p5.insight": "Indonesian parents want cinema outings that feel culturally theirs, BUT quality family films are almost all imported and they fear \"local\" means lower quality, SO a local film with no quality compromise wins both pride and the family ritual.",
              "s2.p5.but_source": "BUT = ASSUMPTION (no parent interviews yet)"
            },
            anno: { "s2.p5.insight": "The BUT comes from the pain written in the left column. It is marked as an assumption because no parent has said it to us yet." },
            notice: "Notice: every product-side box points at a NAMED pain or gain on the left. None of them are floating features."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "For the PRIMARY audience: existing GoRide riders.", caveat: CAVEAT,
            values: {
              "s2.p5.jobs": "Get food without extra effort. Avoid downloading yet another app. Feel like the app they already trust just handles it.",
              "s2.p5.pains": "Worry the first GoFood order will be unreliable. Uncertain if merchant selection is any good. Don't want to re-enter payment or address details.",
              "s2.p5.gains": "One-tap ordering using saved details. A single loyalty system across rides and food. Feeling like the app grows with them.",
              "s2.p5.products_services": "GoFood, reusing the same account, saved addresses, and GoPay balance already set up for GoRide.",
              "s2.p5.pain_relievers": "Reused saved details relieve the re-entry pain. A curated, vetted merchant list for launch relieves the reliability worry.",
              "s2.p5.gain_creators": "One loyalty and rewards system spanning rides and food creates the ‘grows with me’ gain.",
              "s2.p5.insight": "GoRide riders want food without extra effort from the app they already trust, BUT they worry the first GoFood order will be unreliable, SO a curated, vetted launch merchant list lets GoFood borrow the trust GoRide has already earned.",
              "s2.p5.but_source": "BUT = ASSUMPTION (no rider interviews yet)"
            },
            anno: { "s2.p5.insight": "Every part of this sentence points at a box on this page: want = jobs, BUT = pains, SO = pain relievers." },
            notice: "Notice: every relief and gain depends on REUSE — nothing here asks the rider to trust anything new except the food itself."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "For the PRIMARY audience: general moviegoers who don't know the character.", caveat: CAVEAT,
            values: {
              "s2.p5.jobs": "Have a satisfying couple of hours. Feel like the ticket was worth it. Have something fun to talk about with friends afterward.",
              "s2.p5.pains": "Don't want to feel like they need ‘homework’ (reading comics) to follow the story. Worry a comic movie will feel silly. Skeptical that a lesser-known comic character can carry a film.",
              "s2.p5.gains": "Walking out excited enough to recommend it. Discovering there's ‘more to come’ without feeling confused by it.",
              "s2.p5.products_services": "A self-contained action film, witty and grounded rather than campy, led by a charismatic performance built to carry it alone.",
              "s2.p5.pain_relievers": "A self-contained story needing zero comic knowledge relieves the ‘homework’ pain. Grounded tone relieves the ‘silly’ fear. Star power relieves the ‘lesser-known character’ doubt.",
              "s2.p5.gain_creators": "A short, light post-credits tease creates the ‘more to come’ gain without requiring the audience to understand it to enjoy the film.",
              "s2.p5.insight": "General moviegoers want a satisfying couple of hours without needing homework, BUT they are skeptical that a lesser-known comic character can carry a film, SO a self-contained, grounded, star-led story removes the barrier for someone who knows nothing about the character.",
              "s2.p5.but_source": "BUT = ASSUMPTION (no non-comic-reader screening yet)"
            },
            anno: { "s2.p5.insight": "The facts this team has describe comic readers, so this BUT cannot be 'heard' yet. It is labelled honestly and tested through the page 9 interviews." },
            notice: "Notice: every pain reliever is about REMOVING a barrier for someone who knows nothing — not about rewarding someone who knows everything."
          },
          lego: {
            name: "LEGO Technic", sub: "For the PRIMARY audience: existing Technic hobbyists.", caveat: CAVEAT,
            values: {
              "s2.p5.jobs": "Build something that functions like real engineering. Deepen a hobby they already love. Feel their expertise and patience are respected, not talked down to.",
              "s2.p5.pains": "Skeptical that a higher price means more real function and not just more pieces. Worry added complexity is for marketing's sake. Frustration when 'advanced' turns out gimmicky.",
              "s2.p5.gains": "Bragging rights among fellow hobbyists for the most ambitious build yet. Discovering genuinely new mechanical techniques.",
              "s2.p5.products_services": "A flagship set with real motorised, precision mechanics not previously offered at this tier.",
              "s2.p5.pain_relievers": "A working prototype demoed to hobbyist reviewers BEFORE launch relieves the 'gimmick' skepticism. Pricing transparently tied to real engineering complexity relieves the 'more pieces' skepticism.",
              "s2.p5.gain_creators": "Genuinely new mechanical techniques never offered before create the bragging-rights and discovery gain.",
              "s2.p5.insight": "Existing Technic hobbyists want to build something that works like real engineering, BUT they are skeptical that a higher price means more real function and not just more pieces, SO a working prototype shown to hobbyist reviewers before launch, with the price tied to real engineering complexity, earns the right to charge more.",
              "s2.p5.but_source": "BUT = ASSUMPTION (no pricing test at the flagship price yet)"
            },
            anno: { "s2.p5.insight": "The sentence is narrow on purpose: one segment, one barrier. It is the same fear as Session 1, now pointed at one testable behaviour." },
            notice: "Notice: every pain reliever answers a skepticism specific to people who ALREADY own Technic — not a general audience."
          }
        }
      },

      /* ================= hlm. 6 — Competitor Benchmark Matrix ================= */
      6: {
        theory: {
          title: "Baca ini dulu",
          src: "Kotler, Keller & Chernev (2022) — competitive frames of reference",
          html:
            "<p>Pesaing sejati ditentukan bukan oleh <b>kemiripan produk</b>, tapi oleh <b>perebutan sumber daya yang sama</b>: waktu atau uang audiens. Lima kolom:</p>" +
            "<ul>" +
            "<li><b>US</b> — produkmu, sebagai baseline.</li>" +
            "<li><b>DIRECT</b> — hal yang sama untuk audiens yang sama.</li>" +
            "<li><b>INDIRECT</b> — hal berbeda yang memenuhi kebutuhan yang sama.</li>" +
            "<li><b>SUBSTITUTE</b> — pilihan \"tidak melakukan apa-apa\": tinggal di rumah, streaming, masak sendiri. Pesaing sebuah game bisa jadi tidur.</li>" +
            "<li><b>BENCHMARK</b> — bukan pesaing, tapi standar kualitas yang dipakai audiens untuk menilaimu, mau atau tidak.</li>" +
            "</ul>" +
            "<p><b>Baris \"Who exactly?\" tidak opsional:</b> sebut brand yang nyata di setiap kolom. Kolom yang tidak bisa kamu sebut namanya adalah kategori yang belum kamu riset. Tulis UNKNOWN di sel yang belum kamu cek; sel kosong terbaca lupa, UNKNOWN terbaca jujur. Untuk kolom US, jangan tulis asumsi positif tentang dirimu sendiri.</p>"
        },
        why:
          "<p><b class='k'>Kenapa halaman ini penting:</b> matriks ini adalah <i>competitor analysis</i>, salah satu jenis bukti di silabus §7 dan bagian dari minimum yang direkomendasikan (\"one competitor or comparable-brand analysis\"). Points of Parity dan Points of Difference di Sesi 3 diturunkan langsung dari matriks ini, termasuk kolom indirect dan substitute. Semua nama di baris pertama harus muncul lagi di Perceptual Map (hlm. 7).</p>",
        deeper: {
          summary: "Deeper read — benchmark sering dikira pesaing",
          html:
            "<ul>" +
            "<li><b>Benchmark bukan pesaing.</b> Pixar untuk Jumbo, aplikasi bank untuk GoFood, mesin sungguhan (ekskavator Liebherr) untuk LEGO Technic: standar, bukan pilihan nyata audiens.</li>" +
            "<li><b>Jujur soal dirimu sendiri.</b> Jumbo menulis tiga UNKNOWN di kolom US: tim lebih tahu tentang pesaingnya daripada tentang bagaimana dirinya dipersepsikan, dan mengatakannya.</li>" +
            "<li><b>Cek kekuatan pesaing di matriks dan posisinya di peta</b>; keduanya sering bertentangan kalau salah satunya ditulis dari perasaan.</li>" +
            "</ul>"
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Kelima kolom di baris \"Who exactly?\" menyebut brand nyata, atau UNKNOWN?",
            "Tidak ada sel kosong; yang belum dicek ditulis UNKNOWN?",
            "Kolom US tidak berisi tebakan yang menyanjung diri sendiri?",
            "BENCHMARK adalah standar, bukan pesaing langsung?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Row 1 names the actual players. Where the team has not checked, it writes UNKNOWN — including about itself.", caveat: CAVEAT,
            values: { "s2.p6.matrix": { cols: MX_COLS, rows: [
              ["Who exactly?", "Jumbo (Visinema)", "Si Juki, Nussa and other local animated family titles in the same window", "Trans Studio, Dufan, mall play centres", "Netflix and Disney+ Hotstar at home", "Pixar / Disney Animation"],
              ["Audience", "Families, holiday outing", "Families, same window", "Families wanting a day out", "Families staying in", "Global family audiences"],
              ["Promise", "Local pride + real quality", "Varies, often lower budget", "A different kind of togetherness", "Convenience, zero extra cost", "Guaranteed polish and craft"],
              ["Price", "UNKNOWN — ticket tier not set yet", "Similar ticket price (not verified)", "Free to low-cost", "Already paid for (subscription)", "Standard ticket, same range"],
              ["Channel", "Cinema, social, schools", "Cinema, local press", "Malls, parks, home", "In-home apps", "Cinema, global marketing"],
              ["Identity/tone", "Warm, proudly local, crafted", "Varies widely", "Not applicable", "Familiar, low-effort", "Polished, universal, safe"],
              ["Their strength", "UNKNOWN — we have not tested what audiences think our strength is", "Lower price, local familiarity", "No cost, no commute", "Zero effort required", "Trusted quality, global reach"],
              ["Their weakness", "UNKNOWN — same reason", "Perceived lower production quality", "No shared cinema ritual", "No shared family moment", "Not culturally ‘ours’"]
            ] } },
            notice: "Notice the three UNKNOWNs in the US column. The team knows more about its competitors than about how it is perceived itself — and says so, rather than writing a flattering guess. UNKNOWN is a research task; a blank cell is a forgotten one."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "The gap this reveals becomes next week's positioning.", caveat: CAVEAT,
            values: { "s2.p6.matrix": { cols: MX_COLS, rows: [
              ["Who exactly?", "GoFood (Gojek)", "GrabFood, ShopeeFood", "Restaurants' own phone / WhatsApp ordering", "Cooking at home, the warung next door", "Mobile-banking apps (which one riders trust most: UNKNOWN)"],
              ["Audience", "GoRide riders first", "Broad food-delivery seekers", "Loyal regulars of one restaurant", "Budget/time-conscious cooks", "Everyday-spend trusted apps (banking, etc.)"],
              ["Promise", "One app that just handles it", "Wide selection, discounts", "Personal relationship, no fees", "Cheapest possible option", "Total reliability and security"],
              ["Price", "Standard delivery + service fee", "Competitive, discount-heavy", "No delivery fee", "Lowest cost", "N/A"],
              ["Channel", "Already inside the app", "App stores, heavy paid ads", "Word of mouth, phone", "Habit, home kitchen", "Embedded in daily life"],
              ["Identity/tone", "Familiar, convenient, reused trust", "Flashy, deal-driven", "Personal, informal", "Practical", "Trusted, invisible infrastructure"],
              ["Their strength", "UNKNOWN — not tested with diners yet", "Dedicated food-only focus, more merchants", "Zero platform fee", "Full control, cheapest", "Total audience trust"],
              ["Their weakness", "UNKNOWN — not tested with diners yet", "Users must trust a new app and new payment info", "Inconsistent, no tracking", "Requires time and effort", "Not applicable to food specifically"]
            ] } }
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "The gap this reveals becomes next week's positioning.", caveat: CAVEAT,
            values: { "s2.p6.matrix": { cols: MX_COLS, rows: [
              ["Who exactly?", "Iron Man (Marvel Studios)", "Spider-Man, X-Men films", "Pirates of the Caribbean, Transformers", "Staying home: TV and DVD", "Batman Begins, The Dark Knight"],
              ["Audience", "Comic + mainstream, unproven mix", "Comic fans + mainstream, proven mix", "General blockbuster fans, no comic tie", "Budget/time constrained", "Everyone — the trusted standard"],
              ["Promise", "A connected universe starts here", "A faithful, beloved-hero adaptation", "Big spectacle, zero homework", "Convenience, free", "Guaranteed quality"],
              ["Price", "Standard ticket", "Standard ticket", "Standard ticket", "Lowest, already home", "Standard ticket"],
              ["Channel", "Building marketing machine from scratch", "Established studio marketing machine", "Broad, well-funded marketing", "Already in the home", "Decades of built trust"],
              ["Identity/tone", "Grounded, witty, self-aware", "Proven, familiar, safe", "Accessible, no baggage", "Default", "The standard itself"],
              ["Their strength", "UNKNOWN — no general-audience test yet", "Character already mainstream-famous", "No unfamiliar-character risk", "Zero cost or effort", "Total audience trust"],
              ["Their weakness", "UNKNOWN — no general-audience test yet", "None inherent — the tough one to beat", "No built-in mythology to expand into a franchise", "No communal opening-weekend moment", "N/A — it's the bar, not a real option"]
            ] } }
          },
          lego: {
            name: "LEGO Technic", sub: "The gap this reveals becomes next week's positioning.", caveat: CAVEAT,
            values: { "s2.p6.matrix": { cols: MX_COLS, rows: [
              ["Who exactly?", "LEGO Technic flagship set", "Mould King, Cada", "Tamiya, Revell scale kits", "LEGO Technic sets already owned", "Real machines (e.g. Liebherr excavator)"],
              ["Audience", "Existing Technic hobbyists first", "Serious hobbyist builders generally", "Scale-model hobbyists (die-cast, plastic kits)", "Hobbyists who already own simpler Technic sets", "Anyone with real engineering interest"],
              ["Promise", "Real function, at a real price", "Complex, challenging builds", "Extreme visual/detail realism", "'You already have something like this'", "The genuine thing itself"],
              ["Price", "Premium, justified by function", "Premium", "Varies widely, often premium", "Free — already owned", "N/A"],
              ["Channel", "Existing Technic community + hobby retail", "Hobby retail, direct-to-consumer", "Specialty hobby shops", "Already owned", "The real world"],
              ["Identity/tone", "Serious, functional, LEGO-trusted", "Niche, dedicated", "Serious, craftsman", "Familiar, comfortable", "The ultimate standard"],
              ["Their strength", "UNKNOWN — hobbyist price tolerance untested", "Deep catalogue for hobbyists", "Extreme realism", "Zero additional cost", "Total authenticity"],
              ["Their weakness", "UNKNOWN — hobbyist price tolerance untested", "Smaller brand trust and recognition than LEGO", "Static — doesn't build genuine mechanical function", "No new challenge or bragging rights", "N/A — it's the bar, not a real option"]
            ] } }
          }
        }
      },

      /* ================= hlm. 7 — Perceptual (Positioning) Map ================= */
      7: {
        theory: {
          title: "Baca ini dulu",
          src: "Kotler, Keller & Chernev (2022) — perceptual mapping",
          html:
            "<p>Peta ini <b>diturunkan dari matriks hlm. 6</b>, bukan digambar dari perasaan.</p>" +
            "<ul>" +
            "<li><b>Dua sumbu, cuma dua.</b> Kalau ada tiga hal yang ingin diklaim, satu harus keluar dari peta. Peta dua sumbu tidak bisa membawa tiga klaim; kalau dipaksakan, setiap titik jadi bisa diperdebatkan.</li>" +
            "<li><b>Sumbu adalah hal yang audiens pakai untuk menilai</b>, bukan hal yang membuatmu terlihat bagus. Uji: apakah audiensmu akan menjelaskan pilihannya dengan sumbu ini? Brand mana yang mengalahkanmu di salah satu sumbu? Kalau tidak ada, sumbunya dipilih khusus untukmu.</li>" +
            "<li><b>Setiap brand di hlm. 6 harus muncul di peta.</b> Kalau ada yang tidak muat, sumbunya yang salah, bukan brand-nya. Tombol di bawah peta menambahkan nama dari baris \"Who exactly?\" hlm. 6.</li>" +
            "<li><b>Kuadran kosong</b> hanya peluang kalau audiens memang menginginkan isinya. Kosong karena berharga dan sulit, atau kosong karena tidak ada yang mau? Kalau tidak ada kuadran kosong, itu juga fakta.</li>" +
            "</ul>"
        },
        why:
          "<p><b class='k'>Kenapa halaman ini penting:</b> celah yang ditemukan di peta ini adalah posisi yang akan diklaim Positioning Statement Sesi 3. Peta yang jujur, termasuk dua titik \"hari ini\" dan \"target\" bila belum sampai, mencegah kamu mengklaim posisi yang belum kamu tempati.</p>",
        deeper: {
          summary: "Deeper read — dua titik untuk satu brand, dan klaim yang harus dibuang",
          html:
            "<ul>" +
            "<li><b>Dua titik, satu brand.</b> Gojek dan LEGO Technic menaruh dua titik: posisi hari ini dan posisi target. Jarak di antaranya adalah pekerjaan semester ini.</li>" +
            "<li><b>Buang klaim ketiga.</b> Jumbo awalnya ingin membawa klaim \"seluruh keluarga, bukan hanya anak\". Dua sumbu tidak bisa memuatnya, jadi klaim itu dipindah ke positioning statement.</li>" +
            "<li><b>Kuadran kosong karena sulit, bukan karena tidak diinginkan.</b> Marvel sendirian di kuadran \"karakter asing + semesta terhubung\": taruhan terbesar di peta, dengan pola yang sama seperti Scorecard Sesi 1 (diferensiasi tertinggi, bukti terendah).</li>" +
            "</ul>"
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Kedua sumbu adalah hal yang dipakai audiens untuk memilih?",
            "Setiap brand di baris \"Who exactly?\" hlm. 6 ada di peta?",
            "QUADRANT NOTES menjelaskan, satu baris per pemain, di kuadran mana dan kenapa?",
            "Kalau ada kuadran kosong, kamu sudah menulis kenapa kosong?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Two axes — and the team had to drop a third it wanted to keep.", caveat: CAVEAT,
            values: {
              "s2.p7.axes": "GLOBALLY POLISHED ↔ ROUGHER / LOWER POLISH · IMPORTED, NOT OURS ↔ CULTURALLY OURS",
              "s2.p7.points": { items: ["Imported studios", "Older local titles", "JUMBO (target)"] },
              "s2.p7.quadrant_notes": "Imported studios — polished, but not culturally ours.\nOlder local titles — ours, but widely seen as lower-polish.\nJumbo (target) — the untried top-right: ours AND polished.\n\nWHAT WE HAD TO DROP\nWe first tried to carry a third claim — “whole family, not kids-only”. Two axes cannot hold three claims, and adding it made every dot arguable. So it moved out of the map and into the positioning statement next week. The map now claims only what it can show."
            },
            notice: "The top-right quadrant is empty because it is HARD, not because it is unwanted — imported studios prove families want polish, older local titles prove they want stories that are theirs. This gap is what next week's positioning statement will claim."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Two axes diners actually judge food-ordering options by.", caveat: CAVEAT,
            values: {
              "s2.p7.axes": "AXIS 2: ONE APP FOR EVERYTHING ↔ SINGLE-PURPOSE APP · UNPROVEN FOR FOOD ↔ PROVEN FOR FOOD",
              "s2.p7.points": { items: ["Dedicated food apps", "GoFood (today)", "GoFood (target)"] },
              "s2.p7.quadrant_notes": "Plot: dedicated apps are proven for food but single-purpose. GoFood today is one-app-for-everything but still unproven for food — the target quadrant is earned, not assumed.\n\nDedicated food apps: proven, but ask users to trust a brand-new app entirely. GoFood today: trusted broadly, but not yet proven specifically for food — hence two dots, current and target. Moving from one to the other IS this semester's job."
            },
            notice: "This gap — and the two-dot honesty about it — is what next week's positioning statement will claim."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "The same shape as Session 1's scores: high differentiation, empty quadrant, low proof.", caveat: CAVEAT,
            values: {
              "s2.p7.axes": "AXIS 2: SEED OF A CONNECTED UNIVERSE ↔ STANDALONE FILM ONLY · UNFAMILIAR CHARACTER ↔ WELL-KNOWN CHARACTER",
              "s2.p7.points": { items: ["Other franchise films (proven, standalone)", "Iron Man (target)"] },
              "s2.p7.quadrant_notes": "Plot: every proven competitor sits at well-known + standalone. The connected-universe quadrant is empty — because nobody has proven it, not because nobody wants it.\n\nOther comic-hero films: well-known character, but standalone — no announced universe plan. Other blockbusters: well-known IP, standalone. Iron Man: alone in unfamiliar + connected-universe — the biggest bet on the whole map."
            },
            notice: "This is the same pattern as Session 1's scorecard: highest differentiation, lowest evidence."
          },
          lego: {
            name: "LEGO Technic", sub: "Two axes hobbyists actually judge a set like this by.", caveat: CAVEAT,
            values: {
              "s2.p7.axes": "AXIS 2: PREMIUM / SPECIALIST ↔ AFFORDABLE / MASS · TOY-LIKE, SIMPLE ↔ GENUINELY FUNCTIONAL",
              "s2.p7.points": { items: ["Core LEGO sets", "Technic (today)", "Technic flagship (target)", "Scale-model kits"] },
              "s2.p7.quadrant_notes": "Plot: scale-model kits are premium and detailed, but not mechanically functional. Core LEGO is functional-simple and affordable. The target — genuinely functional AND premium, still trusted as LEGO — is the flagship's specific claim.\n\nTwo Technic dots, same honesty as the Gojek example: where the sub-line sits today, and where the flagship aims. The gap is this semester's actual job — and the reason Session 1 flagged evidence quality so low."
            },
            notice: "This gap is what next week's positioning statement will claim."
          }
        }
      },

      /* ================= hlm. 8 — Assumption-Risk Matrix ================= */
      8: {
        theory: {
          title: "Baca ini dulu",
          src: "Bland & Osterwalder (2019), Testing Business Ideas",
          html:
            "<p>Empat kotak, tapi <b>hanya kotak kiri-atas yang penting hari ini</b>: HIGH IMPORTANCE · LOW CERTAINTY. Itu rencana validasimu.</p>" +
            "<ul>" +
            "<li><b>Asumsi mana yang, kalau salah, membunuh proyek?</b> Bukan membuatnya lebih sulit, membunuhnya. Uji cepat: kalau kesalahan itu bisa diperbaiki nanti dengan mengubah satu angka, itu bukan asumsi paling berbahaya.</li>" +
            "<li><b>Satu asumsi, satu variabel.</b> Jangan gabungkan dua hal dalam satu kalimat; kalau tesnya gagal, kamu tidak tahu yang mana yang salah.</li>" +
            "<li>Setiap pembuat produk berasumsi \"orang mau membayar\". Itu wajar. Pertanyaan sebenarnya: bagaimana kamu akan mencari tahu?</li>" +
            "</ul>"
        },
        why:
          "<p><b class='k'>Kenapa halaman ini penting:</b> asumsi di kotak TEST FIRST disalin ke hlm. 9 dan menjadi dasar wawancaramu minggu ini. Biasanya ia adalah ketakutan yang sama dengan kotak 8 Canvas Sesi 1, sekarang dipersempit menjadi satu perilaku yang bisa diuji.</p>",
        deeper: {
          summary: "Deeper read — dari kekhawatiran luas ke satu perilaku",
          html:
            "<ul>" +
            "<li><b>Persempit ke perilaku.</b> Gojek mengubah kekhawatiran Sesi 1 (\"apakah kepercayaan berpindah\") menjadi satu perilaku: apakah rider benar-benar mengubah kebiasaan untuk memesan makanan di aplikasi yang sama.</li>" +
            "<li><b>Siapa yang bisa kamu uji?</b> Asumsi Marvel menyangkut kelompok yang hampir tidak bisa dijangkau tim untuk pengujian: penonton umum, bukan penggemar sendiri. Rencanakan cara menjangkau mereka.</li>" +
            "<li><b>Kotak lain tetap diisi</b> supaya jelas apa yang sengaja tidak diuji, dan kenapa.</li>" +
            "</ul>"
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Kotak TEST FIRST berisi satu asumsi yang, kalau salah, membunuh proyek?",
            "Asumsi itu hanya memuat satu variabel?",
            "Asumsi itu bisa dilacak ke kotak 8 Canvas atau skor rendah Sesi 1?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "One assumption in the top-left box is what gets tested this week.", caveat: CAVEAT,
            values: {
              "s2.p8.test_first": "Parents will believe a local animated film matches imported quality WITHOUT seeing it first. If wrong, the whole marketing strategy collapses.",
              "s2.p8.monitor": "Families go to the cinema together during the holiday period. Well established — no test needed.",
              "s2.p8.test_later": "Which social platform performs best for the trailer. Worth knowing, won't kill the project.",
              "s2.p8.ignore": "Families prefer Bahasa Indonesia audio over a dubbed import. Safe to assume, low stakes either way."
            },
            notice: "Notice: this is the SAME assumption flagged in Session 1's Canvas box 8 — today it gets a name and a test plan."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "The same trust-transfer question from Session 1, now sharpened into a testable claim.", caveat: CAVEAT,
            values: {
              "s2.p8.test_first": "GoRide riders will actually switch their habitual behaviour to also order food through the same app — not just use it for rides.",
              "s2.p8.monitor": "Riders already trust the app with payment info via GoPay. No need to test this separately — it's already proven.",
              "s2.p8.test_later": "Whether GoFood needs its own separate visual badge within the app, or just blends in.",
              "s2.p8.ignore": "Riders prefer cashless payment over cash on delivery. Safe to assume, low stakes either way."
            },
            notice: "Notice: this top-left box narrows Session 1's broad worry into ONE testable behaviour — that's the whole point of Session 2."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "One assumption in the top-left box decides whether the studio survives this bet.", caveat: CAVEAT,
            values: {
              "s2.p8.test_first": "General audiences who don't know the character will still show up in blockbuster numbers, based on marketing alone.",
              "s2.p8.monitor": "Comic fans will show up opening weekend regardless of marketing spend — well established, no test needed.",
              "s2.p8.test_later": "Whether the post-credits scene should play before or after the full credits roll.",
              "s2.p8.ignore": "Audiences expect an origin-story structure for a first superhero film. Safe assumption, low stakes either way."
            },
            notice: "Notice: unlike Jumbo and Gojek, this top-left assumption is about a group the team can barely reach for testing — general audiences, not their own fans."
          },
          lego: {
            name: "LEGO Technic", sub: "Session 1's broad fear, now sharpened into one testable claim.", caveat: CAVEAT,
            values: {
              "s2.p8.test_first": "Existing Technic hobbyists will pay significantly more for genuinely greater complexity — not just more pieces, but real added function.",
              "s2.p8.monitor": "Existing hobbyists value real function over cosmetic complexity — well established from years of community feedback.",
              "s2.p8.test_later": "Whether the flagship set needs app-based digital instructions alongside the physical booklet.",
              "s2.p8.ignore": "Hobbyists expect a long, detailed build for a flagship set — that's part of the appeal, not a deterrent."
            },
            notice: "Notice: this is the SAME fear from Session 1's Canvas box 8, now narrowed to one specific, priceable behaviour."
          }
        }
      },

      /* ================= hlm. 9 — Interview Guide & Validation Plan ================= */
      9: {
        theory: {
          title: "Baca ini dulu",
          src: "Bland & Osterwalder (2019), Testing Business Ideas — past behaviour beats stated intention",
          html:
            "<p>Tiga jebakan riset membuat data terlihat lebih positif dari kenyataan:</p>" +
            "<ul>" +
            "<li><b>Lie 1 · the friendly sample</b> — hanya bertanya ke teman. Mereka ingin mendukungmu, bukan berarti benar.</li>" +
            "<li><b>Lie 2 · the polite yes</b> — \"would you buy this?\" selalu dijawab ya. Tanya masa lalu: \"dalam 3 bulan terakhir, pernah beli kaos seharga ini?\"</li>" +
            "<li><b>Lie 3 · hearing what you want</b> — mengingat dua komentar bagus, lupa delapan yang biasa saja.</li>" +
            "</ul>" +
            "<p>Satu aturan mengalahkan ketiganya: <b>past behaviour beats stated intention.</b></p>" +
            "<ul>" +
            "<li><b>Tidak ada \"would you\".</b> Tidak ada penjelasan tentang produkmu; kalau responden tahu apa yang kamu jual, jawabannya sudah rusak. Buka dengan \"Ceritakan terakhir kali kamu…\".</li>" +
            "<li><b>VALIDATION METHOD</b> menyebut metode, siapa yang mengerjakan (orang spesifik, bukan \"tim\"), kapan, dan <b>hasil seperti apa yang membuktikan kamu salah</b>. Tanpa itu, wawancara hanya mengumpulkan cerita.</li>" +
            "<li><b>Catatan mentah, bukan ringkasan.</b> Ringkasan sudah berisi tafsiranmu; yang kamu butuhkan kalimat aslinya. Tulis di daftar Interview notes di bawah.</li>" +
            "</ul>"
        },
        why:
          "<p><b class='k'>Kenapa halaman ini penting:</b> lima wawancara dengan orang di luar tim adalah minimum yang direkomendasikan silabus §7, dan jenis bukti dari audiens primer di luar lingkar tim yang diminta Gate 2. Lima wawancara dengan teman sekelas tidak memenuhi ambang itu (Lie 1). Catatan wawancara boleh dipakai bersama dalam satu grup, tapi tiap orang menulis interpretasinya sendiri. Wawancara boleh menyusul sampai {{interviews_due}}, ikut file Minggu 2.</p>",
        deeper: {
          summary: "Deeper read — pertanyaan yang tidak menyebut produkmu",
          html:
            "<ul>" +
            "<li><b>Tidak satu pun pertanyaan contoh menyebut nama produknya</b> (Jumbo, GoFood, Iron Man, set flagship). Itu disengaja.</li>" +
            "<li><b>Tulis hasil yang membuktikanmu salah.</b> Contoh Jumbo: \"If 3 or more say they have skipped a local film purely on looks, the assumption is confirmed as the real barrier.\"</li>" +
            "<li><b>Wawancarai segmen primer.</b> Marvel mewawancarai penonton umum yang tidak membaca komik, bukan penggemar. LEGO Technic: hobbyist sungguhan, bukan kontak tim desain.</li>" +
            "</ul>"
        },
        reverse: {
          title: "Cek terbalik sebelum submit",
          items: [
            "Tidak ada pertanyaan \"would you\" atau penjelasan produk?",
            "Setiap pertanyaan menanyakan masa lalu yang nyata?",
            "Riskiest assumption disalin persis dari kotak TEST FIRST hlm. 8?",
            "VALIDATION METHOD menyebut siapa, kapan, dan hasil yang membuktikanmu salah?",
            "Wawancara dilakukan dengan orang yang BUKAN temanmu, dan catatannya mentah?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "For a parent in the primary segment. Notice: not one question mentions Jumbo.", caveat: CAVEAT,
            values: {
              "s2.p9.q1_warmup": "Tell me about the last film you took the kids to see.",
              "s2.p9.q2_past": "How did you choose it? Who decided?",
              "s2.p9.q3_pain": "Was there anything about it that disappointed you?",
              "s2.p9.q4_workaround": "Have you ever skipped a film because it looked lower quality?",
              "s2.p9.q5_decision": "Who else was involved — who actually paid?",
              "s2.p9.q6_close": "Have you chosen an Indonesian film for the family before? What happened?",
              "s2.p9.riskiest_assumption": "Parents will believe local animation matches imported quality without seeing it first.",
              "s2.p9.validation_method": "5 parent interviews, strangers, past-behaviour only. Owner: the producer on our team. If 3 or more say they have skipped a local film purely on looks, the assumption is confirmed as the real barrier."
            },
            note: NO_NOTES
          },
          gojek: {
            name: "Gojek / GoFood", sub: "For an existing GoRide rider. Notice: not one question mentions GoFood.", caveat: CAVEAT,
            values: {
              "s2.p9.q1_warmup": "Tell me about the last time you used Gojek — what was it for?",
              "s2.p9.q2_past": "How do you usually order food when you don't cook? What did you use last time?",
              "s2.p9.q3_pain": "What's frustrating about that process?",
              "s2.p9.q4_workaround": "Have you ever ordered through an app you already had for something else? What happened?",
              "s2.p9.q5_decision": "Who decides where the food comes from — price, familiarity, speed?",
              "s2.p9.q6_close": "Anything about ordering food I haven't asked about that matters to you?",
              "s2.p9.riskiest_assumption": "GoRide riders will actually switch their behaviour to order food through the same app.",
              "s2.p9.validation_method": "5 GoRide rider interviews, strangers, past-behaviour only."
            },
            note: NO_NOTES
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "For a general moviegoer, NOT a comic reader. Not one question mentions Iron Man.", caveat: CAVEAT,
            values: {
              "s2.p9.q1_warmup": "Tell me about the last big action movie you saw in a theatre.",
              "s2.p9.q2_past": "What made you decide to see it — the trailer, a friend, the actor?",
              "s2.p9.q3_pain": "Has a movie based on a comic or book ever felt confusing because you didn't know the source? Tell me.",
              "s2.p9.q4_workaround": "Did you look anything up beforehand, or skip something that seemed like homework?",
              "s2.p9.q5_decision": "Who do you usually go to the movies with, and who picks what you see?",
              "s2.p9.q6_close": "Anything else that makes you skip or choose an action movie I haven't asked about?",
              "s2.p9.riskiest_assumption": "General audiences will show up in blockbuster numbers based on marketing alone, without knowing the character.",
              "s2.p9.validation_method": "Test-screening reactions from non-comic-reading moviegoers."
            },
            note: NO_NOTES
          },
          lego: {
            name: "LEGO Technic", sub: "For an existing Technic hobbyist. Not one question mentions the new flagship set.", caveat: CAVEAT,
            values: {
              "s2.p9.q1_warmup": "Tell me about the last advanced set you built.",
              "s2.p9.q2_past": "What made you decide to buy that particular set?",
              "s2.p9.q3_pain": "Has an 'advanced' set ever felt more complex for marketing's sake than for real engineering value? Tell me.",
              "s2.p9.q4_workaround": "Have you ever skipped buying a set because the price didn't match the added complexity?",
              "s2.p9.q5_decision": "When deciding if a set is worth the price, what do you look at first?",
              "s2.p9.q6_close": "Anything else that makes you trust or distrust whether a set's complexity is 'real'?",
              "s2.p9.riskiest_assumption": "Existing hobbyists will pay significantly more for genuinely greater mechanical complexity.",
              "s2.p9.validation_method": "5 Technic hobbyist interviews, strangers, past-behaviour only."
            },
            note: NO_NOTES
          }
        }
      }
    }
  };
})();
