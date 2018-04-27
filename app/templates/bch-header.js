define(['app', 'text!./bch-header.html'], function (app, html) { 'use strict';

    app.directive('bchHeader', ['$http', '$location', function ($http, $location) {
        return {
            restrict: 'E',
            template: html,
            link: function($scope) {
                $http.get('/api/v2015/countries', {params: { f: { code:1, name:1 } }, cache:1 }).then(function(res){
                    $scope.countries = res.data;
                });

                $scope.isEnterPressed = function($event){
                    if($event === true || $event.which === 13){

                        $location.path('/search/nationalRecords').search({text : ($scope.searchQuery||'')})
                        $scope.searchQuery='';
                    }
                }
            }
        };
    }]);
});
