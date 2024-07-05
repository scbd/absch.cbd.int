<template>
    <div class="mt-4">
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ t("loading") }}...</div>
        <h4>{{ t("popularTags") }}</h4>
				<hr>
        <div v-if="!loading">
            <button v-for="tag in popularTags" type="button"  class="btn btn-sm btn-outline-secondary m-1 me-2" @click="goToAdminTag(tag.adminTags[0])">
               {{tag.title}}
            </button>
        </div>
    </div>
  </template>
  
<script setup>
    import { ref, onMounted } from "vue";
    import { useRealm } from '../../services/composables/realm.js';
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/kb.json';
    import { loadKbCategories } from '../../services/composables/articles.js';
    import {  useRouter } from "@scbd/angular-vue/src/index.js";
    const { t } = useI18n({ messages });
    const realm = useRealm();
    const router = useRouter();
    const popularTags = ref([]);
    const loading = ref(true);
  
    const goToAdminTag = (tag) => {
        if (tag === 'faq') {
        router.push({ path: 'kb/faqs' });
        } else {
        router.push({ path: `kb/tags/${encodeURIComponent(tag)}` });
        }
    };
  
    onMounted(async () => {
      try {
        const categories = await loadKbCategories();
        popularTags.value = categories;
      } catch (error) {
          console.error("Error loading categories:", error);
      } finally {
        loading.value = false;
      }
  });

</script>
