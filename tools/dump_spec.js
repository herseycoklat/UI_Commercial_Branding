// Membaca sessions/sN.js dan content/sN.js tanpa browser, lalu mencetak JSON.
// Dipakai oleh tools/audit.py. Jalankan: node tools/dump_spec.js S1
const fs = require("fs"), vm = require("vm"), path = require("path");
const sid = process.argv[2];
const n = sid.slice(1);
const root = path.join(__dirname, "..");
const ctx = { window: {} }; ctx.CB = ctx.window.CB = {}; vm.createContext(ctx);
for (const f of [`sessions/s${n}.js`, `content/s${n}.js`]) {
  const p = path.join(root, f);
  if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, "utf8"), ctx, { filename: f });
}
process.stdout.write(JSON.stringify({ spec: ctx.CB.specs[sid], content: (ctx.CB.content || {})[sid] || null }));
