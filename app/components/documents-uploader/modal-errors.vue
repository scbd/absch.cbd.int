<template>
  <div
    class="row mt-5 error__container"
  >
    <div
      class="col-12 alert alert-danger d-flex justify-content-between align-items-center"
    >
      <ul class="flex-1">
        <li
          v-for="error in errors"
          :key="error"
        >
          Error creating draft record
          on row {{ error.index + 1 }} - {{ error.value.message }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
// TODO: Display meaningful errors to the user
defineProps({
  errors: {
    type: Array,
    default: () => []
  }
})
</script>
