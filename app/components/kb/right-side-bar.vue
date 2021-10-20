<template>
    <div class="col-lg-4">
        
        <div class="side-bar">
            <div class="widget fix widget_categories mt-2 right-side-articles">
                <latest-faqs></latest-faqs>
                <getting-help></getting-help>
                </div>
                  <popular-tags is-categories="true"></popular-tags>
        </div>
    </div>
</template>

<script>
	import i18n from '../../locales/en/components/kb.json';
	import gettingHelp from './getting-help.vue';
	import latestFaqs from './latest-faqs.vue';
	import popularTags from './popular-tags.vue';
	export default {
      name:'kbRightSideBar',
		components:{
			popularTags,
			gettingHelp,
			latestFaqs
		},

		i18n: { messages:{ en: i18n }}
	}
</script>
