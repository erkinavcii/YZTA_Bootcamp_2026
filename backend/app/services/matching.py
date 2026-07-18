"""Klinik eşleştirme motoru v1 — mock veri üzerinde işlem + bölge + bütçe filtrelemesi.

Gerçek API / web scraping YOK: tüm veri temsili mock JSON'dan gelir.
"""
from typing import Optional

from . import data


def match(
    procedure: str,
    region: str,
    city: Optional[str] = None,
    budget: Optional[int] = None,
):
    """İşlem + bölgeye göre en uygun (klinik, doktor, otel, uçuş) demetini döndürür.

    Uygun klinik yoksa None döner.
    """
    candidates = [
        c for c in data.CLINICS
        if procedure in c["procedures"] and c["region"] == region
    ]

    # Şehir belirtildiyse önce şehir içi eşleşmeleri tercih et.
    if city:
        city_matches = [c for c in candidates if c["city"] == city]
        if city_matches:
            candidates = city_matches

    if not candidates:
        return None

    # Bütçe verildiyse bütçeye sığan klinikleri önceliklendir.
    if budget is not None:
        within = [c for c in candidates if c["priceGBP"][procedure] <= budget]
        if within:
            candidates = within

    clinic = max(candidates, key=lambda c: c["rating"])
    doctor = data.DOCTORS.get(clinic["doctorId"])
    hotel = _pick_hotel(clinic["city"], region)
    flight = _pick_flight(region)
    return clinic, doctor, hotel, flight


def _pick_hotel(city: str, region: str):
    for h in data.HOTELS:
        if h["city"] == city:
            return h
    for h in data.HOTELS:
        if h["region"] == region:
            return h
    return data.HOTELS[0]


def _pick_flight(region: str):
    for f in data.FLIGHTS:
        if f["region"] == region:
            return f
    return data.FLIGHTS[0]
