define(['app', 'underscore', './local-storage-service', './app-config-service',
'components/scbd-angularjs-services/services/locale'], function(app, _) {

    app.factory('articlesService', ['$http', '$q', 'localStorageService', 'appConfigService', 'locale',
        function($http, $q, realm, localStorageService, appConfigService, locale) {
            return new function() {

                //================================================================================================================
                this.getArticles = function(qs) {
                      
                        return $http.get('https://api.cbd.int/api/v2017/articles', {params: qs})
                          .then(function(results){
                                if((results||{}).data && results.data.length > 0)
                                    return results.data;
                           
                        })
                }

                
            }
        }
    ]);
});
