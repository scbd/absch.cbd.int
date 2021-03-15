import app from 'app';

	app.controller('AboutController', ['$scope', '$rootScope','$routeParams', function ($scope, $rootScope, $routeParams) {

        $scope.question = $routeParams.question;

		}]);

