<template>
  <div ref="filterRailRoot" class="card shadow-sm sticky-top filter-rail" style="top: 1rem;">
    <div class="card-body">
      <div v-for="field in TRIAGE_FILTER_FIELDS" :key="field" class="mb-4">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="text-uppercase text-muted small fw-bold">{{ t(field) }}</span>
          <button
            v-if="selection[field].length > 0"
            type="button"
            class="btn btn-link btn-sm p-0 text-decoration-none"
            @click="clearFilter(field)"
          >
            {{ t('clear') }}
          </button>
        </div>

        <div class="input-group input-group-sm mb-2">
          <span class="input-group-text bg-transparent">
            <i class="bi bi-search" />
          </span>
          <input
            v-model="filterSearch[field]"
            type="text"
            class="form-control"
            :placeholder="t('findPlaceholder')"
          >
        </div>

        <div v-if="selection[field].length > 0" class="d-flex flex-wrap gap-1 mb-2">
          <span
            v-for="value in selection[field]"
            :key="value"
            class="badge text-bg-light border d-inline-flex align-items-center"
            :data-bs-toggle="field === 'notifications' ? 'tooltip' : undefined"
            data-bs-placement="top"
            :title="field === 'notifications' ? optionName(field, value) : undefined"
          >
            {{ field === 'notifications' ? value : optionName(field, value) }}
            <button
              type="button"
              class="btn-close ms-1"
              style="font-size: .55rem;"
              :aria-label="t('clear')"
              @click="removeFilterValue(field, value, $event)"
            />
          </span>
        </div>

        <div v-for="option in visibleOptions(field)" :key="option.value" class="form-check">
          <input
            :id="`filter-${field}-${option.value}`"
            class="form-check-input"
            type="checkbox"
            :checked="selection[field].includes(option.value)"
            @change="$emit('onToggle', field, option.value)"
          >
          <label class="form-check-label d-flex justify-content-between" :for="`filter-${field}-${option.value}`">
            <span :data-bs-toggle="field === 'notifications' ? 'tooltip' : undefined" data-bs-placement="top" :title="option.name">
              <span v-if="field === 'notifications'" class="fw-bold">{{ option.value }}</span>
              <template v-else>{{ truncate(option.name) }}</template>
            </span>
            <span class="text-muted">{{ option.count }}</span>
          </label>
        </div>
        <div v-if="facets[field].length === 0" class="text-muted small">
          {{ t('noFilterOptions') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import messages from '~/app-text/views/register/admin-triage-list.json'
import { type TriageFilterSelection, TRIAGE_FILTER_FIELDS } from './triage-filters'
import { initTooltips, disposeTooltip } from './triage-tooltips'

interface FacetValue { value: string, count: number }
interface FilterOption extends FacetValue { name: string }

const props = defineProps<{
  facets: Record<keyof TriageFilterSelection, FilterOption[]>
  selection: TriageFilterSelection
}>()

const emit = defineEmits<{
  onToggle: [field: keyof TriageFilterSelection, value: string]
  onClear: [field: keyof TriageFilterSelection]
}>()

const { t } = useI18n({ messages })

const filterSearch = reactive<Record<keyof TriageFilterSelection, string>>({
  notifications: '',
  organizations: '',
  government: ''
})

const visibleOptions = (field: keyof TriageFilterSelection): FilterOption[] => {
  const search = filterSearch[field].trim().toLowerCase()
  if (search === '') return props.facets[field]
  return props.facets[field].filter((option) => option.name.toLowerCase().includes(search))
}

const optionName = (field: keyof TriageFilterSelection, value: string): string => props.facets[field].find((option) => option.value === value)?.name ?? value

const NAME_TRUNCATE_LENGTH = 50

const truncate = (text: string): string => (text.length > NAME_TRUNCATE_LENGTH ? `${text.slice(0, NAME_TRUNCATE_LENGTH)}…` : text)

const filterRailRoot = ref<HTMLElement | null>(null)

const removeFilterValue = (field: keyof TriageFilterSelection, value: string, event: MouseEvent): void => {
  if (event.currentTarget instanceof Element) disposeTooltip(event.currentTarget.closest('[data-bs-toggle="tooltip"]'))
  emit('onToggle', field, value)
}

const clearFilter = (field: keyof TriageFilterSelection): void => {
  const tooltipTriggerList = filterRailRoot.value?.querySelectorAll('[data-bs-toggle="tooltip"]') ?? []
  Array.from(tooltipTriggerList).forEach((element) => { disposeTooltip(element) })
  emit('onClear', field)
}

watch([() => props.facets, () => props.selection, filterSearch], async () => {
  await nextTick()
  if (filterRailRoot.value !== null) initTooltips(filterRailRoot.value)
}, { deep: true })
</script>

<style scoped>
/* Palette (--accent, --accent-soft, --accent-ink) comes from the .triage-page
   wrapper in admin-triage-list.vue — custom properties inherit through the
   DOM regardless of the scoped-style boundary. */
.filter-rail .form-check-input:checked {
  background-color: var(--accent);
  border-color: var(--accent);
}
.filter-rail .btn-link {
  color: var(--accent);
}
.filter-rail .badge.text-bg-light {
  background: var(--accent-soft) !important;
  color: var(--accent-ink);
}
</style>
