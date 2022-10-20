<template>
    <div>
        <h4>
           <span>{{ $t("faqs") }}</span>
        </h4>
        <hr>
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
         <ul>
            <li v-for="article in articles" class="mb-1">
                <a class="link-dark fs-6" :href="`${articleUrl(article)}`">{{article.title}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import i18n from '../../app-text/components/kb.json';
import articlesMaxin from '../maxin/article';
export default {
    name: 'KbRightSideFaqs',
    props: {},
    data: () => {
        return {
            articles: [], 
        }
    },
    mixins: [articlesMaxin],
    async mounted() {
        const categories = await this.loadKbCategories(this.$realm.is('BCH'));
        const faqArticles = categories.filter(tag => tag.adminTags[0] === "faq");
        this.articles = faqArticles[0].articles;
    },
    methods: {
        articleUrl(article, tag){       
            return this.getUrl(article.title, article.identifier, 'faq');
        },
    },
    i18n: {
        messages: {
            en: i18n
        }
    }
}
</script>
