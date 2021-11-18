<template>
    <div class="widget fix widget_categories mt-2 right-side-articles relevant-articles">
        <h4>
           <span>{{ $t("faqs") }}</span>
        </h4>
        <hr>
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
         <ul>
            <li v-for="article in articles">
                <a style="display:none" :href="`${articleUrl(article)}`">{{article.title}}</a>
                                <a href="#" @click="goToArticle(article)">{{article.title}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import i18n from '../../locales/en/components/kb.json';
import loadCategories from '../maxin/article';
export default {
    name: 'KbRightSideFaqs',
    props: {},
    data: () => {
        return {
            articles: [],
        }
    },
    mixins: [loadCategories],
    async mounted() {
        const categories = await this.loadKbCategories(this.$realm.is('BCH'));
        const faqArticles = categories.filter(tag => tag.adminTags[0] === "faq");
        this.articles = faqArticles[0].articles;
    },
    methods: {
        articleUrl(article, tag){       
            return this.getUrl(article.title, article.identifier, 'faq');
        },
        goToArticle(article, tag){
          this.$router.push({
            path:this.articleUrl(article, tag)
          });
        }
    },
    i18n: {
        messages: {
            en: i18n
        }
    }
}
</script>
