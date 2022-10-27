<template>
  <div>

    <h1 v-if="!article && forum">{{forum.title|lstring}}</h1>

    <Article v-if="article" :article="article"></Article>

    <div v-if="threads && threads.length" class=" mb-3">
      <h4>Table of Content</h4>
      <ul>
        <li v-for="thread in threads" :key="thread.threadId">
          <a @click.prevent="jumpToAnchor(`thread${thread.threadId}`)" :href="`#thread${thread.threadId}`">{{ thread.subject | lstring }}</a>
        </li>
      </ul>
    </div>

    <div class="card mb-3" v-for="thread in threads" :key="thread.threadId">
      <h5 class="card-header">
        <a :name="`thread${thread.threadId}`" :href="getThreadUrl(thread.threadId)">
        {{ thread.subject | lstring }}
        </a>
      </h5>
      <div class="card-body">
        <!-- <h5 class="card-title"></h5> -->
        <p class="card-text" v-html="thread.htmlMessage"></p>

        <hr >

        <h6 class="card-subtitle mb-2 text-muted">Background document(s)</h6>
        <ul class="list-unstyled">
          <li><a href="#" class="card-link">TODO: Report of the Ad Hoc Technical Expert Group on Synthetic Biology</a></li>
          <li><a href="#" class="card-link">TODO: Initial Matrix on indicators.docx</a></li>
        </ul>

      </div>
      <div class="card-footer">
        <a :href="getThreadUrl(thread.threadId)">{{thread.replies}} replies</a>
      </div>
    </div>
  </div>
</template>
  
<script>
import Article from '~/components/articles/article.vue';
import ArticlesApi from '~/api/articles.js';
import ForumsApi from '~/api/forums';
import jumpToAnchor from '~/services/jump-to-anchor.js';

export default {
  name: 'Forum',
  components: { Article },
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
  methods: {
    jumpToAnchor,
    getThreadUrl
  },
  async created() {

    const { portalId, forumId } = this;

    const tags = ["introduction", `forum:${forumId}`];

    var ag = [{ $match: { adminTags: { $all: tags } } }];

    const articlesApi = new ArticlesApi();
    const forumsApi = new ForumsApi();

    const qArticle  = articlesApi.queryArticles({ ag });
    const qForum    = forumsApi.getForum  (forumId);
    const qThreads  = forumsApi.getThreads(forumId);

    this.article = (await qArticle)[0];
    this.forum   =  await qForum;
    this.threads =  await qThreads
  }
}

function getThreadUrl(threadId) {
  return `${this.$route.path}/thread/${encodeURIComponent(threadId)}`.replace(/^\/+/, '');
}

</script>
  

