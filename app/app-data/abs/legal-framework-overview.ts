import type { Translations } from '~/types/languages'
import type { LegalFrameworkDocument } from '~/types/components/legal-framework-overview'

export interface Option {
  value: string
  title: string
  type?: string
  name?: string
  identifier?: string
  caption?: string
}

export interface AttributeMap<Key> {
  options?: Option[]
  key: Key
  section?: string
  type: string
  title: string
  multiple?: boolean
  subQuestion?: Question
  bold?: boolean
}

export type Question = AttributeMap<keyof LegalFrameworkDocument>
export type Legend = AttributeMap<string>

export function legalFrameworkOverviewAttributes (t: Translations): Array<Question | Legend> {
  const measureOptions = [
    { value: 'true', title: t('yesAllMeasures'), type: 'lstring', caption: t('pleaseExplain') },
    { value: 'true.some', title: t('yesToSomeExtent'), type: 'lstring', caption: t('pleaseExplain') },
    { value: 'false', title: t('no'), type: 'lstring', caption: t('pleaseExplain') }
  ]

  const yesNoOptions = [
    { value: 'true', title: t('yes'), type: 'lstring', caption: t('pleaseExplain') },
    { value: 'false', title: t('no'), type: 'lstring', caption: t('pleaseExplain') }
  ]

  const casesOptions = [
    { value: 'true', title: t('yesAllCases'), type: 'lstring', caption: t('pleaseExplain') },
    { value: 'true.some', title: t('yesSomeCases'), type: 'lstring', caption: t('pleaseExplain') },
    { value: 'false', title: t('noCountryDetermined'), type: 'lstring', caption: t('pleaseExplain') }
  ]

  const geneticResourcesBold = `<span class="text-focus">${t('geneticResources')}</span>`
  const traditionalKnowledgeBold = `<span class="text-focus">${t('traditionalKnowledge')}</span>`

  return [
    // General Information
    {
      type: 'option',
      options: measureOptions,
      key: 'establishedMeasure',
      title: t('establishedMeasure', { establishedMeasuresInclude: `<br/><span class="text-focus">${t('establishedMeasuresInclude')}</span>` })
    },
    // Access to genetic resources
    {
      key: 'geneticResources',
      section: 'GeneticResources',
      type: 'legend',
      title: t('geneticResourcesAccess', { geneticResources: t('geneticResources') })
    },
    {
      type: 'option',
      options: casesOptions,
      key: 'agrSubjectToPic',
      title: t('agrSubjectToPic', { geneticResources: geneticResourcesBold })
    },
    {
      type: 'option',
      options: measureOptions,
      key: 'agrMeasureForAccess',
      title: t('agrMeasureForAccess', { geneticResources: geneticResourcesBold })
    },
    {
      type: 'option',
      options: yesNoOptions,
      key: 'agrCommercialPermitRequired',
      title: t('argPermitRequired', {
        type: `<u class="text-focus">${t('commercial')}</u>`,
        geneticResources: geneticResourcesBold
      }),
      subQuestion: {
        type: 'option',
        options: yesNoOptions,
        key: 'agrCommercialPermitException',
        title: t('anyExceptions')
      }
    },
    {
      type: 'option',
      options: yesNoOptions,
      key: 'agrNonCommercialPermitRequired',
      title: t('argPermitRequired', {
        type: `<u class="text-focus">${t('nonCommercial')}</u>`,
        geneticResources: geneticResourcesBold
      }),
      subQuestion: {
        type: 'option',
        options: yesNoOptions,
        key: 'agrNonCommercialPermitException',
        title: t('anyExceptions')
      }
    },
    // Access to traditional knowledge associated with genetic resources
    {
      key: 'knowledgeAccess',
      section: 'knowledgeAccess',
      type: 'legend',
      title: t('knowledgeAccess')
    },
    {
      type: 'option',
      options: casesOptions,
      key: 'tkSubjectToPic',
      title: t('tkSubjectToPic', { traditionalKnowledge: traditionalKnowledgeBold })
    },
    {
      type: 'option',
      options: measureOptions,
      key: 'tkMeasureForAccess',
      title: t('tkMeasureForAccess', { traditionalKnowledge: traditionalKnowledgeBold })
    },
    {
      type: 'option',
      options: yesNoOptions,
      key: 'tkCommercialPermitRequired',
      title: t('tkPermitRequired', {
        type: `<u class="text-focus">${t('commercial')}</u>`,
        traditionalKnowledge: traditionalKnowledgeBold
      }),
      subQuestion: {
        type: 'option',
        options: yesNoOptions,
        key: 'tkCommercialPermitException',
        title: t('anyExceptions')
      }
    },
    {
      type: 'option',
      options: yesNoOptions,
      key: 'tkNonCommercialPermitRequired',
      title: t('tkPermitRequired', {
        type: `<u class="text-focus">${t('nonCommercial')}</u>`,
        traditionalKnowledge: traditionalKnowledgeBold
      }),
      subQuestion: {
        type: 'option',
        options: yesNoOptions,
        key: 'tkNonCommercialPermitException',
        title: t('anyExceptions')
      }
    },
    {
      key: 'benefitSharing',
      section: 'benefitSharing',
      type: 'legend',
      title: t('benefitSharing')
    },
    {
      key: 'Article5_3',
      section: 'Article_5_3',
      type: 'legend',
      title: `<a href='https://www.cbd.int/abs/text/articles/?sec=abs-05' target='_blank'>${t('article5_3')}</a>`
    },
    {
      type: 'option',
      options: measureOptions,
      key: 'article53Implemented',
      title: t('article53Implemented'),
      bold: true
    },
    {
      key: 'Article5_5',
      section: 'Article_5_5',
      type: 'legend',
      title: `<a href='https://www.cbd.int/abs/text/articles/?sec=abs-05' target='_blank'>${t('article5_5')}</a>`
    },
    {
      type: 'option',
      options: measureOptions,
      key: 'article55Implemented',
      title: t('article55Implemented'),
      bold: true
    }
  ]
}
