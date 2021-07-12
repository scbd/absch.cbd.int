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
            <div class="widget fix widget_categories mt-2" style="margin-top: 0rem">
                <span class="icon icon-folder"></span>
                <h4>Latest Articles</h4>
                <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> loading...</div>
                <ul v-for="title in articles">
                    <li><a href="#" @click="goToArticle(title._id,title.title[locale])">{{title.title[locale]}}</a></li>
                </ul>
            </div>
            <popular-tags :locale="locale" :location="location"></popular-tags>
        </div>
    </div>
</template>

<script>
    import i18n from '../../locales/en/components/kb/categories-group';
    import CategoriesGroup from './categories-group.vue';
    import popularTags from './popular-tags.vue';
    import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js';

    export default {
        components:{
            CategoriesGroup,
            popularTags
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
                this.location.path("/kb/articles/"+id+ "/" + url +"/bch" );
            },
        },
        i18n: { messages:{ en: i18n }} //will be used for locales language
    }
</script>
