<template>
    <div class="widget fix widget_categories mt-2 right-side-articles" v-bind:class="{ 'relevant-articles': tag != ''}">
        <h4>
            <span v-if="type != 'faq'">{{ $t("relevantArticles") }}</span>
            <span v-if="type == 'faq'">{{ $realm.is('BCH') ? $t("faqs") : $t("relevantArticles")}}</span>
        </h4>
        <hr>
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
        <ul>
            <li v-for="article in articles">
                <a style="display:none" :href="`${relevantArticleUrl(article)}`">{{isFaqArticle?article.title:article.title[$locale]}}</a>
                                <a href="#" @click="goToRelevantArticle(article)">{{isFaqArticle?article.title:article.title[$locale]}}</a>
            </li>
        </ul>
        <div v-if="type == 'faq'" class="view-more">
        	<a href="#" @click="goToFaq()">+  {{ $t("viewMore") }}</a>
		</div>
        <div v-if="articles.length<1 && !loading" class="alert alert-warning">
            <strong>{{ $t("noResultFound") }}</strong>
        </div>
    </div>
</template>

<script>
import ArticlesApi from './article-api';
import i18n from '../../locales/en/components/kb.json';
import loadCategories from './load-categories';
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
            loading: true,
            isFaqArticle: false,
        }
    },
    created() {
        this.articlesApi = new ArticlesApi();
    },
    mixins: [loadCategories],
    async mounted() {
        const realmType = this.$realm.is('BCH') ? 'bch' : 'abs';
        if (realmType == "bch" && this.type == "faq") {
            this.isFaqArticle = true;
            const categories = await this.loadKbCategories(true);
            const faqArticles = categories.filter(tag => tag.adminTags[0] == "faq");
            if ((faqArticles || []).length) {
                this.articles = faqArticles[0].articles;
            }
            this.loading = false;
        } else {
            this.isFaqArticle = false;
            let relevantTag = this.tag;
            if (this.type == "faq") {
                relevantTag = 'faq';
            }
            if (this.type == "faq" && realmType == 'abs') { //ABS has no FAQs so get abs relevant articles
                relevantTag = 'abs';
            }
            let ag = [];
            ag.push({
                "$match": {
                    "$and": [{
                        "adminTags": {
                            $all: [realmType, encodeURIComponent(relevantTag)]
                        }
                    }]
                }
            });
            ag.push({
                "$project": {
                    [`title.${this.$locale}`]: 1
                }
            });
            ag.push({
                "$limit": 10
            });
            const query = {
                "ag": JSON.stringify(ag)
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
        }
    },
    methods: {
        relevantArticleUrl(article, tag) {
            const id = this.isFaqArticle ? article.identifier : article._id;
            const title = this.isFaqArticle ? article.title : article.title[this.$locale];
            const urlTitle = title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
            return `/kb/tags/${encodeURIComponent(this.tag)}/${encodeURIComponent(urlTitle)}/${encodeURIComponent(id)}`
        },
        goToRelevantArticle(article) {
            if (this.type == "faq") {
                const id = this.isFaqArticle ? article.identifier : article._id;
                const title = this.isFaqArticle ? article.title : article.title[this.$locale];
                const url = title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
                this.$router.push({
                    path: `/kb/articles/${id}/${url}/bch`
                });
            } else {
                this.$router.push({
                    path: this.relevantArticleUrl(article)
                });
            }
        },
        goToFaq(category) {
            this.$router.push({
                path: `/kb/faqs`
            });
        },
    },
    i18n: {
        messages: {
            en: i18n
        }
    }
}
</script>
