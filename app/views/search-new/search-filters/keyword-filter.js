define(['app'],  function(app, _) {

    app.directive('keywordFilter', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            templateUrl: '/app/views/search-new/search-filters/keyword-filter.html',
            scope: false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
              
               $scope.keywordSearchFilters = searchDirectiveCtrl.getSearchFilters("keyword");
               $scope.relatedFilters = {};

            },// link
            controller: function($scope){
                 
               
                
            },// controller
        };
    });
});