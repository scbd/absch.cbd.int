# AngularJS → Vue 3 Migration Plan

Terminology: see [CONTEXT.md](../CONTEXT.md). Decisions: see
[ADR 0001](adr/0001-route-manifest-per-clearing-house-flip.md) and
[ADR 0002](adr/0002-service-inversion.md).

**End state.** One Vue 3 app per page load; vue-router owns the URL;
AngularJS, `@scbd/angular-vue`, and RequireJS/CDN framework loading deleted;
everything ships through the Rollup bundle. Done = the Bridge can be
uninstalled.

**Capacity assumption.** The migration lane runs in bursts between product
deadlines. Therefore every step below leaves the app shippable, nothing
depends on a long-lived branch, and the ratchets (CI-enforced) keep the ng
surface from growing while the lane is paused.

**Starting inventory (2026-07).** ~127 routes across
`app/routes/{common,absch,bch,chm}.js` (62/23/40/2); 93 `.vue` files vs ~224
JS files registering ng artifacts and 311 ng HTML templates; ~30 `km-*` ng
form controls with 63 consumer files; some Vue forms still wrap ng controls
through the Bridge; composables still resolve services from the `$injector`;
no tests.

---

## Phase 0 — Foundations (build track, do first)

1. **CI ratchet script.** Counts ng artifacts (files registering
   directives/controllers/components, Bridge mounts, `$injector` escapes,
   km-control wraps in `.vue` files) against a committed baseline; CI fails
   any PR that raises a counter; migration PRs commit the lowered baseline.
   The baseline file is the progress dashboard.
   *Verify: a PR adding an ng directive fails CI.*
2. **Route manifest.** Extract `app/routes/*.js` into a framework-neutral
   manifest (path, view ref, guards, resolves — `securize`, `currentUser`,
   `injectRouteParams` become named guard/resolve descriptors). A generator
   produces the current ngRoute config from it.
   *Verify: generated ngRoute config is behavior-identical (route-by-route
   diff + manual spot checks per realm).*
3. **Smoke suite.** Playwright suite generated from the manifest: every
   route × clearing-house loads, renders without console errors, and shows
   its key landmark. Runs in CI against all three realms.
   *Verify: suite green on master; a deliberately broken route fails it.*
4. **Shrink RequireJS to ng-only.** Move Vue, vue-i18n, and all non-ng
   libraries out of `boot.js`/`defineX` into the Rollup bundle or proper ESM
   imports; fixes the Vue version drift (CDN 3.4.15 vs package.json 3.4.19).
   `require.config` keeps only AngularJS + ng plugins, which die at each flip.
   *Verify: smoke suite green; no `vue@` request from the CDN in the network
   log on any realm.*

## Phase 1 — Common-code inversion (before any UI migration)

The migration deliberately starts with the shared, non-UI code base — not
views. Every service and filter inverted here is immediately reusable from
both worlds and makes each later view migration cheaper.

1. **Services.** Inventory every service reaching Vue (the `createService`
   calls in `app.js`, `$injector` escapes in `app/services/composables/`)
   plus the shared layer in `app/components/scbd-angularjs-services/services`
   (`authentication`, `locale`, `apiUrl`, `storage`, `generic-service`,
   `utilities`, `workflows`, …) and the ng services in `app/services/`.
   Invert them one at a time per ADR 0002 — plain TS module/class, composable
   keeps its signature, thin ng `app.factory` wrapper — prioritized by what
   common routes consume: `realm`, `locale`, `authentication`/`apiToken`,
   `appConfigService`, then the long tail. HTTP parts land in `app/api/`.
2. **Filters.** ng filters (registered in `app/services/filters.js`,
   `app/services/common.js`, `scbd-angularjs-services/filters/scbd-filters.js`,
   and a few services) become pure TS functions. There are no `$filter(...)`
   call sites in JS — filters are used only in ng HTML templates — so each
   becomes a TS function re-registered as an ng filter via a one-line
   wrapper; migrated Vue views import the function directly (Vue 3 has no
   filter syntax).

**Tests are non-negotiable:** every service or filter migrated to TS ships
vitest tests pinning its behavior in the same PR — no test, no merge. The
first inversion bootstraps the vitest setup.
*Verify per unit: vitest green; grep shows no `$injector.get('<name>')`
outside the ng wrapper (services) and the ng registration is a one-line
wrapper over the TS function (filters); smoke suite green.*

## Phase 2 — Route migration (the long middle, after common code)

Route/view migration starts in earnest only once the services and filters a
route depends on are inverted — the Phase 1 inventory doubles as the
readiness checklist per route.

Queue order: **common (62) → chm (2) → bch (40) → absch (23)** — common
routes gate the CHM flip. A route is migrated only when its view has zero ng
involvement (no Bridge mounts, inverted services only, Vue km-controls).

- **km-controls on demand:** the first migrating form that needs a control
  builds its Vue equivalent in `app/components`; the ng version is frozen
  (ratchet: no new consumers, no new Bridge wraps).
- **Second pass on hybrid forms:** existing Vue forms that wrap ng controls
  (e.g. several `app/views/forms/edit/**` files) count as unmigrated until
  swept.
- **Opportunistic rule:** feature work touching an ng view migrates it
  instead of patching it.
- All migrated/new code is TypeScript (`<script setup lang="ts">`, `.ts`
  modules); ng code never receives typing effort beyond ambient declarations.

*Verify per route: smoke test green; ratchet counters decrease; no Bridge
mount rendered on the route (runtime assertion in the smoke test).*

## Phase 3 — CHM flip (pilot)

1. Build the vue-router generator from the manifest and the single-root Vue
   app shell (header/footer/template layer for the `chm` template).
2. Reimplement the guard/resolve descriptors as vue-router navigation guards
   (they are already framework-neutral descriptors after Phase 0).
3. Flip via env toggle in dev/staging; soak; flip production; grace period;
   then delete CHM's ngRoute path.

*Verify: full smoke suite green on flipped CHM; auth, locale switching, and
record view/edit flows pass; rollback rehearsed once in staging.*

## Phase 4 — BCH and ABS flips

Repeat Phase 3 per clearing-house as their route queues drain. BCH before
ABS or vice versa — decide by remaining route counts at the time.

## Phase 5 — Teardown

Delete AngularJS, `@scbd/angular-vue`, `boot.js` RequireJS config, ng plugin
CDN loading, `scbd-angularjs-controls`/`scbd-angularjs-services`, ng HTML
templates, and the dual-bootstrap toggle. Ratchet baseline reaches zero and
the ratchet script is retired.

---

## Deferred decisions (revisit when they block a phase)

- **jQuery / Bootstrap-JS / moment / linqjs retirement** — mostly ng-era
  globals; inventory during Phase 0, most die with ng, survivors need owners.
- **Embed/widget pages** (`app/views/embed`, widget-example assets) — confirm
  how they bootstrap and whether they flip with their clearing-house.
- **Forums/km components** under `app/components` — scope and ordering within
  Phase 2.
- **PDF templates & report analyzer** — heavy ng+jQuery views; schedule late
  in their realm's queue deliberately.
