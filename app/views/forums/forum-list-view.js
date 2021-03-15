import app from 'app';
import 'cbd-forums';
    export default ["$scope", "$http", "$q", "$filter", "$timeout", "$location", "$route",
        function ($scope, $http, $q, $filter, $timeout, $location, $route) {

            //TODO : need a API to get facets
            var iac3_threads = $http.get('/api/v2014/discussions/forums/17415/threads');
            var iac4_threads = $http.get('/api/v2014/discussions/forums/17607/threads');
            var ahtegDSI_threads = $http.get('/api/v2014/discussions/forums/17446/threads');
            var art10_threads = $http.get('/api/v2014/discussions/forums/17316/threads');
            var cc_threads = $http.get('/api/v2014/discussions/forums/17451/threads');

            $q.when(iac3_threads).then(function (response) {
                $scope.iac3_threads = response.data.length;
            })
                .catch(function (error) {
                    console.log(error);
                });

            $q.when(iac4_threads).then(function (response) {
                $scope.iac4_threads = response.data.length;
            })
                .catch(function (error) {
                    console.log(error);
                });

            $q.when(ahtegDSI_threads).then(function (response) {
                $scope.ahtegDSI_threads = response.data.length;
            })
                .catch(function (error) {
                    console.log(error);
                });

            $q.when(art10_threads).then(function (response) {
                $scope.art10_threads = response.data.length;
            })
                .catch(function (error) {
                    console.log(error);
                });

            $q.when(cc_threads).then(function (response) {
                $scope.cc_threads = response.data.length;
            })
                .catch(function (error) {
                    console.log(error);
                });

        }];

