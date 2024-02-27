<template>
    <span>
        <a rel="noopener" href="#" class="table-export-button text-decoration-none" @click="openDialog">
            <i class="fa fa-download" aria-hidden="true"></i> 
            {{$t('exportButton')}}
        </a>
        <div class="modal fade" ref="exportModal" data-backdrop="static"  tabindex="-1" aria-hidden="true" id="export-modal">      
            <div class="modal-dialog modal-xl modal-dialog-centered"  role="document">
                <div class="modal-content">
                    <div class="modal-header color-black">
                        <h5 class="modal-title">
                            {{$t('dialogTitle')}}
                        </h5>
                        <button type="button" class="border-0 close" @click="closeDialog()" aria-label="Close" ><i class="bi bi-x-circle-fill icon-lg"></i></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="alert alert-info">
                                    {{$t('exportInformation')}}
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-9">
                                <div class="form-group color-black">
                                    {{$t('downloadFormat')}}
                                    <span class="radio" style="display: initial;">
                                        <!-- <label class="radio-inline"><input type="radio" name="downloadFormatOption" value="xls"  v-model="downloadFormat" />{{$t('xls')}}</label>                    -->
                                        <label class="radio-inline"><input type="radio" name="downloadFormatOption" value="xlsx" v-model="downloadFormat" /> {{$t('xlsx')}}</label>                   
                                        <label class="radio-inline"><input type="radio" name="downloadFormatOption" value="csv"  v-model="downloadFormat" /> {{$t('csv')}}</label>
                                        <button v-if="!isGeneric" @click="openModal" class="btn btn-primary">Customize fields</button>
                                    </span>                        
                                </div> 
                                <div v-if="!isGeneric">
                                <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="customizedFieldsModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered modal-lg">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="customizedFieldsModalLabel">Select customized fields</h5>
                                                <button type="button" data-bs-dismiss="modal" class="border-0 close" @click="closeModal()"
                                                    aria-label="Close"><i class="bi bi-x-circle-fill icon-lg"></i></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="d-flex align-items-center float-end mb-3">
                                                    <label class="text-sm">
                                                        <input type="checkbox" @click="selectAll" v-model="selectAllCheckbox"> Select All
                                                    </label>
                                                    <a @click="clearAll" class="btn btn-link btn-sm">
                                                        <i class="bi bi-x"></i> Clear All
                                                    </a>
                                                </div>
                                                <div v-for="(value, key) in optionFields" :key="key" v-if="value !== undefined" class="form-check">
                                                    <input type="checkbox" :id="key" :value="key" v-model="selectedFields" class="form-check-input">
                                                    <label :for="key" class="form-check-label">{{ value }}</label>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-primary" @click="updateFields">{{$t('apply')}}</button>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>           
                            </div>
                           
                            <div class="col-3">
                                <span class="float-end" style="padding-top: 20px;">
                                    {{$t('recordsFound')}}: <strong>{{numFound}}</strong>
                                </span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div v-if="loading" class="alert alert-info">
                                    <i class="fa fa-spin fa-spinner" v-if="loading" ></i> {{$t('processing')}}
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
                                                        <th class="tableexport-string">{{$t('type')}}</th>
                                                        <th class="tableexport-string">{{$t('uid')}}</th>
                                                        <th class="tableexport-string">{{$t('government')}}</th>
                                                        <th class="tableexport-string" style="max-width:30%">{{$t('title')}} </th>
                                                        <th style="white-space:nowrap;" class="tableexport-string">{{$t('info1')}} </th>
                                                        <th style="white-space:nowrap;" class="tableexport-string">{{$t('info2')}} </th>
                                                        <th style="white-space:nowrap;" class="tableexport-string">{{$t('info3')}} </th>
                                                        <th style="white-space:nowrap;" class="tableexport-string">{{$t('info4')}} </th>
                                                        <th style="white-space:nowrap;" class="tableexport-string">{{$t('publishedDate')}}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(row, index) in downloadDocs" :key="index">
                                                        
                                                        <td class="tableexport-string">{{row.rec_schema}}</td>
                                                        <td class="tableexport-string">
                                                            <a rel="noopener" target="_blank" :href="`database/${$options.filters.encodeURIComponent($options.filters.capitalize((row.rec_uniqueIdentifier||'')))}`">
                                                                {{(row.rec_uniqueIdentifier||'')|capitalize}}
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
                                    
                                    <h3 class="color-red bold" v-if="!loading">{{$t('sampleMessage')}}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer ">
                        <button type="button" class="btn btn-secondary float-end" aria-label="Close" @click="closeDialog()" :disabled="loading">{{$t('cancel')}}</button>
                        <button type="button" class="btn btn-primary float-start" aria-label="Download" @click="exportRecords(downloadFormat)" :disabled="loading" id="downloadDataFile">
                            {{$t('download')}}
                        </button>    
                    </div>
                </div>
            </div>
        </div>
    </span>   
</template>

<script>
import i18n from '../../app-text/components/export.json';
import { Modal } from "bootstrap";
import '../kb/filters';
    
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
    ]
	export default {
        components : { Modal },
		props:['getDownloadRecords', 'fileName'],
		data:  () => {
			return {
                modal: null,
				downloadDocs  : [],
				numFound      : 0,
				downloadFormat: 'xlsx',
				loading       : false,
                isGeneric     : true,
                schemaFields  : [],  
                schema        : undefined,
                selectAllCheckbox: false,
                optionFields :  {},
                selectedFields: []
			}
		},
		created(){
			// this.articlesApi = new ArticlesApi();
		},
		async mounted() {
            this.modal = new Modal(this.$refs.exportModal);
        },
		
		methods: {
            openModal() 
            { 
                $('#myModal').modal('show');
            },
            closeModal() { 
                $('#myModal').modal('hide');
            },
            selectAll() {
                this.selectedFields = Object.keys(this.optionFields);
            },
            clearAll() { 
            },
            updateFields() {
                if(this.selectedFields && this.selectedFields.length>0) { 
                    let uiFields = {};
                    this.selectedFields.forEach((field) => {
                    if (this.optionFields[field] !== undefined)
                        uiFields[field] = this.optionFields[field];
                    });
                    this.schemaFields = uiFields;  
                    this.closeModal();
                }
            }, 
            // updateFields(){
            //     let uiFields = {};
            //     this.selectedFields.forEach((field) => {
            //         if (this.optionFields[field] !== undefined)
            //             uiFields[field] = this.optionFields[field]; //Select only selected
            //         });
            //     this.schemaFields = uiFields;     // to update UI in dialog     
            // },
            async openDialog(){
                this.modal.show('static');
                this.loading      = true; 
                fields =    [
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
            try{
                    this.selectedFields = [];
                    this.selectAllCheckbox = false;
                    this.schemaFields = [];
                    const {docs, numFound, isGeneric, schemaFields,schema } = await this.getDownloadRecords({fields, listType:'initial', format:'json'});
                    this.downloadDocs = docs
                    this.numFound     = numFound;
                    this.isGeneric    = isGeneric;
                    this.schemaFields = schemaFields;
                    this.optionFields = schemaFields; // to show fields options in dialog 
                    this.schema       = schema;                   
                }
                finally{
                    this.loading = false;
                }
            },
			async exportRecords(){
                
                this.loading      = true; 
                const fileName    = this.fileName||`${this.$realm.uIdPrefix}-${this.schema}-${new Date().getTime().toString(36)}.${this.downloadFormat}`

                try{
                    if(this.isGeneric){
                                            await import('tableexport');
                                            //ToDo: await this.getDownloadRecords({fields:[this.schemaFields], listType:'all'});
                        const info        = await this.getDownloadRecords({fields, listType:'all'});
                        this.downloadDocs = info.docs;
                        this.numFound     = info.numFound;
                        setTimeout(()=>{
                            $('#datatable').tableExport({
                                formats: ["xlsx", "xls", "csv"],
                                filename: fileName,
                            });
                            $(`.${this.downloadFormat}`).click(); 

                            this.downloadDocs = this.downloadDocs.slice(0, 24);
                        }, 500);
                    }
                    else{
                        fields  = this.schemaFields ;
                        const info = await this.getDownloadRecords({fields, listType:'all', fileName, format : this.downloadFormat});
                    }
                }
                catch(e){
                    console.error(e)
                }
                finally{
                    this.loading = false;
                }
                
            },
            closeDialog(){
                this.modal.hide();
                this.downloadDocs   =  [];
				this.numFound       =  0;
				this.loading        =  false;
                this.isGeneric      =  true;
                this.schemaFields   =  [];
            },
            formatString(text){
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
		},
		i18n: { messages:{ en: i18n }} 
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