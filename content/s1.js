/* content/s1.js — teks Sesi 1: teori, kenapa penting, deeper read, cek terbalik, contoh empat kasus.
 * Sumber teori: Sesi-1-Bedah-Mendalam_v5.md (Keller & Swaminathan 2020; Cagan 2017; Aaker 2014),
 * silabus §5 (CLO 1), §8 Sesi 1, §13 (Gate 1), S1-student-guide-*-walkthrough.md.
 * Contoh: verbatim dari S1-worked-example-{kasus}.pptx (v2, 14 Okt 2026).
 * Konten tidak boleh memuat tanggal kalender; pakai {{due}}.
 */
window.CB = window.CB || {}; CB.content = CB.content || {};
CB.content.S1 = {
  pages: {
    2: {
      theory: {
        title: "Baca ini dulu",
        src: "Keller & Swaminathan (2020), Strategic Brand Management — customer-based brand equity",
        html:
          "<p><b>Produk adalah benda yang kamu buat. Brand adalah apa yang orang pikirkan dan rasakan tentangnya.</b> Produk bisa kamu kendalikan penuh; brand hanya bisa kamu pengaruhi. Canvas ini dipotong persis di garis itu: sisi kiri <b>INSIDE</b> (apa yang kamu punya), sisi kanan <b>OUTSIDE</b> (apa yang mereka pikirkan).</p>" +
          "<ul>" +
          "<li><b>Ini potret hari ini, bukan rencana.</b> Tulis fakta, dalam kalimat masa kini. Kalau sesuatu baru direncanakan, ia belum ada.</li>" +
          "<li><b>UNKNOWN adalah jawaban yang sah.</b> Kalau kamu belum pernah bertanya ke orang di luar tim, kotak 4 wajib UNKNOWN. Opini tim tentang dirinya sendiri bukan persepsi, itu harapan.</li>" +
          "<li><b>Kotak 8 bukan tempat ide baru.</b> Ia mengumpulkan semua UNKNOWN dan semua hal yang menakutkan dari kotak 1–7. Kotak inilah output halaman ini.</li>" +
          "</ul>" +
          "<p><b>Urutan isi:</b> sisi kiri dulu (kotak 1, 3, 5), lalu sisi kanan (kotak 2, 4, 6). Setelah itu kotak 7, dan kotak 8 paling akhir.</p>"
      },
      why:
        "<p><b class='k'>Kenapa halaman ini penting:</b> halaman ini adalah bagian pertama Gate 1 Pack, bersama Commercial Readiness Scorecard (hlm. 6) dan tiga masalah di hlm. 7 atas. Gate 1 di silabus berbunyi <i>\"The team has defined a valid commercial-branding problem and priority.\"</i> Setiap masalah yang kamu tulis di hlm. 7 harus bisa ditunjuk asalnya, yaitu satu butir di kotak 8 atau satu skor rendah di hlm. 6. Kotak 8 yang kosong berarti masalahmu tidak punya jejak.</p>" +
        "<p>Halaman ini melatih CLO 1 — Market and Brand Diagnosis: <i>\"Analyse the market, audience, competition, cultural context, and commercial branding problems … using relevant evidence.\"</i> Isinya menjadi bagian <i>Product description</i> dan <i>Current brand condition</i> dari Commercial Brand Audit, output Sesi 1 yang masuk komponen Commercial Brand and Market Diagnostic.</p>" +
        "<p>Ke depan: kotak 4 dan 7 menjadi bahan Evidence Review di Sesi 2 (hlm. 2), tempat kamu memilah fakta, interpretasi, dan tebakan. Kotak 6 menjadi titik awal Competitor Benchmark Matrix di Sesi 2 (hlm. 6).</p>",
      deeper: {
        summary: "Deeper read — empat jebakan yang membuat Canvas terlihat lebih sehat dari kenyataannya",
        html:
          "<ul>" +
          "<li><b>Views bukan pembeli.</b> Dalam Brand Resonance Model (Keller), orang yang tahu produkmu ada baru di Lantai 1 (salience). Uang sungguhan ada di Lantai 4 (resonance), saat orang membeli lagi dan mengajak orang lain. Tulis angkamu apa adanya, lalu sebut jenisnya: \"500 views\" dan \"500 pembeli\" adalah dua fakta yang berbeda.</li>" +
          "<li><b>Kepercayaan pinjaman.</b> Kotak 3 adalah tempat kamu menyadari apakah kamu meminjam kepercayaan (nama studio, brand induk, kreator yang sudah dikenal) atau mulai dari nol. Keduanya sah, tapi berbeda: kepercayaan pinjaman milik orang lain sampai brandmu sendiri punya.</li>" +
          "<li><b>Sampel ramah.</b> Reaksi teman, keluarga, atau orang dari industri yang sama itu nyata, tapi bukan persepsi audiens. Catat di kotak 7 sebagai bukti, dengan label sampel ramah. Kotak 4 tetap UNKNOWN sampai ada orang luar yang ditanya.</li>" +
          "<li><b>Dua hal di kotak 6.</b> Pesaing langsung memperebutkan waktu dan uang audiens yang sama. Benchmark bukan pesaing; ia standar diam-diam yang dipakai audiens untuk menilaimu. Tulis keduanya.</li>" +
          "</ul>"
      },
      reverse: {
        title: "Cek terbalik sebelum lanjut",
        items: [
          "Canvas-mu punya minimal satu UNKNOWN? (Nol UNKNOWN memberi tahu dosen bahwa kamu bluffing.)",
          "Kotak 4 berisi kata-kata orang LUAR tim, atau UNKNOWN?",
          "Setiap butir di kotak 8 bisa kamu tunjuk asalnya di kotak 1–7?",
          "Kotak 1–7 ditulis sebagai fakta hari ini, bukan aspirasi (\"kami paling inovatif\")?"
        ],
        unknownCounter: ["s1.p2.b1_product_truth", "s1.p2.b2_current_audience", "s1.p2.b3_identity_assets", "s1.p2.b4_current_perception", "s1.p2.b5_touchpoints_today", "s1.p2.b6_competitors_benchmarks", "s1.p2.b7_evidence_on_hand", "s1.p2.b8_gaps"]
      },
      examples: {
        jumbo: {
          name: "Jumbo",
          sub: "Jumbo, ~3 months before theatrical release.",
          caveat: "Angka di contoh ini adalah rekonstruksi ilustratif, bukan data bersumber. Tiru cara berpikirnya, bukan angkanya.",
          values: {
            "s1.p2.b1_product_truth": "Feature-length animated family film in production. A lonely boy, Don, and a ghost elephant, Jumbo, journey to recover his lost memories. Targeting the Lebaran theatrical window.",
            "s1.p2.b2_current_audience": "Teaser trailer live ~3 months pre-release: ~500K YouTube views (illustrative figure). Zero confirmed ticket buyers yet — that's awareness, not proven demand.",
            "s1.p2.b3_identity_assets": "Title ‘Jumbo’ locked. Produced under Visinema Pictures, an already-trusted studio name. No separate merchandise line or character trademark yet.",
            "s1.p2.b4_current_perception": "UNKNOWN beyond industry circles. Early festival/press previews called it “visually ambitious” — but that's insiders, not real families.",
            "s1.p2.b5_touchpoints_today": "Teaser trailer (live), Instagram/TikTok (live, low frequency), press kit (draft), no website, no merch, festival submission (in progress).",
            "s1.p2.b6_competitors_benchmarks": "Direct: other Indonesian family films in the same Lebaran window. Benchmark: Pixar/DreamWorks — the quality bar every animation gets silently compared against.",
            "s1.p2.b7_evidence_on_hand": "~50 internal test-screening reactions (illustrative figure) — mostly industry insiders, a friendly sample. Teaser engagement metrics. Zero interviews with real target families yet.",
            "s1.p2.b8_gaps": "No proof ordinary parents believe local animation matches imported quality. No locked post-theatrical revenue plan. Release-window advantage vs. imported titles unverified."
          },
          anno: {
            "s1.p2.b1_product_truth": "Tidak ada kata sifat seperti \"amazing\" atau \"groundbreaking\". Hanya yang benar hari ini: apa produknya, tahapnya, dan targetnya.",
            "s1.p2.b2_current_audience": "Kebiasaan terpenting di halaman ini: views bukan pembeli. Tim menulis keduanya dan menyebut bedanya (Lantai 1, bukan Lantai 4).",
            "s1.p2.b3_identity_assets": "Di sini tim menyadari bahwa mereka meminjam kepercayaan nama studio, dan bahwa karakter Jumbo sendiri belum punya aset terdaftar.",
            "s1.p2.b4_current_perception": "Kotak yang paling sering dipalsukan. Tim bisa saja menulis \"audiens suka\" dari 50 pemutaran internal, tapi itu orang film. Jadi jawabannya UNKNOWN di luar lingkar industri.",
            "s1.p2.b5_touchpoints_today": "Daftar polos: mana yang live, mana yang draft, mana yang belum ada. Rinciannya dikerjakan di Brand Touchpoint Inventory (hlm. 5).",
            "s1.p2.b6_competitors_benchmarks": "Dua hal berbeda di satu kotak: pesaing langsung (film keluarga lokal di musim yang sama) dan benchmark (Pixar) yang bukan pesaing, tapi standar diam-diam audiens.",
            "s1.p2.b7_evidence_on_hand": "Kejujuran yang sama dengan kotak 4: bukti yang ada disebut jenisnya (sampel ramah), dan bukti yang belum ada disebut nol.",
            "s1.p2.b8_gaps": "Tidak ada masalah baru yang dikarang. Tiga butir ini dikumpulkan dari celah yang sudah ada di kotak 2, 4, dan 7. Pola ini yang ditiru: kotak 8 adalah ringkasan, bukan ide segar."
          },
          note: "Ketiga butir kotak 8 ini nanti menjadi bahan tiga masalah Jumbo di hlm. 7, bersama tiga skor terendah di hlm. 6."
        },
        gojek: null,
        marvel: null,
        lego: null
      }
    }
  }
};
