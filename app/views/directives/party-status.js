define(['app', '/app/js/common.js'], function(app) {
    app.directive('ngPartyStatus', [
        '$rootScope', '$filter', '$timeout', 'commonjs', '$q',
        function($rootScope, $filter, $timeout, commonjs, $q) {
            return {
                restrict: 'EAC',
                templateUrl : '/app/views/directives/party-status.html',
                scope : {
                    government : '='
                },
                link: function($scope, elem, attrs) {
                    console.log($scope.government);
                    $q.when(commonjs.getCountry($scope.government.identifier.toUpperCase()))
                    .then(function(country){
                        console.log(country);
                        $scope.partyStatus = country;
                    });
                }
            };
        }
    ]);

});
