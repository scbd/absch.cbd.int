<template>
  <div class="d-flex w-100">
    <div class="d-block">
      <div class="py-0 px-1 flex-grow-1">
        <slot name="header">
          <h5 class="modal-title">
            {{ $t("importExcel") }}
          </h5>
          <p class="m-0">
            {{ $t("pleaseSelectExcelInfo") }}
          </p>
        </slot>
      </div>
    </div>
    <button
      type="button"
      class="btn-close btn-secondary"
      aria-label="Dismiss"
      data-bs-dismiss="modal"
      @click="$emit('closeModal')"
    />
  </div>
</template>
<script setup>
const $emit = defineEmits(['closeModal'])
</script>
