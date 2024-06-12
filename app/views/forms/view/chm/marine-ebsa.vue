
<template>
    <div id="Record" class="record "> 
        <div class="record-body bg-white" v-if="document">  
            <!--TODO: add  for fields  -->
            <!-- TODO: add publish date -->            
            <!-- <ng v-vue-ng:document-date></ng> -->             
           <section v-if="document.summary || document.areaIntroduction || document.title">  
                <legend>{{ t("generalInformation") }} </legend> 
                <div v-if="document.title">
                    <label>{{ t("title") }} </label> 
                    <ng  v-vue-ng:km-value-ml  :value="document.title" :locales="locale" html></ng> 
                </div>
            
                <div v-if="document.summary">
                    <label>{{ t("summary") }} </label> 
                    <ng  v-vue-ng:km-value-ml  :value="document.summary" :locales="locale" html></ng> 
                </div>
            
                <div v-if="document.areaIntroducion">
                    <label>{{ t("introduction") }} </label>
                    <ng  v-vue-ng:km-value-ml  :value="document.areaIntroducion" :locales="locale" html></ng> 
                </div> 
            </section>

             <section v-if="document.region || document.location || document.gisFiles">               
                <legend>{{ t("descriptionLocation") }} </legend>                            
                <div v-if="document.region">
                    <label>{{ t("ebsaRegion") }} </label> 
                    <div class="km-value">
                        <km-term :value="document.region" :locale="locale" ></km-term>
                    </div>
                </div>
                <div v-if="document.location">
                    <label>{{ t("description") }} </label>   
                    <ng v-vue-ng:km-value-ml  :value="document.location" :locales="locale" html></ng>  
                </div>
                <div v-if="document.gisFiles">
                    
                    <div v-if="document.gisMapCenter">   
                        <label>GeoJson</label>  
                        <div class="km-value">                                                                   
                            <ng v-vue-ng:km-link-list v-model:ng-model="document.gisFiles"  ></ng> 
                        </div> 
                    </div>
                   
                    <div v-if="mapConfig"> 
                        <label>{{ t("geoLocation") }} </label>  
                        <div class="km-value">  
                        <ng v-vue-ng:leaflet :map-config="mapConfig"  :center="document.gisMapCenter" :layers="gisLayer" :scroll-wheel-zoom="false"></ng> 
                        </div> 
                    </div>
                </div> 
            </section>
            <section v-if="document.areaDescription || document.areaConditions ||
                    document.areaFeatures || document.countries || document.beyondNationalJurisdiction">  
                <legend>{{ t("areaDetails") }} </legend> 
                <div v-if="document.areaDescription"> 
                    <label>{{ t("areaDescription") }} </label> 
                    <ng v-vue-ng:km-value-ml  :value="document.areaDescription" :locales="locale" html></ng>                        
                </div>
                <div v-if="document.areaConditions">
                    <label>{{ t("featureConditions") }} </label>  
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
            </section>
            <section v-if="document.referenceText || document.resources || document.relation">              
                <legend>{{ t("references") }}</legend>                 
                <div v-if="document.referenceText">
                    <label>{{ t("references") }} </label>   
                    <ng v-vue-ng:km-value-ml  :value="document.referenceText" :locales="locale" html ></ng>  
                </div> 
                <div v-if="document.resources">
                    <label>{{ t("cbdResources") }}</label>
                    <div class="km-value" >                 
                        <ng v-vue-ng:km-link-list v-model:ng-model="document.resources"  ></ng>                    
                    </div>
                </div>
                <div v-if="document.relation">
                    <label>{{ t("otherRelevantWebsites") }} </label> 
                    <div class="km-value" >                
                        <ng v-vue-ng:km-link-list v-model:ng-model="document.relation"  ></ng> 
                    </div>
                </div>             
            </section>

             <section v-if="document.status">

                <legend>{{ t("status") }}</legend>
           
                <div class="card" v-if="document.status=='approved' || document.approvedByCopDecision || document.approvedByCopDecision" >                   
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" :class="[(document.status=='approved')? 'bg-success text-white ':'']">
                                {{t("areasEbsa")}}                           
                        </li>
                        <li class="list-group-item">
                            <div v-if="document.approvedByCopDecision" >
                                <div v-if="approvedByCopDecisionDate != undefined" >
                                    <label>{{t("copDecision")}}</label> 
                                    <div class="km-value">{{approvedByCopDecisionDate}}</div> 
                                </div>
                            </div>
                            <div class="row" >    
                                <div class="col-8" v-if="document.approvedByGovernment">                            
                                    <label>{{t("approvedByAParty")}}</label>
                                    <span class="km-value">
                                        <km-term :value="document.approvedByGovernment" :locale="locale"></km-term>
                                    </span>
                                </div>
                                <div class="col-4" v-if="approvedByGovernmentOnDate != undefined">
                                    <label>{{t("date")}}</label>
                                    <div class="km-value">{{approvedByGovernmentOnDate}}</div>
                                </div>    
                            </div>    
                        </li>                          
                    </ul>
                </div>   
                <div class="card" v-if="document.status=='recommendedToCop' || document.recommendedToCopByGovernment || document.recommendedToCopByGovernment || (recommendedToCopByGovernmentOnDate != undefined)" >
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" :class="[(document.status=='recommendedToCop')? 'bg-success text-white':'']">
                            {{t("areasCop")}}                         
                        </li>
                        <li class="list-group-item">                                
                            <div class="row">    
                                <div class="col-8" v-if="document.recommendedToCopByGovernment">
                                    <label>{{t("ongoingOfficialProcess")}}</label>
                                    <span class="km-value">
                                        <km-term :value="document.recommendedToCopByGovernment" :locale="locale"></km-term>
                                    </span>
                                </div>
                                <div class="col-4" v-if="recommendedToCopByGovernmentOnDate">
                                    <label>{{t("date")}}</label>
                                    <div class="km-value">{{recommendedToCopByGovernmentOnDate}}</div>
                                </div>    
                            </div>   
                        </li>                          
                    </ul>                    
                </div>
                <div class="card" v-if="document.status=='recommendedToSbstta' || document.recommendedToSbsttaBy || document.recommendedToSbsttaByWorkshop" >
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" :class="[(document.status=='recommendedToSbstta')? 'bg-success text-white':'']">
                            {{t("areasCriteriaSBSTTA")}}                       
                        </li>
                        <li class="list-group-item">
                            <div v-if="document.recommendedToSbsttaBy" >
                                <label>{{t("preparation")}}</label>
                                <div class="km-value"  >
                                    <span v-if="document.recommendedToSbsttaBy==='SCBD'">{{t("preparedByCbd")}}</span>
                                    <span v-if="document.recommendedToSbsttaBy==='ORG'">{{t("preparedByCompetent")}}</span>
                                </div>
                            </div>
                            <div v-if="document.recommendedToSbsttaByWorkshop" >
                                <label>{{t("cbdWorkshop")}}</label>
                                <span class="km-value">
                                    <km-term :value="document.recommendedToSbsttaByWorkshop" :locale="locale"></km-term>
                                </span>
                            </div>                                   
                        </li>                          
                    </ul>                    
                </div>
                
                <div  class="card" v-if="document.status=='recommendedToWorkshop' || document.recommendedToWorkshopBy || document.recommendedToWorkshopByGovernments || document.recommendedToWorkshopByOthers" >
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" :class="[(document.status=='recommendedToWorkshop')? 'bg-success text-white':'']">
                            {{ t("areasCriteriaCBD")}}                     
                        </li>
                        <li class="list-group-item">
                        <div v-if="document.recommendedToWorkshopBy" >                            
                            <label>{{t("recommendedToWorkshopBy")}} </label>                                  
                            <ul class="km-value">
                                <li v-if="document.recommendedToSbsttaBy==='GOV'"> {{t("governments")}}</li>
                                <li v-if="document.recommendedToSbsttaBy==='ORG'"> {{t("organizations")}}</li>
                                <li v-if="document.recommendedToSbsttaBy==='OTHER'"> {{t("others")}}</li>
                                <li v-else>{{document.recommendedToAnyBy}}</li>
                            </ul>
                        </div>
            
                        <div v-if="document.recommendedToWorkshopByGovernments" >    
                            <label>{{t("governments")}} </label>   
                            <div class="km-value">
                                <li v-for="term in document.recommendedToWorkshopByGovernments">
                                    <km-term :value="term" :locale="locale"></km-term>
                                </li>
                            </div>
                        </div>
                        <div v-if="document.recommendedToWorkshopByOrganizations" >  
                            <label>{{t("organizations")}}</label>  
                            <div class="km-value">
                                <li v-for="(organization, i) in document.recommendedToWorkshopByOrganizations" key="organization">
                                    <!-- TODO: need test  -->
                                    <ng v-vue-ng:view-record-reference v-model:ng-model="document.recommendedToWorkshopByOrganizations[i]" locale="locale"></ng>
                                </li>
                            </div>
                        </div>
                        <div v-if="document.recommendedToWorkshopByOthers" >  
                            <label>{{t("details")}}</label>
                            <ng v-vue-ng:km-value-ml  :value="document.recommendedToWorkshopByOthers" :locales="locale" html ></ng>
                        </div>                                
                        </li>                          
                    </ul>                    
                </div> 
        
                <div class="card" v-if="document.status=='recommendedToAny' || document.recommendedToAnyBy || document.recommendedToAnyByGovernments || document.recommendedToAnyByOrganizations || document.recommendedToAnyByOthers" >
                    <ul class="list-group list-group-flush">
                          <li class="list-group-item" :class="[(document.status=='recommendedToAny')? 'bg-success text-white':'']">
                              {{t("otherAreas")}}                   
                          </li>
                          <li class="list-group-item">
                            <div v-if="document.recommendedToAnyBy" >
                                <label v-if="document.recommendedToAnyBy">{{t("recommendedBy")}}</label>
                                <div class="km-value">
                                    <li v-if="document.recommendedToAnyBy==='GOV'">{{t("governments")}}</li>
                                    <li v-if="document.recommendedToAnyBy==='ORG'"> {{t("competentOrganizations")}}</li>
                                    <li v-if="document.recommendedToAnyBy==='OTHER'">{{t("others")}}</li>
                                    <li v-else>{{document.recommendedToAnyBy}}</li>
                                </div>
                            </div>
                            <div v-if="document.recommendedToAnyByGovernments" >
                                <label>{{t("governments")}} </label>
                                <div class="km-value">
                                    <li v-for="term in document.recommendedToAnyByGovernments">
                                        <km-term :value="term" :locale="locale"></km-term>
                                    </li>
                                </div>
                            </div>
                            <div v-if="document.recommendedToAnyByOrganizations" >
                                <label>{{t("organizations")}}</label>                             
                                <div class="km-value">
                                    <li v-for="(organization,i) in document.recommendedToAnyByOrganizations">
                                      <!-- TODO:：need test -->
                                       <ng v-vue-ng:view-record-reference v-model:ng-model="document.recommendedToAnyByOrganizations[i]" locale="locale"></ng>
                                    </li>                                   
                                </div>                           
                            </div>
                            <div v-if="document.recommendedToAnyByOthers" >
                                <label>{{t("details")}}</label>                               
                                <ng v-vue-ng:km-value-ml  :value="document.recommendedToAnyByOthers" :locales="locale" html ></ng>
                            </div>                
                        </li>                          
                    </ul>                                        
                </div> 
            </section>  

             <section v-if="document.assessments"> 
                <legend>{{ t("assessment") }}</legend> 
                <div  v-for="assessment in document.assessments"  >      
                    <div class="card" >
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item bg-light" v-if="assessment.identifier" >                                                                    
                                <label> {{t(assessment.identifier) }}   
                                    <span v-if="assessment.level"  :class="`${getBgColor(assessment.level)}  badge`" > 
                                        {{t(assessment.level)}}</span>                                 
                                </label>                           
                            </li>
                            <li class="list-group-item" v-if="assessment.justification">                                                                                
                                <label>{{ t("justification") }} </label>   
                                <ng v-vue-ng:km-value-ml  :value="assessment.justification" :locales="locale" html ></ng>                        
                            </li>                          
                        </ul>
                    </div>                  
                    <br/>                 
                </div>        
            </section>

            <section v-if="document.relevantInformation || document.relevantDocuments">
                <legend>{{ t("additionalInformation") }}</legend>
                <view-relevant-information :relevant-information="document.relevantInformation" :relevant-documents="document.relevantDocuments" :locale="locale"> 
                </view-relevant-information> 
            </section>          
            <div> 
                <ng v-vue-ng:view-record-reference  v-model:ng-model="document.header.identifier" ></ng>  
            </div>          
        </div>  
        <!-- TODO: add footer  -->
        <!-- <ng v-vue-ng:document-metadata  :document="document"></ng>  -->

    </div>
</template>
<script setup>
    import { computed, shallowRef, onMounted } from 'vue';  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'
    import '~/views/forms/view/directives/view-record-reference.directive.js'  
    import '~/views/forms/view/chm/leaflet/leaflet.js'
    import viewRelevantInformation from '~/views/forms/view/directives/view-relevant-information.vue';
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/marine-ebsa.json';
    import { mapConfig } from '~/views/forms/view/chm/leaflet/config.js'; 
    import { useI18n } from 'vue-i18n';
    import _  from 'lodash';
    import L from 'leaflet';
    
    const { t } = useI18n({ messages });
    const gisLayer = shallowRef([]);
    const props = defineProps({
        documentInfo: { type:Object, required:true },
        locale      : { type:String, required:true }
    })
    const getBgColor = (level)=>{
        if (level ==="high") return "bg-danger" ;
        if (level ==="medium") return "bg-warning" ;
        if (level === "low") return "bg-info";
        if (level ==="noInformation") return "bg-secondary";
    };

    const document = computed(()=>props.documentInfo?.body);
    
    const approvedByCopDecisionDate = computed(()=>{        
        if(document?.value?.approvedByCopDecision?.identifier?.indexOf('0001')===0)           
            return undefined;
        else
            return document?.value?.approvedByCopDecision?.identifier;
  
    });

    const approvedByGovernmentOnDate = computed(()=>{
        if(document?.value?.approvedByGovernmentOn?.identifier?.indexOf('0001')===0)           
            return undefined;
        else
            return document?.value?.approvedByGovernmentOn?.identifier;     
    });

    const recommendedToCopByGovernmentOnDate = computed(()=>{
        if(document?.value?.recommendedToCopByGovernmentOn?.identifier?.indexOf('0001')===0)           
            return undefined;
        else
            return document?.value?.recommendedToCopByGovernmentOn?.identifier;        
    });
   

    onMounted(() => {
        loadShapes(document.value.gisFiles);   
    });
    async function loadShapes (fileLinks) {
        const qLayers = fileLinks.map(async (link) => {
            const res  = await fetch(link.url);              
            const data = await res.json();          
            return  await L.geoJson(data);
        });
        const s = await Promise.all(qLayers);  
        gisLayer.value = s;       
    };

</script>

