import fieldsT from '../../app-text/views/search/search-results/bch-download-schemas.json';
import { downloadSchemas as commonDownloadSchemas } from '../common-download-schemas.js';

export const downloadSchemas = {	
	...commonDownloadSchemas,

	"supplementaryAuthority":{
		"uniqueIdentifier":"supplementaryAuthority.uniqueIdentifier",
		"government":"supplementaryAuthority.government",
		"name":"supplementaryAuthority.name"
	}
}

