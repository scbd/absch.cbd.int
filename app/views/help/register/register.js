import app from 'app';

	app.controller('RegisterController', ['$scope', '$rootScope','$routeParams', function ($scope, $rootScope, $routeParams) {

        $scope.question = $routeParams.question;

		}]);

