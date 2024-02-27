import fieldsT from '../app-text/views/search/search-results/common-download-schemas.json';

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
    }
}

