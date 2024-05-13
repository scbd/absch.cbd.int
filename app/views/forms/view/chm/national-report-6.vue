<template>
    <div id="Record" class="record ">
        <div class="record-body  bg-white" v-if="document">  
            <!-- {{ document }} -->
            <section>
                <legend> {{ t("sectionI") }} </legend>
                
                <div v-if="document.government">                       
                    <label> {{ t("country") }}</label>
                    <div class="km-value">                   
                        <km-term :value="document.government " :locale="locale"></km-term>
                    </div>                        
                </div>

                <div v-if="document.notReportingOnNationalTargets">
                    <label><km-term :value="document.government " :locale="locale"></km-term> {{ t("hasAdpted") }} </label>
                    <label>{{ t("informationOnWhy") }} <km-term :value="document.government " :locale="locale"></km-term>{{ t("isChoosingTo") }}  </label>
                    <ng v-vue-ng:km-value-ml  :value="document.notReportingOnNationalTargetsReason" :locales="locale"></ng>   
                </div>

                <div v-if="document.targetPursued && document.nationalTargets.length">
                    <label>{{ t("nationalTargets") }}</label>     
                    <!--TODO: v-for can't use v-model  -->
                    <div class="km-value" compare-val>
                        <!-- <div  v-for="nationalTarget in targets" > 
                            <ng v-vue-ng:view-record-reference  v-model:ng-model="nationalTarget" :locales="locale" html></ng>       
                        </div>  -->
                       </div> 
                </div>
            </section> 

            <section>
                <legend> {{ t("sectionII") }} </legend>
                <div v-if="document.implementationMeasures">
                    <div v-for="implementationMeasure in document.implementationMeasures" >                                             
                        <label> {{lstring(implementationMeasure.title,locale)}}</label>

                        <div v-if="implementationMeasure.description">
                            <label>{{t("measures")}}</label>
                            <ng v-vue-ng:km-value-ml  :value="implementationMeasure.description" :locales="locale"></ng>  
                        </div>
                        <div v-if="implementationMeasure.nationalTargets">
                            <label>{{t("nationalTargets")}}</label>                           
                            <div v-for="nationalTarget in implementationMeasure.nationalTargets">
                                <ng v-vue-ng:km-value-ml  :value="nationalTargets[nationalTarget.identifier].title" :locales="locale"></ng>  
                            </div>                            
                        </div>
                        <div v-if="implementationMeasure.aichiTargets">
                            <label>{{t( "aichiTargets")}}</label>                           
                            <div v-for="aichiTarget in implementationMeasure.aichiTargets">                                 
                                <ng v-vue-ng:km-value-ml  :value="aichiTargets[aichiTarget.identifier].title" :locales="locale"></ng> 
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
                            <ng v-vue-ng:km-value-ml  :value="implementationMeasure.assessmentDescription" :locales="locale"></ng> 
                        </div>                   
                        <div v-if="implementationMeasure.relevantDocuments">
                            <label>{{t("relevantWebsites")}}</label>
                            <div class="km-value">
                                <div v-for="item in implementationMeasure.relevantDocuments">
                                    <a translation-url target="target" :href="item.url">
                                        {{item.name||item.url}}
                                    </a> 
                                    <span v-if="item.tag">({{item.tag}})</span>
                                </div>
                            </div>
                        </div>

                        <div v-if="implementationMeasure.otherRelevantInformation">
                            <label>{{t("otherRelevantInfo")}}</label>
                            <ng v-vue-ng:km-value-ml  :value="implementationMeasure.otherRelevantInformation" :locales="locale"></ng>
                        </div>

                        <div v-if="implementationMeasure.otherRelevantDocuments">
                            <label>{{t("otherRelevantWebsite")}}</label>
                            <div class="km-value">
                                <div v-for="item in implementationMeasure.otherRelevantDocuments">
                                    <a translation-url target="target" :href="item.url">
                                        {{item.name||item.url}}
                                    </a> <span v-if="item.tag">({{item.tag}})</span>
                                </div>
                            </div>
                        </div> 
                        <div v-if="implementationMeasure.obstacles">						
                            <label>{{t("obstacles")}}</label>                       
                            <ng v-vue-ng:km-value-ml  :value="implementationMeasure.obstacles" :locales="locale"></ng>
                        </div>
                        <div v-if="implementationMeasure.obstaclesRelevantDocuments">
                            <label>{{t("relevantWebsitesAndLinks")}}</label>
                            <div class="km-value">
                                <div v-for="item in implementationMeasure.obstaclesRelevantDocuments">
                                    <a translation-url target="target" :href="item.url">
                                        {{item.name||item.url}} 
                                    </a>	
                                    <span v-if="item.tag">({{item.tag}})</span>									
                                </div>
                            </div>
                        </div>                         
                        <br/>                      
                    </div>
                </div>
            </section>

            <section>
                <legend> {{ t("sectionIII") }} </legend>
                <div v-for="progressAssessment in progressAssessments">
                    <label>
                        <!-- Progress Assessment for -->
                        <span v-if="progressAssessment.aichiTarget"> 
                            <!-- AICHI target  -->                                    
                            {{lstring(aichiTargets[progressAssessment.aichiTarget.identifier].title, locale)}}
                        </span>
                        <span v-if="progressAssessment.nationalTarget">
                            <!-- national target  -->         
                            {{lstring(nationalTargets[progressAssessment.nationalTarget.identifier].title, locale)}}
                        </span>
                    </label>
                    <!-- <view-national-assessment ng-model="progressAssessment" locale="locale" target="{{target}}"></view-national-assessment>	 -->
                    <ng v-vue-ng:view-national-assessment  :value="progressAssessment" :locales="locale"  target="target"></ng>
                    <br/>
                </div>
            </section>  

            <section>
                <legend> {{ t("sectionIV") }} </legend> 
                <div v-for="aichiTarget in document.nationalContribution" v-if="aichiTarget.identifier"> 
                    <legend>{{lstring(aichiTargets[aichiTarget.identifier].title,locale)}}</legend>
                    <div v-if="aichiTarget.identifier=='AICHI-TARGET-16' && (absNationalReport||absLinkedRecords || aichiTarget.linkedRecordsDescription)">
                        <div v-if="absNationalReport">
                            <div>
                                <label for="">{{t("interimNationalReport")}}</label><br/>
                                <a translation-url target="_blank" :href="absNationalReport.url_ss[0]">
                                                    {{absNationalReport.uniqueIdentifier_s|uppercase}}</a> 
                                {{absNationalReport.title_t}}
                            </div>
                            <div v-if="aichiTarget.nationalReportDescription">
                                <label for="">{{t("additionalRelevantInfo")}}</label>                                      
                                <ng v-vue-ng:km-value-ml  :value="aichiTarget.nationalReportDescription" :locales="locale" html></ng>
                            </div>							
                        </div>

                        <div v-if="aichiTarget.linkedRecordsDescription">
                            <label for="">{{t("description")}}</label>                               
                            <ng v-vue-ng:km-value-ml  :value="aichiTarget.linkedRecordsDescription" :locales="locale" html></ng>
                        </div>

                        <div v-if="absLinkedRecords">    
                            <label for="">{{t("absRecords")}}</label>
                            <table class="table table-hover">
                                <tbody>
                                    <tr v-for="item in absLinkedRecords">
                                        <td class="ng-binding">
                                            <a translation-url target="_blank" :href="item.url_ss[0]">
                                                {{item.uniqueIdentifier_s|uppercase}}
                                            </a> 
                                            {{lstring(item.title_t,locale)}}
                                        </td>											                                                
                                    </tr>
                                </tbody>
                            </table>                                        
                        </div>
                    </div>
                    <div v-if="aichiTarget.identifier=='AICHI-TARGET-20' && resourceMobilisationReport">
                        <label for="">{{t("finalcialReportingFramework")}}</label><br/>
                        <a translation-url target="_blank" :href="resourceMobilisationReport.url_ss[0]">
                            {{resourceMobilisationReport.url_ss[0]}}
                        </a> 
                        {{resourceMobilisationReport.title_t}}
                    </div>
                    <div v-if="aichiTarget.description">
                        <label>{{t("description")}}</label>                         
                        <ng v-vue-ng:km-value-ml  :value="aichiTarget.description" :locales="locale" html></ng>
                    </div>
                    <div v-if="aichiTarget.achievementActivities">
                        <label for="">{{t("otherActivities")}}</label>                             
                        <ng v-vue-ng:km-value-ml  :value="aichiTarget.achievementActivities" :locales="locale" html></ng>
                    </div>
                </div>
                <div v-if="document.nationalContribution.nationalContributionSDGs">                     
                    <label for="">{{ t("descriptionDescribe") }}</label>                         
                     <ng v-vue-ng:km-value-ml  :value="document.nationalContribution.nationalContributionSDGs" :locales="locale" html></ng>            
                 </div>
            </section>

            <section>
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

                <div v-for="gspcTarget in document.gspcNationalContribution" v-if="gspcTarget.identifier">                                      
                    <legend>{{lstring(gspcTargets[gspcTarget.identifier].title ,locale)}}</legend>

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
                <br/>
            </section>

            <section>
                <legend>{{t("sectionVI")}}</legend>
		
                <div v-if="document.iplcContribution">                  
                    <ng v-vue-ng:km-value-ml  :value="document.iplcContribution" :locales="locale" html></ng>
                </div>
                <div v-if="!document.iplcContribution">
                    <div class="km-value">
                        {{t("noInformationAvailable")}}
                    </div>
                </div>
            </section>
				
			<section>
                <legend>{{t("sectionVII")}}</legend>
                <div v-if="document.biodiversityCountryProfile.statusAndTrends">
                    <label>{{t("biodiversityFacts")}}</label>						
                    <ng v-vue-ng:km-value-ml  :value="document.biodiversityCountryProfile.statusAndTrends" :locales="locale" html></ng>
                </div>
                <div v-if="document.biodiversityCountryProfile.mainDriversofChange">
                    <label>{{t("mainPressures")}}</label>						
                    <ng v-vue-ng:km-value-ml  :value="document.biodiversityCountryProfile.mainDriversofChange"" :locales="locale" html></ng>
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
		
				
			
		
				

				
		
	
		
		


        </div>   
    </div>
</template>
<script setup>
    import { computed } from 'vue'; 
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'
    import '~/views/forms/view/directives/view-record-reference.directive.js'
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/national-report-6.json';
    import { useI18n } from 'vue-i18n';
    import { formatDate } from '~/components/kb/filters';

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })
    const document = computed(()=>props.documentInfo?.body);
</script>