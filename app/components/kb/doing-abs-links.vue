<template>
     <h1 class="pb-3"><a href="/help/doing-abs">Actions to implement the Protocol</a> </h1>
     <relevant-articles class="pb-3" tag="doing-abs-prerequisites" title="Prerequisites" sort="true" baseURL="/help/doing-abs/"></relevant-articles>
     <relevant-articles class="pb-3" tag="doing-abs-access"  title="Access and Benefit-sharing" sort="true"  baseURL="/help/doing-abs/"></relevant-articles>
     <relevant-articles class="pb-3" tag="doing-abs-compliance" title="Compliance" sort="true"  baseURL="/help/doing-abs/"></relevant-articles>


</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/kb.json';
    import ArticlesApi from './article-api';
    import { lstring } from './filters';
    import './filters';
    import {  useRoute, useAuth } from "@scbd/angular-vue/src/index.js"; 
    import relevantArticles from './relevant-articles.vue';
    import CbdArticle from '../../components/common/cbd-article.vue';

   
    const auth = useAuth();
    const { t, locale } = useI18n({ messages });
    const articlesApi = new ArticlesApi({tokenReader:()=>auth.token()});
    const route = useRoute();
    const article = ref({}); 
    const loading = ref(true);
    
    onMounted(async () => {  
        loadArticles();
    })

    const loadArticles = async function () {
            let ag = [];
            ag.push({"$match":{"$and":[{"adminTags": { $all : ['abs','doing-abs','links']}}]}});
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


</script>