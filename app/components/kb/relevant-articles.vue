<template>
    <div>
        <slot name="title">
            <h4>
            {{ $t("relevantArticles") }} 
                <hr></hr>
            </h4>
        </slot>
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
        <ul>
            <li v-for="article in articles" class="mb-1">
                <a class="link-dark fs-6" :href="`${articleUrl(article)}`">{{article.title|lstring($locale)}}</a>
            </li>
        </ul>
        <div v-if="articles.length<1 && !loading" class="alert alert-warning">
            <strong>{{ $t("noResultFound") }}</strong>
        </div>
    </div>
</template>

<script>
import ArticlesApi from './article-api';
import i18n from '../../app-text/components/kb.json';
import articlesMaxin from '../maxin/article';
import './filters';
export default {
    name: 'kbRelevantArticles',
    components: {},
    props: {
        tag: String,
        type: String,
        sort: {
            type: Boolean,
            default: false
        }
    },
    data: () => {
        return {
            articles: [],
            loading: true
        }
    },
    created() {
        this.articlesApi = new ArticlesApi();
    },
    mixins: [articlesMaxin],
    async mounted() {

        let ag = [];
        ag.push({"$match":{"$and":[{"adminTags": { $all : [this.$realm.is('BCH') ? 'bch' : 'abs' ]}}]}});
        ag.push({"$match":{"$and":[{"adminTags":encodeURIComponent(this.tag)}]}});
        ag.push({"$project" : {[`title`]:1}});
        ag.push({"$limit" : 6});
        if(this.sort)
            ag.push({"$sort" : {"meta.modifiedOn":-1}});
 
        const query = {
          "ag" : JSON.stringify(ag)
        };
        try {
            const articlesList = await this.articlesApi.queryArticles(query);
            if ((articlesList || []).length) {
              if(this.sort)
                 this.articles = articlesList;
              else
                this.articles = this.shuffleArray(articlesList);
            }
        }
        catch(e) {
           console.error(e);
        }
        finally {
            this.loading = false;
        }
    },
    methods: {
      articleUrl(article) {
            return this.getUrl(this.$options.filters.lstring(article.title), article._id, this.tag);
        },
        shuffleArray(array) {
            return array
                .map(value => ({ value, sort: Math.random()*100}))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
        },
    },
    i18n: {
        messages: {
            en: i18n
        }
    }
}
</script>
