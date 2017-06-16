define(['app','underscore', 'json!/app/app-data/help-videos.json', './left-menu.js',
'scbd-angularjs-services/locale'], function (app, _, videosData) {
app.controller("commonFormatsController",
	["$rootScope", "$scope", "$q", '$element', '$route', 'locale',
     function ($rootScope, $scope, $q, $element, $route, locale) {

        $scope.language = locale;

        if($route.current.params.commonFormat){
            var link = $element.find('#'+$route.current.params.commonFormat.toUpperCase());
            
            if(link)
                window.location = link.attr('href').replace('{{language}}', locale);
        }


   }]);
});
