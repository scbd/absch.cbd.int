<template>
  <div class="knowledge-base">
    <search @changeSearch="onChangeSearch"></search>
    <section class="categories">
      <div class="container p-0">
        <article-search ref="articleSearchRef"></article-search>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import articleSearch from '../../components/kb/article-search.vue';
  import search from '../../components/kb/search.vue';
  import { useRouter } from "@scbd/angular-vue/src/index.js";
  const router = useRouter();
  const articleSearchRef = ref(null);

  const onChangeSearch = (text) => {
    if (articleSearchRef.value) {
      router.push({
          path: '/kb/kbSearch',
          query: { search: text }
      });
      articleSearchRef.value.loadArticles(1, text);
    }
  };

</script>
