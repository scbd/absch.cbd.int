<template>
	<div class="latest-faq">
	  <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@35.0.0/build/content-style.css">
	  <h4>{{ t("faqs") }}</h4>
	  <hr>
	  <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ t("loading") }}...</div>
	  <ul v-for="title in help">
		<li><a href="#" @click="goToArticle(title._id,title.title|lstring($locale))">{{title.title|lstring($locale)}}</a></li>
	  </ul>
	  <div class="view-more">
		<a class="text-decoration-none" href="#" @click="goToFaq()">+  {{ t("viewMore") }}</a>
	  </div>
	</div>
  </template>
  
  <script setup>
	import { useRealm } from '../../services/composables/realm.js';
	import { useI18n } from 'vue-i18n';
	import messages from '../../app-text/components/kb.json';
	import {  useRouter } from "@scbd/angular-vue/src/index.js";
	import ArticlesApi from './article-api';
	const { t } = useI18n({ messages });
	const realm = useRealm();
	const router = useRouter();
	const articlesApi = new ArticlesApi();
	const help = ref([]);
	const loading = ref(true);

	const goToArticle = (id, title) => {
		const url = title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
		router.push({ path: `/kb/articles/${id}/${url}/bch` });
	};
  
	const goToFaq = () => {
		router.push({ path: `/kb/faqs` });
	};
	
	onMounted(async () => {
		await loadHelp();
	});
  
	const loadHelp = async () => {
		help.value = [];
	
		const q = {
		$and: [
			{ adminTags: { $all: [realm.is('BCH') ? 'bch' : 'abs', 'faq'] } },
			{ adminTags: { $all: ['faq'] } },
		],
		};
	
		const f = { 
			[`title`]	: 1,
			[`content`]	: 1,
			adminTags : 1, _id:1
		} ;
		const groupTags = JSON.stringify(['faq']);
		const groupSort  = { "meta.modifiedOn":-1 };
		const groupLimit = 6;
	
		try {
		const result = await articlesApi.queryArticleGroup('adminTags', {
			q,
			f,
			groupLimit,
			groupSort,
			groupTags
		});
		if (result?.length) {
			result.forEach(element => {
			help.value = [...help.value, ...element.articles];
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
  