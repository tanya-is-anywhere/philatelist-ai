# PhilatelistAI

Веб-сервис для мгновенного распознавания и оценки стоимости почтовых марок на фото с помощью искусственного интеллекта.

Проект представляет собой монорепозиторий, включающий клиентскую часть (Frontend), серверную часть (Backend) и модуль машинного обучения (AI/ML).

---

## Основные возможности (MVP)
- **Загрузка изображений:** Поддержка drag-and-drop и загрузки фото с камеры.
- **Детекция объектов:** Автоматический поиск и выделение (bounding boxes) всех марок на фото.
- **Поиск по базе:** Идентификация марок с помощью извлечения эмбеддингов и векторного поиска по эталонной базе.
- **Мгновенная оценка:** Вывод ориентировочной стоимости каждой марки и итоговой суммы.
- **Личная коллекция:** Сохранение распознанных марок в личный кабинет пользователя.
- **Безопасность:** JWT-аутентификация (с refresh-токенами), защита от CSRF и интеграция hCaptcha.

---

## Полный стек технологий

### Frontend (Клиентская часть)
- **Ядро:** React, TypeScript, Vite
- **Архитектура:** Feature-Sliced Design (FSD)
- **Маршрутизация:** React Router DOM
- **Состояние и данные:** TanStack Query (React Query), Zustand
- **Сеть:** Axios
- **Тестирование и моки:** MSW (Mock Service Worker), Vitest, React Testing Library

### Backend (Серверная часть)
- **Язык и фреймворк:** Python 3.10+, FastAPI, Uvicorn
- **Валидация:** Pydantic
- **База данных:** PostgreSQL, SQLAlchemy (ORM), Alembic (миграции), PgVector (векторный поиск)
- **Обработка файлов:** Pillow, aiofiles
- **Безопасность:** PyJWT, passlib[bcrypt], fastapi-csrf-protect, hCaptcha (через httpx)
- **Тестирование:** Pytest, httpx

### AI / ML Модуль
- **Детекция марок:** Ultralytics (YOLOv8 / YOLO11)
- **Извлечение признаков:** PyTorch, DINOv2 / CLIP / ResNet (Metric Learning)
- **Обработка изображений:** OpenCV (cv2), NumPy
- **Поиск:** PgVector (Similarity Search)

### Инфраструктура
- Docker, Docker Compose
- Git, GitHub

---

## Структура проекта

```text
philatelist-ai/
├── frontend/              # Клиентская часть (Vite + React + FSD)
├── backend/               # Серверная часть (FastAPI + SQLAlchemy)
│   ├── app/ai/            # Модуль ИИ (YOLO, эмбеддинги, поиск)
│   ├── app/api/           # Эндпоинты API (v1)
│   ├── app/core/          # Конфигурация, безопасность (JWT)
│   ├── app/db/            # Модели БД и схемы Pydantic
│   └── tests/             # Тесты бэкенда
├── docker-compose.yml     # Конфигурация Docker для БД (PostgreSQL + PgVector)
└── README.md