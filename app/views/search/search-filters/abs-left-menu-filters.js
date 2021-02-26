define(function () { 'use strict';

	var absLeftMenuFilters = {
		contact: [
			{
				type: "freeText",
				title: "Free Text",
				field: "text_EN_txt"
			},
			{
				type: "thesaurus",
				term: "countries",
				title: "Country of the person/entity to whom PIC was granted",
				fieldfn: "buildContactsUserCountryfn"
			}
		],
		focalPoint: [
			{
				type: "freeText",
				title: "Free Text",
				field: "text_EN_txt"
			}
		],
		authority: [
			{
				type: "freeText",
				title: "Free Text",
				field: "text_EN_txt"
			},
			{
				type: "thesaurus",
				term: "cnaJurisdictions",
				title: "Area of jurisdiction",
				field: "jurisdiction_s"
			},
			{
				type: "thesaurus",
				term: "cnaKeywords",
				title: "Keywords",
				field: "absGeneticResourceTypes_REL_ss"
			}
		],
		measure: [
			{
				type: "freeText",
				title: "Free Text",
				field: "text_EN_txt"
			},
			{
				type: "thesaurus",
				term: "status",
				title: "Status",
				field: "status_s"
			},
			{
				type: "thesaurus",
				term: "jurisdiction",
				title: "Jurisdiction",
				field: "jurisdiction_s"
			},
			{
				type: "date",
				title: "Date of the decision",
				field: "entryIntoForce_dt"
			},
			{
				type: "date",
				title: "Date of Adoption",
				field: "adoption_dt"
			},
			{
				type: "date",
				title: "Date measure no longer applicable",
				field: "retired_dt"
			},
			{
				type: "yesNo",
				title: "Contains model contractual clause ",
				field: "isModelContractualClause_b"
			}
		],
		absProcedure: [
			{
				type: "freeText",
				title: "Free Text",
				field: "text_EN_txt"
			}
		],
		absNationalModelContractualClause: [
			{
				type: "freeText",
				title: "Free Text",
				field: "text_EN_txt"
			}
		],
		absPermit: [
			{
				type: "freeText",
				title: "Free Text",
				field: "text_EN_txt"
			},
			{
				type: "thesaurus",
				term: "cnaJurisdictions",
				title: "Area of jurisdiction",
				field: "jurisdiction_s"
			},
			{
				type: "thesaurus",
				term: "cnaKeywords",
				title: "Keywords",
				field: "absGeneticResourceTypes_REL_ss"
			},
			{
				type: "solrRecords",
				query: {
					q: "schema_s:(contact authority)"
				},
				title: "Provider",
				field: "providers_ss"
			},
			{
				type: "thesaurus",
				term: "countries",
				title: "User country",
				field: "entitiesToWhomPICGrantedCountry_ss"
			},
			{
				type: "yesNo",
				title: "Expired permits",
				fieldfn: "buildExpiredPermitQuery"
			},
			{
				type: "date",
				title: "Date of issuance",
				field: "date_dt"
			},
			{
				type: "date",
				title: "Date of expiry",
				field: "dateOfExpiry_dt"
			}
		],
		database: [
			{
				type: "freeText",
				title: "Free Text",
				field: "text_EN_txt"
			}
		],
		absCheckpoint: [
			{
				type: "freeText",
				title: "Free Text",
				field: "text_EN_txt"
			}
		],
		absCheckpointCommunique: [
			{
				type: "freeText",
				title: "Free Text",
				field: "text_EN_txt"
			}
		],
		absNationalReport: [
			{
				type: "freeText",
				title: "Free Text",
				field: "text_EN_txt"
			}
		],
		resource: [
			{
				type: "freeText",
				title: "Free Text",
				field: "text_EN_txt"
			}
		],
		organization: [
			{
				type: "freeText",
				title: "Free Text",
				field: "text_EN_txt"
			}
		],
		capacityBuildingInitiative: [
			{
				type: "freeText",
				title: "Free Text",
				field: "text_EN_txt"
			}
		],
		capacityBuildingResource: [
			{
				type: "freeText",
				title: "Free Text",
				field: "text_EN_txt"
			}
		],
		modelContractualClause: [
			{
				type: "freeText",
				title: "Free Text",
				field: "text_EN_txt"
			}
		],
		communityProtocol: [
			{
				type: "freeText",
				title: "Free Text",
				field: "text_EN_txt"
			}
		]
	};

	return absLeftMenuFilters;

});
