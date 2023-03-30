<template>
  <div>
    <div v-if="!thread">Loading...</div>
    <div v-else>

      <h1>{{ thread.subject | lstring }}</h1> 

      <post :post="thread" class="mb-2" @refresh="refresh()"  />

      <a name="replies"></a>

      <post v-if="posts" class="mb-2 border-top" v-for="reply in posts" :key="reply.postId" :post="reply" @refresh="refresh()" />
    </div>
  </div>
</template>
  
<script>
import ForumsApi from '~/api/forums';
import jumpToAnchor from '~/services/jump-to-anchor.js';
import Post from '~/components/forums/post.vue';

export default {
  name: 'Forum',
  components: { Post },
  props: {
    threadId: Number
  },
  data() {
    return {
      forum: null,
      thread: null,
      posts: null
    }
  },
  computed: {
    portalId() { return this.$route.params.portalId; },
  },
  methods: {
    jumpToAnchor,
    load,
    async refresh() { this.load(); }
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

  const thread = await qThread
  const { forumId } = thread; 
  const qForum = forumsApi.getForum(forumId);
  
  this.thread = { ...thread, replies:0 };
  this.posts  = await qPosts;
  this.forum  = await qForum;
}

</script>
  

