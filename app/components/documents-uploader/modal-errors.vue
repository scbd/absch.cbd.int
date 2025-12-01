<template>
  <div
    class="error__container"
  >
    <div
      class="col-12 alert d-flex justify-content-between align-items-center"
      :class="errType(error).class"
      v-for="error in errors"
      :key="error.reason"
    >
      <ul class="flex-1 m-0">
        <li>
          {{ errType(error).text }}: {{ error.reason }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

// TODO: Display meaningful errors to the user
defineProps({
  errors: {
    type: Array,
    default: () => []
  }
})
const errorTypes = ref({
  error: { text: 'Error', class: 'alert-danger' },
  warning: { text: 'Warning', class: 'alert-warning' },
  info: { text: 'Info', class: 'alert-info' }
})

function errType (error) {
  return errorTypes.value[error.level] || errorTypes.value.error
}
</script>
