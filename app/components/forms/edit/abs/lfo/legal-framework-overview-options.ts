import type { NrResponse } from '~/types/components/legal-framework-overview'

interface Option {
  value: string
  title: string
  type?: string
}

export function isYes (response?: NrResponse): boolean {
  return response?.value === 'true'
}

export function isYesOrSome (response?: NrResponse): boolean {
  return response?.value === 'true' || response?.value === 'true.some'
}

export function isAnswered (response?: NrResponse): boolean {
  return response?.value !== undefined
}

export function twoWayOptions (t: (key: string)=> string): Option[] {
  return [
    { value: 'true', title: t('yes'), type: 'lstring' },
    { value: 'false', title: t('no'), type: 'lstring' }
  ]
}

// labels overrides the 'true'/'true.some' wording for questions whose doc text differs from the
// generic "Yes"/"Yes, to some extent" (e.g. establishedMeasure's "Yes, all measures are in place").
export function threeWayOptions (t: (key: string)=> string, labels?: { true?: string, trueSome?: string }): Option[] {
  return [
    { value: 'true', title: labels?.true ?? t('yes'), type: 'lstring' },
    { value: 'true.some', title: labels?.trueSome ?? t('yesSomeCases'), type: 'lstring' },
    { value: 'false', title: t('no'), type: 'lstring' }
  ]
}

export function fourWayOptions (t: (key: string)=> string, labels?: { true?: string, trueSome?: string }): Option[] {
  return [
    { value: 'true', title: labels?.true ?? t('yes'), type: 'lstring' },
    { value: 'true.some', title: labels?.trueSome ?? t('yesSomeCases'), type: 'lstring' },
    { value: 'false', title: t('no'), type: 'lstring' },
    { value: 'na', title: t('notApplicable'), type: 'lstring' }
  ]
}

export function yesExplainOnlyOptions (t: (key: string)=> string): Option[] {
  return [
    { value: 'true', title: t('yes'), type: 'lstring' },
    { value: 'false', title: t('no'), type: 'lstring' }
  ]
}
