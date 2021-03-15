import app from 'app';

	app.controller('ToursController', ['$scope', '$rootScope','$routeParams', function ($scope, $rootScope, $routeParams) {

        $scope.question = $routeParams.question;

		}]);

