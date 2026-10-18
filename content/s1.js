/* content/s1.js — teks Sesi 1: teori, kenapa penting, deeper read, cek terbalik, contoh empat kasus.
 * Sumber teori: Sesi-1-Bedah-Mendalam_v5.md (Keller & Swaminathan 2020; Cagan 2017; Aaker 2014),
 * silabus §5 (CLO 1), §8 Sesi 1, §9D, §10, §13 (Gate 1), S1-student-guide-*-walkthrough.md.
 * Contoh: verbatim dari S1-worked-example-{jumbo,gojek,marvel,lego}.pptx (v2, 14 Okt 2026).
 * Slide "Gate 1 Check" di worked example TIDAK ditampilkan (memuat kata status Gate; kontrak v3.2 butir 13).
 * Konten tidak boleh memuat tanggal kalender; pakai {{due}}.
 */
window.CB = window.CB || {}; CB.content = CB.content || {};
(function () {
  var CAVEAT = "Contoh ini rekonstruksi ilustratif: peristiwa dan angka disederhanakan untuk belajar, bukan data bersumber. Tiru cara berpikirnya, bukan angkanya.";
  var TP_COLS = ["TOUCHPOINT", "STATUS", "OWNER", "DEPOSIT or WITHDRAWAL?"];
  var LOG_COLS = ["WHEN", "WHAT WE DECIDED", "WHY", "EVIDENCE"];

  CB.content.S1 = {
    pages: {
      /* ================= hlm. 2 — Brand Audit Canvas ================= */
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
            "Canvas-mu punya minimal satu UNKNOWN? (Nol UNKNOWN artinya kamu bluffing.)",
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
          gojek: {
            name: "Gojek / GoFood",
            sub: "Gojek, at the moment GoFood is about to launch inside the app.",
            caveat: CAVEAT,
            values: {
              "s1.p2.b1_product_truth": "GoRide, the ride-hailing service, is live and growing in Jakarta. GoFood, a new food-delivery feature inside the same app, is in pilot with a small merchant list.",
              "s1.p2.b2_current_audience": "GoRide already has an active, repeat rider base across Jakarta. GoFood has zero real diners yet — only a small pilot merchant list, no proven food-delivery demand.",
              "s1.p2.b3_identity_assets": "The Gojek name, green color, and app icon are already trusted for rides. GoFood has no separate brand — it launches as a feature inside the same trusted app.",
              "s1.p2.b4_current_perception": "UNKNOWN for food delivery specifically. Riders trust Gojek to get from A to B — we don't yet know if that trust transfers to trusting it with food orders.",
              "s1.p2.b5_touchpoints_today": "App home screen (live, GoRide-first), driver network (live, ride-only), merchant partnerships (pilot list), no GoFood marketing yet, no delivery-driver flow yet.",
              "s1.p2.b6_competitors_benchmarks": "Direct: other food-delivery apps entering Indonesia. Benchmark: any app people already trust with everyday spending — the bar diners silently judge GoFood against.",
              "s1.p2.b7_evidence_on_hand": "Rider satisfaction data from GoRide — not food-specific. A handful of pilot merchant conversations. No evidence yet that riders would order food through the same app.",
              "s1.p2.b8_gaps": "No proof ride trust transfers to food trust. Merchant supply is thin. Food delivery brings new operational risk (speed, packaging) ride-hailing never had."
            },
            anno: {
              "s1.p2.b1_product_truth": "Tidak ada kata \"revolusioner\" atau \"pasti sukses\". Hanya fakta hari ini: GoRide berjalan, GoFood masih uji coba.",
              "s1.p2.b2_current_audience": "Punya pengguna di satu layanan tidak sama dengan punya pengguna di layanan baru. Godaan terbesar adalah menulis \"kami sudah punya jutaan pengguna\" padahal itu pengguna GoRide, bukan pembeli makanan.",
              "s1.p2.b3_identity_assets": "Kotak tempat tim melihat bahwa GoFood meminjam kepercayaan nama Gojek, bukan memulai dari nol.",
              "s1.p2.b4_current_perception": "Godaannya menulis \"orang pasti percaya juga\". Itu asumsi. Kepercayaan untuk naik ojek belum tentu berpindah ke urusan makanan, jadi UNKNOWN.",
              "s1.p2.b6_competitors_benchmarks": "Lagi-lagi dua hal: pesaing langsung (aplikasi pesan antar lain) dan benchmark (aplikasi yang sudah dipercaya untuk belanja sehari-hari).",
              "s1.p2.b7_evidence_on_hand": "Data kepuasan GoRide disebut apa adanya: bukan data makanan.",
              "s1.p2.b8_gaps": "Tidak menciptakan masalah baru. Tiga butir ini dikumpulkan dari celah di kotak 2, 4, dan 7."
            },
            note: "Bandingkan dengan Jumbo: Jumbo adalah satu produk mencari audiens pertamanya; Gojek adalah brand yang sudah dipercaya, menguji apakah kepercayaan itu menyebar ke layanan kedua."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)",
            sub: "Marvel Studios, before Iron Man's release — its first self-financed film.",
            caveat: CAVEAT,
            values: {
              "s1.p2.b1_product_truth": "Marvel Studios' first self-financed film, built around Iron Man — a far less famous character than Spider-Man or X-Men, whose rights are licensed to other studios.",
              "s1.p2.b2_current_audience": "Comic readers know Iron Man; mainstream moviegoers barely do. Robert Downey Jr., the lead actor, is talented but seen as commercially risky at the time.",
              "s1.p2.b3_identity_assets": "The Marvel name carries decades of comic-book trust. But Marvel Studios as a FILM producer has zero track record — past Marvel films were made by other studios.",
              "s1.p2.b4_current_perception": "UNKNOWN whether general audiences trust the word Marvel to mean quality in film, the way they already trust Pixar or a major studio.",
              "s1.p2.b5_touchpoints_today": "Decades of comic issues (live, niche), no film marketing yet, financing in progress — character rights mortgaged to fund production.",
              "s1.p2.b6_competitors_benchmarks": "Direct: other comic-adaptation films, ironically made by other studios. Benchmark: any big-budget summer blockbuster franchise.",
              "s1.p2.b7_evidence_on_hand": "Decades of comic sales data — not film data. No prior Marvel Studios box-office track record exists at all.",
              "s1.p2.b8_gaps": "No proof mainstream audiences will pay for a lesser-known character. No evidence a connected-universe idea works commercially. The studio's future is staked on this one bet."
            },
            anno: {
              "s1.p2.b1_product_truth": "Tim tidak menulis \"karakter ikonik kami\". Mereka mengakui ini bukan karakter terpopuler mereka.",
              "s1.p2.b2_current_audience": "Dua risiko ditulis jujur dalam satu kotak: karakter kurang dikenal dan aktor yang dianggap berisiko.",
              "s1.p2.b3_identity_assets": "Kotak terpenting di contoh ini. Gojek memperluas kepercayaan di produk sejenis (aplikasi). Marvel memindahkan kepercayaan dari satu medium (komik) ke medium yang sama sekali baru (film), dan itu jauh lebih berisiko.",
              "s1.p2.b4_current_perception": "Nama besar di satu bidang tidak otomatis dipercaya di bidang lain. Karena belum ada yang ditanya, UNKNOWN.",
              "s1.p2.b7_evidence_on_hand": "Bukti yang ada hanya data penjualan komik, dan tim menyebutnya begitu: bukan data film.",
              "s1.p2.b8_gaps": "Murni mengumpulkan celah dari kotak sebelumnya, bukan ide baru."
            }
          },
          lego: {
            name: "LEGO Technic",
            sub: "LEGO Technic team, deciding whether to invest in a new flagship Technic set.",
            caveat: CAVEAT,
            values: {
              "s1.p2.b1_product_truth": "Technic is an existing advanced sub-line (gears, motorised elements). The team is deciding whether to invest in a new flagship set, more complex and pricier than anything in the current range.",
              "s1.p2.b2_current_audience": "A loyal but small hobbyist following, proven by years of Technic sales. No data on how many would pay meaningfully more for meaningfully more complexity.",
              "s1.p2.b3_identity_assets": "Technic already has its own visual identity within the LEGO family — it doesn't need to build trust from zero, but pushing further risks the core brand's simple, all-ages promise.",
              "s1.p2.b4_current_perception": "UNKNOWN whether going further reads as smart specialisation or as repeating the pre-crisis pattern of complexity without discipline.",
              "s1.p2.b5_touchpoints_today": "Existing Technic sets (live, proven), hobbyist community and reviewers (live, niche), no flagship halo product at this ambition level yet.",
              "s1.p2.b6_competitors_benchmarks": "Direct: other advanced construction/model-kit brands. Benchmark: real mechanical and automotive engineering — the standard serious hobbyists silently compare against.",
              "s1.p2.b7_evidence_on_hand": "Strong sales history proves sustained demand for the CURRENT line. No evidence yet on appetite for a significantly more advanced, pricier step up.",
              "s1.p2.b8_gaps": "No proof this expansion is different from the pre-crisis pattern. Higher price narrows the audience further. Risk the brand starts to feel intimidating to newcomers."
            },
            anno: {
              "s1.p2.b1_product_truth": "Ini bukan kategori baru, tapi lini lama yang didorong lebih jauh. Jenis risikonya berbeda dari Jumbo (mulai dari nol) atau Marvel (pindah medium).",
              "s1.p2.b4_current_perception": "Pertanyaannya bukan \"apakah orang suka\", tapi apakah pola dari masa lalu perusahaan sendiri akan terulang. Ketakutan yang spesifik lebih berguna daripada \"apakah ini akan berhasil\".",
              "s1.p2.b7_evidence_on_hand": "Bukti untuk produk yang sekarang tidak otomatis menjadi bukti untuk versi yang lebih besar.",
              "s1.p2.b8_gaps": "Risiko ketiga hanya muncul di kasus ini: memperluas satu bagian brand bisa diam-diam mengubah arti brand induknya bagi pendatang baru."
            }
          }
        }
      },

      /* ================= hlm. 3 — Product-to-Brand Map ================= */
      3: {
        theory: {
          title: "Baca ini dulu",
          src: "Keller & Swaminathan (2020) — Brand Resonance Model; silabus Sesi 1, product-to-brand mapping",
          html:
            "<p>Halaman ini menelusuri produkmu dari <b>apa adanya</b> sampai <b>apa nilainya</b>, dalam enam kotak yang berurutan: produk → pengalaman → perasaan → apa yang bisa ditunjukkan ke orang lain → hasil komersial → makna brand.</p>" +
            "<ul>" +
            "<li><b>Kiri ke kanan, tanpa melompat.</b> Setelah tiap kotak, tanya: apakah ini benar-benar mengalir dari kotak sebelumnya?</li>" +
            "<li><b>Kotak 5 tidak boleh diisi sebelum kotak 3.</b> Money follows feeling. Kalau kamu belum bisa menulis apa yang dirasakan orang, kamu belum tahu kenapa ada yang mau membayar.</li>" +
            "<li><b>Kotak 1–2 masih deskripsi.</b> Lompatan sesungguhnya terjadi di kotak 3: berhenti mendeskripsikan produk, mulai bertanya apa dampaknya pada orang.</li>" +
            "<li><b>Kotak 6 adalah satu frasa</b> yang seharusnya muncul di kepala orang asing saat mendengar nama proyekmu.</li>" +
            "</ul>" +
            "<p>Kalau satu kotak belum bisa diisi, itu fakta hari ini, bukan kegagalan. Tulis apa adanya.</p>"
        },
        callout: "<b>Catatan produk:</b> Produkmu bisa berupa barang, layanan, event, kampanye, atau dokumen riset. Kalau dokumen riset: tulis siapa yang membacanya, apa yang kamu dapat darinya, berapa biayanya, dan bagaimana kamu tahu itu tercapai.",
        why:
          "<p><b class='k'>Kenapa halaman ini penting:</b> silabus Sesi 1 meminta kamu memetakan <i>core product, user experience, emotional benefit, social benefit, commercial objective, and potential brand meaning</i>. Ini cara paling langsung melihat hubungan antara strategi produk dan strategi brand: di titik mana benda yang kamu buat berubah menjadi alasan orang membayar.</p>" +
          "<p>Peta ini juga menjaga kamu dari kesalahan paling mahal di mata kuliah ini, yaitu melompat dari \"ini fiturnya\" ke \"begini kami dapat uang\" tanpa pernah tahu apa yang dirasakan audiens. Kotak 5 di sini yang nanti kamu uji di Commercial viability (hlm. 6).</p>",
        deeper: {
          summary: "Deeper read — tiga bentuk kotak 5 dan 6 yang berbeda di empat kasus",
          html:
            "<ul>" +
            "<li><b>Memakai ulang audiens.</b> Kotak 5 Gojek bukan \"bangun audiens baru\" tetapi \"pakai audiens yang sudah percaya\". Seluruh langkah ekosistem ada di satu kotak itu.</li>" +
            "<li><b>Makna tentang sistem.</b> Kotak 6 Marvel bukan tentang satu film, tapi tentang dunia yang saling terhubung yang dimulai film itu. Kalau proyekmu adalah awal dari rangkaian, makna brandnya bisa jadi tentang rangkaian itu.</li>" +
            "<li><b>Menguji metode.</b> Kotak 5 LEGO Technic bukan sekadar \"set ini laku\", tapi \"membuktikan perluasan yang disiplin bisa berhasil\". Untuk brand yang sudah ada, tujuan komersial yang lebih dalam sering kali adalah cara tumbuh yang bisa diulang.</li>" +
            "<li><b>Manfaat sosial tidak selalu status.</b> Di Marvel, kotak 4 adalah rasa \"ikut tahu\" sesuatu yang lebih besar. Tanyakan apa yang perasaan itu memungkinkan orang tunjukkan, bukan hanya pamerkan.</li>" +
            "</ul>"
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Setiap kotak mengalir dari kotak sebelumnya?",
            "Kotak 3 sudah terisi sebelum kotak 5 kamu tulis?",
            "Kotak 3 berisi perasaan orang, bukan deskripsi fitur?",
            "Kotak 6 cukup satu frasa yang bisa diingat orang asing?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Traced left to right — the chain money and meaning actually follow.", caveat: CAVEAT,
            values: {
              "s1.p3.b1_core_product": "An animated feature film: a boy, Don, and a ghost elephant, Jumbo, journey together to recover his lost memories.",
              "s1.p3.b2_user_experience": "Visually rich 3D animation, warm comedic tone with tender family moments, told in Bahasa Indonesia.",
              "s1.p3.b3_emotional_benefit": "Warmth and nostalgia for parents — almost a lump in the throat about memory and family. Wonder and fun for kids.",
              "s1.p3.b4_social_benefit": "Watching it — and posting about it — says “I support homegrown Indonesian creativity.” A shared family ritual, like a Lebaran outing.",
              "s1.p3.b5_commercial_objective": "Strong opening-week ticket sales in the Lebaran window, word-of-mouth driving multi-week box office, then licensing/streaming/merch long-tail.",
              "s1.p3.b6_brand_meaning": "“Proof that Indonesian stories can be told at world-class quality.”"
            },
            anno: {
              "s1.p3.b2_user_experience": "Masih mendeskripsikan film. Belum ada makna.",
              "s1.p3.b3_emotional_benefit": "Lompatan sesungguhnya: tim berhenti mendeskripsikan film dan mulai bertanya apa yang dirasakan orang.",
              "s1.p3.b4_social_benefit": "Perasaan saja belum cukup. Kotak ini bertanya apa yang perasaan itu memungkinkan orang tunjukkan ke orang lain.",
              "s1.p3.b5_commercial_objective": "Uang baru masuk setelah perasaan dan identitas ditetapkan.",
              "s1.p3.b6_brand_meaning": "Seluruh rantai dipadatkan jadi satu frasa."
            },
            notice: "Notice the order: box 3 (feeling) is filled before box 5 (money) — never the reverse."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Traced left to right — the chain money and meaning actually follow.", caveat: CAVEAT,
            values: {
              "s1.p3.b1_core_product": "A food-delivery feature (GoFood) added inside the existing Gojek app, letting riders who already trust Gojek order food from local merchants.",
              "s1.p3.b2_user_experience": "Order in a few taps — same account, same payment method, same driver network already familiar from GoRide.",
              "s1.p3.b3_emotional_benefit": "Convenience without a new decision — “I already trust this app, I don't have to learn a new one.”",
              "s1.p3.b4_social_benefit": "Ordering from small local warungs through GoFood lets customers feel they're supporting local businesses, not a faceless chain.",
              "s1.p3.b5_commercial_objective": "A new revenue stream (delivery + commission fees) without paying to acquire a brand-new audience — reuse the existing GoRide base.",
              "s1.p3.b6_brand_meaning": "“The one app that just handles it, whatever you need next.”"
            },
            anno: {
              "s1.p3.b3_emotional_benefit": "Di sini tim berhenti mendeskripsikan fitur dan bertanya apa dampaknya secara emosional.",
              "s1.p3.b4_social_benefit": "Yang bisa ditunjukkan ke orang lain: mendukung usaha lokal.",
              "s1.p3.b5_commercial_objective": "Uang masuk setelah perasaan dan identitas sosial ditetapkan."
            },
            notice: "Notice: box 5 here isn’t ‘build a new audience’ — it’s ‘reuse an audience that already trusts us.’ That’s the whole ecosystem move in one box."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Traced left to right — from one film to the seed of a whole system.", caveat: CAVEAT,
            values: {
              "s1.p3.b1_core_product": "A film about Tony Stark, a genius billionaire who builds a powered suit of armor and becomes Iron Man — designed as the seed of a larger connected universe.",
              "s1.p3.b2_user_experience": "Fast-paced, witty, technology-grounded action, led by a charismatic, flawed lead character.",
              "s1.p3.b3_emotional_benefit": "Excitement and vicarious empowerment — watching a flawed, funny genius become a hero on his own terms.",
              "s1.p3.b4_social_benefit": "Being “in” on something bigger — a post-credits scene hints at a larger story, making early viewers feel like insiders discovering something new.",
              "s1.p3.b5_commercial_objective": "Prove the character can carry a film, then use audience reaction to justify greenlighting connected films — turning one movie into a franchise system.",
              "s1.p3.b6_brand_meaning": "“Marvel films aren't just adaptations — they're one connected world.”"
            },
            anno: {
              "s1.p3.b4_social_benefit": "Manfaat sosialnya bukan status, tapi rasa menjadi bagian dari rahasia.",
              "s1.p3.b5_commercial_objective": "Tujuannya bukan untung dari tiket film ini saja, tapi membuktikan sistemnya bisa jalan.",
              "s1.p3.b6_brand_meaning": "Makna brand tentang sistem yang sedang dibangun, bukan satu produk."
            },
            notice: "Notice box 6: the brand meaning isn't about ONE film — it's about the SYSTEM the film starts. That's a bigger bet than Jumbo or Gojek made."
          },
          lego: {
            name: "LEGO Technic", sub: "Traced left to right — from a mechanism to a statement about who gets taken seriously.", caveat: CAVEAT,
            values: {
              "s1.p3.b1_core_product": "A new flagship LEGO Technic set with advanced, genuinely functional mechanics — motorised, precision-built — aimed at teens and adult hobbyists.",
              "s1.p3.b2_user_experience": "A long, technically demanding build that mirrors real mechanical engineering — gears mesh, functions actually work, not just resemble.",
              "s1.p3.b3_emotional_benefit": "Pride in mastering real complexity. Satisfaction of building something that genuinely functions, not just looks like it does.",
              "s1.p3.b4_social_benefit": "Signals real engineering skill and patience to fellow hobbyists. For adults, reconnects with LEGO as a serious hobby, not a toy they've outgrown.",
              "s1.p3.b5_commercial_objective": "Prove a disciplined, evidence-based premium expansion can succeed without repeating the pre-crisis mistake — opening a durable higher-margin tier.",
              "s1.p3.b6_brand_meaning": "“Building is real engineering, at any age.”"
            },
            anno: {
              "s1.p3.b3_emotional_benefit": "Kata \"genuinely\" bekerja keras di sini: manfaatnya soal keaslian fungsi, bukan sekadar sulit.",
              "s1.p3.b5_commercial_objective": "Ini menguji sebuah metode, bukan hanya produk: apakah perluasan kompleksitas bisa dilakukan dengan bertanggung jawab."
            },
            notice: "Notice box 5: the objective is framed as PROVING discipline, not just chasing a bigger price tag. That framing comes straight from box 8's fear."
          }
        }
      },

      /* ================= hlm. 4 — Stakeholder Map ================= */
      4: {
        theory: {
          title: "Baca ini dulu",
          src: "Silabus Sesi 1 — internal and external stakeholders; cross-stream accountability",
          html:
            "<p>Proyekmu disentuh lebih banyak orang daripada tim dan audiensnya. Halaman ini memetakan semuanya dalam empat kuadran: <b>internal atau eksternal</b>, dikali <b>kuasa tinggi atau rendah</b>.</p>" +
            "<ul>" +
            "<li><b>Untuk tiap nama, tulis dua hal:</b> apa yang mereka INGINKAN dari proyek ini, dan KUASA apa yang mereka punya untuk membantu atau menghambatnya.</li>" +
            "<li><b>Kuadran yang paling sering kosong: EXTERNAL · HIGH POWER.</b> Sponsor, distributor, platform, kampus, siapa pun yang bisa memberi uang atau menghentikan peluncuran. Di sinilah pemegang uang berada.</li>" +
            "<li><b>EXTERNAL · LOW POWER</b> biasanya audiens individu: lemah sendirian, kuat bersama. Ini bocoran untuk Sesi 6.</li>" +
            "</ul>" +
            "<p>Kalau kuadran eksternal-tinggi memang belum bisa kamu isi, tulis UNKNOWN, dan bawa celah itu ke kotak 8 Canvas (hlm. 2).</p>"
        },
        why:
          "<p><b class='k'>Kenapa halaman ini penting:</b> Stakeholder map adalah bagian ke-4 Commercial Brand Audit, output Sesi 1. Lebih dari itu, ia menunjukkan siapa yang benar-benar menentukan nasib komersial proyekmu. Tim yang lupa pemegang uang biasanya merancang produk yang disukai audiens tapi tidak pernah sampai ke mereka.</p>" +
          "<p>Nama-nama di kuadran eksternal-tinggi akan muncul lagi saat kamu membahas mitra dan distribusi di sesi-sesi berikutnya.</p>",
        deeper: {
          summary: "Deeper read — siapa \"kritikus\" yang benar-benar berkuasa",
          html:
            "<ul>" +
            "<li><b>Jangan otomatis menulis \"press dan media\".</b> Untuk audiens yang ceruk dan berpengetahuan, yang menentukan bukan media umum, tapi segelintir ahli di dalam ceruk itu. LEGO Technic menaruh hobbyist reviewers di kuasa tinggi karena alasan ini.</li>" +
            "<li><b>Pemegang uang di belakang layar tetap pemegang kuasa.</b> Marvel menaruh lenders di kuasa tinggi: ketika aset sendiri digadaikan, pemberi pinjaman adalah seluruh risikonya.</li>" +
            "<li><b>Pihak yang bisa menolak bekerja sama.</b> Gojek menaruh merchant dan pengemudi di kuasa tinggi: mereka bisa menolak bergabung, dan tanpa mereka layanan tidak berjalan.</li>" +
            "</ul>"
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Kuadran EXTERNAL · HIGH POWER tidak kosong (atau ditulis UNKNOWN dan dibawa ke kotak 8)?",
            "Setiap nama punya WANT dan POWER?",
            "Siapa yang bisa memberi proyek ini uang, atau menghentikannya, sudah tercatat?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Who touches the project, and how much power each has.", caveat: CAVEAT,
            values: {
              "s1.p4.internal_high": "Director — wants the story kept intact; decides the creative cut.\nProducer — wants a release on budget; controls spend and timing.\nPM / commercial lead — wants proof of demand; shapes pricing, release and partners.",
              "s1.p4.external_high": "Cinema chains — want films that fill seats; can refuse screens or time slots.\nBrand sponsors — want a safe family audience; can fund the campaign or walk away.\nStreaming platforms — want exclusive rights; set post-theatrical revenue.",
              "s1.p4.internal_low": "Animators and junior story artists — want credit and realistic deadlines; their power is quality, not commercial decisions.",
              "s1.p4.external_low": "Moviegoers and social followers — want a good family outing; weak alone, but their shared word-of-mouth becomes the GTM engine later (Session 6)."
            },
            anno: {
              "s1.p4.external_high": "Kuadran yang paling sering dilewatkan. Film tidak sampai ke siapa pun tanpa bioskop yang mau memutarnya, jadi itu kuasa nyata.",
              "s1.p4.external_low": "Masing-masing lemah, tapi catatan ini sudah menyebut bahwa gabungan word-of-mouth mereka menjadi mesin pemasaran berikutnya."
            },
            notice: "Notice box 2 isn't empty — the money-holders (cinemas, sponsors, platforms) are named, not forgotten."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Who touches GoFood’s launch, and how much power each has.", caveat: CAVEAT,
            values: {
              "s1.p4.internal_high": "GoFood PM / commercial lead — wants a launch that earns; sets scope and targets.\nGojek brand and product leadership — want the Gojek name protected; can approve or pause the launch.\nEngineering lead — wants a feasible scope; decides what ships and when.",
              "s1.p4.external_high": "Food merchants — want orders without heavy fees; can refuse to join.\nGoRide drivers — want fair pay per trip; can refuse delivery work.\nRegulators — want safe food and fair gig-work rules; can restrict operations.",
              "s1.p4.internal_low": "Feature engineers and junior operations staff — want clear priorities; their power is execution quality, not strategy.",
              "s1.p4.external_low": "Individual diners — want a fast, reliable order; weak alone, but repeat ordering is what makes GoFood self-sustaining (Session 6 preview)."
            },
            anno: {
              "s1.p4.external_high": "Pemegang kuasa yang bisa membuat atau menggagalkan peluncuran: merchant dan pengemudi bisa menolak, regulator bisa membatasi."
            },
            notice: "Notice box 2 isn't empty — merchants and drivers, the two groups who could make or break the launch, are named up front."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Who touches the bet, and how much power each side has.", caveat: CAVEAT,
            values: {
              "s1.p4.internal_high": "Head of production — wants a film that proves the model; controls the creative plan.\nFinancing and business leadership — want the loan repaid; control risk and rights.\nDirector — wants a distinct tone; decides how the film is made.",
              "s1.p4.external_high": "Lenders — want repayment; hold the mortgaged character rights.\nDistributor — wants a film that sells tickets; sets the release date and theatre reach.\nLead actor — wants a career-defining role; his public reputation shapes early reception.",
              "s1.p4.internal_low": "VFX artists and junior production crew — want sane schedules; their power is quality, not financing.",
              "s1.p4.external_low": "Comic fans and early moviegoers — want a faithful, exciting film; few in number, but their enthusiasm helps convince the mainstream audience (Session 6 preview)."
            },
            anno: {
              "s1.p4.external_high": "Pemberi pinjaman sering terlewat karena \"di belakang layar\", padahal dalam skenario pendanaan berisiko merekalah yang paling berkuasa."
            },
            notice: "Notice box 2: the lenders are named specifically — when a studio mortgages its own assets, the money-holders aren't abstract, they're the whole risk."
          },
          lego: {
            name: "LEGO Technic", sub: "Who touches the bet, and how much power each side has.", caveat: CAVEAT,
            values: {
              "s1.p4.internal_high": "LEGO brand leadership — want core-brand discipline protected; can veto the tier.\nTechnic design and engineering team — want real mechanical ambition; decide what is buildable.\nFinance team — wants a margin that justifies the tier; sets price limits.",
              "s1.p4.external_high": "Specialty hobby retailers — want sets that sell at a premium; decide shelf space.\nHobbyist reviewers — want real function, not decoration; their verdict shapes reception.\nEngineering and vehicle licensing partners — want their name on something credible; can grant or withhold licences.",
              "s1.p4.internal_low": "Set designers and testers — want time to get the mechanism right; their power is quality, not price or brand-risk decisions.",
              "s1.p4.external_low": "Individual hobbyist customers — want value for a higher price; few at this tier, but their detailed reviews carry outsized credibility with the audience being targeted."
            },
            anno: {
              "s1.p4.external_high": "Tidak ada kasus lain yang memberi reviewer kuasa sebesar ini. Untuk produk teknis yang ceruk, opini publik umum hampir tidak berpengaruh saat peluncuran; yang menentukan adalah segelintir ahli."
            },
            notice: "Notice box 2: hobbyist reviewers are named as HIGH power — their technical verdict shapes whether this reads as real or gimmicky, more than mainstream press does."
          }
        }
      },

      /* ================= hlm. 5 — Brand Touchpoint Inventory ================= */
      5: {
        theory: {
          title: "Baca ini dulu",
          src: "Silabus Sesi 1 — brand touchpoint audit (sepuluh kategori)",
          html:
            "<p>Touchpoint adalah setiap tempat orang asing bisa \"bertemu\" brandmu. Silabus menyebut sepuluh: product interface, packaging, event presence, social media, trailer, pitch deck, website, community, merchandising, customer service.</p>" +
            "<ul>" +
            "<li><b>Untuk tiap baris:</b> STATUS (live / draft / doesn't exist), OWNER, dan apakah touchpoint itu sekarang menyetor (DEPOSIT) atau menarik (WITHDRAWAL) kepercayaan.</li>" +
            "<li><b>\"Doesn't exist\" itu netral.</b> \"Ada tapi terlihat ditinggalkan\" adalah withdrawal. Ruang kosong tidak bilang apa-apa; ruang berantakan bilang sesuatu yang buruk. Hidupkan lagi, atau turunkan.</li>" +
            "<li><b>Jangan tulis \"live\" untuk sesuatu yang baru kamu rencanakan.</b> Kalau belum nyata hari ini, statusnya draft atau doesn't exist.</li>" +
            "<li><b>Kategori yang tidak relevan ditulis N/A</b> (mis. product interface untuk film). Touchpoint yang kamu punya tapi tidak ada di daftar, tambahkan sebagai baris baru.</li>" +
            "</ul>" +
            "<p>Halaman ini sengaja diisi sebelum Stakeholder Map (hlm. 4): konkret dan mudah, sebagai pemanasan.</p>"
        },
        why:
          "<p><b class='k'>Kenapa halaman ini penting:</b> Touchpoint inventory adalah bagian ke-5 Commercial Brand Audit. Kotak 5 di Brand Audit Canvas adalah ringkasannya; halaman ini rinciannya. Satu akun yang ditinggalkan bisa merusak kepercayaan lebih cepat daripada akun yang belum ada, jadi halaman ini juga daftar pekerjaan rumah tercepatmu.</p>",
        deeper: {
          summary: "Deeper read — konteks yang menentukan deposit atau withdrawal",
          html:
            "<ul>" +
            "<li><b>Konteks menentukan penilaian.</b> Media sosial Jumbo yang sepi dinilai withdrawal; media sosial Gojek yang belum menyebut GoFood dinilai netral, karena memang belum waktunya GoFood tampil sendiri.</li>" +
            "<li><b>Baik untuk siapa?</b> Komunitas penggemar Marvel adalah deposit untuk penggemar komik, tapi celah untuk penonton umum. Satu touchpoint bisa berbeda nilainya bagi dua kelompok.</li>" +
            "<li><b>Touchpoint yang bergantung pada satu pertanyaan.</b> Komunitas hobbyist LEGO Technic bisa jadi deposit atau withdrawal tergantung satu hal: apakah fungsinya benar-benar nyata. Kalau hasil sebuah touchpoint bergantung pada pertanyaan yang belum terjawab, di situlah risikomu terkumpul.</li>" +
            "</ul>"
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Tidak ada yang ditulis \"live\" padahal baru rencana?",
            "Akun yang ada tapi sepi sudah ditandai withdrawal, bukan netral?",
            "Kategori yang tidak relevan ditulis N/A, bukan dipaksakan?",
            "Setiap touchpoint yang ada punya OWNER (atau ditulis Unassigned)?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Every place a stranger could meet Jumbo before opening day.", caveat: CAVEAT,
            values: {
              "s1.p5.touchpoints": { cols: TP_COLS, rows: [
                ["Product interface", "N/A — linear film, not interactive", "—", "—"],
                ["Packaging", "Draft (poster concepts in progress)", "Design lead", "TBD — deposit if strong"],
                ["Event presence", "In progress (festival submission)", "PM / producer", "Deposit, if selected"],
                ["Social media", "Live, low frequency", "Marketing / content", "Slight withdrawal — looks quiet"],
                ["Trailer", "Live (teaser only)", "Marketing / content", "Deposit — strong response"],
                ["Pitch deck", "Draft (for distributor talks)", "PM / commercial lead", "—"],
                ["Website", "Doesn't exist", "Unassigned", "Missed opportunity, currently neutral"],
                ["Community", "Doesn't exist", "Unassigned", "Neutral for now"],
                ["Merchandising", "Doesn't exist", "Unassigned", "N/A pre-release"],
                ["Customer service", "N/A pre-release", "—", "—"]
              ] }
            },
            anno: { "s1.p5.touchpoints": "Bandingkan baris Social media dan Website: \"doesn't exist\" dan \"ada tapi ditinggalkan\" sengaja dinilai berbeda. Product interface ditulis N/A karena film tidak interaktif." },
            notice: "Notice: a low-frequency Instagram is marked a WITHDRAWAL, not a neutral — that's the abandoned-room rule from class."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Every place a user could meet GoFood as it launches inside the app.", caveat: CAVEAT,
            values: {
              "s1.p5.touchpoints": { cols: TP_COLS, rows: [
                ["Product interface", "Live for GoRide; GoFood in pilot, same app", "Product / engineering", "Deposit — reuses a trusted interface"],
                ["Packaging", "N/A — digital feature, no physical packaging", "—", "—"],
                ["Event presence", "None yet — no GoFood launch event planned", "Marketing", "Neutral"],
                ["Social media", "Live for Gojek overall; GoFood not mentioned yet", "Marketing", "Neutral — no GoFood presence yet"],
                ["In-app promo banner", "Draft", "Marketing", "TBD"],
                ["Pitch deck", "Draft (for merchant recruitment talks)", "Business development", "—"],
                ["Website", "Live for Gojek overall; no GoFood page yet", "Marketing", "Neutral"],
                ["Community", "GoRide driver community exists; no GoFood merchant community yet", "Ops", "Deposit for drivers, gap for merchants"],
                ["Merchandising", "N/A at this stage", "—", "—"],
                ["Customer service", "Live, shared line; no GoFood-specific flow yet", "Customer ops", "Withdrawal risk if food issues aren't handled differently"]
              ] }
            },
            anno: { "s1.p5.touchpoints": "Baris Trailer diganti In-app promo banner karena itu touchpoint yang benar-benar ada untuk produk digital. Media sosial dinilai netral, berbeda dengan Jumbo, karena memang belum waktunya GoFood tampil sendiri." },
            notice: "Notice: “packaging” was marked N/A, not forced to fit — adapt the tool sensibly to a digital product."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Every place a stranger could meet this film before opening day.", caveat: CAVEAT,
            values: {
              "s1.p5.touchpoints": { cols: TP_COLS, rows: [
                ["Product interface", "N/A — linear film, not interactive", "—", "—"],
                ["Packaging", "Draft — poster/key-art introducing Iron Man to non-comic audiences", "Marketing", "TBD"],
                ["Event presence", "In progress — early convention/press appearances", "Marketing", "Deposit, if well received"],
                ["Press / early buzz", "Emerging — early online forums and press previews", "Marketing", "Neutral, still building"],
                ["Trailer", "Draft — teaser trailer being cut", "Marketing", "TBD — deposit if strong"],
                ["Pitch deck", "Draft — used to convince lenders and the distributor", "Studio leadership", "—"],
                ["Website", "Draft — official film site in progress", "Marketing", "Neutral"],
                ["Community", "Hardcore comic-fan community live; general public community doesn't exist yet", "—", "Deposit for fans, gap for mainstream"],
                ["Merchandising", "Licensing deals in early negotiation", "Licensing team", "TBD"],
                ["Customer service", "N/A pre-release", "—", "—"]
              ] }
            },
            anno: { "s1.p5.touchpoints": "Jangan menilai touchpoint \"baik\" atau \"buruk\" secara umum. Tanyakan: baik untuk siapa? Penggemar lama dan penonton baru adalah dua kelompok berbeda." },
            notice: "Notice: the fan community is a deposit, but it's a NICHE deposit — the real gap is that mainstream audiences don't have a community yet at all."
          },
          lego: {
            name: "LEGO Technic", sub: "Every place a hobbyist could meet this set before launch day.", caveat: CAVEAT,
            values: {
              "s1.p5.touchpoints": { cols: TP_COLS, rows: [
                ["Product / build experience", "Draft — instructions and functional demo in progress", "Design/engineering", "TBD, high stakes either way"],
                ["Packaging", "Draft — must signal serious engineering, not childish", "Marketing", "TBD"],
                ["Event presence", "In progress — hobbyist conventions, maker fairs", "Marketing", "Deposit, if well received"],
                ["Press / early buzz", "Emerging — hobbyist reviewers cautiously optimistic, general press skeptical of price", "Marketing", "Mixed — depends who's asked"],
                ["Promo / functional demo", "Draft — must show real function, not just visuals", "Marketing", "Critical deposit opportunity"],
                ["Pitch deck", "Draft — used to secure internal investment for the tier", "Finance/leadership", "—"],
                ["Website", "Draft", "Marketing", "Neutral"],
                ["Community (Technic hobbyists)", "Existing, engaged — but skeptical of price creep", "—", "Deposit if function is real, withdrawal if seen as a cash grab"],
                ["Merchandising", "N/A — the set itself is the product", "—", "—"],
                ["Customer service", "Live shared line, no dedicated technical support yet for complex builds", "Customer ops", "Withdrawal risk if complex builds aren't supported"]
              ] }
            },
            anno: { "s1.p5.touchpoints": "Satu baris (Community) bisa berayun ke dua arah, tergantung satu fakta yang belum diputuskan. Itu tanda di mana risiko terbesarnya berada." },
            notice: "Notice: the community touchpoint can swing either way depending on ONE thing — whether the function is real. Nothing else on this page matters as much."
          }
        }
      },

      /* ================= hlm. 6 — Commercial Readiness Scorecard ================= */
      6: {
        theory: {
          title: "Baca ini dulu",
          src: "Silabus Sesi 1 — brand readiness diagnostic; Aaker (2014), brand relevance",
          html:
            "<p>Rapor kesehatan bisnis proyekmu: enam dimensi, skor 1 (lemah) sampai 5 (kuat). <b>Setiap skor wajib punya justifikasi satu baris</b>, dan justifikasi itu lebih penting daripada angkanya.</p>" +
            "<ul>" +
            "<li><b>Minimal satu skor bernilai 1 atau 2.</b> Kalau semuanya 3 atau 4, kemungkinan besar kamu belum memeriksa dengan jujur. Kembali ke Canvas dan Touchpoint Inventory, cari angka yang sebenarnya.</li>" +
            "<li><b>Tiga skor terendah menjadi prioritasmu di hlm. 7.</b> Prioritas datang dari kelemahan, bukan dari hal yang membanggakan.</li>" +
            "<li><b>Skor hanya untuk hal yang menjadi tanggung jawab PM/Business.</b> Render lambat atau visual yang belum jadi adalah masalah produksi, bukan Differentiation atau Commercial viability.</li>" +
            "<li><b>Audience clarity</b> menguji pertanyaan Aaker: apakah audiens yang spesifik akan terpikir tentang kamu saat butuh sesuatu di kategori ini?</li>" +
            "</ul>"
        },
        why:
          "<p><b class='k'>Kenapa halaman ini penting:</b> halaman ini bagian kedua Gate 1 Pack. Skor 1–2 di sini adalah salah satu dari dua sumber jejak yang sah untuk tiga masalahmu di hlm. 7 (yang lain kotak 8 Canvas). Masalah tanpa jejak ke halaman ini atau kotak 8 adalah tebakan, dan tebakan tidak lolos Gate 1.</p>" +
          "<p>Scorecard juga harus konsisten dengan Canvas: kalau kotak 4 dan 7 berisi UNKNOWN dan sampel ramah, Evidence quality tidak mungkin 4.</p>",
        deeper: {
          summary: "Deeper read — kenapa skor tinggi tidak menutupi skor rendah",
          html:
            "<ul>" +
            "<li><b>Ide paling berbeda sering punya bukti paling sedikit.</b> Marvel memberi Differentiation 5 dan Evidence quality 1, karena gagasan yang belum pernah dicoba memang belum pernah dibuktikan siapa pun.</li>" +
            "<li><b>Enam skor tidak mengukur hal yang sama.</b> LEGO Technic kuat di audiens dan identitas (4, 4, 4) tapi lemah di bukti orang mau membayar (2). Tim bisa sangat siap di satu sisi dan berbahaya di sisi yang menentukan.</li>" +
            "<li><b>Skor menegaskan, bukan menemukan.</b> Di Jumbo, Evidence quality 2 hanya menegaskan ulang kotak 4 dan 7 Canvas. Scorecard yang menemukan kekhawatiran yang sama sekali baru biasanya tanda Canvas belum jujur.</li>" +
            "</ul>"
        },
        reverse: {
          title: "Cek terbalik sebelum lanjut",
          items: [
            "Minimal satu skor bernilai 1 atau 2?",
            "Setiap skor punya satu baris justifikasi yang jujur?",
            "Skor konsisten dengan Canvas (terutama kotak 4 dan 7)?",
            "Tidak ada skor yang sebenarnya menilai masalah produksi atau kreatif?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Six honest scores — the three lowest become the priorities on page 7.", caveat: CAVEAT,
            values: {
              "s1.p6.audience_clarity": { score: 3, justification: "We know broadly it's families, but haven't validated with real interviews outside industry circles yet." },
              "s1.p6.differentiation": { score: 4, justification: "Ghost-elephant premise + a distinctly Indonesian setting is genuinely rare in the local family-film category." },
              "s1.p6.identity_consistency": { score: 3, justification: "Visinema's studio name is trusted, but Jumbo's own visual/verbal identity isn't fully locked." },
              "s1.p6.commercial_viability": { score: 2, justification: "Distribution deal in progress, but ticketing and post-theatrical monetization aren't finalized." },
              "s1.p6.distribution_readiness": { score: 2, justification: "Cinema partnerships still being negotiated; no public release date locked yet." },
              "s1.p6.evidence_quality": { score: 2, justification: "Mostly internal/industry feedback so far — a friendly sample; zero interviews with real target families." }
            },
            anno: {
              "s1.p6.differentiation": "Skor tinggi tetap disertai alasan spesifik, bukan sekadar \"kami berbeda\".",
              "s1.p6.commercial_viability": "Ada yang sedang berjalan, tapi belum pasti, jadi skornya tetap rendah.",
              "s1.p6.evidence_quality": "Terhubung langsung ke kotak 4 dan 7 Canvas. Scorecard menegaskan ulang kekhawatiran yang sudah ditemukan."
            },
            notice: "THREE LOWEST: Commercial viability, Distribution readiness, Evidence quality — these carry to page 7."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Six honest scores — the three lowest become the priorities on page 7.", caveat: CAVEAT,
            values: {
              "s1.p6.audience_clarity": { score: 4, justification: "We know exactly who to target first: existing GoRide riders in Jakarta — no need to find a brand-new audience." },
              "s1.p6.differentiation": { score: 3, justification: "Other apps also deliver food; our real edge is convenience through an already-trusted app, not the food itself." },
              "s1.p6.identity_consistency": { score: 4, justification: "GoFood inherits the Gojek name, color, and app — no new identity has to be built from scratch." },
              "s1.p6.commercial_viability": { score: 2, justification: "Delivery economics — driver pay, merchant commission, speed — aren't proven yet at real volume." },
              "s1.p6.distribution_readiness": { score: 2, justification: "Merchant supply is thin; not enough restaurants onboarded to be reliable city-wide." },
              "s1.p6.evidence_quality": { score: 2, justification: "No real evidence yet that GoRide trust actually transfers to food-ordering behavior — an assumption, not a fact." }
            },
            anno: {
              "s1.p6.audience_clarity": "Skor tinggi karena keuntungan yang tidak dimiliki Jumbo: audiens yang sudah ada.",
              "s1.p6.evidence_quality": "Terhubung langsung ke kotak 4 dan 7 Canvas."
            },
            notice: "THREE LOWEST: Commercial viability, Distribution readiness, Evidence quality — these carry to page 7. Notice: this team is winning on trust (audience clarity, identity), but that isn’t enough on its own."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Six honest scores — the three lowest carry to page 7.", caveat: CAVEAT,
            values: {
              "s1.p6.audience_clarity": { score: 2, justification: "We're betting on a character mainstream audiences barely know — the audience is more hope than confirmed." },
              "s1.p6.differentiation": { score: 5, justification: "No other studio is trying to build ONE connected universe across many films — genuinely novel in the industry." },
              "s1.p6.identity_consistency": { score: 2, justification: "Marvel means something in comics, but Marvel Studios as a FILM brand has no track record yet to be consistent with." },
              "s1.p6.commercial_viability": { score: 2, justification: "The studio mortgaged multiple characters' film rights to finance this — if it fails, the financial risk is severe." },
              "s1.p6.distribution_readiness": { score: 3, justification: "A distributor and release date are confirmed, but there's no evidence yet mainstream theaters will fill up." },
              "s1.p6.evidence_quality": { score: 1, justification: "No prior Marvel Studios box-office data exists anywhere. Everything on hand is comic sales data, or hope." }
            },
            anno: {
              "s1.p6.differentiation": "Skor tertinggi di keempat contoh, karena idenya belum pernah dicoba siapa pun.",
              "s1.p6.evidence_quality": "Skor terendah di keempat contoh. Pelajarannya: semakin baru gagasanmu, semakin sedikit data yang bisa diandalkan."
            },
            notice: "THREE LOWEST: Evidence quality, Commercial viability, Audience clarity — despite scoring a 5 on differentiation, the studio is still fragile on basics."
          },
          lego: {
            name: "LEGO Technic", sub: "Six honest scores — strong on audience and identity, weak on proof.", caveat: CAVEAT,
            values: {
              "s1.p6.audience_clarity": { score: 4, justification: "We know exactly who this is for — existing Technic hobbyists and adult builders — a defined, if narrow, audience." },
              "s1.p6.differentiation": { score: 4, justification: "Genuine functional complexity at this level, inside a mainstream toy brand, is rare — competitors are either simple toys or expensive specialist kits, not both." },
              "s1.p6.identity_consistency": { score: 4, justification: "Technic already has its own visual identity; extending it further stays consistent with what that audience already expects." },
              "s1.p6.commercial_viability": { score: 2, justification: "Premium pricing sharply narrows the addressable audience — no proof enough people will pay more to make this profitable at scale." },
              "s1.p6.distribution_readiness": { score: 3, justification: "Existing hobby retail channels exist, but a true flagship product needs its own dedicated push not yet built." },
              "s1.p6.evidence_quality": { score: 2, justification: "Current sales prove appetite for the EXISTING line, not for a meaningfully more advanced, pricier step up." }
            },
            anno: {
              "s1.p6.commercial_viability": "Tim ini yakin soal siapa yang dilayani, tapi belum yakin apakah dompet audiens mengikuti antusiasmenya."
            },
            notice: "THREE LOWEST: Commercial viability, Evidence quality, Distribution readiness — strong audience clarity doesn't buy proof of willingness to pay."
          }
        }
      },

      /* ================= hlm. 7 — Stage-One Commitment & Cross-Stream Requests ================= */
      7: {
        theory: {
          title: "Baca ini dulu",
          src: "Silabus §13 (Gate 1) dan §15 (learning policies); Cagan (2017), Inspired",
          html:
            "<p>Halaman ini mengubah diagnosis menjadi dua hal: <b>tiga masalah komersial-branding</b> (bagian atas) dan <b>permintaan ke stream lain</b> (bagian bawah).</p>" +
            "<p><b>Urutan isinya terbalik:</b> bagian bawah dulu, bagian atas terakhir. Permintaan lintas-stream menarik dari celah di semua halaman sebelumnya; tiga masalah adalah distilasi akhir dari semuanya.</p>" +
            "<ul>" +
            "<li><b>Masalah, bukan solusi.</b> \"We don't know if parents would pay\" adalah masalah. \"We will lower the price\" adalah solusi yang belum pantas kamu klaim.</li>" +
            "<li><b>Ambil dari jejak, bukan ide baru.</b> Lihat tiga skor terendah di hlm. 6 dan kotak 8 Canvas. Setiap masalah harus bisa ditunjuk asalnya; di app, centang sumbernya di bawah tiap masalah.</li>" +
            "<li><b>Tanya \"kenapa komersial\" pada tiap masalah.</b> Kalau masalah itu selesai, apa yang berubah dalam keputusan orang membayar atau memilih? Kalau jawabannya hanya tampilan yang lebih bagus, tulis ulang. Ini uji pertama Gate 1; tidak ada kotak isian khusus, kalimat masalahmu sendiri yang dibaca penilai (lihat Cek kelengkapan di bawah halaman sesi).</li>" +
            "<li><b>Permintaan lintas-stream:</b> satu baris per stream, berisi APA yang dibutuhkan, KENAPA (celah mana yang diperbaiki), dan KAPAN. \"Tolong bantu\" bukan permintaan. Kamu mengidentifikasi kebutuhan informasi, bukan mendikte eksekusi kreatif.</li>" +
            "</ul>"
        },
        why:
          "<p><b class='k'>Kenapa halaman ini penting:</b> di sinilah Gate 1 diputuskan. Silabus: <i>\"The team has defined a valid commercial-branding problem and priority.\"</i> Setiap masalah diuji tiga hal:</p>" +
          "<ul><li><b>Komersial, bukan kreatif:</b> memperbaikinya mengubah apakah seseorang membayar atau memilih, bukan hanya bagaimana produk terlihat. Uji: <i>\"Would fixing this change whether someone pays, or just how it looks?\"</i></li>" +
          "<li><b>Didukung bukti dari halamanmu sendiri:</b> bisa ditunjuk ke kotak 8 Canvas atau ke skor rendah di Scorecard.</li>" +
          "<li><b>Ditulis sebagai masalah:</b> hal yang belum diketahui atau belum terbukti, bukan tindakan.</li></ul>" +
          "<p>Halaman ini juga mengisi tiga bagian Commercial Brand Audit: <i>Key commercial problem</i>, <i>Three strategic priorities</i>, dan <i>Cross-stream responsibility map</i>.</p>",
        deeper: {
          summary: "Deeper read — permintaan termurah yang menguji pertanyaan sebenarnya",
          html:
            "<ul>" +
            "<li><b>Minta versi termurah, bukan versi terbaik.</b> LEGO Technic meminta prototipe fungsional yang diuji hobbyist sebelum produksi penuh. Itu memperlambat tim dengan sengaja, karena ketakutan terbesar mereka adalah pola \"kompleksitas tanpa bukti\" terulang.</li>" +
            "<li><b>Minta informasi, bukan mendikte.</b> Marvel meminta jawaban soal adegan pasca-kredit agar tidak membingungkan penonton baru, bukan menulis adegannya sendiri.</li>" +
            "<li><b>Setiap permintaan terhubung ke celah bernama.</b> Poster Jumbo untuk diuji ke audiens luar menjawab celah identity consistency dan evidence quality. Uji permintaanmu: bisakah orang asing bertindak tanpa menebak?</li>" +
            "</ul>"
        },
        reverse: {
          title: "Cek terbalik sebelum submit",
          items: [
            "Ketiga masalah terdengar seperti \"We don't know if…\", bukan \"We will…\"?",
            "Tiap masalah tercentang ke kotak 8 atau ke skor 1–2?",
            "Di Cek kelengkapan, tiap masalah punya satu kalimat kenapa memperbaikinya mengubah apakah orang membayar atau memilih?",
            "Tiap permintaan punya apa, kenapa, dan kapan, dan bisa dikerjakan orang asing tanpa menebak?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Written as problems, not solutions — straight from the scorecard's three lowest scores.", caveat: CAVEAT,
            values: {
              "s1.p7.problem1": "We don't know if ordinary (non-industry) Indonesian parents believe local animation can match imported quality — we have no outside-audience evidence.",
              "s1.p7.problem2": "We don't have a validated post-theatrical revenue plan — streaming, merchandise, and licensing aren't locked beyond ticket sales.",
              "s1.p7.problem3": "We don't know if our Lebaran release window is actually an advantage, or if it just puts us head-to-head with imported family titles releasing the same season.",
              "s1.p7.req_designer": { label: "From our DESIGNER / ARTIST", text: "3 poster concepts that say “world-class quality, distinctly Indonesian” — needed in 2 weeks, to outside-audience test before locking key art." },
              "s1.p7.req_engineer": { label: "From our ANIMATION / TECHNICAL LEAD", text: "Confirmed animation completion timeline — needed in 1 week, so we know how much runway exists to plan the release window." },
              "s1.p7.req_content": { label: "From our CONTENT / PRODUCTION TEAM", text: "5–10 minutes of shareable behind-the-scenes footage — needed in 3 weeks, for outside-audience testing and social teasers." }
            },
            anno: {
              "s1.p7.problem1": "Dari Evidence quality 2/5 dan Audience clarity, plus kotak 4 Canvas yang UNKNOWN.",
              "s1.p7.problem2": "Dari Commercial viability 2/5.",
              "s1.p7.problem3": "Dari Distribution readiness 2/5 dan kotak 8 Canvas.",
              "s1.p7.req_designer": "Terhubung ke celah identity consistency dan evidence quality.",
              "s1.p7.req_engineer": "Terhubung ke distribution readiness."
            },
            note: "Label baris permintaan di contoh disesuaikan dengan stream yang memang ada di tim Jumbo. Isi permintaanmu sesuai stream di proyekmu."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Written as problems, not solutions — straight from the scorecard's three lowest scores.", caveat: CAVEAT,
            values: {
              "s1.p7.problem1": "We don't know if people who trust Gojek for rides will actually trust the same app with their food orders — that trust transfer is assumed, not proven.",
              "s1.p7.problem2": "We don't know how many merchants make GoFood reliable enough that a first-time user orders again.",
              "s1.p7.problem3": "We don't have proven delivery economics — we don't know if driver pay plus merchant commission actually works at real scale.",
              "s1.p7.req_designer": { label: "From our PRODUCT DESIGNER", text: "The GoFood ordering flow needs to feel like “the same app, one more thing you can do” — needed in 2 weeks, to keep identity consistency high." },
              "s1.p7.req_engineer": { label: "From our ENGINEERING LEAD", text: "Confirmed technical capacity for real-time order + delivery tracking — needed in 3 weeks, before committing to a public pilot date." },
              "s1.p7.req_content": { label: "From our OPS / BUSINESS DEV TEAM", text: "A first target of 50 reliable merchants onboarded in one district (an opening target — whether 50 is enough is untested) — needed in 4 weeks, to fix the distribution-readiness gap before any public marketing." }
            },
            anno: {
              "s1.p7.problem1": "Dari Evidence quality 2/5 dan kotak 4 Canvas yang UNKNOWN.",
              "s1.p7.problem2": "Dari Distribution readiness 2/5. Tidak ada angka target atau perbaikan di dalam kalimat masalah.",
              "s1.p7.problem3": "Dari Commercial viability 2/5.",
              "s1.p7.req_content": "Angka 50 ditulis jujur sebagai target awal yang belum teruji."
            }
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Written as problems, not solutions — straight from the scorecard's three lowest scores.", caveat: CAVEAT,
            values: {
              "s1.p7.problem1": "We have no box-office evidence that a lesser-known Marvel character can headline a film — we rely on comic sales, not film demand.",
              "s1.p7.problem2": "We financed this by mortgaging future characters' film rights — if Iron Man underperforms, we don't have a real fallback plan.",
              "s1.p7.problem3": "We don't know if people outside the comic community will recognise this film from its poster and trailer.",
              "s1.p7.req_designer": { label: "From our DESIGN / MARKETING TEAM", text: "Poster and trailer concepts that introduce Iron Man to non-readers of the comic — needed in 3 weeks, to test if non-fans understand him." },
              "s1.p7.req_engineer": { label: "From our DIRECTOR / PRODUCTION TEAM", text: "A clear answer on how the post-credits scene hints at the larger universe without confusing newcomers — needed in 4 weeks, before final cut." },
              "s1.p7.req_content": { label: "From our BUSINESS / LEGAL TEAM", text: "Confirmed terms on the mortgaged rights if this film underperforms — needed in 2 weeks, before any franchise announcement." }
            },
            anno: {
              "s1.p7.problem1": "Dari Evidence quality 1/5; kotak 7 Canvas hanya berisi data komik.",
              "s1.p7.problem2": "Dari Commercial viability 2/5 dan kotak 5 Canvas.",
              "s1.p7.problem3": "Dari Audience clarity 2/5 dan kotak 4 Canvas. Berbeda dari masalah 1: yang ini soal pengenalan, yang itu soal permintaan.",
              "s1.p7.req_engineer": "Meminta jawaban, bukan mendikte adegan."
            }
          },
          lego: {
            name: "LEGO Technic", sub: "Written as problems, not solutions — straight from the scorecard's three lowest scores.", caveat: CAVEAT,
            values: {
              "s1.p7.problem1": "We don't know if enough people will pay a premium price for significantly more complexity — our current sales data is for the existing line, not this step up.",
              "s1.p7.problem2": "We don't know if pushing Technic further reads as disciplined specialisation, or as repeating the pre-crisis pattern of adding complexity without real audience validation.",
              "s1.p7.problem3": "We don't have a distribution and marketing plan built specifically for a flagship premium product — our current channels are built for the existing line.",
              "s1.p7.req_designer": { label: "From our DESIGN / ENGINEERING TEAM", text: "A working functional prototype tested with real hobbyists before committing to full production — needed in 4 weeks, before the greenlight meeting." },
              "s1.p7.req_engineer": { label: "From our MARKETING TEAM", text: "Messaging that demonstrates real function, not complexity for its own sake — needed in 3 weeks, to test with hobbyist reviewers before any general announcement." },
              "s1.p7.req_content": { label: "From our FINANCE / PRICING TEAM", text: "A clear price-elasticity estimate — how far price can go before the audience shrinks below profitability — needed in 2 weeks, before the final price is locked." }
            },
            anno: {
              "s1.p7.problem1": "Dari Commercial viability 2/5, Evidence quality 2/5, dan kotak 7 Canvas.",
              "s1.p7.problem2": "Dari kotak 4 Canvas yang UNKNOWN dan kotak 8.",
              "s1.p7.problem3": "Dari Distribution readiness 3/5, salah satu dari tiga terendah, dan kotak 5 Canvas.",
              "s1.p7.req_designer": "Permintaan yang sengaja memperlambat: menguji pertanyaan sebenarnya dengan cara termurah sebelum komitmen mahal."
            }
          }
        }
      },

      /* ================= hlm. 8 — Decision Log ================= */
      8: {
        theory: {
          title: "Baca ini dulu",
          src: "Workbook S1 hlm. 8",
          html:
            "<p><b>Decision Log</b> mencatat keputusan proyekmu, satu baris per keputusan: <b>kapan, apa yang diputuskan, kenapa, dan bukti apa</b>. Isi halaman ini <b>di akhir Sesi 1</b>, setelah halaman 2–7 selesai, dari keputusan yang benar-benar lahir waktu kamu mengerjakan Sesi 1. Contohnya memilih tiga masalah di hlm. 7, atau menunda sesuatu karena skornya rendah di hlm. 6.</p>" +
            "<ul>" +
            "<li><b>Hanya keputusan Sesi 1.</b> Keputusan dari sesi berikutnya tidak dicatat di sini. Keempat contoh kasus di bawah masing-masing berisi tiga baris; kamu boleh lebih banyak.</li>" +
            "<li><b>Catatan keputusan tim.</b> Halaman ini ikut di-submit bersama S1 dan dibaca sebagai catatan keputusan proyekmu.</li>" +
            "<li><b>WHY dan EVIDENCE menunjuk halaman.</b> Keputusan yang baik bisa ditelusuri ke kotak Canvas, skor Scorecard, atau bukti yang kamu kumpulkan.</li>" +
            "<li><b>Tambah baris, jangan duplikat halaman.</b> Catatan \"duplicate this page\" di bawah halaman berlaku untuk workbook cetak. Di app, tekan tombol tambah.</li>" +
            "</ul>"
        },
        why:
          "<p><b class='k'>Kenapa halaman ini penting:</b> Decision Log membuat keputusan Sesi 1 bisa dilacak. Pembaca bisa melihat bahwa tiga masalah di hlm. 7 lahir dari bukti, bukan dari selera. Log yang ditulis dari ingatan berminggu-minggu kemudian adalah tebakan, jadi tulis selagi alasannya masih segar.</p>",
        deeper: {
          summary: "Deeper read — log yang meyakinkan vs log yang hanya ada",
          html:
            "<ul>" +
            "<li><b>Setiap WHY terhubung ke halaman sebelumnya.</b> Keputusan Jumbo memilih jendela Lebaran berasal dari kotak social benefit di Product-to-Brand Map; keputusan menunda merch berasal dari Brand Pyramid.</li>" +
            "<li><b>Jelaskan pola yang ingin dihindari.</b> LEGO Technic mencatat keputusan yang sengaja memperlambat (prototipe dulu) beserta pola masa lalu yang ingin dicegah. Tanpa konteks itu, keputusan hati-hati terlihat sama dengan ragu-ragu.</li>" +
            "<li><b>Uji termurah juga keputusan.</b> Marvel mencatat adegan pasca-kredit sebagai cara paling murah menguji gagasan semesta terhubung. Kamu tidak perlu bukti besar untuk menguji ide besar.</li>" +
            "</ul>"
        },
        reverse: {
          title: "Cek terbalik",
          items: [
            "Setiap keputusan penting di Sesi 1 (mis. pilihan tiga masalah) punya satu baris?",
            "Setiap WHY dan EVIDENCE menunjuk halaman atau bukti nyata?"
          ]
        },
        examples: {
          jumbo: {
            name: "Jumbo", sub: "Three example entries — one line per decision, from today onward.", caveat: CAVEAT,
            values: { "s1.p8.log": { cols: LOG_COLS, rows: [
              ["12 weeks pre-release", "Target the Lebaran holiday window for release", "Aligns the family-ritual insight with when families already go to the cinema together", "Historical Lebaran family-film box-office data (secondary)"],
              ["10 weeks pre-release", "Run an outside-audience test screening before locking the poster", "Internal-only feedback so far is a friendly sample", "~50 screening reactions, all from industry insiders (Canvas box 7) — a friendly sample"],
              ["8 weeks pre-release", "Delay committing to a merchandise line until after opening week", "No evidence yet that Floor-4 resonance will be strong enough to support merch demand", "Zero pre-release fan community; too early to tell"]
            ] } },
            anno: { "s1.p8.log": "Entri kedua berasal dari skor Evidence quality; entri ketiga dari Brand Pyramid di kelas." },
            notice: "Rows 4–6 left blank on purpose — that's where the real team's log continues."
          },
          gojek: {
            name: "Gojek / GoFood", sub: "Three example entries — one line per decision, from today onward.", caveat: CAVEAT,
            values: { "s1.p8.log": { cols: LOG_COLS, rows: [
              ["Pre-pilot", "Launch GoFood as a feature inside the existing Gojek app, not a separate app", "Reuses existing trust and avoids asking users to download and learn something new", "GoRide already has an active, repeat rider base in Jakarta (rider satisfaction data, Canvas box 7)"],
              ["Early pilot", "Limit GoFood's first launch to one district in Jakarta", "Merchant supply isn't strong enough yet to support a city-wide promise", "Only a small pilot merchant list is confirmed (a handful of merchant conversations, Canvas box 7)"],
              ["Early pilot", "Delay large-scale marketing until trust-transfer is tested", "No evidence yet that GoRide riders will actually order food through the same app", "Canvas box 4 is UNKNOWN for food delivery; rider data is ride-only (Canvas box 7)"]
            ] } },
            anno: { "s1.p8.log": "Setiap EVIDENCE menunjuk kotak Canvas yang spesifik." },
            notice: "Rows 4–5 left blank on purpose — that's where the real team's log continues."
          },
          marvel: {
            name: "Disney/Marvel (Iron Man)", sub: "Three example entries — one line per decision, from today onward.", caveat: CAVEAT,
            values: { "s1.p8.log": { cols: LOG_COLS, rows: [
              ["Pre-production financing", "Self-finance the film by mortgaging film rights to several other characters", "No major studio would finance an in-house universe strategy; this was the only way to keep creative and franchise control", "Lenders financed production against the mortgaged character rights (Canvas box 5)"],
              ["Casting", "Cast a talented but publicly risky lead actor", "His specific charisma matched the tone the character needed — talent fit mattered more than a “safe” choice", "The lead actor was seen as commercially risky, and mainstream audiences barely know Iron Man (Canvas box 2)"],
              ["Post-production", "Add a short post-credits scene hinting at a larger shared universe", "To test cheaply whether audiences respond to connected films before committing further", "No Marvel Studios box-office history exists; comic sales are not film demand (Canvas box 7)"]
            ] } },
            anno: { "s1.p8.log": "Entri ketiga adalah keputusan paling cerdas di contoh ini: menguji ide besar dengan cara paling murah." },
            notice: "Rows 4–6 left blank on purpose — that's where the real team's log continues."
          },
          lego: {
            name: "LEGO Technic", sub: "Three example entries — one line per decision, from today onward.", caveat: CAVEAT,
            values: { "s1.p8.log": { cols: LOG_COLS, rows: [
              ["Post-turnaround", "Keep Technic as a distinct, disciplined sub-line rather than let complexity creep into core LEGO sets", "The pre-crisis mistake was letting complexity spread unfocused across the whole range, not concentrated where the audience actually wants it", "The company's own history — the clearest evidence available"],
              ["Pre-greenlight", "Require a working functional prototype tested with real hobbyists before committing to full production", "To avoid repeating the 'complexity without proof' pattern that contributed to the near-bankruptcy", "Current sales prove demand for the existing line only (Canvas box 7)"],
              ["Pre-launch", "Price the flagship set at the top of, but still within, existing premium-tier norms rather than an unprecedented jump", "To manage commercial-viability risk without abandoning the premium positioning entirely", "Hobbyist community is skeptical of price creep, and general press is skeptical of price (touchpoint inventory)"]
            ] } },
            anno: { "s1.p8.log": "Entri kedua sengaja memperlambat tim, dan log menyebut persis pola masa lalu yang ingin dihindari." },
            notice: "Rows 4–6 left blank on purpose — that's where the real team's log continues."
          }
        }
      }
    }
  };
})();
