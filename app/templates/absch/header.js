import app from 'app';
import html from 'text!./header.html';
import _ from 'lodash';
import 'ng-breadcrumbs';
import 'services/main';
import 'components/scbd-angularjs-services/main';
import 'components/scbd-angularjs-controls/main';
import '../directives/breadcrumbs';
import abschHeaderT from '~/app-text/templates/absch/header.json';

    app.directive('abschHeader', ['locale', '$location','breadcrumbs', 'commonjs', '$q', 'realm' , 'translationService', function (locale, $location, breadcrumbs, commonjs, $q, realm, translationService) {
        return {
            restrict: 'E',
            template: html,
            link: function($scope) {
                translationService.set('abschHeaderT', abschHeaderT);
                $scope.locale = locale
                $scope.breadcrumbs     = breadcrumbs;

                $scope.isABS = realm.is('ABS');
                $scope.isBCH = realm.is('BCH');
                $scope.isDEV = realm.value.includes("DEV");
                $scope.isTRG = realm.value.includes("TRG");
                
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

