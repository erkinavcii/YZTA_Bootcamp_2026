"""LLM soyutlama katmanı.

Varsayılan: mock/canned planlayıcı (deterministik, sunum için güvenli).
`USE_GEMINI=true` olduğunda gerçek Gemini yoluna geçer; henüz implemente
değil olduğundan güvenle mock'a düşer. Gerçek entegrasyon tek fonksiyonda
(`_generate_with_gemini`) toplanmıştır.
"""
import os

from ..models.schemas import ChatRequest, ChatResponse
from . import planner

USE_GEMINI = os.getenv("USE_GEMINI", "false").lower() == "true"


def generate(req: ChatRequest) -> ChatResponse:
    """Sohbet mesajından yanıt + (varsa) yapılandırılmış seyahat planı üretir."""
    if USE_GEMINI:
        try:
            return _generate_with_gemini(req)
        except Exception:
            # Gerçek entegrasyon henüz yok / hata → mock planlayıcıya düş.
            return planner.build_plan_and_reply(req)
    return planner.build_plan_and_reply(req)


def _generate_with_gemini(req: ChatRequest) -> ChatResponse:
    """TODO (Sprint 3): google-generativeai ile yapılandırılmış çıktı.

    Planlanan akış:
      1. `google.generativeai`'yi GEMINI_API_KEY ile yapılandır.
      2. System prompt + TripPlan JSON şeması ile modeli çağır (response schema).
      3. Dönen JSON'u `schemas.TripPlan` olarak parse edip ChatResponse'a sar.
    Şimdilik implemente değil; çağrıldığında generate() mock'a düşer.
    """
    raise NotImplementedError("Gemini entegrasyonu Sprint 3'te bağlanacak.")
