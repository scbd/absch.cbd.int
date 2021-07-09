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
                    <h3><span class="badge">{{titles[0].count}}</span>
                        <a href="#" @click="goToTag(tag,titles.length)">{{tag}}</a>
                        <!--                        <a href="#" v-bind:href="'/kb/articlex/tags/'+tag+'/'+titles.length">{{tag}}</a> Using href, the page hard refresh-->
                    </h3>
                    <ul v-for="title in titles.slice(0,5)">
<!--                    ss&#45;&#45;{{titles}}-->
                    <!--                        <li><a v-bind:href="'kb/articles/'+title.id+'/'+title.title">{{title.title}}</a></li> Using href, the page hard refresh-->
                        <li><a href="#" @click="goToArticle(title.id,title.title)">{{title.title}}</a></li>
                    </ul>
                    <a class="view-more" v-if="titles.length>5" href="#" @click="goToTag(tag,titles.length)">View More</a>
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
            realm:{},
            locale:String,
            location:String
        },
        data:  () => {
            return {
                articles: [],
                loading: true,
            }
        },
        mounted() {
            let self = this;
            let isBch = this.realm.is('BCH')?'bch':'absch';
            let locale = this.locale;
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
                    let taglist = article.reduce(
                        (b, a) =>
                            [...b, ...a.adminTags], [])
                            .filter((v, i, a) => !exclude.includes(v) && a.indexOf(v) === i);
                    self.articles = taglist.map(
                        t => ({ [t]: article
                                .filter(d => d.adminTags.includes(t))
                            .map((d,i,v) =>
                                ({title:d.title[locale],id:d._id, count:v.length})
                            )
                    }));
                    self.loading = false;
                }
            });

        },
        methods: {
            goToArticle(id,title){
                const url = title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
                this.location.path("/kb/articles/"+id+ "/" + url  );
            },
            goToTag(tag,size){
                this.location.path("/kb/articlex/tags/"+tag+"/"+size );
            }
        },
        i18n: { messages:{ en: i18n }} //will be used for locales language
    }
</script>
