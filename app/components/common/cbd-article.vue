<template>
    <div class="border-0 mt-1">
        <div class="loading" v-if="loading">
            <i class="fa fa-cog fa-spin fa-lg"></i> 
            {{ t("loading") }}...
        </div>
        <div v-if="!loading && viewArticle">
            <cbd-add-new-view-article v-if="showEdit && hasEditRights" 
                :tags="tags" :admin-tags="adminTags" :custom-tags="customTags" :id="(viewArticle||{})._id" :target="target"
                class="btn btn-secondary float-end">
            </cbd-add-new-view-article>         
            
            <cbd-view-article :article="viewArticle" :show-cover-image="showCoverImage" :cover-image-size="coverImageSize"></cbd-view-article>
            
            <div v-if="!viewArticle" class="article-not-found-section">
                <slot name="missingArticle">
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue';
    import { useAuth } from '@scbd/angular-vue/src/index.js';
    import ArticlesApi from '../../components/kb/article-api';
    import  cbdAddNewViewArticle  from '../../components/common/cbd-add-new-view-article.vue';
    import  cbdViewArticle  from '../../components/common/cbd-view-article.vue';
    import messages from '../../app-text/components/kb.json';
    import { useI18n } from 'vue-i18n';
    const { t } = useI18n({ messages });
    const auth = useAuth();
    const articlesApi = new ArticlesApi({tokenReader:()=>auth.token()});
    const loading = ref(false);
    const remoteArticle = ref(null);
    
    const emit = defineEmits(['onArticleLoad']);

    const props = defineProps({
        showCoverImage  : { type: Boolean, required: false, default:true         },
        showEdit        : { type: Boolean, required: false, default:false        },
        article         : { type: Object,  required: false, default:undefined    },
        query           : { type: Object,  required: false                       },
        tags 		    : { type: Array  , required: false, default:[]           }, // [] of tag id's
        customTags 	    : { type: Array  , required: false, default:[]           }, // [] of customTag id's
        adminTags 	    : { type: Array  , required: false, default:[]           }, // [] of adminTag text
        target          : { type: String , required: false, default: '_self'     },
        coverImageSize  : { type: String , required: false, default: '800x800'   }
    });

    const hasEditRights = computed(()=> auth?.check(['oasisArticleEditor', 'Administrator']));
    const viewArticle   = computed(() => props.article || remoteArticle.value);
    
    const loadArticle = async (query) => {
        try{
            loading.value = true;
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
            } else {
                  emit('onArticleLoad');
            }
        } 
        catch (err) {
            console.log(err);
        } 
        finally {
            loading.value = false;
        }
    }

    onMounted( async ()=>{
        if(!viewArticle.value && props.query)
            await loadArticle(props.query);
    })

    defineExpose({
        loadArticle
    });

</script>
