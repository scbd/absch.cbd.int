<template>
  <div class="row">
    <div class="col-lg-8">
      <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@24.0.0/build/ckeditor.css">
      <div>
        <div class="categories-list mt-0 single">
          <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> loading...</div>
          <div v-if="!loading">
            <header>
              <h2>{{article.title[locale]}}</h2>
            </header>
            <div class="detail-custom-tag">
              <div class="inner-area"><i class="fa fa-calendar" aria-hidden="true"></i>&nbsp;{{article.meta.createdOn}}</div> <!-- need apply filter here-->
              <div class="inner-area" v-if="article.customTags.length>0"><i class="fa fa-tag" aria-hidden="true"></i>&nbsp; {{article.customTags}}</div>
            </div>
            <div v-if="article.content != undefined" class="full-details ck ck-content ck-rounded-corners ck-blurred" v-html="article.content[locale]"></div>
          </div>
        </div>
        <div v-if="article.adminTags != undefined">
          <h3>Tags:</h3>
          <div class="tagcloud"><a href="#" class="btn btn-mini" v-for="tag in article.adminTags">{{tag}}</a></div>
        </div>
      </div>
      <button class="btn btn-primary pull-right" href="#" @click="back()">Back</button>
    </div>
    <div class="col-lg-4">
      <div v-if="tag != undefined">
        <relevant-articles :locale="locale" :location="location" :tag="tag"></relevant-articles>
      </div>
      <div>
        <popular-tags :locale="locale" :location="location"></popular-tags>
      </div>
    </div>
  </div>
</template>

<script>
	import i18n from '../../locales/en/components/kb/categories-group';
	import relevantArticles from "./relevant-articles.vue";
	import ArticlesApi from './article-api';
	import popularTags from './popular-tags.vue';

	export default {
		components: {relevantArticles,popularTags},
		props:{
			locale:String,
			location:String
		},
		data:  () => {
			return {
				article: [],
				loading: true
			}
		},
		created(){
			this.tag = JSON.stringify(this.$root.route.params.tag).replace(/"/g, "");
			this.articlesApi = new ArticlesApi();
		},
		async mounted() {
			if(this.$root.route.params == undefined) return;
			let id =   JSON.stringify(this.$root.route.params.id).replace(/"/g, "");
			const article = await this.articlesApi.getArticleById(id);
			if (article?.content != undefined) {
				this.article =  article;
			}
			this.loading = false;
		},
		methods: {
			back(){
				window.history.back();
			}
		},
		i18n: { messages:{ en: i18n }} //will be used for locales language
	}
</script>
