define(['app','text!views/search/search-filters/keyword-filter.html', 'lodash'],  function(app, template, _) {

    app.directive('keywordFilter', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            template: template, 
            scope: false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
              
               $scope.keywordSearchFilters = searchDirectiveCtrl.getSearchFilters("keyword");
                if($scope.realm.is('BCH'))
                    $scope.keywordSearchFiltersNoDups =   searchDirectiveCtrl.getSearchFilters("keyword");
                else
                    $scope.keywordSearchFiltersNoDups =   searchDirectiveCtrl.getSearchFiltersByParent("ABS Thematic Areas");

               $scope.relatedFilters = {};

            }
        };
    });
});
