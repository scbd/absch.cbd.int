import * as XLSX from 'xlsx'
import _ from 'lodash'
import moment from 'moment'
import KmDocumentApi from './km-document'

interface Fields {
  language: string;
  country: string;
  cna: string;
  permit_equivalent: string;
  date_of_issuance: string;
  dateOfExpiry: string;
  provider: ProviderPic;
  pic: ProviderPic;
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

interface ProviderPic {
  type: string;
  existing: string;
  orgName_firstName: string;
  acronym_lastName: string;
  address: string;
  city: string;
  country: string;
  email: string;
}

const fields: Fields = {
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

const cache: { fields: { C: { [key: string]: any } } } = {
  fields: {
    C: {}
  },
}

function columnVal (sheet: XLSX.WorkSheet, column: string, t?: string): string {
  return ((sheet[column] || {})[t || 'v'] || '').trim()
}

const languageMappings: { [key: string]: string } = {
  arabic: 'ar',
  english: 'en',
  spanish: 'es',
  french: 'fr',
  russian: 'ru',
  chinese: 'zh',
}

// SPECIFIC TO IRCC
const usageMapping: { [key: string]: string } = {
  commercial: '5E833A3F-87D1-4ADD-8701-9F1B76383017',
  noncommercial: '60EA2F49-A9DD-406F-921A-8A1C9AA8DFDD',
}

// SPECIFIC TO IRCC
const keywordsMapping: any[] = [
  {
    identifier: '4E2974DF-216E-46C8-8797-8E3A33D6A048',
    name: 'All types of genetic resources',
    title: {
      en: 'All types of genetic resources',
      es: 'Todos los tipos de recursos genéticos',
      fr: 'Tous types de ressources génétiques',
      ar: 'جميع أنواع الموارد الجينية',
      ru: 'Все типы генетических ресурсов',
      zh: '各类遗传资源',
    },
    shortTitle: {},
    description: '',
    source: '',
    broaderTerms: [],
    narrowerTerms: [
      '357DBB22-6A6C-4C49-BA1F-037320B09247',
      '9C146B09-097E-4CFF-B9CC-D4785496952F',
      '33A6BF46-3699-4B5E-A3C0-506FAFDA2D76',
      'http://data.gbif.org/species/13140807',
      'F9EF6CC8-3709-43D5-839C-1A93A23DE51B',
      '2D2CAF72-A892-42CE-87F7-975EFBADAF4F',
    ],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: '357DBB22-6A6C-4C49-BA1F-037320B09247',
    name: 'Plants',
    title: {
      en: 'Plants',
      es: 'Plantas',
      fr: 'Plantes',
      ar: 'النباتات',
      ru: 'Растения',
      zh: '植物',
    },
    shortTitle: {},
    description: 'This includes algae',
    source: '',
    broaderTerms: ['4E2974DF-216E-46C8-8797-8E3A33D6A048'],
    narrowerTerms: [],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: '9C146B09-097E-4CFF-B9CC-D4785496952F',
    name: 'Animals',
    title: {
      en: 'Animals',
      es: 'Animales',
      fr: 'Animaux',
      ar: 'الحيوانات',
      ru: 'Животные',
      zh: '动物',
    },
    shortTitle: {},
    description: '',
    source: '',
    broaderTerms: ['4E2974DF-216E-46C8-8797-8E3A33D6A048'],
    narrowerTerms: [],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: '33A6BF46-3699-4B5E-A3C0-506FAFDA2D76',
    name: 'Microorganism',
    title: {
      en: 'Microorganism',
      es: 'Microorganismos',
      fr: 'Micro-organismes',
      ar: 'الكائنات الدقيقة',
      ru: 'Микроорганизмы',
      zh: '微生物',
    },
    shortTitle: {},
    description:
      'This could include, among others, archae, bacteria, fungi, chromista, protozoa and viruses.',
    source: '',
    broaderTerms: ['4E2974DF-216E-46C8-8797-8E3A33D6A048'],
    narrowerTerms: [],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: 'http://data.gbif.org/species/13140807',
    name: 'Fungi',
    title: {
      en: 'Fungi',
      es: 'Hongos',
      fr: 'Champignons',
      ar: 'الفطريات',
      ru: 'Грибы',
      zh: '真菌',
    },
    shortTitle: {},
    description: '',
    source: 'GBIF',
    broaderTerms: ['4E2974DF-216E-46C8-8797-8E3A33D6A048'],
    narrowerTerms: [],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: 'F9EF6CC8-3709-43D5-839C-1A93A23DE51B',
    name: 'Domesticated species and/or cultivated species',
    title: {
      en: 'Domesticated species and/or cultivated species',
      es: 'Especies domesticadas y/o especies cultivadas',
      fr: 'Espèces domestiques et/ou cultivées',
      ar: 'الأنواع الأليفة و/أو الأنواع المستزرعة',
      ru: 'Одомашненные виды и/или культивируемые виды',
      zh: '驯化物种和/或栽培物种',
    },
    shortTitle: {},
    description: '',
    source: '',
    broaderTerms: ['4E2974DF-216E-46C8-8797-8E3A33D6A048'],
    narrowerTerms: [],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: '2D2CAF72-A892-42CE-87F7-975EFBADAF4F',
    name: 'Wild species',
    title: {
      en: 'Wild species',
      es: 'Especies silvestres',
      fr: 'Espèces sauvages',
      ar: 'الأجناس البرية',
      ru: 'Дикие виды',
      zh: '野生物种',
    },
    shortTitle: {},
    description: '',
    source: '',
    broaderTerms: ['4E2974DF-216E-46C8-8797-8E3A33D6A048'],
    narrowerTerms: [],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: 'A862ABFC-B97D-4E6A-9A70-812A82A7CC19',
    name: 'All areas of access of the genetic resource',
    title: {
      en: 'All areas of access of the genetic resource',
      es: 'Todas las zonas de acceso de los recursos genéticos',
      fr: 'Tous les aires d’accès aux ressources génétiques',
      ar: 'جميع مناطق الحصول على الموارد الجينية',
      ru: 'Все области, имеющие отношение к доступу к генетическим ресурсам',
      zh: '获取遗传资源的所有地区',
    },
    shortTitle: {},
    description: '',
    source: '',
    broaderTerms: [],
    narrowerTerms: [
      '2C87B4AD-684C-48DC-91B7-82938CE37B5A',
      'CB918E1A-E171-4C10-BA35-088C81F668A3',
    ],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: '35E029ED-D92F-41C8-9CDC-52F3F35D7E36',
    name: 'Agricultural areas',
    title: {
      en: 'Agricultural areas',
      es: 'Zonas agrícolas',
      fr: 'Aires agricoles',
      ar: 'المناطق الزراعية',
      ru: 'Сельскохозяйственные районы',
      zh: '农业区',
    },
    shortTitle: {},
    description: '',
    source: '',
    broaderTerms: [],
    narrowerTerms: [],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: 'D570A745-D8C3-4698-BB77-0A90C140F3F2',
    name: 'Forest',
    title: {
      en: 'Forest',
      es: 'Bosques',
      fr: 'Forêts',
      ar: 'الغابات',
      ru: 'Леса',
      zh: '森林',
    },
    shortTitle: {},
    description: '',
    source: '',
    broaderTerms: [],
    narrowerTerms: [],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: '47DD3FF6-D369-4E64-B0BC-5DADF3B70C95',
    name: 'Inland waters',
    title: {
      en: 'Inland waters',
      es: 'Aguas continentales',
      fr: 'Eaux continentales',
      ar: 'المياه الداخلية',
      ru: 'Внутренние воды',
      zh: '内陆水域',
    },
    shortTitle: {},
    description: '',
    source: '',
    broaderTerms: [],
    narrowerTerms: [],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: '29C670AB-C198-484F-A2ED-9BAB1DAC7431',
    name: 'Dry and sub-humid areas',
    title: {
      en: 'Dry and sub-humid areas',
      es: 'Zonas áridas y subhúmedas',
      fr: 'Terres arides et sub-humides',
      ar: 'المناطق الجافة وشبه الرطبة',
      ru: 'Засушливые и субгумидные районы',
      zh: '干旱和半湿润地区',
    },
    shortTitle: {},
    description: '',
    source: '',
    broaderTerms: [],
    narrowerTerms: [],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: '507D46E0-DC49-47F0-B273-26ECD9CC8948',
    name: 'Marine and coastal areas',
    title: {
      en: 'Marine and coastal areas',
      es: 'Zonas marinas y costeras',
      fr: 'Biodiversité marine et côtière',
      ar: 'المناطق البحرية والساحلية',
      ru: 'Морские и прибрежные районы',
      zh: '海洋和沿海地区',
    },
    shortTitle: {},
    description: '',
    source: '',
    broaderTerms: [],
    narrowerTerms: [],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: 'EAE641FD-6A82-4C15-84CD-0F12ABA5CBC1',
    name: 'Mountains',
    title: {
      en: 'Mountains',
      es: 'Montañas',
      fr: 'Montagnes',
      ar: 'الجبال',
      ru: 'Горы',
      zh: '山区',
    },
    shortTitle: {},
    description: '',
    source: '',
    broaderTerms: [],
    narrowerTerms: [],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: 'DFEECF62-EC3D-4F5C-BAC6-2FD308F81277',
    name: 'Protected areas',
    title: {
      en: 'Protected areas',
      es: 'Las áreas protegidas',
      fr: 'Aires protégées',
      ar: 'المناطق المحمية',
      ru: 'Охраняемые районы',
      zh: '保护区',
    },
    shortTitle: {},
    description: '',
    source: '',
    broaderTerms: [],
    narrowerTerms: [],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: '9EC60226-A7E4-441E-AC7D-2580F111EC3B',
    name: 'Islands',
    title: {
      en: 'Islands',
      es: 'Islas',
      fr: 'Îles',
      ar: 'الجزر',
      ru: 'Острова',
      zh: '岛屿',
    },
    shortTitle: {},
    description: '',
    source: '',
    broaderTerms: [],
    narrowerTerms: [],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: '2C87B4AD-684C-48DC-91B7-82938CE37B5A',
    name: 'Ex-situ',
    title: {
      en: 'Ex-situ',
      es: 'Ex situ',
      fr: 'Ex-situ',
      ar: 'خارج الموقع الطبيعي',
      ru: 'Ex-situ',
      zh: '迁地',
    },
    shortTitle: {},
    description: '',
    source: '',
    broaderTerms: ['A862ABFC-B97D-4E6A-9A70-812A82A7CC19'],
    narrowerTerms: [],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: 'CB918E1A-E171-4C10-BA35-088C81F668A3',
    name: 'Soil and/or water samples',
    title: {
      en: 'Soil and/or water samples',
      es: 'Muestras de suelo y/o de agua',
      fr: 'Échantillon de sol/eau',
      ar: 'عينات التربة و/أو المياه',
      ru: 'Образцы почв и/или воды',
      zh: '土样和/或水样',
    },
    shortTitle: {},
    description: '',
    source: '',
    broaderTerms: ['A862ABFC-B97D-4E6A-9A70-812A82A7CC19'],
    narrowerTerms: [],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
  {
    identifier: 'B8A150E054154AD3AD97856ABD485E90',
    name: 'Traditional knowledge associated with genetic resources',
    title: {
      en: 'Traditional knowledge associated with genetic resources',
      es: 'Conocimientos tradicionales asociados a recursos genéticos',
      fr: 'Connaissances traditionnelles associées aux ressources génétiques',
      ar: 'المعارف التقليدية المرتبطة بالموارد الجينية',
      ru: 'Традиционные знания, связанные с генетическими ресурсами',
      zh: '遗传资源相关传统知识',
    },
    shortTitle: {},
    description: '',
    source: '',
    broaderTerms: [],
    narrowerTerms: [],
    relatedTerms: [],
    nonPreferedTerms: [],
  },
]

let language: string
let government: string
let countries: any[]
let kmDocumentApi: KmDocumentApi
const authorityIds: string[] = []

// SPECIFIC TO BASE
export const readSheet = (file: File): Promise<{ sheetNames: string[], workbook: XLSX.WorkBook }> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader()
      reader.readAsBinaryString(file)
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const data = e.target?.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const sheetNames = Object.keys(workbook.Sheets)
        resolve({ sheetNames, workbook })
      }
    } catch (error) {
      reject(error)
    }
  })
}

export const fileParser = async (realm: string, lang: string, govt: string, workbook: XLSX.WorkBook, sheetNames: string[], selectedSheetIndex: number, auth: any): Promise<any[]> => {
  return new Promise(async (resolve, reject) => {
    language = lang
    government = govt
    // SPECIFIC TO BASE
    kmDocumentApi = new KmDocumentApi({ tokenReader: () => auth.token() })
    try {
      let sheet: XLSX.WorkSheet
      let currentLanguage: string
      sheet = workbook.Sheets[sheetNames[selectedSheetIndex]]
      const rows = Number(sheet['!ref']?.split(':')[1].replace(/[a-z]+/i, ''))
      const irccs: any[] = []
      const contacts: any[] = []

      // CACHE values
      for (let i = 4; i < rows; i++) {
        authorityIds.push(columnVal(sheet, fields.cna + i))
      }
      await cacheApiCalls()

      for (let i = 4; i < rows; i++) {
        if (!columnVal(sheet, fields.language + i)) {
          console.log(
            `Language is missing for record on row ${i}, skipping record.`
          )
          continue
        }

        currentLanguage =
          languageMappings[columnVal(sheet, fields.language + i).toLowerCase()] // ||language;

        const picGranted =
          columnVal(sheet, (fields.pic as any).consent + i).toLowerCase() == 'yes'
        const matEstablished =
          columnVal(sheet, fields.matConset + i).toLowerCase() == 'yes'

        if (!picGranted || !matEstablished) {
          console.log(`Pic or Mat not consented for record on row ${i}.`)
          // continue;
        }
        const authorityId = await findByUid(columnVal(sheet, fields.cna + i), 'C')

        const provider: { type: string, identifiers?: any[] } = { type: columnVal(sheet, fields.provider.type + i) }
        const pic: { type: string, identifiers?: any[] } = { type: columnVal(sheet, fields.pic.type + i) }
        const usage = columnVal(sheet, fields.usage + i)

        if (provider.type != 'confidential') {
          provider.identifiers = await findOrCreateContact(
            contacts,
            sheet,
            realm,
            currentLanguage,
            i,
            fields.provider
          )
        }

        if (pic.type != 'confidential') {
          pic.identifiers = await findOrCreateContact(
            contacts,
            sheet,
            realm,
            currentLanguage,
            i,
            fields.pic
          )
        }

        const irccDocument: any = {
          header: {
            identifier: guid(),
            schema: 'absPermit',
            languages: [currentLanguage],
          },
          government: { identifier: government },
          absCNA: { identifier: authorityId },
          title: {
            [currentLanguage]: columnVal(sheet, fields.permit_equivalent + i),
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
                      usageMapping[
                        columnVal(sheet, fields.usage + i).replace('-', '')
                      ],
                  },
                ],
          usagesConfidential: usage.toLowerCase() == 'confidential',
          usagesDescription: {
            [currentLanguage]: `<div>${columnVal(
              sheet,
              fields.usageDescription + i
            )} </div>`,
          },

          entitiesToWhomPICGrantedConfidential:
            pic.type.toLowerCase() == 'confidential',
          entitiesToWhomPICGranted: pic.identifiers,
        }

        const subjectMatter = columnVal(sheet, fields.subject_matter + i)
        const thirdPartyTransferCondition = columnVal(
          sheet,
          fields.conditions_third_party_transfer + i
        )
        if ((subjectMatter || '').trim() != '') {
          irccDocument.subjectMatter = {
            [currentLanguage]: `<div>${subjectMatter} </div>`,
          }
        }

        if ((thirdPartyTransferCondition || '').trim() != '') {
          irccDocument.thirdPartyTransferCondition = {
            [currentLanguage]: `<div>${thirdPartyTransferCondition} </div>`,
          }
        }

        const keywords = processKeywords(sheet, i)
        if (keywords && keywords.processedKeywords.length) {
          irccDocument.keywords = keywords.processedKeywords
          if (keywords.otherKeywords.trim() != '') {
            irccDocument.keywordOther = {
              [currentLanguage]: keywords.otherKeywords.trim(),
            }
          }
        }

        const dateOfIssuance = columnVal(sheet, fields.date_of_issuance + i, 'w')
        const dateOfExpiry = columnVal(sheet, fields.dateOfExpiry + i, 'w')

        if (dateOfIssuance && dateOfIssuance.trim() != '') {
          irccDocument.dateOfIssuance = moment(dateOfIssuance).format(
            'YYYY-MM-DD'
          )
        }

        if (dateOfExpiry && dateOfExpiry.trim() != '') { irccDocument.dateOfExpiry = moment(dateOfExpiry).format('YYYY-MM-DD') }

        irccDocument.specimens = getELinkData(sheet, fields.specimens + i)
        irccDocument.taxonomies = getELinkData(sheet, fields.taxonomies + i)

        irccs.push(irccDocument)
        console.log(
          `Finish reading row ${i}, title : ${irccDocument.title[currentLanguage]}`
        )
      }
      resolve(irccs)
    } catch (error) {
      reject(error)
    }
  })
}

function guid (): string {
  function S4 (): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (
    'SIMP-' +
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  ).toUpperCase()
}

async function getCountryIso (country: string, language: string): Promise<string | undefined> {
  if (!countries) { countries = await kmDocumentApi.queryCountries() }

  if (countries) {
    const mCountry = _.find(countries, (c) => {
      return c.name[language].toLowerCase() == country
    })
    if (mCountry) return mCountry.code
  }
}

async function findByUid (uniqueId: string, field: string = ''): Promise<string | undefined> {
  const uid = uniqueId
    .trim()
    .match(/^([a-z]+)-([a-z]+)-([a-z]+)-([0-9]+)-([0-9]+)$/i)
  let document: any = null
  if (uid && cache.fields[field as keyof typeof cache.fields][uid[4]]) {
    document = cache.fields[field as keyof typeof cache.fields][uid[4]]
  } else if (uid) {
    document = await kmDocumentApi.paramDocuments(uid[4])
  }

  if (document && uid) return document.header.identifier + '@' + uid[5]
}

async function findOrCreateContact (
  contacts: any[],
  sheet: XLSX.WorkSheet,
  realm: string,
  language: string,
  i: number,
  fields: ProviderPic
): Promise<any[]> {
  let contact: any

  if (columnVal(sheet, fields.existing + i).trim() != '') {
    const contactIds: any[] = []
    const existingContacts = columnVal(sheet, fields.existing + i).split(',')

    for (let j = 0; j < existingContacts.length; j++) {
      contactIds.push({ identifier: await findByUid(existingContacts[j]) })
    }
    return contactIds
  } else {
    contact = {
      header: {
        identifier: guid(),
        schema: 'contact',
        languages: [language],
      },
      government: { identifier: government },
      emails: (columnVal(sheet, fields.email + i) || '').split(','),
    }

    const type = columnVal(sheet, fields.type + i)
    let name = ''

    if (type.toLowerCase() == 'organization') {
      if (columnVal(sheet, fields.orgName_firstName + i).trim() != '')
      // org name
      { name = columnVal(sheet, fields.orgName_firstName + i).trim() }

      contact.type = 'organization'
      contact.organization = { [language]: name.trim() }
      contact.organizationAcronym = {
        [language]: columnVal(sheet, fields.acronym_lastName + i).trim(),
      }
    } else {
      // if(columnVal(sheet, fields.salutation+i).trim()!='') //salutation
      //     name = columnVal(sheet, fields.salutation+i).trim();

      if (columnVal(sheet, fields.orgName_firstName + i).trim() != '')
      // firstname
      {
        name =
          name + ' ' + columnVal(sheet, fields.orgName_firstName + i).trim()
      }

      if (columnVal(sheet, fields.acronym_lastName + i).trim() != '')
      // lastname
      {
        name =
          name + ' ' + columnVal(sheet, fields.acronym_lastName + i).trim()
      }

      contact.type = 'person'
      // contact.prefix      = { [language] : columnVal(sheet, fields.csalutation+i).trim() };
      contact.firstName = columnVal(sheet, fields.orgName_firstName + i).trim()
      contact.lastName = columnVal(sheet, fields.acronym_lastName + i).trim()
    }

    const mCountry = await getCountryIso(
      columnVal(sheet, fields.country + i)
        .trim()
        .toLowerCase(),
      language
    )
    if (mCountry) contact.country = { identifier: mCountry.toLowerCase() }
    contact.address = {
      [language]: columnVal(sheet, fields.address + i).trim(),
    }
  }

  // contact.prefix    == con.prefix   &&
  const exists = _.find(contacts, function (con) {
    return (
      (con.type.toLowerCase() == 'organization' &&
        (contact.organization || {})[language] ==
          (con.organization || {})[language]) ||
      (con.type.toLowerCase() == 'person' &&
        contact.firstName == con.firstName &&
        contact.lastName == con.lastName)
    )
  })

  if (exists) return [{ identifier: exists.header.identifier }]

  contacts.push(contact)

  return [{ identifier: contact.header.identifier }]
}

function processKeywords (sheet: XLSX.WorkSheet, i: number): { processedKeywords: any[], otherKeywords: string } {
  const processedKeywords: any[] = []
  let otherKeywords = ''
  const keywords = columnVal(sheet, fields.keywords + i)
    .trim()
    .split(',')
  // console.log(keywords);

  _.each(keywords, (keyword) => {
    if (keyword.trim() != '') {
      const mapping = _.find(keywordsMapping, (map) => {
        return map.name.toLowerCase() == keyword.toLowerCase().trim()
      })
      if (mapping) {
        processedKeywords.push({ identifier: mapping.identifier })
      } else {
        processedKeywords.push({
          identifier: '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED',
        })
        otherKeywords += ` ${keyword}`
      }
    }
  })

  return { processedKeywords, otherKeywords }
}

function getELinkData (sheet: XLSX.WorkSheet, column: string): { url: string }[] | undefined {
  const val = columnVal(sheet, column).trim()

  if (val != '') {
    const links = val.split(',')
    return _.map(links, (l) => {
      return { url: l }
    })
  }
}

async function cacheApiCalls (): Promise<any> {
  const uniqueAuthorityIds = Array.from(new Set(authorityIds.filter(Boolean)))

  const apiCalls = uniqueAuthorityIds.map(async (uid) => {
    // API CALL
    const uniqueId = uid.trim()
      .match(/^([a-z]+)-([a-z]+)-([a-z]+)-([0-9]+)-([0-9]+)$/i)
    if (uniqueId) {
      const document = kmDocumentApi.paramDocuments(uniqueId[4])
      return document
    }
    return Promise.resolve(null)
  })

  const results = await Promise.all(apiCalls)

  // Assuming kmDocumentApi.paramDocuments returns an object, you can then update cache.fields.C
  results.forEach((document, index) => {
    if (document) {
      const uniqueId = uniqueAuthorityIds[index].trim()
        .match(/^([a-z]+)-([a-z]+)-([a-z]+)-([0-9]+)-([0-9]+)$/i)
      if (uniqueId) { cache.fields.C[uniqueId[4]] = document }
    }
  })

  return cache
}
