<template>
  <div>
    <cbd-article ref="refCbdArticle" :query="articleQuery" v-if="articleQuery" :show-cover-image="false" :show-edit="true">
      <template #article-empty>&nbsp;</template>
    </cbd-article>
  </div>
</template>

<script setup>
  import { mapObjectId, isObjectId } from '~/api/api-base.js';
  import cbdArticle from '../../components/common/cbd-article.vue';
  import { computed, onMounted, ref, watch } from 'vue';
  const refCbdArticle = ref(null);
  const props = defineProps({
        articleId: {
          type: String,
          required: true
        }
  });

  const articleQuery = computed(()=>{
    let ag = [];
    if (isObjectId(props.articleId)) { 
      ag.push({ $match: { _id: mapObjectId(props.articleId) } });
    }
    return { ag: JSON.stringify(ag) };
  });

  const fetchArticle = async () => {
    if (refCbdArticle.value && articleQuery.value) {
      try {
        await refCbdArticle.value.loadArticle(articleQuery.value);
      } catch (error) {
        console.error('Failed to fetch article:', error);
      }
    }
  };

  watch(() => props.articleId, () => {
    fetchArticle();
  });

  onMounted(() => {
    fetchArticle();
  });
</script>
