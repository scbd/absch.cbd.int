# CONTEXT

Glossary of terms used in this project. Terms marked _(unresolved)_ are pending
definition during design sessions.

## Domain

- **Clearing-House** — One of the three CBD information-sharing platforms served
  by this codebase: **ABS** (Access and Benefit-Sharing Clearing-House, absch),
  **BCH** (Biosafety Clearing-House), **CHM** (Clearing-House Mechanism). A
  deployment serves exactly one Clearing-House, selected at server start.
- **Realm** — The runtime identity of a deployment: which Clearing-House it is
  plus its per-host configuration fetched from the API. Code and routes branch
  on the realm.
- **Record** — A document stored in a Clearing-House registry (e.g. contact,
  authority, national database, organization, submission). Each record type has
  a schema code (CON, CNA, NDB, VLR, ORG, SUB, CDI, …).
- **Schema** — The definition of a record type; drives the edit and view forms.
- **Register** — The authenticated workspace where users manage their records
  (dashboards, requests, workflows, admin).
- **Workflow** — An approval request that carries a Record draft through review
  to publication or deletion. Surfaced in the Register as "requests"; avoid
  "task".
- **Record snapshot** — Record-derived fields (`recordFields`) copied onto a
  Workflow when it is created, so Register views can filter and display
  requests by record content without loading each record. Only record types
  that opt in produce one; submission is the first.

## Architecture language

- **Template (clearing-house template)** — The per-Clearing-House entry shell
  (`absch`, `bch`, `chm`): index page, header, footer. Not to be confused with
  AngularJS HTML templates.
- **Bridge** — The in-house `@scbd/angular-vue` library that lets AngularJS and
  Vue 3 host each other's components and share services in both directions.
- **VueRegistry** — The bridge's global registry of plugins/services installed
  into every Vue app instance the bridge mounts.
- **View** — A routed page. Lives in `app/views/`. A view is either an
  AngularJS view or a Vue view; wrappers adapt one into the other at the
  routing layer.
- **Route table** — The ngRoute-based route definitions (common + one file per
  Clearing-House) that map URLs to lazily imported views.

## Migration terms

- **End state** — "Fully migrated" means: one Vue 3 app per page load,
  vue-router owns all routing, AngularJS, the Bridge, and RequireJS/CDN
  framework loading are deleted, and everything ships through the Rollup
  bundle. The migration is done when the Bridge can be uninstalled.
- **Route manifest** — The framework-neutral description of the route tables
  (path, view reference, guards, resolved data). The manifest generates ngRoute
  config before a Flip and vue-router config after it; it is the single source
  of truth for routing during the migration.
- **Flip** — The moment a clearing-house deployment switches from ngRoute
  ownership of the URL to vue-router ownership. Flips happen per
  clearing-house, not globally; CHM is the pilot Flip.
- **Composable** — The canonical Vue-side accessor for a service
  (`useRealm()`, `useAuth()`, …). After Service inversion its signature stays
  identical but it reads a framework-free module, never the ng `$injector`.
- **Service inversion** — Porting one ng service to a plain TypeScript module
  (HTTP parts in `app/api/`) that both the Composable and a thin ng
  `app.factory` wrapper consume. One implementation, dependency arrow pointing
  away from AngularJS. A service is "inverted" when deleting ng would not break
  its Vue consumers. ng filters invert the same way: pure TypeScript functions
  behind a one-line ng filter registration. Common-code inversion (services
  and filters) precedes UI migration.
- **km-control** — One of the shared form-control widgets (rich textbox,
  multilingual text, term pickers, date controls, …) used by Record edit
  forms. Each km-control is ported to Vue on demand — the first migrating form
  that needs it builds it — after which the ng version is frozen.
- **Ratchet** — A migration rule that only ever tightens: no new AngularJS
  code, no new Vue form wrapping an ng km-control through the Bridge, no new
  consumers of a frozen ng artifact. Ratchets are what guarantee the ng
  surface shrinks monotonically.
- **Migration unit** — The route. A route is *migrated* only when its view
  renders with zero ng involvement: no Bridge mounts, all services it uses
  inverted, all form controls Vue km-controls. Partially converted views
  (Vue file that still wraps ng) do not count.
- **Migration lane** — The standing stream of work that drains the prioritized
  route queue (common routes first — they gate the CHM Flip — then chm, bch,
  absch). Complemented by the opportunistic rule: feature work that touches an
  ng view migrates it instead of patching it.
