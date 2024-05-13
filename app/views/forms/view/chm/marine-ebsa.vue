<template>
    <div id="Record" class="record ">   
       
        <div class="record-body bg-white" v-if="document">           
            <section>    
                <div v-if="document.summary || document.areaIntroduction || document.title">  
                    <legend>{{ t("generalInformation") }} </legend> 
                    <div v-if="document.title">
                        <label>{{ t("title") }} </label> 
                        <ng  v-vue-ng:km-value-ml  :value="document.title" :locales="locale" html></ng> 
                    </div>
                
                    <div v-if="document.summary">
                        <label>{{ t("summary") }} </label> 
                        <ng  v-vue-ng:km-value-ml  :value="document.summary" :locales="locale" html></ng> 
                    </div>
                
                    <div v-if="document.areaIntroduction">
                        <label>{{ t("introductionOfTheArea") }} </label>
                        <ng  v-vue-ng:km-value-ml  :value="document.areaIntroduction" :locales="locale" html></ng> 
                    </div> 
                </div>               
		    </section>

            <section>
                <div v-if="document.region || document.location || document.gisFiles">
                    <legend>{{ t("descriptionOfTheLocation") }} </legend>                            
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
            </section>

            <section>
                <div v-if="document.areaDescription || document.areaConditions ||
                           document.areaFeatures || document.countries || document.beyondNationalJurisdiction">

                    <legend>{{ t("areaDetails") }} </legend> 
                    <div v-if="document.areaDescription"> 
                        <label>{{ t("featureDescriptionOfTheArea") }} </label> 
                        <ng v-vue-ng:km-value-ml  :value="document.areaDescription" :locales="locale" html></ng>                        
                    </div>

                    <div v-if="document.areaConditions">
                        <label>{{ t("featureConditionsAndFutureOutlookOfThArea") }} </label>  
                        <ng v-vue-ng:km-value-ml  :value="document.areaConditions" :locales="locale" html></ng>  
                    </div>   

                    <div v-if="document.areaFeatures">
                        <label>{{ t("featureDescriptionOfTheArea") }} </label>           
                        <ng v-vue-ng:km-value-ml  :value="document.areaFeatures" :locales="locale" html></ng>
                    </div>

                    <div v-if="document.countries">
                        <label>{{ t("relatedCountries") }}</label>
                        <ul class="km-value">
                            <li v-for="term in document.countries">
                                <km-term :value="term" :locale="locale"></km-term>
                            </li>
                        </ul>            
                    </div>
                    <div v-if="document.beyondNationalJurisdiction">
                        <label>{{ t("isMarinesBeyond") }}</label>
                        <div class="km-value">
                            {{document.beyondNationalJurisdiction}}
                        </div>
                    </div>
                </div>           
            </section>

            <section>
                <div v-if="document.referenceText || document.resources || document.relation">
                    <legend>{{ t("references") }}</legend>                 
                    <div v-if="document.referenceText">
                        <label>{{ t("references") }} </label>   
                        <ng v-vue-ng:km-value-ml  :value="document.referenceText" :locales="locale" html ></ng>  
                    </div> 

                    <div v-if="document.resources">
                        <label>{{ t("cbdResources") }}</label>
                        <div class="km-value" compare-val>                 
                            <ng v-vue-ng:km-link-list v-model:ng-model="document.resources"  ></ng>                    
                        </div>
                    </div>

                    <div v-if="document.relation">
                        <label>{{ t("otherRelevantWebsiteAddressOrAttachedDocuments") }} </label> 
                        <div class="km-value" compare-val>                 
                            <!-- <ng v-vue-ng:km-link-list v-model:ng-model="document.relation"  ></ng>     -->
                            <ul class="km-value" >
                                <li v-for="item in document.relation">
                                    <a translation-url :target="target" :href="item.url">{{item.name||item.url}}</a>
                                    <i v-if="item.name">({{item.url}})</i>
                                </li>
                            </ul>                
                        </div>
                    </div>
                </div>
            </section>
            
            <section>
                <legend>{{ t("statusOfSubmission") }}</legend>

                <!-- <div v-if="document.status">
                  
                    <label>{{ t( "copDecision") }} </label> 
                    <div class="km-value" > 
                        <label>{{ lstring( document?.approvedByCopDecision?.identifier) }} </label>                           
                    </div>
                </div> -->
                <div v-if="document.status=='approved' || document.approvedByCopDecision || document.approvedByCopDecision || fixDate(document.approvedByGovernmentOn)">

                    <div :class=" [(document.status=='approved')? 'panel-success':'']">
                      <legend>{{t("areasEbsa")}}</legend>
                        <div v-if="document.approvedByCopDecision">
                            <label>{{t("copDecision")}}</label>
                            <ul class="km-value">
                                <li>{{approvedByCopDecision.title}}</li>
                            </ul>
                        </div>
    
                        <div class="row">    
                            <div class="col-8" v-if="document.approvedByGovernment">
                                <label>{{t("approvedByAParty")}}</label>
                                <span class="km-value">
                                    <km-term :value="document.approvedByGovernment" :locale="locale"></km-term>
                                </span>
                            </div>
    
                            <div class="col-4" v-if="fixDate(document.approvedByGovernmentOn)">
                                <label>{{t("date")}}</label>
                                <div class="km-value">{{fixDate(document.approvedByGovernmentOn)}}</div>
                            </div>    
                        </div>
                    </div>
                </div>  

                <div v-if="document.status=='recommendedToCop' || document.recommendedToCopByGovernment || document.recommendedToCopByGovernment || fixDate(document.recommendedToCopByGovernmentOn)">
    
                    <div :class="[ (document.status=='recommendedToCop')?'panel-success':'' ]">
                      <legend>{{t("areasCop")}}</legend>
                         <div class="row">    
                            <div class="col-8" v-if="document.recommendedToCopByGovernment">
                                <label>{{t("ongoingOfficialProcess")}}</label>
                                <span class="km-value">
                                    <km-term :value="document.recommendedToCopByGovernment" :locale="locale"></km-term>
                                </span>
                            </div>
    
                            <div class="col-4" ng-show="fixDate(document.recommendedToCopByGovernmentOn)">
                                <label>{{t("date")}}</label>
                                <div class="km-value">{{fixDate(document.recommendedToCopByGovernmentOn)}}</div>
                            </div>    
                        </div>    
                    </div>
                </div>

                <div v-if="document.status=='recommendedToSbstta' || document.recommendedToSbsttaBy || document.recommendedToSbsttaByWorkshop">
    
                    <div :class="[(document.status=='recommendedToSbstta')? 'panel-success': '']">
                      <legend>{{t("areasCriteriaSBSTTA")}}</legend>                    
                            <div v-if="document.recommendedToSbsttaBy">
                                <label>{{t("preparation")}}</label>
                                <div class="km-value"  >
                                    <span v-if="document.recommendedToSbsttaBy==='SCBD'">{{t("preparedByCbd")}}</span>
                                    <span v-if="document.recommendedToSbsttaBy==='ORG'">{{t("preparedByCompetent")}}</span>
                                </div>
                            </div>
        
                            <div v-if="document.recommendedToSbsttaByWorkshop">
                                <label>{{t("cbdWorkshop")}}</label>
                                <span class="km-value">
                                    <km-term :value="document.recommendedToSbsttaByWorkshop" :locale="locale"></km-term>
                                </span>
                            </div>    
                   
                    </div>
                </div>
                
                <div v-if="document.status=='recommendedToWorkshop' || document.recommendedToWorkshopBy || document.recommendedToWorkshopByGovernments || document.recommendedToWorkshopByOthers">
    
                    <div :class=" [(document.status=='recommendedToWorkshop')?'panel-success' : '' ]">
                      <legend>{{ t("areasCriteriaCBD")}}</legend>  
                            <div v-if="document.recommendedToWorkshopBy">                            
                                <label>{{t("recommendedToWorkshopBy")}} </label>                                  
                                <ul class="km-value">
                                    <li v-if="document.recommendedToSbsttaBy==='GOV'"> {{t("governments")}}</li>
                                    <li v-if="document.recommendedToSbsttaBy==='ORG'"> {{t("organizations")}}</li>
                                    <li v-if="document.recommendedToSbsttaBy==='OTHER'"> {{t("others")}}</li>
                                    <li v-else>{{document.recommendedToAnyBy}}</li>
                                </ul>
                            </div>
        
                            <div v-if="document.recommendedToWorkshopByGovernments">
                                <label>{{t("governments")}} </label>   
                                <ul class="km-value">
                                    <li v-for="term in document.recommendedToWorkshopByGovernments">
                                        <km-term :value="term" :locale="locale"></km-term>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="document.recommendedToWorkshopByOrganizations">
                                <label>{{t("organizations")}}</label>  
                                <ul class="km-value">
                                    <li v-for="organization in recommendedToWorkshopByOrganizations">
                                        <!-- TODO: change code here -->
                                         <!-- <div view-organization-reference ng-model="organization" locale="locale"></div>  -->
                                    </li>
                                </ul>
                            </div>
                            <div v-if="document.recommendedToWorkshopByOthers">
                                <label>{{t("details")}}</label>
                                <ng v-vue-ng:km-value-ml  :value="document.recommendedToWorkshopByOthers" :locales="locale" html ></ng>
                            </div>    
                        </div>
                   
                </div>
        
                <div v-if="document.status=='recommendedToAny' || document.recommendedToAnyBy || document.recommendedToAnyByGovernments || document.recommendedToAnyByOrganizations || document.recommendedToAnyByOthers">
        
                    <div :class="[document.status=='recommendedToAny'? 'panel-success':'']">
                    <legend>{{t("otherAreas")}}</legend>
                            <div v-if="document.recommendedToAnyBy">
                                <label v-if="document.recommendedToAnyBy">{{t("recommendedBy")}}</label>
                                <ul class="km-value">
                                    <li v-if="document.recommendedToAnyBy==='GOV'">{{t("governments")}}</li>
                                    <li v-if="document.recommendedToAnyBy==='ORG'"> {{t("competentOrganizations")}}</li>
                                    <li v-if="document.recommendedToAnyBy==='OTHER'">{{t("others")}}</li>
                                    <li v-else>{{document.recommendedToAnyBy}}</li>
                                </ul>
                            </div>
        
                            <div v-if="document.recommendedToAnyByGovernments">
                                <label>{{t("governments")}} </label>
                                <ul class="km-value">
                                    <li v-for="term in document.recommendedToAnyByGovernments">
                                        <km-term :value="term" :locale="locale"></km-term>
                                    </li>
                                </ul>
                            </div>
        
                            <div v-if="document.recommendedToAnyByOrganizations">
                                <label>{{t("organizations")}}</label>                             
                                <ul class="km-value">
                                    <li v-for="organization in recommendedToAnyByOrganizations">
                                        <!-- TODO:change code here -->
                                        <!-- <div view-organization-reference ng-model="organization" locale="locale"></div> -->
                                    </li>
                                </ul>
                            </div>
        
                            <div v-if="document.recommendedToAnyByOthers">
                                <label>{{t("details")}}</label>
                                <div class="km-value">
                                    <ng v-vue-ng:km-value-ml  :value="document.recommendedToAnyByOthers" :locales="locale" html ></ng>
                                </div>
                            </div>
        
                        </div>
                
                </div>

            </section>	
            
            <section>
                <div v-if="document.assessments">    
                    <legend>{{ t("assessmentOfTheAreaAgainstCbdEbsaCriteria") }}</legend>                
                    <div class="km-value">                    
                        <div  v-for="assessment in document.assessments" >  
                            <div>                           
                                <div v-if="assessment.identifier">  
                                    <label> {{t(assessment.identifier) }}   
                                        <span v-if="assessment.level"  :class="`${getBgColor(assessment.level)} text-white p-1`" > 
                                        {{t(assessment.level)}}</span> 
                                    </label>
                                    <br/>
                                </div>                                
                            </div>
                            
                            <div v-if="assessment.justification">
                                <label>{{ t("justification") }} </label>   
                                <ng v-vue-ng:km-value-ml  :value="assessment.justification" :locales="locale" html ></ng>
                             </div>
                        </div>
                    </div>
                </div>
            </section>


            <!-- TODO: use view-relevant-information -->
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
 
    onMounted(() => {
        loadShapes(document.value.gisFiles);   
    });
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

    function fixDate (date) {
        if(date && date.indexOf('0001')===0)
            date = undefined;
        return date;
    };

   
</script>