<template>
   <div>
        <div class="modal-header">
            <h3 class="modal-title">
                Export search 
            </h3>
        </div>
        <div class="modal-body" v-disabled="forTour">		
            
            <div class="form-group">
                    Download Format :
                    <span class="radio" style="display: initial;">
                        <label class="radio-inline"><input type="radio" name="downloadFormatOption" value="xls"  v-model="downloadFormat">XLS (Excel)</label>                   
                        <label class="radio-inline"><input type="radio" name="downloadFormatOption" value="xlsx" v-model="downloadFormat">XLSX (Excel)</label>                   
                        <label class="radio-inline"><input type="radio" name="downloadFormatOption" value="csv"  v-model="downloadFormat">CSV (comma separated values)</label>
                    </span>
            </div>
            <div v-if="loading" class="alert alert-info">
                <i class="fa fa-spin fa-spinner" v-if="loading" ></i> Processing...
            </div>
            <div id="divTable"  style="max-height:300px;overflow:scroll; ">
                    <div>
                        Records found :
                        {{numFound}}
                    </div>

                    <table id="datatable" class="table table-striped table-bordered table-condensed">
                        <thead> 
                            <tr>
                                <th class="tableexport-string">Type</th>
                                <th class="tableexport-string">UID</th>
                                <th class="tableexport-string">Government</th>
                                <th class="tableexport-string" style="max-width:30%">Title </th>
                                <th style="white-space:nowrap;" class="tableexport-string">Info 1 </th>
                                <th style="white-space:nowrap;" class="tableexport-string">Info 2 </th>
                                <th style="white-space:nowrap;" class="tableexport-string">Info 3 </th>
                                <th style="white-space:nowrap;" class="tableexport-string">Info 4 </th>
                                <th style="white-space:nowrap;" class="tableexport-string">Published on</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, index) in downloadDocs" :key="index">
                                
                                <td class="tableexport-string">{{row.rec_schema}}</td>
                                <td class="tableexport-string">
                                    <a rel="noopener" target="_blank" :href="`/database/${$options.filters.encodeURIComponent($options.filters.capitalize((row.rec_uniqueIdentifier||'')))}`">
                                        {{(row.rec_uniqueIdentifier||'')|capitalize}}
                                    </a>
                                </td>
                                <td class="tableexport-string">{{row.rec_government}}</td>
                                <td class="tableexport-string">{{row.rec_title}}</td>
                                <td class="tableexport-string">{{(row.rec_meta1||[]).join(', ')}}</td>
                                <td class="tableexport-string">{{(row.rec_meta2||[]).join(', ')}}</td>
                                <td class="tableexport-string">{{(row.rec_meta3||[]).join(', ')}}</td>
                                <td class="tableexport-string">{{(row.rec_meta4||[]).join(', ')}}</td>  
                                <td class="tableexport-string">{{row.rec_date|dateFormat}}</td>                          
                            </tr>
                        </tbody>
                    </table>
                <h3 class="color-red bold">This is only sample of the information to be exported. All records retrieved by this search will be included in the export.</h3>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" aria-label="Close" @click="closeExportDialog()" :disabled="loading">Cancel</button>
            <button type="button" class="btn btn-primary pull-left" aria-label="Download" @click="exportRecords(downloadFormat)" :disabled="loading" id="downloadDataFile">
                Download
            </button>    
        </div>
   </div>
</template>

<script>
	import i18n from '../../locales/en/components/kb.json';
	// import ArticlesApi from './article-api';
	import { formatDate } from '../kb/filters';
    const fields = [
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
		props:['getDownloadRecords', 'closeDialog', 'fileName'],
		data:  () => {
			return {
				downloadDocs  : [],
				numFound      : 0,
				downloadFormat: 'xlsx',
				loading       : false
			}
		},
		created(){
			// this.articlesApi = new ArticlesApi();
		},
		async mounted() {
            const {docs, numFound } = await this.getDownloadRecords({fields, listType:'initial'});
                  this.downloadDocs = docs
                  this.numFound     = numFound;
        },
		filters: {
			dateFormat: function ( date ) {
				return formatDate(date)
			}
		},
		methods: {
			
            async exportRecords(){
                
                this.loading      = true; 
                const fileName    = this.fileName||`${this.$realm.uIdPrefix}-data`;
                                    await import('tableexport');
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
                    this.loading = false;
                }, 500);
                
            },
            closeExportDialog(){
                this.closeDialog();
            }
		},
        computed:{
            
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
    .ngdialog.ngdialog-theme-default .ngdialog-content{padding:0;}
    
    .ngdialog-theme-default.wide .ngdialog-content{
        min-width:70% !important;
    }
    .modal-body{background-color:#FFF;}
    #datatable .tableexport-caption{
        display: none!important;
    } 
        
</style>