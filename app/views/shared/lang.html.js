define(['app',
		'scbd-angularjs-services/locale'
        ], function (app, moment) {
    return ["$scope", "$location", "locale","$timeout", "$window", "$routeParams",
		function ($scope, $location, locale, $timeout, $window, $routeParams){
			    var lang = 'en';
				if($routeParams.langCode)
					lang = $routeParams.langCode;
					
				document.cookie="Preferences=Locale="+lang;
                $scope.currentLanguage = lang;

				$timeout(function(){
					$window.location.href = $location.search().returnUrl;
				}, 1000);
		}];
});
