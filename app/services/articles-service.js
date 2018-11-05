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
                                {    
                                   return results.data;
                                }
                        })
                }
                //  //================================================================================================================
                //  this.checkForVideo = function(str) {
                    
                //     if(str.)
                    
                //     return false;

                //  }
                  //================================================================================================================
                  function replaceOembed(value) {

                    if(value){
                  
                        if(value.indexOf("<oembed") > 0){
                            value = value.replace("https://www.youtube.com/watch?v=","https://www.youtube.com/embed/" );
                            value = value.replace("https://vimeo.com/","https://player.vimeo.com/video/" );
                            value = value.replace("<oembed url=\"","<iframe src='" );
                            value = value.replace("\"></oembed>","' style='width: 100%; height: 450px;' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen=''></iframe>" );
                            }

                        return value;
                    }

                }
                // return (
                //     '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
                //         `<iframe src="https://www.youtube.com/embed/${ id }" ` +
                //             'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                //             'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
                //         '</iframe>' +
                //     '</div>'
                // );

                
            }
        }
    ]);
});
