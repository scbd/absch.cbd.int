import fieldsTranslations from '../app-text/views/search/search-results/common-download-schemas.json';
import { mergeTranslationKeys } from '../services/translation-merge';
const fieldsT = mergeTranslationKeys(fieldsTranslations);
export const downloadSchemas = {	
	"focalPoint" : {
       "uniqueId"         : fieldsT["focalPoint.uniqueIdentifier"],
       "government"       : fieldsT["focalPoint.country"         ],
       "name"             : fieldsT["focalPoint.name"            ],
       "type"             : fieldsT["focalPoint.type"            ],
       "function"         : fieldsT["focalPoint.function"        ],
       "department"       : fieldsT["focalPoint.department"      ],
       "organization"     : fieldsT["focalPoint.organization"    ],
       "address"          : fieldsT["focalPoint.address"         ],
       "telephone"        : fieldsT["focalPoint.telephone"       ],
       "fax"              : fieldsT["focalPoint.fax"             ],
       "emails"           : fieldsT["focalPoint.email"           ],
       "publishedOn"      : fieldsT["focalPoint.publishedOn"     ],        
    },

    "organization" : {
        "uniqueId"        : fieldsT["organization.uniqueId"        ],
        "name"            : fieldsT["organization.name"            ],
        "address"         : fieldsT["organization.address"         ],
        "phones"          : fieldsT["organization.phones"          ],
        "faxes"           : fieldsT["organization.faxes"           ],
        "emails"          : fieldsT["organization.emails"          ],
        "websites"        : fieldsT["organization.websites"        ],
        "contacts"        : fieldsT["organization.contacts"        ],
        "contactsEmails"  : fieldsT["organization.contactsEmails"  ],
        "organizationType": fieldsT["organization.organizationType"],
        "areasOfWork"     : fieldsT["organization.areasOfWork"     ],
        "publishedOn"     : fieldsT["organization.publishedOn"     ],
    },

    "authority":{
        "uniqueId"                   : fieldsT["authority.uniqueId"],
        "government"                 : fieldsT["authority.government"],
        "name"                       : fieldsT["authority.name"],
        "address"                    : fieldsT["authority.address"],
        "city"                       : fieldsT["authority.city"],
        "state"                      : fieldsT["authority.state"],
        "postalCode"                 : fieldsT["authority.postalCode"],
        "country"                    : fieldsT["authority.country"],
        "phones"                     : fieldsT["authority.phones"],
        "faxes"                      : fieldsT["authority.faxes"],
        "emails"                     : fieldsT["authority.emails"],
        "websites"                   : fieldsT["authority.websites"],
        "contacts"                   : fieldsT["authority.contacts"],
        "policyBasisForCompetencyRef": fieldsT["authority.policyBasisForCompetencyRef"],
        "responsibleForAll"          : fieldsT["authority.responsibleForAll"],
        "responsibilities"           : fieldsT["authority.responsibilities"],
        "absJurisdiction"            : fieldsT["authority.absJurisdiction"],
        "absGeneticResourceTypes"    : fieldsT["authority.absGeneticResourceTypes"],
        "relevantInformation"        : fieldsT["authority.relevantInformation"],
        "relevantDocuments"          : fieldsT["authority.relevantDocuments"],
        "functions"                  : fieldsT["authority.functions"],
        "cpbOrganismTypes"           : fieldsT["authority.cpbOrganismTypes"],
        "publishedOn"                : fieldsT["authority.publishedOn"]
    },

    "resource":{
        "uniqueId": fieldsT["resource.uniqueId"],
        "title": fieldsT["resource.title"],
        "resourceTypes": fieldsT["resource.resourceTypes"],
        "authors": fieldsT["resource.authors"],
        "publisher": fieldsT["resource.publisher"],
        "publicationDate": fieldsT["resource.publicationDate"],
        "cbdSubjects": fieldsT["resource.cbdSubjects"],
        "biosafetySubjects": fieldsT["resource.biosafetySubjects"],
        "biosafetyModifiedOrganisms": fieldsT["resource.biosafetyModifiedOrganisms"],
        "biosafetyOrganisms": fieldsT["resource.biosafetyOrganisms"],
        "biosafetyGenes": fieldsT["resource.biosafetyGenes"],
        "publishedOn": fieldsT["resource.publishedOn"]
    },

    "capacityBuildingInitiative":{
        "uniqueId"        : fieldsT["capacityBuildingInitiative.uniqueId"],
        "title"           : fieldsT["capacityBuildingInitiative.title"],
        "geographicScope" : fieldsT["capacityBuildingInitiative.geographicScope"],
        "countryRegions"  : fieldsT["capacityBuildingInitiative.countryRegions"],
        "status"          : fieldsT["capacityBuildingInitiative.status"],
        "startDate"       : fieldsT["capacityBuildingInitiative.startDate"],
        "endDate"         : fieldsT["capacityBuildingInitiative.endDate"],
        "activityScope"   : fieldsT["capacityBuildingInitiative.activityScope"],
        "categories"      : fieldsT["capacityBuildingInitiative.categories"],
        "cbdSubjects"     : fieldsT["capacityBuildingInitiative.cbdSubjects"],
        "cpbThematicAreas": fieldsT["capacityBuildingInitiative.cpbThematicAreas"],
        "publishedOn"     : fieldsT["capacityBuildingInitiative.publishedOn"]
	}
}