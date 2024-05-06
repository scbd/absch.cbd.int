<template> 
    <div id="Record" class="record ">
        <div class="record-body bg-white" v-if="document"> 
       
           <section>
                <legend>{{ t("generalInformation") }} </legend> 
                <div v-if="document.government">
                    <label>{{ t("country") }} </label> 
                    <div class="km-value">
                        <km-term :value="document.government" :locale="locale"></km-term>   
                    </div>
                </div>                   

                <div v-if="document.reportType">
                    <label>{{ t("typeOfDocument") }} </label>   
                    <div class="km-value">
                        <km-term :value="document.reportType" :locale="locale" ></km-term>
                    </div>  
                </div>

                <div v-if="document.summary">
                    <label>{{ t("summary") }} </label>  
                    <ng  v-vue-ng:km-value-ml  :value="document.summary" :locales="locale" html></ng>   
                </div>

                <div v-if="document.jurisdiction">
                    <label>{{ t("levelOfApplication") }} </label> 
                    <div class="km-value">
                        <km-term :value="document.jurisdiction" :locale="locale" ></km-term>
                    </div>
                </div>

                <div v-if="document.jurisdictionInfo">
                    <label>{{ t("additionalInfo") }} </label>
                    <div class="km-value">
                        <km-term :value="document.jurisdictionInfo" :locale="locale" ></km-term>
                    </div>
                </div>
            </section> 
           

            <section> 
                <div v-if="document.status || document.adoptionDate || document.approvedStatus || document.approvingBody || document.approvingBodyInfo">
                    <legend>{{ t("status") }} </legend>       
                            
                    <div v-if="document.status">
                        <label>{{ t("status") }} </label> 
                        <div class="km-value">
                            <km-term :value="document.status" :locale="locale" ></km-term>
                        </div>
                    </div>  

                    <div v-if="document.adoptionDate">
                        <label>{{ t("dateOfCompletionAndAdoption") }} </label>   
                        <ng v-vue-ng:km-value-ml  :value="document.adoptionDate" :locales="locale" html></ng>  
                    </div>

                    <div v-if="document.approvedStatus">
                        <label>{{ t("statusOfApprovedDocument") }} </label> 
                        <div class="km-value">
                            <km-term :value="document.approvedStatus" :locale="locale"></km-term>
                        </div>
                    </div>

                    <div v-if="document.approvingBody">
                        <label>{{ t("approvingBody") }} </label>
                        <div class="km-value">
                            <km-term :value="document.approvingBody" :locale="locale"></km-term>
                        </div>
                    </div>  

                    <div v-if="document.approvingBodyInfo">
                        <label>{{ t("approvingBodyInfo") }} </label>
                        <ng v-vue-ng:km-value-ml  :value="document.approvingBodyInfo" :locales="locale" html></ng> 
                    </div>                                         
                </div>
            </section> 

            <section>
                <legend>{{ t("timePeriod") }} </legend>
                <div v-if="document.startDate">
                    <label>{{ t("from") }} </label>    
                    <ng v-vue-ng:km-value-ml  :value="document.startDate" :locales="locale" html></ng>  
                </div>

                <div v-if="document.endDate">
                    <label>{{ t("to") }} </label>    
                    <ng v-vue-ng:km-value-ml  :value="document.endDate" :locales="locale" html></ng>  
                </div>
            </section>
         
           <section>
                <div v-if="document.documentText|| document.documentLinks">
                    <legend>{{ t("relevantDocAndInfo") }}</legend>
            
                    <div v-if="document.documentText">
                        <label>{{ t("relevantInfo") }} </label>   
                        <ng v-vue-ng:km-value-ml  :value="document.documentText" :locales="locale" html ></ng>  
                    </div>
            
                    <div v-if="document.documentLinks">
                        <label>{{ t("relevantWebsites") }} </label> 
                        <div class="km-value" compare-val>                 
                            <ng v-vue-ng:km-link-list v-model:ng-model="document.documentLinks"  ></ng>                    
                        </div>
                    </div>
                </div>
                         
                <div v-if="document.relevantInformation||document.relevantDocuments">
                    <div v-if="document.relevantInformation">
                        <label>{{ t("additionalInfo") }} </label>   
                        <ng v-vue-ng:km-value-ml  :value="document.relevantInformation" :locales="locale" html></ng>
                    </div>

                    <div v-if="document.relevantDocuments">
                        <label>{{ t("otherRelevantWebsite") }} </label> 
                        <div class="km-value" compare-val>                   
                            <ng v-vue-ng:km-link-list v-model:ng-model="document.relevantDocuments" ></ng>                  
                        </div>
                    </div> 
                </div> 
          
            </section> 
        </div>                      
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/national-report.json';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })
    const document = computed(()=>props.documentInfo?.body);

</script>