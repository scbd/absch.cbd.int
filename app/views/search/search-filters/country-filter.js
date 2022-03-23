import app from 'app';
import template from 'text!./country-filter.html';
import _ from 'lodash';
import 'services/main';
import alphabets from '~/app-data/common/search/alphabets.json'

    app.directive('countryFilter', ['locale', function(locale) {
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
               $scope.alphabet = alphabets;
               
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
                        return item.isParty;
                    }  
                    if($scope.cf_partyFilter ==='nonparty'){
                        return !item.isParty;
                    } 
                    if($scope.cf_partyFilter ==='inbetween'){
                        return item.isInbetweenParty;
                    }     
               };
               
               //*************************************************************************************************************************************
               $scope.cf_showCountry = function(item) {
                    
                    if(!$scope.cf_countryFilter) 
                        return cf_filterParty(item);
                    else{
                        if(item.name[locale].charAt(0) === $scope.cf_countryFilter)
                            return cf_filterParty(item);
                    }
               };
               
               
              
             

            }//link
        };
    }]);

