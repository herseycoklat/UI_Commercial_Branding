// Agregator hasil per layar. Fungsi murni: tidak menyentuh DOM atau Firebase.
// Bentuk jawaban: answers = { [nim]: { values: { [fieldId]: nilai }, t: epochMs } }
// hidden  = { [nim]: true } -> jawaban yang disembunyikan dosen (dikeluarkan dari semua tampilan)
// PENTING: `ref` pada item teks adalah NIM dan HANYA untuk tombol Sembunyikan/Sorot.
// UI tidak boleh menampilkannya.

export function normalizeBrand(s) {
  return String(s ?? '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
}

const emptyCounts = (opts) => Object.fromEntries(opts.map((o) => [o.v, 0]));

export function tallySingle(field, list) {
  const counts = emptyCounts(field.options);
  let total = 0;
  for (const v of list) {
    if (v == null || v === '') continue;
    if (!(v in counts)) counts[v] = 0; // nilai di luar opsi tetap terlihat, tidak hilang diam-diam
    counts[v] += 1;
    total += 1;
  }
  return { type: 'single', counts, total };
}

export function tallyMulti(field, list) {
  const counts = emptyCounts(field.options);
  let total = 0;
  for (const arr of list) {
    if (!Array.isArray(arr)) continue;
    total += 1; // responden, bukan jumlah centang
    for (const v of new Set(arr)) {
      if (!(v in counts)) counts[v] = 0;
      counts[v] += 1;
    }
  }
  return { type: 'multi', counts, total };
}

export function tallyGrid(field, list) {
  const rows = {};
  for (const r of field.rows) rows[r.v] = emptyCounts(field.cols);
  let total = 0;
  for (const g of list) {
    if (!g || typeof g !== 'object') continue;
    total += 1;
    for (const r of field.rows) {
      const c = g[r.v];
      if (c == null) continue;
      if (!(c in rows[r.v])) rows[r.v][c] = 0;
      rows[r.v][c] += 1;
    }
  }
  return { type: 'grid', rows, total };
}

// Q1: kelompokkan merek yang ditulis berbeda-beda ("Nike", "nike ", "NIKE!") jadi satu.
export function groupBrands(entries, top = 5) {
  const groups = new Map();
  for (const e of entries) {
    const key = normalizeBrand(e.brand);
    if (!key) continue;
    let g = groups.get(key);
    if (!g) groups.set(key, (g = { key, n: 0, variants: new Map(), dari: {} }));
    g.n += 1;
    const raw = String(e.brand).trim();
    g.variants.set(raw, (g.variants.get(raw) || 0) + 1);
    if (e.dari) g.dari[e.dari] = (g.dari[e.dari] || 0) + 1;
  }
  const out = [...groups.values()].map((g) => {
    const variants = [...g.variants.entries()].sort((a, b) => b[1] - a[1]).map((x) => x[0]);
    const dariSorted = Object.entries(g.dari).sort((a, b) => b[1] - a[1]);
    return { key: g.key, label: variants[0], n: g.n, variants, utama: dariSorted[0]?.[0] ?? null, dari: g.dari };
  });
  out.sort((a, b) => b.n - a.n || a.label.localeCompare(b.label));
  return { top: out.slice(0, top), semua: out.length, lainnya: out.slice(top) };
}

export function aggregateScreen(screen, answers, hidden = {}) {
  const visible = Object.entries(answers || {}).filter(([nim]) => !hidden[nim]);
  const masuk = Object.keys(answers || {}).length; // termasuk yang disembunyikan (untuk penghitung)
  const res = { masuk, ditampilkan: visible.length, fields: {} };

  for (const f of screen.fields) {
    const vals = visible.map(([, a]) => a?.values?.[f.id]);
    if (f.type === 'single') res.fields[f.id] = tallySingle(f, vals);
    else if (f.type === 'multi') res.fields[f.id] = tallyMulti(f, vals);
    else if (f.type === 'grid') res.fields[f.id] = tallyGrid(f, vals);
    else if (f.type === 'text') {
      const items = visible
        .map(([nim, a]) => ({ ref: nim, text: String(a?.values?.[f.id] ?? '').trim(), t: a?.t ?? 0 }))
        .filter((x) => x.text);
      items.sort((a, b) => a.t - b.t);
      res.fields[f.id] = { type: 'text', items, total: items.length };
    }
  }

  if (screen.kind === 'wall') {
    res.brands = groupBrands(visible.map(([, a]) => ({ brand: a?.values?.brand, dari: a?.values?.dari })));
  }
  return res;
}
