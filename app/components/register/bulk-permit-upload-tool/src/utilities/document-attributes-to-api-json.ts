import { type DocumentAttributesMap } from './xlsx-file-to-document-attributes/types'
import { type DocumentType } from '../types'
import { documentsList } from '../data/document-types-list'
import Schema from '@/stores/documents/schemas/schema'

export default async function (documentAttributes: DocumentAttributesMap, documentType: DocumentType) {
  if (typeof documentsList[documentType] !== 'object') {
    return new Schema(documentAttributes).parseXLSXFileToDocumentJson()
  }
  const schema = new documentsList[documentType].ApiSchema(documentAttributes)

  return await schema.parseXLSXFileToDocumentJson()
}
