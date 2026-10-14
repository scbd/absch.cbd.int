export type ExploreFilterValue =
  | string
  | number
  | boolean

export interface ExploreFilter {
  id: string
  label: string
  fieldQuery: string
  value: ExploreFilterValue
  excluded?: boolean
}

export interface ExploreFilterChange {
  id: string
  filter: ExploreFilter | null
}

const FILTER_ID_PATTERN =
  /^[\w.-]+$/

const MAX_FILTER_LABEL_LENGTH = 200
const MAX_FILTER_QUERY_LENGTH = 500
const MAX_FILTER_VALUE_LENGTH = 200
const MAX_SERIALIZED_FILTERS_LENGTH = 30000

const FILTER_QUERY_PATTERN =
  /^(?:[\w.:"*?()\\+-]|\[|\]|[\u0080-\uFFFF]| ){1,500}$/

const FILTER_QUERY_FIELD_PATTERN =
  /(?:^|[\s(])(?<field>[A-Za-z_][\w]*):/g

const FILTER_QUERY_FIELDS: Record<string, Set<string>> = {
  'dashboard-country': new Set(['government_s']),
  'dashboard-region': new Set(['countryRegions_REL_ss']),
  'internal-external-cpc': new Set([
    'government_s',
    'picGrantedCountryTypes_ss',
    'sourceCountries_ss'
  ]),
  'ircc-availability-cpc': new Set(['absIRCCs_ss']),
  'ircc-status': new Set(['dateOfExpiry_dt']),
  'pic-granted-country-type': new Set(['picGrantedCountryType_s']),
  'publication-period': new Set(['updatedDate_dt']),
  'publication-year': new Set(['updatedDate_dt']),
  'publishing-country': new Set(['government_s']),
  'publishing-region': new Set(['countryRegions_REL_ss']),
  'record-subjectmatter': new Set(['keywords_REL_ss']),
  'source-country': new Set(['sourceCountries_ss']),
  'usage-type': new Set([
    'usagesConfidential_b',
    'usages_EN_ss'
  ]),
  'user-country': new Set([
    'entitiesToWhomPICGrantedCountries_EN_ss'
  ]),
  'user-region': new Set([
    'entitiesToWhomPICGrantedCountries_REL_ss'
  ])
}

function isExploreFilterId (
  id: unknown
): id is string {
  return typeof id === 'string' &&
    FILTER_ID_PATTERN.test(id) &&
    Object.prototype.hasOwnProperty.call(
      FILTER_QUERY_FIELDS,
      id
    )
}

function isExploreFilterValue (
  value: unknown
): value is ExploreFilterValue {
  if (typeof value === 'string') {
    return value.length <= MAX_FILTER_VALUE_LENGTH
  }

  if (typeof value === 'number') {
    return Number.isFinite(value)
  }

  return typeof value === 'boolean'
}

function isRecord (
  value: unknown
): value is Record<string, unknown> {
  return typeof value === 'object' &&
    value !== null
}

function isSafeFilterQuery (
  filterId: string,
  fieldQuery: string
): boolean {
  if (
    fieldQuery.length > MAX_FILTER_QUERY_LENGTH ||
    !FILTER_QUERY_PATTERN.test(fieldQuery)
  ) {
    return false
  }

  const {
    [filterId]: allowedFields
  } = FILTER_QUERY_FIELDS
  if (allowedFields === undefined) {
    return false
  }

  const fields = Array.from(
    fieldQuery.matchAll(FILTER_QUERY_FIELD_PATTERN),
    ({ groups }) => groups?.['field']
  )

  return fields.length > 0 &&
    fields.every(
      field =>
        field !== undefined &&
        allowedFields.has(field)
    )
}

function isExcludedValue (
  value: unknown
): value is boolean | undefined {
  return value === undefined ||
    typeof value === 'boolean'
}

function isExploreFilter (
  value: unknown
): value is ExploreFilter {
  if (!isRecord(value)) {
    return false
  }

  const {
    id,
    label,
    fieldQuery,
    value: filterValue,
    excluded
  } = value

  return isExploreFilterId(id) &&
    typeof label === 'string' &&
    label.length <= MAX_FILTER_LABEL_LENGTH &&
    typeof fieldQuery === 'string' &&
    isSafeFilterQuery(id, fieldQuery) &&
    isExploreFilterValue(filterValue) &&
    isExcludedValue(excluded)
}

export function parseExploreFilters (
  serializedFilters: string | null
): ExploreFilter[] {
  if (
    serializedFilters === null ||
    serializedFilters.length > MAX_SERIALIZED_FILTERS_LENGTH
  ) {
    return []
  }

  const parsedFilters =
    parseSerializedValue(serializedFilters)

  if (!Array.isArray(parsedFilters)) {
    return []
  }

  const uniqueFilters = new Map<string, ExploreFilter>()

  for (const filter of parsedFilters) {
    if (
      isExploreFilter(filter) &&
      !uniqueFilters.has(filter.id)
    ) {
      uniqueFilters.set(filter.id, filter)
    }
  }

  return [...uniqueFilters.values()]
}

function parseSerializedValue (
  serializedValue: string
): unknown {
  try {
    return JSON.parse(serializedValue)
  } catch {
    return null
  }
}

export function buildExploreFieldQueries (
  filters: readonly ExploreFilter[],
  excludedFilterIds: readonly string[] = []
): string[] {
  return filters
    .filter(({ id, excluded }) =>
      excluded === true ||
      !excludedFilterIds.includes(id)
    )
    .map(({ fieldQuery, excluded }) =>
      excluded === true
        ? `-(${fieldQuery})`
        : fieldQuery
    )
}

export function buildExploreSearchQuery (
  filters: readonly ExploreFilter[]
): string {
  return filters
    .map(({ fieldQuery, excluded }) =>
      excluded === true
        ? `(*:* NOT (${fieldQuery}))`
        : `(${fieldQuery})`
    )
    .join(' AND ')
}

export function buildCpcsReceivedSearchQuery (
  filters: readonly ExploreFilter[],
  countryCode: string
): string {
  const searchFilters = filters.filter(
    ({ id, excluded }) =>
      id !== 'dashboard-country' ||
      excluded === true
  )

  const filterQuery =
    buildExploreSearchQuery(searchFilters)
  const sourceCountryQuery =
    `(sourceCountries_ss:${countryCode.toLowerCase()})`

  return filterQuery === ''
    ? sourceCountryQuery
    : `${filterQuery} AND ${sourceCountryQuery}`
}

export function buildCpcTypeQuery (
  type: 'internal' | 'external',
  country?: string,
  publisherSourcePivot?: unknown
): string {
  if (country !== undefined) {
    const sourceCountryQuery =
      `sourceCountries_ss:${country.toLowerCase()}`

    return type === 'internal'
      ? sourceCountryQuery
      : `-${sourceCountryQuery}`
  }

  const internalQuery =
    buildCpcInternalQueryFromPivot(
      publisherSourcePivot
    )

  if (type === 'internal') {
    return internalQuery
  }

  return `-(${internalQuery})`
}

function buildCpcInternalQueryFromPivot (
  pivot: unknown
): string {
  if (!Array.isArray(pivot)) {
    return '(*:* AND -(*:*))'
  }

  const clauses = pivot.flatMap(
    (publisher: unknown) => {
      if (!isRecord(publisher)) {
        return []
      }

      const {
        value: publisherCode,
        pivot: sourceCountries
      } = publisher

      if (
        typeof publisherCode !== 'string' ||
        !Array.isArray(sourceCountries)
      ) {
        return []
      }

      const hasMatchingSource = sourceCountries.some(
        (source: unknown) =>
          isRecord(source) &&
          typeof source['value'] === 'string' &&
          source['value'].toLowerCase() ===
            publisherCode.toLowerCase()
      )

      if (!hasMatchingSource) {
        return []
      }

      const countryCode = publisherCode.toLowerCase()
      return [
        `(government_s:${countryCode} AND ` +
        `sourceCountries_ss:${countryCode})`
      ]
    }
  )

  if (clauses.length === 0) {
    return '(*:* AND -(*:*))'
  }

  return `(${clauses.join(' OR ')})`
}

export function getCpcInternalCountFromPivot (
  pivot: unknown
): number {
  if (!Array.isArray(pivot)) {
    return 0
  }

  return pivot.reduce<number>(
    (total, publisher) => {
      if (!isRecord(publisher)) {
        return total
      }

      const {
        value: publisherCode,
        pivot: sourceCountries
      } = publisher

      if (
        typeof publisherCode !== 'string' ||
        !Array.isArray(sourceCountries)
      ) {
        return total
      }

      const internalSource: unknown =
        sourceCountries.find(
          (source: unknown) =>
            isRecord(source) &&
          typeof source['value'] === 'string' &&
          source['value'].toLowerCase() ===
            publisherCode.toLowerCase()
        )

      if (
        !isRecord(internalSource) ||
        typeof internalSource['count'] !== 'number'
      ) {
        return total
      }

      return total + internalSource['count']
    },
    0
  )
}

export function getCpcTypeCountry (
  country: string | undefined,
  filters: readonly ExploreFilter[]
): string | undefined {
  if (country !== undefined && country !== '') {
    return country.toLowerCase()
  }

  const countryFilter = filters.find(
    ({ id, excluded }) =>
      (
        id === 'dashboard-country' ||
        id === 'publishing-country'
      ) &&
      excluded !== true
  )

  return typeof countryFilter?.value === 'string'
    ? countryFilter.value.toLowerCase()
    : undefined
}
