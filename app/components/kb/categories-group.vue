<template>
    <div class="col-lg-8">
        <header>
            <h2><i class="fa fa-file-text-o"></i>&nbsp;{{ $t("exploreTopics") }}</h2>
            <p>{{ $t("exploreParagraph") }}.</p>
        </header>
        <div class="row match-height">
            <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
            <div class="col-md-6 col-sm-12" v-for="article in articles">
                <div class="categories-list tag-count" v-for="(titles,tag) in article">
                    <h3><span class="badge">{{titles[0].count}}</span>
                        <a href="#" @click="goToTag(tag)">{{tag}}</a>
                    </h3>
                    <ul v-for="title in titles">
                        <li><a href="#" @click="goToArticle(title.id,title.title,tag)">{{title.title}}</a></li>
                    </ul>
                    <a class="view-more" v-if="titles[0].count>5" href="#" @click="goToTag(tag,titles[0].count)">{{ $t("viewMore") }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import ArticlesApi from './article-api';
	import i18n from '../../locales/en/components/kb-group';
	export default {
		props:{
		},
		data:  () => {
			return {
				articles: [],
				loading: true,
			}
		},
		created(){
			this.articlesApi = new ArticlesApi();
		},
		async mounted() {
			const adminTags = this.$realm.is('BCH')?'bch':'absch';
			let ag = [];
			let agLimit = [];
			const exclude = ['BCH','ABS', 'ABSCH','Faq','Faqs','bch','abs', 'absch','faq','faqs'];
			ag.push({"$match":{"$and":[{"adminTags":encodeURIComponent(adminTags)}]}});
			ag.push({"$project" : {[`title.${this.$locale}`]:1,"adminTags":1}});
			ag.push({"$sort" : {"meta.modifiedOn":-1}});
			ag.push({"$limit" : 200});
			const query = {
				"ag" : JSON.stringify(ag)
			};
			const articlesCategories = await this.articlesApi.queryArticles(query);
			if((articlesCategories || []).length) {
				const article =  articlesCategories;
				const tagelist = article.reduce(
					(b, a) =>
						[...b, ...a.adminTags], [])
				.filter((v, i, a) => !exclude.includes(v) && a.indexOf(v) === i);
				this.articles = tagelist.map(
					t => ({ [t]: article
						.filter(d => d.adminTags.includes(t))
						.map((d,i,v) =>
							({title:d.title[this.$locale],id:d._id, count:v.length})
						).slice(0, 5)
					}));
				this.loading = false;
			}
		},
		methods: {
			goToArticle(id,title,tag){
				const url = title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
				this.$router.push({path:`/kb/articles/${id}/${url}/${tag}`});
			},
			goToTag(tag){
				this.$router.push({path:`/kb/tags/${tag}`});
			}
		},
		i18n: { messages:{ en: i18n }}
	}
</script>
