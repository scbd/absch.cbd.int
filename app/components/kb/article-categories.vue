<template>
    <div class="col-lg-8">
        <div class="row match-height">
            <div class="col-md-12 col-sm-12 " v-for="category in KbCategories">
                <div class="categories-list widget_categories tag-count">
                    <h3>
                        <a href="#" @click="goToTag(category)">{{category.title}}</a>
                        <a style="display:none" :href="`${tagUrl(category)}`">{{category.title}}</a>
                    </h3>
                   <hr>
                    <ul class="cate-list-ul" style="list-style: none;">
                        <li class="cate-list-li" v-for="article in category.articles">
                            <a v-if="article.identifier" style="display:none" :href="`${articleUrl(article)}`">{{article.title}}</a>
                            <a href="#" @click="goToArticle(article, category.adminTags[0])">{{article.title}}</a>
                        </li>
                    </ul>
                    <a style="display:none" :href="`${tagUrl(category)}`">{{ $t("viewMore") }}</a>
                    <a class="view-more" href="#" @click="goToTag(category)">+  {{ $t("viewMore") }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import i18n from '../../locales/en/components/kb.json';
import loadCategories from '../maxin/article';
export default {
    name: 'KbArticleCategories',
    props: {},
    data: () => {
        return {
            KbCategories: [],
            loading: true,
        }
    },
    mixins: [loadCategories],
    async mounted() {
        const categories = await this.loadKbCategories(this.$realm.is('BCH'));
        this.KbCategories = categories.filter(tag => tag.adminTags[0] != "faq");
    },
    methods: {
        tagUrl(category) {
            return this.getUrl(category.title, undefined, category.adminTags[0]);
        },
        articleUrl(article, tag){
          if(article.url){
            window.open(article.url,'_blank'); //will redirect to external static url as mentioned in abs json
          } else {
            return this.getUrl(article.title, article.identifier, tag);
          }
        },
        goToArticle(article, tag){
          this.$router.push({
            path:this.articleUrl(article, tag)
          });
        },
        goToTag(category){
          this.$router.push({path: this.tagUrl(category)});
        }
    },
    i18n: {
        messages: {
            en: i18n
        }
    }
}
</script>
