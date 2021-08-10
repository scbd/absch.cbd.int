<template>
    <div class="knowledge-base">
        <auto-complete-search></auto-complete-search>
        <section class="categories">
            <div class="container">
                <article-by-tag></article-by-tag>
            </div>
        </section>
    </div>
</template>

<style>
    @import url('app/css/vue/kb/style.css');
</style>

<script>

	import articleByTag from '../../components/kb/articles-by-tag.vue';
	import AutoCompleteSearch from '../../components/kb/auto-complete-search.vue';

	export default {
		name:'kbAdminTags',
		components:{
			articleByTag,
			AutoCompleteSearch
		},

		props:{
		},
		data:  () => {
			return {
			}
		},
		watch: {
			tokenReader: function(tokenReader) {
				// if(tokenReader) addApiOptions({ tokenReader })
			}
		}
	}
</script>
