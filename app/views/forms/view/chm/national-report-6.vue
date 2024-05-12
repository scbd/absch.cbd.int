<template>
    <div id="Record" class="record ">
        <div class="record-body  bg-white" v-if="document">  
            <!-- {{ document }} -->
            <section>
                <legend> {{ t("sectionI") }} </legend>
                
                <div v-if="document.government">                       
                    <label> {{ t("country") }}</label>
                    <div class="km-value">                   
                        <km-term :value="document.government " :locale="locale"></km-term>
                    </div>                        
                </div>

                <div v-if="document.notReportingOnNationalTargets">
                    <label><km-term :value="document.government " :locale="locale"></km-term> {{ t("hasAdpted") }} </label>
                    <label>{{ t("informationOnWhy") }} <km-term :value="document.government " :locale="locale"></km-term>{{ t("isChoosingTo") }}  </label>
                    <ng v-vue-ng:km-value-ml  :value="document.notReportingOnNationalTargetsReason" :locales="locale"></ng>   
                </div>

                <div v-if="document.targetPursued && document.nationalTargets.length">
                    <label>{{ t("nationalTargets") }}</label>     
                    <!--TODO: v-for can't use v-model  -->
                    <div class="km-value" compare-val>
                        <!-- <div  v-for="nationalTarget in targets" > 
                            <ng v-vue-ng:view-record-reference  v-model:ng-model="nationalTarget" :locales="locale" html></ng>       
                        </div>  -->
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
    import '~/views/forms/view/directives/view-record-reference.directive.js'
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/national-report-6.json';
    import { useI18n } from 'vue-i18n';
    import { formatDate } from '~/components/kb/filters';

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })
    const document = computed(()=>props.documentInfo?.body);
</script>