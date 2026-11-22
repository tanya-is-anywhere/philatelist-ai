\# Приёмка Этапа 1 — чеклист QA



Проверяется \*\*вручную\*\* через Swagger UI / DBeaver. Код бэкенда не меняем.



\## 1. Инфраструктура

\- \[ ] `docker compose up -d` поднимает `postgres` без ошибок

\- \[ ] `docker compose ps` — контейнер `postgres` в статусе `healthy`

\- \[ ] В DBeaver подключение к БД успешно

\- \[ ] В БД установлено расширение `vector`: `SELECT extname FROM pg\\\_extension;` → содержит `vector`



\## 2. Backend — базовый запуск

\- \[ ] `uvicorn app.main:app --reload` стартует без traceback

\- \[ ] `GET /health` → `200 OK`, тело `{"status": "ok"}` (или как согласовано)

\- \[ ] `GET /docs` → Swagger UI открывается

\- \[ ] `GET /openapi.json` → валидный JSON



\## 3. Backend — подключение к БД

\- \[ ] При старте приложения нет ошибок подключения SQLAlchemy к Postgres

\- \[ ] В логах нет `OperationalError` / `asyncpg` таймаутов



\## 4. Frontend (только визуальная проверка, код не трогаем)

\- \[ ] `npm run dev` запускается

\- \[ ] Главная страница открывается без ошибок в консоли браузера

\- \[ ] На странице отображается статус сервера (результат запроса к `/health`)



\## 5. Связка Frontend ↔ Backend

\- \[ ] В DevTools → Network виден `GET` запрос на бэкенд (например, `/health`) → `200`

\- \[ ] CORS настроен корректно: нет ошибок `CORS policy` в консоли



\## 6. Definition of Done Этапа 1

\- \[ ] Клонирование на чистую машину + 3 команды (docker / backend / frontend) → работает

\- \[ ] Нет ошибок в консоли браузера и в логах бэкенда

