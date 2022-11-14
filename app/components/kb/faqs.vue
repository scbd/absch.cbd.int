<template>
    <div>
        <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@35.0.0/build/content-style.css">
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
        <div v-if="!loading">
            <h4 class="fs-4 fw-bold">
				{{ $t("frequentlyAskedQuestions") }} 
				<span v-if="faqFilterTag && faqFilterTag!='faq'">
					{{ $t("for") }} <strong>{{faqFilterTag}}</strong></span> 
				<strong>({{faqCount}})</strong>
				<hr/>
			</h4>
            <main class="mb-4">
                <details v-for="article in faqs" class="card mb-3">
                    <summary class="fs-5 p-2">
						<span class="card-title">{{article.title|lstring($locale)}}</span>
					</summary>
                    <div class="p-2 faq-content full-details ck ck-content ck-rounded-corners ck-blurred" v-html="$options.filters.lstring(article.content,$locale)">
					</div>   
					<div v-if="article.adminTags" class="card-footer">
                        <a v-for="tag in article.adminTags" type="button"
                            class="btn btn-sm btn-outline-secondary m-1 me-2" :href="`${tagUrl(tag)}`">
                            {{tag}}
						</a>
                    </div>
                </details>
            </main>
        </div>
		<div v-if="faqCount>10">
			<paginate :records-per-page="recordsPerPage" :record-count="faqCount" @changePage="onChangePage" :current-page="pageNumber"></paginate>
		</div>
    </div>
</template>
<script>

	import i18n from '../../app-text/components/kb.json';
	import Paginate from './pagination.vue';
	import ArticlesApi from './article-api';
    import articlesMaxin from '../maxin/article';
    import './filters';

	export default {
		name:'kbFaqsList',
		components:{
			Paginate
		},
		props:{
		},
		created(){
			this.faqFilterTag = (this.$route.params.tag||'').replace(/"/g, ""); 
			this.articlesApi = new ArticlesApi();
		},
    	mixins: [articlesMaxin],
		async mounted() {
        this.categories = await this.loadKbCategories(true);
		    this.loadFaqs(1);
		},
		data:  () => {
			return {
				faqFilterTag:'',
				faqs: [],
				loading: true,
        categories: [],
				faqCount:0,
				pageNumber:1,
				recordsPerPage:10
			}
		},
		methods: {
			tagUrl(tag){
				const tagDetails = this.categories.find(e=>e.adminTags.includes(tag))
				const tagTitle 	 = (tagDetails?.title||'');
                return this.getUrl(tagTitle, undefined, tag);
			},
			onChangePage(pageNumber) {
				this.pageNumber = pageNumber;
				this.article=[];
				this.loading = true;
				this.loadFaqs(pageNumber);
			},
			async loadFaqs(pageNumber){

				this.faqCount = 0;
				this.faqs = [];
				const realmTag = this.$realm.is('BCH') ? 'bch' : 'abs';
				const q = { 
					$and : [
						{ adminTags : { $all : [realmTag, 'faq']}},
						{ adminTags : { $all : [ this.faqFilterTag ? this.faqFilterTag : 'faq']} }
					]
				};
				const f = { 
					[`title`]	: 1,
					[`content`]	: 1,
					adminTags 					: 1, _id:1
				} ;
				const groupTags = JSON.stringify([this.faqFilterTag ? this.faqFilterTag : 'faq']);
				const groupLimit = this.recordsPerPage;
				const groupSkip  = (pageNumber-1) * this.recordsPerPage
				const groupSort  = { "meta.modifiedOn":-1 };

			try {
            const result = await this.articlesApi.queryArticleGroup('adminTags', {  q, f, groupLimit, groupSort, groupTags, groupSkip });
            if (result?.length) {
              result.forEach(element => {
                this.faqCount = this.faqCount + element.count;
                this.faqs = [...this.faqs, ...element.articles];
              });
            }
        }
        catch(e) {
            console.error(e);
        }
        finally {
            this.loading = false;
        }
			},
		},
		i18n: { messages:{ en: i18n }}
	}
</script>
