<template>
    <div class="sidebar" style="margin-top: 40px">
        <div class="widget fix widget_categories mt-2">
            <span class="icon icon-folder"></span>
            <h4>Relevant Articles</h4>
            <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> loading...</div>
            <ul v-for="title in articles">
                <li><a href="#" @click="goToArticle(title._id,title.title[locale])">{{title.title[locale]}}</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import ArticlesApi from './article-api';
    import i18n from '../../locales/en/components/kb/categories-group';
    import CategoriesGroup from './categories-group.vue';
    export default {
        components:{
            CategoriesGroup
        },
        props:{
            tag:String,
            locale:String,
            location:String
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
            ag.push({"$match":{"$and":[{"adminTags":this.tag}]}});
            ag.push({"$project" : {[`title.${this.locale}`]:1}});
            agLimit = JSON.parse(JSON.stringify(ag)); // if remove this line it will break the network call
            agLimit.push({"$limit" : 10});
            const qs = {
                "ag" : JSON.stringify(agLimit)
            };
            const articlesList = await this.articlesApi.queryArticles(qs);
            if((articlesList || []).length) {
                this.articles =  articlesList;
                this.loading = false;
            }
        },
        methods: {
            goToArticle(id,title){
                const url = title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
                this.location.path(`/kb/articles/${id}/${url}/${this.tag}`);
            },
        },
        i18n: { messages:{ en: i18n }} //will be used for locales language
    }
</script>
