import fieldsT from '../../app-text/views/search/search-results/bch-download-schemas.json';
import { downloadSchemas as commonDownloadSchemas } from '../common-download-schemas.js';

export const downloadSchemas = {	
	...commonDownloadSchemas,

	"supplementaryAuthority":{
		"uniqueIdentifier": fieldsT["supplementaryAuthority.uniqueIdentifier"],
		"government":fieldsT["supplementaryAuthority.government"],
		"name":fieldsT["supplementaryAuthority.name"]
	}
}

