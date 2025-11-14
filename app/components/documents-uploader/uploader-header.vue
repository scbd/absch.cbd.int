<template>
  <div class="d-flex w-100">
    <div class="py-0 px-1">
      <h5 class="modal-title">
        {{ $t("importIrccExcel") }}
      </h5>
      <p class="m-0">
        {{ $t("pleaseSelectExcelInfo") }}
      </p>
    </div>
    <button
      type="button"
      class="btn-close"
      aria-label="Close"
      data-bs-dismiss="modal"
      @click="$emit('closeModal')"
    />
  </div>
</template>

<script setup>

const $emit = defineEmits(['closeModal'])

</script>
