<template>
    <div class="knowledge-base">
        <section class="categories">
            <div class="container p-0">
                <article-details ></article-details>
            </div>
        </section>
    </div>

</template>



<script>

  import articleDetails from '../../components/kb/article-details.vue';
  export default {
    name:'kbArticles',
    components:{
      articleDetails
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
