<template>
  <div>
    <Article v-if="article" :article="article">
    </Article>
  </div>
</template>
  
<script>

import { mapObjectId, isObjectId } from '~/api/api-base.js';
import ArticlesApi from '~/api/articles';
import Article from '~/components/articles/article.vue';

export default {
  name: 'ArticleId',
  components:{ Article },
  props: {
    identifier: String,
  },
  data() {
    return {
      article: null
    }
  },
  computed: {
    portalId() { return this.$route.params.portalId; },
  },
  async created() {

    const { portalId, identifier } = this;

    const tags = ["realm:BCH", `portal:${portalId}`];

    if (identifier && !isObjectId(identifier))
      tags.push(`${identifier}`); 

    var ag = [{ $match: { adminTags: { $all: tags } } }];

    if (isObjectId(identifier))
      ag.push({ $match: { _id: mapObjectId(identifier) } });

    const articlesApi = new ArticlesApi();

    const [article] = await articlesApi.queryArticles({ ag });

    this.article = article;
  }

}
</script>
  

