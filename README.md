# ICNA AI Legal Chatbot Backend Slice

This repository has been trimmed to the backend files tied to these responsibilities:

- HyperClova X REST API integration
- AI response flow based on legal and case data
- automatic follow-up question generation
- MongoDB chat history storage and lookup
- backend API and data flow management

## Remaining structure

- `backend/app.js`: Express entrypoint
- `backend/routes/`: chat, session, summary, HyperClova, law, case, precedent summary, and Q&A APIs
- `backend/models/`: MongoDB models for chat/session/summary data
- `backend/utils/`: HyperClova summary helper and legal/case data ingestion scripts
- `backend/insert.js`, `backend/insert2.js`: Q&A import and cleanup scripts

## Removed scope

- frontend code
- auth/signup/login controller and routes
- protected profile routes
- generated `node_modules`
