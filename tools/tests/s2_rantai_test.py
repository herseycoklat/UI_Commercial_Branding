"""Uji v0.6.4 (S2 selaras rantai). Pakai: python3 s2_rantai_test.py local|live <old_w1.json> <outdir>"""
import sys, os, json, re, subprocess, time
from playwright.sync_api import sync_playwright
mode, oldf, out = sys.argv[1], sys.argv[2], sys.argv[3]
root = "/home/claude/ui_commercial_branding"
old = json.load(open(oldf)); NIM = old["identifier"]["nim"]
srv = None
if mode == "local":
    srv = subprocess.Popen(["python3", "-m", "http.server", "8772"], cwd=root, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
    BASE = "http://localhost:8772/"; launch = {}
else:
    BASE = "https://combrand.gressus.me/"; launch = {"proxy": {"server": os.environ["HTTPS_PROXY"]}}
R = []
def ok(name, cond, info=""): R.append((bool(cond), name, info))
OLD_GONE = ["separuh bukti untuk positioning", "Ambangnya", "tidak memenuhi ambang", "rencana kanal Sesi 6",
            "Minimal 5 per proyek", "Lima wawancara boleh menyusul", "Not culturally", "Cek terbalik sebelum submit",
            "Tenggat pengumpulan file Minggu 1", "menjadi dasar wawancaramu minggu ini", "terutama saat menulis angka pendapatan"]
NEW_S2 = ["kotak AUDIENCE di brief Sesi 4 hlm. 5", "Customer Journey Map dan KPI Tree Sesi 6", "baris <b>Price</b>".replace("<b>","").replace("</b>",""),
          "reference price", "THE TEST", "Sesi 3 hlm. 3 (bila diisi)", "Not made in Indonesia", "Silabus menganjurkan 5 per proyek",
          "Wawancara di hlm. 9 boleh dilewati", "Cek terbalik (kalau halaman ini diisi)", "Kalau skor diisi:",
          "uji Concept Card di Sesi 7 bisa menjadi jenis kedua", "di samping kolom Reference Price", "kategori diambil dari matriks hlm. 6"]
NEW_S3 = ["General blockbuster moviegoers: the ones who don't read comics.", "Existing Technic hobbyists.", "narrowed to 'animated family film'"]
EXPECT = re.search(r'APP_VERSION = "([^"]+)"', open(os.path.join(root, "core/app.js")).read()).group(1)
gate = lambda t: len(re.findall(r"\bGate\b", t))
try:
  with sync_playwright() as p:
    b = p.chromium.launch(**launch)
    ctx = b.new_context(accept_downloads=True, viewport={"width": 1366, "height": 900})
    errs, bad = [], []
    ctx.on("weberror", lambda e: errs.append(str(e.error)))
    pg = ctx.new_page()
    pg.on("pageerror", lambda e: errs.append(pg.url + " " + str(e)))
    pg.on("response", lambda r: bad.append(f"{r.status} {r.url}") if r.status >= 400 and "favicon" not in r.url else None)
    pg.goto(BASE + "index.html?nocache=" + str(time.time()))
    pg.evaluate("([n,d])=>{localStorage.clear();localStorage.setItem('cb_active_nim',n);localStorage.setItem('cb_student_'+n,JSON.stringify(d));}", [NIM, old])
    for u in ["index.html", "s1.html", "s2.html", "s3.html", "s4.html", "leadership.html"]:
        pg.goto(BASE + u); pg.wait_for_timeout(1500)
        if u == "s2.html":
            pg.locator("#p6 .exbar button", has_text="Jumbo").click(); pg.wait_for_timeout(300)
        if u == "s3.html":
            exs = ""
            for cname in ["Jumbo", "Marvel", "LEGO"]:
                pg.locator("#p2 .exbar button", has_text=cname).first.click(); pg.wait_for_timeout(300)
                exs += pg.locator("#p2 .expanel").first.text_content()
        t = pg.evaluate("()=>document.body.textContent")
        ok(f"{u}: Gate 0 (halaman+cek)", gate(t) == 0, gate(t))
        if u == "index.html":
            ok("hub: panel 9 must-dos tampil", "9 must-dos, Sessions 1–4" in t)
            ver = pg.evaluate("()=>window.CB && CB.APP_VERSION"); ok("versi " + EXPECT, ver == EXPECT, ver)
        if u == "s2.html":
            for s in OLD_GONE: ok("S2 teks lama hilang: " + s, s not in t)
            for s in NEW_S2: ok("S2 teks baru ada: " + s, s in t)
            for n in (2, 3, 4): ok(f"S2 MUST-DO {n} of 9", f"MUST-DO · {n} of 9" in t)
            ok("S2 bantuan 3 must-dos", "This session has 3 must-dos: pages 4, 5 and 6." in t)
            ok("S2 footer PPT tetap", "5 interviews minimum, with people who are NOT your friends" in t)
            for k in ["s2.p4.primary", "s2.p6.matrix"]: pass
            prim = old["sessions"]["S2"]["current"].get("s2.p4.primary", "")
            ok("S2 nilai primary lama tampil", pg.evaluate("v=>[...document.querySelectorAll('textarea,input')].some(e=>e.value===v)", prim))
            pg.evaluate("()=>{window.print=function(){}}")
            pg.locator(".actionbar button", has_text="Cetak").click(); pg.wait_for_timeout(800)
            pt = pg.evaluate("()=>{var e=document.querySelector('#printview,.printview,.pp-root,[class*=print]');return e?e.textContent:document.body.textContent}")
            ok("S2 cetak: Gate 0", gate(pt) == 0, gate(pt))
            ok("S2 cetak: sampul tanpa tenggat lama", "Lima wawancara boleh menyusul" not in pt)
            # submit
            pg.locator(".actionbar button", has_text="Submit S2").click()
            with pg.expect_download() as dl:
                pg.locator(".modal button, [role=dialog] button", has_text="Unduh file").click()
            d = dl.value; fn = d.suggested_filename
            ok("submit nama {NIM}_sd-S2_…json", re.match(rf"^{NIM}_sd-S2_.*\.json$", fn), fn)
            path = os.path.join(out, mode + "_" + fn); d.save_as(path); got = json.load(open(path))
            ok("skema sama (cb-student/1)", got.get("schema") == old.get("schema"))
            ok("kunci level atas tidak berkurang", set(old) <= set(got), sorted(set(old) - set(got)))
            for sid in ("S1", "S2"):
                oc, gc = old["sessions"][sid]["current"], got["sessions"][sid]["current"]
                diff = [k for k in oc if oc[k] != gc.get(k)]
                ok(f"{sid}: semua isian lama utuh ({len(oc)} field)", not diff, diff[:5])
            pg.keyboard.press("Escape")
        if u == "s3.html":
            for s in NEW_S3: ok("S3 contoh baru ada: " + s, s in exs)
            c2 = old["sessions"]["S2"]["current"]
            ok("S3 panel bawaan: audiens S2 tampil", c2["s2.p4.primary"].strip()[:60] in t)
            ins = c2.get("s2.p5.insight") or {}
            bar = ins.get("barrier", "") if isinstance(ins, dict) else ""
            ok("S3 panel bawaan: insight S2 tampil", (bar.strip()[:50] in t) if bar else True, bar[:40])
            cat = c2.get("s2.p3.category") or {}
            cv = (cat.get("compete_in") if isinstance(cat, dict) else str(cat)) or ""
            ok("S3 panel bawaan: kategori S2 tampil", (cv.strip()[:40] in t) if cv.strip() else True, cv[:40])
            who = ((c2.get("s2.p6.matrix") or {}).get("rows") or {}).get("who") or {}
            w = next((v for v in who.values() if v and v.strip()), "")
            ok("S3 panel bawaan: matrix tampil", (w.strip()[:30] in t) if w else True, w[:30])
            ok("S3 panel bawaan: matrix berbentuk tabel", pg.locator("table").count() > 0)
    ok("tanpa error JS", not errs, errs[:3])
    ok("tanpa error HTTP", not bad, bad[:3])
    b.close()
finally:
    if srv: srv.terminate()
fails = [r for r in R if not r[0]]
for r in R:
    if not r[0] or "-v" in sys.argv: print("GAGAL" if not r[0] else "ok", r[1], r[2])
print(f"{mode}: {len(R)-len(fails)}/{len(R)} lolos")
