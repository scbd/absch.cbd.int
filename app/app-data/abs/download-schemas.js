import fieldsT from '../../app-text/views/search/search-results/abs-download-schemas.json';
import { downloadSchemas as commonDownloadSchemas } from '../common-download-schemas';

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
        "taxonomies"                  : fieldsT["absPermit.taxonomies"                 ],
        "usages"                      : fieldsT["absPermit.usages"                     ],
        "usagesDescription"           : fieldsT["absPermit.usagesDescription"          ],
        "thirdPartyTransferCondition" : fieldsT["absPermit.thirdPartyTransferCondition"],
        "permitFiles"                 : fieldsT["absPermit.permitFiles"                ],
        "permitDescription"           : fieldsT["absPermit.permitDescription"          ],
        "relevantInformation"         : fieldsT["absPermit.relevantInformation"        ],
    },
}

