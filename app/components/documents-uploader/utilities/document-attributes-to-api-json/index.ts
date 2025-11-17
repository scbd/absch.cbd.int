import {
  DocumentAttributesMap,
  DocError,
  DocumentsJson
} from '../xlsx-file-to-document-attributes/types'
import { type DocumentTypes, documentsList } from '../../data/document-types-list'
import { ApiDocumentType } from './schemas/types'

const defaultJson: ApiDocumentType = { header: { identifier: '' } }
function getError () :DocumentsJson {
  const error: DocError = {
    value: new Error('There is no parser for the given file type.'),
    index: 1
  }
  const errors: Array<DocError> = [error]
  return { documentsJson: [defaultJson], errors }
}

export default async function (documents: Array<DocumentAttributesMap>, documentType: DocumentTypes) :Promise<DocumentsJson> {
  // Handle the file type not exixting
  if (typeof documentsList[documentType] !== 'object') {
    getError()
  }

  const documentsJson = []
  const errors = []
  // Iterate over each document in XLSX file and generate it's
  // the JSON that will be sent to the API to create a draft.
  for (let i = 0; i < documents.length; i += 1) {
    const schema = new documentsList[documentType].ApiSchema(documents[i])

    let json = await schema.parseXLSXFileToDocumentJson()
      .catch((error) => {
        errors.push({ value: error, index: i })
      })
    json = json === undefined ? defaultJson : json
    documentsJson.push(json)
  }
  return { documentsJson, errors }
}
