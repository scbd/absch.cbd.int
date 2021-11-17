<template>
    <div class="widget fix widget_categories mt-2 right-side-articles" v-bind:class="{ 'side-popular-tags': !isCategories }">
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
        <h4>{{ $t("popularTags") }}</h4>
				<hr>
        <div class="tag-scroll" v-if="!loading">
            <div class="tagcloud" v-for="tag in popularTags">
                <a href="#" class="btn btn-mini" @click="goToAdminTag(tag.adminTags[0])">{{tag.title}}</a>
            </div>
        </div>
    </div>
</template>

<script>
	import i18n from '../../locales/en/components/kb.json';
  import loadCategories from './load-categories';
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
    goToAdminTag(tag){
			if(tag =='faq')
				this.$router.push({path:'/kb/faqs'});
			else
				this.$router.push({path:`/kb/tags/${encodeURIComponent(tag)}`});
		}
	},
    mixins: [loadCategories],
	async mounted(){
      const categories = await this.loadKbCategories(this.$realm.is('BCH'));
			this.popularTags = categories;
			this.loading= false;
		},
		i18n: { messages:{ en: i18n }}
	}
</script>

