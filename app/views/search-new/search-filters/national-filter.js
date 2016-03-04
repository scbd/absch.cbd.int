define(['app'], function(app) {

    app.directive('nationalFilter', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            templateUrl: '/app/views/search-new/search-filters/national-filter.html',
            scope:false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
               
               $scope.nf_searchFilters = searchDirectiveCtrl.getSearchFilters('national');
              
              
              
               
               
            }//link
        };
    });
});
