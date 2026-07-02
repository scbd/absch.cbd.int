declare module 'vue-i18n' {
  import type { Ref } from 'vue'
  export function useI18n (options?: unknown): {
    locale: Ref<string>
    t: (key: string, defaultValue?: unknown)=> string
    mergeLocaleMessage: (locale: string, messages: unknown)=> void
  }
}

declare module '~/services/composables/realm.js' {
  export function useRealm (): { realm: string; baseURL: string }
}

declare module '~/services/composables/utils.js' {
  export const oasisUrl: ()=> string
  export const sleep: (ms: number)=> Promise<void>
}

declare module '@scbd/angular-vue/src/index.js' {
  import type { ComputedRef } from 'vue'

  interface NgVueInjector {
    get: (name: string)=> unknown
  }

  interface NgVue {
    $injector: NgVueInjector
  }

  interface Auth {
    token: (name?: string)=> Promise<string | undefined>
    user: ()=> unknown
    check: (roles: string | string[])=> boolean
    login: (options?: unknown)=> Promise<void>
    logout: (options?: { makeRequest?: boolean })=> void
  }

  interface Route {
    fullPath: string
    path: string
    hash: string
    query: Record<string, string>
    params: Record<string, string>
  }

  interface Router {
    push: (path: string)=> void
    replace: (path: string)=> void
  }

  export function useNgVue (): NgVue
  export function useAuth (): Auth
  export function useUser (): ComputedRef<unknown>
  export function useRoute (): ComputedRef<Route>
  export function useRouter (): Router
  export function safeApply ($scope: unknown, fn: ()=> void): void
  export function safeDelegate ($scope: unknown, delegate: (...args: unknown[])=> unknown): (...args: unknown[])=> unknown
}
