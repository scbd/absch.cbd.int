<template>
  <div>
    <!-- Delete button -->
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
      class="modal fade d-block show" 
      tabindex="-1" 
      @click.self="closeDialog"
    >
      <div class="modal-dialog mt-3 w-75">
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
            <div v-if="isDraft" class="card">
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
                  @click="deleteDraft"
                >
                  {{ t('deleteDraft') }}
                </button>
              </div>
            </div>

            <!-- Published Section -->
            <div v-if="isPublished" class="card mt-2">
              <div class="card-header">{{ t('publishedRecord') }}</div>

              <div v-if="isIRCC" class="p-3">
                <strong>{{ t('irrcInfo') }}</strong>
              </div>

              <div class="p-3">
                <div><strong>{{ t('title') }}:</strong> {{ record.title }}</div>
                <div>
                  <strong>{{ t('uniqueId') }}:</strong> 
                  <a :href="`/database/${uniqueIDWithoutRevision}`" target="_blank">
                    {{ uniqueIDWithoutRevision }}
                  </a>
                </div>
                <div v-if="record.summary">
                  <strong>{{ t('summary') }}:</strong> 
                  <span v-html="record.summary"></span>
                </div>
              </div>

              <!-- IRCC Section -->
              <div v-if="isIRCC" class="p-3">
                <km-form-languages 
                  multiple 
                  v-model="record.document.header.languages" 
                  class="float-end"
                />
                <div class="km-control-group mt-3">
                  <div class="km-control-group" name="amendmentDescription" required :caption="t('amendmentDescription')">
                    <km-textbox-ml 
                      v-model="record.document.amendmentDescription" 
                      rows="3" 
                      :locales="record.document.header.languages"
                    />
                  </div>
                </div>
                <div class="alert alert-danger mt-2" v-if="record.showRevokeError">
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
                  v-if="security.canDelete" 
                  type="button" 
                  class="btn btn-danger float-end m-2" 
                  :disabled="isLoading || !canDeletePublished" 
                  @click="deleteRecord"
                  :title="t('note')"
                >
                  {{ t('deleteRecord') }}
                </button>
                <button 
                  v-else 
                  type="button" 
                  class="btn btn-danger float-end m-2" 
                  disabled
                >
                  {{ t('requestDeletion') }}
                </button>
              </div>

            </div>
          </div>

          <!-- Error -->
          <div v-if="error" class="alert alert-danger m-3" role="alert">
            {{ error }}
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { useI18n } from "vue-i18n";
import KmDocumentApi from "~/api/km-document";
import messages from "~/app-text/components/register/delete-record.json";
import { useAuth } from '@scbd/angular-vue/src/index.js';
import { lstring } from '~/components/kb/filters';

const props = defineProps({
  record: { type: Object, required: true }
});
const emit = defineEmits(["refresh"]);

const showModal   = ref(false);
const isLoading   = ref(false);
const error       = ref(null);
const security    = ref({ canDelete: false });

const auth = useAuth();
const kmDocumentApi = new KmDocumentApi({ tokenReader: () => auth.token() });
const { t } = useI18n({ messages });

/* --------------------------
   Computed Helpers
-------------------------- */
const isDraft     = computed(() => props.record?.workingDocumentCreatedOn && !props.record?.workingDocumentLock);
const isPublished = computed(() => !!props.record?.documentID);
const isIRCC      = computed(() => props.record?.type === "absPermit" && isPublished.value);
const canDeletePublished = computed(() => isPublished.value);
const uniqueIDWithoutRevision = computed(() => props.record.identifier);

/* --------------------------
   Modal Controls
-------------------------- */
const openDialog = async () => {
  isLoading.value = false;
  error.value = null;
  showModal.value = true;
  await checkSecurity(); // only check when opening
};
const closeDialog = () => (showModal.value = false);

/* --------------------------
   API Actions
-------------------------- */
const checkSecurity = async () => {
  let allowed = false;

  try {
    allowed = isDraft.value
      ? await kmDocumentApi.canDeleteDraft(props.record.identifier)
      : await kmDocumentApi.canDelete(props.record.identifier);

    allowed = allowed === true; // enforce strict boolean
  } catch (e) {
    allowed = false; // any error means not allowed
  }
console.log("allowed:", allowed)
  security.value = { canDelete: allowed };
};



const deleteDraft = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    await kmDocumentApi.deleteDraft(props.record.identifier);
    emit("refresh");
    closeDialog();
  } catch (err) {
    error.value = err?.message || t("unexpectedError");
  } finally {
    isLoading.value = false;
  }
};

const deleteRecord = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    await kmDocumentApi.delete(props.record.identifier);
    emit("refresh");
    closeDialog();
  } catch (err) {
    error.value = err?.message || t("unexpectedError");
  } finally {
    isLoading.value = false;
  }
};

const revokeRecord = async (record) => {
  console.log("Revoking record:", record);
  // TODO: integrate API
};
</script>
