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

/**
 * Import Documents
 *
 * Read a spreadsheet.
 * Process that spreadsheet into document attributes to be displayed to the user.
 * Build a PUT/Create object to be sent to a server from a spreadsheet.
 * Handles errors and business logic for Vue components.
 */
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

  /**
  * Use library to read spreadsheet and store that as object with keys based on
  * the document's corresponding attribute map.
  */
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

  /**
  * Parse the spreasheet object into header(description), and value pairs parsed to be displayed to the user.
  */
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

  /**
  * Map the document spreadsheet object to server request JSON used to make the PUT/CREATE
  * request to the server.
  */
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

  /**
  * Store translated errors during the document handling process.
  */
  storeErrors (newErrors: DocError[]): DocError[] {
    newErrors.forEach((error: DocError) => {
      const reason = ImportDocuments.t(error.reason)

      this.errors.push({ reason, message: reason, name: error.reason })
    })
    return newErrors
  }

  /**
  * Set the errors list to a given value.
  */
  setErrors (value: DocError[]): DocError[] {
    this.errors = value
    return this.errors
  }

  /**
  * Find all errors matching a given document and document attribute i.e. (Document 1, Title)
  */
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

  /**
  * Translate document errors and match them to their given document attributes.
  */
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

  /**
  * Get the document title from a set of parsed document headers, and values.
  */
  static getTitle (doc: Array<[string, GridValue]>): string {
    if (!Array.isArray(doc)) { return '' }

    const [, title] = doc.find(([key]) => key === ImportDocuments.t('detailsPermit')) ?? []

    if (typeof title !== 'string') { return '' }
    return title
  }

  /**
  * Fetch the keywords list that describe what each document pertains to.
  */
  async getKeywordsMap (): Promise<KeywordType[]> {
    const { [this.documentType]: documentSchema } = documentsList
    const { keywordDomains } = documentSchema

    const keywordPromises = keywordDomains
      .map((keywordDomain: string) => this.thesaurusApi.getDomainTerms(keywordDomain)
        .catch((error: unknown) => {
          const reason = 'keywordsListError'
          this.storeErrors([{ reason, name: reason, message: reason }])
          return error
        }))

    const allKeywords = await Promise.all(keywordPromises)

    if (!Array.isArray(allKeywords)) { return [] }

    const keywords = allKeywords.flat()
    this.keywordsMap = keywords
    return keywords
  }

  /**
  * Fetch the locale name of a country based on it's country code from the server.
  */
  async getCountryName (val: GridValue): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call -- Call new on a js object without a type
    const country = await getCountry(val)
      .catch((error: unknown) => {
        console.warn(error) // eslint-disable-line no-console -- Show error in console
        const reason = typeof val === 'string'
          ? ImportDocuments.t('countryNotFound', { msg: val })
          : ImportDocuments.t('countryNotFound')

        this.errors.push({ reason, message: reason, name: reason })
        return { name: { en: 'Error: Not found' } }
      })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return -- import js object
    return country.name[this.locale]
  }

  /**
  * Parse a spreadsheet value into the value that will be displayed to the user.
  */
  async parseValue (val: GridValue, key: string): Promise<GridValue> {
    if (val instanceof Date) {
      return Schema.parseDate(val)
    }

    // Fetch country's full name if value is a country code
    if (key === 'country' && typeof val === 'string') {
      return await this.getCountryName(val)
    }

    // Parse subdocument into an array of [header, value]
    // if the value is a subdocument.
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

  /**
  * Parse the spreadsheet header value into the value that will be displayed to the user.
  */
  parseHeader (key: string, attributesList = this.attributesMap): string {
    if (typeof key !== 'string') { return '' }
    if (typeof attributesList !== 'object') { return '' }

    const translationKey = attributesList[key]?.translationKey ?? ''

    return ImportDocuments.t(translationKey)
  }

  /**
  * Determine if a document value is empty.
  */
  static doesValueExist (val: GridValue): boolean {
    return typeof val === 'string' ? val.trim().length > 0 : Boolean(val)
  }

  /**
  * Determine if a document value has errors.
  */
  static hasColumnErrors (key: string, errors: DocError[]): boolean {
    return errors.some(error => error.column === key)
  }
}
