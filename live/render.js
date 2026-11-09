// Pembuat formulir dari skema layar (satu renderer untuk semua jenis isian).
import { h } from './dom.js';
import { validateField } from './validate.js';

const optText = (o) => h('span', { class: 'ot' }, h('b', {}, o.t), o.d ? h('small', {}, o.d) : null);
// Urutan tampil di HP: f.urutan (acak tetap) bila ada; nilai dan hasil dosen tetap memakai f.options.
export const shown = (f) => (f.urutan ? f.urutan.map((v) => f.options.find((o) => o.v === v)) : f.options);
// Konteks di atas pertanyaan (L4, L5, L12, L13 Sesi 5).
export const konteksBox = (sc) => (sc.konteks?.length ? h('div', { class: 'konteks' }, sc.konteks.map((t) => h('p', {}, t))) : null);

function hintFor(f) {
  if (f.type === 'multi') {
    if (f.max && f.min === f.max) return `Pilih tepat ${f.max}.`;
    if (f.max) return `Pilih maksimal ${f.max}.`;
    if (f.min === 0) return 'Boleh pilih lebih dari satu, atau tidak satu pun.';
    return 'Boleh pilih lebih dari satu.';
  }
  if (f.optional) return 'Boleh dikosongkan.';
  return '';
}

export function buildForm(screen, { initial = {}, onChange = () => {} } = {}) {
  const vals = JSON.parse(JSON.stringify(initial));
  const fieldEls = new Map();
  const errEls = new Map();
  const refreshers = [];
  let disabledAll = false;
  const key = `f-${screen.id}-`;

  const filled = (f) => !validateField(f, vals[f.id]);
  const allOk = () => screen.fields.every(filled);

  function changed(f) {
    errEls.get(f.id).textContent = '';
    if (screen.staged) {
      let prev = true;
      for (const g of screen.fields) {
        fieldEls.get(g.id).hidden = !prev;
        prev = prev && filled(g);
      }
    }
    onChange({ values: vals, ok: allOk() });
  }

  const single = (f) => h('div', { class: 'opts' }, shown(f).map((o) => {
    const inp = h('input', { type: 'radio', name: key + f.id, value: o.v });
    inp.checked = vals[f.id] === o.v;
    inp.addEventListener('change', () => { vals[f.id] = o.v; changed(f); });
    return h('label', { class: 'opt' }, inp, optText(o));
  }));

  function multi(f) {
    const inputs = [];
    const wrap = h('div', { class: 'opts' }, shown(f).map((o) => {
      const inp = h('input', { type: 'checkbox', value: o.v });
      inp.addEventListener('change', () => {
        let arr = new Set(vals[f.id] || []);
        if (inp.checked) {
          if (f.exclusive) { if (o.v === f.exclusive) arr = new Set(); else arr.delete(f.exclusive); }
          arr.add(o.v);
        } else arr.delete(o.v);
        vals[f.id] = [...arr];
        refresh();
        changed(f);
      });
      inputs.push(inp);
      return h('label', { class: 'opt' }, inp, optText(o));
    }));
    function refresh() {
      const arr = vals[f.id] || [];
      for (const i of inputs) {
        i.checked = arr.includes(i.value);
        i.disabled = disabledAll || (!!f.max && !i.checked && arr.length >= f.max);
      }
    }
    refreshers.push(refresh);
    refresh();
    return wrap;
  }

  function text(f) {
    const long = f.max > 80;
    const inp = h(long ? 'textarea' : 'input', { maxlength: f.max, rows: long ? 3 : null, type: long ? null : 'text', autocomplete: 'off', class: 'txt' });
    inp.value = vals[f.id] || '';
    const count = h('small', { class: 'count' }, `${inp.value.length}/${f.max}`);
    inp.addEventListener('input', () => { vals[f.id] = inp.value; count.textContent = `${inp.value.length}/${f.max}`; changed(f); });
    return h('div', {}, inp, count);
  }

  const grid = (f) => h('div', { class: 'grid' }, f.rows.map((r) => {
    const name = `${key}${f.id}-${r.v}`;
    return h('div', { class: 'grow' },
      h('div', { class: 'glabel' }, h('b', {}, r.t), r.d ? h('small', {}, r.d) : null),
      h('div', { class: 'gcols' }, f.cols.map((c) => {
        const inp = h('input', { type: 'radio', name, value: c.v });
        inp.checked = vals[f.id]?.[r.v] === c.v;
        inp.addEventListener('change', () => { vals[f.id] = { ...(vals[f.id] || {}), [r.v]: c.v }; changed(f); });
        return h('label', { class: 'chip' }, inp, h('span', {}, c.t));
      })));
  }));

  const root = h('form', { class: 'form', novalidate: true, onsubmit: (e) => e.preventDefault() });
  const kb = konteksBox(screen);
  if (kb) root.append(kb);
  for (const f of screen.fields) {
    const err = h('div', { class: 'err', role: 'alert' });
    errEls.set(f.id, err);
    const body = { single, multi, text, grid }[f.type](f);
    const hint = hintFor(f);
    const el = h('fieldset', { class: 'field', 'data-field': f.id },
      h('legend', {}, f.label), hint ? h('div', { class: 'hint' }, hint) : null, body, err);
    fieldEls.set(f.id, el);
    root.append(el);
  }
  if (screen.staged) {
    let prev = true;
    for (const g of screen.fields) { fieldEls.get(g.id).hidden = !prev; prev = prev && filled(g); }
  }

  return {
    el: root,
    values: () => JSON.parse(JSON.stringify(vals)),
    ok: allOk,
    showErrors() {
      let first = null;
      for (const f of screen.fields) {
        const msg = validateField(f, vals[f.id]);
        errEls.get(f.id).textContent = msg || '';
        if (msg && !first) first = fieldEls.get(f.id);
      }
      if (first && !first.hidden) first.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return !first;
    },
    setDisabled(b) {
      disabledAll = b;
      root.querySelectorAll('input,textarea').forEach((i) => { i.disabled = b; });
      refreshers.forEach((r) => r());
    },
  };
}
