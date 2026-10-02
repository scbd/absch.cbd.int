import type { NrResponse } from '~/types/components/legal-framework-overview'

interface Option {
  value: string
  title: string
  type?: string
  caption?: string
  footnote?: string
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

// footnote renders as a muted example line above the explain box (nr-yes-no.html), set on
// both options so it shows regardless of which answer ("Yes"/"No") the explain box follows.
export function twoWayOptions (t: (key: string)=> string, footnote?: string): Option[] {
  return [
    { value: 'true', title: t('yes'), type: 'lstring', caption: t('pleaseExplainYourAnswer'), footnote },
    { value: 'false', title: t('no'), type: 'lstring', caption: t('pleaseExplainYourAnswer'), footnote }
  ]
}

// labels overrides the 'true'/'true.some' wording for questions whose doc text differs from the
// generic "Yes"/"Yes, to some extent" (e.g. establishedMeasure's "Yes, all measures are in place").
export function threeWayOptions (t: (key: string)=> string, labels?: { true?: string, trueSome?: string }, footnote?: string): Option[] {
  return [
    { value: 'true', title: labels?.true ?? t('yes'), type: 'lstring', caption: t('pleaseExplainYourAnswer'), footnote },
    { value: 'true.some', title: labels?.trueSome ?? t('yesSomeCases'), type: 'lstring', caption: t('pleaseExplainYourAnswer'), footnote },
    { value: 'false', title: t('no'), type: 'lstring', caption: t('pleaseExplainYourAnswer'), footnote }
  ]
}

export function yesExplainOnlyOptions (t: (key: string)=> string): Option[] {
  return [
    { value: 'true', title: t('yes'), type: 'lstring', caption: t('pleaseExplainYourAnswer') },
    { value: 'false', title: t('no'), type: 'lstring', caption: t('pleaseExplainYourAnswer') }
  ]
}
