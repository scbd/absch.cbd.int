define(['app', 'cbd-forums'], function(app) {
    return["$scope", "$http", "$q", "$filter", "$timeout", "$location", "$route",
        function($scope, $http, $q, $filter, $timeout, $location, $route) {

            //TODO : need a API to get facets
            var iac = $http.get('/api/v2014/discussions/forums/17345/threads');
            var vlr = $http.get('/api/v2014/discussions/forums/17384/threads');
            var car = $http.get('/api/v2014/discussions/forums/17378/threads');

            $q.all([iac,vlr, car]).then(function(response) {

                $scope.iacThreads = response[0].data.length;
                $scope.vlrThreads = response[1].data.length;
                $scope.carThreads = response[2].data.length;

            });


        }];
});
