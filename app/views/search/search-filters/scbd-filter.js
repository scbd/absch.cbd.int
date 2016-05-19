define(['app'], function(app) {

    app.directive('scbdFilter', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            templateUrl: '/app/views/search/search-filters/scbd-filter.html',
            scope:false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
               $scope.sf_searchFilters = searchDirectiveCtrl.getSearchFilters('scbd');
            }//link
        };
    });
});
