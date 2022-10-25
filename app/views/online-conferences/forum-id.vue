<template>
  <div>

    <Article v-if="article" :article="article"></Article>

    <div v-if="threads && threads.length" class=" mb-3">
      <h3>TOC</h3>
      <ul>
        <li v-for="thread in threads" :key="thread.threadId">
          <a :href="`#thread${thread.threadId}`">{{ thread.subject | lstring }}</a>
        </li>
      </ul>
    </div>


    <div class="card mb-3" v-for="thread in threads" :key="thread.threadId">
      <h5 class="card-header">
        <a :name="`thread${thread.threadId}`"></a>
        {{ thread.subject | lstring }}
      </h5>
      <div class="card-body">
        <!-- <h5 class="card-title"></h5> -->
        <p class="card-text" v-html="thread.htmlMessage"></p>
      </div>
      <div class="card-footer">
        TODO Attachments
      </div>
    </div>

    <!-- <ng :forum-id="forumId" post-url="http://www" >
        <div v-pre>
          <forum-threads forum-id="forumId" post-url="postUrl"></forum-threads>
        </div>
      </ng> -->

  </div>
</template>
  
<script>
import Article from '~/components/articles/article.vue';
import ArticlesApi from '~/api/articles.js';
import ForumsApi from '~/api/forums';
import VueAngular from './vue-angular.js'
import 'cbd-forums';

export default {
  name: 'Forum',
  components: { ng: VueAngular, Article },
  props: {
    forumId: Number
  },
  data() {
    return {
      article: null,
      threads: []
    }
  },
  computed: {
    portalId() { return this.$route.params.portalId; },
  },
  async created() {

    const { portalId, forumId } = this;

    const tags = ["introduction", `forum:${forumId}`];

    var ag = [{ $match: { adminTags: { $all: tags } } }];

    const articlesApi = new ArticlesApi();
    const forumsApi = new ForumsApi();

    const [article] = await articlesApi.queryArticles({ ag });
    const threads = await forumsApi.getThreads(forumId);

    this.article = article;
    this.threads = threads
  }
}
</script>
  

