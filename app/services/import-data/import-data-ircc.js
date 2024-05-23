import { ImportDataBase } from "./import-data-base";
import hash from "object-hash";

export class ImportDataIRCC extends ImportDataBase {
  fields = {
    language: "A",
    country: "B",
    cna: "C",
    permit_equivalent: "D",
    date_of_issuance: "E",
    dateOfExpiry: "F",
    provider: {
      type: "G",
      existing: "H",
      orgName_firstName: "I",
      acronym_lastName: "J",
      address: "K",
      city: "L",
      country: "M",
      email: "N",
    },
    pic: {
      consent: "O",
      type: "P",
      existing: "Q",
      orgName_firstName: "R",
      acronym_lastName: "S",
      address: "T",
      city: "U",
      country: "V",
      email: "W",
    },

    matConset: "X",
    subject_matter: "Y",
    keywords: "Z",
    specimens: "AA",
    taxonomies: "AB",

    usage: "AC",
    usageDescription: "AD",
    conditions_third_party_transfer: "AE",

    permitFiles: "AF",
    additional_information: "AG",
  };
  cache = {
    fields: {
      C: {},
    },
  };
  languageMappings = {
    arabic: "ar",
    english: "en",
    spanish: "es",
    french: "fr",
    russian: "ru",
    chinese: "zh",
  };
  usageMapping = {
    commercial: "5E833A3F-87D1-4ADD-8701-9F1B76383017",
    noncommercial: "60EA2F49-A9DD-406F-921A-8A1C9AA8DFDD",
  };
  keywordsMapping = [
    {
      identifier: "4E2974DF-216E-46C8-8797-8E3A33D6A048",
      name: "All types of genetic resources",
      title: {
        en: "All types of genetic resources",
        es: "Todos los tipos de recursos genéticos",
        fr: "Tous types de ressources génétiques",
        ar: "جميع أنواع الموارد الجينية",
        ru: "Все типы генетических ресурсов",
        zh: "各类遗传资源",
      },
      shortTitle: {},
      description: "",
      source: "",
      broaderTerms: [],
      narrowerTerms: [
        "357DBB22-6A6C-4C49-BA1F-037320B09247",
        "9C146B09-097E-4CFF-B9CC-D4785496952F",
        "33A6BF46-3699-4B5E-A3C0-506FAFDA2D76",
        "http://data.gbif.org/species/13140807",
        "F9EF6CC8-3709-43D5-839C-1A93A23DE51B",
        "2D2CAF72-A892-42CE-87F7-975EFBADAF4F",
      ],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "357DBB22-6A6C-4C49-BA1F-037320B09247",
      name: "Plants",
      title: {
        en: "Plants",
        es: "Plantas",
        fr: "Plantes",
        ar: "النباتات",
        ru: "Растения",
        zh: "植物",
      },
      shortTitle: {},
      description: "This includes algae",
      source: "",
      broaderTerms: ["4E2974DF-216E-46C8-8797-8E3A33D6A048"],
      narrowerTerms: [],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "9C146B09-097E-4CFF-B9CC-D4785496952F",
      name: "Animals",
      title: {
        en: "Animals",
        es: "Animales",
        fr: "Animaux",
        ar: "الحيوانات",
        ru: "Животные",
        zh: "动物",
      },
      shortTitle: {},
      description: "",
      source: "",
      broaderTerms: ["4E2974DF-216E-46C8-8797-8E3A33D6A048"],
      narrowerTerms: [],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "33A6BF46-3699-4B5E-A3C0-506FAFDA2D76",
      name: "Microorganism",
      title: {
        en: "Microorganism",
        es: "Microorganismos",
        fr: "Micro-organismes",
        ar: "الكائنات الدقيقة",
        ru: "Микроорганизмы",
        zh: "微生物",
      },
      shortTitle: {},
      description:
        "This could include, among others, archae, bacteria, fungi, chromista, protozoa and viruses.",
      source: "",
      broaderTerms: ["4E2974DF-216E-46C8-8797-8E3A33D6A048"],
      narrowerTerms: [],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "http://data.gbif.org/species/13140807",
      name: "Fungi",
      title: {
        en: "Fungi",
        es: "Hongos",
        fr: "Champignons",
        ar: "الفطريات",
        ru: "Грибы",
        zh: "真菌",
      },
      shortTitle: {},
      description: "",
      source: "GBIF",
      broaderTerms: ["4E2974DF-216E-46C8-8797-8E3A33D6A048"],
      narrowerTerms: [],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "F9EF6CC8-3709-43D5-839C-1A93A23DE51B",
      name: "Domesticated species and/or cultivated species",
      title: {
        en: "Domesticated species and/or cultivated species",
        es: "Especies domesticadas y/o especies cultivadas",
        fr: "Espèces domestiques et/ou cultivées",
        ar: "الأنواع الأليفة و/أو الأنواع المستزرعة",
        ru: "Одомашненные виды и/или культивируемые виды",
        zh: "驯化物种和/或栽培物种",
      },
      shortTitle: {},
      description: "",
      source: "",
      broaderTerms: ["4E2974DF-216E-46C8-8797-8E3A33D6A048"],
      narrowerTerms: [],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "2D2CAF72-A892-42CE-87F7-975EFBADAF4F",
      name: "Wild species",
      title: {
        en: "Wild species",
        es: "Especies silvestres",
        fr: "Espèces sauvages",
        ar: "الأجناس البرية",
        ru: "Дикие виды",
        zh: "野生物种",
      },
      shortTitle: {},
      description: "",
      source: "",
      broaderTerms: ["4E2974DF-216E-46C8-8797-8E3A33D6A048"],
      narrowerTerms: [],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "A862ABFC-B97D-4E6A-9A70-812A82A7CC19",
      name: "All areas of access of the genetic resource",
      title: {
        en: "All areas of access of the genetic resource",
        es: "Todas las zonas de acceso de los recursos genéticos",
        fr: "Tous les aires d’accès aux ressources génétiques",
        ar: "جميع مناطق الحصول على الموارد الجينية",
        ru: "Все области, имеющие отношение к доступу к генетическим ресурсам",
        zh: "获取遗传资源的所有地区",
      },
      shortTitle: {},
      description: "",
      source: "",
      broaderTerms: [],
      narrowerTerms: [
        "2C87B4AD-684C-48DC-91B7-82938CE37B5A",
        "CB918E1A-E171-4C10-BA35-088C81F668A3",
      ],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "35E029ED-D92F-41C8-9CDC-52F3F35D7E36",
      name: "Agricultural areas",
      title: {
        en: "Agricultural areas",
        es: "Zonas agrícolas",
        fr: "Aires agricoles",
        ar: "المناطق الزراعية",
        ru: "Сельскохозяйственные районы",
        zh: "农业区",
      },
      shortTitle: {},
      description: "",
      source: "",
      broaderTerms: [],
      narrowerTerms: [],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "D570A745-D8C3-4698-BB77-0A90C140F3F2",
      name: "Forest",
      title: {
        en: "Forest",
        es: "Bosques",
        fr: "Forêts",
        ar: "الغابات",
        ru: "Леса",
        zh: "森林",
      },
      shortTitle: {},
      description: "",
      source: "",
      broaderTerms: [],
      narrowerTerms: [],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "47DD3FF6-D369-4E64-B0BC-5DADF3B70C95",
      name: "Inland waters",
      title: {
        en: "Inland waters",
        es: "Aguas continentales",
        fr: "Eaux continentales",
        ar: "المياه الداخلية",
        ru: "Внутренние воды",
        zh: "内陆水域",
      },
      shortTitle: {},
      description: "",
      source: "",
      broaderTerms: [],
      narrowerTerms: [],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "29C670AB-C198-484F-A2ED-9BAB1DAC7431",
      name: "Dry and sub-humid areas",
      title: {
        en: "Dry and sub-humid areas",
        es: "Zonas áridas y subhúmedas",
        fr: "Terres arides et sub-humides",
        ar: "المناطق الجافة وشبه الرطبة",
        ru: "Засушливые и субгумидные районы",
        zh: "干旱和半湿润地区",
      },
      shortTitle: {},
      description: "",
      source: "",
      broaderTerms: [],
      narrowerTerms: [],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "507D46E0-DC49-47F0-B273-26ECD9CC8948",
      name: "Marine and coastal areas",
      title: {
        en: "Marine and coastal areas",
        es: "Zonas marinas y costeras",
        fr: "Biodiversité marine et côtière",
        ar: "المناطق البحرية والساحلية",
        ru: "Морские и прибрежные районы",
        zh: "海洋和沿海地区",
      },
      shortTitle: {},
      description: "",
      source: "",
      broaderTerms: [],
      narrowerTerms: [],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "EAE641FD-6A82-4C15-84CD-0F12ABA5CBC1",
      name: "Mountains",
      title: {
        en: "Mountains",
        es: "Montañas",
        fr: "Montagnes",
        ar: "الجبال",
        ru: "Горы",
        zh: "山区",
      },
      shortTitle: {},
      description: "",
      source: "",
      broaderTerms: [],
      narrowerTerms: [],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "DFEECF62-EC3D-4F5C-BAC6-2FD308F81277",
      name: "Protected areas",
      title: {
        en: "Protected areas",
        es: "Las áreas protegidas",
        fr: "Aires protégées",
        ar: "المناطق المحمية",
        ru: "Охраняемые районы",
        zh: "保护区",
      },
      shortTitle: {},
      description: "",
      source: "",
      broaderTerms: [],
      narrowerTerms: [],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "9EC60226-A7E4-441E-AC7D-2580F111EC3B",
      name: "Islands",
      title: {
        en: "Islands",
        es: "Islas",
        fr: "Îles",
        ar: "الجزر",
        ru: "Острова",
        zh: "岛屿",
      },
      shortTitle: {},
      description: "",
      source: "",
      broaderTerms: [],
      narrowerTerms: [],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "2C87B4AD-684C-48DC-91B7-82938CE37B5A",
      name: "Ex-situ",
      title: {
        en: "Ex-situ",
        es: "Ex situ",
        fr: "Ex-situ",
        ar: "خارج الموقع الطبيعي",
        ru: "Ex-situ",
        zh: "迁地",
      },
      shortTitle: {},
      description: "",
      source: "",
      broaderTerms: ["A862ABFC-B97D-4E6A-9A70-812A82A7CC19"],
      narrowerTerms: [],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "CB918E1A-E171-4C10-BA35-088C81F668A3",
      name: "Soil and/or water samples",
      title: {
        en: "Soil and/or water samples",
        es: "Muestras de suelo y/o de agua",
        fr: "Échantillon de sol/eau",
        ar: "عينات التربة و/أو المياه",
        ru: "Образцы почв и/или воды",
        zh: "土样和/或水样",
      },
      shortTitle: {},
      description: "",
      source: "",
      broaderTerms: ["A862ABFC-B97D-4E6A-9A70-812A82A7CC19"],
      narrowerTerms: [],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
    {
      identifier: "B8A150E054154AD3AD97856ABD485E90",
      name: "Traditional knowledge associated with genetic resources",
      title: {
        en: "Traditional knowledge associated with genetic resources",
        es: "Conocimientos tradicionales asociados a recursos genéticos",
        fr: "Connaissances traditionnelles associées aux ressources génétiques",
        ar: "المعارف التقليدية المرتبطة بالموارد الجينية",
        ru: "Традиционные знания, связанные с генетическими ресурсами",
        zh: "遗传资源相关传统知识",
      },
      shortTitle: {},
      description: "",
      source: "",
      broaderTerms: [],
      narrowerTerms: [],
      relatedTerms: [],
      nonPreferedTerms: [],
    },
  ];
  language;
  government;
  countries;
  realm;
  workbook;
  authorityIds = [];
  contacts = [];
  hashedValue = {};
  static ROW_LIMIT=10

  constructor( realm, language, government, workbook, auth) {
      super(auth);
      this.realm = realm;
      this.government = government;
      this.workbook = workbook;
      this.language = language;
  }

  readSheetToDisplayOnUI(sheetNames, selectedSheetIndex){
    let sheet =  this.workbook.Sheets[sheetNames[selectedSheetIndex]];
    const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // ToDo: use the  this.workbook.Sheets
    const rowCount = ((excelData.filter(row => row.some(cell => cell !== undefined && cell !== null && cell !== '')).length) - 2) + 3;
    const data = []
    let limit = 10; 
    const TotalCount = rowCount > limit ? limit + 3 : rowCount + 3;
    for(let i = 4; i <= TotalCount; i++){
      if(super.columnVal(sheet, this.fields.language + i)){
        const value = {
          rowId: i - 3,
          fileError: null
        }
        const processField = (field, fieldName, isNested = false, parentFieldName = null) =>{
          if (typeof field === 'object' && !isNested) {
            value[fieldName] = {};
            for (const subField in field) {
              processField(field[subField], subField, true, fieldName);
            }
          } else if (isNested) {
            value[parentFieldName][fieldName] = this.columnVal(sheet, this.fields[parentFieldName][fieldName] + i);
          } else {
            value[fieldName] = this.columnVal(sheet, field + i);
          }
        };

        for (const fieldName in this.fields) {
          processField(this.fields[fieldName], fieldName);
>>>>>>> a109512bb (Coded generic table header and body)
        }

        data.push(value);
      }
    }

    return data;
  }

  processField(sheet, field, fieldName, i, value, isNested = false, parentFieldName = null) {
    if (typeof field === 'object' && !isNested) {
      value[fieldName] = {};
      for (const subField in field) {
        this.processField(sheet, field[subField], subField, i, value, true, fieldName);
      }
    } else if (isNested) {
      value[parentFieldName][fieldName] = this.columnVal(sheet, this.fields[parentFieldName][fieldName] + i);
    } else {
      value[fieldName] = this.columnVal(sheet, field + i);
    }
  }

  async fileParser(sheetNames, selectedSheetIndex){
    try {
      let sheet;
      let language;
      
      sheet = this.workbook.Sheets[sheetNames[selectedSheetIndex]];
      const hashed = hash(sheet);
      
      if(this.hashedValue[sheetNames[selectedSheetIndex]] === hashed){
        return {
          duplicate: true
        }
      }
      
      this.hashedValue[sheetNames[selectedSheetIndex]] = hashed;
      
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });// ToDo: use the  this.workbook.Sheets
      const rowCount = ((excelData.filter(row => row.some(cell => cell !== undefined && cell !== null && cell !== '')).length) - 2) + 3;

      let irccs = [];
      let limit = 10; // number of rows to load
      const TotalCount = rowCount > limit ? limit + 3 : rowCount + 3;
      for(let i=4; i<=TotalCount; i++){
        this.authorityIds.push(super.columnVal(sheet, this.fields.cna + i))
      } 
      await this.cacheApiCalls();

      for(let i=4;i<=TotalCount;i++){
        if (!super.columnVal(sheet, this.fields.language + i)) {
          console.log(
            `Language is missing for record on row ${i}, skipping record.`
          );
          continue;
        }

        language =
          this.languageMappings[super.columnVal(sheet, this.fields.language + i).toLowerCase()]; //||language;

        let picGranted =
            super.columnVal(sheet, this.fields.pic.consent + i).toLowerCase() == "yes";
        let matEstablished =
            super.columnVal(sheet, this.fields.matConset + i).toLowerCase() == "yes";

        if (!picGranted || !matEstablished) {
          console.log(`Pic or Mat not consented for record on row ${i}.`);
        }
        let authorityId = await super.findByUid(super.columnVal(sheet, this.fields.cna + i),this.cache, this.fields.cna);

        let provider = { type: super.columnVal(sheet, this.fields.provider.type + i) };
        let pic = { type: super.columnVal(sheet, this.fields.pic.type + i) };
        let usage = super.columnVal(sheet, this.fields.usage + i);

        if (provider.type != "confidential") {
          provider.identifiers = await super.findOrCreateContact(
            this.contacts,
            sheet,
            language,
            i,
            this.fields.provider,
            this.government
          );
        }

        if (pic.type != "confidential") {
          pic.identifiers = await super.findOrCreateContact(
            this.contacts,
            sheet,
            language,
            i,
            this.fields.pic,
            this.government
          );
        }

        let irccDocument = {
          header: {
            identifier: this.guid(),
            schema: "absPermit",
            languages: [language],
          },
          government: { identifier: this.government },
          absCNA: { identifier: authorityId },
          title: {
            [language]: super.columnVal(sheet, this.fields.permit_equivalent + i),
          },
          providersConfidential: provider.type.toLowerCase() == "confidential",
          providers: provider.identifiers,
          picGranted: picGranted,
          matEstablished: matEstablished,
          usages:
            usage.toLowerCase() == "confidential"
              ? undefined
              : [
                  {
                    identifier:
                      this.usageMapping[
                        super.columnVal(sheet, this.fields.usage + i).replace("-", "")
                      ],
                  },
                ],
          usagesConfidential: usage.toLowerCase() == "confidential",
          usagesDescription: {
            [language]: `<div>${super.columnVal(
              sheet,
              this.fields.usageDescription + i
            )} </div>`,
          },

          entitiesToWhomPICGrantedConfidential:
            pic.type.toLowerCase() == "confidential",
          entitiesToWhomPICGranted: pic.identifiers,
        };

        const subjectMatter = super.columnVal(sheet, this.fields.subject_matter + i);
        const thirdPartyTransferCondition = super.columnVal(
          sheet,
          this.fields.conditions_third_party_transfer + i
        );
        if ((subjectMatter || "").trim() != "")
          irccDocument.subjectMatter = {
            [language]: `<div>${subjectMatter} </div>`,
          };

        if ((thirdPartyTransferCondition || "").trim() != "")
          irccDocument.thirdPartyTransferCondition = {
            [language]: `<div>${thirdPartyTransferCondition} </div>`,
          };

        let keywords = super.processKeywords(sheet,this.fields, i, this.keywordsMapping);
        if (keywords && keywords.processedKeywords.length) {
          irccDocument.keywords = keywords.processedKeywords;
          if (keywords.otherKeywords.trim() != "")
            irccDocument.keywordOther = {
              [language]: keywords.otherKeywords.trim(),
            };
        }

        let dateOfIssuance = super.columnVal(sheet, this.fields.date_of_issuance + i, "w");
        let dateOfExpiry = super.columnVal(sheet, this.fields.dateOfExpiry + i, "w");

        if (dateOfIssuance && dateOfIssuance.trim() != "")
          irccDocument.dateOfIssuance = moment(dateOfIssuance).format(
            "YYYY-MM-DD"
          );

        if (dateOfExpiry && dateOfExpiry.trim() != "")
          irccDocument.dateOfExpiry = moment(dateOfExpiry).format("YYYY-MM-DD");

        irccDocument.specimens = super.getELinkData(sheet, this.fields.specimens + i);
        irccDocument.taxonomies = super.getELinkData(sheet, this.fields.taxonomies + i);

        irccs.push(irccDocument);
        console.log(
          `Finish reading row ${i}, title : ${irccDocument.title[language]}`
        );
      }
        return irccs
      } catch (error) {
        throw error;
      }  
  }

 async cacheApiCalls() {
    const uniqueAuthorityIds = Array.from(new Set(this.authorityIds.filter(Boolean)));
  
    const apiCalls = uniqueAuthorityIds.map(async (uid) => {
      const uniqueId = uid.trim()
        .match(/^([a-z]+)-([a-z]+)-([a-z]+)-([0-9]+)-([0-9]+)$/i);
      const document = this.kmDocumentApi.paramDocuments(uniqueId[4]);
      return document;
    });
  
    const results = await Promise.all(apiCalls);
  
    results.forEach((document, index) => {
      const uniqueId = uniqueAuthorityIds[index].trim()
        .match(/^([a-z]+)-([a-z]+)-([a-z]+)-([0-9]+)-([0-9]+)$/i);
      this.cache.fields.C[uniqueId[4]] = document;
    });
  
    return this.cache;
  }
}
