
export const mergeTranslationKeys = function(translations){

    const { en, ...others } = translations;

    const flattenTranslation = Object.assign({}, {...en}, ...Object.values(others));

    return flattenTranslation;
}

