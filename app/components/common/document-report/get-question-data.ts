import type { QuestionMap } from '~/types/common/document-report'
import type { QuestionData, DocumentData } from '~/types/common/documents'
import type { LString } from '~/types/languages'

/**
 * Parse question values fetched from the server into the
 * consistently typed QuestionData[] type used to render a list of document questions.
 */
export function getQuestionValues (documentData: DocumentData, questionMap: QuestionMap<DocumentData>): QuestionData[] {
  const { key: questionKey } = questionMap
  const questionValueData: QuestionData | QuestionData[] | undefined | LString = documentData[questionKey]

  const defaultQuestionData: QuestionData = {
    value: '',
    title: '',
    type: '',
    caption: ''
  }

  if (questionMap.type === 'option') {
    // Remap the chosen option to the options title if there is one
    const mapSelectedValues = (value: QuestionData[]): QuestionData[] => value.map((data: QuestionData) => {
      if (typeof data.title === 'string') {
        const val = Object.assign({}, questionValueData, data, { value: data.title }) // include questionValueData to ensure we parse details or additionalInformation information
        return parseToValue(val, defaultQuestionData)
      }

      return parseToValue(data, defaultQuestionData)
    })

    if (Array.isArray(questionValueData)) {
      return mapSelectedValues(questionValueData)
    }
    // Match option value to selected option if there is only one chosen option.
    const selectedValues = (questionMap.options ?? [])
      .filter((option: QuestionData) => {
        const { value } = option
        const optionValue = typeof value === 'string' ? value : ''
        if (typeof questionValueData !== 'object') { return false }
        if ('value' in questionValueData) {
          return questionValueData.value === optionValue
        }
        return false
      })
    return mapSelectedValues(selectedValues)
  }

  if (Array.isArray(questionValueData)) {
    return questionValueData
      .map((data: QuestionData) => parseToValue(data, defaultQuestionData))
  }

  return [parseToValue(questionValueData, defaultQuestionData)]
}

/**
 * Parse the document QuestionData fetched from the server into the hard typed DocumentData type needed to render the questions.
 */
function parseToValue (data: QuestionData | undefined | LString, defaultValue: QuestionData): QuestionData {
  if (data === undefined) { return defaultValue }
  const isQuestion = (value: QuestionData | LString): value is QuestionData => 'value' in value

  const questionData: QuestionData = isQuestion(data) ? data : { value: data }
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
