import app from '~/app';
import template from 'text!./countries-left-menu-directive.html';
import _ from 'lodash';
import '~/services/main';
import countriesLeftMenuT from '~/app-text/views/countries/countries-left-menu-directive.json';

    app.directive('countriesLeftMenu', function() {
        return {
            restrict: 'EAC',
            template: template,
            replace: true,
            scope: {
                finishLoadingCountries: '&',
                onStatusClick: '&',
                onCountryClick: '&',
            },
            controller: ['$scope', '$http', '$q', '$filter', 'commonjs','$location', 'translationService',
                function($scope, $http, $q, $filter, commonjs, $location, translationService) {

                    translationService.set('countriesLeftMenuT', countriesLeftMenuT);
                    $scope.type = 'all';
                    $scope.lastAction = 'party';
                    $scope.commonFormatFacets = $scope.$parent.commonFormatFacets;
                    $scope.selected_facet = 'all';

                    $q.when(commonjs.getCountries())
                    .then(function(countries){
                        if($scope.finishLoadingCountries)
                            $scope.finishLoadingCountries({data:countries});

                        $scope.countries = countries;

                        $scope.npParty = _.filter($scope.countries,{isParty:true}).length;
                        $scope.nonParty = _.filter($scope.countries,{isParty:false}).length;

                    });

                    $scope.updateMap = function(type){

                         $scope.type = type;
                         if(type=='party')
                             $scope.searchFilter=commonjs.isParty;
                         else if(type=='nonParties')
                             $scope.searchFilter=function(entity){ return !commonjs.isParty(entity);};
                         else if(type=='all')
                             $scope.searchFilter=function(entity){return entity;};

                        var mapData = {'type':type,'searchFilter':$scope.searchFilter};
                        if($scope.onStatusClick)
                            $scope.onStatusClick({data:mapData});

                        // $scope.$broadcast('updateMap', {data:{'type':type,'searchFilter':$scope.searchFilter}});

                    }

                    $scope.navigateCountry = function(code){
                        $location.path('/countries/' + code.toUpperCase());
                    }


                }
            ]

        };
    });

