import type { LanguageCode } from '../../../mappings/types'



export interface IIRCCDocumentMap extends IDocumentMap {
  absCNA: string;
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
