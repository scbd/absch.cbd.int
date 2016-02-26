define(['app', 'underscore', '/app/js/common.js',
], function(app, _, $http) {

    app.directive('countryFilter', function($http) {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            templateUrl: '/app/views/search-new/search-filters/country-filter.html',
            scope: {

            },
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
               $scope.searchFilters = searchDirectiveCtrl.getSearchFilters("country");
               $scope.saveFilter = searchDirectiveCtrl.saveFilter;
               $scope.isFilterOn = searchDirectiveCtrl.isFilterOn;

            }//link
        };
    });
});