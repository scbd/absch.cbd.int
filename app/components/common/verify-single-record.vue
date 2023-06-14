<template>
    <div>
        <div v-if="isLoading" class="text-warning fs-5 loadingIcon"><loading caption="Validating if record exists for the government..."/></div>
        <div class="modal fade" ref="verifyModal" data-backdrop="static"  tabindex="-1" aria-hidden="true">      
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
   import DocumentShareApi from "~/api/document-share"; // move to common file if required
    import { Modal } from "bootstrap";
    import i18n from '../../app-text/components/common/verify-single-record.json';
    import Loading  from '~/components/common/loading.vue'
    export default {
        name: 'verifySingleRecord',
        components : { Modal, Loading },
        props: ["tokenReader", "schema", "government"],
        data:  () => {
            return {
                modal: null,
                schemaTitle: '',
                alertSeconds: 10,
                isLoading: false,
                docValues: []
            }
        },
        created(){
            this.documentShareApi = new DocumentShareApi(this.tokenReader);
            this.schemaTitle = this.$realm.schemas[this.schema].title.en;
            this.countryHasReport(this.government);
        },

        mounted() {
            this.$watch('government', () => {
                this.countryHasReport(this.government);
            });
        },
        methods:{                
            async startTime(){
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

            async openDialog(){
                this.isLoading = false;
                this.modal.show('static');                    
                try{
                    this.startTime();                  
                }
                finally{ // remove
                    
                }
            },

            async getNationalRecords(nationalRecords, government) {
                const filterByGovernment = function(item){
                        return item && (item.metadata||{}).government == government
                    }              
                    const published   = _.find((nationalRecords[0]||{}).Items,  filterByGovernment);
                    const draft       = _.find((nationalRecords[1]||{}).Items,  filterByGovernment);
                    if (((published || draft) && (!this.$route.params.identifier || this.$route.params.identifier != (draft||published).identifier))) {
                        this.modal = new Modal(this.$refs.verifyModal);
                        this.openDialog();
                        this.docValues = [published, draft];
                    } else {
                        this.isLoading = false;
                    }
            },

            async openExisting(){
                const shortCode = this.$realm.schemas[this.schema].shortCode;
                this.modal.hide();
                this.$router.push({
                    path: `register/${shortCode}/` + (this.docValues[1]||this.docValues[0]).identifier+'/edit'
                });
            },
            async countryHasReport(government){
                this.isLoading = true;
                const query = {
                    $filter : `(type eq '${this.schema}')`,
                    $top: 10,
                    collection: 'my'
                }
                let queryDraft = query;
                queryDraft.collection = 'mydraft';
                Promise.all([this.documentShareApi.queryDocuments(query),this.documentShareApi.queryDocuments(queryDraft)])
                    .then(records => this.getNationalRecords(records, government))
            }
        },

        i18n: { messages:{ en: i18n }} 
	}
</script>
<style>
    .loadingIcon {
    top: 39.5%;
    position: absolute;
    left: 37%;
    z-index: 1;
    }
</style>