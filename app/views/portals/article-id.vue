<template>
  <div>
    <cbd-article :query="articleQuery" v-if="articleQuery">
      <template #article-empty>&nbsp;</template>
    </cbd-article>
  </div>
</template>

<script setup>
  import { mapObjectId, isObjectId } from '~/api/api-base.js';
  import cbdArticle from './cbd-article.vue';
  import { ref, computed, onBeforeMount } from 'vue';

  const props = defineProps({
        articleId: {
          type: String,
          required: true
        }
  });

  const articleQuery = ref(null);

  const setQuery = function () {
    let ag = [];
    if (isObjectId(props.articleId)) { 
      ag.push({ $match: { _id: mapObjectId(props.articleId) } });
    }
    articleQuery.value = { ag: JSON.stringify(ag) };
  }

  onBeforeMount(async () => {
    setQuery();
  });

</script>
