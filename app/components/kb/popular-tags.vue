<template>
    <div class="widget fix widget_categories mt-2">
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
        <span class="icon icon-folder"></span>
        <h4>{{ $t("popularTags") }}</h4>
        <div class="tag-scroll" v-if="!loading">
            <div class="tagcloud" v-for="tag in tags">
                <a href="#" class="btn btn-mini" @click="goToTag(tag.adminTags[0])">{{tag.title}}</a>
            </div>
        </div>
    </div>
</template>

<script>
	import i18n from '../../locales/en/components/kb.json';
	import tagJson from '../../app-data/kb-categories.json';
	export default {
		props:{
		},
		data:  () => {
			return {
				tags: tagJson,
				loading: true
			}
		},
		methods: {
			goToTag(tag){
			    if(tag =='faq')
                    this.$router.push({path:'/kb/faqs'});
			    else
			        this.$router.push({path:`/kb/tags/${tag}`});
			}
		},
		mounted(){
			this.loading= false;
		},
		i18n: { messages:{ en: i18n }}
	}
</script>

