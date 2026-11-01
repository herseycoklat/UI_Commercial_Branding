// Tampilan hasil untuk layar dosen. Semua anonim: NIM (`ref`) hanya dipakai sebagai kunci tombol, tidak pernah ditampilkan.
import { h } from './dom.js';
import { answerText } from './csv.js';
import { decode } from './validate.js';

const keyList = (f) => (f.key == null ? [] : Array.isArray(f.key) ? f.key : typeof f.key === 'object' ? [] : [f.key]);

function bars(f, tally, showKey) {
  const known = f.options.map((o) => [o.v, o.t]);
  const extra = Object.keys(tally.counts).filter((k) => !f.options.some((o) => o.v === k)).map((k) => [k, `(${k})`]);
  const max = Math.max(1, ...Object.values(tally.counts));
  const keys = showKey ? keyList(f) : [];
  return h('div', { class: 'bars' }, [...known, ...extra].map(([v, t]) => {
    const n = tally.counts[v] || 0;
    const pct = tally.total ? Math.round((n / tally.total) * 100) : 0;
    const isKey = keys.includes(v);
    return h('div', { class: 'bar' + (isKey ? ' key' : '') },
      h('div', { class: 'bl' }, t, isKey ? ' ✓' : ''),
      h('div', { class: 'bt' }, h('div', { class: 'bf', style: `width:${(n / max) * 100}%` })),
      h('div', { class: 'bn' }, `${n} (${pct}%)`));
  }));
}

function gridTable(f, tally, showKey) {
  const maxCell = Math.max(1, ...Object.values(tally.rows).flatMap((r) => Object.values(r)));
  return h('table', { class: 'gtab' },
    h('thead', {}, h('tr', {}, h('th', {}, ''), f.cols.map((c) => h('th', {}, c.t)))),
    h('tbody', {}, f.rows.map((r) => h('tr', {}, h('th', {}, r.t),
      f.cols.map((c) => {
        const n = tally.rows[r.v]?.[c.v] || 0;
        const isKey = showKey && f.key?.[r.v] === c.v;
        return h('td', { class: isKey ? 'key' : '', style: `--p:${n / maxCell}` }, `${n}`, isKey ? ' ✓' : '');
      })))));
}

export function answerSummary(screen, values) {
  const v = decode(screen, values);
  return screen.fields.map((f) => answerText(f, v[f.id])).filter(Boolean).join(' · ');
}

function textCards(items, ctx) {
  if (!items.length) return h('p', { class: 'muted' }, 'Belum ada jawaban teks.');
  return h('div', { class: 'cards' }, items.map((it) =>
    h('div', { class: 'card' + (ctx.spot?.ref === it.ref ? ' spot' : '') },
      h('p', {}, it.text),
      h('div', { class: 'cbtn' },
        h('button', { type: 'button', class: 'mini', onclick: () => ctx.onSpot(it.ref) }, ctx.spot?.ref === it.ref ? 'Lepas sorot' : 'Sorot'),
        h('button', { type: 'button', class: 'mini', onclick: () => ctx.onHide(it.ref) }, 'Sembunyikan')))));
}

function brandTable(agg, dariField) {
  const b = agg.brands;
  if (!b || !b.top.length) return h('p', { class: 'muted' }, 'Belum ada merek yang masuk.');
  const dariT = (v) => dariField.options.find((o) => o.v === v)?.t ?? v;
  return h('div', {},
    h('table', { class: 'btab' },
      h('thead', {}, h('tr', {}, h('th', {}, '#'), h('th', {}, 'Brand'), h('th', {}, 'Disebut'), h('th', {}, 'Paling sering dikenali dari'))),
      h('tbody', {}, b.top.map((g, i) => h('tr', {},
        h('td', {}, i + 1),
        h('td', {}, h('b', {}, g.label), g.variants.length > 1 ? h('small', {}, ` (${g.variants.slice(1).join(', ')})`) : null),
        h('td', {}, g.n),
        h('td', {}, g.utama ? dariT(g.utama) : '–'))))),
    b.lainnya.length ? h('p', { class: 'muted' }, `+ ${b.lainnya.length} brand lain disebut.`) : null);
}

export function renderResults(screen, agg, ctx = {}) {
  const out = h('div', { class: 'results' });

  // Disorot
  if (ctx.spot && ctx.answers?.[ctx.spot.ref] && !ctx.hidden?.[ctx.spot.ref]) {
    const vals = decode(screen, ctx.answers[ctx.spot.ref].values);
    out.append(h('div', { class: 'spotlight' },
      h('div', { class: 'tag' }, 'Disorot'),
      screen.fields.filter((f) => vals[f.id] != null && vals[f.id] !== '').map((f) =>
        h('p', {}, h('small', {}, `${f.label} `), h('b', {}, answerText(f, vals[f.id])))),
      h('button', { type: 'button', class: 'mini', onclick: () => ctx.onSpot(null) }, 'Lepas sorot')));
  }

  // ⚠ kombinasi tidak konsisten
  if (ctx.flags?.length) {
    out.append(h('div', { class: 'flags' },
      h('div', { class: 'tag warn' }, `⚠ ${ctx.flags.length} jawaban perlu dibahas`),
      ctx.flags.map((f) => h('div', { class: 'flag' },
        h('div', {}, f.msgs.join(' ')),
        h('small', {}, answerSummary(screen, ctx.answers[f.ref]?.values))))));
  }

  for (const f of screen.fields) {
    const tally = agg.fields[f.id];
    const showKey = f.key != null && ctx.showKey !== false;
    const sec = h('section', { class: 'rf' }, h('h3', {}, f.label));
    const mk = ctx.marks?.[f.id];
    if (showKey && mk && mk.n) {
      sec.append(h('div', { class: 'mark' }, `Sesuai kunci di skrip: ${mk.ok} dari ${mk.n} jawaban`, f.keyNote ? h('small', {}, ` (${f.keyNote})`) : null));
    }
    if (screen.kind === 'wall' && f.id === 'brand') {
      sec.append(brandTable(agg, screen.fields.find((x) => x.id === 'dari')));
      const det = h('details', {}, h('summary', {}, `Semua jawaban brand (${tally.total})`), textCards(tally.items, ctx));
      sec.append(det);
    } else if (f.type === 'single' || f.type === 'multi') sec.append(bars(f, tally, showKey));
    else if (f.type === 'grid') sec.append(gridTable(f, tally, showKey));
    else sec.append(textCards(tally.items, ctx));
    out.append(sec);
  }

  // yang disembunyikan (bisa ditampilkan lagi)
  const hid = Object.keys(ctx.hidden || {}).filter((n) => ctx.answers?.[n]);
  if (hid.length) {
    out.append(h('details', { class: 'hid', open: ctx.openHidden, ontoggle: (e) => ctx.onToggleHidden?.(e.target.open) },
      h('summary', {}, `Disembunyikan (${hid.length})`),
      hid.map((n) => h('div', { class: 'card dim' },
        h('p', {}, answerSummary(screen, ctx.answers[n].values) || '(kosong)'),
        h('button', { type: 'button', class: 'mini', onclick: () => ctx.onUnhide(n) }, 'Tampilkan lagi')))));
  }
  return out;
}
