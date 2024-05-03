<template>
  <div>
    <cbd-article :query="articleQuery" v-if="articleQuery">
      <!-- @load="onArticleLoad($event)" :admin-tags="adminTags" -->
      <template #article-empty>&nbsp;</template>
    </cbd-article>
  </div>
</template>

<script setup>
import { mapObjectId, isObjectId } from '~/api/api-base.js';
import cbdArticle from './cbd-article.vue';
import { ref, computed, onBeforeMount } from 'vue';

const props = defineProps({
      articleId: [String, Object], 
      required: true,
});
const articleQuery = ref(null);
const portalId = computed(() => $route.params.portalId);
// const { portalId, articleId } = this; // Todo ???

onBeforeMount(async () => {

  let ag = [];
console.log('articleId:', props.articleId);
  if (isObjectId(props.articleId)) { 
    ag.push({ $match: { _id: mapObjectId(props.articleId) } });
  }

  articleQuery.value = { ag: JSON.stringify(ag) };
});

</script>
