<template>
    <section v-if="props.information|| props.documents">  
        <!-- TODO: add compare-val  -->
       
        <slot name="legend">
            <legend>{{ t("additionalInformation") }}</legend>
        </slot>    

        <div v-if="props.information">
            <slot name="information">
                <label>{{ t("additionalInformation") }}</label>
            </slot>                        
            <ng v-vue-ng:km-value-ml  :value="information" :locales="locale" html></ng>              
        </div>  

        <div v-if="props.documents">                
            <slot name="document">
                <label>{{ t("otherWebsiteOrDocument") }} </label> 
            </slot>
            
            <div class="km-value" >                   
                <ng v-vue-ng:km-link-list v-model:ng-model="docs" ></ng>    
            </div>
        </div>
      
    </section>
</template>
<script setup>
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'   
    import messages from '~/app-text/views/reports/view-relevant-information.json';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n({ messages });

    const props = defineProps({     
        locale         : {type:String},
        information    : {type:Object},
        documents      : {type:Array}
    })

    //props cannot used on v-model，so define another variable for km-link-list
    const docs = props.documents;
   
</script>