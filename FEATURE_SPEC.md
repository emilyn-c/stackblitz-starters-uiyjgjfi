# Feature: Ticket search, filters and quick status change

You have about **35 minutes**. You will not be judged on finishing everything.
We care more about how you design it, what trade-offs you make and how you talk about it.
Think out loud, ask questions, and tell us what you would do with more time.

## Context

The Ticket Board lists support tickets. The list is currently loaded once and shown as is.
The backend is faked in `src/app/tickets/ticket-api.ts` (treat it as a real HTTP API):

- `TicketApi.list(query, signal?)` filters **on the server** (`search` matches the title, case-insensitive, plus `status` and `priority`).
- `TicketApi.updateStatus(id, status, signal?)` changes a ticket's status and returns the updated ticket.
- Response times are random (150 to 1200 ms), so responses can arrive in a different order than the requests were sent.
- Searching for `boom` always makes `list()` fail with a 500. Updating the status of `T-007` always fails with a 500.

State management uses **NgRx SignalStore** (`ticket.store.ts`). Prefer signals; use RxJS only if you have a good reason.

## Requirements

### 1. Search
Add a text input that filters tickets by title, using the **server-side** `search` parameter.
- Typing must not fire a request on every keystroke.
- An older, slower response must never overwrite the result of a newer search.

### 2. Status and priority filters
Add a status filter and a priority filter (both with an "All" option). Filters combine with the search text.

### 3. URL is the source of truth
Search text and both filters must live in the URL query params (for example `/?q=login&status=open&priority=urgent`).
- Reloading the page or sharing the link restores the same view, including the input values.
- Browser back/forward should behave sensibly. Think about what should and should not create history entries.
- The URL is user input. Unknown or invalid values must not break the page.

### 4. Quick status change
Replace the status badge in each row with a dropdown that changes the ticket's status.
- The UI updates **immediately** (optimistic update).
- If the API call fails, **roll the change back** and show the user an error message.

### 5. Loading, empty and error states
- Show a loading indicator while tickets are being fetched.
- Show a helpful empty state when no ticket matches the current filters.
- Show an error state when loading fails (searching for `boom` is an easy way to see it), with a way to retry.

## Stretch goals (only if you have time)

- A unit test for the status-change rollback.
- Make the status dropdown fully keyboard and screen-reader friendly.
- Anything in the existing code that you think should be improved. Tell us what you would change, even if you do not have time to change it.

## Ground rules

- Standalone components, signals, built-in control flow (`@if`, `@for`), plain CSS. No UI libraries.
- Run the app with `npm start`, the tests with `npm test`.
- You may use your own editor, documentation, web search and AI coding assistants. Share your screen including the assistant, and be ready to explain every line you keep.
