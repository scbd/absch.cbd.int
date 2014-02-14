$compile.directive('countryProfile', ['authHttp', '$location', function ($http, $location) {
    return {
        priority: 0,
        restrict: 'EAC',
        templateUrl: '/app/abs/directives/countries/countryProfile.partial.html',
        replace: true,
        transclude: true,
        controller: ['$scope', function ($scope) {

            $scope.$watch(function () { return $location.path() }, function (path) {

                var code = path.replace('/', '');
                
                $scope.country = $http.get('/api/v2013/countries/' + code.toUpperCase()).then(function (response) {
                    response.data.name = response.data.name.en; // TODO: L10N
                    return response.data;
                });

                $http.get("/api/v2013/index/select?q=government_s:" + code.toLowerCase() + "&rows=0&wt=json&facet=true&facet.field=schema_CEN_s").then(function (response) {
                    
                    var facets_data = response.data.facet_counts.facet_fields.schema_CEN_s;
                    var facets = [];

                    for (var i = 0; i < facets_data.length; i += 2) {
                        var facet = JSON.parse(facets_data[i]);
                        facet.count = facets_data[i + 1];
                        facets.push(facet);
                    }

                    $scope.facets = facets;
                });
            });
        }]
    }
}])