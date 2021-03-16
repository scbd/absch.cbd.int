import app from 'app';
import 'views/directives/help-directive';
import '/app/services/role-service';

	export { default as template } from './help.html';
export default ['$scope','$rootScope', '$location', '$window', 'commonjs', 'roleService', function ($scope, $rootScope, $location, $window, commonjs, roleService) {


		$scope.isAdmin = function(){
				return roleService.isAdministrator();

			};

		}];

