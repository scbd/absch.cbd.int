<template>
  <!-- TODO: display parsed documents in a way that
  will be easy for th document creators to understand. -->
  <div
    class="preview-list ps-3 pe-3 overflow-auto"
  >
    <div
      v-for="documentJson in documents"
      :key="documentJson.header.identifier"
      class="mt-2 "
    >
      <h6> {{ documentJson.header.identifier }} </h6>
      <div
        class="preview overflow-scroll h-50 p-2 mt-2 bg-gray-200 border border-tertiary border-2"
      >
        <div> <strong>Data: </strong> </div>
        <pre> {{ documentJson }} </pre>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  documents: {
    type: Array,
    default: () => [{ header: { identifier: '' } }]
  }
})
</script>
<style scoped>
  .preview {
    max-height: 160px;
  }
  .preview-list  {
    max-height: 450px
  }
</style>
