<template>
    <div class="sidebar">
        <div class="widget fix widget_categories mt-2 right-side-articles">
            <span class="icon icon-folder"></span>
            <h4>{{ $t("relevantArticles") }}</h4>
            <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
            <ul>
                <li v-for="article in articles">
                  <a style="display:none" :href="`${articleUrl(article)}`">{{article.title[$locale]}}</a>
							    <a href="#" @click="goToArticle(article)">{{article.title[$locale]}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import ArticlesApi from './article-api';
import i18n from '../../locales/en/components/kb.json';
import CategoriesGroup from './article-categories.vue';

export default {
    components:{
        CategoriesGroup
    },
    props:{
        tag:String
    },
    data:  () => {
        return {
            articles: [],
            loading: true
        }
    },
    created(){
        this.articlesApi = new ArticlesApi();
    },
    async mounted() {
        let ag = [];
        ag.push({"$match":{"$and":[{"adminTags": { $all : [this.$realm.is('BCH') ? 'bch' : 'abs', encodeURIComponent(this.tag) ]}}]}});
        ag.push({"$project" : {[`title.${this.$locale}`]:1, _id:1}});
        ag.push({"$limit" : 10});
        const query = {
            "ag" : JSON.stringify(ag)
        };
        const articlesList = await this.articlesApi.queryArticles(query);
        if((articlesList || []).length) {
            this.articles =  articlesList;
        }
        this.loading = false;
    },
    methods: {
			articleUrl(article,){
				const urlTitle = article.title[this.$locale].replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
				return `/kb/tags/${encodeURIComponent(this.tag)}/${encodeURIComponent(urlTitle)}/${encodeURIComponent(article._id)}`
			},
			goToArticle(article, tag){
				this.$router.push({
					path:this.articleUrl(article, tag)
				});
			},
    },
    i18n: { messages:{ en: i18n }}
}
</script>
