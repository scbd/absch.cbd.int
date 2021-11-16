<template>
    <div class="widget fix widget_categories mt-2 right-side-articles" v-bind:class="{ 'side-popular-tags': !isCategories }">
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
        <h4>{{ $t("popularTags") }}</h4>
				<hr>
        <div class="tag-scroll" v-if="!loading">
            <div class="tagcloud" v-for="tag in popularTags">
                <a href="#" class="btn btn-mini" @click="goToTag(tag.adminTags[0])">{{tag.title}}</a>
            </div>
        </div>
    </div>
</template>

<script>
	import i18n from '../../locales/en/components/kb.json';
	export default {
    name:'kbpopularTags',
		props:{
			isCategories:Boolean
		},
		data:  () => {
			return {
				popularTags:'',
				loading: true
			}
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
		goToTag(tag){
			if(tag =='faq')
				this.$router.push({path:'/kb/faqs'});
			else
				this.$router.push({path:`/kb/tags/${tag}`});
		}
	},
	async mounted(){
      const categories = await this.loadKbCategories();
			this.popularTags = categories;
			this.loading= false;
		},
		i18n: { messages:{ en: i18n }}
	}
</script>

