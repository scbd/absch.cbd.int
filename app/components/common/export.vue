<template>
    <a rel="noopener" href="#" class="table-export" @click="showExportDialog()">
        Export
        <i class="fa fa-download" aria-hidden="true"></i> 
    </a>
</template>

<script>
	import i18n from '../../locales/en/components/kb.json';
	// import ArticlesApi from './article-api';
	// import {formatDate} from './filters';
    import exportDialogtemplate from './export-dialog-template.html';
    import exportTable from './export-table.vue';
	export default {
		props:['getDownloadRecords', 'fileName'],
		data:  () => {
			return {
				records: [],
                numFound:0
			}
		},
		created(){
			// this.articlesApi = new ArticlesApi();
		},
		async mounted() {},
		filters: {
			dateFormate: function ( date ) {
				return formatDate(date)
			}
		},
		methods: {
			async showExportDialog() {

                const getDownloadRecords = this.getDownloadRecords;
                const closeDialog        = this.closeDialog
                const dialog = this.dialogService.open({ 
                    name     : 'exportDialog',
                    plain: true,
                    template : exportDialogtemplate,
                    scope: {               
                        downloadDocs  : [],//docs,
                        downloadFormat : 'xlsx',
                        loading         : false,
                        tableComponentOptions : {
                            components:{exportTable}
                        },
                        closeDialog         : closeDialog,
                        getDownloadRecords  : getDownloadRecords
                    }
                });
            },
            closeDialog(){
                this.dialogService.close();
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
    
    .ngdialog-theme-default.wide .ngdialog-content{
        min-width:70% !important;
    }
    .modal-body{background-color:#FFF;}
    #datatable .tableexport-caption{
        display: none!important;
    } 
        
</style>