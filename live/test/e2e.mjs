// Uji ujung-ke-ujung dengan browser sungguhan terhadap emulator Firebase (Auth 9099, Database 9000) dan server statis 8080.
// Jalankan: bash scripts/e2e.sh   (atau `node test/e2e.mjs` bila emulator dan server sudah hidup)
import { createRequire } from 'node:module';
import { readFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
const { chromium } = createRequire(import.meta.url)('playwright');

const DB = 'http://127.0.0.1:9000', NS = 'demo-kelas-live', BASE = 'http://127.0.0.1:8080';
const SHOTS = process.env.SHOTS || '/tmp/kl-shots';
mkdirSync(SHOTS, { recursive: true });
const N1 = '2306000001', N2 = '2306000002', N3 = '2306000003';

const admin = (path, method = 'GET', body) =>
  fetch(`${DB}/${path}.json?ns=${NS}`, { method, headers: { Authorization: 'Bearer owner' }, body: body === undefined ? undefined : JSON.stringify(body) }).then((r) => r.json());

let fails = 0;
const check = (name, ok, detail = '') => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : `  ← ${detail}`}`); if (!ok) fails++; };
const errors = [];

const browser = await chromium.launch();
async function newPage(mobile = false) {
  const ctx = await browser.newContext({ viewport: mobile ? { width: 375, height: 700 } : { width: 1280, height: 900 }, acceptDownloads: true, locale: 'id-ID' });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(String(e)));
  return { ctx, page };
}
const until = (page, fn, arg) => page.waitForFunction(fn, arg, { timeout: 8000 });
const bodyHas = async (page, re) => {
  try { await until(page, ([src, fl]) => new RegExp(src, fl).test(document.body.innerText), [re.source, re.flags]); return true; } catch {
    console.log('   [isi halaman]', (await page.innerText('body')).replace(/\s+/g, ' ').slice(0, 500));
    return false;
  }
};
const S7_IDS = 's7-l1,s7-l2,s7-l3,s7-l4,s7-l5,s7-l6,s7-uk1,s7-uk2,s7-uk3,s7-uk4,s7-uk5';
const opt = (page, field, text) => page.locator(`fieldset[data-field="${field}"] label.opt`).filter({ has: page.locator('b', { hasText: new RegExp(`^${text}$`) }) });

// ---------- persiapan ----------
await fetch('http://127.0.0.1:9099/emulator/v1/projects/demo-kelas-live/accounts', { method: 'DELETE' });
await admin('', 'PUT', { roster: { [N1]: true, [N2]: true, [N3]: true }, live: { state: { active: '', open: false, revealed: false } } });

async function studentLogin(page, nim) {
  await page.goto(`${BASE}/index.html?emu=1`);
  await page.fill('#nim', nim);
  await page.click('button[type=submit]');
}

// ---------- 1. login mahasiswa ----------
const s1 = await newPage(true);
await studentLogin(s1.page, '9999999999');
check('NIM tak terdaftar ditolak dengan penjelasan', await bodyHas(s1.page, /tidak ada di daftar kelas/));
await s1.page.fill('#nim', N1);
await s1.page.click('button[type=submit]');
check('NIM sah -> "Kamu sudah masuk. Menunggu pertanyaan."', await bodyHas(s1.page, /Kamu sudah masuk\. Menunggu pertanyaan\./));

// ---------- 2. dosen: login, belum terdaftar, lalu terdaftar ----------
const d = await newPage();
await d.page.goto(`${BASE}/dosen.html?emu=1`);
await d.page.click('#emu-login');
await d.page.waitForSelector('#uid');
const uid = (await d.page.textContent('#uid')).trim();
check('akun belum terdaftar: UID ditampilkan untuk ditempel di console', uid.length > 10);
await admin(`dosen/${uid}`, 'PUT', true);
await d.page.click('button:has-text("Periksa lagi")');
await d.page.waitForSelector('#statusline');
check('dosen terdaftar masuk ke layar kendali', true);
check('dosen: hasil sama sekali tidak tampil sebelum layar dibuka', !(await d.page.innerText('body')).includes('sudah masuk') || /0 dari 3 sudah masuk/.test(await d.page.innerText('#counter')));

// ---------- 3. q1: buka -> jawab -> counter -> hasil tersembunyi -> tampilkan ----------
const selOrder = await d.page.locator('#sel option').evaluateAll((os) => os.map((o) => o.value));
check('daftar layar dosen: I1 → I2 → I3 → Q1 → … → L1 … L13 (S5) → s6-l1 … s6-l4 → S7 (56 layar)', selOrder.slice(0, 4).join(',') === 'i1,i2,i3,q1' && selOrder.length === 56 && selOrder.slice(28, 41).join(',') === Array.from({ length: 13 }, (_, i) => `l${i + 1}`).join(',') && selOrder.slice(41, 45).join(',') === 's6-l1,s6-l2,s6-l3,s6-l4' && selOrder.slice(45).join(',') === S7_IDS, selOrder.slice(0, 5).join(','));
await d.page.selectOption('#sel', 'q1');
await d.page.click('#btn-open');
await s1.page.waitForSelector('fieldset[data-field="brand"]');
check('mahasiswa melihat layar saat dosen membuka', true);
await s1.page.fill('fieldset[data-field="brand"] input', 'Gojek!');
await opt(s1.page, 'dari', 'warna').click();
await s1.page.click('button:has-text("Kirim jawaban")');
check('status "Terkirim ✓" setelah kirim', await bodyHas(s1.page, /Terkirim ✓/));
await s1.page.screenshot({ path: `${SHOTS}/student-q1-sent.png` });
check('layar mahasiswa tidak memuat teks "null" atau "[object"', !/null|\[object/.test(await s1.page.innerText('body')), (await s1.page.innerText('body')).slice(0, 200));

const s2 = await newPage(true);
await studentLogin(s2.page, N2);
await s2.page.waitForSelector('fieldset[data-field="brand"]');
await s2.page.fill('fieldset[data-field="brand"] input', 'gojek');
await opt(s2.page, 'dari', 'bentuk').click();
await s2.page.click('button:has-text("Kirim jawaban")');

const s3 = await newPage(true);
await studentLogin(s3.page, N3);
await s3.page.waitForSelector('fieldset[data-field="brand"]');
await s3.page.fill('fieldset[data-field="brand"] input', '<i>Nike</i>');
await opt(s3.page, 'dari', 'huruf/tulisan').click();
await s3.page.click('button:has-text("Kirim jawaban")');
await bodyHas(s3.page, /Terkirim ✓/);

check('penghitung "3 dari 3 sudah masuk"', await bodyHas(d.page, /3 dari 3 sudah masuk/));
check('hasil tersembunyi sampai "Tampilkan hasil"', (await d.page.locator('.gate').count()) === 1 && (await d.page.locator('.btab, .cards, .bars').count()) === 0);
await d.page.click('#btn-reveal');
await d.page.waitForSelector('.btab');
const firstRow = (await d.page.locator('.btab tbody tr').first().innerText()).replace(/\s+/g, ' ');
check('Q1: "Gojek!" dan "gojek" dikelompokkan, jumlah 2 di peringkat 1', /Gojek/.test(firstRow) && /\b2\b/.test(firstRow), firstRow);
check('jawaban berisi HTML tidak dieksekusi di layar dosen', (await d.page.locator('.results i').count()) === 0);
await d.page.screenshot({ path: `${SHOTS}/dosen-q1-hasil.png`, fullPage: true });

// ---------- 4. sembunyikan jawaban tidak pantas ----------
await d.page.click('summary:has-text("Semua jawaban brand")');
await d.page.locator('.card', { hasText: '<i>Nike</i>' }).locator('button:has-text("Sembunyikan")').click();
check('Sembunyikan: masuk ke daftar tersembunyi', await bodyHas(d.page, /Disembunyikan \(1\)/));
check('Sembunyikan: penghitung "masuk" tetap 3', /3 dari 3 sudah masuk/.test(await d.page.innerText('#counter')));
check('Sembunyikan: keluar dari tabel brand', !/Nike/.test(await d.page.locator('.btab').innerText()));

// ---------- 5. layar ditutup + jawaban susulan ditolak dengan penjelasan ----------
await s2.ctx.setOffline(true);
await new Promise((r) => setTimeout(r, 500));
await d.page.click('#btn-close');
await s1.page.waitForFunction(() => /sudah ditutup|Layar ditutup/.test(document.body.innerText), null, { timeout: 8000 });
check('mahasiswa online melihat "Layar ditutup. Jawabanmu sudah masuk"', await bodyHas(s1.page, /Layar ditutup\. Jawabanmu sudah masuk/));
// s2 offline dan belum tahu layar ditutup: mengubah jawaban lalu kirim
await opt(s2.page, 'dari', 'karakter/maskot').click();
await s2.page.click('button:has-text("Kirim perubahan")');
check('offline: status "Menunggu koneksi"', await bodyHas(s2.page, /Menunggu koneksi/));
const banner = await bodyHas(s2.page, /Tidak ada koneksi/);
check('offline: banner koneksi tampil', banner);
await s2.ctx.setOffline(false);
check('tersambung kembali: jawaban susulan ditolak dengan penjelasan', await bodyHas(s2.page, /tidak diterima/));
const stored = await admin(`answers/q1/${N2}`);
check('jawaban susulan benar-benar tidak masuk database (tetap "bentuk")', stored?.values?.dari === 'bentuk', JSON.stringify(stored));

// ---------- 6. muat ulang di tengah layar: draf mahasiswa dan keadaan dosen pulih ----------
await d.page.selectOption('#sel', 'poll1');
await d.page.click('#btn-open');
await s1.page.waitForSelector('fieldset label.opt');
await opt(s1.page, 'siapa', 'Teman satu tim').click();
await s1.page.reload();
await s1.page.waitForSelector('fieldset label.opt');
check('reload mahasiswa: sudah masuk lagi tanpa mengetik NIM', true);
check('reload mahasiswa: pilihan yang belum dikirim pulih (draf)', await opt(s1.page, 'siapa', 'Teman satu tim').locator('input').isChecked());
await d.page.reload();
await d.page.waitForSelector('#statusline');
const sl = await d.page.textContent('#statusline');
check('reload dosen: layar aktif dan status pulih', /Layar aktif: 2\. Poll 1 .*· terbuka/.test(sl), sl);
check('reload dosen: layar terpilih pulih ke layar aktif', (await d.page.inputValue('#sel')) === 'poll1');

// ---------- 7. offline: jawaban menunggu lalu terkirim saat tersambung ----------
await s1.ctx.setOffline(true);
await new Promise((r) => setTimeout(r, 500));
await s1.page.click('button:has-text("Kirim jawaban")');
check('offline: jawaban tersimpan menunggu', await bodyHas(s1.page, /Menunggu koneksi/));
await s1.ctx.setOffline(false);
check('tersambung: terkirim otomatis tanpa kehilangan jawaban', await bodyHas(s1.page, /Terkirim ✓/));
check('database menerima jawaban yang tertunda', (await admin(`answers/poll1/${N1}`))?.values?.siapa === 'b');

// ---------- 8. NIM sama di dua perangkat ----------
const s1b = await newPage(true);
await studentLogin(s1b.page, N1);
check('perangkat lama diberi tahu "NIM ini dipakai di perangkat lain"', await bodyHas(s1.page, /NIM ini dipakai di perangkat lain/));
check('perangkat baru berfungsi normal', await bodyHas(s1b.page, /Kirim (jawaban|perubahan)/));

// ---------- 9. hlm 2: Catatanku, CSV, ⚠ ----------
await d.page.selectOption('#sel', 'h2-terapkan');
await d.page.click('#btn-open');
await s1b.page.waitForSelector('fieldset[data-field="kena"]');
await opt(s1b.page, 'kena', 'Ya').click();
await opt(s1b.page, 'model', 'Endorsed').click();
await s1b.page.fill('fieldset[data-field="karena"] .txt', 'risiko, tinggi; "kutip" é');
await s1b.page.click('button:has-text("Kirim jawaban")');
await bodyHas(s1b.page, /Terkirim ✓/);
await s2.page.reload();
await s2.page.waitForSelector('fieldset[data-field="kena"]');
await opt(s2.page, 'kena', 'Ya').click();
await opt(s2.page, 'model', 'House of brands').click();
await s2.page.fill('fieldset[data-field="karena"] .txt', 'asal');
await s2.page.click('button:has-text("Kirim jawaban")');
await bodyHas(s2.page, /Terkirim ✓/);
await d.page.click('#btn-reveal');
check('⚠ muncul untuk kombinasi "produk ikut kena" + house of brands', await bodyHas(d.page, /⚠ 1 jawaban perlu dibahas/i));
await d.page.screenshot({ path: `${SHOTS}/dosen-h2-flag.png`, fullPage: true });

await s1b.page.click('button:has-text("Catatanku")');
check('Catatanku: dikelompokkan per halaman workbook', await bodyHas(s1b.page, /Halaman 2 · Brand Architecture Map/));
const [dl] = await Promise.all([s1b.page.waitForEvent('download'), s1b.page.click('button:has-text("Unduh CSV")')]);
const path = await dl.path();
const buf = readFileSync(path);
const csv = buf.toString('utf8');
check('CSV: berkas bernama catatanku-<nim>.csv', dl.suggestedFilename() === `catatanku-${N1}.csv`, dl.suggestedFilename());
check('CSV: diawali BOM UTF-8', buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf);
check('CSV: header kolom sesuai spesifikasi', csv.replace('﻿', '').startsWith('nim;halaman;bagian;pertanyaan;jawaban;waktu;field_id'));
check('CSV: label opsi (bukan kode) + field_id hanya di baris model', /;Endorsed;[^;]*;s4\.p2\.model\r\n/.test(csv));
check('CSV: koma, titik koma, kutip dan huruf beraksen aman', csv.includes('"risiko, tinggi; ""kutip"" é"'), csv);

// ---------- 10. kehadiran ----------
await d.page.click('button:has-text("Kehadiran")');
await d.page.click('#btn-att');
await d.page.waitForSelector('#atab');
const rows = await d.page.locator('#atab tbody tr').allInnerTexts();
check('kehadiran: satu baris per NIM roster (3)', rows.length === 3, rows.join('|'));
check('kehadiran: pembagi = layar dibuka; NIM1 menjawab q1, poll1, h2-terapkan = 3 dari 3', /2306000001\s+3 dari 3/.test(rows.join('\n').replace(/\t/g, ' ')), rows.join('|'));
const [dl2] = await Promise.all([d.page.waitForEvent('download'), d.page.click('#btn-att-csv')]);
const csv2 = readFileSync(await dl2.path(), 'utf8');
check('kehadiran CSV: kolom dibuka/dijawab + per jenis, kolom layar berlabel sesi·jenis, tanpa penanda aktif', !/aktif/i.test(csv2) && csv2.split('\r\n')[0] === '﻿nim;dibuka;dijawab;insight_dibuka;insight_dijawab;kelas_dibuka;kelas_dijawab;q1 (S4 kelas);poll1 (S4 kelas);h2-terapkan (S4 kelas)', csv2.split('\r\n')[0]);
await d.page.click('button:has-text("Layar")');

// ---------- 10b. Keluar ----------
const N4 = '2306000004';
await admin(`roster/${N4}`, 'PUT', true);
const connN = async () => +(/Terhubung (\d+)/.exec(await d.page.textContent('#conn'))?.[1] ?? -1);
const lsGet = (page, k) => page.evaluate((key) => localStorage.getItem(key), k);
const x = await newPage(true);
await x.page.setViewportSize({ width: 360, height: 640 });
await studentLogin(x.page, N3);
await x.page.waitForSelector('fieldset[data-field="kena"]');
await opt(x.page, 'kena', 'Ya').click();
await opt(x.page, 'model', 'Endorsed').click();
await x.page.fill('fieldset[data-field="karena"] .txt', 'catatan rahasia N3');
await x.page.click('button:has-text("Kirim jawaban")');
await bodyHas(x.page, /Terkirim ✓/);
await until(d.page, () => /Terhubung [4-9]/.test(document.querySelector('#conn').textContent)); // s1, s1b, s2, x
const before = await connN();

// header: tombol Keluar terbaca, ada di header (jauh dari tombol Kirim)
const keluarBox = await x.page.locator('header.top button:has-text("Keluar")').boundingBox();
const kirimBox = await x.page.locator('button:has-text("Kirim perubahan")').boundingBox();
check('Keluar ada di header, target sentuh ≥ 40px tinggi, jauh dari tombol Kirim', keluarBox && keluarBox.height >= 40 && keluarBox.y < 80 && kirimBox.y - (keluarBox.y + keluarBox.height) > 150, JSON.stringify({ keluarBox, kirimBox }));
const hdrOverflow = await x.page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
check('360px: header tidak meluap ke samping', !hdrOverflow);
await x.page.screenshot({ path: `${SHOTS}/keluar-360-header.png` });

await x.page.click('header.top button:has-text("Keluar")');
check('dialog: teks konfirmasi persis', await bodyHas(x.page, /Keluar dari kelas\?\s+Jawaban yang sudah terkirim tetap tersimpan\. Kamu bisa masuk lagi dengan NIM yang sama\./));
check('dialog: Catatanku tidak kosong -> baris "Unduh CSV dulu?" + tombol', await bodyHas(x.page, /Catatanku ada di perangkat ini\. Unduh CSV dulu\?/) && await x.page.locator('.modal button:has-text("Unduh CSV")').count() === 1);
check('dialog: tidak ada peringatan jawaban tertunda saat semua terkirim', !(await x.page.innerText('.modal')).includes('belum terkirim'));
const mb = await x.page.locator('.modal').boundingBox();
check('360px: dialog tidak terpotong (di dalam layar)', mb.x >= 0 && mb.y >= 0 && mb.x + mb.width <= 360 && mb.y + mb.height <= 640, JSON.stringify(mb));
const btnH = await x.page.locator('.modal .actions button').evaluateAll((bs) => bs.map((b) => Math.round(b.getBoundingClientRect().height)));
check('dialog: tombol Keluar dan Batal setinggi ≥ 44px', btnH.length === 2 && btnH.every((v) => v >= 44), btnH.join(','));
check('dialog: fokus awal di Batal (bukan Keluar)', await x.page.evaluate(() => document.activeElement?.textContent === 'Batal'));
await x.page.screenshot({ path: `${SHOTS}/keluar-360-dialog.png` });
const [dlx] = await Promise.all([x.page.waitForEvent('download'), x.page.click('.modal button:has-text("Unduh CSV")')]);
check('dialog: Unduh CSV memakai fungsi unduh yang ada (catatanku-<nim>.csv)', dlx.suggestedFilename() === `catatanku-${N3}.csv`, dlx.suggestedFilename());
await x.page.click('.modal button:has-text("Batal")');
check('Batal menutup dialog dan tetap masuk', (await x.page.locator('.modal').count()) === 0 && await bodyHas(x.page, /Kirim perubahan/));
await x.page.click('header.top button:has-text("Keluar")');
await x.page.keyboard.press('Escape');
check('Esc menutup dialog', (await x.page.locator('.modal').count()) === 0);

const seatsBefore = await admin('seat'), presBefore = await admin('presence');
await x.page.click('header.top button:has-text("Keluar")');
await x.page.click('.modal button.danger');
check('keluar: kembali ke kotak NIM', await bodyHas(x.page, /Masukkan NIM kamu/));
check('keluar: sesi lokal dihapus (kl.nim), Catatanku tetap ada (kl.mine.<nim>)', (await lsGet(x.page, 'kl.nim')) === null && (await lsGet(x.page, `kl.mine.${N3}`))?.includes('endorsed'));
await until(d.page, (n) => +/Terhubung (\d+)/.exec(document.querySelector('#conn').textContent)[1] === n, before - 1).catch(() => {});
check('keluar: penghitung "Terhubung" di layar dosen turun 1', (await connN()) === before - 1, `${before} -> ${await connN()}`);
const pres = await admin('presence'); const seats = await admin('seat');
const gone = (b4, now) => Object.keys(b4 || {}).filter((k) => !(now || {})[k]);
check('keluar: tepat satu seat (milik NIM3) dan satu presence hilang dari Firebase', gone(seatsBefore, seats).length === 1 && seatsBefore[gone(seatsBefore, seats)[0]] === N3 && gone(presBefore, pres).length === 1 && gone(presBefore, pres)[0] === gone(seatsBefore, seats)[0], JSON.stringify({ seatsBefore, seats, presBefore, pres }));
check('keluar: jawaban yang sudah terkirim TIDAK dihapus', !!(await admin(`answers/h2-terapkan/${N3}`))?.values);

// masuk lagi dengan NIM yang sama
await x.page.fill('#nim', N3);
await x.page.click('button[type=submit]');
await x.page.waitForSelector('fieldset[data-field="kena"]');
check('masuk lagi NIM sama: jawaban lama tampil (Ya, satu model, teks)', await x.page.evaluate(() =>
  document.querySelector('fieldset[data-field="karena"] .txt').value === 'catatan rahasia N3' &&
  document.querySelector('fieldset[data-field="kena"] input[value="ya"]').checked &&
  document.querySelectorAll('fieldset[data-field="model"] input:checked').length === 1));
check('masuk lagi NIM sama: status "Terkirim ✓", masih bisa mengubah', await bodyHas(x.page, /Terkirim ✓/) && await bodyHas(x.page, /Kirim perubahan/));
await x.page.click('header.top button:has-text("Catatanku")');
check('masuk lagi NIM sama: Catatanku utuh', await bodyHas(x.page, /Halaman 2 · Brand Architecture Map/) && await bodyHas(x.page, /catatan rahasia N3/));
await x.page.click('header.top button:has-text("Keluar")');
check('Catatanku terbuka -> dialog tetap sama', await bodyHas(x.page, /Keluar dari kelas\?/));
await x.page.click('.modal button.danger');
await bodyHas(x.page, /Masukkan NIM kamu/);

// NIM lain di perangkat yang sama
await x.page.fill('#nim', N4);
await x.page.click('button[type=submit]');
await x.page.waitForSelector('fieldset[data-field="kena"]');
check('NIM lain di perangkat sama: formulir kosong (tidak mewarisi jawaban NIM pertama)', await x.page.evaluate(() => document.querySelectorAll('input:checked').length === 0 && document.querySelector('fieldset[data-field="karena"] .txt').value === ''));
await x.page.click('header.top button:has-text("Catatanku")');
check('NIM lain: Catatanku kosong, tanpa isi NIM pertama', await bodyHas(x.page, /Belum ada jawaban Catatanku/) && !(await x.page.innerText('body')).includes('catatan rahasia N3'));
const lsKeys = await x.page.evaluate(() => Object.keys(localStorage).sort().join(','));
check('penyimpanan terpisah per NIM (kl.mine.<N3> dan kl.mine.<N4> berbeda)', lsKeys.includes(`kl.mine.${N3}`) && !(await lsGet(x.page, `kl.mine.${N4}`))?.includes('Endorsed'), lsKeys);
await x.page.click('header.top button:has-text("Keluar")');
check('NIM lain tanpa Catatanku: dialog tidak menawarkan Unduh CSV', !(await x.page.innerText('.modal')).includes('Unduh CSV'));
await x.page.click('.modal button.danger');
await bodyHas(x.page, /Masukkan NIM kamu/);

// keluar saat offline dengan jawaban tertunda
await x.page.fill('#nim', N3);
await x.page.click('button[type=submit]');
await x.page.waitForSelector('fieldset[data-field="kena"]');
await x.ctx.setOffline(true);
await opt(x.page, 'kena', 'Tidak').click();
await x.page.click('button:has-text("Kirim perubahan")');
check('offline: jawaban tertunda ("Menunggu koneksi")', await bodyHas(x.page, /Menunggu koneksi/));
await x.page.click('header.top button:has-text("Keluar")');
check('offline + tertunda: peringatan persis muncul', await bodyHas(x.page, /Ada jawaban yang belum terkirim\. Tunggu tersambung dulu, atau keluar dan jawaban itu hilang\./));
await x.page.screenshot({ path: `${SHOTS}/keluar-360-pending.png` });
await x.page.click('.modal button:has-text("Batal")');
check('peringatan: mahasiswa bisa memilih Batal (tidak keluar diam-diam)', (await x.page.locator('.modal').count()) === 0 && await bodyHas(x.page, /Menunggu koneksi/));
await x.page.click('header.top button:has-text("Keluar")');
await x.page.click('.modal button.danger');
check('offline + memilih keluar: tetap berhasil kembali ke kotak NIM', await bodyHas(x.page, /Masukkan NIM kamu/));
await x.ctx.setOffline(false);
await new Promise((r) => setTimeout(r, 3000));
const kept = await admin(`answers/h2-terapkan/${N3}`);
check('jawaban tertunda benar-benar hilang: tidak terkirim setelah tersambung kembali', kept?.values?.kena === 'ya', JSON.stringify(kept));
await x.page.fill('#nim', N3);
await x.page.click('button[type=submit]');
await x.page.waitForSelector('fieldset[data-field="kena"]');
check('masuk lagi setelah keluar-offline: jawaban lama (bukan yang tertunda) yang tampil', await x.page.evaluate(() => !document.querySelector('fieldset[data-field="kena"] input[value="tidak"]')?.checked && document.querySelectorAll('fieldset[data-field="kena"] input:checked').length === 1));

check('Rules tidak berubah (database.rules.json sama dengan HEAD)', (() => { try { execSync('git diff --quiet HEAD -- database.rules.json'); return true; } catch { return false; } })());

// ---------- 10c. Pengantar I1–I3, filter sesi × jenis, pembagi, kosongkan riwayat ----------
await d.page.selectOption('#sel', 'i1');
await d.page.click('#btn-open');
check('I1 tampil di HP dengan teks doc 63', await bodyHas(x.page, /Akhir 2014, apa masalah utama Gojek\?/) && await bodyHas(x.page, /B\. Cara pesan tidak bisa membesar dan pelanggannya hanya korporat/));
await opt(x.page, 'masalah', 'B\\. Cara pesan tidak bisa membesar dan pelanggannya hanya korporat').click();
await x.page.click('button:has-text("Kirim jawaban")');
await bodyHas(x.page, /Terkirim ✓/);
const ctr = () => d.page.textContent('#counter');
await until(d.page, () => /^1 dari/.test(document.querySelector('#counter')?.textContent || '')).catch(() => {});
check('I1: hasil tersembunyi sampai Tampilkan hasil', (await d.page.locator('.gate').count()) === 1 && (await d.page.locator('.bars').count()) === 0 && /^1 dari \d+ sudah masuk/.test(await ctr()), await ctr());
await d.page.click('#btn-reveal');
check('I1: batang persentase + penanda kunci di B', await bodyHas(d.page, /B\. Cara pesan[^\n]*✓/) && await bodyHas(d.page, /1 \(100%\)/));
check('I1: tanpa ⚠', !/⚠/.test(await d.page.innerText('body')));
await d.page.selectOption('#sel', 'i2');
await d.page.click('#btn-open');
check('I2: "sekitar" di depan kedua harga', await bodyHas(x.page, /GrabBike sekitar Rp5\.000, Go-Jek sekitar Rp15\.000\. Kalau kalian tim Gojek, di mana kalian harus menang\?/));
await x.page.screenshot({ path: `${SHOTS}/i2-360.png`, fullPage: true });
check('360px: layar I2 tanpa geser ke samping', !(await x.page.evaluate(() => document.documentElement.scrollWidth > innerWidth)));
await d.page.selectOption('#sel', 'i3');
await d.page.click('#btn-open');
check('I3: pilihan REAL / PLANNED / UNKNOWN', await bodyHas(x.page, /REAL[\s\S]*PLANNED[\s\S]*UNKNOWN/));
await opt(x.page, 'status', 'UNKNOWN').click();
await x.page.click('button:has-text("Kirim jawaban")');
await bodyHas(x.page, /Terkirim ✓/);
await d.page.click('#btn-reveal');
check('I3: penanda kunci di UNKNOWN', await bodyHas(d.page, /UNKNOWN ✓/));
await x.page.click('header.top button:has-text("Catatanku")');
await bodyHas(x.page, /Catatanku/);
const catTxt = await x.page.innerText('main');
check('I1–I3 tidak masuk Catatanku', !/Akhir 2014|UNKNOWN|GrabBike/.test(catTxt) && /catatan rahasia N3|Brand Architecture Map/.test(catTxt), catTxt.slice(0, 200));
await x.page.click('header.top button:has-text("Kembali")');

// ---------- 10d. Sesi 5: L1 (pilih semua, acak tetap, tanda kunci terpisah), konteks L4, kunci L2 ----------
await d.page.selectOption('#sel', 'l1');
await d.page.click('#btn-open');
check('L1 tampil di HP: teks skrip + petunjuk pilih lebih dari satu', await bodyHas(x.page, /What do you think made Sevel close\? Choose all that apply\./) && await bodyHas(x.page, /Boleh pilih lebih dari satu/));
const l1Order = await x.page.locator('fieldset[data-field="alasan"] label.opt b').allInnerTexts();
check('L1 di HP: urutan acak tetap E B G C F A H D, huruf tetap melekat', l1Order.map((t) => t[0]).join('') === 'EBGCFAHD' && l1Order.length === 8, l1Order.join(' | '));
for (const t of ['A\\. The seats were always full, but people spent little', 'G\\. It lost to online shopping']) await opt(x.page, 'alasan', t).click();
await x.page.click('button:has-text("Kirim jawaban")');
await bodyHas(x.page, /Terkirim ✓/);
await x.page.screenshot({ path: `${SHOTS}/l1-360.png`, fullPage: true });
check('360px: layar L1 tanpa geser ke samping', !(await x.page.evaluate(() => document.documentElement.scrollWidth > innerWidth)));
check('L1: tombol "Tandai yang dilaporkan" belum ada sebelum Tampilkan hasil', (await d.page.locator('#btn-key').count()) === 0);
await d.page.click('#btn-reveal');
await bodyHas(d.page, /1 \(100%\)/);
const dosenOrder = await d.page.locator('.bars .bl').allInnerTexts();
check('L1 dosen: batang urut A–H seperti slide', dosenOrder.map((t) => t[0]).join('') === 'ABCDEFGH', dosenOrder.join(' | '));
check('L1 dosen: persentase tampil TANPA tanda kunci dulu', (await d.page.locator('.bar.key').count()) === 0 && !/✓|Sesuai kunci/.test(await d.page.innerText('.results')));
await d.page.click('#btn-key');
await until(d.page, () => document.querySelectorAll('.bar.key').length > 0).catch(() => {});
check('L1 dosen: setelah "Tandai yang dilaporkan", A–D bertanda ✓, E–H tidak', (await d.page.locator('.bar.key .bl').allInnerTexts()).map((t) => t[0]).join('') === 'ABCD' && await bodyHas(d.page, /Sesuai kunci di skrip: 0 dari 1/));
await d.page.click('#btn-key');
await until(d.page, () => document.querySelectorAll('.bar.key').length === 0).catch(() => {});
check('L1 dosen: tanda bisa disembunyikan lagi', (await d.page.locator('.bar.key').count()) === 0);
await d.page.selectOption('#sel', 'l4');
await d.page.click('#btn-open');
check('L4: konteks tiga baris di atas pertanyaan (HP)', await bodyHas(x.page, /They want somewhere cool to sit with friends,\s*BUT a café costs too much,\s*SO they need a cheap place to stay for hours\.\s*According to this insight, why do they choose Sevel\?/));
check('L4: konteks juga di layar dosen', await bodyHas(d.page, /SO they need a cheap place to stay for hours\./));
await d.page.selectOption('#sel', 'l2');
await d.page.click('#btn-open');
await opt(x.page, 'jawab', 'B\\. Customers paid with their time, not their money').click();
await x.page.click('button:has-text("Kirim jawaban")');
await bodyHas(x.page, /Terkirim ✓/);
check('L2: tanpa tombol tanda terpisah', (await d.page.locator('#btn-key').count()) === 0);
await d.page.click('#btn-reveal');
check('L2: jawaban benar B langsung disorot + persentase', await bodyHas(d.page, /B\. Customers paid with their time, not their money ✓/) && await bodyHas(d.page, /1 \(100%\)/));
await x.page.click('header.top button:has-text("Catatanku")');
await bodyHas(x.page, /Catatanku/);
check('L1–L13 tidak masuk Catatanku', !/Sevel|Customers paid/.test(await x.page.innerText('main')));
await x.page.click('header.top button:has-text("Kembali")');

// filter di daftar layar
await d.page.selectOption('#f-jenis', 'insight');
let opts = await d.page.locator('#sel option').evaluateAll((os) => os.map((o) => o.value));
check('filter jenis=insight: daftar layar hanya I1–I3', opts.join(',') === 'i1,i2,i3', opts.join(','));
await d.page.selectOption('#f-jenis', '');
await d.page.selectOption('#f-sesi', 'S4');
await until(d.page, () => document.querySelectorAll('#sel option').length >= 25).catch(() => {});
opts = await d.page.locator('#sel option').evaluateAll((os) => os.map((o) => o.value));
check('filter sesi=S4: 25 layar kelas (ditambah layar terpilih bila di luar filter)', opts.filter((v) => !v.startsWith('i') && !/^l\d+$/.test(v) && !v.startsWith('s6-') && !v.startsWith('s7-')).length === 25, opts.join(','));
await d.page.selectOption('#f-sesi', 'S5');
await until(d.page, () => { const os = [...document.querySelectorAll('#sel option')]; return os.length === 13 && os.every((o) => /^l\d+$/.test(o.value)); }).catch(() => {});
opts = await d.page.locator('#sel option').evaluateAll((os) => os.map((o) => o.value));
check('filter sesi=S5: L1–L13 (13 layar)', opts.filter((v) => /^l\d+$/.test(v)).length === 13 && opts.length === 13, opts.join(','));
await d.page.selectOption('#f-sesi', '');

// kehadiran: pembagi = layar dibuka, rincian per jenis, filter, CSV
await d.page.click('button:has-text("Kehadiran")');
await d.page.click('#btn-att');
await until(d.page, () => !/Memuat/.test(document.querySelector('#btn-att').textContent) && document.querySelector('#atab'));
const opened = await admin('dosenState/opened');
check('riwayat layar dibuka tercatat di dosenState/opened (9 layar)', Object.keys(opened || {}).sort().join(',') === 'h2-terapkan,i1,i2,i3,l1,l2,l4,poll1,q1', JSON.stringify(opened));
const waitRow = (re) => until(d.page, ([src, n]) => [...document.querySelectorAll('#atab tbody tr')].some((tr) => tr.innerText.replace(/\s+/g, ' ').startsWith(n) && new RegExp(src).test(tr.innerText.replace(/\s+/g, ' '))), [re.source, N3]).then(() => true, () => false);
const rowN3 = async () => (await d.page.locator('#atab tbody tr').allInnerTexts()).find((t) => t.startsWith(N3))?.replace(/\s+/g, ' ');
check('kehadiran semua: pembagi 9, insight N3 = 2/3', await waitRow(/dari 9 2\/3/), await rowN3());
await d.page.selectOption('#f-jenis', 'insight');
check('kehadiran filter insight: N3 = 2 dari 3', await waitRow(/^2306000003 2 dari 3 2\/3 0\/0/), await rowN3());
const [dl3] = await Promise.all([d.page.waitForEvent('download'), d.page.click('#btn-att-csv')]);
const csv3 = readFileSync(await dl3.path(), 'utf8').split('\r\n');
check('CSV kehadiran (filter insight): nama berkas + kolom per layar berlabel', dl3.suggestedFilename() === 'kehadiran-insight.csv' && csv3[0] === '﻿nim;dibuka;dijawab;insight_dibuka;insight_dijawab;kelas_dibuka;kelas_dijawab;i1 (S1 insight);i2 (S2 insight);i3 (S3 insight)', `${dl3.suggestedFilename()} ${csv3[0]}`);
check('CSV kehadiran (filter insight): baris N3 = 3;2;3;2;0;0;1;0;1', csv3.includes(`${N3};3;2;3;2;0;0;1;0;1`), csv3.join(' | '));
await d.page.selectOption('#f-jenis', '');

// kosongkan riwayat (sebelum kelas)
await d.page.click('#btn-reset-opened');
check('kosongkan riwayat: perlu klik kedua (konfirmasi)', await bodyHas(d.page, /Yakin\? Klik lagi untuk mengosongkan/) && !!(await admin('dosenState/opened')));
await d.page.click('#btn-reset-opened');
await until(d.page, () => /Belum ada layar dibuka/.test(document.body.innerText)).catch(() => {});
check('kosongkan riwayat: dosenState/opened kosong, daftar "Belum ada layar dibuka"', (await admin('dosenState/opened')) === null && await bodyHas(d.page, /Riwayat layar dibuka: 0/));
check('setelah dikosongkan: pembagi 0, jawaban lama tidak terhapus', await waitRow(/0 dari 0/) && !!(await admin(`answers/i1/${N3}`)), await rowN3());
await d.page.click('button:has-text("Layar")');
await d.page.selectOption('#sel', 'i2');
await d.page.click('#btn-open');
await d.page.click('button:has-text("Kehadiran")');
check('layar yang dibuka setelah dikosongkan tercatat lagi (pembagi 1)', await waitRow(/dari 1 /), await rowN3());
await d.page.click('button:has-text("Layar")');

// ---------- 10e. Sesi 6: L1–L4 (konteks, tanda kunci terpisah, label SAY/DO/PAY hanya di dosen) ----------
await d.page.selectOption('#f-sesi', 'S6');
await until(d.page, () => { const os = [...document.querySelectorAll('#sel option')]; return os.length === 4 && os.every((o) => o.value.startsWith('s6-')); }).catch(() => {});
opts = await d.page.locator('#sel option').evaluateAll((os) => os.map((o) => o.value));
check('filter sesi=S6: s6-l1 … s6-l4 (4 layar)', opts.join(',') === 's6-l1,s6-l2,s6-l3,s6-l4', opts.join(','));
const lab6 = await d.page.locator('#sel option').allInnerTexts();
check('daftar dosen S6: label memuat nomor slide deck (L1 slide 3, L2 slide 4, L3 slide 5, L4 slide 12) dan [S6 · kelas]',
  /L1\./.test(lab6[0]) && /slide 3\)/.test(lab6[0]) && /slide 4\)/.test(lab6[1]) && /slide 5\)/.test(lab6[2]) && /slide 12\)/.test(lab6[3]) && lab6.every((t) => /\[S6 · kelas\]/.test(t)), lab6.join(' | '));
await d.page.selectOption('#sel', 's6-l1');
await d.page.click('#btn-open');
check('S6 L1 di HP: konteks empat baris di atas pertanyaan', await bodyHas(x.page, /Clubhouse: aplikasi ruang obrolan suara, live\.\s*2021: 10 juta pengguna per minggu, valuasi 4 miliar dolar\.\s*2023: PHK lebih dari setengah karyawan\.\s*Pengguna paling awal dan paling setia ikut pergi\.\s*Menurutmu, kenapa pengguna Clubhouse yang paling setia ikut pergi\?/));
const s6l1 = await x.page.locator('fieldset[data-field="jawab"] label.opt b').allInnerTexts();
check('S6 L1 di HP: opsi A–D urut, teks skrip', s6l1.length === 4 && s6l1[3] === 'D. Setelah dibuka untuk umum, ruangnya tidak lagi terasa eksklusif' && s6l1.map((t) => t[0]).join('') === 'ABCD', s6l1.join(' | '));
await opt(x.page, 'jawab', 'D\\. Setelah dibuka untuk umum, ruangnya tidak lagi terasa eksklusif').click();
await x.page.click('button:has-text("Kirim jawaban")');
await bodyHas(x.page, /Terkirim ✓/);
await x.page.screenshot({ path: `${SHOTS}/s6-l1-360.png`, fullPage: true });
check('360px: layar S6 L1 tanpa geser ke samping', !(await x.page.evaluate(() => document.documentElement.scrollWidth > innerWidth)));
check('S6 L1: tombol "Tandai kunci" belum ada sebelum Tampilkan hasil', (await d.page.locator('#btn-key').count()) === 0);
await d.page.click('#btn-reveal');
await bodyHas(d.page, /1 \(100%\)/);
check('S6 L1 dosen: persentase tampil TANPA tanda kunci dulu', (await d.page.locator('.bar.key').count()) === 0 && !/✓|Sesuai kunci/.test(await d.page.innerText('.results')));
check('S6 L1 dosen: tombol berlabel "Tandai kunci"', (await d.page.locator('#btn-key').innerText()).trim() === 'Tandai kunci');
await d.page.click('#btn-key');
await until(d.page, () => document.querySelectorAll('.bar.key').length > 0).catch(() => {});
check('S6 L1 dosen: setelah Tandai kunci, hanya D bertanda ✓ dan "Sesuai kunci 1 dari 1"', (await d.page.locator('.bar.key .bl').allInnerTexts()).map((t) => t[0]).join('') === 'D' && await bodyHas(d.page, /Sesuai kunci di skrip: 1 dari 1/));
check('S6 L1: tidak ada label SAY/DO/PAY di layar dosen', !/SAY|PAY|DITOLAK/.test(await d.page.innerText('.results')));
await d.page.selectOption('#sel', 's6-l2');
await d.page.click('#btn-open');
check('S6 L2 di HP: pertanyaan dan opsi B persis skrip', await bodyHas(x.page, /Clubhouse tidak pernah menulis 'eksklusif'\. Dari mana audiens aslinya mendapat pesan itu\?/) && await bodyHas(x.page, /B\. Dari cara masuknya: harus diundang teman, hanya iPhone/));
await opt(x.page, 'jawab', 'A\\. Dari deskripsi di App Store dan situsnya').click();
await x.page.click('button:has-text("Kirim jawaban")');
await bodyHas(x.page, /Terkirim ✓/);
await d.page.click('#btn-reveal');
await bodyHas(d.page, /1 \(100%\)/);
check('S6 L2 dosen: persentase dulu tanpa kunci; sesudah Tandai kunci B bertanda, jawaban A tidak sesuai', (await d.page.locator('.bar.key').count()) === 0);
await d.page.click('#btn-key');
await until(d.page, () => document.querySelectorAll('.bar.key').length > 0).catch(() => {});
check('S6 L2 dosen: B ✓ dan "Sesuai kunci di skrip: 0 dari 1"', (await d.page.locator('.bar.key .bl').allInnerTexts()).map((t) => t[0]).join('') === 'B' && await bodyHas(d.page, /Sesuai kunci di skrip: 0 dari 1/));
await d.page.selectOption('#sel', 's6-l3');
await d.page.click('#btn-open');
check('S6 L3 di HP: pertanyaan PM Clubhouse 2021', await bodyHas(x.page, /Kamu PM Clubhouse di tahun 2021\. Angka apa yang kamu taruh paling atas\?/));
await d.page.selectOption('#sel', 's6-l4');
await d.page.click('#btn-open');
check('S6 L4 di HP: kartu Jumbo teks pendek di atas pertanyaan', await bodyHas(x.page, /Jumbo\s*Untuk siapa: keluarga dengan anak usia SD\s*Pesan utama: "The film you want your kids to watch: courage, friendship and family love, proudly blending Indonesian culture with world-class animation\. Quality time for the whole family this Lebaran\."\s*Di mana: bioskop XXI, CGV, Cinepolis, libur Lebaran, mulai 31 Maret\s*Harga: Rp40–45 ribu per tiket\s*Yang kami minta: ajak keluargamu menonton Jumbo di libur Lebaran\.\s*Seorang ibu dengan anak usia SD melihat kartu Jumbo\./));
const hpL4 = await x.page.innerText('main');
check('S6 L4 di HP: tanpa label SAY / DO / PAY / Ditolak', !/\bSAY\b|\bDO\b|\bPAY\b|DITOLAK|Ditolak/.test(hpL4), hpL4.slice(0, 300));
await opt(x.page, 'jawab', 'B\\. "Boleh kirim link presale-nya\\? Saya cek jadwal hari Minggu dulu\\."').click();
await x.page.click('button:has-text("Kirim jawaban")');
await bodyHas(x.page, /Terkirim ✓/);
await x.page.screenshot({ path: `${SHOTS}/s6-l4-360.png`, fullPage: true });
check('360px: layar S6 L4 tanpa geser ke samping', !(await x.page.evaluate(() => document.documentElement.scrollWidth > innerWidth)));
check('S6 L4: tanpa tombol kunci', (await d.page.locator('#btn-key').count()) === 0);
await d.page.click('#btn-reveal');
await bodyHas(d.page, /1 \(100%\)/);
const l4Labs = await d.page.locator('.bars .bl .dlab').allInnerTexts();
check('S6 L4 dosen: label SAY · DO · PAY · DITOLAK di tiap batang, urut A–D', l4Labs.join(',') === 'SAY,DO,PAY,DITOLAK', l4Labs.join(','));
check('S6 L4 dosen: tanpa ✓ dan tanpa "Sesuai kunci"', (await d.page.locator('.bar.key').count()) === 0 && !/✓|Sesuai kunci/.test(await d.page.innerText('.results')));
check('S6 L4 dosen: konteks kartu Jumbo juga tampil', await bodyHas(d.page, /Yang kami minta: ajak keluargamu menonton Jumbo di libur Lebaran\./));
await x.page.click('header.top button:has-text("Catatanku")');
await bodyHas(x.page, /Catatanku/);
check('S6 L1–L4 tidak masuk Catatanku', !/Clubhouse|Jumbo|presale/.test(await x.page.innerText('main')));
await x.page.click('header.top button:has-text("Kembali")');
await d.page.selectOption('#f-sesi', '');
check('Rules tidak berubah setelah blok S6', (() => { try { execSync('git diff --quiet HEAD -- database.rules.json'); return true; } catch { return false; } })());

// ---------- 10f. Sesi 7: L1–L6 + Uji kartu #1–#5 dari dua perangkat (HP 360 px + laptop 1280 px) ----------
const lp = await newPage(false); // laptop mahasiswa
await studentLogin(lp.page, N2);
await bodyHas(lp.page, /Kamu sudah masuk|Kirim|ditutup/);
const both = async (re) => (await bodyHas(x.page, re)) && (await bodyHas(lp.page, re));
const hpLetters = async (page) => (await page.locator('fieldset[data-field="jawab"] label.opt b').allInnerTexts()).map((t) => t[0]).join('');
const send = async (page) => { await page.click('button:has-text("Kirim jawaban")'); return bodyHas(page, /Terkirim ✓/); };
const keyBars = async () => (await d.page.locator('.bar.key .bl').allInnerTexts()).map((t) => t[0]).join('');
await d.page.selectOption('#f-sesi', 'S7');
await until(d.page, () => [...document.querySelectorAll('#sel option')].every((o) => o.value.startsWith('s7-'))).catch(() => {});
opts = await d.page.locator('#sel option').evaluateAll((os) => os.map((o) => o.value));
check('filter sesi=S7: 11 layar, urut L1–L6 lalu Uji kartu #1–#5', opts.join(',') === S7_IDS, opts.join(','));
const lab7 = await d.page.locator('#sel option').allInnerTexts();
check('daftar dosen S7: L1–L3 slide 3, L4–L6 slide 4, Uji kartu slide 5, [S7 · kelas]',
  lab7.slice(0, 3).every((t) => /slide 3\)/.test(t)) && lab7.slice(3, 6).every((t) => /slide 4\)/.test(t)) && lab7.slice(6).every((t) => /slide 5\)/.test(t)) && lab7.every((t) => /\[S7 · kelas\]/.test(t)) && /Uji kartu #5/.test(lab7[10]), lab7.join(' | '));

// L1: acak tetap sama di dua perangkat; persentase dulu, kunci B sesudah klik
await d.page.selectOption('#sel', 's7-l1');
await d.page.click('#btn-open');
check('S7 L1 di HP dan laptop: pertanyaan Old Spice', await both(/Iklan Old Spice ini sebenarnya ditujukan untuk siapa\?/));
const l1hp = await hpLetters(x.page), l1lp = await hpLetters(lp.page);
check('S7 L1: urutan acak tetap C A D B, sama di HP dan laptop', l1hp === 'CADB' && l1lp === 'CADB', `${l1hp} / ${l1lp}`);
await opt(x.page, 'jawab', 'B\\. Perempuan yang membelikan sabun untuk pasangannya').click();
await opt(lp.page, 'jawab', 'A\\. Laki-laki muda yang ingin terlihat lebih menarik').click();
check('S7 L1: dua perangkat terkirim', (await send(x.page)) && (await send(lp.page)));
await x.page.screenshot({ path: `${SHOTS}/s7-l1-360.png`, fullPage: true });
await lp.page.screenshot({ path: `${SHOTS}/s7-l1-laptop.png`, fullPage: true });
check('360px: S7 L1 tanpa geser ke samping', !(await x.page.evaluate(() => document.documentElement.scrollWidth > innerWidth)));
await d.page.click('#btn-reveal');
check('S7 L1 dosen: 1 (50%) per pilihan, tanpa tanda kunci dulu', await bodyHas(d.page, /1 \(50%\)/) && (await d.page.locator('.bar.key').count()) === 0 && !/✓/.test(await d.page.innerText('.results')));
await d.page.click('#btn-key');
await until(d.page, () => document.querySelectorAll('.bar.key').length > 0).catch(() => {});
check('S7 L1 dosen: Tandai kunci → B ✓, "Sesuai kunci di skrip: 1 dari 2"', (await keyBars()) === 'B' && await bodyHas(d.page, /Sesuai kunci di skrip: 1 dari 2/));
await d.page.screenshot({ path: `${SHOTS}/s7-l1-dosen.png`, fullPage: true });

// L2: persentase saja, kunci TIDAK ditandai di tempat
await d.page.selectOption('#sel', 's7-l2');
await d.page.click('#btn-open');
await both(/Sebulan setelah kampanye ini, penjualan sabun mandi Old Spice…/);
check('S7 L2: urutan acak tetap B D A C', (await hpLetters(x.page)) === 'BDAC' && (await hpLetters(lp.page)) === 'BDAC', await hpLetters(x.page));
await opt(x.page, 'jawab', 'D\\. Naik lebih dari 100%').click();
await opt(lp.page, 'jawab', 'C\\. Naik sekitar 50%').click();
await send(x.page); await send(lp.page);
await d.page.click('#btn-reveal');
check('S7 L2 dosen: persentase tampil, tanpa tanda kunci', await bodyHas(d.page, /1 \(50%\)/) && (await d.page.locator('.bar.key').count()) === 0);

// L3: template Uji kartu berlabel Contoh · Old Spice
await d.page.selectOption('#sel', 's7-l3');
await d.page.click('#btn-open');
check('S7 L3 di HP dan laptop: "Contoh · Old Spice" + pertanyaan', await both(/Contoh · Old Spice[\s\S]*Kamu perempuan yang biasa membelikan sabun mandi untuk pasanganmu\. Setelah melihat iklan ini, kamu…/));
const ujiB = await x.page.locator('fieldset[data-field="pilih"] label.opt b').allInnerTexts();
check('S7 L3 di HP: SAY · DO · PAY · Tidak (urut tangga) + definisi', ujiB.join(',') === 'SAY,DO,PAY,Tidak' && await bodyHas(x.page, /PAY\s*Saya mau memberi sesuatu yang hilang kalau mundur \(uang, waktu, nomor HP, rekomendasi\)/), ujiB.join(','));
check('S7 L3 di HP: kotak "Kenapa?" boleh dikosongkan', await bodyHas(x.page, /Kenapa\?\s*Boleh dikosongkan\./));
await opt(x.page, 'pilih', 'Tidak').click();
await x.page.fill('fieldset[data-field="kenapa"] .txt', 'Pasanganku sudah punya sabun favorit');
await opt(lp.page, 'pilih', 'PAY').click();
check('S7 L3: jawaban tanpa "Kenapa?" tetap bisa dikirim', (await send(x.page)) && (await send(lp.page)));
await d.page.click('#btn-reveal');
check('S7 L3 dosen: Kenapa? tampil dengan label pilihan "Tidak"', await bodyHas(d.page, /Tidak\s*Pasanganku sudah punya sabun favorit/));
check('S7 L3 dosen: tanpa NIM', !/23060000/.test(await d.page.innerText('.results')));

// L4, L5: urutan acak tetap
await d.page.selectOption('#sel', 's7-l4');
await d.page.click('#btn-open');
check('S7 L4: pertanyaan Peloton, urutan D A B C', await both(/Siapa yang diharapkan membeli setelah menonton iklan Peloton ini\?/) && (await hpLetters(x.page)) === 'DABC', await hpLetters(x.page));
await opt(x.page, 'jawab', 'B\\. Orang yang mencari hadiah untuk pasangan').click(); await send(x.page);
await d.page.selectOption('#sel', 's7-l5');
await d.page.click('#btn-open');
await both(/Iklan ini ramai dikritik\. Penjualan liburan Peloton sesudahnya…/);
check('S7 L5: urutan B C D A', (await hpLetters(x.page)) === 'BCDA' && (await hpLetters(lp.page)) === 'BCDA', await hpLetters(x.page));
await opt(x.page, 'jawab', 'C\\. Tidak memiliki informasi penjualan').click(); await send(x.page);
await opt(lp.page, 'jawab', 'A\\. Turun tajam').click(); await send(lp.page);
await d.page.click('#btn-reveal');
check('S7 L5 dosen: tanpa tanda kunci di tempat', (await d.page.locator('.bar.key').count()) === 0);
await d.page.selectOption('#sel', 's7-l6');
await d.page.click('#btn-open');
check('S7 L6 di HP: "Contoh · Peloton" + pertanyaan hadiah', await both(/Contoh · Peloton[\s\S]*Kamu sedang mencari hadiah untuk pasanganmu, dan uangnya ada\. Setelah melihat iklan ini, kamu…/));
await opt(x.page, 'pilih', 'DO').click(); await send(x.page);

// Kunci L2 (D) dan L5 (C) ditandai BELAKANGAN di dashboard, saat layar itu tidak aktif
await d.page.selectOption('#sel', 's7-l2');
check('S7 L2 tidak aktif: hasil tetap terlihat + tombol "Tandai kunci" tersedia', await bodyHas(d.page, /Layar ini tidak sedang dibuka/i) && (await d.page.locator('#btn-key').innerText()).trim() === 'Tandai kunci');
await d.page.click('#btn-key');
await until(d.page, () => document.querySelectorAll('.bar.key').length > 0).catch(() => {});
check('S7 L2 belakangan: D ✓, "Sesuai kunci di skrip: 1 dari 2"', (await keyBars()) === 'D' && await bodyHas(d.page, /Sesuai kunci di skrip: 1 dari 2/));
check('S7 L2 belakangan: layar mahasiswa tidak berubah (masih L6)', await bodyHas(x.page, /Contoh · Peloton/));
await d.page.selectOption('#sel', 's7-l5');
await d.page.click('#btn-key');
await until(d.page, () => document.querySelectorAll('.bar.key').length > 0).catch(() => {});
check('S7 L5 belakangan: C ✓, "Sesuai kunci di skrip: 1 dari 2"', (await keyBars()) === 'C' && await bodyHas(d.page, /Sesuai kunci di skrip: 1 dari 2/));
check('tanda kunci diingat browser dosen (localStorage)', /s7-l2.*true|true.*s7-l2/.test(await lsGet(d.page, 'kl-keyOn') || '') && /s7-l5/.test(await lsGet(d.page, 'kl-keyOn') || ''));

// Uji kartu #1: isi kartu tidak di HP; Kenapa? Tidak/SAY dulu; unduhan
await d.page.selectOption('#sel', 's7-uk1');
await d.page.click('#btn-open');
check('Uji kartu #1 di HP dan laptop: judul + teks FOR WHOM', await both(/Uji kartu #1[\s\S]*Kamu adalah orang di baris FOR WHOM kartu ini\. Setelah membaca kartunya, kamu apa\?/));
const hpU1 = await x.page.innerText('main');
check('Uji kartu #1 di HP: tanpa isi kartu (tanpa MAIN MESSAGE / WHY BELIEVE IT / konteks)', !/MAIN MESSAGE|WHY BELIEVE|PRICE|WHERE/.test(hpU1) && (await x.page.locator('.konteks').count()) === 0, hpU1.slice(0, 300));
await opt(x.page, 'pilih', 'DO').click();
await x.page.fill('fieldset[data-field="kenapa"] .txt', 'Mau coba dulu, gampang dibatalkan');
await opt(lp.page, 'pilih', 'SAY').click();
await lp.page.fill('fieldset[data-field="kenapa"] .txt', 'Menarik, tapi belum perlu sekarang');
await send(x.page); await send(lp.page);
await x.page.screenshot({ path: `${SHOTS}/s7-uk1-360.png`, fullPage: true });
await lp.page.screenshot({ path: `${SHOTS}/s7-uk1-laptop.png`, fullPage: true });
check('360px: Uji kartu #1 tanpa geser ke samping', !(await x.page.evaluate(() => document.documentElement.scrollWidth > innerWidth)));
check('Uji kartu #1: hasil tersembunyi sampai "Tampilkan hasil"', (await d.page.locator('.gate').count()) === 1);
await d.page.click('#btn-reveal');
await bodyHas(d.page, /Menarik, tapi belum perlu sekarang/);
const kc = (await d.page.locator('.cards .card').allInnerTexts()).map((t) => t.replace(/\s+/g, ' '));
check('Uji kartu #1 dosen: daftar Kenapa? berlabel pilihan, SAY sebelum DO', kc.length === 2 && kc[0].startsWith('SAY Menarik') && kc[1].startsWith('DO Mau coba'), kc.join(' | '));
check('Uji kartu #1 dosen: persentase SAY 50%, DO 50%, tanpa ✓', await bodyHas(d.page, /SAY[\s\S]*1 \(50%\)[\s\S]*DO[\s\S]*1 \(50%\)/) && (await d.page.locator('.bar.key').count()) === 0 && (await d.page.locator('#btn-key').count()) === 0);
await d.page.screenshot({ path: `${SHOTS}/s7-uk1-dosen.png`, fullPage: true });
const [dlU] = await Promise.all([d.page.waitForEvent('download'), d.page.click('#btn-dl')]);
const csvU = readFileSync(await dlU.path(), 'utf8');
const linesU = csvU.slice(1).split('\r\n');
check('Unduh hasil Uji kartu #1: nama berkas', dlU.suggestedFilename() === 'hasil-s7-uk1-uji-kartu-1.csv', dlU.suggestedFilename());
check('Unduh hasil Uji kartu #1: persentase empat pilihan + Kenapa? berlabel, tanpa NIM',
  linesU[0] === 'bagian;pilihan;jumlah;persen;teks' && linesU.includes('Jawaban masuk;;2;;') && linesU.includes('Persentase;SAY;1;50%;Saya bilang tertarik, tapi belum melakukan apa-apa') &&
  linesU.includes('Persentase;PAY;0;0%;Saya mau memberi sesuatu yang hilang kalau mundur (uang, waktu, nomor HP, rekomendasi)') && linesU.includes('Persentase;Tidak;0;0%;Saya tidak tertarik') &&
  linesU.includes('Kenapa?;SAY;;;Menarik, tapi belum perlu sekarang') && linesU.includes('Kenapa?;DO;;;Mau coba dulu, gampang dibatalkan') && !/23060000/.test(csvU), linesU.join(' | '));

// Uji kartu #2–#5: layar terpisah, hasil terpisah
await d.page.selectOption('#sel', 's7-uk2');
await d.page.click('#btn-open');
check('Uji kartu #2 di HP: judul #2, pilihan kosong lagi', await bodyHas(x.page, /Uji kartu #2/) && !(await x.page.locator('fieldset[data-field="pilih"] input:checked').count()));
await opt(x.page, 'pilih', 'Tidak').click(); await send(x.page);
check('hasil terpisah: s7-uk1 tetap 2 jawaban, s7-uk2 1 jawaban', Object.keys(await admin('answers/s7-uk1') || {}).length === 2 && Object.keys(await admin('answers/s7-uk2') || {}).length === 1);
for (const n of [3, 4, 5]) {
  await d.page.selectOption('#sel', `s7-uk${n}`);
  await d.page.click('#btn-open');
  check(`Uji kartu #${n} terbuka di HP`, await bodyHas(x.page, new RegExp(`Uji kartu #${n}`)));
}
await d.page.click('#btn-close');
await x.page.click('header.top button:has-text("Catatanku")');
await bodyHas(x.page, /Catatanku/);
check('S7 tidak masuk Catatanku', !/Old Spice|Peloton|Uji kartu|Kenapa/.test(await x.page.innerText('main')));
await x.page.click('header.top button:has-text("Kembali")');
await d.page.selectOption('#f-sesi', '');
check('Rules tidak berubah setelah blok S7', (() => { try { execSync('git diff --quiet HEAD -- database.rules.json'); return true; } catch { return false; } })());

// ---------- 11. penutup ----------
await d.page.click('#btn-end');
await d.page.click('#btn-end');
check('Penutup: mahasiswa melihat Catatanku + Unduh CSV', await bodyHas(s1b.page, /Terima kasih! Ini Catatanku/));

// ---------- 12. penghitung koneksi ----------
check('puncak koneksi tercatat di layar dosen', /puncak [1-9]/.test(await d.page.textContent('#conn')), await d.page.textContent('#conn'));

check('tidak ada error JavaScript tak tertangkap di halaman mana pun', errors.length === 0, errors.join(' | '));
await browser.close();
console.log(fails ? `\n${fails} GAGAL` : '\nSEMUA LOLOS');
process.exit(fails ? 1 : 0);
