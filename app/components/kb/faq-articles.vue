<template>
    <div>
        <h4>
           <span>{{ t("faqs") }}</span>
        </h4>
        <hr>
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ t("loading") }}...</div>
            <ul>
                <li v-for="article in articles" class="mb-1">
                <a class="link-dark fs-6" :href="`${articleUrl(article)}`">{{article.title}}</a>
                </li>
            </ul>
        </div>
</template>
  
<script setup>
    import { ref, onMounted } from 'vue';
    import { loadKbCategories , getUrl } from '../../services/composables/articles.js';
    import { useRealm } from '../../services/composables/realm.js'
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/kb.json';
    const { t, locale } = useI18n({ messages });
    const realm = useRealm();
    const articles = ref([]);
    const loading = ref(true);
    
    onMounted(async () => {
        const categories = await loadKbCategories(locale.value);
        const faqArticles = categories.filter(tag => tag.adminTags[0] === "faq");
        articles.value = faqArticles[0].articles;
        loading.value = false;
    });

    const articleUrl = (article) => {
        return getUrl(article.title, article.identifier, 'faq');
    };
</script>
