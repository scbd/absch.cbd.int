<template>
  <div>
    <div v-if="!thread && !error">
      <loading :caption="t('loading')"/>
    </div>
    <error-pane v-else-if="error" :error="error" />
    <div v-else>
      <div class="border bg-white thread-control-bar p-2 mb-2">
        <div class="row">
          <div v-if="forumUrl" class="col-auto ge-0 align-self-center">
            <a :href="forumUrl.replace(/^\/+/, '')" class="btn btn-light" :title="t('backToForum')">
              <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </a>
          </div>
          <div class="col align-self-center">
            <b>{{ lstring(thread.subject) }}</b>
            <div v-if="forum?.isClosed"><em>{{ t('forumIsClosedForComments') }}</em></div>
            <div v-else-if="thread?.isClosed"><em>{{ t('threadIsClosedForComments') }}</em></div>
          </div>
          <div class="col-auto align-self-center">
            <button v-if="isOpen && subscription" :disabled="subscribing"
              class="btn btn-sm" :class="{ 'btn-outline-dark': !subscription.watching, 'btn-dark': subscription.watching }" type="button"
              @click="toggleSubscription()">
              <span v-if="subscription.watching"><i class="fa fa-envelope-o"></i> {{ t('buttonUnsubscribe') }} </span>
              <span v-else><i class="fa fa-envelope-o"></i> {{ t('buttonSubscribe') }} </span>
              <i v-if="subscribing" class="fa fa-cog fa-spin"></i>
            </button>
          </div>
        </div>
      </div>
      <h1>{{ lstring(thread.subject) }}</h1>
      <post :post="thread" class="mb-2" @refresh="load()">
        <template v-slot:showReplies="{ replies }">
          <em>
            <a class="anchor-margin" name="replies"></a>
            <span v-if="replies == 0">{{ tc('linkXReplies', { count: replies }) }}</span>
            <span v-if="replies == 1"><i class="fa fa-comment"></i> {{ tc('linkXReplies', { count: replies }) }}</span>
            <span v-if="replies  > 1"><i class="fa fa-comments"></i> {{ tc('linkXReplies', { count: replies }) }}</span>
          </em>
        </template>
      </post>
      <div v-if="posts">
        <post class="mb-2 border-top" v-for="reply in posts" :key="reply.postId" :post="reply" @refresh="load()" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useRoute, useAuth } from "@scbd/angular-vue/src/index.js";
import ForumsApi from '~/api/forums';
import jumpToAnchor from '~/services/jump-to-anchor.js';
import Post from '~/components/forums/post.vue';
import Loading from '~/components/common/loading.vue';
import ErrorPane from '~/components/common/error.vue';
import messages from "~/app-text/views/portals/forums.json";
import { lstring } from '../../components/kb/filters';
import { useI18n } from 'vue-i18n';

const auth = useAuth();
const { t, tc } = useI18n({ messages });
const route = useRoute().value;
const forumsApi = new ForumsApi({ tokenReader: () => auth.token() });

const props = defineProps({
  threadId: Number,
});

const forum = ref(null);
const thread = ref(null);
const posts = ref(null);
const error = ref(null);
const subscription = ref(null);
const subscribing = ref(false);

const loggedIn = computed(() => auth.user()?.isAuthenticated);
const isOpen = computed(() => thread.value?.isOpen);

const forumUrl = computed(() => {
  const threadPathPart = /\/thread\/\d+$/;
  const { path } = route;

  if (!threadPathPart.test(path)) return null;

  return `${path.replace(threadPathPart, '')}#${encodeURIComponent(props.threadId)}`;
});

onMounted(async () => {
  await load();

  nextTick(() => {
    let { hash } = route;
    const postIdRe = /^#?(\d+)-.*/;

    if (postIdRe.test(hash)) {
      hash = hash.replace(postIdRe, '#$1');
    }

    jumpToAnchor(hash);
  });
});

watch(loggedIn, async () => {
  await load();
});

async function load() {
  error.value = null;

  try {
    thread.value = await forumsApi.getThread(props.threadId);
    posts.value = await forumsApi.getPosts(props.threadId, { all: true });

    const { forumId } = thread.value;
    forum.value = await forumsApi.getForum(forumId);
    subscription.value = loggedIn.value ? await forumsApi.getThreadSubscription(props.threadId) : null;
  } catch (err) {
    error.value = err;
  }
}

async function toggleSubscription() {
  const { watching } = subscription || { watching: false };
  const qWatch = watching 
              ? forumsApi.deleteThreadSubscription(props.threadId)
              : forumsApi.addThreadSubscription(props.threadId);

  subscription.value = await qWatch;
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