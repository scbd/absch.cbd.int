<template>
    <div>
        <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@35.0.0/build/content-style.css">
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ t("loading") }}...</div>
        <div v-if="!loading">
            <h4 class="fs-4 fw-bold">
				{{ t("frequentlyAskedQuestions") }} 
				<span v-if="faqFilterTag && faqFilterTag!='faq'">
					{{ t("for") }} <strong>{{faqFilterTag}}</strong></span> 
				<strong>({{faqCount}})</strong>
				<cbd-add-new-view-article v-if="hasEditRights" 
						:admin-tags="adminTags" target="_self" class="btn btn-secondary float-end">
					</cbd-add-new-view-article>
				<hr/>
			</h4>
            <main class="mb-4">
                <details v-for="article in faqs" class="card mb-3">
                    <summary class="fs-5 p-2">
						<a class="ps-2 bold small text-secondary view-article-link" target="_new"
						:href="`${articleUrl(article, getAdminTag() )}`">
						<i class="fa fa-external-link"></i>
					</a>
					<span class="card-title">{{lstring(article.title, locale)}}</span>
					</summary>
                    <div class="p-2 faq-content full-details ck ck-content ck-rounded-corners ck-blurred" v-html="lstring(article.content,locale)">
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
		<div v-if="faqCount>25">
			<paginate 
				:records-per-page="recordsPerPage" 
				:record-count="faqCount" 
				:current-page="pageNumber"
				@changePage="onChangePage"
				@pageSizeChanged="handlePageSizeChanged" 
			></paginate>
		</div>
    </div>
</template>
<script setup>
	import { ref, onMounted, computed } from 'vue';
	import Paginate from '~/components/common/pagination.vue';
    import cbdAddNewViewArticle from '~/components/common/cbd-add-new-view-article.vue';
	import ArticlesApi from '~/components/kb/article-api.js';
	import { loadKbCategories , getUrl , getRealmArticleTag  } from '../../services/composables/articles.js'
	import { lstring } from './filters';
	import { useI18n } from 'vue-i18n';
	import messages from '~/app-text/components/kb.json';
	import { useRealm } from '~/services/composables/realm.js';
	import {  useRoute, useAuth } from "@scbd/angular-vue/src/index.js";
    import { OASIS_ARTICLE_EDITOR_ROLES } from '~/constants/roles.js'; 
    const auth = useAuth();
	const realm = useRealm();
	const { t, locale } = useI18n({ messages });
	const route = useRoute();
	const articlesApi = new ArticlesApi({tokenReader:()=>auth.token()});
	const faqFilterTag = ref('');
	const faqs = ref([]);
	const categories = ref([]);
	const loading = ref(true);
	const faqCount = ref(0);
	// let pageNumber = 1;
	let pageNumber = ref(1);
	const recordsPerPage = ref(25);

	const realmArticleTag = getRealmArticleTag();
    const hasEditRights = computed(()=> auth?.check(OASIS_ARTICLE_EDITOR_ROLES));
    const adminTags = computed(()=>[realmArticleTag, 'faq', faqFilterTag.value??'faq']);
	
	onMounted(async ()=>{
		faqFilterTag.value = route.value?.params?.tag?.replace(/"/g, ""); 
		categories.value = await loadKbCategories(locale.value);
		loadFaqs(1);
	})
	
	const tagUrl = function (tag){ 
		const tagDetails = categories.value.find(e=>e.adminTags.includes(tag));
		const tagTitle 	 = (tagDetails?.title||''); 
		const url = getUrl(tagTitle, undefined, tag);
		return url;
	};

	const getAdminTag = function() {
		return  realmArticleTag;	
		
	};

	const articleUrl = function (article, tag) {
        return getUrl(lstring(article.title), article._id, tag);
    };

	const onChangePage = function(p) {
		window.scrollTo(0,0);
		loadFaqs(p);
	};

	const handlePageSizeChanged = async (size) => {
        recordsPerPage.value = size;
        window.scrollTo(0, 0);
        await loadFaqs(1);
    }
	
	const loadFaqs = async function (page){
				pageNumber.value = page;
				faqCount.value = 0;
				faqs.value = [];
				const q = { 
					$and : [
						{ adminTags : { $all : adminTags.value?.map(encodeURIComponent)}}
					]
				};
				const f = { 
					[`title`]	: 1,
					[`content`]	: 1,
					adminTags : 1, _id:1
				};
				const groupTags = JSON.stringify([faqFilterTag.value ? faqFilterTag.value : 'faq']);
				const groupLimit = recordsPerPage.value;
				const groupSkip  = (page-1) * recordsPerPage.value
				const groupSort  = { "meta.modifiedOn":-1 };

			try {
				loading.value = true;
            	const result = await articlesApi.queryArticleGroup('adminTags', {  q, f, groupLimit, groupSort, groupTags, groupSkip });
            if (result?.length) {
				//ToDo: check if this can be simplified
              result.forEach(element => {
                faqCount.value = element.count;
            	faqs.value = [...faqs.value, ...element.articles];
              });
            }
        }
        catch(e) {
            console.error(e);
        }
        finally {
            loading.value = false;
        }
	};
		
</script>
<style>
.view-article-link {
	position: absolute; 
	right: 5px; 
	top: 10px;
}
</style>