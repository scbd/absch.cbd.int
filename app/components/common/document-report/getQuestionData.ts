import type { QuestionMap, DocumentData, DocumentValue } from '~/types/common/document-report'

export function getQuestionValues (reportData: DocumentData, questionMap: QuestionMap): DocumentValue[] {
  const { key: questionKey } = questionMap
  const { [questionKey]: questionValueData } = reportData

  const defaultDocumentValue = {
    value: '',
    title: '',
    type: '',
    caption: ''
  }

  if (questionMap.type === 'option') {
    if (Array.isArray(questionValueData)) {
      return questionValueData as DocumentValue[]
    }

    const selectedDocumentValues = (questionMap.options ?? [])
      .filter((option: DocumentValue) => {
        const { value } = option
        const optionValue = typeof value === 'string' ? value : ''

        return questionValueData?.value === optionValue
      })
      .map((mapDocumentValue) => Object.assign(mapDocumentValue, questionValueData))

    return selectedDocumentValues
  }

  return [Object.assign(defaultDocumentValue, questionValueData)]
}
