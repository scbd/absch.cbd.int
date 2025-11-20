import { MapToJsonParams, DocumentJsonType } from '~/types/components/documents-uploader/document-schema'
import {
  DocError,
  DocumentsJson
} from '~/types/components/documents-uploader/xlsx-file-to-document-attributes'
import { documentsList } from '../../data/document-types-list'
import { DocumentTypes } from '~/types/components/documents-uploader/document-types-list'
import ThesaurusApi from '../../../../api/thesaurus.js'

const thesaurusApi = new ThesaurusApi()

const defaultJson: DocumentJsonType = { header: { identifier: '' } }
function getError () :DocumentsJson {
  const error: DocError = {
    value: new Error('There is no parser for the given file type.'),
    index: 1
  }
  const errors: Array<DocError> = [error]
  return { documentsJson: [defaultJson], errors }
}

export async function mapDocumentAttributesToSchemaJson ({
  attributesList,
  documentType,
  keywordsMap
}: MapToJsonParams) :Promise<DocumentsJson> {
  // Handle the file type not exixting
  if (typeof documentsList[documentType] !== 'object') {
    getError()
  }

  const errors = []

  // Iterate over each document in XLSX file and generate
  // the Schema JSON that representing a draft document.
  const parsePromises = attributesList.map(async (attributes, index) :Promise<DocumentJsonType> => {
    const schema = new documentsList[documentType].DocumentSchema(attributes, keywordsMap)

    const json = await schema.parseXLSXFileToDocumentJson()
      .catch((error) => {
        console.warn(error)
        errors.push({ error, index })
      })

    return json === undefined ? defaultJson : json as DocumentJsonType
  })

  const documentsJson = await Promise.all(parsePromises)
  return { documentsJson, errors }
}

export async function getKeywordsMap (documentType: DocumentTypes) {
  const { keywordDomains } = documentsList[documentType]

  const keywordPromises = keywordDomains
    .map((keywordDomain) => thesaurusApi.getDomainTerms(keywordDomain))

  const allKeywords = await Promise.all(keywordPromises)
    .catch((errors) => { throw errors })

  return allKeywords.flat()
}
