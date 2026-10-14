export interface GeographyOption {
  id: string
  names: Record<string, string>
}

export interface RegionOption
  extends GeographyOption {
  depth: number
}

export interface RegionGroup {
  id: string
  names: Record<string, string>
  options: RegionOption[]
}

const LANGUAGE_CODES = [
  'ar',
  'en',
  'es',
  'fr',
  'ru',
  'zh'
] as const

function isRecord (
  value: unknown
): value is Record<string, unknown> {
  return typeof value === 'object' &&
    value !== null
}

function normaliseLocale (
  value: string
): string {
  const [language = 'en'] =
    value.toLowerCase().split('-')

  return language
}

function getString (
  record: Record<string, unknown>,
  keys: readonly string[]
): string | null {
  for (const key of keys) {
    const { [key]: candidate } = record

    if (typeof candidate !== 'string') {
      continue
    }

    const value = candidate.trim()

    if (value !== '') {
      return value
    }
  }

  return null
}
function getOptionId (
  value: Record<string, unknown>
): string | null {
  return getString(value, [
    'identifier',
    'code',
    'symbol',
    'id',
    'value',
    'key'
  ])
}

function getContainerNames (
  value: unknown
): Record<string, string> {
  const names: Record<string, string> = {}

  if (typeof value === 'string') {
    const name = value.trim()

    if (name === '') {
      return names
    }

    LANGUAGE_CODES.forEach(language => {
      names[language] = name
    })

    return names
  }

  if (!isRecord(value)) {
    return names
  }

  LANGUAGE_CODES.forEach(language => {
    const upperLanguage = language.toUpperCase()

    const name = getString(value, [
      language,
      upperLanguage
    ])

    if (name !== null) {
      names[language] = name
    }
  })

  return names
}

function mergeNames (
  target: Record<string, string>,
  source: Record<string, string>
): Record<string, string> {
  const names = { ...target }

  LANGUAGE_CODES.forEach(language => {
    const { [language]: existingName } = names
    const { [language]: sourceName } = source

    if (
      existingName === undefined &&
      sourceName !== undefined
    ) {
      names[language] = sourceName
    }
  })

  return names
}

function getOptionNames (
  value: Record<string, unknown>
): Record<string, string> {
  const {
    name,
    names,
    title,
    titles,
    label,
    labels
  } = value

  const containers = [
    name,
    names,
    title,
    titles,
    label,
    labels
  ]

  let optionNames: Record<string, string> = {}

  containers.forEach(container => {
    optionNames = mergeNames(
      optionNames,
      getContainerNames(container)
    )
  })

  LANGUAGE_CODES.forEach(language => {
    const upperLanguage = language.toUpperCase()

    const translatedName = getString(value, [
      `name_${language}`,
      `name_${upperLanguage}`,
      `title_${language}`,
      `title_${upperLanguage}`,
      `label_${language}`,
      `label_${upperLanguage}`,
      language,
      upperLanguage
    ])

    if (translatedName !== null) {
      optionNames[language] = translatedName
    }
  })

  return optionNames
}

function createOption (
  value: unknown
): GeographyOption | null {
  if (!isRecord(value)) {
    return null
  }

  const id = getOptionId(value)

  if (id === null) {
    return null
  }

  const names = getOptionNames(value)

  if (Object.keys(names).length === 0) {
    return null
  }

  return {
    id,
    names
  }
}

export function getGeographyOptionLabel (
  option: GeographyOption | undefined,
  locale: string,
  fallback = ''
): string {
  if (option === undefined) {
    return fallback
  }

  const language = normaliseLocale(locale)
  const { names } = option
  const { [language]: translatedName } = names

  if (translatedName !== undefined) {
    return translatedName
  }

  const { en: englishName } = names

  if (englishName !== undefined) {
    return englishName
  }

  const [firstAvailableName] =
    Object.values(option.names)

  return firstAvailableName ?? fallback
}

export function getRegionOptionLabel (
  option: RegionOption,
  locale: string
): string {
  const name = getGeographyOptionLabel(
    option,
    locale,
    option.id
  )

  if (option.depth === 0) {
    return name
  }

  const prefix = '— '.repeat(option.depth)

  return `${prefix}${name}`
}

export function getCountryOptions (
  values: unknown
): GeographyOption[] {
  if (!Array.isArray(values)) {
    return []
  }

  const optionMap =
    new Map<string, GeographyOption>()

  values.forEach(value => {
    const option = createOption(value)

    if (option === null) {
      return
    }

    const countryOption = {
      ...option,
      id: option.id.toLowerCase()
    }

    if (!optionMap.has(countryOption.id)) {
      optionMap.set(
        countryOption.id,
        countryOption
      )
    }
  })

  return Array.from(optionMap.values())
}

function getDescendantOptions (
  values: unknown,
  regionIds: Set<string>,
  depth: number
): RegionOption[] {
  if (!Array.isArray(values)) {
    return []
  }

  const options: RegionOption[] = []

  values.forEach(value => {
    if (!isRecord(value)) {
      return
    }

    const option = createOption(value)

    if (
      option !== null &&
      !regionIds.has(option.id)
    ) {
      regionIds.add(option.id)

      options.push({
        ...option,
        depth
      })
    }

    const { narrowerTerms } = value

    options.push(
      ...getDescendantOptions(
        narrowerTerms,
        regionIds,
        depth + 1
      )
    )
  })

  return options
}

export function getRegionGroups (
  values: unknown
): RegionGroup[] {
  if (!Array.isArray(values)) {
    return []
  }

  const regionIds = new Set<string>()
  const groups: RegionGroup[] = []

  values.forEach(value => {
    if (!isRecord(value)) {
      return
    }

    const parent = createOption(value)

    if (parent === null) {
      return
    }

    const options: RegionOption[] = []

    if (!regionIds.has(parent.id)) {
      regionIds.add(parent.id)

      options.push({
        ...parent,
        depth: 0
      })
    }

    const { narrowerTerms } = value

    options.push(
      ...getDescendantOptions(
        narrowerTerms,
        regionIds,
        1
      )
    )

    if (options.length === 0) {
      return
    }

    groups.push({
      id: parent.id,
      names: parent.names,
      options
    })
  })

  return groups
}
