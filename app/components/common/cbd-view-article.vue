<template>
    <div class="border-0 mt-1">
        <div v-if="viewArticle">
            <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@35.0.0/build/content-style.css">
            <div v-if="!hideCoverImage && viewArticle?.coverImage?.url">
                <cbd-article-cover-image :cover-image="viewArticle.coverImage" :cover-image-size="coverImageSize"></cbd-article-cover-image>
            </div> 
            <div v-html="viewArticle.content" class="ck-content"></div>          
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, nextTick } from 'vue';
    import { lstring } from '../../components/kb/filters';
    import cbdArticleCoverImage from '../../components/common/cbd-article-cover-image.vue';
    import { domPurify } from "../../services/dompurify";
    
    const props = defineProps({
        hideCoverImage: { type: Boolean, required: false, default: false },
        article: { type: Object, required: false, default: undefined },
        coverImageSize: { type: String, required: false, default: '800x800' }
    });

    const viewArticle = computed(() => {
        if (props.article) {
            const sanitizedArticle = {
                ...props.article,
                content: domPurify(lstring(props.article.content)) // Sanitize the article content
            };
            return sanitizedArticle;
        }
        return '';
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
                    const response = await useAPIFetch('/api/v2020/oembed', { method: 'GET', query: params });
                    console.log("useAPIFetch response", response);
                    const embedHtml = `<div class="ck-media__wrapper" style="width:100%">${response.html}</div>`;
                    element.insertAdjacentHTML("afterend", embedHtml);
                } catch (error) {
                    console.error("Failed to fetch oEmbed data:", error);
                }
            });
        });
    };

    onMounted(() => {
        if (viewArticle.value) {
           setTimeout(() => {
               preProcessOEmbed();
           }, 1000);
        }
    });
</script>
