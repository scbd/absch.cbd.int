<template>
  <div class="d-flex w-100">
    <div class="d-block">
      <div class="py-0 px-1 flex-grow-1">
        <slot name="header">
          <h5 class="modal-title">
            {{ $t("importSheet") }}
          </h5>
          <p class="m-0">
            {{ $t("pleaseSelectSheetInfo") }}
          </p>
        </slot>
      </div>
    </div>
    <CloseModalButton
      @close-modal="$emit('closeModal')"
    />
  </div>
</template>
<script setup lang="ts">
import CloseModalButton from '../common/close-modal-button.vue'

const $emit = defineEmits(['closeModal'])
</script>
