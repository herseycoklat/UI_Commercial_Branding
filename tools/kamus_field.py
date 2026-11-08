"""Kamus field: satu tabel per sesi dari spec + file lock. Rujukan tunggal untuk penilai dan chat lain.

Pakai: python3 tools/kamus_field.py > docs/kamus-field.md
Jalankan ulang setiap kali sesi baru dirilis dan dikunci (audit.py --lock).
"""
import json, os, subprocess, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
lock = json.load(open(os.path.join(ROOT, "tools", "field-ids.lock.json")))
sessions = sorted({"S" + f[1:-3] for f in os.listdir(os.path.join(ROOT, "sessions")) if f.startswith("s") and f.endswith(".js")}, key=lambda x: int(x[1:]))

out = ["# Kamus field workbook app", "",
       "*Dibuat otomatis oleh `tools/kamus_field.py` dari `sessions/*.js` dan `tools/field-ids.lock.json`. Jangan diedit tangan.*", "",
       "Lokasi data di file JSON mahasiswa (`cb-student/1`): `sessions.<Sesi>.current[<ID>]`. Versi yang di-Submit: `sessions.<Sesi>.versions[n].fields[<ID>]`. "
       "Leadership Log: `leadership_log.entries` (bukan field sesi).", "",
       "Kolom **Peran**: `HAL INTI` = dihitung di cek kelengkapan dan dibaca penilai mingguan; `opsional` = boleh dilewati. "
       "Kolom **Kunci**: `ya` = ID sudah dirilis, tidak boleh dihapus, diganti nama, atau diganti tipe.", ""]
for sid in sessions:
    d = json.loads(subprocess.check_output(["node", os.path.join(ROOT, "tools", "dump_spec.js"), sid]))
    spec = d["spec"]
    core_pages = {it["page"]: it for it in (spec.get("core") or {}).get("items", [])}
    locked = set(lock.get(sid, []))
    out += [f"## {sid} · {spec.get('title', '')}", ""]
    if spec.get("core"):
        out += ["Hal inti: " + "; ".join(f"{it['n']}. {it.get('chain', it['label'])} ({it['where']})" for it in spec["core"]["items"]), ""]
    out += [f"Terkunci: {'ya, ' + str(len(locked)) + ' ID' if locked else 'BELUM'}", "",
            "| Hlm | ID | Label | Tipe | Peran | Kunci |", "|---|---|---|---|---|---|"]
    for pg in spec["pages"]:
        for f in pg["fields"]:
            gskip = any(g.get("skip") and f["id"] in g.get("ids", []) for g in pg.get("groups", []) or [])
            role = "opsional" if (pg.get("skip") or f.get("skip") or gskip) else ("HAL INTI" if pg["p"] in core_pages else "—")
            lbl = (f.get("label") or pg.get("title") or "").replace("|", "/").replace("\n", " ")
            out.append(f"| {pg['p']} | `{f['id']}` | {lbl[:70]} | {f['type']} | {role} | {'ya' if f['id'] in locked else 'TIDAK'} |")
    gone = sorted(locked - {f['id'] for pg in spec['pages'] for f in pg['fields']})
    if gone: out += ["", f"**PERINGATAN:** ID terkunci yang tidak ada lagi di spec: {gone}"]
    out.append("")
sys.stdout.write("\n".join(out) + "\n")
