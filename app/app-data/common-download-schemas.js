import fieldsTranslations from '../app-text/views/search/search-results/common-download-schemas.json';
import { mergeTranslationKeys } from '../services/translation-merge';
const fieldsT = mergeTranslationKeys(fieldsTranslations);
export const downloadSchemas = {	
	"focalPoint" : {
       "uniqueId"         : fieldsT["uniqueId"],
       "government"       : fieldsT["country"         ],
       "name"             : fieldsT["focalPoint.name"            ],
       "type"             : fieldsT["focalPoint.type"            ],
       "function"         : fieldsT["focalPoint.function"        ],
       "department"       : fieldsT["focalPoint.department"      ],
       "organization"     : fieldsT["organization"    ],
       "address"          : fieldsT["focalPoint.address"         ],
       "telephone"        : fieldsT["focalPoint.telephone"       ],
       "fax"              : fieldsT["focalPoint.fax"             ],
       "emails"           : fieldsT["focalPoint.email"           ],
       "publishedOn"      : fieldsT["publishedOn"     ],        
    },

    "organization" : {
        "uniqueId"        : fieldsT["uniqueId"        ],
        "name"            : fieldsT["organization.name"            ],
        "address"         : fieldsT["organization.address"         ],
        "phones"          : fieldsT["organization.phones"          ],
        "faxes"           : fieldsT["organization.faxes"           ],
        "emails"          : fieldsT["organization.emails"          ],
        "websites.url"        : fieldsT["organization.websites"        ],
        "contacts"        : fieldsT["organization.contacts"        ],
        "contactsEmails"  : fieldsT["organization.contactsEmails"  ],
        "organizationType": fieldsT["organization.organizationType"],
        "areasOfWork"     : fieldsT["organization.areasOfWork"     ],
        "publishedOn"     : fieldsT["publishedOn"     ],
    },
    "resource":{
        "uniqueId"                  : fieldsT["resource.uniqueId"],
        "title"                     : fieldsT["title"],
        "resourceTypes"             : fieldsT["resource.resourceTypes"],
        "authors"                   : fieldsT["resource.authors"],
        "publisher"                 : fieldsT["resource.publisher"],
        "publicationDate"           : fieldsT["publishedOn"],
        "source"                    : fieldsT["resource.source"],
        "rights"                    : fieldsT["resource.rights"],
        "resourceLinks"             : fieldsT["resource.resourceLinks"],
        "covers"                    : fieldsT["resource.covers"],
        "summary"                   : fieldsT["resource.summary"],
        "countryRegions"            : fieldsT["resource.countryRegions"],
        "aichiTargets"              : fieldsT["resource.aichiTargets"],
        "nagoyaKeyAreas"            : fieldsT["resource.nagoyaKeyAreas"],
        "cbdSubjects"               : fieldsT["resource.cbdSubjects"],
        "biosafetySubjects"         : fieldsT["resource.biosafetySubjects"],
        "biosafetyModifiedOrganisms": fieldsT["resource.biosafetyModifiedOrganisms"],
        "biosafetyOrganisms"        : fieldsT["resource.biosafetyOrganisms"],
        "biosafetyGenes"            : fieldsT["resource.biosafetyGenes"],
        "publishedOn"               : fieldsT["publishedOn"],
        "organizations"             : fieldsT["resource.organizations"]
    },

  "database":{
    "uniqueId": fieldsT["uniqueId"],
    "government": fieldsT["country"],
    "title": fieldsT["database.title"],
    "description": fieldsT["database.description"],
    "websites.url": fieldsT["database.websites"],
    "relevantInformation": fieldsT["database.relevantInformation"],
    "relevantDocuments.url": fieldsT["database.relevantDocuments"]
  },

  "contact":{
    "uniqueId"           : fieldsT["uniqueId"],
    "type"               : fieldsT["contact.type"],
    "organization"       : fieldsT["organization"],
    "organizationAcronym": fieldsT["contact.organizationAcronym"],
    "organizationType"   : fieldsT["contact.organizationType"],
    "prefix"             : fieldsT["contact.prefix"],
    "firstName"          : fieldsT["contact.firstName"],
    "middleName"         : fieldsT["contact.middleName"],
    "lastName"           : fieldsT["contact.lastName"],
    "contactOrganization": fieldsT["organization"],
    "department"         : fieldsT["contact.department"],
    "designation"        : fieldsT["contact.designation"],
    "address"            : fieldsT["contact.address"],
    "city"               : fieldsT["contact.city"],
    "state"              : fieldsT["contact.state"],
    "postalCode"         : fieldsT["contact.postalCode"],
    "country"            : fieldsT["contact.country"],
    "phones"             : fieldsT["contact.phones"],
    "faxes"              : fieldsT["contact.faxes"],
    "emails"             : fieldsT["contact.emails"],
    "websites.url"           : fieldsT["contact.websites"]
  }
        
}
