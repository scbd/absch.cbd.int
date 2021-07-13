<template>
    <div class="widget fix widget_categories mt-2">
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> loading...</div>
        <span class="icon icon-folder"></span>
        <h4>Popular Tags</h4>
        <div class="tag-scroll" v-if="!loading">
            <div class="tagcloud" v-for="tag in tags">
                <a href="#" class="btn btn-mini" @click="goToTag(tag.title)">{{tag.title}}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import ArticlesApi from './article-api';
    import i18n from '../../locales/en/components/kb/categories-group';
    export default {
        props:{
            locale:String,
            location:String
        },
        data:  () => {
            return {
                tags: [],
                loading: true
            }
        },
        created(){
            this.articlesApi = new ArticlesApi();
        },
        async mounted() {
            const tags = await this.articlesApi.getArticleAdminTags('{"title":1}&l=20&sk=0&s={"meta.updatedOn":-1}');
            if (tags.length>0){
                this.tags =  tags;
                this.loading = false;
            }
        },
        methods: {
            goToTag(tag){
                this.location.path(`/kb/tags/${tag}`);
            }
        },
        i18n: { messages:{ en: i18n }} //will be used for locales language
    }
</script>

