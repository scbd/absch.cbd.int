import app from '~/app';

	export { default as template } from './help.html';
export default ['$scope', '$rootScope','$routeParams','$location', function ($scope, $rootScope, $routeParams, $location) {


		$scope.path=$location.path();



		}];

