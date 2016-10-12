define(['text!./search-zoom-map.html',
    'app',
    'jquery',
    'lodash',
    'scbd-map/zoom-map',
    'scbd-map/ammap3-service', '/app/js/common.js', '/app/services/search-service.js',
    '../directives/block-region-directive.js'
], function(template, app, $, _) {
    'use strict';

    app.directive('searchZoomMap', ['ammap3Service', function(ammap3Service) {
        return {
            restrict: 'E',
            template: template,
            replace: true,
            scope: {
                zoomTo  : "@"
            },
            //=======================================================================
            //
            //=======================================================================
            controller: ["$scope", '$q', 'commonjs', 'searchService', '$timeout', '$filter',
                    function($scope, $q, commonjs, searchService, $timeout, $filter) {

                        
                        $scope.$on('$destroy', function() {
                            ammap3Service.clear('zoom-map-country');
                        });
                        $scope.loading = true;
                        $timeout(function(){
                            $q.when(commonjs.getCountries()).then(function(countries){  
                                
                                ammap3Service.eachCountry('zoom-map-country', function(mapCountry){
                                    var countryCode = mapCountry.id;
                                    if(ammap3Service.exceptionRegionMapping[mapCountry.id]){
                                        countryCode = ammap3Service.exceptionRegionMapping[mapCountry.id];
                                    }
                                    var countryDetails = _.findWhere(countries, {
                                        code : countryCode
                                    });
                                    if(countryDetails){
                                        if(countryDetails.isNPInbetweenParty)
                                            mapCountry.colorReal=mapCountry.baseSettings.color= "#EC971F";
                                        else if(countryDetails.isNPParty)
                                            mapCountry.colorReal=mapCountry.baseSettings.color= "#5F4586";                                    
                                        else
                                            mapCountry.colorReal=mapCountry.baseSettings.color= "#333";
                                    }
                                    else
                                        mapCountry.colorReal=mapCountry.baseSettings.color= "#333";
                                });
                                ammap3Service.validateData('zoom-map-country');                                

                            })
                            .finally(function() {
                                    $scope.loading = false;
                            });;
                        }, 3000);
                    }
                ] //controlerr
        }; //return
    }]); //directive
}); //define
