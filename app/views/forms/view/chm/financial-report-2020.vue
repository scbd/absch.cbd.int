<template> 
    <div id="Record" class="record ">
       <div class="record-body  bg-white" v-if="document">
           <!--TODO: add compare-val for fields  -->

           <!-- TODO: add publish date -->            
           <!-- <ng v-vue-ng:document-date></ng> -->

           <!-- section basic information and section 1-3 -->
           <view-financial-report :document="document" :locale="locale"> 
           </view-financial-report>            

           <!-- section 4 begin -->
           <section v-if="document.domesticExpendituresData">
                <legend>{{t("role")}}</legend>
                <div><label>{{t("hasYourCountry")}}</label></div>
                <div v-if="document.domesticExpendituresData.domesticCollectiveAction">
                    <div  class="km-value"  style="list-style-type: none;" >                  
                        <li v-for="term in filteredAssessments(document.domesticExpendituresData.domesticCollectiveAction)">                     
                            {{lstring(term.title,locale)}}
                        </li>
                    </div>
                </div>

                <div><label>{{t("additionalInformationOnAssessment")}}</label></div>
        
                <div v-if="document.domesticExpendituresData.currency" >
                    <label>{{t("currency")}}</label>
                    <span class="km-value">                    
                        <km-term :value="document.domesticExpendituresData.currency " :locale="locale"></km-term>   
                    </span>
                </div>
                <div v-if="document.domesticExpendituresData.multiplier" >
                    <label>{{t("allValues")}}</label>
                    <span class="km-value" v-for="term in filteredMultipliers(document.domesticExpendituresData.multiplier)">
                        {{lstring(term.title,locale)}} 
                    </span>
                </div>       
               
                <div v-if="document.domesticExpendituresData.measurementUnit" >
                    <label>{{t("measurementUnit")}}</label>
                    <div class="km-value">
                        {{document.domesticExpendituresData.measurementUnit}}
                    </div>
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
                        <tr v-for="contribution in orderedContributions ">
                            <td>{{contribution.year}}</td>
                            <td>{{contribution.amount | "number:0"}}</td>
                            <td><km-term :value="contribution.confidenceLevel" :locale="locale"></km-term></td>
                        </tr>
                        <tr class="active">
                            <td><strong>{{t("average")}}</strong></td>
                            <td>{{typeAverageAmount(document.domesticExpendituresData.contributions,'amount')  | "number:0"}}</td>
                            <td>{{confidenceAverage(document.domesticExpendituresData.contributions)}}</td>
                        </tr>
                    </tbody>
                </table>
        
                <div v-if="document.domesticExpendituresData.domesticCollectiveActionMethodology || document.domesticExpendituresData.domesticCollectiveActionMethodologyComments">
                    <label>{{t("methodologicalInformation")}}</label>
                </div>        
               
                <div v-if="document.domesticExpendituresData.domesticCollectiveActionMethodology" >
                    <label>{{t("methodology")}}</label>
                    <div v-if="!document.domesticExpendituresData.domesticCollectiveActionMethodologyOther" >
                        <ng v-vue-ng:km-value-ml :value="document.domesticExpendituresData.domesticCollectiveActionMethodology" :locales="locale" html></ng>              
                    </div>
                    <div v-if="document.domesticExpendituresData.domesticCollectiveActionMethodologyOther" >
                        <ng v-vue-ng:km-value-ml :value="document.domesticExpendituresData.domesticCollectiveActionMethodologyOther" :locales="locale" html></ng>              
                    </div>
                </div>        
              
                <div v-if="document.domesticExpendituresData.domesticCollectiveActionMethodologyComments" >
                    <label>{{t("otherMethodological")}}</label>                   
                    <ng v-vue-ng:km-value-ml :value="document.domesticExpendituresData.domesticCollectiveActionMethodologyComments" :locales="locale" html></ng>
                </div>
            </section> 
            <!-- section 4 end -->
            
            <!-- section 5 begin -->
            <section v-if="document.nationalPlansData">
                <legend>{{t("reportingProgress")}}</legend>
                <label>{{t("achievedResourceMobilization")}}</label>
                <div v-if="document.nationalPlansData.currency" >
                    <label>{{t("currency")}}</label>
                    <span class="km-value">                     
                        <km-term :value="document.nationalPlansData.currency" :locale="locale"></km-term>   
                    </span>
                </div>
        
                <div v-if="document.nationalPlansData.multiplier" >
                    <label>{{t("allValues")}}</label>
                    <span class="km-value" v-for="term in filteredMultipliers(document.nationalPlansData.multiplier)">
                        {{lstring(term.title,locale)}} 
                    </span>
                </div>
        
                <!-- TODO:test -->
                <table v-if="baselineDocument.fundingNeedsData && baselineDocument.fundingNeedsData.annualEstimates" class="table table-hover table-condensed">
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
                            <td><strong>{{t("fundingGap")}}</strong></td>
                            <td v-for="estimate in orderedAnnualEstimates" v-if="!($last && baselineDocument.fundingNeedsData.annualEstimates.length < options.fundingNeedsYears.length)" class="col-sm-1 text-center">
                                <strong>{{getBaselineFundingGapYear(estimate.year) | "number:0"}}</strong>                                    
                            </td>
                        </tr>
                        <tr class="active">
                            <td><strong>{{t("domesticSources")}}</strong></td>
                            <td v-for="estimate in orderedAnnualEstimates" v-if="!($last && baselineDocument.fundingNeedsData.annualEstimates.length < options.fundingNeedsYears.length)" class="col-sm-1 text-center">
                                <strong>{{getNationalPlansSourcesTotal('domesticSources', estimate.year)| "number:0"}}</strong>                        
                            </td>
                        </tr>
        
                        <tr v-for="source in orderedDomesticSources">
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
                            <td v-for="estimate in orderedAnnualEstimates" v-if="!($last && baselineDocument.fundingNeedsData.annualEstimates.length < options.fundingNeedsYears.length)" class="col-sm-1 text-center">
                                <strong>{{getNationalPlansSourcesTotal('internationalSources', estimate.year) | "number:0"}}</strong>
                            </td>
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
                            <td v-for="estimate in orderedAnnualEstimates" v-if="!($last && baselineDocument.fundingNeedsData.annualEstimates.length < options.fundingNeedsYears.length)" class="col-sm-1 text-center">
                                <strong>{{getNationalPlansRemainingGapByYear(estimate.year)| "number:0"}}</strong>
                            </td>
                        </tr>
                        <tr class="active">
                            <td><strong>{{t("gapReduced")}}</strong></td>
                            <td v-for="estimate in orderedAnnualEstimates" class="col-sm-1 text-center">
                                <span class="km-value km-pre" v-if="document.nationalPlansData.gapReductions[$index].hasReduced">
                                    {{document.nationalPlansData.gapReductions[$index].hasReduced}}
                                </span>
                            </td>
                        </tr>
                        <tr class="active">
                            <td><strong>{{t("gapReducedOverall")}}</strong></td>
                            <td  colspan="{{baselineDocument.fundingNeedsData.annualEstimates.length || 1}}" class="text-center">
                                <span class="km-value km-pre">
                                    {{lstring(document.nationalPlansData.hasReduceGapOverall|term),locale}}
                                </span>
                            </td>
                        </tr>								
                    </tbody>
                </table>


                <div v-if="document.nationalPlansData.additionalComments">
                    <label>{{t("additionalMethodologicalObservations")}}</label>                                      
                    <ng  v-vue-ng:km-value-ml  :value="document.nationalPlansData.additionalComments " :locales="locale" html></ng>                     
                </div>            
        
                <div v-if="document.nationalPlansData.hasDomesticPrivateSectorMeasures">
                    <div><label>{{t("measuresPrivateSectorDomesticSupport")}}</label></div>
                    <ul class="km-value" style="list-style-type: none;">
                        <li v-for="term in filteredMeasures(document.nationalPlansData.hasDomesticPrivateSectorMeasures)">
                            {{lstring(term.title,locale)}}
                        </li>
                    </ul>
                    <div v-if="document.nationalPlansData.hasDomesticPrivateSectorMeasuresComments">
                        <label>{{t("provideAdditionalInformation")}}</label>                        
                        <ng  v-vue-ng:km-value-ml  :value="document.nationalPlansData.hasDomesticPrivateSectorMeasuresComments" :locales="locale" html></ng> 
                       
                    </div>
                </div>   
            </section>
            <!-- section 5 end -->
   
            <!-- section relevant information begin -->  
            <section v-if="document.relevantInformation || document.relevantDocuments">
                <legend>{{ t("additionalInformation") }}</legend>
                <view-relevant-information :relevant-information="document.relevantInformation" :relevant-documents="document.relevantDocuments" :locale="locale"> 
                </view-relevant-information> 
            </section>   
            <!-- section relevant information end -->  

           <div>               
                <ng v-vue-ng:view-record-reference  v-model:ng-model="document.header.identifier" ></ng>  
           </div>         
       </div>  
       <!-- TODO: add footer  -->
       <!-- <ng v-vue-ng:document-metadata  :document="document"></ng>  -->   

   </div>
</template>

<script setup>
   import { computed, ref, onMounted} from 'vue';
   import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'
   import '~/views/forms/view/directives/view-record-reference.directive.js'
   import viewRelevantInformation from '~/views/forms/view/directives/view-relevant-information.vue';
   import viewFinancialReport from '~/views/forms/view/directives/view-financial-report.vue';
   import kmTerm from '~/components/km/KmTerm.vue';
   import messages from '~/app-text/views/reports/chm/financial-report-2020.json'; 
   import { useI18n } from 'vue-i18n';
   import { lstring } from '~/services/filters/lstring.js'; 
   import KmDocumentApi from "~/api/km-document";
   import { useAuth } from "@scbd/angular-vue/src/index.js";
   const auth = useAuth();

   const { t } = useI18n({ messages });

   const props = defineProps({
       documentInfo: { type:Object, required:true},
       locale      : { type:String, required:true}
   })

   const document = computed(()=>props.documentInfo?.body);

   const orderedBaselineFlows = computed(()=>{
        if (!(document.value.internationalResources && document.value.internationalResources.baselineData && document.value.internationalResources.baselineData.baselineFlows)) return [];     
        return  _.orderBy(document.value.internationalResources.baselineData.baselineFlows, 'year');
    });

    const orderedProgressFlows = computed(()=>{
        if (! (document.value.internationalResources && document.value.internationalResources.progressData && document.value.internationalResources.progressData.progressFlows)) return [];     
        return  _.orderBy(document.value.internationalResources.progressData.progressFlows, 'year');
    });  

    const orderedExpenditures = computed(()=>{
        if (!(document.value.domesticExpendituresData && document.value.domesticExpendituresData.expenditures)) return [];     
        return  _.orderBy(document.value.domesticExpendituresData.expenditures, 'year');
    });

    const orderedContributions = computed(()=>{
        if (!(document.value.domesticExpendituresData && document.value.domesticExpendituresData.contributions)) return [];     
        return  _.orderBy(document.value.domesticExpendituresData.contributions, 'year');
    });

    const kmDocumentApi = new KmDocumentApi({tokenReader:()=>auth.token()});    
    //const kmDocumentApi = new KmDocumentApi({});   
    const hasBaselineDocument = ref(false);
    const baselineDocuments = ref([]);
    const baselineDocument = ref({});  

    const options  = {
        multipliers :       [{identifier:'units',         title: {en:`${t("units")}`}},  
                             {identifier:'thousands',     title: {en:`${t("thousands")}`}}, 
                             {identifier:'millions',      title: {en:`${t("millions")}`}}],
        methodology :       [{identifier:'oecd_dac',      title: {en:`${t("oecd_dac")}`}}, 
                             {identifier:'other',         title: {en:`${t("other")}` }}],
        measures    :       [{identifier:'no',            title: {en:`${t("no")}`}},  
                             {identifier:'some',          title: {en:`${t("some")}`}},    
                             {identifier:'comprehensive', title: {en:`${t("comprehensive")}`}}], 
        inclusions  :       [{identifier:'notyet',        title: {en:`${t("notYet")}`}},
                             {identifier:'some',          title: {en:`${t("someInclusion")}`}},
                             {identifier:'comprehensive', title: {en:`${t("comprehensiveInclusion")}`}}],  
        assessments :       [{identifier:'notnecessary',  title: {en:`${t("notNecessary")}`}},                    
                             {identifier:'notyet',        title: {en:`${t("notYet")}`}},
                             {identifier:'some',          title: {en:`${t("someAssessment")}`}},
                             {identifier:'comprehensive', title: {en:`${t("comprehensiveAssessment")}`}}],
        domesticMethodology:[{identifier:'cmfeccabc',     title: {en:`${t("cmfeccabc")}`}},
                             {identifier:'other',         title: {en:`${t("other")}`}}],
        yesNo :             [{identifier:false,           title: {en:`${t("no")}`}},
                             {identifier:true,            title: {en:`${t("yes")}`}}]
    };

   const  filteredAssessments = function(id){       
        return options.assessments.filter((option) => option.identifier===id );
    };  

    const  filteredInclusions = function(id){       
        return options.inclusions.filter((option) => option.identifier===id );
    }; 
     
    const  filteredMultipliers = function(id){       
        return options.multipliers.filter((option) => option.identifier===id);
    }; 
   
    const  filteredMeasures = function(id){       
        return options.measures.filter((option) => option.identifier===id );
    }; 

    const  filteredMethodology = function(id){       
        return options.methodology.filter((option) => option.identifier===id );
    };         
    
    // TODO:test
    const orderedAnnualEstimates  = computed(()=>{
        if (!(baselineDocument.value.fundingNeedsData && baselineDocument.value.fundingNeedsData.annualEstimates)) return [];     
        return  _.orderBy(baselineDocument.value.fundingNeedsData.annualEstimates, 'year');
    });

    const orderedDomesticSources = computed(()=>{
        if (!(document.value.nationalPlansData && document.value.nationalPlansData.domesticSources)) return [];     
        return  _.orderBy(document.value.nationalPlansData.domesticSources, 'name');
    });

    const orderedInternationalSources = computed(()=>{
        if (! (document.value.nationalPlansData && document.value.nationalPlansData.internationalSources)) return [];     
        return  _.orderBy( document.value.nationalPlansData.internationalSources, 'name');
    });

    const totalAverageAmount = function(){
        var odaAverage   = 0;
        var oofAverage   = 0;
        var otherAverage = 0;

        if(document.value && document.value.internationalResources && document.value.internationalResources.baselineData && document.value.internationalResources.baselineData.baselineFlows)
        {
            odaAverage   = typeAverageAmount(document.value.internationalResources.baselineData.baselineFlows,'odaAmount');
            oofAverage   = typeAverageAmount(document.value.internationalResources.baselineData.baselineFlows,'oofAmount');
            otherAverage = typeAverageAmount(document.value.internationalResources.baselineData.baselineFlows,'otherAmount');
        }

        return parseInt(odaAverage)+parseInt(oofAverage)+parseInt(otherAverage);
    };

    const typeAverageAmount = function(flows, type){
        if(!flows) return 0;

        var items;

        if(_.isEmpty(_.last(flows)) || !_.last(flows))           
            items = _.initial(_.map(flows, type));
        else         
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

    const getFundingGapYear = function(year){   
        if(!year) return 0;

        if(document.value && document.value.fundingNeedsData && document.value.fundingNeedsData.annualEstimates){
            const estimate = document.value.fundingNeedsData.annualEstimates.find((item) => {
                item.year == year
            });  
            if(estimate && estimate.fundingGapAmount)
                return estimate.fundingGapAmount;  
        }
        return 0;
    };

    const isEmpty = function (item) {
        return _.isEmpty(item);
    };    

    const getNationalPlansSourcesTotal = function(member, year){
        if(!year || !member) return 0;

        if(document.value && document.value.nationalPlansData && document.value.nationalPlansData[member]){

            var prop = "amount"+year;
            var items;

            // var sources = angular.fromJson($scope.document.nationalPlansData[member]);//jshint ignore:line
            var sources = document.value.nationalPlansData[member];//jshint ignore:line
          
            
            if(_.isEmpty(_.last(sources)))
                items = _.initial(sources);
            console.log("items",items);

            items = _.map(sources, prop);          

            var sum = 0;
            _.map(_.compact(items), function(num){
                sum = sum + parseInt(num)||0;
            });       

            return sum;
        }
        return 0;
    };

    const getNationalPlansRemainingGapByYear = function(year){
        if(!year) return 0;
        return getFundingGapYear(year) - (getNationalPlansSourcesTotal('domesticSources', year)  + getNationalPlansSourcesTotal('internationalSources', year)) ;
    };
     
    const getBaselineFundingGapYear = function(year){
        if(!year) return 0;
        if(baselineDocument.value && baselineDocument.value.fundingNeedsData && baselineDocument.value.fundingNeedsData.annualEstimates){

            var estimates = baselineDocument.value.fundingNeedsData.annualEstimates;
            var estimate = _.findWhere(estimates, {year:year});

            if(estimate && estimate.fundingGapAmount)
                return estimate.fundingGapAmount;
        }
        return 0;
    };			
    
	const annualEstimatesHasYear = function (year) {
        if(!year) return false;
        if(baselineDocument.value && baselineDocument.value.fundingNeedsData && baselineDocument.value.fundingNeedsData.annualEstimates){
            var estimates = baselineDocument.value.fundingNeedsData.annualEstimates;
            var estimate = _.findWhere(estimates, {year:year});
            if(estimate)
                return true;
        }
        return false;
    };
  
    const loadBaselineDocuments = async function(){
        const query = {
            $filter : `(type eq '${encodeURI('resourceMobilisation')}')` 
        }

        const records =  new Promise(function(resolve, reject) {
            kmDocumentApi.queryDocuments(query).then(function(results) {                  
                      
            var oDocs  = results.Items; 
        
            if(oDocs.length>0){
                baselineDocuments.value = oDocs; //_.union(oDocs, oDrafts);
                //console.log('baselineDocuments.value',baselineDocuments.value);   
                const baselineDocumentId      = baselineDocuments.value[0].documentID;
                var baselineDocumentIdentifier = baselineDocuments.value[0].identifier;

                getBaselineDocument(baselineDocumentIdentifier).then(function(o){
                    baselineDocument.value = o.body;
                });
            }
            resolve(results.data);
            }, function(e) {
                if (e.status == 404) {
                    hasBaselineDocument.value = false;
                    throw e;
                }
                else {
                    reject (e);
                }
            });
        });
    }	

    const getBaselineDocument = function(identifier) {
        if (identifier) { //lookup single record        
            return new Promise(function(resolve, reject) {
                kmDocumentApi.getDocument(identifier).then(function(r) {                     
                        hasBaselineDocument.value = true;                        
                        resolve(r.data);
                    }, function(e) {
                        if (e.status == 404) {
                            hasBaselineDocument.value = false;
                            throw e;
                        }
                        else {
                            reject (e);
                        }
                    });
            });
        }
    } 

    onMounted(() => {
       loadBaselineDocuments();
   })

</script>
