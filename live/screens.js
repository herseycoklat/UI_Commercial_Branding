// Kelas Live — 3 layar pengantar (I1–I3, doc 63) + 25 layar Sesi 4 (Lampiran E skrip v3) + 13 layar Sesi 5 (L1–L13,
// Lampiran C skrip gabungan S5 v1). Layar = data, bukan kode.
// Teks pertanyaan dan opsi disalin dari Week3-Sesi4-skrip-final-v3-kelas-live.md.
// Tipe bidang: single | multi | text | grid
//   single : satu pilihan (dipakai juga untuk "kategori")
//   multi  : banyak pilihan; {min, max} ; min 0 = boleh "tidak satu pun"; max = N untuk "pilih N dari M"
//   text   : teks pendek; {max}; optional:true boleh kosong
//   grid   : baris x pilihan ; {rows, cols}
// Properti layar:
//   mode      : 'tebak' | 'terapkan' | 'poll'
//   staged    : isian muncul bertahap (hlm 5 A-Terapkan)
//   skippable : tombol "Lewati" (tidak dihitung dijawab)
//   catatanku : {halaman, bagian} bila jawaban masuk Catatanku; 'pengingat' bila hanya pengingat
//   waktu     : detik yang disarankan (hanya petunjuk untuk dosen)
//   key       : kunci jawaban (penanda, bukan ⚠). Aturan ⚠ ada di flags.js
//   sesi      : 'S1' | 'S2' | 'S3' | 'S4' | 'S5'  (label filter, doc 63)
//   jenis     : 'insight' (tebakan kasus Gojek di pengantar) | 'kelas' (materi sesi)

const o = (v, t, d) => (d ? { v, t, d } : { v, t });

const MODEL = [
  o('branded_house', 'Branded house', 'parent untuk semua, kata kedua cuma label (Bu Sri Es Teh)'),
  o('sub_brand', 'Sub-brand', 'parent menonjol + nama kedua dengan karakter sendiri (Bu Sri Begadang)'),
  o('endorsed', 'Endorsed', 'nama sendiri, parent kecil "from…" (Teh Gerbang, from Warung Bu Sri)'),
  o('house_of_brands', 'House of brands', 'nama sendiri, parent tidak tampil (Teh Gerbang)'),
];

const KRITERIA = [
  o('meaningful', 'Meaningful', 'mendukung positioning kalian?'),
  o('distinctive', 'Distinctive and findable', 'menonjol, dan bisa dicari?'),
  o('pronounceable', 'Pronounceable', 'bisa diucapkan dan dieja setelah sekali dengar?'),
  o('protectable', 'Protectable', 'realistis untuk didaftarkan?'),
  o('growth', 'Room to grow', 'masih benar kalau ada sekuel, spin-off, atau merchandise?'),
];

const SUMBER = [
  o('djki', 'DJKI'),
  o('web', 'Google dan web'),
  o('appstores', 'App stores'),
  o('handles', 'Handle dan domain'),
  o('languages', 'Bahasa lain'),
];

const KANAL = [
  o('visual', 'Visual', 'karakter, palet, wordmark, layout'),
  o('verbal', 'Verbal', 'gaya bahasa di trailer, caption, siaran pers'),
  o('sonic', 'Sonic', 'bunyi khas, di luar musik filmnya'),
  o('motion', 'Motion', 'cara sesuatu bergerak, muncul, berpindah'),
  o('spatial', 'Spatial', 'tempat fisik: lobi, booth, acara'),
  o('interactive', 'Interactive', 'aplikasi, game, cara menjawab orang'),
];

// PERLU KONFIRMASI FAI: skrip hlm 8 menulis "enam opsi dengan definisi satu baris" tapi tidak memuat
// daftarnya. Nama enam touchpoint dari spec-field-S4 (s4.p8.matrix) dan SAY hlm 8; definisi satu baris
// diturunkan dari kalimat pengantar SAY hlm 8 ("nonton filmnya, lihat poster, ...").
const TOUCHPOINT = [
  o('product', 'Product', 'nonton filmnya'),
  o('campaign', 'Campaign', 'lihat poster'),
  o('platform', 'Platform', 'buka halaman di aplikasi'),
  o('event', 'Event', 'datang ke acara'),
  o('packaging', 'Packaging & Merchandise', 'beli kaos'),
  o('community', 'Community', 'lihat unggahan fans'),
];

const DIBUTUHKAN = [o('needed', 'Dibutuhkan'), o('partly', 'Sebagian'), o('not_needed', 'Tidak')];

const YA_TIDAK_BELUM = [o('ya', 'Ya'), o('tidak', 'Tidak'), o('belum', 'Belum tahu')];

const ABC_BU_SRI = [
  o('a', 'A', 'Pakai warna merah bata dan font tulisan tangan.'),
  o('b', 'B', 'Harus terasa seperti masakan rumah, bukan restoran cepat saji.'),
  o('c', 'C', 'Harus terbaca jelas di stiker lima sentimeter, hitam-putih.'),
];

// Tujuh kriteria LEGO diambil dari contoh-S4/9000000044_sd-S4_contoh-lego.json (c01–c07, Inggris);
// tiga selera dari skrip hlm 9. Urutan 10 kandidat DIACAK TETAP (seed tetap) supaya selera tidak berkumpul.
const LEGO_KRITERIA = [
  ['c01', 'Does the Technic wordmark stay legible in black and white at 120 pixels wide?'],
  ['c02', 'Does the liftarm beam shape work with the wordmark removed?'],
  ['c03', 'Does the identity use at least two of our named brand codes?'],
  ['c04', 'Does any instruction step rely on colour alone to tell parts apart?'],
  ['c05', 'Does the brief require the parent LEGO mark on the front of the pack and above the fold of the product page?'],
  ['c06', 'Does every function named on the pack have a demonstration an outsider can watch?'],
  ['c07', 'Do both hobbyist readers (brief unseen) call the tone plain-spoken, not showy?'],
];
const SELERA = [
  ['s1', 'Kemasan terasa premium?'],
  ['s2', 'Desain terasa modern?'],
  ['s3', 'Pengalaman membangun menyenangkan?'],
];
// urutan tetap hasil acak sekali (bukan acak per mahasiswa, supaya layar dosen dan HP sama)
const URUTAN_H9A = ['c03', 's2', 'c06', 'c01', 's3', 'c05', 'c07', 's1', 'c02', 'c04'];
const H9A_OPTS = URUTAN_H9A.map((id) => {
  const hit = [...LEGO_KRITERIA, ...SELERA].find((x) => x[0] === id);
  return o(id, hit[1]);
});

const STATUS_GATE = [
  o('approved', 'Approved', 'ketiga tes lolos'),
  o('condition', 'Approved with a condition', 'satu celah yang bisa ditutup tanpa mengubah arah, atau kondisi Gate 2 yang masih terbuka ikut terbawa'),
  o('revision', 'Revision due', 'satu tes gagal'),
];

// Tiga tebakan pengantar Gojek (doc 63, keputusan Fai 5 Nov). Teks persis dari tabel doc 63; I2 memakai "sekitar" (Fai, 5 Nov).
const PENGANTAR = [
  {
    id: 'i1', no: 'I1', segmen: 'Pengantar', judul: 'Gojek 2014: masalah utama', mode: 'tebak', waktu: 30, sesi: 'S1', jenis: 'insight',
    fields: [
      { id: 'masalah', type: 'single', label: 'Akhir 2014, apa masalah utama Gojek?', key: 'b', options: [
        o('a', 'A. Logonya kurang menarik'),
        o('b', 'B. Cara pesan tidak bisa membesar dan pelanggannya hanya korporat'),
        o('c', 'C. Belum ada pesaing, jadi tidak perlu berubah'),
      ] },
    ],
  },
  {
    id: 'i2', no: 'I2', segmen: 'Pengantar', judul: 'Gojek vs GrabBike: di mana menang', mode: 'tebak', waktu: 30, sesi: 'S2', jenis: 'insight',
    fields: [
      { id: 'menang', type: 'single', label: 'GrabBike sekitar Rp5.000, Go-Jek sekitar Rp15.000. Kalau kalian tim Gojek, di mana kalian harus menang?', key: 'b', options: [
        o('a', 'A. Turunkan harga'),
        o('b', 'B. Tambah layanan dalam satu aplikasi'),
        o('c', 'C. Iklan lebih banyak'),
        o('d', 'D. Tunggu GrabBike rugi'),
      ] },
    ],
  },
  {
    id: 'i3', no: 'I3', segmen: 'Pengantar', judul: 'Klaim 17 menit', mode: 'tebak', waktu: 30, sesi: 'S3', jenis: 'insight',
    fields: [
      { id: 'status', type: 'single', label: 'Gojek bilang rata-rata pengemudi sampai dalam 17 menit. Itu…', key: 'unknown', options: [
        o('real', 'REAL'), o('planned', 'PLANNED'), o('unknown', 'UNKNOWN'),
      ] },
    ],
  },
];

const SESI4 = [
  // ---------- Pembukaan ----------
  {
    id: 'q1', no: 1, segmen: 'Langkah 1', judul: 'Q1 · Brand tanpa logo', mode: 'tebak', waktu: 60,
    kind: 'wall',
    fields: [
      { id: 'brand', type: 'text', max: 30, label: 'Sebut satu brand yang kamu kenali tanpa melihat logonya.' },
      { id: 'dari', type: 'single', label: 'Kamu mengenalinya dari apa?', options: [
        o('warna', 'warna'), o('bentuk', 'bentuk'), o('bunyi', 'bunyi'),
        o('karakter', 'karakter/maskot'), o('huruf', 'huruf/tulisan'), o('lainnya', 'lainnya'),
      ] },
    ],
  },
  {
    id: 'poll1', no: 2, segmen: 'Langkah 2c', judul: 'Poll 1 · Siapa pembuat', mode: 'poll', waktu: 20,
    fields: [
      { id: 'siapa', type: 'single',
        label: 'Poster, konten media sosial, kemasan, video, musik: di proyek kalian, selain bagian yang kalian kerjakan sendiri, siapa yang membuatnya?',
        options: [o('a', 'Saya sendiri'), o('b', 'Teman satu tim'), o('c', 'Teman dari stream lain'), o('d', 'Orang luar, atau belum tahu')] },
    ],
  },
  {
    id: 'poll2', no: 3, segmen: 'Langkah 2e', judul: 'Poll 2 · Nama proyek', mode: 'poll', waktu: 20,
    fields: [
      { id: 'nama', type: 'single', label: 'Nama proyek kalian sekarang.',
        options: [o('a', 'Sudah final'), o('b', 'Masih beberapa kandidat'), o('c', 'Belum ada')] },
    ],
  },
  // ---------- Hlm 2 ----------
  {
    id: 'h2-tebak', no: 4, segmen: 'Hlm 2', judul: 'Hlm 2 · Tebak model Jumbo', mode: 'tebak', waktu: 45,
    fields: [
      { id: 'model', type: 'single', label: 'Model apa yang dipakai Jumbo?', options: MODEL, key: 'endorsed' },
      { id: 'alasan', type: 'single', label: 'Apa alasan utamanya?', key: 'b', options: [
        o('a', 'Trust in', 'supaya Jumbo dapat reputasi Visinema'),
        o('b', 'Damage out', 'supaya kalau Jumbo gagal, film Visinema berikutnya tidak ikut kena'),
        o('c', 'Satu keluarga', 'supaya semua film Visinema terasa satu keluarga'),
      ] },
    ],
  },
  {
    id: 'h2-terapkan', no: 5, segmen: 'Hlm 2', judul: 'Hlm 2 · Terapkan', mode: 'terapkan', waktu: 120,
    catatanku: { halaman: 2, bagian: 'Brand Architecture Map' },
    fields: [
      { id: 'kena', type: 'single', label: 'Kalau parent atau tim merilis sesuatu yang buruk besok, apakah produk ikut kena?', options: YA_TIDAK_BELUM },
      { id: 'model', type: 'single', label: 'Model mana yang cocok?', options: MODEL, fieldId: 'model→s4.p2.model' },
      { id: 'karena', type: 'text', max: 120, label: 'Karena…' },
    ],
  },
  // ---------- Hlm 3 ----------
  {
    id: 'h3-tebak', no: 6, segmen: 'Hlm 3', judul: 'Hlm 3 · Tebak kriteria Jumbo', mode: 'tebak', waktu: 30,
    fields: [
      { id: 'kriteria', type: 'single', label: "Kriteria mana yang paling berisiko untuk nama 'Jumbo'?", options: KRITERIA, key: ['distinctive', 'protectable'] },
    ],
  },
  {
    id: 'h3-terapkan', no: 7, segmen: 'Hlm 3', judul: 'Hlm 3 · Terapkan', mode: 'terapkan', waktu: 120,
    catatanku: { halaman: 3, bagian: 'Naming Evaluation Matrix' },
    fields: [
      { id: 'lemah', type: 'single', label: 'Kriteria paling lemah untuk nama proyekmu', options: KRITERIA },
      { id: 'alasan', type: 'text', max: 120, label: 'Alasannya…' },
      { id: 'mitigasi', type: 'text', max: 120, label: 'Kalau nama tidak bisa diganti, saya akan…', fieldId: 's4.p3.mitigation' },
    ],
  },
  // ---------- Hlm 4 ----------
  {
    id: 'h4-tebak', no: 8, segmen: 'Hlm 4', judul: 'Hlm 4 · Tebak status Jumbo', mode: 'tebak', waktu: 30,
    fields: [
      { id: 'status', type: 'single', label: 'Tim Jumbo mengecek 5 tempat, tiap tempat diberi 1 status. Status mana yang paling sering muncul?', key: 'unknown', options: [
        o('clear', 'CLEAR', 'sudah dicek, tidak ada yang memakai'),
        o('taken', 'TAKEN', 'sudah dicek, sudah ada yang memakai'),
        o('unknown', 'UNKNOWN', 'belum dicek, atau belum bisa dipastikan'),
      ] },
    ],
  },
  {
    id: 'h4-terapkan', no: 9, segmen: 'Hlm 4', judul: 'Hlm 4 · Terapkan', mode: 'terapkan', waktu: 90,
    catatanku: { halaman: 4, bagian: 'Trademark Preliminary Checklist' },
    fields: [
      { id: 'sudah', type: 'multi', min: 1, label: 'Sumber yang SUDAH dicek', exclusive: 'belum',
        options: [...SUMBER, o('belum', 'Belum satu pun')] },
      { id: 'aksi', type: 'text', max: 120, label: 'UNKNOWN terbesar kami: …, dicek oleh … pada …' },
    ],
  },
  // ---------- Hlm 5 ----------
  {
    id: 'h5a-tebak', no: 10, segmen: 'Hlm 5 A', judul: 'Hlm 5 A · Tebak solution vs syarat', mode: 'tebak', waktu: 60,
    fields: [
      { id: 'solution', type: 'single', label: 'Mana yang solution, yaitu sudah menjawab pertanyaannya sendiri dan menyuruh desainer, bukan memberi syarat?', options: ABC_BU_SRI, key: 'a' },
      { id: 'biner', type: 'single', label: 'Mana yang bisa dicek ya atau tidak oleh dua orang berbeda, dan hasilnya sama?', options: ABC_BU_SRI, key: 'c' },
    ],
  },
  {
    id: 'h5a-terapkan', no: 11, segmen: 'Hlm 5 A', judul: 'Hlm 5 A · Terapkan (bertahap)', mode: 'terapkan', waktu: 90,
    staged: true, skippable: true,
    catatanku: { halaman: 5, bagian: 'Rejected→Rewrote' },
    fields: [
      { id: 'jenis', type: 'single', label: 'Jenis', options: [
        o('warna', 'Warna'), o('font', 'Font'), o('bentuk', 'Bentuk atau logo'),
        o('gaya', 'Gaya foto atau video'), o('lainnya', 'Lainnya'),
      ] },
      { id: 'suruh', type: 'text', max: 60, label: 'Yang ingin saya suruh: …' },
      { id: 'supaya', type: 'text', max: 80, label: 'Supaya orang yang melihatnya …' },
      { id: 'syarat', type: 'text', max: 120, label: 'Jadi syaratnya: Harus terasa/terbaca …, bukan …' },
    ],
  },
  {
    id: 'h5b-tebak', no: 12, segmen: 'Hlm 5 B', judul: 'Hlm 5 B · Tebak larangan Jumbo', mode: 'tebak', waktu: 30,
    fields: [
      { id: 'larangan', type: 'single', label: 'Jumbo punya satu larangan: "No batik atau wayang sebagai hiasan penanda ke-Indonesia-an." Menurut kalian itu apa?', key: 'b', options: [
        o('a', 'A', 'Selera tim.'),
        o('b', 'B', 'Alasan strategis: melindungi sesuatu yang penting bagi film.'),
        o('c', 'C', 'Aturan hukum.'),
      ] },
    ],
  },
  {
    id: 'h5b-terapkan', no: 13, segmen: 'Hlm 5 B', judul: 'Hlm 5 B · Terapkan larangan', mode: 'terapkan', waktu: 120,
    catatanku: { halaman: 5, bagian: 'Prohibited' },
    fields: [
      { id: 'larang', type: 'text', max: 120, label: 'Yang tidak boleh muncul' },
      { id: 'karena', type: 'text', max: 120, label: 'Karena…' },
      { id: 'jenis', type: 'single', label: 'Alasan itu termasuk yang mana?', options: [
        o('klaim', 'Melindungi klaim positioning'),
        o('nama', 'Menghindari masalah nama atau arsitektur'),
        o('selera', 'Selera tim'),
      ] },
    ],
  },
  // ---------- Hlm 6 ----------
  {
    id: 'h6-tebak', no: 14, segmen: 'Hlm 6', judul: 'Hlm 6 · Tebak kode Jumbo', mode: 'tebak', waktu: 30,
    fields: [
      { id: 'masih', type: 'multi', min: 0, label: 'Kalau logo Jumbo dihapus, mana yang masih membuat orang tahu itu Jumbo? Pilih semua.',
        options: [o('siluet', 'Siluet karakter'), o('palet', 'Palet hangat jenuh'), o('font', 'Font tertentu'), o('layout', 'Layout poster')],
        key: ['siluet', 'palet'], keyNote: 'siluet lulus; palet lulus tapi lemah; font dan layout gagal' },
    ],
  },
  {
    id: 'h6-terapkan', no: 15, segmen: 'Hlm 6', judul: 'Hlm 6 · Terapkan kode brand', mode: 'terapkan', waktu: 60,
    catatanku: { halaman: 6, bagian: 'Brand Codes Inventory' },
    fields: [
      { id: 'jenis', type: 'single', label: 'Jenis', options: [
        o('warna', 'Warna'), o('bentuk', 'Bentuk'), o('suara', 'Suara'),
        o('tipografi', 'Tipografi'), o('karakter', 'Karakter'), o('lainnya', 'Lainnya'),
      ] },
      { id: 'kode', type: 'text', max: 60, label: 'Kode brand kami: …' },
      { id: 'nologo', type: 'single', label: 'Kalau logo dihapus, orang masih tahu ini kami?', options: [o('ya', 'Ya'), o('lemah', 'Lemah'), o('tidak', 'Tidak')] },
      { id: 'pemilik', type: 'text', max: 40, optional: true, label: 'Yang menyetujui kalau mau diubah: …' },
    ],
  },
  // ---------- Hlm 7 ----------
  {
    id: 'h7-tebak1', no: 16, segmen: 'Hlm 7', judul: 'Hlm 7 · Tebak 1 (Jumbo)', mode: 'tebak', waktu: 30,
    fields: [
      { id: 'kanal', type: 'single', label: 'Jumbo adalah film. Dari enam kanal itu, satu yang tidak dibutuhkan. Yang mana?', options: KANAL, key: 'interactive' },
    ],
  },
  {
    id: 'h7-tebak2', no: 17, segmen: 'Hlm 7', judul: 'Hlm 7 · Tebak 2 (LEGO, grid)', mode: 'tebak', waktu: 70,
    catatanku: 'pengingat', pengingat: 'Kerjakan halaman 7 proyek kalian',
    fields: [
      { id: 'grid', type: 'grid', label: 'Untuk tiap kanal pilih Dibutuhkan, Sebagian, atau Tidak.', rows: KANAL, cols: DIBUTUHKAN,
        key: { visual: 'needed', verbal: 'needed', sonic: 'partly', motion: 'needed', spatial: 'needed', interactive: 'not_needed' } },
      { id: 'kanalTidak', type: 'single', optional: true, label: 'Satu kanal yang kamu jawab Tidak:', options: KANAL },
      { id: 'karena', type: 'text', max: 80, optional: true, label: 'karena …' },
    ],
  },
  // ---------- Hlm 8 ----------
  {
    id: 'h8-tebak', no: 18, segmen: 'Hlm 8', judul: 'Hlm 8 · Tebak touchpoint Jumbo', mode: 'tebak', waktu: 40,
    fields: [
      { id: 'tempat', type: 'single', label: 'Tempat mana yang paling mungkin dikerjakan orang yang tidak pernah bertemu tim Jumbo?', options: TOUCHPOINT },
    ],
  },
  {
    id: 'h8-terapkan', no: 19, segmen: 'Hlm 8', judul: 'Hlm 8 · Terapkan (LEGO)', mode: 'terapkan', waktu: 75,
    fields: [
      { id: 'aturan', type: 'multi', min: 2, max: 2, label: 'Pilih dua aturan yang harus ada di dokumen untuk kemasan di rak toko.', key: ['a', 'b'], options: [
        o('a', 'A', 'LEGO mark induk di depan kemasan'),
        o('b', 'B', 'daftar fungsi di kemasan'),
        o('c', 'C', 'daftar harga semua tier'),
        o('d', 'D', 'foto kampanye terbaru di belakang kemasan'),
        o('e', 'E', 'warna kemasan mengikuti warna toko'),
      ] },
    ],
  },
  {
    id: 'h8-catatan', no: 20, segmen: 'Hlm 8', judul: 'Hlm 8 · Catatanku', mode: 'terapkan', waktu: 30,
    catatanku: { halaman: 8, bagian: 'Touchpoint Consistency Matrix' },
    fields: [
      { id: 'touchpoint', type: 'text', max: 120, label: 'Touchpoint luar ruangan' },
      { id: 'pemilik', type: 'text', max: 120, label: 'Pemilik' },
      { id: 'aturan', type: 'text', max: 120, label: 'Satu aturan' },
    ],
  },
  // ---------- Hlm 9 ----------
  {
    id: 'h9-tebak1', no: 21, segmen: 'Hlm 9', judul: 'Hlm 9 · Tebak P1', mode: 'tebak', waktu: 20,
    fields: [
      { id: 'hangat', type: 'single', label: 'Kalimat "Made here. Made properly." terasa hangat?', options: [o('ya', 'Ya'), o('tidak', 'Tidak'), o('tidak_yakin', 'Tidak yakin')] },
    ],
  },
  {
    id: 'h9-tebak2', no: 22, segmen: 'Hlm 9', judul: 'Hlm 9 · Tebak P2', mode: 'tebak', waktu: 20,
    fields: [
      { id: 'indonesia', type: 'single', label: 'Kalimat itu menyebut kata "Indonesia"?', options: [o('ya', 'Ya'), o('tidak', 'Tidak')], key: 'tidak' },
    ],
  },
  {
    id: 'h9-terapkan-a', no: 23, segmen: 'Hlm 9', judul: 'Hlm 9 · Terapkan A (10 kandidat)', mode: 'terapkan', waktu: 75,
    fields: [
      { id: 'lolos', type: 'multi', min: 1, label: 'Pilih semua yang lolos tes dua checker.', options: H9A_OPTS,
        key: LEGO_KRITERIA.map((x) => x[0]), selera: SELERA.map((x) => x[0]) },
    ],
  },
  {
    id: 'h9-terapkan-b', no: 24, segmen: 'Hlm 9', judul: 'Hlm 9 · Terapkan B (tes Gate 3)', mode: 'terapkan', waktu: 30,
    fields: [
      { id: 'tes', type: 'single', label: 'Kriteria 5 LEGO masuk tes Gate 3 mana?', key: 'architecture', options: [o('architecture', 'Architecture'), o('naming', 'Naming'), o('brief', 'Brief')] },
    ],
  },
  // ---------- Gate 3 ----------
  {
    id: 'gate3', no: 25, segmen: 'Gate 3', judul: 'Gate 3 · Tebak status', mode: 'tebak', waktu: 40,
    fields: [
      { id: 'status', type: 'single', label: 'Tim X menulis di halaman 2: "Branded house: semua produk satu nama dan satu identitas." Di halaman 5, brief-nya menulis: "tiap produk punya nama dan tampilan sendiri." Semua halaman lain lengkap. Status berapa?', options: STATUS_GATE, key: 'revision' },
    ],
  },
];

// ---------- Sesi 5 (Week 4): L1–L13 ----------
// Sumber tunggal: Lampiran C skrip gabungan S5 v1 (doc 85 bagian A). Teks pertanyaan, konteks, dan opsi
// persis dari heading [n · Ln] skrip gabungan (bahasa Inggris, sama dengan deck v3). Semua: sesi S5, jenis kelas,
// tidak masuk Catatanku, tanpa skor per mahasiswa.
// Properti baru:
//   konteks      : baris teks yang tampil DI ATAS pertanyaan (HP dan layar dosen)
//   urutan (bidang): urutan tampil opsi di HP (acak tetap); hasil dosen tetap urut A–H seperti slide
//   kunciTerpisah: hasil tampil dulu TANPA tanda kunci; dosen klik "Tandai yang dilaporkan" (L1)
const L = (no, n, judul, segmen, waktu, label, opts, key, extra = {}) => ({
  id: `l${no}`, no: `L${no}`, slide: n, segmen, judul, mode: 'tebak', waktu, ...extra,
  fields: [{ id: 'jawab', type: 'single', label, key, options: opts.map((t, i) => o('abcd'[i], `${'ABCD'[i]}. ${t}`)) }],
});

const L1_OPTS = [
  'The seats were always full, but people spent little',
  'Minimarkets were banned from selling alcohol',
  'Rent on large stores in expensive locations',
  'The sale of the business to another company failed',
  'The stores were empty; nobody knew Sevel',
  'Prices were too low to make a profit',
  'It lost to online shopping',
  'The government forced every store to close',
].map((t, i) => o('abcdefgh'[i], `${'ABCDEFGH'[i]}. ${t}`));

const SESI5 = [
  {
    id: 'l1', no: 'L1', slide: 2, segmen: 'Sevel', judul: 'Sevel · Apa yang membuat tutup? (pilih semua)', mode: 'tebak', waktu: 45,
    kunciTerpisah: true,
    fields: [
      { id: 'alasan', type: 'multi', min: 1, label: 'What do you think made Sevel close? Choose all that apply.',
        options: L1_OPTS,
        // acak tetap (bukan per mahasiswa): empat alasan yang dilaporkan tidak berkumpul di atas
        urutan: ['e', 'b', 'g', 'c', 'f', 'a', 'h', 'd'],
        key: ['a', 'b', 'c', 'd'], keyNote: 'A–D dilaporkan sumber; E–H bukan. "Sesuai kunci" = memilih tepat A, B, C, D' },
    ],
  },
  L(2, 4, 'S1 · Masalah komersial utama', 'Session 1 · Main commercial problem', 20,
    "What was Sevel's real commercial problem?",
    ['Not enough people knew Sevel', 'Customers paid with their time, not their money', 'Prices were too high for young people', 'The stores were too small'], 'b'),
  L(3, 5, 'S2 · Audiens utama', 'Session 2 · Primary audience', 20,
    "Sevel's audience was young people who come to hang out. What was wrong with that?",
    ['There were too few of them', 'They were the wrong age for convenience stores', 'They came, but the people using the seats were not the people spending the money', 'Nothing was wrong; they were the perfect audience'], 'c'),
  L(4, 6, 'S2 · Insight', 'Session 2 · Insight', 20,
    'According to this insight, why do they choose Sevel?',
    ['It has the best food', 'It is open 24 hours', 'It is a cool place to stay that costs less than a café', 'They love the 7 logo'], 'c',
    { konteks: ['They want somewhere cool to sit with friends,', 'BUT a café costs too much,', 'SO they need a cheap place to stay for hours.'] }),
  L(5, 8, 'S3 · Positioning', 'Session 3 · Positioning', 20,
    'Which part is the reason people came, and also a cost every hour?',
    ['"young people in Jakarta"', '"a warung"', '"better quality"', '"with seats, cold drinks and wifi, all night"'], 'd',
    { konteks: ["Positioning, built from the founder's own words:",
      '"For young people in Jakarta who love to nongkrong, Sevel is a warung with better quality: affordable luxury, with seats, cold drinks and wifi, all night."',
      'Henri Honoris, quoted in NYT (2012); LBS case study.'] }),
  L(6, 9, 'S3 · Promise → Proof', 'Session 3 · Promise → Proof', 20,
    "Sevel's promise was real: you could stay as long as you liked, every night. What was the problem?",
    ['There was no problem; a real promise is enough', 'It was not really kept', "It was kept, but customers didn't pay enough for it", 'Nobody believed it'], 'c'),
  L(7, 10, 'S4 · Brand codes', 'Session 4 · Brand codes', 20,
    "The 7 logo and the Slurpee were Sevel's strongest brand codes. What was the problem?",
    ['Nobody recognised them', 'They belonged to 7-Eleven Inc., not to the Indonesian company', 'They looked too much like Indomaret', 'They changed too often'], 'b'),
  L(8, 12, 'Page 2 (canvas) · Value Propositions + Customer Relationships', 'Workbook p.2 · Canvas', 20,
    "What did Sevel's Value Propositions and Customer Relationships give the customer?",
    ['Cheap daily shopping near home', 'Hours in a cool seat with wifi; sit as long as you like', 'Fast delivery to your door', 'The lowest prices in town'], 'b'),
  L(9, 13, 'Page 2 (canvas) · Revenue Streams', 'Workbook p.2 · Canvas', 20,
    'How did Sevel make its money?',
    ['A fee for every hour you sit', 'A monthly membership', 'A margin on each item sold', 'Renting space inside the store to other brands'], 'c'),
  L(10, 14, 'Page 2 (canvas) · Key Resources + Cost Structure', 'Workbook p.2 · Canvas', 20,
    "Why couldn't Sevel simply remove seats to cut costs?",
    ['Customers would protest', 'Seats cost nothing once they are bought', 'Its restaurant licence, needed to open 24 hours, required tables, chairs and a kitchen', 'The landlord required seats'], 'c'),
  L(11, 16, 'Indomaret: apa yang berbeda', 'The comparison', 30,
    'Indomaret has seats too, and it is still here. What does it do differently from Sevel?',
    ['It has more seats than Sevel', 'Its seats are free and unlimited, just like Sevel', 'It sells the seat through a café-priced coffee: Point Coffee rents a corner and charges café prices', 'It limits customers to one hour per seat'], 'c'),
  L(12, 32, 'Page 4 (pricing) · Prime Video dalam paket', 'Workbook p.4 · Pricing', 20,
    'How does Amazon get paid for Prime Video?',
    ['Each film is paid for separately', "It doesn't; Amazon simply loses money on video", 'Through the whole package: the Prime fee covers shipping and video, and members buy more on Amazon', 'Netflix pays Amazon to show its films'], 'c',
    { konteks: ['In the US, Prime Video comes inside Amazon Prime, the same membership that gives free shipping.'] }),
  L(13, 42, 'Page 8 (your three bets) · Pemilik nama "Bensu"', 'Workbook p.8 · Your three bets', 20,
    'Who did the court say owns the name?',
    ['Ruben Onsu: he was famous, and it reads like his name', 'The company that filed the name first', "Nobody: a person's name cannot be a trademark", 'Whoever had more outlets'], 'b',
    { konteks: ['In 2017 Ruben Onsu was the face of "I Am Geprek Bensu".', '"Bensu" even reads like his name: RuBEN OnSU.'] }),
];

// Ke-25 layar lama: sesi S4, jenis kelas (doc 63). Urutan: I1 → I2 → I3 → Q1 → … → Q25 → L1 → … → L13
export const SCREENS = [...PENGANTAR, ...SESI4.map((x) => ({ ...x, sesi: 'S4', jenis: 'kelas' })),
  ...SESI5.map((x) => ({ ...x, sesi: 'S5', jenis: 'kelas' }))];
export const SESI_LIST = ['S1', 'S2', 'S3', 'S4', 'S5'];
export const JENIS_LIST = ['insight', 'kelas'];
export const matchFilter = (s, f = {}) => (!f.sesi || s.sesi === f.sesi) && (!f.jenis || s.jenis === f.jenis);

export const SCREEN_BY_ID = Object.fromEntries(SCREENS.map((s) => [s.id, s]));
export const SCREEN_IDS = SCREENS.map((s) => s.id);
