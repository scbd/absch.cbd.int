<template>
  <div>
    <div v-if="!thread">Loading...</div>
    <div v-else>

      <h1>{{ thread.subject | lstring }}</h1> 

      <post :post="thread" @refresh="refresh()"  />

      <post v-if="posts" v-for="reply in posts" :key="reply.postId" :post="reply" @refresh="load()" />
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
    forumId: Number,
    threadId: Number
  },
  data() {
    return {
      thread: null,
      posts: null
    }
  },
  computed: {
    portalId() { return this.$route.params.portalId; },
  },
  methods: {
    jumpToAnchor,
    load
  },

  async created() { 
    await this.load();
    this.$nextTick(()=>jumpToAnchor());
  }
};


async function load() {

  const { threadId, forumId } = this;

  const forumsApi = new ForumsApi();

  const qThread = forumsApi.getThread(threadId);
  const qPosts  = forumsApi.getPosts (threadId, { all: true });
  
  this.thread = { ...await qThread, replies:0 };
  this.posts  = await qPosts;
}

</script>
  

