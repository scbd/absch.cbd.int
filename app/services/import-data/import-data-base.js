import * as XLSX from "xlsx";
import _ from "lodash";
import KmDocumentApi from "../../api/km-document";

export class ImportDataBase {
    kmDocumentApi;
    countries;

    constructor(auth){
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
    return ((sheet[column] || {})[t || "v"] || "").trim();
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
    // console.log(keywords);
  
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
          //org name
          name = this.columnVal(sheet, fields.orgName_firstName + i).trim();
  
        contact.type = "organization";
        contact.organization = { [language]: name.trim() };
        contact.organizationAcronym = {
          [language]: this.columnVal(sheet, fields.acronym_lastName + i).trim(),
        };
      } else {
        // if(columnVal(sheet, fields.salutation+i).trim()!='') //salutation
        //     name = columnVal(sheet, fields.salutation+i).trim();
  
        if (this.columnVal(sheet, fields.orgName_firstName + i).trim() != "")
          //firstname
          name =
            name + " " + this.columnVal(sheet, fields.orgName_firstName + i).trim();
  
        if (this.columnVal(sheet, fields.acronym_lastName + i).trim() != "")
          //lastname
          name =
            name + " " + this.columnVal(sheet, fields.acronym_lastName + i).trim();
  
        contact.type = "person";
        // contact.prefix      = { [language] : columnVal(sheet, fields.csalutation+i).trim() };
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
  
    // contact.prefix    == con.prefix   &&
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
}
