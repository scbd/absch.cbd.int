# Migrate to Vue 3 via a neutral route manifest with per-clearing-house router flips

The AngularJS→Vue 3 migration targets a single Vue app per page load with
vue-router owning the URL, and the `@scbd/angular-vue` bridge deleted. Rather
than inverting the shell early (rebuilding guards up front, high risk across
all three products) or swapping the router in one big bang at the end, we keep
ngRoute as the URL owner while refactoring the route tables into a
framework-neutral route manifest (path, view, guards, resolves). The manifest
generates ngRoute config today and vue-router config after cutover. Because
each clearing-house (ABS, BCH, CHM) is a separate deployment with its own
route file, the flip to vue-router happens per clearing-house once all of its
routes point at Vue views — CHM, with the fewest own routes, pilots the flip.

The flip itself is an environment-variable toggle (alongside `CLEARINGHOUSE`):
the manifest builds both router bootstraps, so flipping — and rolling back —
is a configuration change, not a release. The ngRoute path is deleted from a
clearing-house only after a grace period of clean production running.

## Considered Options

- Invert the shell early (root Vue app hosts ng views) — rejected: forces
  reimplementation of `securize`/resolve semantics as vue-router guards before
  any views migrate, and risks ng digest breakage across all three products at
  once.
- Big-bang router swap at the end — rejected: the swap becomes a huge,
  untestable-in-increments event for all three clearing-houses simultaneously.
