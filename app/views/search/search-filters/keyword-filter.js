define(['app','text!./keyword-filter.html', 'lodash'],  function(app, template, _) {

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
               $scope.relatedFilters = {};

                $scope.hasCounts  = function(item){
                    if((($scope.$parent.searchResult.data||{}).facets||{}).keywords)
                        return $scope.$parent.searchResult.data.facets.keywords[item.id] > 0
                }

                $scope.ngRepeatFinished = function(){
                    $element.find('[data-toggle="tooltip"]').tooltip();
                }
            }
        };
    });
});
