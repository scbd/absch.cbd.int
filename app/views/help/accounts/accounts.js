import app from 'app';

	app.controller('AccountsController', ['$scope', '$rootScope','$routeParams', function ($scope, $rootScope, $routeParams) {

        $scope.question = $routeParams.question;

		}]);

