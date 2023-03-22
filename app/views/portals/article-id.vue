<template>
  <div>
    <cbd-article :query="articleQuery" v-if="articleQuery" :hide-cover-image="true" :show-edit="true">
      <!-- @load="onArticleLoad($event)" :admin-tags="adminTags" -->
      <template #article-empty>&nbsp;</template>
    </cbd-article>
  </div>
</template>
  
<script>

import { mapObjectId, isObjectId } from '~/api/api-base.js';
import { cbdArticle } from 'scbd-common-articles';

export default {
  name: 'ArticleId',
  components:{ CbdArticle:cbdArticle },
  props: {
    identifier: String,
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

    const { portalId, identifier } = this;


    var ag = [];

    if (isObjectId(identifier))
      ag.push({ $match: { _id: mapObjectId(identifier) } });

    this.articleQuery = { ag : JSON.stringify(ag) };

  }

}
</script>
  

