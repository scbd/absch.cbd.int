<template>
    <div id="Record" class="record panel panel-default">
        <div class="record-body panel-body bg-white" v-if="document">              
            <div class="panel panel-info">
                <div class="panel-heading">                 
                    <legend>{{ t("generalInformation") }} </legend> 
                </div>
                <div class="panel-body">
                    <div v-if="document.government">
                        <label>{{ t("country") }} </label> 
                        <div class="km-value">
                            <km-term :value="document.government" :locale="locale"></km-term>   
                        </div>
                    </div>
                    <!--TODO: test nationalTarget , now can't get value from backend-->
                    <div v-if="document.nationalTarget">
                        <label>{{ t("targets") }} </label>
                        <div class="km-value">
                            <km-term :value="document.nationalTarget" :locale="locale"></km-term>   
                        </div>
                    </div>                
                </div>
		    </div>

            <div class="panel panel-info">
                <div class="panel-heading">
                 <legend>{{ t("categoryOfProgressTowardsTheImplementationOfTheSelectedTarget") }} </legend>
                </div>
                <div class="panel-body">            
                    <div v-if="document.progress">
                        <label>{{ t("rateOfProgressesTowardTheImplementationOfTheSelectedTarget") }} </label> 
                        <div class="km-value">
                            <km-term :value="document.progress" :locale="locale" ></km-term>
                        </div>
                    </div>
        
                    <div v-if="document.date">
                        <label>{{ t("dateTheAssessmentWasDone") }} </label>   
                        <ng v-vue-ng:km-value-ml  :value="formatDate(document.date, 'DD MMM YYYY')" :locales="locale" html></ng>  
                    </div>
                   
                    <div v-if="document.assessmentText">
                        <label>{{ t("summaryOfTheAssessmentOfProgressesTowardTheImplementationOfTheSelectedTarget") }} </label>                        
                        <ng v-vue-ng:km-value-ml  :value="document.assessmentText" :locales="locale" html></ng>  
                    </div>              
                </div>
            </div>

            <div class="panel panel-info" v-if="document.nationalIndicators">
                <div class="panel-heading">
                    <legend>{{ t("indicatorsAndActivities") }} </legend>   
                </div>
                <div class="panel-body">              
                    <div v-if="document.nationalIndicators">
                        <label>{{ t("indicatorsUsedInThisAssessment") }} </label>    
                        <div v-if="Array.isArray(document.nationalIndicators)">
                            <div  v-for="indicator in document.nationalIndicators" >                     
                                <div v-if="indicator.description">
                                    <ng v-vue-ng:km-value-ml  :value="indicator.description" :locales="locale" html></ng>  
                                </div>                 
                            </div>  
                        </div>
                        <div v-else>
                            <ng v-vue-ng:km-value-ml  :value="document.nationalIndicators" :locales="locale" html></ng>  
                        </div>
                    </div>

                    <div v-if="document.documentText">                        
                        <label>{{ t("anyOtherToolsOrMeansUsedForAssessingProgress") }} </label>                        
                        <ng v-vue-ng:km-value-ml  :value="document.documentText" :locales="locale" html></ng> 
                    </div>

                    <div v-if="document.documentLinks">                        
                        <label>{{ t("relevantWebsitesLinksAndFiles") }} </label>
                       <div class="km-value" compare-val>                 
                            <ng v-vue-ng:km-link-list v-model:ng-model="document.documentLinks"  ></ng>                    
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel panel-info">
                <div class="panel-heading">
                    <legend>{{t("levelOfConfidence") }}</legend>
                </div>
                <div class="panel-body">   
                    <div v-if="document.confidence">
                        <label>{{ t("levelOfConfidenceOfTheAboveAssessment") }} </label>   
                        <div class="km-value">
                            <km-term :value="document.confidence" :locale="locale"></km-term>
                        </div> 
                    </div>

                    <div v-if="document.confidenceInfo">
                        <label>{{ t("levelOfConfidenceOfTheAboveAssessment") }} </label>   
                        <ng v-vue-ng:km-value-ml  :value="document.confidenceInfo" :locales="locale" html ></ng>  
                    </div>
            
                    <div v-if="document.adequacy">
                        <label>{{ t("adequacyOfMonitoringInformationToSupportAssessment") }} </label>                         
                        <div class="km-value">
                            <km-term :value="document.adequacy" :locale="locale"></km-term>
                        </div> 
                    </div>

                    <div v-if="document.adequacyDescription">
                        <label>{{ t("monitoringSystemForTheTarget") }} </label>   
                        <ng v-vue-ng:km-value-ml  :value="document.adequacyDescription" :locales="locale" html></ng>
                    </div> 

                    <div v-if="document.otherRelevantDocuments">
                        <label>{{ t("otherRelevantWebsiteAddressOrAttachedDocuments") }} </label>   
                        <div class="km-value" compare-val>                 
                            <ng v-vue-ng:km-link-list v-model:ng-model="document.otherRelevantDocuments"  ></ng>                    
                        </div>
                    </div> 
                </div>
            </div>         
        </div>   
    </div>
</template>
<script setup>
    import { computed } from 'vue'; 
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/national-assessment.json';
    import { useI18n } from 'vue-i18n';
    import { formatDate } from '~/components/kb/filters';

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })
    const document = computed(()=>props.documentInfo?.body);
    
</script>