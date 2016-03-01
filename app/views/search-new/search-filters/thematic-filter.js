define(['app', 'underscore', '/app/js/common.js',
], function(app, _) {

    app.directive('thematicFilter', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            templateUrl: '/app/views/search-new/search-filters/thematic-filter.html',
            scope: {

            },
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
               //$scope.searchFilters = searchDirectiveCtrl.getSearchFilters("");
               $scope.saveFilter = searchDirectiveCtrl.saveFilter;
               $scope.isFilterOn = searchDirectiveCtrl.isFilterOn;
               $scope.keyword =  searchDirectiveCtrl.searchKeyword;      
               
               
              
             

            }//link
        };
    });
});