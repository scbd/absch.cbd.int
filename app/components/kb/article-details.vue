<template>
  <div class="row">
    <div class="col-lg-8">
        <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@24.0.0/build/ckeditor.css">
            <section class="categories">
                <div class="categories-list mt-0 single">
                  <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> loading...</div>
                    <header>
                        <h2 v-if="articles.title != undefined">{{articles.title[locale]}}</h2>
                    </header>
                    <!--TODO:this section will be used for future-->
                    <!--                <ul class="meta">-->
                    <!--                    <li><span>Created :</span> Feb, 04, 2016</li>-->
                    <!--                    <li><span>Last Updated:</span> April, 15, 2016</li>-->
                    <!--                </ul>-->

                    <!--                <div class="col-xs-12 alert alert-info">-->
                    <!--                    <i class="fa fa-info-circle fa-3" aria-hidden="true"></i>-->
                    <!--                    <div>My message here. Lots of text for several lines! My message here. Lots of text for several lines! My message here. Lots of text for several lines! My message here. Lots of text for several lines!</div>-->
                    <!--                </div>-->
                    <div v-if="articles.content != undefined" class="full-details ck ck-content ck-rounded-corners ck-blurred" v-html="articles.content[locale]"></div>
                </div>
            </section>
            <button class="btn btn-primary pull-right" href="#" @click="back()">Back</button>
            </div>
    <div class="col-lg-4">
             <div v-if="tag != undefined">
                <relevant-articles :locale="locale" :location="location" :tag="tag"></relevant-articles>
            </div>
    </div>
  </div>
</template>

<script>
    import i18n from '../../locales/en/components/kb/categories-group';
    import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js';
    import relevantArticles from "./relevant-articles.vue";
    export default {
        components: {relevantArticles},
        props:{
			locale:String,
			location:String
        },
        data:  () => {
            return {
                articles: [],
                loading: true

            }
        },
        mounted() {
            if(this.$root.route.params == undefined) return;
            let id =   JSON.stringify(this.$root.route.params.id).replace(/"/g, "");
            this.tag = JSON.stringify(this.$root.route.params.tag).replace(/"/g, "");
            let self = this;
            return axios.get('/api/v2017/articles/'+id).then(function (results) {
                if ((results || {}).data) {
                    self.articles =  results.data;
                    self.loading = false;
                }
            });
        },
        methods: {
            back(){
                window.history.back();
            }
        },
        i18n: { messages:{ en: i18n }} //will be used for locales language
    }
</script>
