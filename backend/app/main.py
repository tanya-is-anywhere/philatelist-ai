from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.session import engine
from sqlalchemy import text

app = FastAPI(
    title="PhilatelistAI API",
    description="API для распознавания и оценки почтовых марок",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    # Проверяем подключение к БД, выполняя простой запрос
    db_status = "disconnected"
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
            db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"

    return {
        "status": "ok",
        "message": "Сервер PhilatelistAI работает!",
        "database": db_status
    }