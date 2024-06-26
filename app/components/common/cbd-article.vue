<template>
    <div class="border-0 mt-1">
        <div class="loading" v-if="loading">
            <i class="fa fa-cog fa-spin fa-lg"></i> 
            {{ t("loading") }}...
        </div>
        <div v-if="!loading">
            <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@35.0.0/build/content-style.css">
            <div v-if="!hideCoverImage && viewArticle?.coverImage?.url">
                <cbd-article-cover-image :cover-image="viewArticle.coverImage" :cover-image-size="coverImageSize"></cbd-article-cover-image>
            </div> 
            <cbd-add-new-view-article v-if="showEdit && hasEditRights" 
                :tags="tags" :admin-tags="adminTags" :custom-tags="customTags" :id="(viewArticle||{})._id" :target="target"
                class="btn btn-secondary float-end">
            </cbd-add-new-view-article>
            <div v-if="viewArticle" v-html="lstring(viewArticle.content, $locale)" class="ck-content"></div>          
            <div v-if="!viewArticle" class="article-not-found-section">
                <slot name="missingArticle">
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref, nextTick, watch } from 'vue';
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/kb.json';
    import { lstring } from '../../components/kb/filters';
    import { useAuth } from '@scbd/angular-vue/src/index.js';
    import ArticlesApi from '../../components/kb/article-api';
    import  cbdAddNewViewArticle  from '../../components/common/cbd-add-new-view-article.vue';
    import  cbdArticleCoverImage  from '../../components/common/cbd-article-cover-image.vue';
    // import 'ck-editor-css'; // not sure

    const auth = useAuth();
    const { t, locale } = useI18n({ messages });
    const articlesApi = new ArticlesApi({tokenReader:()=>auth.token()});
    const loading = ref(false);
    const remoteArticle = ref(null);
    const error = ref(null);
    
    const emit = defineEmits(['onArticleLoad']);

    const props = defineProps({
        hideCoverImage  : { type: Boolean, required: false, default:false        },
        showEdit        : { type: Boolean, required: false, default:false        },
        article         : { type: Object,  required: false, default:undefined    },
        query           : { type: Object,  required: true                        },
        tags 		    : { type: Array  , required: false, default:[]           }, // [] of tag id's
        customTags 	    : { type: Array  , required: false, default:[]           }, // [] of customTag id's
        adminTags 	    : { type: Array  , required: false, default:[]           }, // [] of adminTag text
        target          : { type: String , required: false, default: '_self'     },
        coverImageSize   : { type: String, required: false, default: '800x800'   }
    });

    const hasEditRights = computed(()=> auth?.check(['oasisArticleEditor', 'Administrator']));
    const viewArticle   = computed(() => props.article || remoteArticle.value);
    
    const getArticle = async (query) => {
        try{
            loading.value = true;
            error.value = undefined;
            const articleResult = await articlesApi.queryArticles(query);
           
            if(articleResult.length > 0){
                let articleData = articleResult[0];
                 if(articleData.coverImage?.url){
                        //sometime the file name has space/special chars, use new URL's href prop which encodes the special chars
                        const url = new URL(articleData.coverImage.url)
                        articleData.coverImage.url = url.href;
                        articleData.coverImage.url_1200  = articleData.coverImage.url.replace(/attachments\.cbd\.int\//, '$&1200x600/')
                    }
                remoteArticle.value = articleData;
                emit('onArticleLoad', articleData);
                setTimeout(() => {                        
                        preProcessOEmbed();
                    }, 1000);
            } else {
                  emit('onArticleLoad');
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
 
    const preProcessOEmbed = async () => {
           nextTick( async() => {

                document.querySelectorAll( 'oembed[url]' ) //All <oembed> elements in the document that have a url attribute are selected
                .forEach(async function(element) {
                    var url = element.attributes.url.value;
                    var params = {
                        url : encodeURI(url)                        
                    }

                    if(/app\.tango\.us\/app\/workflow\/.*/.test(url)){
                        params.height = '1500px'
                    }

                    const response = await useAPIFetch('/api/v2020/oembed', {method:'GET', query:params});   
                    console.log("useAPIFetch response",response);
                    //Inserting Embed HTML into the Document                
                    var embedHtml = '<div class="ck-media__wrapper" style="width:100%">' + response.html +'</div>'
                    element.insertAdjacentHTML("afterend", embedHtml);
                });

            })
        }

        watch(() => props.query, async (newQuery) => {
            await getArticle(newQuery)  
        });
        

    onMounted( async ()=>{
        if(!viewArticle.value)
            await getArticle(props.query);
    })

</script>
