<template>
  <div>
    <div class="alert alert-info">
      <strong>{{ t('faqSuggestionsTitle') }}</strong>
      <ul class="mb-0">
        <li
          v-for="key in suggestionKeys"
          :key="key"
        >
          {{ t(key) }}
        </li>
      </ul>
    </div>
    <div
      v-for="(faq, index) in faqs"
      :key="index"
      class="card mb-3"
    >
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <div class="flex-grow-1">
            <ng
              v-vue-ng:km-control-group
              :name="`faq_${index}_question`"
              :caption="t('faqQuestion')"
            >
              <ng
                v-model:ng-model="faq.question"
                v-vue-ng:km-textbox-ml
                :locales="locales"
              />
            </ng>
            <ng
              v-vue-ng:km-control-group
              :name="`faq_${index}_answer`"
              :caption="t('faqAnswer')"
            >
              <ng
                v-model:ng-model="faq.answer"
                v-vue-ng:km-textbox-ml
                rows="3"
                :locales="locales"
              />
            </ng>
          </div>
          <button
            type="button"
            class="btn btn-outline-secondary ms-2"
            :aria-label="t('removeFaq')"
            @click="remove(index)"
          >
            <i class="fa fa-trash-o" />
          </button>
        </div>
      </div>
    </div>
    <button
      type="button"
      class="btn btn-outline-secondary btn-sm"
      :disabled="hasEmptyFaq"
      @click="add"
    >
      <i class="bi bi-plus" /> {{ t('addFaq') }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import messages from '~/app-text/views/forms/edit/abs/edit-legal-framework-overview.json'
import type { Faq } from '~/types/components/legal-framework-overview'
import type { LanguageCode } from '~/types/languages'

// Types
interface Props {
  locales: LanguageCode[]
}

// Props
defineProps<Props>()

// Composables
const { t } = useI18n({ messages })

// Model
const faqs = defineModel<Faq[]>({ default: () => [] })

// Vars
const suggestionKeys = [
  'faqSuggestion1', 'faqSuggestion2', 'faqSuggestion3', 'faqSuggestion4', 'faqSuggestion5',
  'faqSuggestion6', 'faqSuggestion7', 'faqSuggestion8', 'faqSuggestion9', 'faqSuggestion10'
]

// Computed
const hasEmptyFaq = computed(() => faqs.value.some(faq => !faq.question && !faq.answer))

// Methods
function add () {
  if (hasEmptyFaq.value) { return }
  faqs.value = [...faqs.value, {}]
}

function remove (index: number) {
  faqs.value = faqs.value.filter((_, i) => i !== index)
}
</script>
