import bchFields from '~/app-text/views/search/search-results/bch-download-fields.json';

export const downloadFields = {	
	"focalPoint" : {
       "uniqueId"         : bchFields["focalPoint.uniqueIdentifier"],
       "government"       : bchFields["focalPoint.country"         ],
       "name"             : bchFields["focalPoint.name"            ],
       "type"             : bchFields["focalPoint.type"            ],
       "function"         : bchFields["focalPoint.function"        ],
       "department"       : bchFields["focalPoint.department"      ],
       "organization"     : bchFields["focalPoint.organization"    ],
       "address"          : bchFields["focalPoint.address"         ],
       "telephone"        : bchFields["focalPoint.telephone"       ],
       "fax"              : bchFields["focalPoint.fax"             ],
       "emails"           : bchFields["focalPoint.email"           ],
       "publishedOn"      : bchFields["focalPoint.publishedOn"     ],        
    },

    "organization" : {
        "uniqueId"        : bchFields["organization.uniqueId"        ],
        "name"            : bchFields["organization.name"            ],
        "address"         : bchFields["organization.address"         ],
        "phones"          : bchFields["organization.phones"          ],
        "faxes"           : bchFields["organization.faxes"           ],
        "emails"          : bchFields["organization.emails"          ],
        "websites"        : bchFields["organization.websites"        ],
        "contacts"        : bchFields["organization.contacts"        ],
        "contactsEmails"  : bchFields["organization.contactsEmails"  ],
        "organizationType": bchFields["organization.organizationType"],
        "areasOfWork"     : bchFields["organization.areasOfWork"     ],
        "publishedOn"     : bchFields["organization.publishedOn"     ],
    }
}

