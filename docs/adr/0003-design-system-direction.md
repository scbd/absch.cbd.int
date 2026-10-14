# App UI follows the SCBD design language via shared tokens; Bootstrap stays as the behavior/layout engine

> **Status: draft** — pending a `/grill-with-docs` pass before the ratchet wording
> in AGENTS.md is finalized.

The app's visual identity comes from a shared design-token layer, not from
stock Bootstrap styling and not from per-page CSS. Tokens (brand palette,
ink/line grays, radius, focus color) live in [`app/css/tokens.css`](../../app/css/tokens.css)
as `--scbd-*` CSS custom properties, linked globally from the per-clearing-house
EJS templates. Component styles consume `var(--scbd-*)` and never hardcode
palette values.

**Each clearing-house has its own color identity.** `tokens.css` holds the base
defaults; ABSCH, BCH and CHM override the brand tokens with a `:root` block in
`app/css/<ch>/tokens.css`, linked after the base file from that clearing-house's
EJS template — the same override pattern already used for
`app/css/<ch>/template.css`. Because a deployment serves exactly one
clearing-house, components stay palette-agnostic: the right brand arrives via
the cascade, never via `realm.is(...)` color branching in components (the
inline color ternaries in `app/views/portals/index.vue` predate this decision
and should migrate to tokens).

Bootstrap 5 (CDN, currently 5.1.3) is retained for what it is good at —
grid, form controls, utilities, and behavioral components (modals, collapse) —
but it is the invisible engine, not the look. Where a designed pattern repeats
across views (cards with section headers, label/control/hint field rows, chips,
section navs, status badges), it should be promoted into a shared UI component
under `app/components/ui/` rather than copied per page; the portals edit page
(`ep-*` styles) is the reference implementation and first extraction candidate.

## Considered Options

- **Stock Bootstrap look everywhere** — rejected: visually generic; side-by-side
  comparison on the portal edit page (2026-07-27) clearly favored the designed
  version, and utility-class-only markup pushes design decisions into every
  template.
- **Per-page custom CSS** (how the portal edit page started) — rejected: doesn't
  scale; every page re-invents the palette and patterns, values drift.
- **Adopt a third-party component library** (PrimeVue, Vuetify, …) — rejected for
  now: heavy addition mid-migration from AngularJS, and the hybrid bridge
  constrains component libraries; revisit after the Vue flip.

## Consequences

- New UI work references `--scbd-*` tokens; raw hex values in component styles
  are a review flag.
- Repeated visual patterns get extracted to `app/components/ui/` instead of
  being duplicated (extraction can be lazy — second use triggers it).
- Upgrading Bootstrap to 5.3 would allow mapping `--bs-*` component variables to
  the tokens so stock BS components inherit the brand automatically; that bump
  is a candidate follow-up (one CDN URL in `app/templates/*/index.ejs` +
  `app/boot.js`, needs a regression pass).
- Proposed AGENTS.md ratchet (to be finalized): *new UI uses the shared
  tokens/UI kit; no page-scoped design systems; no raw palette values in
  components.*
