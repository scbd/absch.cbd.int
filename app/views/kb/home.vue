<template>
  <div class="knowledge-base">
    <auto-complete-search></auto-complete-search>
    <section class="categories">
      <div class="container">
        <div class="row">
          <categories-group></categories-group>
          <side-bar></side-bar>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
  @import url('app/css/vue/kb/style.css');
</style>

<script>

  import CategoriesGroup from '../../components/kb/categories-group.vue';
  import sideBar from '../../components/kb/side-bar.vue';
  import AutoCompleteSearch from '../../components/kb/auto-complete-search.vue';

export default {
  name:'kbHome',
  components:{
    CategoriesGroup,
    sideBar,
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
  }
}
</script>
