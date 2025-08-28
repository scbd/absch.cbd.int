<template>
    <button 
      class="btn btn-outline-secondary" 
      :title="t('delete')" 
      type="button" 
      @click="handleClick"
    >
      <i class="bi bi-trash"></i>
    </button>
</template>

<script setup>
  import { defineEmits, inject } from "vue"
  import { useI18n } from "vue-i18n"
  import messages from "~/app-text/views/register/record-list.json"

  const { t } = useI18n({ messages })
  const emit = defineEmits(["refresh"])
  const askDelete = inject("askDelete")

  const props = defineProps({
    record: { type: Object, required: true }
  })

  const handleClick =  () => {
      askDelete(props.record) // call Angular-provided delete
      emit("refresh", props.record) // tell parent to refresh
  }
</script>
