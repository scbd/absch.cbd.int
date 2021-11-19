import absFilters from '~/app-data/abs/abs-left-menu-filters.json';

export const absLeftMenuFilters = {
	"contact" : [{
			"type": "freeText",
			"title": absFilters.freeText,
			"field": "text_EN_txt"
		},
		{
			"type": "yesNo",
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
			"field": "jurisdiction_ss"
		},
		{
			"type": "thesaurus",
			"term": "cnaKeywords",
			"title": absFilters.keywords,
			"field": "absGeneticResourceTypes_REL_ss"
		},
		{
			"type": "yesNo",
			"title": absFilters.showCNAsindicatedAsTheOnlyCNAIntheCountry,
			"field": "isResponsibleForAll_b"
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
			"field": "status_s",
			"otherTerm":false
		},
		{
			"type": "thesaurus",
			"term": "typeOfDocuments",
			"title": absFilters.typeOfDocuments,
			"field": "type_s"
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
			"field": "keywords_ss"
		},
		{
			"type": "thesaurus",
			"term": "cnaJurisdictions",
			"title": absFilters.jurisdiction,
			"field": "jurisdiction_s"
		},
		{
		"type": "yesNo",
		"title": absFilters.doesTheApplicantNeedToProvideAnyDocuments,
		"field": "hasApplicationDocuments_b"
		},
		{
		"type": "yesNo",
		"title": absFilters.areThereApplicationFees,
		"field": "hasApplicationFees_b"
		}
		// ,{
		// "type": "date",
		// "title": absFilters.howLongDoesApplicationProcessTake,
		// "field": "duration"
		// }
	],
	"absNationalModelContractualClause" : [{
		"type": "freeText",
		"title": absFilters.freeText,
		"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "mccKeywords",
			"title": absFilters.keywords,
			"field": "keywords_ss"
		},{
			"type": "thesaurus",
			"term": "absSubjects",
			"title": absFilters.cbiTAkeyAreas,
			"field": "thematicAreas_ss"
		},
		{
			"type": "thesaurus",
			"term": "cnaJurisdictions",
			"title": absFilters.jurisdiction,
			"field": "jurisdiction_s"
		}
	],
	"absPermit" : [{
		"type": "freeText",
		"title": absFilters.IRRCFreeText,
		"field": "text_EN_txt"
		},
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(contact authority)",
				"sort":"title_s"
			},
			"title": absFilters.absPermitIssuingAuthority,
			"field": "absCNA_s"
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
			"title": absFilters.absPermitSubjectMK,
			"field": "keywords_ss"
		},
		{
			"type": "thesaurus",
			"term": "usage",
			"title": absFilters.usage,
			"field": "usages_ss"
		},
		{
			"type": "yesNo",
			"title": absFilters.absPermitHasThirdParty,
			"field": "hasThirdPartyTransferCondition_b"
		},
		{
			"type": "yesNo",
			"title": absFilters.absPermitReferencedByCPC,
			"field": "referencedByCPC_ss"
		}
		,
		{
			"type": "yesNo",
			"title": absFilters.informationIsConfidential,
			"field": "providersConfidential_b"
		},
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(contact authority)",
				"sort":"title_s"
			},
			"title": absFilters.theProvider,
			"field": "providers_s"
		},
		{
			"type": "yesNo",
			"title": absFilters.SubjectMatter,
			"field": "subjectMatterConfidential_b"
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
		// ,{
		// 	"type": "thesaurus",
		// 	"term": "valueChainStage",
		// 	"title": absFilters.informationCollectedReceived,
		// 	"field": "valueChainStage_ss"
		// },
		// {
		// 	"type": "thesaurus",
		// 	"term": "responsibleFunctions",
		// 	"title": absFilters.otherResponsibilities,
		// 	"field": "responsibleFunctions_ss"
		// }
		
	],
	"absCheckpointCommunique" : [{
		"type": "freeText",
		"title": absFilters.freeText,
		"field": "text_EN_txt"
		},
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(absCheckpoint)",
				"sort":"title_s"
			},
			"title": absFilters.IRRCCollectedReceivedInformation,
			"field": "absCheckpoints_ss"
		}, 
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(absPermit)",
				"sort":"title_s"
			},
			"title": absFilters.relatedIRCC,
			"field": "absIRCCs_ss"
		},  
		{
			"type": "thesaurus",
			"term": "countries",
			"title": absFilters.sourceGeneticResourceOrATK,
			"field": "sourceCountries"
		},
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(entityWhoGrantedPIC)",
				"sort":"title_s"
			},
			"title": absFilters.personEntityWhoGrantedConsent,
			"field": "entityWhoGrantedPIC_ss"
		}, 
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(personsAtCheckpoint)",
				"sort":"title_s"
			},
			"title": absFilters.personsAtCheckpointUtilizing,
			"field": "personsAtCheckpoint_ss"
		}, 
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(entityToWhomPICGranted)",
				"sort":"title_s"
			},
			"title": absFilters.personEntityWhoGrantedConsentGranted,
			"field": "entityToWhomPICGranted_ss"
		},  
		{
			"type": "date",
			"title": absFilters.cpcAccessDate,
			"field": "dateOfAccess_dt"
		},
		{
			"type": "date",
			"title": absFilters.cpcInformationCollectedDateFrom,
			"field": "dateCollectedFrom_dt"
		},
		{
			"type": "date",
			"title": absFilters.cpcInformationCollectedDateTo,
			"field": "dateCollectedTo_dt"
		},
		{
			"type": "thesaurus",
			"term": "cnaKeywords",
			"title": absFilters.keywords,
			"field": "keywords_ss"
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
			"term": "cbiFundingSrc",
			"title": absFilters.cbiFundingSrc,
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