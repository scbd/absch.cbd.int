<template>
    <div class="col-lg-8">
        <header>
            <p>The {{$realm.chShortName+ " "}}{{ $t("knowledgeBase") }} is an online tool to help users learn about the BCH, learn how to submit records, how to search for information and complete important tasks related to the BCH.</p>

						<p>In these sections you will find answers to your questions categorized into different topics:.</p>
        </header>
        <div class="row match-height">
            <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
            <div v-if="!loading">
                <div v-if="category.count>0" class="col-md-12 col-sm-12 " v-for="category in KbCategories">
                    <div class="categories-list widget_categories tag-count">
                        <h3>
													<!-- <span class="badge">{{category.count}}</span> -->
                            <a href="#" @click="goToTag(category)">{{category.title}}</a>
                            <a style="display:none" :href="`${tagUrl(category)}`">{{category.title}}</a>
                        </h3>
                        <ul class="cate-list-ul" style="list-style: none;">
                            <li class="cate-list-li" v-for="article in category.articles">
                                <a style="display:none" :href="`${articleUrl(article)}`">{{article.title[$locale]}}</a>
                                <a href="#" @click="goToArticle(article, category.adminTags[0])">{{article.title[$locale]}}</a>
                            </li>
                        </ul>
                        <a style="display:none" :href="`${tagUrl(category)}`">{{ $t("viewMore") }}</a>
                        <a class="view-more" v-if="category.count>6" href="#" @click="goToTag(category)">+  {{ $t("viewMore") }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import ArticlesApi  from './article-api';
	import KbCategories from '~/app-data/kb-categories.json'
	import i18n from '../../locales/en/components/kb.json';
	export default {
    name:'KbArticleCategories',
		props:{
		},
		data:  () => {
			return {
				KbCategories:[...KbCategories],
				groupResult: {},
				loading: true,
			}
		},
		created(){
			this.articlesApi = new ArticlesApi();
		},
		async mounted() {
			await this.loadArticleByCategories();
		},
		methods: {
			articleUrl(article, tag){
				const urlTitle = article.title[this.$locale].replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
				return `/kb/tags/${encodeURIComponent(tag)}/${encodeURIComponent(urlTitle)}/${encodeURIComponent(article._id)}`
			},
			goToArticle(article, tag){
				this.$router.push({
					path:this.articleUrl(article, tag)
				});
			},
			tagUrl(category){
				const tagTitle = category.title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
				return `/kb/tags/${category.adminTags[0]}/${tagTitle}`
			},
			goToTag(category){
				this.$router.push({path: this.tagUrl(category)});
			},
			async loadArticleByCategories(){
				try{
					this.KbCategories.forEach(category => {category.articles=undefined,	category.count=undefined});
					const adminTags = KbCategories.map(e=>e.adminTags).flat();
					const q = { 
						$and : [
							{ adminTags : this.$realm.is('BCH') ? 'bch' : 'abs'},
							{ adminTags : { $in : adminTags.map(e=>encodeURIComponent(e)) }}
						]
					};
					const f = { [`title.${this.$locale}`]:1,"adminTags":1, _id:1} ;
					const groupTags = JSON.stringify(adminTags.map(e=>encodeURIComponent(e)));
					const groupLimit = 6;
					const groupSort  = { "meta.modifiedOn":-1 };
					
					const result = await this.articlesApi.queryArticleGroup('adminTags', { q, f, groupLimit, groupSort, groupTags });

					this.KbCategories.forEach(category => {
						const groupArticles = result.find(e=>category.adminTags.includes(e.group));
						category.articles 	= [...category.articles||[], ...groupArticles?.articles||[]];
						category.count		= (category.count||0) + (groupArticles?.count||0);
					});
				}
				catch(e){
					console.error(e);
				}
				finally{
					this.loading = false;
				}
			}
		},
		i18n: { messages:{ en: i18n }}
	}
</script>
