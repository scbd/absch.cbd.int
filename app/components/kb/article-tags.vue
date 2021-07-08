<template>
    <div class="col-lg-12">
        <div class="row match-height">
            <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> loading...</div>
                <div class="categories-list tag" v-if="!loading">
                    <ul v-for="title in article">
                      <li><a href="#" @click="goToArticle(title._id,title.title[locale])">{{title.title[locale]}}</a></li>
                    </ul>
                 </div>

            <div>
            </div>

            </div>
        <div v-if="tagCount>10">
            <global-pagination :tag-count="tagCount" @changePage="onChangePage"></global-pagination>
        </div>
    </div>
</template>

<script>


    import i18n from '../../locales/en/components/kb/categories-group';
    import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js';
	import globalPagination from './pagination.vue';

    export default {
			components:{
                globalPagination
				//jwPagination
			},
        props:{
            ngVue: {}
        },
        data:  () => {
            return {
                articles: [],
                loading: true,
                locale:'',
                tagCount:0
            }
        },
        mounted() {
            this.loadArticles(0);
        },
       methods: {
           goToArticle(id,title){
              const url = title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
              this.ngVue.location.path("/kb/articles/"+id+ "/" + url  );
           },
           onChangePage(offset) {
               this.article=[];
               this.loading = true;
              this.loadArticles((offset-1)*10);
           },
           async loadArticles(offset){
               let self = this;
               this.locale = this.ngVue.locale;
               let titleField = `title.${this.locale}`;
               if(this.$root.route.params == undefined) return;
               let tag =   JSON.stringify(this.$root.route.params.tag).replace(/"/g, "");
               this.tagCount = JSON.stringify(this.$root.route.params.size).replace(/"/g, "");
               let ag = [];
               let agLimit = [];
               ag.push({"$match":{"$and":[{"adminTags":tag}]}});
               ag.push({"$project" : {[titleField]:1,}});
               agLimit = JSON.parse(JSON.stringify(ag)); // if remove this line it will break the network call
               ag.push({"$sort" : {"meta.modifiedOn":-1}});
               agLimit.push({"$limit" : (offset+10)});
               agLimit.push({"$skip" : offset});
               const qs = {
                   "ag" : JSON.stringify(agLimit)
               };
               await axios.get('/api/v2017/articles', {params: qs}).then(function (results) {
                   if ((results || {}).data && results.data.length > 0) {
                       self.article =  results.data;
                       self.loading = false;

                   }
               });
           },
        },
        i18n: { messages:{ en: i18n }} //will be used for locales language
    }
</script>
