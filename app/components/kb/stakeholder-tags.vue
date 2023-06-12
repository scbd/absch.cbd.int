<template>
    <div class="mt-4" v-if="Tags">
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
        <h4>{{ $t("stakeholders") }}</h4>
				<hr>
        <div v-if="!loading">
            <button v-for="tag in Tags" type="button"  class="btn btn-sm btn-outline-secondary m-1 me-2" @click="goToAdminTag(tag.adminTags[0])">
               {{tag.title}}
            </button>
        </div>
    </div>
</template>

<script>
    import i18n from '../../app-text/components/kb.json';
    import articlesMaxin from '../maxin/article';
    export default {
        name:'kbStakeholderTags',
        props:{},
        data:  () => {
          return {
              Tags:'',
              loading: true
          }
        },
    methods: {
        goToAdminTag(tag){
            this.$router.push({path:`kb/tags/${encodeURIComponent(tag)}`});
        }
    },
    mixins: [articlesMaxin],
    async mounted(){
        const stakeholders = await this.loadKbStakeholders(this.$realm.is('ABS'));
        this.Tags = stakeholders;
        this.loading= false;
      },
      i18n: { messages:{ en: i18n }}
    }
</script>

