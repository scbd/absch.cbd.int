define(['app', 'text!./bch-header.html'], function (app, html) { 'use strict';

    app.directive('bchHeader', ['$http', function ($http) {
        return {
            restrict: 'E',
            template: html,
            link: function($scope) {
                $http.get('/api/v2015/countries', {params: { f: { code:1, name:1 } }, cache:1 }).then(function(res){
                    $scope.countries = res.data;
                });
            }
        };
    }]);
});
