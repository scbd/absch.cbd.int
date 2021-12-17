<template>
    <div class="col-lg-8">
        <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@24.0.0/build/ckeditor.css">
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
        <div class="mt-0 kb-faq" v-if="!loading">
            <h2>
				{{ $t("frequentlyAskedQuestions") }} 
				<span v-if="faqFilterTag && faqFilterTag!='faq'">
					{{ $t("for") }} <strong>{{faqFilterTag}}</strong></span> 
				<strong>({{faqCount}})</strong>
				<hr/>
			</h2>
            <main>
                <details v-for="article in faqs">
                    <summary>{{article.title|lstring($locale)}}</summary>
                    <div  class="faq-content full-details ck ck-content ck-rounded-corners ck-blurred" v-html="$options.filters.lstring(article.content,$locale)"></div>                    
					<div v-if="article.adminTags" class="detail-custom-tag">
						<div class="tagcloud">
							<a v-translation-url:$[dynamicArg]="$locale" class="btn btn-mini" :href="`${tagUrl(tag)}`" v-for="tag in article.adminTags">{{tag}}</a>
						</div>
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

	import i18n from '../../locales/en/components/kb.json';
	import Paginate from './pagination.vue';
	import ArticlesApi from './article-api';
  import articlesMaxin from '../maxin/article';
	import "/app/components/common/directives";
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
			articleUrl(article, tag){
				return this.getUrl(this.$options.filters.lstring(article.title), article._id, tag);
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
