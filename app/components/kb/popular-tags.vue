<template>
    <div class="mt-4">
        <div class="loading" v-if="loading"><i class="fa fa-cog fa-spin fa-lg" ></i> {{ t("loading") }}...</div>
        <h4>{{ t("popularTags") }}</h4>
				<hr>
        <div v-if="!loading">
          <button
            v-for="tag in popularTags"
            type="button"
            class="btn btn-sm
            btn-outline-secondary m-1 me-2"
            @click="goToAdminTag(tag.adminTags[0] || '')"
          >
            {{tag.title}}
          </button>
        </div>
    </div>
  </template>
  
<script setup lang="ts">
    import { type Ref, ref, onMounted } from "vue";
    // @ts-ignore
    import { useRealm } from '../../services/composables/realm.js';
    // @ts-ignore
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/kb.json';
    // @ts-ignore
    import { loadKbCategories } from '../../services/composables/articles.js';
    // @ts-ignore
    import {  useRouter } from "@scbd/angular-vue/src/index.js";

    type Tag = {
      title: string;
      adminTags: Array<string>;
    }

    const { t, locale } = useI18n({ messages });
    const realm = useRealm();
    const router = useRouter();
    const popularTags :Ref<Array<Tag>> = ref([]);
    const loading :Ref<boolean> = ref(true);
  
    const goToAdminTag = (adminTag: string) => {
        if (adminTag === 'faq') {
        router.push({ path: 'kb/faqs' });
        } else {
        router.push({ path: `kb/tags/${encodeURIComponent(adminTag)}` });
        }
    };
  
    onMounted(async () => {
      try {
        const categories = await loadKbCategories(locale.value);
        popularTags.value = categories;
      } catch (error) {
          console.error("Error loading categories:", error);
      } finally {
        loading.value = false;
      }
  });
</script>
