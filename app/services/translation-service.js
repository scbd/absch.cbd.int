import app from '~/app';

app.factory('translationService',  ['locale', function(locale) {

    const defaultLocale = 'en'
    let localeCache = {};

    return new function(){ 

        this.set = function (store, values) {
            localeCache[store] = values;
        };

        this.get = function(key){
            
            key = key || '';

            const entries = key.split('.');
            if(entries.length != 2)
                throw new Error('Invalid translation key, expected format `key.fieldName`');

            const [store, field] = entries;

            const cacheData = localeCache[store];

            if(cacheData){
                let value = null;

                if(!value) value = (cacheData[locale]       ||{})[field];
                if(!value) value = (cacheData[defaultLocale]||{})[field];
                if(!value) key;

                return value;
            }
            
            return key;                
        };
        
        this.remove = function(key){
            delete localeCache[key];
        };

        this.removeAll = function(){
            localeCache = {};
        };
    };

}]);

app.filter('$translate', ['translationService', function(translationService){

    return function(key){
        return translationService.get(key) || key;
    };

}])

export const mergeTranslationKeys = function(translations){

    const { en, ...others } = translations;

    const flattenTranslation = Object.assign({}, {...en}, ...Object.values(others));

    return flattenTranslation;
}

