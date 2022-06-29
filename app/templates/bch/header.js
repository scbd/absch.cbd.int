import app from 'app';
import html from 'text!./header.html';
import _ from 'lodash';
import '../directives/breadcrumbs';
import 'services/main';
import 'components/scbd-angularjs-services/main';
import 'components/scbd-angularjs-controls/main';
import bchHeaderT from '~/app-text/templates/bch/header.json';

app.directive('bchHeader', ['locale', '$location','breadcrumbs', 'commonjs', '$q','realm','translationService',  function (locale, $location, breadcrumbs, commonjs, $q, realm, translationService) {
    return {
        restrict: 'E',
        template: html,
        link: function($scope) {
            translationService.set('bchHeaderT', bchHeaderT);
            $scope.locale = locale
            $scope.isABS = realm.is('ABS');
            $scope.isBCH = realm.is('BCH');
            $scope.isDEV = realm.value.includes("DEV");
            $scope.isTRG = realm.value.includes("TRG");

            $scope.breadcrumbs     = breadcrumbs;
            
            var sortField = 'name.'+(locale||'en');
            $q.when(commonjs.getCountries(sortField))
            .then(function(res){
                $scope.countries = res;
            });

            $scope.isEnterPressed = function($event){
                if($event === true || $event.which === 13){

                    $location.path('/search/nationalRecords').search({text : ($scope.searchQuery||'')})
                    $scope.searchQuery='';
                }
            }

            $scope.countrySearch = function($event){
                $event.stopPropagation()
            }

            $scope.startsWith = function(item){
                return !$scope.countrySearchQuery || _.startsWith(item.name[locale].toLowerCase(), $scope.countrySearchQuery.toLowerCase());
            }
        }
    };
}]);

