define(['app'], function (app) {

	app.controller('FormHelpController', ['$scope', '$rootScope','$routeParams','$location', function ($scope, $rootScope, $routeParams, $location) {


		$scope.path=$location.path();



		}]);
});
