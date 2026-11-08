"""Uji modal Submit: label Form per sesi + arahan ke sesi terbaru. Pakai: python3 submit_label_test.py local|live <file.json>"""
import sys, os, json, subprocess, time
from playwright.sync_api import sync_playwright
mode, oldf = sys.argv[1], sys.argv[2]
root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
old = json.load(open(oldf)); NIM = old["identifier"]["nim"]
srv = None
if mode == "local":
    srv = subprocess.Popen(["python3", "-m", "http.server", "8773"], cwd=root, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
    BASE, launch = "http://localhost:8773/", {}
else:
    BASE, launch = "https://combrand.gressus.me/", {"proxy": {"server": os.environ["HTTPS_PROXY"]}}
R = []
def ok(n, c, i=""): R.append((bool(c), n, i))
EXP = {"s1": ("Week 1 - S1 + S2", True), "s2": ("Week 1 - S1 + S2", True), "s3": ("Week 2 - S3", True), "s4": ("Week 3 - S4", False)}
try:
  with sync_playwright() as p:
    b = p.chromium.launch(**launch); ctx = b.new_context(accept_downloads=True); pg = ctx.new_page(); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(BASE + "index.html")
    pg.evaluate("([n,d])=>{localStorage.clear();localStorage.setItem('cb_active_nim',n);localStorage.setItem('cb_student_'+n,JSON.stringify(d));}", [NIM, old])
    for s, (lab, newer) in EXP.items():
        pg.goto(BASE + s + ".html"); pg.wait_for_timeout(1200)
        pg.locator(".actionbar button", has_text="Submit").click(); pg.wait_for_timeout(300)
        m = pg.locator(".modal, [role=dialog]").last.text_content()
        ok(f"{s}: label Form '{lab}'", f"pilih {lab}" in m, m[:0])
        ok(f"{s}: arahan sesi terbaru {'ada' if newer else 'tidak ada'}", ("Sesi 4 sudah dibuka" in m) == newer)
        if newer: ok(f"{s}: arahan menyebut Week 3 - S4", "Week 3 - S4" in m)
        ok(f"{s}: tanpa 'Gate'", "Gate" not in m)
        with pg.expect_download() as dl:
            pg.locator(".modal button, [role=dialog] button", has_text="Unduh file").click()
        ok(f"{s}: nama file sd-{s.upper()}", f"_sd-{s.upper()}_" in dl.value.suggested_filename, dl.value.suggested_filename)
        pg.wait_for_timeout(300)
        m2 = pg.locator(".modal, [role=dialog]").last.text_content()
        ok(f"{s}: modal setelah unduh pakai label sama", lab in m2)
    ok("tanpa error JS", not errs, errs[:2]); b.close()
finally:
    if srv: srv.terminate()
for r in R:
    if not r[0]: print("GAGAL", r[1], r[2])
print(f"{mode}: {sum(r[0] for r in R)}/{len(R)} lolos")
