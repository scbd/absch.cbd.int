<template>
    <div id="Record" class="record ">
        <div class="record-body bg-white" v-if="document">   
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

            <section>            
                <legend>{{ t("generalInformation") }} </legend> 
                
                <div v-if="document.government">
                    <label>{{ t("country") }} </label> 
                    <div class="km-value">
                        <km-term :value="document.government" :locale="locale"></km-term>   
                    </div>
                </div>

                <div v-if="document.description" >                   
                    <label>{{ t("description") }} </label> 
                    <ng v-vue-ng:km-value-ml  :value="document.description" :locales="locale" html></ng>                
                </div>
            </section>

            <section>
                <div v-if="document.aichiTarget || document.nationalTarget" > 

                    <div v-if="document.nationalTarget">
                        <label>{{ t("targets") }} </label>
                        <div class="km-value" compare-val>
                            <ng v-vue-ng:view-record-reference  v-model:ng-model="document.nationalTarget" :locales="locale" html></ng>                         
                        </div>        
                    </div> 

                    <div v-if="document.aichiTarget">
                        <km-term :value="document.aichiTarget" :locale="locale"></km-term>   
                    </div>
                </div>              
            </section>

           <section>
                <div v-if="document.assessmentText || document.progress || document.date">
                    <legend>{{ t("category") }} </legend>
                
                    <div v-if="document.progress">
                        <label>{{ t("rate") }} </label> 
                        <div class="km-value">
                            <km-term :value="document.progress" :locale="locale" ></km-term>
                        </div>
                    </div>
        
                    <div v-if="document.date">
                        <label>{{ t("date") }} </label>   
                        <ng v-vue-ng:km-value-ml  :value="formatDate(document.date, 'DD MMM YYYY')" :locales="locale" html></ng>  
                    </div>
                    
                    <div v-if="document.assessmentText">
                        <label>{{ t("summary") }} </label>                        
                        <ng v-vue-ng:km-value-ml  :value="document.assessmentText" :locales="locale" html></ng> 
                    </div>                
                </div>
            </section>

            <section>
                <div v-if="document.nationalIndicatorsUsed || document.nationalIndicators || document.strategicPlanIndicators || document.implementationActivities">
                    <legend>{{ t("indicatorsAndActivities") }} </legend>    
    
                    <div v-if="document.nationalIndicatorsUsed===false">                        
                        <div class="km-value" >
                            {{ t("noIndicators") }} 
                        </div>
                    </div>

                    <div v-if="document.nationalIndicatorsUsed && document.nationalIndicators"> 
                        <label>{{ t("indicators") }} </label>                        
                        <ng v-vue-ng:km-value-ml  :value="document.nationalIndicators" :locales="locale" html></ng>                                        
                    </div>
    
                    <div v-if="document.strategicPlanIndicators">
                        <label>{{ t("linkToIndicator") }}</label>
                        <div class="km-value">
                            <div v-for="item in strategicPlanIndicators" >
                                {{lstring(item.title ,locale) }}
                            </div>
                        </div>
                    </div>
    
                    <div v-if="document.implementationActivities">
                        <label>{{ t("linkToActivity") }}</label>
                        <div class="km-value">
                            <div v-for="item in document.implementationActivities" >
                                {{lstring(item.title ,locale) }}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div v-if="document.confidence || document.confidenceInfo || document.adequacy||document.adequacyDescription" >
                    <legend>{{t("levelOfConfidence") }}</legend>
    
                    <div v-if="document.confidence">
                        <label>{{ t("levelOfConfidence") }} </label>   
                        <div class="km-value">
                            <km-term :value="document.confidence" :locale="locale"></km-term>
                        </div> 
                    </div>
    
                    <div v-if="document.confidenceInfo">
                        <label>{{ t("levelOfAboveAssessment") }} </label>   
                        <ng v-vue-ng:km-value-ml  :value="document.confidenceInfo" :locales="locale" html ></ng>  
                    </div>

                    <div v-if="document.adequacy">
                        <label>{{ t("adequacy") }} </label>                         
                        <div class="km-value">
                            <km-term :value="document.adequacy" :locale="locale"></km-term>
                        </div> 
                    </div>

                    <div v-if="document.adequacyDescription">
                        <label>{{ t("monitoringSystem") }} </label>   
                        <ng v-vue-ng:km-value-ml  :value="document.adequacyDescription" :locales="locale" html></ng>
                    </div> 

                </div>
            </section> 

            <view-relevant-information :relevantDocs="document.otherRelevantDocuments"  :documentText="document.documentText" 
                                       :documentLinks="document.documentLinks"          :locale="locale">
            </view-relevant-information> 
                                   
        </div>   
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
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })
    const document = computed(()=>props.documentInfo?.body);  
    
</script>