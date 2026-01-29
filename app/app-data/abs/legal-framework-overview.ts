import type { LString, Translations, LanguageCode } from '~/types/languages'
import type { LegalFrameworkDocument } from '~/types/components/legal-framework-overview'
import type { ETerm, Header } from '~/types/common/documents'

export interface Validation {
  question: keyof LegalFrameworkDocument
  values: Array<string | ETerm | LString | Header | Partial<Record<LanguageCode, string>>>
  trigger: string
  type: string
}

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
  bold?: boolean
}

export interface Question extends AttributeMap<keyof LegalFrameworkDocument> {
  validations?: Validation[]
  questions?: Question[]
  enable?: boolean
  onChange?: ()=> Question | Legend
}

export type Legend = AttributeMap<string>

export function legalFrameworkOverviewQuestions (t: Translations): Array<Question | Legend> {
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
    { value: 'true', title: t('yesAllCases'), caption: t('pleaseExplain') },
    { value: 'true.some', title: t('yesSomeCases'), caption: t('pleaseExplain') },
    { value: 'false', title: t('noCountryDetermined'), caption: t('pleaseExplain') }
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
      title: t('agrSubjectToPic', { geneticResources: geneticResourcesBold }),
      validations: [
        {
          question: 'agrMeasureForAccess',
          values: [
            'true',
            'true.some'
          ],
          type: '@hasValues',
          trigger: 'enable'
        },
        {
          question: 'agrCommercialPermitRequired',
          values: [
            'true',
            'true.some'
          ],
          type: '@hasValues',
          trigger: 'enable'
        },
        {
          question: 'agrNonCommercialPermitRequired',
          values: [
            'true',
            'true.some'
          ],
          type: '@hasValues',
          trigger: 'enable'
        }
      ]
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
      questions: [
        {
          type: 'option',
          options: yesNoOptions,
          key: 'agrCommercialPermitException',
          title: t('anyExceptions')
        }
      ]
    },
    {
      type: 'option',
      options: yesNoOptions,
      key: 'agrNonCommercialPermitRequired',
      title: t('argPermitRequired', {
        type: `<u class="text-focus">${t('nonCommercial')}</u>`,
        geneticResources: geneticResourcesBold
      }),
      questions: [
        {
          type: 'option',
          options: yesNoOptions,
          key: 'agrNonCommercialPermitException',
          title: t('anyExceptions')
        }
      ]
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
      title: t('tkSubjectToPic', { traditionalKnowledge: traditionalKnowledgeBold }),
      validations: [
        {
          question: 'tkMeasureForAccess',
          values: [
            'true',
            'true.some'
          ],
          type: '@hasValues',
          trigger: 'enable'
        },
        {
          question: 'tkCommercialPermitRequired',
          values: [
            'true',
            'true.some'
          ],
          type: '@hasValues',
          trigger: 'enable'
        },
        {
          question: 'tkNonCommercialPermitRequired',
          values: [
            'true',
            'true.some'
          ],
          type: '@hasValues',
          trigger: 'enable'
        }
      ]
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
      questions: [
        {
          type: 'option',
          options: yesNoOptions,
          key: 'tkCommercialPermitException',
          title: t('anyExceptions')
        }
      ]
    },
    {
      type: 'option',
      options: yesNoOptions,
      key: 'tkNonCommercialPermitRequired',
      title: t('tkPermitRequired', {
        type: `<u class="text-focus">${t('nonCommercial')}</u>`,
        traditionalKnowledge: traditionalKnowledgeBold
      }),
      questions: [
        {
          type: 'option',
          options: yesNoOptions,
          key: 'tkNonCommercialPermitException',
          title: t('anyExceptions')
        }
      ]
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
