<template>
    <div class="widget fix widget_categories mt-2 right-side-articles">
        <h4>
            <span v-if="type != 'faq' &&  type != 'help'">{{ $t("relevantArticles") }}</span>
            <span v-if="type == 'faq'">{{ $t("faqs") }}</span>
            <span v-if="type == 'help'">{{ $t("gettingHelp") }}</span>
        </h4>
        <hr>
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
        <ul>
            <li v-for="article in articles">
                <a style="display:none" :href="`${articleUrl(article)}`">{{article.title[$locale]}}</a>
                                <a href="#" @click="goToArticle(article)">{{article.title[$locale]}}</a>
            </li>
        </ul>
        <div v-if="type == 'faq'" class="view-more">
        	<a href="#" @click="goToFaq()">+  {{ $t("viewMore") }}</a>
		</div>
    </div>
</template>

<script>
import ArticlesApi from './article-api';
  import i18n from '../../locales/en/components/kb.json';
  import CategoriesGroup from './article-categories.vue';

export default {
    name:'kbRelevantArticles',
    components:{
        CategoriesGroup
    },
    props:{
        tag:  String,
        type: String,
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
        let adminTagsList = [this.$realm.is('BCH') ? 'bch' : 'abs', encodeURIComponent(this.tag)];
        if(this.type == "help"){
            adminTagsList = ['getting-help'];
        }
        if(this.type == "faq"){
            adminTagsList = [this.$realm.is('BCH') ? 'bch' : 'abs', 'faq'];
        }
        let ag = [];
        ag.push({"$match":{"$and":[{"adminTags": { $all : adminTagsList}}]}});
        ag.push({"$project" : {[`title.${this.$locale}`]:1}});
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
			articleUrl(article,tag){
				const urlTitle = article.title[this.$locale].replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
				return `/kb/tags/${encodeURIComponent(this.tag)}/${encodeURIComponent(urlTitle)}/${encodeURIComponent(article._id)}`
			},
			goToArticle(article){
                if(this.type == "help" || this.type =="faq"){
                    const url = article.title[this.$locale].replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
				    this.$router.push({path:`/kb/articles/${article._id}/${url}/bch`});
                } else {
                    this.$router.push({
                        path:this.articleUrl(article)
                    });
                }
            },
            goToFaq(category){
				this.$router.push({path:`/kb/faqs`});
			},
    },
    i18n: { messages:{ en: i18n }}
}
</script>
