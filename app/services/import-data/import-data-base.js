import * as XLSX from "xlsx";
import _ from "lodash";
import KmDocumentApi from "../../api/km-document";
import axios from "axios";

export class ImportDataBase {
    kmDocumentApi;
    countries;
    auth;

    constructor(auth){
      this.auth = auth;
      this.kmDocumentApi = new KmDocumentApi({tokenReader:()=>auth.token()});
    }


  readSheet(file) {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          var sheetNames = Object.keys(workbook.Sheets);
          resolve({ sheetNames, workbook });
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  columnVal(sheet, column, t) {
    return ((sheet[column] || {})[t || "w"] || "").trim();
  }

  getELinkData(sheet, column) {
    let val = this.columnVal(sheet, column).trim();
  
    if (val != "") {
      var links = val.split(",");
      return _.map(links, (l) => {
        return { url: l };
      });
    }
  }

  processKeywords(sheet, fields, i, keywordsMapping) {
    let processedKeywords = [];
    let otherKeywords = "";
    let keywords = this.columnVal(sheet, fields.keywords + i)
      .trim()
      .split(",");
  
    _.each(keywords, (keyword) => {
      if (keyword.trim() != "") {
        var mapping = _.find(keywordsMapping, (map) => {
          return map.name.toLowerCase() == keyword.toLowerCase().trim();
        });
        if (mapping) {
          processedKeywords.push({ identifier: mapping.identifier });
        } else {
          processedKeywords.push({
            identifier: "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
          });
          otherKeywords += ` ${keyword}`;
        }
      }
    });
  
    return { processedKeywords, otherKeywords };
  }

  processField(fields, field, fieldName, isNested = false, parentFieldName = null){
    if (typeof field === 'object' && !isNested) {
      value[fieldName] = {};
      for (const subField in field) {
        this.processField(fields, field[subField], subField, true, fieldName);
      }
    } else if (isNested) {
      value[parentFieldName][fieldName] = this.columnVal(sheet, fields[parentFieldName][fieldName] + i);
    } else {
      value[fieldName] = this.columnVal(sheet, field + i);
    }
  };

  async findByUid(uniqueId, cache, field = "") {
    let uid = uniqueId
                    .trim()
                    .match(/^([a-z]+)-([a-z]+)-([a-z]+)-([0-9]+)-([0-9]+)$/i);
    let document = null;
    if(cache.fields[field][uid[4]]){
      document = cache.fields[field][uid[4]]
    }else{
      document = await this.kmDocumentApi.paramDocuments(uniqueId[4])
    }
  
    if (document) return document.header.identifier + "@" + uid[5];
  }

  async getCountryIso(country, language) {
    if (!this.countries)
      this.countries = await this.kmDocumentApi.queryCountries();
  
    if (this.countries) {
      let mCountry = _.find(this.countries, (c) => {
        return c.name[language].toLowerCase() == country;
      });
      if (mCountry) return mCountry.code;
    }
  }

  guid() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (
      "SIMP-" + S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()
    ).toUpperCase();
  }

  async findOrCreateContact(contacts, sheet, language, i, fields, government) {
    let contact;
  
    if (this.columnVal(sheet, fields.existing + i).trim() != "") {
      let contactIds = [];
      let existingContacts = this.columnVal(sheet, fields.existing + i).split(",");
      console.log("EXISTING CONTACT", existingContacts, existingContacts.length)
      for (let j = 0; j < existingContacts.length; j++) {
        contactIds.push({ identifier: await this.findByUid(existingContacts[j]) });
      }
      return contactIds;
    } else {
      contact = {
        header: {
          identifier: this.guid(),
          schema: "contact",
          languages: [language],
        },
        government: { identifier: government },
        emails: (this.columnVal(sheet, fields.email + i) || "").split(","),
      };
  
      let type = this.columnVal(sheet, fields.type + i);
      let name = "";
  
      if (type.toLowerCase() == "organization") {
        if (this.columnVal(sheet, fields.orgName_firstName + i).trim() != "")
          name = this.columnVal(sheet, fields.orgName_firstName + i).trim();
  
        contact.type = "organization";
        contact.organization = { [language]: name.trim() };
        contact.organizationAcronym = {
          [language]: this.columnVal(sheet, fields.acronym_lastName + i).trim(),
        };
      } else {
        if (this.columnVal(sheet, fields.orgName_firstName + i).trim() != "")
          name =
            name + " " + this.columnVal(sheet, fields.orgName_firstName + i).trim();
  
        if (this.columnVal(sheet, fields.acronym_lastName + i).trim() != "")
          name =
            name + " " + this.columnVal(sheet, fields.acronym_lastName + i).trim();
  
        contact.type = "person";
        contact.firstName = this.columnVal(sheet, fields.orgName_firstName + i).trim();
        contact.lastName = this.columnVal(sheet, fields.acronym_lastName + i).trim();
      }
  
      var mCountry = await this.getCountryIso(
        this.columnVal(sheet, fields.country + i)
          .trim()
          .toLowerCase(),
        language
      );
      if (mCountry) contact.country = { identifier: mCountry.toLowerCase() };
      contact.address = {
        [language]: this.columnVal(sheet, fields.address + i).trim(),
      };
    }
  
    let exists = _.find(contacts, function(con) {
      return (
        (con.type.toLowerCase() == "organization" &&
          (contact.organization || {})[language] ==
            (con.organization || {})[language]) ||
        (con.type.toLowerCase() == "person" &&
          contact.firstName == con.firstName &&
          contact.lastName == con.lastName)
      );
    });
  
    if (exists) return [{ identifier: exists.header.identifier }];
    contacts.push(contact);
  
    return [{ identifier: contact.header.identifier }];
  }

  async validateNationalRecord(document){
    if(!document)
        return;
        try{
            // let url = `/api/v2013/documents/x/validate`

            // let irccRequest = await request.put(url)
            //                         .query({schema:document.header.schema})
            //                         .set(headers)
            //                         .send(document);
            let request = await axios.put(`/api/v2013/documents/x/validate`, document, {
              params:{schema: document.header.schema},
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;Charset=utf-8',
                'realm': 'ABS-DEV',
                'Authorization': `Ticket ${this.auth.token()}`
              }
            })
            // let request = await this.kmDocumentApi.validateDocument(document);
    
            if(request.status == 200 ){

                var result = request.body
                if((result.errors||[]).length){
                    return false;
                }                
                return true;                
            }

            return false;
                        
        }
        catch(err){
            throw err;
        }
    };

    async createNationalRecord(document, isDraft){
        if(!document)
            return;
    
            try{
                let url = `/api/v2013/documents/${document.header.identifier}`
    
                if(isDraft)
                    url += '/versions/draft'
                // let irccRequest = await request.put(url)
                //                         .query({schema:document.header.schema})
                //                         .set(headers)
                //                         .send(document);

                // let irccRequest = await axios.put(url, document, {
                //   params:{schema: document.header.schema},
                //   headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json;Charset=utf-8',
                //     'realm': 'ABS-DEV',
                //     'Authorization': `Ticket ${this.auth.token()}`
                //   }
                // })

                let irccRequest = await this.kmDocumentApi.createNationalRecord(document.header.identifier,document.header.schema, isDraft)         
                return irccRequest.body;
            }
            catch(err){
                throw err;
            }
    };

    async writeFile(contacts, documents){
        let errorCount = 0;
        for (let index = 0; index < contacts.length; index++) {
            const element = contacts[index];
            var isValid = await this.validateNationalRecord(element)
            if(!isValid)
                errorCount++;
        }
        
        for (let index = 0; index < documents.length; index++) {
            const element = documents[index];
            var isValid = await this.validateNationalRecord(element)
        }
        if(errorCount > 0){
            return;
        }
        
        for (let index = 0; index < contacts.length; index++) {
            const element = contacts[index];
            await this.createNationalRecord(element, false)
        }
        
        for (let index = 0; index < documents.length; index++) {
            const element = documents[index];
            await this.createNationalRecord(element, true)
        }
        return errorCount;
    }
}
