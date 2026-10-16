"""Audit parity: spec app vs ekstrak teks workbook PPT (python-pptx).

Jalankan dari root repo:
  python3 tools/audit.py S1 path/ke/S1-workbook-extract.md [--lock]

Yang diperiksa:
  1. Urutan dan nomor halaman spec = urutan slide workbook (slide 1 = cover).
  2. Judul alat identik dengan judul halaman workbook.
  3. Setiap label dan hint kotak, subjudul, dan footer ada persis di slide yang sama.
  4. Setiap label kotak di workbook muncul sebagai field (dua arah, untuk halaman yang punya kotak berlabel).
  5. ID field berpola s{n}.p{halaman}.{kotak}, unik, dan halaman di ID = halaman tempatnya.
  6. ID yang sudah dikunci (tools/field-ids.lock.json) tidak hilang atau berganti nama.
  7. Contoh di content/ hanya memakai ID yang ada di halaman itu.
  8. Konten tidak memuat kata status Gate (APPROVED / REVISION DUE) dan tidak memuat tanggal kalender.
  9. fillOrder memuat semua halaman kerja tepat sekali.
--lock menulis ulang file lock dengan ID saat ini (hanya dipakai saat sesi dirilis).
"""
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOCK = os.path.join(ROOT, "tools", "field-ids.lock.json")
DATE_RE = re.compile(r"\b\d{1,2}\s+(Jan|Feb|Mar|Apr|May|Mei|Jun|Jul|Aug|Agu|Sep|Oct|Okt|Nov|Dec|Des)\b|\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun|Sen|Sel|Rab|Kam|Jum|Sab|Min)\s+\d{1,2}\b", re.I)
STATUS_RE = re.compile(r"APPROVED|REVISION DUE")


def norm(s):
    return re.sub(r"\s+", " ", s.replace("’", "'").replace("‘", "'")).strip()


def slides(md):
    out = {}
    for block in re.split(r"^## Slide (\d+)\s*$", md, flags=re.M)[1:]:
        pass
    parts = re.split(r"^## Slide (\d+)\s*$", md, flags=re.M)
    for i in range(1, len(parts), 2):
        out[int(parts[i])] = norm(parts[i + 1])
    return out


def main():
    sid, extract = sys.argv[1], sys.argv[2]
    do_lock = "--lock" in sys.argv
    n = sid[1:]
    dump = json.loads(subprocess.check_output(["node", os.path.join(ROOT, "tools", "dump_spec.js"), sid], cwd=ROOT))
    spec, content = dump["spec"], dump["content"] or {"pages": {}}
    sl = slides(open(extract, encoding="utf-8").read())
    fails, warns, passes = [], [], 0

    def check(cond, msg, warn=False):
        nonlocal passes
        if cond:
            passes += 1
        else:
            (warns if warn else fails).append(msg)

    work_pages = sorted(k for k in sl if k >= 2)
    spec_pages = [p["p"] for p in spec["pages"]]
    check(spec_pages == work_pages, f"Urutan halaman spec {spec_pages} ≠ workbook {work_pages}")
    check(sorted(spec["fillOrder"]) == work_pages, f"fillOrder {spec['fillOrder']} tidak memuat semua halaman kerja tepat sekali")

    ids = []
    for pg in spec["pages"]:
        p, txt = pg["p"], sl.get(pg["p"], "")
        first = txt.split(" ", 1)[1] if txt.startswith(str(p) + " ") else txt
        check(first.startswith(norm(pg["title"])), f"hlm. {p}: judul '{pg['title']}' bukan judul slide")
        for key in ("sub", "footer"):
            if pg.get(key):
                check(norm(pg[key]) in txt, f"hlm. {p}: {key} tidak persis sama dengan workbook: {pg[key]!r}")
        for col in pg.get("columns", []) + pg.get("groups", []):
            check(norm(col["head"]) in txt, f"hlm. {p}: judul kolom '{col['head']}' tidak ada di workbook")
        for f in pg["fields"]:
            ids.append(f["id"])
            check(re.fullmatch(rf"s{n}\.p{p}\.[a-z0-9_]+", f["id"]) is not None, f"hlm. {p}: ID '{f['id']}' tidak berpola s{n}.p{p}.<kotak>")
            if f.get("label"):
                check(norm(f["label"]) in txt, f"hlm. {p}: label '{f['label']}' tidak ada di workbook")
            if f.get("hint"):
                check(norm(f["hint"]) in txt, f"hlm. {p}: hint '{f['hint']}' tidak ada di workbook")
            for r in f.get("rows", []):
                check(norm(r["label"]) in txt, f"hlm. {p}: baris '{r['label']}' tidak ada di workbook")
            for c in f.get("columns", []):
                check(norm(c["label"]) in txt, f"hlm. {p}: kolom '{c['label']}' tidak ada di workbook")
        # dua arah: label bernomor "N · X" di workbook harus ada di spec
        numbered = set(re.findall(r"\b(\d · [A-Z][A-Z &/'-]+?)(?= [A-Z][a-z]| e\.g\.| What| Who| Name| Every| The| How| →|$)", txt))
        spec_labels = {norm(f.get("label", "")) for f in pg["fields"]}
        for lab in numbered:
            check(norm(lab) in spec_labels, f"hlm. {p}: kotak workbook '{lab}' tidak punya field")
        # konten
        ct = content["pages"].get(str(p)) or content["pages"].get(p)
        if ct:
            blob = json.dumps(ct, ensure_ascii=False)
            check(not STATUS_RE.search(blob), f"hlm. {p}: konten memuat kata status Gate")
            m = DATE_RE.search(blob)
            check(not m, f"hlm. {p}: konten memuat tanggal kalender ({m.group(0) if m else ''})")
            page_ids = {f["id"] for f in pg["fields"]}
            for case, ex in (ct.get("examples") or {}).items():
                if not ex:
                    continue
                for k in list(ex.get("values", {})) + list(ex.get("anno", {})):
                    check(k in page_ids, f"hlm. {p}: contoh {case} memakai ID asing {k}")
                missing = page_ids - set(ex.get("values", {}))
                check(not missing, f"hlm. {p}: contoh {case} tidak mengisi {sorted(missing)}", warn=True)

    check(len(ids) == len(set(ids)), "ID field ganda")

    lock = json.load(open(LOCK)) if os.path.exists(LOCK) else {}
    if sid in lock:
        gone = [i for i in lock[sid] if i not in ids]
        check(not gone, f"ID terkunci hilang/berganti nama: {gone}")
    if do_lock:
        lock[sid] = ids
        json.dump(lock, open(LOCK, "w"), indent=2)
        print(f"Lock ditulis: {len(ids)} ID {sid}")

    built = sorted(int(k) for k in content["pages"])
    print(f"Audit {sid}: {passes} cek lolos · {len(fails)} gagal · {len(warns)} peringatan · halaman berkonten: {built}")
    for m in fails:
        print("  GAGAL ", m)
    for m in warns:
        print("  PERINGATAN ", m)
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
