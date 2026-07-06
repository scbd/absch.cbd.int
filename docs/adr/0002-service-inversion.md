# Invert services out of AngularJS one at a time, behind stable composable APIs

Vue views consume services (`realm`, `locale`, `authentication`, `apiToken`,
…) through composables that today resolve them from the ng `$injector` —
Vue code looks migrated but still depends on AngularJS being alive. We invert
each service individually: the implementation moves to a plain TypeScript
module (HTTP parts in `app/api/`), the composable keeps its exact signature
but reads that module, and AngularJS keeps working through a thin
`app.factory` wrapper over the same module. One implementation, dependency
arrow pointing away from ng, no caller churn on the Vue side. Each inversion
gets vitest unit tests pinning the service's behavior.

ng filters follow the same pattern: each becomes a pure TypeScript function,
re-registered as an ng filter through a one-line wrapper; Vue views import
the function directly (Vue 3 has no filter syntax). This common-code
inversion — services and filters — deliberately precedes UI migration, so
every later view migration lands on an already framework-free foundation.

## Considered Options

- Keep `$injector` façades until each clearing-house flips, then port services
  in a batch — rejected: recreates the big-bang problem at the flip.
- Fresh Vue-native implementations alongside the ng ones — rejected: two live
  implementations of auth/realm/config invite behavioral drift between ng and
  Vue views rendered on the same page.
