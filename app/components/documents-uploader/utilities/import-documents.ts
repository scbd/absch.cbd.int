import { mapDocumentAttributesToSchemaJson } from './document-attributes-to-schema-json'
import { readXLSXFile, type ReadFileResult } from './read-xlsx-file'
import { documentsList } from '../data/document-types-list'
import type { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import type {
  DocError, DocumentAttributes, HTMLInputEvent,
  DocumentAttributesMap, AttrsList, AttrTypes
} from '~/types/components/documents-uploader/document-schema'
import type { KeywordType, DocumentStore } from '~/types/common/documents'
import type { Translations } from '~/types/languages'
// @ts-expect-error import js file
import ThesaurusApi from '../../../api/thesaurus.js'

export class ImportDocuments {
  static t: Translations = (arg) => arg
  errors: DocError[] = []
  keywordsMap: KeywordType[] = []
  thesaurusApi: ThesaurusApi = {}
  documentType: DocumentTypes
  sheet: ReadFileResult
  attributesMap: DocumentAttributesMap

  constructor (t: Translations, documentType: DocumentTypes) {
    ImportDocuments.t = t
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

  async mapDocumentAttributesToSchemaJson (attributesList: AttrsList): Promise<DocumentStore[]> {
    const mapResult = await mapDocumentAttributesToSchemaJson({
      attributesList,
      documentType: this.documentType,
      keywordsMap: this.keywordsMap
    })

    if (mapResult.errors.length > 0) {
      this.errors = [...this.errors, ...mapResult.errors]
    }
    const { documentsJson } = mapResult

    const emptyDoc = { header: { identifier: '' } }
    return typeof documentsJson === 'object' ? documentsJson : [{ create: () => emptyDoc }]
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

  static getTitle (index: number, sheet: AttrsList): string {
    const { [index]: doc } = sheet
    if (typeof doc !== 'object') { return '' }
    if (typeof doc.permitEquivalent !== 'string') { return '' }
    return doc.permitEquivalent
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
}
