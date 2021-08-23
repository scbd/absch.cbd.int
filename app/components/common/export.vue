<template>
    <div class="row table-export">
       
        <sui-button @click.native="toggle">Export</sui-button>
        <sui-modal v-model="open" class="sui-modal">
            <sui-modal-header>Export</sui-modal-header>
            <sui-modal-content>
                
            </sui-modal-content>
            <sui-modal-actions>
                <sui-button positive @click.native="toggle">
                OK
                </sui-button>
            </sui-modal-actions>
        </sui-modal>
    </div>
</template>

<script>
    import semanticUiVue from 'semantic-ui-vue';
	import i18n from '../../locales/en/components/kb.json';
	// import ArticlesApi from './article-api';
	// import {formatDate} from './filters';
    Vue.use(semanticUiVue);
	export default {
		components: {            
        },
		props:{
		},
		data:  () => {
			return {
				arrecords: [],
				loading: true,
                open: false 
			}
		},
		created(){
			// this.articlesApi = new ArticlesApi();
		},
		async mounted() {
			
		},
		filters: {
			dateFormate: function ( date ) {
				return formatDate(date)
			}
		},
		methods: {
			toggle() {
            this.open = !this.open;
            },
		},
		i18n: { messages:{ en: i18n }} 
	}
</script>

<style>
    /* @import url(https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css); */
    .table-export .sui-modal .modal{
        top: unset!important;
        right: unset!important;
        bottom: unset!important;
        left: unset!important;
        overflow: unset!important;
         outline: unset!important;
    }
</style>