"""Mock veri yükleyici — JSON dosyaları uygulama başında bir kez okunur."""
import json
from pathlib import Path

_DATA_DIR = Path(__file__).resolve().parent.parent / "data"


def _load(name: str):
    with open(_DATA_DIR / name, encoding="utf-8") as f:
        return json.load(f)


CLINICS = _load("clinics.json")
DOCTORS = {d["id"]: d for d in _load("doctors.json")}
HOTELS = _load("hotels.json")
FLIGHTS = _load("flights.json")
