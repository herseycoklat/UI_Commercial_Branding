// Catatanku -> CSV. Dibangun di browser mahasiswa. Fungsi murni.
// UTF-8 dengan BOM; pemisah ';' (Excel locale Indonesia). Kutip RFC 4180.
// Kolom: nim, halaman, bagian, pertanyaan, jawaban, waktu, field_id (field_id kosong kecuali 1:1 dengan ID di spec-38; SEMENTARA sampai --lock).

export const COLUMNS = ['nim', 'halaman', 'bagian', 'pertanyaan', 'jawaban', 'waktu', 'field_id'];
export const SEP = ';';
export const BOM = '﻿';

// Cegah formula injection di Excel/Sheets: sel diawali = + @ tab atau CR diberi apostrof di depan.
export function guard(s) {
  const t = String(s ?? '');
  return /^[=+@\t\r]/.test(t) ? `'${t}` : t;
}

export function cell(s, sep = SEP) {
  const t = guard(s);
  return new RegExp(`["\\r\\n${sep}]`).test(t) ? `"${t.replace(/"/g, '""')}"` : t;
}

export function toCsvTable(columns, rows, { sep = SEP, bom = true } = {}) {
  const lines = [columns.join(sep)];
  for (const r of rows) lines.push(columns.map((c) => cell(r[c], sep)).join(sep));
  return (bom ? BOM : '') + lines.join('\r\n') + '\r\n';
}

export const toCsv = (rows, opts) => toCsvTable(COLUMNS, rows, opts);

// Laporan kehadiran per NIM (doc 63): pembagi = layar yang benar-benar DIBUKA dosen, tanpa ambang "aktif".
// screens: daftar layar (sudah difilter sesi × jenis); opened: { [screenId]: waktu } dari dosenState/opened.
// Layar yang tidak pernah dibuka tidak memengaruhi apa pun, termasuk jawaban lama di layar itu.
export function attendanceRows(roster, answersByScreen, screens, opened = {}) {
  const used = screens.filter((s) => opened?.[s.id]);
  return [...roster].sort().map((nim) => {
    const r = { nim, dibuka: used.length, dijawab: 0, insight_dibuka: 0, insight_dijawab: 0, kelas_dibuka: 0, kelas_dijawab: 0 };
    for (const s of used) {
      const ok = answersByScreen?.[s.id]?.[nim] ? 1 : 0;
      r[colName(s)] = ok;
      r.dijawab += ok;
      r[`${s.jenis}_dibuka`] += 1;
      r[`${s.jenis}_dijawab`] += ok;
    }
    return r;
  });
}
export const colName = (s) => `${s.id} (${s.sesi} ${s.jenis})`;
export const attendanceColumns = (screens, opened = {}) =>
  ['nim', 'dibuka', 'dijawab', 'insight_dibuka', 'insight_dijawab', 'kelas_dibuka', 'kelas_dijawab',
    ...screens.filter((s) => opened?.[s.id]).map(colName)];

const optText = (f, v) => f.options?.find((o) => o.v === v)?.t ?? String(v);

export function answerText(field, value) {
  if (value == null || value === '') return '';
  if (field.type === 'single') return optText(field, value);
  if (field.type === 'multi') return (Array.isArray(value) ? value : []).map((v) => optText(field, v)).join(' | ');
  if (field.type === 'grid')
    return field.rows.map((r) => `${r.t}: ${value?.[r.v] ? optText({ options: field.cols }, value[r.v]) : '-'}`).join(' | ');
  return String(value);
}

const pad = (n) => String(n).padStart(2, '0');
export function formatWaktu(ms) {
  const d = new Date(ms);
  // waktu lokal perangkat mahasiswa (WIB di Jakarta)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// Baris Catatanku: hanya layar ber-`catatanku` objek; urut per halaman workbook lalu urutan layar.
// mine = { [screenId]: { values, t } } (jawaban pribadi yang tersimpan di browser)
export function catatankuRows(nim, mine, screens) {
  const rows = [];
  for (const s of screens) {
    if (!s.catatanku || typeof s.catatanku !== 'object') continue;
    const a = mine?.[s.id];
    if (!a) continue;
    for (const f of s.fields) {
      const txt = answerText(f, a.values?.[f.id]);
      if (txt === '') continue;
      rows.push({
        nim, halaman: s.catatanku.halaman, bagian: s.catatanku.bagian,
        pertanyaan: f.label, jawaban: txt, waktu: formatWaktu(a.t),
        field_id: f.fieldId ? f.fieldId.split('→').pop() : '',
        _o: s.no,
      });
    }
  }
  rows.sort((x, y) => x.halaman - y.halaman || x._o - y._o);
  return rows.map(({ _o, ...r }) => r);
}

export const csvFileName = (nim) => `catatanku-${String(nim).replace(/[^0-9A-Za-z]/g, '')}.csv`;
