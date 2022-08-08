<template>
    <span>
        <a rel="noopener" href="#" class="table-export-button text-decoration-none" @click="open=true">
            <i class="fa fa-download" aria-hidden="true"></i> 
            {{$t('exportButton')}}
        </a>
        <modal v-model="open" v-bind:class="{ 'show': open}" size="lg" @show="onShowDialog" ref="modal" id="export-modal">
           <div slot="header">
                <h3 class="modal-title">
                    {{$t('dialogTitle')}}
                </h3>
            </div>
            <div>
                <div class="form-group">
                        {{$t('downloadFormat')}}
                        <span class="radio" style="display: initial;">
                            <label class="radio-inline"><input type="radio" name="downloadFormatOption" value="xls"  v-model="downloadFormat" />{{$t('xls')}}</label>                   
                            <label class="radio-inline"><input type="radio" name="downloadFormatOption" value="xlsx" v-model="downloadFormat" />{{$t('xlsx')}}</label>                   
                            <label class="radio-inline"><input type="radio" name="downloadFormatOption" value="csv"  v-model="downloadFormat" />{{$t('csv')}}</label>
                        </span>
                </div>
                <div v-if="loading" class="alert alert-info">
                    <i class="fa fa-spin fa-spinner" v-if="loading" ></i> {{$t('processing')}}
                </div>
                <div id="divTable"  style="max-height:300px;overflow:scroll; ">
                        <div>
                            {{$t('recordsFound')}}
                            {{numFound}}
                        </div>

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
                    <h3 class="color-red bold">{{$t('sampleMessage')}}</h3>
                </div>
            </div>
            <div slot="footer">
                <button type="button" class="btn btn-default float-end" aria-label="Close" @click="closeDialog()" :disabled="loading">{{$t('cancel')}}</button>
                <button type="button" class="btn btn-primary float-start" aria-label="Download" @click="exportRecords(downloadFormat)" :disabled="loading" id="downloadDataFile">
                    {{$t('download')}}
                </button>    
            </div>
        </modal>
    </span>   
</template>

<script>
	import i18n from '../../app-text/components/export.json';
	import '../kb/filters';
    
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
    var Modal = {};
	export default {
        components : {Modal},
		props:['getDownloadRecords', 'fileName'],
		data:  () => {
			return {
				downloadDocs  : [],
				numFound      : 0,
				downloadFormat: 'xlsx',
				loading       : false,
                open: false
			}
		},
		created(){
			// this.articlesApi = new ArticlesApi();
		},
		async mounted() {
        },
		
		methods: {
            async onShowDialog(){
                 const {docs, numFound } = await this.getDownloadRecords({fields, listType:'initial'});
                this.downloadDocs = docs
                this.numFound     = numFound;
            },
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
            closeDialog(){
                this.open = false;
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
    .ngdialog.ngdialog-theme-default .ngdialog-content{padding:0;}
    
    .modal-content{
        color: black;
    }
    #datatable .tableexport-caption{
        display: none!important;
    } 
    .modal-content .modal-footer {
        display: block;
    }
        
</style>