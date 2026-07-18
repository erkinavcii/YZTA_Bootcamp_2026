"""HealRoute AI — FastAPI uygulaması (Sprint 2, mock mod).

Çalıştırma:  uvicorn app.main:app --reload
"""
from dotenv import load_dotenv

load_dotenv()  # .env'i router/servis importlarından ÖNCE yükle (USE_GEMINI okunur)

from fastapi import FastAPI  # noqa: E402
from fastapi.middleware.cors import CORSMiddleware  # noqa: E402

from .routers import chat  # noqa: E402
from .services import llm  # noqa: E402

app = FastAPI(title="HealRoute AI API", version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)


@app.get("/health")
def health():
    return {"status": "ok", "mode": "gemini" if llm.USE_GEMINI else "mock"}
