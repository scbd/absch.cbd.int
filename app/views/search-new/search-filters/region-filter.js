define(['app', 'underscore', '/app/js/common.js',
], function(app, _) {

    app.directive('regionFilter', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            templateUrl: '/app/views/search-new/search-filters/region-filter.html',
            scope: false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {

               $scope.cf_regions = searchDirectiveCtrl.getSearchFilters("region");
               $scope.regionAlphabetFilter = null;
               $scope.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

              //===================================================================
               $scope.cf_setRegionFilter = function(letter) {
                    $scope.regionAlphabetFilter = letter;
                    if(letter==='All'){
                        $scope.regionAlphabetFilter=null;
                    }
               };
               
               
                //===================================================================
               $scope.IsCBDRegion = function(item) {
                  if(item.name.indexOf("CBD Regional Groups") >= 0 ){
                      
                      return true;
                  }
                  return false;
               };
               
                //===================================================================
               $scope.alphabetFilter = function(item){
                   if(!$scope.regionAlphabetFilter)
                    return true;
                    
                   return item && item.name.startsWith($scope.regionAlphabetFilter);
               };
            }//link
        };
    });
});
