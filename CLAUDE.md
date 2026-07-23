# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # build + watch (dev, English only)
yarn build        # full production build (all 6 locales: en, es, fr, ar, ru, zh)
yarn lint         # run ESLint on app/
yarn lint:fix     # run ESLint with auto-fix
yarn typecheck    # vue-tsc type-check (no emit)
node server.js    # start Express server (requires env vars below)
```

Required env vars for the server: `CLEARINGHOUSE` (`ABS` or `BCH`) and `CLEARINGHOUSE_HOST` (e.g. `absch.local`).

Service-level tests run with vitest:

```bash
yarn vitest              # run test suite (test/**/*.spec.ts)
yarn vitest run          # single run (no watch)
```

UI validation is done manually via the browser — there are no component or e2e tests.

## Architecture

### Hybrid AngularJS + Vue 3

The app is an AngularJS 1.x SPA that uses [`@scbd/angular-vue`](https://github.com/scbd/angular-vue) to embed Vue 3 components into AngularJS templates. Vue components are registered and consumed as AngularJS directives via `VueRegistry` / `NgVueDirective`. New UI work is written as Vue 3 SFCs; AngularJS hosts the routing, auth, and legacy views.

**Critical pitfalls in the hybrid layer** (recorded from production issues):
- Do not use `defineAsyncComponent` — it breaks silently.
- No fragments (multiple root nodes) in Vue components used as AngularJS directives.
- Avoid TypeScript-only operators (`!`, `as`, `??=`) directly in Vue template expressions.

### Build pipeline

Rollup compiles `app/boot.js` into AMD bundles under `dist/{locale}/`. Vue SFCs are processed by `rollup-plugin-vue`. The output is AMD/RequireJS, consumed by the browser at runtime via the CDN-loaded RequireJS. Static assets and widgets get their own simpler bundles (`assets/widgets.js`, `assets/legacy-ajax-plugin.js`).

### Key directory layout

| Path | Purpose |
|---|---|
| `app/app.js` | AngularJS module root — all module declarations and config blocks |
| `app/boot.js` | Rollup entry point; wires RequireJS and CDN bundle URLs |
| `app/routes/` | Route definitions per clearinghouse (`absch.js`, `bch.js`, `chm.js`) |
| `app/api/` | **All HTTP calls live here** — never inline API calls in components |
| `app/services/` | AngularJS services + Vue composables (`composables/`) |
| `app/components/` | Vue 3 SFCs, grouped by feature area |
| `app/views/` | AngularJS HTML templates for full page views |
| `app/app-text/` | i18n translation files — flat keys, path mirrors source path |
| `app/types/` | Global TypeScript types |

### Clearinghouse duality

The same codebase serves three clearing-houses: **ABSCH** (Access and Benefit-Sharing), **BCH** (Biosafety), and **CHM** (Clearing-House Mechanism). A deployment serves exactly one, selected by the `CLEARINGHOUSE` env var; route files and some components branch on it.

### Domain and migration glossary

See [`CONTEXT.md`](CONTEXT.md) at the repo root for authoritative definitions of domain terms (Clearing-House, Realm, Record, Schema, Register) and architecture language (Bridge, VueRegistry, View, Route table, Service inversion, Flip, Ratchet, Migration unit).

### Migration to Vue 3

The codebase is mid-migration from AngularJS to a pure Vue 3 app. See [`docs/MIGRATION-PLAN.md`](docs/MIGRATION-PLAN.md) and [`docs/adr/`](docs/adr/) for the strategy and decisions.

**Ratchets — apply to all new code:**
- No new AngularJS directives, controllers, or components.
- No new Vue forms that wrap an ng km-control through the Bridge.
- No new `$injector` escapes in Vue code.
- Feature work that touches an ng view should migrate it to Vue rather than patch it.
- Every newly inverted service or filter ships with vitest tests in the same PR.

## Guardrails (Karpathy) — always on

**1. Think before coding.** State assumptions explicitly. If multiple interpretations exist, present them — don't pick silently. If a simpler approach exists, say so. If something's unclear, stop and ask.

**2. Simplicity first.** Minimum code that solves the problem. No features beyond what was asked, no speculative abstractions, no "flexibility" nobody requested, no error handling for impossible cases. If 200 lines could be 50, rewrite it. Ask: "would a senior engineer call this overcomplicated?"

**3. Surgical changes.** Touch only what the ticket needs. Don't "improve" adjacent code, don't refactor things that aren't broken, match existing style. Remove only the orphans *your* change created; mention pre-existing dead code, don't delete it. Every changed line should trace to the request.

**4. Goal-driven execution.** Turn the task into a verifiable goal. "Fix the bug" → "write a test that reproduces it, then make it pass." For multi-step work, state a short plan with a `verify:` check per step.

Full text: https://github.com/multica-ai/andrej-karpathy-skills/blob/main/skills/karpathy-guidelines/SKILL.md

## Naming conventions

Applies across the SCBD platform — follow consistently in both JS and TS files:

- **Variables/functions:** camelCase. **Classes:** PascalCase. **Constants:** `UPPER_SNAKE_CASE`. **Files/dirs:** kebab-case.
- **Function semantics:** `get*` throws if not found; `find*` returns null; `search*`/`list*` return arrays; `is*`/`has*` return boolean.
- **API payloads:** fields in camelCase; `_`-prefixed fields are computed (not queryable, except `_id`).

## Git workflow

- Branch naming: `<type>/<ticket-id>-<short-desc>` (e.g. `feature/ABS-123-bulk-import`, `bugfix/ABS-456-fix-preview`).
- Commits follow Conventional Commits, imperative mood, ≤ 72 chars.
- GitHub Flow: branch → PR → squash-merge → delete branch. `master` is protected.
- Every non-trivial PR should link a pre-existing Jira ticket. Hotfixes and trivial changes (typos, dependency bumps) are exempt.

## How we work

Surface design decisions before coding. If you are about to make a non-trivial design choice the human hasn't seen, stop and present the options rather than picking silently. For significant features, ask the human to run `/grill-with-docs` before starting implementation.

If a change contradicts a prior decision, acknowledge it explicitly ("contradicts the previous approach because…") rather than silently diverging.

## Code conventions

- All emits prefixed with `on` (`onClose`, `onConfirm`); bind with `@on-*`. `v-model` `update:*` events are exempt.
- `<script setup>` block order: imports → types → props → emits → other `define*` → composables → vars → computed → event handlers → local functions.
- Use `if/else {}` instead of ternary for anything non-trivial. Ternary only for simple one-liners.
- No one-attribute-per-line in Vue templates (`vue/max-attributes-per-line` is off); group attributes logically.
- Global types go in `app/types/`; tests (when they exist) mirror source structure under `test/`; fixtures live alongside tests.
- Do **not** use static class fields — Babel's output stage cannot parse them. Use module-level `let x: T | null = null` instead.
- Recorded conventions are standing instructions — fix violations when encountered without asking.
