define(['require', 'text!./country-map.html', 'app', 'lodash',  'ammap', 
'shim!/app/views/countries/worldEUHigh[ammap].js',//using absolute url, spl case for this file as its too big to load
'shim!ammap/themes/light[ammap]',
'js/common', 'services/search-service', 'css!libs/flag-icon-css/css/flag-icon.min.css',
'scbd-angularjs-services/locale'], 
function(require, template, app, _) {
  'use strict';

  app.directive('countryMap', ['$timeout', function($timeout) {
    return {
      restrict: 'EAC',
      template: template,
      replace: true,
      require: ['^countryMap'],
      scope: {
        zoomTo: '@zoomTo'
      },
      link: function($scope, $element, $attr, requiredDirectives) {

        var ammap3 = requiredDirectives[0];
       
        initMap();

        ammap3.writeMap();

        $scope.$watch('zoomTo', zoomTo);
        //=======================================================================
        //
        //=======================================================================
        function zoomTo() {
           if ($scope.zoomTo){
              var country = ammap3.getMapObject($scope.zoomTo)
              $scope.map.zoomToGroup([country]);
              country.colorReal = "#428BCA"
              country.color = "#428BCA"
              country.validate();
           }
        } //$scope.legendHide

        //=======================================================================
        //
        //=======================================================================
        function initMap() {
          $scope.mapData = {
            "type": "map",
            "theme": "light",
            "projection": "winkel3",
            "zoomDuration": 0.1,
            "responsive": {
            "enabled": true
            },
            "dataProvider": {
              "map": "worldEUHigh",
              "getAreasFromMap": true,
              "images": [{
                "label": "EU",
                "latitude": -5.02,
                "longitude": -167.66
              }],
            },
            "areasSettings": {
               "alpha": 1,
                "autoZoom": true,
                "selectedColor": '#428BCA',
                "rollOverColor": '#000000',
                "selectable": true,
                "color": '#333',
                "outlineColor": '#666',
            },
            "smallMap": {
              "enabled": false,
              "rectangleColor": '#069554',
              "backgroundAlpha": 0.5,
              "mapColor": '#069554',
          },
            "export": {
              "libs": { "autoLoad": false},
              "enabled": true,
              "position": "bottom-right"
            }
          }; //

        } //$scope.initMap
      }, //link

      controller: ["$scope", 'commonjs', 'searchService', '$q', '$interpolate', '$filter', '$location', '$element', 
        'localeService', 'locale', 'realm', '$http',
      function($scope, commonjs, searchService, $q, $interpolate, $filter, $location, $element, localeService, locale, realm, $http) {
        var countriesLangLat  = {};
        var countries         = {};
        $scope.isBCH          = realm.is('BCH');
        $scope.isABS          = realm.is('ABS');
        $scope.options        = { mapType :'nationalRecords', lmoDecision:'approved'};

        var popOverTemplate;
        var exceptionRegionMapping = {
            AI : 'GB', //Anguilla
            AS : 'US', //American Samoa
            AW : 'NL', //Aruba
            AX : 'FI', //Aland Islands
            BL : 'FR', //Saint Barthelemy
            BM : 'GB', //Bermuda
            BQ : 'NL', //Bonaire, Saint Eustachius and Saba
            BV : 'NO', //Bouvet Island
            CC : 'AU', //Cocos (Keeling) Islands
            CW : 'NL', //Curaçao
            CX : 'AU', //Christmas Island
            // EH : 'MA', //Western Sahara
            FK : 'GB', //Falkland Islands
            FO : 'DK', //Faroe Islands
            GF : 'FR', //French Guiana
            GG : 'GB', //Guernsey
            GI : 'GB', //Gibraltar
            GL : 'DK', //Greenland
            GO : 'FR', //Glorioso Islands
            GP : 'FR', //Guadeloupe
            GS : 'GB', //South Georgia and South Sandwich Islands
            GU : 'US', //Guam
            HK : 'CN', //Hong Kong
            HM : 'AU', //Heard Island and McDonald Islands
            IM : 'GB', //Isle of Man
            IO : 'GB', //British Indian Ocean Territory
            JE : 'GB', //Jersey
            JU : 'FR', //Juan De Nova Island
            XK : 'RS', //Kosovo
            KY : 'GB', //Cayman Islands
            MF : 'FR', //Saint Martin
            MO : 'CN', //Macau
            MP : 'US', //Northern Mariana Islands
            MQ : 'FR', //Martinique
            MS : 'GB', //Montserrat
            NC : 'FR', //New Caledonia
            NF : 'AU', //Norfolk Island
            PM : 'FR', //Saint Pierre and Miquelon
            PN : 'GB', //Pitcairn Islands
            PR : 'US', //Puerto Rico
            RE : 'FR', //Reunion
            SH : 'GB', //Saint Helena
            SJ : 'NO', //Svalbard and Jan Mayen
            SX : 'NL', //Sint Maarten
            TC : 'GB', //Turks and Caicos Islands
            TF : 'FR', //French Southern and Antarctic Lands
            TK : 'NZ', //Tokelau
            TW : 'CN', //Taiwan
            VG : 'GB', //British Virgin Islands
            VI : 'US', //US Virgin Islands
            WF : 'FR', //Wallis and Futuna
            YT : 'FR' //Mayotte
        };

        function loadCountries(){
          var baseUrl = require.toUrl('').replace(/\?v=.*$/,'');

          require(['text!' + baseUrl + '/views/countries/pin-popup-'+ realm.value.replace(/-.*/g,'').toLowerCase() +'.html'], function(template){
            popOverTemplate = template;
            
            return $q.when(commonjs.getCountries()).then(function(lcountries) {
                
                return $q.when(searchService.governmentSchemaFacets())
                    .then(function(countryFacets) {

                            var nationalSchemas = _.filter(realm.schemas, {type:'national'})
                            _.map(lcountries, function(country){
                              var code = country.code.toLowerCase();
                              countries[country.code] = country;
                              // if(code == 'xk')
                              //   exceptionRegionMapping['XK'].toLowerCase();
                              var facets = _.findWhere(countryFacets, {government: code});
                              changeAreaColor(country);
                              if(!$scope.zoomTo){
                                addImageData(country, facets, nationalSchemas);

                                if(_.invert(exceptionRegionMapping)[country.code])
                                  addExceptionRegionsImage(country, nationalSchemas)
                              }
                            });
                            addImageData({name : {en : 'Western Sahara'}, code:'EH'}, nationalSchemas)
                        $scope.map.validateData();
                        updateCustomMarkers();
                    });
            });
          
          });
        }

        function addExceptionRegionsImage(country, nationalSchemas){

          _.each(exceptionRegionMapping, function(code, exceptionRegion) {
              if(code == country.code){
                var exceptionCountryData = angular.copy(country);
                exceptionCountryData.code = exceptionRegion;
                exceptionCountryData.exceptionCountry  = code.toLowerCase();
                addImageData(exceptionCountryData, nationalSchemas)
              }
              //if(exceptionRegion[c])
          });

        }

        function addImageData(country, facets, nationalSchemas){
          var image = {};
          if(!countriesLangLat || !countriesLangLat[country.code]){
            var long = $scope.map.getAreaCenterLongitude(getMapObject(country.code));
            var lat = $scope.map.getAreaCenterLatitude(getMapObject(country.code));
            countriesLangLat[country.code] = {long : long, lat: lat};
          }

          image.lat = countriesLangLat[country.code].lat;
          image.long = countriesLangLat[country.code].long;
          image.code = country.code;
          country.codeLower   = country.code.toLowerCase();          
          country.nameLocalized     = country.name.en;

          if(facets)
            _.each(facets.schemas, function(document, key) {
                country[$filter("urlSchemaShortName")(key)] = document;
            });
          normalizeFacets(country, nationalSchemas);

          if (($scope.isABS && country.isNPParty) || $scope.isBCH && country.isCPParty)
              country.status = '<span style="display:inline;width:35%;text-align:center;background-color: #5F4586;margin:0;padding:0;" class="pull-right party-status">Party</span>';
          else if (($scope.isABS && country.isNPInbetweenParty))
              country.status = '<span style="display:inline;width:35%;text-align:center;background-color: #EC971F;margin:0;padding:0;" class="pull-right party-status">Ratified, not yet Party</span>';
          else
              country.status = '<span style="display:inline;width:35%;text-align:center;background-color: #333;margin:0;padding:0;" class="pull-right party-status">Non Party</span>';
          
          image.scbdData = country;

          $scope.map.dataProvider.images.push({latitude:image.lat,longitude:image.long,scbdData:image.scbdData});

        }

        function normalizeFacets(country, nationalSchemas){

          _.each(nationalSchemas, function(schema){
            if(!country[schema.shortCode])
              country[schema.shortCode] = 0;
          })          
        }
        //=======================================================================
        //
        //=======================================================================
        function writeMap(mapData) {

          if (!mapData) mapData = getMapData();
          $scope.map = AmCharts.makeChart("mapdiv", mapData); //jshint ignore:line
          $scope.map.write("mapdiv");
        } // writeMap


        // //=======================================================================
        // //
        // //=======================================================================
        function changeAreaColor(country, mapCountry) {
          if(!mapCountry)
            mapCountry = getMapObject(country.code);

            
            if (country && mapCountry) {
                if (($scope.isABS && country.isNPInbetweenParty))
                    mapCountry.colorReal = mapCountry.baseSettings.color = "#EC971F";
                else if (($scope.isABS && country.isNPParty) || ($scope.isBCH && country.isCPParty))
                    mapCountry.colorReal = mapCountry.baseSettings.color = "#5F4586";
                else
                    mapCountry.colorReal = mapCountry.baseSettings.color = "#333";
            } else {
                    mapCountry.colorReal = mapCountry.baseSettings.color = "#333";
            }

            if(country.code == 'RS' && $scope.isBCH && country.isCPParty){
              var xkMapCountry = getMapObject('XK');
              xkMapCountry.colorReal = "#5F4586";
            }
        } //getMapObject

         //=======================================================================
        //
        //=======================================================================
        function closePopovers(pin) {
          if($scope.options.mapType != 'nationalRecords')return;
          var map = $scope.map;
          var cCode = '';
          var country=false;
          // go through all of the images
          for (var x in map.dataProvider.images) {
            if (x !== $(pin).data('i')){
              if (map.dataProvider.images[x].scbdData)
                cCode = map.dataProvider.images[x].scbdData.code;
            }
            if($($scope.map.dataProvider.images[x].externalElement).children('.popover').hasClass('in')){

              country = getMapObject(cCode);
              if($scope.map.checkIfSelected(country)){
                  country =_.findWhere($scope.map.dataProvider.areas, {id : cCode});
                  // country.colorReal = country.baseSettings.color;
                  country.validate();
                  country.mouseEnabled = true;
                  country.balloonText = '[[title]]';
                  $scope.map.selectObject($scope.map.dataProvider.images[x]);
              }
            }
            $($scope.map.dataProvider.images[x].externalElement).children('#pin-' + cCode).popover('hide');

          }
          // $('.popover .in').popover('hide')
        } //closePopovers(pin)

        //=======================================================================
        // this function will take current images on the map and create HTML elements for them
        //=======================================================================
        function updateCustomMarkers() {
          // get map object
          if($scope.options.mapType != 'nationalRecords')return;
          var map = $scope.map;

          // go through all of the images
          for (var x in map.dataProvider.images) {
            if (x === '0') continue;

            var image = map.dataProvider.images[x];

            if ('undefined' == typeof image.externalElement && image.scbdData) {
              image.externalElement = generateMarker(x);
            }

            // if ('undefined' !== typeof image.externalElement) {
            //   // reposition the element accoridng to coordinates clientX
            //   image.externalElement.style.top = (map.latitudeToY(image.latitude)) + 'px';
            //   image.externalElement.style.left = (map.longitudeToX(image.longitude)) + 'px';
            // }
          }
          $scope.map.addListener("positionChanged", updateCustomMarkers);
          $scope.map.addListener("clickMapObject", openCountryPopup);
          $scope.map.addListener("click", closePopovers);
          
        } //updateCustomMarkers

        //=======================================================================
        //
        //=======================================================================
        function generateMarker(imageIndex) {
          return makeMarker(imageIndex, 'pin', 'pin-invisi', 'components/scbd-map/images/pins/invisi-pin.svg');
        }


        //=======================================================================
        // this function creates and returns a new marker element
        //=======================================================================
        function makeMarker(imageIndex, pinBaseClass, decretivePinClass, imagePath) {

          var image = $scope.map.dataProvider.images[imageIndex];
          var holder = document.createElement('div');
          holder.className = 'map-marker';
          holder.style.position = 'absolute';

          //create pin
          var pin = document.createElement('div');

          pin.id = 'pin-' + image.scbdData.code;
          pin.className = pinBaseClass + ' ' + decretivePinClass;
          $(pin).data('i', imageIndex);
          $(pin).data('toggle', 'popover');

          $(pin).popover(generatePopover(imageIndex));
          pin.addEventListener('click', function(event) {
            
            closePopovers(pin);
            if ($(pin).data('bs.popover').tip().hasClass('in')) {

              if ($scope.map.dataProvider.images[imageIndex].latitude > 25)
                $scope.map.dataProvider.images[imageIndex].zoomLatitude = $scope.map.dataProvider.images[imageIndex].latitude + 10;

              if ($scope.map.dataProvider.images[imageIndex].latitude <= 25)
                $scope.map.dataProvider.images[imageIndex].zoomLatitude = $scope.map.dataProvider.images[imageIndex].latitude + 20;

              $scope.map.dataProvider.images[imageIndex].zoomLongitude = $scope.map.dataProvider.images[imageIndex].longitude;
              $scope.map.clickMapObject($scope.map.dataProvider.images[imageIndex]);
            }

          }, false);
          holder.appendChild(pin);

          if($scope.map.dataProvider.images[imageIndex] && $scope.map.dataProvider.images[imageIndex].chart)
            $scope.map.dataProvider.images[imageIndex].chart.chartDiv.appendChild(holder);

          return holder;
        }

        //=======================================================================
        //
        //=======================================================================
        function generatePopover(imageIndex) {
          var image = $scope.map.dataProvider.images[imageIndex];
          var popoverTitleParsed = '';
          var popoverTemplateParsed = '';
          image.scbdData.codeLower = image.scbdData.code.toLowerCase();
         
         
          image.scbdData.translationUrl = '';
          if(locale && (locale != 'en' || localeService.urlHasLocale())){
            image.scbdData.translationUrl = '/' + locale;
          }
         var template = popOverTemplate         

          popoverTemplateParsed = $interpolate(template)(image.scbdData);
          // console.log(popoverTemplateParsed)
          return {
            html: true,
            trigger: 'click',
            placement: 'top',
            title: ($scope.map.scbdConfig||{}).popOverTemplateTitle || 'this is a test',
            template: popoverTemplateParsed,
          };
        } //$scope.legendHide
        //=======================================================================
        //'invisi-pixel''
        //=======================================================================
        var activeCountry;
        function openCountryPopup(event) {
          if($scope.options.mapType != 'nationalRecords')return;
          var cCode = event.mapObject.id;

          if($scope.zoomTo){
            $timeout(function () {
              $location.url('/countries/' + (exceptionRegionMapping[cCode] || cCode).toUpperCase());
            },1);
            return;
          }
          activeCountry = cCode;

          var image = _.find($scope.map.dataProvider.images, function(img) {            
            if (img.scbdData && (img.scbdData.code === cCode ))
                return true;
            else
              return false;
          });
          if(!image){
            console.log('Country missing popover information:', cCode)
            return;
          };
          if($scope.map)
            closePopovers();
             
          var info = event.chart.getDevInfo();
            
          if (image.externalElement)
           $timeout(function(){
              // if ('undefined' !== typeof image.externalElement) {
                // reposition the element accoridng to coordinates clientX
                image.externalElement.style.top = info.top + 'px';
                image.externalElement.style.left = info.left + 'px';
              // }
              $(image.externalElement).children('#pin-' + cCode).popover('show');
              //  $scope.map.moveDown();
              //  $scope.map.clickMapObject($scope.map.dataProvider.images[image.index]);
              if(cCode == 'GB' || exceptionRegionMapping[cCode] == 'GB')
                $timeout(function(){
                    $element.find('[data-toggle="tooltip"]').tooltip(); 
                }, 500);
            }, 300);
          else
            console.log('Country missing popover information:', cCode);

          // $timeout(function(){
          //   if($scope.map)
          //     $scope.map.moveDown();
          // }, 800);

        } // setPinImage
        

        // //=======================================================================
        // //
        // //=======================================================================
        function getMapObject(id) {

          var index = _.findIndex($scope.map.dataProvider.areas, function(area) {
            return area.id === id.toUpperCase();
          });
          return $scope.map.dataProvider.areas[index];
        } //getMapObject

        //=======================================================================
        //
        //=======================================================================
        function getMapData() {
          return $scope.mapData;
        }

        function homeButton() {
          $scope.map.fire("homeButtonClicked", {
            type: "homeButtonClicked",
            chart: $scope.map
          });
        }

        this.getMapObject = getMapObject;        
        this.writeMap = writeMap;
        this.getMapData = getMapData;


        // loadCountries();

        function loadLmoMap(lmoDecisions){         

          var map = $scope.map;//AmCharts.makeChart( "mapdiv", mapOptions );
          // map.write("mapdiv");
          var images = {};
          _.each(lmoDecisions, function(decision){
            if(decision && decision.countries){      
              _.each(decision.countries, function(country){
                country.country = country.country.replace(/^eur$/, 'eu');
                if(!images[country.country]){
                   
                  var decisions = _.filter(country.bch, {decision: $scope.options.lmoDecision});
                  if(decisions && decisions.length > 0){                   
                    var mapArea = _.findWhere(map.dataProvider.areas, {id: country.country.toUpperCase()})
                    images[country.country] = {
                        "zoomLevel": 5, "scale": 0.5, "title": countries[country.country.toUpperCase()].name.en,
                        "latitude": map.getAreaCenterLatitude(mapArea),
                        "longitude": map.getAreaCenterLongitude(mapArea)
                    };
                  }

                }
              })  
            }
          })
          map.dataProvider.images = _.values(images);
          map.validateData();
          // add events to recalculate map position when the map is moved or zoomed
          map.addListener( "positionChanged", updateCustomMarkers );
          
          // this function will take current images on the map and create HTML elements for them
          function updateCustomMarkers( event ) {
            if($scope.options.mapType != 'lmoDecisions')return;
            // get map object
            var map = event.chart;
          
            // go through all of the images
            for ( var x in map.dataProvider.images ) {
              // get MapImage object
              var image = map.dataProvider.images[ x ];
          
              // check if it has corresponding HTML element
              if ( 'undefined' == typeof image.externalElement )
                image.externalElement = createCustomMarker( image );
          
              // reposition the element accoridng to coordinates
              var xy = map.coordinatesToStageXY( image.longitude, image.latitude );
              image.externalElement.style.top = xy.y + 'px';
              image.externalElement.style.left = xy.x + 'px';
            }
          }
          
          // this function creates and returns a new marker element
          function createCustomMarker( image ) {
            // create holder
            var holder = document.createElement( 'div' );
            holder.className = 'map-marker';
            holder.title = image.title;
            holder.style.position = 'absolute';
          
            // maybe add a link to it?
            if ( undefined != image.url ) {
              holder.onclick = function() {
                window.location.href = image.url;
              };
              holder.className += ' map-clickable';
            }
          
            // create dot
            var dot = document.createElement( 'div' );
            dot.className = 'dot';
            holder.appendChild( dot );
          
            // create pulse
            var pulse = document.createElement( 'div' );
            pulse.className = 'pulse';
            holder.appendChild( pulse );
          
            // append the marker to the map container
            image.chart.chartDiv.appendChild( holder );
          
            return holder;
          }
          updateCustomMarkers({chart:map});
        }

        var lmoDecisions;
        $scope.$watch('options.mapType', function(newVal, oldVal){
          if(!newVal)
            return;
          if(newVal == 'lmoDecisions'){
            $scope.map.dataProvider.images=[];
            // $scope.map.removeListener($scope.map, "positionChanged", updateCustomMarkers);
            // $scope.map.removeListener($scope.map, "clickMapObject", openCountryPopup);
            // $scope.map.removeListener($scope.map, "click", closePopovers);
            $scope.map.validateData();
            if(!$scope.lmos){
              $scope.lmos = [{identifier:'all', title:{en:'All'}},
                            {identifier:'MON-877Ø1-2', title:{en:'MON-877Ø1-2'}},
                            {identifier:'KM-ØØØH71-4', title:{en:'KM-ØØØH71-4'}},
                            {identifier:'DKB-89614-9', title:{en:'DKB-89614-9'}},
                            {identifier:'MON-ØØ81Ø-6', title:{en:'MON-ØØ81Ø-6'}}
                          ];
            }
            if($scope.options.lmo!='all')
              $scope.options.lmo = 'all'
            else
              loadLmoDetails();
          }
          else{
            $scope.map.dataProvider.images=[];
            countriesLangLat  = {}
            // $scope.map.removeListener($scope.map, "positionChanged", updateCustomMarkers );
            $scope.map.validateData();
            loadCountries();
          }     
        })

        $scope.$watch('options.lmo', function(newVal, oldVal){
          if(newVal && $scope.options.mapType == 'lmoDecisions'){

            if(newVal!= 'all')
              return loadLmoDetails(newVal);

            loadLmoDetails();
          }          
        })

        $scope.$watch('options.lmoDecision', function(newVal, oldVal){
          if(newVal && $scope.options.mapType == 'lmoDecisions' && lmoDecisions){
            loadLmoMap(lmoDecisions);
          }          
        })

        function loadLmoDetails(lmo){

          var query = {
            "uniqueIdentification" : { $exists : true},
            "countries.bch" : { $exists : true},
          };
          if(lmo)
            query.uniqueIdentification = lmo;

          $q.when($http.get('/api/v2013/lmos', { params: {q:JSON.stringify(query)}}))
          .then(function(result){
            lmoDecisions = result.data;
            loadLmoMap(result.data);
          })
        }
        
      }],
    }; // return
  }]); //app.directive('searchFilterCountries
}); // define
