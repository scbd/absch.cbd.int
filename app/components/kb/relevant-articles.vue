<template>
    <div class="widget fix widget_categories mt-2 right-side-articles relevant-articles">
        <h4>
            <span>{{ $t("relevantArticles") }}</span>
        </h4>
        <hr>
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
        <ul>
            <li v-for="article in articles">
                <a :href="`${articleUrl(article)}`">{{article.title|lstring($locale)}}</a>
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
        type: String
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
        ag.push({"$limit" : 10});
        const query = {
          "ag" : JSON.stringify(ag)
        };
        try {
            const articlesList = await this.articlesApi.queryArticles(query);
            if ((articlesList || []).length) {
              this.articles = articlesList;
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
    },
    i18n: {
        messages: {
            en: i18n
        }
    }
}
</script>
