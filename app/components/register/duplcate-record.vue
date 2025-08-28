<template>
    <button 
      class="btn btn-outline-secondary" 
      :title="t('duplicate')" 
      type="button" 
      @click="handleClick"
    >
      <i class="bi bi-clipboard"></i>
    </button>
</template>

<script setup>
    import { defineEmits, inject } from "vue";
    import { useI18n } from "vue-i18n";
    import messages from "~/app-text/views/register/record-list.json"

    const { t } = useI18n({ messages });
    const emit = defineEmits(["refresh"]);
    const askDuplicate = inject("askDuplicate");
    
    const props = defineProps({
      record: { type: Object, required: true }
    });

    const handleClick = () => {
      askDuplicate(props.record) // directly call Angular-provided fn
      emit("refresh", props.record) // tell parent to refresh
    }
 
</script>
