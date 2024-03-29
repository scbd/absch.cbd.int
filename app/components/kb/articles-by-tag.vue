<template>
    <div class="row">
        <div class="col-lg-8">
            <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
            <div class="row match-height" v-if="!loading">
                <div class="article-by-tags" v-if="articles">
                    <h4>
						{{tagDetails.title}} <span><small>({{articlesCount}})</small></span>
					</h4>
					<hr>

                    <div class="kb-listing w-100">

                    <div v-for="article in articles">
                        <div class="card mb-3" >

                            <div class="d-flex flex-row bd-highlight ">
                                <div class="p-2 bd-highlight"  v-if="article.coverImage" >
                                    <img class="img-fluid img-thumbnail" style="max-height:140px;" v-bind:src="getSizedImage(article.coverImage.url, '300x300')" >
                                </div>
                                <div class="p-2 bd-highlight w-100">
                                <div class="card-body">
                                    <span class="badge bg-secondary position-absolute top-0 end-0">{{article.meta.createdOn|formatDate('DD MMM YYYY')}}</span>

                                    <h5 class="card-title"><a class="link-dark stretched-link" :href="`${articleUrl(article, tag)}`">{{article.title|lstring($locale)}}</a></h5>
                                    <p  v-if="article.summary" class="card-text h-100">{{article.summary|lstring($locale)}}</p>

                                  
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="articlesCount<1" class="alert alert-light">
                        <strong>{{ $t("noResultFound") }}</strong>
                    </div>
                </div>
            </div>

            <div v-if="articlesCount>10">
				<paginate :records-per-page="recordsPerPage" :record-count="articlesCount" @changePage="onChangePage" :current-page="pageNumber"></paginate>
            </div>

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
</template>
<script>

	import i18n from '../../app-text/components/kb.json';
import paginate from './pagination.vue';
import relevantArticles from "./relevant-articles.vue";
import ArticlesApi from './article-api';
import './filters';
import popularTags from './popular-tags.vue';
import articlesMaxin from '../maxin/article';

export default {
    name: 'KbArticlesByTag',
    components: {
        relevantArticles,
        paginate,
        popularTags
    },
    props: {},
    created() {
        this.articlesApi = new ArticlesApi();
    },
    data: () => {
        return {
            articles: [],
            loading: true,
            tagDetails: {},
            categories: {},
            articlesCount: 0,
            pageNumber: 1,
            recordsPerPage: 10
        }
    },
    mixins: [articlesMaxin],
    async mounted() {
        const tag = (this.$route.params.tag).replace(/"/g, "");
        if (tag != undefined && tag != null) {
            this.categories = await this.loadKbCategories(this.$realm.is('BCH'));
            this.tagDetails = this.categories.find(e => e.adminTags.includes(tag)) || {
                title: tag
            };
            this.tag = tag;
            this.loadArticles(1, tag);
        }
    },
    methods: {
        tagUrl(tag) {
            const tagDetails = this.categories.find(e => e.adminTags.includes(tag))
            const tagTitle = (tagDetails?.title || '');
            return this.getUrl(tagTitle, undefined, tag);
        },
        articleUrl(article, tag){
            return this.getUrl(this.$options.filters.lstring(article.title), article._id, tag);
        },
        onChangePage(pageNumber) {
            this.pageNumber = pageNumber;
            this.article = [];
            this.loading = true;
            window.scrollTo(0,0);
            this.loadArticles(pageNumber, this.tag);
        },
        async loadArticles(pageNumber, tag) {

            this.articlesCount = 0;
            this.articles = [];
            const q = {
                $and: [{
                        adminTags: this.$realm.is('BCH') ? 'bch' : 'abs'
                    },
                    {
                        adminTags: {
                            $all: [encodeURIComponent(tag)]
                        }
                    }
                ]
            };
            const f = {
                [`title`]: 1,
                [`summary`]: 1,
                [`coverImage`]: 1,
                adminTags: 1,
                "meta": 1,
                _id: 1
            };
            const groupTags = JSON.stringify([encodeURIComponent(tag)]);
            const groupLimit = this.recordsPerPage;
            const groupSkip = (pageNumber - 1) * this.recordsPerPage
            const groupSort = {
                "meta.createdOn": -1
            };

            try {
                const result = await this.articlesApi.queryArticleGroup('adminTags', {
                  q,
                  f,
                  groupLimit,
                  groupSort,
                  groupTags,
                  groupSkip
                });
                if (result?.length) {

                  result.forEach(element => {
                    this.articlesCount = this.articlesCount + element.count;
                    this.articles = [...this.articles, ...element.articles];
                  });
                }
            }
            catch(e) {
                console.error(e);
            }
            finally {
                this.loading = false;
            }
        },
        getSizedImage(url, size){
            return url && url
            .replace(/attachments.cbd.int\//, '$&'+size+'/')
            .replace(/\.s3-website-us-east-1\.amazonaws\.com\//, '$&'+size+'/')
        }
    },
    i18n: {
        messages: {
            en: i18n
        }
    }
}
</script>
