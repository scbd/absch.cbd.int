import app from 'app';

	app.controller('SearchController', ['$scope', '$rootScope','$routeParams', function ($scope, $rootScope, $routeParams) {

        $scope.question = $routeParams.question;

		}]);

