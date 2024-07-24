<template> 
    <div id="Record" class="record ">
       <div class="record-body  bg-white" v-if="document">  
            <!--TODO: add compare-val for fields  -->

            <!-- TODO: add publish date -->            
            <!-- <ng v-vue-ng:document-date></ng> -->

            <div v-if="document.title">
                <label>{{ t("title") }} </label> 
                <ng  v-vue-ng:km-value-ml  :value="document.title" :locales="locale" html km-pre></ng>   
            </div>        

           <div v-if="document.aichiTarget">
                <label>{{ t("aichiTarget") }} </label> 
                <div class="km-value km-pre">
                    <km-term :value="document.aichiTarget" :locale="locale"></km-term>   
                </div>
            </div>
            
            <div v-if="document.availabilityStatus">
                <label>{{ t("availability") }} </label> 
                <div class="km-value km-pre">
                    <km-term :value="document.availabilityStatus" :locale="locale"></km-term>   
                </div> 
            </div> 
        
            <div v-if="document.isEasyToCommunicate !== undefined">
                <label>{{ t("isEasyToCommunicate") }} </label>            
                <ng v-vue-ng:km-value-bool  :value="document.isEasyToCommunicate" :locales="locale"></ng>
            </div>                

            <div v-if="document.isFromGlobalToNationalIndicator  !== undefined">
                <label>{{ t("isFromGlobalToNational") }} </label>                     
                <ng v-vue-ng:km-value-bool  :value="document.isFromGlobalToNationalIndicator" :locales="locale" ></ng>                     
            </div>
        
            <div v-if="document.isFromNationalToGlobalIndicator  !== undefined">
                <label>{{ t("isFromNationalToGlobal") }} </label>                        
                <ng v-vue-ng:km-value-bool  :value="document.isFromNationalToGlobalIndicator" :locales="locale" ></ng> 
            </div>
                 
             <div v-if="document.usedInGbo3OrGbo4  !== undefined">
                <label>{{ t("usedInGBbo3Gbo4") }} </label>                                         
                <ng v-vue-ng:km-value-bool  :value="document.usedInGbo3OrGbo4" :locales="locale" ></ng> 
            </div>

            <div v-if="document.source">
                <label>{{ t("Source") }} </label> 
                <div class="km-value"> 
                    <ng v-vue-ng:km-link-list v-model:ng-model="document.source" ></ng> 
                </div>
            </div>     

            <div> 
                <ng v-vue-ng:view-referenced-records v-model:ng-model="document.header.identifier" ></ng> 
            </div>  
        </div>

        <ng v-vue-ng:document-metadata-vue :document-info="documentInfo"></ng>
    </div> 
</template>

<script setup>
   import { computed } from 'vue';
   import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js';  
   import '~/components/scbd-angularjs-controls/form-control-directives/km-value-bool.js';  
   import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js';
   import '~/views/forms/view/directives/view-reference-records.directive.js';     
   import kmTerm from '~/components/km/KmTerm.vue';
   import messages from '~/app-text/views/reports/chm/strategic-plan-indicator.json';
   import { useI18n } from 'vue-i18n'; 

   const { t } = useI18n({ messages });

   const props = defineProps({
       documentInfo: { type:Object, required: true },
       locale      : { type:String, required: true }
   })
    const document = computed(()=>props.documentInfo?.body);
 </script>

