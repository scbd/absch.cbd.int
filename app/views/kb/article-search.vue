<template>
  <div>
    <link href='http://fonts.googleapis.com/css?family=Nunito' rel='stylesheet' type='text/css'>

    <div class="knowledge-base">
      <auto-complete-search @changeSearch="onChangeSearch"></auto-complete-search>
      <section class="categories">
        <div class="container">
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
import AutoCompleteSearch from '../../components/kb/auto-complete-search.vue';
import i18n from '../../locales/en/components/kb.json';

export default {
  name:'kbHome',
  components:{
    articleSearch,
    AutoCompleteSearch
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
