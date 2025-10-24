<template>
  <div id="multiSelect" class="d-inline">

    <a rel="noopener" href="#" class="plain-text"  @click="openModal">
      <i class="fa fa-tag" aria-hidden="true"></i>
      <slot>{{ t("addTags") }}</slot>
    </a>

    <div class="modal fade" ref="multiSelectModal" data-backdrop="static" tabindex="-1" aria-hidden="true" id="share-modal">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-black">
              {{ documentTitle }}
            </h5>
            <button type="button" class="border-0 close" @click="closeDialog" aria-label="Close">
              <i class="bi bi-x-circle-fill icon-lg"></i>
            </button>
          </div>

          <div class="modal-body">
            <b>{{ t("adminTags") }}</b>
            <VueMultiselect
              v-model="taggingSelected"
              :options="taggingOptions"
              :multiple="true"
              :taggable="false"
              @search-change="handleSearch"
              @select="clearError"
              :placeholder="t('typeHere')"
            />

            <div v-if="errorMessage" class="alert alert-danger mt-2">
              {{ errorMessage }}
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDialog">
              {{ t("cancel") }}
            </button>
            <button type="button" class="btn btn-primary ms-2" @click="saveTag">
              {{ t("save") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, shallowRef, defineProps } from "vue";
  import VueMultiselect from "vue-multiselect";
  import "vue-multiselect/dist/vue-multiselect.css";
  import CustomTagsApi from "~/api/custom-tags.js";
  import { Modal } from "bootstrap";
  import { useI18n } from "vue-i18n";
  import messages from "~/app-text/components/common/add-tags.json";
  import { useAuth } from "@scbd/angular-vue/src/index.js";

  const { t } = useI18n({ messages });
  const auth = useAuth();
  const tagApi = new CustomTagsApi({ tokenReader: () => auth.token() });

  const multiSelectModal = shallowRef(null);
  let modal = null;

  const taggingSelected = ref([]);
  const taggingOptions = ref([]);
  const errorMessage = ref("");

  const props = defineProps({
    documentId: { type: String, required: true },
    documentTitle: { type: String, required: false }
  });


  const clearError = () => {
    errorMessage.value = "";
  };

  const loadAdminTags = async (searchText = "") => {
    try {
      const qs = {
        f: JSON.stringify({ title: 1 }),
        l: 1000,
        q: JSON.stringify({ title: { "$$startsWith": searchText } }),
        sk: 0
      };

      const data = await tagApi.getAdminTags(qs);
      return data.map(tag => tag.title);
    } catch (error) {
      console.error("Error loading tags:", error);
      return [];
    }
  };

  const handleSearch = async (search) => {
    if (search) {
      taggingOptions.value = await loadAdminTags(search);
    }
  };

  const openModal = async () => {
    try {
      errorMessage.value = "";
      const documentTags = await tagApi.getDocumentTags(props.documentId);
      taggingSelected.value = [...documentTags];
      modal.show();
    } catch (error) {
      console.error("Error fetching tags:", error);
      errorMessage.value = t("failedToLoadTags");
    }
  };

  const closeDialog = () => {
    modal.hide();
  };

  const saveTag = async () => {
    if (!taggingSelected.value.length) {
      errorMessage.value = t("pleaseSelectOne");
      return;
    }

    try {
      const payload = {
        documentUid: props.documentId,
        adminTags: [...taggingSelected.value]
      };
      await tagApi.saveTags(payload);
      closeDialog();
    } catch (error) {
      console.error("Error saving tags:", error);
      errorMessage.value = t("failedToSave");
    }
  };

  onMounted(() => {
    modal = new Modal(multiSelectModal.value);
  });
</script>