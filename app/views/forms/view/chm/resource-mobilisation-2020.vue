<template> 
    <div id="Record" class="record ">
       <div class="record-body  bg-white" v-if="document">
           <!--TODO: add compare-val for fields  -->
           
           <document-date :document-info="documentInfo"></document-date>

           <!-- section basic information and section 1-3 -->
           <view-financial-report :document="document" :locale="locale" type="2020"> 
           </view-financial-report>            

           <!-- section 4 begin -->
           <section v-if="document?.domesticExpendituresData">
                <legend>{{t("role")}}</legend>
                <label>{{t("hasYourCountry")}}</label>
                <div v-if="document?.domesticExpendituresData?.domesticCollectiveAction">
                    <div class="km-value km-pre"  style="list-style-type: none;" >                  
                        <li v-for="term in filter(options.assessments,document?.domesticExpendituresData?.domesticCollectiveAction)">                     
                            {{lstring(term.title,locale)}}
                        </li>
                    </div>
                </div>

                <label>{{t("additionalInformationOnAssessment")}}</label>
        
                <div v-if="document?.domesticExpendituresData?.currency" >
                    <label>{{t("currency")}}</label>
                    <span class="km-value">
                       <km-term :value="document?.domesticExpendituresData?.currency" :locale="locale"></km-term>   
                    </span>
                </div>

                <div v-if="document?.domesticExpendituresData?.multiplier" >
                    <label>{{t("allValues")}}</label>
                    <div class="km-value">
                        <span v-for="term in filter(options.multipliers,document?.domesticExpendituresData?.multiplier)">
                            {{lstring(term.title,locale)}} 
                        </span>
                    </div>                    
                </div>       
               
                <div v-if="document?.domesticExpendituresData?.measurementUnit" >
                    <label>{{t("measurementUnit")}}</label>                                   
                    <ng v-vue-ng:km-value-ml  :value="document?.domesticExpendituresData?.measurementUnit" :locales="locale" html km-pre></ng>
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
                        <tr v-for="contribution in orderedContributions" >                            
                            <td>{{contribution.year}}</td>
                            <td>{{currencyString(contribution.amount)}}</td>
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
                    <label>{{t("methodologicalInformation")}}</label>
                </div>        
               
                <div v-if="document?.domesticExpendituresData?.domesticCollectiveActionMethodology" >
                    <label>{{t("methodology")}}</label>
                    <div  v-if="!document?.domesticExpendituresData?.domesticCollectiveActionMethodologyOther" >                    
                        <ng v-vue-ng:km-value-ml  :value="document?.domesticExpendituresData?.domesticCollectiveActionMethodology" :locales="locale" html km-pre></ng>              
                    </div>
                    <div  v-if="document?.domesticExpendituresData?.domesticCollectiveActionMethodologyOther" >                       
                        <ng v-vue-ng:km-value-ml  :value="document?.domesticExpendituresData?.domesticCollectiveActionMethodologyOther" :locales="locale" html km-pre></ng>            
                    </div>
                </div>        
              
                <div v-if="document?.domesticExpendituresData?.domesticCollectiveActionMethodologyComments" >
                    <label>{{t("otherMethodological")}}</label> 
                    <ng v-vue-ng:km-value-ml  :value="document?.domesticExpendituresData?.domesticCollectiveActionMethodologyComments" :locales="locale" html km-pre></ng>  
                </div>
            </section>  
            <!-- section 4 end -->
            
            <!-- section 5 begin -->
            <section v-if="document?.nationalPlansData">
                <legend>{{t("reportingProgress")}}</legend>
                <label>{{t("achievedResourceMobilization")}}</label>
                <div v-if="document?.nationalPlansData?.currency" >
                    <label>{{t("currency")}}</label>
                    <span class="km-value"> 
                        <km-term :value="document?.nationalPlansData?.currency" :locale="locale"></km-term>   
                    </span>
                </div>
        
                <div v-if="document?.nationalPlansData?.multiplier" >
                    <label>{{t("allValues")}}</label>
                    <div class="km-value">
                        <span v-for="term in filter(options.multipliers,document?.nationalPlansData?.multiplier)">
                            {{lstring(term.title,locale)}} 
                        </span>
                    </div>                  
                </div>

                <table v-if="baselineDocument?.fundingNeedsData?.annualEstimates" class="table table-hover table-condensed">
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
                            <td v-for="estimate in orderedAnnualEstimates" class="col-sm-1 text-center">
                                    <strong>{{currencyString(getBaselineFundingGapYear(estimate.year))}}</strong>                                    
                            </td>
                        </tr>
                        <tr class="active">
                            <td><strong>{{t("domesticSources")}}</strong></td>                              
                            <td v-for="estimate in orderedAnnualEstimates" class="col-sm-1 text-center">
                                <strong>{{currencyString(getNationalPlansSourcesTotal('domesticSources', estimate.year))}}</strong>                        
                            </td>
                        </tr>
        
                        <tr v-for="source in orderedDomesticSources">
                            <td>{{lstring(source.name,locale)}}</td>
                            <td v-if="annualEstimatesHasYear(2014)" class="text-center">{{currencyString(source.amount2014) }}</td>
                            <td v-if="annualEstimatesHasYear(2015)" class="text-center">{{currencyString(source.amount2015) }}</td>
                            <td v-if="annualEstimatesHasYear(2016)" class="text-center">{{currencyString(source.amount2016) }}</td>
                            <td v-if="annualEstimatesHasYear(2017)" class="text-center">{{currencyString(source.amount2017) }}</td>
                            <td v-if="annualEstimatesHasYear(2018)" class="text-center">{{currencyString(source.amount2018) }}</td>                          
                            <td v-if="annualEstimatesHasYear(2019)" class="text-center">{{currencyString(source.amount2019) }}</td>
                            <td v-if="annualEstimatesHasYear(2020)" class="text-center">{{currencyString(source.amount2020) }}</td>
                        </tr>
                        <tr class="active">
                            <td><strong>{{t("internationalSources")}}</strong></td>
                            <td v-for="estimate in orderedAnnualEstimates" class="col-sm-1 text-center">                           
                                <strong>{{currencyString(getNationalPlansSourcesTotal('internationalSources', estimate.year))}}</strong>
                            </td>
                        </tr>
                        <tr v-for="source in  orderedInternationalSources">
                            <td>{{lstring(source.name,locale)}}</td>
                            <td v-if="annualEstimatesHasYear(2014)" class="text-center">{{currencyString(source.amount2014) }}</td>
                            <td v-if="annualEstimatesHasYear(2015)" class="text-center">{{currencyString(source.amount2015) }}</td>
                            <td v-if="annualEstimatesHasYear(2016)" class="text-center">{{currencyString(source.amount2016) }}</td>
                            <td v-if="annualEstimatesHasYear(2017)" class="text-center">{{currencyString(source.amount2017) }}</td>
                            <td v-if="annualEstimatesHasYear(2018)" class="text-center">{{currencyString(source.amount2018) }}</td>                          
                            <td v-if="annualEstimatesHasYear(2019)" class="text-center">{{currencyString(source.amount2019) }}</td>
                            <td v-if="annualEstimatesHasYear(2020)" class="text-center">{{currencyString(source.amount2020) }}</td>
                        </tr>
                        <tr class="active">
                            <td><strong>{{t("remainingGap")}}</strong></td>
                            <td v-for="estimate in orderedAnnualEstimates"  class="col-sm-1 text-center">
                                <strong>{{currencyString(getNationalPlansRemainingGapByYear(estimate.year))}}</strong>
                            </td>
                        </tr>
                        <tr class="active">
                            <td><strong>{{t("gapReduced")}}</strong></td>
                            <td v-for="(estimate) in orderedAnnualEstimates" class="col-sm-1 text-center">                                
                                <span class="km-pre" v-if="document?.nationalPlansData?.gapReductions">                                   
                                    {{lstring(getHasReducedByYear(estimate.year),locale)}}
                                </span>
                            </td>
                        </tr>
                        <tr class="active">
                            <td><strong>{{t("gapReducedOverall")}}</strong></td>
                            <td  colspan="{{baselineDocument.fundingNeedsData.annualEstimates.length || 1}}" class="text-center">
                                <span class="km-pre">                             
                                    <km-term :value="document?.nationalPlansData?.hasReduceGapOverall" :locale="locale"></km-term>   
                                </span>
                            </td>
                        </tr>								
                    </tbody>
                </table>

                <div v-if="document?.nationalPlansData?.additionalComments">
                    <label>{{t("additionalMethodologicalObservations")}}</label> 
                    <ng v-vue-ng:km-value-ml  :value="document?.nationalPlansData?.additionalComments" :locales="locale" html km-pre></ng> 
                </div>            
        
                <div v-if="document?.nationalPlansData?.hasDomesticPrivateSectorMeasures">
                    <div><label>{{t("measuresPrivateSectorDomesticSupport")}}</label></div>
                    <div class="km-value" style="list-style-type: none;">
                        <li v-for="term in filter(options.measures,document?.nationalPlansData?.hasDomesticPrivateSectorMeasures)">
                            {{lstring(term.title,locale)}}
                        </li>
                    </div>
                    <div v-if="document?.nationalPlansData?.hasDomesticPrivateSectorMeasuresComments">
                        <label>{{t("provideAdditionalInformation")}}</label>  
                        <ng v-vue-ng:km-value-ml  :value="document?.nationalPlansData?.hasDomesticPrivateSectorMeasuresComments" :locales="locale" html km-pre></ng>                       
                    </div>
                </div>   
            </section>
            <!-- section 5 end -->
       
   
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
   import { computed, ref, onMounted} from 'vue';
   import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js';
   import '~/views/forms/view/directives/view-reference-records.directive.js';
   import viewRelevantInformation from '~/views/forms/view/directives/view-relevant-information.vue';
   import viewFinancialReport from '~/views/forms/view/directives/view-financial-report.vue';
   import kmTerm from '~/components/km/KmTerm.vue';
   import messages from '~/app-text/views/reports/chm/resource-mobilisation-2020.json'; 
   import documentDate from '~/views/forms/view/directives/document-date.vue'; 
   import { useI18n } from 'vue-i18n';
   import { lstring } from '~/services/filters/lstring.js'; 
   import KmDocumentApi from "~/api/km-document.js";
   import SolrApi from "~/api/solr.js";
   import { useAuth } from "@scbd/angular-vue/src/index.js";
   import _ from 'lodash';
   import { useRealm } from '~/services/composables/realm.js';
 
   const realm = useRealm();
   const auth = useAuth();
   const { t } = useI18n({ messages });

   const props = defineProps({
       documentInfo: { type:Object, required:true},
       locale      : { type:String, required:true}
   })

   const document = computed(()=>props.documentInfo?.body);

   const orderedContributions = computed(()=>{       
        if (!(document?.value?.domesticExpendituresData?.contributions)) return [];   
        //remove {} from array
        var newArray = document?.value?.domesticExpendituresData?.contributions.filter(value => Object.keys(value).length !== 0);    
        return  _.orderBy(newArray , 'year');
    });

    const orderedAnnualEstimates  = computed(()=>{
        if (!(baselineDocument?.value?.fundingNeedsData?.annualEstimates)) return [];     
        return  _.orderBy(baselineDocument?.value?.fundingNeedsData?.annualEstimates, 'year');
    });

    const orderedDomesticSources = computed(()=>{
        if (!(document?.value?.nationalPlansData?.domesticSources)) return [];     
        return  _.orderBy(document?.value?.nationalPlansData?.domesticSources, 'name');
    });

    const orderedInternationalSources = computed(()=>{
        if (! (document?.value?.nationalPlansData?.internationalSources)) return [];     
        return  _.orderBy( document?.value?.nationalPlansData?.internationalSources, 'name');
    });

   const kmDocumentApi = new KmDocumentApi({tokenReader:()=>auth.token()});    
   const solrAPI = new SolrApi({tokenReader:()=>auth.token()});  
   const hasBaselineDocument = ref(false);
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



    const isEmpty = function (item) {
        return _.isEmpty(item);
    };    

    const getNationalPlansSourcesTotal = function(member, year){
        if(!year || !member) return 0;
   
        if(document?.value?.nationalPlansData[member]){

            var prop = "amount"+year;
            var items;      
            var sources = document.value.nationalPlansData[member];          
            
            if(_.isEmpty(_.last(sources)))
                items = _.initial(sources);

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
        return getBaselineFundingGapYear(year) - (getNationalPlansSourcesTotal('domesticSources', year)  + getNationalPlansSourcesTotal('internationalSources', year)) ;
      };
     
    const getBaselineFundingGapYear = function(year){
        if(!year) return 0;
        if(baselineDocument?.value?.fundingNeedsData?.annualEstimates){

            var estimates = baselineDocument.value.fundingNeedsData.annualEstimates;
            var estimate = _.find(estimates, {year:year});

            if(estimate?.fundingGapAmount)
                return estimate.fundingGapAmount;
        }
        return 0;
    };	 

    const getHasReducedByYear = function(year){
        if(!year) return ""; 
        const item = document?.value?.nationalPlansData?.gapReductions.find((item) => item.year===year );     
        const result = options.yesNo.find((option) => option.identifier===item.hasReduced );  
        return  result.title ;
    };                              
    
	const annualEstimatesHasYear = function (year) {
        if(!year) return false;
        if(baselineDocument?.value?.fundingNeedsData?.annualEstimates){
            var estimates = baselineDocument.value.fundingNeedsData.annualEstimates;
            var estimate = _.find(estimates, {year:year});
            if(estimate)
                return true;
        }
        return false;
    };

    const  loadBaselineDocuments = async function() {         
        const governmentId = document.value.government.identifier;
        const schema = "resourceMobilisation";  //get financial framework 2015 report as baseline

        const result = await solrAPI.query(
            {query:`schema_s:${schema} AND government_s:${governmentId} AND realm_ss:${realm.realm} AND _state_s: public`}
        );   
        
        // use identifier to get the relevant financial framework 2015 view report document
        var baselineDocumentIdentifier = result?.response?.docs[0].identifier_s;        
        baselineDocument.value = await kmDocumentApi.getDocument(baselineDocumentIdentifier);                     
 
    }

    onMounted(() => {
       loadBaselineDocuments();
   })

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
