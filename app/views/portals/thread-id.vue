<template>
  <div>
    <div v-if="!thread"><loading caption="Loading..."/></div>
    <div v-else>

      <div class="p-2 mb-2 bg-white">
        <div class="row">
          <div class="col align-self-center">

            <div v-if="!isOpen" class="alert alert-secondary" role="alert">
              This thread is closed to comments.
            </div>

          </div>
          <div v-if="loggedIn" class="col-auto align-self-center">

            <button v-if="isOpen && subscription" :disabled="subscribing"
              class="btn btn-sm" :class="{ 'btn-outline-dark':!subscription.watching, 'btn-dark': subscription.watching }" type="button"
              @click="toggleSubscription()">
              <span v-if="subscription.watching"><i class="fa fa-envelope-o"></i> Unsubscribe from topic mailing list</span>
              <span v-else><i class="fa fa-envelope-o"></i> Subscribe to topic mailing list</span>
              <i v-if="subscribing" class="fa fa-cog fa-spin"></i>
            </button>

          </div>
        </div>
      </div>

      <h1>{{ thread.subject | lstring }}</h1> 

      <post :post="thread" class="mb-2" @refresh="refresh()"  />

      <a name="replies"></a>

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

export default {
  name: 'Forum',
  components: { Post, Loading },
  props: {
    threadId: Number
  },
  data() {
    return {
      forum: null,
      thread: null,
      posts: null,
      subscription: null,
      subscribing: false,
    }
  },
  computed: {
    portalId() { return this.$route.params.portalId; },
    loggedIn() { return this.$auth.loggedIn; },
    isOpen()   { return this.thread?.isOpen; },

  },
  methods: {
    jumpToAnchor,
    load,
    async refresh() { this.load(); },
    toggleSubscription: pending(toggleSubscription, function(on) { this.subscribing = on }),
  },

  async created() { 
    await this.load();
    this.$nextTick(()=>jumpToAnchor());
  }
};

async function load() {

  const { threadId } = this;

  const forumsApi = new ForumsApi();

  const qThread = forumsApi.getThread(threadId);
  const qPosts  = forumsApi.getPosts (threadId, { all: true });
  const qWatch   = forumsApi.getThreadSubscription(threadId);

  const thread = await qThread
  const { forumId } = thread; 
  const qForum = forumsApi.getForum(forumId);
  
  this.thread = { ...thread, replies:0 };
  this.posts  = await qPosts;
  this.forum  = await qForum;
  this.subscription = await qWatch;
}

async function toggleSubscription() {

  const { threadId, subscription } = this;
  const { watching } = subscription;
  const forumsApi = new ForumsApi();

  const qWatch = watching 
              ? forumsApi.deleteThreadSubscription(threadId)
              : forumsApi.addThreadSubscription(threadId);

  this.subscription = await qWatch;
}


</script>
  


<style scoped>

.anchor-margin {
  scroll-margin-top:20px;
}

</style>