import { mapDocumentAttributesToSchemaJson } from './document-attributes-to-schema-json'
import { readXLSXFile, type ReadFileResult } from './read-xlsx-file'
import { documentsList } from '../data/document-types-list'
// @ts-expect-error import js file
import { getCountry } from '~/api/countries'
import Schema from './document-attributes-to-schema-json/schemas/schema'
import type { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import type {
  DocError, DocumentAttributes, HTMLInputEvent, SheetData,
  DocumentAttributesMap, AttrsList, AttrTypes, GridValue,
  DocumentAttributeValue, GridData
} from '~/types/components/documents-uploader/document-schema'
import type { KeywordType, DocumentStore, SubDocumentTypes } from '~/types/common/documents'
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
  documentErrors: DocError[][] = []
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
    // Parse errors for display
    this.documentErrors = this.parseDocumentErrors(this.errors)

    // Headers(descriptions) and values for display
    return await Promise.all(sheet.map(async (doc) => {
      const documentData = Object
        .entries(doc)

      const data: GridData[] = await Promise.all(documentData
        .map(async ([key, v]) => {
          const value = await this.parseValue(v ?? '', key)
          const header = this.parseHeader(key)
          return { header, value, key }
        }))
      return data
        .filter(entry => !this.isValidAndEmpty(entry.value, entry.key, this.attributesMap))
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
      const resultErrors = mapResult.errors.map(error => {
        const { column } = error
        const indexedColumn = this.attributesMap[column ?? '']?.column
        return Object.assign(error, { column: parseInt(indexedColumn ?? '-1', 10) })
      })
      this.errors = [...this.errors, ...resultErrors]
    }
    const { documentsStore } = mapResult

    const emptyStore = { documents: [], subDocuments: [] }
    return typeof documentsStore === 'object' ? documentsStore : emptyStore
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
  static getColumnErrors (column: number, row: number, errors: DocError[]): DocError[] {
    return errors
      .filter((error) => error.row === row && error.column === column)
  }

  /**
  * Is object a list of attributes.
  */
  static isAttrsList (obj: DocumentAttributeValue<SubDocumentTypes> | null): obj is Record<string, DocumentAttributeValue<SubDocumentTypes>> {
    return typeof obj === 'object' && !(obj instanceof Date) && obj !== null
  }

  /**
  * Translate document errors and match them to their given document attributes.
  */
  parseDocumentErrors (errors: DocError[]): DocError[][] {
    const getReason = (error: DocError, key: string, attrsMap: DocumentAttributesMap): string => {
      const translationKey = attrsMap[key]?.translationKey
      const errorString = ImportDocuments.t(String(translationKey))
      return `${ImportDocuments.t(error.reason)} → ${errorString}.`
    }

    const getError = (err: DocError, column: number, key: string, attrsMap: DocumentAttributesMap): DocError => {
      const error = err
      error.reason = getReason(error, key, attrsMap)
      error.column = column
      return Object.assign(
        { level: 'warning' },
        error
      ) as DocError
    }

    const mapErrors = (attributes: DocumentAttributes<AttrTypes> | DocumentAttributeValue<SubDocumentTypes>, attributesMap: DocumentAttributesMap, index: number): DocError[] => Object.keys(attributes ?? {})
      .reduce((documentErrors: DocError[], key: string) => {
        if (!ImportDocuments.isAttrsList(attributes)) { return documentErrors }

        if (ImportDocuments.isAttrsList(attributes[key])) {
          const map: DocumentAttributesMap | undefined = attributesMap[key]?.schema
          if (map === undefined) { return documentErrors }
          return [...mapErrors(attributes[key], map, index), ...documentErrors]
        }

        const column = parseInt(attributesMap[key]?.column ?? '-1', 10)

        const columnErrors = ImportDocuments.getColumnErrors(column, index, errors)
          .map((err) => getError(err, column, key, attributesMap))

        if (columnErrors.length < 1) { return documentErrors }

        return [...columnErrors, ...documentErrors]
      }, [])

    return this.sheet.data
      .map((documentAttributes: DocumentAttributes<AttrTypes>, index: number) => mapErrors(documentAttributes, this.attributesMap, index))
  }

  /**
  * Get the document title from a set of parsed document headers, and values.
  */
  static getTitle (doc: GridData[]): string {
    if (!Array.isArray(doc)) { return '' }

    const entry: GridData | undefined = doc.find(entry => entry.key === 'permitEquivalent')
    if (entry === undefined) { return '' }

    const { value } = entry

    if (typeof value !== 'string') { return '' }
    return value
  }

  /**
  * Fetch the keywords list that describe what each document pertains to.
  */
  async getKeywordsMap (): Promise<KeywordType[]> {
    const { [this.documentType]: documentSchema } = documentsList
    const { keywordDomains } = documentSchema

    // TODO: Convert Thesaurus Api to Typescript to aviod TS errors here.
    const keywordPromises = keywordDomains
      .map((keywordDomain: string) => this.thesaurusApi.getDomainTerms(keywordDomain)
        .catch((error: unknown) => {
          const reason = ImportDocuments.t('keywordsListError')
          this.errors.push({ reason, name: reason, message: reason })
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
  async parseValue (val: GridValue, key: string): Promise<GridValue | GridData[]> {
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
      const subDocuments = await Promise.all(Object.entries(val)
        .map(async ([subkey, subvalue]) => {
          const header = this.parseHeader(subkey, this.attributesMap[key]?.schema)
          const v = typeof subvalue === 'string' ? subvalue : ''
          const parsedVal = await this.parseValue(v, key)
          const value = typeof parsedVal === 'string' ? parsedVal : ''
          return { header, value, key: subkey }
        }))

      return subDocuments
        .filter((entry) => !this.isValidAndEmpty(entry.value, entry.key, this.attributesMap[key]?.schema ?? {}))
    }

    return val
  }

  /**
  * Remove all non-errored empty values.
  */
  isValidAndEmpty (value: GridValue | GridData | GridData[], key: string, attributesMap: DocumentAttributesMap): boolean {
    return !ImportDocuments.doesValueExist(value) &&
      !ImportDocuments.hasColumnErrors(key, this.errors, attributesMap)
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
  static doesValueExist (val: GridValue | GridData | GridData[]): boolean {
    return typeof val === 'string' ? val.trim().length > 0 : Boolean(val)
  }

  /**
  * Determine if a document value has errors.
  */
  static hasColumnErrors (key: string, errors: DocError[], attributesMap: DocumentAttributesMap): boolean {
    const { column } = attributesMap[key] ?? {}
    return errors.some(error => error.column === parseInt(column ?? '-1', 10))
  }
}
