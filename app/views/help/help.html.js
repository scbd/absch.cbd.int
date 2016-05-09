define(['app','/app/views/directives/help-directive.html.js', '/app/services/role-service.js'], function (app) {

	app.controller('HelpController', ['$scope','$rootScope', '$location', '$window', 'commonjs', 'roleService', function ($scope, $rootScope, $location, $window, commonjs, roleService) {


		$scope.isAdmin = function(){
				return roleService.isAbsAdministrator() ||
				roleService.isAdministrator()

			};

		}]);
});
