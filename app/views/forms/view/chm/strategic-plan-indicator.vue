<template> 
    <div id="Record" class="record panel panel-default">
       <div class="record-body panel-body bg-white" v-if="document"> 
           <div class="panel panel-info" >
               <div class="panel-heading"> 
               </div>
               <div class="panel-body">
                    <div v-if="document.aichiTarget">
                       <label>{{ t("aichiBiodiversityTarget") }} </label> 
                       <div class="km-value">
                           <km-term :value="document.aichiTarget" :locale="locale"></km-term>   
                       </div>
                   </div>
                 
                   <div v-if="document.availabilityStatus">
                        <label>{{ t("availabilityOfIndicator") }} </label> 
                        <div class="km-value">
                            <km-term :value="document.availabilityStatus" :locale="locale"></km-term>   
                        </div> 
                    </div> 
                
                    <div v-if="document.isEasyToCommunicate">
                        <label>{{ t("isEasyToCommunicate") }} </label>            
                        <ng v-vue-ng:km-value-bool  :value="document.isEasyToCommunicate" :locales="locale" html></ng>
                    </div>                

                    <div v-if="document.isFromGlobalToNationalIndicator">
                        <label>{{ t("isFromGlobalToNationalIndicator") }} </label>                     
                        <ng v-vue-ng:km-value-bool  :value="document.isFromGlobalToNationalIndicator" :locales="locale" html></ng>                     
                    </div>
                
                    <div v-if="document.isFromNationalToGlobalIndicator">
                        <label>{{ t("isFromNationalToGlobalIndicator") }} </label>                        
                        <ng v-vue-ng:km-value-bool  :value="document.isFromNationalToGlobalIndicator" :locales="locale" html></ng> 
                    </div>
                
                    <div v-if="document.usedInGbo3OrGbo4">
                        <label>{{ t("usedInGBbo3Gbo4") }} </label>                                         
                        <ng v-vue-ng:km-value-bool  :value="document.usedInGbo3OrGbo4" :locales="locale" html></ng> 
                    </div>

                    <div v-if="document.source">
                        <label>{{ t("Source") }} </label> 
                        <div class="km-value"> 
                            <ng v-vue-ng:km-link-list v-model:ng-model="document.source" ></ng> 
                        </div>
                    </div>
               </div>
           </div>                         
       </div>  
   </div>
</template>

<script setup>
   import { computed } from 'vue';
   import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
   import '~/components/scbd-angularjs-controls/form-control-directives/km-value-bool.js'  
   import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'   
   import kmTerm from '~/components/km/KmTerm.vue';
   import messages from '~/app-text/views/reports/chm/strategic-plan-indicator.json';
   import { useI18n } from 'vue-i18n';
 

   const { t } = useI18n({ messages });
   const props = defineProps({
       documentInfo: { type: Object, required: true },
       locale      : { type:String}
   })
    const document = computed(()=>props.documentInfo?.body);

 </script>

