define(['app',
		'scbd-angularjs-services/locale'
        ], function (app, moment) {

    return ["$scope", "$location", "locale","$timeout", "$window",
		function ($scope, $location, locale, $timeout, $window){

				$scope.currentLanguage = locale;

				$timeout(function(){
					$window.location.href = $location.search().returnUrl;
				}, 1000);
		}];
});
