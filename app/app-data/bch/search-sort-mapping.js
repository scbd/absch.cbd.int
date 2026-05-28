import fieldsTranslations from '~/app-text/app-data/bch/search-sort-mapping.json';
import { mergeTranslationKeys } from '~/services/translation-merge';

const fieldsT 		= mergeTranslationKeys(fieldsTranslations);


export const searchSortMapping = {	
    "biosafetyLaw":[
        { field:'entryIntoForce_dt', title: fieldsT['biosafetyLaw.entryIntoForce'],direction: 'asc' }
    ],
    "biosafetyDecision":[
        { field:'decisionDate_dt', title: fieldsT['biosafetyDecision.date'],direction: 'asc' }
    ],
    "nationalRiskAssessment":[
        { field:'riskAssessmentDate_dt', title: fieldsT['nationalRiskAssessment.date'],direction: 'asc' }
    ],
    "resource":[
        { field:'title_s', title: fieldsT['title'],direction: 'asc' },
        { field:'publicationDate_dt', title: fieldsT['resource.publicationDate'],direction: 'asc' }
    ],
    "organization":[
        { field:'title_s', title: fieldsT['organizationName'],direction: 'asc' }
    ],
    "modifiedOrganism":[
        { field:'uniqueIdentification_s', title: fieldsT['modifiedOrganism.uniqueIdentification'],direction: 'asc' },
        { field:'transformationEvent_s', title: fieldsT['modifiedOrganism.transformationEvent'],direction: 'asc' },
        { field:'identity_s', title: fieldsT['modifiedOrganism.identity'],direction: 'asc' }
    ],
    "organism":[
        { field:'scientificName_s', title: fieldsT['organism.scientificName'],direction: 'asc' }
    ],
    "dnaSequence":[
        { field:'name_s', title: fieldsT['dnaSequence.name'],direction: 'asc' },
        { field:'abbreviation_s', title: fieldsT['dnaSequence.abbreviation'],direction: 'asc' }
    ],
    "independentRiskAssessment":[
        { field:'riskAssessmentDate_dt', title: fieldsT['independentRiskAssessment.date'],direction: 'asc' }
    ],
    "capacityBuildingInitiative":[
        { field:'title_s', title: fieldsT['capacityBuildingInitiative.title'],direction: 'asc' },
        { field:'startDate_dt', title: fieldsT['capacityBuildingInitiative.startDate'],direction: 'asc' },
        { field:'endDate_dt', title: fieldsT['capacityBuildingInitiative.endDate'],direction: 'asc' }
    ]
}