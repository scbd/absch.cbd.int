<template>
  <div class="widget fix widget_categories mt-2">
    <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> loading...</div>
    <span class="icon icon-folder"></span>
    <h4>Popular Tags</h4>
    <div class="tag-scroll" v-if="!loading">
      <div class="tagcloud" v-for="tag in tags">
        <a href="#" class="btn btn-mini" @click="goToTag(tag.title)">{{tag.title}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import ArticlesApi from './article-api';
import i18n from '../../locales/en/components/kb/categories-group';
export default {
  props:{
  },
  data:  () => {
    return {
      tags: [],
      loading: true
    }
  },
  created(){
    this.articlesApi = new ArticlesApi();
  },
  async mounted() {
		let ag = [];
		ag.push({"$project" : {"title":1}});
		ag.push({"$l" : 10});
		ag.push({"$sk" : 20});
		const qs = {
			"ag" : JSON.stringify(ag)
		};
    const tags = await this.articlesApi.getArticleAdminTags({qs});
    if (tags.length>0){
      this.tags =  tags;
      this.loading = false;
    }
  },
  methods: {
    goToTag(tag){
      this.$router.push({path:`/kb/tags/${tag}`});
    }
  },
  i18n: { messages:{ en: i18n }} 
}
</script>

