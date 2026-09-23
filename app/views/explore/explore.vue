<template>
  <div>
    <div class="bg-abs py-3 px-3">
      <div class="container-fluid">
        <div class="row g-3 align-items-center">
          <div class="col-12 col-md-auto">
            <h1 class="h2 mb-0 text-white">
              {{ t('explore') }}
            </h1>
          </div>

          <div class="col-12 col-md">
            <div class="form-floating shadow-sm rounded">
              <select
                id="schema-select"
                v-model="selectedRecordType"
                class="form-select fw-semibold"
                @change="reloadWithSchema"
              >
                <option
                  v-for="option in schemaOptions"
                  :key="option.recordType"
                  :value="option.recordType"
                >
                  {{ option.title }}
                </option>
              </select>

              <label for="schema-select">
                <i
                  class="fa fa-list me-1"
                  aria-hidden="true"
                />
                {{ t('recordType') }}
              </label>
            </div>
          </div>

          <div class="col-12 col-xl-7">
            <div class="row g-2 align-items-center">
              <div class="col-12 col-md">
                <div class="form-floating shadow-sm rounded">
                  <select
                    id="country-select"
                    v-model="selectedCountryCode"
                    class="form-select"
                    :class="{
                      'border-warning bg-warning-subtle':
                        selectedCountryCode !== ''
                    }"
                    :disabled="geographyLoading"
                    @change="onCountryChange"
                  >
                    <option value="">
                      {{ t('allCountries') }}
                    </option>

                    <option
                      v-for="countryOption in countryOptions"
                      :key="countryOption.id"
                      :value="countryOption.id"
                    >
                      {{
                        getGeographyOptionLabel(
                          countryOption,
                          locale
                        )
                      }}
                    </option>
                  </select>

                  <label for="country-select">
                    <i
                      class="fa fa-globe me-1"
                      aria-hidden="true"
                    />
                    {{ t('country') }}
                  </label>

                  <button
                    v-if="selectedCountryCode !== ''"
                    type="button"
                    class="btn-close position-absolute top-50 end-0 translate-middle-y me-5 select-clear-button"
                    :aria-label="
                      t('removeFilter', {
                        label: t('country')
                      })
                    "
                    @click="removeFilter(COUNTRY_FILTER_ID)"
                  />
                </div>
              </div>

              <div class="col-12 col-md-auto text-center">
                <span
                  class="badge rounded-pill bg-light text-dark text-uppercase"
                >
                  {{ t('or') }}
                </span>
              </div>

              <div class="col-12 col-md">
                <div class="form-floating shadow-sm rounded">
                  <select
                    id="region-select"
                    v-model="selectedRegionId"
                    class="form-select"
                    :class="{
                      'border-warning bg-warning-subtle':
                        selectedRegionId !== ''
                    }"
                    :disabled="geographyLoading"
                    @change="onRegionChange"
                  >
                    <option value="">
                      {{ t('allRegions') }}
                    </option>

                    <optgroup
                      v-for="regionGroup in regionGroups"
                      :key="regionGroup.id"
                      :label="
                        getGeographyOptionLabel(
                          regionGroup,
                          locale
                        )
                      "
                    >
                      <option
                        v-for="regionOption in regionGroup.options"
                        :key="regionOption.id"
                        :value="regionOption.id"
                      >
                        {{
                          getRegionOptionLabel(
                            regionOption,
                            locale
                          )
                        }}
                      </option>
                    </optgroup>
                  </select>

                  <label for="region-select">
                    <i
                      class="fa fa-map-marker me-1"
                      aria-hidden="true"
                    />
                    {{ t('region') }}
                  </label>

                  <button
                    v-if="selectedRegionId !== ''"
                    type="button"
                    class="btn-close position-absolute top-50 end-0 translate-middle-y me-5 select-clear-button"
                    :aria-label="
                      t('removeFilter', {
                        label: t('region')
                      })
                    "
                    @click="removeFilter(REGION_FILTER_ID)"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="geographyLoading"
            class="col-12 text-white small"
            role="status"
          >
            <span
              class="spinner-border spinner-border-sm me-2"
            />
            {{ t('loadingLocations') }}
          </div>

          <div
            v-else-if="geographyError"
            class="col-12 text-warning small"
          >
            {{ t('geographyError') }}
          </div>
        </div>
      </div>
    </div>

    <div class="container py-4">
      <div
        v-if="filters.length > 0"
        class="d-flex flex-wrap align-items-center gap-2 mb-4"
      >
        <span class="fw-bold">
          {{ t('appliedFilters') }}:
        </span>

        <span
          v-for="filter in filters"
          :key="filter.id"
          class="badge rounded-pill bg-warning text-dark d-inline-flex align-items-center"
        >
          {{ getFilterLabel(filter) }}

          <button
            type="button"
            class="btn-close ms-2 filter-remove-button"
            :aria-label="
              t('removeFilter', {
                label: getFilterLabel(filter)
              })
            "
            @click="removeFilter(filter.id)"
          />
        </span>
      </div>

      <section
        v-for="category in availableWidgetCategories"
        :key="category.id"
        class="widget-category mb-5"
      >
        <h2 class="h4 mb-3">
          {{
            getCategoryTitle(
              category.id,
              category.title
            )
          }}
        </h2>

        <div class="row">
          <div
            v-for="widget in category.widgets"
            :key="widget.id"
            :class="widget.columnClass"
            class="mb-3"
          >
            <component
              :is="widgetComponents[widget.id]"
              :schema="schema"
              :scope="scope"
              :filters="filters"
              :country="
                selectedCountryCode ||
                  undefined
              "
              :region="
                selectedRegionId ||
                  undefined
              "
              @filter-change="onFilterChange"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable max-lines -- Explore page coordinates the complete filter workflow. */
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type Ref
} from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from '@scbd/angular-vue/src/index.js'
import { useRealm } from '~/services/composables/realm.js'
import { useCommonjs } from '~/services/composables/commonjs.js'
import messages from '~/app-text/views/explore/explore.json'
import {
  widgetCategories,
  widgets
} from './widget-registry'
import { widgetComponents } from './widget-components'
import {
  getCountryOptions,
  getGeographyOptionLabel,
  getRegionGroups,
  getRegionOptionLabel,
  type GeographyOption,
  type RegionGroup
} from './explore-regions'
import type {
  ExploreFilter,
  ExploreFilterChange
} from './explore-filters'

defineOptions({
  name: 'ExplorePage'
})

const {
  t,
  te,
  locale
} = useI18n({
  messages
})

const COUNTRY_FILTER_ID =
  'dashboard-country'

const REGION_FILTER_ID =
  'dashboard-region'

const COUNTRY_URL_PARAMETER =
  'country'

const REGION_URL_PARAMETER =
  'region'

// Older links stored every filter, including its Solr query, in this parameter.
const LEGACY_FILTERS_URL_PARAMETER =
  'filters'

// Letters, digits, underscore, dot and hyphen only, so a crafted link cannot
// inject Solr syntax into a field query.
const SAFE_URL_VALUE_PATTERN =
  /^[\w.-]+$/

const filters = ref<ExploreFilter[]>([])

const countryOptions =
  ref<GeographyOption[]>([])

const regionGroups =
  ref<RegionGroup[]>([])

const selectedCountryCode = ref('')
const selectedRegionId = ref('')

const scope = computed(() => {
  if (selectedCountryCode.value !== '') {
    return 'country'
  }

  return selectedRegionId.value === ''
    ? 'global'
    : 'region'
})

const allRegionOptions = computed(() =>
  regionGroups.value.flatMap(
    ({ options }) => options
  )
)

const geographyLoading = ref(true)
const geographyError = ref(false)

const { value: route } = useRoute()
const { params } = route
const { recordType = '' } = params

const schemaAliases: Record<string, string> = {
  ircc: 'absPermit',
  cpc: 'absCheckpointCommunique',
  cp: 'absCheckpoint',
  pro: 'absProcedure',
  msr: 'measure',
  cna: 'authority'
}

const selectedRecordType = ref(recordType)
const realm = useRealm()
const commonjs = useCommonjs()

function isRecord (
  value: unknown
): value is Record<string, unknown> {
  return typeof value === 'object' &&
    value !== null
}

function buildCountryFieldQuery (
  code: string
): string {
  return `government_s:${code}`
}

function buildRegionFieldQuery (
  id: string
): string {
  return `countryRegions_REL_ss:${id}`
}

function createGeographyFilter (
  filterId: string,
  value: string,
  buildFieldQuery: (value: string)=> string
): ExploreFilter {
  return {
    id: filterId,
    label: '',
    fieldQuery: buildFieldQuery(value),
    value
  }
}

function getSafeUrlValue (
  parameters: URLSearchParams,
  name: string
): string {
  const value = parameters.get(name)

  return value !== null &&
    SAFE_URL_VALUE_PATTERN.test(value)
    ? value
    : ''
}

function restoreStateFromUrl (): void {
  const parameters =
    new URLSearchParams(
      window.location.search
    )

  const restoredCountry =
    getSafeUrlValue(
      parameters,
      COUNTRY_URL_PARAMETER
    )

  const restoredRegion =
    restoredCountry === ''
      ? getSafeUrlValue(
        parameters,
        REGION_URL_PARAMETER
      )
      : ''

  selectedCountryCode.value =
    restoredCountry

  selectedRegionId.value =
    restoredRegion

  const otherFilters =
    filters.value.filter(
      ({ id }) =>
        id !== COUNTRY_FILTER_ID &&
        id !== REGION_FILTER_ID
    )

  if (restoredCountry !== '') {
    filters.value = [
      ...otherFilters,
      createGeographyFilter(
        COUNTRY_FILTER_ID,
        restoredCountry,
        buildCountryFieldQuery
      )
    ]

    return
  }

  if (restoredRegion !== '') {
    filters.value = [
      ...otherFilters,
      createGeographyFilter(
        REGION_FILTER_ID,
        restoredRegion,
        buildRegionFieldQuery
      )
    ]

    return
  }

  filters.value = otherFilters
}

function saveStateToUrl (): void {
  const url = new URL(
    window.location.href
  )

  const { searchParams } = url

  searchParams.delete(
    LEGACY_FILTERS_URL_PARAMETER
  )

  searchParams.delete(
    COUNTRY_URL_PARAMETER
  )

  searchParams.delete(
    REGION_URL_PARAMETER
  )

  if (selectedCountryCode.value !== '') {
    searchParams.set(
      COUNTRY_URL_PARAMETER,
      selectedCountryCode.value
    )
  } else if (selectedRegionId.value !== '') {
    searchParams.set(
      REGION_URL_PARAMETER,
      selectedRegionId.value
    )
  }

  const relativeUrl =
    `${url.pathname}${url.search}${url.hash}`

  window.history.replaceState(
    null,
    '',
    relativeUrl
  )
}

function handlePopState (): void {
  restoreStateFromUrl()
}

function getLocalisedValue (
  value: unknown,
  language: string
): string | null {
  if (typeof value === 'string') {
    return value
  }

  if (!isRecord(value)) {
    return null
  }

  const [normalisedLanguage = 'en'] =
    language.toLowerCase().split('-')

  const candidates = [
    normalisedLanguage,
    normalisedLanguage.toUpperCase(),
    'en',
    'EN'
  ]

  for (const candidate of candidates) {
    const {
      [candidate]: translatedValue
    } = value

    if (
      typeof translatedValue === 'string' &&
      translatedValue.trim() !== ''
    ) {
      return translatedValue
    }
  }

  const firstTranslation = Object.values(
    value
  ).find(
    item =>
      typeof item === 'string' &&
      item.trim() !== ''
  )

  return typeof firstTranslation === 'string'
    ? firstTranslation
    : null
}

function getSchemaTitle (
  value: unknown,
  key: string,
  language: string
): string {
  if (!isRecord(value)) {
    return key
  }

  const { schemas } = value

  if (!isRecord(schemas)) {
    return key
  }

  const {
    [key]: schemaDefinition
  } = schemas

  if (!isRecord(schemaDefinition)) {
    return key
  }

  const { title } = schemaDefinition

  return getLocalisedValue(
    title,
    language
  ) ?? key
}

const schemaOptions = computed(() =>
  Object.entries(schemaAliases).map(
    ([alias, key]) => ({
      recordType: alias,
      title: getSchemaTitle(
        realm,
        key,
        locale.value
      )
    })
  )
)

const schema = computed(() =>
  schemaAliases[selectedRecordType.value] ??
  selectedRecordType.value
)

const availableWidgets = computed(() =>
  widgets.filter(
    ({ recordTypes, scopes }) =>
      recordTypes.includes(schema.value) &&
      scopes.includes(scope.value)
  )
)

const availableWidgetCategories = computed(() => {
  const {
    value: availableWidgetValues
  } = availableWidgets

  return widgetCategories
    .map(category => ({
      ...category,
      widgets: availableWidgetValues.filter(
        ({ category: widgetCategory }) =>
          widgetCategory === category.id
      )
    }))
    .filter(
      ({ widgets: categoryWidgets }) =>
        categoryWidgets.length > 0
    )
})

function getCategoryTitle (
  id: string,
  title: string
): string {
  return te(id)
    ? t(id)
    : title
}

function onFilterChange (
  { id, filter }: ExploreFilterChange
): void {
  const remainingFilters =
    filters.value.filter(
      ({ id: existingId }) =>
        existingId !== id
    )

  filters.value = filter === null
    ? remainingFilters
    : [...remainingFilters, filter]
}

interface GeographyFilterConfig {
  translationKey: string
  getOptions: ()=> GeographyOption[]
}

const geographyFilterConfigs:
Record<string, GeographyFilterConfig> = {
  [COUNTRY_FILTER_ID]: {
    translationKey: 'countryFilter',
    getOptions: () => countryOptions.value
  },
  [REGION_FILTER_ID]: {
    translationKey: 'regionFilter',
    getOptions: () => allRegionOptions.value
  }
}

function getFilterLabel (
  filter: ExploreFilter
): string {
  const {
    [filter.id]: config
  } = geographyFilterConfigs

  if (config === undefined) {
    const { label } = filter

    return label
  }

  const { value } = filter
  const filterValue = String(value)

  const option = config.getOptions().find(
    ({ id }) => id === filterValue
  )

  return t(config.translationKey, {
    name: getGeographyOptionLabel(
      option,
      locale.value,
      filterValue
    )
  })
}

function clearFilter (
  filterId: string
): void {
  onFilterChange({
    id: filterId,
    filter: null
  })
}

interface GeographySelectionConfig {
  filterId: string
  otherFilterId: string
  otherSelection: Ref<string>
  buildFieldQuery: (value: string)=> string
}

function handleGeographyChange (
  selection: Ref<string>,
  config: GeographySelectionConfig
): void {
  const { value } = selection

  const {
    filterId,
    otherFilterId,
    otherSelection,
    buildFieldQuery
  } = config

  if (value === '') {
    clearFilter(filterId)

    return
  }

  otherSelection.value = ''
  clearFilter(otherFilterId)

  onFilterChange({
    id: filterId,
    filter: createGeographyFilter(
      filterId,
      value,
      buildFieldQuery
    )
  })
}

function onCountryChange (): void {
  handleGeographyChange(
    selectedCountryCode,
    {
      filterId: COUNTRY_FILTER_ID,
      otherFilterId: REGION_FILTER_ID,
      otherSelection: selectedRegionId,
      buildFieldQuery: buildCountryFieldQuery
    }
  )
}

function onRegionChange (): void {
  handleGeographyChange(
    selectedRegionId,
    {
      filterId: REGION_FILTER_ID,
      otherFilterId: COUNTRY_FILTER_ID,
      otherSelection: selectedCountryCode,
      buildFieldQuery: buildRegionFieldQuery
    }
  )
}

function removeFilter (
  filterId: string
): void {
  clearFilter(filterId)

  if (filterId === COUNTRY_FILTER_ID) {
    selectedCountryCode.value = ''
  }

  if (filterId === REGION_FILTER_ID) {
    selectedRegionId.value = ''
  }
}

async function loadGeographyOptions (): Promise<void> {
  geographyLoading.value = true
  geographyError.value = false

  try {
    const [
      countries,
      regions
    ] = await Promise.all([
      Promise.resolve(
        commonjs.getCountries()
      ),
      Promise.resolve(
        commonjs.getRegions()
      )
    ])

    countryOptions.value =
      getCountryOptions(countries)

    regionGroups.value =
      getRegionGroups(regions)
  } catch {
    countryOptions.value = []
    regionGroups.value = []
    geographyError.value = true
  } finally {
    geographyLoading.value = false
  }
}

function reloadWithSchema (): void {
  const path = route.path.replace(
    /\/[^/]+\/?$/,
    `/${selectedRecordType.value}`
  )

  const url = new URL(
    window.location.href
  )

  url.pathname = path

  window.location.assign(
    url.toString()
  )
}

restoreStateFromUrl()

watch(
  [
    selectedCountryCode,
    selectedRegionId
  ],
  saveStateToUrl
)

onMounted(async () => {
  window.addEventListener(
    'popstate',
    handlePopState
  )

  await loadGeographyOptions()
})

onBeforeUnmount(() => {
  window.removeEventListener(
    'popstate',
    handlePopState
  )
})
</script>

<style scoped>
.filter-remove-button {
  width: 0.65rem;
  height: 0.65rem;
  padding: 0;
  font-size: 0.65rem;
}

.widget-category:last-child {
  margin-bottom: 0 !important;
}

.select-clear-button {
  z-index: 3;
  font-size: 0.7rem;
}
</style>
