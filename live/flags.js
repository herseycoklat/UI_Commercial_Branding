// Dua jenis aturan yang SENGAJA dipisah:
//  1. ⚠ (flagsFor)  : kombinasi jawaban yang tidak konsisten satu sama lain. Dosen diberi tanda untuk dibahas.
//  2. Penanda kunci (markField): cocok atau tidak dengan kunci jawaban di skrip. Ini "ditandai", bukan ⚠.
// Fungsi murni.

const norm = (s) => String(s ?? '').trim().toLowerCase().replace(/[.!?,;:\s]+$/g, '');

// ---------- ⚠ ----------
const FLAGS = {
  'h2-terapkan': (v) => {
    if (v.kena === 'ya' && v.model === 'house_of_brands')
      return ['Produk ikut kena, tapi model house of brands (parent tidak tampil).'];
    if (v.kena === 'tidak' && v.model === 'branded_house')
      return ['Produk tidak ikut kena, tapi model branded house (satu nama untuk semua).'];
    return [];
  },
  'h5b-terapkan': (v) => (v.jenis === 'selera' ? ['Larangan ini diakui sebagai selera tim.'] : []),
  'h6-terapkan': (v) => {
    const p = norm(v.pemilik);
    if (p === '' || p === 'tim' || p === 'semua' || p === 'semua orang' || p === 'kami')
      return ['Pemilik perubahan kosong atau terlalu umum.'];
    return [];
  },
};

export function flagsFor(screenId, values) {
  const fn = FLAGS[screenId];
  return fn ? fn(values || {}) : [];
}

export function collectFlags(screen, answers, hidden = {}) {
  const out = [];
  for (const [nim, a] of Object.entries(answers || {})) {
    if (hidden[nim]) continue;
    const msgs = flagsFor(screen.id, a?.values);
    if (msgs.length) out.push({ ref: nim, msgs });
  }
  return out;
}

// ---------- Penanda kunci ----------
const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));

export function markField(field, value) {
  if (field.key == null) return null;
  if (field.type === 'single') {
    const ok = Array.isArray(field.key) ? field.key.includes(value) : value === field.key;
    return { ok };
  }
  if (field.type === 'multi') {
    if (!Array.isArray(value)) return { ok: false };
    return { ok: sameSet([...new Set(value)].filter((x) => x !== '_none'), field.key) };
  }
  if (field.type === 'grid') {
    const rows = Object.keys(field.key);
    const right = rows.filter((r) => value?.[r] === field.key[r]).length;
    return { ok: right === rows.length, right, total: rows.length };
  }
  return null;
}

// Persentase penanda "cocok kunci" per bidang, untuk ditampilkan dosen setelah Tampilkan hasil.
export function markSummary(screen, answers, hidden = {}) {
  const out = {};
  for (const f of screen.fields) {
    if (f.key == null) continue;
    let ok = 0, n = 0;
    for (const [nim, a] of Object.entries(answers || {})) {
      if (hidden[nim]) continue;
      const m = markField(f, a?.values?.[f.id]);
      if (!m) continue;
      n += 1;
      if (m.ok) ok += 1;
    }
    out[f.id] = { ok, n };
  }
  return out;
}
