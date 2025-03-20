<template>
    <div class="m-0 mt-2 mb-3">
      <div class="row g-4">
        <div class="col-md-3" v-for="realm in otherApplicationRealms" :key="realm.baseURL">
          <div class="card h-100 shadow">
            <div class="card-body pb-0">
              <h5 class="card-title">{{ lstring(realm.displayName, locale) }}</h5>
              <p class="text-muted mb-0">{{ lstring(realm.description, locale) }}</p>
            </div>
            <div class="card-footer bg-white border-0">
              <a :href="realm.baseURL" class="btn btn-secondary w-100 text-uppercase" :target="_blank" rel="noopener noreferrer">
                {{ t('goTo') }} {{ realm.baseURL }} »
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
    import messages from '../../app-text/components/common/pagination.json';

    const { t, locale } = useI18n({ messages });

    const realm = useRealm();
    const auth = useAuth();
    const realmApi = new RealmApi({ tokenReader: () => auth.token() });

    const otherApplicationRealms = ref([]);

    onMounted(async () => {
        const apiRealms = await realmApi.getRealmConfigurations(realm.environment);

        //exclude current realm
        otherApplicationRealms.value = apiRealms.filter((item) => item.realm!= realm.realm);
    });
    
</script>
