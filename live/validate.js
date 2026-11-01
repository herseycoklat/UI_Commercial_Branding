// Validasi dan penyandian jawaban. Fungsi murni, dipakai UI mahasiswa dan diuji di Node.
// Penyandian: RTDB membuang array kosong dan objek kosong, sedangkan aturan keamanan mewajibkan `values`
// berisi minimal satu anak. Pilihan ganda kosong yang sah (hlm 6 "tidak satu pun") disimpan sebagai ['_none'].

export const NONE = '_none';

const isEmpty = (v) => v == null || v === '' || (Array.isArray(v) && v.length === 0) ||
  (typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0);

export function validateField(f, v) {
  if (f.type === 'text') {
    const t = String(v ?? '').trim();
    if (!t) return f.optional ? null : 'Isi dulu.';
    if (t.length > f.max) return `Maksimal ${f.max} karakter.`;
    return null;
  }
  if (f.type === 'single') {
    if (isEmpty(v)) return f.optional ? null : 'Pilih satu.';
    return f.options.some((o) => o.v === v) ? null : 'Pilihan tidak dikenal.';
  }
  if (f.type === 'multi') {
    const arr = Array.isArray(v) ? v : [];
    const min = f.min ?? 1;
    if (arr.length < min) return min === 1 ? 'Pilih minimal satu.' : `Pilih ${min === f.max ? 'tepat ' : 'minimal '}${min}.`;
    if (f.max && arr.length > f.max) return `Maksimal ${f.max}.`;
    if (arr.some((x) => !f.options.some((o) => o.v === x))) return 'Pilihan tidak dikenal.';
    if (f.exclusive && arr.includes(f.exclusive) && arr.length > 1) return `"${f.options.find((o) => o.v === f.exclusive)?.t}" tidak bisa dipilih bersama yang lain.`;
    return null;
  }
  if (f.type === 'grid') {
    if (f.optional && isEmpty(v)) return null;
    const missing = f.rows.filter((r) => !v?.[r.v]).length;
    if (missing) return `Masih ada ${missing} baris yang belum dijawab.`;
    if (f.rows.some((r) => !f.cols.some((c) => c.v === v[r.v]))) return 'Pilihan tidak dikenal.';
    return null;
  }
  return 'Jenis isian tidak dikenal.';
}

export function validateScreen(screen, values) {
  const errors = {};
  for (const f of screen.fields) {
    const e = validateField(f, values?.[f.id]);
    if (e) errors[f.id] = e;
  }
  return { ok: Object.keys(errors).length === 0, errors };
}

// Nilai dari formulir -> bentuk yang disimpan (tanpa isian kosong, multi kosong jadi ['_none']).
export function encode(screen, values) {
  const out = {};
  for (const f of screen.fields) {
    const v = values?.[f.id];
    if (f.type === 'text') {
      const t = String(v ?? '').trim();
      if (t) out[f.id] = t;
    } else if (f.type === 'single') {
      if (!isEmpty(v)) out[f.id] = v;
    } else if (f.type === 'multi') {
      const arr = Array.isArray(v) ? v : [];
      if (arr.length) out[f.id] = arr;
      else if ((f.min ?? 1) === 0) out[f.id] = [NONE];
    } else if (f.type === 'grid') {
      if (!isEmpty(v)) out[f.id] = Object.fromEntries(Object.entries(v).filter(([, c]) => c));
    }
  }
  return out;
}

// Bentuk tersimpan -> nilai untuk formulir/CSV (membuang penanda _none; array RTDB bisa berupa objek).
export function decode(screen, stored) {
  const out = {};
  for (const f of screen.fields) {
    let v = stored?.[f.id];
    if (v == null) continue;
    if (f.type === 'multi') {
      v = Array.isArray(v) ? v : typeof v === 'object' ? Object.values(v) : [];
      v = v.filter((x) => x !== NONE);
    }
    out[f.id] = v;
  }
  return out;
}
