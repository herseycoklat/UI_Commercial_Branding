import test from 'node:test';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { SCREENS, SCREEN_BY_ID, SESI_LIST, JENIS_LIST, matchFilter } from '../screens.js';
import { aggregateScreen, groupBrands, normalizeBrand } from '../aggregate.js';
import { flagsFor, collectFlags, markField, markSummary } from '../flags.js';
import { toCsv, cell, guard, catatankuRows, answerText, BOM, COLUMNS, resultRows, resultFileName, toCsvTable, RESULT_COLUMNS } from '../csv.js';
import { kenapaItems } from '../results.js';

// ---------- screens ----------
test('56 layar: I1–I3, 25 layar Sesi 4 bernomor 1..25, L1–L13 Sesi 5, L1–L4 Sesi 6, 11 layar Sesi 7, id unik', () => {
  assert.equal(SCREENS.length, 56);
  assert.equal(new Set(SCREENS.map((s) => s.id)).size, 56);
  assert.deepEqual(SCREENS.slice(0, 4).map((s) => s.id), ['i1', 'i2', 'i3', 'q1']);
  SCREENS.slice(3, 28).forEach((s, i) => assert.equal(s.no, i + 1));
  assert.deepEqual(SCREENS.slice(28, 41).map((s) => s.no), Array.from({ length: 13 }, (_, i) => `L${i + 1}`));
  assert.deepEqual(SCREENS.slice(41, 45).map((s) => s.id), ['s6-l1', 's6-l2', 's6-l3', 's6-l4']);
  assert.deepEqual(SCREENS.slice(45).map((s) => s.id), ['s7-l1', 's7-l2', 's7-l3', 's7-l4', 's7-l5', 's7-l6', 's7-uk1', 's7-uk2', 's7-uk3', 's7-uk4', 's7-uk5']);
});

test('label sesi × jenis: I1=S1, I2=S2, I3=S3 insight; 25 layar S4 kelas; 13 layar S5 kelas; 4 layar S6 kelas', () => {
  assert.deepEqual(SCREENS.slice(0, 3).map((s) => `${s.sesi}/${s.jenis}`), ['S1/insight', 'S2/insight', 'S3/insight']);
  for (const s of SCREENS.slice(3, 28)) assert.equal(`${s.sesi}/${s.jenis}`, 'S4/kelas', s.id);
  for (const s of SCREENS.slice(28, 41)) assert.equal(`${s.sesi}/${s.jenis}`, 'S5/kelas', s.id);
  for (const s of SCREENS.slice(41, 45)) assert.equal(`${s.sesi}/${s.jenis}`, 'S6/kelas', s.id);
  for (const s of SCREENS.slice(45)) assert.equal(`${s.sesi}/${s.jenis}`, 'S7/kelas', s.id);
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

test('L1–L13 (Lampiran C S5): slide, tipe, jumlah opsi, waktu, kunci, konteks; tanpa Catatanku', () => {
  const L = SCREENS.filter((s) => s.sesi === 'S5');
  const tabel = [ // [slide, waktu, kunci]
    [2, 45, ['a', 'b', 'c', 'd']], [4, 20, 'b'], [5, 20, 'c'], [6, 20, 'c'], [8, 20, 'd'], [9, 20, 'c'], [10, 20, 'b'],
    [12, 20, 'b'], [13, 20, 'c'], [14, 20, 'c'], [16, 30, 'c'], [32, 20, 'c'], [42, 20, 'b']];
  L.forEach((s, i) => {
    const [slide, waktu, key] = tabel[i];
    assert.equal(s.slide, slide, s.id); assert.equal(s.waktu, waktu, s.id); assert.deepEqual(s.fields[0].key, key, s.id);
    assert.equal(s.fields.length, 1, s.id); assert.equal(s.catatanku, undefined, s.id); assert.equal(s.pengingat, undefined, s.id);
    assert.equal(s.fields[0].type, i === 0 ? 'multi' : 'single', s.id);
    assert.equal(s.fields[0].options.length, i === 0 ? 8 : 4, s.id);
  });
  // huruf di opsi = huruf di slide dan skrip (V3 merujuk E–H)
  assert.deepEqual(L[0].fields[0].options.map((o) => o.t[0]).join(''), 'ABCDEFGH');
  assert.equal(L[1].fields[0].options[1].t, 'B. Customers paid with their time, not their money');
  // L1: acak tetap, berisi semua opsi tepat sekali, empat yang dilaporkan tidak berkumpul di atas; tanda kunci terpisah
  const u = L[0].fields[0].urutan;
  assert.deepEqual([...u].sort(), L[0].fields[0].options.map((o) => o.v));
  assert.notDeepEqual(u.slice(0, 4).sort(), ['a', 'b', 'c', 'd']);
  assert.equal(L[0].kunciTerpisah, true);
  assert.equal(markField(L[0].fields[0], ['d', 'c', 'b', 'a']).ok, true);
  assert.equal(markField(L[0].fields[0], ['a', 'b', 'c', 'd', 'g']).ok, false);
  // konteks hanya di L4, L5, L12, L13
  assert.deepEqual(L.filter((s) => s.konteks).map((s) => s.no), ['L4', 'L5', 'L12', 'L13']);
  assert.deepEqual(SCREEN_BY_ID.l4.konteks, ['They want somewhere cool to sit with friends,', 'BUT a café costs too much,', 'SO they need a cheap place to stay for hours.']);
  assert.equal(SCREEN_BY_ID.l13.fields[0].label, 'Who did the court say owns the name?');
  assert.equal(collectFlags(SCREEN_BY_ID.l2, { 1: { values: { jawab: 'a' } } }).length, 0); // tanpa ⚠
});

// ---------- Sesi 6: L1–L4 harus sama dengan kutipan skrip (test/fixtures/s6-skrip-v1.md) ----------
const strip = (t) => t.replace(/\*\*/g, '').replace(/\*/g, '').trim();
function parseSkripS6() {
  const md = readFileSync(new URL('./fixtures/s6-skrip-v1.md', import.meta.url), 'utf8');
  const blok = md.split(/^## /m).slice(1);
  return blok.map((b) => {
    const tanya = b.match(/\*"(.+?)"\*/s)[1];
    const opsi = [...b.matchAll(/^- ([A-D])\. (.+?)(?: \*\((\w+)\)\*)?$/gm)].map((m) => ({ huruf: m[1], teks: m[2], dosen: m[3] }));
    const kunci = (b.match(/^Kunci:? \*\*([A-D])\*\*/m) || [])[1];
    const konteksM = b.match(/^Konteks:\n> (.+)$/m);
    const konteks = konteksM ? strip(konteksM[1]).split(/(?<=\.) /) : null;
    return { tanya, opsi, kunci, konteks };
  });
}

test('S6 L1–L4: pertanyaan, opsi A–D, kunci, dan konteks L1 sama persis dengan skrip', () => {
  const skrip = parseSkripS6();
  assert.equal(skrip.length, 4);
  const layar = SCREENS.filter((s) => s.sesi === 'S6');
  layar.forEach((s, i) => {
    const k = skrip[i]; const f = s.fields[0];
    assert.equal(f.label, k.tanya, s.id);
    assert.equal(f.options.length, 4, s.id);
    f.options.forEach((op, j) => {
      assert.equal(op.t, `${k.opsi[j].huruf}. ${k.opsi[j].teks}`, `${s.id} opsi ${j}`);
      assert.equal(op.v, k.opsi[j].huruf.toLowerCase(), `${s.id} nilai ${j}`);
    });
    assert.equal(f.key, k.kunci ? k.kunci.toLowerCase() : undefined, `${s.id} kunci`);
  });
  assert.deepEqual(SCREEN_BY_ID['s6-l1'].konteks, skrip[0].konteks);
});

test('S6: slide, waktu, tipe; L1–L3 kunciTerpisah dan tombol "Tandai kunci"; L4 tanpa kunci; tanpa kata Gate', () => {
  const L = SCREENS.filter((s) => s.sesi === 'S6');
  assert.deepEqual(L.map((s) => s.slide), [3, 4, 5, 12]);
  assert.deepEqual(L.map((s) => s.no), ['L1', 'L2', 'L3', 'L4']);
  for (const s of L) {
    assert.equal(s.waktu, 30, s.id); assert.equal(s.mode, 'tebak', s.id);
    assert.equal(s.fields.length, 1, s.id); assert.equal(s.fields[0].type, 'single', s.id);
    assert.equal(s.catatanku, undefined, s.id); assert.equal(s.pengingat, undefined, s.id);
    assert.ok(!/gate/i.test(JSON.stringify(s)), `${s.id} memuat kata Gate`);
  }
  for (const s of L.slice(0, 3)) { assert.equal(s.kunciTerpisah, true, s.id); assert.equal(s.labelKunci, 'Tandai kunci', s.id); }
  assert.equal(L[3].kunciTerpisah, undefined); assert.equal(L[3].fields[0].key, undefined);
  assert.deepEqual(L.slice(0, 3).map((s) => s.fields[0].key), ['d', 'b', 'd']);
  assert.deepEqual(L.filter((s) => s.konteks).map((s) => s.no), ['L1', 'L4']);
  assert.equal(L[0].konteks.length, 4);
  // L4: kartu Jumbo teks pendek berisi enam baris, "Yang kami minta" terakhir
  assert.equal(L[3].konteks.length, 6);
  assert.ok(L[3].konteks[2].startsWith('Pesan utama: "The film you want your kids to watch'));
  assert.ok(L[3].konteks[5].startsWith('Yang kami minta:'));
  // label SAY/DO/PAY/Ditolak hanya di L4, hanya sebagai properti `dosen` (bukan di teks opsi yang tampil di HP)
  assert.deepEqual(L[3].fields[0].options.map((o) => o.dosen), ['SAY', 'DO', 'PAY', 'DITOLAK']);
  for (const op of L[3].fields[0].options) assert.ok(!/SAY|\bDO\b|PAY|DITOLAK/.test(op.t + (op.d || '')), op.v);
  for (const s of L.slice(0, 3)) for (const op of s.fields[0].options) assert.equal(op.dosen, undefined);
  // L4 tanpa kunci: tidak ada tanda sesuai/tidak sesuai
  assert.equal(markSummary(L[3], { 1: { values: { jawab: 'a' } } }, {})?.jawab, undefined);
  assert.equal(collectFlags(L[3], { 1: { values: { jawab: 'a' } } }).length, 0);
  // kunci L1–L3 dihitung seperti biasa
  assert.equal(markField(L[0].fields[0], 'd').ok, true);
  assert.equal(markField(L[1].fields[0], 'a').ok, false);
});

// ---------- Sesi 7: L1–L6 + Uji kartu #1–#5 harus sama dengan sumber (test/fixtures/s7-kelas-live.md) ----------
function parseS7() {
  const md = readFileSync(new URL('./fixtures/s7-kelas-live.md', import.meta.url), 'utf8');
  const rows = [...md.matchAll(/^\| (L\d) \| [^|]+ \| ([^|]+) \| ([^|]+) \| ([^|]+) \| (\d+) dtk \|$/gm)].map((m) => ({
    no: m[1], tanya: m[2].trim(), opsi: m[3].includes('template Uji kartu') ? null : m[3].trim().split(' · '),
    kunci: m[4].trim() === '—' ? null : m[4].trim()[0], waktu: Number(m[5]) }));
  const uji = md.split('## Template Uji kartu')[1];
  return { rows, ujiTanya: uji.match(/^Teks HP: (.+)$/m)[1],
    ujiOpsi: [...uji.matchAll(/^- (\S+) · (.+)$/gm)].map((m) => [m[1], m[2]]), kenapa: uji.match(/^Kotak teks opsional: (.+)$/m)[1] };
}

test('S7 L1–L6: pertanyaan, opsi A–D, kunci, waktu sama persis dengan doc 92 bagian C; L3/L6 = template Uji kartu', () => {
  const src = parseS7();
  assert.equal(src.rows.length, 6);
  for (const k of src.rows) {
    const s = SCREEN_BY_ID[`s7-${k.no.toLowerCase()}`];
    assert.equal(s.no, k.no); assert.equal(s.waktu, k.waktu, s.id);
    assert.equal(s.fields[0].label, k.tanya, s.id);
    if (k.opsi) {
      assert.deepEqual(s.fields[0].options.map((o) => o.t), k.opsi, s.id);
      assert.equal(s.fields[0].key, k.kunci.toLowerCase(), s.id);
    } else {
      assert.equal(s.ujiKartu, true, s.id); assert.equal(s.fields[0].key, undefined, s.id);
    }
  }
});

test('S7 template Uji kartu: L3, L6, Uji kartu #1–#5 identik (pilihan, kotak Kenapa?), tanpa kunci, 30 dtk', () => {
  const src = parseS7();
  const U = ['s7-l3', 's7-l6', 's7-uk1', 's7-uk2', 's7-uk3', 's7-uk4', 's7-uk5'].map((id) => SCREEN_BY_ID[id]);
  for (const s of U) {
    assert.equal(s.waktu, 30, s.id); assert.equal(s.kunciTerpisah, undefined, s.id); assert.equal(s.catatanku, undefined, s.id);
    assert.equal(s.fields.length, 2, s.id);
    const [p, k] = s.fields;
    assert.equal(p.type, 'single'); assert.equal(p.key, undefined); assert.equal(p.urutan, undefined, `${s.id}: urutan tangga tetap`);
    assert.deepEqual(p.options.map((o) => [o.t, o.d]), src.ujiOpsi, s.id);
    assert.equal(k.type, 'text'); assert.equal(k.label, src.kenapa); assert.equal(k.optional, true); assert.ok(k.max <= 300);
    assert.deepEqual([p.options, k], [U[0].fields[0].options, U[0].fields[1]], `${s.id}: pilihan dan kotak sama dengan L3`);
  }
  for (let n = 1; n <= 5; n++) {
    const s = SCREEN_BY_ID[`s7-uk${n}`];
    assert.equal(s.judul, `Uji kartu #${n}`); assert.equal(s.segmen, `Uji kartu #${n}`); assert.equal(s.fields[0].label, src.ujiTanya);
  }
  assert.equal(SCREEN_BY_ID['s7-l3'].segmen, 'Contoh · Old Spice');
  assert.equal(SCREEN_BY_ID['s7-l6'].segmen, 'Contoh · Peloton');
  // tanpa konteks: isi kartu tidak pernah tampil di HP
  for (const s of SCREENS.filter((x) => x.sesi === 'S7')) assert.equal(s.konteks, undefined, s.id);
});

test('S7: slide 3/4/5, acak tetap L1/L2/L4/L5 (semua opsi, kunci tidak di posisi yang sama dengan slide), kunciTerpisah, tanpa Gate', () => {
  const L = SCREENS.filter((s) => s.sesi === 'S7');
  assert.deepEqual(L.map((s) => s.slide), [3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 5]);
  for (const id of ['s7-l1', 's7-l2', 's7-l4', 's7-l5']) {
    const s = SCREEN_BY_ID[id]; const f = s.fields[0];
    assert.equal(s.kunciTerpisah, true, id); assert.equal(s.labelKunci, 'Tandai kunci', id); assert.equal(s.waktu, 20, id);
    assert.deepEqual([...f.urutan].sort(), ['a', 'b', 'c', 'd'], id);
    assert.notDeepEqual(f.urutan, ['a', 'b', 'c', 'd'], id);
    assert.notEqual(f.urutan.indexOf(f.key), 'abcd'.indexOf(f.key), `${id}: kunci pindah posisi`);
    assert.notEqual(f.urutan[0], f.key, `${id}: kunci tidak di paling atas`);
  }
  assert.deepEqual(['s7-l1', 's7-l2', 's7-l4', 's7-l5'].map((id) => SCREEN_BY_ID[id].fields[0].key), ['b', 'd', 'b', 'c']);
  for (const s of L) assert.ok(!/gate/i.test(JSON.stringify(s)), s.id);
  assert.equal(markField(SCREEN_BY_ID['s7-l2'].fields[0], 'd').ok, true);
  assert.equal(markSummary(SCREEN_BY_ID['s7-uk1'], { 1: { values: { pilih: 'say' } } }).pilih, undefined);
});

test('S7 hasil: Kenapa? berlabel pilihan, Tidak dan SAY dulu; unduhan CSV persentase + teks, tanpa NIM dan tanpa yang disembunyikan', () => {
  const sc = SCREEN_BY_ID['s7-uk2'];
  const answers = { 2306000001: ans({ pilih: 'pay', kenapa: 'Saya pesan sekarang' }, 1), 2306000002: ans({ pilih: 'tidak', kenapa: 'Terlalu mahal' }, 3),
    2306000003: ans({ pilih: 'say', kenapa: 'Menarik saja' }, 2), 2306000004: ans({ pilih: 'do' }, 4), 2306000005: ans({ pilih: 'tidak', kenapa: '=HYPERLINK("x")' }, 5) };
  const hidden = { 2306000005: true };
  const agg = aggregateScreen(sc, answers, hidden);
  const items = kenapaItems(sc, sc.fields[1], agg.fields.kenapa.items, answers);
  assert.deepEqual(items.map((i) => `${i.pilih}:${i.text}`), ['Tidak:Terlalu mahal', 'SAY:Menarik saja', 'PAY:Saya pesan sekarang']);
  const csv = toCsvTable(RESULT_COLUMNS, resultRows(sc, agg, answers, hidden));
  const lines = csv.slice(1).split('\r\n');
  assert.equal(lines[0], 'bagian;pilihan;jumlah;persen;teks');
  assert.ok(lines.includes('Jawaban masuk;;4;;'));
  assert.ok(lines.includes('Persentase;SAY;1;25%;Saya bilang tertarik, tapi belum melakukan apa-apa'));
  assert.ok(lines.includes('Persentase;Tidak;1;25%;Saya tidak tertarik'));
  assert.deepEqual(lines.filter((l) => l.startsWith('Kenapa?')), ['Kenapa?;Tidak;;;Terlalu mahal', 'Kenapa?;SAY;;;Menarik saja', 'Kenapa?;PAY;;;Saya pesan sekarang']);
  assert.ok(!/23060000/.test(csv), 'tanpa NIM');
  assert.ok(!/HYPERLINK/.test(csv), 'yang disembunyikan tidak ikut');
  assert.equal(resultFileName(sc), 'hasil-s7-uk2-uji-kartu-2.csv');
  // layar lain tidak terpengaruh: teks tanpa label pilihan
  const q = SCREEN_BY_ID.l1; assert.equal(kenapaItems(q, q.fields[0], [{ ref: 1, text: 'x', t: 1 }], {})[0].pilih, undefined);
});

test('filter sesi × jenis', () => {
  assert.equal(SCREENS.filter((s) => matchFilter(s, {})).length, 56);
  assert.equal(SCREENS.filter((s) => matchFilter(s, { sesi: 'S7' })).length, 11);
  assert.equal(SCREENS.filter((s) => matchFilter(s, { sesi: 'S6' })).length, 4);
  assert.equal(SCREENS.filter((s) => matchFilter(s, { sesi: 'S6', jenis: 'insight' })).length, 0);
  assert.equal(SCREENS.filter((s) => matchFilter(s, { sesi: 'S5' })).length, 13);
  assert.equal(SCREENS.filter((s) => matchFilter(s, { sesi: 'S5', jenis: 'insight' })).length, 0);
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
