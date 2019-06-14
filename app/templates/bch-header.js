define(['app', 'text!./bch-header.html','ng-breadcrumbs', 'js/common', 'components/scbd-angularjs-services/services/locale'], function (app, html) { 'use strict';

    app.directive('bchHeader', ['locale', '$location','breadcrumbs', 'commonjs', '$q',  function (locale, $location, breadcrumbs, commonjs, $q) {
        return {
            restrict: 'E',
            template: html,
            link: function($scope) {

                $scope.breadcrumbs     = breadcrumbs;
                
                var sortField = 'name.'+(locale||'en');
                $q.when(commonjs.getCountries(sortField))
                .then(function(res){
                    $scope.countries = res;
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
