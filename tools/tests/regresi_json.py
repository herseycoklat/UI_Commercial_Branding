"""Uji regresi file mahasiswa: tidak ada isian yang hilang atau berubah saat file dibuka app versi sekarang.

Wajib dijalankan sebelum setiap rilis yang menyentuh sessions/*.js, core/fields.js, core/session.js atau migrate().

Pakai:
  python3 tools/tests/regresi_json.py buat-contoh <folder_keluar>
      Membuat file contoh "semua kolom terisi" untuk S1–S5 dengan mengisi setiap input di halaman sesi,
      lalu menambah bentuk data lama (Leadership Log v0.1, S3 why_placed teks, kunci tak dikenal).
  python3 tools/tests/regresi_json.py uji <folder_berisi_json>
      Untuk tiap file: muat ke browser seperti milik mahasiswa, buka setiap halaman sesi yang ada isinya,
      Submit, lalu bandingkan file unduhan dengan isi file asal (setelah migrate()).

PENTING: file mahasiswa asli JANGAN disimpan di repo. Taruh di folder di luar repo dan arahkan perintah `uji` ke sana.
Keluar dengan kode 1 bila ada isian yang hilang atau berubah.
"""
import sys, os, json, subprocess, time, glob, copy
from playwright.sync_api import sync_playwright

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
PORT = 8779
BASE = f"http://localhost:{PORT}/"
CHROME = "/opt/pw-browsers/chromium" if os.path.exists("/opt/pw-browsers/chromium") else None
SESS = ["S1", "S2", "S3", "S4", "S5"]
NIM = "2399000001"


def launch(p):
    kw = {"args": ["--no-sandbox"]}
    if CHROME: kw["executable_path"] = CHROME
    return p.chromium.launch(**kw)


def seed_script(data):
    nim = data["identifier"]["nim"]
    return ("try{localStorage.clear();}catch(e){}" if False else "") + \
        "if(!sessionStorage.getItem('__seeded')){localStorage.setItem('cb_active_nim',%s);localStorage.setItem('cb_student_'+%s,%s);sessionStorage.setItem('__seeded','1');}" % (
            json.dumps(nim), json.dumps(nim), json.dumps(json.dumps(data)))


FILL_JS = r"""
(round) => {
  const main = document.getElementById('main'); if (!main) return 0;
  main.querySelectorAll('details').forEach(d => d.open = true);
  let n = 0;
  const fire = (el, t) => el.dispatchEvent(new Event(t, { bubbles: true }));
  if (round === 0) main.querySelectorAll('.addbtn').forEach(b => { if (!/hapus|remove/i.test(b.textContent)) { b.click(); n++; } });
  main.querySelectorAll('input, textarea, select').forEach(el => {
    if (el.closest('.example, .exwrap, .modal-back') || el.disabled || el.readOnly) return;
    const t = (el.type || '').toLowerCase();
    if (el.tagName === 'SELECT') { if (el.selectedIndex <= 0 && el.options.length > 1) { el.selectedIndex = el.options.length - 1; fire(el, 'change'); n++; } return; }
    if (t === 'checkbox') { if (!el.checked) { el.checked = true; fire(el, 'change'); n++; } return; }
    if (t === 'radio') { const g = main.querySelectorAll('input[type=radio][name="' + el.name + '"]'); if (![...g].some(x => x.checked)) { el.checked = true; fire(el, 'change'); n++; } return; }
    if (t === 'range') { if (!el.dataset.uji) { el.value = el.max ? String(Math.max(+el.min || 0, +el.max - 1)) : '3'; el.dataset.uji = 1; fire(el, 'input'); fire(el, 'change'); n++; } return; }
    if (t === 'number') { if (!el.value) { el.value = '3'; fire(el, 'input'); fire(el, 'change'); n++; } return; }
    if (t === 'date') { if (!el.value) { el.value = '2026-11-08'; fire(el, 'input'); fire(el, 'change'); n++; } return; }
    if (t === 'file' || t === 'button' || t === 'submit' || t === 'hidden') return;
    if (!el.value) { el.value = 'uji ' + (el.id || el.name || el.placeholder || 'isian').slice(0, 40); fire(el, 'input'); fire(el, 'change'); fire(el, 'blur'); n++; }
  });
  return n;
}
"""


def blank():
    return {"schema": "cb-student/1", "app_version": "0.6.0", "student_id": "uji-regresi",
            "identifier": {"nim": NIM, "full_name": "Uji Regresi", "email": "uji@x.id", "group_id": "G01", "project_name": "Proyek Uji"},
            "sessions": {}, "leadership_log": {"field_id": "leadership_log", "entries": []}, "saved_at": "2026-11-01T10:00:00+07:00"}


def buat_contoh(out):
    os.makedirs(out, exist_ok=True)
    with sync_playwright() as p:
        b = launch(p)
        ctx = b.new_context(viewport={"width": 1366, "height": 900})
        pg = ctx.new_page()
        pg.add_init_script(seed_script(blank()))
        for sid in SESS:
            pg.goto(BASE + sid.lower() + ".html?pratinjau=1"); pg.wait_for_selector("#main .card", timeout=15000)
            for r in range(4):
                pg.evaluate(FILL_JS, r); pg.wait_for_timeout(300)
            pg.evaluate("CB.saveNow()")
        data = json.loads(pg.evaluate("localStorage.getItem('cb_student_%s')" % NIM))
        ids = {}
        for sid in SESS:
            spec = json.loads(subprocess.check_output(["node", os.path.join(ROOT, "tools", "dump_spec.js"), sid]))["spec"]
            all_ids = [f["id"] for pg_ in spec["pages"] for f in pg_["fields"]]
            cur = data["sessions"].get(sid, {}).get("current", {})
            filled = [i for i in all_ids if i in cur and cur[i] not in (None, "", {}, [])]
            ids[sid] = (len(filled), len(all_ids), [i for i in all_ids if i not in filled])
        b.close()
    json.dump(data, open(os.path.join(out, "contoh_semua_kolom.json"), "w"), indent=1, ensure_ascii=False)
    # bentuk data lama + kunci tak dikenal
    old = copy.deepcopy(data)
    old["app_version"] = "0.1.0"
    old["leadership_log"] = {"field_id": "s1.p8.log", "entries": [{"id": "old1", "date": "2026-10-21", "created_at": "a", "updated_at": "b",
                             "decided": "Pilih Lebaran", "why": "keluarga", "evidence": "data", "decisions_led": "Saya pimpin", "personal_reflection": "belajar"}]}
    old["sessions"].setdefault("S3", {"current": {}, "versions": [], "changed_since_submit": False, "status": "draft"})
    old["sessions"]["S3"]["current"]["s3.p5.why_placed"] = "alasan lama dalam satu kotak"
    old["sessions"]["S1"]["current"]["s1.p7.problem1_commercial"] = "kunci lama yang tidak pernah dirilis"
    old["sessions"]["S1"]["current"]["zz.tidak_dikenal"] = {"a": [1, 2]}
    old["kunci_puncak_asing"] = "harus ikut"
    json.dump(old, open(os.path.join(out, "contoh_bentuk_lama.json"), "w"), indent=1, ensure_ascii=False)
    for sid, (f, t, miss) in ids.items():
        print(f"{sid}: {f}/{t} field terisi otomatis" + (f" · tidak terisi: {miss}" if miss else ""))
    print("Contoh ditulis ke", out)


# Perubahan bentuk yang sah (lihat migrate() di core/app.js). Fungsi: (nilai_asli, nilai_baru) -> True bila sah.
MIGRASI_SAH = {
    "s3.p5.why_placed": lambda old, new: isinstance(old, str) and isinstance(new, dict) and new.get("_legacy", "") == old.strip(),
}


def diff(a, b, path, out):
    if isinstance(a, dict) and isinstance(b, dict):
        for k in a:
            if k not in b: out.append(f"{path}.{k}: hilang")
            else: diff(a[k], b[k], f"{path}.{k}", out)
    elif isinstance(a, list) and isinstance(b, list):
        if len(a) > len(b): out.append(f"{path}: {len(a)} butir menjadi {len(b)}")
        for i, (x, y) in enumerate(zip(a, b)): diff(x, y, f"{path}[{i}]", out)
    elif a != b:
        out.append(f"{path}: {json.dumps(a, ensure_ascii=False)[:80]} -> {json.dumps(b, ensure_ascii=False)[:80]}")


def uji(folder):
    files = sorted(glob.glob(os.path.join(folder, "*.json")))
    if not files: print("Tidak ada file .json di", folder); return 1
    bad = 0
    with sync_playwright() as p:
        b = launch(p)
        for fp in files:
            raw = json.load(open(fp))
            ctx = b.new_context(accept_downloads=True, viewport={"width": 1366, "height": 900})
            pg = ctx.new_page(); errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            pg.add_init_script(seed_script(raw))
            pg.goto(BASE + "index.html"); pg.wait_for_timeout(500)
            expected = pg.evaluate("(r)=>CB.migrate(JSON.parse(r))", json.dumps(raw))
            present = [s for s in SESS if s in raw.get("sessions", {})] or ["S1"]
            for sid in present:
                pg.goto(BASE + sid.lower() + ".html?pratinjau=1"); pg.wait_for_selector("#main .card", timeout=15000)
                pg.evaluate("document.querySelectorAll('#main details').forEach(d=>d.open=true)"); pg.wait_for_timeout(400)
            with pg.expect_download() as d:
                pg.click(".actionbar .btn.primary")
                pg.wait_for_selector(".modal-back")
                btns = pg.locator(".modal-back button"); btns.nth(btns.count() - 1).click()
            got = json.load(open(d.value.path()))
            problems = []
            # 1. isian per sesi (setelah migrate) tidak hilang/berubah
            for sid, s in expected.get("sessions", {}).items():
                diff(s.get("current", {}), got["sessions"].get(sid, {}).get("current", {}), sid + ".current", problems)
                ev, gv = s.get("versions", []), got["sessions"].get(sid, {}).get("versions", [])
                if sid != present[-1] and len(gv) != len(ev): problems.append(f"{sid}.versions: {len(ev)} -> {len(gv)}")
            # 2. isian asli (sebelum migrate) tetap ada dan nilainya sama, kecuali perubahan bentuk yang
            #    sengaja dilakukan migrate() dan tercatat di MIGRASI_SAH.
            for sid, s in raw.get("sessions", {}).items():
                gcur = got["sessions"].get(sid, {}).get("current", {})
                for k, v in s.get("current", {}).items():
                    if k not in gcur: problems.append(f"{sid}: kunci asli {k} hilang"); continue
                    if k in MIGRASI_SAH and MIGRASI_SAH[k](v, gcur[k]): continue
                    diff(v, gcur[k], f"{sid}.asli.{k}", problems)
            # 3. kunci puncak, identitas, Leadership Log
            for k in raw:
                if k not in got: problems.append(f"kunci puncak {k} hilang")
            if got["identifier"]["nim"] != raw["identifier"]["nim"]: problems.append("NIM berubah")
            # dibandingkan lewat isi (butir + teks): migrasi log v0.1 membuat ID baru setiap kali dijalankan
            gl = {(e.get("category"), e.get("text")) for e in got["leadership_log"]["entries"]}
            for e in expected["leadership_log"]["entries"]:
                if (e.get("category"), e.get("text")) not in gl: problems.append(f"entri Leadership Log '{str(e.get('text'))[:40]}' hilang")
            if got.get("schema") != "cb-student/1": problems.append("skema berubah")
            if errs: problems.append("galat JS: " + "; ".join(errs[:3]))
            n = sum(len([k for k, v in s.get("current", {}).items()]) for s in raw.get("sessions", {}).values())
            print(("OK    " if not problems else "GAGAL ") + os.path.basename(fp) + f" · {n} kunci isian · sesi {','.join(present)}")
            for m in problems[:15]: print("        ", m)
            bad += bool(problems)
            ctx.close()
        b.close()
    print(f"\n{len(files) - bad}/{len(files)} file utuh")
    return 1 if bad else 0


if __name__ == "__main__":
    mode, folder = sys.argv[1], sys.argv[2]
    srv = subprocess.Popen(["python3", "-m", "http.server", str(PORT)], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1)
    try:
        rc = buat_contoh(folder) if mode == "buat-contoh" else uji(folder)
    finally:
        srv.terminate()
    sys.exit(rc or 0)
