require("app").controller("ProfileController", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {

  $scope.code = $routeParams.code;

	//*******************************************************
	$scope.countries = $http.get('/api/v2013/countries/'+ $scope.code, { cache: true }).then(function (response) {
        $scope.country = response.data;
      
    });

    

}]);
