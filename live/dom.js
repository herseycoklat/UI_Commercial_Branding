// Pembuat elemen DOM kecil (tanpa kerangka kerja). Teks selalu lewat createTextNode, tidak pernah innerHTML,
// jadi jawaban mahasiswa tidak bisa menyisipkan HTML di layar dosen.
export function h(tag, props = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (v === true) el.setAttribute(k, '');
    else el.setAttribute(k, v);
  }
  for (const kid of kids.flat(Infinity)) {
    if (kid == null || kid === false) continue;
    el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
  }
  return el;
}
export const clear = (el) => { while (el.firstChild) el.removeChild(el.firstChild); return el; };

// Kosongkan `el` lalu isi dengan anak-anak (null/false dilewati, array diratakan). Pengganti `.append` langsung,
// yang akan menulis "null" atau "[object HTMLElement]" ke layar.
export function mount(el, ...kids) {
  clear(el);
  for (const k of kids.flat(Infinity)) {
    if (k == null || k === false) continue;
    el.append(k.nodeType ? k : document.createTextNode(String(k)));
  }
  return el;
}
