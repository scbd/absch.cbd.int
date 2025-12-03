<template>
  <div
    data-backdrop="static"
    tabindex="-1"
    class="inverted dimmer modal fade show"
    aria-modal="true"
    role="dialog"
    style="display: block"
  >
    <div
      class="loader-max-height position-absolute h-100 w-100 top-0 start-0 d-flex align-items-center justify-content-center"
    >
      <div class="text-white lead fw-bold">
        <i class="fa fa-cog fa-spin me-2" />{{ caption || "" }}
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  caption: {
    type: String,
    default: null
  }
})
</script>
<style scoped>
.loader-max-height {
  max-height: 100vh;
}
</style>
