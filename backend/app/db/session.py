from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Создаем движок (engine). echo=True выводит SQL-запросы в консоль (полезно для отладки)
engine = create_engine(settings.DATABASE_URL, echo=True)

# Создаем фабрику сессий
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Функция-зависимость для FastAPI, которая будет выдавать сессию и закрывать её после запроса
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()