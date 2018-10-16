define(['app', 'underscore', './local-storage-service', './app-config-service',
'components/scbd-angularjs-services/services/locale'], function(app, _) {

    app.factory('articlesService', ['$http', '$q', 'localStorageService', 'appConfigService', 'locale',
        function($http, $q, realm, localStorageService, appConfigService, locale) {
            return new function() {

                //================================================================================================================
                this.getArticlesByAdminTags = function(str) {
                        
                        var tags = str.toString().split(",");
                        var ag = [];

                        for(var i=0;i < tags.length;++i){
                          ag.push({"$match":{"$and":[{"adminTags.title.en":tags}]}});
                        }
                        ag.push({"$project" : {"title":1, "content":1, "coverImage":1, "meta":1}});
                        
                        var qs = {
                          "ag" : JSON.stringify(ag)
                        };
                
                        return $q.when($http.get('https://api.cbd.int/api/v2017/articles', {params: qs}))
                          .then(function(results){
                            return results.data;
                        })
                }

                
            }
        }
    ]);
});
