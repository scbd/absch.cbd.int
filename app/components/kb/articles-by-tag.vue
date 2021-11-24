<template>
    <div class="row">
        <div class="col-lg-8">
            <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
            <div class="row match-height" v-if="!loading">
                <div class="article-by-tags" v-if="articles">
                    <h2>
						{{tagDetails.title}} <span><small>({{articlesCount}})</small></span>
					</h2>
					<hr>

                    <div class="kb-listing">
                        <ul class="article-with-tags-ul">
                            <li class="article-with-tags-li" v-for="article in articles">
								<a class="cursor-pointer" @click="goToArticle(article, tag)">
									<span class="article-title">
										{{article.title|lstring($locale)}}
									</span>
									<div v-if="article.summary" class="article-summary" @click="goToArticle(article, tag)">
										{{article.summary|lstring($locale)}}...
									</div>
								</a>
                              <div class="inner-area">
                                <i class="fa fa-tag" aria-hidden="true"></i>
                                <a style="display:none" class="btn btn-mini" :href="`${tagUrl(tag)}`" v-for="tag in article.adminTags">{{tag}}</a>
                                <a class="btn btn-mini " href="#" @click="goToTag(tag)" v-for="tag in article.adminTags">{{tag}}</a>
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

	import i18n from '../../locales/en/components/kb.json';
import paginate from './pagination.vue';
import relevantArticles from "./relevant-articles.vue";
import ArticlesApi from './article-api';
import {formatDate, lstring} from './filters';
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
            return this.getUrl(article.title[this.$locale], article._id, tag);
        },
        goToArticle(article, tag){
            this.$router.push({
            path:this.articleUrl(article, tag)
            });
        },
        goToTag(category){
            this.$router.push({path: this.tagUrl(category)});
        },
        onChangePage(pageNumber) {
            this.pageNumber = pageNumber;
            this.article = [];
            this.loading = true;
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
                [`title.${this.$locale}`]: 1,
                [`summary.${this.$locale}`]: 1,
                adminTags: 1,
                "meta.modifiedOn": 1,
                _id: 1
            };
            const groupTags = JSON.stringify([encodeURIComponent(tag)]);
            const groupLimit = this.recordsPerPage;
            const groupSkip = (pageNumber - 1) * this.recordsPerPage
            const groupSort = {
                "meta.modifiedOn": -1
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
    },
    i18n: {
        messages: {
            en: i18n
        }
    }
}
</script>
