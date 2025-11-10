// export interface CPCDocumentAttributes {
//   language: AttributeValue;
//   absIRCCs: AttributeValue;
//   etc: AttributeValue;
// }

// export type DocumentKeys = keyof IIRCCDocumentAttributes | keyof CPCDocumentAttributes

export type DocumentAttributesMap = { [key: string]: string | DocumentAttributesMap }

export type CellValue = {
  w: string;
}

export interface IFileData {
  [key: string]: CellValue;
}
