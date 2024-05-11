<template>
  <span class="modal-container" v-if="showModal">
    <div class="modal-window">
      <div class="modal__header">
        <div>
          <h3 class="modal-title">{{ modalTitle }}</h3>
          <p>{{t("pleaseSelectExcelInfo")}}</p>
        </div>
      </div>
      <div class="modal__container">
        <!-- Slot for modal content -->
        <slot></slot>
      </div>
      <div class="modal__footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 d-flex justify-content-between">
              <div>
                <button class="btn btn-primary" 
                  type="button" 
                  :disabled="isLoading ? true : false"
                  @click="handleClearClick">
                    {{t("clear")}}
                </button>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click.stop="toggleModal"
                  :disabled="isLoading ? true : false"
                >
                  {{t("close")}}
                </button>
                <button
                  class="btn btn-primary ms-3"
                  v-show="parsedFile.length"
                  @click.stop="handleConfirm"
                  :disabled="isLoading ? true : false"
                >
                  {{t("confirm")}}
                </button>  
              </div>            
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
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
    handleClearClick: Function,
    isLoading: Boolean,
})

</script>

<style scoped></style>
