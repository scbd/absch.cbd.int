<template>
    <div>    
      <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg"></i> {{ t("loading") }}...</div>
      <div v-if="!loading">
        <div class="article-by-tags" v-if="articles">
          <h4>
            {{t("searchResults") }} <span><small>({{articlesCount}})</small></span>      
          </h4>
          <hr>
          <div v-for="article in articles" :key="article.id">
            <div class="card mb-3">
              <div class="d-flex flex-row bd-highlight ">
                <div class="p-2 bd-highlight" v-if="article.coverImage">
                  <img class="img-fluid img-thumbnail" style="max-height:140px;"
                    v-bind:src="getSizedImage(article.coverImage.url, '300x300')">
                </div>              
                <div class="p-2 bd-highlight w-100">
                  <div class="card-body">                  
                    <span class="badge bg-secondary position-absolute top-0 end-0">
                      {{formatDate(article?.createdDate, 'DD MMM YYYY')}}</span>
                      
                    <h5 class="card-title"><a class="link-dark"
                        :href="`${articleUrl(article, getTag(article.adminTags) )}`">{{article.title}}</a>                      
                    </h5>
                    <p v-if="article.summary" class="card-text h-100">
                      <a class="link-dark" :href="`${articleUrl(article, getTag(article.adminTags) )}`">
                        {{article.summary}}
                      </a>
                    </p>
  
                    <div class="inner-area">
                      <i class="fa fa-tag" aria-hidden="true"></i>
                      <a class="btn btn-mini" :href="`${tagUrl(tag)}`" v-for="tag in article.adminTags" :key="tag">{{tag}}</a>
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
        <div v-if="error" class="alert alert-danger">
          {{ t("errorLoading") }}
        </div>
      </div>
      <div class="d-inline-block" v-if="articlesCount>10">
        <paginate :records-per-page="recordsPerPage" :record-count="articlesCount" @changePage="onChangePage"
          :current-page="pageNumber"></paginate>
      </div>
    </div>
  </template>
  
  <script setup>
      import { ref, onMounted } from "vue";
      import { useI18n } from 'vue-i18n';
      import messages from '../../app-text/components/kb.json';
      import { useRoute } from "@scbd/angular-vue/src/index.js";
      import { loadKbCategories, getUrl, getRealmArticleTag } from '../../services/composables/articles.js';
      import paginate from '../common/pagination.vue';
      import SolrApi from "~/api/solr.js";
      import "../kb/filters";
      import { escape } from '../../services/solr/queries.js';
      import { formatDate } from './filters';
      import { OASIS_REALM } from '~/services/filters/constant';

      const route = useRoute().value;
      const { t, locale } = useI18n({ messages });
      const solrAPI = new SolrApi(); 
      const articles = ref([]);
      const loading = ref(true);
      const pageNumber = ref(1);
      const recordsPerPage = ref(10);
      const realmTag = ref('');
      const categories = ref([]);
      const search = ref('');
      const articlesCount = ref(0);
      const error = ref(false);
      const realmArticleTag = getRealmArticleTag();

      onMounted( async() => {
          categories.value = await loadKbCategories(locale.value);
          search.value = route.query?.search || "";         
          realmTag.value = realmArticleTag;
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
        if (categories.value && tag) {
          const tagDetails = categories.value.find((e) => e.adminTags.includes(tag));
          const tagTitle = tagDetails?.title || '';
          return getUrl(tagTitle, undefined, tag);
        }
      };
  
      const articleUrl = (article, tag) => {
        return getUrl(article.title, article.id, tag);
      };
  
      const loadArticles = async (page) => {
          pageNumber.value = page;
          articlesCount.value = 0;
          articles.value = [];
          loading.value = true;
          const searchText = search.value;
          const localeKey = locale.value.toUpperCase(); 
          const start = (page - 1) * recordsPerPage.value;
          const rowsPerPage = recordsPerPage.value;

          const escapedSearchText = escape(searchText);
          const query = searchText
            ? `realm_ss:${OASIS_REALM} AND adminTags_ss:${realmTag.value} AND (title_${localeKey}_txt:${escapedSearchText} OR text_${localeKey}_txt:${escapedSearchText} OR summary_${localeKey}_txt:${escapedSearchText} OR content_${localeKey}_txt:${escapedSearchText})`
            : '*:*';

          try {
            const result = await solrAPI.query({
              query, 
              fields: `title:title_${localeKey}_s,summary:summary_${localeKey}_s,coverImage:coverImage_ss,adminTags:adminTags_ss,createdDate:createdDate_dt,id`,
              start,
              rowsPerPage
            });

            const docs = result?.response?.docs || [];

            const totalCount = result?.response?.numFound || 0;
            if (docs.length > 0) {
              articles.value = docs;
              articlesCount.value = totalCount;
            }

          } catch (e) {
            console.error('Solr query error:', e);
            error.value = true;
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
  