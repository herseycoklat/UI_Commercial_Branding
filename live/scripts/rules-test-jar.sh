#!/usr/bin/env bash
# Cadangan untuk `npm run test:rules` bila CLI Firebase tidak bisa bicara ke emulator lokal
# (mis. sandbox dengan proxy HTTPS). Menjalankan jar emulator langsung lalu uji aturan.
set -euo pipefail
cd "$(dirname "$0")/.."
JAR="${EMULATOR_JAR:-$HOME/.cache/firebase/emulators/firebase-database-emulator-v4.11.2.jar}"
[ -f "$JAR" ] || { echo "Jar emulator tidak ditemukan: $JAR (jalankan sekali: npx firebase emulators:start --only database)"; exit 1; }
java -jar "$JAR" --host 127.0.0.1 --port 9000 >/tmp/rtdb-emulator.log 2>&1 &
PID=$!
trap 'kill $PID 2>/dev/null || true' EXIT
for _ in $(seq 1 30); do curl -s -o /dev/null http://127.0.0.1:9000/ && break; sleep 0.5; done
FIREBASE_DATABASE_EMULATOR_HOST=127.0.0.1:9000 node --test test/rules.test.js
