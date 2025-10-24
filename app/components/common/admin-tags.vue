<template>
  <div class="p-3">
    <div class="card shadow-sm p-4 rounded-3">
      <div class="table-responsive">
        <table class="table table-hover table-bordered align-middle">
          <thead class="table-light">
            <tr class="text-secondary text-uppercase text-start">
              <th class="w-35">{{ t("title") }}</th>
              <th class="w-50">{{ t("adminTags") }}</th>
              <th class="w-15 text-center align-middle">{{ t("addTags") }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="loading">
              <tr>
                <td class="text-center p-4" colspan="3">
                  <div class="spinner-border text-primary" role="status"></div>
                  <div class="mt-2">{{ t("loading") }}</div>
                </td>
              </tr>
            </template>
            <template v-else-if="records.length === 0">
              <tr>
                <td class="text-center p-4" colspan="3">
                  <strong class="text-muted">{{ t("noRecord") }}</strong>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr v-for="record in records" :key="record.identifier">
                <td>
                   <!-- title will be a link and will be redirect to the single record page -->
                  <div class="fw-bold text-primary">{{ record.title }}</div>
                  <div class="text-muted small">{{ record.schema }}</div>
                </td>
                <td>
                  <div class="d-flex flex-wrap fs-6 gap-2">
                    <span v-for="tag in record.adminTags" :key="tag" class="badge bg-secondary p-1">
                      {{ tag }}
                    </span>
                  </div>
                </td>
                <td class="text-center align-middle">
                  <add-tags :document-title="record.title" :document-id="record.identifier"> Update Tags</add-tags>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import CustomTagsApi from "~/api/custom-tags.js";
  import { useI18n } from "vue-i18n";
  import messages from "~/app-text/components/common/add-tags.json";
  import { useAuth } from "@scbd/angular-vue/src/index.js";
  import addTags from "./add-tags.vue";
  // import { lstring } from '../../components/kb/filters';
  const { t } = useI18n({ messages });
  const auth = useAuth();
  const tagApi = new CustomTagsApi({ tokenReader: () => auth.token() });

  const records = ref([]);
  const loading = ref(true);

  const loadRecords = async () => {
    try {
      loading.value = true;
      records.value = await tagApi.getDocumentsWithTags();
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(loadRecords);
</script>

<style scoped>
  .w-35 {
    width: 35%;
  }
   .w-15 {
    width: 15%;
  }
</style>