<template>
    <div>
        <div class="card shadow-sm mb-3" v-for="category in KbCategories">
            <div class="card-body">
                <h4 class="pb-2"><a :href="`${tagUrl(category)}`">{{lstring(category.title, locale)}}</a></h4>
                <ul v-if="category.articles.length > 0" >
                    <li v-for="article in category.articles" class="mb-1">
                        <a v-if="article.identifier" class="link-dark fs-6" :href="`${articleUrl(article, category.adminTags[0])}`"> {{lstring(article.title, locale)}}</a>
                        <a v-if="article.url" :href="article.url" class="link-dark fs-6" target="_blank">{{lstring(article.urlTitle, locale)}}</a>
                    </li>
                </ul>
                <div v-if="category.articles.length == 0">
                    <relevant-articles :tag="category.adminTags[0]" :sort="true">
                        <template #title><span></span></template>
                    </relevant-articles>
                </div>
                <div>
                    <a class="float-end text-decoration-none link-secondary text-uppercase bold" :href="`${tagUrl(category)}`">{{ t("viewMore") }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import relevantArticles from './relevant-articles.vue';
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/kb.json';
    import { useRealm } from '../../services/composables/realm.js';
    import { loadKbCategories, getUrl } from '../../services/composables/articles.js';
    import { lstring } from "./filters";
    import { ref, onMounted } from "vue";
    const { t, locale } = useI18n({ messages });
    const realm = useRealm();
    const KbCategories = ref([]);

    onMounted(async ()=>{
        const categories = await loadKbCategories(locale.value);
        KbCategories.value = categories.filter(tag => tag.adminTags[0] != "faq");
    })
    
    const tagUrl = function (category) {
            return getUrl(category.title, undefined, category.adminTags[0]);
    }

    const articleUrl = function (article, tag) {
            if (article.url) {
                return article.url
            } else {
                return getUrl(lstring(article.title, locale), article.identifier, tag);
            }
    }
</script>