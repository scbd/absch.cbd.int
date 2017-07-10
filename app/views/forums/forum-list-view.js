define(['app', 'cbd-forums'], function(app) {
    return["$scope", "$http", "$q", "$filter", "$timeout", "$location", "$route",
        function($scope, $http, $q, $filter, $timeout, $location, $route) {

            //TODO : need a API to get facets
            var iac = $http.get('/api/v2014/discussions/forums/17415/threads');
            var jointIac = $http.get('/api/v2014/discussions/forums/17446/threads');
            var vlr = $http.get('/api/v2014/discussions/forums/17384/threads');
            var car = $http.get('/api/v2014/discussions/forums/17378/threads');
            var art13 = $http.get('/api/v2014/discussions/forums/17316/threads');

            //
            if($scope.training_env || $scope.development_env)
                iac = $http.get('/api/v2014/discussions/forums/17433/threads');
                jointIac = $http.get('/api/v2014/discussions/forums/17446/threads');

    	     $q.when(iac).then(function(response) {
                 $scope.iacThreads = response.data.length;
             })
             .catch(function(error){
                console.log(error);
            });
            
            $q.when(jointIac).then(function(response) {
                 $scope.jointIacThreads = response.data.length;
             })
             .catch(function(error){
                console.log(error);
            });

            $q.when(vlr).then(function(response) {
                 $scope.vlrThreads = response.data.length;
             })
             .catch(function(error){
                console.log(error);
            });
            $q.when(car).then(function(response) {
                $scope.carThreads = response.data.length;
            })
            .catch(function(error){
                console.log(error);
            });

            $q.when(art13).then(function(response) {
                $scope.art10Threads = response.data.length;
            })
            .catch(function(error){
                console.log(error);
            });


        }];
});
