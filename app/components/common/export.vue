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
                            <div class="col-6">
                                <div class="form-group color-black">
                                    {{t('downloadFormat')}}
                                    <span class="radio" style="display: initial;">
                                        <!-- <label class="radio-inline"><input type="radio" name="downloadFormatOption" value="xls"  v-model="downloadFormat" />{{$t('xls')}}</label>                    -->
                                        <label class="radio-inline"><input type="radio" name="downloadFormatOption" value="xlsx" v-model="downloadFormat" /> {{t('xlsx')}}</label>                   
                                        <label class="radio-inline"><input type="radio" name="downloadFormatOption" value="csv"  v-model="downloadFormat" /> {{t('csv')}}</label>
                                    </span>
                                </div>
                            </div>
                            <div class="col-6">
                                <span class="float-end" style="padding-top: 20px;">
                                    {{t('recordsFound')}}: <strong>{{numFound}}</strong>
                                </span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div v-if="loading" class="alert alert-info">
                                    <i class="fa fa-spin fa-spinner" v-if="loading" ></i> {{t('processing')}}
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
                                                            <!-- <a rel="noopener" target="_blank" :href="`database/${$options.filters.encodeURIComponent($options.filters.capitalize((row.rec_uniqueIdentifier||'')))}`"> -->
                                                                <!-- ToDo: ?? -->
                                                            <a v-if="row.rec_uniqueIdentifier" rel="noopener" target="_blank" :href="`database/${(row.rec_uniqueIdentifier).toUpperCase()}`">
                                                                {{ (row.rec_uniqueIdentifier).toUpperCase() }}
                                                            </a>
                                                        </td>
                                                        <td class="tableexport-string">{{row.rec_government}}</td>
                                                        <td class="tableexport-string">{{row.rec_title}}</td>
                                                        <td class="tableexport-string">{{(row.rec_meta1||[]).join(', ')}}</td>
                                                        <td class="tableexport-string">{{(row.rec_meta2||[]).join(', ')}}</td>
                                                        <td class="tableexport-string">{{(row.rec_meta3||[]).join(', ')}}</td>
                                                        <td class="tableexport-string">{{(row.rec_meta4||[]).join(', ')}}</td>  
                                                        <td class="tableexport-string">{{row.rec_date|formatDate}}</td>                          
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
                                                        <td v-for="(field, key) in schemaFields" :key="index">
                                                            <span v-if="typeof row[key] == 'string'">
                                                            <span v-html="formatString(row[key])"></span>
                                                            </span>
                                                            <span v-if="Array.isArray(row[key])">
                                                                <ul class="p-0 list-inline">
                                                                    <li v-for="item in row[key]">
                                                                        <span v-html="formatString(item)"></span>
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
                    <div class="modal-footer ">
                        <button type="button" class="btn btn-secondary float-end" aria-label="Close" @click="closeDialog()" :disabled="loading">{{t('cancel')}}</button>
                        <button type="button" class="btn btn-primary float-start" aria-label="Download" @click="exportRecords(downloadFormat)" :disabled="loading" id="downloadDataFile">
                            {{t('download')}}
                        </button>    
                    </div>
                </div>
            </div>
        </div>
    </span>   
</template>

<script setup>
    import { ref, onMounted, inject } from "vue";
    import { Modal } from "bootstrap";
    import '../kb/filters';
    import { useRealm } from '../../services/composables/realm.js';
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/export.json';
    const { t } = useI18n({ messages });
    const realm = useRealm();
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
    const exportModal = ref(null);
    const downloadDocs =ref([]);
    const numFound = ref(0);
    const loading = ref(false);
    const isGeneric = ref(true);
    const schemaFields = ref([]);
    let schema = undefined ;
    let modal = null;
    const downloadFormat  = ref('xlsx');
    const getDownloadRecords = inject('getDownloadRecords');

    onMounted( async ()=>{
        modal = new Modal(exportModal.value)
    })

    const props = defineProps({
        fileName: {type: String},
    })

    const openDialog = async () => {
                modal.show('static');
                loading.value = true; 
                try{
                        console.log('getDownloadRecords', typeof getDownloadRecords) // type of getDownloadRecords object, it should be function.
                        const responseData = await getDownloadRecords({fields, listType:'initial', format:'json'});
                        downloadDocs.value = responseData.docs
                        numFound.value     = responseData.numFound;
                        isGeneric.value    = responseData.isGeneric;
                        schemaFields.value = responseData.schemaFields;
                        schema             = responseData.schema;             
                }
                finally{
                    loading.value = false;
                }
    }
    const exportRecords = async () => {
                let info = undefined;
                
                loading.value      = true; 
                let fileName    = props.fileName||`${realm.uIdPrefix}-${schema}-${new Date().getTime().toString(36)}.${downloadFormat.value}`

                try{
                    if(isGeneric){
                        await import('tableexport');
                        info        = await getDownloadRecords({fields, listType:'all', fileName, format : downloadFormat.value});
                        downloadDocs.value = info.docs;
                        numFound.value     = info.numFound;
                        setTimeout(()=>{
                            $('#datatable').tableExport({
                                formats: ["xlsx", "xls", "csv"],
                                filename: fileName,
                            });
                            $(`.${downloadFormat.value}`).click(); 

                            downloadDocs.value = downloadDocs.slice(0, 24);
                        }, 500);
                    }
                    else{
                         info = await getDownloadRecords({fields, listType:'all', fileName, format : downloadFormat.value});
                    }
                }
                catch(e){
                    console.error(e)
                }
                finally{
                    loading.value = false;
                }
                
            };
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
        
</style>