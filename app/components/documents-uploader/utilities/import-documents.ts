import { StandardError } from '~/types/errors'
import { mapDocumentAttributesToSchemaJson } from './document-attributes-to-schema-json'
import { readXLSXFile } from './read-xlsx-file'
import { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import { documentsList } from '../data/document-types-list'
import {
  DocError, DocumentAttributes,
  DocumentAttributesMap, DocumentsJsonArray
} from '~/types/components/documents-uploader/document-schema'
import { KeywordType } from '~/types/common/documents'
import { Translations } from '~/types/languages'
import { ReadFileResult } from './read-xlsx-file'
// @ts-ignore
import ThesaurusApi from '../../../api/thesaurus.js'

export class ImportDocuments {
  t: Translations = (arg) => arg
  errors: Array<StandardError | DocError> = []
  keywordsMap: Array<KeywordType> = []
  thesaurusApi: ThesaurusApi = {}
  documentType: DocumentTypes
  sheet: ReadFileResult 
  attributesMap: DocumentAttributesMap 

  constructor (t: Translations, documentType: DocumentTypes) {
    this.t = t
    this.errors = []
    this.documentType = documentType

    this.thesaurusApi = new ThesaurusApi()
    this.attributesMap = documentsList[this.documentType]?.attributesMap
    this.sheet = { data: [], errors: [] }
  }

  async readXLSXFile (changeEvent: Event) :Promise<ReadFileResult> {
    const target = changeEvent.target as HTMLInputElement
    const files = target.files || []

    const file = files[0]

    this.sheet = await readXLSXFile(file as File, this.documentType)
    this.errors = this.sheet.errors

    return this.sheet 
  }

  async mapDocumentAttributesToSchemaJson (attributesList: Array<DocumentAttributes>) :Promise<DocumentsJsonArray> {
    const mapResult = await mapDocumentAttributesToSchemaJson({
      attributesList,
      documentType: this.documentType,
      keywordsMap: this.keywordsMap
    })

    if (mapResult.errors.length > 0) {
      this.errors = [...this.errors, ...mapResult.errors]
      return [{ header: { identifier: '' } }]
    }

    return mapResult.documentsJson
  }

  storeErrors (newErrors: Array<StandardError>) {
    newErrors.forEach((error: StandardError) => {
      this.errors.push({ reason: this.t(error.reason) })
    })
  }

  setErrors (value: Array<StandardError>) {
    this.errors = value
  }

  getColumnErrors (key: string, errors: Array<DocError | StandardError>, index: number) {
    const errs = errors || [] as Array<DocError> 
    return errs
      .filter((err) => {
        const error = err as DocError
        const columnComparitor = Number.isInteger(error.column)
          ? parseInt(this.attributesMap[key]?.column as string, 10)
          : key
        const columnMatch = error.column === columnComparitor
  
        return error.row === index && columnMatch
      })
  }
  
  parseDocumentErrors() :DocError[][] {
    return this.sheet.data.map((documentAttributes: DocumentAttributes, index: number) => {
      const getReason = (error: DocError, key: string) => {
        const translationKey = this.attributesMap[key]?.translationKey
        return `${this.t(error.reason || '')} → ${this.t(translationKey || '')}.`
      }

      return Object.keys(documentAttributes)
        .reduce((errors: DocError[], key: string) => {
          const columnErrors = this.getColumnErrors(key, this.errors, index)
            .map((err) => {
              const error = err as DocError
              error.reason = getReason(error, key)
              error.column = key 
              return Object.assign(
                { level: 'warning' },
                error,
              ) as DocError
            })

          if (columnErrors.length < 1) { return errors }

          return [...columnErrors, ...errors]
        }, [])
    })
  }

  async getKeywordsMap () {
    const { keywordDomains } = documentsList[this.documentType]

    const keywordPromises = keywordDomains
      .map((keywordDomain: string) => this.thesaurusApi.getDomainTerms(keywordDomain)
        .catch((error: Error) => {
          this.storeErrors([{ reason: 'keywordsListError' }])
          console.warn(error)
        }))

    const allKeywords = await Promise.all(keywordPromises)

    if (!Array.isArray(allKeywords)) { return [] }

    const keywords = allKeywords.flat()
    this.keywordsMap = keywords
    return keywords
  }
}
