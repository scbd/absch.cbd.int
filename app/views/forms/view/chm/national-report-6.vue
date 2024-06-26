
<template>
    <div id="Record" class="record">
        <div class="record-body  bg-white" v-if="document">  
            <!--TODO: add compare-val for fields  -->
            <!-- TODO: add publish date -->            
            <!-- <ng v-vue-ng:document-date></ng> --> 


            <div class="d-flex justify-content-center" v-if="isLoadingTargets||isLoadingAssessments">
                <div class="spinner-border" role="status">
                  <span class="sr-only"></span>
                </div>
            </div>
            
            <!-- section I begin -->
            <section v-if="hasSectionIData">
                <legend> {{ t("sectionI") }} </legend>
               
                <div v-if="document?.government">                       
                    <label> {{ t("country") }}</label>
                    <div class="km-value">                   
                        <km-term :value="document.government" :locale="locale"></km-term>                       
                    </div>                        
                </div>
           
                <div class="card" v-if="document?.notReportingOnNationalTargets">
                    <div class="card-header" >                       
                        <h3 v-if="document?.government"><km-term :value="document?.government" :locale="locale"></km-term> {{ t("hasAdopted") }} </h3>
                    </div>
                    <div class="card-body" >
                        <label v-if="document?.government">{{ t("informationOnWhy") }} <km-term :value="document?.government " :locale="locale"></km-term>{{ t("isChoosingTo") }}  </label>
                        <ng v-vue-ng:km-value-ml  :value="document?.notReportingOnNationalTargetsReason" :locales="locale" html></ng>  
                    </div>
                </div>    

                <div v-if="document?.targetPursued && document?.nationalTargets?.length>0">
                    <label>{{ t("nationalTargets") }}</label>  
                    <div v-for="item in document?.nationalTargets" :key="item">                       
                        <national-target  :hide-record-reference="true"  :document-info="nationalTargets[item.identifier]" :locale="locale" class="mb-2"></national-target>
                    </div>
                </div>              
                   
                           
            </section> 
            <!-- section I end -->

            <!-- section II begin -->
            <section v-if="document?.implementationMeasures">
                <legend> {{ t("sectionII") }} </legend> 
                <div v-for="implementationMeasure in document?.implementationMeasures" :key="implementationMeasure" >   
                    <div class="card mb-2" >                         
                        <div class="card-header">                          
                            <h3 v-if="implementationMeasure.title"> {{lstring(implementationMeasure.title,locale)}}</h3>
                        </div>
                        <div class="card-body">  
                            <div v-if="implementationMeasure.description">
                                <label>{{t("measures")}}</label>
                                <ng v-vue-ng:km-value-ml  :value="implementationMeasure.description" :locales="locale" html></ng>  
                            </div>
                        
                            <div v-if="implementationMeasure.nationalTargets"> 
                                <label>{{t("nationalTargets")}}</label> 
                                <div class="km-value">
                                    <div v-for="nationalTarget in implementationMeasure.nationalTargets" :key="nationalTarget" >
                                        <div v-if="nationalTargets[nationalTarget.identifier]">
                                            {{lstring(nationalTargets[nationalTarget.identifier].body.title,locale)}} 
                                        </div>                                                                                               
                                    </div> 
                                </div> 
                            </div>
                                        
                            <div v-if="implementationMeasure.aichiTargets">
                                <label>{{t( "aichiTargets")}}</label>
                                <div class="km-value">
                                    <ng v-vue-ng:view-terms-hierarchy  v-model:ng-model="implementationMeasure.aichiTargets" locale="locale"  term-domain="aichiTargets"></ng>
                                </div>               
                            </div>                        
                            
                            <div v-if="implementationMeasure.assessment">
                                <label>{{t("assessment")}}</label>                       
                                <div class="km-value" > 
                                    <km-term :value="implementationMeasure.assessment" :locale="locale"></km-term>
                                </div>
                            </div>    
                        
                            <div v-if="implementationMeasure.assessmentDescription">
                                <label>{{t("toolsOrMethodology")}}</label>
                                <ng v-vue-ng:km-value-ml  :value="implementationMeasure.assessmentDescription" :locales="locale" html></ng> 
                            </div> 
                                        
                            <div v-if="implementationMeasure.relevantDocuments">
                                <label>{{t("relevantWebsites")}}</label>                       
                                <div class="km-value" >                   
                                    <ng v-vue-ng:km-link-list v-model:ng-model="implementationMeasure.relevantDocuments" ></ng>    
                                </div>
                            </div>
                        
                            <div v-if="implementationMeasure.otherRelevantInformation">
                                <label>{{t("otherRelevantInfo")}}</label>
                                <ng v-vue-ng:km-value-ml  :value="implementationMeasure.otherRelevantInformation" :locales="locale" html></ng>
                            </div>
                        
                            <div v-if="implementationMeasure.otherRelevantDocuments">
                                <label>{{t("otherRelevantWebsite")}}</label>                      
                                <div class="km-value" >                   
                                    <ng v-vue-ng:km-link-list v-model:ng-model="implementationMeasure.otherRelevantDocuments" ></ng>    
                                </div>
                            </div> 
                        
                            <div v-if="implementationMeasure.obstacles">                        
                                <label>{{t("obstacles")}}</label>                       
                                <ng v-vue-ng:km-value-ml  :value="implementationMeasure.obstacles" :locales="locale" html></ng>
                            </div>
                            
                            <div v-if="implementationMeasure.obstaclesRelevantDocuments">
                                <label>{{t("relevantWebsitesAndLinks")}}</label>                       
                                <div class="km-value" >                   
                                    <ng v-vue-ng:km-link-list v-model:ng-model="implementationMeasure.obstaclesRelevantDocuments" ></ng>    
                                </div>
                            </div>  
                        </div>       
                    </div>                                   
                </div> 
            </section> 
            <!-- section II end -->

            <!-- section III begin -->
            <section v-if="document?.progressAssessments"> 
                <legend> {{ t("sectionIII") }} </legend>  
                <div v-for="progressAssessment in document.progressAssessments"  :key="progressAssessment"  class="mb-3" >               
                    <h3>                  
                        <span v-if="progressAssessment.aichiTarget?.length>0"> 
                            <!-- AICHI target  --> 
                            <km-term :value="progressAssessment.aichiTarget" :locale="locale"></km-term>                        
                        </span>
                    
                        <span v-if="progressAssessment?.nationalTarget && nationalTargets[progressAssessment.nationalTarget.identifier] ">                                
                            <!-- national target  -->                                                      
                            {{lstring(nationalTargets[progressAssessment.nationalTarget.identifier]?.body?.title,locale)}}                             
                        </span> 
                    </h3>                  
            
                    <div v-if="progressAssessment.assessment?.identifier" >
                        <national-assessment   :hide-record-reference="true"  :document-info="progressAssessments[progressAssessment.assessment.identifier] " :locale="locale"></national-assessment>
                    </div>     
                </div>
            </section>              
            <!-- section III end -->

            <!-- section IV begin -->
            <section  v-if="document?.nationalContribution">            
                <legend> {{ t("sectionIV") }} </legend>                    
                <div v-for="aichiTarget in document?.nationalContribution" :key="aichiTarget" class="mb-2"> 
                    <div v-if="aichiTarget.identifier" class="card mb-2"> 
                        <div class="card-header">
                            <h3><km-term :value="aichiTarget" :locale="locale"></km-term></h3>
                        </div>
                        <div class="card-body">                           
                            <div v-if="aichiTarget.identifier=='AICHI-TARGET-16' ">
                                <!-- {{ aichiTarget }} -->
                                <div>
                                    <label >{{t("interimNationalReport")}}</label>
                                    <div v-if="aichiTarget?.nationalReport?.identifier">
                                        <ng v-vue-ng:view-record-reference  v-model:ng-model="aichiTarget.nationalReport.identifier" :locales="locale" html></ng> 
                                    </div>
                                </div>
                                <div v-if="aichiTarget.nationalReportDescription">
                                    <label >{{t("additionalRelevantInfo")}}</label>                                      
                                    <ng v-vue-ng:km-value-ml  :value="aichiTarget.nationalReportDescription" :locales="locale" html></ng>
                                </div>  
                                <div v-if="aichiTarget.linkedRecordsDescription">
                                    <label>{{t("aichiTargetDescription")}}</label>                               
                                    <ng v-vue-ng:km-value-ml  :value="aichiTarget.linkedRecordsDescription" :locales="locale" html></ng>
                                </div>
                            </div>                
                            
                            <div v-if="aichiTarget.identifier=='AICHI-TARGET-20' ">
                                <!-- {{ aichiTarget }} -->
                                <label>{{t("financialReportingFramework")}}</label><br/>
                                <div v-if="aichiTarget?.resourceMobilisationReport?.identifier">                                 
                                    <ng v-vue-ng:view-record-reference  v-model:ng-model="aichiTarget.resourceMobilisationReport.identifier" :locales="locale" html></ng>                        
                                </div>
                            </div> 
                            
                            <div v-if="aichiTarget.description">
                                <label>{{t("aichiTargetDescription")}}</label>                         
                                <ng v-vue-ng:km-value-ml  :value="aichiTarget.description" :locales="locale" html></ng>
                            </div>
                            
                            <div v-if="aichiTarget.achievementActivities">
                                <label>{{t("otherActivities")}}</label>                             
                                <ng v-vue-ng:km-value-ml  :value="aichiTarget.achievementActivities" :locales="locale" html></ng>
                            </div>                                                    
                        </div>                      
                    </div>                   
                </div>               
                
                <div v-if="document?.nationalContribution?.nationalContributionSDGs">                     
                    <label for="">{{ t("descriptionDescribe") }}</label>                         
                    <ng v-vue-ng:km-value-ml  :value="document.nationalContribution.nationalContributionSDGs" :locales="locale" html></ng>            
                </div>              
            </section>
            <!-- section IV end -->
            <!-- section V begin -->
            <section v-if="document.gspcNationalContribution">
                <legend>{{t("sectionV")}}</legend>
                <div class="card mb-2">
                    <div class="card-body">                       
                        <div v-if="document?.gspcNationalContribution?.hasGSPCTargets">                                          
                            <div class="km-value">
                                <strong><km-term :value="document.government" :locale="locale"></km-term>{{t("hasNationalTargets")}}</strong>
                            </div>
                        </div>
                        
                        <div v-if="!document?.gspcNationalContribution?.hasGSPCTargets">                
                            <div class="km-value ">
                                <strong><km-term :value="document.government" :locale="locale"></km-term>{{t("notHaveNationalTargets")}}</strong>
                            </div>
                        </div>                    
                        
                        <div v-if="document?.gspcNationalContribution?.gspcTargetDescription">
                            <label>{{t("detailsOnTargets")}}</label>                     
                            <ng v-vue-ng:km-value-ml  :value="document.gspcNationalContribution.gspcTargetDescription" :locales="locale" html></ng> 
                        </div>                    
                    
                        <div v-if="document?.gspcNationalContribution?.plantConservationNetwork">
                            <label>{{t("informationOnNetworks")}}</label>                     
                            <ng v-vue-ng:km-value-ml  :value="document.gspcNationalContribution.plantConservationNetwork" :locales="locale" html></ng> 
                        </div>
                    
                        <div v-if="document?.gspcNationalContribution?.implementationMeasures">
                            <label>{{t("majorMeasures")}}</label>                  
                            <ng v-vue-ng:km-value-ml  :value="document.gspcNationalContribution.implementationMeasures" :locales="locale" html></ng> 
                        </div>     
                    </div>                         
                </div>                
             
                <div v-for="gspcTarget in document?.gspcNationalContribution" :key="gspcTarget" >       
                    <div v-if="gspcTarget.identifier"> 
                        <div class="card mb-2">
                            <div class="card-header">                        
                                <km-term :value="gspcTarget" :locale="locale"></km-term> 
                            </div>
                            <div class="card-body" v-if="gspcTarget.categoryProgress || gspcTarget.progressDescription || gspcTarget.description"> 
                                <div v-if="gspcTarget.categoryProgress">
                                    <label>{{t("category")}}</label>
                                    <h3>
                                        <km-term :value="gspcTarget.categoryProgress" :locale="locale"></km-term>
                                    </h3>
                                </div>
                            
                                <div v-if="gspcTarget.progressDescription">
                                    <label>{{t("explanation")}}</label>                      
                                    <ng v-vue-ng:km-value-ml  :value="gspcTarget.progressDescription" :locales="locale" html></ng> 
                                </div>
                            
                                <div v-if="gspcTarget.description">
                                    <label>{{t("howAndWhat")}}</label>                    
                                    <ng v-vue-ng:km-value-ml  :value="gspcTarget.description" :locales="locale" html></ng> 
                                </div>                                                        
                            </div>
                        </div>
                    </div>                               
                </div>                
            </section>
            <!-- section V end -->
            
            <!-- section VI begin -->
            <section >
                <legend>{{t("sectionVI")}}</legend> 

                <div class="card">
                    <div class="card-body">
                        <div v-if="document?.iplcContribution" >                  
                            <ng v-vue-ng:km-value-ml  :value="document.iplcContribution" :locales="locale" html></ng>
                        </div>              
                        <div v-else>
                            {{t("noInformationAvailable")}}                  
                        </div>
                    </div>
                </div>               
            </section>
            <!-- section VI end -->
            
            
            <!-- section VII begin -->
            <section v-if="document?.biodiversityCountryProfile">  
                <legend>{{t("sectionVII")}}</legend>   
                <div class="card">
                    <div class="card-body">
                        <div v-if="document?.biodiversityCountryProfile?.statusAndTrends">
                            <label>{{t("biodiversityFacts")}}</label>                       
                            <ng v-vue-ng:km-value-ml  :value="document.biodiversityCountryProfile.statusAndTrends" :locales="locale" html></ng>
                        </div>
                    
                        <div v-if="document?.biodiversityCountryProfile?.mainDriversofChange">
                            <label>{{t("mainPressures")}}</label>                       
                            <ng v-vue-ng:km-value-ml  :value="document.biodiversityCountryProfile.mainDriversofChange" :locales="locale" html></ng>
                        </div>
                        
                        <div v-if="document?.biodiversityCountryProfile?.nbsapImplementation">
                            <label>{{t("implementationNbsap")}}</label>                     
                            <ng v-vue-ng:km-value-ml  :value="document.biodiversityCountryProfile.nbsapImplementation" :locales="locale" html></ng>
                        </div>
                    
                        <div v-if="document?.biodiversityCountryProfile?.strategicPlanActions">
                            <label>{{t("overallActions")}}</label>                      
                            <ng v-vue-ng:km-value-ml  :value="document.biodiversityCountryProfile.strategicPlanActions" :locales="locale" html></ng>
                        </div>
                        
                        <div v-if="document?.biodiversityCountryProfile?.supportMechanisms">
                            <label>{{t("supportMechanisms")}}</label>                       
                            <ng v-vue-ng:km-value-ml  :value="document.biodiversityCountryProfile.supportMechanisms" :locales="locale" html></ng>
                        </div>
                        
                        <div v-if="document?.biodiversityCountryProfile?.monitoringReviewingMechanisms">
                            <label>{{t("mechanisms")}}</label>                  
                            <ng v-vue-ng:km-value-ml  :value="document.biodiversityCountryProfile.monitoringReviewingMechanisms" :locales="locale" html></ng>
                        </div>   
                    </div>                               
                </div>               
            </section>  
            <!-- section VII end -->   
        
            <section v-if="document?.relevantInformation || document?.relevantDocuments">
                <legend>{{ t("additionalInformation") }}</legend>                
                <view-relevant-information :relevant-information="document.relevantInformation" :relevant-documents="document.relevantDocuments" :locale="locale"> 
                </view-relevant-information> 
            </section>           
        
            <div> 
                <ng v-vue-ng:view-record-reference  v-model:ng-model="document.header.identifier" :locales="locale" html></ng>                        
            </div>         
        </div>  
        <!-- TODO: add footer  -->
        <!-- <ng v-vue-ng:document-metadata  :document="document"></ng>  -->
        
    </div>
</template>
<script setup>
    import { computed, onMounted,ref } from 'vue'; 
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'
    import '~/views/forms/view/directives/view-record-reference.directive.js'  
    import '~/views/forms/directives/view-terms-hierarchy.js'  
    import viewRelevantInformation from '~/views/forms/view/directives/view-relevant-information.vue';
    import nationalAssessment from '~/views/forms/view/chm/national-assessment.vue' 
    import nationalTarget from '~/views/forms/view/chm/national-target.vue' 
    import KmDocumentApi from "~/api/km-document";
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/national-report-6.json';
    import { useI18n } from 'vue-i18n';    
    import { lstring } from '~/components/kb/filters';  
    import { useAuth } from "@scbd/angular-vue/src/index.js"; 
  

    const auth = useAuth();
    const kmDocumentApi = new KmDocumentApi({tokenReader:()=>auth.token()});    
    const { t } = useI18n({ messages });        
    const nationalTargets = ref([]); 
    const progressAssessments = ref([]);
    const isLoadingTargets = ref(true);
    const isLoadingAssessments = ref(true);

    const props = defineProps({
        documentInfo: { type:Object, required: true },
        locale      : { type:String, required: true },
    })
    const document = computed(()=>props.documentInfo?.body);

    const hasSectionIData = computed(()=>{
        return document?.value?.government || document?.value?.notReportingOnNationalTargets || 
               (document?.value?.targetPursued && document?.value?.nationalTargets.length >0)
        }
    );

    const loadNationalTargets = async function() {
        isLoadingTargets.value = true;
        await Promise.all(document.value.nationalTargets?.map(async (item) => {
            const result = await kmDocumentApi.getDocument((item.identifier)); 
            result.government=undefined;          
            nationalTargets.value[item.identifier]={body:result};                           
        }));
        isLoadingTargets.value = false;
    }
   
    const loadProgressAssessments = async function() {
        isLoadingAssessments.value = true;   
        await Promise.all(document.value.progressAssessments?.map(async (item) => {
            const result = await kmDocumentApi.getDocument((item.assessment.identifier)); 
            result.government=undefined;       
                  
            progressAssessments.value[item.assessment.identifier]={body:result};      
        }));  
        isLoadingAssessments.value = false;   
    }

    onMounted(() => {
        loadNationalTargets();  
        loadProgressAssessments();    
   })
 
</script>
