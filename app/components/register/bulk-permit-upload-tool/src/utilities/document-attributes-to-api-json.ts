import IRCCSchema from '../stores/documents/schemas/ircc-schema'
import { type IIRCCDocumentAttributes } from './xlsx-file-to-document-attributes/types'
import { type DocumentType } from '../types'

export default async function (documentAttributes: IIRCCDocumentAttributes, documentType: DocumentType) {
  const schema = new IRCCSchema(documentAttributes)
  return await schema.parseXLSXFileToDocumentJson()
}
