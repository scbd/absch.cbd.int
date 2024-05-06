import fieldsTranslations from '~/app-text/views/search/search-results/abs-download-schemas.json';
import { mergeTranslationKeys } from '../../services/translation-merge';
import { downloadSchemas as commonDownloadSchemas } from '~/app-data/common-download-schemas';
const fieldsT = mergeTranslationKeys(fieldsTranslations);
export const downloadSchemas = {	
	...commonDownloadSchemas,
	
    "absPermit" : {
        "uniqueId"                    : fieldsT["absPermit.uniqueId"                   ],
        "government"                  : fieldsT["absPermit.government"                 ],
        "absCNALink"                     : fieldsT["absPermit.absCNALink"                    ],
        "permitReference"             : fieldsT["absPermit.permitReference"            ],
        "referenceToNationalPermit"   : fieldsT["absPermit.referenceToNationalPermit"  ],
        "relatedIRCCs"                : fieldsT["absPermit.relatedIRCCs"               ],
        "dateOfIssuance"              : fieldsT["absPermit.dateOfIssuance"             ],
        "dateOfExpiry"                : fieldsT["absPermit.dateOfExpiry"               ],
        "providersLink"               : fieldsT["absPermit.providersLink"              ],
        "picGranted"                  : fieldsT["absPermit.picGranted"                 ],
        "entitiesToWhomPICGrantedLink": fieldsT["absPermit.entitiesToWhomPICGrantedLink"],
        "picInformation"              : fieldsT["absPermit.picInformation"             ],
        "matEstablished"              : fieldsT["absPermit.matEstablished"             ],
        "matInformation"              : fieldsT["absPermit.matInformation"             ],
        "subjectMatter"               : fieldsT["absPermit.subjectMatter"              ],
        "keywords"                    : fieldsT["absPermit.keywords"                   ],
        "specimens"                   : fieldsT["absPermit.specimens"                  ],
        "taxonomies"                 : fieldsT["absPermit.taxonomies"                 ],
        "usages"                     : fieldsT["absPermit.usages"                     ],
        "usagesDescription"          : fieldsT["absPermit.usagesDescription"          ],
        "thirdPartyTransferCondition": fieldsT["absPermit.thirdPartyTransferCondition"],
        "permitFiles"                : fieldsT["absPermit.permitFiles"                ],
        "permitDescription"          : fieldsT["absPermit.permitDescription"          ],
        "relevantInformation"        : fieldsT["absPermit.relevantInformation"        ],
    },

    "absCheckpointCommunique":{
        "uniqueId"                             : fieldsT["absCheckpointCommunique.uniqueId"],
        "government"                           : fieldsT["absCheckpointCommunique.government"],
        "publishedOn"                          : fieldsT["absCheckpointCommunique.publishedOn"],
        "title"                                : fieldsT["absCheckpointCommunique.title"],
        "absCheckpoints"                       : fieldsT["absCheckpointCommunique.absCheckpoints"],
        "absCheckpointCommunique.dateCollected": fieldsT["dateCollected"],
        "absIRCCsNotAvailable"                 : fieldsT["absCheckpointCommunique.absIRCCsNotAvailable"],
        "absIRCCs"                             : fieldsT["absCheckpointCommunique.absIRCCs"],
        "sourceCountries"                      : fieldsT["absCheckpointCommunique.sourceCountries"],
        "subjectMatter"                        : fieldsT["absCheckpointCommunique.subjectMatter"],
        "entityWhoGrantedPIC"                  : fieldsT["absCheckpointCommunique.entityWhoGrantedPIC"],
        "evidenceOfPIC"                        : fieldsT["absCheckpointCommunique.evidenceOfPIC"],
        "evidenceOfMAT"                        : fieldsT["absCheckpointCommunique.evidenceOfMAT"],
        "description"                          : fieldsT["absCheckpointCommunique.description"],
        "dateOfAccess"                         : fieldsT["absCheckpointCommunique.dateOfAccess"],
        "type"                                 : fieldsT["type"],
        "name"                                 : fieldsT["name"],
        "address"                              : fieldsT["address"],
        "postalCode"                           : fieldsT["postalCode"],
        "city"                                 : fieldsT["city"],
        "state"                                : fieldsT["state"],
        "country"                              : fieldsT["country"],
        "phones"                               : fieldsT["phones"],
        "emails"                               : fieldsT["emails"],
        "websites"                             : fieldsT["websites"]
    },
    
    "absProcedure":{
        "uniqueId": fieldsT["absProcedure.uniqueId"],
        "government": fieldsT["absProcedure.government"],
        "name": fieldsT["absProcedure.name"],
        "jurisdiction": fieldsT["absProcedure.jurisdiction"],
        "contacts": fieldsT["absProcedure.contacts"],
        "requirements": fieldsT["absProcedure.requirements"],
        "description": fieldsT["absProcedure.description"],
        "hasApplicationDocuments": fieldsT["absProcedure.hasApplicationDocuments"],
        "hasApplicationFees": fieldsT["absProcedure.hasApplicationFees"],
        "duration": fieldsT["absProcedure.duration"],
        "relevantMeasures": fieldsT["absProcedure.relevantMeasures"],
        "keywords": fieldsT["absProcedure.keywords"]
    }
}
