<template>
  <div>
    <link href='http://fonts.googleapis.com/css?family=Nunito' rel='stylesheet' type='text/css'>

    <div class="knowledge-base">
      <search @changeSearch="onChangeSearch"></search>
      <section class="categories">
        <div class="container p-0">
          <article-search ref="articlesearch"></article-search>
        </div>
      </section>
    </div>
  </div>
</template>

<style>
@import url('app/css/vue/kb/style.css');
</style>

<script>

import articleSearch from '../../components/kb/article-search.vue';
import search from '../../components/kb/search.vue';
import i18n from '../../app-text/components/kb.json';

export default {
  name:'kbHome',
  components:{
    articleSearch,
    search
  },

  props:{
  },
  data:  () => {
    return {

    }
  },

  watch: {
    tokenReader: function(tokenReader) {
      // if(tokenReader) addApiOptions({ tokenReader })
    }
  },
   methods: {
      onChangeSearch(text) {
        this.$refs.articlesearch.loadArticles(1,text);
      },
    },
  i18n: { messages:{ en: i18n }}

}
</script>
