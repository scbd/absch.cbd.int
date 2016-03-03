define(['text!./search-map.html',
  'app',
  'jquery',
  'lodash',
  'text!./pin-popup-abs.html',
  'css!./search-map',
  'scbd-map/ammap3',
  'scbd-map/ammap3-service', '/app/js/common.js'
], function(template, app, $, _, popoverTemplate) {
  'use strict';

  app.directive('searchMap', ['ammap3Service', function(ammap3Service) {
    return {
      restrict: 'E',
      template: template,
      replace: true,
      require: 'searchMap',

      //=======================================================================
      //
      //=======================================================================
      controller: ["$scope", '$q', 'commonjs', function($scope, $q, commonjs) {

          // close all popovers on click anywhere
          ammap3Service.setGlobalClickListener('search-map',
            function() {
              ammap3Service.closePopovers('search-map');
            });
          //set pin
          ammap3Service.setPinImage('search-map', 'invisi-pixel');
          //set popover
          ammap3Service.setPinPopOver('search-map', popoverTemplate);
          //set on country click event to open country popup
          ammap3Service.setCountryClickListener('search-map',
            function(event) {
              ammap3Service.openCountryPopup('search-map', event.mapObject.id); //pin, popup,
          });


          $q.when(commonjs.getCountries())
          .then(function(countries){
              ammap3Service.eachCountry('search-map', function(mapCountry){
                var countryDetails = _.findWhere(countries, {code : mapCountry.id});
                if(countryDetails){
                    if(countryDetails.isNPInbetweenParty)
                        mapCountry.colorReal= "#5cb85c";
                    else if(countryDetails.isNPParty)
                        mapCountry.colorReal= "#337ab7";
                    else if(countryDetails.isCBDParty)
                        mapCountry.colorReal= "#999";
                    else
                        mapCountry.colorReal= "#FFF";
                }
                else
                    mapCountry.colorReal= "#FFF";
              });
          });


        }] //controlerr
    }; //return
  }]); //directive
}); //define
