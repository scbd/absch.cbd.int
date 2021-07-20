<template>
    <div class="sidebar">
        <div class="widget fix widget_categories mt-2">
            <span class="icon icon-folder"></span>
            <h4>{{ $t("relevantArticles") }}</h4>
            <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
            <ul v-for="title in articles">
                <li><a href="#" @click="goToArticle(title._id,title.title[$locale])">{{title.title[$locale]}}</a></li>
            </ul>
            <div v-if="articles.length<1 && !loading" class="alert alert-warning">
                <strong>{{ $t("noResultFound") }}</strong>
            </div>
        </div>
    </div>
</template>

<script>
import ArticlesApi from './article-api';
  import i18n from '../../locales/en/components/kb-group';
  import CategoriesGroup from './categories-group.vue';

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
        let agLimit = [];
        ag.push({"$match":{"$and":[{"adminTags":encodeURIComponent(this.tag)}]}});
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
        goToArticle(id,title){
            const url = title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
            this.$router.push({path:`/kb/articles/${id}/${url}/${this.tag}`});
        },
    },
    i18n: { messages:{ en: i18n }}
}
</script>
