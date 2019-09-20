define(['app', 'text!views/search/search-filters/country-filter.html','lodash', 'js/common',
], function(app, template, _) {

    app.directive('countryFilter', function() {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            template: template, 
            scope: false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
               
               $scope.cf_countries = searchDirectiveCtrl.getSearchFilters("country");
               $scope.cf_countryFilter = null;
               $scope.cf_partyFilter = null;
               $scope.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
               
              //*************************************************************************************************************************************
               $scope.cf_setCountryFilter = function(letter) {
                    $scope.cf_countryFilter = letter;
                    if(letter==='All'){
                        $scope.cf_countryFilter=null;
                        $scope.cf_partyFilter = null;
                    }
               };
               
               //*************************************************************************************************************************************
               $scope.cf_setPartyFilter = function(pfilter) {
                    $scope.cf_partyFilter = pfilter;
               };
               
               //*************************************************************************************************************************************
               function cf_filterParty(item) { 
                    if(!$scope.cf_partyFilter) 
                        return true;
                    if($scope.cf_partyFilter ==='party'){
                        return item.isAppProtocolParty;
                    }  
                    if($scope.cf_partyFilter ==='nonparty'){
                        return !item.isAppProtocolParty;
                    } 
                    if($scope.cf_partyFilter ==='inbetween'){
                        return item.isNPInbetweenParty;
                    }     
               };
               
               //*************************************************************************************************************************************
               $scope.cf_showCountry = function(item) {
                    
                    if(!$scope.cf_countryFilter) 
                        return cf_filterParty(item);
                    else{
                        if(item.name[0] === $scope.cf_countryFilter)
                            return cf_filterParty(item);
                    }
               };
               
               
              
             

            }//link
        };
    });
});
