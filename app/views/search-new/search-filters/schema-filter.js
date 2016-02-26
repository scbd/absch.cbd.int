define(['app'], function(app) {

    app.directive('schemaFilter', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            templateUrl: '/app/views/search-new/search-filters/schema-filter.html',
            scope: {
                type:"@"
            },
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
               $scope.searchFilters = searchDirectiveCtrl.getSearchFilters($scope.type);
               $scope.saveFilter = searchDirectiveCtrl.saveFilter;
               $scope.isFilterOn = searchDirectiveCtrl.isFilterOn;
            }//link
        };
    });
});
