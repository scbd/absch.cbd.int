<template>
    <div class="mt-3">
        <div class="row mt-3">
            <div class="col-lg-8">
                <link type="text/css" rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/@scbd/ckeditor5-build-inline-full@35.0.0/build/content-style.css">
                <div class="card shadow-sm mb-3">
                    <div v-if="article.coverImage">
                        <img class="card-img-top" v-bind:src="getSizedImage(article.coverImage.url, '800x800')">
                    </div>

                    <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg"></i> 
                    {{ t("loading") }}...</div>

                    <div class="card-body" v-if="!loading">
                       
                        <h2 class="card-title">{{lstring(article.title, $locale)}}</h2>
                       
                        <div v-if="article.meta" class="p-1 mb-3 text-white bg-darkgrey bold">
                            <i class="fa fa-calendar" aria-hidden="true"></i> &nbsp;
                            {{formatDate(article.meta.createdOn, 'DD MMM YYYY')}}
                        </div>

                        <div v-if="article.content" class="card-text full-details ck ck-content ck-rounded-corners ck-blurred"
                            v-html="lstring(article.content,$locale)">
                        </div>
                    </div>
                    <div v-if="article.adminTags" class="card-footer">
                        <a v-for="tag in article.adminTags" :key="tag" 
                            type="button" class="btn btn-sm btn-outline-secondary m-1 me-2" :href="`${tagUrl(tag)}`">
                            {{tag}}
                        </a>
                    </div>
                </div>
                <button class="btn btn-primary btn-sm float-end" @click="back()">{{ t("back") }}</button>
            </div>
            <div class="col-lg-4">
                <div v-if="tag">
                    <relevant-articles :tag="tag"></relevant-articles>
                </div>
                <div>
                    <popular-tags></popular-tags>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/kb.json';
    import relevantArticles from './relevant-articles.vue';
    import popularTags from './popular-tags.vue';
    import ArticlesApi from './article-api';
    import { formatDate, lstring } from './filters';
    import { loadKbCategories, getUrl } from '../../services/composables/articles.js';
    import { useRealm } from '../../services/composables/realm.js';
    import {  useRoute, useAuth } from "@scbd/angular-vue/src/index.js";
    const { t } = useI18n({ messages }); 
    const auth = useAuth();
    const realm = useRealm();
    const route = useRoute();
    const article = ref({});
    const categories = ref([]);
    const loading = ref(true);
    const tag = ref('');

    const articlesApi = new ArticlesApi({tokenReader:()=>auth.token()});
    
    onMounted(async () => {  
        tag.value = (route.value?.params?.tag).replace(/"/g, ""); //ToDo: route.params is not available 
        categories.value = await loadKbCategories();
        if (route.value == undefined) return;
            try {
                let id = (route.value?.params?.id).replace(/"/g, "");
                let articleData = await articlesApi.getArticleById(encodeURIComponent(id));
                articleData = articleData || { meta: {} };
                if (articleData?.content) {
                    article.value = articleData;
                }
            }
            catch (e) {
                console.error(e);
            }
            finally {
                loading.value = false;
            }
    })

    const back = function () {
            window.history.back();
        };
    const tagUrl = function (tag) { 
            const tagDetails = categories.value.find(e => e.adminTags.includes(tag))
            const tagTitle = (tagDetails?.title || '');
            return getUrl(tagTitle, undefined, tag);
        };

    const getSizedImage = function (url, size) {
            return url && url
                .replace(/attachments.cbd.int\//, '$&' + size + '/')
                .replace(/\.s3-website-us-east-1\.amazonaws\.com\//, '$&' + size + '/')
        }
</script>
