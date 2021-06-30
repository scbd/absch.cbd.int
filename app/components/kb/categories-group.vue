<template>

    <div class="col-lg-8">

        <header>
            <h2><span class="icon-pages"></span>Explore Topics</h2>
            <p>We did our best to cover all topics related to this product. Each section have number which represent
                number of topic in each category.</p>
        </header>

        <div class="row match-height">
            <div class="col-md-6 col-sm-12" v-for="article in articles">
                <div class="categories-list" v-for="(titles,tag) in article">
                    <h3><span class="badge">{{titles.length}}</span><a href="#">{{tag}}</a></h3>
                    <ul v-for="title in titles.slice(0,5)">
                      <li><a href="#">{{title.en}}</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

     import axios from 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js'; //will be from npm (yarn add axios)
      export default {
        data:  () => {
            return {
                articles: []
            }
        },
        mounted() {
            let self = this;
            let ag = [];
            let agLimit = [];
            const exclude = ['BCH','ABS', 'ABSCH','bch','abs', 'absch'];
            ag.push({"$match":{"$and":[{"adminTags":'bch'}]}});
            ag.push({"$project" : {"title":1,"adminTags":1}});
            ag.push({"$sort" : {"meta.modifiedOn":-1}});
            agLimit = JSON.parse(JSON.stringify(ag))
            agLimit.push({"$limit" : 200});
            const qs = {
                "ag" : JSON.stringify(agLimit)
            };
            return axios.get('/api/v2017/articles', {params: qs}).then(function (results) {
                if ((results || {}).data && results.data.length > 0) {
                    const article =  results.data;
                    let taglist = article.reduce((b, a) => [...b, ...a.adminTags], []).filter((v, i, a) => !exclude.includes(v) && a.indexOf(v) === i);
                    self.articles = taglist.map(t => ({ [t]: article.filter(d => d.adminTags.includes(t)).map(d => d.title) }));
                }
            });
        },
        // i18n: { messages:{ en: i18n }} //will be used for locales language
    }
</script>
