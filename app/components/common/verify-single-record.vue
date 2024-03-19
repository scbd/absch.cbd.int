<template>
    <div>
        <div v-if="isLoading" class="fs-5">
            <LoadingModal :caption="t('validatingRecord')"/>
        </div>
        <div class="modal fade" ref="verifyModal" data-bs-backdrop="static" data-bs-keyboard="false" 
            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">      
            <div class="modal-dialog modal-dialog-centered"  role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            {{schemaTitle}}
                        </h5>
                    </div>
                    <div class="modal-body">
                        <div class="wrapper">
                            <div class="row">
                                <div class="alert alert-danger">
                                    <div class="bi bi-exclamation-sign"></div>
                                    <div>
                                    {{t('message')}}
                                    <span>{{ alertSeconds }}</span>
                                    {{t('seconds')}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer mt-0 d-block">
                            <button type="button" @click="openExisting()" class="btn btn-primary px-3 float-end ng-binding">{{t('redirectNow')}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>
  
<script setup>
    import { ref, onMounted, watch } from "vue";
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/common/verify-single-record.json';
    import { useRealm } from '../../services/composables/realm.js';
    import { useRoute, useRouter } from "@scbd/angular-vue/src/index.js";
    import KmDocumentApi from "~/api/km-document";
    import { Modal } from "bootstrap";
    import LoadingModal  from '~/components/common/loading-modal.vue';
    const { t } = useI18n({ messages });
    const realm = useRealm();
    const route = useRoute();
    const router = useRouter();
    const kmDocumentApi = new KmDocumentApi();

    let modal = null;
    const schemaTitle = ref('');
    const alertSeconds = ref(10);
    const isLoading = ref(false);
    const verifyModal = ref(null);
    let existingIdentifier = [];
    
    const {schema, government } = defineProps({
        schema: String,
        government: String
        });

    onMounted(() => {
        schemaTitle.value = realm.schemas[schema].title.en;
        if (government)
            countryHasReport(government);
    });
    //ToDo: ?
    watch(government, (newValue, oldValue) => {
        countryHasReport(newValue);
    });

    const startTime = function (){
            setTimeout(()=>{
                if(alertSeconds.value == 1){																	
                    openExisting();
                }
                else{
                    alertSeconds.value --;																
                    startTime();
                }
            }, 1000)
        };

    const openDialog = function(){
            isLoading.value = false;
            modal.show('static');  
            startTime();
        };

    const openExisting = function (){
            const shortCode = realm.schemas[schema].shortCode;
            modal.hide();
            router.push({
                path: `register/${shortCode}/${existingIdentifier}/edit`
            });
        };
    const countryHasReport = async function (government){
            isLoading.value = true;
            const query = {
                $filter : `(type eq '${schema}')`,
                $top: 10,
                collection: 'my'
            }
            let queryDraft = {...query};
            queryDraft.collection = 'mydraft';
            // ToDo:
            // http://localhost:2010/api/v2013/documents/?$filter=(type+eq+cpbNationalReport5)&$top=10&collection=my
            // {"statusCode": 401,"code": "unauthorized"}
            const records = await Promise.all([kmDocumentApi.queryDocuments(query),kmDocumentApi.queryDocuments(queryDraft)]);

            const filterByGovernment = function(item){
                return item?.metadata?.government == government
            }              
            const published   = (records[0]||{}).Items?.find(filterByGovernment);
            const draft       = (records[1]||{}).Items?.find(filterByGovernment);
            existingIdentifier = (published||draft)?.identifier;

            if (((published || draft) && (!route.params.identifier || route.params.identifier != existingIdentifier))) {
                modal = new Modal(verifyModal.value); // todo ref
                openDialog();
            } else {
                isLoading.value = false;
            }
    }
</script>