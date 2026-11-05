<template>
    <a
      id="editRecord"
      class="btn btn-outline-secondary text-decoration-none"
      :title="t('edit')"
      :href="`/register/${schemaCode}/${identifier}/edit`"
    >
      <i class="bi bi-pencil-square"></i>
    </a>
</template>

<script setup>
    import { useI18n } from "vue-i18n"
    import messages from "~/app-text/views/register/record-list.json"

    const { t } = useI18n({ messages })

    // --- Props ---
    const props = defineProps({
      schemaCode: {
        type: String,
        required: true
      },
      identifier: {
        type: String,
        required: true
      }
    })

</script>
