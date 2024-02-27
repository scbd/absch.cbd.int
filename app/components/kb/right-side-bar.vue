<template>
        <div>
            <div class="mb-3">
               <div v-if="tag"><relevant-articles></relevant-articles></div>
			   <div v-if="!tag && $realm.is('BCH')"><faq-articles></faq-articles></div>
            </div>
            <popular-tags is-categories="true"></popular-tags>
        </div>
</template>

<script>
	import i18n from '../../app-text/components/kb.json';
	import relevantArticles from './relevant-articles.vue';
	import faqArticles from './faq-articles.vue';
	import popularTags from './popular-tags.vue';
	export default {
      name:'kbRightSideBar',
		components:{
			popularTags,
			relevantArticles,
			faqArticles
		},
		data:  () => {
        return {
            tag:''
        }
		},
		created(){
			this.tag = (this.$route.params.tag)
		},
		i18n: { messages:{ en: i18n }}
	}
</script>
