import type {
  MapToJsonParams, DocError, DocumentsJson
} from '~/types/components/documents-uploader/document-schema'
import type { DocumentRequest } from '~/types/common/documents'
import { documentsList } from '../../data/document-types-list'

const defaultJson: DocumentRequest = { header: { identifier: '' } }
function getError (): DocumentsJson {
  const error: DocError = {
    reason: 'noDocumentParser',
    row: -1,
    value: '',
    message: '',
    name: ''
  }
  const errors: DocError[] = [error]
  return { documentsJson: [defaultJson], errors }
}

export async function mapDocumentAttributesToSchemaJson ({
  attributesList,
  documentType,
  keywordsMap
}: MapToJsonParams): Promise<DocumentsJson> {
  // Handle the file type not exixting
  if (typeof documentsList[documentType] !== 'object') {
    getError()
  }

  const errors: DocError[] = []

  // Iterate over each document in XLSX file and generate
  // the Schema JSON that representing a draft document.
  const parsePromises = attributesList.map(async (attributes, index): Promise<DocumentRequest> => {
    const schema = new documentsList[documentType].DocumentSchema(attributes, keywordsMap)

    const json = await schema.parseXLSXFileToDocumentJson()
      .catch((e: unknown) => {
        const error: DocError = Object.assign({ row: -1, reason: '', name: 'Parse Error', message: '' }, e)
        error.row = index
        error.level = 'warning'

        errors.push(error)
        console.warn(error) // eslint-disable-line no-console -- show error in console
        const data: DocumentRequest = { header: { identifier: '' } }
        const parseError = Object.assign({ data }, e)

        return parseError.data
      })

    return json
  })

  const documentsJson = await Promise.all(parsePromises)

  return { documentsJson, errors }
}
