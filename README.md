# Bilingual Rashin Website Design

Independent bilingual food products catalog website for **Rashin**.

This project does not modify or depend on `Bilingual Corporate Website Design`.

## Structure

- `frontend/`: React + Vite catalog UI
- `backend/`: Python FastAPI prototype API and SQLite-ready architecture
- `docs/`: route, model, and implementation notes

## Run Frontend

```bash
pnpm install
pnpm dev
```

Open `http://127.0.0.1:5174/fa`.

## Run Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The frontend currently uses mock data and is ready to connect to the FastAPI endpoints.
