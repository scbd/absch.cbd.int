<template>
    <div id="Record" class="record panel panel-default">   
        <div class="record-body panel-body bg-white" v-if="document">             
            <!-- <document-data  :document="document"></document-data>  -->

            <div class="panel panel-info">
                <div class="panel-heading">                 
                    <legend>{{ t("generalInformation") }} </legend> 
                </div>
                <div class="panel-body">
                    <div v-if="document.summary">
                        <label>{{ t("summary") }} </label> 
                        <ng  v-vue-ng:km-value-ml  :value="document.summary" :locales="locale" html></ng> 
                    </div>
                
                    <div v-if="document.areaIntroducion">
                        <label>{{ t("introductionOfTheArea") }} </label>
                        <ng  v-vue-ng:km-value-ml  :value="document.areaIntroducion" :locales="locale" html></ng> 
                    </div>
                </div>
		    </div>

            <div class="panel panel-info">
                <div class="panel-heading">
                 <legend>{{ t("descriptionOfTheLocation") }} </legend>
                </div>                
                <div class="panel-body">            
                    <div v-if="document.region">
                        <label>{{ t("ebsaRegion") }} </label> 
                        <div class="km-value">
                            <km-term :value="document.region" :locale="locale" ></km-term>
                        </div>
                    </div>

                    <div v-if="document.location">
                        <label>{{ t("descriptionOfLocation") }} </label>   
                        <ng v-vue-ng:km-value-ml  :value="document.location" :locales="locale" html></ng>  
                    </div>

                    <div v-if="document.gisFiles">
                        <label>{{ t("geoLocation") }} </label> 
                        <div class="km-value">
                            <div v-if="document.gisMapCenter">                                              
                                <ng v-vue-ng:km-link-list v-model:ng-model="document.gisFiles"  ></ng> 
                            </div>     
                            <div v-if="mapConfig">  
                                <ng v-vue-ng:leaflet :map-config="mapConfig"  :center="document.gisMapCenter" :layers="gisLayer" :scroll-wheel-zoom="false"></ng> 
                            </div> 
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel panel-info">
                <div class="panel-heading">
                    <legend>{{ t("areaDetails") }} </legend>   
                </div>

                <div class="panel-body">
                    <div v-if="document.areaDescription"> 
                        <label>{{ t("featureDescriptionOfTheArea") }} </label> 
                        <ng v-vue-ng:km-value-ml  :value="document.areaDescription" :locales="locale" html></ng>                        
                    </div>
                    <div v-if="document.areaConditions">
                        <label>{{ t("featureConditionsAndFutureOutlookOfThArea") }} </label>  
                        <ng v-vue-ng:km-value-ml  :value="document.areaConditions" :locales="locale" html></ng>  
                    </div>
                </div>
            </div>

            <div class="panel panel-info">
                <div class="panel-heading">
                    <legend>{{ t("references") }}</legend>
                </div>
            
                <div class="panel-body">   
                    <div v-if="document.referenceText">
                        <label>{{ t("references") }} </label>   
                        <ng v-vue-ng:km-value-ml  :value="document.referenceText" :locales="locale" html ></ng>  
                    </div>

                    <div v-if="document.relation">
                        <label>{{ t("otherRelevantWebsiteAddressOrAttachedDocuments") }} </label> 
                        <div class="km-value" compare-val>                 
                            <ng v-vue-ng:km-link-list v-model:ng-model="document.relation"  ></ng>                    
                        </div>
                    </div>
                </div>
            </div> 
            
            <div class="panel panel-info">
                <div class="panel-heading">
                    <legend>{{ t("statusOfSubmission") }}</legend>
                </div>                
                
                <div class="panel-body">   
                    <div v-if="document.status">
                         <label>{{ t( "copDecision") }} </label> 
                        <div class="km-value" > 
                            <label>{{ lstring( document?.approvedByCopDecision?.identifier) }} </label>                           
                        </div>
                    </div>                    
                </div>
            </div>
            
            <div class="panel panel-info">
                <div class="panel-heading">
                    <legend>{{ t("assessmentOfTheAreaAgainstCbdEbsaCriteria") }}</legend>
                </div>     
                 <div class="panel-body">   
                    <div v-if="document.assessments">                    
                        <div class="km-value">                    
                            <div  v-for="assessment in document.assessments" >  
                                <div>                           
                                    <div v-if="assessment.identifier">  
                                        <label> {{t(assessment.identifier) }}   <span v-if="assessment.level"   :class="`${getBgColor(assessment.level)} text-white p-1`" > {{t(assessment.level)}}</span> </label>
                                        <br/>
                                    </div>                                
                                </div>                                
                                <label>{{ t("justification") }} </label>   
                                <ng v-vue-ng:km-value-ml  :value="assessment.justification" :locales="locale" html ></ng>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div> 

        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, shallowRef } from 'vue';
    import { lstring } from '~/services/filters/lstring.js'; 
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'  
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/marine-ebsa.json';
    import { useI18n } from 'vue-i18n';
    import _  from 'lodash';
    import L from 'leaflet';
    import '~/views/forms/view/chm/leaflet/angular-leaflet-directive.js'
    import { mapConfig } from '~/views/forms/view/chm/leaflet/config.js';     
    
    const { t } = useI18n({ messages });
    const gisLayer = shallowRef([]);

    const props = defineProps({
        documentInfo    : { type: Object, required: true },
        locale      : { type:String}
    })

    const getBgColor = (level)=>{
      if (level ==="high") return "bg-danger" ;
      if (level ==="medium") return "bg-warning" ;
      if (level === "low") return "bg-info";
      if (level ==="no information") return "bg-secondary" 
    };

    const document = computed(()=>props.documentInfo?.body);
 
    onMounted(() => {loadShapes(document.value.gisFiles)});
    //watch(()=>document.value.gisFiles, loadShapes)

    async function loadShapes (fileLinks) {
        console.log('gisFiles', document.value.gisFiles)

        const qLayers = fileLinks.map(async (link) => {
            const res  = await fetch(link.url);              
            const data = await res.json(); 
            //console.log('geojson', data)
            return  await L.geoJson(data);
        });

        const s = await Promise.all(qLayers); 
       
        //console.log("s", s)

        gisLayer.value = s; 

        //console.log("gisLayer.value", gisLayer.value)    
    };
   
</script>