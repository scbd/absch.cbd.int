<template>
    <div class="col-lg-8">
        <div class="row match-height">
            <div class="col-md-12 col-sm-12 " v-for="category in KbCategories">
                <div class="categories-list widget_categories tag-count">
                    <h3>
                        <a v-translation-url:$[dynamicArg]="$locale" :href="`${tagUrl(category)}`">{{category.title}}</a>
                    </h3>
                   <hr>
                    <ul class="cate-list-ul" style="list-style: none;">
                        <li class="cate-list-li" v-for="article in category.articles">
                            <a v-translation-url:$[dynamicArg]="$locale" :href="`${articleUrl(article, category.adminTags[0])}`">{{article.title}}</a>
                        </li>
                    </ul>
                    <a class="view-more" v-translation-url:$[dynamicArg]="$locale" :href="`${tagUrl(category)}`">{{ $t("viewMore") }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import i18n from '../../locales/en/components/kb.json';
import articlesMaxin from '../maxin/article';
import "/app/components/common/directives";
export default {
    name: 'KbArticleCategories',
    props: {},
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
        articleUrl(article, tag){
          if(article.url){
           return article.url
           } else {
            return this.getUrl(article.title, article.identifier, tag);
          }
        },
        goToArticle(article, tag){
          this.$router.push({
            path:this.articleUrl(article, tag)
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
