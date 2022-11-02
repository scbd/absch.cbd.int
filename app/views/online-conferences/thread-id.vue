<template>
  <div>


    <div v-if="!thread">Loading...</div>

    <div v-if="thread">
      <span class="float-end">#{{thread.threadId}}</span>
      <h1>
        <a :name="`post${thread.threadId}`"></a>
        {{ thread.subject | lstring }}
      </h1>

      <p class="card-text" v-html="thread.htmlMessage"></p>

      <span class="float-end">{{thread.createdOn}}</span>
      <em>{{thread.createdBy}}</em>


      <hr >

      <div v-if="thread.attachmentCount">
        <h6 class="card-subtitle mb-2 text-muted">File(s)</h6>
        <ul class="list-unstyled">
          <li v-for="attachment in thread.attachments" :key="attachment.attachmentId">
            <a :href="`/api/v2014/discussions/attachments/${attachment.attachmentId}`" class="card-link">
              {{attachment.name}}
            </a>
          </li>
        </ul>
      </div>
      <div v-if="!posts">Loading {{thread.replies}} replies...</div>
    </div>


    <div v-for="post in posts" :key="post.postId">
      <a :name="`post${post.postId}`"></a>
      <hr>

      <span class="float-end">#{{post.postId}}</span>
      <h5 v-if="post.subject != thread.subject && post.subject != `RE: ${thread.subject}`">
        {{ post.subject | lstring }}</span>
      </h5>
      <p class="float-none" v-html="post.htmlMessage"></p>

      <span class="float-end">{{post.createdOn}}</span>
      <em>{{post.createdBy}}</em>
      <a v-if="post.replies">
        - TODO: {{post.replies}} replies <i class="fa fa-caret-down"></i>
      </a>
    </div>
  </div>
</template>
  
<script>
import ForumsApi from '~/api/forums';
import jumpToAnchor from '~/services/jump-to-anchor.js';

export default {
  name: 'Forum',
  components: {  },
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
    const qPosts  = forumsApi.getPosts (threadId);
    
    this.thread = await qThread;
    this.posts  = await qPosts;
    
    this.$nextTick(()=>jumpToAnchor());
  }
}


</script>
  

