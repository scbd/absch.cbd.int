<template>
  <div>

    <h1 v-if="!article && forum">{{ forum.title | lstring }}</h1>

    <cbd-article :query="articleQuery" v-if="articleQuery" :hide-cover-image="true" :show-edit="true"
      @load="onArticleLoad($event)" :admin-tags="articleAdminTags">
      <template #article-empty>&nbsp;</template>
    </cbd-article>
        
    <div v-if="forum">

      <div v-if="threads && threads.length" class=" mb-3">
        <h3>Table of Contents</h3>
        <ul>
          <li v-for="thread in threads" :key="thread.threadId">
            <a @click.prevent="jumpToAnchor(`thread${thread.threadId}`)" :href="`#thread${thread.threadId}`">{{
              thread.subject | lstring }}</a>
          </li>
        </ul>
      </div>

      <div v-if="forum.security.canPost || forum.security.canEdit || loggedIn" class="border forum-control-bar p-2 mb-2 bg-white">
        <div class="row">
          <div class="col align-self-center">
            <a v-if="forum.security.canEdit" class="btn btn-light btn-sm" type="button"
              :href="`https://bch.cbd.int/cms/ui/forums/management/forummanagement.aspx?forumid=${encodeURIComponent(forumId)}&returnurl=${encodeURIComponent(browserUrl())}`">
              <i class="fa fa-cog"></i> Forum properties
            </a>
          </div>
          <div class="col-auto align-self-center">

            <button v-if="subscription" :disabled="subscribing"
              class="btn btn-sm" :class="{ 'btn-outline-dark':!subscription.watching, 'btn-dark': subscription.watching }" type="button"
              @click="toggleSubscription()">
              <span v-if="subscription.watching"><i class="fa fa-envelope-o"></i> Unsubscribe from mailing list</span>
              <span v-else><i class="fa fa-envelope-o"></i> Subscribe to mailing list</span>
              <i v-if="subscribing" class="fa fa-cog fa-spin"></i>
            </button>

            <button v-if="forum.security.canPost" class="btn btn-success btn-sm" :disabled="!loggedIn" type="button"
              @click="edit = { forumId: forumId }">
              <i class="fa fa-plus"></i> New Topic
            </button>
          </div>
        </div>
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

            <post :post="{ ...thread, replies: 0 }" @refresh="refresh($event)" />

          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col align-self-center">
                <a v-if="thread.replies == 0" :href="`${getThreadUrl(thread.threadId)}`">No replies</a>
                <a v-if="thread.replies == 1" :href="`${getThreadUrl(thread.threadId)}#replies`">Read the reply »</a>
                <a v-if="thread.replies > 1" :href="`${getThreadUrl(thread.threadId)}#replies`">Read the {{ thread.replies }}
                  replies »</a>
              </div>
              <div class="col-auto align-self-center">
              </div>
            </div>
          </div>
        </div>

      </div>

      <div>
        <div class="row">
          <div class="col align-self-center">
          </div>
          <div class="col-auto align-self-center">
            <button v-if="forum.security.canPost" class="btn btn-primary btn-sm" :disabled="!loggedIn" type="button"
              @click="edit = { forumId: forumId }">
              <i class="fa fa-plus"></i> New Topic
            </button>
          </div>
        </div>
      </div>

      <edit-post v-if="edit" class="p-2" v-bind="edit" @close="edit = null; refresh($event)"></edit-post>
    </div>

  </div>
</template>
  
<script>
import ForumsApi from '~/api/forums';
import jumpToAnchor from '~/services/jump-to-anchor.js';
import { cbdArticle } from 'scbd-common-articles';
import Post from '~/components/forums/post.vue';
import EditPost from '~/components/forums/edit-post.vue';
import pending   from '~/services/pending-call'

export default {
  name: 'Forum',
  components: {
    CbdArticle: cbdArticle,
    Post,
    EditPost,
  },
  props: {
    forumId: Number
  },
  data() {
    return {
      article: null,
      articleQuery: null,
      articleAdminTags: null,
      forum: null,
      subscription: null,
      subscribing: false,
      threads: [],
      edit: null
    }
  },
  computed: {
    portalId() { return this.$route.params.portalId; },
    loggedIn() { return this.$auth.loggedIn; },
  },
  methods: {
    jumpToAnchor,
    getThreadUrl,
    onArticleLoad,
    refresh,
    toggleSubscription: pending(toggleSubscription, function(on) { this.subscribing = on }),
    browserUrl() { return window.location.href; }
  },
  async created() {

    const { portalId, forumId } = this;

    this.articleAdminTags = ["introduction", `forum:${forumId}`];

    var ag = [{ $match: { adminTags: { $all: this.articleAdminTags } } }];
    this.articleQuery = { ag: JSON.stringify(ag) };

    const forumsApi = new ForumsApi();
    const qForum = forumsApi.getForum(forumId);
    const qThreads = forumsApi.getThreads(forumId);
    const qWatch   = forumsApi.getForumSubscription(forumId);

    this.forum   = await qForum;
    this.threads = await qThreads
    this.subscription = await qWatch

    this.$nextTick(() => jumpToAnchor());
  }
}

function getThreadUrl(threadId) {
  return `${this.$route.path}/thread/${encodeURIComponent(threadId)}`.replace(/^\/+/, '');
}

function onArticleLoad(article) {
  this.article = article;
  if (!article && !this.$auth?.hasScope(['oasisArticleEditor', 'Administrator'])) {
    this.articleQuery = undefined;
    return;
  }
}

function refresh({ threadId, postId }) {

  if (threadId != postId) {
    const path = this.getThreadUrl(threadId);
    const hash = `${postId}`;

    this.$router.push({ path, hash });
  }
}

async function toggleSubscription() {

  const { forumId, subscription } = this;
  const { watching } = subscription;
  const forumsApi = new ForumsApi();

  const qWatch = watching 
               ? forumsApi.deleteForumSubscription(forumId)
               : forumsApi.addForumSubscription(forumId);

  this.subscription = await qWatch;
}

</script>
 
<style scoped>

.forum-control-bar {
  position: sticky; 
  top: 0px;
  z-index:1;
}

</style>