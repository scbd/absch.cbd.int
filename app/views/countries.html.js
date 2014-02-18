require("app").controller("CountriesController", ["$scope", "authHttp", function ($scope, $http) {



 $scope.countries = $http.get('/api/v2013/countries/').then(function (response) {
        return response.data;
    });


}]);