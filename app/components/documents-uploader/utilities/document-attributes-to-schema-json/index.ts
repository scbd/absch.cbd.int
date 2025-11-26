import {
  MapToJsonParams, DocError, DocumentsJson
} from '~/types/components/documents-uploader/document-schema'
import { DocumentRequest } from '~/types/common/documents'
import { documentsList } from '../../data/document-types-list'

const defaultJson: DocumentRequest = { header: { identifier: '' } }
function getError () :DocumentsJson {
  const error: DocError = {
    reason: 'noDocumentParser',
    row: 1,
    column: null,
    value: ''
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
  const parsePromises = attributesList.map(async (attributes, index) :Promise<DocumentRequest> => {
    const schema = new documentsList[documentType].DocumentSchema(attributes, keywordsMap)

    const json = await schema.parseXLSXFileToDocumentJson()
      .catch((error) => {
        console.warn(error)
        errors.push({ reason: error.reason, row: index, column: error.column, value: error.value })
      })

    return json === undefined ? defaultJson : json as DocumentRequest
  })

  const documentsJson = await Promise.all(parsePromises)
  return { documentsJson, errors }
}
