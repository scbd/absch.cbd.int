<template>

    <div class="col-lg-8">

        <header>
            <h2><span class="icon-pages"></span>Explore Topics</h2>
            <p>We did our best to cover all topics related to this product. Each section have number which represent
                number of topic in each category.</p>
        </header>
        <div class="row match-height">
            <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> loading...</div>
            <div class="col-md-6 col-sm-12" v-for="article in articles">
                <div class="categories-list" v-for="(titles,tag) in article">
                    <h3><span class="badge">{{titles.length}}</span><a href="#">{{tag}}</a></h3>
                    <ul v-for="title in titles.slice(0,5)">
                       <li><a href="#" @click="goToArticle(title.id,title.title)">{{title.title}}</a></li>
                    </ul>
                    <a class="view-more" v-if="titles.length>5" href="#">View More</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


    import i18n from '../../locales/en/components/kb/categories-group';

    import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js';
    export default {
        props:{
            ngVue: {}
        },
        data:  () => {
            return {
                articles: [],
                loading: true,
            }
        },
        mounted() {
            let self = this;
            let isBch = this.ngVue.realm.is('BCH')?'bch':'absch';
            let locale = this.ngVue.locale;
            let titleField = `title.${locale}`;
            let ag = [];
            let agLimit = [];
            const exclude = ['BCH','ABS', 'ABSCH','bch','abs', 'absch'];
            ag.push({"$match":{"$and":[{"adminTags":isBch}]}});
            ag.push({"$project" : {[titleField]:1,"adminTags":1}});
            agLimit = JSON.parse(JSON.stringify(ag)); // if remove this line it will break the network call
            ag.push({"$sort" : {"meta.modifiedOn":-1}});
            agLimit.push({"$limit" : 200});
            const qs = {
                "ag" : JSON.stringify(agLimit)
            };
            return axios.get('/api/v2017/articles', {params: qs}).then(function (results) {
                if ((results || {}).data && results.data.length > 0) {
                    const article =  results.data;
                    let taglist = article.reduce((b, a) => [...b, ...a.adminTags], []).filter((v, i, a) => !exclude.includes(v) && a.indexOf(v) === i);
                    self.articles = taglist.map(t => ({ [t]: article.filter(d => d.adminTags.includes(t)).map(d => ({title:d.title[locale],id:d._id})) }));
                    self.loading = false;
                }
            });

        },
        methods: {
            goToArticle(id,title){
                const url = title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
                this.ngVue.location.path("/kb/articles/"+id+ "/" + url  );
            }
        },
        i18n: { messages:{ en: i18n }} //will be used for locales language
    }
</script>
