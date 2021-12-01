<template>
    <div class="latest-faq">
        <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@24.0.0/build/ckeditor.css">
				   <h4>FAQs</h4>
						<hr>
						<div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
						<ul v-for="title in help">
								<li><a href="#" @click="goToArticle(title._id,title.title|lstring($locale))">{{title.title|lstring($locale)}}</a></li>
						</ul>
						<div class="view-more">
            				<a href="#" @click="goToFaq()">+  {{ $t("viewMore") }}</a>
						</div>
    </div>
</template>
<script>

	import i18n from '../../locales/en/components/kb.json';
	import ArticlesApi from './article-api';

	export default {
		name:'kbLatestFaqs',
		props:{
		},
		created(){
	
			this.articlesApi = new ArticlesApi();
		},
		mounted() {
		    this.loadHelp();
		},
		data:  () => {
			return {
				help: [],
				loading: true,
			}
		},
		methods: {
			goToArticle(id,title){
				const url = title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
				this.$router.push({path:`/kb/articles/${id}/${url}/bch`});
			},

			goToFaq(category){
				this.$router.push({path:`/kb/faqs`});
			},
		
			async loadHelp(){
				
				this.help = [];

				const q = { 
					$and : [
						{ adminTags : { $all : [this.$realm.is('BCH') ? 'bch' : 'abs', 'faq' ]}},
						{ adminTags : { $all : ['faq']} }
					]
				};

				const f = { 
					[`title`]	: 1,
					[`content`]	: 1,
					adminTags : 1, _id:1
				} ;
				const groupTags = JSON.stringify(['faq']);
				const groupSort  = { "meta.modifiedOn":-1 };
		  	const groupLimit = 6;

        try {
            const result = await this.articlesApi.queryArticleGroup('adminTags', {
              q,
              f,
              groupLimit,
              groupSort,
              groupTags
            });
            if (result?.length) {

              result.forEach(element => {
                this.help = [...this.help, ...element.articles];
              });
            }
        }
        catch(e) {
            console.error(e);
        }
        finally {
            this.loading = false;
        }
			},
		},
		i18n: { messages:{ en: i18n }}
	}
</script>
