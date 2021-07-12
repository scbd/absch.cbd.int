<template>
  <div class="row">
    <div class="col-lg-8">
        <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@24.0.0/build/ckeditor.css">
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> loading...</div>
        <div class="row match-height" v-if="!loading">
                <div class="categories-list tag">
                    <h2>{{tag}}</h2>
                    <ul v-for="title in article">
                      <li><a href="#" @click="goToArticle(title._id,title.title[locale])">{{title.title[locale]}}</a></li>
                        <div v-if="title.content != undefined && isVisibile && contentId.trim() == title._id" class="full-details ck ck-content ck-rounded-corners ck-blurred" v-html="title.content[locale]"></div>
                    </ul>
                 </div>
        </div>

        <div v-if="tagCount>10">
          <global-pagination :items="10" :tag-count="tagCount" @changePage="onChangePage"></global-pagination>
        </div>
        <div v-if="tagCount<1 && !loading">
            <p>No result found for this tag</p>
        </div>
    </div>
      <div class="col-lg-4">
        <div v-if="tag != undefined">
          <relevant-articles :locale="locale" :location="location" :tag="tag"></relevant-articles>
        </div>
      </div>
    </div>
</template>

<script>


    import axios from 'axios';
    import i18n from '../../locales/en/components/kb/categories-group';
    import globalPagination from './pagination.vue';
    import relevantArticles from "./relevant-articles.vue";
    import ArticlesApi from './article-api';

    export default {
		components:{
			relevantArticles,
            globalPagination
				//jwPagination
		},
        props:{
            location: String,
            locale: String,
        },
        created(){
            this.articlesApi = new ArticlesApi();//this.tokenReader
            console.log(this.articlesApi);
        },
        mounted() {
            const tag =   JSON.stringify(this.$root.route.params.tag).replace(/"/g, "");
            if(tag != undefined && tag != null) {
                this.tag = tag;
                this.getCount(tag);
            }
        },
        data:  () => {
            return {
                articles: [],
                loading: true,
                locale:'',
                tagCount:0,
                isVisibile: false,
                contentId:String
            }
        },
        methods: {
           goToArticle(id,title){
              if(this.tag.toLowerCase() == 'faq' || this.tag.toLowerCase() == 'bch') {
                  this.isVisibile = !this.isVisibile;
                  this.contentId = id;
              } else {
                  const url = title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
                  this.location.path(`/kb/articles/${id}/${url}/${this.tag}`);
              }
           },
           onChangePage(offset) {
               this.article=[];
               this.loading = true;
              this.loadArticles((offset-1)*10, this.tag);
           },
           async getCount(tag){
                let self = this;
                let Count = [];
                Count.push({"$match":{"$and":[{"adminTags":{"$all":[this.tag]}}]}});
                Count.push({ "$count" : 'count' });
                const cs = {
                    "ag" : JSON.stringify(Count)
                };
                const articleCount = await axios.get('/api/v2017/articles', {params: cs});
               
                if (articleCount?.data?.length) {
                    self.tagCount = articleCount.data[0].count;
                    await self.loadArticles(0, tag);
                } 
                else{
                    self.tagCount = 0;
                    self.loading = false;
                    return false;
                }
           },
           async loadArticles(offset, tag){
                
                let ag = [];
                let agLimit = [];

                ag.push({"$match":{"$and":[{"adminTags":tag}]}});
                if(tag.toLowerCase() == 'faq' || tag.toLowerCase() == 'bch') {
                    ag.push({"$project": {[`title.${this.locale}`]: 1, [`content.${this.locale}`]: 1, "adminTags": 1}});
                } else {
                    ag.push({"$project": {[`content.${this.locale}`]: 1,}});
                }
                agLimit = JSON.parse(JSON.stringify(ag)); // if remove this line it will break the network call
                ag.push({"$sort" : {"meta.modifiedOn":-1}});
                agLimit.push({"$limit" : (offset+10)});
                agLimit.push({"$skip" : offset});
                const qs = {
                    "ag" : JSON.stringify(agLimit)
                };
                const articles = await this.articlesApi.queryArticles(qs);
                if((articles || []).length) {
                    this.article =  articles;
                    this.loading = false;
                }

           },
        },
        i18n: { messages:{ en: i18n }} //will be used for locales language
    }
</script>
