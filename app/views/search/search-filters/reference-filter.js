define(['app',
'text!/app/views/search/search-filters/reference-filter.html'], function(app, template) {

    app.directive('referenceFilter', function($timeout) {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            template: template, 
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
