<template>
    <div id="Record" class="record ">
        <div class="record-body  bg-white" v-if="document">  
            <!--TODO: add compare-val for fields  -->

            <!-- TODO: add publish date -->            
            <!-- <ng v-vue-ng:document-date></ng> -->    
            
            <!-- section basic information and section 1-3 -->
            <view-financial-report :document="document" :locale="locale" type="2015"> 
            </view-financial-report>  

            <!-- section 4 begin -->
            <section v-if="document?.domesticExpendituresData">
                <legend>{{t("reportCurrentDomesticExpenditure")}}</legend>
                <div><label>{{t("annualFinancialSupport")}}</label></div>
               
                <div v-if="document?.domesticExpendituresData?.currency" >
                    <label>{{t( "currency")}}</label>
                    <span class="km-value km-pre">                        
                        <km-term :value="document.domesticExpendituresData.currency" :locale="locale"></km-term>   
                    </span>
                </div>

                <div v-if="document?.domesticExpendituresData?.multiplier" >
                    <label>{{t("allValues")}}</label>
                      <div class="km-value km-pre">
                         <span v-for="term in filter(options.multipliers,document.domesticExpendituresData.multiplier)"> 
                            {{lstring(term.title,locale)}} 
                         </span>
                      </div>
                </div>
              
                <table v-if="document?.domesticExpendituresData?.expenditures" class="table table-hover table-condensed">
                    <thead>
                        <tr>
                            <th>{{t("year")}}</th>
                            <th>{{t("domesticExpenditures")}}</th>
                            <th>{{t("overallConfidence")}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="expenditure in orderedExpenditures ">  
                            <td>{{expenditure.year}}</td>
                            <td>{{currencyString(expenditure.amount)}}</td>
                            <td><km-term :value="expenditure.confidenceLevel" :locale="locale"></km-term></td>
                        </tr>
                        <tr class="active">
                            <td><strong>{{t("average")}}</strong></td>
                            <td>{{currencyString(typeAverageAmount(document?.domesticExpendituresData?.expenditures,'amount'))}}</td>
                            <td>{{confidenceAverage(document?.domesticExpendituresData?.expenditures)}}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div v-if=" hasValueForDomesticExpendituresData ||document?.domesticExpendituresData?.sourcesAdditionalComments">
                    <label>{{t("informationOnSourcesAndCategories")}}</label>

                    <table class="table table-hover table-condensed">
                        <thead>
                            <tr>
                                <th>{{t("numbersAboveCover")}}</th>
                                <th>{{t("expendituresDirectly")}}</th>
                                <th>{{t("expendituresIndirectly")}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="hasValue(document?.domesticExpendituresData?.govCentralDirectlyRelated) || hasValue(document?.domesticExpendituresData?.govCentralIndirectlyRelated)">
                                <td>{{t("governmentBudgetsCentral")}}</td>
                                <td><div v-if="hasValue(document?.domesticExpendituresData?.govCentralDirectlyRelated)">
                                    <span v-for="term in filter(options.yesNo,document?.domesticExpendituresData?.govCentralDirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div>                                
                                </td>
                                <td><div v-if="hasValue(document?.domesticExpendituresData?.govCentralIndirectlyRelated)">
                                    <span v-for="term in filter(options.yesNo,document?.domesticExpendituresData?.govCentralIndirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div>
                                </td>
                            </tr>

                            <tr v-if="hasValue(document?.domesticExpendituresData?.provincialDirectlyRelated) || hasValue(document?.domesticExpendituresData?.provincialIndirectlyRelated)">
                                <td>{{t("governmentBudgetsState")}}</td>
                                <td><div v-if="hasValue(document?.domesticExpendituresData?.provincialDirectlyRelated)">
                                    <span v-for="term in filter(options.yesNo,document?.domesticExpendituresData?.provincialDirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                                <td><div v-if="hasValue(document?.domesticExpendituresData?.provincialIndirectlyRelated)">
                                    <span v-for="term in filter(options.yesNo,document?.domesticExpendituresData?.provincialIndirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                            </tr>

                            <tr v-if="hasValue(document?.domesticExpendituresData?.municipalDirectlyRelated) || hasValue(document?.domesticExpendituresData?.municipalIndirectlyRelated)">
                                <td>{{t("governmentBudgetsLocal")}}</td>
                                <td><div v-if="hasValue(document?.domesticExpendituresData?.municipalDirectlyRelated)">
                                    <span v-for="term in filter(options.yesNo,document?.domesticExpendituresData?.municipalDirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                                <td><div v-if="hasValue(document?.domesticExpendituresData?.municipalIndirectlyRelated)">
                                    <span v-for="term in filter(options.yesNo,document?.domesticExpendituresData?.municipalIndirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                            </tr>

                            <tr v-if="hasValue(document?.domesticExpendituresData?.extraDirectlyRelated) || hasValue(document?.domesticExpendituresData?.extraIndirectlyRelated)">
                                <td>{{t("extraBudgetary")}}</td>
                                <td><div v-if="hasValue(document?.domesticExpendituresData?.extraDirectlyRelated)">
                                    <span v-for="term in filter(options.yesNo,document?.domesticExpendituresData?.extraDirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                                <td><div v-if="hasValue(document?.domesticExpendituresData?.extraIndirectlyRelated)">
                                    <span v-for="term in filter(options.yesNo,document?.domesticExpendituresData?.extraIndirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                            </tr>
                           
                            <tr v-if="hasValue(document?.domesticExpendituresData?.privateDirectlyRelated) || hasValue(document?.domesticExpendituresData?.privateIndirectlyRelated)">
                                <td>{{t("privateMarket")}}</td>
                                <td><div v-if="hasValue(document?.domesticExpendituresData?.privateDirectlyRelated)">
                                    <span v-for="term in filter(options.yesNo,document?.domesticExpendituresData?.privateDirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                                <td><div v-if="hasValue(document?.domesticExpendituresData?.privateIndirectlyRelated)">
                                    <span v-for="term in filter(options.yesNo,document?.domesticExpendituresData?.privateIndirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                            </tr>
                          
                            <tr v-if="hasValue(document?.domesticExpendituresData?.otherDirectlyRelated) || hasValue(document?.domesticExpendituresData?.otherIndirectlyRelated)">
                                <td>{{t("otherNgo")}}</td>
                                <td><div v-if="hasValue(document?.domesticExpendituresData?.otherDirectlyRelated)">
                                    <span v-for="term in filter(options.yesNo,document?.domesticExpendituresData?.otherDirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                                <td><div v-if="hasValue(document?.domesticExpendituresData?.otherIndirectlyRelated)">
                                    <span v-for="term in filter(options.yesNo,document?.domesticExpendituresData?.otherIndirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                            </tr>

                            <tr v-if="hasValue(document?.domesticExpendituresData?.ilcDirectlyRelated) || hasValue(document?.domesticExpendituresData?.ilcIndirectlyRelated)">
                                <td>{{t("collectiveAction")}}</td>
                                <td><div v-if="hasValue(document?.domesticExpendituresData?.ilcDirectlyRelated)">
                                    <span v-for="term in filter(options.yesNo,document?.domesticExpendituresData?.ilcDirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                                <td><div v-if="hasValue(document?.domesticExpendituresData?.ilcIndirectlyRelated)">
                                    <span v-for="term in filter(options.yesNo,document?.domesticExpendituresData?.ilcIndirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                   
                    <div v-if="document?.domesticExpendituresData?.sourcesAdditionalComments">
                        <label>{{t("additionalMethodologicalInformation")}}</label>                       
                        <ng v-vue-ng:km-value-ml  :value="document?.domesticExpendituresData?.sourcesAdditionalComments" :locales="locale" html km-pre></ng> 
                    </div>
                </div>

                <div v-if="document?.domesticExpendituresData?.domesticCollectiveAction">
                    <div><label>{{t("roleOfCollective")}}</label></div>
                    <label>{{t("assessedRoleOfCollectiveAction")}}</label>

                    <div class="km-value km-pre">
                        <span  v-for="term in filter(options.assessments,document?.domesticExpendituresData?.domesticCollectiveAction)">
                            {{lstring(term.title,locale)}}
                        </span>
                    </div>
                    
                    <div v-if="document?.domesticExpendituresData?.domesticCollectiveAction!=='notnecessary' && document?.domesticExpendituresData?.domesticCollectiveAction!=='notyet'">
                        <div v-if="hasDomesticExpendituresData">
                            <label>{{t("informationOnRole")}}</label>
                        
                            <div v-if="document?.domesticExpendituresData?.measurementUnit" >
                                <label>{{t("measurementUnit")}}</label>
                                <div class="km-value km-pre">
                                    {{document?.domesticExpendituresData?.measurementUnit}}
                                </div>
                            </div>                        

                            <table v-if="document?.domesticExpendituresData?.contributions" class="table table-hover table-condensed">
                                <thead>
                                    <tr>
                                        <th>{{t("year")}}</th>
                                        <th>{{t("contribution")}}</th>
                                        <th>{{t("overallConfidence")}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="contribution in orderedContributions">
                                        <td>{{contribution.year}}</td>
                                        <td>{{ currencyString(contribution.amount)}}</td>
                                        <td><km-term :value="contribution.confidenceLevel" :locale="locale"></km-term></td>
                                    </tr>
                                    <tr class="active">
                                        <td><strong>{{t("average")}}</strong></td>
                                        <td>{{currencyString(typeAverageAmount(document?.domesticExpendituresData?.contributions,'amount'))}}</td>
                                        <td>{{confidenceAverage(document?.domesticExpendituresData?.contributions)}}</td>
                                    </tr>
                                </tbody>
                            </table>                        

                            <div v-if="document?.domesticExpendituresData?.domesticCollectiveActionMethodology || document?.domesticExpendituresData?.domesticCollectiveActionMethodologyComments">
                                <div><strong>{{t("methodologicalInformation")}}</strong></div>                               
                                <div v-if="document?.domesticExpendituresData?.domesticCollectiveActionMethodology!='other'">  
                                    <div v-if="filter(options.domesticMethodology,document?.domesticExpendituresData?.domesticCollectiveActionMethodology).length>0">
                                        <label>{{t("methodologyUsed")}}</label>
                                        <div class="km-value">                                          
                                            <span v-for="term in filter(options.domesticMethodology,document?.domesticExpendituresData?.domesticCollectiveActionMethodology)">                                                                                                                   
                                                {{lstring(term.title,locale)}}
                                            </span>  
                                        </div>                                        
                                    </div>
                                </div>                            
                                
                                <div v-if="document?.domesticExpendituresData?.domesticCollectiveActionMethodologyOther" >                              
                                    <ng v-vue-ng:km-value-ml  :value="document?.domesticExpendituresData?.domesticCollectiveActionMethodologyOther" :locales="locale" html km-pre></ng>
                                </div>
                            
                                <div v-if="document?.domesticExpendituresData?.domesticCollectiveActionMethodologyComments">
                                    <label>{{t("otherMethodologicalObservationsComments")}}</label>
                                    <ng v-vue-ng:km-value-ml  :value="document?.domesticExpendituresData?.domesticCollectiveActionMethodologyComments" :locales="locale" html km-pre></ng>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 
            <!-- section 4 end -->
           
            <!-- section 5 begin -->
            <section v-if="document?.fundingNeedsData">
                <legend>{{t("reportingFunding")}}</legend>              
                <label>{{t("annualEstimatedFunding")}}</label>
                <label>{{t("startYear")}}</label>
            
                <div v-if="document?.domesticExpendituresData && document?.domesticExpendituresData.currency" >
                    <label>{{t("currency")}}</label>
                    <span class="km-value km-pre">                      
                        <km-term :value="document?.domesticExpendituresData?.currency" :locale="locale"></km-term>
                    </span>
                </div>

                <div v-if="document?.fundingNeedsData?.multiplier" >
                    <label>{{t("allValues")}}</label>
                    <span class="km-value" v-for="term in filter(options.multipliers,document?.fundingNeedsData?.multiplier)">
                        {{lstring(term.title,locale)}} 
                    </span>
                </div>

                <table v-if="document?.fundingNeedsData?.annualEstimates" class="table table-hover table-condensed">
                    <thead>
                        <tr>
                            <th>{{t("year")}}</th>
                            <th>{{t("fundingNeed")}}</th>
                            <th>{{t("estimateAvailableResources")}}</th>
                            <th>{{t("estimatedFundingGap")}}</th>
                            <th>{{t("actionsForPriorityFunding")}}</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        <tr v-for="estimate in orderedAnnualEstimates">
                            <td>{{estimate.year}}</td>
                            <td>{{currencyString(estimate.fundingNeedAmount)}}</td>
                            <td>{{currencyString(estimate.availableResourcesAmount)}}</td>
                            <td>{{currencyString(estimate.fundingGapAmount)}}</td>
                            <td>{{lstring(estimate.action,locale)}}</td>
                        </tr>
                    </tbody>
                </table>
               
                <div v-if="document?.fundingNeedsData?.additionalComments">
                    <label>{{t("additionalMethodologicalObservations")}}</label>                   
                    <ng v-vue-ng:km-value-ml :value="document.fundingNeedsData.additionalComments" :locales="locale" html km-pre></ng>                    
                </div>
            </section>
            <!-- section 5 end -->

            <!-- section 6 begin -->
            <section v-if="document?.nationalPlansData">
                <legend>{{t("nationalFinancePlans")}}</legend>
                <label>{{t("briefSynthesis")}}</label>
              
                <div v-if="document?.domesticExpendituresData?.currency" >
                    <label>{{t("currency")}}</label>
                    <span class="km-value km-pre">
                        <km-term :value="document?.domesticExpendituresData?.currency " :locale="locale"></km-term>
                    </span>
                </div>
               
                <div v-if="document?.fundingNeedsData?.multiplier" >
                    <label>{{t("allValues")}}</label>
                    <span class="km-value" v-for="term in filter(options.multipliers,document?.fundingNeedsData?.multiplier)">
                        {{lstring(term.title,locale)}} 
                    </span>
                </div>          
            
                <table v-if="document?.fundingNeedsData?.annualEstimates" class="table table-hover table-condensed">
                    <thead>
                        <tr>
                            <th></th>
                            <th v-for="estimate in orderedAnnualEstimates" class="col-sm-1 text-center">
                                {{estimate.year}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="active">
                            <td><strong>{{t("expectedFundingGap")}}</strong></td>     
                            <td v-for="estimate in orderedAnnualEstimates"  class="col-sm-1 text-center">                                                    
                                <strong>{{currencyString(getFundingGapYear(estimate.year))}}</strong>
                            </td>
                        </tr>
                        <tr class="active">
                            <td><strong>{{t("domesticSources")}}</strong></td>    
                            <td v-for="estimate in orderedAnnualEstimates"  class="col-sm-1 text-center">
                                <strong>{{currencyString(getNationalPlansSourcesTotal('domesticSources', estimate.year))}}</strong>
                            </td>
                        </tr>
                       
                        <tr v-for="source in orderedDomesticSources ">
                            <td>{{lstring(source.name,locale)}}</td>
                            <td v-if="annualEstimatesHasYear(2014)" class="text-center">{{ currencyString(source.amount2014)}}</td>
                            <td v-if="annualEstimatesHasYear(2015)" class="text-center">{{ currencyString(source.amount2015)}}</td>
                            <td v-if="annualEstimatesHasYear(2016)" class="text-center">{{ currencyString(source.amount2016)}}</td>
                            <td v-if="annualEstimatesHasYear(2017)" class="text-center">{{ currencyString(source.amount2017)}}</td>
                            <td v-if="annualEstimatesHasYear(2018)" class="text-center">{{ currencyString(source.amount2018)}}</td>
                            <td v-if="annualEstimatesHasYear(2019)" class="text-center">{{ currencyString(source.amount2019)}}</td>
                            <td v-if="annualEstimatesHasYear(2020)" class="text-center">{{ currencyString(source.amount2020)}}</td>
                        </tr>
                        <tr class="active">
                            <td><strong>{{t("internationalSources")}}</strong></td>   
                            <td v-for="estimate in orderedAnnualEstimates"  class="col-sm-1 text-center">                                                     
                                <strong>{{currencyString(getNationalPlansSourcesTotal('internationalSources', estimate.year))}}</strong>
                            </td>
                        </tr>
                        <tr v-for="source in  orderedInternationalSources">
                            <td>{{lstring(source.name,locale)}}</td>
                            <td v-if="annualEstimatesHasYear(2014)" class="text-center">{{currencyString(source.amount2014)}}</td>
                            <td v-if="annualEstimatesHasYear(2015)" class="text-center">{{currencyString(source.amount2015)}}</td>
                            <td v-if="annualEstimatesHasYear(2016)" class="text-center">{{currencyString(source.amount2016)}}</td>
                            <td v-if="annualEstimatesHasYear(2017)" class="text-center">{{currencyString(source.amount2017)}}</td>
                            <td v-if="annualEstimatesHasYear(2018)" class="text-center">{{currencyString(source.amount2018)}}</td>
                            <td v-if="annualEstimatesHasYear(2019)" class="text-center">{{currencyString(source.amount2019)}}</td>
                            <td v-if="annualEstimatesHasYear(2020)" class="text-center">{{currencyString(source.amount2020)}}</td>
                        </tr>
                        <tr class="active">
                            <td><strong>{{t("remainingGap")}}</strong></td>
                            <td v-for="estimate in  orderedAnnualEstimates" class="col-sm-1 text-center">
                                <strong>{{currencyString(getNationalPlansRemainingGapByYear(estimate.year))}}</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div v-if="document?.nationalPlansData?.additionalComments">
                    <label>{{t("additionalMethodologicalObservations")}}</label>                    
                    <ng v-vue-ng:km-value-ml  :value="document?.nationalPlansData?.additionalComments" :locales="locale" html km-pre></ng> 
                
                </div>
            </section>
            <!-- section 6 end -->          
            
            <!-- section 7 begin -->            
            <section v-if="document?.hasDomesticPrivateSectorMeasures">
                <div><label>{{t("measuresPrivateSectorDomesticSupport")}}</label></div>
                <ul class="km-value" style="list-style-type: none;">
                    <li v-for="term in filter(options.measures,document?.hasDomesticPrivateSectorMeasures)">
                        {{lstring(term.title,locale)}}                       
                    </li>
                </ul>                
                <div v-if="document?.hasDomesticPrivateSectorMeasuresComments">
                    <label>{{t("provideAdditionalInformation")}}</label>                   
                    <ng v-vue-ng:km-value-ml  :value="document?.hasDomesticPrivateSectorMeasuresComments" :locales="locale" html km-pre></ng>                 
                </div>
            </section>
            <!-- section 7 end -->  
           
            <!-- section 8 begin -->  
            <section v-if="document?.financialAvailabilityData">
                <legend>{{t("availability")}}</legend>
                <label>{{t("adequateFinancialResources")}}</label>
                         
                <div>
                    <label>(1) {{t("domesticBiodiversityExpenditures")}}</label>
                    <div v-if="hasValue(document?.financialAvailabilityData?.reportDomesticExpenditures)">
                        <span class="km-value" v-for="term in filter(options.yesNo,document?.financialAvailabilityData?.reportDomesticExpenditures)">
                            {{lstring(term.title,locale)}}
                        </span>
                    </div>
                </div>
          
                <div>                  
                    <label>(2) {{t("fundingNeeds")}}</label>
                    <div v-if="hasValue(document?.financialAvailabilityData?.reportFundingNeeds)">
                        <span class="km-value" v-for="term in  filter(options.yesNo,document?.financialAvailabilityData?.reportFundingNeeds)">
                            {{lstring(term.title,locale)}}
                        </span>
                    </div>                  
                </div>

                <div>
                    <label>(3)	{{t("nationalFinancePlan")}} </label>
                    <div v-if="hasValue(document?.financialAvailabilityData?.prepareFinancePlans)">
                        <span class="km-value" v-for="term in filter(options.yesNo,document?.financialAvailabilityData?.prepareFinancePlans)">
                            {{lstring(term.title,locale)}}
                        </span>
                    </div>
                </div>
            </section> 
            <!-- section 8 end -->  
                
            <!-- section relevant information begin -->  
            <section v-if="document?.relevantInformation || document?.relevantDocuments">
                <legend>{{ t("additionalInformation") }}</legend>
                <view-relevant-information :relevant-information="document.relevantInformation" :relevant-documents="document.relevantDocuments" :locale="locale"> 
                </view-relevant-information> 
            </section>   
            <!-- section relevant information end -->          

            <div> 
                <ng v-vue-ng:view-referenced-records v-model:ng-model="document.header.identifier" ></ng> 
            </div>  
        </div>

        <ng v-vue-ng:document-metadata-vue :document-info="documentInfo"></ng>
    </div>
</template>
<script setup>
    import { computed } from 'vue'; 
    import { lstring } from '~/services/filters/lstring.js'; 
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js' 
    import '~/views/forms/view/directives/view-reference-records.directive.js';
    import viewRelevantInformation from '~/views/forms/view/directives/view-relevant-information.vue';
    import viewFinancialReport from '~/views/forms/view/directives/view-financial-report.vue';
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/financial-report-2015.json';
    import { useI18n } from 'vue-i18n';  
    import _ from 'lodash';

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type:Object, required: true },
        locale      : { type:String, required: true },
    })
    const document = computed(()=>props.documentInfo?.body);


    const hasValueForDomesticExpendituresData = computed(()=>{
        return  hasValue(document?.value?.domesticExpendituresData?.govCentralDirectlyRelated) || hasValue(document?.value?.domesticExpendituresData?.govCentralIndirectlyRelated) ||
                hasValue(document?.value?.domesticExpendituresData?.provincialDirectlyRelated) || hasValue(document?.value?.domesticExpendituresData?.provincialIndirectlyRelated) ||
                hasValue(document?.value?.domesticExpendituresData?.municipalDirectlyRelated)  || hasValue(document?.value?.domesticExpendituresData?.municipalIndirectlyRelated)  ||
                hasValue(document?.value?.domesticExpendituresData?.extraDirectlyRelated)      || hasValue(document?.value?.domesticExpendituresData?.extraIndirectlyRelated)      ||
                hasValue(document?.value?.domesticExpendituresData?.privateDirectlyRelated)    || hasValue(document?.value?.domesticExpendituresData?.privateIndirectlyRelated)    ||
                hasValue(document?.value?.domesticExpendituresData?.otherDirectlyRelated)      || hasValue(document?.value?.domesticExpendituresData?.otherIndirectlyRelated)      ||
                hasValue(document?.value?.domesticExpendituresData?.ilcDirectlyRelated)        || hasValue(document?.value?.domesticExpendituresData?.ilcIndirectlyRelated)       
    });

    const hasDomesticExpendituresData = computed(()=>{
        return  document?.value?.domesticExpendituresData.measurementUnit || 
                document?.value?.domesticExpendituresData.contributions ||
                document?.value?.domesticExpendituresData.domesticCollectiveActionMethodology || 
                document?.value?.domesticExpendituresData.domesticCollectiveActionMethodologyComments;        
    });

    const orderedExpenditures = computed(()=>{
        if (!(document?.value?.domesticExpendituresData?.expenditures)) return [];   
        //remove {} from array
        var newArray = document.value.domesticExpendituresData.expenditures.filter(value => Object.keys(value).length !== 0);   
        return  _.orderBy(newArray, 'year');
    });

 

    const orderedContributions = computed(()=>{
        if (!(document?.value?.domesticExpendituresData?.contributions)) return [];     
         //remove {} from array
         var newArray = document.value.domesticExpendituresData.contributions.filter(value => Object.keys(value).length !== 0);  
        return  _.orderBy(newArray, 'year');
    });

    const orderedAnnualEstimates = computed(()=>{       
        if (!(document?.value?.fundingNeedsData?.annualEstimates)) return [];  
        //remove {} from array
        var newArray = document.value.fundingNeedsData.annualEstimates.filter(value => Object.keys(value).length !== 0);  
       return  _.orderBy(newArray, 'year');
    });   

    const orderedDomesticSources = computed(()=>{
        if (!(document?.value?.nationalPlansData?.domesticSources)) return [];  
        //remove {} from array
        var newArray = document.value.nationalPlansData.domesticSources.filter(value => Object.keys(value).length !== 0);     
        return  _.orderBy(newArray, 'name');
    });

    const orderedInternationalSources = computed(()=>{
        if (!(document?.value?.nationalPlansData?.internationalSources)) return [];    
        //remove {} from array
        var newArray = document.value.nationalPlansData.internationalSources.filter(value => Object.keys(value).length !== 0);      
        return  _.orderBy( newArray, 'name');
    });


    const options  = {
        multipliers : 		[{identifier:'units',	      title: {en:`${t("units")}`}},  
                             {identifier:'thousands',     title: {en:`${t("thousands")}`}}, 
                             {identifier:'millions',      title: {en:`${t("millions")}`}}],
        methodology : 		[{identifier:'oecd_dac',      title: {en:`${t("oecd_dac")}`}}, 
                             {identifier:'other', 	      title: {en:`${t("other")}` }}],
        measures    : 		[{identifier:'no', 	          title: {en:`${t("no")}`}},  
                             {identifier:'some',          title: {en:`${t("some")}`}},    
                             {identifier:'comprehensive', title: {en:`${t("comprehensive")}`}}], 
        inclusions  : 		[{identifier:'notyet', 	      title: {en:`${t("notYet")}`}},
                             {identifier:'some', 	      title: {en:`${t("someInclusion")}`}},
                             {identifier:'comprehensive', title: {en:`${t("comprehensiveInclusion")}`}}],                          
        assessments : 		[{identifier:'notnecessary',  title: {en:`${t("notNecessary")}`}},                    
                             {identifier:'notyet', 	      title: {en:`${t("notYet")}`}},
                             {identifier:'some', 		  title: {en:`${t("someAssessment")}`}},
                             {identifier:'comprehensive', title: {en:`${t("comprehensiveAssessment")}`}}],
        domesticMethodology:[{identifier:'cmfeccabc',     title: {en:`${t("cmfeccabc")}`}},
                             {identifier:'other', 	      title: {en:`${t("other")}`}}],
        yesNo : 			[{identifier:false,  		  title: {en:`${t("no")}`}},
                             {identifier:true,            title: {en:`${t("yes")}`}}]
     
    };         

    const typeAverageAmount = function(flows, type){
        if(!flows) return 0;

        var items;

        if(_.isEmpty(_.last(flows)) || !_.last(flows))       
            items = _.initial(_.map(flows, type));
        else        
            items = _.map(flows, type);

        if(items.length===0){
            return 0;
        }
        else {
            var sum   = _.reduce(_.compact(items), function(memo, num){ return memo + parseInt(num || 0); }, 0);
            return  Math.round(sum/items.length);
        }
    };

    const confidenceAverage = function (resources) {
        var values = _.compact(_.map(resources, function (resource) {
            if (resource?.confidenceLevel?.identifier == "D8BC6348-D1F9-4DA4-A8C0-7AE149939ABE") return 3; //high
            if (resource?.confidenceLevel?.identifier == "42526EE6-68F3-4E8A-BC2B-3BE60DA2EB32") return 2; //medium
            if (resource?.confidenceLevel?.identifier == "6FBEDE59-88DB-45FB-AACB-13C68406BD67") return 1; //low
            return 0;
        }));

        var value = 0;
        if(values.length) {
            value = Math.round(_.reduce(values, function(memo, value) { return memo + value; }) / values.length);
        }

        if ( value == 3) return t("high");
        if ( value == 2) return t("medium");
        if ( value == 1) return t("low");

        return t("noValueSelected"); 
    };

    const hasValue = function(val){
        if(val === false || val === true)
            return true;
        return false;
    };

    const annualEstimatesHasYear = function (year) {
        if(!year) return false;
        if(document?.value?.fundingNeedsData?.annualEstimates){
            const estimate =document.value.fundingNeedsData.annualEstimates.find(item => item.year == year);
          
            if(estimate)
                return true;
        }
        return false;
    };

    const getFundingGapYear = function(year){   
        if(!year) return 0;  
        if (document?.value?.fundingNeedsData?.annualEstimates){     
            const estimate = document.value.fundingNeedsData.annualEstimates.find(item => item.year == year);  
          
            if(estimate?.fundingGapAmount)
                return  estimate.fundingGapAmount;  
        }
        return 0;
    };

    const getNationalPlansSourcesTotal = function(member, year){
        if(!year || !member) return 0;

        if(document?.value?.nationalPlansData && document?.value?.nationalPlansData[member]){

            var prop = "amount"+year;
            var items;
      
            var sources = document.value.nationalPlansData[member];//jshint ignore:line
                      
            if(_.isEmpty(_.last(sources)))
                items = _.initial(sources);        

            items = _.map(sources, prop);       

            var sum = 0;
            _.map(_.compact(items), function(num){
                sum = sum + parseInt(num)||0;
            }); 
            return  sum;
        }
        return 0;
    };
                        
    const getNationalPlansRemainingGapByYear = function(year){
        if(!year) return 0;
        return  getFundingGapYear(year) - (getNationalPlansSourcesTotal('domesticSources', year)  + getNationalPlansSourcesTotal('internationalSources', year)) ;
    };

    const isEmpty = function (item) {
        return _.isEmpty(item);
    };

    
    const currencyString=function (number) {
        if (number) {
            var formatter = new Intl.NumberFormat( { style: 'currency' });
            return  formatter.format(number); 
        }
        else {
            return "0";
        }
    }

    const  filter=function(array, id) {     
        return array.filter((option) => option.identifier===id );
    };  

</script>