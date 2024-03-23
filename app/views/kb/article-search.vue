<template>
  <div>
    <div class="knowledge-base">
      <search @changeSearch="onChangeSearch"></search>
      <section class="categories">
        <div class="container p-0">
          <article-search ref="articleSearchRef"></article-search>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
  import articleSearch from '../../components/kb/article-search.vue';
  import search from '../../components/kb/search.vue';
  import { ref } from 'vue';
  
  const articleSearchRef = ref(null);

  const onChangeSearch = (text) => {
    if (articleSearchRef.value) {
      articleSearchRef.value.loadArticles(1, text);
    }
  };

</script>
