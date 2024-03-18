import fpCategoryTitleTranslations from '~/app-text/report-analyzer/bch-focal-point-category.json';
import { mergeTranslationKeys } from '../../services/translation-service';
const fpCategoryTitle = mergeTranslationKeys(fpCategoryTitleTranslations);

export const categories = [
    { 
        "title": fpCategoryTitle.cpNfp, 
        "key" : "CPB-FP1" 
    },
    { 
        "title": fpCategoryTitle.bchNfp, 
        "key" : "BCH-FP"
    },
    { 
        "title": fpCategoryTitle.emCp, 
        "key" : "CPB-A17-FP"
    }
];
