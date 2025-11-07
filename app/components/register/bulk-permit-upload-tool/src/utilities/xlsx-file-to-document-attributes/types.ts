export type AttributeValue = string | IContactFields | IIRCCDocumentMap

export interface IIRCCDocumentAttributes {
  language: AttributeValue;
  absCNAId: AttributeValue;
  permitEquivalent: AttributeValue;
  dateOfIssuance: AttributeValue;
  dateOfExpiry: AttributeValue;
  provider: AttributeValue;
  pic: AttributeValue;
  matEstablished: AttributeValue;
  subjectMatter: AttributeValue;
  keywords: AttributeValue;
  specimens: AttributeValue;
  taxonomies: AttributeValue;
  usage: AttributeValue;
  usageDescription: AttributeValue;
  conditionsThirdPartyTransfer: AttributeValue;
  permitFiles: AttributeValue;
  additionalInformation: AttributeValue;
}

export type IIRCCDocumentMap = { [key in keyof IIRCCDocumentAttributes]?: object | string }

export type DocumentKeys = keyof IIRCCDocumentAttributes

export interface IContactFields {
  type: string;
  existing: string;
  org_name: string;
  acronym: string;
  address: string;
  city: string;
  country: string;
  email: string;
  consent?: string;
}

export type CellValue = {
  w: string;
}

export interface IFileData {
  [key: string]: CellValue;
}
