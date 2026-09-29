import { useNgVue } from '@scbd/angular-vue/src/index.js'

export function useCommonjs () {
  const ngVue = useNgVue()

  return ngVue.$injector.get('commonjs')
}
