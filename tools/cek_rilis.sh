#!/usr/bin/env bash
# Pemeriksaan wajib sebelum push ke main (kontrak data mahasiswa, README).
#   bash tools/cek_rilis.sh          -> audit semua sesi (cepat, tanpa browser)
#   bash tools/cek_rilis.sh --penuh  -> + uji regresi JSON di browser (wajib sebelum rilis yang menyentuh
#                                       sessions/*.js, core/fields.js, core/session.js atau migrate())
# Keluar dengan kode 1 bila ada yang gagal. Laporkan keluaran skrip ini di laporan chat.
cd "$(dirname "$0")/.." || exit 1
rc=0
for f in sessions/s*.js; do
  n=$(basename "$f" .js); S="S${n#s}"
  ex="tools/extracts/$S.md"
  if [ ! -f "$ex" ]; then echo "PERINGATAN $S: tidak ada $ex, audit dilewati"; continue; fi
  out=$(python3 tools/audit.py "$S" "$ex" 2>&1); code=$?
  echo "$out" | grep -E "^Audit|GAGAL"
  [ $code -ne 0 ] && rc=1
done
python3 - <<'PY' || rc=1
import json
ids = json.load(open("tools/field-ids.lock.json")); ty = json.load(open("tools/field-types.lock.json"))
miss = [s for s in ids if s not in ty]
if miss: print("GAGAL kunci bentuk data belum ada untuk:", miss, "-> python3 tools/audit.py SN tools/extracts/SN.md --lock-tipe"); raise SystemExit(1)
print("Kunci: " + ", ".join(f"{s} {len(ids[s])} ID" for s in ids) + " (ID + bentuk data)")
PY
if [ "$1" = "--penuh" ]; then
  d=$(mktemp -d)
  python3 tools/tests/regresi_json.py buat-contoh "$d" >/dev/null && python3 tools/tests/regresi_json.py uji "$d" | tail -1 || rc=1
  [ -n "$CB_FILE_MAHASISWA" ] && { python3 tools/tests/regresi_json.py uji "$CB_FILE_MAHASISWA" | tail -1 || rc=1; }
  rm -rf "$d"
fi
[ $rc -eq 0 ] && echo "CEK RILIS: LOLOS" || echo "CEK RILIS: GAGAL — jangan push"
exit $rc
