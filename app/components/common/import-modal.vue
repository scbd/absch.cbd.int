<template>
  <span class="modal-container" v-if="showModal">
    <div class="modal-window">
      <div class="modal__header">
        <div>
          <h3 class="modal-title">{{ modalTitle }}</h3>
          <p>Please select a excel file to import data.</p>
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
                    Clear
                </button>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click.stop="toggleModal"
                  :disabled="isLoading ? true : false"
                >
                  Close
                </button>
                <button
                  class="btn btn-primary ms-3"
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
  </span>
</template>

<script setup>
import { defineProps } from 'vue';

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
