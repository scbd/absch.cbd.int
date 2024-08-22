<template>
    <span>
        <a rel="noopener" href="#" class="table-export-button text-decoration-none" @click="openDialog">
            <i class="fa fa-download" aria-hidden="true"></i> 
            {{t('exportButton')}}
        </a>
        <div class="modal fade" ref="exportModal" data-backdrop="static"  tabindex="-1" aria-hidden="true" id="export-modal">      
            <div class="modal-dialog modal-xl modal-dialog-centered"  role="document">
                <div class="modal-content">
                    <div class="modal-header color-black">
                        <h5 class="modal-title">
                            {{t('dialogTitle')}}
                        </h5>
                        <button type="button" class="border-0 close" @click="closeDialog()" aria-label="Close" ><i class="bi bi-x-circle-fill icon-lg"></i></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="alert alert-info">
                                    {{t('exportInformation')}}
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-9">
                                <div class="form-group color-black">
                                    {{t('downloadFormat')}}
                                    <span class="radio" style="display: initial;">
                                        <!-- <label class="radio-inline"><input type="radio" name="downloadFormatOption" value="xls"  v-model="downloadFormat" />{{$t('xls')}}</label>                    -->
                                        <label class="radio-inline"><input type="radio" name="downloadFormatOption" value="xlsx" v-model="downloadFormat" /> {{t('xlsx')}}</label>                   
                                        <label class="radio-inline"><input type="radio" name="downloadFormatOption" value="csv"  v-model="downloadFormat" /> {{t('csv')}}</label>
                                    </span>
                                </div> 
                                <div v-if="!isGeneric">
                                <div class="modal fade" ref="optionsModal" tabindex="-1" aria-labelledby="customizedFieldsModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered modal-lg">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="customizedFieldsModalLabel"> {{t('customFields')}} </h5>
                                                <button type="button" data-bs-dismiss="modal" class="border-0 close" @click="closeModal()"
                                                    aria-label="Close"><i class="bi bi-x-circle-fill icon-lg"></i></button>
                                            </div>
                                            <div class="modal-body custom-fields-modal-body">
                                                <div class="d-flex align-items-center float-end mb-3">
                                                    <button type="button" class="btn btn-primary" @click="selectAll" >{{t('selectAll')}}</button>
                                                    <button type="button" class="btn btn-secondary ms-1" @click="clearAll" >{{t('clearAll')}}</button>
                                                </div>
                                                <div v-for="(value, key) in optionFields" :key="key" class="form-check">
                                                    <input type="checkbox" :id="key" :value="key" v-model="selectedFields" class="form-check-input">
                                                    <label :for="key" style="font-weight: normal !important;">{{ value }}</label>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal()" aria-label="Close"> {{t('cancel')}}</button>
                                                <button type="button" class="btn btn-primary" @click="updateFields">{{t('apply')}}</button>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                           
                            <div class="col-3">
                                <span class="float-end" style="padding-top: 20px;">
                                    {{t('recordsFound')}}: <strong>{{numFound}}</strong>
                                </span>
                            </div>
                        </div>

                        <div class="row" v-if="loading">
                            <div class="col-12">
                                <div class="alert alert-info">
                                    <i class="fa fa-spin fa-spinner"></i> {{t('processing')}}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div id="divTable"  style="max-height:300px;overflow:scroll; " v-if="!loading" >                               
                                        <div v-if="isGeneric">
                                            <table id="datatable" class="table table-striped table-bordered table-condensed">
                                                <thead> 
                                                    <tr>
                                                        <th class="tableexport-string">{{t('type')}}</th>
                                                        <th class="tableexport-string">{{t('uid')}}</th>
                                                        <th class="tableexport-string">{{t('government')}}</th>
                                                        <th class="tableexport-string" style="max-width:30%">{{t('title')}} </th>
                                                        <th style="white-space:nowrap;" class="tableexport-string">{{t('info1')}} </th>
                                                        <th style="white-space:nowrap;" class="tableexport-string">{{t('info2')}} </th>
                                                        <th style="white-space:nowrap;" class="tableexport-string">{{t('info3')}} </th>
                                                        <th style="white-space:nowrap;" class="tableexport-string">{{t('info4')}} </th>
                                                        <th style="white-space:nowrap;" class="tableexport-string">{{t('publishedDate')}}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(row, index) in downloadDocs" :key="index">
                                                        
                                                        <td class="tableexport-string">{{row.rec_schema}}</td>
                                                        <td class="tableexport-string">
                                                            <a rel="noopener" target="_blank" :href="`database/${encodeURIComponent(row.rec_uniqueIdentifier || row.identifier)}`">
                                                                {{ (row.rec_uniqueIdentifier).toUpperCase()}}
                                                            </a>
                                                        </td>
                                                        <td class="tableexport-string">{{row.rec_government}}</td>
                                                        <td class="tableexport-string">{{row.rec_title}}</td>
                                                        <td class="tableexport-string">{{(row.rec_meta1||[]).join(', ')}}</td>
                                                        <td class="tableexport-string">{{(row.rec_meta2||[]).join(', ')}}</td>
                                                        <td class="tableexport-string">{{(row.rec_meta3||[]).join(', ')}}</td>
                                                        <td class="tableexport-string">{{(row.rec_meta4||[]).join(', ')}}</td>  
                                                        <td class="tableexport-string">{{formatDate(row.rec_date, 'DD MMM YYYY')}}</td>                          
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div v-if="!isGeneric">
                                            <table id="datatable" class="table table-striped table-bordered table-condensed">
                                                <thead> 
                                                    <tr>
                                                        <th v-for="field in schemaFields" :key="index">{{field}}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(row, index) in downloadDocs" :key="index">                                                
                                                        <td v-for="(field, key) in schemaFields" :key="key">
                                                            <span v-if="typeof row[key] == 'string'">
                                                                <span v-if="key == 'uniqueId'">
                                                                    <a target="_blank" :href="`/database/${row[key]}`">{{ row[key] }}</a>
                                                                </span>
                                                                <span v-else v-html="formatString(row[key])"></span>
                                                            </span>
                                                            <span v-if="typeof row[key] == 'object'">
                                                                <!-- url field -->
                                                                {{ formatString(row[key]?.url) }}
                                                            </span>
                                                            <span v-if="Array.isArray(row[key])">
                                                                <ul class="p-0 list-inline">
                                                                    <li v-for="item in row[key]" :key="item">                                                                    
                                                                        <!-- url field -->
                                                                        <span v-if="typeof item == 'object'">
                                                                            <span v-html="formatString(item?.url||item)"></span>
                                                                        </span>
                                                                        <span  v-if="typeof item == 'string'" v-html="formatString(item)"></span>
                                                                    </li>
                                                                </ul>
                                                            </span>                                                    
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    
                                    <h3 class="color-red bold" v-if="!loading">{{t('sampleMessage')}}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-between">
                        <div class="float-start">
                            <button v-if="!isGeneric" @click="openModal" class="btn btn-primary">{{t('customFields')}}</button>
                        </div> 
                        <div class="float-end">
                            <button type="button" class="btn btn-secondary" aria-label="Close" @click="closeDialog()" :disabled="loading">{{t('cancel')}}</button>
                            <button type="button" class="btn btn-primary ms-2" aria-label="Download" @click="exportRecords(downloadFormat)" :disabled="loading" id="downloadDataFile">
                                {{t('download')}}
                            </button>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </span>   
</template>

<script setup>
    import { ref, shallowRef, onMounted, inject, watch } from "vue";
    import { Modal } from "bootstrap";
    import  { formatDate, capitalize } from '../kb/filters';
    import { useRealm } from '../../services/composables/realm.js';
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/export.json';
    const { t } = useI18n({ messages });
    const realm = useRealm();
    const exportModal = shallowRef(null);
    const optionsModal = shallowRef(null);
    const downloadDocs =ref([]);
    const numFound = ref(0);
    const loading = ref(false);
    const isGeneric = ref(true);
    const schemaFields = ref([]); // get updated and pass the updated fields to api call.
    const optionFields = ref([]); // to show the list of fields in the dialog. { "uniqueId": "UID", "government": "Country",  ...
    const selectedFields = ref([]); // v-modal values for selected optionsFields.  [ "government", "uniqueId" ....
    const downloadFormat  = ref('xlsx');
    const getDownloadRecords = inject('getDownloadRecords');

    const props = defineProps({
        fileName: {type: String},
    })

    let schema = undefined ;
    let modal = null;
    let customizeFieldsModal = null;
    let fields = [
        'rec_schema:schema_EN_s',
        'rec_uniqueIdentifier:uniqueIdentifier_s',
        'rec_government:government_EN_s',
        'rec_title:title_EN_s',
        'rec_meta1:meta1_EN_txt',
        'rec_meta2:meta2_EN_txt',
        'rec_meta3:meta3_EN_txt',
        'rec_meta4:meta4_EN_txt',
        'rec_date:updatedDate_dt',
    ];

    onMounted(()=>{
        modal = new Modal(exportModal.value);
    })

    const openModal =() =>  
    { 
        customizeFieldsModal = new Modal(optionsModal.value);
        customizeFieldsModal.show();
        selectAll(); // select all optionsFields
    };
    const closeModal =() => {  
        customizeFieldsModal.hide();
    };
   
    const selectAll =() => {
        console.log('i am called select all')
        selectedFields.value = Object.keys(optionFields.value);
    };
    const clearAll =() => {  
        selectedFields.value = [];
    };
    const updateFields =() => { 
        if(selectedFields.value && selectedFields.value.length>0) { 
            let uiFields = {};
            selectedFields.value.forEach((field) => {
            if (optionFields.value[field] !== undefined)
                uiFields[field] = optionFields.value[field];
            });
            schemaFields.value = uiFields; 
            closeModal();
        }
    };

    const openDialog = async () => {
        modal.show('static');
        loading.value = true;
        try{
            selectedFields.value = [];
            const responseData = await getDownloadRecords({fields, listType:'initial', format:'json'});
            downloadDocs.value = responseData.docs
            numFound.value     = responseData.numFound;
            isGeneric.value    = responseData.isGeneric;
            schemaFields.value = optionFields.value = responseData.schemaFields ? responseData.schemaFields:[];
            schema             = responseData.schema;
        }
        catch(e){
                console.error(e)
        }
        finally{
            loading.value = false;
        }
    }
    const exportRecords = async () => {
        loading.value   = true; 
        let fileName    = props.fileName||`${realm.uIdPrefix}-${schema}-${new Date().getTime().toString(36)}.${downloadFormat.value}`
        try
        {
            if(isGeneric.value){
                await import('tableexport');
                const info        = await getDownloadRecords({fields, listType:'all', fileName, format : downloadFormat.value});
                if(info){
                    downloadDocs.value = info.docs;
                    numFound.value     = info.numFound;
                    setTimeout(()=>{
                        $('#datatable').tableExport({
                            formats: ["xlsx", "xls", "csv"],
                            filename: fileName,
                        });
                        $(`.${downloadFormat.value}`).click(); 

                        downloadDocs.value = downloadDocs.value.slice(0, 24);
                    }, 500);
                }
            }
            else{
                await getDownloadRecords({fields:schemaFields.value, listType:'all', fileName, format : downloadFormat.value});
            }
        }
        catch(e){
            console.error(e)
        }
        finally{
            loading.value = false;
        }          
    }

    const closeDialog = () => {
        modal.hide();
        downloadDocs.value   =  [];
        numFound.value       =  0;
        loading.value        =  false;
        isGeneric.value      =  true;
        schemaFields.value   =  [];
    };

    const formatString = (text) => {
        if(!text)
            return;
            
        if(text.startsWith('http')){
            if(text.length > 35)
                return `<a target="_blank" href="${text}">${text.substr(0, 35)}...</a>`
            
            return `<a target="_blank" href="${text}">${text}...</a>`
        }

        if(text.length > 50 && !text.startsWith('<a'))
            return text.substr(0, 50)+'...';

        return text;
    }
</script>


<style>
    
    .radio label{
        padding:20px;
    }
    .radio-inline{
        display: inline-block !important;
    }    
    .modal-body {
      background: #fff;
    }
    #datatable .tableexport-caption{
        display: none!important;
    }
    /* replace template.css property */
    #government {
        float: left;
    }
    .custom-fields-modal-body {
    height: 25rem; /* Fix the height in rem */
    overflow-y: auto; /* Allow scrolling only when content overflows */
    }
        
</style>