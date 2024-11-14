<template>
    <div class="card" v-if="isAdministrator">
        <div class="card-header"  @click="showDebugInfo=!showDebugInfo">            
            <button type="button" class="btn btn-xs w-100" v-if="documentInfo">
                Show debug info (only visible to administrator)
                <i class="bi bi-bug-fill"></i>
            </button>
        </div>
        <div class="card-body" v-if="showDebugInfo && documentInfo">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th>Identifier</th>
                        <td>
                            <div v-if="documentInfo?.identifier">
                                <a target="_blank" :href="`${oasisUrl()}/clearing-house/records/history/${documentInfo.identifier}`">
                                    <span id="documentIdentifier">{{ documentInfo?.identifier }}</span> 
                                </a>
                                <copy-to-clipboard class="ms-1" source="documentIdentifier"></copy-to-clipboard>
                            </div>
                        </td>
                        <th>Document Id</th>
                        <td>
                            <div v-if="documentInfo?.documentID">
                                <span id="documentId">{{ documentInfo.documentID }}</span> 
                                <copy-to-clipboard :source="documentInfo.documentID"></copy-to-clipboard>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <button type="button" class="btn btn-xs" @click="documentInfo.showJson=!documentInfo.showJson">
                                Show JSON <i class="bi bi-file-code"></i>
                            </button>
                            <pre v-if="documentInfo.showJson">
                                {{ documentInfo }}
                            </pre>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useAuth } from '@scbd/angular-vue/src/index.js';
    import copyToClipboard from '~/components/common/copy-to-clipboard.vue';
    import { oasisUrl } from '~/services/composables/utils.js';
    
    const props = defineProps({
        documentInfo : { type:Object, required:true}
    });
    
    const auth = useAuth();
    const isAdministrator = computed(()=> auth.check(['Administrator']));

    const showDebugInfo = ref(false);
</script>

<style lang="scss" scoped>

</style>