import { mapDocumentAttributesToSchemaJson } from './document-attributes-to-schema-json'
import { readXLSXFile, type ReadFileResult } from './read-xlsx-file'
import { documentsList } from '../data/document-types-list'
// @ts-expect-error import js file
import { getCountry } from '~/api/countries'
import Schema from './document-attributes-to-schema-json/schemas/schema'
import type { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import type {
  DocError, DocumentAttributes, HTMLInputEvent, SheetData,
  DocumentAttributesMap, AttrsList, AttrTypes, GridValue
} from '~/types/components/documents-uploader/document-schema'
import type { KeywordType, DocumentStore } from '~/types/common/documents'
import type { Translations } from '~/types/languages'
// @ts-expect-error import js file
import ThesaurusApi from '../../../api/thesaurus.js'
export class ImportDocuments {
  static t: Translations = (arg) => arg
  locale = 'en'
  errors: DocError[] = []
  keywordsMap: KeywordType[] = []
  thesaurusApi: ThesaurusApi = {}
  documentType: DocumentTypes
  sheet: ReadFileResult
  attributesMap: DocumentAttributesMap
  parsedDocument: Array<[string, GridValue]> = []

  constructor (t: Translations, locale: string, documentType: DocumentTypes) {
    ImportDocuments.t = t
    this.locale = locale
    this.errors = []
    this.documentType = documentType

    // TODO: Add types to API functions or use Vue Composables to make API calls.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call -- Call new on a js object without a type
    this.thesaurusApi = new ThesaurusApi()

    const { [this.documentType]: docList } = documentsList
    const { attributesMap } = docList
    this.attributesMap = attributesMap
    this.sheet = { data: [], errors: [] }
  }

  async readXLSXFile (changeEvent: HTMLInputEvent): Promise<ReadFileResult> {
    const { target } = changeEvent

    const { files } = target
    if (files === null) { return this.sheet }

    const file = files.item(0)
    if (file === null) { return this.sheet }

    const sheet = await readXLSXFile(file, this.documentType)

    const { errors } = sheet
    this.sheet = sheet
    this.errors = errors

    return this.sheet
  }

  async parseSheetForDisplay (sheet: Array<DocumentAttributes<AttrTypes>>): Promise<SheetData> {
    return await Promise.all(sheet.map(async (doc) => {
      // For dispalying values
      const documentData = Object
        .entries(doc)
        .filter(([key, value]) => ImportDocuments.doesValueExist(value) || ImportDocuments.hasColumnErrors(key, this.errors))

      return await Promise.all(documentData
        .map(async ([key, value]) => {
          const val = await this.parseValue(value, key)
          const header = this.parseHeader(key)
          return [header, val]
        }))
    }))
  }

  async mapDocumentAttributesToSchemaJson (attributesList: AttrsList): Promise<DocumentStore> {
    const mapResult = await mapDocumentAttributesToSchemaJson({
      attributesList,
      documentType: this.documentType,
      keywordsMap: this.keywordsMap
    })

    if (mapResult.errors.length > 0) {
      this.errors = [...this.errors, ...mapResult.errors]
    }
    const { documentsStore } = mapResult

    const emptyStore = { documents: [], subDocuments: [] }
    return typeof documentsStore === 'object' ? documentsStore : emptyStore
  }

  storeErrors (newErrors: DocError[]): DocError[] {
    newErrors.forEach((error: DocError) => {
      const reason = ImportDocuments.t(error.reason)
      this.errors.push({ reason, message: reason, name: error.reason })
    })
    return newErrors
  }

  setErrors (value: DocError[]): DocError[] {
    this.errors = value
    return this.errors
  }

  getColumnErrors (key: string, errors: DocError[], index: number): DocError[] {
    const errs = errors
    const { attributesMap } = this

    return errs
      .filter((error) => {
        const { [key]: attribute } = attributesMap
        if (attribute === undefined) { return false }
        const { column } = attribute
        const columnComparitor = Number.isInteger(error.column)
          ? parseInt(String(column), 10)
          : key
        const columnMatch = error.column === columnComparitor

        return error.row === index && columnMatch
      })
  }

  parseDocumentErrors (): DocError[][] {
    return this.sheet.data.map((documentAttributes: DocumentAttributes<AttrTypes>, index: number) => {
      const getReason = (error: DocError, key: string): string => {
        const translationKey = this.attributesMap[key]?.translationKey
        const errorString = ImportDocuments.t(String(translationKey))
        return `${ImportDocuments.t(error.reason)} → ${errorString}.`
      }

      return Object.keys(documentAttributes)
        .reduce((errors: DocError[], key: string) => {
          const columnErrors = this.getColumnErrors(key, this.errors, index)
            .map((err) => {
              const error = err
              error.reason = getReason(error, key)
              error.column = key
              return Object.assign(
                { level: 'warning' },
                error
              ) as DocError
            })

          if (columnErrors.length < 1) { return errors }

          return [...columnErrors, ...errors]
        }, [])
    })
  }

  static getTitle (doc: Array<[string, GridValue]>): string {
    if (!Array.isArray(doc)) { return '' }

    const [, title] = doc.find(([key]) => key === ImportDocuments.t('detailsPermit')) ?? []

    if (typeof title !== 'string') { return '' }
    return title
  }

  async getKeywordsMap (): Promise<KeywordType[]> {
    const { [this.documentType]: documentSchema } = documentsList
    const { keywordDomains } = documentSchema

    const keywordPromises = keywordDomains
      .map((keywordDomain: string) => this.thesaurusApi.getDomainTerms(keywordDomain)
        .catch((error: unknown) => {
          this.storeErrors([{ reason: 'keywordsListError' }])
          return error
        }))

    const allKeywords = await Promise.all(keywordPromises)

    if (!Array.isArray(allKeywords)) { return [] }

    const keywords = allKeywords.flat()
    this.keywordsMap = keywords
    return keywords
  }

  async getCountryName (val: GridValue): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call -- Call new on a js object without a type
    const country = await getCountry(val)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return -- import js object
    return country.name[this.locale]
  }

  async parseValue (val: GridValue, key: string): Promise<GridValue> {
    if (val instanceof Date) {
      return Schema.parseDate(val)
    }

    if (key === 'country' && typeof val === 'string') {
      return await this.getCountryName(val)
    }

    if (typeof val === 'object' && !(val instanceof Date)) {
      const subDocumentData = await Promise.all(Object.entries(val)
        .map(async ([subkey, subvalue]) => {
          const header = this.parseHeader(subkey, this.attributesMap[key]?.schema)
          const v = typeof subvalue === 'string' ? subvalue : ''
          const value = await this.parseValue(v, key)
          return [header, value]
        }))
      return subDocumentData.filter(([, value]) => !Schema.isEmpty(value))
    }

    return val
  }

  parseHeader (key: string, attributesList = this.attributesMap): string {
    if (typeof key !== 'string') { return '' }
    if (typeof attributesList !== 'object') { return '' }

    const translationKey = attributesList[key]?.translationKey ?? ''

    return ImportDocuments.t(translationKey)
  }

  static doesValueExist (val: GridValue): boolean {
    return typeof val === 'string' ? val.trim().length > 0 : Boolean(val)
  }

  static hasColumnErrors (key: string, errors: DocError[]): boolean {
    return errors.some(error => error.column === key)
  }

  static getIsNestedDocument (value: GridValue): value is Array<[string, GridValue]> {
    return Boolean(value) && typeof value === 'object' && !(value instanceof Date)
  }
}
