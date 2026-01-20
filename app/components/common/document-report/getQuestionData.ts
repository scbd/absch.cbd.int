import { languages } from '~/app-data/un-languages'
// @ts-expect-error importing js file
import { lstring } from '~/services/filters/lstring'
import type { QuestionMap, DocumentData, DocumentValue, QuestionData } from '~/types/common/document-report'
import type { LanguageCode, LString } from '~/types/languages'

/**
 * Parse question values fetched from the server into the
 * consistently typed DocumentValue[] type used to render a list of document questions.
 */
export function getQuestionValues (reportData: DocumentData, questionMap: QuestionMap, locale: string): DocumentValue[] {
  const { key: questionKey } = questionMap
  const { [questionKey]: questionValueData } = reportData

  const defaultDocumentValue: DocumentValue = {
    value: parseToLString('', locale),
    title: '',
    type: '',
    caption: ''
  }

  if (questionMap.type === 'option') {
    // Remap the chosen option to the options title if there is one
    const mapSelectedValues = (value: QuestionData[]): DocumentValue[] => value.map((data: QuestionData) => {
      if (typeof data.title === 'string') {
        const val = Object.assign({}, questionValueData, data, { value: data.title }) // include questionValueData to ensure we parse details or additionalInformation information
        return parseToValue(val, locale, defaultDocumentValue)
      }

      return parseToValue(data, locale, defaultDocumentValue)
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
      .map((data: QuestionData) => parseToValue(data, locale, defaultDocumentValue))
  }

  return [parseToValue(questionValueData, locale, defaultDocumentValue)]
}

/**
 * Parse the document QuestionData fetched from the server into the hard typed DocumentData type needed to render the questions.
 */
function parseToValue (data: QuestionData | undefined, locale: string, defaultValue: DocumentValue): DocumentValue {
  if (data === undefined) { return defaultValue }
  const questionData = data
  questionData.value = parseToLString(questionData.value, locale)
  questionData.details = parseDetails(questionData, locale)
  return Object.assign({}, defaultValue, questionData)
}

/**
 * Parse value taken from document data fetched from server into an LString
 * to ensure it is the correct type.
 */
function parseToLString (value: string | number | LString | undefined | null, locale: string): LString {
  const isLanguageCode = (value: string): value is LanguageCode => Object.keys(languages).includes(value)
  const localeLangCode: LanguageCode = isLanguageCode(locale) ? locale : 'en'
  const parsedString = String(lstring(value, localeLangCode))
  return { [localeLangCode]: parsedString }
}

/**
 * Get the value from the document value parsed from the server under the key detaul, or additionalInformation
 * and covert it to an LString to ensure consistent data types.
 */
function parseDetails (questionData: QuestionData, locale: string): LString | undefined {
  const data = questionData
  if (data.additionalInformation !== undefined) {
    return parseToLString(data.additionalInformation, locale)
  }
  if (data.details !== undefined) {
    return parseToLString(data.details, locale)
  }
}
