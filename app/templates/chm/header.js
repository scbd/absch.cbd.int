import app from '~/app';
import html from 'text!./header.html';
import _ from 'lodash';
import '../directives/breadcrumbs';
import '~/services/main';
import '~/components/scbd-angularjs-services/main';
import '~/components/scbd-angularjs-controls/main';
import chmHeaderT from '~/app-text/templates/chm/header.json';

app.directive('chmHeader', ['locale', '$location','breadcrumbs', 'commonjs', '$q','realm','translationService',  function (locale, $location, breadcrumbs, commonjs, $q, realm, translationService) {
    return {
        restrict: 'E',
        template: html,
        link: function($scope) {
            translationService.set('chmHeaderT', chmHeaderT);
            $scope.locale = locale
            $scope.isABS = realm.is('ABS');
            $scope.isBCH = realm.is('BCH');
            $scope.isCHM = realm.is('CHM');
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

            $scope.matchesQuery = function(item){
                return !$scope.countrySearchQuery || item.name[locale].toLowerCase().includes($scope.countrySearchQuery.toLowerCase());
            }
        }
    };
}]);

