<template>
    <div class="col-lg-4">
        
        <div class="side-bar">
            <div class="widget fix widget_categories mt-2 right-side-articles">
                <relevant-articles type="faq"></relevant-articles>
                <relevant-articles type="help"></relevant-articles>
                </div>
                  <popular-tags is-categories="true"></popular-tags>
        </div>
    </div>
</template>

<script>
	import i18n from '../../locales/en/components/kb.json';
	import relevantArticles from './relevant-articles.vue';
	import popularTags from './popular-tags.vue';
	export default {
      name:'kbRightSideBar',
		components:{
			popularTags,
			relevantArticles
		},

		i18n: { messages:{ en: i18n }}
	}
</script>
