#!/usr/bin/env bash
# Uji ujung-ke-ujung: emulator Database (jar langsung) + Auth (CLI) + server statis + browser Playwright.
# Hanya lokal. Tidak menyentuh Firebase sungguhan.
set -euo pipefail
cd "$(dirname "$0")/.."
JAR="${EMULATOR_JAR:-$HOME/.cache/firebase/emulators/firebase-database-emulator-v4.11.2.jar}"
[ -f "$JAR" ] || { echo "Jar emulator belum ada. Jalankan sekali: npx firebase emulators:start --only database"; exit 1; }
PIDS=()
cleanup() { for p in "${PIDS[@]}"; do kill "$p" 2>/dev/null || true; done; }
trap cleanup EXIT
java -jar "$JAR" --host 127.0.0.1 --port 9000 >/tmp/kl-db.log 2>&1 & PIDS+=($!)
npx firebase emulators:start --only auth --project demo-kelas-live >/tmp/kl-auth.log 2>&1 & PIDS+=($!)
python3 -m http.server 8080 --bind 127.0.0.1 >/tmp/kl-http.log 2>&1 & PIDS+=($!)
for _ in $(seq 1 60); do
  curl -s -o /dev/null http://127.0.0.1:9000/ && curl -s -o /dev/null http://127.0.0.1:9099/ && break; sleep 0.5
done
curl -s -X PUT -H "Authorization: Bearer owner" --data-binary @database.rules.json \
  "http://127.0.0.1:9000/.settings/rules.json?ns=demo-kelas-live" >/dev/null
node test/e2e.mjs
