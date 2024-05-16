<template> 
    <div id="Record" class="record ">
        <div class="record-body bg-white" v-if="document"> 
            <!--TODO: add compare-val for fields  -->

            <!-- TODO: add publish date -->            
            <!-- <ng v-vue-ng:document-date></ng> -->

           <section>
                <legend>{{ t("generalInformation") }} </legend> 
                <div v-if="document.government">
                    <label>{{ t("country") }} </label> 
                    <div class="km-value" >
                        <km-term :value="document.government" :locale="locale"></km-term>   
                    </div>
                </div>   
                
                <div v-if="document.title">
                    <label>{{ t("title") }} </label> 
                    <ng  v-vue-ng:km-value-ml  :value="document.title" :locales="locale" html></ng>   
                </div>   

                <div v-if="document.reportType">
                    <label>{{ t("typeOfDocument") }} </label>   
                    <div class="km-value" >
                        <km-term :value="document.reportType" :locale="locale" ></km-term>
                    </div>  
                </div>

                <div v-if="document.summary">
                    <label>{{ t("summary") }} </label>  
                    <ng  v-vue-ng:km-value-ml  :value="document.summary" :locales="locale" html></ng>   
                </div>

                <div v-if="document.jurisdiction">
                    <label>{{ t("level") }} </label> 
                    <div class="km-value" >
                        <km-term :value="document.jurisdiction" :locale="locale" ></km-term>
                    </div>
                </div>
                
                <div v-if="document.jurisdictionInfo">
                    <label>{{ t("additionalInfo") }} </label>  
                    <ng  v-vue-ng:km-value-ml  :value="document.jurisdictionInfo" :locales="locale" html></ng> 
                </div>
            </section>            

            <section v-if="document.status || document.adoptionDate || document.approvedStatus || document.approvingBody || document.approvingBodyInfo">                
                <legend>{{ t("status") }} </legend>       
                        
                <div v-if="document.status" >
                    <label>{{ t("status") }} </label> 
                    <div class="km-value">
                        <km-term :value="document.status" :locale="locale" ></km-term>
                    </div>
                </div>  

                <div v-if="document.adoptionDate" >
                    <label>{{ t("date") }} </label>   
                    <div class="km-value">
                        {{document.adoptionDate}}
                    </div>  
                </div>

                <div v-if="document.approvedStatus" >
                    <label>{{ t("statusOfDocument") }} </label> 
                    <div class="km-value">
                        <km-term :value="document.approvedStatus" :locale="locale"></km-term>
                    </div>
                </div>

                <div v-if="document.approvingBody" >
                    <label>{{ t("approvingBody") }} </label>
                    <div class="km-value">
                        <km-term :value="document.approvingBody" :locale="locale"></km-term>
                    </div>
                </div>  

                <div v-if="document.approvingBodyInfo" >
                    <label>{{ t("approvingBodyInfo") }} </label>
                    <ng v-vue-ng:km-value-ml  :value="document.approvingBodyInfo" :locales="locale" html></ng> 
                </div>                                         
             
            </section> 

            <section v-if="document.startDate || document.endDate">             
                <legend>{{ t("timePeriod") }} </legend>

                <div class="row">                     
                    <div :class="[document.endDate? 'col-6':'col-12']" v-if="document.startDate">
                        <label>{{ t("from") }} </label>   
                        <div class="km-value">
                            {{document.startDate}}  
                        </div> 
                    </div>
    
                    <div  class="col-6" v-if="document.endDate">
                        <label>{{ t("to") }} </label> 
                        <div class="km-value">
                            {{document.endDate}}  
                        </div>                    
                    </div>
                </div>              
            </section> 

            <section v-if="document.documentText || document.documentLinks">
                <legend>{{ t("relevantDocumentAndInformation") }}</legend>
                <view-relevant-information :relevantInformation="document.documentText" :relevantDocuments="document.documentLinks" :locale="locale">                 
                    <template v-slot:information>
                        <label>{{ t("relevantInfo") }} </label>   
                    </template>
                    <template v-slot:document>
                        <label>{{ t("relevantWebsites") }} </label> 
                    </template>
                </view-relevant-information> 
            </section>

            <section v-if="document.relevantInformation || document.relevantDocuments">
                <legend>{{ t("additionalInformation") }}</legend>
                <view-relevant-information :relevantInformation="document.relevantInformation" :relevantDocuments="document.relevantDocuments" :locale="locale"> 
                </view-relevant-information> 
            </section>           
           
            <div> 
                <!-- TODO: test -->
                <ng v-vue-ng:view-referenced-records  v-model:ng-model="document.header.identifier" ></ng>  
            </div>         
        </div>  
        <!-- TODO: add footer  -->
        <!-- <ng v-vue-ng:document-metadata  :document="document"></ng>  -->

    </div>
</template>

<script setup>
    import { computed} from 'vue';
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'
    import '~/views/forms/view/directives/view-reference-records.directive.js'    
    import kmTerm from '~/components/km/KmTerm.vue';
    import viewRelevantInformation from '~/views/forms/view/directives/view-relevant-information.vue'; 
    import messages from '~/app-text/views/reports/chm/national-report.json';
    import { useI18n } from 'vue-i18n'; 

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })
    const document = computed(()=>props.documentInfo?.body);
</script>