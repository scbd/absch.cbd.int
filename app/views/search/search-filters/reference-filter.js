define(['app'], function(app) {

    app.directive('referenceFilter', function($timeout) {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            templateUrl: '/app/views/search/search-filters/reference-filter.html',
            scope:false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
               $scope.rf_searchFilters = searchDirectiveCtrl.getSearchFilters('reference');
               
               
                  $timeout(function(){
                                $element.find('[data-toggle="tooltip"]').tooltip();
                            },50);
               
            }//link
        };
    });
});
