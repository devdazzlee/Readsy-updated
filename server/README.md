# Readsy Backend (Node / Express)

Separate API server for AI chat and book-idea analysis. OpenAI keys stay here, not in the Next.js app.

## Setup

```bash
cd server
yarn install
cp .env.example .env
# add OPENAI_API_KEY to .env
yarn dev
```

Runs on `http://localhost:4000` by default.

## Endpoints

- `GET /health`
- `POST /api/chat` body: `{ messages: [{ role, content }] }`
- `POST /api/book-idea` body: `{ idea, genre? }`
- `POST /api/book-blueprint` body: `{ idea, genre?, goal?, tone? }`

## Guards

- Service-only system prompts (Readsy publishing topics)
- Rate limits (chat 10/min, book-idea 6/min)
- Input length limits + jailbreak keyword block
- CORS locked to `CORS_ORIGIN`
- Helmet security headers
