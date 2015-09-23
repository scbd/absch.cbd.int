define(['app','/app/views/directives/help-directive.html.js'], function (app) {

	app.controller('HelpController', ['$scope','$rootScope', '$location', '$window', 'commonjs', function ($scope, $rootScope, $location, $window, commonjs) {


		$scope.isAdmin = function(){
				return commonjs.isUserInRole($rootScope.getRoleName('AbsAdministrator')) ||
				commonjs.isUserInRole($rootScope.getRoleName('Administrator'))

			};

		}]);
});
