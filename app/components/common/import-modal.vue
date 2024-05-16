<template>
  <div class="modal fade mt-1" ref="importModal" data-bs-backdrop="static" tabindex="-1" aria-hidden="true" id="import-modal">
    <div class="modal-dialog modal-xl modal-dialog-centered" style="max-width: 80vw;" role="document">
      <div class="modal-content">
        <div class="modal-header color-black">
          <h5 class="modal-title">{{ modalTitle }}</h5>
          <p>{{ t("pleaseSelectExcelInfo") }}</p>
          <button type="button" class="border-0 close" @click="closeDialog()" :disabled="isLoading" aria-label="Close">
            <i class="bi bi-x-circle-fill icon-lg"></i>
          </button>
        </div>
        <div class="modal-body">
          <!-- Slot for modal content -->
          <slot></slot>
        </div>
        <div class="modal-footer d-block">
          <button class="btn btn-primary float-start" v-show="parsedFile.length" @click.stop="handleConfirm" :disabled="isLoading ? true : false">
            {{ t("confirm") }}
          </button>
          <button class="btn btn-secondary float-end" type="button" v-show="parsedFile.length" :disabled="isLoading ? true : false" @click="handleClearClick">
            {{ t("clear") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, shallowRef, defineExpose } from 'vue';
import { useI18n } from 'vue-i18n';
import { Modal } from "bootstrap";
import messages from "../../app-text/components/common/import-modal.json"

const { t } = useI18n({ messages });
const importModal = shallowRef(null);
let modal = null;

const props = defineProps({ 
  modalTitle: String,
  parsedFile: Array,
  handleConfirm: Function,
  toggleModal: Function,
  handleClearClick: Function,
  isLoading: Boolean,
});

onMounted(async () => {
  modal = new Modal(importModal.value);
});

const closeDialog = () => {
  modal.hide();
};

const showDialog = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  modal.show('static');
};

defineExpose({ showDialog, closeDialog });
</script>

<style scoped></style>
