<template>
    <section>  
        <div v-if="relevantInfos||relevantDocs">
            <div v-if="relevantInfos">
                <slot name="info">
                   <label>{{ t("additionalInfo") }} </label>  
                </slot>                        
                <ng v-vue-ng:km-value-ml  :value="relevantInfos" :locales="locale" html></ng>              
            </div>  

            <div v-if="relevantDocs">                
                <slot name="doc">
                    <label>{{ t("otherWebsiteOrDoc") }} </label> 
                </slot>
               
                <div class="km-value" compare-val="relevantDocs">                   
                     <ng v-vue-ng:km-link-list v-model:ng-model="docs" ></ng>    
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
    import { computed } from 'vue';
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'   
    import messages from '~/app-text/views/reports/view-relevant-information.json';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n({ messages });


    const props = defineProps({     
        locale           : {type:String},
        relevantInfos    : {type:Array},
        relevantDocs     : {type:Array}
    })

    //props cannot used on v-model，so use computed property for km-link-list
    const docs = computed(()=>props.relevantDocs);
   
</script>

