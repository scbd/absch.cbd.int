## Problem Statement

As a developer working toward the all-Vue3 target, the data/API layer is the foundation every screen routes through — and right now it is fragmented and partly dead. The codebase carries **four HTTP stacks**: `axios` (via `app/api/api-base.js` `ApiBase`, the de-facto standard, ~52 instantiation sites across 10 `api/*` classes), AngularJS `$http` (108 files), `ky` (`app/services/api.js`), and `superagent`. On inspection the last two are effectively dead weight:

- `app/services/api.js` (the entire `ky` stack) has **no live consumer**. Its only apparent importer (`app/components/scbd-angularjs-services/main.js`) actually imports `./services/apiUrl`, a different file. Its exports `addApiOptions`/`toURLSearchParams` are referenced nowhere.
- `superagent` exists only for `import { link } from 'superagent'` in `app/views/directives/document-metadata-vue-directive.js`, where the imported `link` is immediately shadowed by the directive's own `link:` property — a dead import.

Meanwhile the keeper, `ApiBase`, has rough edges: it builds a **new axios instance on every request** (no shared instance / interceptor reuse), duplicates token-header logic that is also reimplemented in a dead helper inside `app/components/kb/article-api.js`, and forces ~52 call sites to hand-wire `new XxxApi({ tokenReader: () => auth.token(), realm: realm.value })` with inconsistent formatting. There is also a latent typo (`config.baseUR` instead of `baseURL`) that silently disables the localhost token-trust branch.

The result is more surface area than the app actually uses, duplicated auth/error logic, and no single place to own token/realm/error handling — which makes every later Vue migration phase harder.

## Solution

Consolidate the **non-Angular** data layer onto a single axios-based client and remove the dead stacks, **without changing functionality**. `$http` (the AngularJS stack) is explicitly out of scope here — it migrates later alongside its directives in the strangler-fig view-layer phase.

Concretely:
1. Delete the dead `ky` stack and the dead `superagent` import, and drop both dependencies.
2. Make `ApiBase` create one shared axios instance with a request interceptor that injects the token/realm header, preserving the exact headers each endpoint sends today.
3. Remove the duplicated dead token helper in `article-api.js`.
4. Introduce a small `useApi(ApiClass)` composable so the ~52 call sites stop hand-wiring `tokenReader`/`realm`, migrated in small batches.

The `baseUR` typo is **left as-is** (fixing it would change behavior by sending tokens to localhost) and is filed as a separate follow-up.

The end state: one HTTP client, one interceptor as the single home for auth/realm/error handling, two fewer dependencies, and one composable replacing the most-copied snippet in the data layer.

## Commits

Each commit leaves the app building and working. Verification per commit = **network-diff** (capture request URLs + `Authorization`/`realm` headers per affected endpoint, before vs after, via the browser network tab) **plus a manual smoke** of the affected screens. Commits are grouped so a bisect can isolate any regression.

**Commit 0 (optional, recommended) — thin smoke harness.** Add a minimal Playwright smoke spec covering only the journeys this refactor touches: KB articles list + article detail, a forums thread view, the document-metadata view, and the app-version watcher. No unit harness. Skip if the team prefers manual-only; everything below still works.

**Commit 1 — remove dead `superagent` import.** In `document-metadata-vue-directive.js`, delete `import { link } from 'superagent'`. The directive's own `link:` property is unaffected. Build + smoke the document-metadata view.

**Commit 2 — drop the `superagent` dependency.** After grep-confirming no other usage anywhere, remove `superagent` from `package.json` (it appears in both `dependencies` and `devDependencies`) and update the lockfile. Build.

**Commit 3 — delete the dead `ky` service.** Grep-confirm no importer of `app/services/api.js` (the `main.js` hit is `./services/apiUrl`, a different file), then delete the file. Build + smoke.

**Commit 4 — drop the `ky` dependency (conditional).** Only after confirming the `boot.js` RequireJS `ky` path (`libs/globals/ky`), its `defineX`, and shim have no live consumer. If `boot.js` still references it at runtime, keep the dependency and leave a note in this issue instead. Build.

**Commit 5 — clean `article-api.js`.** Remove the trailing dead `loadAsyncHeaders` function and the now-unused module-scope `cache`/`defaultOptions` and unused imports (`axios`, `isFunction`). The class continues to work via the inherited `ApiBase.this.http`. Smoke all KB article screens (articles-by-tag, faqs, latest-faqs, relevant-articles, article-details, cbd-view-article, homepage-records).

**Commit 6 — single shared axios instance in `ApiBase`.** Refactor `api-base.js` so the constructor creates one `axios.create(...)` and token/realm injection moves into a request interceptor. Keep the public surface (`this.http`, `.get/.head/.post/.put/.patch/.delete/.options/.request`) byte-for-byte identical so all 10 subclasses are untouched. Preserve the default `Bearer` scheme and the existing `baseUR`-branch behavior exactly (leave the typo; add a `// FIXME: see follow-up issue` comment). Network-diff every endpoint family (realms, solr, articles, forums, thesaurus, portals, subscriptions, workflows, km-document, document-share) to prove identical headers.

**Commit 7 — add `useApi` composable.** Add `app/services/composables/useApi.js` exporting `useApi(ApiClass)` that returns `new ApiClass({ tokenReader: () => auth.token(), realm: realm.value })`. No call sites changed yet. Build.

**Commits 8–11 — migrate instantiation sites in batches.** One commit per directory group, ~5–8 sites each, replacing the hand-wired `auth.token()` form with `useApi(...)`:
- 8: `app/components/forums/*`
- 9: `app/components/kb/*`
- 10: `app/components/common/*`
- 11: remaining `.vue`/`.js` Vue-side sites
Leave the 4 Angular-side `apiToken.get()` sites and the `() => undefined` site as explicit overrides (do not route through `useApi`). Smoke each group.

**Commit 12 (optional) — tidy stray raw-axios.** In `forums.js`, keep the legitimate raw presigned-URL `axios.put` (must bypass `baseURL`/auth) but drop the per-file `import axios` in favor of the shared import. `app-version-watcher.vue` may stay on plain axios. Cosmetic only.

## Decision Document

- **Single client = axios via `ApiBase`.** It is already the standard (10 classes, ~52 sites). `ky` and `superagent` are removed as dead; AngularJS `$http` is deliberately retained for now.
- **`ApiBase` public interface is frozen.** The `this.http.*` method surface and the per-endpoint request headers must not change. Token scheme stays `Bearer` by default; no endpoint's scheme flips.
- **Token/realm injection moves to a request interceptor** on one shared axios instance, replacing the per-request `axios.create`.
- **`tokenReader` sourcing is standardized** through a `useApi` composable for Vue-side sites that use `auth.token()` (the large majority). Angular-side `apiToken.get()` sites and the `() => undefined` site keep explicit options.
- **The `config.baseUR` typo is preserved**, not fixed, to avoid a behavior change (localhost would begin receiving tokens). Filed as a separate follow-up issue.
- **No new state management, no router changes, no Vue/Angular framework changes** in this refactor.
- **Dependency removals** (`ky`, `superagent`) are gated on grep-confirmation of zero live usage, including the `boot.js` RequireJS/`defineX` loader paths.

## Testing Decisions

- **What makes a good test here:** assert *external behavior* only — that each endpoint family still issues the same HTTP request (URL, method, query params, and `Authorization`/`realm` headers) and that the affected screens render and function. Do **not** assert on `axios.create` internals, interceptor wiring, or class shape — those are implementation details this refactor is free to change.
- **Verification mechanism (required per commit):** network-diff (before/after request capture) + manual smoke of affected screens.
- **Modules worth a smoke test:** KB articles (`article-api`/`ArticlesApi`), forums (`ForumsApi`), document-metadata directive, realms/solr query paths, and the app-version watcher.
- **Prior art:** none — the repo currently has zero `*.spec.*`/`*.test.*` files. Commit 0 (optional Playwright smoke) would establish the first harness and pattern; if skipped, verification stays manual + network-diff.

## Out of Scope

- Migrating the 108 AngularJS `$http` call sites — these move with their directives in the later view-layer (Phase 3) work.
- Fixing the `config.baseUR` typo (separate follow-up; it is a behavior change).
- Introducing Pinia / shared state, `vue-router`, or any i18n changes (later phases).
- The `boot.js` CDN/RequireJS loader strategy and version pinning (tracked separately; only the dead `ky` path is touched here, and only if confirmed unused).
- Splitting oversized modules (e.g. `mime.type.service.js`) — unrelated to the data layer.
- Changing error-message text or `tryCastToApiError` mapping behavior.

## Further Notes

- This is **Phase 1** of a broader strangler-fig migration toward all-Vue3. It is deliberately the lowest-risk, highest-leverage phase: mostly deletion + tightening one file + removing boilerplate, with no view-layer churn.
- Recommended PR grouping: ship Commits 1–5 (deletions) as one PR, Commit 6 (shared instance) as its own PR, and the `useApi` migration (7–11) as a third, so regressions are easy to bisect.
- Confirm the `boot.js` `ky` loader path before Commit 4; if it is still live, keep the `ky` dependency and note it here.
