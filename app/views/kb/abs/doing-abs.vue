<template>
        <div class="container" style="padding-top:20px;">
            <div class="row">
                <div class="col-3">
                    <h1 class="pb-3"><a href="/help/doing-abs">Actions to implement the Protocol</a> </h1>
                    <relevant-articles class="pb-3" tag="doing-abs-prerequisites" hide-admin-tag="faq" title="Prerequisites" :limit="limit" :sort="sort" baseURL="/help/doing-abs/"></relevant-articles>
                    <relevant-articles class="pb-3" tag="doing-abs-access" hide-admin-tag="faq" title="Access and Benefit-sharing" :limit="limit"  :sort="sort"  baseURL="/help/doing-abs/"></relevant-articles>
                    <relevant-articles class="pb-3" tag="doing-abs-compliance" hide-admin-tag="faq" title="Compliance" :limit="limit" :sort="sort" baseURL="/help/doing-abs/"></relevant-articles>
                </div>
                <div class="col-1"></div>
                <div class="col-8"> 
             
                    <cbd-article class="pb-3" :id="hasID" :show-cover-image="true" :show-title="true" :show-edit="true" @onArticleLoad="getArticle" :query="articleQuery"   />
                    <faqs class="pt-3" v-if="hasTag" :tags="tags" :tag-title="false" use-exact-tags="true" ></faqs>
                </div>
            </div>
        </div>
</template>

<script setup>
import relevantArticles from '../../../components/kb/relevant-articles.vue';
import CbdArticle from '../../../components/common/cbd-article.vue';
import Faqs from '../../../components/kb/faqs.vue';
import { useRoute } from "@scbd/angular-vue/src/index.js"; 
import { computed, ref } from 'vue'; 
const sort = true;
const route = useRoute();
const hasTag = computed(() => route.value?.params?.tag ? true : false);
const hasID = computed(() => route.value?.params?.id ? route.value.params.id  : false);

const articleQuery = computed(()=>{
    let ag = [];
    ag.push({ $match: { "adminTags":  { "$all": ["abs", "doing-abs", "doing-abs-intro"] }}});
    ag.push({"$limit" : 1});
    return { ag: JSON.stringify(ag) };
  });
const limit = 100;
const tags =  ref(null);
const getArticle = (results) => {tags.value = results;}


</script>


