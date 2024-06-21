<template>

    <section>
        <br>   
        {{document}}
        <div class="row">
            <div class="col-xs-12">
                <label>Please select in which language(s) you wish to submit this record:</label>
                <div class="indent">                    
                    <ng v-vue-ng:km-form-languages multiple required v-model:ng-model="document.header.languages"  html></ng> 
                </div>
            </div>
        </div>

        <legend>General Information</legend>

        <div class="row">
            <div class="col-xs-12">
                <label>Country</label>
                <ng v-vue-ng:afc-autocomplete name="government" v-model:ng-model="document.government" 
                        :source="options.countries"  :placeholder="t('selectOption')" :selectbox="true"   
                        :filter="genericFilter" :mapping="genericMapping" ></ng>
                 
                <!-- <ng v-vue-ng:km-select name="government" required v-model:ng-model="document.government" 
                        id="government" :placeholder="t('selectOption')" 
                        :items="options.countries"  show-description="true"></ng> -->
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <label>Title of the document</label><br/>
                <div class="help-info">
                    Please use the official title, if available.  
                </div> 
                <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.title" rows="1" placeholder="" :locales="document.header.languages" ></ng>                
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <label>Type of the document</label>  
                <ng v-vue-ng:afc-autocomplete name="reportType" v-model:ng-model="document.reportType" 
                :source="options.reportTypes" ></ng>  
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <label>Summary</label>               
                <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.summary" rows="5" placeholder="" :locales="document.header.languages" ></ng>                
            </div>
        </div>

        

        <div class="row">
            <div class="col-md-6">
                <label>Level of application</label> 
                <ng v-vue-ng:afc-autocomplete name="jurisdiction" v-model:ng-model="document.jurisdiction" 
                :source="options.jurisdictions"  ></ng> 
            </div>
            <div class="col-md-6">
                <label>Additional information</label> 
                <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.additionalInformation" rows="5" placeholder="" :locales="document.header.languages" ></ng>                
        
            </div>
        </div>
    </section>

    <section>
        <legend>Implementation Period</legend>

        <div class="row">
            <div class="col-md-6">
                <label>From</label>            
                <ng v-vue-ng:km-date required name="startDate" v-model:ng-model="document.startDate"></ng>
              
            </div>
            <div class="col-md-6">
                <label>To</label>           
                <ng v-vue-ng:km-date  required name="endDate" v-model:ng-model="document.endDate"></ng>              
            </div>
        </div>
    </section>

    <section>
        <legend>Status</legend>     
        <div class="row">          
            <div class="col-xs-12">               
                <label>Status of the document</label>
                <ng v-vue-ng:afc-autocomplete name="status" v-model:ng-model="document.status"  :source="options.reportStatus"  ></ng>
            </div>
        </div>


        <div class="row">
            <div class="col-md-12" v-if="hasAdoptionDate(document.status)">
                <label>Date of completion and adoption</label>                     
                <div class="help-info">
                    Please indicate the year of completion in case year of adoption is unknown
                </div> 
                <input class="form-control" type="text" name="adoptionDate" v-model="document.adoptionDate"></input>
            </div>
        </div>
        
        <div class="row bottom-spacing" v-if="hasApprovedStatus(document.status)">
            <div class="col-md-12">
                <label>Status of approved document</label>
                <ng v-vue-ng:afc-autocomplete name="approvingStatus"  v-model:ng-model="document.approvedStatus" 
                placeholder="Please select approved status" :source="options.approvedStatus"></ng>                
                <!-- <ng v-vue-ng:km-select name="approvingStatus"  v-model:ng-model="document.approvedStatus" placeholder="Please select approved status" watch-items items="options.approvedStatus"></ng>                 -->
            </div>
        </div>

        <div class="row bottom-spacing" v-if="hasApprovedStatus(document.status)">
            <div class="col-md-12">
                <label>Approving body</label>
                <ng v-vue-ng:afc-autocomplete name="approvingBody"  v-model:ng-model="document.approvingBody" 
                placeholder="Please select approving body" :source="options.approvingBody"></ng>                
                <!-- <ng v-vue-ng:afc-autocomplete name="approvingStatus"  v-model:ng-model="document.approvedStatus" placeholder="Please select approved status" watch-items items="options.approvedStatus"></ng>                 -->
            </div>
        </div>

        <div class="row bottom-spacing" v-if="hasApprovedStatusInfo(document)">
            <div class="col-md-12">
                <label>Approving body information</label>
                <ng v-vue-ng:km-textbox-ml name="approvingBodyInfo"  rows="6" v-model:ng-model="document.approvingBodyInfo" locales="document.header.languages"></ng>                
            </div>
        </div>
    </section>

    <section>
        <legend>Main relevant document(s)</legend>
        <label>Relevant information</label>
        <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.documentText" rows="5" placeholder="" :locales="document.header.languages" ></ng>                
        <label>Relevant websites, links, and files</label> 
         <ng v-vue-ng:km-link name="documentLinks" v-model:ng-model="document.documentLinks" :allow-link="true" :allow-file="true"
         :identifier="document.header.identifier"></ng>
        
    </section>

    
    <section>
        <legend>Other relevant information</legend>
        <label>Additional Information</label>
        <label>Please use this field to provide any other relevant information that may not have been addressed elsewhere in the record.</label>
        <ng v-vue-ng:km-textbox-ml  v-model:ng-model="document.relevantInformation" rows="5" placeholder="" :locales="document.header.languages" ></ng>                
        <label>Other relevant website address or attached documents</label>
        <ng v-vue-ng:km-link name="relevantDocuments" v-model:ng-model="document.relevantDocuments" :allow-link="true" :allow-file="true"
        :identifier="document.header.identifier"></ng>
    </section>

    <section>
        <legend>Notes</legend>
        <div class="row">
            <div class="col-xs-12">
                <label>Notes</label>
                <div class="help-info">
                    The field “Notes” is for personal reference and can be seen only when the record is being edited.  
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