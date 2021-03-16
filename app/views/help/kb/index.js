import app from 'app';
import kbHome from 'views/kb/home';
import 'angular-vue';
import 'components/scbd-angularjs-services/main';

	export { default as template } from './index.html';
export default ['$scope', '$rootScope','$routeParams', 'locale', 'apiToken', function ($scope, $rootScope, $routeParams, locale, apiToken) {

        $scope.tokenReader = function(){ return apiToken.get()}
        // $scope.question = $routeParams.question;
		$scope.vueOptions = {
			components: { kbHome: kbHome },
			i18n: new VueI18n({ locale: locale, fallbackLocale: 'en', })
		};
	}];

