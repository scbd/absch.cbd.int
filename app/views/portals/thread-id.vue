<template>
  <div>
    <div v-if="!thread">Loading...</div>

    <h1>{{ thread.subject | lstring }}</h1>

    <post v-if="thread" :post="thread" />

    <post v-if="posts" v-for="reply in posts" :key="reply.postId" :post="reply" />

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
    jumpToAnchor
  },
  async created() {

    const { threadId, forumId } = this;

    const forumsApi = new ForumsApi();

    const qThread = forumsApi.getThread(threadId);
    const qPosts  = forumsApi.getPosts (threadId, { all: true });
    
    this.thread = { ...await qThread, replies:0 };
    this.posts  = await qPosts;
    
    this.$nextTick(()=>jumpToAnchor());
  }
}


</script>
  

