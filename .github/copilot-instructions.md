## Quick orientation for AI contributors

This repository contains a Next.js frontend and a NestJS backend. The goal of this file is to give an AI coding agent the minimal, concrete context needed to be productive immediately.

- Frontend: `biz-forecaster-frontend/` — Next.js app (app directory), React components in `components/`, auth wiring in `context/AuthContext.tsx`, Firebase client setup in `lib/firebase.ts`.
- Backend: `biz-forecaster-api/` — NestJS project. Entry and DI wiring live under `src/` (see `src/main.ts`, `src/app.module.ts`). Domain modules are top-level folders under `src/` (for example `src/users/`, `src/tenants/`, `src/biz_forecasts/`).

Key dev commands (run from repo root or the package folder):

- Frontend (dev): `cd biz-forecaster-frontend && npm run dev` — serves Next.js on :3000.
- Frontend (build/start): `npm run build` / `npm run start` in `biz-forecaster-frontend`.
- Backend (dev): `cd biz-forecaster-api && npm run start:dev` — NestJS in watch mode.
- Backend (build): `npm run build` in `biz-forecaster-api` (produces `dist/`).
- Backend tests: `npm run test` (unit), `npm run test:e2e` (e2e), `npm run test:neon` / `npm run test:node-pg` for DB connectivity experiments.
- DB tooling: `npm run typeorm` uses TypeORM CLI (run from `biz-forecaster-api`).
- Seed: `npm run seed` to run `src/seed.ts`.

Important files and patterns (concrete references):

- Backend DI and module layout: `biz-forecaster-api/src/app.module.ts` (imports modules), controllers under `*/*.controller.ts`, services under `*/*.service.ts`, DTOs under `*/dto/`, and entities under `*/*.entity.ts`.
- Database config / migrations: `biz-forecaster-api/src/data-source.ts` and `biz-forecaster-api/postgres.js` (project contains a few DB helpers and test harnesses like `test-neon.ts`).
- Firebase Admin integration: `biz-forecaster-api/src/firebase/firebase.service.ts` — initialization reads `FIREBASE_SERVICE_ACCOUNT_JSON` (environment variable). Note: there are commented diagnostic lines in this file that temporarily disable init; check this before changing runtime behavior.
- Logging: `biz-forecaster-api/src/logger.config.ts` and `src/console.logger.ts` plus Winston integration (`nest-winston`).

Conventions and gotchas specific to this repo

- Nest module pattern: modules are feature-scoped folders (e.g., `users`, `tenants`) with `*.controller.ts`, `*.service.ts`, `*.module.ts`. Prefer updating/adding files inside the feature folder.
- Repositories and TypeORM: entities are colocated inside feature folders and injected via `@InjectRepository(...)`. Changes to entities may require running the TypeORM CLI or migrations.
- Environment-driven secrets: Firebase admin credentials are read from `FIREBASE_SERVICE_ACCOUNT_JSON`. Do not commit or expose secrets — use environment variables or the existing `firebase/firebase.service.ts` pattern.
- Multiple package.json files: there are package manifests in `biz-forecaster-frontend/`, `biz-forecaster-api/` and a `src/package.json` inside the backend source tree — use the top-level package for each project when running scripts.
- Tests use Jest and ts-jest with `rootDir: src` for the backend — when adding tests place them under `src/.../*.spec.ts`.

Recommended small-scope workflow for AI edits

1. Locate the feature folder under `biz-forecaster-api/src/<feature>/` or `biz-forecaster-frontend/`.
2. Make a single focused change (example: add validation to `src/users/create-user.dto.ts` or fix a controller route). Keep PRs small (<200 LOC).
3. Run the relevant local command: `npm run build` (backend) and `npm run dev` (frontend) and run `npm run test` for unit tests.
4. If the change touches DB entities, run TypeORM CLI or update migration scripts; for quick verification use `npm run test:neon` or the provided small DB scripts.

What AI agents should not do automatically

- Do not modify or commit secrets (including any `firebase-service-account.json` files). Use env vars.
- Avoid large cross-cutting refactors without human review. Prefer small, incremental changes and include tests.

Where to look for examples

- User patterns: `biz-forecaster-api/src/users/` (entity, controller, service, DTOs) — canonical example for Nest features.
- Integration examples: `biz-forecaster-api/src/activities/` and `src/notifications/` show common controller-service-entity flows.
- Frontend auth flow: `biz-forecaster-frontend/context/AuthContext.tsx` and `biz-forecaster-frontend/lib/firebase.ts` show how the frontend consumes Firebase and user state.

If you're unsure, ask for clarification and propose a tiny PR that runs tests locally.

Please review and tell me which areas you want expanded (migrations, CI scripts, release/deploy notes, or security checklist).
