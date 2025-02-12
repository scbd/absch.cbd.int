<template>
  <!-- ToDo: move the text to translation file, Since text is not final yet. -->
  <div id="multiSelect" class="d-inline">
    <a rel="noopener" href="#" class="share-button" @click="openModel()">
      <i class="fa fa-tag" aria-hidden="true"></i> Add Tags
    </a>
    <div class="modal fade" ref="multiSelectModal" data-backdrop="static" tabindex="-1" aria-hidden="true" id="share-modal">      
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-black">
                {{documentTitle}} - Admin Tags
            </h5>
            <button type="button" class="border-0 close" @click="closeDialog()" aria-label="Close">
              <i class="bi bi-x-circle-fill icon-lg"></i>
            </button>
          </div>

          <div class="modal-body">
            <div>
              <VueMultiselect
                v-model="taggingSelected"
                :options="taggingOptions"
                :multiple="true"
                :taggable="false"
                @tag="addTag"
                tag-placeholder="Add this as new tag"
                placeholder="Type to search or add tag"
                @select="clearError"
              ></VueMultiselect>

            </div>

            <div v-if="errorMessage" class="alert alert-danger mt-2">
              {{ errorMessage }}
            </div>

          </div>

          <div class="modal-footer"> 
            <button type="button" class="btn btn-secondary" aria-label="Close" @click="closeDialog()">
              {{ t('cancel') }}
            </button>
            <button type="button" class="btn btn-primary ms-2" aria-label="saveTag" @click="saveTag()">
              {{ t('save') }}
            </button>    
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { ref, shallowRef, onMounted, defineProps } from "vue";
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";

import KmDocumentApi from "~/api/km-document";
import { Modal } from "bootstrap";
import { useI18n } from "vue-i18n";

import messages from "~/app-text/components/common/add-tags.json";
const { t } = useI18n({ messages });

import { useAuth } from "@scbd/angular-vue/src/index.js";
const auth = useAuth();

const tagApi = new KmDocumentApi({tokenReader:()=>auth.token()});

let modal = null;
let multiSelectModal = shallowRef(null);
// let tagApi = null;

const taggingSelected = ref([]);
const taggingOptions = ref([]);
const errorMessage = ref("");

const props = defineProps({
  documentId: { type: String, required: true },
  documentTitle: { type: String, required: false }
});

const addTag = (newTag) => {
  if (!taggingOptions.value.includes(newTag)) {
    taggingOptions.value.push(newTag);
  }
  taggingSelected.value.push(newTag);
  clearError();
};

const clearError = () => {
  errorMessage.value = "";
};

const openModel = async () => {
  const params = {}; // will be used
  try {
    const documentTagsById = await tagApi.getDocumentTagsById(props.documentId, params);
    const documentTags = await tagApi.getDocumentTags(params);

    console.log("DocumentTagsById:", documentTagsById);
    console.log("documentTags:", documentTags);

    taggingOptions.value = [...new Set([...documentTags])]; // not final
    taggingSelected.value = [...documentTagsById];

    errorMessage.value = "";
    modal.show("static");
  } catch (error) {
    console.error("Error fetching tags:", error);
    errorMessage.value = "Failed to load tags.";
  }
};
// const isAdministrator = computed(()=> auth.check(['Administrator']));
const closeDialog = () => {
  modal.hide();
};

const saveTag = async () => {
  if (taggingSelected.value.length === 0) {
    errorMessage.value = "Please select at least one tag before saving.";
    return;
  } 

  try {
    const payload = {
      documentUid: props.documentId,
      adminTags: taggingSelected.value
    };

    const response = await tagApi.saveTags(payload);
    console.log("response:", response);
  } catch (error) {
    console.error("Error saving tags:", error);
    errorMessage.value = "Failed to save tags.";
  }
};

onMounted(() => {
  modal = new Modal(multiSelectModal.value);
});
</script>


