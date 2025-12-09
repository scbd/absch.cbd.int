<template>
  <div
    class="error__container"
  >
    <div
      v-for="error in errors"
      :key="error.reason"
      class="col-12 alert d-flex justify-content-between align-items-center"
      :class="errType(error).class"
    >
      <ul class="flex-1 m-0">
        <li>
          {{ errType(error).text }}: {{ error.reason }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { StandardError } from '~/types/errors';

type ErrorData = { text: string, class: string }
type ErrorTypes = {
  error: ErrorData,
  warning: ErrorData,
  info: ErrorData,
}

defineProps<{
  errors: Array<StandardError> 
}>()

const errorTypes: ErrorTypes = {
  error: { text: 'Error', class: 'alert-danger' },
  warning: { text: 'Warning', class: 'alert-warning' },
  info: { text: 'Info', class: 'alert-info' }
}

function errType (error: StandardError) {
  return errorTypes[error.level || 'error']
}
</script>
