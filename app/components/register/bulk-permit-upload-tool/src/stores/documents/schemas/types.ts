import type { LanguageCode } from '../../../mappings/types'

export interface IContactFields {
  type: string;
  existing: string;
  orgName_firstName: string;
  acronym_lastName: string;
  address: string;
  city: string;
  country: string;
  email: string;
  consent?: string;
}

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

export interface IIRCCDocumentMap extends IDocumentMap {
  absCNA: string;
}
export type CellValue = {
  w: string;
}

export interface IFileData {
  [key: string]: CellValue;
}

export interface IMapData {
  [key: string]: string | IMapData;
}

export type SubjectMatter = {
  [key in LanguageCode]: string;
}

export type FileReference = {
  url: string;
  name: string;
  language: LanguageCode;
}
