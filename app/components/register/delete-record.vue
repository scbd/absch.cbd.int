<template>
  <div>    
    <button 
      class="btn btn-outline-secondary" 
      :title="t('delete')" 
      type="button" 
      @click="openDialog"
    >
      <i class="bi bi-trash"></i>
    </button>

    <!-- Modal -->
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
          <div class="modal-header bg-danger text-white">
            <h4 class="modal-title">
              {{ t('confirmDelete') }}
              <span v-if="isLoading" class="spinner-border spinner-border-sm ms-2"></span>
            </h4>
            <button type="button" class="btn-close" @click="closeDialog"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body bg-white">

            <!-- Draft Section -->
            <div v-if="isDraft(record)" class="card">
              <div class="card-header text-start">{{ t('draftRecord') }}</div>

             <div class="p-3 mt-2 text-start">
              <div class="mb-2">
                <strong>{{ t('title') }}:</strong> 
                <span>{{ lstring(record.workingDocumentTitle) }}</span>
              </div>
              <div class="mb-2">
                <strong>{{ t('uniqueId') }}:</strong> 
                <i>{{ t('draftUpper') }}</i>
              </div>
              <div v-if="record.workingDocumentSummary" class="mb-2">
                <strong>{{ t('summary') }}:</strong> 
                <span>{{ lstring(record.workingDocumentSummary) }}</span>
              </div>
            </div>

              <div class="p-3">
                <button 
                  type="button" 
                  class="btn btn-danger float-end" 
                  :disabled="isLoading" 
                  @click="deleteDraft(record)"
                >
                  {{ t('deleteDraft') }}
                </button>
              </div>
            </div>

            <!-- Published Section -->
            <div v-if="isPublished(record)" class="card mt-2">
              <div class="card-header">{{ t('publishedRecord') }}</div>

              <div v-if="isIRCC" class="p-3">
                <strong>{{ t('irrcInfo') }}</strong>
              </div>

              <div class="p-3">
                <div><strong>{{ t('title') }}:</strong> {{ record.title }}</div>
                <div>
                  <strong>{{ t('uniqueId') }}:</strong> 
                  <a :href="`/database/${uniqueIDWithoutRevision(record)}`" target="_blank">
                    {{ uniqueIDWithoutRevision(record) }}
                  </a>
                </div>
                <div v-if="record.summary"><strong>{{ t('summary') }}:</strong> <span v-html="record.summary"></span></div>
              </div>

              <!-- IRCC Section -->
              <div v-if="isIRCC" class="p-3">
                <km-form-languages multiple v-model="record.document.header.languages" class="float-end"></km-form-languages>
                <br />
                <div class="km-control-group">
                  <div class="km-control-group" name="amendmentDescription" required :caption="t('amendmentDescription')">
                    <km-textbox-ml 
                      v-model="record.document.amendmentDescription" 
                      rows="3" 
                      :locales="record.document.header.languages"
                    />
                  </div>
                </div>
                <div class="alert alert-danger" v-if="record.showRevokeError">
                  {{ t('enterSummary') }}
                </div>
                <button 
                  type="button" 
                  class="btn btn-danger" 
                  :disabled="isLoading" 
                  @click="revokeRecord(record)"
                >
                  {{ t('revokeIrrc') }}
                </button>
              </div>

              <!-- Non-IRCC Section -->
              <div v-if="!isIRCC" class="p-3">
                <div v-if="!canDeletePublished" class="alert alert-warning">
                  {{ t('deleteDraftRecord') }}
                </div>
                <button 
                  v-if="security" 
                  type="button" 
                  class="btn btn-danger float-end m-2" 
                  :disabled="isLoading || !canDeletePublished" 
                  @click="deleteRecord(record)" 
                  data-bs-toggle="tooltip" 
                  data-placement="top" 
                  :title="t('note')"
                >
                  <span v-if="!security.canDelete">{{ t('requestDeletion') }}</span>
                  <span v-else>{{ t('deleteRecord') }}</span>
                </button>
              </div>

            </div>
          </div>

          <!-- After deletion feedback error-->
            <div v-if="error" class="alert alert-danger mt-4" role="alert">
              Error: {{ error }}
            </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { useI18n } from "vue-i18n";
import KmDocumentApi from "~/api/km-document";
import messages from "../../app-text/views/register/record-list.json"
const props = defineProps({
  record: { type: Object, required: true },
  isIRCC: { type: Boolean, default: false },
  canDeletePublished: { type: Boolean, default: false },
  security: { type: Object, default: () => ({}) }
});
const emit = defineEmits(['refresh']);
const showModal = ref(false);
const isLoading = ref(false);
const error = ref(null);
import { useAuth } from '@scbd/angular-vue/src/index.js';
import { lstring } from '~/components/kb/filters';

const auth = useAuth();
const kmDocumentApi = new KmDocumentApi({tokenReader:()=>auth.token()});
const { t } = useI18n({ messages });
 
const openDialog = () => {
  isLoading.value = false;
  error.value = null;
  showModal.value = true;
};
const closeDialog = () => (showModal.value = false);
 
const isDraft = (entity) => entity?.workingDocumentCreatedOn && !entity?.workingDocumentLock;
const isPublished = (entity) => entity?.documentID;

// will be use this filter later
const uniqueIDWithoutRevision = (record) => record.identifier;

const deleteDraft = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    
    const deleteResponse = await kmDocumentApi.deleteDraft(props.record.identifier);
    console.log('deleteResponse:', deleteResponse); 
    emit("refresh");

  } catch (err) {
    console.error("Failed to delete record:", err);
    if (err?.status === 403) {
      error.value = "You are not authorized to delete records.";
    } else {
      error.value = err.message || "An unexpected error occurred.";
    }
  } finally {
    isLoading.value = false;
  }
}

const deleteRecord = (record) => console.log("Deleting record:", record);
const revokeRecord = (record) => console.log("Revoking record:", record);

</script>
