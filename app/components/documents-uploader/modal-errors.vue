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
          :key="error.message"
        >
          Error: {{ error.message }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { watch } from 'vue'
// TODO: Display meaningful errors to the user
const props = defineProps({
  errors: {
    type: Array,
    default: () => []
  }
})

watch((props.errors), (newValue) => {
  console.log(newValue)
})
</script>
