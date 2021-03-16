import app from 'app';

	export { default as template } from './about.html';
export default ['$scope', '$rootScope','$routeParams', function ($scope, $rootScope, $routeParams) {

        $scope.question = $routeParams.question;

		}];

