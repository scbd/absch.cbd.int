// vue-i18n's globalInjection provides $t on every component instance; the real
// package would augment vue itself, but we only have the shim in
// shims-angular-vue.d.ts. This file must stay a module (the export {}) so the
// declaration below augments vue instead of shadowing it.
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string, params?: unknown)=> string
  }
}
