<template>
  <div>
    <div v-if="!thread && !error"><loading :caption="$t('loading')"/></div>

    <error-pane v-else-if="error" :error="error" />

    <div v-else>


      <div class="border bg-white thread-control-bar p-2 mb-2 bg-white">
        <div class="row">
          <div v-if="forumUrl" class="col-auto ge-0 align-self-center">
            <a :href="forumUrl.replace(/^\/+/, '')" class="btn btn-light" title="Back to forum">
              <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </a>
          </div>
          <div class="col align-self-center">
            <b>{{ lstring(thread.subject) }}</b>
            <div v-if="forum && forum.isClosed"><em>{{ $t('forumIsClosedForComments') }}</em></div>  
            <div v-else-if="thread.isClosed"><em>{{ $t('threadIsClosedForComments') }}</em></div>  
          </div>

          <div class="col-auto align-self-center">

            <button v-if="isOpen && subscription" :disabled="subscribing"
              class="btn btn-sm" :class="{ 'btn-outline-dark':!subscription.watching, 'btn-dark': subscription.watching }" type="button"
              @click="toggleSubscription()">
              <span v-if="subscription.watching"><i class="fa fa-envelope-o"></i> {{ $t('buttonUnsubscribe') }} </span>
              <span v-else><i class="fa fa-envelope-o"></i> {{ $t('buttonSubscribe') }} </span>
              <i v-if="subscribing" class="fa fa-cog fa-spin"></i>
            </button>

          </div>
        </div>
      </div>

      <h1>{{ lstring(thread.subject) }}</h1> 

      <post :post="thread" class="mb-2" @refresh="refresh()">
        <template v-slot:showReplies="{ replies }">
            <em>
              <a class="anchor-margin" name="replies"></a>
              <span v-if="replies == 0"> {{ $t('linkNoReplies', { count: replies }) }}</span>
              <span v-if="replies == 1"><i class="fa fa-comment"></i> {{ $t('linkOneReply', { count: replies }) }} </span>
              <span v-if="replies  > 1"><i class="fa fa-comments"></i> {{ $t('linkXReplies', { count: replies }) }} </span>
            </em>
        </template>
      </post>


      <div v-if="posts" >
        <post class="mb-2 border-top" v-for="reply in posts" :key="reply.postId" :post="reply" @refresh="refresh()" />
      </div>
    </div>
  </div>
</template>
  
<script>
import ForumsApi from '~/api/forums';
import jumpToAnchor from '~/services/jump-to-anchor.js';
import Post from '~/components/forums/post.vue';
import pending   from '~/services/pending-call'
import Loading  from '~/components/common/loading.vue'
import ErrorPane from '~/components/common/error.vue';
import i18n from "~/app-text/views/portals/forums.json";
import { lstring } from '../../components/kb/filters';

export default {
  name: 'Forum',
  i18n: { messages: { en: i18n } },
  components: { Post, Loading, ErrorPane },
  props: {
    threadId: Number
  },
  data() {
    return {
      forum: null,
      thread: null,
      posts: null,
      error: null,
      subscription: null,
      subscribing: false,
    }
  },
  computed: {
    portalId() { return this.$route.params.portalId; },
    loggedIn() { return this.$auth.loggedIn; },
    isOpen()   { return this.thread?.isOpen; },
    forumUrl() { 
      const threadPathPart = /\/thread\/\d+$/;
      const { threadId } = this;
      const { path } = this.$route;
      
      if(!threadPathPart.test(path)) return null;

      const forumUrl = `${path.replace(threadPathPart, "")}#${encodeURIComponent(threadId)}`;

      return forumUrl;
    }
  },
  watch: {
    loggedIn: load
  },
  methods: {
    lstring,
    load,
    refresh : load,
    toggleSubscription: pending(toggleSubscription, function(on) { this.subscribing = on }),
  },

  async created() { 
    this.ready = this.load();
  },
  async mounted() {

    await this.ready;

    this.$nextTick(()=>{ 

      let { hash } = this.$route;
      const postIdRe = /^#?(\d+)-.*/;
    
      if(postIdRe.test(hash)) {
        hash = hash.replace(postIdRe, "#$1");
      }

      jumpToAnchor(hash);    
    });

  }
};

async function load() {

  this.error = null;

  try {

    const { threadId, loggedIn } = this;

    const forumsApi = new ForumsApi();

    const qThread = forumsApi.getThread(threadId);
    const qPosts  = forumsApi.getPosts (threadId, { all: true });

    const thread = await qThread
    const { forumId } = thread; 
    const qForum = forumsApi.getForum(forumId);
    const qWatch = loggedIn ? forumsApi.getThreadSubscription(threadId) : null;
    
    this.thread = thread;
    this.posts  = await qPosts;
    this.forum  = await qForum;
    this.subscription = await qWatch;
  }
  catch(err) {
    this.error = err;
  }
}

async function toggleSubscription() {

  const { threadId, subscription } = this;
  const { watching } = subscription || { watching: false };
  const forumsApi = new ForumsApi();

  const qWatch = watching 
              ? forumsApi.deleteThreadSubscription(threadId)
              : forumsApi.addThreadSubscription(threadId);

  this.subscription = await qWatch;
}


</script>
  


<style scoped>

.thread-control-bar {
  position: sticky; 
  top: 0px;
  z-index:1;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
}

.anchor-margin {
  scroll-margin-top:50px;
}

.ge-0 {
  padding-right: 0px;
}

body[dir="rtl"] .ge-0 {
  padding-left: 0px;
}

</style>