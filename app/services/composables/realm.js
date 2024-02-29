import { useNgVue  } from "@scbd/angular-vue/src/index.js";

export function useRealm() {
    var ngVue = useNgVue();
    return ngVue.$injector.get('realm');
}