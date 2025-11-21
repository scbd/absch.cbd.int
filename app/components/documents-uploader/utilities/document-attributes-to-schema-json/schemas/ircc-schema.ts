import Schema from './schema'
import type { IIRCCDocumentAttributes } from '~/types/components/documents-uploader/document-schema'

export default class IrccSchema extends Schema {
  override async parseXLSXFileToDocumentJson () {}
}
