define(['app', 'text!./region-filter.html','lodash', 'js/common',
], function(app, template, _) {

    app.directive('regionFilter', ['locale', function(locale) {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            template: template, 
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
                  if(item.name && item.name['en'].indexOf("CBD Regional Groups") >= 0 ){
                      
                      return true;
                  }
                  return false;
               };
               
                //===================================================================
               $scope.alphabetFilter = function(item){
                   if(!$scope.regionAlphabetFilter)
                    return true;
                    
                   return item && item.name[locale].startsWith($scope.regionAlphabetFilter);
               };
            }//link
        };
    }]);
});
