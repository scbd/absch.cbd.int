<template>
  <div>

    <h1 v-if="!article && forum">{{ forum.title | lstring }}</h1>

    <cbd-article :query="articleQuery" v-if="articleQuery" :hide-cover-image="true" :show-edit="true"
      @load="onArticleLoad($event)" :admin-tags="articleAdminTags">
      <template #article-empty>&nbsp;</template>
    </cbd-article>

    <error-pane v-if="error" :error="error" />

    <div v-else-if="forum">

      <div v-if="threads && threads.length" class=" mb-3">
        <h3>Table of Contents</h3>
        <ul>
          <li v-for="thread in threads" :key="thread.threadId">
            <a :href="`#${thread.threadId}`">{{
              thread.subject | lstring }}</a>
          </li>
        </ul>
      </div>

      <div v-if="forum.security.canPost || forum.security.canEdit || loggedIn"
        class="border forum-control-bar p-2 mb-2 bg-white">
        <div class="row">
          <div class="col align-self-center">
            <a v-if="forum.security.canEdit" class="btn btn-light btn-sm" type="button"
              :href="`https://bch.cbd.int/cms/ui/forums/management/forummanagement.aspx?forumid=${encodeURIComponent(forumId)}&returnurl=${encodeURIComponent(browserUrl())}`">
              <i class="fa fa-cog"></i> Forum properties
            </a>
          </div>
          <div v-if="isOpen" class="col-auto align-self-center">

            <loading v-if="loading" caption="Refreshing...." />


            <button v-if="subscription" :disabled="subscribing" class="btn btn-sm"
              :class="{ 'btn-outline-dark': !subscription.watching, 'btn-dark': subscription.watching }" type="button"
              @click="toggleSubscription()">
              <span v-if="subscription.watching"><i class="fa fa-envelope-o"></i> Unsubscribe from mailing list</span>
              <span v-else><i class="fa fa-envelope-o"></i> Subscribe to mailing list</span>
              <loading v-if="subscribing" />
            </button>

            <button v-if="forum.security.canPost" class="btn btn-success btn-sm" :disabled="!loggedIn" type="button"
              @click="edit = { forumId: forumId }">
              <i class="fa fa-plus"></i> New Topic
            </button>
          </div>
        </div>
      </div>

      <div v-for="thread in threads" :key="thread.threadId">
        <a class="anchor-margin" :name="`${thread.threadId}`"></a>
        <div class="card mb-3" :class="highlightPostClasses(thread.threadId)">
          <h5 class="card-header">

            <i v-if="thread.isPinned" class="float-end fa fa-thumb-tack" title="This post is pinned to remain at the top of the thread list"></i>
            
            <a :href="getThreadUrl(thread.threadId)" style="color:inherit">
              {{ thread.subject | lstring }}
            </a>
            
          </h5>

          <div class="card-body">
            <post :post="thread" @refresh="refresh($event)" :highlight-on-hash="false">
              <template v-slot:showReplies="{ replies }">

                <a v-if="replies == 0" class="btn btn-outline-primary btn-sm" :href="`${getThreadUrl(thread.threadId)}`">Read the post »</a>
                <a v-if="replies == 1" class="btn btn-outline-primary btn-sm" :href="`${getThreadUrl(thread.threadId)}#replies`"><i class="fa fa-comment"></i> Read the reply »</a>
                <a v-if="replies  > 1" class="btn btn-outline-primary btn-sm" :href="`${getThreadUrl(thread.threadId)}#replies`"><i class="fa fa-comments"></i> Read the {{ replies  }} replies  »</a>


              </template>
            </post>
          </div>

          <div class="card-footer">
            <div class="row">
              <div class="col align-self-center">
                <a v-if="thread.replies == 0" :href="`${getThreadUrl(thread.threadId)}`">No replies</a>
                <a v-if="thread.replies == 1" :href="`${getThreadUrl(thread.threadId)}#replies`">One reply</a>
                <a v-if="thread.replies > 1" :href="`${getThreadUrl(thread.threadId)}#replies`">{{ thread.replies }} replies</a>
                <span v-if="thread.isClosed">
                  |
                  <em>This thread is closed for comments</em>
                </span>
                
              </div>
              <div class="col-auto align-self-center">
                <span v-if="thread.lastPostId && thread.lastPostId!=thread.threadId">
                  <a :href="`${getThreadUrl(thread.threadId)}#${thread.lastPostId}`">
                    Last reply <relative-datetime class="date" :date="thread.lastPostOn"></relative-datetime> by
                    {{ thread.lastPostBy }},
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <edit-post v-if="edit" class="p-2" v-bind="edit" @close="edit = null; refresh($event)"></edit-post>
    </div>

    <loading v-if="loading" />

  </div>
</template>
  
<script>
import ForumsApi from '~/api/forums';
import jumpToAnchor from '~/services/jump-to-anchor.js';
import { cbdArticle } from 'scbd-common-articles';
import Post from '~/components/forums/post.vue';
import EditPost from '~/components/forums/edit-post.vue';
import pending   from '~/services/pending-call'
import Loading  from '~/components/common/loading.vue'
import RelativeDatetime from '~/components/common/relative-datetime.vue';
import ErrorPane from '~/components/common/error.vue';

export default {
  name: 'Forum',
  components: {
    CbdArticle: cbdArticle,
    Post,
    EditPost,
    Loading,
    ErrorPane,
    RelativeDatetime
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
      threads: [],
      subscription: null,
      subscribing: false,
      loading:false,
      error: null,
      edit: null
    }
  },
  computed: {
    portalId() { return this.$route.params.portalId; },
    loggedIn() { return this.$auth.loggedIn; },
    isOpen()   { return this.forum?.isOpen; },
  },
  watch: {
    loggedIn: load
  },
  methods: {
    getThreadUrl,
    onArticleLoad,
    refresh:            pending(refresh, 'loading'),
    load:               pending(load, 'loading'),
    toggleSubscription: pending(toggleSubscription, 'subscribing'),
    browserUrl() { return window.location.href; },
    highlightPostClasses,
  },

  async created() {

    this.forumsApi = new ForumsApi();

    await this.load();

    this.$nextTick(() => jumpToAnchor());
  }
}

async function load() {

  this.error = null;

  try {

    const { forumsApi, forumId, loggedIn} = this;

    this.articleAdminTags = ["introduction", `forum:${forumId}`];

    var ag = [{ $match: { adminTags: { $all: this.articleAdminTags } } }];
    this.articleQuery = { ag: JSON.stringify(ag) };

    const qForum   = forumsApi.getForum(forumId);
    const qThreads = forumsApi.getThreads(forumId);
    const qWatch   = loggedIn ? forumsApi.getForumSubscription(forumId) : null;

    this.forum   = await qForum;
    this.threads = await qThreads
    this.subscription = await qWatch
  }
  catch(err) {
    this.error = err;
  }
}

async function refresh({ threadId, postId }) {


  if (threadId != postId) {

    const path = this.getThreadUrl(threadId);
    const hash = `${postId}`;

    this.$router.push({ path, hash });
  }
  else if(threadId) {

    const { forumsApi, forumId } = this;
    const hash = `${threadId}`;

    this.threads = await forumsApi.getThreads(forumId);

    this.$router.push({ hash });

    this.$nextTick(() => jumpToAnchor());
  }
}

async function toggleSubscription() {

  const { forumId, subscription } = this;
  const { watching } = subscription || { watching: false };
  const forumsApi = new ForumsApi();

  const qWatch = watching 
              ? forumsApi.deleteForumSubscription(forumId)
              : forumsApi.addForumSubscription(forumId);

  this.subscription = await qWatch;
}

function highlightPostClasses(postId) {

  if(this.$route.hash == `#${postId}`)
    return ['bg-info', 'bg-opacity-25'];
  
  return [];
}

function getThreadUrl(threadId) {
  return joinPath(this.$route.path, `thread/${encodeURIComponent(threadId)}`);
}

function joinPath(...parts) {
  return parts.map(o=>o.replace(/(^\/+|\/+$)/g, '')).join('/');
}

function onArticleLoad(article) {
  
  this.article = article;

  if (!article && !this.$auth?.hasScope(['oasisArticleEditor', 'Administrator'])) {
    this.articleQuery = undefined;
    return;
  }
}

</script>
 
<style scoped>

.forum-control-bar {
  position: sticky; 
  top: 0px;
  z-index:1;
}

.anchor-margin {
  scroll-margin-top:50px;
}

</style>