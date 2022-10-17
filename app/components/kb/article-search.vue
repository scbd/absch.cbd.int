<template>
    <div>
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg"></i> {{ $t("loading") }}...</div>
        <div v-if="!loading">
            <div class="article-by-tags" v-if="articles">
                <h2>
                    {{$t("searchResults") }} <span><small>({{articlesCount}})</small></span>
                </h2>
                <hr>

                <div v-for="article in articles">
                    <div class="card mb-3">

                        <div class="d-flex flex-row bd-highlight ">
                            <div class="p-2 bd-highlight" v-if="article.coverImage">
                                <img class="img-fluid img-thumbnail" style="max-height:140px;"
                                    v-bind:src="getSizedImage(article.coverImage.url, '300x300')">
                            </div>
                            <div class="p-2 bd-highlight w-100">
                                <div class="card-body">
                                    <span class="badge bg-secondary position-absolute top-0 end-0">
                                        {{article.meta.createdOn|formatDate('DD MMM YYYY')}}</span>

                                    <h5 class="card-title"><a class="link-dark"
                                            :href="`${articleUrl(article, getTag(article.adminTags) )}`">{{article.title|lstring($locale)}}</a>
                                    </h5>
                                    <p v-if="article.summary" class="card-text h-100">
                                        {{article.adminTags[0]}} - {{article.adminTags[1]}}
                                        <a class="link-dark" :href="`${articleUrl(article, getTag(article.adminTags) )}`">
                                            {{article.summary|lstring($locale)}}
                                        </a>
                                    </p>

                                    <div class="inner-area">
                                        <i class="fa fa-tag" aria-hidden="true"></i>
                                        <a class="btn btn-mini" :href="`${tagUrl(tag)}`"  v-for="tag in article.adminTags">{{tag}}</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                
                <div v-if="articlesCount<1" class="alert alert-warning">
                    <strong>{{ $t("noResultFound") }}</strong>
                </div>
            </div>
        </div>
        <div class="d-inline-block" v-if="articlesCount>10">
            <paginate :records-per-page="recordsPerPage" :record-count="articlesCount" @changePage="onChangePage"
                :current-page="pageNumber"></paginate>
        </div>
    </div>
</template>
<script>

import i18n from '../../app-text/components/kb.json';
import paginate from './pagination.vue';
import ArticlesApi from './article-api';
import './filters';
import articlesMaxin from '../maxin/article';

export default {
    name: 'KbArticlesByTag',
    components: {
        paginate,
    },
    props: {},
    created() {
        this.articlesApi = new ArticlesApi();
    },
    data: () => {
        return {
            articles: [],
            loading: true,
            pageNumber: 1,
            recordsPerPage: 10,
            realmTag: '',
            categories: [],
            search: ''
        }
    },
    mixins: [articlesMaxin],
    async mounted() {
        this.categories = await this.loadKbCategories(this.$realm.is('BCH'));
        if (this.$route.params.search) {
            this.search = decodeURIComponent(this.$route.params.search).replace(/"/g, "");
        }
        console.log(this.search)
        this.realmTag = this.$realm.is('BCH') ? 'bch' : 'abs';
        this.loadArticles(1);
    },
    methods: {
        getTag(adminTags) {
            var realm = this.$realm.is('BCH') ? 'bch' : 'absch';
            console.log(realm);
            if(adminTags && adminTags.length >= 2){
                if(adminTags[0] == realm)
                    return  adminTags[1];
                else
                    return  adminTags[0];
            }
            else return realm;
        },
        tagUrl(tag) {
            const tagDetails = this.categories.find(e => e.adminTags.includes(tag))
            const tagTitle = (tagDetails?.title || '');
            return this.getUrl(tagTitle, undefined, tag);
        },
        articleUrl(article, tag) {
            return this.getUrl(this.$options.filters.lstring(article.title), article._id, tag);
        },
        onChangePage(pageNumber) {
            this.article = [];
            this.loading = true;
            this.loadArticles(pageNumber);
        },
        async loadArticles(pageNumber, text) {
            this.pageNumber = pageNumber;
            if (text) {
                this.search = text;
            }
            this.articlesCount = 0;
            this.articles = [];
            this.loading = true;
            let countAg = [];
            let searchAg = [];
            if (this.search) {
                const match = {
                    "$match": {
                        "$and": [{
                            "$or": [{
                                [`title.${this.$locale}`]: {
                                    "$$contains": (this.search)
                                }
                            },
                            {
                                [`summary.${this.$locale}`]: {
                                    "$$contains": (this.search)
                                }
                            },
                            {
                                [`content.${this.$locale}`]: {
                                    "$$contains": (this.search)
                                }
                            }
                            ]
                        },
                        {
                            "adminTags": {
                                $all: [this.realmTag]
                            }
                        }
                        ]
                    }
                };
                searchAg.push(match);
                countAg.push(match);
            } else {
                const matchTag = {
                    "$match": {
                        "$and": [{
                            "adminTags": {
                                $all: [this.realmTag]
                            }
                        }]
                    }
                };
                searchAg.push(matchTag);
                countAg.push(matchTag);
            }
            countAg.push({
                "$match": {
                    "$and": [{
                        "adminTags": {
                            $all: [this.realmTag]
                        }
                    }]
                }
            });
            searchAg.push({
                "$project":

                {
                    [`title`]: 1,
                    [`summary`]: 1,
                    [`coverImage`]: 1,
                    adminTags: 1,
                    "meta": 1,
                    _id: 1
                }
            });
            searchAg.push({
                "$limit": pageNumber * this.recordsPerPage
            });
            searchAg.push({
                "$skip": (pageNumber - 1) * this.recordsPerPage
            });
            countAg.push({
                "$count": "count"
            })
            const countQuery = {
                "ag": JSON.stringify(countAg)
            };
            const searchQuery = {
                "ag": JSON.stringify(searchAg)
            };

            try {
                const [count, articlesList] = await Promise.all([this.articlesApi.queryArticles(countQuery), this.articlesApi.queryArticles(searchQuery)]);
                if ((articlesList || []).length) {
                    this.articles = articlesList;
                    this.articlesCount = count[0].count;
                }
            }
            catch (e) {
                console.error(e);
            }
            finally {
                this.loading = false;
            }
        },
        getSizedImage(url, size) {
            return url && url
                .replace(/attachments.cbd.int\//, '$&' + size + '/')
                .replace(/\.s3-website-us-east-1\.amazonaws\.com\//, '$&' + size + '/')
        }
    },
    i18n: {
        messages: {
            en: i18n
        }
    }
}
</script>
