import { StandardError } from '~/types/errors'
import { mapDocumentAttributesToSchemaJson } from './document-attributes-to-schema-json'
import { readXLSXFIle } from './read-xlsx-file'
import { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import { documentsList } from '../data/document-types-list'
import { DocError, DocumentAttributes, DocumentsJsonArray } from '~/types/components/documents-uploader/document-schema'
import { KeywordType } from '~/types/common/documents'
import ThesaurusApi from '../../../api/thesaurus.js'

type Translations = (arg: string) => string
export class ImportDocuments {
  t: Translations = (arg) => arg
  errors: Array<StandardError> = []
  keywordsMap: Array<KeywordType> = []
  thesaurusApi: ThesaurusApi = {}
  documentType: DocumentTypes

  constructor (t: Translations, documentType: DocumentTypes) {
    this.t = t
    this.errors = []
    this.documentType = documentType

    this.thesaurusApi = new ThesaurusApi()
  }

  async readXLSXFIle (changeEvent: Event) {
    const target = changeEvent.target as HTMLInputElement
    const files = target.files || []

    const file = files[0]

    const fileRead = await readXLSXFIle(file, this.documentType)
    this.errors = [...this.errors, ...this.getErrorDescriptions(fileRead.errors)]

    return fileRead.workbook
  }

  getErrorDescriptions (errors: Array<DocError>) {
    const getReason = (err: DocError) => `${this.t(err.reason)} Document Row: ${err.row}, Column: ${err.column}, Value: ${err.value}`
    return errors
      .map((docError) => ({ reason: getReason(docError) }))
  }

  async mapDocumentAttributesToSchemaJson (attributesList: Array<DocumentAttributes>) :Promise<DocumentsJsonArray> {
    const mapResult = await mapDocumentAttributesToSchemaJson({
      attributesList,
      documentType: this.documentType,
      keywordsMap: this.keywordsMap
    })

    if (mapResult.errors.length > 0) {
      this.errors = [...this.errors, ...this.getErrorDescriptions(mapResult.errors)]
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

  async getKeywordsMap () {
    const { keywordDomains } = documentsList[this.documentType]

    const keywordPromises = keywordDomains
      .map((keywordDomain: string) => this.thesaurusApi.getDomainTerms(keywordDomain))

    const allKeywords = await Promise.all(keywordPromises)
      .catch(() => {
        this.storeErrors([{ reason: 'keywordsListError' }])
      })

    if (!Array.isArray(allKeywords)) { return [] }

    const keywords = allKeywords.flat()
    this.keywordsMap = keywords
    return keywords
  }
}
