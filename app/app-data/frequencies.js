import frequenciesTranslations from '~/app-text/views/register/user-preferences/frequency.json'
import { mergeTranslationKeys } from '../services/translation-merge';
const frequenciesT = mergeTranslationKeys(frequenciesTranslations);

export const frequencies =
{ 
    "daily"  : frequenciesT.daily,
    "weekly" : frequenciesT.weekly,
    "monthly": frequenciesT.monthly,
    "never"  : frequenciesT.never
};