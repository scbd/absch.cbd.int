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
                <a href="#" @click="goToArticle(article, realmTag)">
									<span class="article-title">
										{{article.title[$locale]}}
									</span>
                  <div class="article-summary" @click="goToArticle(article, realmTag)">
                    {{article.summary ? article.summary[$locale] : ''}}...
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
</template>
<script>

import i18n from '../../locales/en/components/kb.json';
import paginate from './pagination.vue';
import ArticlesApi from './article-api';
import {formatDate} from './filters';
import KbCategories from '../../app-data/kb-categories.json';

export default {
  name:'KbArticlesByTag',
  components:{
    paginate,
  },
  props:{
  },
  created(){
    this.articlesApi = new ArticlesApi();
  },
  data:  () => {
    return {
      articles: [],
      loading: true,
      tagDetails: {},
      articlesCount:0,
      pageNumber:1,
      recordsPerPage:10,
      realmTag:'',
      search:''
    }
  },
  mounted() {
    if(this.$route.params.search){
       this.search = (this.$route.params.search).replace(/"/g, "");
    }
    this.realmTag = this.$realm.is('BCH') ? 'bch' : 'abs';
      this.loadArticles(1);
  },
  filters: {
    dateFormat: function ( date ) {
      return formatDate(date)
    }
  },
  methods: {
    articleUrl(article, tag){
      const urlTitle = article.title[this.$locale].replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
      return `/kb/tags/${encodeURIComponent(tag)}/${encodeURIComponent(urlTitle)}/${encodeURIComponent(article._id)}`
    },
    goToArticle(article, tag){
      this.$router.push({
        path:this.articleUrl(article, tag)
      });
    },
    tagUrl(tag){
      const tagDetails = KbCategories.find(e=>e.adminTags.includes(tag))
      const tagTitle 	 = (tagDetails?.title||'').replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
      return `/kb/tags/${encodeURIComponent(tag)}/${encodeURIComponent(tagTitle)}`
    },
    goToTag(tag){
      this.$router.push({path: this.tagUrl(tag)});
    },
    onChangePage(pageNumber) {
      this.pageNumber = pageNumber;
      this.article=[];
      this.loading = true;
      this.loadArticles(pageNumber);
    },
    async loadArticles(pageNumber, text){
      if(text){
        this.search = text;
      }
      this.articlesCount= 0;
      this.articles 	  = [];
      this.loading = true;
      const q = {
        $and : [
          { adminTags : this.realmTag },
        ]
      };
      const f = {
        [`title.${this.$locale}`]	: 1,
        [`summary.${this.$locale}`]	: 1,
        adminTags 					: 1,
        "meta.modifiedOn":1, _id:1
      } ;
      if(this.search){
                    q.$and.push({"$or" : [{[`title.${this.$locale}`]: { "$$contains" : encodeURIComponent(this.search)}},
                                              {[`summary.${this.$locale}`]: { "$$contains" : encodeURIComponent(this.search)}}]});
                }
      const groupTags = JSON.stringify([encodeURIComponent(this.realmTag)]);
      const groupLimit = this.recordsPerPage;
      const groupSkip  = (pageNumber-1) * this.recordsPerPage
      const groupSort  = { "meta.modifiedOn":-1 };

      const result = await this.articlesApi.queryArticleGroup('adminTags', { q, f, groupLimit, groupSort, groupTags, groupSkip });
      if(result?.length){

        result.forEach(element => {
          this.articlesCount= this.articlesCount + element.count;
          this.articles 	  = [...this.articles, ...element.articles];
        });
      }

      this.loading = false;

    },
  },
  i18n: { messages:{ en: i18n }}
}
</script>
