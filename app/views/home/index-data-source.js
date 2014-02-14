module.exports = ['$scope', '$http', function ($scope, $http) {

    $scope.data = $http.get('/api/v2013/index/?q=realm_s:absch&rows=0&wt=json&facet=true&facet.query=schema_s:focalPoint&facet.query=schema_s:authority&facet.query=schema_s:database&facet.query=schema_s:measure').then(function (response) {
        return response.data;
    });

}];