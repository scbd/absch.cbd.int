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

                <div v-if="document.title">
                    <label>{{ t("title") }} </label>    
                    <div class="km-value">
                       {{ lstring(document.title, locale) }}
                       <i v-if="document.acronym">{{ lstring(document.acronym , locale) }}</i>
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
                    <km-term :value="document.status" :locale="locale"></km-term>                
                </div> 
            </section>

            <section>
                <div v-if="document.jurisdiction||document.jurisdictionInfo">
                    <legend>{{ t("levelOfImplementation") }} </legend>
                   
                    <div v-if="document.jurisdiction">                        
                        <div class="km-value">
                            <km-term :value="document.jurisdiction" :locale="locale" ></km-term>
                        </div>
                    </div>

                    <div v-if="document.jurisdictionInfo">     
                        <label>{{ t("detailsOfImplementation") }} </label> 
                        <ng v-vue-ng:km-value-ml  :value="document.jurisdictionInfo" :locales="locale" html></ng> 
                    </div>
                </div>
            </section>

            <section>
                <div v-if="document.aichiTargets || document.nationalTargets || document.nationalIndicators">
                    <legend>{{ t("targetsAndIndicators") }} </legend>> 
                   
                    <div v-if="document.nationalIndicators">  
                        <label>{{ t( "nationalIndicators" ) }} </label>  
                        <div class="km-value">                    
                            <li  v-for="indicator in document.nationalIndicators" >                                 
                                <div v-if="indicator.document.title"> 
                                    {{lstring(indicator.document.title,locale)}}
                                </div> 
                            </li>
                        </div>                     
                    </div>


                    <div v-if="document.nationalTargets"> 
                        <label>{{ t( "nationalTargets" ) }}</label> 
                        <div class="km-value">  
                            <li  v-for="indicator in document.nationalTargets" >                                 
                                <div v-if="indicator.document.title"> 
                                    {{lstring(indicator.document.title,locale)}}
                                </div> 
                            </li>
                        </div>                     
                    </div>


                    <div v-if="document.aichiTargets">     
                        <label>{{ t("aichiTargets") }} </label>                       
                        <div class="km-value">  
                            <li  v-for="indicator in document.aichiTargets" >                                 
                                <div v-if="target.document.title"> 
                                    {{lstring(target.document.title,locale)}}
                                </div> 
                            </li>
                        </div>                        
                    </div>                    
                </div>
            </section>

            <section>
                <div v-if="document.partners">
                    <legend>{{ t("partners") }} </legend>  
                    <div  v-for="partner in document.partners" > 
                        <ng v-vue-ng:view-record-reference  :value="partner.document" :locales="locale"></ng>  
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
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/implementation-activity.json';
    import viewRelevantInformation from '~/views/forms/view/directives/view-relevant-information.vue';
    import { lstring } from '~/components/kb/filters';
    import { useI18n } from 'vue-i18n';


    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })
    
    const document = computed(()=>props.documentInfo?.body);
    
</script>