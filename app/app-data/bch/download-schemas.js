import fieldsTranslations from '../../app-text/views/search/search-results/bch-download-schemas.json';
import { mergeTranslationKeys } from '../../services/translation-merge';
const fieldsT = mergeTranslationKeys(fieldsTranslations);
import { downloadSchemas as commonDownloadSchemas } from '../common-download-schemas.js';

export const downloadSchemas = {	
	...commonDownloadSchemas,

	"supplementaryAuthority":{
		"uniqueId"   : fieldsT["supplementaryAuthority.uniqueId"],
		"government" : fieldsT["supplementaryAuthority.government"],
		"name"       : fieldsT["supplementaryAuthority.name"],
		"publishedOn": fieldsT["supplementaryAuthority.publishedOn"]
	},
	"laboratoryDetection":{
		"uniqueId"        : fieldsT["laboratoryDetection.uniqueId"],
		"organization"    : fieldsT["laboratoryDetection.organization"],
		"services"        : fieldsT["laboratoryDetection.services"],
		"agreements"      : fieldsT["laboratoryDetection.agreements"],
		"certifications"  : fieldsT["laboratoryDetection.certifications"],
		"detectionMethods": fieldsT["laboratoryDetection.detectionMethods"],
		"lmoTypes"        : fieldsT["laboratoryDetection.lmoTypes"],
		"detectableLmos"  : fieldsT["laboratoryDetection.detectableLmos"],
		"detectableGenes" : fieldsT["laboratoryDetection.detectableGenes"],
		"publishedOn"     : fieldsT["laboratoryDetection.publishedOn"]
	},

	"biosafetyExpert":{
		"uniqueId": fieldsT["biosafetyExpert.uniqueId"],
		"government": fieldsT["biosafetyExpert.government"],
		"birthCountry": fieldsT["biosafetyExpert.birthCountry"],
		"expertise": fieldsT["biosafetyExpert.expertise"],
		"motherTongue": fieldsT["biosafetyExpert.motherTongue"],
		"languageRating": fieldsT["biosafetyExpert.languageRating"],
		"publishedOn": fieldsT["biosafetyExpert.publishedOn"]
	},
	"biosafetyDecision" : {
        "uniqueId"      			: fieldsT["bchRecordID"],
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
	}
}