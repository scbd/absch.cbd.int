import app from '~/app';
import 'angular-cookies';
import '~/components/scbd-angularjs-services/main';
import '~/services/main';
import langT from '~/app-text/views/shared/lang.json';
    export { default as template } from './lang.html';
export default ["$scope", "$location", "locale","$timeout", "$window", "$routeParams", "$cookies", 'localStorageService', 'realm', 'translationService',
		function ($scope, $location, locale, $timeout, $window, $routeParams, $cookies, localStorageService, realm, translationService){
				translationService.set('langT', langT);
				$scope.chShortName = realm.chShortName;
				$scope.email = realm.email;
			    var lang = 'en';
				if($routeParams.langCode)
					lang = $routeParams.langCode;
				$cookies.put("locale", lang, {path: "/"});	
                $scope.currentLanguage = lang;
				localStorageService.remove("searchFilters");
				
				$timeout(function(){
					var langRegex = new RegExp('^\/(ar|en|es|fr|ru|zh)(\/|$)');
					var returnUrl = $location.search().returnUrl;

					if(!langRegex.test(returnUrl)){
						returnUrl = '/' + lang + '/' + returnUrl.replace(/^\//, ''); 
					}
					$window.location.href = returnUrl;
				}, 1000);
		}];

