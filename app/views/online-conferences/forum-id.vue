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


    <div v-for="thread in threads" :key="thread.threadId">
      <a :name="`thread${thread.threadId}`"></a>
      <div class="card mb-3">
        <h5 class="card-header">
          <a :href="getThreadUrl(thread.threadId)" style="color:inherit">
          {{ thread.subject | lstring }}
          </a>
        </h5>
        <div class="card-body">
          <!-- <h5 class="card-title"></h5> -->
          <p class="card-text" v-html="thread.htmlMessage"></p>

          <div v-if="thread.attachmentCount">
            <hr >
            <h6 class="card-subtitle mb-2 text-muted">Background document(s)</h6>
            <ul class="list-unstyled">
              <li v-for="attachment in thread.attachments" :key="attachment.attachmentId">
                <a :href="`/api/v2014/discussions/attachments/${attachment.attachmentId}`" class="card-link">
                  {{attachment.name}}
                </a>
              </li>
            </ul>
          </div>

        </div>
        <div class="card-footer">
          <a :href="getThreadUrl(thread.threadId)">{{thread.replies}} replies</a>
        </div>
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
    
    this.$nextTick(()=>jumpToAnchor());
  }
}

function getThreadUrl(threadId) {
  return `${this.$route.path}/thread/${encodeURIComponent(threadId)}`.replace(/^\/+/, '');
}

</script>
  

