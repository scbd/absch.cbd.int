<template> 
     <div id="Record" class="record ">
        <div class="record-body  bg-white" v-if="document"> 

            <section>
                <div  v-if="document.government">                          
                    <legend>{{ t("generalInformation") }} </legend>               
                    <div v-if="document.government">
                        <label>{{ t("country") }} </label> 
                        <div class="km-value">
                            <km-term :value="document.government" :locale="locale"></km-term>   
                        </div>
                    </div>              
                </div>

                <div v-if="document.description">
                    <label>{{ t("rationaleForTheNationalTarget") }} </label> 
                    <ng v-vue-ng:km-value-ml  :value="document.description" :locales="locale" html></ng>  
                </div>
            </section>

            
            <section>
                <div v-if="document.jurisdiction || document.jurisdictionInfo"> 
                    <legend>{{ t("levelOfApplication") }} </legend> 
                
                    <div v-if="document.jurisdiction">
                        <label>{{ t("jurisdiction") }} </label> 
                        <div class="km-value">
                            <km-term :value="document.jurisdiction" :locale="locale" ></km-term>
                        </div>
                    </div>   


                    <div v-if="document.jurisdictionInfo">
                        <label>{{ t("detailsOfLevel") }} </label> 
                        <ng v-vue-ng:km-value-ml  :value="document.jurisdictionInfo" :locales="locale" html></ng>  
                    </div> 
                </div>
            </section>

  

            <section>
                <div  v-if="document.aichiTargets || document.otherAichiTargets || document.noOtherAichiTargetsDescription" >              
                    <legend>{{ t("relevanceOfNationalTargetsToAichiTargets") }} </legend>
                
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

           
            <section>
                <div v-if="document.documentText|| document.documentLinks">
                    <legend>{{ t("relevantDocAndInfo") }}</legend>

                    <div v-if="document.documentText">
                        <label>{{ t("relevantInfo") }} </label>   
                        <ng v-vue-ng:km-value-ml  :value="document.documentText" :locales="locale" html ></ng>  
                    </div>

                    <div v-if="document.documentLinks">
                        <label>{{ t("relevantWebsites") }} </label> 
                        <div class="km-value" compare-val>                 
                            <ng v-vue-ng:km-link-list v-model:ng-model="document.documentLinks"  ></ng>                    
                        </div>
                    </div>
                </div>

                <div v-if="document.relevantInformation||document.relevantDocuments">
                    <div v-if="document.relevantInformation">
                        <label>{{ t("additionalInfo") }} </label>   
                        <ng v-vue-ng:km-value-ml  :value="document.relevantInformation" :locales="locale" html></ng>
                    </div>

                    <div v-if="document.relevantDocuments">
                        <label>{{ t("otherRelevantWebsite") }} </label> 
                        <div class="km-value" compare-val>                   
                            <ng v-vue-ng:km-link-list v-model:ng-model="document.relevantDocuments" ></ng>                  
                        </div>
                    </div> 
                </div> 

            </section> 
        </div>  
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'   
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