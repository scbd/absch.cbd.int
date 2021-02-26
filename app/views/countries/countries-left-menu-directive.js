define(['app','text!./countries-left-menu-directive.html',
'lodash', 'js/common'], function(app, template, _) {

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
            controller: ['$scope', '$http', '$q', '$filter', 'commonjs','$location',
                function($scope, $http, $q, $filter, commonjs, $location) {

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
                        $scope.npSignatory = _.filter($scope.countries,{isSignatory:true}).length;
                        $scope.nonParty = _.filter($scope.countries,{isParty:false}).length;

                    });

                    $scope.updateMap = function(type){

                         $scope.type = type;
                         if(type=='party')
                             $scope.searchFilter=commonjs.isParty;
                         else if(type=='signatory')
                             $scope.searchFilter=commonjs.isSignatory;
                         else if(type=='nonParties')
                             $scope.searchFilter=function(entity){ return !commonjs.isParty(entity) && !commonjs.isSignatory(entity);};
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
});
