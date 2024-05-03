<template>
    <div>
        <link type="text/css" rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@35.0.0/build/content-style.css">

        <div class="card shadow-sm mb-3">
            cbd article page : {{ article }}
            <div v-if="article.coverImage">
                <img class="card-img-top" v-bind:src="getSizedImage(article.coverImage.url, '800x800')">
            </div>
            <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg"></i> 
            {{ t("loading") }}...</div>
            <div class="card-body" v-if="!loading">
                <h2 class="card-title">{{lstring(article.title, $locale)}}</h2>
                <div v-if="article.content" class="card-text full-details ck ck-content ck-rounded-corners ck-blurred"
                    v-html="lstring(article.content,$locale)">
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import messages from '../../app-text/components/kb.json';
import { lstring } from '../../components/kb/filters';
// import { getUrl } from '../../services/composables/articles.js';
import { useAuth } from '@scbd/angular-vue/src/index.js';
  const auth = useAuth();
import ArticlesApi from '../../components/kb/article-api';
const { t } = useI18n({ messages });
const loading = ref(false);

  const article = ref({})
  const articlesApi = new ArticlesApi({tokenReader:()=>auth.token()});
  const props = defineProps({
    query: {
        type: Object,
        required: false
    }
});


    onMounted( async ()=>{
        // loading.value = true
        console.log('Article query props.query: ', props.query)
        // article.value = await articlesApi.getArticleById(encodeURIComponent(props.id));
         article.value = await articlesApi.queryArticles(props.query)
    })

</script>
