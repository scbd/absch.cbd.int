import IRCCSchema from '../stores/documents/schemas/ircc-schema'
import { type IFileData } from '../stores/documents/schemas/types'

export default async function (xlsxData: IFileData) {
  const schema = new IRCCSchema(xlsxData)
  console.log('schema', await schema.parseXLSXFileToDocumentJson())
  return await schema.parseXLSXFileToDocumentJson()
}
