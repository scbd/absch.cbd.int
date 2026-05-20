import fieldsTranslations from '~/app-text/app-data/common-search-sort-mapping.json';
import { mergeTranslationKeys } from '~/services/translation-merge';

const fieldsT 		= mergeTranslationKeys(fieldsTranslations);


export const searchSortMapping = [
    {field:'relevance', title: fieldsT['relevance'],direction: 'asc'},
    {field:'updatedDate_dt', title: fieldsT['updatedDate'],direction: 'asc'},
    {field:'schema_EN_s'   , title: fieldsT['schema'],direction: 'asc'},
    {field:'government_EN_s', title: fieldsT['government'],direction: 'asc'},
    {field:'uniqueIdentifier_s', title: fieldsT['uniqueIdentifier'],direction: 'asc'}
]    
