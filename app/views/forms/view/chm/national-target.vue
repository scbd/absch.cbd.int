<template> 
     <div id="Record" class="record ">
        <div class="record-body  bg-white" v-if="document">
            <!--TODO: add compare-val for fields  -->

            <!-- TODO: add publish date -->            
            <!-- <ng v-vue-ng:document-date></ng> -->

            <section v-if="document.government || document.title || document.description">                                      
                <legend>{{ t("generalInformation") }} </legend>               
                <div v-if="document.government">
                    <label>{{ t("country") }} </label> 
                    <div class="km-value">
                        <km-term :value="document.government" :locale="locale"></km-term>   
                    </div>
                </div>  

                <div v-if="document.title">
                    <label>{{ t("title") }} </label> 
                    <div class="km-value">
                            <span>{{lstring(document.title,locale)}}</span>
                    <i v-if="document.acronym">( {{lstring(document.acronym,locale)}} )</i>
                    </div>                             
                </div>                

                <div v-if="document.description">
                    <label>{{ t("rationale") }} </label> 
                    <ng v-vue-ng:km-value-ml  :value="document.description" :locales="locale" html></ng>  
                </div>              
            </section>
            
            <section v-if="document.jurisdiction || document.jurisdictionInfo">               
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
            </section>  

            <section v-if="document.aichiTargets || document.otherAichiTargets || document.noOtherAichiTargetsDescription" >             
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
                    <label>{{ t("subAichiTargets") }} </label>      
                    <label v-if="!document.isAichiTarget">{{ t("orTargetComponents") }} </label>  
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
            </section> 

            <section v-if="document.documentText || document.documentLinks">
                <legend>{{ t("relevantDocumentAndInformation") }}</legend>
                <view-relevant-information :relevantInformation="document.documentText" :relevantDocuments="document.documentLinks" :locale="locale">                 
                    <template v-slot:information>
                        <label>{{ t("relevantInfo") }} </label>   
                    </template>
                    <template v-slot:document>
                        <label>{{ t("relevantWebsites") }} </label> 
                    </template>
                </view-relevant-information> 
            </section>
            
            <section v-if="document.relevantInformation || document.relevantDocuments">
                <legend>{{ t("additionalInformation") }}</legend>
                <view-relevant-information :relevantInformation="document.relevantInformation" :relevantDocuments="document.relevantDocuments" :locale="locale">          
                </view-relevant-information> 
            </section> 

            <div> 
                <!-- TODO: test -->
                <ng v-vue-ng:view-referenced-records  v-model:ng-model="document.header.identifier" ></ng>  
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
    import viewRelevantInformation from '~/views/forms/view/directives/view-relevant-information.vue';
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/national-target.json'; 
    import { useI18n } from 'vue-i18n';
    import { lstring } from '~/services/filters/lstring.js'; 

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })
    const document = computed(()=>props.documentInfo?.body);
</script>
