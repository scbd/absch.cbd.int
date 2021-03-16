import app from 'app';

	export { default as template } from './tours.html';
export default ['$scope', '$rootScope','$routeParams', function ($scope, $rootScope, $routeParams) {

        $scope.question = $routeParams.question;

		}];

