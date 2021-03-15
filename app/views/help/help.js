import app from 'app';
import 'views/directives/help-directive';
import '/app/services/role-service';

	app.controller('HelpController', ['$scope','$rootScope', '$location', '$window', 'commonjs', 'roleService', function ($scope, $rootScope, $location, $window, commonjs, roleService) {


		$scope.isAdmin = function(){
				return roleService.isAdministrator();

			};

		}]);

