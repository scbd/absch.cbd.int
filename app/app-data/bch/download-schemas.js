import fieldsT from '../../app-text/views/search/search-results/bch-download-schemas.json';
import { downloadSchemas as commonDownloadSchemas } from '../common-download-schemas.js';

export const downloadSchemas = {	
	...commonDownloadSchemas,

	"biosafetyDecision" : {
        "uniqueId"      					: fieldsT["biosafetyDecision.uniqueId"],
        "government"        				: fieldsT["biosafetyDecision.government"],
		"authorities"						: fieldsT["biosafetyDecision.authorities"],
		"title"								: fieldsT["biosafetyDecision.title"],
		"date"								: fieldsT["biosafetyDecision.date"],
		"commonDecisions"				    : fieldsT["biosafetyDecision.commonDecisions"],
		"involvesFieldTrial"			    : fieldsT["biosafetyDecision.involvesFieldTrial"],
		"involvesCommercialRelease"		    : fieldsT["biosafetyDecision.involvesCommercialRelease"],
		"appliesToSubsequentIntroductions"  : fieldsT["biosafetyDecision.appliesToSubsequentIntroductions"],
		"uses"								: fieldsT["biosafetyDecision.uses"],
		"directUseDecisions"				: fieldsT["biosafetyDecision.directUseDecisions"],
		"decisionResult"					: fieldsT["biosafetyDecision.decisionResult"],
		"modifiedOrganisms"					: fieldsT["biosafetyDecision.modifiedOrganisms"],
		"riskAssessments"					: fieldsT["biosafetyDecision.riskAssessments"],
		"publishedOn"						: fieldsT["biosafetyDecision.publishedOn"]
	}
}

