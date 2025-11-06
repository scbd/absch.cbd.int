export interface IDocumentMap {
  language: string;
  title: string;
  dateOfIssuance: string;
  dateOfExpiry: string;
  provider: IContactFields;
  pic: IContactFields;
  matEstablished: string;
  subjectMatter: string;
  keywords: string;
  specimens: string;
  taxonomies: string;
  usage: string;
  usageDescription: string;
  conditionsThirdPartyTransfer: string;
  permitFiles: string;
  additionalInformation: string;
}

export type DocumentKeys = keyof IDocumentMap

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
