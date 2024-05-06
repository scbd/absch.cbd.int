<template>
    <div id="Record" class="record">
        <div class="record-body bg-white" v-if="document">  
            <section>
                <legend>{{ t("generalInformation") }} </legend> 
            
                <div v-if="document.government">
                    <label>{{ t("country") }} </label> 
                    <div class="km-value">
                        <km-term :value="document.government" :locale="locale"></km-term>   
                    </div>
                </div>

                <div v-if="document.description">
                    <label>{{ t("description") }} </label>
                    <ng v-vue-ng:km-value-ml  :value="document.description" :locales="locale" html></ng>                
                </div> 
            </section> 

            <section>
                <div v-if="document.status">
                    <legend>{{ t("status") }} </legend>
                    <ng v-vue-ng:km-value-ml  :value="document.status" :locales="locale" html></ng>                
                </div> 
            </section>


            <section>
                <div v-if="document.jurisdiction||document.jurisdictionInfo">">
                    <legend>{{ t("levelOfImplementation") }} </legend>> 
                   
                    <div v-if="document.jurisdiction">                        
                        <ng v-vue-ng:km-value-ml  :value="document.jurisdiction" :locales="locale" ></ng>  
                    </div>


                    <div v-if="document.jurisdictionInfo">     
                        <label>{{ t("detailsOfImplementation") }} </label> 
                        <ng v-vue-ng:km-value-ml  :value="document.jurisdictionInfo" :locales="locale" ></ng> 
                    </div>
                </div>
            </section>

            <section>
                <div v-if="document.aichiTargets || document.nationalTargets || document.nationalIndicators">
                    <legend>{{ t("targetsAndIndicators") }} </legend>> 
                   
                    <div v-if="document.nationalIndicators">  
                        <label>{{ t( "nationalIndicators" ) }} </label>  
                        <div class="km-value">                    
                            <div  v-for="indicator in document.nationalIndicators" > 
                                <i v-if="indicator.document.title">  {{lstring(indicator.document.title,locale)}}</i>
                            </div>
                        </div> 
                    
                    </div>


                    <div v-if="document.nationalTargets"> 
                        <label>{{ t( "nationalTargets" ) }}</label> 
                        <div class="km-value">                    
                            <div  v-for="indicator in document.nationalIndicators" >
                                <i v-if="indicator.document.title">  {{lstring(indicator.document.title,locale)}}</i>
                            </div>
                        </div>                     
                    </div>


                    <div v-if="document.aichiTargets">     
                        <label>{{ t("aichiTargets") }} </label>                       
                        <div class="km-value">                    
                            <div  v-for="target in document.aichiTargets" >                               
                                <i v-if="target.document.title">{{lstring(target.document.title,locale)}}</i>                                
                            </div>
                        </div>                     
                    </div>
                    
                </div>
            </section>



            <section>
                <div v-if="document.partners">
                    <legend>{{ t("partners") }} </legend>                    
                    <!-- <div view-organization-reference ng-model="partner.document" locale="locale"></div>                     -->
                </div>
            </section>              
                   
            <section>
                <div v-if="document.documentText|| document.documentLinks">
                    <legend>{{ t( "relevantDocAndInfo") }}</legend>

                    <div v-if="document.documentText">
                        <label>{{ t("relevantInfo") }} </label>   
                        <ng v-vue-ng:km-value-ml  :value="document.documentText" :locales="locale" html ></ng>  
                    </div>

                    <div v-if="document.documentLinks">
                        <label>{{ t("relevantWebLinkFiles") }} </label> 
                        <div class="km-value" compare-val>                 
                            <ng v-vue-ng:km-link-list v-model:ng-model="document.documentLinks"  ></ng>                    
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div v-if="document.relevantInformation||document.relevantDocuments">
                    <legend>{{ t( "additionalInfo") }}</legend>

                    <div v-if="document.relevantInformation">                      
                        <ng v-vue-ng:km-value-ml  :value="document.relevantInformation" :locales="locale" html></ng>
                    </div>

                    <div v-if="document.relevantDocuments">
                        <label>{{ t("otherWebsites") }} </label> 
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
    import messages from '~/app-text/views/reports/chm/implementation-activity.json';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })
    
    const document = computed(()=>props.documentInfo?.body);
    
</script>