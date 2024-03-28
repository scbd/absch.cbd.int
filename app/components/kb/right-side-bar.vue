<template>
	<div class="mb-3">
		<div v-if="tag">
			<relevant-articles></relevant-articles>
		</div>
		<div v-if="!tag && realm.is('BCH')">
			<faq-articles></faq-articles>
		</div>
	</div>
	<popular-tags is-categories="true"></popular-tags>
</template>

<script setup>

	import { ref, onMounted } from "vue";
	import relevantArticles from './relevant-articles.vue';
	import faqArticles from './faq-articles.vue';
	import popularTags from './popular-tags.vue';
	import { useRealm } from '../../services/composables/realm.js';
	import { useRoute } from "@scbd/angular-vue/src/index.js"; 

	const realm = useRealm();
	const route = useRoute();
	const tag = ref('');

	onMounted(() => {
		tag.value = route.value.params?.tag;
	});

</script>