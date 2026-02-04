import type { Translations } from '~/types/languages'
import type { DocQuestion, Legend } from '~/types/common/document-report'

export function legalFrameworkOverviewQuestions (t: Translations): Array<DocQuestion | Legend> {
  const measureOptions = [
    { value: 'true', title: t('yesAllMeasures'), type: 'lstring', caption: t('pleaseExplain') },
    { value: 'true.some', title: t('yesToSomeExtent'), type: 'lstring', caption: t('pleaseExplain') },
    { value: 'false', title: t('no'), type: 'lstring', caption: t('pleaseExplain') }
  ]

  const yesNoOptionsOptionalAddInfo = [
    { value: 'true', title: t('yes'), type: 'lstring', caption: t('pleaseExplain') },
    { value: 'false', title: t('no'), caption: t('pleaseExplain') }
  ]

  const yesNoOptions = [
    { value: 'true', title: t('yes'), type: 'lstring', caption: t('pleaseExplain') },
    { value: 'false', title: t('no'), type: 'lstring', caption: t('pleaseExplain') }
  ]

  const casesOptions = [
    { value: 'true', title: t('yesAllCases'), caption: t('pleaseExplain') },
    { value: 'true.some', title: t('yesSomeCases'), caption: t('pleaseExplain') },
    { value: 'false', title: t('no'), caption: t('pleaseExplain') }
  ]

  const casesOptionsPIC = [
    { value: 'true', title: t('yesAllCases'), caption: t('pleaseExplain') },
    { value: 'true.some', title: t('yesSomeCases'), caption: t('pleaseExplain') },
    { value: 'false', title: t('noCountryDetermined'), caption: t('pleaseExplain') }
  ]
  const caseOptionsAddInfo = casesOptions.map(option => Object.assign({}, option, { type: 'lstring' }))

  const someExtent = [
    { value: 'true', title: t('yes'), type: 'lstring', caption: t('pleaseExplain') },
    { value: 'true.some', title: t('yesToSomeExtent'), type: 'lstring', caption: t('pleaseExplain') },
    { value: 'false', title: t('no'), type: 'lstring', caption: t('pleaseExplain') }
  ]

  const someExtentNa = [...someExtent, { value: 'na', title: t('notApplicable'), type: 'lstring', caption: t('pleaseExplain') }]

  const geneticResourcesBold = `<span class="text-focus">${t('geneticResources')}</span>`
  const traditionalKnowledgeBold = `<span class="text-focus">${t('traditionalKnowledge')}</span>`

  return [
    // General Information
    {
      type: 'option',
      number: '4',
      options: measureOptions,
      mandatory: false,
      key: 'establishedMeasure',
      title: t('establishedMeasure', { establishedMeasuresInclude: `<br/><span class="help-info">${t('establishedMeasuresInclude')}</span>` })
    },
    // Access to genetic resources
    {
      key: 'geneticResources',
      section: 'GeneticResources',
      type: 'legend',
      title: t('geneticResourcesAccess', { geneticResources: t('geneticResources') }),
      questions: [
        {
          type: 'option',
          number: '5',
          options: casesOptionsPIC,
          mandatory: true,
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
              question: 'agrCommercialPermitException',
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
            },
            {
              question: 'agrNonCommercialPermitException',
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
          number: '6',
          mandatory: false,
          options: measureOptions,
          key: 'agrMeasureForAccess',
          title: t('agrMeasureForAccess', { geneticResources: geneticResourcesBold })
        },
        {
          type: 'option',
          number: '7',
          mandatory: false,
          options: yesNoOptions,
          key: 'agrCommercialPermitRequired',
          title: t('argPermitRequired', {
            type: `<u class="text-focus">${t('commercial')}</u>`,
            geneticResources: geneticResourcesBold
          }),
          questions: [
            {
              type: 'option',
              number: '7.1',
              mandatory: false,
              options: yesNoOptionsOptionalAddInfo,
              key: 'agrCommercialPermitException',
              title: t('anyExceptions')
            }
          ]
        },
        {
          type: 'option',
          number: '8',
          mandatory: false,
          options: yesNoOptions,
          key: 'agrNonCommercialPermitRequired',
          title: t('argPermitRequired', {
            type: `<u class="text-focus">${t('nonCommercial')}</u>`,
            geneticResources: geneticResourcesBold
          }),
          questions: [
            {
              type: 'option',
              number: '8.1',
              mandatory: false,
              options: yesNoOptionsOptionalAddInfo,
              key: 'agrNonCommercialPermitException',
              title: t('anyExceptions')
            }
          ]
        }
      ]
    },
    // Special considerations
    {
      key: 'specialConsiderations',
      section: 'specialConsiderations',
      type: 'legend',
      title: t('specialConsiderations'),
      questions: [
        {
          type: 'option',
          number: '9',
          mandatory: false,
          options: someExtentNa,
          placeholder: t('developmentNonCommercialExplain'),
          key: 'developmentAndImplementationNonCommercial',
          title: t('developmentAndImplementationNonCommercial')
        },
        {
          type: 'option',
          number: '10',
          mandatory: false,
          options: caseOptionsAddInfo,
          key: 'developmentAndImplementationHealth',
          placeholder: t('developmentNonCommercialExplain'),
          title: t('developmentAndImplementationHealth'),
          subQuestionsEnabled: false,
          questions: [
            {
              type: 'option',
              number: '10.1',
              mandatory: false,
              options: yesNoOptions,
              key: 'developmentAndImplementationTreatment',
              title: t('developmentAndImplementationTreatment')
            }
          ],
          validations: [
            {
              question: 'developmentAndImplementationHealth',
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
          number: '11',
          mandatory: false,
          options: caseOptionsAddInfo,
          placeholder: t('developmentNonCommercialExplain'),
          key: 'developmentAndImplementationFoodSecurity',
          title: t('developmentAndImplementationFoodSecurity')
        }
      ]
    },
    // Access to traditional knowledge associated with genetic resources
    {
      key: 'knowledgeAccess',
      section: 'knowledgeAccess',
      type: 'legend',
      title: t('knowledgeAccess'),
      questions: [
        {
          type: 'option',
          number: '12',
          mandatory: false,
          options: yesNoOptions,
          key: 'indigenousPeoples',
          title: t('indigenousPeoples'),
          validations: [
            {
              question: 'traditionalKnowledgeMeasuresTaken',
              values: [
                'true'
              ],
              type: '@hasValues',
              trigger: 'enable'
            },
            {
              question: 'tkCommercialPermitRequired',
              values: [
                'true'
              ],
              type: '@hasValues',
              trigger: 'enable'
            },
            {
              question: 'tkNonCommercialPermitRequired',
              values: [
                'true'
              ],
              type: '@hasValues',
              trigger: 'enable'
            }
          ]
        },
        {
          type: 'option',
          number: '13',
          mandatory: false,
          options: caseOptionsAddInfo,
          key: 'traditionalKnowledgeMeasuresTaken',
          title: t('traditionalKnowledgeMeasuresTaken')
        },
        {
          type: 'option',
          number: '14',
          mandatory: false,
          options: yesNoOptions,
          key: 'tkCommercialPermitRequired',
          title: t('tkPermitRequired', {
            type: `<u class="text-focus">${t('commercial')}</u>`,
            traditionalKnowledge: traditionalKnowledgeBold
          }),
          questions: [
            {
              type: 'option',
              number: '14.1',
              mandatory: false,
              options: yesNoOptionsOptionalAddInfo,
              key: 'tkCommercialPermitException',
              title: t('anyExceptions')
            }
          ]
        },
        {
          type: 'option',
          number: '15',
          mandatory: false,
          options: yesNoOptions,
          key: 'tkNonCommercialPermitRequired',
          title: t('tkPermitRequired', {
            type: `<u class="text-focus">${t('nonCommercial')}</u>`,
            traditionalKnowledge: traditionalKnowledgeBold
          }),
          questions: [
            {
              type: 'option',
              number: '15.1',
              mandatory: false,
              options: yesNoOptionsOptionalAddInfo,
              key: 'tkNonCommercialPermitException',
              title: t('anyExceptions')
            }
          ]
        },
        {
          type: 'option',
          number: '16',
          mandatory: false,
          options: someExtent,
          placeholder: t('indigenousPeoplesRightsExplain'),
          key: 'indigenousPeoplesRights',
          title: t('indigenousPeoplesRights'),
          validations: [
            {
              question: 'ipclsInformedConsent',
              values: [
                'true',
                'true.some'
              ],
              type: '@hasValues',
              trigger: 'enable'
            },
            {
              question: 'ipclsCommercialAccess',
              values: [
                'true',
                'true.some'
              ],
              type: '@hasValues',
              trigger: 'enable'
            },
            {
              question: 'ipclsNonCommercialAccess',
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
          number: '17',
          mandatory: false,
          options: someExtent,
          key: 'ipclsInformedConsent',
          title: t('ipclsInformedConsent')
        },
        {
          type: 'option',
          number: '18',
          mandatory: false,
          options: yesNoOptions,
          key: 'ipclsCommercialAccess',
          title: t('argPermitRequired', {
            type: `<u class="text-focus">${t('commercial')}</u>`,
            geneticResources: `<span class="text-focus">${t('ipclsAccess')}</span>`
          }),
          questions: [
            {
              type: 'option',
              number: '18.1',
              mandatory: false,
              options: yesNoOptionsOptionalAddInfo,
              key: 'ipclsCommercialAccessException',
              title: t('anyExceptions')
            }
          ]
        },
        {
          type: 'option',
          number: '19',
          mandatory: false,
          options: yesNoOptions,
          key: 'ipclsNonCommercialAccess',
          title: t('argPermitRequired', {
            type: `<u class="text-focus">${t('nonCommercial')}</u>`,
            geneticResources: `<span class="text-focus">${t('ipclsAccess')}</span>`
          }),
          questions: [
            {
              type: 'option',
              number: '19.1',
              mandatory: false,
              options: yesNoOptionsOptionalAddInfo,
              key: 'ipclsNonCommercialAccessException',
              title: t('anyExceptions')
            }
          ]
        }
      ]
    },
    {
      key: 'measuresOnCompliance',
      section: 'measuresOnCompliance',
      type: 'legend',
      title: t('measuresOnCompliance'),
      questions: [
        {
          key: 'Article_15',
          section: 'Article_15',
          type: 'legend',
          linkHref: 'https://www.cbd.int/abs/text/articles/?sec=abs-15',
          title: t('article15'),
          questions: [
            {
              type: 'option',
              number: '20',
              mandatory: false,
              options: measureOptions,
              key: 'measuresProvidedOtherParties',
              title: t('measuresProvidedOtherParties'),
              bold: true
            }
          ]
        },
        {
          key: 'Article_16',
          section: 'Article_16',
          type: 'legend',
          linkHref: 'https://www.cbd.int/abs/text/articles/?sec=abs-16',
          title: t('article16'),
          questions: [
            {
              type: 'option',
              number: '21',
              mandatory: false,
              options: measureOptions,
              key: 'measuresProvidedOtherIpcls',
              title: t('measuresProvidedOtherIpcls'),
              bold: true
            }
          ]
        },
        {
          key: 'Article_17',
          section: 'Article_17',
          type: 'legend',
          linkHref: 'https://www.cbd.int/abs/text/articles/?sec=abs-17',
          title: t('article17'),
          questions: [
            {
              type: 'option',
              number: '22',
              mandatory: false,
              options: caseOptionsAddInfo,
              key: 'article17InformationRequired',
              title: t('article17InformationRequired'),
              bold: true
            }
          ]
        }
      ]
    }
  ]
  return questionsMap
}
