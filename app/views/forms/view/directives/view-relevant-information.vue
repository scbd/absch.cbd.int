<template>
    <div v-if="relevantInformation|| relevantDocuments">  
        <!-- TODO: add compare-val  -->
        <div v-if="relevantInformation">
            <slot name="information">
                <label>{{ t("additionalInformation") }}</label>
            </slot>                        
            <ng v-vue-ng:km-value-ml  :value="relevantInformation" :locales="locale" html></ng>              
        </div>  

        <div v-if="relevantDocuments">                
            <slot name="document">
                <label>{{ t("otherWebsiteOrDocument") }} </label> 
            </slot>
            
            <div class="km-value" >                   
                <ng v-vue-ng:km-link-list v-model:ng-model="documents" ></ng>    
            </div>
        </div>      
    </div>
</template>
<script setup>
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'   
    import messages from '~/app-text/views/reports/view-relevant-information.json';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n({ messages });

    const props = defineProps({     
        locale                 : {type:String, required:true},
        relevantInformation    : {type:Object},
        relevantDocuments      : {type:Array}
    })

    //props cannot used on v-model，so define another variable for km-link-list
    const documents = props.relevantDocuments;
   
</script>