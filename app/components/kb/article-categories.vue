<template>
    <div>
        <div class="card shadow-sm mb-3" v-for="category in KbCategories">
            <div class="card-body">
                <h4 class="pb-2"><a :href="`${tagUrl(category)}`">{{category.title}}</a></h4>
                <ul v-if="category.articles.length > 0" >
                    <li v-for="article in category.articles" class="mb-1">
                        <a v-if="article.identifier" class="link-dark fs-6" :href="`${articleUrl(article, category.adminTags[0])}`">{{article.title}}</a>
                        <a v-if="article.url" :href="article.url" class="link-dark fs-6" target="_blank">{{article.title}}</a>
                    </li>
                </ul>
                <div v-if="category.articles.length == 0">
                    <relevant-articles :tag="category.adminTags[0]" hide-title="true" sort="true"></relevant-articles>
                </div>
                <div>
                    <a class="float-end text-decoration-none link-secondary text-uppercase bold" :href="`${tagUrl(category)}`">{{ $t("viewMore") }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import i18n from '../../app-text/components/kb.json';
import relevantArticles from './relevant-articles.vue';
import articlesMaxin from '../maxin/article';
export default {
    name: 'KbArticleCategories',
    props: {},
    components: {
        relevantArticles
    },
    data: () => {
        return {
            KbCategories: [],
            loading: true,
        }
    },
    mixins: [articlesMaxin],
    async mounted() {
        const categories = await this.loadKbCategories(this.$realm.is('BCH'));
        this.KbCategories = categories.filter(tag => tag.adminTags[0] != "faq");
    },
    methods: {
        tagUrl(category) {
            return this.getUrl(category.title, undefined, category.adminTags[0]);
        },
        articleUrl(article, tag) {
            if (article.url) {
                return article.url
            } else {
                return this.getUrl(article.title, article.identifier, tag);
            }
        }
    },
    i18n: {
        messages: {
            en: i18n
        }
    }
}
</script>
