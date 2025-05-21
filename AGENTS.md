# Codex Contribution Guide

## Repository Overview
This project powers a web application that presents authentic Islamic hadiths with a modern UI.
The front end is built with Next.js and Tailwind CSS while the `backend/` folder contains a
FastAPI service providing chat and retrieval endpoints.  React components live under `components/`
and the Next.js pages are in `app/`.  Shared utilities are in `lib/` and the Python logic in
`backend/` handles LLM interaction and vector retrieval.

## Directory Guide
- `app/` – Next.js App Router pages and API routes. Edit when changing page layouts or endpoints.
- `backend/` – FastAPI server code. Touch when working on the chat or retrieval backend.
- `components/` – Reusable React components. Update when adding UI elements.
- `lib/` – TypeScript and JS utility functions.
- `content/` – JSON and markdown data files. Avoid editing unless updating content.
- `public/` – Static assets (images, fonts). Do not modify generated files here.
- `styles/` – Global CSS and Tailwind theme definitions.
- `__tests__/` – Vitest unit tests for the front end.

## Environment Setup
The universal image ships with:
- Python 3.11.12 via `pyenv` (3.10, 3.12 and 3.13 also available)
- Node.js 22.15.1 with `npm` 11 and `nvm` 0.40.2
- `uv 0.7.5` and `poetry 2.1.3`

Install dependencies with:
```bash
uv pip install -e ".[test]"
npm install
```

## Lint / Test / Type‑Check Workflow
Run the following before every commit:
```bash
ruff check
black --check .
pytest
mypy
pyright
npm run lint
npm run test
```
All checks must succeed locally and in CI before a PR is merged.

## Contribution Rules
- Follow the TypeScript conventions in `cursorrules.md` (functional components, named exports, etc.).
- Use short, imperative commit messages (`feat:`, `fix:`, `docs:`). Wrap lines at 72 characters.
- PR titles should mirror the commit style, e.g. `feat: add quran search api`.
- Keep changes focused; split large refactors into smaller PRs.

## Agent‑Specific Guidance
Codex should operate mainly in `app/`, `backend/`, `components/`, `lib/` and `__tests__/`.
Avoid modifying `public/`, `content/` or other generated assets.
Always run the full lint and test suite before presenting a diff.
