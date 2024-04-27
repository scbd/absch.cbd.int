<template>
    <div id="Record" class="record panel panel-default">
        <div class="record-body panel-body bg-white" v-if="document">              
          
            <div class="panel panel-info">
                <div class="panel-heading">                 
                    <legend>{{ t("generalInformation") }} </legend> 
                </div>
                <div class="panel-body">
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
                    
                    <div v-if="document.jurisdiction">
                        <label>{{ t("levelOfImplementation") }} </label> 
                        <div class="km-value">
                            <km-term :value="document.jurisdiction" :locale="locale"></km-term>   
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