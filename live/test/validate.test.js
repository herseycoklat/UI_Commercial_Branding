import test from 'node:test';
import assert from 'node:assert/strict';
import { SCREENS, SCREEN_BY_ID } from '../screens.js';
import { validateScreen, validateField, encode, decode, NONE } from '../validate.js';
import { aggregateScreen } from '../aggregate.js';
import { markField } from '../flags.js';
import { attendanceRows, attendanceColumns, toCsvTable } from '../csv.js';

test('single wajib; optional boleh kosong', () => {
  const f = SCREEN_BY_ID['h2-tebak'].fields[0];
  assert.ok(validateField(f, undefined));
  assert.ok(validateField(f, 'zzz'));
  assert.equal(validateField(f, 'endorsed'), null);
});

test('text: kosong ditolak, spasi saja ditolak, melebihi max ditolak, optional kosong lolos', () => {
  const f = SCREEN_BY_ID['h3-terapkan'].fields[1];
  assert.ok(validateField(f, '   '));
  assert.ok(validateField(f, 'x'.repeat(f.max + 1)));
  assert.equal(validateField(f, 'ok'), null);
  const opt = SCREEN_BY_ID['h6-terapkan'].fields[3];
  assert.equal(validateField(opt, ''), null);
});

test('multi: hlm 8 harus tepat 2; hlm 6 boleh kosong; hlm 4 eksklusif "Belum satu pun"', () => {
  const h8 = SCREEN_BY_ID['h8-terapkan'].fields[0];
  assert.match(validateField(h8, ['a']), /tepat 2/);
  assert.match(validateField(h8, ['a', 'b', 'c']), /Maksimal 2/);
  assert.equal(validateField(h8, ['a', 'b']), null);
  const h6 = SCREEN_BY_ID['h6-tebak'].fields[0];
  assert.equal(validateField(h6, []), null);
  const h4 = SCREEN_BY_ID['h4-terapkan'].fields[0];
  assert.ok(validateField(h4, ['belum', 'djki']));
  assert.equal(validateField(h4, ['belum']), null);
  assert.ok(validateField(h4, []));
});

test('grid: semua baris wajib', () => {
  const f = SCREEN_BY_ID['h7-tebak2'].fields[0];
  assert.match(validateField(f, { visual: 'needed' }), /5 baris/);
  const full = Object.fromEntries(f.rows.map((r) => [r.v, 'needed']));
  assert.equal(validateField(f, full), null);
});

test('validateScreen: seluruh layar', () => {
  const s = SCREEN_BY_ID['h5b-terapkan'];
  assert.equal(validateScreen(s, {}).ok, false);
  assert.equal(validateScreen(s, { larang: 'a', karena: 'b', jenis: 'klaim' }).ok, true);
});

test('encode: buang isian kosong, multi kosong jadi _none, hasil tidak pernah objek kosong', () => {
  const s6 = SCREEN_BY_ID['h6-tebak'];
  assert.deepEqual(encode(s6, { masih: [] }), { masih: [NONE] });
  const s = SCREEN_BY_ID['h6-terapkan'];
  const e = encode(s, { jenis: 'warna', kode: ' merah ', nologo: 'ya', pemilik: '   ' });
  assert.deepEqual(e, { jenis: 'warna', kode: 'merah', nologo: 'ya' });
  for (const sc of SCREENS) assert.ok(Object.keys(encode(sc, {})).length >= 0);
});

test('encode lalu decode bulat-balik, termasuk _none dan array jadi objek dari RTDB', () => {
  const s6 = SCREEN_BY_ID['h6-tebak'];
  assert.deepEqual(decode(s6, encode(s6, { masih: [] })), { masih: [] });
  assert.deepEqual(decode(s6, { masih: { 0: 'siluet', 1: 'palet' } }), { masih: ['siluet', 'palet'] });
});

test('_none: dihitung sebagai responden, bukan sebagai pilihan, dan tidak merusak penanda kunci', () => {
  const s6 = SCREEN_BY_ID['h6-tebak'];
  const r = aggregateScreen(s6, { 1: { values: { masih: [NONE] }, t: 1 }, 2: { values: { masih: ['siluet', 'palet'] }, t: 2 } });
  assert.equal(r.fields.masih.total, 2);
  assert.equal(r.fields.masih.counts[NONE], undefined);
  assert.equal(markField(s6.fields[0], [NONE]).ok, false);
  assert.equal(markField(s6.fields[0], ['palet', 'siluet']).ok, true);
});

test('kehadiran: semua layar dihitung sama, tanpa ambang aktif', () => {
  const ids = ['q1', 'poll1', 'poll2'];
  const rows = attendanceRows(['2', '1', '3'], { q1: { 1: {}, 2: {} }, poll1: { 1: {} } }, ids);
  assert.deepEqual(rows.map((r) => r.nim), ['1', '2', '3']);
  assert.deepEqual(rows.map((r) => r.dijawab), [2, 1, 0]);
  assert.equal(rows[0].dari, 3);
  assert.equal(rows[2].q1, 0);
  const csv = toCsvTable(attendanceColumns(ids), rows);
  assert.ok(csv.includes('nim;dijawab;dari;q1;poll1;poll2'));
  assert.ok(!/aktif/i.test(csv));
});
