# AGENTS.md

Guidance for Agents when working in this repository.

## Why this exists

absch.cbd.int is the SCBD **clearing-house web front end** — a single codebase,
mid-migration from AngularJS 1.x to Vue 3, that serves three CBD clearing-houses:
**ABSCH** (Access and Benefit-Sharing), **BCH** (Biosafety), and **CHM**
(Clearing-House Mechanism). A deployment serves exactly one, selected at server
start by the `CLEARINGHOUSE` env var.

## How we work here

A human decides before code exists. If you (the agent) are about to make a design
decision the human hasn't seen, **stop and surface it** instead of coding past it.

- For any non-trivial feature, the human runs `/grill-with-docs` first. Don't start
  implementation from a vague request — ask for the grilled design.
- Surface design decisions before coding: if multiple interpretations exist, present
  the options rather than picking silently.
- Every non-trivial PR must link a Jira ticket that **already existed before the
  branch**. Hotfixes and trivial changes (typos, dependency bumps) are exempt.
- If a change contradicts a prior decision, acknowledge it explicitly ("contradicts
  the previous approach because…") rather than silently diverging. When that decision
  is recorded as an ADR, cite it by number (e.g. "Contradicts ADR-0002 (service
  inversion) because…").

## Guardrails (Karpathy) — always on

**1. Think before coding.** State assumptions explicitly. If multiple interpretations exist, present them — don't pick silently. If a simpler approach exists, say so. If something's unclear, stop and ask.

**2. Simplicity first.** Minimum code that solves the problem. No features beyond what was asked, no speculative abstractions, no "flexibility" nobody requested, no error handling for impossible cases. If 200 lines could be 50, rewrite it. Ask: "would a senior engineer call this overcomplicated?"

**3. Surgical changes.** Touch only what the ticket needs. Don't "improve" adjacent code, don't refactor things that aren't broken, match existing style. Remove only the orphans *your* change created; mention pre-existing dead code, don't delete it. Every changed line should trace to the request.

**4. Goal-driven execution.** Turn the task into a verifiable goal. "Fix the bug" → "write a test that reproduces it, then make it pass." For multi-step work, state a short plan with a `verify:` check per step.

Full text: https://github.com/multica-ai/andrej-karpathy-skills/blob/main/skills/karpathy-guidelines/SKILL.md

**Repo-specific guardrails:**

- **Hybrid-layer pitfalls** (recorded from production issues — see Architecture): no `defineAsyncComponent`, no fragments (multiple root nodes) in Vue components used as AngularJS directives, no TypeScript-only operators (`!`, `as`, `??=`) in Vue template expressions.
- **No static class fields** — Babel's output stage can't parse them; use module-level `let x: T | null = null`.
- **All HTTP calls live in `app/api/`** — never inline API calls in components.

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

## Tests

There is **no automated test suite wired up yet** — `vitest` is not installed and
there are no spec files. UI validation is done manually via the browser.

The migration plan intends **vitest** as services and filters are inverted to Vue:
new service-level tests go under `test/**/*.spec.ts` and ship in the same PR (see
the migration ratchet under *Architecture*). Wire up vitest before relying on a
`yarn vitest` command.

## SCBD agent suite

This repo uses the [`scbd/agents`](https://github.com/scbd/agents) skill suite
(`/scbd-agent-workflow`, `-plan`, `-implement`, `-review`, `-jira`, `-github`,
`-screenshot`). See that repo's README for the full workflow.

scbd_plan_dir: docs/plans

**Component is ticket-scoped** in this repo — a ticket may target one or more of
`ABSCH`, `BCH`, `CHM`, and sometimes only one. There is intentionally **no single
`scbd_component` default**; pass `component=<value>` per invocation to match the
ticket's scope (e.g. `/scbd-agent-workflow CHM-958 component=CHM`). Issue-mode runs
against a specific ticket (e.g. `/scbd-agent-implement ticket=CHM-958`) don't need a
component at all.

**Jira:** tickets live in Jira projects (e.g. **CHM**) whose workflows use **custom
transitions** distinct from the SCBD/DEV flow assumed by `scbd-agent-jira`. Do not
assume `IN PROGRESS → PEER REVIEW → Completed` — look up the real transitions per
ticket (`getTransitionsForJiraIssue`) before transitioning, and map to the closest
matching state.

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

**Consuming the domain docs:**
- Before working in an area, read [`CONTEXT.md`](CONTEXT.md) and any [`docs/adr/`](docs/adr/) that touch it. If a file doesn't exist, proceed silently — don't flag its absence or suggest creating it; `/grill-with-docs` produces these lazily as terms and decisions get resolved.
- When your output names a domain concept (issue title, proposal, hypothesis, test name), use the term as defined in `CONTEXT.md`; don't drift to synonyms it avoids. If a concept isn't in the glossary, that's a signal — either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/grill-with-docs`).
- If your change contradicts an ADR, surface it explicitly and cite it by number (e.g. "Contradicts ADR-0002 (service inversion) because…") rather than silently overriding.

### Migration to Vue 3

The codebase is mid-migration from AngularJS to a pure Vue 3 app. See [`docs/MIGRATION-PLAN.md`](docs/MIGRATION-PLAN.md) and [`docs/adr/`](docs/adr/) for the strategy and decisions.

**Ratchets — apply to all new code:**
- No new AngularJS directives, controllers, or components.
- No new Vue forms that wrap an ng km-control through the Bridge.
- No new `$injector` escapes in Vue code.
- Feature work that touches an ng view should migrate it to Vue rather than patch it.
- Every newly inverted service or filter ships with vitest tests in the same PR.

## Standards

Full reference: [software-development-standards.md](https://github.com/scbd/documentation/blob/master/devops/software-development-standards.md)

### Naming conventions

Applies across the SCBD platform — follow consistently in both JS and TS files:

- **Variables/functions:** camelCase. **Classes:** PascalCase. **Constants:** `UPPER_SNAKE_CASE`. **Files/dirs:** kebab-case.
- **Function semantics:** `get*` throws if not found; `find*` returns null; `search*`/`list*` return arrays; `is*`/`has*` return boolean.
- **API payloads:** fields in camelCase; `_`-prefixed fields are computed (not queryable, except `_id`).

### Code conventions

- All emits prefixed with `on` (`onClose`, `onConfirm`); bind with `@on-*`. `v-model` `update:*` events are exempt.
- `<script setup>` block order: imports → types → props → emits → other `define*` → composables → vars → computed → event handlers → local functions.
- Use `if/else {}` instead of ternary for anything non-trivial. Ternary only for simple one-liners.
- No one-attribute-per-line in Vue templates (`vue/max-attributes-per-line` is off); group attributes logically.
- Global types go in `app/types/`; tests (when they exist) mirror source structure under `test/`; fixtures live alongside tests.
- Do **not** use static class fields — Babel's output stage cannot parse them. Use module-level `let x: T | null = null` instead.
- Recorded conventions are standing instructions — fix violations when encountered without asking.

### Git workflow

- Branch naming: `<username>/<type>/<ticket-id>-<short-desc>` (e.g. `blaise/feat/CHM-958-add-lab-link`, `blaise/bug/CHM-456-fix-preview`). Branch from `origin/master` unless another base is named. This **overrides** `scbd-agent-github`'s default `feature/<ticket-key>-<slug>` naming — create branches with the repo convention rather than the suite default.
- Commits follow Conventional Commits, imperative mood, ≤ 72 chars.
- GitHub Flow: branch → PR → squash-merge → delete branch. `master` is protected.
- Every non-trivial PR should link a pre-existing Jira ticket. Hotfixes and trivial changes (typos, dependency bumps) are exempt.

## Agent skills

- **Domain docs** — single-context: [`CONTEXT.md`](CONTEXT.md) at the repo root is the glossary and [`docs/adr/`](docs/adr/) holds decisions. See *Consuming the domain docs* under Architecture. (Gaia's multi-context `CONTEXT-MAP.md` model does not apply here.)
- **Issue tracker** — issues and PRDs live in Jira, read/written via the Atlassian MCP; GitHub holds code/PRs only. The matt-pocock issue-tracker helper (`docs/agents/issue-tracker.md`) is generated by `/setup-matt-pocock-skills` when needed.
