import { type DocumentAttributesMap } from '../xlsx-file-to-document-attributes/types'
import { type DocumentTypes, documentsList } from '../../data/document-types-list'
import { type ApiDocumentType } from './schemas/types'

type DocumentsJson = Promise<Array<ApiDocumentType>>

export default async function (documents: Array<DocumentAttributesMap>, documentType: DocumentTypes) :DocumentsJson {
  if (typeof documentsList[documentType] !== 'object') {
    return [{ header: { identifier: '' } }]
  }

  const documentsJson = []
  for (let i = 0; i < documents.length; i += 1) {
    const schema = new documentsList[documentType].ApiSchema(documents[i])

    documentsJson.push(await schema.parseXLSXFileToDocumentJson() as ApiDocumentType)
  }
  return documentsJson
}
