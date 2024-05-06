<template>
    <div class="loading" v-if="loading">
        <i class="fa fa-cog fa-spin fa-lg"></i> 
        {{ t("loading") }}...
    </div>
    <div v-if="!loading">
        <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@35.0.0/build/content-style.css">

        <div v-if="article?.coverImage">
            <img v-bind:src="getSizedImage(article?.coverImage.url, '800x800')">
        </div>
        
        <!-- <h2>{{lstring(article.title, $locale)}}</h2> -->
        <div v-if="article.content" class="full-details ck ck-content ck-rounded-corners ck-blurred"
            v-html="lstring(article.content,$locale)">
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/kb.json';
    import { lstring } from '../../components/kb/filters';
    import { useAuth } from '@scbd/angular-vue/src/index.js';
    import ArticlesApi from '../../components/kb/article-api';
    const auth = useAuth();
    const { t } = useI18n({ messages });
    const articlesApi = new ArticlesApi({tokenReader:()=>auth.token()});

    const props = defineProps({
        query: {
            type: Object,
            required: false
        }
    });

    const loading = ref(true);
    const article = ref({})

    onMounted( async ()=>{
        const articleResult = await articlesApi.queryArticles(props.query);
        if(articleResult.length > 0){
            article.value = articleResult[0] ;
            loading.value = false;
        }
    })

</script>
