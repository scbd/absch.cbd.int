import { StandardError } from '~/types/errors'
import * as XLSX from 'xlsx'
import xlsxFileToDocumentAttributes from './xlsx-file-to-document-attributes'
import { mapDocumentAttributesToSchemaJson } from './document-attributes-to-schema-json'
import { readXLSXFIle } from './read-xlsx-file'
import { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import { documentsList } from '../data/document-types-list'
import { DocError, DocumentAttributesMap, type KeywordType } from '~/types/components/documents-uploader/xlsx-file-to-document-attributes'
import { DocumentsJsonArray } from '~/types/components/documents-uploader/document-schema'
import ThesaurusApi from '../../../api/thesaurus.js'

export class ImportDocuments {
  t = (arg: string) :string => arg
  errors: Array<StandardError> = []
  keywordsMap: Array<KeywordType> = []
  thesaurusApi: ThesaurusApi = {}
  documentType: DocumentTypes

  constructor (t, documentType: DocumentTypes) {
    this.t = t
    this.errors = []
    this.documentType = documentType

    this.thesaurusApi = new ThesaurusApi()
  }

  async readXLSXFIle (changeEvent: Event) :Promise<XLSX.WorkSheet> {
    const fileRead = await readXLSXFIle(changeEvent)
    this.storeErrors(fileRead.errors)

    if (!fileRead.workbook.Sheets) { return [] }

    return fileRead.workbook.Sheets['Sheet3'] || []
  }

  xlsxFileToDocumentAttributes (sheet: XLSX.WorkSheet) :Array<DocumentAttributesMap> {
    const getAttributesResult = xlsxFileToDocumentAttributes(this.documentType, sheet)
    this.storeErrors(getAttributesResult.errors)
    return getAttributesResult.documents
  }

  async mapDocumentAttributesToSchemaJson (attributesList: Array<DocumentAttributesMap>) :Promise<DocumentsJsonArray> {
    const mapResult = await mapDocumentAttributesToSchemaJson({
      attributesList,
      documentType: this.documentType,
      keywordsMap: this.keywordsMap
    })

    if (mapResult.errors.length > 0) {
      const getMessage = (err: DocError) => `${this.t(err.message)} Document Row: ${err.index}, Column: ${err.column}, Value: ${err.value}`
      this.errors = mapResult.errors
        .map((docError) => ({ message: getMessage(docError) }))
      return [{ header: { identifier: '' } }]
    }

    return mapResult.documentsJson
  }

  storeErrors (newErrors: Array<StandardError>) {
    newErrors.forEach((error: StandardError) => {
      this.errors.push({ message: this.t(error.message) })
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
        this.storeErrors([{ message: 'keywordsListError' }])
      })

    if (!Array.isArray(allKeywords)) { return [] }

    const keywords = allKeywords.flat()
    this.keywordsMap = keywords
    return keywords
  }
}
