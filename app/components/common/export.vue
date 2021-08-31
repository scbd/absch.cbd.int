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

	export default {
		props:['getDownloadRecords'],
		data:  () => {
			return {
				records: [],
                numFound:0,
				loading: true,
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
			showExportDialog() {

                this.getDownloadRecords({fields:['title'], listType:'initial'});

                this.dialogService.open({ 
                    name     : 'exportDialog',
                    plain: true,
                    template : exportDialogtemplate,
                    scope: {               
                        closeDialog : this.closeDialog,
                        exportRecords : this.exportRecords
                    }
                });
            },
            closeDialog(){
                this.dialogService.close();
            },
            exportRecords(){
                console.log('export records', this)
                 var val = this.getDownloadRecords({fields:['title'], listType:'all'});
                 console.log(val);
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