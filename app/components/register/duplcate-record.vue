<template>
  <div>
    <!-- The main button to trigger the duplication process -->
    <button 
      class="btn btn-outline-secondary" 
      :title="t('duplicate')" 
      type="button" 
      @click="openDialog"
    >
      <i class="bi bi-clipboard"></i>
    </button>

    <!-- Confirmation Modal -->
    <div 
      v-if="showModal" 
      class="modal fade" 
      :class="{ 'd-block show': showModal }"
      tabindex="-1" 
      @click.self="closeDialog"
    >
      <div class="modal-dialog mt-3" style="min-width:70%;">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title d-flex align-items-center">
              Duplicate Record
              <span v-if="isLoading" class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
            </h5>
            <button type="button" class="btn-close" @click="closeDialog" aria-label="Close"></button>
          </div>
          <!-- Modal Body -->
          <div class="modal-body">
            <p>Confirm duplication of this record?</p>
            <div v-if="duplicateSuccess" class="alert alert-success mt-4" role="alert">
              Record successfully duplicated!
            </div>
            <div v-if="error" class="alert alert-danger mt-4" role="alert">
              Error: {{ error }}
            </div>
          </div>
          <!-- Modal Footer -->
          <div class="modal-footer">
            <button :disabled="isLoading" type="button" class="btn btn-secondary" @click="closeDialog">Cancel</button>
            <button :disabled="isLoading" type="button" class="btn btn-primary" @click="duplicateRecord">Duplicate</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";
import messages from "../../app-text/views/register/record-list.json"
// import { documentService } from "~/services/edit-form-utility.js";
import KmDocumentApi from "~/api/km-document";
import { useAuth } from '@scbd/angular-vue/src/index.js';

const auth = useAuth();
const kmDocumentApi = new KmDocumentApi({tokenReader:()=>auth.token()});

const { t } = useI18n({ messages });
const emit = defineEmits(["refresh"]);
 
const props = defineProps({
  record: { type: Object, required: true }
});

const showModal = ref(false);
const isLoading = ref(false);
const error = ref(null);
const duplicateSuccess = ref(false);

const openDialog = () => {
  showModal.value = true;
  isLoading.value = false;
  error.value = null;
  duplicateSuccess.value = false;
};

const closeDialog = () => {
  showModal.value = false;
};

const isDraft = (entity) => {
  return entity?.workingDocumentCreatedOn && !entity?.workingDocumentLock;
};

const isPublished = (entity) => {
  return entity?.documentID;
};

const duplicateRecord = async () => {
  isLoading.value = true;
  error.value = null;
  duplicateSuccess.value = false;

  try {
    let documentToDuplicate;

    // Fetch the latest document data from the service based on its status
    if (isDraft(props.record)) {
      documentToDuplicate = await kmDocumentApi.getDraft(props.record.identifier);
    } else if (isPublished(props.record)) {
      documentToDuplicate = await kmDocumentApi.getDocument(props.record.identifier);
    } else {
      // Fallback to the prop if status is unknown
      documentToDuplicate = JSON.parse(JSON.stringify(props.record));
    }

    if (!documentToDuplicate) {
      throw new Error("Invalid document");
    }
    console.log('Original Document:', props.record);
    console.log('Document to duplicate:', documentToDuplicate);

    // Assign a new unique identifier for the duplicated record
    //9B757A67-4382-1982-4087-319CC7933795
    //058D0A64-EC96-06A1-8D00-FFDD30215219
    //document.header.identifier = guid();
    documentToDuplicate.header.identifier = '058D0A64-EC96-06A1-8D00-FFDD30215219'.replace(/[0-9A-F]/g, () => {
      return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
    }) ;

    
    // Apply specific logic for the 'absPermit' schema
    if (documentToDuplicate.header.schema === 'absPermit') {
      documentToDuplicate.amendmentIntent = undefined;
      documentToDuplicate.amendmentDescription = undefined;
    }

    // Call the service to save the duplicated record as a new draft
    await kmDocumentApi.saveDraft(documentToDuplicate);
    
    duplicateSuccess.value = true;
    
    // Emit the refresh event to the parent component
    emit("refresh");

  } catch (err) {
    console.error("Failed to duplicate record:", err);
    if (err?.status === 403) {
      error.value = "You are not authorized to create duplicate records.";
    } else {
      error.value = err.message || "An unexpected error occurred.";
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
