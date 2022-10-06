import fieldsT from '~/app-text/views/search/search-results/abs-download-fields.json';

export const downloadFields = {	
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
    "absPermit" : {
        "government"                  : fieldsT["absPermit.government"                  ],
        "cnaLink"                     : fieldsT["absPermit.cnaLink"                     ],
        "permitReference"             : fieldsT["absPermit.permitReference"             ],
        "dateOfIssuance"              : fieldsT["absPermit.dateOfIssuance"              ],
        "dateOfExpiry"                : fieldsT["absPermit.dateOfExpiry"                ],
        "providersLink"               : fieldsT["absPermit.providersLink"               ],
        "picGranted"                  : fieldsT["absPermit.picGranted"                  ],
        "entitiesToWhomPICGrantedLink": fieldsT["absPermit.entitiesToWhomPICGrantedLink"],
        "matEstablished"              : fieldsT["absPermit.matEstablished"              ],
        "subjectMatter"               : fieldsT["absPermit.subjectMatter"               ],
        "keywords"                    : fieldsT["absPermit.keywords"                    ],
        "specimens"                   : fieldsT["absPermit.specimens"                   ],
        "taxonomies"                  : fieldsT["absPermit.taxonomies"                  ],
        "usages"                      : fieldsT["absPermit.usages"                      ],
        "usagesDescription"           : fieldsT["absPermit.usagesDescription"           ],
        "thirdPartyTransferCondition" : fieldsT["absPermit.thirdPartyTransferCondition" ],
        "permitFiles"                 : fieldsT["absPermit.permitFiles"                 ],
        "relevantInformation"         : fieldsT["absPermit.relevantInformation"         ],
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
    }
}

