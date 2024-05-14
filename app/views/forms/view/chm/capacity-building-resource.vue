<template>
    <div id="Record" class="record" >
        <div class="record-body bg-white" v-if="document"> 
           <legend>{{t("generalInformation")}}</legend>
           
           <div v-if="document.title">
                <label>{{t("title")}}</label>
                <ng v-vue-ng:km-value-ml  :value="document.title" :locales="locale" ></ng>
            </div>
           

           <div v-if="document.resourceTypes">
                <label>{{t("typeOfResource")}}</label>
                <ul class="km-value">
                    <li v-for="resourceType in document.resourceTypes">                   
                        <km-term :value="resourceType" :locale="locale"></km-term>
                    </li>
                </ul>
            </div>

            <div v-if="document.fileFormat">
                <label>{{t("format")}}</label>
                <div class="km-value">                
                    <km-term :value="document.fileFormat" :locale="locale"></km-term>
                </div>
            </div>

            <div v-if="document.formatDetails">
                <label>{{t("formatDetails")}}</label>              
                <ng v-vue-ng:km-value-ml  :value="document.formatDetails" :locales="locale" html></ng>
            </div>

            <div v-if="document.purpose">
                <label>{{t("pleaseIdentify")}}</label>
                <ul class="km-value">
                    <li v-for="term in document.purpose">                       
                        <km-term :value="term" :locale="locale"></km-term>
                    </li>
                </ul>
            </div>

            <div v-if="document.targetGroups">
                <label>{{t("mainTarget")}}</label>
                <div class="km-value">
                    <ul>
                        <li v-for="term in document.targetGroups">                      
                            <km-term :value="term" :locale="locale"></km-term>
                        </li>
                    </ul>
                </div>
            </div>

            <div v-if="document.expertiseLevel">
                <label>{{t("level")}}</label>
                <div class="km-value">
                    <km-term :value="document.expertiseLevel" :locale="locale"></km-term>
                </div>
            </div>

            <div v-if="document.authors">
                <label>{{t("authors")}}</label>            
                <ng v-vue-ng:km-value-ml  :value="document.authors" :locales="locale" html></ng>           
            </div>

            <div v-if="document.organizations">
                <label>{{t("organizations")}}</label>
                <div class="km-value" v-for="org in authoringOrganizations">
                    <strong>{{lstring(org.name,locale)}}
                         <i v-if="org.acronym">
                            ({{string(org.acronym,locale)}})
                        </i>
                    </strong>
                <div>  
                <km-term :value="org.organizationType" :locale="locale"></km-term>                     
                </div>
            </div>

            <div v-if="document.publicationYear">
                <label>{{t("publicationYear")}}</label>
                <div class="km-value">{{document.publicationYear}}</div>
            </div>

            <div v-if="document.rights">
                <label>{{t("rights")}}</label>	
                <ng v-vue-ng:km-value-ml  :value="document.rights" :locales="locale" html></ng> 
            </div>
        
            <div v-if="document.source">
                <label>{{t("source")}}</label>
                <ng v-vue-ng:km-value-ml  :value="document.source" :locales="locale" html></ng> 
            </div>

            <legend v-if="document.resourceLinks || document.covers">{{t("access")}}</legend>

            <div v-if="document.resourceLinks">
                <label>{{t("link")}}</label>
                <div class="km-value" v-for="item in document.resourceLinks">
                    <a translation-url target="target" :href="item.url">{{item.name||item.url}}</a>
                    <i v-if="item.name && item.url.indexOf('/api/v2013/documents/')<0">({{item.url}})</i>
                </div>
            </div>
        
            <div v-if="document.covers">
                <label>{{t("coverImages")}}</label>
                <div class="km-value">
                    <a translation-url v-for="link in document.covers" :href="link.url" target="target">
                        <img class="img-polaroid" :src="link.url" alt="link.name" style="max-height: 150px; max-width: 150px" />
                    </a>
                </div>
            </div>

            <legend v-if="document.summary || document.regions">{{t("information")}}</legend>

            <div v-if="document.summary">
                <label>{{t("summary")}}</label>		
                <ng v-vue-ng:km-value-ml  :value="document.summary" :locales="locale" html></ng>           
            </div>

            <div v-if="document.regions">
                <label>{{t("countriesAndGroups")}}</label>
                <ul class="km-value">
                    <!-- TODO:test order -->
                    <!-- <li v-for="term in document.regions | orderBy:name">   -->
                    <li v-for="term in document.regions ">             
                        <km-term :value="term" :locale="locale"></km-term> 
                    </li>
                </ul>
            </div>

            <div v-if="document.cbdSubjects || document.gbfTargets || document.aichiTargets">

                <legend>{{t("generalInformation")}}{{t("subjectAreas")}}</legend>
        
                <div v-if="document.cbdSubjects">
                    <label>{{t("subject")}}</label>
                    <ul class="km-value">
                        <li v-for="term in document.cbdSubjects">
                            <km-term :value="term" :locale="locale"></km-term> 
                        </li>
                    </ul>
                </div>
        
                <div v-if="document.gbfTargets">
                    <div v-if="document.gbfTargets">
                        <label>{{t("gbfTarget")}}</label>
                        <ul class="km-value">
                            <li v-for="term in document.gbfTargets">
                                <km-term :value="term" :locale="locale"></km-term> 
                            </li>
                        </ul>
                    </div>
                </div>
        
                <div v-if="document.aichiTargets">
                    <div v-if="document.aichiTargets">
                        <label>{{t("aichiTarget")}}</label>
                        <ul class="km-value">
                            <li v-for="term in document.aichiTargets">                       
                                <km-term :value="term" :locale="locale"></km-term> 
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div v-if="document.absKeyAreas">
                <legend>{{t("absch")}}</legend>        
                <label>{{t("keyAreas")}}</label>
                <ul class="km-value">
                    <li v-for="term in document.absKeyAreas">
                        <km-term :value="term" :locale="locale"></km-term> 
                    </li>
                </ul>
            </div>

            <div v-if="document.bchSubjects">
                <legend>{{t("cartagenaProtocol")}}</legend>        
                <div v-if="document.bchSubjects">
                    <label>{{t("thematicAreass")}}</label>
                    <ul class="km-value">
                        <li v-for="term in document.bchSubjects">
                            <km-term :value="term" :locale="locale"></km-term> 
                        </li>
                    </ul>
                </div>
            </div>

            
            <view-relevant-information :relevantInfos="document.relevantInformation" 
                                       :relevantDocs="document.relevantDocuments"  :locale="locale">
            </view-relevant-information> 

        </div>  
        </div>
    </div>
</template>
<script setup>
    import { computed } from 'vue'; 
    import '~/components/scbd-angularjs-controls/form-control-directives/km-value-ml.js'  
    import '~/components/scbd-angularjs-controls/form-control-directives/km-link-list.js'
    import '~/views/forms/view/directives/view-record-reference.directive.js'
    import viewRelevantInformation from '~/views/forms/view/directives/view-relevant-information.vue';
    import kmTerm from '~/components/km/KmTerm.vue';
    import messages from '~/app-text/views/reports/chm/capacity-building-resource.json';
    import { useI18n } from 'vue-i18n';
    import { lstring } from '~/components/kb/filters';
   

    const { t } = useI18n({ messages });

    const props = defineProps({
        documentInfo: { type: Object, required: true },
        locale      : { type:String}
    })
    const document = computed(()=>props.documentInfo?.body);
    
</script>