<template> 
     <div id="Record" class="record ">
        <div class="record-body  bg-white" v-if="document">

            <section>
                <div  v-if="document.government || document.title || document.description">                          
                    <legend>{{ t("generalInformation") }} </legend>               
                    <div v-if="document.government">
                        <label>{{ t("country") }} </label> 
                        <div class="km-value">
                            <km-term :value="document.government" :locale="locale"></km-term>   
                        </div>
                    </div>  

                    <div v-if="document.title">
                        <label>{{ t("title") }} </label> 
                        <ng v-vue-ng:km-value-ml  :value="document.title" :locales="locale" html></ng>  
                        <i v-if="document.acronym">                          
                            <ng v-vue-ng:km-value-ml  :value="document.acronym" :locales="locale" html></ng> 
                        </i>
                    </div>                

                    <div v-if="document.description">
                        <label>{{ t("rationale") }} </label> 
                        <ng v-vue-ng:km-value-ml  :value="document.description" :locales="locale" html></ng>  
                    </div>
                </div>
            </section>
            
            <section>
                <div v-if="document.jurisdiction || document.jurisdictionInfo"> 
                    <legend>{{ t("level") }} </legend> 
                
                    <div v-if="document.jurisdiction">
                        <label>{{ t("jurisdiction") }} </label> 
                        <div class="km-value">
                            <km-term :value="document.jurisdiction" :locale="locale" ></km-term>
                        </div>
                    </div>  

                    <div v-if="document.jurisdictionInfo">
                        <label>{{ t("details") }} </label> 
                        <ng v-vue-ng:km-value-ml  :value="document.jurisdictionInfo" :locales="locale" html></ng> 
                    </div> 
                </div>
            </section>  

            <section>
                <div  v-if="document.aichiTargets || document.otherAichiTargets || document.noOtherAichiTargetsDescription" >              
                    <legend>{{ t("relevance") }} </legend>
                
                    <div v-if="document.aichiTargets" >  
                        <label v-if="document.isAichiTarget" >{{ t("aichiTarget") }}</label>
                        <label v-if="!document.isAichiTarget" >{{ t("aichiTargetComponents") }} </label>

                        <div class="km-value">                    
                            <div  v-for="target in document.aichiTargets" >                    
                                <km-term :value="target" :locale="locale" ></km-term>                
                            </div>
                        </div>
                    </div> 
        
                    <div v-if="document.otherAichiTargets">     
                        <label>{{ t("SubAichiTargets") }} </label>      
                        <label v-if="!document.isAichiTarget">{{ t("OrTargetComponents") }} </label>  
                        <div class="km-value">
                            <div v-for="target in document.otherAichiTargets" >                    
                                <km-term :value="target" :locale="locale" ></km-term>                
                            </div>
                        </div>
                    </div>  
                    
                    
                    <div v-if="document.noOtherAichiTargetsDescription">                    
                        <label>{{ t("explanation") }} </label>    
                        <ng v-vue-ng:km-value-ml  :value="document.noOtherAichiTargetsDescription" :locales="locale" html></ng>  
                    </div>
                </div>
            </section> 
              
            <view-relevant-information :relevantInfos="document.relevantInformation" :relevantDocs="document.relevantDocuments"
                                       :documentText="document.documentText" :documentLinks="document.documentLinks"  :locale="locale">
            </view-relevant-information> 
        </div>  
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'   
    import viewRelevantInformation from '~/views/forms/view/directives/view-relevant-information.vue';
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/national-target.json'; 
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })
    const document = computed(()=>props.documentInfo?.body);
</script>