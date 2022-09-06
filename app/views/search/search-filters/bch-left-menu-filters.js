import bchFilters from '~/app-text/views/search/search-filters/bch-left-menu-filters.json';
export const bchLeftMenuFilters = {
    "authority": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        },
        {
            "type": "thesaurus",
            "term": "subjectAreas",
            "title": bchFilters.authoritySubjectAreas,
            "field": "functions_ss",
            "relatedField":"functions_REL_ss"
        },
        {
            "type": "thesaurus",
            "term": "typeOfOrganisms",
            "title": bchFilters.authorityDecisionTypeOfOrganisms,
            "field": "cpbOrganismTypes_ss",
            "relatedField":"cpbOrganismTypes_REL_ss"
        }
    ],
    "biosafetyDecision": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        },
        {
            "type": "thesaurus",
            "term": "decisionTypes",
            "title": bchFilters.biosafetyDecisionTypes,
            "field": "decisionTypes_ss",
            "otherTerm":false,
            "additionalTerms":[
                {
                    "identifier":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                    "name":bchFilters.other,
                    "title":{"en":bchFilters.biosafetyDecisionAnyOther}
                }
            ],
            "relatedField":"decisionTypes_REL_ss"
        },
        {
            "type": "thesaurus",
            "term": "decisionLMOFFPSubject",
            "title": bchFilters.biosafetyDecisionLMOFFPSubject,
            "field": "uses_ss",
            "otherTerm":false,
            "relatedField":"uses_REL_ss"
        },
        {
            "type": "thesaurus",
            "term": "decisionResults",
            "title": bchFilters.biosafetyDecisionResults,
            "field": "decisionResult_s",
            "otherTerm":false
        },
        {
            "type": "date",
            "title": bchFilters.biosafetyDecisionDate,
            "field": "decisionDate_dt"
        },
        {
            "type": "solrRecords",
            "query": {
                "fq": [ "schema_s:modifiedOrganism"],
                "searchFields":["uniqueIdentification_t", "uniqueIdentificationVariants_txt", "text_EN_txt"]
            },
            "title": bchFilters.livingModifiedOrganism,
            "field": "modifiedOrganisms_ss"
        },
        {
            "type": "thesaurus",
            "term": "dnaSequenceTraits",
            "title": bchFilters.modifiedTraits,
            "field": "lmoTraits_ss",
            "relatedField":"lmoTraits_REL_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s,rec_title:title_EN_t",
                "fq": [ "schema_s:dnaSequence AND title_EN_t:*"],
                "searchFields":["title_EN_t"],
                "s": "title_EN_t asc"
            },
            "title": bchFilters.geneticElement,
            "field": "geneIdentifiers_ss"
        },
        {
            "type": "thesaurus",
            "term": "techniqueUsed",
            "otherTerm":false,
            "title": bchFilters.techniqueUsedForModification,
            "field": "lmoTechniquesUsed_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s,rec_title:commonNames_RU_ss,url_ss",
                "fq": [ "schema_s:organism AND commonNames_RU_ss:*"],
                "searchFields":["commonNames_EN_txt"],
                "s":"commonNames_RU_ss asc"
            },
            "title": bchFilters.ParentalOrganismCommonName,
            "field": "lmoIdentifiers_ss",
            "customResultFn":"organismNamesResult",
            "customQueryFn":"organismNamesQuery"

        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s,rec_title:scientificName_s,url_ss",
                "fq": [ "schema_s:organism AND scientificName_s:*"],
                "searchFields":["scientificName_t"],
                "s":"scientificName_s asc"
            },
            "title": bchFilters.ParentalOrganismScientificName,
            "field": "lmoIdentifiers_ss"
        }
    ],
    "biosafetyNews": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        }
    ],
    "biosafetyLaw": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        },
        {
            "type": "thesaurus",
            "term": "legislationAgreementTypes",
            "title": bchFilters.biosafetyLawLegislationAgreementTypes,
            "field": "type_s"
        },
        {
            "type": "thesaurus",
            "term": "lawJurisdictions",
            "title": bchFilters.biosafetyLawJurisdictions,
            "field": "jurisdiction_s"
        },
        {
            "type": "thesaurus",
            "term": "subjectAreas",
            "title": bchFilters.biosafetyLawSubjectAreas,
            "field": "cpbSubjectAreas_ss",
            "relatedField":"cpbSubjectAreas_REL_ss"
        }
    ],
    "capacityBuildingInitiative": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        },
        {
            "type": "thesaurus",
            "term": "jurisdictions",
            "title": bchFilters.capacityBuildingInitiativeJurisdictions,
            "field": "scope_s",
            "otherTerm":false
        },
        {
            "type": "thesaurus",
            "term": "cbiStatus",
            "title": bchFilters.capacityBuildingInitiativeCbiStatus,
            "field": "status_s"
        },
        {
            "type": "thesaurus",
            "term": "cbiCats",
            "title": bchFilters.capacityBuildingInitiativeCbiCats,
            "field": "categories_ss",
            "relatedField":"categories_REL_ss"
        },
        {
            "type": "thesaurus",
            "term": "cbiAudience",
            "title": bchFilters.capacityBuildingInitiativeCbiAudience,
            "field": "targetGroups_ss",
            "relatedField":"targetGroups_REL_ss"
        },
        {
            "type": "thesaurus",
            "term": "cpbThematicAreas",
            "title": bchFilters.biosafetyThematicAreas,
            "field": "cpbThematicAreas_ss",
            "relatedField":"cpbThematicAreas_REL_ss"
        },
        {
            "type" : "customListFn",
            "fn"   : "cbdSubjectsCustomFn",
            "title": bchFilters.CbdSubjects,
            "field": "cbdSubjects_ss",
            "relatedField":"cbdSubjects_REL_ss"
        },
        {
            "type": "thesaurus",
            "term": "cbiFundingSrc",
            "title": bchFilters.capacityBuildingInitiativecbiFundingSrc,
            "field": "fundingSourceTypes_ss",
            "relatedField":"fundingSourceTypes_REL_ss"
        }
    ],
    "cpbNationalReportInterim": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        }
    ],
    "database": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        }
    ],
    "dnaSequence": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        },
        {
            "type": "thesaurus",
            "term": "dnaSequenceFamily",
            "title": bchFilters.dnaSequenceFamily,
            "field": "family_s"
        },
        {
            "type": "yesNo",
            "title": bchFilters.dnaSequenceIsSynthetic,
            "field": "isSynthetic_b"
        },
        {
            "type": "thesaurus",
            "term": "dnaSequenceTraits",
            "title": bchFilters.dnaSequenceTraits,
            "field": "traits_ss",
            "relatedField":"traits_REL_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s,rec_title:title_EN_t",
                "fq": [ "schema_s:dnaSequence AND title_EN_t:*"],
                "searchFields":["title_EN_t"],
                "s": "title_EN_t asc"
            },
            "title": bchFilters.geneticElement,
            "field": "identifier_s"
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s,rec_title:commonNames_EN_txt,url_ss",
                "fq": [ "schema_s:organism AND commonNames_EN_txt:*"],
                "searchFields":["commonNames_EN_txt"],
                "s":"commonNames_RU_ss"
            },
            "title": bchFilters.dnaSequenceDonorCommonNames,
            "field": "geneDonorOrganismsIdentifiers_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s,rec_title:scientificName_s,url_ss",
                "fq": [ "schema_s:organism AND scientificName_s:*"],
                "searchFields":["scientificName_t"],
                "s":"scientificName_s"
            },
            "title": bchFilters.dnaSequenceDonorScientificNames,
            "field": "geneDonorOrganismsIdentifiers_ss"
        }
    ],
    "biosafetyExpert": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        },
        {
            "type": "thesaurus",
            "term": "areasOfExpertise",
            "title": bchFilters.biosafetyExpertAreasOfExpertise,
            "field": "expertise_ss"
        }
    ],
    "expertAssignment": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        }
    ],
    "focalPoint": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        },
        {
            "type": "customListFn",
            "fn": "getFocalPointTypes",
            "title": bchFilters.focalPointType,
            "field": "type_ss"
        }
    ],
    "independentRiskAssessment": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        },
        {
            "type": "thesaurus",
            "term": "riskAssessmentScope",
            "title": bchFilters.independentRiskAssessmentScope,
            "field": "scopes_ss",
            "relatedField":"scopes_REL_ss"
        },
        {
            "type": "thesaurus",
            "term": "regions",
            "title": bchFilters.geographicalRegion,
            "field": "operationalRegions_ss",
            "relatedField":"operationalRegions_REL_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fq": [ "schema_s:modifiedOrganism"],
                "searchFields":["uniqueIdentification_t", "uniqueIdentificationVariants_txt", "text_EN_txt"]
            },
            "title": bchFilters.livingModifiedOrganism,
            "field": "modifiedOrganisms_ss"
        },
        {
            "type": "thesaurus",
            "term": "dnaSequenceTraits",
            "title": bchFilters.modifiedTraits,
            "field": "lmoTraits_ss",
            "relatedField":"lmoTraits_REL_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s,rec_title:title_EN_t",
                "fq": [ "schema_s:dnaSequence AND title_EN_t:*"],
                "searchFields":["title_EN_t"],
                "s": "title_EN_t asc"
            },
            "title": bchFilters.geneticElement,
            "field": "geneIdentifiers_ss"
        },
        {
            "type": "thesaurus",
            "term": "techniqueUsed",
            "title": bchFilters.techniqueUsedForModification,
            "field": "lmoTechniquesUsed_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s,rec_title:commonNames_EN_txt,url_ss",
                "fq": [ "schema_s:organism AND commonNames_EN_txt:*"],
                "searchFields":["commonNames_EN_txt"]
            },
            "title": bchFilters.ParentalOrganismCommonName,
            "field": "lmoIdentifiers_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s,rec_title:scientificName_s,url_ss",
                "fq": [ "schema_s:organism AND scientificName_s:*"],
                "searchFields":["scientificName_t"]
            },
            "title": bchFilters.ParentalOrganismScientificName,
            "field": "lmoIdentifiers_ss"
        },
        {
            "type": "date",
            "title": bchFilters.independentRiskAssessmentDate,
            "field": "riskAssessmentDate_dt"
        }
    ],
    "modifiedOrganism": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        },
        {
            "type": "thesaurus",
            "term": "OrganismCommonUses",
            "title": bchFilters.modifiedOrganismCommonUses,
            "field": "commonUses_ss"
        },
        {
            "type": "thesaurus",
            "term": "techniqueUsed",
            "title": bchFilters.techniqueUsedForModification,
            "field": "techniqueUsed_ss"
        },
        {
            "type": "thesaurus",
            "term": "dnaSequenceTraits",
            "title": bchFilters.modifiedTraits,
            "field": "traits_ss",
            "relatedField":"traits_REL_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s:uniqueIdentification_s,rec_title:uniqueIdentification_s",
                "fq": [ "schema_s:modifiedOrganism AND uniqueIdentification_s:*"],
                "searchFields":["uniqueIdentification_t", "uniqueIdentificationVariants_txt"],
                "lookupField":"uniqueIdentification_s"
            },
            "title": bchFilters.modifiedOrganismUniqueIdentification,
            "field": "uniqueIdentification_s",
            "exactSearch":true //add "" around the search query for exact search.
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s,rec_title:title_EN_t",
                "fq": [ "schema_s:dnaSequence AND title_EN_t:*"],
                "searchFields":["title_EN_t"],
                "s": "title_EN_t asc"
            },
            "title": bchFilters.geneticElement,
            "field": "geneIdentifiers_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s,rec_title:commonNames_EN_txt,url_ss",
                "fq": [ "schema_s:organism AND commonNames_EN_txt:*"],
                "searchFields":["commonNames_EN_txt"]
            },
            "title": bchFilters.modifiedOrganismLmoIdentifiersCommon,
            "field": "lmoIdentifiers_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s,rec_title:scientificName_s,url_ss",
                "fq": [ "schema_s:organism AND scientificName_s:*"],
                "searchFields":["scientificName_t"]
            },
            "title": bchFilters.modifiedOrganismLmoIdentifiersScientific,
            "field": "lmoIdentifiers_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s,rec_title:commonNames_EN_txt,url_ss",
                "fq": [ "schema_s:organism AND commonNames_EN_txt:*"],
                "searchFields":["commonNames_EN_txt"]
            },
            "title": bchFilters.dnaSequenceDonorCommonNames,
            "field": "geneDonorOrganismsIdentifiers_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s,rec_title:scientificName_s,url_ss",
                "fq": [ "schema_s:organism AND scientificName_s:*"],
                "searchFields":["scientificName_t"]
            },
            "title": bchFilters.dnaSequenceDonorScientificNames,
            "field": "geneDonorOrganismsIdentifiers_ss"
        }
    ],
    "nationalRiskAssessment": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        },
        {
            "type": "thesaurus",
            "term": "riskAssessmentScope",
            "title": bchFilters.nationalRiskAssessmentScope,
            "field": "scopes_ss",
            "relatedField":"scopes_REL_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fq": [ "schema_s:modifiedOrganism"],
                "searchFields":["uniqueIdentification_t", "uniqueIdentificationVariants_txt", "text_EN_txt"]
            },
            "title": bchFilters.livingModifiedOrganism,
            "field": "modifiedOrganisms_ss"
        },
        {
            "type": "thesaurus",
            "term": "dnaSequenceTraits",
            "title": bchFilters.modifiedTraits,
            "field": "lmoTraits_ss",
            "relatedField":"lmoTraits_REL_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s,rec_title:title_EN_t",
                "fq": [ "schema_s:dnaSequence AND title_EN_t:*"],
                "searchFields":["title_EN_t"],
                "s": "title_EN_t asc"
            },
            "title": bchFilters.geneticElement,
            "field": "geneIdentifiers_ss"
        },
        {
            "type": "thesaurus",
            "term": "techniqueUsed",
            "title": bchFilters.techniqueUsedForModification,
            "field": "lmoTechniquesUsed_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s,rec_title:commonNames_EN_txt,url_ss",
                "fq": [ "schema_s:organism AND commonNames_EN_txt:*"],
                "searchFields":["commonNames_EN_txt"]
            },
            "title": bchFilters.ParentalOrganismCommonName,
            "field": "lmoIdentifiers_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s,rec_title:scientificName_s,url_ss",
                "fq": [ "schema_s:organism AND scientificName_s:*"],
                "searchFields":["scientificName_s"]
            },
            "title": bchFilters.ParentalOrganismScientificName,
            "field": "lmoIdentifiers_ss"
        },
        {
            "type": "date",
            "title": bchFilters.nationalRiskAssessmentDate,
            "field": "riskAssessmentDate_dt"
        }
    ],
    "organism": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        },
        {
            "type": "thesaurus",
            "term": "typeOfOrganisms",
            "title": bchFilters.organismTypeOfOrganisms,
            "field": "organismType_s",
            "relatedField":"organismType_REL_ss"
        },
        {
            "type": "thesaurus",
            "term": "domestication",
            "otherTerm":false,
            "title": bchFilters.organismDomestication,
            "field": "domestication_s",
            "relatedField":"domestication_REL_ss"
        },
        {
            "type": "thesaurus",
            "term": "OrganismCommonUses",
            "title": bchFilters.organismOrganismCommonUses,
            "field": "commonUses_ss",
            "relatedField":"commonUses_REL_ss"
        }
    ],
    "organization": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        },
        {
            "type": "thesaurus",
            "term": "regions",
            "title": bchFilters.geographicalRegion,
            "field": "operationalRegions_ss",
            "relatedField":"operationalRegions_REL_ss"
        },
        {
            "type": "thesaurus",
            "term": "organizationTypes",
            "title": bchFilters.organizationTypes,
            "field": "organizationTypes_ss",
            "without":["B3699A74-EF2E-467A-A82F-EF2149A2EFC5"]
        }
    ],
    "laboratoryDetection": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        },
        {
            "type": "thesaurus",
            "term": "services",
            "otherTerm":true,
            "title": bchFilters.laboratoryDetectionServices,
            "field": "services_ss"
        },
        {
            "type": "thesaurus",
            "term": "typeOfOrganisms",
            "narrowerOf":"8DAB2400-CF00-44B2-ADCF-49AABF66B9B0",
            "title": bchFilters.laboratoryDetectionTypeOfOrganisms,
            "field": "lmoTypes_ss"
        },
        {
            "type": "thesaurus",
            "term": "regions",
            "title": bchFilters.geographicalRegion,
            "field": "operationalRegions_ss",
            "relatedField":"operationalRegions_REL_ss"
        },
        {
            "type": "thesaurus",
            "term": "detectionMethods",
            "otherTerm":true,
            "title": bchFilters.laboratoryDetectionMethods,
            "field": "detectionMethods_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fq": [ "schema_s:modifiedOrganism"],
                "searchFields":["uniqueIdentification_t", "uniqueIdentificationVariants_txt", "text_EN_txt"]
            },
            "title": bchFilters.laboratoryDetectionDetectableLmos,
            "field": "detectableLmos_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fq": [ "schema_s:dnaSequence"]
            },
            "title": bchFilters.laboratoryDetectionDetectableGenes,
            "field": "detectableGenes_ss"
        }
    ],
    "resource": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        },
        {
            "type": "customListFn",
			"fn"   : "vlrResourceCustomFn",
            "title": bchFilters.resourceResourceTypesVlr,
            "field": "resourceTypes_ss",
            "relatedField":"resourceTypes_REL_ss"
        },
        {
            "type": "thesaurus",
            "term": "languages",
            "title": bchFilters.resourceLanguages,
            "field": "resourceLinksLanguage_ss"
        },
        {
            "type": "thesaurus",
            "term": "cpbThematicAreas",
            "title": bchFilters.biosafetyThematicAreas,
            "field": "bchSubjects_ss",
            "relatedField":"bchSubjects_REL_ss"
        },
        {
            "type": "customListFn",
            "fn"  : "cbdSubjectsCustomFn",
            "title": bchFilters.CbdSubjects,
            "field": "cbdSubjects_ss",
            "relatedField":"cbdSubjects_REL_ss"
        },
        {
            "type": "thesaurus",
            "term": "bchRaSubjects",
            "title": bchFilters.resourceBchRaSubjects,
            "field": "bchRaSubjects_ss",
            "relatedField":"bchRaSubjects_REL_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fq": [ "schema_s:modifiedOrganism"],
                "searchFields":["uniqueIdentification_t", "uniqueIdentificationVariants_txt", "text_EN_txt"]
            },
            "title": bchFilters.livingModifiedOrganism,
            "field": "bchModifiedOrganisms_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fq": [ "schema_s:organism"]
            },
            "title": bchFilters.resourceBchOrganisms,
            "field": "bchOrganisms_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fq": [ "schema_s:dnaSequence"]
            },
            "title": bchFilters.geneticElement,
            "field": "bchGenes_ss"
        },
        {
            "type": "date",
            "title": bchFilters.resourcePublicationDate,
            "field": "publicationDate_dt"
        }
    ],
    "submission": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        },
        {
            "type": "solrRecords",
            "query": {
                "fl": "identifier_s:symbol_s,rec_summary:title_s,rec_title:concat(symbol_s,' - ',reference_s),rec_date:updatedDate_dt,schema_s",
                "fq": [ "schema_s:notification"]
            },
            "title": bchFilters.resourceNotifications,
            "field": "notifications_ss"
        },
        {
            "type": "solrRecords",
            "query": {
                "fq": [ "schema_s:organization"]
            },
            "title": bchFilters.resourceOrganizations,
            "field": "organizations_ss"
        },
        {
            "type": "thesaurus",
            "term": "cpbThematicAreas",
            "title": bchFilters.resourceCpbThematicAreas,
            "field": "cpbThematicAreas_ss",
            "relatedField":"cpbThematicAreas_REL_ss"
        },
        {
            "type": "date",
            "title": bchFilters.resourceDate,
            "field": "date_dt"
        }
    ],
    "supplementaryAuthority": [
        {
            "type": "freeText",
            "title": bchFilters.freeText,
            "field": "text_EN_txt"
        }
    ]
}
