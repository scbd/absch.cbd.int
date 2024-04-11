<template>
    <div>    
      <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg"></i> {{ t("loading") }}...</div>
      <div v-if="!loading">
        <div class="article-by-tags" v-if="articles">
          <h4>
            {{t("searchResults") }} <span><small>({{articlesCount}})</small></span>      
          </h4>
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
                      {{formatDate(article.meta.createdOn, 'DD MMM YYYY')}}</span>
                      
                    <h5 class="card-title"><a class="link-dark"
                        :href="`${articleUrl(article, getTag(article.adminTags) )}`">{{lstring(article.title,
                        $locale)}}</a>                      
                    </h5>
                    <p v-if="article.summary" class="card-text h-100">
                      <a class="link-dark" :href="`${articleUrl(article, getTag(article.adminTags) )}`">
                        {{lstring(article.summary, $locale)}}
                      </a>
                    </p>
  
                    <div class="inner-area">
                      <i class="fa fa-tag" aria-hidden="true"></i>
                      <a class="btn btn-mini" :href="`${tagUrl(tag)}`" v-for="tag in article.adminTags">{{tag}}</a>
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
      <div class="d-inline-block" v-if="articlesCount>10">
        <paginate :records-per-page="recordsPerPage" :record-count="articlesCount" @changePage="onChangePage"
          :current-page="pageNumber"></paginate>
      </div>
    </div>
  </template>
  
  <script setup>
      import { ref, onMounted, defineExpose } from "vue";
      import { useI18n } from 'vue-i18n';
      import messages from '../../app-text/components/kb.json';
      import { useRealm } from '../../services/composables/realm.js';
      import {  useRoute } from "@scbd/angular-vue/src/index.js";
      import { loadKbCategories, getUrl } from '../../services/composables/articles.js';
      import paginate from '../common/pagination.vue';
      import ArticlesApi from './article-api';
      import "../kb/filters";
      import { formatDate, lstring } from './filters';
      import { getApplicationArticleRealm } from "../../services/composables/articles.js";

      const route = useRoute();
      const { t, locale } = useI18n({ messages });
      const realm = useRealm();
      const articlesApi = new ArticlesApi();
      const articles = ref([]);
      const loading = ref(true);
      const pageNumber = ref(1);
      const recordsPerPage = ref(10);
      const realmTag = ref('');
      const categories = ref([]);
      const search = ref('');
      const articlesCount = ref(0);
  
      onMounted( async() => {
          categories.value = await loadKbCategories(realm.is('BCH'));
          if (route.value?.params?.search) {
              search.value = route.value.params.search.replace(/"/g, "");
          }         
          realmTag.value =getApplicationArticleRealm;
          await loadArticles(1);
      });

      const getTag = (adminTags) => {       
        const realm = realmTag.value;
        if (adminTags && adminTags.length >= 2) {
          if (adminTags[0] === realm) return adminTags[1];
          else return adminTags[0];
        } else return realm;
      };
  
      const tagUrl = (tag) => {
        if(categories){
          const tagDetails = categories.value.find((e) => e.adminTags.includes(tag));
          const tagTitle = tagDetails?.title || '';
          return getUrl(tagTitle, undefined, tag);
        }
      };
  
      const articleUrl = (article, tag) => {
        return getUrl(lstring(article.title), article._id, tag);
      };
  
      const loadArticles = async (page) => {
                pageNumber.value = page;
                articlesCount.value = 0;
                articles.value = [];
                loading.value = true;
                const countAg = [];
                const searchAg = [];
                if (search.value !== undefined) {
                    const match = {
                    "$match": {
                        "$and": [
                        {
                            "$or": [
                            { [`title.${locale.value}`]: { "$$contains": (search.value) } },
                            { [`summary.${locale.value}`]: { "$$contains": (search.value) } },
                            { [`content.${locale.value}`]: { "$$contains": (search.value) } }
                            ]
                        },
                        { "adminTags": { $all: [realmTag.value] } }
                        ]
                    }
                    };
                    searchAg.push(match);
                    countAg.push(match);
                } else {
                    const matchTag = {
                    "$match": {
                        "$and": [
                        { "adminTags": { $all: [realmTag.value] } }
                        ]
                    }
                    };
                    searchAg.push(matchTag);
                    countAg.push(matchTag);
                }
                countAg.push({
                    "$match": {
                    "$and": [
                        { "adminTags": { $all: [realmTag.value] } }
                    ]
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
                    "$limit": pageNumber.value * recordsPerPage.value
                });
                searchAg.push({
                    "$skip": (pageNumber.value - 1) * recordsPerPage.value
                });
                countAg.push({
                    "$count": "count"
                });
                const countQuery = { "ag": JSON.stringify(countAg) };
                const searchQuery = { "ag": JSON.stringify(searchAg) };
                try {
                    const [count, articlesList] = await Promise.all([articlesApi.queryArticles(countQuery), articlesApi.queryArticles(searchQuery)]);
                    if ((articlesList || []).length) {
                    articles.value = articlesList;
                    articlesCount.value = count[0].count;
                    }
                } catch (e) {
                    console.error(e);
                } finally {
                    loading.value = false;
                }
            };
      const onChangePage = async (newPage) => {
        articles.value = [];
        loading.value = true;
        window.scrollTo(0, 0);
        await loadArticles(newPage);
      };
  
  
      const getSizedImage = (url, size) => {
          return url && url
          .replace(/attachments.cbd.int\//, '$&' + size + '/')
          .replace(/\.s3-website-us-east-1\.amazonaws\.com\//, '$&' + size + '/');
      };
      defineExpose({
        loadArticles
     });
</script>
  