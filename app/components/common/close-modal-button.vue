<template>
  <button
    type="button"
    class="btn fs-4 ms-auto flex-fill d-flex justify-content-end close float-end cancelClose"
    :class="classes"
    aria-label="Dismiss"
    :data-bs-dismiss="isClosingModal ? 'modal' : ''"
    @click="$emit('closeModal')"
  >
    <div class="rounded-circle">
      <i class="bi bi-x-circle-fill" />
    </div>
  </button>
</template>
<script setup lang="ts">
defineProps({
  classes: {
    type: String,
    default: ''
  },
  isClosingModal: {
    type: Boolean,
    default: true
  }
})

const $emit = defineEmits(['closeModal'])

</script>
<style scoped>
  button.close {
    margin: -0.8rem -1rem;
    line-height: 1;
    height: max-content;
  }

button.close > div {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  transform: scale(1.00);
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  height: max-content;
}

button.close:hover > div {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.3);
  transform: scale(0.94);
}
</style>
