<template>
    <!-- section basic information begin -->
    <section v-if="hasBasicInformationData" >

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

        <div v-if="hasContactDetailsData" >
            <legend>{{t("contactDetails")}}</legend>

            <div v-if="document.respondentName">
                <label>{{t("name")}}</label>
                <div class="km-value">{{document.respondentName}}</div>
            </div>
            
            <div v-if="document.respondentDesignation">
                <label>{{t("title")}}</label> 
                <ng v-vue-ng:km-value-ml  :value="document.respondentDesignation" :locales="locale" html km-pre></ng> 
            </div>

            <div v-if="document.respondentOrganization">
                <label>{{t("organization")}}</label>
                <ng v-vue-ng:km-value-ml  :value="document.respondentOrganization" :locales="locale" html km-pre></ng>
            </div>
        
            <div v-if="document.respondentDepartment">
                <label>{{t("department")}}</label>
                <ng v-vue-ng:km-value-ml  :value="document.respondentDepartment" :locales="locale" html km-pre></ng>
            </div>

            <div v-if="document.respondentPhones">
                <label>{{t("phoneNumbers")}}</label>
                <div class="km-value">
                    <li v-for="item in document.respondentPhones">
                        {{item}}
                    </li>
                </div>
            </div>
            
            <div v-if="document.respondentEmails">
                <label>{{t("emails")}}</label>
                <div class="km-value">
                    <li v-for="item in document.respondentEmails">
                        <a translation-url :href="`mailto:${item}`">{{item}}</a>
                    </li>
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
        <legend>{{t("financialResource")}}</legend>
        <label><strong> {{t("amountOfResources")}} <u>{{t("providedByCountry")}}</u> {{t( "inSupportOfBiodiversity")}}</strong></label><br/>  
        <label >{{t("nominalAmount")}}</label><br/>      
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
                <span  v-for="term in filter(options.multipliers,document.internationalResources.multiplier)">                           
                    {{lstring(term.title,locale)}} 
                </span>
            </div>
        </div>
    
        <div v-if="hasFlowData" class="table-responsive">
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
                    <tr v-for="flow in orderedFlows" >
                        <td>{{flow.year}}</td>                          
                        <td>{{currencyString(flow.odaAmount)}}</td>
                        <td>{{currencyString(flow.oofAmount)}}</td>
                        <td>{{currencyString(flow.otherAmount)}}</td>
                        <td>{{currencyString(getTotal(flow)) }}</td>
                    </tr>
                    <tr class="active">
                        <td v-if="type=='2015'"><strong>{{t("averageBaseline")}}</strong></td>
                        <td v-if="type=='2020'"><strong>{{t("average")}}</strong></td>
                        <td><strong>{{currencyString(typeAverageAmount(flowData,'odaAmount'))}}</strong></td>
                        <td><strong>{{currencyString(typeAverageAmount(flowData,'oofAmount'))}}</strong></td>
                        <td><strong>{{currencyString(typeAverageAmount(flowData,'otherAmount'))}}</strong></td>
                        <td><strong>{{currencyString(totalAverageAmount())}}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div> 

        <div v-if="isMethodologicalInformationDisplay">
            <label> {{t("methodologicalInformation")}}</label>                   
         
            <div v-if="baselineData && baselineData.odaCategories">
                <label>{{t("odaIncludes")}}</label>
                <div class="km-value">
                    <li v-for="term in baselineData.odaCategories">                             
                        <km-term :value="term" :locale="locale"></km-term>  
                    </li>
                </div>
            </div>        
        
            <div v-if="baselineData.odaOofType">
                <label> {{t("odaOofIncludes")}}</label>
                <div class="km-value">
                    <km-term :value="baselineData.odaOofType" :locale="locale"></km-term>  
                </div>
            </div> 
           
            <div v-if="baselineData.odaoofActions">
                <label> {{t("odaOofIncludes")}}</label>
                <div class="km-value">
                    <li v-for="term in baselineData.odaoofActions">                              
                        <km-term :value="term" :locale="locale"></km-term>  
                    </li>
                </div>
            </div>        
        
            <div v-if="baselineData.otherActions">
                <label>{{t("otherFlowsInclude")}}</label>
                <div class="km-value">
                    <li v-for="term in baselineData.otherActions">                              
                        <km-term :value="term" :locale="locale"></km-term>                       
                    </li>
                </div>
            </div> 
          
            <div v-if="baselineData.methodologyUsed">
                <label> {{t("methodology")}}</label>
                <div v-if="baselineData.methodologyUsed!='other'">  
                    <div class="km-value">
                        <span v-for="term in filter(options.methodology,baselineData.methodologyUsed)">
                            {{lstring(term.title,locale)}}  
                        </span>
                    </div>  
                </div>

                <div v-if="baselineData.methodologyUsedComments">
                    <ng v-vue-ng:km-value-ml  :value="baselineData.methodologyUsedComments" :locales="locale" html km-pre></ng> 
                </div>
            </div>
        
            <div v-if="baselineData.coefficient" >
                <label>{{t("coefficient")}}</label>
                <div class="km-value ">
                    {{baselineData.coefficient}}%
                </div>
            </div>        
        
            <div v-if="hasAverageConfidenceLevelsData">
                <label>{{t("averageConfidenceLevels")}}</label>
            </div>
        
            <div v-if="baselineData.odaConfidenceLevel" >
                <label>{{t("oda")}}:</label>
                <div class="km-value">                           
                    <km-term :value="baselineData.odaConfidenceLevel" :locale="locale"></km-term>
                </div>
            </div>
            
            <div v-if="baselineData.oofConfidenceLevel" >
                <label>{{t("oof")}}</label>
                <div class="km-value">
                    <km-term :value="baselineData.oofConfidenceLevel" :locale="locale"></km-term>
                </div>
            </div>

            <div v-if="baselineData.otherConfidenceLevel" >
                <label>{{t("otherFlows")}}:</label>
                <span class="km-value">
                    <km-term :value="baselineData.otherConfidenceLevel" :locale="locale"></km-term>
                </span>
            </div>

            <div v-if="baselineData.methodologicalComments">
                <label>{{t("otherMethodologicalObservations")}}</label>
                <ng v-vue-ng:km-value-ml  :value="baselineData.methodologicalComments" :locales="locale" html km-pre></ng> 
            </div>
        </div>

        <div v-if="isMonitoringProgressDisplay && document.internationalResources.progressData.progressFlows">
            <label>{{t("monitoringProgress")}}</label>
            <!-- <div v-if="document.internationalResources.progressData.progressFlows" class="table-responsive"> -->
            <div  class="table-responsive">
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
                            <td>{{currencyString(flow.odaAmount)}}</td>
                            <td>{{currencyString(flow.oofAmount)}}</td>
                            <td>{{currencyString(flow.otherAmount)}}</td>
                            <td>{{currencyString(getTotal(flow))}}</td>
                        </tr>
                    </tbody>
                </table>
            </div> 
        </div>       
         
    
        <div v-if="hasMethodologicalInformationData">
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
                <li v-for="term in filter(options.measures,document.internationalResources.hasPrivateSectorMeasures)">
                    {{lstring(term.title,locale)}}
                </li>
            </div>
            
            <div v-if="document.internationalResources.hasPrivateSectorMeasuresComments">
                <label>{{t("provideAdditionalInformation")}}</label>
                <ng v-vue-ng:km-value-ml  :value="document.internationalResources.hasPrivateSectorMeasuresComments" :locales="locale" html km-pre></ng> 
            </div>
        </div>        
      
    </section>
    <!-- section 1 end -->
    
    <!-- section 2 begin -->
    <section v-if="document.hasNationalBiodiversityInclusion">
        <legend>{{t("inclusion")}}</legend>               
        <label>{{t("includeBiodiversity")}}</label>                
                        
        <div class="km-value" >
            <span v-for="term in  filter(options.inclusions,document.hasNationalBiodiversityInclusion) ">
                {{lstring(term.title, locale)}} 
            </span>                 
        </div>
        
        <div v-if="document.hasNationalBiodiversityInclusionComments">
            <label>{{t("provideAdditionalInformation")}}</label> 
                <ng v-vue-ng:km-value-ml  :value="document.hasNationalBiodiversityInclusionComments" :locales="locale" html km-pre></ng>  
          </div>
    </section>
    <!-- section 2 end -->

    <!-- section 3 begin -->
    <section v-if="document.hasBiodiversityAssessment">
        <legend>{{t("assessmentAndEvaluation")}}</legend>
        <label>{{t("assessOrEvaluate")}}</label>
        
        <div class="km-value" >
            <span v-for="term in  filter(options.assessments,document.hasBiodiversityAssessment)">
                {{lstring(term.title ,locale)}}                       
            </span>
        </div>
        <div v-if="document.hasBiodiversityAssessmentComments">
            <label>{{t("provideAdditionalInformation")}}</label> 
            <ng v-vue-ng:km-value-ml  :value="document.hasBiodiversityAssessmentComments" :locales="locale" html km-pre></ng>
        </div>
    </section>
    <!-- section 3 end -->

</template>
<script setup>
    import { computed } from 'vue'; 
    import { lstring } from '~/services/filters/lstring.js'; 
    import { currencyString, filter }  from '~/components/kb/filters.js';
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/view-financial-report.json';
    import { useI18n } from 'vue-i18n';  
    import _ from 'lodash';

    const { t } = useI18n({ messages });

    const props = defineProps({
        document: { type:Object, required: true },
        locale  : { type:String, required: true },
        type    : { type:String, default:"2015" }
    })  
    

    const baselineData = computed(()=>{
        if (props.type=='2015'){
            return  props.document.internationalResources.baselineData;
        }
        else if (props.type =='2020'){
            return  props.document.internationalResources;
        }      
    });

    const flowData = computed(()=>{    
        if (props.type=='2015'){
            return   props.document.internationalResources.baselineData.baselineFlows;
        }
        else if (props.type =='2020'){           
            return  props.document.internationalResources.financialFlows;  
        }           
    });

    const isMethodologicalInformationDisplay = computed(()=>{  
        if (baselineData.value)     
            return  baselineData.value.odaCategories        || 
                    baselineData.value.odaOofType           ||
                    baselineData.value.odaoofActions        || 
                    baselineData.value.otherActions         ||
                    baselineData.value.methodologyUsed      || 
                    baselineData.value.coefficient          ||
                    baselineData.value.odaConfidenceLevel   || 
                    baselineData.value.oofConfidenceLevel   ||
                    baselineData.value.otherConfidenceLevel || 
                    baselineData.value.methodologicalComments;
        return false;
     
    });

    const isMonitoringProgressDisplay = computed(()=>{
        return props.document.internationalResources.progressData && 
              (props.document.internationalResources.progressData.progressFlows || 
               props.document.internationalResources.progressData.odaConfidenceLevel ||
               props.document.internationalResources.progressData.oofConfidenceLevel || 
               props.document.internationalResources.progressData.otherConfidenceLevel ||
               props.document.internationalResources.hasPrivateSectorMeasures )     
    });

    const hasBasicInformationData = computed(()=>{
        return  props.document.government             || props.document.ownerBehalf ||   
                props.document.respondentName         || props.document.respondentDesignation ||
                props.document.respondentOrganization || props.document.respondentDepartment ||  
                props.document.respondentPhones       || props.document.respondentEmails
    });

    const hasContactDetailsData = computed(()=>{
        return  props.document.respondentName         || props.document.respondentDesignation || 
                props.document.respondentOrganization || props.document.respondentDepartment ||
                props.document.respondentPhones       || props.document.respondentEmails
    });

    
    const hasAverageConfidenceLevelsData = computed(()=>{      
        return  baselineData.value.odaConfidenceLevel || 
                baselineData.value.oofConfidenceLevel || 
                baselineData.value.otherConfidenceLevel
    });

    const hasMethodologicalInformationData = computed(()=>{
        return  props.document.internationalResources.progressData && 
                (props.document.internationalResources.progressData.odaConfidenceLevel || 
                props.document.internationalResources.progressData.oofConfidenceLevel  || 
                props.document.internationalResources.progressData.otherConfidenceLevel)
    });

    const hasFlowData = computed(()=>{    
        if (props.type=='2015'){
            return   props.document.internationalResources.baselineData && props.document.internationalResources.baselineData.baselineFlows;
        }
        else if (props.type =='2020'){           
            return  props.document.internationalResources.financialFlows;  
        }           
    });

 
   
    const orderedFlows = computed(()=>{    
        if (props.type=='2015'){
            if (!(props.document.internationalResources && props.document.internationalResources.baselineData && props.document.internationalResources.baselineData.baselineFlows)) return [];    
            //remove {} from array
            var newArray = props.document.internationalResources.baselineData.baselineFlows.filter(value => Object.keys(value).length !== 0);  
            return  _.orderBy(newArray, 'year'); 
        }
        else if (props.type =='2020'){
            if (!(props.document.internationalResources && props.document.internationalResources.financialFlows)) return [];     
            //remove {} from array
            var newArray = props.document.internationalResources.financialFlows.filter(value => Object.keys(value).length !== 0); 
            return  _.orderBy(newArray, 'year');   
        }           
    });

    const orderedProgressFlows = computed(()=>{
        if (! (props.document.internationalResources && props.document.internationalResources.progressData && props.document.internationalResources.progressData.progressFlows)) return [];   
        //remove {} from array
        var newArray = props.document.internationalResources.progressData.progressFlows.filter(value => Object.keys(value).length !== 0);   
        return  _.orderBy(newArray, 'year');
    });

    const options  = {
        multipliers : 		[{identifier:'units',	      title: {en:'in units'}},   		   
                             {identifier:'thousands',     title: {en:'in thousands'}}, 		
                             {identifier:'millions',      title: {en:'in millions'}}],
        methodology : 		[{identifier:'oecd_dac',      title: {en:'OECD DAC Rio markers'}}, 
                             {identifier:'other', 	      title: {en:'Other'       }}],
        measures    : 		[{identifier:'no', 	          title: {en:'No' }}, 		  	       
                             {identifier:'some', 	  	  title: {en:'Some measures taken'}}, 
                             {identifier:'comprehensive', title: {en:'Comprehensive measures taken'}}],
        inclusions  : 		[{identifier:'notyet', 	      title: {en:'Not yet stared'}},
                             {identifier:'some', 	      title: {en:'Some inclusion achieved'}},
                             {identifier:'comprehensive', title: {en:'Comprehensive inclusion'}}],
        assessments : 		[{identifier:'notnecessary',  title: {en:'No such assessment necessary'}},
                             {identifier:'notyet', 	      title: {en:'Not yet started'}},
                             {identifier:'some', 		  title: {en:'Some assessments undertaken'}},
                             {identifier:'comprehensive', title: {en:'Comprehensive assessments undertaken'}}],
        domesticMethodology:[{identifier:'cmfeccabc',     title: {en:'Conceptual and Methodological Framework for Evaluating the Contribution of Collective Action to Biodiversity Conservation'}},
                             {identifier:'other', 	      title: {en:'Other'}}],
        yesNo : 			[{identifier:false,  		  title: {en:'No'}},
                             {identifier:true, 	          title: {en:'Yes'}}]
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
            return Math.round(sum/items.length);
        }
            
    };     

    const isEmpty = function (item) {
        return _.isEmpty(item);
    };

    const totalAverageAmount = function(){
        var odaAverage   = 0;
        var oofAverage   = 0;
        var otherAverage = 0;

        if(hasFlowData.value)
        {
          
            odaAverage   = typeAverageAmount(flowData.value,'odaAmount');
            oofAverage   = typeAverageAmount(flowData.value,'oofAmount');
            otherAverage = typeAverageAmount(flowData.value,'otherAmount');
        
        }

        return parseInt(odaAverage)+parseInt(oofAverage)+parseInt(otherAverage);
    };

    const getTotal= function(flow){ 
        return (flow.odaAmount?flow.odaAmount:0) + (flow.oofAmount?flow.oofAmount:0) + (flow.otherAmount?flow.otherAmount:0);
    }
</script>