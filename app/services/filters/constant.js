import numbers from '~/app-text/common/numbers.json'; 
import { mergeTranslationKeys } from '../../services/translation-merge';
const numbersText = mergeTranslationKeys(numbers);
export const THESAURUS = {
    COUNTRIES                         : "countries", 
    JURISDICTIONS                     : "50AC1489-92B8-4D99-965A-AAE97A80F38E",  
    APPROVED_STATUS                   : "E27760AB-4F87-4FBB-A8EA-927BDE375B48",  
    APPROVING_BODY                    : "F1A5BFF1-F555-40D1-A24C-BBE1BE8E82BF",  
    REPORT_STATUS                     : "7F0D898A-6BF1-4CE6-AA77-7FEAED3429C6",  
    REPORT_TYPES                      : "2FD0C77B-D30B-42BC-8049-8C62D898A193"  
}

export const PAGINATION_OPTIONS_WITH_ALL = [
    { value: 25, label: numbersText.twentyFive },
    { value: 50, label: numbersText.fifty },
    { value: 100, label: numbersText.oneHundred },
    { value: 10000, label: numbersText.allNumbers }];

export const PAGINATION_OPTIONS_DEFAULT = [
    { value: 25, label: numbersText.twentyFive },
    { value: 50, label: numbersText.fifty },
    { value: 100, label: numbersText.oneHundred },
    { value: 300, label: numbersText.threeHundred }];

export const CACHE_PAGINATION_DOCUMENT_SELECTOR_PAGE_SIZE = 'userPreferenceDocumentSelectorPageSize';
export const CACHE_PAGINATION_REFERENCED_RECORDS_PAGE_SIZE = 'userPreferenceReferenceRecordsPageSize';
export const CACHE_PAGINATION_SEARCH_PAGE_SIZE = 'userPreferenceSearchResultPageSize';