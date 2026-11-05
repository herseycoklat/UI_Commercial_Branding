import test from 'node:test';
import assert from 'node:assert/strict';
import { SCREENS, SCREEN_BY_ID, SESI_LIST, JENIS_LIST, matchFilter } from '../screens.js';
import { aggregateScreen, groupBrands, normalizeBrand } from '../aggregate.js';
import { flagsFor, collectFlags, markField, markSummary } from '../flags.js';
import { toCsv, cell, guard, catatankuRows, answerText, BOM, COLUMNS } from '../csv.js';

// ---------- screens ----------
test('28 layar: I1–I3 lalu 25 layar lama bernomor 1..25, id unik', () => {
  assert.equal(SCREENS.length, 28);
  assert.equal(new Set(SCREENS.map((s) => s.id)).size, 28);
  assert.deepEqual(SCREENS.slice(0, 4).map((s) => s.id), ['i1', 'i2', 'i3', 'q1']);
  SCREENS.slice(3).forEach((s, i) => assert.equal(s.no, i + 1));
});

test('label sesi × jenis: I1=S1, I2=S2, I3=S3 insight; 25 layar lama S4 kelas', () => {
  assert.deepEqual(SCREENS.slice(0, 3).map((s) => `${s.sesi}/${s.jenis}`), ['S1/insight', 'S2/insight', 'S3/insight']);
  for (const s of SCREENS.slice(3)) assert.equal(`${s.sesi}/${s.jenis}`, 'S4/kelas', s.id);
  for (const s of SCREENS) assert.ok(SESI_LIST.includes(s.sesi) && JENIS_LIST.includes(s.jenis), s.id);
});

test('I1–I3: teks doc 63, kunci B/B/UNKNOWN, 30 detik, tidak masuk Catatanku', () => {
  const [i1, i2, i3] = SCREENS;
  assert.equal(i1.fields[0].label, 'Akhir 2014, apa masalah utama Gojek?');
  assert.equal(i1.fields[0].key, 'b');
  assert.equal(i2.fields[0].label, 'GrabBike sekitar Rp5.000, Go-Jek sekitar Rp15.000. Kalau kalian tim Gojek, di mana kalian harus menang?');
  assert.equal(i2.fields[0].options.length, 4);
  assert.equal(i2.fields[0].key, 'b');
  assert.deepEqual(i3.fields[0].options.map((o) => o.t), ['REAL', 'PLANNED', 'UNKNOWN']);
  assert.equal(i3.fields[0].key, 'unknown');
  for (const s of [i1, i2, i3]) { assert.equal(s.waktu, 30); assert.equal(s.catatanku, undefined); assert.equal(s.fields.length, 1); assert.equal(s.fields[0].type, 'single'); }
  assert.equal(markField(i3.fields[0], 'unknown').ok, true);
  assert.equal(collectFlags(i1, { 1: { values: { masalah: 'a' } } }).length, 0); // tanpa ⚠
});

test('filter sesi × jenis', () => {
  assert.equal(SCREENS.filter((s) => matchFilter(s, {})).length, 28);
  assert.equal(SCREENS.filter((s) => matchFilter(s, { jenis: 'insight' })).length, 3);
  assert.equal(SCREENS.filter((s) => matchFilter(s, { sesi: 'S4' })).length, 25);
  assert.deepEqual(SCREENS.filter((s) => matchFilter(s, { sesi: 'S2', jenis: 'insight' })).map((s) => s.id), ['i2']);
  assert.equal(SCREENS.filter((s) => matchFilter(s, { sesi: 'S1', jenis: 'kelas' })).length, 0);
});

test('setiap bidang punya tipe sah, opsi bila perlu, dan kunci mengacu ke opsi yang ada', () => {
  for (const s of SCREENS) {
    for (const f of s.fields) {
      assert.ok(['single', 'multi', 'text', 'grid'].includes(f.type), `${s.id}.${f.id}`);
      if (f.type === 'single' || f.type === 'multi') {
        assert.ok(f.options?.length >= 2, `${s.id}.${f.id} opsi`);
        const vs = f.options.map((o) => o.v);
        assert.equal(new Set(vs).size, vs.length, `${s.id}.${f.id} nilai opsi unik`);
        if (f.key != null) for (const k of [].concat(f.key)) assert.ok(vs.includes(k), `${s.id}.${f.id} kunci ${k}`);
      }
      if (f.type === 'grid') {
        for (const [r, c] of Object.entries(f.key || {})) {
          assert.ok(f.rows.some((x) => x.v === r));
          assert.ok(f.cols.some((x) => x.v === c));
        }
      }
    }
  }
});

test('hlm 9 A: 10 kandidat, tanpa duplikat; 7 kriteria + 3 selera', () => {
  const f = SCREEN_BY_ID['h9-terapkan-a'].fields[0];
  assert.equal(f.options.length, 10);
  assert.equal(f.key.length, 7);
  assert.equal(f.selera.length, 3);
});

// ---------- aggregate ----------
const ans = (values, t = 1) => ({ values, t });

test('single: hitung per opsi, nilai asing tetap terlihat', () => {
  const s = SCREEN_BY_ID['h2-tebak'];
  const r = aggregateScreen(s, {
    1: ans({ model: 'endorsed', alasan: 'b' }),
    2: ans({ model: 'endorsed', alasan: 'a' }),
    3: ans({ model: 'sub_brand', alasan: 'b' }),
    4: ans({ model: 'zzz' }),
  });
  assert.equal(r.masuk, 4);
  assert.deepEqual(r.fields.model.counts, { branded_house: 0, sub_brand: 1, endorsed: 2, house_of_brands: 0, zzz: 1 });
  assert.equal(r.fields.alasan.total, 3);
});

test('multi: total = responden, bukan jumlah centang', () => {
  const s = SCREEN_BY_ID['h6-tebak'];
  const r = aggregateScreen(s, { 1: ans({ masih: ['siluet', 'palet'] }), 2: ans({ masih: [] }), 3: ans({ masih: ['siluet'] }) });
  assert.equal(r.fields.masih.total, 3);
  assert.equal(r.fields.masih.counts.siluet, 2);
});

test('grid: hitung per baris x kolom', () => {
  const s = SCREEN_BY_ID['h7-tebak2'];
  const r = aggregateScreen(s, {
    1: ans({ grid: { visual: 'needed', sonic: 'partly' } }),
    2: ans({ grid: { visual: 'needed', sonic: 'needed' } }),
  });
  assert.equal(r.fields.grid.rows.visual.needed, 2);
  assert.equal(r.fields.grid.rows.sonic.partly, 1);
  assert.equal(r.fields.grid.rows.sonic.needed, 1);
});

test('disembunyikan: keluar dari tampilan tapi tetap dihitung di penghitung masuk', () => {
  const s = SCREEN_BY_ID['h3-terapkan'];
  const r = aggregateScreen(s, {
    1: ans({ lemah: 'growth', alasan: 'ok' }),
    2: ans({ lemah: 'growth', alasan: 'kasar' }),
  }, { 2: true });
  assert.equal(r.masuk, 2);
  assert.equal(r.ditampilkan, 1);
  assert.equal(r.fields.lemah.counts.growth, 1);
  assert.equal(r.fields.alasan.items.length, 1);
});

test('Q1: normalisasi merek dan top 5', () => {
  assert.equal(normalizeBrand(' Nike! '), 'nike');
  assert.equal(normalizeBrand('Mc Donald\'s'), 'mcdonalds');
  const g = groupBrands([
    { brand: 'Nike', dari: 'bentuk' }, { brand: 'nike ', dari: 'bentuk' }, { brand: 'NIKE!', dari: 'huruf' },
    { brand: 'Gojek', dari: 'warna' }, { brand: 'gojek', dari: 'warna' },
    { brand: 'a' }, { brand: 'b' }, { brand: 'c' }, { brand: 'd' }, { brand: '' }, { brand: '!!!' },
  ]);
  assert.equal(g.top.length, 5);
  assert.equal(g.top[0].key, 'nike');
  assert.equal(g.top[0].n, 3);
  assert.equal(g.top[0].utama, 'bentuk');
  assert.equal(g.top[0].variants.length, 3);
  assert.equal(g.top[1].key, 'gojek');
  assert.equal(g.semua, 6); // nike, gojek, a, b, c, d
  assert.equal(g.lainnya.length, 1);
});

test('Q1 lewat aggregateScreen memberi brands', () => {
  const r = aggregateScreen(SCREEN_BY_ID.q1, { 1: ans({ brand: 'Gojek', dari: 'warna' }), 2: ans({ brand: 'gojek', dari: 'warna' }) });
  assert.equal(r.brands.top[0].n, 2);
});

// ---------- flags ----------
test('⚠ hlm 2: kombinasi tidak konsisten', () => {
  assert.equal(flagsFor('h2-terapkan', { kena: 'ya', model: 'house_of_brands' }).length, 1);
  assert.equal(flagsFor('h2-terapkan', { kena: 'tidak', model: 'branded_house' }).length, 1);
  assert.equal(flagsFor('h2-terapkan', { kena: 'ya', model: 'branded_house' }).length, 0);
  assert.equal(flagsFor('h2-terapkan', { kena: 'belum', model: 'house_of_brands' }).length, 0);
});

test('⚠ hlm 5B: selera tim', () => {
  assert.equal(flagsFor('h5b-terapkan', { jenis: 'selera' }).length, 1);
  assert.equal(flagsFor('h5b-terapkan', { jenis: 'klaim' }).length, 0);
});

test('⚠ hlm 6: pemilik kosong atau umum (trim, huruf kecil, tanda baca akhir)', () => {
  for (const p of [undefined, '', '  ', 'Tim', 'tim.', ' SEMUA! ', 'Semua orang']) {
    assert.equal(flagsFor('h6-terapkan', { pemilik: p }).length, 1, JSON.stringify(p));
  }
  assert.equal(flagsFor('h6-terapkan', { pemilik: 'Rina (ketua)' }).length, 0);
});

test('layar tanpa aturan ⚠ tidak pernah ⚠', () => {
  assert.deepEqual(flagsFor('h3-tebak', { kriteria: 'growth' }), []);
});

test('collectFlags melewati yang disembunyikan', () => {
  const s = SCREEN_BY_ID['h5b-terapkan'];
  const a = { 1: ans({ jenis: 'selera' }), 2: ans({ jenis: 'selera' }) };
  assert.equal(collectFlags(s, a).length, 2);
  assert.equal(collectFlags(s, a, { 1: true }).length, 1);
});

// ---------- penanda kunci ----------
test('penanda kunci: single dengan kunci tunggal dan kunci ganda', () => {
  const h2 = SCREEN_BY_ID['h2-tebak'].fields[0];
  assert.equal(markField(h2, 'endorsed').ok, true);
  assert.equal(markField(h2, 'sub_brand').ok, false);
  const h3 = SCREEN_BY_ID['h3-tebak'].fields[0];
  assert.equal(markField(h3, 'protectable').ok, true);
  assert.equal(markField(h3, 'distinctive').ok, true);
  assert.equal(markField(h3, 'growth').ok, false);
});

test('penanda kunci: multi harus himpunan yang sama persis (urutan bebas)', () => {
  const f = SCREEN_BY_ID['h8-terapkan'].fields[0];
  assert.equal(markField(f, ['b', 'a']).ok, true);
  assert.equal(markField(f, ['a', 'c']).ok, false);
  assert.equal(markField(f, ['a']).ok, false);
  assert.equal(markField(f, null).ok, false);
});

test('penanda kunci: grid menghitung baris benar', () => {
  const f = SCREEN_BY_ID['h7-tebak2'].fields[0];
  const m = markField(f, { visual: 'needed', verbal: 'needed', sonic: 'partly', motion: 'needed', spatial: 'needed', interactive: 'not_needed' });
  assert.equal(m.ok, true);
  const m2 = markField(f, { visual: 'needed', interactive: 'needed' });
  assert.equal(m2.ok, false);
  assert.equal(m2.right, 1);
  assert.equal(m2.total, 6);
});

test('bidang tanpa kunci -> null; markSummary menghitung', () => {
  assert.equal(markField(SCREEN_BY_ID['h2-terapkan'].fields[0], 'ya'), null);
  const s = SCREEN_BY_ID['h4-tebak'];
  const sum = markSummary(s, { 1: ans({ status: 'unknown' }), 2: ans({ status: 'clear' }), 3: ans({ status: 'unknown' }) }, { 3: true });
  assert.deepEqual(sum.status, { ok: 1, n: 2 });
});

// ---------- csv ----------
test('CSV: BOM, header, CRLF, pemisah titik koma', () => {
  const out = toCsv([{ nim: '2306123456', halaman: 2, bagian: 'x', pertanyaan: 'p', jawaban: 'j', waktu: 't', field_id: '' }]);
  assert.ok(out.startsWith(BOM));
  const lines = out.slice(1).split('\r\n');
  assert.equal(lines[0], COLUMNS.join(';'));
  assert.equal(lines[1], '2306123456;2;x;p;j;t;');
});

test('CSV: koma tidak perlu kutip; titik koma, kutip, dan baris baru dikutip', () => {
  assert.equal(cell('halo, dunia'), 'halo, dunia');
  assert.equal(cell('a;b'), '"a;b"');
  assert.equal(cell('dia bilang "oke"'), '"dia bilang ""oke"""');
  assert.equal(cell('baris1\nbaris2'), '"baris1\nbaris2"');
});

test('CSV: huruf Indonesia dan emoji tidak rusak', () => {
  const out = toCsv([{ nim: '1', halaman: 3, bagian: 'b', pertanyaan: 'q', jawaban: 'Kopi Çoklat é — 😀 “nyaman”', waktu: '', field_id: '' }]);
  assert.ok(out.includes('Kopi Çoklat é — 😀 “nyaman”'));
  assert.equal(Buffer.from(out, 'utf8').subarray(0, 3).toString('hex'), 'efbbbf');
});

test('CSV: penjaga formula', () => {
  assert.equal(guard('=1+1'), "'=1+1");
  assert.equal(guard('+62'), "'+62");
  assert.equal(guard('@a'), "'@a");
  assert.equal(guard('aman=1'), 'aman=1');
  assert.equal(guard(2), '2');
});

test('Catatanku: hanya layar objek catatanku, urut per halaman, label opsi bukan kode', () => {
  const mine = {
    'h5b-terapkan': ans({ larang: 'Batik', karena: 'klaim', jenis: 'klaim' }, Date.UTC(2026, 10, 6, 3, 0)),
    'h2-terapkan': ans({ kena: 'ya', model: 'endorsed', karena: 'risiko, tinggi' }, Date.UTC(2026, 10, 6, 2, 0)),
    'h7-tebak2': ans({ karena: 'x' }),
    q1: ans({ brand: 'Gojek' }),
  };
  const rows = catatankuRows('2306123456', mine, SCREENS);
  assert.deepEqual([...new Set(rows.map((r) => r.halaman))], [2, 5]);
  const model = rows.find((r) => r.pertanyaan === 'Model mana yang cocok?');
  assert.equal(model.jawaban, 'Endorsed');
  assert.equal(model.field_id, 's4.p2.model');
  assert.equal(rows.find((r) => r.pertanyaan === 'Karena…' && r.halaman === 2).field_id, '');
  assert.ok(!rows.some((r) => r.jawaban === 'Gojek' || r.pertanyaan.startsWith('Kerjakan')));
  for (const r of rows) assert.equal(r.nim, '2306123456');
});

test('answerText: multi dan grid terbaca manusia', () => {
  const m = SCREEN_BY_ID['h4-terapkan'].fields[0];
  assert.equal(answerText(m, ['djki', 'web']), 'DJKI | Google dan web');
  const g = SCREEN_BY_ID['h7-tebak2'].fields[0];
  assert.match(answerText(g, { visual: 'needed' }), /^Visual: Dibutuhkan \| Verbal: -/);
  assert.equal(answerText(m, null), '');
});
