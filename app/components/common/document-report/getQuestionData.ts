import type { QuestionMap, DocumentData, DocumentValue } from '~/types/common/document-report'
import type { QuestionData } from '~/types/common/documents'
import type { LString } from '~/types/languages'

/**
 * Parse question values fetched from the server into the
 * consistently typed DocumentValue[] type used to render a list of document questions.
 */
export function getQuestionValues (reportData: DocumentData, questionMap: QuestionMap): DocumentValue[] {
  const { key: questionKey } = questionMap
  const { [questionKey]: questionValueData } = reportData

  const defaultDocumentValue: DocumentValue = {
    value: '',
    title: '',
    type: '',
    caption: ''
  }

  if (questionMap.type === 'option') {
    // Remap the chosen option to the options title if there is one
    const mapSelectedValues = (value: QuestionData[]): DocumentValue[] => value.map((data: QuestionData) => {
      if (typeof data.title === 'string') {
        const val = Object.assign({}, questionValueData, data, { value: data.title }) // include questionValueData to ensure we parse details or additionalInformation information
        return parseToValue(val, defaultDocumentValue)
      }

      return parseToValue(data, defaultDocumentValue)
    })

    if (Array.isArray(questionValueData)) {
      return mapSelectedValues(questionValueData)
    }
    // Match option value to selected option if there is only one chosen option.
    const selectedValues = (questionMap.options ?? [])
      .filter((option: QuestionData) => {
        const { value } = option
        const optionValue = typeof value === 'string' ? value : ''

        return questionValueData?.value === optionValue
      })
    return mapSelectedValues(selectedValues)
  }

  if (Array.isArray(questionValueData)) {
    return questionValueData
      .map((data: QuestionData) => parseToValue(data, defaultDocumentValue))
  }

  return [parseToValue(questionValueData, defaultDocumentValue)]
}

/**
 * Parse the document QuestionData fetched from the server into the hard typed DocumentData type needed to render the questions.
 */
function parseToValue (data: QuestionData | undefined, defaultValue: DocumentValue): DocumentValue {
  if (data === undefined) { return defaultValue }
  const questionData = data
  questionData.details = parseDetails(questionData)
  return Object.assign({}, defaultValue, questionData)
}

/**
 * Get the value from the document value parsed from the server under the key detail, or additionalInformation
 * and covert it to an LString to ensure consistent data types.
 */
function parseDetails (questionData: QuestionData): LString | string | undefined {
  const data = questionData
  if (data.additionalInformation !== undefined) {
    return data.additionalInformation
  }
  if (data.details !== undefined) {
    return data.details
  }
}
