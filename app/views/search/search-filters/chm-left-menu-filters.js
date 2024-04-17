import chmFiltersTranslations from '~/app-text/views/search/search-filters/chm-left-menu-filters.json';
import { mergeTranslationKeys } from '../../../services/translation-service';

const chmFilters = mergeTranslationKeys(chmFiltersTranslations);

export const chmLeftMenuFilters = {
	"contact" : [{
			"type": "freeText",
			"title": chmFilters.freeText,
			"field": "text_EN_txt"
		},
		{
			"type": "yesNo",
			"title": chmFilters.contactType,
			"field": "type_s"
		},
		{
			"type": "thesaurus",
			"term": "cnaJurisdictions",
			"title": chmFilters.contactOrganizationType,
			"field": "organizationType_s"
		},
		{
			"type": "customListFn",
			"fn": "cbdCountriesCustomFn",
			"title": chmFilters.contactAddressCountry,
			"field": "country_s"
		}
	],
	"focalPoint" : [{
			"type": "freeText",
			"title": chmFilters.freeText,
			"field": "text_EN_txt"
		},
		{
			"type": "customListFn",
			"fn": "getFocalPointTypes",
			"title": chmFilters.focalPointAdditionalResponsibilities,
			"field": "type_ss"
		}
		
	],
	"authority" : [{
		"type": "freeText",
		"title": chmFilters.freeText,
		"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "cnaJurisdictions",
			"title": chmFilters.areaOfJurisdiction,
			"field": "jurisdiction_ss"
		},
		{
			"type": "thesaurus",
			"term": "cnaKeywords",
			"title": chmFilters.keywords,
			"field": "chmGeneticResourceTypes_ss"
		},
		{
			"type": "yesNo",
			"title": chmFilters.showCNAsindicatedAsTheOnlyCNAIntheCountry,
			"field": "isResponsibleForAll_b"
		},
		{
			"type": "yesNo",
			"title": chmFilters.authorityIsResponsibleForAll,
			"field": "isResponsibleForAll_b"
		}
	],
	"measure" : [{
		"type": "freeText",
		"title": chmFilters.freeText,
		"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "status",
			"title": chmFilters.measureLegalStatus,
			"field": "status_s",
			"otherTerm":false
		},
		{
			"type": "thesaurus",
			"term": "typeOfDocuments",
			"title": chmFilters.typeOfDocuments,
			"field": "type_s"
		},
		{
			"type": "thesaurus",
			"term": "jurisdiction",
			"title": chmFilters.jurisdiction,
			"field": "jurisdiction_s"
		},
		{
			"type": "date",
			"title": chmFilters.measureEntryIntoForce,
			"field": "entryIntoForce_dt"
		},
		{
			"type": "date",
			"title": chmFilters.measureDateOfAdoption,
			"field": "adoption_dt"
		},
		{
			"type": "date",
			"title": chmFilters.measureDateOfRetired,
			"field": "retired_dt"
		},
		{
			"type": "yesNo",
			"title": chmFilters.measureIsModelContractualClause,
			"field": "isModelContractualClause_b"
		},
		{
			"type": "label",
			"title": chmFilters.measureKeyElements		
		},
		{
			"type": "check",
			"title": chmFilters.measureKeyElementAccess,
			"value": "Access",
			"field": "meta5_EN_txt"		
		},
		{
			"type": "check",
			"title": chmFilters.measureKeyElementBenefitsharing,
			"value": "Benefit-sharing",
			"field": "meta5_EN_txt"
		},
		{
			"type": "check",
			"title": chmFilters.measureKeyElementCompliance,
			"value": "Compliance",
			"field": "meta5_EN_txt"
		}

	],
	"chmProcedure" : [{
		"type": "freeText",
		"title": chmFilters.freeText,
		"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "chmSubjects",
			"title": chmFilters.keywords,
			"field": "keywords_ss"
		},
		{
			"type": "thesaurus",
			"term": "cnaJurisdictions",
			"title": chmFilters.jurisdiction,
			"field": "jurisdiction_s"
		},
		{
		"type": "yesNo",
		"title": chmFilters.doesTheApplicantNeedToProvideAnyDocuments,
		"field": "hasApplicationDocuments_b"
		},
		{
		"type": "yesNo",
		"title": chmFilters.areThereApplicationFees,
		"field": "hasApplicationFees_b"
		}
		// ,{
		// "type": "date",
		// "title": chmFilters.howLongDoesApplicationProcessTake,
		// "field": "duration"
		// }
	],
	"chmNationalModelContractualClause" : [{
		"type": "freeText",
		"title": chmFilters.freeText,
		"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "mccKeywords",
			"title": chmFilters.keywords,
			"field": "keywords_ss"
		},{
			"type": "thesaurus",
			"term": "chmSubjects",
			"title": chmFilters.cbiTAkeyAreas,
			"field": "thematicAreas_ss"
		},
		{
			"type": "thesaurus",
			"term": "cnaJurisdictions",
			"title": chmFilters.jurisdiction,
			"field": "jurisdiction_s"
		}
	],
	"chmPermit" : [{
		"type": "freeText",
		"title": chmFilters.IRRCFreeText,
		"field": "text_EN_txt"
		},
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(contact authority)",
				"sort":"title_s"
			},
			"title": chmFilters.chmPermitIssuingAuthority,
			"field": "chmCNA_s"
		},
		{
			"type": "date",
			"title": chmFilters.chmPermitDateOfIssuance,
			"field": "date_dt"
		},
		{
			"type": "date",
			"title": chmFilters.chmPermitDateOfExpiry,
			"field": "dateOfExpiry_dt"
		},
		{
			"type": "customListFn",
			"fn": "cbdCountriesCustomFn",
			"title": chmFilters.chmPermitCountries,
			"field": "entitiesToWhomPICGrantedCountries_ss"
		},
		{
			"type": "thesaurus",
			"term": "cnaKeywords",
			"title": chmFilters.chmPermitSubjectMK,
			"field": "keywords_ss"
		},
		{
			"type": "customListFn",
			"fn": "usagesCustomFn",
			"title": chmFilters.usage,
			"fieldfn": "buildCustomConfidentialQueryFn"
		},
		{
			"type": "yesNo",
			"title": chmFilters.chmPermitHasThirdParty,
			"field": "hasThirdPartyTransferCondition_b"
		},
		{
			"type": "yesNo",
			"title": chmFilters.chmPermitReferencedByCPC,
			"field": "referencedByCPC_ss"
		}
		,
		{
			"type": "yesNo",
			"title": chmFilters.informationIsConfidential,
			"field": "providersConfidential_b"
		},
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(contact authority)",
				"sort":"title_s"
			},
			"title": chmFilters.theProvider,
			"field": "providers_s"
		},
		{
			"type": "yesNo",
			"title": chmFilters.SubjectMatter,
			"field": "subjectMatterConfidential_b"
		}
	],
	"database" : [{
		"type": "freeText",
		"title": chmFilters.freeText,
		"field": "text_EN_txt"
		}
	],
	"chmCheckpoint" : [{
			"type": "freeText",
			"title": chmFilters.freeText,
			"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "cnaJurisdictions",
			"title": chmFilters.jurisdiction,
			"field": "jurisdiction_s"
		}
		// ,{
		// 	"type": "thesaurus",
		// 	"term": "valueChainStage",
		// 	"title": chmFilters.informationCollectedReceived,
		// 	"field": "valueChainStage_ss"
		// },
		// {
		// 	"type": "thesaurus",
		// 	"term": "responsibleFunctions",
		// 	"title": chmFilters.otherResponsibilities,
		// 	"field": "responsibleFunctions_ss"
		// }
		
	],
	"chmCheckpointCommunique" : [{
		"type": "freeText",
		"title": chmFilters.freeText,
		"field": "text_EN_txt"
		},
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(chmCheckpoint)",
				"sort":"title_s"
			},
			"title": chmFilters.IRRCCollectedReceivedInformation,
			"field": "chmCheckpoints_ss"
		}, 
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(chmPermit)",
				"sort":"title_s"
			},
			"title": chmFilters.relatedIRCC,
			"field": "chmIRCCs_ss"
		},  
		{
			"type": "customListFn",
			"fn": "cbdCountriesCustomFn",
			"title": chmFilters.sourceGeneticResourceOrATK,
			"field": "sourceCountries_ss"
		},
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(contact authority)",
				"sort":"title_s"
			},
			"title": chmFilters.personEntityWhoGrantedConsent,
			"field": "entityWhoGrantedPIC_ss"
		}, 
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(contact authority)",
				"sort":"title_s"
			},
			"title": chmFilters.personsAtCheckpointUtilizing,
			"field": "personsAtCheckpoint_ss"
		}, 
		{
			"type": "solrRecords",
			"query": {
				"q": "schema_s:(contact authority)",
				"sort":"title_s"
			},
			"title": chmFilters.personEntityWhoGrantedConsentGranted,
			"field": "entityToWhomPICGranted_ss"
		},  
		{
			"type": "date",
			"title": chmFilters.cpcAccessDate,
			"field": "dateOfAccess_dt"
		},
		{
			"type": "date",
			"title": chmFilters.cpcInformationCollectedDateFrom,
			"field": "dateCollectedFrom_dt"
		},
		{
			"type": "date",
			"title": chmFilters.cpcInformationCollectedDateTo,
			"field": "dateCollectedTo_dt"
		},
		{
			"type": "thesaurus",
			"term": "cnaKeywords",
			"title": chmFilters.keywords,
			"field": "keywords_ss"
		}
	],
	"chmNationalReport" : [{
		"type": "freeText",
		"title": chmFilters.freeText,
		"field": "text_EN_txt"
		}],
	"resource": [
		{
			"type": "freeText",
			"title": chmFilters.freeText,
			"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "resourceTypesVlr",
			"title": chmFilters.typesOFResource,
			"field": "resourceTypes_ss",
			"relatedField":"resourceTypes_REL_ss"
		},
		{
			"type": "date",
			"title": chmFilters.publicationDate,
			"field": "publicationDate_dt"
		},
		{
			"type": "thesaurus",
			"term": "languages",
			"title": chmFilters.languageOfResource,
			"field": "resourceLinksLanguage_ss"
		},
		{
			"type": "thesaurus",
			"term": "aichiTargets",
			"title": chmFilters.aichiTargets,
			"field": "aichiTargets_ss"
		},
		{
			"type" : "customListFn",
			"fn"   : "cbdSubjectsCustomFn",
			"title": chmFilters.cbdSubjectAreas,
			"field": "cbdSubjects_ss",
			"relatedField":"cbdSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "chmSubjects",
			"title": chmFilters.chmKeywords,
			"field": "chmSubjects_ss",
			"relatedField":"chmSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "keyAreas",
			"title": chmFilters.chmKeyAreas,
			"field": "chmKeyAreas_ss",
			"relatedField":"chmKeyAreas_REL_ss"
		}
	],
	"organization" : [{
		"type": "freeText",
		"title": chmFilters.freeText,
		"field": "text_EN_txt"
		}],
	"capacityBuildingInitiative": [
		{
			"type": "freeText",
			"title": chmFilters.freeText,
			"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "jurisdictions",
			"title": chmFilters.cbiGeographicScope,
			"field": "scope_s",
			"otherTerm":false
		},
		{
			"type": "thesaurus",
			"term": "cbiStatus",
			"title": chmFilters.cbiStatus,
			"field": "status_s"
		},
		{
			"type": "thesaurus",
			"term": "cbiCats",
			"title": chmFilters.cbiCats,
			"field": "categories_ss",
			"relatedField":"categories_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "cbiAudience",
			"title": chmFilters.cbiAudience,
			"field": "targetGroups_ss",
			"relatedField":"targetGroups_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "keyAreas",
			"title": chmFilters.cbiTAkeyAreas,
			"field": "chmKeyAreas_ss",
			"relatedField":"chmKeyAreas_REL_ss"
		},
		{
			"type" : "customListFn",
			"fn"   : "cbdSubjectsCustomFn",
			"title": chmFilters.cbdSubjectAreas,
			"field": "cbdSubjects_ss",
			"relatedField":"cbdSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "cbiFundingSrc",
			"title": chmFilters.cbiFundingSrc,
			"field": "fundingSourceTypes_ss",
			"relatedField":"fundingSourceTypes_REL_ss"
		}
	],
	"communityProtocol" : [
		{
			"type": "freeText",
			"title": chmFilters.freeText,
			"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "cppResourceTypes",
			"title": chmFilters.typesOFResource,
			"field": "resourceTypes_ss",
			"relatedField":"resourceTypes_REL_ss"
		},
		{
			"type": "date",
			"title": chmFilters.publicationDate,
			"field": "publicationDate_dt"
		},
		{
			"type": "thesaurus",
			"term": "languages",
			"title": chmFilters.languageOfResource,
			"field": "resourceLinksLanguage_ss"
		},
		{
			"type": "thesaurus",
			"term": "aichiTargets",
			"title": chmFilters.aichiTargets,
			"field": "bchSubjects_ss",
			"relatedField":"bchSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "cbdSubjects",
			"title": chmFilters.cbdSubjectAreas,
			"field": "cbdSubjects_ss",
			"relatedField":"cbdSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "chmSubjects",
			"title": chmFilters.chmKeywords,
			"field": "chmSubjects_ss",
			"relatedField":"chmSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "keyAreas",
			"title": chmFilters.chmKeyAreas,
			"field": "chmKeyAreas_ss",
			"relatedField":"chmKeyAreas_REL_ss"
		}
	],
	"modelContractualClause" :[
		{
			"type": "freeText",
			"title": chmFilters.freeText,
			"field": "text_EN_txt"
		},
		{
			"type": "thesaurus",
			"term": "mccResourceTypes",
			"title": chmFilters.typesOFResource,
			"field": "resourceTypes_ss",
			"relatedField":"resourceTypes_REL_ss"
		},
		{
			"type": "date",
			"title": chmFilters.publicationDate,
			"field": "publicationDate_dt"
		},
		{
			"type": "thesaurus",
			"term": "languages",
			"title": chmFilters.languageOfResource,
			"field": "resourceLinksLanguage_ss"
		},
		{
			"type": "thesaurus",
			"term": "aichiTargets",
			"title": chmFilters.aichiTargets,
			"field": "bchSubjects_ss",
			"relatedField":"bchSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "cbdSubjects",
			"title": chmFilters.cbdSubjectAreas,
			"field": "cbdSubjects_ss",
			"relatedField":"cbdSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "mccKeywords",
			"title": chmFilters.mccKeywords,
			"field": "mccKeywords_ss",
			"relatedField":"mccKeywords_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "chmSubjects",
			"title": chmFilters.chmKeywords,
			"field": "chmSubjects_ss",
			"relatedField":"chmSubjects_REL_ss"
		},
		{
			"type": "thesaurus",
			"term": "keyAreas",
			"title": chmFilters.chmKeyAreas,
			"field": "chmKeyAreas_ss",
			"relatedField":"chmKeyAreas_REL_ss"
		}
	],

	"test" : [
		{
			"type": "thesaurus",
			"term": "countries",
			"title": chmFilters.buildContactsUserCountry,
			"fieldfn": "buildContactsUserCountryfn"
		}
	]
}