define(['app',
		'scbd-angularjs-services/locale'
        ], function (app, moment) {

    return ["$scope", "$location", "locale","$timeout", "$window", "$routeParams", "$cookies",
		function ($scope, $location, locale, $timeout, $window, $routeParams, $cookies){
			    var lang = 'en';
				if($routeParams.langCode)
					lang = $routeParams.langCode;

				$cookies.put("locale", lang, {path: "/"});	
                $scope.currentLanguage = lang;

				$timeout(function(){
					var langRegex = new RegExp('^\/(ar|en|es|fr|ru|zh)');
					var returnUrl = $location.search().returnUrl;

					if(!langRegex.test(returnUrl)){
						returnUrl = '/' + lang + '/' + returnUrl.replace(/^\//, ''); 
					}
					$window.location.href = returnUrl;
				}, 1000);
		}];
});
