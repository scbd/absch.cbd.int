import fieldsTranslations from '../../app-text/views/search/search-results/bch-download-schemas.json';
import commonFieldsTranslations from '../app-text/views/search/search-results/common-download-schemas.json';
import { mergeTranslationKeys } from '../../services/translation-merge';
import { downloadSchemas as commonDownloadSchemas } from '../common-download-schemas.js';

const fieldsT 		= mergeTranslationKeys(fieldsTranslations);
const commonFieldsT = mergeTranslationKeys(commonFieldsTranslations);


export const downloadSchemas = {	
	...commonDownloadSchemas,

    "authority":{
        "uniqueId"                   : commonFieldsT["uniqueId"],
        "government"                 : commonFieldsT["country"],
        "name"                       : commonFieldsT["authority.name"],
        "address"                    : commonFieldsT["authority.address"],
        "city"                       : commonFieldsT["authority.city"],
        "state"                      : commonFieldsT["authority.state"],
        "postalCode"                 : commonFieldsT["authority.postalCode"],
        "country"                    : commonFieldsT["authority.country"],
        "phones"                     : commonFieldsT["authority.phones"],
        "faxes"                      : commonFieldsT["authority.faxes"],
        "emails"                     : commonFieldsT["authority.emails"],
        "websites.url"               : commonFieldsT["authority.websites"],
        "contacts"                   : commonFieldsT["authority.contacts"],
        "relevantInformation"        : commonFieldsT["authority.relevantInformation"],
        "relevantDocuments.url"      : commonFieldsT["authority.relevantDocuments"],
        "functions"                  : commonFieldsT["authority.functions"],
        "cpbOrganismTypes"           : commonFieldsT["authority.cpbOrganismTypes"],
        "publishedOn"                : commonFieldsT["publishedOn"]
    },

	"supplementaryAuthority":{
		"uniqueId"   : fieldsT["uniqueId"],
		"government" : fieldsT["country"],
		"name"       : fieldsT["supplementaryAuthority.name"],
		"publishedOn": fieldsT["publishedOn"]
	},
	"laboratoryDetection":{
		"uniqueId"        : fieldsT["uniqueId"],
		"organization"    : fieldsT["laboratoryDetection.organization"],
		"services"        : fieldsT["laboratoryDetection.services"],
		"agreements"      : fieldsT["laboratoryDetection.agreements"],
		"certifications"  : fieldsT["laboratoryDetection.certifications"],
		"detectionMethods": fieldsT["laboratoryDetection.detectionMethods"],
		"lmoTypes"        : fieldsT["laboratoryDetection.lmoTypes"],
		"detectableLmos"  : fieldsT["laboratoryDetection.detectableLmos"],
		"detectableGenes" : fieldsT["laboratoryDetection.detectableGenes"],
		"publishedOn"     : fieldsT["publishedOn"]
	},

	"biosafetyExpert":{
		"uniqueId": fieldsT["uniqueId"],
		"government": fieldsT["country"],
		"birthCountry": fieldsT["biosafetyExpert.birthCountry"],
		"expertise": fieldsT["biosafetyExpert.expertise"],
		"motherTongue": fieldsT["biosafetyExpert.motherTongue"],
		"languageRating": fieldsT["biosafetyExpert.languageRating"],
		"publishedOn": fieldsT["publishedOn"]
	},
	"biosafetyDecision" : {
        "uniqueId"      					: fieldsT["bchRecordID"],
        "government"        				: fieldsT["country"],
		"authorities"						: fieldsT["biosafetyDecision.authorities"],
		"title"								: fieldsT["biosafetyDecision.title"],
		"date"								: fieldsT["biosafetyDecision.date"],
		"decisionTypes"					    : fieldsT["biosafetyDecision.decisionTypes"],
		"involvesFieldTrial"			    : fieldsT["biosafetyDecision.involvesFieldTrial"],
		"involvesCommercialRelease"		    : fieldsT["biosafetyDecision.involvesCommercialRelease"],
		"appliesToSubsequentIntroductions"  : fieldsT["biosafetyDecision.appliesToSubsequentIntroductions"],
		"uses"								: fieldsT["biosafetyDecision.uses"],
		"decisionTypesDirectUse"			: fieldsT["biosafetyDecision.decisionTypesDirectUse"],
		"decisionResult"					: fieldsT["biosafetyDecision.decisionResult"],
		"modifiedOrganisms"					: fieldsT["biosafetyDecision.modifiedOrganisms"],
		"riskAssessments"					: fieldsT["biosafetyDecision.riskAssessments"],
		"publishedOn"						: fieldsT["publishedOn"]
	},
	"nationalRiskAssessment":{
		"uniqueId"			: fieldsT["bchRecordID"],
		"government"		: fieldsT["country"],
		"title"				: fieldsT["nationalRiskAssessment.title"],
		"date"				: fieldsT["nationalRiskAssessment.date"],
		"modifiedOrganisms" : fieldsT["nationalRiskAssessment.modifiedOrganisms"],
		"scopes"			: fieldsT["nationalRiskAssessment.scopes"],
		"publishedOn"		: fieldsT["publishedOn"]
	},
	"independentRiskAssessment":{
		"uniqueId"			: fieldsT["bchRecordID"],
		"title"				: fieldsT["nationalRiskAssessment.title"],
		"date"				: fieldsT["nationalRiskAssessment.date"],
		"organizations"		: fieldsT["independentRiskAssessment.organizations"],
		"modifiedOrganisms" : fieldsT["nationalRiskAssessment.modifiedOrganisms"],
		"scopes"			: fieldsT["nationalRiskAssessment.scopes"],
		"publishedOn"		: fieldsT["publishedOn"]
	},
	"biosafetyLaw" : {
	    "uniqueId"    			: fieldsT["bchRecordID"],
        "government"        	: fieldsT["country"],
		"title"			 		: fieldsT["title"],
		"type"		 			: fieldsT["biosafetyLaw.type"],
		"jurisdiction"			: fieldsT["biosafetyLaw.jurisdiction"],
		"cpbSubjectAreas"		: fieldsT["biosafetyLaw.cpbSubjectAreas"],
		"entryIntoForce"		: fieldsT["biosafetyLaw.entryIntoForce"], 
		"publishedOn"			: fieldsT["publishedOn"]
	},
	"modifiedOrganism" : {
	    "uniqueId"   			: fieldsT["bchRecordID"],
        "identity"        		: fieldsT["name"],
		"transformationEvent"	: fieldsT["modifiedOrganism.transformationEvent"],
		"uniqueIdentification"	: fieldsT["modifiedOrganism.uniqueIdentification"],
		"developers"			: fieldsT["modifiedOrganism.developers"],
		"recipientOrganisms"	: fieldsT["modifiedOrganism.recipientOrganisms"],
		"vector"			    : fieldsT["modifiedOrganism.vector"],
		"techniqueUsed"		    : fieldsT["modifiedOrganism.techniqueUsed"],
		"genes"  				:  fieldsT["modifiedOrganism.genes"],
		"traits"				: fieldsT["modifiedOrganism.traits"],
		"commonUses"			: fieldsT["modifiedOrganism.commonUses"],
		"publishedOn"			: fieldsT["publishedOn"]
	},

	"dnaSequence" : {
	    "uniqueId"      		: fieldsT["bchRecordID"],
        "name"        			: fieldsT["name"],
		"synonymNames"			: fieldsT["dnaSequence.synonymNames"],
		"abbreviation"		 	: fieldsT["dnaSequence.abbreviation"],
		"family"				: fieldsT["dnaSequence.family"],
		"isSynthetic"		  	: fieldsT["dnaSequence.isSynthetic"],
		"donorOrganisms"		: fieldsT["dnaSequence.donorOrganisms"],
		"traits"		    	: fieldsT["dnaSequence.traits"],
		"publishedOn"			: fieldsT["publishedOn"]
	},

	"organism" : {
	    "uniqueId"      		: fieldsT["bchRecordID"],
        "scientificName"        : fieldsT["organism.scientificName"],
		"scientificNameSynonyms": fieldsT["organism.scientificNameSynonyms"],
		"commonNames"		 	: fieldsT["organism.commonNames"],
		"plantCultivar"			: fieldsT["organism.plantCultivar"],
		"organismType"		  	: fieldsT["organism.organismType"],
		"commonUses"			: fieldsT["organism.commonUses"],
		"publishedOn"			: fieldsT["publishedOn"]
	},
    "capacityBuildingInitiative":{
        "uniqueId"           : commonFieldsT["capacityBuildingInitiative.uniqueId"],
        "title"              : commonFieldsT["capacityBuildingInitiative.title"],
        "projectNumber"      : commonFieldsT["capacityBuildingInitiative.projectNumber"],
        "projectDocument.url": commonFieldsT["capacityBuildingInitiative.projectDocument"],
        "contacts"           : commonFieldsT["capacityBuildingInitiative.contacts"],
        "isProjectProgramme" : commonFieldsT["capacityBuildingInitiative.isProjectProgramme"],
        "description"        : commonFieldsT["capacityBuildingInitiative.description"],
        "fundingSourceTypes" : commonFieldsT["capacityBuildingInitiative.fundingSourceTypes"],
        "coreFundingSources" : commonFieldsT["capacityBuildingInitiative.coreFundingSources"],
        "coFinancingSources" : commonFieldsT["capacityBuildingInitiative.coFinancingSources"],
        "totalBudget"        : commonFieldsT["capacityBuildingInitiative.totalBudget"],
        "resultsAchievements": commonFieldsT["capacityBuildingInitiative.resultsAchievements"],
        "resultsOutputs"     : commonFieldsT["capacityBuildingInitiative.resultsOutputs"],
        "resultsReference"   : commonFieldsT["capacityBuildingInitiative.resultsReference"],
        "bestPractices"      : commonFieldsT["capacityBuildingInitiative.bestPractices"],
        "geographicScope"    : commonFieldsT["capacityBuildingInitiative.geographicScope"],
        "countryRegions"     : commonFieldsT["capacityBuildingInitiative.countryRegions"],
        "status"             : commonFieldsT["capacityBuildingInitiative.status"],
        "startDate"          : commonFieldsT["capacityBuildingInitiative.startDate"],
        "endDate"            : commonFieldsT["capacityBuildingInitiative.endDate"],
        "activityScope"      : commonFieldsT["capacityBuildingInitiative.activityScope"],
        "categories"         : commonFieldsT["capacityBuildingInitiative.categories"],
        "cbdSubjects"        : commonFieldsT["capacityBuildingInitiative.cbdSubjects"],
        "cpbThematicAreas"   : commonFieldsT["capacityBuildingInitiative.cpbThematicAreas"],
        "relevantInformation": commonFieldsT["capacityBuildingInitiative.relevantInformation"],
      "relevantDocuments.url": commonFieldsT["capacityBuildingInitiative.relevantDocuments"],
        "publishedOn"        : commonFieldsT["publishedOn"]
	},
}