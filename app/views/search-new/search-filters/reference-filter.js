define(['app'], function(app) {

    app.directive('referenceFilter', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            templateUrl: '/app/views/search-new/search-filters/reference-filter.html',
            scope:false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
               $scope.rf_searchFilters = searchDirectiveCtrl.getSearchFilters('reference');
               
            }//link
        };
    });
});
