<template>
  <div>
      <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
      <div v-if="!loading">
        <div class="article-by-tags" v-if="articles">
          <h2>
            {{$t("searchResults") }} <span><small>({{articlesCount}})</small></span>
          </h2>
          <hr>

          <div class="kb-listing">
            <ul class="article-with-tags-ul">
              <li class="article-with-tags-li" v-for="article in articles">
                <a :href="`${articleUrl(article, realmTag)}`">
                  <span class="article-title">
                    {{article.title|lstring($locale)}}
                  </span>
                  <div v-if="article.content" class="article-summary">
                    {{article.content|lstring($locale)}}
                  </div>
                  <div v-if="article.summary" class="article-summary">
                    {{article.summary|lstring($locale)}}
                  </div>
                </a>
                <div class="inner-area">
                  <i class="fa fa-tag" aria-hidden="true"></i>
                  <a class="btn btn-mini" :href="`${tagUrl(tag)}`" v-for="tag in article.adminTags">{{tag}}</a>
                </div>

              </li>
            </ul>
          </div>
          <div v-if="articlesCount<1" class="alert alert-warning">
            <strong>{{ $t("noResultFound") }}</strong>
          </div>
        </div>
      </div>

      <div v-if="articlesCount>10">
        <paginate :records-per-page="recordsPerPage" :record-count="articlesCount" @changePage="onChangePage" :current-page="pageNumber"></paginate>
      </div>
      </div>
</template>
<script>

import i18n from '../../locales/en/components/kb.json';
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
            this.search = (this.$route.params.search).replace(/"/g, "");
        }
        this.realmTag = this.$realm.is('BCH') ? 'bch' : 'abs';
        this.loadArticles(1);
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
                    adminTags: 1,
                    "meta.modifiedOn": 1,
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
            catch(e) {
                console.error(e);
            }
            finally {
                this.loading = false;
            }
        },
    },
    i18n: {
        messages: {
            en: i18n
        }
    }
}
</script>
