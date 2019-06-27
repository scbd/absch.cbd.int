define(['app','views/directives/help-directive', '/app/services/role-service'], function (app) {

	app.controller('HelpController', ['$scope','$rootScope', '$location', '$window', 'commonjs', 'roleService', function ($scope, $rootScope, $location, $window, commonjs, roleService) {


		$scope.isAdmin = function(){
				return roleService.isAdministrator();

			};

		}]);
});
