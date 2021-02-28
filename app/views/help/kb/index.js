define(['app', 'views/kb/home', 'angular-vue', 'components/scbd-angularjs-services/main'], function (app, kbHome) {

	return ['$scope', '$rootScope','$routeParams', 'locale', 'apiToken', function ($scope, $rootScope, $routeParams, locale, apiToken) {

        $scope.tokenReader = function(){ return apiToken.get()}
        // $scope.question = $routeParams.question;
		$scope.vueOptions = {
			components: { kbHome: kbHome },
			i18n: new VueI18n({ locale: locale, fallbackLocale: 'en', })
		};
	}];
});
