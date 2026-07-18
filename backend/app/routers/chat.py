"""Sohbet endpoint'i — POST /api/chat."""
from fastapi import APIRouter

from ..models.schemas import ChatRequest, ChatResponse
from ..services import llm

router = APIRouter(prefix="/api", tags=["chat"])


@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest) -> ChatResponse:
    """Kullanıcı mesajını alır, yanıt + (varsa) TripPlan döner."""
    return llm.generate(req)
