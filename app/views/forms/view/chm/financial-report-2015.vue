<template>
    <div id="Record" class="record ">
        <div class="record-body  bg-white" v-if="document">  
            <!--TODO: add compare-val for fields  -->

            <!-- TODO: add publish date -->            
            <!-- <ng v-vue-ng:document-date></ng> -->           
          
            <!-- section basic information begin -->
            <section v-if="document.government || document.ownerBehalf ||   document.respondentName || document.respondentDesignation ||
                document.respondentOrganization || document.respondentDepartment ||  document.respondentPhones || document.respondentEmails" >
        
                <legend>{{t("identificationOfRespondent")}}</legend>
                
                <div v-if="document.government">
                    <label> {{t("country")}}</label>
                    <div class="km-value">
                        <km-term :value="document.government" :locale="locale"></km-term>   
                    </div>
                </div>
                
                <div v-if="document.ownerBehalf">
                    <label>{{t("ownerBehalf")}}</label>
                    <div class="km-value">                       
                        <km-term :value="document.ownerBehalf" :locale="locale"></km-term>   
                    </div>
                </div>

                <div v-if="document.respondentName || document.respondentDesignation || document.respondentOrganization || document.respondentDepartment ||
                    document.respondentPhones || document.respondentEmails" >
                    <legend>{{t("contactDetails")}}</legend>

                    <div v-if="document.respondentName">
                        <label>{{t("name")}}</label>
                        <div class="km-value">{{document.respondentName}}</div>
                    </div>
                  
                    <div v-if="document.respondentDesignation">
                        <label>{{t("title")}}</label>                      
                        <ng v-vue-ng:km-value-ml :value="document.respondentDesignation" :locales="locale" html></ng>   
                    </div>

                    <div v-if="document.respondentOrganization">
                        <label>{{t("organization")}}</label>                      
                        <ng v-vue-ng:km-value-ml :value="document.respondentOrganization" :locales="locale" html></ng>   
                    </div>
                
                    <div v-if="document.respondentDepartment">
                        <label>{{t("department")}}</label>                    
                        <ng v-vue-ng:km-value-ml :value="document.respondentDepartment" :locales="locale" html></ng> 
                    </div>

                    <div v-if="document.respondentPhones">
                        <label>{{t("phoneNumbers")}}</label>
                        <div class="km-value">
                            <span v-for="item in document.respondentPhones">{{item}}</span>
                        </div>
                    </div>
                    
                    <div v-if="document.respondentEmails">
                        <label>{{t("emails")}}</label>
                        <div class="km-value">
                            <span v-for="item in document.respondentEmails">
                                <a translation-url :href="`mailto:${item}`">{{item}}</a>
                            </span>
                        </div>
                    </div>
                </div>
                
                <div v-if="document.completedDate">
                    <label>{{t("date")}}</label>
                    <div class="km-value">{{document.completedDate}}</div>
                </div>
            </section>
            <!-- section basic information end -->

            <!-- section 1 begin -->
            <section v-if="document.internationalResources">
                <legend>{{t("section1")}}</legend>
                <div v-if="document.internationalResources.baselineData">                
                    <label>{{t("amountOfResources")}} <u>{{t("providedByCountry")}}</u> {{t( "inSupportOfBiodiversity")}} </label><br/> 
                    <label class="help-block">{{t("nominalAmount")}}</label><br/>              
                    <label> 1.1.1	{{t("baselineInformation")}}</label>
        
                                   
                    <div v-if="document.internationalResources.currency && !isEmpty(document.internationalResources.currency)" >                      
                        <label>{{t("currency")}}</label>
                        <span class="km-value">                         
                            <km-term :value="document.internationalResources.currency " :locale="locale"></km-term> 
                        </span>
                    </div>
        
                    
                    <div v-if="document.internationalResources.multiplier" >
                        <label>{{t("allValues")}}</label>
                        <div class="km-value">
                            <div  v-for="term in filteredMultipliers(document.internationalResources.multiplier)">                           
                                {{lstring(term.title,locale)}} 
                            </div>
                        </div>
                    </div>
        
                   
                    <div v-if="document.internationalResources.baselineData.baselineFlows" class="table-responsive">
                        <table class="table table-hover table-bordered table-condensed">
                            <thead>
                                <tr class="active">
                                    <th>{{t("year")}}</th>
                                    <th>{{t("oda")}}</th>
                                    <th>{{t("oof")}}</th>
                                    <th>{{t("otherFlows")}}</th>
                                    <th>{{t("total")}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="flow in orderedBaselineFlows" >
                                    <td>{{flow.year}}</td>
                                    <td>{{flow.odaAmount | "number:0"}}</td>
                                    <td>{{flow.oofAmount | "number:0"}}</td>
                                    <td>{{flow.otherAmount | "number:0"}}</td>
                                    <td>{{flow.odaAmount + flow.oofAmount + flow.otherAmount  | "number:0"}}</td>
                                </tr>
                                <tr class="active">
                                    <td><strong>{{t("averageBaseline")}}</strong></td>
                                    <td><strong>{{typeAverageAmount(document.internationalResources.baselineData.baselineFlows,'odaAmount')  | "number:0"}}</strong></td>
                                    <td><strong>{{typeAverageAmount(document.internationalResources.baselineData.baselineFlows,'oofAmount')  | "number:0"}}</strong></td>
                                    <td><strong>{{typeAverageAmount(document.internationalResources.baselineData.baselineFlows,'otherAmount')  | "number:0"}}</strong></td>
                                    <td><strong>{{totalAverageAmount() | "number:0"}}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div v-if="document.internationalResources.baselineData.odaCategories || document.internationalResources.baselineData.odaOofType ||
                                  document.internationalResources.baselineData.odaoofActions || document.internationalResources.baselineData.otherActions ||
                                  document.internationalResources.baselineData.methodologyUsed || document.internationalResources.baselineData.coefficient ||
                                  document.internationalResources.baselineData.odaConfidenceLevel || document.internationalResources.baselineData.oofConfidenceLevel ||
                                  document.internationalResources.baselineData.otherConfidenceLevel || document.internationalResources.baselineData.methodologicalComments">
                        <label> {{t("methodologicalInformation")}}</label>                   
                             
                        <div v-if="document.internationalResources.baselineData.odaCategories">
                            <label>{{t("odaIncludes")}}</label>
                            <div class="km-value">
                                <li v-for="term in document.internationalResources.baselineData.odaCategories">                             
                                    <km-term :value="term" :locale="locale"></km-term>  
                                </li>
                            </div>
                        </div>        
                     
                        <div v-if="document.internationalResources.baselineData.odaOofType">
                            <label> {{t("odaOofIncludes")}}</label>
                            <div class="km-value">
                                <km-term :value="document.internationalResources.baselineData.odaOofType" :locale="locale"></km-term>  
                            </div>
                        </div>            
                     
                        <div v-if="document.internationalResources.baselineData.odaoofActions">
                            <label> {{t("odaOofIncludes")}}</label>
                            <div class="km-value">
                                <li v-for="term in document.internationalResources.baselineData.odaoofActions">                              
                                    <km-term :value="term" :locale="locale"></km-term>  
                                </li>
                            </div>
                        </div>        
                     
                        <div v-if="document.internationalResources.baselineData.otherActions">
                            <label>{{t("otherFlowsInclude")}}</label>
                            <div class="km-value">
                                <li v-for="term in document.internationalResources.baselineData.otherActions">                              
                                    <km-term :value="term" :locale="locale"></km-term>                       
                                </li>
                            </div>
                        </div>            
                       
                        <div v-if="document.internationalResources.baselineData.methodologyUsed">
                            <label> {{t("methodology")}}</label>
                            <div v-if="document.internationalResources.baselineData.methodologyUsed!='other'">                                
                                <div class="km-value" v-for="term in filteredMethodology(document.internationalResources.baselineData.methodologyUsed)">
                                    {{lstring(term.title,locale)}}  
                                </div>
                            </div>

                            <div v-if="document.internationalResources.baselineData.methodologyUsedComments" >                           
                                <ng  v-vue-ng:km-value-ml  :value="document.internationalResources.baselineData.methodologyUsedComments" :locales="locale" html></ng> 
                            </div>
                        </div>
                    
                        <div v-if="document.internationalResources.baselineData.coefficient" >
                            <label>{{t("coefficient")}}</label>
                            <div class="km-value ">
                                {{document.internationalResources.baselineData.coefficient}}%
                            </div>
                        </div>        
                       
                        <div v-if="document.internationalResources.baselineData.odaConfidenceLevel || document.internationalResources.baselineData.oofConfidenceLevel || document.internationalResources.baselineData.otherConfidenceLevel">
                            <label>{{t("averageConfidenceLevels")}}</label>
                        </div>
                    
                        <div v-if="document.internationalResources.baselineData.odaConfidenceLevel" >
                            <label>{{t("oda")}}:</label>
                            <div class="km-value">                           
                                <km-term :value="document.internationalResources.baselineData.odaConfidenceLevel" :locale="locale"></km-term>
                            </div>
                        </div>
                     
                        <div v-if="document.internationalResources.baselineData.oofConfidenceLevel" >
                            <label>{{t("oof")}}</label>
                            <div class="km-value">
                                <km-term :value="document.internationalResources.baselineData.oofConfidenceLevel" :locale="locale"></km-term>
                            </div>
                        </div>

                        <div v-if="document.internationalResources.baselineData.otherConfidenceLevel" >
                            <label>{{t("otherFlows")}}:</label>
                            <span class="km-value">
                                <km-term :value="document.internationalResources.baselineData.otherConfidenceLevel" :locale="locale"></km-term>
                            </span>
                        </div>
        
                        <div v-if="document.internationalResources.baselineData.methodologicalComments">
                            <label>{{t( "otherMethodologicalObservations")}}</label>
                            <ng  v-vue-ng:km-value-ml  :value="document.internationalResources.baselineData.methodologicalComments " :locales="locale" html></ng>
                        </div>
                    </div>
                </div>        
             
                <div v-if="document.internationalResources.progressData && (document.internationalResources.progressData.progressFlows || document.internationalResources.progressData.odaConfidenceLevel ||
                              document.internationalResources.progressData.oofConfidenceLevel || document.internationalResources.progressData.otherConfidenceLevel ||
                              document.internationalResources.hasPrivateSectorMeasures)">
                    <label>{{t("monitoringProgress")}}</label>
                    <div v-if="document.internationalResources.progressData.progressFlows" class="table-responsive">
                        <table class="table table-hover table-bordered table-condensed">
                            <thead>
                                <tr>
                                    <th>{{t("year")}}</th>
                                    <th>{{t("oda")}}</th>
                                    <th>{{t("oof")}}</th>
                                    <th>{{t("otherFlows")}}</th>
                                    <th>{{t("total")}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="flow in orderedProgressFlows" >
                                    <td>{{flow.year}}</td>
                                    <td>{{flow.odaAmount   | "number:0"}}</td>
                                    <td>{{flow.oofAmount   | "number:0"}}</td>
                                    <td>{{flow.otherAmount | "number:0"}}</td>
                                    <td>{{flow.odaAmount + flow.oofAmount + flow.otherAmount | "number:0"}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>        
                 
                    <div v-if="document.internationalResources.progressData.odaConfidenceLevel || document.internationalResources.progressData.oofConfidenceLevel || document.internationalResources.progressData.otherConfidenceLevel">
                        <div><strong>{{t("methodologicalInformation")}}</strong></div>
                        <label>{{t("averageConfidenceLevels")}}</label>
                        <div v-if="document.internationalResources.progressData.odaConfidenceLevel" >
                            <label>{{t("oda")}}</label>
                            <span class="km-value">
                                <km-term :value="document.internationalResources.progressData.odaConfidenceLevel" :locale="locale"></km-term>
                            </span>
                        </div>
                        <div v-if="document.internationalResources.progressData.oofConfidenceLevel" >
                            <label>{{t("oof")}}</label>
                            <span class="km-value">
                                <km-term :value="document.internationalResources.progressData.oofConfidenceLevel" :locale="locale"></km-term>
                            </span>
                        </div>
                        <div v-if="document.internationalResources.progressData.otherConfidenceLevel" >
                            <label>{{t("otherFlows")}}</label>
                            <span class="km-value">
                                <km-term :value="document.internationalResources.progressData.otherConfidenceLevel" :locale="locale"></km-term>   
                            </span>
                        </div>
                    </div>
                           
                    <div v-if="document.internationalResources.hasPrivateSectorMeasures">
                        <label>{{t("measuresPrivateSector")}}</label>
                        
                        <div class="km-value" style="list-style-type: none;">
                            <li v-for="term in filteredMeasures(document.internationalResources.hasPrivateSectorMeasures)">
                                {{lstring(term.title,locale)}}
                            </li>
                        </div>
                       
                        <div v-if="document.internationalResources.hasPrivateSectorMeasuresComments">
                            <label>{{t("provideAdditionalInformation")}}</label>                            
                            <ng  v-vue-ng:km-value-ml  :value="document.internationalResources.hasPrivateSectorMeasuresComments" :locales="locale" html></ng> 
                      </div>
                    </div>        
                </div>
            </section>
            <!-- section 1 end -->
           
           <!-- section 2 begin -->
            <section v-if="document.hasNationalBiodiversityInclusion">
                <legend>{{t("inclusion")}}</legend>               
                <label>{{t("includeBiodiversity")}}</label>                
                              
                <div class="km-value" >
                   <span v-for="term in  filterInclusions(document.hasNationalBiodiversityInclusion) ">
                    {{lstring(term.title, locale)}} 
                    </span>                 
                </div>
                
                <div v-if="document.hasNationalBiodiversityInclusionComments">
                    <label>{{t("provideAdditionalInformation")}}</label>                 
                    <ng  v-vue-ng:km-value-ml  :value="document.hasNationalBiodiversityInclusionComments" :locales="locale" html></ng> 
                </div>
            </section>
            <!-- section 2 end -->
      
            <!-- section 3 begin -->
            <section v-if="document.hasBiodiversityAssessment">
                <legend>{{t("assessmentAndEvaluation")}}</legend>
                <label>{{t("assessOrEvaluate")}}</label>
                
                <div class="km-value" >
                    <span v-for="term in  filteredAssessments(document.hasBiodiversityAssessment)">
                        {{lstring(term.title ,locale)}}                       
                    </span>
                </div>
                <div v-if="document.hasBiodiversityAssessmentComments">
                    <label>{{t("provideAdditionalInformation")}}</label>                                         
                    <ng v-vue-ng:km-value-ml :value="document.hasBiodiversityAssessmentComments" :locales="locale" html></ng>  
                </div>
            </section>
            <!-- section 3 end -->

            <!-- section 4 begin -->
            <section v-if="document.domesticExpendituresData">
                <legend>{{t("reportCurrentDomesticExpenditure")}}</legend>
                <div><label>{{t("annualFinancialSupport")}}</label></div>

               
                <div v-if="document.domesticExpendituresData.currency" >
                    <label>{{t( "currency")}}</label>
                    <span class="km-value">                        
                        <km-term :value="document.domesticExpendituresData.currency" :locale="locale"></km-term>   
                    </span>
                </div>

                <div v-if="document.domesticExpendituresData.multiplier" >
                    <label>{{t("allValues")}}</label>
                      <div class="km-value">
                         <span v-for="term in filteredMultipliers(document.domesticExpendituresData.multiplier)"> 
                            {{lstring(term.title,locale)}} 
                         </span>
                      </div>
                </div>

              
                <table v-if="document.domesticExpendituresData.expenditures" class="table table-hover table-condensed">
                    <thead>
                        <tr>
                            <th>{{t("year")}}</th>
                            <th>{{t("domesticExpenditures")}}</th>
                            <th>{{t("overallConfidence")}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="expenditure in  orderedExpenditures ">  
                            <td>{{expenditure.year}}</td>
                            <td>{{expenditure.amount | "number:0"}}</td>
                            <td><km-term :value="expenditure.confidenceLevel" :locale="locale"></km-term></td>
                        </tr>
                        <tr class="active">
                            <td><strong>{{t("average")}}</strong></td>
                            <td>{{typeAverageAmount(document.domesticExpendituresData.expenditures,'amount')  | "number:0"}}</td>
                            <td>{{confidenceAverage(document.domesticExpendituresData.expenditures)}}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div v-if="hasValue(document.domesticExpendituresData.govCentralDirectlyRelated)  || hasValue(document.domesticExpendituresData.govCentralIndirectlyRelated) ||
                            hasValue(document.domesticExpendituresData.provincialDirectlyRelated) || hasValue(document.domesticExpendituresData.provincialIndirectlyRelated) ||
                            hasValue(document.domesticExpendituresData.municipalDirectlyRelated)  || hasValue(document.domesticExpendituresData.municipalIndirectlyRelated)  ||
                            hasValue(document.domesticExpendituresData.extraDirectlyRelated)      || hasValue(document.domesticExpendituresData.extraIndirectlyRelated)      ||
                            hasValue(document.domesticExpendituresData.privateDirectlyRelated)    || hasValue(document.domesticExpendituresData.privateIndirectlyRelated)    ||
                            hasValue(document.domesticExpendituresData.otherDirectlyRelated)      || hasValue(document.domesticExpendituresData.otherIndirectlyRelated)      ||
                            hasValue(document.domesticExpendituresData.ilcDirectlyRelated)        || hasValue(document.domesticExpendituresData.ilcIndirectlyRelated) ||
                            document.domesticExpendituresData.sourcesAdditionalComments">
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
                            <tr v-if="hasValue(document.domesticExpendituresData.govCentralDirectlyRelated) || hasValue(document.domesticExpendituresData.govCentralIndirectlyRelated)">
                                <td>{{t("governmentBudgetsCentral")}}</td>
                                <td><div v-if="hasValue(document.domesticExpendituresData.govCentralDirectlyRelated)">
                                    <span v-for="term in filteredYesNo(document.domesticExpendituresData.govCentralDirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div>                                
                                </td>
                                <td><div v-if="hasValue(document.domesticExpendituresData.govCentralIndirectlyRelated)">
                                    <span v-for="term in filteredYesNo(document.domesticExpendituresData.govCentralIndirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div>
                                </td>
                            </tr>

                            <tr v-if="hasValue(document.domesticExpendituresData.provincialDirectlyRelated) || hasValue(document.domesticExpendituresData.provincialIndirectlyRelated)">
                                <td>{{t("governmentBudgetsState")}}</td>
                                <td><div v-if="hasValue(document.domesticExpendituresData.provincialDirectlyRelated)">
                                    <span v-for="term in filteredYesNo(document.domesticExpendituresData.provincialDirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                                <td><div v-if="hasValue(document.domesticExpendituresData.provincialIndirectlyRelated)">
                                    <span v-for="term in filteredYesNo(document.domesticExpendituresData.provincialIndirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                            </tr>

                            <tr v-if="hasValue(document.domesticExpendituresData.municipalDirectlyRelated) || hasValue(document.domesticExpendituresData.municipalIndirectlyRelated)">
                                <td>{{t("governmentBudgetsLocal")}}</td>
                                <td><div v-if="hasValue(document.domesticExpendituresData.municipalDirectlyRelated)">
                                    <span v-for="term in filteredYesNo(document.domesticExpendituresData.municipalDirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                                <td><div v-if="hasValue(document.domesticExpendituresData.municipalIndirectlyRelated)">
                                    <span v-for="term in filteredYesNo(document.domesticExpendituresData.municipalIndirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                            </tr>

                            <tr v-if="hasValue(document.domesticExpendituresData.extraDirectlyRelated) || hasValue(document.domesticExpendituresData.extraIndirectlyRelated)">
                                <td>{{t("extraBudgetary")}}</td>
                                <td><div v-if="hasValue(document.domesticExpendituresData.extraDirectlyRelated)">
                                    <span v-for="term in filteredYesNo(document.domesticExpendituresData.extraDirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                                <td><div v-if="hasValue(document.domesticExpendituresData.extraIndirectlyRelated)">
                                    <span v-for="term in filteredYesNo(document.domesticExpendituresData.extraIndirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                            </tr>
                           
                            <tr v-if="hasValue(document.domesticExpendituresData.privateDirectlyRelated) || hasValue(document.domesticExpendituresData.privateIndirectlyRelated)">
                                <td>{{t("privateMarket")}}</td>
                                <td><div v-if="hasValue(document.domesticExpendituresData.privateDirectlyRelated)">
                                    <span v-for="term in filteredYesNo(document.domesticExpendituresData.privateDirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                                <td><div v-if="hasValue(document.domesticExpendituresData.privateIndirectlyRelated)">
                                    <span v-for="term in filteredYesNo(document.domesticExpendituresData.privateIndirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                            </tr>
                          
                            <tr v-if="hasValue(document.domesticExpendituresData.otherDirectlyRelated) || hasValue(document.domesticExpendituresData.otherIndirectlyRelated)">
                                <td>{{t("otherNgo")}}</td>
                                <td><div v-if="hasValue(document.domesticExpendituresData.otherDirectlyRelated)">
                                    <span v-for="term in filteredYesNo(document.domesticExpendituresData.otherDirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                                <td><div v-if="hasValue(document.domesticExpendituresData.otherIndirectlyRelated)">
                                    <span v-for="term in filteredYesNo(document.domesticExpendituresData.otherIndirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                            </tr>

                            <tr v-if="hasValue(document.domesticExpendituresData.ilcDirectlyRelated) || hasValue(document.domesticExpendituresData.ilcIndirectlyRelated)">
                                <td>{{t("collectiveAction")}}</td>
                                <td><div v-if="hasValue(document.domesticExpendituresData.ilcDirectlyRelated)">
                                    <span v-for="term in filteredYesNo(document.domesticExpendituresData.ilcDirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div></td>
                                <td><div v-if="hasValue(document.domesticExpendituresData.ilcIndirectlyRelated)">
                                    <span v-for="term in filteredYesNo(document.domesticExpendituresData.ilcIndirectlyRelated)">
                                    {{lstring(term.title,locale)}}</span></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                   
                    <div v-if="document.domesticExpendituresData.sourcesAdditionalComments">
                        <label>{{t("additionalMethodologicalInformation")}}</label>                       
                        <ng  v-vue-ng:km-value-ml  :value="document.domesticExpendituresData.sourcesAdditionalComments" :locales="locale" html></ng>  
                    </div>
                </div>

                <div v-if="document.domesticExpendituresData.domesticCollectiveAction">
                    <label>{{t("roleOfCollective")}}</label>
                    <label>{{t("assessedRoleOfCollectiveAction")}}</label>

                    <div class="km-value">
                        <span  v-for="term in filteredAssessments(document.domesticExpendituresData.domesticCollectiveAction)">
                            {{lstring(term.title,locale)}}
                        </span>
                    </div>
                    
                    <div v-if="document.domesticExpendituresData.domesticCollectiveAction!=='notnecessary' && document.domesticExpendituresData.domesticCollectiveAction!=='notyet'">
                        <div v-if="document.domesticExpendituresData.measurementUnit || document.domesticExpendituresData.contributions ||
                                    document.domesticExpendituresData.domesticCollectiveActionMethodology || document.domesticExpendituresData.domesticCollectiveActionMethodologyComments">
                            <label>{{t("informationOnRole")}}</label>
                        
                            <div v-if="document.domesticExpendituresData.measurementUnit" >
                                <label>{{t("measurementUnit")}}</label>
                                <div class="km-value km-pre">{{document.domesticExpendituresData.measurementUnit}}</div>
                            </div>                        

                            <table v-if="document.domesticExpendituresData.contributions" class="table table-hover table-condensed">
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
                                        <td>{{contribution.amount | "number:0"}}</td>
                                        <td><km-term :value="contribution.confidenceLevel" :locale="locale"></km-term></td>
                                    </tr>
                                    <tr class="active">
                                        <td><strong>{{t("average")}}</strong></td>
                                        <td>{{typeAverageAmount(document.domesticExpendituresData.contributions,'amount') | "number:0"}}</td>
                                        <td>{{confidenceAverage(document.domesticExpendituresData.contributions)}}</td>
                                    </tr>
                                </tbody>
                            </table>                        

                            <div v-if="document.domesticExpendituresData.domesticCollectiveActionMethodology || document.domesticExpendituresData.domesticCollectiveActionMethodologyComments">
                                <div><strong>{{t("methodologicalInformation")}}</strong></div>
                                <label>{{t("methodologyUsed")}}</label>

                                <div v-if="document.domesticExpendituresData.domesticCollectiveActionMethodology!='other'">
                                    <div class="km-value">
                                        <li v-for="term in filteredDomesticMethodology(document.domesticExpendituresData.domesticCollectiveActionMethodology)">                                        
                                            {{lstring(term.title,locale)}}
                                        </li>
                                    </div>
                                </div>                            
                                
                                <div v-if="document.domesticExpendituresData.domesticCollectiveActionMethodologyOther" >                              
                                    <ng  v-vue-ng:km-value-ml  :value="document.domesticExpendituresData.domesticCollectiveActionMethodologyOther" :locales="locale" html></ng> 
                                </div>
                            
                                <div v-if="document.domesticExpendituresData.domesticCollectiveActionMethodologyComments">
                                    <label>{{t("otherMethodologicalObservationsComments")}}</label>
                                    <ng  v-vue-ng:km-value-ml  :value="document.domesticExpendituresData.domesticCollectiveActionMethodologyComments" :locales="locale" html></ng>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 
            <!-- section 4 end -->
           
            <!-- section 5 begin -->
            <section v-if="document.fundingNeedsData">
                <legend>{{t("reportingFunding")}}</legend>              
                <label>{{t("annualEstimatedFunding")}}</label>
                <label>{{t("startYear")}}</label>
            
                <div v-if="document.domesticExpendituresData && document.domesticExpendituresData.currency" >
                    <label>{{t("currency")}}</label>
                    <span class="km-value">                      
                        <km-term :value="document.domesticExpendituresData.currency" :locale="locale"></km-term>
                    </span>
                </div>

                <div v-if="document.fundingNeedsData.multiplier" >
                    <label>{{t("allValues")}}</label>
                    <span class="km-value" v-for="term in filteredMultipliers(document.fundingNeedsData.multiplier)">
                        {{lstring(term.title,locale)}} 
                    </span>
                </div>

                <table v-if="document.fundingNeedsData.annualEstimates" class="table table-hover table-condensed">
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
                            <td>{{estimate.fundingNeedAmount | "number:0"}}</td>
                            <td>{{estimate.availableResourcesAmount | "number:0"}}</td>
                            <td>{{estimate.fundingGapAmount | "number:0"}}</td>
                            <td>{{lstring(estimate.action,locales)}}</td>
                        </tr>
                    </tbody>
                </table>
               
                <div v-if="document.fundingNeedsData.additionalComments">
                    <label>{{t("additionalMethodologicalObservations")}}</label>                   
                    <ng  v-vue-ng:km-value-ml  :value="document.fundingNeedsData.additionalComments" :locales="locale" html></ng>                    
                </div>
            </section>
            <!-- section 5 end -->

            <!-- section 6 begin -->
            <section v-if="document.nationalPlansData">
                <legend>{{t("nationalFinancePlans")}}</legend>
                <label>{{t("briefSynthesis")}}</label>
              
                <div v-if="document.domesticExpendituresData.currency" >
                    <label>{{t("currency")}}</label>
                    <span class="km-value">
                        <km-term :value="document.domesticExpendituresData.currency " :locale="locale"></km-term>
                    </span>
                </div>
               
                <div v-if="document.fundingNeedsData.multiplier" >
                    <label>{{t("allValues")}}</label>
                    <span class="km-value" v-for="term in filteredMultipliers(document.fundingNeedsData.multiplier)">
                        {{lstring(term.title,locale)}} 
                    </span>
                </div>
          
                <table v-if="document.fundingNeedsData.annualEstimates" class="table table-hover table-condensed">
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
                            <td v-for="estimate in orderedAnnualEstimates" v-if="!($last && document.fundingNeedsData.annualEstimates.length < options.fundingNeedsYears.length)" class="col-sm-1 text-center">
                                <strong>{{getFundingGapYear(estimate.year) |"number:0"}}</strong></td>
                        </tr>
                        <tr class="active">
                            <td><strong>{{t("domesticSources")}}</strong></td>
                            <td v-for="estimate in orderedAnnualEstimates" v-if="!($last && document.fundingNeedsData.annualEstimates.length < options.fundingNeedsYears.length)" class="col-sm-1 text-center">
                                <strong>{{getNationalPlansSourcesTotal('domesticSources', estimate.year)| "number:0"}}</strong></td>
                        </tr>
                       
                        <tr v-for="source in orderedDomesticSources ">
                            <td>{{lstring(source.name,locale)}}</td>
                            <td v-if="annualEstimatesHasYear(2014)" class="text-center">{{source.amount2014 | "number:0"}}</td>
                            <td v-if="annualEstimatesHasYear(2015)" class="text-center">{{source.amount2015 | "number:0"}}</td>
                            <td v-if="annualEstimatesHasYear(2016)" class="text-center">{{source.amount2016 | "number:0"}}</td>
                            <td v-if="annualEstimatesHasYear(2017)" class="text-center">{{source.amount2017 | "number:0"}}</td>
                            <td v-if="annualEstimatesHasYear(2018)" class="text-center">{{source.amount2018 | "number:0"}}</td>
                            <td v-if="annualEstimatesHasYear(2019)" class="text-center">{{source.amount2019 | "number:0"}}</td>
                            <td v-if="annualEstimatesHasYear(2020)" class="text-center">{{source.amount2020 | "number:0"}}</td>
                        </tr>
                        <tr class="active">
                            <td><strong>{{t("internationalSources")}}</strong></td>
                            <td v-for="estimate in orderedAnnualEstimates" v-if="!($last && document.fundingNeedsData.annualEstimates.length < options.fundingNeedsYears.length)" class="col-sm-1 text-center">
                                <strong>{{getNationalPlansSourcesTotal('internationalSources', estimate.year) | "number:0"}}</strong></td>
                        </tr>
                        <tr v-for="source in  orderedInternationalSources">
                            <td>{{lstring(source.name,locale)}}</td>
                            <td v-if="annualEstimatesHasYear(2014)" class="text-center">{{source.amount2014 | "number:0"}}</td>
                            <td v-if="annualEstimatesHasYear(2015)" class="text-center">{{source.amount2015 | "number:0"}}</td>
                            <td v-if="annualEstimatesHasYear(2016)" class="text-center">{{source.amount2016 | "number:0"}}</td>
                            <td v-if="annualEstimatesHasYear(2017)" class="text-center">{{source.amount2017 | "number:0"}}</td>
                            <td v-if="annualEstimatesHasYear(2018)" class="text-center">{{source.amount2018 | "number:0"}}</td>
                            <td v-if="annualEstimatesHasYear(2019)" class="text-center">{{source.amount2019 | "number:0"}}</td>
                            <td v-if="annualEstimatesHasYear(2020)" class="text-center">{{source.amount2020 | "number:0"}}</td>
                        </tr>
                        <tr class="active">
                            <td><strong>{{t("remainingGap")}}</strong></td>
                            <td v-for="estimate in  orderedAnnualEstimates" v-if="!($last && document.fundingNeedsData.annualEstimates.length < options.fundingNeedsYears.length)" class="col-sm-1 text-center">
                                <strong>{{getNationalPlansRemainingGapByYear(estimate.year)| "number:0"}}</strong></td>
                        </tr>
                    </tbody>
                </table>

                <div v-if="document.nationalPlansData.additionalComments">
                    <label>{{t("additionalMethodologicalObservations")}}</label>                    
                    <ng  v-vue-ng:km-value-ml  :value="document.nationalPlansData.additionalComments" :locales="locale" html></ng> 
                </div>
            </section>
            <!-- section 6 end -->          
            
            <!-- section 7 begin -->            
            <section v-if="document.hasDomesticPrivateSectorMeasures">
                <div><label>{{t("measuresPrivateSectorDomesticSupport")}}</label></div>
                <ul class="km-value" style="list-style-type: none;">
                    <li v-for="term in filteredMeasures(document.hasDomesticPrivateSectorMeasures)">
                        {{lstring(term.title,locale)}}                       
                    </li>
                </ul>                
                <div v-if="document.hasDomesticPrivateSectorMeasuresComments">
                    <label>{{t("provideAdditionalInformation")}}</label>                   
                    <ng  v-vue-ng:km-value-ml  :value="document.hasDomesticPrivateSectorMeasuresComments" :locales="locale" html></ng>
                </div>
            </section>
            <!-- section 7 end -->  
           
            <!-- section 8 begin -->  
            <section v-if="document.financialAvailabilityData">
                <legend>{{t("availability")}}</legend>
                <label>{{t("adequateFinancialResources")}}</label>
                         
                <div>
                    <label>(1) {{t("domesticBiodiversityExpenditures")}}</label>
                    <div v-if="hasValue(document.financialAvailabilityData.reportDomesticExpenditures)">
                        <span class="km-value"v-for="term in filteredYesNo(document.financialAvailabilityData.reportDomesticExpenditures)">
                            {{lstring(term.title,locale)}}
                        </span>
                    </div>
                </div>
          
                <div>                  
                    <label>(2) {{t("fundingNeeds")}}</label>
                    <div v-if="hasValue(document.financialAvailabilityData.reportFundingNeeds)">
                        <span class="km-value"v-for="term in  filteredYesNo(document.financialAvailabilityData.reportFundingNeeds)">
                            {{lstring(term.title,locale)}}
                        </span>
                    </div>                  
                </div>

                <div>
                    <label>(3)	{{t("nationalFinancePlan")}} </label>
                    <div v-if="hasValue(document.financialAvailabilityData.prepareFinancePlans)">
                        <span class="km-value"v-for="term in filteredYesNo(document.financialAvailabilityData.prepareFinancePlans)">
                            {{lstring(term.title,locale)}}
                        </span>
                    </div>
                </div>
            </section> 
            <!-- section 8 end -->  
                
            <!-- section relevant information begin -->  
            <section v-if="document.relevantInformation || document.relevantDocuments">
                <legend>{{ t("additionalInformation") }}</legend>
                <view-relevant-information :relevant-information="document.relevantInformation" :relevant-documents="document.relevantDocuments" :locale="locale"> 
                </view-relevant-information> 
            </section>   
            <!-- section relevant information end -->          

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
    import { computed } from 'vue'; 
    import { lstring } from '~/services/filters/lstring.js'; 
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'
    import '~/views/forms/view/directives/view-record-reference.directive.js'
    import '~/views/forms/view/directives/view-reference-records.directive.js'
    import viewRelevantInformation from '~/views/forms/view/directives/view-relevant-information.vue';
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/financial-report-2015.json';
    import { useI18n } from 'vue-i18n';  
    import _ from 'lodash';

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })
    const document = computed(()=>props.documentInfo?.body);

    const options  = {
        multipliers : 		[{identifier:'units',	      title: {en:'in units'}},   		   {identifier:'thousands', title: {en:'in thousands'}}, 		{identifier:'millions', title: {en:'in millions'}}],
        methodology : 		[{identifier:'oecd_dac',      title: {en:'OECD DAC Rio markers'}}, {identifier:'other', 	title: {en:'Other'       }}],
        measures    : 		[{identifier:'no', 	          title: {en:'No' }}, 		  	       {identifier:'some', 		title: {en:'Some measures taken'}}, {identifier:'comprehensive', title: {en:'Comprehensive measures taken'}}],
        inclusions  : 		[{identifier:'notyet', 	      title: {en:'Not yet stared'}},
                                {identifier:'some', 	      title: {en:'Some inclusion achieved'}},
                                {identifier:'comprehensive', title: {en:'Comprehensive inclusion'}}],
        assessments : 		[{identifier:'notnecessary',  title: {en:'No such assessment necessary'}},
                                {identifier:'notyet', 	      title: {en:'Not yet started'}},
                                {identifier:'some', 		  title: {en:'Some assessments undertaken'}},
                                {identifier:'comprehensive', title: {en:'Comprehensive assessments undertaken'}}],
        domesticMethodology:[{identifier:'cmfeccabc',     title: {en:'Conceptual and Methodological Framework for Evaluating the Contribution of Collective Action to Biodiversity Conservation'}},
                                {identifier:'other', 	      title: {en:'Other'}}],
        yesNo : 			[{identifier:false,  		  title: {en:'No' }    },{identifier:true, 	title: {en:'Yes'}}]
    };

    const  filterInclusions = function(id){       
        return options.inclusions.filter((option) => option.identifier===id );
    };       
    
    const  filteredAssessments = function(id){       
        return options.assessments.filter((option) => option.identifier===id );
    };  
   
    const  filteredMultipliers = function(id){       
        return options.multipliers.filter((option) => option.identifier===id);
    };    
   
    const  filteredDomesticMethodology = function (id){       
        return options.domesticMethodology.filter((option) => option.identifier===id );
    };

    const  filteredYesNo = function(id){       
        return options.yesNo.filter((option) => option.identifier===id );
    };

    const  filteredMeasures = function(id){       
        return options.measures.filter((option) => option.identifier===id );
    }; 

    const  filteredMethodology = function(id){       
        return options.methodology.filter((option) => option.identifier===id );
    }; 


    const orderedExpenditures = computed(()=>{
        if (!document.value.domesticExpendituresData.expenditures) return [];     
        return  _.orderBy(document.value.domesticExpendituresData.expenditures, 'year');
    });

    const orderedContributions = computed(()=>{
        if (!document.value.domesticExpendituresData.contributions) return [];     
        return  _.orderBy(document.value.domesticExpendituresData.contributions, 'year');
    });

    const orderedAnnualEstimates = computed(()=>{       
        if (!document.value.fundingNeedsData.annualEstimates) return [];  
       return  _.orderBy(document.value.fundingNeedsData.annualEstimates, 'year');
    });   

    const orderedDomesticSources = computed(()=>{
        if (!document.value.nationalPlansData.domesticSources) return [];     
        return  _.orderBy(document.value.nationalPlansData.domesticSources, 'name');
    });

    const orderedInternationalSources = computed(()=>{
        if (!document.value.nationalPlansData.internationalSources) return [];     
        return  _.orderBy(document.value.nationalPlansData.internationalSources, 'name');
    });

    const orderedBaselineFlows = computed(()=>{
        if (!document.value.internationalResources.baselineData.baselineFlows) return [];     
        return  _.orderBy(document.value.internationalResources.baselineData.baselineFlows, 'year');
    });

    const orderedProgressFlows = computed(()=>{
        if (! document.value.internationalResources.progressData.progressFlows) return [];     
        return  _.orderBy(document.value.internationalResources.progressData.progressFlows, 'year');
    });

   

  
                           

    const typeAverageAmount = function(flows, type){
        if(!flows) return 0;

        var items;

        if(_.isEmpty(_.last(flows)) || !_.last(flows))
            // items = _.initial(_.pluck(flows, type));
            items = _.initial(_.map(flows, type));
        else
            // items = _.pluck(flows, type);
            items = _.map(flows, type);

        if(items.length===0)
            return 0;

        var sum   = _.reduce(_.compact(items), function(memo, num){ return memo + parseInt(num || 0); }, 0);

        return Math.round(sum/items.length);
    };

    const confidenceAverage = function (resources) {
        var values = _.compact(_.map(resources, function (resource) {
            if (resource && resource.confidenceLevel && resource.confidenceLevel.identifier == "D8BC6348-D1F9-4DA4-A8C0-7AE149939ABE") return 3; //high
            if (resource && resource.confidenceLevel && resource.confidenceLevel.identifier == "42526EE6-68F3-4E8A-BC2B-3BE60DA2EB32") return 2; //medium
            if (resource && resource.confidenceLevel && resource.confidenceLevel.identifier == "6FBEDE59-88DB-45FB-AACB-13C68406BD67") return 1; //low
            return 0;
        }));

        var value = 0;
        if(values.length) {
            value = Math.round(_.reduce(values, function(memo, value) { return memo + value; }) / values.length);
        }

        if ( value == 3) return "High";
        if ( value == 2) return "Medium";
        if ( value == 1) return "Low";

        return "No value selected";
    };

    const hasValue = function(val){
        if(val === false || val === true)
            return true;
        return false;
    };

    const annualEstimatesHasYear = function (year) {
        if(!year) return false;
        if(document && document.value.fundingNeedsData && document.value.fundingNeedsData.annualEstimates){
            const estimate =document.value.fundingNeedsData.annualEstimates.find((item) => item.year = year);
            if(estimate)
                return true;
        }
        return false;
    };


    const getFundingGapYear = function(year){   
        if(!year) return 0;

        if(document.value && document.value.fundingNeedsData && document.value.fundingNeedsData.annualEstimates){
            const estimate = document.value.fundingNeedsData.annualEstimates.find((item) => item.year = year);  
            if(estimate && estimate.fundingGapAmount)
                return estimate.fundingGapAmount;  
        }
        return 0;
    };

    const getNationalPlansSourcesTotal = function(member, year){
        if(!year || !member) return 0;

        if(document && document.value.nationalPlansData && document.value.nationalPlansData[member]){

            var prop = "amount"+year;
            var items;

            // var sources = angular.fromJson($scope.document.nationalPlansData[member]);//jshint ignore:line
            var sources = document.value.nationalPlansData[member];//jshint ignore:line
          
            
                if(_.isEmpty(_.last(sources)))
                items = _.initial(sources);
            console.log("items",items);

            // items = _.pluck(sources, prop);
            items = _.map(sources, prop);
            console.log("items",items);

            var sum = 0;
            _.map(_.compact(items), function(num){
                sum = sum + parseInt(num)||0;
            });
            console.log("sum",sum);

            return sum;
        }
        return 0;
    };
                        
    const getNationalPlansRemainingGapByYear = function(year){
        if(!year) return 0;

        return getFundingGapYear(year) - (getNationalPlansSourcesTotal('domesticSources', year)  + getNationalPlansSourcesTotal('internationalSources', year)) ;
    };

    const isEmpty = function (item) {
        return _.isEmpty(item);
    };

    const totalAverageAmount = function(){
        var odaAverage   = 0;
        var oofAverage   = 0;
        var otherAverage = 0;

        if(document && document.internationalResources && document.internationalResources.baselineData && document.internationalResources.baselineData.baselineFlows)
        {
            odaAverage   = typeAverageAmount(document.internationalResources.baselineData.baselineFlows,'odaAmount');
            oofAverage   = typeAverageAmount(document.internationalResources.baselineData.baselineFlows,'oofAmount');
            otherAverage = typeAverageAmount(document.internationalResources.baselineData.baselineFlows,'otherAmount');
        }

        return parseInt(odaAverage)+parseInt(oofAverage)+parseInt(otherAverage);
    };
</script>