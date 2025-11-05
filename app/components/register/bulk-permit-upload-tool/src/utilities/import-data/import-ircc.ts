import { ImportDataBase, ELink } from './import-data-base'
import hash from 'object-hash'
import * as XLSX from 'xlsx'

// Define interfaces for complex objects
interface IFields {
  language: string;
  country: string;
  cna: string;
  permit_equivalent: string;
  date_of_issuance: string;
  dateOfExpiry: string;
  provider: IContactFields;
  pic: IContactFields;
  matConset: string;
  subject_matter: string;
  keywords: string;
  specimens: string;
  taxonomies: string;
  usage: string;
  usageDescription: string;
  conditions_third_party_transfer: string;
  permitFiles: string;
  additional_information: string;
}

interface IContactFields {
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

interface ICache {
  fields: {
    C: { [key: string]: any };
  };
}

export class ImportDataIRCC extends ImportDataBase {
  fields: IFields = {
    language: 'A',
    country: 'B',
    cna: 'C',
    permit_equivalent: 'D',
    date_of_issuance: 'E',
    dateOfExpiry: 'F',
    provider: {
      type: 'G',
      existing: 'H',
      orgName_firstName: 'I',
      acronym_lastName: 'J',
      address: 'K',
      city: 'L',
      country: 'M',
      email: 'N',
    },
    pic: {
      consent: 'O',
      type: 'P',
      existing: 'Q',
      orgName_firstName: 'R',
      acronym_lastName: 'S',
      address: 'T',
      city: 'U',
      country: 'V',
      email: 'W',
    },
    matConset: 'X',
    subject_matter: 'Y',
    keywords: 'Z',
    specimens: 'AA',
    taxonomies: 'AB',
    usage: 'AC',
    usageDescription: 'AD',
    conditions_third_party_transfer: 'AE',
    permitFiles: 'AF',
    additional_information: 'AG',
  }

  cache: ICache = {
    fields: {
      C: {},
    },
  }

     countries: any[] // Replace with actual type if known
  realm: any // Replace with actual type if known
  workbook: XLSX.WorkBook
  authorityIds: string[] = []
  contacts: any[] = [] // Replace with actual type if known
  hashedValue: { [key: string]: string } = {}
  static ROW_LIMIT = 10

  constructor (realm: any, language: string, government: any, workbook: XLSX.WorkBook, auth: any) {
    super(auth)
    this.realm = realm
    this.government = government
    this.workbook = workbook
    this.language = language
  }

  readSheetToDisplayOnUI (sheetNames: string[], selectedSheetIndex: number): any[] {
    const sheet = this.workbook.Sheets[sheetNames[selectedSheetIndex]]
    const excelData: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 })
    const rowCount = ((excelData.filter(row => row.some(cell => cell !== undefined && cell !== null && cell !== '')).length) - 2) + 3
    const data: any[] = []
    const TotalCount = rowCount > ImportDataIRCC.ROW_LIMIT ? ImportDataIRCC.ROW_LIMIT + 3 : rowCount + 3

    for (let i = 4; i <= TotalCount; i++) {
      if (super.columnVal(sheet, this.fields.language + i)) {
        const value: { [key: string]: any } = {
          rowId: i - 3,
          fileError: null
        }

        for (const fieldName in this.fields) {
          this.processField(sheet, this.fields[fieldName as keyof IFields], fieldName, i, value)
        }

        data.push(value)
      }
    }

    return data
  }

  processField (sheet: XLSX.WorkSheet, field: any, fieldName: string, i: number, value: any, isNested: boolean = false, parentFieldName: string | null = null): void {
    if (typeof field === 'object' && !isNested) {
      value[fieldName] = {}
      for (const subField in field) {
        this.processField(sheet, field[subField], subField, i, value, true, fieldName)
      }
    } else if (isNested && parentFieldName) {
      value[parentFieldName][fieldName] = this.columnVal(sheet, this.fields[parentFieldName as keyof IFields][fieldName] + i)
    } else {
      value[fieldName] = this.columnVal(sheet, field + i)
    }
  }

  async fileParser (sheetNames: string[], selectedSheetIndex: number): Promise<any[] | { duplicate: true }> {
    let language: string

    const sheet = this.workbook.Sheets[sheetNames[selectedSheetIndex]]
    const hashed = hash(sheet)

    if (this.hashedValue[sheetNames[selectedSheetIndex]] === hashed) {
      return {
        duplicate: true
      }
    }

    this.hashedValue[sheetNames[selectedSheetIndex]] = hashed

    const excelData: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 })
    const rowCount = ((excelData.filter(row => row.some(cell => cell !== undefined && cell !== null && cell !== '')).length) - 2) + 3

    const irccs: any[] = []
    const TotalCount = rowCount > ImportDataIRCC.ROW_LIMIT ? ImportDataIRCC.ROW_LIMIT + 3 : rowCount + 3

    for (let i = 4; i <= TotalCount; i++) {
      this.authorityIds.push(super.columnVal(sheet, this.fields.cna + i))
    }
    await this.cacheApiCalls()

    for (let i = 4; i <= TotalCount; i++) {
    const langValue = super.columnVal(sheet, this.fields.language + i)
      if (!langValue) {
        console.log(`Language is missing for record on row ${i}, skipping record.`)
        continue
      }

      language = this.languageMappings[langValue.toLowerCase()]

      const picGranted = super.columnVal(sheet, this.fields.pic.consent + i).toLowerCase() == 'yes'
      const matEstablished = super.columnVal(sheet, this.fields.matConset + i).toLowerCase() == 'yes'

      if (!picGranted || !matEstablished) {
        console.log(`Pic or Mat not consented for record on row ${i}.`)
      }

      const authorityId = await super.findByUid(super.columnVal(sheet, this.fields.cna + i), this.cache, this.fields.cna)

      const provider: { type: string, identifiers?: any } = { type: super.columnVal(sheet, this.fields.provider.type + i) }
      const pic: { type: string, identifiers?: any } = { type: super.columnVal(sheet, this.fields.pic.type + i) }
      const usage = super.columnVal(sheet, this.fields.usage + i)

      if (provider.type != 'confidential') {
        provider.identifiers = await super.findOrCreateContact(
          this.contacts,
          sheet,
          language,
          i,
          this.fields.provider,
          this.government
        )
      }

      if (pic.type != 'confidential') {
        pic.identifiers = await super.findOrCreateContact(
          this.contacts,
          sheet,
          language,
          i,
          this.fields.pic,
          this.government
        )
      }

      const irccDocument: { [key: string]: any } = {
        header: {
          identifier: this.guid(),
          schema: 'absPermit',
          languages: [language],
        },
        government: { identifier: this.government },
        absCNA: { identifier: authorityId },
        title: {
          [language]: super.columnVal(sheet, this.fields.permit_equivalent + i),
        },
        providersConfidential: provider.type.toLowerCase() == 'confidential',
        providers: provider.identifiers,
        picGranted,
        matEstablished,
        usages:
          usage.toLowerCase() == 'confidential'
            ? undefined
            : [
                {
                  identifier:
                  this.usageMapping[
                    super.columnVal(sheet, this.fields.usage + i).replace('-', '')
                  ],
                },
              ],
        usagesConfidential: usage.toLowerCase() == 'confidential',
        usagesDescription: {
          [language]: `<div>${super.columnVal(
            sheet,
            this.fields.usageDescription + i
          )} </div>`,
        },
        entitiesToWhomPICGrantedConfidential:
          pic.type.toLowerCase() == 'confidential',
        entitiesToWhomPICGranted: pic.identifiers,
      }

      const subjectMatter = super.columnVal(sheet, this.fields.subject_matter + i)
      const thirdPartyTransferCondition = super.columnVal(
        sheet,
        this.fields.conditions_third_party_transfer + i
      )

      if ((subjectMatter || '').trim() != '') {
        irccDocument.subjectMatter = {
          [language]: `<div>${subjectMatter} </div>`,
        }
      }

      if ((thirdPartyTransferCondition || '').trim() != '') {
        irccDocument.thirdPartyTransferCondition = {
          [language]: `<div>${thirdPartyTransferCondition} </div>`,
        }
      }

      const keywords = super.processKeywords(sheet, this.fields, i, this.keywordsMapping)
      if (keywords && keywords.processedKeywords.length) {
        irccDocument.keywords = keywords.processedKeywords
        if (keywords.otherKeywords.trim().length > 0) {
          irccDocument.keywordOther = {
            [language]: keywords.otherKeywords.trim(),
          }
        }
      }

      const dateOfIssuance = super.columnVal(sheet, this.fields.date_of_issuance + i, 'w')
      const dateOfExpiry = super.columnVal(sheet, this.fields.dateOfExpiry + i, 'w')

      if (dateOfIssuance && dateOfIssuance.trim().length > 0) {
        irccDocument.dateOfIssuance = moment(dateOfIssuance).format(
          'YYYY-MM-DD'
        )
      }

      if (dateOfExpiry && dateOfExpiry.trim() != '') { irccDocument.dateOfExpiry = moment(dateOfExpiry).format('YYYY-MM-DD') }

      irccDocument.specimens = super.getELinkData(sheet, this.fields.specimens + i)
      irccDocument.taxonomies = super.getELinkData(sheet, this.fields.taxonomies + i)

      irccs.push(irccDocument)
      console.log(
        `Finish reading row ${i}, title : ${irccDocument.title[language]}`
      )
    }
    return irccs
  }

  async cacheApiCalls (): Promise<ICache> {
    const uniqueAuthorityIds = Array.from(new Set(this.authorityIds.filter(Boolean)))

    const apiCalls = uniqueAuthorityIds.map(async (uid) => {
      const uniqueId = uid.trim()
        .match(/^([a-z]+)-([a-z]+)-([a-z]+)-([0-9]+)-([0-9]+)$/i)
      if (uniqueId) {
        const document = this.kmDocumentApi.paramDocuments(uniqueId[4])
        return document
      }
      return Promise.resolve(null)
    })

    const results = await Promise.all(apiCalls)

    results.forEach((document, index) => {
      if (document) {
        const uniqueId = uniqueAuthorityIds[index].trim()
          .match(/^([a-z]+)-([a-z]+)-([a-z]+)-([0-9]+)-([0-9]+)$/i)
        if (uniqueId) {
          this.cache.fields.C[uniqueId[4]] = document
        }
      }
    })

    return this.cache
  }
}
