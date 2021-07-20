<template>
    <div class="col-lg-4">
        <div class="row margin-bottom-30">
            <div class="col-md-12 ">
                <div class="support-container">
                    <h2 class="support-heading">{{ $t("needSupport") }}?</h2>
                     {{ $t("supportedText") }}
                    <a href="#">{{ $t("concontactUs") }}</a> {{ $t("furtherHelp") }}.
                </div>
            </div>
        </div>

        <div class="sidebar" style="margin-top: 5px">
            <div class="widget fix widget_categories mt-2" style="margin-top: 0rem">
                <span class="icon icon-folder"></span>
                <h4>{{ $t("latestArticles") }}</h4>
                <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ $t("loading") }}...</div>
                <ul v-for="title in articles">
                    <li><a href="#" @click="goToArticle(title._id,title.title[$locale])">{{title.title[$locale]}}</a></li>
                </ul>
            </div>
            <popular-tags></popular-tags>
        </div>
    </div>
</template>

<script>
	import i18n from '../../locales/en/components/kb-group';
	import CategoriesGroup from './categories-group.vue';
	import popularTags from './popular-tags.vue';
	import ArticlesApi from './article-api';
	export default {
		components:{
			CategoriesGroup,
			popularTags
		},
		props:{
		},
		data:  () => {
			return {
				articles: [],
				loading: true
			}
		},
		created(){
			this.articlesApi = new ArticlesApi();
		},
		async mounted() {
			const adminTags = this.$realm.is('BCH')?'bch':'absch';
			let ag = [];
			ag.push({"$match":{"$and":[{"adminTags":encodeURIComponent(adminTags)}]}});
			ag.push({"$project" : {[`title.${this.$locale}`]:1}});
			ag.push({"$limit" : 10});
			const query = {
				"ag" : JSON.stringify(ag)
			};
			const articlesList = await this.articlesApi.queryArticles(query);
			if((articlesList || []).length) {
				this.articles =  articlesList;
			}
			this.loading = false;
		},
		methods: {
			goToArticle(id,title){
				const url = title.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
				this.$router.push({path:`/kb/articles/${id}/${url}/bch`});
			},
		},
		i18n: { messages:{ en: i18n }}
	}
</script>
