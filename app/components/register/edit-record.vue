<template>
      <a
        id="editRecord"
        class="btn btn-outline-secondary text-decoration-none"
        rel="noopener"
        :title="t('edit')"
        :href="`/en/register/${schemaCode}/${identifier}/edit`"
      >
        <i class="bi bi-pencil-square"></i>
      </a>
</template>

<script setup>
    import { ref, onMounted } from "vue"
    import { useI18n } from "vue-i18n"
    import KmDocumentApi from "~/api/km-document"
    import { useAuth } from "@scbd/angular-vue/src/index.js"
    import { useSchema } from "~/services/composables/schema.js"
    import messages from "~/app-text/views/register/record-list.json"

    const props = defineProps({
      identifier: {
        type: String,
        required: true
      }
    })

    // --- Composables ---
    const { t } = useI18n({ messages })
    const { schemaShortName } = useSchema()
    const auth = useAuth()
    const kmDocumentApi = new KmDocumentApi({ tokenReader: () => auth.token() })

    // --- Reactive state ---
    const schemaCode = ref("")

    // --- Lifecycle ---
    onMounted(async () => {
      const result = await kmDocumentApi.getDocument(props.identifier)
      console.log("result", result)
      schemaCode.value = schemaShortName(result.header.schema)
      console.log("schemaCode", schemaCode.value)
    })
</script>
