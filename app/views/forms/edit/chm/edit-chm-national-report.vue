<template>

    <section>
        <br>   
        genericFilter: {{ genericFilter }}
        genericMapping: {{genericMapping}}
        <div class="row">
            <div class="col-xs-12">
                <label>{{t("languageToPublish")}}</label>
                <div class="indent">                    
                    <ng v-vue-ng:km-form-languages multiple required v-model:ng-model="document.header.languages"  html></ng> 
                </div>
            </div>
        </div>

        <legend>{{t("generalInfo")}}</legend>

        <div class="row">
            <div class="col-xs-12">
                <label>{{t("country")}}</label>
                <ng v-vue-ng:afc-autocomplete name="government" v-model:ng-model="document.government" 
                        :source="options.countries"  :placeholder="t('selectCountryOption')" 
                        :selectbox="true"   
                        :filter="genericFilter" 
                        :mapping="genericMapping" ></ng>
                 
                <!-- <ng v-vue-ng:km-select name="government" required v-model:ng-model="document.government" 
                        id="government" :placeholder="t('selectOption')" 
                        :items="options.countries"  show-description="true"></ng> -->
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <label>{{t("title")}}</label><br/>
                <div class="help-info">
                    {{t("titleInfo")}}  
                </div> 
                <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.title" rows="1" placeholder="" :locales="document.header.languages" ></ng>                
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <label>{{t("type")}}</label>  
                <ng v-vue-ng:afc-autocomplete name="reportType" v-model:ng-model="document.reportType" 
                :source="options.reportTypes"
                :selectbox="true"   
                :filter="genericFilter" 
                :mapping="genericMapping" ></ng>  
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <label>{{t("summary")}}</label>               
                <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.summary" rows="5" placeholder="" :locales="document.header.languages" ></ng>                
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <label>{{t("jurisdiction")}}</label> 
                <ng v-vue-ng:afc-autocomplete name="jurisdiction" v-model:ng-model="document.jurisdiction" 
                :source="options.jurisdictions"  
                :selectbox="true"   
                :filter="genericFilter" 
                :mapping="genericMapping" ></ng>  
            </div>
            <div class="col-md-6">
                <label>{{t("additionalInformation")}}</label> 
                <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.additionalInformation" rows="5" placeholder="" :locales="document.header.languages" ></ng>                
        
            </div>
        </div>
    </section>

    <section>
        <legend>{{t("implementationPeriod")}}</legend>

        <div class="row">
            <div class="col-md-6">
                <label>{{t("from")}}</label>            
                <ng v-vue-ng:km-date required name="startDate" v-model:ng-model="document.startDate"></ng>
              
            </div>
            <div class="col-md-6">
                <label>{{t("to")}}</label>           
                <ng v-vue-ng:km-date  required name="endDate" v-model:ng-model="document.endDate"></ng>              
            </div>
        </div>
    </section>

    <section>
        <legend>{{t("status")}}</legend>     
        <div class="row">          
            <div class="col-xs-12">               
                <label>{{t("statusOfTheDocument")}}</label>
                <ng v-vue-ng:afc-autocomplete name="status" v-model:ng-model="document.status"  :source="options.reportStatus"  
                :selectbox="true"   
                :filter="genericFilter" 
                :mapping="genericMapping" ></ng> 
            </div>
        </div>


        <div class="row">
            <div class="col-md-12" v-if="hasAdoptionDate(document.status)">
                <label>{{t("adoptionDate")}}</label>                     
                <div class="help-info">
                    {{ t("adoptionYear") }}
                </div> 
                <input class="form-control" type="text" name="adoptionDate" v-model="document.adoptionDate"></input>
            </div>
        </div>
        
        <div class="row bottom-spacing" v-if="hasApprovedStatus(document.status)">
            <div class="col-md-12">
                <label>{{t("statusOfApprovedDocument")}}</label>
                <ng v-vue-ng:afc-autocomplete name="approvingStatus"  v-model:ng-model="document.approvedStatus" 
                placeholder="Please select approved status" :source="options.approvedStatus"
                :selectbox="true"   
                :filter="genericFilter" 
                :mapping="genericMapping" ></ng>                  
                <!-- <ng v-vue-ng:km-select name="approvingStatus"  v-model:ng-model="document.approvedStatus" placeholder="Please select approved status" watch-items items="options.approvedStatus"></ng>                 -->
            </div>
        </div>

        <div class="row bottom-spacing" v-if="hasApprovedStatus(document.status)">
            <div class="col-md-12">
                <label>{{t("approvingBody")}}</label>
                <ng v-vue-ng:afc-autocomplete name="approvingBody"  v-model:ng-model="document.approvingBody" 
                placeholder="Please select approving body" :source="options.approvingBody"
                :selectbox="true"   
                :filter="genericFilter" 
                :mapping="genericMapping" ></ng>                  
                <!-- <ng v-vue-ng:afc-autocomplete name="approvingStatus"  v-model:ng-model="document.approvedStatus" placeholder="Please select approved status" watch-items items="options.approvedStatus"></ng>                 -->
            </div>
        </div>

        <div class="row bottom-spacing" v-if="hasApprovedStatusInfo(document)">
            <div class="col-md-12">
                <label>{{t("approvingBodyInformation")}}</label>
                <ng v-vue-ng:km-textbox-ml name="approvingBodyInfo"  rows="6" v-model:ng-model="document.approvingBodyInfo" locales="document.header.languages"></ng>                
            </div>
        </div>
    </section>

    <section>
        <legend>{{t("mainRelevantDocuments")}}</legend>
        <label>{{t("relevantInformation")}}</label>
        <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.documentText" rows="5" placeholder="" :locales="document.header.languages" ></ng>                
        <label>{{t("relevantLinks")}}</label> 
         <ng v-vue-ng:km-link name="documentLinks" v-model:ng-model="document.documentLinks" :allow-link="true" :allow-file="true"
         :identifier="document.header.identifier"></ng>
        
    </section>

    
    <section>
        <legend>{{t("otherRelevantInformation")}}</legend>
        <label>{{t("additionalInformation")}}</label>
        <label>{{t("otherRelevantInformationInfo")}}</label>
        <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.relevantInformation" rows="5" placeholder="" :locales="document.header.languages" ></ng>                
        <label>{{t("otherRelevantWebsite")}}</label>
        <ng v-vue-ng:km-link name="relevantDocuments" v-model:ng-model="document.relevantDocuments" :allow-link="true" :allow-file="true"
        :identifier="document.header.identifier"></ng>
    </section>

    <section>
        <legend>{{t("notes")}}</legend>
        <div class="row">
            <div class="col-xs-12">
                <label>{{t("notes")}}</label>
                <div class="help-info">
                    {{t("notesInfos")}}
                </div>    
                <ng v-vue-ng:km-notes name="notes" v-model:ng-model="document.notes"></ng>										             
            </div>
        </div>
    </section>
</template>

<script setup>
    import "~/components/scbd-angularjs-controls/form-control-directives/km-form-languages.js"
    import messages from '~/app-text/views/forms/edit/chm/edit-chm-national-report.json';
    import { useI18n } from 'vue-i18n';  
    import { genericMapping, genericFilter } from '~/services/filters/arrays';
  
    const { t } = useI18n({ messages });
 
    const document = defineModel();

    const props = defineProps({      
        options  : { type:Object, required:true }
    })

    const hasAdoptionDate = (status) =>{       
        return (status == "Final" ||
                status == "Approved");
        // return (status.identifier == "1C37E358-5295-46EB-816C-0A7EF2437EC9" ||
        //         status.identifier == "851B10ED-AE62-4F28-B178-6D40389CC8DB");
    };

    const hasApprovedStatus = (status) => {
        // return status.identifier == "851B10ED-AE62-4F28-B178-6D40389CC8DB";
        return ( status == "Approved");
    };

    const hasApprovedStatusInfo = (document) =>{


        return !!document.value && !!document.value.approvingBody && (
            document.value.approvingBody.identifier == "D3A4624E-21D9-4E49-953F-529734538E56" ||
            document.value.approvingBody.identifier == "E7398F2B-FA36-4F42-85C2-5D0044440476" ||
            document.value.approvingBody.identifier == "905C1F7F-C2F4-4DCE-A94E-BE6D6CE6E78F");
    };



</script>