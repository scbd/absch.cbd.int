define(['text!./search-map.html',
  'app',
  'jquery',
  'lodash',
  'text!./pin-popup-abs.html',
  'scbd-map/ammap3',
  'scbd-map/ammap3-service', '/app/js/common.js', '/app/services/search-service.js',
  '../directives/block-region-directive.js'
], function(template, app, $, _, popoverTemplate) {
  'use strict';

  app.directive('searchMap', ['ammap3Service', function(ammap3Service) {
    return {
      restrict: 'E',
      template: template,
      replace: true,
      require: 'searchMap',
      scope   : {
          height:"@",
      },
      //=======================================================================
      //
      //=======================================================================
      controller: ["$scope", '$q', 'commonjs', 'searchService', '$timeout', '$filter',
       function($scope, $q, commonjs, searchService, $timeout, $filter) {

          if(!$scope.height)
            $scope.height="500px";

          function calculateListViewFacets(countryFacets, countries) {

            _.each(countries, function(country) {

              var countryFacet = _.where(countryFacets, {
                government : country.code.toLowerCase()
              });
              if (countryFacet.length > 0) {

                _.each(countryFacet.schemas, function(document, key) {
                  country[$filter("schemaShortName")(key)] = document.count;
                });
                country.total = countryFacet.recordCount;
              }
              country = normalizeCountryData(country);
            });

          } //calculateListViewFacets

          //====================================================
          function loadCountries() {
            $scope.loading = true;

            return $q.when(commonjs.getCountries()).then(function(countries) {

                return $q.when(searchService.governmentSchemaFacets())
                        .then(function(countryFacets){

                            calculateListViewFacets(countryFacets, countries);

                            ammap3Service.loadCountries('search-map', countries);

                            ammap3Service.eachCountry('search-map', function(mapCountry){
                              var countryDetails = _.findWhere(countries, {code : mapCountry.id});
                              if(countryDetails){
                                  if(countryDetails.isNPInbetweenParty)
                                      mapCountry.colorReal= mapCountry.baseSettings.color="#EC971F";
                                  else if(countryDetails.isNPParty)
                                      mapCountry.colorReal= mapCountry.baseSettings.color="#5F4586";
                                //   else if(countryDetails.isCBDParty)
                                //       mapCountry.colorReal= "#999";
                                  else
                                      mapCountry.colorReal= mapCountry.baseSettings.color="#333";
                              }
                              else
                                  mapCountry.colorReal= mapCountry.baseSettings.color="#333";
                            });
                            return;
                        });
              })
              .finally(function() {
                $scope.loading = false;
              });

          }
          //=======================================================================
          //// should be done in client
          //=======================================================================
          function normalizeCountryData(country) {
            if (!country.CNA)
              country.CNA = 0;

            if (!country.CP)
              country.CP = 0;

            if (!country.CPC)
              country.CPC = 0;

            if (!country.IRCC)
              country.IRCC = 0;

            if (!country.MSR)
              country.MSR = 0;

            if (!country.NDB)
              country.NDB = 0;

            if (!country.NFP)
              country.NFP = 0;

            if (country.isNPParty)
              country.status = '<p style="width:100%;text-align:center;background-color: #5F4586;margin:0;padding:0;" class="party-status" ng-if="isNPParty">Party</p>';
            else if (country.isNPInbetweenParty)
              country.status = '<p style="width:100%;text-align:center;background-color: #EC971F;margin:0;padding:0;" class="party-status" ng-if="isNPInbetweenParty">Ratified not yet Party</p>';
            else
              country.status = '<p style="width:100%;text-align:center;background-color: #333;margin:0;padding:0;" class="party-status" ng-if="isNPSignatory">Non Party</p>';
            return country;
          }


        //   $timeout(function(){
              // close all popovers on click anywhere
              ammap3Service.setGlobalClickListener('search-map',
                function() {
                  ammap3Service.closePopovers('search-map');
              //    ammap3Service.selectObject('search-map');
                });
              //set pin
              ammap3Service.setPinImage('search-map', 'invisi-pixel');
              //set popover
              ammap3Service.setPinPopOver('search-map', popoverTemplate);
              //set on country click event to open country popup
              ammap3Service.setCountryClickListener('search-map',
                function(event) {

                  var id = event.mapObject.id;
                  ammap3Service.closePopovers('search-map');
                  // if(event.mapObject.id === 'GL')
                  // {    var mObj =ammap3Service.getMapObject('search-map','DK');
                  //
                  //     ammap3Service.clickMapObject('search-map', mObj);
                  //     id = 'DK';
                  // }
                  // if(event.mapObject.id === 'FO')
                  // {
                  //     ammap3Service.selectObject('search-map',ammap3Service.getMapObject('search-map','DK'));
                  //     id = 'DK';
                  // }
                  if(event.mapObject.id === 'SJ')
                  {
                    ammap3Service.clickMapObject('search-map',ammap3Service.getMapObject('search-map','NO'));
                      id = 'NO';
                  }
                  if(event.mapObject.id === 'EH')
                  {
                    ammap3Service.clickMapObject('search-map',ammap3Service.getMapObject('search-map','MA'));
                      id = 'MA';
                  }
                  if(event.mapObject.id === 'TW')
                  {
                    ammap3Service.clickMapObject('search-map',ammap3Service.getMapObject('search-map','CN'));
                      id = 'CN';
                  }


                  ammap3Service.openCountryPopup('search-map', id); //pin, popup,
              });

              loadCountries();

        //   },1500);

          $scope.$on('$destroy', function(){
              ammap3Service.clear('search-map');
          });

        }] //controlerr
    }; //return
  }]); //directive
}); //define
