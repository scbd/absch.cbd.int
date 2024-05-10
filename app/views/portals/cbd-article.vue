<template>
    <div class="loading" v-if="loading">
        <i class="fa fa-cog fa-spin fa-lg"></i> 
        {{ t("loading") }}...
    </div>
    <div v-if="!loading && article">
        <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@35.0.0/build/content-style.css">

        <div v-if="article?.coverImage && !hideCoverImage">
            <img v-bind:src="coverImage">
        </div>
    
        <div v-if="article.content" class="full-details ck ck-content ck-rounded-corners ck-blurred"
            v-html="lstring(article.content,$locale)">
        </div>

        <div v-if="error" class="alert alert-danger d-flex align-items-center" role="alert">
            <i class="bi bi-exclamation-triangle m-1"></i>
            <div class="m-1">
                {{ t("errorLoading") }}
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref, watch } from 'vue';
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/kb.json';
    import { lstring } from '../../components/kb/filters';
    import { useAuth } from '@scbd/angular-vue/src/index.js';
    import ArticlesApi from '../../components/kb/article-api';

    const auth = useAuth();
    const { t, locale } = useI18n({ messages });
    const articlesApi = new ArticlesApi({tokenReader:()=>auth.token()});

    const emit = defineEmits(['onArticleLoad']);

    const props = defineProps({
        query           : { type: Object, required: false  },
        hideCoverImage  : { type: Boolean, required: false, default:false },
        coverImageSize  : { type: String, required: false, default: '800x800' },
        showEdit        : { type: Boolean, required: false, default:true },
        adminTags 	    : { type: Array  , required: false, default:[] }
    });
    
    const coverImage = computed(()=> { 
        const url = article.value?.coverImage.url;
        const size = props.coverImageSize;
        return url && url
          .replace(/attachments.cbd.int\//, '$&' + size + '/')
          .replace(/\.s3-website-us-east-1\.amazonaws\.com\//, '$&' + size + '/');
    })

    const loading = ref(false);
    const article = ref(null)
    const error = ref(null);

    const getArticle = async function (query){

        try{
            loading.value = true;
            error.value = undefined;
            const articleResult = await articlesApi.queryArticles(query);
            if(articleResult.length > 0){
                article.value = articleResult[0] ;
                emit('onArticleLoad', article.value);
            }
        } 
        catch (err) {
            console.log(err);
            error.value =  err;
        } 
        finally {
            loading.value = false;
        }
    }

    onMounted( async ()=>{
        await getArticle(props.query)
    })
    watch(() => props.query, async (newQuery) => {
        await getArticle(newQuery)  
    });


</script>
