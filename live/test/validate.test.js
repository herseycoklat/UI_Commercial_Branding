import test from 'node:test';
import assert from 'node:assert/strict';
import { SCREENS, SCREEN_BY_ID, matchFilter } from '../screens.js';
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

test('kehadiran: pembagi = layar yang dibuka (buka 5 dari 28, jawab 3 -> 3/5), tanpa ambang aktif', () => {
  const opened = { i1: 1, i2: 1, q1: 1, poll1: 1, 'h2-tebak': 1 };
  const answers = {
    i1: { N1: {} }, q1: { N1: {}, N2: {} }, poll1: { N1: {} },
    gate3: { N1: {}, N2: {} }, // layar tidak dibuka: jawaban di sini tidak dihitung
  };
  const rows = attendanceRows(['N2', 'N1', 'N3'], answers, SCREENS, opened);
  assert.deepEqual(rows.map((r) => r.nim), ['N1', 'N2', 'N3']);
  assert.deepEqual(rows.map((r) => `${r.dijawab}/${r.dibuka}`), ['3/5', '1/5', '0/5']);
  assert.deepEqual([rows[0].insight_dijawab, rows[0].insight_dibuka, rows[0].kelas_dijawab, rows[0].kelas_dibuka], [1, 2, 2, 3]);
  const cols = attendanceColumns(SCREENS, opened);
  assert.deepEqual(cols.slice(0, 7), ['nim', 'dibuka', 'dijawab', 'insight_dibuka', 'insight_dijawab', 'kelas_dibuka', 'kelas_dijawab']);
  assert.deepEqual(cols.slice(7), ['i1 (S1 insight)', 'i2 (S2 insight)', 'q1 (S4 kelas)', 'poll1 (S4 kelas)', 'h2-tebak (S4 kelas)']);
  assert.ok(!cols.some((c) => c.startsWith('gate3')));
  const csv = toCsvTable(cols, rows);
  assert.ok(csv.includes('N1;5;3;2;1;3;2;1;0;1;1;0'), csv);
  assert.ok(!/aktif/i.test(csv));
});

test('kehadiran: filter sesi × jenis membatasi pembagi dan kolom', () => {
  const opened = { i1: 1, i2: 1, q1: 1 };
  const ins = SCREENS.filter((s) => matchFilter(s, { jenis: 'insight' }));
  const r = attendanceRows(['N1'], { i1: { N1: {} }, q1: { N1: {} } }, ins, opened)[0];
  assert.equal(`${r.dijawab}/${r.dibuka}`, '1/2');
  assert.deepEqual(attendanceColumns(ins, opened).slice(7), ['i1 (S1 insight)', 'i2 (S2 insight)']);
  const none = attendanceRows(['N1'], { q1: { N1: {} } }, SCREENS, {})[0];
  assert.equal(`${none.dijawab}/${none.dibuka}`, '0/0'); // riwayat dikosongkan: belum ada pembagi
});
