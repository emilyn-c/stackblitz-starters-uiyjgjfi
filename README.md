# Ticket Board

A small Angular 21 app used for a live coding session.

**Stack:** Angular 21 (standalone, zoneless, signals) · NgRx SignalStore · Vitest · plain CSS

## Setup (please do this before the interview)

```bash
npm install
npm test -- --watch=false   # should show 12 passing tests
npm start                   # http://localhost:4200
```

Requires Node.js 20.19+, 22.12+ or 24+. If anything does not work, tell us **before** the session.
Please do **not** start on the feature in advance. The task is in [`FEATURE_SPEC.md`](./FEATURE_SPEC.md).

## Layout

```
src/app/
  app.ts, app.routes.ts, app.config.ts
  tickets/
    ticket.model.ts          Ticket types
    ticket-api.ts            Fake backend (pretend it is a real HTTP API)
    ticket-api.config.ts     Latency / failure knobs for the fake backend
    ticket-api.testing.ts    Instant fake backend for unit tests
    ticket.store.ts          NgRx SignalStore
    ticket-board.*           The page component
    *.spec.ts                Existing tests, follow their conventions
```
