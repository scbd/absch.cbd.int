import app from '~/app';
import template from 'text!./country-filter.html';
import _ from 'lodash';
import '~/services/main';
import alphabetsT from '~/app-text/views/search/alphabets.json';
import { mergeTranslationKeys } from '../../../services/translation-merge';
import countryFilterT from '~/app-text/views/search/search-filters/country-filter.json';
const alphabets = mergeTranslationKeys(alphabetsT);
app.directive('countryFilter', ['locale', 'translationService', '$filter',  function (locale, translationService, $filter) {
        return {
            restrict: 'EAC',
            replace: true,
            // transclude: true,
            require:'^searchDirective',
            template: template, 
            scope: false,
            link: function($scope, $element, $attrs, searchDirectiveCtrl) {
               translationService.set('countryFilterT', countryFilterT);
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
               
               $scope.sortCountries = function (item) {
                    return $filter("ascii")(item.name[locale]||item.name);
               }             
             

            }//link
        };
    }]);

