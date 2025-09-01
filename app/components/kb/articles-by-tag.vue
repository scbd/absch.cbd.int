<template>
    <div class="row">
        <div class="col-lg-8">
            <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ t("loading") }}...</div>
            <div class="row match-height" v-if="!loading">
                <div class="article-by-tags" v-if="articles">
                    <h4>
						{{tagDetails.title}} <span><small>({{articlesCount}})</small></span>
                        <cbd-add-new-view-article v-if="hasEditRights" 
                            :admin-tags="adminTags" target="_self" class="btn btn-secondary float-end">
                        </cbd-add-new-view-article>
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
                                    <span class="badge bg-secondary position-absolute top-0 end-0">{{formatDate(article.meta.createdOn, 'DD MMM YYYY')}}</span>

                                    <h5 class="card-title"><a class="link-dark stretched-link" :href="`${articleUrl(article, tag)}`">{{lstring(article.title, locale)}}</a></h5>
                                    <p  v-if="article.summary" class="card-text h-100">{{lstring(article.summary, locale)}}</p>

                                  
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="articlesCount<1" class="alert alert-light">
                        <strong>{{ t("noResultFound") }}</strong>
                    </div>
                </div>
            </div>

    <div v-if="articlesCount>25">
				<paginate 
                    :records-per-page="recordsPerPage"
                    :record-count="articlesCount"
                    :current-page="pageNumber"
                    @changePage="onChangePage"
                    @pageSizeChanged="handlePageSizeChanged"
                ></paginate>
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
<script setup>
    import { ref, onMounted, computed } from "vue";
    import { useI18n } from 'vue-i18n';
    import messages from '~/app-text/components/kb.json';
    import relevantArticles from '~/components/kb/relevant-articles.vue';
    import cbdAddNewViewArticle from '~/components/common/cbd-add-new-view-article.vue';
    import paginate from '~/components/common/pagination.vue';
    import popularTags from '~/components/kb/popular-tags.vue';
    import ArticlesApi from '~/components/kb/article-api.js';
    import { formatDate, lstring } from './filters';
    import './filters';
    import { loadKbCategories, getUrl, getRealmArticleTag  } from '~/services/composables/articles.js';
    import { useRealm } from '~/services/composables/realm.js';
    import {  useRoute, useAuth } from "@scbd/angular-vue/src/index.js"; 
    import { OASIS_ARTICLE_EDITOR_ROLES } from '~/constants/roles.js';

    const auth = useAuth();
    const { t, locale } = useI18n({ messages });
    const articlesApi = new ArticlesApi({tokenReader:()=>auth.token()});
    const realm = useRealm();
    const route = useRoute();
    const articles = ref({}); 
    const loading = ref(true);
    const tag = ref('');
    const pageNumber = ref(1);
    let tagDetails =  {};
    let articlesCount = 0;
    const recordsPerPage = ref(25);
    const realmArticleTag = getRealmArticleTag();

    const hasEditRights = computed(()=> auth?.check(OASIS_ARTICLE_EDITOR_ROLES));
    const adminTags = computed(()=>[realmArticleTag, tag.value]);

    onMounted(async () => {  
        const paramTag = (route.value?.params?.tag).replace(/"/g, "");
        if (paramTag != undefined && paramTag != null) {
            const categories = await loadKbCategories(locale.value);
            tagDetails = categories.find(e => e.adminTags.includes(paramTag)) || {
                title: paramTag
            };
            tag.value = paramTag;
            loadArticles(1, adminTags);
        }
    })

    const articleUrl= function (article, tag){
            return getUrl(lstring(article.title), article._id, tag);
        };

    const onChangePage  = function(p) {
            window.scrollTo(0,0);
            loadArticles(p, adminTags);
        };

        const handlePageSizeChanged = async (size) => {
        recordsPerPage.value = size;
        window.scrollTo(0, 0);
        await loadArticles(1, adminTags);
      }

    const loadArticles = async function (page, adminTags) {

            pageNumber.value = page;
            articlesCount = 0;
            articles.value = [];
            const q = {
                adminTags: {
                    $all: adminTags.value?.map(encodeURIComponent)
                }
            };
            const f = {
                [`title`]: 1,
                [`summary`]: 1,
                [`coverImage`]: 1,
                adminTags: 1,
                "meta": 1,
                _id: 1
            };
            const groupTags = JSON.stringify([encodeURIComponent(tag.value)]);
            const groupLimit = recordsPerPage.value;
            const groupSkip = (page - 1) * recordsPerPage.value
            const groupSort = {
                "meta.createdOn": -1
            };

            try {
                loading.value = true;
                const result = await articlesApi.queryArticleGroup('adminTags', {
                  q,
                  f,
                  groupLimit,
                  groupSort,
                  groupTags,
                  groupSkip
                });
                if (result?.length) {

                  result.forEach(element => {
                    articlesCount = articlesCount + element.count;
                    articles.value = [...articles.value, ...element.articles];
                  });
                }
            }
            catch(e) {
                console.error(e);
            }
            finally {
                loading.value = false;
            }
        };

    const getSizedImage = function (url, size){
            return url && url
            .replace(/attachments.cbd.int\//, '$&'+size+'/')
            .replace(/\.s3-website-us-east-1\.amazonaws\.com\//, '$&'+size+'/')
        };
</script>
