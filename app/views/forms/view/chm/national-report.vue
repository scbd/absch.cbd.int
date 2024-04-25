<template>  
    <div id="Record" class="record panel panel-default">
        <div class="record-body panel-body bg-white" v-if="document"> 
            <h1>   {{ lstring(document.title, locale) }}</h1>        
            <legend>{{ t("generalInformation") }} </legend>  
           
            <label>{{ t("country") }} </label> 
            <div class="km-value">
                <km-term :value="document.government" :locale="locale"></km-term>   
            </div>

            <label>{{ t("typeOfDocument") }} </label>   
            <div class="km-value">
                <km-term :value="document.reportType" :locale="locale"></km-term>
            </div>           

            <label>{{ t("summary") }} </label>  
            <ng  v-vue-ng:km-value-ml  :value="document.summary" :locales="locale"></ng>   

            <label>{{ t("levelOfApplication") }} </label> 
            <div class="km-value">
                <km-term :value="document.jurisdiction" :locale="locale"></km-term>
            </div>

            <legend>{{ t("status") }} </legend>
            <label>{{ t("status") }} </label> 
            <div class="km-value">
                <km-term :value="document.status" :locale="locale"></km-term>
            </div>

            <label>{{ t("dateOfCompletionAndAdoption") }} </label>   
            <ng v-vue-ng:km-value-ml  :value="document.adoptionDate" :locales="locale"></ng>  

            <label>{{ t("statusOfApprovedDocument") }} </label> 
            <div class="km-value">
                <km-term :value="document.approvedStatus" :locale="locale"></km-term>
            </div>

            <label>{{ t("approvingBody") }} </label>
            <div class="km-value">
                <km-term :value="document.approvingBody" :locale="locale"></km-term>
            </div>

            <legend>{{ t("timePeriod") }} </legend>   
            <label>{{ t("from") }} </label>    
            <ng v-vue-ng:km-value-ml  :value="document.startDate" :locales="locale"></ng>  

            <label>{{ t("to") }} </label>    
            <ng v-vue-ng:km-value-ml  :value="document.endDate" :locales="locale"></ng>  


            <legend>{{ t("relevantDocumentsAndInformation") }}</legend>        
            <div v-if="document.documentText">
                <label>{{ t("relevantInformation") }} </label>   
                <ng v-vue-ng:km-value-ml  :value="document.documentText" :locales="locale" html></ng>  
            </div>
    
            <div v-if="document.documentLinks">
                <label>{{ t("relevantWebsitesLinksAndFiles") }} </label>   
                <ul class="km-value">
                    <li v-for="doc in document.documentLinks">
                        <span >
                            <a rel="noopener" translation-url  :href="doc.url" target="_blank">   {{ doc.name }}</a>
                        </span>
                    </li>
                </ul>
            </div>

            <div v-if="document.relevantInformation">
                <label>{{ t("additionalInformation") }} </label>   
                <ng v-vue-ng:km-value-ml  :value="document.relevantInformation" :locales="locale"></ng>
            </div>

            <div v-if="document.relevantDocuments">
                <label>{{ t("otherRelevantWebsiteAddressOrAttachedDocuments") }} </label>             
                <ul class="km-value">
                    <li v-for="doc in document.relevantDocuments">  
                        <span >
                            <a rel="noopener" translation-url  :href="doc.url" target="_blank">   {{ doc.name }}</a>
                        </span>
                    </li>
                </ul>
            </div>           
        </div>
    </div>
</template>
<script setup>
    import { computed } from 'vue';
    import { lstring } from '~/services/filters/lstring.js'; 
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/national-report.json';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })
    const document = computed(()=>props.documentInfo?.body);

</script>