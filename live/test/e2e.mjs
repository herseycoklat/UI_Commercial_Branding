// Uji ujung-ke-ujung dengan browser sungguhan terhadap emulator Firebase (Auth 9099, Database 9000) dan server statis 8080.
// Jalankan: bash scripts/e2e.sh   (atau `node test/e2e.mjs` bila emulator dan server sudah hidup)
import { createRequire } from 'node:module';
import { readFileSync, mkdirSync } from 'node:fs';
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
check('hasil tersembunyi sampai "Tampilkan hasil"', (await d.page.locator('.gate').count()) === 1 && !(await d.page.innerText('body')).includes('Gojek'));
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
check('kehadiran: NIM1 menjawab q1, poll1, h2-terapkan = 3 dari 25', /2306000001\s+3 dari 25/.test(rows.join('\n').replace(/\t/g, ' ')), rows.join('|'));
const [dl2] = await Promise.all([d.page.waitForEvent('download'), d.page.click('#btn-att-csv')]);
const csv2 = readFileSync(await dl2.path(), 'utf8');
check('kehadiran CSV: tanpa kolom/penanda aktif-tidak aktif', !/aktif/i.test(csv2) && csv2.split('\r\n')[0].startsWith('﻿nim;dijawab;dari;q1;poll1'));
await d.page.click('button:has-text("Layar")');

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
