# Phase 2 — Extract a framework-agnostic core

## Problem Statement

As a developer migrating toward all-Vue3, the most expensive recurring cost is that **business logic is married to AngularJS**. The repo has ~226 `.filter` registrations, ~35 factories, and assorted services that mix three different concerns in one place: pure logic, AngularJS dependency-injection plumbing, and I/O. Concrete evidence:

- `app/services/datetime.js`, `app/services/getFieldName.js`, and `app/services/filters/arrays.ts` are **already pure functions** — proof the seam exists, but they live among framework code and are imported ad hoc.
- `app/services/filters.js` (319 lines) tangles pure logic with DI and API calls — e.g. the `uniqueID` filter pulls in `IStorage`, `$filter`, `$q`, `commonjs`, `realm`, `appConfigService`, and instantiates `RealmApi`. The same file contains `findString`, a pure function with a dead loop (`for(i=0; i>arr.count(); …)` never executes and `arr.count()` is not an array method) — dead logic hiding inside framework code.
- Filters are scattered across `services/`, `components/scbd-angularjs-controls/`, `components/scbd-branding/`, and `views/directives/`.

Because this logic is expressed in Angular idioms, **none of it survives a port to Vue**. Every screen migrated re-derives formatting/query/domain logic that already exists, which turns a strangler migration into a series of small rewrites — error-prone and untestable (the repo has zero tests).

## Solution

Establish a **framework-agnostic core**: a set of TypeScript modules under `app/core/` that depend on neither AngularJS nor Vue. Logic moves *into* the core; the framework shells become thin adapters that call it.

- A pure formatter (`formatDate`, `formatCountry`, …) lives in `core/`. The AngularJS `.filter` becomes a one-line adapter that calls the core function; the Vue side imports the core function directly (wrapped in a composable only when reactivity is needed).
- The data layer from Phase 1 (single axios client + typed domain contracts) is the **I/O tier of the same core** — framework-agnostic, but allowed to do network I/O. Everything else in core is pure.
- An ESLint import-boundary rule enforces the fence: nothing under `core/` may import `angular`, `vue`, `~/app`, or `$`-injected services. This is the architectural fitness function that keeps the core from re-rotting.
- Because core modules are pure, they become the **first unit-tested code in the repo** (Vitest). The seam where logic concentrates is the seam we test.

This is deliberately incremental and behavior-preserving: old import paths keep working via re-export shims, so extracting a module never forces a sweep of its importers in the same commit.

## Target module layout

```
app/core/
  format/        # ex-"filters": dates, strings, lstring, arrays, field names
  domain/        # typed contracts: Record, Realm, Forum, Article, Thesaurus term
  search/        # Solr query building (pure), separate from I/O
  schema/        # download-schemas / field-name resolution
  api/           # Phase-1 single client + per-resource classes (I/O tier)
  i18n/          # one t() over one catalog (later; stubbed here)
  index.ts       # barrel re-exports
```

Rules for `core/`:
- No import of `angular`, `vue`, `~/app`, jQuery, or any `$`-injected Angular service.
- Pure tiers (`format`, `domain`, `search`, `schema`) do no I/O.
- `api/` may do network I/O via the single client, nothing else.
- Everything is `.ts` going forward; existing `.js` may move as-is and be typed later.

## Commits

Each commit leaves the app building and working. Verification = build green + the affected screens smoke-tested; for extracted logic, an **output snapshot** of the function before vs after (same inputs → same outputs) is the contract. Pure modules additionally get Vitest unit tests in the same commit.

**Commit 0 — erect the fence.** Create `app/core/` with an empty `index.ts`. Add a Vitest config (first test harness in the repo). Add an ESLint rule (e.g. `no-restricted-imports` / boundaries) forbidding `angular`, `vue`, `~/app`, and `$`-service imports under `core/`. No logic moved yet. Build + lint green.

**Commit 1 — relocate the already-pure modules (no logic change).** Move `services/datetime.js`, `services/getFieldName.js`, `services/filters/arrays.ts`, and `services/filters/lstring.js` into `core/format/` (and `getFieldName` into `core/schema/`). Leave a one-line re-export shim at each old path so existing importers are untouched. Add Vitest tests asserting current output. Build + smoke.

**Commit 2 — type the relocated modules.** Convert the moved `.js` to `.ts`, add input/output types from `core/domain/`. Pure type work, no behavior change. Tests still pass.

**Commits 3–N — extract one formatting filter at a time.** For each Angular formatting filter (start with the stateless/DI-free ones — date, string, lstring, numeric formatters):
1. Lift its pure kernel into `core/format/` with a unit test snapshotting current behavior.
2. Rewrite the `.filter(...)` registration as a thin adapter that calls the kernel.
3. Smoke the screens that use that filter.
One commit per filter (or per tight group). Filters that are inseparable from DI/state (e.g. `uniqueID`, which caches and calls `RealmApi`) are **left registered as-is** for now and tagged for a later pass.

**Commit (cleanup, as encountered) — remove dead logic.** When extraction surfaces provably-dead code that is *the thing being extracted* (e.g. `findString`'s never-executing loop), delete it with a note in the PR. Do not remove unrelated dead code in the same commit.

**Commits — extract pure query/schema logic.** Split the pure Solr query-building out of `services/search-service.js` into `core/search/` (leave the stateful/Angular parts behind, calling the new pure builder). Move `app-data/*/download-schemas` resolution behind `core/schema/`. Unit-test the query builder against representative inputs.

**Commits — expose core to the Vue side.** Replace Vue-side ad-hoc re-implementations of formatting/query logic with imports from `core/`, wrapping in a composable only where reactivity is required. One commit per component group.

## Decision Document

- **`core/` has zero framework dependency**, enforced by an ESLint import-boundary rule (the fitness function). This is the defining constraint.
- **Core is allowed I/O only in `core/api/`** (the Phase-1 client); all other tiers are pure.
- **Old import paths stay alive via re-export shims** during the transition, so relocating a module never forces a same-commit sweep of its importers.
- **Adapter pattern at the framework edge:** Angular `.filter`/factory becomes a thin call into core; Vue imports core directly (composable only when reactive state is involved).
- **TypeScript for the core.** Existing `.js` may move first and be typed in a follow-up commit; new core code is `.ts`.
- **Stateful/DI-coupled filters are deferred,** not forced into core. Only logic that is genuinely pure (or pure after a mechanical split) moves now.
- **No rendering, components, routing, bridge, or build-system changes** in this phase.

## Testing Decisions

- **What makes a good test:** assert external behavior only — given inputs, the function returns the same outputs it returns today. Snapshot the *current* output first, then refactor to keep it green. Do not assert on internal structure, call order, or how the value is computed.
- **Modules tested:** every module that lands in `core/` (format, schema, search query builder, domain type guards). These are pure, so they need no DOM or framework — they are the natural first unit tests.
- **Prior art:** none — this phase introduces the first `*.spec.*` files and the Vitest harness (Commit 0). It establishes the pattern subsequent phases reuse.
- **Framework adapters** (the thin `.filter`/composable wrappers) are covered by the existing manual/smoke verification, not unit tests — they contain no logic.

## Out of Scope

- Migrating components/directives or any rendering (the view-layer strangler phase).
- The `@scbd/angular-vue` bridge, routing-as-data, Pinia state, i18n unification, and the Vite/build migration (separate phases).
- Stateful or DI-heavy filters/factories that cannot be made pure by a mechanical split — tagged for a later, dedicated pass.
- The 108 AngularJS `$http` sites (Phase 1 / view-layer territory).
- Removing unrelated pre-existing dead code not on the extraction path.

## Further Notes

- This is **Phase 2** of the strangler migration and the highest-leverage structural move: it is what makes every later component port *mechanical* (move rendering) rather than a *rewrite* (re-derive logic).
- Sequencing: it pairs naturally after **Phase 1** (the data layer becomes `core/api/`) and before the view-layer migration, because the core is the stable contract components will lean on.
- The ESLint boundary rule is worth landing in Commit 0 even before much code moves — it prevents the core from re-coupling as it grows, and it documents the architecture in an executable form.
- Recommended PR grouping: Commit 0–2 (fence + relocate + type) as one PR to prove the pattern, then one PR per cluster of extracted filters so regressions bisect cleanly.
