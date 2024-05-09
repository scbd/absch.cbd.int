<template>
  <span class="modal-container" v-if="showModal">
    <div class="modal-window">
      <div class="modal__header">
        <h3 class="modal-title">{{ modalTitle }}</h3>
        <button
          type="button"
          class="closeBtn"
          @click="toggleModal"
          aria-label="Close"
          :disabled="isLoading"
        >
          <i class="bi bi-x-circle-fill icon-lg"></i>
        </button>
      </div>
      <div class="modal__container">
        <!-- Slot for modal content -->
        <slot></slot>
      </div>
      <div class="modal__footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 d-flex justify-content-end">
              <!-- Confirm and Close buttons -->
              <button
                type="button"
                class="btn btn-secondary me-3"
                @click.stop="toggleModal"
                :disabled="isLoading ? true : false"
              >
                Close
              </button>
              <button
                class="btn btn-primary"
                v-show="parsedFile.length"
                @click.stop="handleConfirm"
                :disabled="isLoading ? true : false"
              >
                Confirm
              </button>              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import messages from "../../app-text/components/common/import-modal.json"

const { t } = useI18n({ messages })

const props = defineProps({
    showModal: Boolean,
    modalTitle: String,
    parsedFile: Array,
    handleConfirm: Function,
    toggleModal: Function,
    isLoading: Boolean
})

onMounted(async () => {
  modal = new Modal(importModal.value);
});

const closeDialog = () => {
  modal.hide();
};

const showDialog = () => {
  modal.show('static');
};

defineExpose({ showDialog, closeDialog });
</script>

<style scoped></style>
