<template>
<div>
     <link href='http://fonts.googleapis.com/css?family=Nunito' rel='stylesheet' type='text/css'>
   
    <div class="knowledge-base">
        <search></search>
        <section class="categories">
            <div class="container p-0">
                <div class="row">
                    <div class="col-lg-12">
                        <header>
                            <div class="categerios-parahraph">
                                <div class="col">
                                    <p>{{ $t("the") }} <b>{{$realm.chShortName+ " "}}<span class="text-capitalize">{{ $t("knowledgeBase") }}</span></b> {{ $t("kbParagraph")}}</p>
                                </div>
                            </div>                                    
                        </header>
                    </div>
                    <div class="col-lg-8">
                        <categories-group></categories-group>
                    </div>
                    <div class="col-lg-4">
                        <side-bar></side-bar>
                    </div>
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
    import search from '../../components/kb/search.vue';
    import i18n from '../../app-text/components/kb.json';
    
export default {
    name:'kbHome',
    components:{
        CategoriesGroup,
        sideBar,
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
    i18n: { messages:{ en: i18n }} 
    
  }
</script>
