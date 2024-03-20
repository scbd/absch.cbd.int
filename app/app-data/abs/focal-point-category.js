import fpCategoryTitleTranslations from '~/app-text/report-analyzer/abs-focal-point-category.json';
import { mergeTranslationKeys } from '../../services/translation-merge';
const fpCategoryTitle = mergeTranslationKeys(fpCategoryTitleTranslations);

export const categories = [
    { 
        "title": fpCategoryTitle.absNfp, 
        "key" : "NP-FP ABS-FP" 
    },
    { 
        "title": fpCategoryTitle.cbdNfp, 
        "key" : "CBD-FP1"
    },    
    { 
        "title": fpCategoryTitle.cbdSfp, 
        "key" : "CBD-FP2"
    },
    { 
        "title": fpCategoryTitle.pNfp, 
        "key" : "Protected Areas NFP"
    },    
    { 
        "title": fpCategoryTitle.gNfp, 
        "key" : "GTI NFP"
    }
];