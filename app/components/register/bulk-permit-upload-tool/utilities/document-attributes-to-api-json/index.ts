import { type DocumentAttributesMap } from '../xlsx-file-to-document-attributes/types'
import { type DocumentTypes, documentsList } from '../../data/document-types-list'
import { type ApiDocumentType } from './schemas/types'
import Schema from './schemas/schema'

export default async function (documentAttributes: DocumentAttributesMap, documentType: DocumentTypes) :Promise<ApiDocumentType> {
  if (typeof documentsList[documentType] !== 'object') {
    return new Schema(documentAttributes).parseXLSXFileToDocumentJson()
  }
  const schema = new documentsList[documentType].ApiSchema(documentAttributes)

  return await schema.parseXLSXFileToDocumentJson() as ApiDocumentType
}
