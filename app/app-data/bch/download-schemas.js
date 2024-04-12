import fieldsTranslations from '../../app-text/views/search/search-results/bch-download-schemas.json';
import { mergeTranslationKeys } from '../../services/translation-merge';
const fieldsT = mergeTranslationKeys(fieldsTranslations);
import { downloadSchemas as commonDownloadSchemas } from '../common-download-schemas.js';

export const downloadSchemas = {	
	...commonDownloadSchemas,

	"supplementaryAuthority":{
		"uniqueId": fieldsT["supplementaryAuthority.uniqueId"],
		"government":fieldsT["supplementaryAuthority.government"],
		"name":fieldsT["supplementaryAuthority.name"],
		"publishedOn": fieldsT["supplementaryAuthority.publishedOn"]
	},
	"laboratoryDetection":{
		"uniqueIdentifier": fieldsT["laboratoryDetection.uniqueIdentifier"],
		"organization": fieldsT["laboratoryDetection.organization"],
		"services": fieldsT["laboratoryDetection.services"],
		"agreements": fieldsT["laboratoryDetection.agreements"],
		"certifications": fieldsT["laboratoryDetection.certifications"],
		"detectionMethods": fieldsT["laboratoryDetection.detectionMethods"],
		"lmoTypes": fieldsT["laboratoryDetection.lmoTypes"],
		"detectableLmos": fieldsT["laboratoryDetection.detectableLmos"],
		"detectableGenes": fieldsT["laboratoryDetection.detectableGenes"],
		"publishedOn": fieldsT["laboratoryDetection.publishedOn"]
	}
}

