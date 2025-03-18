<template>
        <div class="container" style="padding-top:20px;">
            <div class="row">
                <div class="col-3">
                    <h1 class="pb-3"><a href="/help/doing-abs">Actions to implement the Protocol</a> </h1>
                    <relevant-articles class="pb-3" tag="doing-abs-prerequisites" title="Prerequisites" :limit="limit" sort="true" baseURL="/help/doing-abs/"></relevant-articles>
                    <relevant-articles class="pb-3" tag="doing-abs-access"  title="Access and Benefit-sharing" :limit="limit"  sort="true"  baseURL="/help/doing-abs/"></relevant-articles>
                    <relevant-articles class="pb-3" tag="doing-abs-compliance" title="Compliance" sort="true" :limit="limit"  baseURL="/help/doing-abs/"></relevant-articles>
                </div>
                <div class="col-1"></div>
                <div class="col-8"> 
                    a={{ tags}}
                    <cbd-article class="pb-3" :id="hasID" :show-cover-image="true" :show-title="true" :show-edit="true" @onArticleLoad="getArticle"  />
                    <faqs class="pt-3" v-if="hasTag" :tags="tags" ></faqs>
                </div>
            </div>
        </div>
</template>

<script setup>
import articleDetails from '../../../components/kb/article-details.vue';
import relevantArticles from '../../../components/kb/relevant-articles.vue';
import CbdArticle from '../../../components/common/cbd-article.vue';
import doingAbsLinks from '../../../components/kb/doing-abs-links.vue';
import doingAbsContent from '../../../components/kb/doing-abs-content.vue';
import Faqs from '../../../components/kb/faqs.vue';
import { useRoute } from "@scbd/angular-vue/src/index.js"; 
import { ref, computed } from 'vue'; 

const route = useRoute();
const hasTag = computed(() => route.value?.params?.tag ? true : false);
const hasID = computed(() => route.value?.params?.id ? route.value.params.id  : false);
const limit = 100;

const tags = ref(null)
const getArticle = (results) => {

    tags.value = results;

}


</script>


