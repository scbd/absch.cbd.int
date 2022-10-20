<template>
    <div class="mt-4">
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
        <h4>{{ $t("popularTags") }}</h4>
				<hr>
        <div v-if="!loading">
            <button v-for="tag in popularTags" type="button"  class="btn btn-sm btn-outline-secondary m-1 me-2" @click="goToAdminTag(tag.adminTags[0])">
               {{tag.title}}
            </button>
        </div>
    </div>
</template>

<script>
    import i18n from '../../app-text/components/kb.json';
    import articlesMaxin from '../maxin/article';
    export default {
        name:'kbpopularTags',
        props:{
          isCategories:Boolean
        },
        data:  () => {
          return {
              popularTags:'',
              loading: true
          }
        },
    methods: {
        goToAdminTag(tag){
            if(tag =='faq')
                this.$router.push({path:'kb/faqs'});
            else
                this.$router.push({path:`kb/tags/${encodeURIComponent(tag)}`});
        }
    },
    mixins: [articlesMaxin],
    async mounted(){
        const categories = await this.loadKbCategories(this.$realm.is('BCH'));
        this.popularTags = categories;
        this.loading= false;
      },
      i18n: { messages:{ en: i18n }}
    }
</script>

