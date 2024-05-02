<template>
  <div>
    <cbd-article :id="articleId" v-if="articleId">
      <!-- @load="onArticleLoad($event)" :admin-tags="adminTags" -->
      <template #article-empty>&nbsp;</template>
    </cbd-article>
  </div>
</template>
  
<script>

import { mapObjectId, isObjectId } from '~/api/api-base.js';
import  cbdArticle  from './cdd-article.vue';

export default {
  name: 'ArticleId',
  components:{ CbdArticle:cbdArticle },
  props: {
    articleId: String,
  },
  data() {
    return {
      articleQuery: null
    }
  },
  computed: {
    portalId() { return this.$route.params.portalId; },
  },
  async created() {

    const { portalId, articleId } = this;


    var ag = [];

    if (isObjectId(articleId))
    {
      console.log('articleId:', articleId)
      ag.push({ $match: { _id: mapObjectId(articleId) } });
    }
    this.articleQuery = { ag : JSON.stringify(ag) };

  }

}
</script>
  

