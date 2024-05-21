<template>
    <div id="Record" class="record ">
        <div class="record-body  bg-white" v-if="document">  

            <!--TODO: add compare-val for fields  -->

            <!-- TODO: add publish date -->            
            <!-- <ng v-vue-ng:document-date></ng> --> 
            
            <!-- section I begin -->
            <section v-if="document.government || document.notReportingOnNationalTargets || (document.targetPursued && document.nationalTargets.length)"   >
                <legend> {{ t("sectionI") }} </legend>
                
                <!-- tested -->
                <div v-if="document.government">                       
                    <label> {{ t("country") }}</label>
                    <div class="km-value">                   
                        <km-term :value="document.government" :locale="locale"></km-term>                       
                    </div>                        
                </div>

                <!-- tested -->
                <div v-if="document.notReportingOnNationalTargets">
                    <label><km-term :value="document.government" :locale="locale"></km-term> {{ t("hasAdopted") }} </label>
                    <label>{{ t("informationOnWhy") }} <km-term :value="document.government " :locale="locale"></km-term>{{ t("isChoosingTo") }}  </label>
                    <ng v-vue-ng:km-value-ml  :value="document.notReportingOnNationalTargetsReason" :locales="locale" html></ng>   
                </div>

                <!-- TODO: confirm test result: no return -->
                <div v-if="document.targetPursued && document.nationalTargets.length">
                    <label>{{ t("nationalTargets") }}</label>  
                        <!-- {{ document.nationalTargets }} -->
                    <div v-for="target in document.nationalTargets">     
                        <!-- {{ target.identifier }}   -->
                        <ng v-vue-ng:view-referenced-records  v-model:ng-model="target.identifier" ></ng>         
                    </div>                                
                </div>
            </section> 
            <!-- section I end -->

            <!-- section II begin -->
            <section v-if="document.implementationMeasures">
                <legend> {{ t("sectionII") }} </legend>              
                <div v-for="implementationMeasure in document.implementationMeasures" >                                             
                    <legend> {{lstring(implementationMeasure.title,locale)}}</legend>

                    <div v-if="implementationMeasure.description">
                        <label>{{t("measures")}}</label>
                        <ng v-vue-ng:km-value-ml  :value="implementationMeasure.description" :locales="locale" html></ng>  
                    </div>

                    <!-- TODO: test issue: don't get result by use km-term -->                    
                    <div v-if="implementationMeasure.nationalTargets">                      
                        <label>{{t("nationalTargets")}}</label>  
                        <!-- {{ implementationMeasure.nationalTargets}}       -->
                     
                        <div class="km-value">
                            <div v-for="nationalTarget in implementationMeasure.nationalTargets" >                               
                                <km-term :value="nationalTarget" :locale="locale"></km-term>                            
                            </div> 
                        </div> 
                        <!-- <div class="km-value">
                            <ng v-vue-ng:view-terms-hierarchy  v-model:ng-model="implementationMeasure.nationalTargets" locale="locale"  term-domain="nationalTargets"></ng>
                         </div>                             -->
                    </div>
                                   
                    <div v-if="implementationMeasure.aichiTargets">
                        <label>{{t( "aichiTargets")}}</label>     
                        <!-- <div class="km-value">
                            <div v-for="aichiTarget in implementationMeasure.aichiTargets" > 
                                <km-term :value="aichiTarget" :locale="locale"></km-term> 
                            </div>  
                        </div>    -->                     
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
                    <br/>                      
                </div>              
            </section> 
            <!-- section II end -->

            <!-- section III begin -->
            <section v-if="document.progressAssessments">              
                <legend> {{ t("sectionIII") }} </legend>
                <div v-for="progressAssessment in document.progressAssessments">
                    {{ progressAssessment }}
                    <label>
                        <!-- Progress Assessment for -->
                        
                        <span v-if="progressAssessment.aichiTarget"> 
                            <!-- AICHI target  --> 
                            <km-term :value="progressAssessment.aichiTarget" :locale="locale"></km-term>                        
                        </span>
                        <!-- TODO: can't get result through km-term -->
                        <span v-if="progressAssessment.nationalTarget">
                            <!-- national target  -->
                            <km-term :value="progressAssessment.nationalTarget" :locale="locale"></km-term>     
                        </span>
                    </label>                 
                    
                    <!--TODO: can't get result.use api get documentInfo by process show progress assessment page --> 
                    <!-- <national-assessment :document-info="progressAssessmentDocumentInfo" :locale="locale"></national-assessment>   -->
                    <div v-if="progressAssessment.assessment &&progressAssessment.assessment.identifier">
                        <ng v-vue-ng:view-referenced-records  v-model:ng-model="progressAssessment.assessment.identifier" ></ng>  
                    </div>     
                    <br/>
                </div>
            </section>  
            <!-- section III end -->

            <!-- section IV begin -->
            <section  v-if="document.nationalContribution">            
                <legend> {{ t("sectionIV") }} </legend>                    
                <div v-for="aichiTarget in document.nationalContribution" > 
                    <div v-if="aichiTarget.identifier">                                                
                        <km-term :value="aichiTarget" :locale="locale"></km-term> 
                        <!-- TODO: get nationalReport data -->                        
                        <div v-if="aichiTarget.identifier=='AICHI-TARGET-16' ">
                            <!-- {{ aichiTarget }} -->
                            <div>
                                <label >{{t('interimNationalReport')}}</label>
                                <div v-if="aichiTarget.nationalReport && aichiTarget.nationalReport.identifier ">
                                    <ng v-vue-ng:view-referenced-records  v-model:ng-model="aichiTarget.nationalReport.identifier" ></ng>  
                                </div>
                            </div>
                            <div v-if="aichiTarget.nationalReportDescription">
                                <label >{{t("additionalRelevantInfo")}}</label>                                      
                                <ng v-vue-ng:km-value-ml  :value="aichiTarget.nationalReportDescription" :locales="locale" html></ng>
                            </div>	
                            <div v-if="aichiTarget.linkedRecordsDescription">
                                <label>{{t("description")}}</label>                               
                                <ng v-vue-ng:km-value-ml  :value="aichiTarget.linkedRecordsDescription" :locales="locale" html></ng>
                            </div>
                        </div>

                      
                        <!-- TODO: get resourceMobilisationReport data--> 
                        <div v-if="aichiTarget.identifier=='AICHI-TARGET-20' ">
                            <!-- {{ aichiTarget }} -->
                            <label>{{t("finalcialReportingFramework")}}</label><br/>
                            <div v-if="aichiTarget.resourceMobilisationReport && aichiTarget.resourceMobilisationReport.identifier">
                                <ng v-vue-ng:view-referenced-records  v-model:ng-model="aichiTarget.resourceMobilisationReport.identifier" ></ng>  
                            </div>
                        </div> 
                        
                        <div v-if="aichiTarget.description">
                            <label>{{t("description")}}</label>                         
                            <ng v-vue-ng:km-value-ml  :value="aichiTarget.description" :locales="locale" html></ng>
                        </div>
                        
                        <div v-if="aichiTarget.achievementActivities">
                            <label>{{t("otherActivities")}}</label>                             
                            <ng v-vue-ng:km-value-ml  :value="aichiTarget.achievementActivities" :locales="locale" html></ng>
                        </div>
                    </div>
                </div>
                
                <div v-if="document.nationalContribution.nationalContributionSDGs">                     
                    <label for="">{{ t("descriptionDescribe") }}</label>                         
                    <ng v-vue-ng:km-value-ml  :value="document.nationalContribution.nationalContributionSDGs" :locales="locale" html></ng>            
                </div>              
            </section>
            <!-- section IV end -->

            <!-- section V begin -->
            <section v-if="document.gspcNationalContribution">
                <legend>{{t("sectionV")}}</legend>
                <div>                               
                    <div v-if="document.gspcNationalContribution.hasGSPCTargets">                                          
                        <div class="km-value">
                            <strong><km-term :value="document.government" :locale="locale"></km-term>{{t("hasNationalTargets")}}</strong>
                        </div>
                    </div>
                    
                    <div v-if="!document.gspcNationalContribution.hasGSPCTargets">                
                        <div class="km-value ">
                            <strong><km-term :value="document.government" :locale="locale"></km-term>{{t("notHaveNationalTargets")}}</strong>
                        </div>
                    </div>                    
                    
                    <div v-if="document.gspcNationalContribution.gspcTargetDescription">
                        <label>{{t("detailsOnTargets")}}</label>                     
                        <ng v-vue-ng:km-value-ml  :value="document.gspcNationalContribution.gspcTargetDescription" :locales="locale" html></ng> 
                    </div>                    
                
                    <div v-if="document.gspcNationalContribution.plantConservationNetwork">
                        <label>{{t("informationOnNetworks")}}</label>                     
                        <ng v-vue-ng:km-value-ml  :value="document.gspcNationalContribution.plantConservationNetwork" :locales="locale" html></ng> 
                    </div>
                
                    <div v-if="document.gspcNationalContribution.implementationMeasures">
                        <label>{{t("majorMeasures")}}</label>                  
                        <ng v-vue-ng:km-value-ml  :value="document.gspcNationalContribution.implementationMeasures" :locales="locale" html></ng> 
                    </div>                              
                </div>
                
                <div v-for="gspcTarget in document.gspcNationalContribution" >       
                    <div v-if="gspcTarget.identifier">                                           
                        <km-term :value="gspcTarget" :locale="locale"></km-term> 
                    
                        <div v-if="gspcTarget.categoryProgress">
                            <label>{{t("category")}}</label>
                            <div class="km-value">
                                <km-term :value="gspcTarget.categoryProgress" :locale="locale"></km-term>
                            </div>
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
                <br/>
            </section>
            <!-- section V end -->

            
            <!-- section VI begin -->
            <section>
                <legend>{{t("sectionVI")}}</legend>	             
                <div v-if="document.iplcContribution">                  
                    <ng v-vue-ng:km-value-ml  :value="document.iplcContribution" :locales="locale" html></ng>
                </div>              
                <div v-else class="km-value">
                    {{t("noInformationAvailable")}}                  
                </div>
            </section>
            <!-- section VI end -->
            
            
            <!-- section VII begin -->
            <section v-if="document.biodiversityCountryProfile">  
                <legend>{{t("sectionVII")}}</legend>                  
                <div v-if="document.biodiversityCountryProfile.statusAndTrends">
                    <label>{{t("biodiversityFacts")}}</label>						
                    <ng v-vue-ng:km-value-ml  :value="document.biodiversityCountryProfile.statusAndTrends" :locales="locale" html></ng>
                </div>
            
                <div v-if="document.biodiversityCountryProfile.mainDriversofChange">
                    <label>{{t("mainPressures")}}</label>						
                    <ng v-vue-ng:km-value-ml  :value="document.biodiversityCountryProfile.mainDriversofChange" :locales="locale" html></ng>
                </div>
                
                <div v-if="document.biodiversityCountryProfile.nbsapImplementation">
                    <label>{{t("implementationNbsap")}}</label>						
                    <ng v-vue-ng:km-value-ml  :value="document.biodiversityCountryProfile.nbsapImplementation" :locales="locale" html></ng>
                </div>
            
                <div v-if="document.biodiversityCountryProfile.strategicPlanActions">
                    <label>{{t("overallActions")}}</label>						
                    <ng v-vue-ng:km-value-ml  :value="document.biodiversityCountryProfile.strategicPlanActions" :locales="locale" html></ng>
                </div>
                
                <div v-if="document.biodiversityCountryProfile.supportMechanisms">
                    <label>{{t("supportMechanisms")}}</label>						
                    <ng v-vue-ng:km-value-ml  :value="document.biodiversityCountryProfile.supportMechanisms" :locales="locale" html></ng>
                </div>
                
                <div v-if="document.biodiversityCountryProfile.monitoringReviewingMechanisms">
                    <label>{{t("mechanisms")}}</label>					
                    <ng v-vue-ng:km-value-ml  :value="document.biodiversityCountryProfile.monitoringReviewingMechanisms" :locales="locale" html></ng>
                </div>               
            </section>	
            <!-- section VII end -->    

        
            <section v-if="document.relevantInformation || document.relevantDocuments">
                <legend>{{ t("additionalInformation") }}</legend>                
                <view-relevant-information :relevant-information="document.relevantInformation" :relevant-documents="document.relevantDocuments" :locale="locale"> 
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
    import '~/views/forms/view/directives/view-record-reference.directive.js'
    import '~/views/forms/view/directives/view-reference-records.directive.js' 
    import viewRelevantInformation from '~/views/forms/view/directives/view-relevant-information.vue';
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/national-report-6.json';
    import { useI18n } from 'vue-i18n';    
    import { lstring } from '~/components/kb/filters';
    import '~/views/forms/directives/view-terms-hierarchy.js'   
 

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })
    const document = computed(()=>props.documentInfo?.body);
       
</script>