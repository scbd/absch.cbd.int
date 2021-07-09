<template>
    <div class="col-lg-4">
        <div class="row margin-bottom-30">
            <div class="col-md-12 ">
                <div class="support-container">
                    <h2 class="support-heading">Need more Support?</h2>
                    If you cannot find an answer in the knowledgebase, you can
                    <a href="#">contact us</a> for further help.
                </div>
            </div>
        </div>

        <div class="sidebar" style="margin-top: 5px">
            <div class="widget fix widget_categories mt-2">
                <span class="icon icon-folder"></span>
                <h4>Latest Articles</h4>
                <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> loading...</div>
                <ul v-for="title in articles">
                    <li><a href="#" @click="goToArticle(title._id,title.title[locale])">{{title.title[locale]}}</a></li>
                </ul>
            </div>
            
            <div class="widget fix widget_categories">
                <span class="icon icon-folder"></span>
                <h4>Popular Articles</h4>
                <ul>
                    <li><a href="#"> Installation &amp; Activation </a></li>
                    <li><a href="#"> Premium Members Features </a></li>
                    <li><a href="#"> API Usage &amp; Guide lines </a></li>
                    <li><a href="#"> Getting Started &amp; What is next. </a></li>
                    <li><a href="#"> Installation &amp; Activation </a></li>
                    <li><a href="#"> Premium Members Features </a></li>
                    <li><a href="#"> API Usage &amp; Guide lines </a></li>
                    <li><a href="#"> Getting Started &amp; What is next. </a></li>
                </ul>
            </div>
            
            <div class="widget fix widget_categories mt-2">
                <span class="icon icon-folder"></span>
                <h4>Popular Tags</h4>

                <div class="tagcloud">
                    <a href="#" class="btn btn-mini">basic</a>
                    <a href="#" class="btn btn-mini">beginner</a>
                    <a href="#" class="btn btn-mini">blogging</a>
                    <a href="#" class="btn btn-mini">colour</a>
                    <a href="#" class="btn btn-mini">css</a>
                    <a href="#" class="btn btn-mini">date</a>
                    <a href="#" class="btn btn-mini">design</a>
                    <a href="#" class="btn btn-mini">files</a>
                    <a href="#" class="btn btn-mini">format</a>
                    <a href="#" class="btn btn-mini">header</a>
                    <a href="#" class="btn btn-mini">images</a>
                    <a href="#" class="btn btn-mini">plugins</a>
                    <a href="#" class="btn btn-mini">setting</a>
                    <a href="#" class="btn btn-mini">templates</a>
                    <a href="#" class="btn btn-mini">theme</a>
                    <a href="#" class="btn btn-mini">time</a>
                    <a href="#" class="btn btn-mini">videos</a>
                    <a href="#" class="btn btn-mini">website</a>
                    <a href="#" class="btn btn-mini">wordpress</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import i18n from '../../locales/en/components/kb/categories-group';
    import CategoriesGroup from './categories-group.vue';
    import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js';

    export default {
        components:{
            CategoriesGroup
        },
        props:{
            realm:{},
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
            let self = this;
            let isBch = this.realm.is('BCH')?'bch':'absch';
            let locale = this.locale;
            let titleField = `title.${locale}`;
            let ag = [];
            let agLimit = [];
            ag.push({"$match":{"$and":[{"adminTags":isBch}]}});
            ag.push({"$project" : {[titleField]:1}});
            agLimit = JSON.parse(JSON.stringify(ag)); // if remove this line it will break the network call
            agLimit.push({"$limit" : 10});
            const qs = {
                "ag" : JSON.stringify(agLimit)
            };
            return axios.get('/api/v2017/articles', {params: qs}).then(function (results) {
                if ((results || {}).data && results.data.length > 0) {
                    self.articles =  results.data;
                    self.loading = false;
                }
            });
        },
        methods: {
            goToArticle(id,title){
                const url = title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
                this.location.path("/kb/articles/"+id+ "/" + url  );
            },
        },
        i18n: { messages:{ en: i18n }} //will be used for locales language
    }
</script>
