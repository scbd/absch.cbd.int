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
            </section>

            <section>
                <div  v-if="document.aichiTargets || document.otherAichiTargets" >              
                    <legend>{{ t("relevanceOfNationalTargetsToAichiTargets") }} </legend>
                
                    <div v-if="document.aichiTargets" >                     
                        <label>{{ t("aichiTargetComponents") }} </label> 
                        <div class="km-value">                    
                            <div  v-for="target in document.aichiTargets" >                    
                                <km-term :value="target" :locale="locale" ></km-term>                
                            </div>
                        </div>
                    </div> 
        
                    <div v-if="document.otherAichiTargets">                
                        <label>{{ t("SubAichiTargetsOrTargetComponents") }} </label> 
                    <div class="km-value">
                            <div v-for="target in document.otherAichiTargets" >                    
                                <km-term :value="target" :locale="locale" ></km-term>                
                            </div>
                        </div>
                    </div>                 
                </div>
            </section> 


            <section>
                <div v-if="document.jurisdiction"> 
                    <legend>{{ t("levelOfApplication") }} </legend> 
                
                    <div v-if="document.jurisdiction">
                        <label>{{ t("jurisdiction") }} </label> 
                        <div class="km-value">
                            <km-term :value="document.jurisdiction" :locale="locale" ></km-term>
                        </div>
                    </div>               
                </div>
            </section>

            <section>
                <div  v-if="document.description || document.relevantInformation||document.relevantDocuments">                
                    <legend>{{ t("relevantDocumentsAndInformation") }} </legend>   
                                
                    <div v-if="document.description">
                        <label>{{ t("rationaleForTheNationalTarget") }} </label> 
                        <ng v-vue-ng:km-value-ml  :value="document.description" :locales="locale" html></ng>  
                    </div>

                    <div v-if="document.relevantInformation">               
                        <ng v-vue-ng:km-value-ml  :value="document.relevantInformation" :locales="locale" html></ng>  
                    </div>

                    <div v-if="document.relevantDocuments">
                        <label>{{ t("otherRelevantWebsiteAddressOrAttachedDocuments") }} </label> 
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