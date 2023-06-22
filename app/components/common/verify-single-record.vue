<template>
    <div>
        <div v-if="isLoading" class="fs-5">
            <LoadingModal :caption="$t('validatingRecord')"/>
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
                                    {{$t('message')}}
                                    <span>{{ alertSeconds }}</span>
                                    {{$t('seconds')}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer mt-0 d-block">
                            <button type="button" @click="openExisting()" class="btn btn-primary px-3 float-end ng-binding">{{$t('redirectNow')}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>
  
<script>
import KmDocumentApi from "~/api/km-document";
import { Modal } from "bootstrap";
import i18n from '../../app-text/components/common/verify-single-record.json';
import LoadingModal  from '~/components/common/loading-modal.vue'

const kmDocumentApi = new KmDocumentApi();

export default {
    name: 'verifySingleRecord',
    components : { Modal, LoadingModal },
    props: ["schema", "government"],
    data(){
        return {
            modal: null,
            schemaTitle: '',
            alertSeconds: 10,
            isLoading: false,
            existingIdentifier: []
        }
    },
    created(){
        this.schemaTitle = this.$realm.schemas[this.schema].title.en;
        if(this.government)
            this.countryHasReport(this.government);
    },
    watch: {
        government: function (newValue, oldValue) {
            this.countryHasReport(this.government);
        } 
    },
    methods:{                
        startTime(){
            setTimeout(()=>{
                if(this.alertSeconds == 1){																	
                    this.openExisting();
                }
                else{
                    this.alertSeconds --;																
                    this.startTime();
                }
            }, 1000)
        },

        openDialog(){
            this.isLoading = false;
            this.modal.show('static');  
            this.startTime();
        },
        openExisting(){
            const shortCode = this.$realm.schemas[this.schema].shortCode;
            this.modal.hide();
            this.$router.push({
                path: `register/${shortCode}/${this.existingIdentifier}/edit`
            });
        },
        async countryHasReport(government){
            this.isLoading = true;
            const query = {
                $filter : `(type eq '${this.schema}')`,
                $top: 10,
                collection: 'my'
            }
            let queryDraft = {...query};
            queryDraft.collection = 'mydraft';

            const records = await Promise.all([kmDocumentApi.queryDocuments(query),kmDocumentApi.queryDocuments(queryDraft)]);

            const filterByGovernment = function(item){
                return item?.metadata?.government == government
            }              
            const published   = (records[0]||{}).Items?.find(filterByGovernment);
            const draft       = (records[1]||{}).Items?.find(filterByGovernment);
            this.existingIdentifier = (published||draft)?.identifier;

            if (((published || draft) && (!this.$route.params.identifier || this.$route.params.identifier != this.existingIdentifier))) {
                this.modal = new Modal(this.$refs.verifyModal);
                this.openDialog();
            } else {
                this.isLoading = false;
            }
        }
    },

    i18n: { messages:{ en: i18n }} 
}
</script>