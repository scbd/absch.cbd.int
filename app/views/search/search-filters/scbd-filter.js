define(['app','text!./scbd-filter.html'
], function(app, template) {

    app.directive('scbdFilter', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            template: template, 
            scope:false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
               $scope.sf_searchFilters = searchDirectiveCtrl.getSearchFilters('schema', function(item){
                return item.otherType == 'scbd'
            })
            }//link
        };
    });
});
