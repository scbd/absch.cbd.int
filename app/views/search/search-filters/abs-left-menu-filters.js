import absFilters from '~/app-data/abs/abs-left-menu-filters.json';

export const absLeftMenuFilters = {
	"contact" : [{
			"type": "freeText",
			"title": absFilters.freeText,
			"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "cnaJurisdictions",
			"title": absFilters.contactType,
			"field": "type_s"
		},
		{
			"type": "thesaurus",
			"term": "cnaJurisdictions",
			"title": absFilters.contactOrganizationType,
			"field": "organizationType_s"
		},
		{
			"type": "thesaurus",
			"term": "countries",
			"title": absFilters.contactAddressCountry,
			"field": "country_s"
		}
	],
	"focalPoint" : [{
			"type": "freeText",
			"title": absFilters.freeText,
			"field": "text_EN_txt"
		},
		{
			"type": "customListFn",
			"fn": "getFocalPointTypes",
			"title": absFilters.focalPointAdditionalResponsibilities,
			"field": "type_ss"
		}
		
	],
	"authority" : [{
		"type": "freeText",
		"title": absFilters.freeText,
		"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "cnaJurisdictions",
			"title": absFilters.areaOfJurisdiction,
			"field": "jurisdiction_s"
		},
		{
			"type": "thesaurus",
			"term": "cnaKeywords",
			"title": absFilters.keywords,
			"field": "absGeneticResourceTypes_REL_ss"
		},
		{
			"type": "yesNo",
			"title": absFilters.authorityIsResponsibleForAll,
			"field": "isResponsibleForAll_b"
		}
	],
	"measure" : [{
		"type": "freeText",
		"title": absFilters.freeText,
		"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "status",
			"title": absFilters.measureLegalStatus,
			"field": "status_s"
		},
		{
			"type": "thesaurus",
			"term": "jurisdiction",
			"title": absFilters.jurisdiction,
			"field": "jurisdiction_s"
		},
		{
			"type": "date",
			"title": absFilters.measureEntryIntoForce,
			"field": "entryIntoForce_dt"
		},
		{
			"type": "date",
			"title": absFilters.measureDateOfAdoption,
			"field": "adoption_dt"
		},
		{
			"type": "date",
			"title": absFilters.measureDateOfRetired,
			"field": "retired_dt"
		},
		{
			"type": "yesNo",
			"title": absFilters.measureIsModelContractualClause,
			"field": "isModelContractualClause_b"
		}
	],
	"absProcedure" : [{
		"type": "freeText",
		"title": absFilters.freeText,
		"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "absSubjects",
			"title": absFilters.keywords,
			"field": "jurisdiction_ss"
		},
		{
			"type": "thesaurus",
			"term": "cnaJurisdictions",
			"title": absFilters.jurisdiction,
			"field": "jurisdiction_ss"
		}
	],
	"absNationalModelContractualClause" : [{
		"type": "freeText",
		"title": absFilters.freeText,
		"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "absSubjects",
			"title": absFilters.keywords,
			"field": "jurisdiction_ss"
		},
		{
			"type": "thesaurus",
			"term": "cnaJurisdictions",
			"title": absFilters.jurisdiction,
			"field": "jurisdiction_ss"
		}
	],
	"absPermit" : [{
		"type": "freeText",
		"title": absFilters.freeText,
		"field": "text_EN_txt"
		},
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(contact authority)",
				"sort":"title_s"
			},
			"title": absFilters.absPermitIssuingAuthority,
			"field": "absCNA_ss"
		},
		{
			"type": "thesaurus",
			"term": "cnaJurisdictions",
			"title": absFilters.areaOfJurisdiction,
			"field": "jurisdiction_s"
		},
		{
			"type": "thesaurus",
			"term": "cnaKeywords",
			"title": absFilters.absPermitSubjectMK,
			"field": "absGeneticResourceTypes_REL_ss"
		},
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(contact authority)",
				"sort":"title_s"
			},
			"title": absFilters.provider,
			"field": "providers_ss"
		},
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(contact contact)",
				"sort":"title_s"
			},
			"title": absFilters.absPermitEntitiesToWhomPICGranted,
			"field": "entitiesToWhomPICGranted_ss"
		},
		{
			"type": "thesaurus",
			"term": "countries",
			"title": absFilters.absPermitCountries,
			"field": "entitiesToWhomPICGrantedCountry_ss"
		},
		{
			"type": "thesaurus",
			"term": "usage",
			"title": absFilters.usage,
			"field": "usages_ss"
		},
		{
			"type": "yesNo",
			"title": absFilters.absPermitNeedToBuild,
			"field": "needtobuild"
		},
		{
			"type": "yesNo",
			"title": absFilters.absPermitExpiredPermits,
			"fieldfn": "buildExpiredPermitQuery"
		},
		{
			"type": "date",
			"title": absFilters.absPermitDateOfIssuance,
			"field": "date_dt"
		},
		{
			"type": "date",
			"title": absFilters.absPermitDateOfExpiry,
			"field": "dateOfExpiry_dt"
		}
	],
	"database" : [{
		"type": "freeText",
		"title": absFilters.freeText,
		"field": "text_EN_txt"
		}
	],
	"absCheckpoint" : [{
			"type": "freeText",
			"title": absFilters.freeText,
			"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "cnaJurisdictions",
			"title": absFilters.jurisdiction,
			"field": "jurisdiction_s"
		}
	],
	"absCheckpointCommunique" : [{
		"type": "freeText",
		"title": absFilters.freeText,
		"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "countries",
			"title": absFilters.absCCSourceCountry,
			"field": "sourceCountry_ss",
			"comments" : "TODO: need to dd sountryCountry from IRCC"
		},
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(absCheckpoint)",
				"sort":"title_s"
			},
			"title": absFilters.absCCCheckpointGranted,
			"field": "_ss"
		},
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(contact absPermit)",
				"sort":"title_s"
			},
			"title": absFilters.absCCRIC,
			"field": "_ss"
		},		
		{
			"type": "date",
			"title": absFilters.absCCDateOfGranted,
			"field": "date_dt"
		},
		{
			"type": "date",
			"title": absFilters.absCCDateOfAccess,
			"field": "dateOfExpiry_dt"
		},
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(contact authority)",
				"sort":"title_s"
			},
			"title": absFilters.provider,
			"field": "providers_ss"
		},
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(contact contact)",
				"sort":"title_s"
			},
			"title": absFilters.absPermitEntitiesToWhomPICGranted,
			"field": "entitiesToWhomPICGranted_ss"
		},
		{
			"type": "thesaurus",
			"term": "countries",
			"title": absFilters.absPermitCountries,
			"field": "entitiesToWhomPICGrantedCountry_ss"
		},
		{
			"type": "thesaurus",
			"term": "cnaKeywords",
			"title": absFilters.keywords,
			"field": "absGeneticResourceTypes_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "usage",
			"title": absFilters.absCCCUsages,
			"field": "usages_ss"
		},
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(contact)",
				"sort":"title_s"
			},
			"title": absFilters.absCCCQuery,
			"field": "entitiesToWhomPICGranted_ss"
		},
		{
			"type": "yesNo",
			"title": absFilters.absCCCNeedToBuild,
			"field": "needtobuild"
		}
	],
	"absNationalReport" : [{
		"type": "freeText",
		"title": absFilters.freeText,
		"field": "text_EN_txt"
		}],
	"resource": [
		{
			"type": "freeText",
			"title": absFilters.freeText,
			"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "resourceTypesVlr",
			"title": absFilters.typesOFResource,
			"field": "resourceTypes_ss",
			"relatedField":"resourceTypes_REL_ss"
		},
		{
			"type": "date",
			"title": absFilters.publicationDate,
			"field": "publicationDate_dt"
		},
		{
			"type": "thesaurus",
			"term": "languages",
			"title": absFilters.languageOfResource,
			"field": "resourceLinksLanguage_ss"
		},
		{
			"type": "thesaurus",
			"term": "aichiTargets",
			"title": absFilters.aichiTargets,
			"field": "bchSubjects_ss",
			"relatedField":"bchSubjects_REL_ss"
		},
		{
			"type" : "customListFn",
			"fn"   : "cbdSubjectsCustomFn",
			"title": absFilters.cbdSubjectAreas,
			"field": "cbdSubjects_ss",
			"relatedField":"cbdSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "absSubjects",
			"title": absFilters.absKeywords,
			"field": "absSubjects_ss",
			"relatedField":"absSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "keyAreas",
			"title": absFilters.absKeyAreas,
			"field": "absKeyAreas_ss",
			"relatedField":"absKeyAreas_REL_ss"
		}
	],
	"organization" : [{
		"type": "freeText",
		"title": absFilters.freeText,
		"field": "text_EN_txt"
		}],
	"capacityBuildingResource" : [{
		"type": "freeText",
		"title": absFilters.freeText,
		"field": "text_EN_txt"
		}],
	"capacityBuildingInitiative": [
		{
			"type": "freeText",
			"title": absFilters.freeText,
			"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "jurisdictions",
			"title": absFilters.cbiGeographicScope,
			"field": "scope_s",
			"otherTerm":false
		},
		{
			"type": "thesaurus",
			"term": "cbiStatus",
			"title": absFilters.cbiStatus,
			"field": "status_s"
		},
		{
			"type": "thesaurus",
			"term": "cbiCats",
			"title": absFilters.cbiCats,
			"field": "categories_ss",
			"relatedField":"categories_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "cbiAudience",
			"title": absFilters.cbiAudience,
			"field": "targetGroups_ss",
			"relatedField":"targetGroups_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "keyAreas",
			"title": absFilters.cbiTAkeyAreas,
			"field": "absKeyAreas_ss",
			"relatedField":"absKeyAreas_REL_ss"
		},
		{
			"type" : "customListFn",
			"fn"   : "cbdSubjectsCustomFn",
			"title": absFilters.cbdSubjectAreas,
			"field": "cbdSubjects_ss",
			"relatedField":"cbdSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "cbiFundingsrc",
			"title": absFilters.cbiFundingsrc,
			"field": "fundingSourceTypes_ss",
			"relatedField":"fundingSourceTypes_REL_ss"
		}
	],
	"communityProtocol" : [
		{
			"type": "freeText",
			"title": absFilters.freeText,
			"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "cppResourceTypes",
			"title": absFilters.typesOFResource,
			"field": "resourceTypes_ss",
			"relatedField":"resourceTypes_REL_ss"
		},
		{
			"type": "date",
			"title": absFilters.publicationDate,
			"field": "publicationDate_dt"
		},
		{
			"type": "thesaurus",
			"term": "languages",
			"title": absFilters.languageOfResource,
			"field": "resourceLinksLanguage_ss"
		},
		{
			"type": "thesaurus",
			"term": "aichiTargets",
			"title": absFilters.aichiTargets,
			"field": "bchSubjects_ss",
			"relatedField":"bchSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "cbdSubjects",
			"title": absFilters.cbdSubjectAreas,
			"field": "cbdSubjects_ss",
			"relatedField":"cbdSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "absSubjects",
			"title": absFilters.absKeywords,
			"field": "absSubjects_ss",
			"relatedField":"absSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "keyAreas",
			"title": absFilters.absKeyAreas,
			"field": "absKeyAreas_ss",
			"relatedField":"absKeyAreas_REL_ss"
		}
	],
	"modelContractualClause" :[
		{
			"type": "freeText",
			"title": absFilters.freeText,
			"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "mccResourceTypes",
			"title": absFilters.typesOFResource,
			"field": "resourceTypes_ss",
			"relatedField":"resourceTypes_REL_ss"
		},
		{
			"type": "date",
			"title": absFilters.publicationDate,
			"field": "publicationDate_dt"
		},
		{
			"type": "thesaurus",
			"term": "languages",
			"title": absFilters.languageOfResource,
			"field": "resourceLinksLanguage_ss"
		},
		{
			"type": "thesaurus",
			"term": "aichiTargets",
			"title": absFilters.aichiTargets,
			"field": "bchSubjects_ss",
			"relatedField":"bchSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "cbdSubjects",
			"title": absFilters.cbdSubjectAreas,
			"field": "cbdSubjects_ss",
			"relatedField":"cbdSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "mccKeywords",
			"title": absFilters.mccKeywords,
			"field": "mccKeywords_ss",
			"relatedField":"mccKeywords_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "absSubjects",
			"title": absFilters.absKeywords,
			"field": "absSubjects_ss",
			"relatedField":"absSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "keyAreas",
			"title": absFilters.absKeyAreas,
			"field": "absKeyAreas_ss",
			"relatedField":"absKeyAreas_REL_ss"
		}
	],

	"test" : [
		{
			"type": "thesaurus",
			"term": "countries",
			"title": absFilters.buildContactsUserCountry,
			"fieldfn": "buildContactsUserCountryfn"
		}
	]
}