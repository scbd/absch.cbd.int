<template>  
    <div id="Record" class="record ">
        <div class="record-body bg-white" v-if="document"> 
            <!--TODO: add compare-val for fields  -->

            <!-- TODO: add publish date -->            
            <!-- <ng v-vue-ng:document-date></ng> -->

            <section>  
                <div class="row">
                    <div class="col-md-1">
                        <img v-if="document.progress.identifier!='69C77387-2D3C-474C-BEA8-30F55D47AFBD'" :src="`app/img/chm/ratings/${document.progress.identifier}.png`" class="float-left">
                    </div>
                
                    <div class="col-md-11">
                        <legend v-if="document.progress">{{document.date.substr(0,4)}} -    <km-term :value="document.progress" :locale="locale" ></km-term></legend>                
                    </div>
                </div>
            </section>   

            <section v-if="document.government || document.description">            
                <legend>{{ t("generalInformation") }} </legend> 
                
                <div v-if="document.government">
                    <label>{{ t("country") }} </label> 
                    <div class="km-value km-pre">
                        <km-term :value="document.government" :locale="locale"></km-term>   
                    </div>
                </div>

                <div v-if="document.description" >                   
                    <label>{{ t("description") }} </label> 
                    <ng v-vue-ng:km-value-ml  :value="document.description" :locales="locale" html km-pre></ng>                
                </div>
            </section>

            <section v-if="document.aichiTarget || document.nationalTarget" >                
                <div v-if="document.nationalTarget">
                    <label>{{ t("targets") }} </label>
                    <div class="km-value" compare-val>
                        <ng v-vue-ng:view-record-reference  v-model:ng-model="document.nationalTarget" :locales="locale" html></ng>                         
                    </div>        
                </div> 

                <div v-if="document.aichiTarget">
                    <km-term :value="document.aichiTarget" :locale="locale"></km-term>   
                </div>                           
            </section>

           <section v-if="document.assessmentText || document.progress || document.date">                
                <legend>{{ t("category") }} </legend>
            
                <div v-if="document.progress">
                    <label>{{ t("rate") }} </label> 
                    <div class="km-value km-pre">
                        <km-term :value="document.progress" :locale="locale" ></km-term>
                    </div>
                </div>
    
                <div v-if="document.date">
                    <label>{{ t("date") }} </label>   
                    <ng v-vue-ng:km-value-ml  :value="formatDate(document.date, 'DD MMM YYYY')" :locales="locale"></ng>  
                </div>
                
                <div v-if="document.assessmentText">
                    <label>{{ t("summary") }} </label>                        
                    <ng v-vue-ng:km-value-ml  :value="document.assessmentText" :locales="locale" html km-pre></ng> 
                </div> 
            </section>

            <section v-if="hasIndicatorsAndActivitiesData">  
                <legend>{{ t("indicatorsAndActivities") }} </legend>    
    
                <div v-if="document.nationalIndicatorsUsed===false">                        
                    <div class="km-value km-pre" >
                        {{ t("noIndicators") }} 
                    </div>
                </div>

                <div v-if="document.nationalIndicatorsUsed && document.nationalIndicators"> 
                    <label>{{ t("indicators") }} </label>                        
                    <ng v-vue-ng:km-value-ml  :value="document.nationalIndicators" :locales="locale" html km-pre></ng>                                        
                </div>

                <div v-if="document.documentText">
					<label>{{ t("anyOtherTools") }} </label>
					<ng v-vue-ng:km-value-ml :value="document.documentText" locales="locale" km-pre html></ng>
				</div>              

                <div v-if="document.documentLinks">
                    <view-relevant-information  :relevant-documents="document.documentLinks" :locale="locale">                 
                        <template v-slot:information>
                            <label> </label>   
                        </template>
                        <template v-slot:document>
                            <label>{{ t("relevantWebsites") }} </label> 
                        </template>
                    </view-relevant-information>    
                </div>

                <div v-if="document.strategicPlanIndicators">
                    <label>{{ t("linkToIndicator") }}</label>
                    <div class="km-value km-pre">
                        <div v-for="item in document.strategicPlanIndicators" >
                            {{lstring(item.title ,locale) }}
                        </div>
                    </div>
                </div>

                <div v-if="document.implementationActivities">
                    <label>{{ t("linkToActivity") }}</label>
                    <div class="km-value km-pre">
                        <div v-for="item in document.implementationActivities" >
                            {{lstring(item.title ,locale) }}
                        </div>
                    </div>
                </div>                
            </section>

            <section v-if="hasLevelOfConfidenceData" >
                <legend>{{t("levelOfConfidence") }}</legend>

                <div v-if="document.confidence">
                    <label>{{ t("levelOfConfidence") }} </label>   
                    <div class="km-value km-pre">
                        <km-term :value="document.confidence" :locale="locale"></km-term>
                    </div> 
                </div>

                <div v-if="document.confidenceInfo">
                    <label>{{ t("levelOfAboveAssessment") }} </label>   
                    <ng v-vue-ng:km-value-ml  :value="document.confidenceInfo" :locales="locale" html km-pre></ng>  
                </div>

                <div v-if="document.adequacy">
                    <label>{{ t("adequacy") }} </label>                         
                    <div class="km-value km-pre">
                        <km-term :value="document.adequacy" :locale="locale"></km-term>
                    </div> 
                </div>

                <div v-if="document.adequacyDescription">
                    <label>{{ t("monitoringSystem") }} </label>   
                    <ng v-vue-ng:km-value-ml  :value="document.adequacyDescription" :locales="locale" html km-pre></ng>
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
    import { computed } from 'vue'; 
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'
    import '~/views/forms/view/directives/view-record-reference.directive.js'
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/national-assessment.json';
    import viewRelevantInformation from '~/views/forms/view/directives/view-relevant-information.vue';
    import { lstring    } from '~/services/filters/lstring.js'; 
    import { formatDate } from '~/components/kb/filters';
    import { useI18n    } from 'vue-i18n';

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type:Object, required:true },
        locale      : { type:String, required:true}
    })
    const document = computed(()=>props.documentInfo?.body);  
    
    
    const hasIndicatorsAndActivitiesData = computed(()=>{
        return  (document.value.nationalIndicatorsUsed===false) || 
                (document.value.nationalIndicatorsUsed && document.value.nationalIndicators) || 
                document.value.strategicPlanIndicators || document.value.implementationActivities ||
                document.value.documentText || document.value.documentLinks;
             
    });

    const hasLevelOfConfidenceData = computed(()=>{       
       return document.value.confidence || document.value.confidenceInfo || document.value.adequacy||document.value.adequacyDescription;                     
    });


</script>