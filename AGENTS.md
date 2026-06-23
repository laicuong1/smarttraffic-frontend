# AGENTS.md — Agent Guidance for the smarttraffic Workspace

Purpose: provide concise, actionable instructions for AI coding agents working on this repository.

Quick summary
- Project: single-page frontend app in `frontend/` (Vite + React).
- Root has minimal deps; real app lives under `frontend/`.

How to run
- Install dependencies from repo root or `frontend/`:

  npm install
  cd frontend
  npm install
  npm run dev

Key scripts (see `frontend/package.json`):
- `npm run dev` — start Vite dev server
- `npm run build` — build production assets
- `npm run lint` — run ESLint

Important files & dirs
- `frontend/src/` — React entry and components
- `frontend/src/components/` — UI components (Alert.jsx, Chart.jsx, Map.jsx)
- `frontend/index.html` — Vite HTML template
- `package.json` (root) — lightweight, no scripts; prefer `frontend/package.json` for tasks

Conventions and constraints
- Frontend uses Vite + React (JSX), target modern browsers.
- ESLint is configured in `frontend/`; run `npm run lint` there.
- Keep changes scoped to `frontend/` unless modifying shared tooling.

Link, don't duplicate
- Refer to existing docs rather than copying them. See `frontend/README.md` if present.

Troubleshooting hints
- If dev server fails, ensure dependencies installed in `frontend/` and Node >= 18.
- Leaflet and React-Leaflet are used; watch for SSR/integration quirks.

Suggested next agent customizations
- Create a task-specific instruction file for frontend tests or linting workflows.
- Add an `AGENT.md` to automate common PR checks (lint/build preview).

Feedback
- Tell me if you want this content moved to `.github/copilot-instructions.md` or expanded.