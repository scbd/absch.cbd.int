<template>
    <div class="col-lg-8">
        <div class="row match-height">
            <div class="col-md-12 col-sm-12 " v-for="category in KbCategories">
                <div class="categories-list widget_categories tag-count">
                    <h3>
                        <a href="#" @click="goToTag(category)">{{category.title}}</a>
                        <a style="display:none" :href="`${tagUrl(category)}`">{{category.title}}</a>
                    </h3>
                   <hr>
                    <ul class="cate-list-ul" style="list-style: none;">
                        <li class="cate-list-li" v-for="article in category.articles">
                            <a v-if="article.identifier" style="display:none" :href="`${articleUrl(article)}`">{{article.title}}</a>
                            <a href="#" @click="goToArticle(article, category.adminTags[0])">{{article.title}}</a>
                        </li>
                    </ul>
                    <a style="display:none" :href="`${tagUrl(category)}`">{{ $t("viewMore") }}</a>
                    <a class="view-more" href="#" @click="goToTag(category)">+  {{ $t("viewMore") }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import i18n from '../../locales/en/components/kb.json';
	export default {
    name:'KbArticleCategories',
		props:{
		},
		data:  () => {
			return {
				KbCategories:[],
				loading: true,
			}
		},
		async mounted() {
			const categories = await this.loadKbCategories();
			this.KbCategories = categories.filter(tag => tag.adminTags[0] != "faq");
		},
		methods: {
			async loadKbCategories(){
				if(!this.$realm.is('BCH')) {
					const { categories } = await import('~/app-data/abs/kb-categories.js');
					return categories;
				}
				else {
					const { categories } = await import('~/app-data/bch/kb-categories.js');
					return categories;
				}
      	},

			articleUrl(article, tag){
				if(article.identifier){
					const urlTitle = article.title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
					return `/kb/tags/${encodeURIComponent(tag)}/${encodeURIComponent(urlTitle)}/${encodeURIComponent(article.identifier)}`
				} else {
					window.open(article.url,'_blank');
				}
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
			//ToDo: load dynamic articles once available from backend
			// async loadArticleByCategories(){
			// 	try{
			// 		this.KbCategories.forEach(category => {category.articles=undefined,	category.count=undefined});
			// 		const exclude = ['faq'];
			// 		const adminTags = KbCategories.map(e=>e.adminTags.filter((v) => !exclude.includes(v))).flat();
			// 		const q = { 
			// 			$and : [
			// 				{ adminTags : this.$realm.is('BCH') ? 'bch' : 'abs'},
			// 				{ adminTags : { $in : adminTags.map(e=>encodeURIComponent(e)) }}
			// 			]
			// 		};
			// 		const f = { [`title.${this.$locale}`]:1,"adminTags":1, _id:1} ;
			// 		const groupTags = JSON.stringify(adminTags.map(e=>encodeURIComponent(e)));
			// 		const groupLimit = 6;
			// 		const groupSort  = { "meta.modifiedOn":-1 };
					
			// 		const result = await this.articlesApi.queryArticleGroup('adminTags', { q, f, groupLimit, groupSort, groupTags });

			// 		this.KbCategories.forEach(category => {
			// 			const groupArticles = result.find(e=>category.adminTags.includes(e.group));
			// 			category.articles 	= [...category.articles||[], ...groupArticles?.articles||[]];
			// 			category.count		= (category.count||0) + (groupArticles?.count||0);
			// 		});
			// 	}
			// 	catch(e){
			// 		console.error(e);
			// 	}
			// 	finally{
			// 		this.loading = false;
			// 	}
			// }
		},
		i18n: { messages:{ en: i18n }}
	}
</script>
