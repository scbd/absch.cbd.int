<template>
            <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ t("loading") }}...</div>
            <div class="row match-height" v-if="!loading">
                <div class="article-by-tags" v-if="article">
                    <h4>
						{{lstring(article.title, locale)}}
					</h4>   
					<hr>
                   
                    <div v-if="article.coverImage">
                        <img class="card-img-top" v-bind:src="getSizedImage(article.coverImage.url, '800x800')">
                    </div>
                    <div v-html="lstring(article.content, locale)"></div>
                </div>
        </div>

</template>
<script setup>
    import { ref, onMounted } from "vue";
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/kb.json';
    import ArticlesApi from './article-api';
    import { lstring } from './filters';
    import './filters';
    import {  useRoute, useAuth } from "@scbd/angular-vue/src/index.js"; 
   
    const auth = useAuth();
    const { t, locale } = useI18n({ messages });
    const articlesApi = new ArticlesApi({tokenReader:()=>auth.token()});
    const route = useRoute();
    const article = ref({}); 
    const loading = ref(true);
    
    onMounted(async () => {  
        let tag="";
        if (route.value?.params?.tag) 
              tag = route.value.params.tag.replace(/"/g, "");
        else
            tag ="doing-abs-intro";
       
        loadArticles(tag);
    })

    const articleUrl= function (article, tag){
        return getUrl(lstring(article.title), article._id, tag);
    };

    const loadArticles = async function (adminTag) {
            let ag = [];
            ag.push({"$match":{"$and":[{"adminTags": { $all : ['abs','doing-abs','content']}}]}});
            if(adminTag) ag.push({"$match":{"$and":[{"adminTags":adminTag}]}});
            ag.push({
                    "$project":
                    {
                    [`title`]: 1,
                    [`content`]: 1,
                    [`coverImage`]: 1,
                    adminTags: 1,
                    _id: 1
                    }
                });
            ag.push({"$limit" : 1});
          
            const query = {
                "ag" : JSON.stringify(ag)
            };
         
            try {
                const results = await articlesApi.queryArticles(query);
                if ((results || []).length) {
                    article.value = results[0];
                }
            }
            catch(e) {
                console.error(e);
            }
            finally {
                loading.value = false;
            }
        };

    const getSizedImage = function (url, size){
            return url && url
            .replace(/attachments.cbd.int\//, '$&'+size+'/')
            .replace(/\.s3-website-us-east-1\.amazonaws\.com\//, '$&'+size+'/')
        };
</script>
