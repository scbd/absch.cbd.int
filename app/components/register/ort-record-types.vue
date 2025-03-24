<template>
    <table class="overview table w-100">
        <tbody v-if="ortRealm.schemas"> 
            <tr class="visited-background" v-for="schema in displaySchemas" :key="schema">
                <td class="table_width">
                    <div class="btn-group bg-white btn-group-sm table_width" role="group">
                        <button type="button" class="btn btn-outline-dark p-0" disabled>
                            <i class="bi bi-chevron-down cursor-pointer p-1" aria-hidden="true"></i>
                        </button>
                        <a type="button" class="btn btn-outline-dark p-0" target="_blank" 
                            :href="`${ortRealm.baseURL}/${schema.newUrl}`">
                            <i class="bi bi-plus fs-5 fw-bold d-inline-flex"></i>
                        </a>
                        <a type="button" class="btn btn-outline-dark p-0" target="_blank" 
                            :href="`${ortRealm.baseURL}/${schema.listUrl}`">
                            <i class="bi bi-list fs-5 fw-bold d-inline-flex"></i>
                        </a>
                    </div>
                </td>
                <td class="table-min-width">
                    <a rel="noopener" :href="`${ortRealm.baseURL}/${schema.listUrl}`" target="_blank"
                        class="color-darkgrey ps-2 text-decoration-none" >
                        {{lstring(ortRealm.schemas[schema.schema]?.titlePlural||ortRealm.schemas[schema.schema]?.title)}} 
                        ({{ ortRealm.schemas[schema.schema].shortCode }})
                    </a>
                </td>
                <td class="table_max_width text-end">
                    <span class="table_display_none"></span>
                </td>
                <td class="text-center table_display_none td_width">            
                </td>
                <td class="text-center  table_display_none td_width">           
                </td>
                <td class="text-center  table_display_none td_width">
                </td>
            </tr> 
        </tbody>
    </table> 
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import RealmApi from '~/api/realms';
    import { lstring } from '~/components/kb/filters';
    import { useAuth } from '@scbd/angular-vue/src/index.js';
    import { useRealm } from '~/services/composables/realm.js';

    const realm = useRealm();
    const auth = useAuth();
    const realmApi = new RealmApi({ tokenReader: () => auth.token() });
    
    const ortRealm       = ref([]);
    const ortSchemas     = ref([]);
    const displaySchemas = [
        { schema : 'nbsap',           newUrl: 'nbsaps/my-country/new', listUrl:'nbsaps/my-country'},
        { schema : 'nationalTarget7', newUrl: 'national-targets/my-country/part-1/new', listUrl:'national-targets/my-country'},
        { schema : 'nationalReport7', newUrl: 'national-reports/nr7/my-country/edit/overview', listUrl:'national-reports/nr7/my-country/edit/overview'}
    ];

    onMounted(() => {
       loadOrtRealm();
    });
    
    async function loadOrtRealm() {
        
        ortRealm.value      =  await realmApi.getRealmConfiguration(realm.realm.replace('CHM', 'ORT'));

    }
    
</script>


