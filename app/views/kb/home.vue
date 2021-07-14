<template>
  <div class="knowledge-base">
    <auto-complete-search></auto-complete-search>
    <section class="categories">
      <div class="container">
        <div class="row">
          <categories-group :location="ngVue.location" :realm="ngVue.realm" :locale="ngVue.locale"></categories-group>
          <side-bar :location="ngVue.location" :realm="ngVue.realm" :locale="ngVue.locale"></side-bar>
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
    tokenReader: { type: Function, required: false },
    ngVue: {}
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
