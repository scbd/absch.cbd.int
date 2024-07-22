<template>
  <div>

    <h1 v-if="!article && forum">{{ lstring(forum.title) }}</h1>

    <cbd-article ref="refCbdArticle" :query="articleQuery" v-if="articleQuery" :show-cover-image="false" :show-edit="true" :admin-tags="articleAdminTags">
      <template #article-empty>&nbsp;</template>
    </cbd-article>

    <error-pane v-if="error" :error="error" />

    <div v-else-if="forum">

      <div v-if="threads && threads.length" class=" mb-3">
        <h3>{{ t("tableOfContents") }}</h3>
        <ul>
          <li v-for="thread in threads" :key="thread.threadId">
            <a :href="`#${thread.threadId}`">{{
              lstring(thread.subject) }}</a>
          </li>
        </ul>
      </div>

      <div v-if="forum.security.canPost || forum.security.canEdit || loggedIn"
        class="border forum-control-bar p-2 mb-2 bg-white">
        <div class="row">
          <div class="col align-self-center">
            <a v-if="forum.security.canEdit" class="btn btn-light btn-sm" type="button"
              :href="`https://bch.cbd.int/cms/ui/forums/management/forummanagement.aspx?forumid=${encodeURIComponent(forumId)}&returnurl=${encodeURIComponent(browserUrl())}`">
              <i class="fa fa-cog"></i> {{ t('buttonForumProperties') }}
            </a>

            <em v-if="forum.isClosed">{{ t('forumIsClosedForComments') }}</em>
          </div>
          <div v-if="isOpen" class="col-auto align-self-center">

            <loading v-if="loading" :caption="t('refreshing')" />

            <a v-if="hasHelp" class="btn btn-sm" @click="showHelp = true">
              <i class="fa fa-question-circle" aria-hidden="true"></i> {{ t('buttonHelp') }}
            </a>

            <button v-if="subscription" :disabled="subscribing" class="btn btn-sm"
              :class="{ 'btn-outline-dark': !subscription.watching, 'btn-dark': subscription.watching }" type="button"
              @click="pending(toggleSubscription, 'subscribing')">
              <span v-if="subscription.watching"><i class="fa fa-envelope-o"></i> {{ t('buttonUnsubscribe') }} </span>
              <span v-else><i class="fa fa-envelope-o"></i> {{ t('buttonSubscribe') }} </span>
              <loading v-if="subscribing" />
            </button>

            <button v-if="forum.security.canPost" class="btn btn-success btn-sm" :disabled="!loggedIn" type="button"
              @click="edit = { forumId: forumId }">
              <i class="fa fa-plus"></i> {{ t('buttonCreateThread' )}}
            </button>
          </div>
        </div>
      </div>

      <div v-for="thread in threads" :key="thread.threadId">
        <a class="anchor-margin" :name="`${thread.threadId}`"></a>
        <div class="card mb-3" :class="highlightPostClasses(thread.threadId)">
          <h5 class="card-header">

            <i v-if="thread.isPinned" class="float-end fa fa-thumb-tack" :title="t('pinnedThread')"></i>
            
            <a :href="getThreadUrl(thread.threadId)" style="color:inherit">
              {{ lstring(thread.subject) }}
            </a>
            
          </h5>

          <div class="card-body">
            <post :post="thread" @refresh="pending(refresh($event), 'loading')" :highlight-on-hash="false">
              <template v-slot:showReplies="{ replies }">

                <a v-if="replies == 0" class="btn btn-outline-primary btn-sm" :href="`${getThreadUrl(thread.threadId)}`"> {{ t('buttonReadPost') }}</a>
                <a v-if="replies == 1" class="btn btn-outline-primary btn-sm" :href="`${getThreadUrl(thread.threadId)}#replies`"><i class="fa fa-comment"></i> {{ t('buttonReadReply', { count: replies }) }}</a>
                <a v-if="replies  > 1" class="btn btn-outline-primary btn-sm" :href="`${getThreadUrl(thread.threadId)}#replies`"><i class="fa fa-comments"></i> {{ t('buttonReadReplies', { count: replies }) }}</a>


              </template>
            </post>
          </div>

          <div class="card-footer">
            <div class="row">
              <div class="col align-self-center">
                <a v-if="thread.replies == 0" :href="`${getThreadUrl(thread.threadId)}`">{{ t('linkNoReplies') }}</a>
                <a v-if="thread.replies == 1" :href="`${getThreadUrl(thread.threadId)}#replies`">{{ t('linkOneReply') }}</a>
                <a v-if="thread.replies > 1" :href="`${getThreadUrl(thread.threadId)}#replies`">{{ t('linkXReplies', { replies: thread.replies }) }}</a>
                <span v-if="thread.isClosed || forum.isClosed">
                  |
                  <em v-if="forum.isClosed">{{ t('forumIsClosedForComments') }}</em>
                  <em v-else-if="thread.isClosed">{{ t('threadIsClosedForComments') }}</em>
                </span>
                
              </div>
              <div class="col-auto align-self-center">
                <span v-if="thread.lastPostId && thread.lastPostId!=thread.threadId">
                  <a :href="`${getThreadUrl(thread.threadId)}#${thread.lastPostId}`">
                    {{ t('LastReplyOn', {datetime: ""}) }} <relative-datetime class="date" :date="thread.lastPostOn" />
                    {{ t('LastReplyBy', {name: thread.lastPostBy }) }}                   </a>
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <edit-post v-if="edit" class="p-2" v-bind="edit" @close="edit = null; pending(refresh($event), 'loading')"></edit-post>

      <simple-modal v-if="showHelp" @close="showHelp = false" :title="lstring(helpArticle.title)">
        <cbd-article :article="helpArticle" :show-cover-image="true" :show-edit="false"  />
      </simple-modal>

    </div>

    <loading v-if="loading" />

  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import { useRoute, useRouter, useAuth } from "@scbd/angular-vue/src/index.js";
import ForumsApi from '~/api/forums';
import ArticlesApi from '~/api/articles';
import jumpToAnchor from '~/services/jump-to-anchor';
import CbdArticle from '../../components/common/cbd-article.vue';
import Post from '~/components/forums/post.vue';
import EditPost from '~/components/forums/edit-post.vue';
import Loading from '~/components/common/loading.vue';
import pending from '~/services/pending-call';
import RelativeDatetime from '~/components/common/relative-datetime.vue';
import ErrorPane from '~/components/common/error.vue';
import SimpleModal from '~/components/common/modal.vue';
import messages from "~/app-text/views/portals/forums.json";
import { lstring } from '../../components/kb/filters';
import { useI18n } from 'vue-i18n';

const auth = useAuth();
const { t } = useI18n({ messages });
const route = useRoute().value;
const router = useRouter();

const articlesApi = new ArticlesApi({ tokenReader: () => auth.token() });
const forumsApi = new ForumsApi({ tokenReader: () => auth.token() });

const article = ref(null);
const articleQuery = ref(null);
const articleAdminTags = ref(null);
const forum = ref(null);
const threads = ref([]);
const subscription = ref(null);
const subscribing = ref(false);
const loading = ref(false);
const error = ref(null);
const helpArticle = ref(null);
const edit = ref(null);
const refCbdArticle = ref(null);

const loggedIn = computed(() => auth.user()?.isAuthenticated);
const isOpen = computed(() => forum.value?.isOpen);
const hasHelp = computed(() => !!helpArticle.value);
const showHelp =computed({
  get()      { return !!helpArticle?.value?.visible;} , 
  set(value) { if(helpArticle.value) helpArticle.value.visible = value }
})

const props = defineProps({
  forumId: {
    type: Number
  }
});

onMounted(async () => {
 await pending(load(), 'loading');
 nextTick(() => {
      jumpToAnchor();
    });
});


watch(() => loggedIn, async () => {
   await load();
  }
);
watch(() => props.forumId, async () => {
    await pending(load(), 'loading');
  }
);
const browserUrl = () => { 
  return window.location.href;
}

const loadArticle = async () => {
    if (refCbdArticle.value && articleQuery.value) {
      try {
        await refCbdArticle.value.loadArticle(articleQuery.value);
        //ToDo: do we need this condition ?
        // if (!article && !auth.hasScope(['oasisArticleEditor', 'Administrator'])) {
        //   articleQuery.value = undefined;
        //   return;
        // }
      } catch (error) {
        console.error('Failed to fetch article:', error);
      }
    }
  };

const load = async () => { 
  error.value = null;
  try {
    articleAdminTags.value = ["introduction", `forum:${props.forumId}`];
    const ag = [{ $match: { adminTags: { $all: articleAdminTags.value } } }];
    articleQuery.value = { ag: JSON.stringify(ag) };

    const qForum = await forumsApi.getForum(props.forumId);
    const qThreads = await forumsApi.getThreads(props.forumId);
    const qWatch = loggedIn.value ? await forumsApi.getForumSubscription(props.forumId) : null;

    forum.value = qForum;
    threads.value = qThreads;
    subscription.value = qWatch;
    helpArticle.value = await articlesApi.queryArticles({ q: { adminTags: { $all: ['forums', 'getting-help'] } }, fo: 1 });

    await loadArticle();
  } catch (err) {
    error.value = err;
  }
};

const refresh = async (threadId, postId) => { 
  if (threadId != postId) {
    const path =getThreadUrl(threadId);
    const hash = `${postId}`;
    router.push({ path, hash });
  }else if(threadId) {
    threads.value = await forumsApi.getThreads(props.forumId); 
    const hash = `${threadId}`;
    router.push({ hash });
    nextTick(() => {
      jumpToAnchor();
    });
  }
};

const toggleSubscription = async () => {
  const { watching } = subscription.value || { watching: false };
  subscription.value = watching
    ? await forumsApi.deleteForumSubscription(props.forumId)
    : await forumsApi.addForumSubscription(props.forumId);
};
const highlightPostClasses = (postId) => { 
  return route.hash === `#${postId}` ? ['bg-info', 'bg-opacity-25'] : [];
}

const getThreadUrl = (threadId) => { 
  return joinPath(route.path, `thread/${encodeURIComponent(threadId)}`);
}
 
const joinPath = (...parts) => { 
  return parts.map(o => o.replace(/(^\/+|\/+$)/g, '')).join('/');
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