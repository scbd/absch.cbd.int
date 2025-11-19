import { MapToJsonParams, ApiDocumentType } from './schemas/types'
import {
  DocError,
  DocumentsJson
} from '../xlsx-file-to-document-attributes/types'
import { documentsList } from '../../data/document-types-list'
import KmDocumentApi from '../../../../api/km-document'

const kmDocumentApi = new KmDocumentApi()

const defaultJson: ApiDocumentType = { header: { identifier: '' } }
function getError () :DocumentsJson {
  const error: DocError = {
    value: new Error('There is no parser for the given file type.'),
    index: 1
  }
  const errors: Array<DocError> = [error]
  return { documentsJson: [defaultJson], errors }
}

export async function mapDocumentAttributesToAPIJSON ({
  documents,
  documentType,
  keywordsMap
}: MapToJsonParams) :Promise<DocumentsJson> {
  // Handle the file type not exixting
  if (typeof documentsList[documentType] !== 'object') {
    getError()
  }

  const documentsJson = []
  const errors = []

  // Iterate over each document in XLSX file and generate
  // the JSON that will be sent to the API to create a draft.
  for (let i = 0; i < documents.length; i += 1) {
    const schema = new documentsList[documentType].ApiSchema(documents[i], keywordsMap)

    let json = await schema.parseXLSXFileToDocumentJson()
      .catch((error) => {
        errors.push({ value: error, index: i })
      })
    json = json === undefined ? defaultJson : json
    documentsJson.push(json)
  }
  return { documentsJson, errors }
}

// TODO: Find a place that is available more globally to fetch this information
export async function getKeywordsMap () {
  // TODO Remove magic string by fetching the ABS Permit Keyword category
  // identifier via the API
  const keywordsResponse = await kmDocumentApi.getKeyword('1A22EAAB-9BBC-4543-890E-DEF913F59E98')
  return keywordsResponse.data
}
