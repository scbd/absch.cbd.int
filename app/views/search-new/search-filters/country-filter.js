define(['app', 'underscore', '/app/js/common.js',
], function(app, _) {

    app.directive('countryFilter', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            templateUrl: '/app/views/search-new/search-filters/country-filter.html',
            scope: {

            },
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
               $scope.searchFilters = searchDirectiveCtrl.getSearchFilters("country");
               $scope.saveFilter = searchDirectiveCtrl.saveFilter;
               $scope.isFilterOn = searchDirectiveCtrl.isFilterOn;
               $scope.countryFilter = null;
               $scope.partyFilter = null;
               $scope.countries = $scope.searchFilters;
               $scope.keyword =  searchDirectiveCtrl.searchKeyword;      
               
               $scope.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
               
              //*************************************************************************************************************************************
               $scope.setCountryFilter = function(letter) {
                    $scope.countryFilter = letter;
                    if(letter==='All'){
                        $scope.countryFilter=null;
                        $scope.partyFilter = null;
                    }
               };
               
               //*************************************************************************************************************************************
               $scope.setPartyFilter = function(pfilter) {
                    $scope.partyFilter = pfilter;
               };
               
               //*************************************************************************************************************************************
               function filterParty(item) { 
                    if(!$scope.partyFilter) 
                        return true;
                    if($scope.partyFilter ==='party'){
                        return item.isNPParty;
                    }  
                    if($scope.partyFilter ==='nonparty'){
                        return !item.isNPParty;
                    }   
               };
               
               //*************************************************************************************************************************************
               $scope.showCountry = function(item) {
                    
                    if(!$scope.countryFilter) 
                        return filterParty(item);
                    else{
                        if(item.name[0] === $scope.countryFilter)
                            return filterParty(item);
                    }
               };
              
             

            }//link
        };
    });
});