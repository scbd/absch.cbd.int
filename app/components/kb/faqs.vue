<template>
    <div class="col-lg-8">
        <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@24.0.0/build/ckeditor.css">
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
        <div class="categories-list mt-0 kb-faq" v-if="!loading">
            <h3>{{ $t("faqs") }}</h3>
            <main>
                <details v-for="article in articles">
                    <summary>{{article.title[$locale]}}</summary>
                    <div class="faq-content">
                        <div  class="full-details ck ck-content ck-rounded-corners ck-blurred" v-html="article.content[$locale]"></div>
                    </div>
                </details>
            </main>

        </div>

            <div v-if="articlesCount>10">
                <global-pagination :items="10" :tag-count="articlesCount" @changePage="onChangePage"></global-pagination>
            </div>
        </div>
</template>
<script>

	import i18n from '../../locales/en/components/kb-group';
	import globalPagination from './pagination.vue';
	import ArticlesApi from './article-api';

	export default {
		components:{
			globalPagination
		},
		props:{
		},
		created(){
			this.articlesApi = new ArticlesApi();
		},
		mounted() {
		    this.getArticlesCount();
		},
		data:  () => {
			return {
				articles: [],
				loading: true,
				articlesCount:0,
			}
		},
		methods: {
			onChangePage(offset) {
				this.article=[];
				this.loading = true;
				this.loadArticles((offset-1)*10);
			},
			async getArticlesCount(){
				let count = [];
				count.push({"$match":{"$and":[{"adminTags":encodeURIComponent('faq')}]}});
				count.push({ "$count" : 'count' });
				const query = {
					"ag" : JSON.stringify(count)
				};
				const articleCount = await this.articlesApi.queryArticles(query);
				if (articleCount?.length) {
					this.articlesCount = articleCount[0].count;
					await this.loadArticles(0);
				}
				else{
					this.articlesCount = 0;
					this.loading = false;
					return false;
				}
			},
			async loadArticles(offset){
				let ag = [];
				ag.push({"$match":{"$and":[{"adminTags":encodeURIComponent('faq')}]}});
				ag.push({"$project": {[`title.${this.$locale}`]: 1,[`content.${this.$locale}`]: 1, "adminTags": 1,"meta.modifiedOn":1}});
				ag.push({"$sort" : {"meta.modifiedOn":-1}});
				ag.push({"$limit" : (offset+10)});
				ag.push({"$skip" : offset});

				const query = {
					"ag" : JSON.stringify(ag)
				};
				const articlesList = await this.articlesApi.queryArticles(query);
				if((articlesList || []).length) {
					this.articles =  articlesList;
				}
				this.loading = false;

			},
		},
		i18n: { messages:{ en: i18n }}
	}
</script>
