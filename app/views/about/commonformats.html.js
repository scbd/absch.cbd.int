﻿define(['app','underscore', 'json!/app/app-data/help-videos.json', 'scbd-angularjs-services/locale'], function (app, _, videosData) {
app.controller("commonFormatsController",
	["$rootScope", "$scope", "$q", '$element', '$route', 'locale', '$element',
     function ($rootScope, $scope, $q, $element, $route, locale, $element) {

        $scope.language = locale;

        if($route.current.params.commonFormat){
            var link = $element.find('#'+$route.current.params.commonFormat.toUpperCase());
            
            if(link)
                window.location = link.attr('href').replace('{{language}}', locale);
        }


   }]);
});
