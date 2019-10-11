define(['app',
'text!views/search/search-filters/reference-filter.html'], function(app, template) {

    app.directive('referenceFilter', function($timeout) {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            template: template, 
            scope:false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
               $scope.rf_searchFilters = searchDirectiveCtrl.getSearchFilters('schema', function(item){
                return item.otherType == 'reference'
            })
               
               
                  $timeout(function(){
                                $element.find('[data-toggle="tooltip"]').tooltip();
                            },50);
               
            }//link
        };
    });
});
