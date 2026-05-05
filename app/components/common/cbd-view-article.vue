<template>
    <div class="border-0 mt-1">
        <div v-if="article">
            <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@35.0.0/build/content-style.css">
            <div v-if="showCoverImage && article?.coverImage?.url">
                <cbd-article-cover-image :cover-image="article.coverImage" :cover-image-size="coverImageSize"></cbd-article-cover-image>
            </div> 
            <div v-html="articleContent" class="ck-content"></div>          
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, nextTick } from 'vue';
    import { lstring } from '../../components/kb/filters';
    import cbdArticleCoverImage from '../../components/common/cbd-article-cover-image.vue';
    import { sanitizeHtml } from "../../services/html.sanitize";
    import { useI18n } from 'vue-i18n';
    const  { locale } = useI18n();
    import { useAuth } from '@scbd/angular-vue/src/index.js';
    import ArticlesApi from '../../api/articles';
 
    const auth = useAuth();
    const articlesApi = new ArticlesApi({tokenReader:()=>auth.token()});
    const props = defineProps({
        showCoverImage: { type: Boolean, required: false, default: true },
        article: { type: Object, required: false, default: undefined },
        coverImageSize: { type: String, required: false, default: '800x800' }
    });

    const articleContent = computed(() => {
        const unsafeHtml = lstring(props.article?.content || '', locale.value);
        const safeHtml = sanitizeHtml(unsafeHtml);

        return safeHtml;
    });

    const preProcessOEmbed = async () => {
        nextTick(async () => {
            document.querySelectorAll('oembed[url]').forEach(async (element) => {
                const url = element.attributes.url.value;
                const params = { url: encodeURI(url) };

                if (/app\.tango\.us\/app\/workflow\/.*/.test(url)) {
                    params.height = '1500px';
                }

                try {
                    const response = await articlesApi.replaceOembed(params);
                    const embedHtml = `<div class="ck-media__wrapper" style="width:100%">${response.html}</div>`;
                    element.insertAdjacentHTML("afterend", embedHtml);
                    loadResources(response.resources);
                } catch (error) {
                    console.error("Failed to fetch oEmbed data:", error);
                }
            });
        });
    };

    async function loadResources(resources) {

        if(resources?.length){
            resources.forEach(resource=>{

                const parsedUrl = new URL(resource.src);
                
                if(/cbd.int$/.test(parsedUrl.hostname) || /cbddev.xyz$/.test(parsedUrl.hostname)){
                    if(['css', 'javascript'].includes(resource.type)){       
                        const elementType =  resource.type == 'css' ? 'link' : 'script'                                    
                        const remoteResource = document.createElement(elementType); 
                        const head = document.getElementsByTagName('HEAD')[0];

                        remoteResource.type = `text/${resource.type}`; 

                        if(resource.type == 'javascript'){
                            remoteResource.async = true;
                            remoteResource.src = resource.src;
                        }
                        else{
                            remoteResource.rel = 'stylesheet';
                            link.href = resource.src
                        }

                        head.appendChild(remoteResource);
                    }
                }
            });                                    
        }
    }

    onMounted(() => {
        if (props.article) {
            nextTick(async () => {
               preProcessOEmbed();
           });
        }
    });
</script>
