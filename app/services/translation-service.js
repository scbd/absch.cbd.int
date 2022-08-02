import app from '~/app';

app.factory('translationService',  ['locale', function(locale) {

    let localeCache = {};
    const appLocale = locale || 'en'

    return new function(){ 

        this.set = function (key, values) {
            if(!localeCache)
                localeCache = {}

            if(!localeCache[appLocale])
                localeCache[appLocale] = {};

            localeCache[appLocale][key] = values;
        };

        this.get = function(key){
            
            key = key || '';

            const keys = key.split('.');
            if(keys.length != 2)
                throw new Error('Invalid translation key, expected format `key.fieldName`');

            const baseKeyInfo = localeCache[appLocale][keys[0]];

            if(baseKeyInfo){
                return baseKeyInfo[keys[1]] || key;
            }

            
            return key;                
        };
        
        this.remove = function(key){
            appLocale[appLocale][key] = undefined
        };

        this.removeAll = function(){
            localeCache[appLocale] = {};
        };
    };

}]);

app.filter('$translate', ['translationService', function(translationService){

    return function(key){
        return translationService.get(key) || key;
    };

}])

