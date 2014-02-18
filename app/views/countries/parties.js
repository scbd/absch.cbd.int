require("app").directive('parties', ['$http', function ($http) {
    return {
        priority: 0,
        restrict: 'EC',
        templateUrl: '/app/views/countries/parties.partial.html',
        controller: ['$scope', function ($scope) {

            $scope.countries = $http.get('/api/v2013/countries/').then(function (response) {
                return _.map(response.data, function (country) {
                    country.name = country.name.en; // TODO: L10N
                    return country;
                });
            });
        }]
    };
}]);