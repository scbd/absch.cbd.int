define(['app', 'underscore', './app-config-service',
'components/scbd-angularjs-services/services/locale'], function(app, _) {

    app.factory('articlesService', ['$http',
        function($http) {
            return new function() {

                //================================================================================================================
                this.getArticles = function(qs, openInNew) {
                      
                        return $http.get('https://api.cbd.int/api/v2017/articles', {params: qs})
                          .then(function(results){
                                if((results||{}).data && results.data.length > 0)
                                {    
                                    var value = JSON.stringify(results.data);
                                    
                                    if(openInNew){
                                        value = openInNewWindow(value);
                                    }
                                    value = replaceOembed(value);

                                    return JSON.parse(value);
                                }
                        })
                }
                //================================================================================================================
                function openInNewWindow(str) {
                    return str.replace(/href=/g," target=\\\"_new_window_\\\" href=" );
                }
                
                //================================================================================================================
                 function replaceOembed(value) {

                        if(value.indexOf("<oembed") > 0){

                            value = value.replace(/www\.youtube\.com\/watch\?v\=/g, "www.youtube.com/embed/" );
                            value = value.replace(/vimeo\.com\//g, "player.vimeo.com/video/" );
                            value = value.replace(/\<oembed url=/g, "<iframe src=" );
                            value = value.replace(/\>\<\/oembed\>/g ," style=\\\"width: 100%; height: 450px;\\\" frameborder=\\\"0\\\" allow=\\\"autoplay; encrypted-media\\\" allowfullscreen=\\\"\\\"></iframe>" );
                            
                        }

                        return value;

                }

            }
        }
    ]);
});
