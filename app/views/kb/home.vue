<template>
<div>
     <link href='http://fonts.googleapis.com/css?family=Nunito' rel='stylesheet' type='text/css'>
   
    <div class="knowledge-base">
        <auto-complete-search></auto-complete-search>
        <section class="categories">
            <div class="container">
                <div class="row">
                    <header>
					<div class="categerios-parahraph">
                        <div class="col">
                            <p>The <b>{{$realm.chShortName+ " "}}<span class="uppercase">{{ $t("knowledgeBase") }}</span></b> is an online tool designed to help users become familiar with the BCH, learn how to submit records, search for information and complete other important tasks.</p>
                        </div>
                        </div>
                                    
                    </header>
                  <categories-group></categories-group>
                  <side-bar></side-bar>
                </div>
            </div>
      </section>
  </div>
</div>
</template>

<style>
    @import url('app/css/vue/kb/style.css');
</style>

<script>

    import CategoriesGroup from '../../components/kb/article-categories.vue';
    import sideBar from '../../components/kb/right-side-bar.vue';
    import AutoCompleteSearch from '../../components/kb/auto-complete-search.vue';
    import i18n from '../../locales/en/components/kb.json';
    
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
    },
    i18n: { messages:{ en: i18n }} 
    
  }
</script>
