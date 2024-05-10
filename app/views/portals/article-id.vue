<template>
  <div>
    <cbd-article :query="articleQuery" v-if="articleQuery" :hide-cover-image="true" :show-edit="true">
      <!-- @load="onArticleLoad($event)" :admin-tags="adminTags" -->
      <template #article-empty>&nbsp;</template>
    </cbd-article>
  </div>
</template>

<script setup>
  import { mapObjectId, isObjectId } from '~/api/api-base.js';
  import cbdArticle from './cbd-article.vue';
  import { computed, onMounted, ref, watch } from 'vue';

  const props = defineProps({
        articleId: {
          type: String,
          required: true
        }
  });

  const articleQuery = ref(null);

  let query = computed(()=>{
    let ag = [];
    if (isObjectId(props.articleId)) { 
      ag.push({ $match: { _id: mapObjectId(props.articleId) } });
    }
    return { ag: JSON.stringify(ag) };
  });

  onMounted(()=>{
    articleQuery.value = query.value ;

  });

  watch(query, (newX) => {
    articleQuery.value = newX;
  });

</script>
