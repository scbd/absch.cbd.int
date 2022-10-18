<template>
    <div class="mt-3">
        <div class="row mt-3">
            <div class="col-lg-8">
                <link type="text/css" rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@24.0.0/build/ckeditor.css">
                <div class="card shadow-sm mb-3">
                    <div v-if="article.coverImage">
                        <img class="card-img-top" v-bind:src="getSizedImage(article.coverImage.url, '800x800')">
                    </div>

                    <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg"></i> 
                    {{ $t("loading") }}...</div>

                    <div class="card-body" v-if="!loading">
                       
                        <h2 class="card-title">{{article.title|lstring($locale)}}</h2>
                       
                        <div class="p-1 mb-3 text-white bg-darkgrey bold">
                            <i class="fa fa-calendar" aria-hidden="true"></i> &nbsp;
                            {{article.meta.createdOn|formatDate('DD MMM YYYY')}}
                        </div>

                        <div v-if="article.content" class="card-text full-details ck ck-content ck-rounded-corners ck-blurred"
                            v-html="$options.filters.lstring(article.content,$locale)">
                        </div>
                    </div>
                    <div v-if="article.adminTags" class="card-footer">
                        <a v-for="tag in article.adminTags" type="button"
                            class="btn btn-sm btn-outline-secondary m-1 me-2" :href="`${tagUrl(tag)}`">
                            {{tag}}
                        </a>
                    </div>
                </div>
                <button class="btn btn-primary btn-sm float-end" @click="back()">{{ $t("back") }}</button>
            </div>
            <div class="col-lg-4">
                <div v-if="tag">
                    <relevant-articles :tag="tag"></relevant-articles>
                </div>
                <div>
                    <popular-tags></popular-tags>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import i18n from '../../app-text/components/kb.json';
import relevantArticles from "./relevant-articles.vue";
import ArticlesApi from './article-api';
import './filters';
import popularTags from './popular-tags.vue';
import articlesMaxin from '../maxin/article';
export default {
    name: 'KbArticleDetails',
    components: {
        relevantArticles,
        popularTags
    },
    props: {
    },
    data: () => {
        return {
            article: [],
            categories: [],
            loading: true
        }
    },
    created() {
        this.tag = (this.$route.params.tag).replace(/"/g, "");
        this.articlesApi = new ArticlesApi();
    },
    mixins: [articlesMaxin],
    async mounted() {
        this.categories = await this.loadKbCategories(this.$realm.is('BCH'));
        if (this.$route.params == undefined) return;
        try {
            let id = (this.$route.params.id).replace(/"/g, "");
            let article = await this.articlesApi.getArticleById(encodeURIComponent(id));
            article = article || { meta: {} }
            if (article?.content != undefined) {
                this.article = article;
            }
        }
        catch (e) {
            console.error(e);
        }
        finally {
            this.loading = false;

        }
    },
    methods: {
        back() {
            window.history.back();
        },
        tagUrl(tag) {
            const tagDetails = this.categories.find(e => e.adminTags.includes(tag))
            const tagTitle = (tagDetails?.title || '');
            return this.getUrl(tagTitle, undefined, tag);
        },
        articleUrl(article, tag) {
            return this.getUrl(this.$options.filters.lstring(article.title), article._id, tag);
        },
        getSizedImage(url, size) {
            return url && url
                .replace(/attachments.cbd.int\//, '$&' + size + '/')
                .replace(/\.s3-website-us-east-1\.amazonaws\.com\//, '$&' + size + '/')
        }
    },
    i18n: { messages: { en: i18n } }
}
</script>
