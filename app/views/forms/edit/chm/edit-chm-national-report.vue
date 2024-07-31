<template>

    <section>
        <legend>{{t("generalInfo")}}</legend>

        <div class="row">
            <div class="col-xs-12">
                <ng v-vue-ng:km-control-group name="languages" required :caption="t('languageToPublish')">
                    <ng v-vue-ng:km-form-languages multiple required v-model:ng-model="document.header.languages"  html></ng> 
                </ng>
            </div>
        </div>
        <div class="row">           
            <div class="col-xs-12">
                <ng v-vue-ng:km-control-group name="government" required :caption="t('country')">
                    <ng v-vue-ng:afc-autocomplete name="government" v-model:ng-model="document.government" :source="options.countries" @ng-disabled="()=>{return userGovernment}" 
                        :placeholder="t('selectCountryOption')" :selectbox="true" :filter="genericFilter"  :mapping="genericMapping" >
                    </ng>
                </ng> 
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <ng v-vue-ng:km-control-group name="title" required :caption="t('title')"> 
                    <div>
                        <div class="help-info">{{t("titleInfo")}} </div>
                        <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.title" :placeholder="t('title')" :locales="document.header.languages" ></ng> 
                    </div>
                </ng> 
            </div>
        </div>

       

        <div class="row" v-if="route?.params?.documentType != 'NBSAP'">
            <div class="col-xs-6">
                <ng v-vue-ng:km-control-group name="type" required :caption="t('type')"> 
                    <ng v-vue-ng:afc-autocomplete name="reportType" v-model:ng-model="document.reportType" 
                        :source="options.reportTypes" :selectbox="true" :filter="genericFilter" :mapping="genericMapping" >
                    </ng>
                </ng> 
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <ng v-vue-ng:km-control-group name="summary" :caption="t('summary')">
                    <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.summary" rows="3" :placeholder="t('summary')" :locales="document.header.languages" ></ng> 
                </ng>            
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">            
                <ng v-vue-ng:km-control-group name="jurisdiction"  :caption="t('jurisdiction')">
                    <ng v-vue-ng:afc-autocomplete name="jurisdiction" v-model:ng-model="document.jurisdiction" :source="options.jurisdictions"  
                        :selectbox="true" :filter="genericFilter" :mapping="genericMapping">
                    </ng> 
                </ng>                
            </div>
            <div class="col-md-6">
                <ng v-vue-ng:km-control-group name="jurisdictionInfo" :caption="t('additionalInformation')">
                    <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.jurisdictionInfo" rows="1" :placeholder="t('additionalInformation')" :locales="document.header.languages" ></ng>
                </ng>               
            </div>
        </div>
    </section>

    <section>
        <legend>{{t("implementationPeriod")}}</legend>

        <div class="row">
            <div class="col-md-6">
                <ng v-vue-ng:km-control-group name="startDate" required :caption="t('from')">
                    <ng v-vue-ng:km-date required name="startDate" v-model:ng-model="document.startDate"></ng>    
                </ng>  
            </div>

            <div class="col-md-6">
                <ng v-vue-ng:km-control-group name="endDate"  :caption="t('to')">
                    <ng v-vue-ng:km-date  required name="endDate" v-model:ng-model="document.endDate"></ng>  
                </ng>   
            </div>
        </div>
    </section>

   <section>
        <legend>{{t("status")}}</legend>     
        <div class="row">          
            <div class="col-md-6">     
                <ng v-vue-ng:km-control-group name="statusOfTheDocument"  :caption="t('statusOfTheDocument')"> 
                    <ng v-vue-ng:afc-autocomplete name="status" v-model:ng-model="document.status" :source="options.reportStatus" :selectbox="true"   
                        :filter="genericFilter"  :mapping="genericMapping">
                    </ng> 
                </ng>
            </div>
            <div class="col-md-6" v-if="hasAdoptionDate">
                <ng v-vue-ng:km-control-group name="adoptionDate"  :caption="t('adoptionDate')"> 
                    <div>
                        <div class="help-info">{{t("adoptionYear")}} </div> 
                        <input class="form-control" type="text" name="adoptionDate" v-model="document.adoptionDate"></input>                  
                    </div>
                </ng>                
            </div>
        </div>
        
        <div class="row bottom-spacing" v-if="hasApprovedStatus">
            <div class="col-md-6">
                <ng v-vue-ng:km-control-group name="approvedStatus" :caption="t('statusOfApprovedDocument')"> 
                    <ng v-vue-ng:afc-autocomplete name="approvingStatus" v-model:ng-model="document.approvedStatus" :placeholder="t('approvingBodyInfo')" 
                    :source="options.approvedStatus" :selectbox="true" :filter="genericFilter" :mapping="genericMapping">
                    </ng> 
                </ng>          
            </div>
            <div class="col-md-6">
                <ng v-vue-ng:km-control-group name="approvingBody"  :caption="t('approvingBody')"> 
                    <ng v-vue-ng:afc-autocomplete name="approvingBody"  v-model:ng-model="document.approvingBody"  :placeholder="t('approvingBodyInfo')" :source="options.approvingBody"
                        :selectbox="true"  :filter="genericFilter"  :mapping="genericMapping" >
                    </ng>
                </ng>          
            </div>
        </div>

        <div class="row bottom-spacing" v-if="hasApprovedStatusInfo">
            <div class="col-md-12">
                <ng v-vue-ng:km-control-group name="approvingBodyInformation"  :caption="t('approvingBodyInformation')">
                    <ng v-vue-ng:km-textbox-ml name="approvingBodyInfo"  rows="3" v-model:ng-model="document.approvingBodyInfo" :locales="document.header.languages"></ng>               
                </ng> 
            </div>
        </div>
    </section>

    <section>
        <legend>{{t("mainRelevantDocuments")}}</legend>
      
        <ng v-vue-ng:km-control-group name="documentText" :caption="t('relevantInformation')">
            <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.documentText" rows="3" :placeholder="t('relevantInformation')" :locales="document.header.languages" ></ng>                
        </ng>
        
        <ng v-vue-ng:km-control-group name="documentLinks" :caption="t('relevantLinks')">
            <ng v-vue-ng:km-link name="documentLinks" v-model:ng-model="document.documentLinks" :allow-link="true" 
                :allow-file="true"  :identifier="document.header.identifier">
            </ng>
        </ng>       
    </section>

    
    <section>
        <legend>{{t("otherRelevantInformation")}}</legend>
        <label>{{t("additionalInformation")}}</label>
        <ng v-vue-ng:km-control-group name="relevantInformation"  :caption="t('otherRelevantInformationInfo')">
            <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.relevantInformation" rows="3" :placeholder="t('otherRelevantInformationInfo')" :locales="document.header.languages" ></ng>                
        </ng>  

        <ng v-vue-ng:km-control-group name="relevantDocuments"  :caption="t('otherRelevantWebsite')">
            <ng v-vue-ng:km-link name="relevantDocuments" v-model:ng-model="document.relevantDocuments" 
                :allow-link="true" :allow-file="true"   :identifier="document.header.identifier">
            </ng>
        </ng> 
    </section>

    <section>
        <legend>{{t("notes")}}</legend>
        <div class="row">
            <div class="col-xs-12">
                <ng v-vue-ng:km-control-group name="notes" :caption="t('notes')">
                    <div>
                        <div class="help-info"> {{t("notesInfos")}}</div>    
                        <ng v-vue-ng:km-notes name="notes" v-model:ng-model="document.notes"></ng>	
                    </div>
                </ng> 								             
            </div>
        </div>
    </section>
</template>

<script setup>
    import { computed, inject} from 'vue';
    import "~/components/scbd-angularjs-controls/form-control-directives/km-form-languages.js"
    import messages from '~/app-text/views/forms/edit/chm/edit-chm-national-report.json';
    import { useI18n } from 'vue-i18n';  
    import { genericMapping, genericFilter } from '~/services/filters/arrays';
    import  { THESAURUS } from '~/services/filters/constant';
    import { sanitizeDocument } from '~/services/filters/common';
    import { useAuth, useRoute } from "@scbd/angular-vue/src/index.js";
    import ThesaurusApi  from "~/api/thesaurus.js";
    import { THESAURUS_TERMS } from '~/constants/thesaurus.js'
 
    
   
    const document                = defineModel();
    const angularGetCleanDocument = inject('getCleanDocument')
    const { t }                   = useI18n({ messages });
    const auth                    = useAuth();
    const route                   = useRoute();
    const thesaurusApi            = new ThesaurusApi({tokenReader:()=>auth.token()});


    const STATUS_DRAFT                               = "9D17F3A2-EC92-4D31-81EF-A12521873D7F";
    const STATUS_FINAL                               = "1C37E358-5295-46EB-816C-0A7EF2437EC9" ;
    const STATUS_APPROVED                            = "851B10ED-AE62-4F28-B178-6D40389CC8DB";
    const APPROVING_BODY_NATIONAL_COMMITTEE          = "905C1F7F-C2F4-4DCE-A94E-BE6D6CE6E78F";
    const APPROVING_BODY_MINISTER                    = "E7398F2B-FA36-4F42-85C2-5D0044440476";
    const APPROVING_BODY_INTER_MINISTERIAL_COMMITTEE = "D3A4624E-21D9-4E49-953F-529734538E56";

    const options = {
        countries     : thesaurusApi.getDomainTerms(THESAURUS.COUNTRIES),
        jurisdictions : thesaurusApi.getDomainTerms(THESAURUS.JURISDICTIONS),
        approvedStatus: thesaurusApi.getDomainTerms(THESAURUS.APPROVED_STATUS),
        approvingBody : thesaurusApi.getDomainTerms(THESAURUS.APPROVING_BODY),
        reportStatus  : thesaurusApi.getDomainTerms(THESAURUS.REPORT_STATUS),
        reportTypes   : thesaurusApi.getDomainTerms( THESAURUS.REPORT_TYPES).then(reports=>reports.filter(e=>e.identifier!=THESAURUS_TERMS.NBSAP)),
    };
    const userGovernment = computed(()=> auth.user()?.government);

    const hasAdoptionDate = computed(()=> {
           return  !!document?.value?.status && (
            document?.value?.status.identifier == STATUS_FINAL  ||
            document?.value?.status.identifier == STATUS_APPROVED  )
    });   

    const hasApprovedStatus = computed(()=> {
        return !!document?.value?.status  && document?.value?.status.identifier == STATUS_APPROVED;	
    }); 
   
    const hasApprovedStatusInfo = computed(()=> {
        return  !!document?.value?.approvingBody && (
            document?.value?.approvingBody.identifier == APPROVING_BODY_INTER_MINISTERIAL_COMMITTEE  ||
            document?.value?.approvingBody.identifier == APPROVING_BODY_MINISTER  ||
            document?.value?.approvingBody.identifier == APPROVING_BODY_NATIONAL_COMMITTEE);
	});
   
    const getCleanDocument = (doc) =>{  
        const lDocument = doc || document.value
        if (!lDocument)
                return undefined
    
        if (/^\s*$/g.test(lDocument.notes))
            lDocument.notes = undefined
    
        return sanitizeDocument(lDocument);
    };


    angularGetCleanDocument({
         getCleanDocument
    });

    // defineExpose({
    //     getCleanDocument   
    // })



</script>