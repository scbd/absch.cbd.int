import { type DocumentAttributesMap } from '../xlsx-file-to-document-attributes/types'
import { type DocumentTypes, documentsList } from '../../data/document-types-list'
import Schema from './schemas/schema'

export default async function (documentAttributes: DocumentAttributesMap, documentType: DocumentTypes) {
  if (typeof documentsList[documentType] !== 'object') {
    return new Schema(documentAttributes).parseXLSXFileToDocumentJson()
  }
  const schema = new documentsList[documentType].ApiSchema(documentAttributes)

  return await schema.parseXLSXFileToDocumentJson()
}
