"""Turunkan config/projects.json dari daftar-proyek.csv.

Jalankan: python3 tools/build_projects.py tools/daftar-proyek.csv config/projects.json
Hanya group_id dan nama proyek yang masuk ke app mahasiswa (dropdown).
Nama anggota eksternal TIDAK disalin ke situs publik.
"""
import csv
import json
import sys


def main(src, dst):
    rows = []
    with open(src, newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            rows.append({
                "group_id": r["group_id"].strip(),
                "project_name": r["project_name"].strip(),
                "type": r["project_type"].strip(),
            })
    ids = [r["group_id"] for r in rows]
    assert len(ids) == len(set(ids)), "group_id ganda"
    with open(dst, "w", encoding="utf-8") as f:
        json.dump({"projects": rows}, f, ensure_ascii=False, indent=2)
    print(f"{len(rows)} proyek ditulis ke {dst}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
