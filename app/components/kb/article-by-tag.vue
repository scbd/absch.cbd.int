<template>
    <div class="row">
        <div class="col-lg-8">
            <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
            <div class="row match-height" v-if="!loading">
                <div class="categories-list tag" v-if="articles">
                    <h2>{{tag}}&nbsp;<span><small>({{articlesCount}})</small></span></h2>
                    <div class="kb-listing">
                        <ul v-for="title in articles">
                            <li>
                                <a href="#" @click="goToArticle(title._id,title.title[$locale])">&nbsp;{{title.title[$locale]}}</a>
                                <div class="date-sec">
                                    <div class="inner-area"><i class="fa fa-calendar" aria-hidden="true"></i> {{title.meta.modifiedOn|dateFormate}}</div>
                                    <div class="inner-area"><i class="fa fa-tag" aria-hidden="true"></i>&nbsp  <a href="#" class="btn btn-mini" v-for="tag in title.adminTags">{{tag}}</a></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div v-if="articlesCount>10">
                <global-pagination :items="10" :tag-count="articlesCount" @changePage="onChangePage"></global-pagination>
            </div>
            <div v-if="articlesCount<1 && !loading">
                <p>{{ $t("noResultFound") }}</p>
            </div>
        </div>
        <div class="col-lg-4">
            <div v-if="tag">
                <relevant-articles :tag="tag"></relevant-articles>
            </div>
            <div>
                <popular-tags></popular-tags>
            </div>
        </div>
    </div>
</template>
<script>

	import i18n from '../../locales/en/components/kb/categories-group';
	import globalPagination from './pagination.vue';
	import relevantArticles from "./relevant-articles.vue";
	import ArticlesApi from './article-api';
	import {formatDateWithUtc} from './filters';
	import popularTags from './popular-tags.vue';

	export default {
		components:{
			relevantArticles,
			globalPagination,
			popularTags
		},
		props:{
		},
		created(){
			this.articlesApi = new ArticlesApi();
		},
		mounted() {
			const tag = (this.$route.params.tag).replace(/"/g, "");
			if(tag != undefined && tag != null) {
				this.tag = tag;
				this.getArticlesCount(tag);
			}
		},
		data:  () => {
			return {
				articles: [],
				loading: true,
				articlesCount:0,
			}
		},
		filters: {
			dateFormate: function ( date ) {
				return formatDateWithUtc(date)
			}
		},
		methods: {
			goToArticle(id,title){
				const url = title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
				this.$router.push({path:`/kb/articles/${id}/${url}/${this.tag}`});
			},
			onChangePage(offset) {
				this.article=[];
				this.loading = true;
				this.loadArticles((offset-1)*10, this.tag);
			},
			async getArticlesCount(tag){
				let count = [];
				count.push({"$match":{"$and":[{"adminTags":encodeURIComponent(tag)}]}});
				count.push({ "$count" : 'count' });
				const query = {
					"ag" : JSON.stringify(count)
				};
				const articleCount = await this.articlesApi.queryArticles(query);
				if (articleCount?.length) {
					this.articlesCount = articleCount[0].count;
					await this.loadArticles(0, tag);
				}
				else{
					this.articlesCount = 0;
					this.loading = false;
					return false;
				}
			},
			async loadArticles(offset, tag){
				let ag = [];
				ag.push({"$match":{"$and":[{"adminTags":encodeURIComponent(tag)}]}});
				ag.push({"$project": {[`title.${this.$locale}`]: 1, "adminTags": 1,"meta.modifiedOn":1}});
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
