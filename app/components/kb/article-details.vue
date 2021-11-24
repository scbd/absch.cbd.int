<template>
    <div class="row">
        <div class="col-lg-8">
            <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@24.0.0/build/ckeditor.css">
            <div>
                <div class="article-description mt-0 single">
                    <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
                    <div v-if="!loading">
                        <header>
                            <h2>{{article.title|lstring($locale)}}</h2>
                        </header>
                        <div class="detail-custom-tag">
                            <div class="inner-area"><i class="fa fa-calendar" aria-hidden="true"></i>&nbsp;{{article.meta.createdOn|dateFormate}}</div>
                            <div class="inner-area" v-if="article.customTags.length>0"><i class="fa fa-tag" aria-hidden="true"></i>&nbsp; {{article.customTagsInfo[0].title|lstring($locale)}}</div>
                        </div>
                        <div v-if="article.content" class="full-details ck ck-content ck-rounded-corners ck-blurred" v-html="article.content[$locale]"></div>
						<div v-if="article.adminTags" class="detail-custom-tag">
							<div class="tagcloud">
								<a style="display:none" class="btn btn-mini" :href="`${tagUrl(tag)}`" v-for="tag in article.adminTags">{{tag}}</a>
                    			<a class="btn btn-mini" href="#" @click="goToTag(tag)" v-for="tag in article.adminTags">{{tag}}</a>
							</div>
						</div>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary pull-right" @click="back()">Back</button>
        </div>
        <div class="col-lg-4">
            <div v-if="tag">
                <relevant-articles :tag="tag"></relevant-articles>
            </div>
            <div>
                <popular-tags></popular-tags>
            </div>
        </div>
    </div>
</template>

<script>
	import i18n from '../../locales/en/components/kb.json';
	import relevantArticles from "./relevant-articles.vue";
	import ArticlesApi from './article-api';
	import {formatDate, lstring} from './filters';
	import popularTags from './popular-tags.vue';
    import articlesMaxin from '../maxin/article';
	export default {
    name:'KbArticleDetails',
		components: {
			relevantArticles,
			popularTags
		},
		props:{
		},
		data:  () => {
        return {
            article: [],
            categories: [],
            loading: true
        }
		},
		created(){
			this.tag = (this.$route.params.tag).replace(/"/g, "");
			this.articlesApi = new ArticlesApi();
		},
        mixins: [articlesMaxin],
        async mounted() {
        this.categories = await this.loadKbCategories(this.$realm.is('BCH'));
        if(this.$route.params == undefined) return;
        try {
            let id = (this.$route.params.id).replace(/"/g, "");
            const article = await this.articlesApi.getArticleById(encodeURIComponent(id));
            if (article?.content != undefined) {
                this.article = article;
            }
        }
        catch(e){
            console.error(e);
            }
        finally {
            this.loading = false;
        }
        },
		methods: {
			back(){
				this.$router.push({path: '/kb'});
			},
			tagUrl(tag){
				const tagDetails = this.categories.find(e=>e.adminTags.includes(tag))
				const tagTitle 	 = (tagDetails?.title||'');
                return this.getUrl(tagTitle, undefined, tag);
            },
            articleUrl(article, tag){
                return this.getUrl(article.title[this.$locale], article._id, tag);
            },
            goToArticle(article, tag){
                this.$router.push({
                path:this.articleUrl(article, tag)
                });
            },
            goToTag(category){
                this.$router.push({path: this.tagUrl(category)});
            }
		},
		i18n: { messages:{ en: i18n }}
	}
</script>
