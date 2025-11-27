<template>
  <div class="d-flex w-100">
    <div class="d-block">
      <div class="py-0 px-1 flex-grow-1">
        <h5 class="modal-title">
          {{ $t("importIrccExcel") }}
        </h5>
        <p class="m-0">
          {{ $t("pleaseSelectExcelInfo") }}
        </p>
      </div>
    </div>
    <button
      type="button"
      class="close-button"
      aria-label="Dismiss"
      data-bs-dismiss="modal"
      @click="$emit('closeModal')"
    />
  </div>
</template>
<script setup>
const $emit = defineEmits(['closeModal'])
</script>
<style scoped>
.close-button {
  border: none;
  background: 0 0;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
}

.close-button::before {
  display: block;
  padding: 3px;
  color: #bbb;
  content: '\00D7';
  font-size: 26px;
  font-weight: 400;
  line-height: 14px;
  text-align: center;
  border-radius: 20px;
  background: #000;
  width: 25px;
  height: 25px;
  margin: 10px;

}
</style>
