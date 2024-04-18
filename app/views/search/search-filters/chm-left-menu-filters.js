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
	"nationalReport" : [{
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
	]	
}