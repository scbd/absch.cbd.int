<template>
    <div class="m-0 mt-2 mb-3">
      <div class="row g-4">
        <div class="col-md-3" v-for="realm in realmConfigurations" :key="realm.baseURL">
          <div class="card h-100 shadow">
            <div class="card-body pb-0">
              <h5 class="card-title">{{ lstring(realm.displayName, locale) }}</h5>
              <p class="text-muted mb-0">{{ lstring(realm.description, locale) }}</p>
            </div>
            <div class="card-footer bg-white border-0">
              <a :href="realm.baseURL" class="btn btn-primary w-100 text-uppercase">
                {{ t('goTo') }} {{ getButtonLabel(realm.baseURL) }} »
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    import RealmApi from '~/api/realms';
    import { lstring } from '~/components/kb/filters';
    import { useAuth } from '@scbd/angular-vue/src/index.js';
    import { useRealm } from '~/services/composables/realm.js';

    const realm = useRealm();
    const { t, locale } = useI18n();
    const auth = useAuth();
    const realmApi = new RealmApi({ tokenReader: () => auth.token() });

    const realmConfigurations = ref([]);

    const props = defineProps({
      hideRealms: { type: Array, required: false, default: () => [] },
    });

    onMounted(async () => {
        const apiRealms = await realmApi.getRealmConfigurations(realm.environment);

        realmConfigurations.value =
          props.hideRealms.length > 0 ? apiRealms.filter((item) => !props.hideRealms.includes(item.realm)) : apiRealms;
    });

    const getButtonLabel = computed(() => (url) => 
      url.replace(/^https?:\/\/(www\.)?/, '')
    );
</script>
