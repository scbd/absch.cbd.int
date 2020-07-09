define(['require', 'text!./country-map.html', 'app', 'lodash',  'libs/ammap3/ammap/ammap', 
'shim!/app/views/countries/worldEUHigh[libs/ammap3/ammap/ammap].js',//using absolute url, spl case for this file as its too big to load
'shim!libs/ammap3/ammap/themes/light[libs/ammap3/ammap/ammap]',
'js/common', 'services/search-service', 'css!https://cdn.cbd.int/flag-icon-css@3.0.0/css/flag-icon.min.css',
'components/scbd-angularjs-services/services/locale'], 
function(require, template, app, _, ammap, worldEUHigh) {
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

      }, //link

      controller: ["$scope", 'commonjs', 'searchService', '$q', '$interpolate', '$filter', '$location', '$element', 
        'localeService', 'locale', 'realm', '$http', '$routeParams',
      function($scope, commonjs, searchService, $q, $interpolate, $filter, $location, $element, localeService, locale, realm, $http, $routeParams) {
        var euLabel = {
          "label": "EU",
          "latitude": -5.02,
          "longitude": -167.66
        };
        var mapOptions = {
            "type": "map",
            "theme": "light",
            "projection": "equirectangular",
            "zoomDuration": 0.1,
            "responsive": {
              "enabled": true
            },
            "dataProvider": {
              "map": "worldEUHigh",
              "getAreasFromMap": true,
              "images": [euLabel],
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
          };
        var lmoDecisions;
        var countries         = {};
        var prevCountryColor  = {clicked:{}, mouseOver:{}};
        // var lmoDecisions;
        var latlong           = {};
        $scope.isBCH          = realm.is('BCH');
        $scope.isABS          = realm.is('ABS');
        $scope.countryMapScope= $scope;

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
        $scope.options = {lmo:'all'};
        $scope.self = $scope;

        // if($scope.zoomTo)
        //     mapOptions.dataProvider.linkToObject = $scope.zoomTo;

        var map = AmCharts.makeChart( "chartdiv", mapOptions );
        
          // add events to recalculate map position when the map is moved or zoomed
          // map.addListener( "positionChanged", updateCustomMarkers );




          ////////////////scope functions///////////////////


          ///////////////////////////////////////////////////


        /////////////////////local function////////////////
        function loadCountries(){
          var baseUrl = require.toUrl('').replace(/\?v=.*$/,'');

            return $q.when(commonjs.getCountries()).then(function(lcountries) {                  

                _.map(lcountries, function(country){
                  
                  countries[country.code] = country;                            
                  changeAreaColor(country);
                  if(!$scope.zoomTo){
                    if(_.invert(exceptionRegionMapping)[country.code])
                      addExceptionRegionsImage(country)
                  }
                  var mapObject = getMapObject(country.code);
                  if(mapObject){
                    mapObject.title = country.name[locale]
                  }
                });
                addImageData({name : {en : 'Western Sahara'}, code:'EH'})
                //change for Taiwan, set party color as China
                var twCountry = getMapObject('TW'); 
                twCountry.colorReal = twCountry.baseSettings.color = "#5F4586";

                map.validateData();
                map.addListener("homeButtonClicked", function(){
                  if(!$routeParams.code){
                    $scope.currentCountry = null;
                    showCountryDetails({mapObject: {}});
                  }
                })
                map.addListener("clickMapObject", function(evt){

                  if($scope.zoomTo){
                    var url = '/countries/'+(exceptionRegionMapping[evt.mapObject.id]||evt.mapObject.id);
                    $scope.$apply(function(){$location.url(url)});
                  }
                  else
                    showCountryDetails(evt)
                });
                // map.addListener("click", closePopovers);
                map.addListener( "rollOverMapObject", function(a,b,c){
                  // if($scope.currentCountry && $scope.currentCountry.code == a.mapObject.id)
                  //   return;
                  dynamicColor(a.mapObject.id, a.mapObject.rollOverColorReal, 'mouseOver')
                } );
                map.addListener( "rollOutMapObject", function(a,b,c){
                  // if($scope.currentCountry && $scope.currentCountry.code == a.mapObject.id)
                  //   return;
                  dynamicColor(a.mapObject.id, a.mapObject.rollOverColorReal, 'mouseOver')
                } );
                if($routeParams.code){
                  showCountryDetails({mapObject: { id: $routeParams.code}});
                }
                else{
                    showCountryDetails({mapObject: {}});
                }
                if($scope.zoomTo){
                  var countryObj = getMapObject($scope.zoomTo)
                  map.selectObject(countryObj);
                  map.zoomToObject(countryObj)
                }
            });
          
          // });
        }

        function addExceptionRegionsImage(country){

          _.each(exceptionRegionMapping, function(code, exceptionRegion) {
              if(code == country.code){
                var exceptionCountryData = angular.copy(country);
                exceptionCountryData.code = exceptionRegion;
                exceptionCountryData.exceptionCountry  = code.toLowerCase();
                addImageData(exceptionCountryData)
              }
              //if(exceptionRegion[c])
          });

        }

        function addImageData(country){
          var image = {};                    
          var long = map.getAreaCenterLongitude(getMapObject(country.code));
          var lat = map.getAreaCenterLatitude(getMapObject(country.code));

          image.lat = lat;
          image.long = long;
          image.code = country.code;

          map.dataProvider.images.push({latitude:image.lat,longitude:image.long});

        }

        function normalizeFacets(country, nationalSchemas){

          _.each(nationalSchemas, function(schema){
            if(!country[schema.shortCode])
              country[schema.shortCode] = 0;
          })          
        }

        function changeAreaColor(country, mapCountry) {
            if(!mapCountry)
              mapCountry = getMapObject(country.code);
  
              
              if (country && mapCountry) {
                  if (($scope.isABS && country.isInbetweenParty))
                      mapCountry.colorReal = mapCountry.baseSettings.color = "#EC971F";
                  else if (country.isParty)
                      mapCountry.colorReal = mapCountry.baseSettings.color = "#5F4586";
                  else
                      mapCountry.colorReal = mapCountry.baseSettings.color = "#333";
              } else {
                    if(mapCountry)//not sure if this is correct
                      mapCountry.colorReal = mapCountry.baseSettings.color = "#333";
              }
  
              if( $scope.isBCH && country.isParty && _.includes(['RS','GB'], country.code)){
                var territoryCode =  country.code == 'RS' ? 'XK' : 'GI' 
                var xkMapCountry = getMapObject(territoryCode);
                xkMapCountry.colorReal = "#5F4586";
              }
        }
        function changeSelectedColor(code, color) {
          var mapCountry = getMapObject(code);
          
          // mapCountry.rollOverColorReal= "#000000"
          // mapCountry.rollOverOutlineColorReal= "#FFFFFF"
           mapCountry.colorReal = mapCountry.baseSettings.color = color//"#428BCA"

           map.returnInitialColor(mapCountry);
          
        }

        function getMapObject(id) {
          return _.findWhere(map.dataProvider.areas, {id: id.toUpperCase()});
        }
        function showCountryDetails(event) {

            var code = event.mapObject.id;
            if($scope.currentCountry && $scope.currentCountry.code== code)
                return;

            if(exceptionRegionMapping[code]){
              code = exceptionRegionMapping[code];
            }
            if(code){
              //reset color of the base country because color is changed on mouseover evt
              // changeAreaColor(countries[code])
              dynamicColor(code, '#428bca', 'clicked')            
            }

            $q.when(countryFacets((code ? code.toLowerCase() : code)), function(facets){
                $scope.currentCountry = undefined;
                $timeout(function(){
                    $scope.reduceDetailsHeight = false;
                    if(code){
                        $scope.currentCountry = _.extend(countries[code.toUpperCase()], facets);
                        if(($scope.currentCountry.name[locale]||'').length > 25)
                            $scope.reduceDetailsHeight = true;
                       
                        if(($scope.currentCountry.exceptionCountry||'').toLowerCase()=='gb' || ($scope.currentCountry.code||'').toLowerCase() == 'gb'){
                            $timeout(function(){
                                $element.find('[data-toggle="tooltip"]').tooltip(); 
                            },300)
                        }
                        return;
                    }
                    
                    $scope.currentCountry = { schemas : facets };
                    
                    
                },100)
            });
         
        }
        function countryFacets(code){
          return $q.when(searchService.governmentSchemaFacets(code))
                  .then(function(countryFacets) { 
                    if(code)                     
                        return normalizeFacets(((countryFacets||{}).schemas||{}));

                    //loop array for global facets
                    var facets = {};
                    _.each(countryFacets, function(countrySchema){
                        normalizeFacets(((countrySchema||{}).schemas||{}), facets)
                    })
                    return facets;
                  });
        }

        function normalizeFacets(countrySchemas, facets){
          if(!facets)
            facets = {};

          _.each(realm.schemas, function(schema, key){
            if(schema.type=='national' && key!=='contact'){

            var prevCount = (facets[schema.shortCode]||{}).count||0;
              if(countrySchemas[key]){
                facets[schema.shortCode] = _.extend(schema, {count:countrySchemas[key] + prevCount});
              }
              else if(prevCount==0)
                facets[schema.shortCode] = _.extend(schema, {count:0});
            }
          }); 
          
          return { schemas : facets };
        }

        // this function will take current images on the map and create HTML elements for them
        function updateCustomMarkers( event ) {
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
            // image.externalElement.style.top = map.latitudeToY( image.latitude ) + 'px';
            // image.externalElement.style.left = map.longitudeToX( image.longitude ) + 'px';
          }
        }

        // this function creates and returns a new marker element
        function createCustomMarker( image ) {
          // create holder
          var holder = document.createElement( 'div' );
          holder.className = 'map-marker';
          holder.title = image.title;
          holder.style.position = 'absolute';

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

        // this function changes the color of the exception regions to color same as the base country for eg. 
        // when China is clicked or hovered Hongkong color is set to same as china. 
        function dynamicColor(code, color, type){

          if(exceptionRegionMapping[code]){
            code = exceptionRegionMapping[code];
          }
          if(prevCountryColor[type] && prevCountryColor[type].code){
            var prevSelTerritories = _(exceptionRegionMapping).keys().filter(function(k){return exceptionRegionMapping[k] == prevCountryColor[type].code}).value();
            if(prevSelTerritories.length){
              changeSelectedColor(prevCountryColor[type].code, prevCountryColor[type].colorReal);
              _.each(prevSelTerritories, function(territory){
                changeSelectedColor(territory,  prevCountryColor[type].colorReal)
              })
            }
          }
          prevCountryColor[type] = { code : code };
          var otherTerritories = _(exceptionRegionMapping).keys().filter(function(k){return exceptionRegionMapping[k] == code}).value()
          if(code){
            if(otherTerritories.length){
              prevCountryColor[type].colorReal = getMapObject(prevCountryColor[type].code).colorReal;
              changeSelectedColor(code, color);
            }

            _.each(otherTerritories, function(territory){
              changeSelectedColor(territory, color)
            })
          }
        }

        function loadLmoMap(lmoDecisions){         

          var images = {};
          var areas = {}
          initLangLat();
          _.each(lmoDecisions, function(decision){

            if(decision && decision.countries){  

              _.each(decision.countries, function(country){

                country.country = country.country.replace(/^eur$/, 'eu');                
                var decisions = country.bch;

                // if($scope.options.lmoDecision!='all')
                //     decisions = _.filter(country.bch, {decision: $scope.options.lmoDecision});

                if(decisions && decisions.length > 0){

                    if(!latlong[country.country.toUpperCase()]){    

                      var mapArea = _.findWhere(map.dataProvider.areas, {id: country.country.toUpperCase()})
                      latlong[country.country.toUpperCase()].latitude = map.getAreaCenterLatitude(mapArea)
                      latlong[country.country.toUpperCase()].longitude = map.getAreaCenterLongitude(mapArea)
                    }
                    if(!images[country.country]){

                      images[country.country] = {
                          "zoomLevel": 5, "scale": 0.5, "title": countries[country.country.toUpperCase()].name.en,
                          "latitude": latlong[country.country.toUpperCase()].latitude, 
                          "longitude": latlong[country.country.toUpperCase()].longitude
                      };
                    }

                  }
              })  
            }
          })
          
          map.dataProvider.images = _.union(map.dataProvider.images, _.values(images));
          map.validateData();
          // add events to recalculate map position when the map is moved or zoomed
          map.addListener( "positionChanged", updateCustomMarkers );
          

          updateCustomMarkers({chart:map});
        }

        $scope.showLmos_changed = function(){
         
          if($scope.options.showLmos){  
              map.dataProvider.images=[];            
              map.validateData();
              loadLmoDetails();
          }
          else{
            map.dataProvider.images=[euLabel];            
            map.validateData();
          }     
        }

        $scope.lmo_changed = function(){
          if($scope.options.lmo && $scope.options.showLmos){

            if($scope.options.lmo!= 'all')
              return loadLmoDetails($scope.options.lmo);

            loadLmoDetails();
          }          
        }

        function loadLmoDetails(lmo){

          if(lmoDecisions){
            if(lmo)
              return loadLmoMap([_.find(lmoDecisions, {uniqueIdentification : lmo})]);
            return loadLmoMap(lmoDecisions);
          }
          var query = {
            "uniqueIdentification" : { $exists : true},
            "countries.bch" : { $exists : true},
          };
          if(lmo)
            query.uniqueIdentification = lmo;

          $q.when($http.get('/api/v2013/lmos', { params: {q:JSON.stringify(query)}}))
          .then(function(result){

            if(!lmoDecisions)
              lmoDecisions = result.data;

            if(!$scope.lmos){
              $scope.lmos = _.map(result.data, function(lmo){ return {identifier: lmo.uniqueIdentification, title: lmo.uniqueIdentification}});                  
              $scope.lmos.unshift({identifier:'all', title:'All LMOs'});
            }

            loadLmoMap(result.data);

          })
        }

        function initLangLat(){
          latlong.AD={latitude:42.5,longitude:1.5};latlong.AE={latitude:24,longitude:54};latlong.AF={latitude:33,longitude:65};latlong.AG={latitude:17.05,longitude:-61.8};latlong.AI={latitude:18.25,longitude:-63.1667};latlong.AL={latitude:41,longitude:20};latlong.AM={latitude:40,longitude:45};latlong.AN={latitude:12.25,longitude:-68.75};latlong.AO={latitude:-12.5,longitude:18.5};latlong.AP={latitude:35,longitude:105};latlong.AQ={latitude:-90,longitude:0};latlong.AR={latitude:-34,longitude:-64};latlong.AS={latitude:-14.3333,longitude:-170};latlong.AT={latitude:47.3333,longitude:13.3333};latlong.AU={latitude:-27,longitude:133};latlong.AW={latitude:12.5,longitude:-69.9667};latlong.AZ={latitude:40.5,longitude:47.5};latlong.BA={latitude:44,longitude:18};latlong.BB={latitude:13.1667,longitude:-59.5333};latlong.BD={latitude:24,longitude:90};latlong.BE={latitude:50.8333,longitude:4};latlong.BF={latitude:13,longitude:-2};latlong.BG={latitude:43,longitude:25};latlong.BH={latitude:26,longitude:50.55};latlong.BI={latitude:-3.5,longitude:30};latlong.BJ={latitude:9.5,longitude:2.25};latlong.BM={latitude:32.3333,longitude:-64.75};latlong.BN={latitude:4.5,longitude:114.6667};latlong.BO={latitude:-17,longitude:-65};latlong.BR={latitude:-10,longitude:-55};latlong.BS={latitude:24.25,longitude:-76};latlong.BT={latitude:27.5,longitude:90.5};latlong.BV={latitude:-54.4333,longitude:3.4};latlong.BW={latitude:-22,longitude:24};latlong.BY={latitude:53,longitude:28};latlong.BZ={latitude:17.25,longitude:-88.75};latlong.CA={latitude:54,longitude:-100};latlong.CC={latitude:-12.5,longitude:96.8333};latlong.CD={latitude:0,longitude:25};latlong.CF={latitude:7,longitude:21};latlong.CG={latitude:-1,longitude:15};latlong.CH={latitude:47,longitude:8};latlong.CI={latitude:8,longitude:-5};latlong.CK={latitude:-21.2333,longitude:-159.7667};latlong.CL={latitude:-30,longitude:-71};latlong.CM={latitude:6,longitude:12};latlong.CN={latitude:35,longitude:105};latlong.CO={latitude:4,longitude:-72};latlong.CR={latitude:10,longitude:-84};latlong.CU={latitude:21.5,longitude:-80};latlong.CV={latitude:16,longitude:-24};latlong.CX={latitude:-10.5,longitude:105.6667};latlong.CY={latitude:35,longitude:33};latlong.CZ={latitude:49.75,longitude:15.5};latlong.DE={latitude:51,longitude:9};latlong.DJ={latitude:11.5,longitude:43};latlong.DK={latitude:56,longitude:10};latlong.DM={latitude:15.4167,longitude:-61.3333};latlong.DO={latitude:19,longitude:-70.6667};latlong.DZ={latitude:28,longitude:3};latlong.EC={latitude:-2,longitude:-77.5};latlong.EE={latitude:59,longitude:26};latlong.EG={latitude:27,longitude:30};latlong.EH={latitude:24.5,longitude:-13};latlong.ER={latitude:15,longitude:39};latlong.ES={latitude:40,longitude:-4};latlong.ET={latitude:8,longitude:38};latlong.EU={latitude:47,longitude:8};latlong.FI={latitude:62,longitude:26};latlong.FJ={latitude:-18,longitude:175};latlong.FK={latitude:-51.75,longitude:-59};latlong.FM={latitude:6.9167,longitude:158.25};latlong.FO={latitude:62,longitude:-7};latlong.FR={latitude:46,longitude:2};latlong.GA={latitude:-1,longitude:11.75};latlong.GB={latitude:54,longitude:-2};latlong.GD={latitude:12.1167,longitude:-61.6667};latlong.GE={latitude:42,longitude:43.5};latlong.GF={latitude:4,longitude:-53};latlong.GH={latitude:8,longitude:-2};latlong.GI={latitude:36.1833,longitude:-5.3667};latlong.GL={latitude:72,longitude:-40};latlong.GM={latitude:13.4667,longitude:-16.5667};latlong.GN={latitude:11,longitude:-10};latlong.GP={latitude:16.25,longitude:-61.5833};latlong.GQ={latitude:2,longitude:10};latlong.GR={latitude:39,longitude:22};latlong.GS={latitude:-54.5,longitude:-37};latlong.GT={latitude:15.5,longitude:-90.25};latlong.GU={latitude:13.4667,longitude:144.7833};latlong.GW={latitude:12,longitude:-15};latlong.GY={latitude:5,longitude:-59};latlong.HK={latitude:22.25,longitude:114.1667};latlong.HM={latitude:-53.1,longitude:72.5167};latlong.HN={latitude:15,longitude:-86.5};latlong.HR={latitude:45.1667,longitude:15.5};latlong.HT={latitude:19,longitude:-72.4167};latlong.HU={latitude:47,longitude:20};latlong.ID={latitude:-5,longitude:120};latlong.IE={latitude:53,longitude:-8};latlong.IL={latitude:31.5,longitude:34.75};latlong.IN={latitude:20,longitude:77};latlong.IO={latitude:-6,longitude:71.5};latlong.IQ={latitude:33,longitude:44};latlong.IR={latitude:32,longitude:53};latlong.IS={latitude:65,longitude:-18};latlong.IT={latitude:42.8333,longitude:12.8333};latlong.JM={latitude:18.25,longitude:-77.5};latlong.JO={latitude:31,longitude:36};latlong.JP={latitude:36,longitude:138};latlong.KE={latitude:1,longitude:38};latlong.KG={latitude:41,longitude:75};latlong.KH={latitude:13,longitude:105};latlong.KI={latitude:1.4167,longitude:173};latlong.KM={latitude:-12.1667,longitude:44.25};latlong.KN={latitude:17.3333,longitude:-62.75};latlong.KP={latitude:40,longitude:127};latlong.KR={latitude:37,longitude:127.5};latlong.KW={latitude:29.3375,longitude:47.6581};latlong.KY={latitude:19.5,longitude:-80.5};latlong.KZ={latitude:48,longitude:68};latlong.LA={latitude:18,longitude:105};latlong.LB={latitude:33.8333,longitude:35.8333};latlong.LC={latitude:13.8833,longitude:-61.1333};latlong.LI={latitude:47.1667,longitude:9.5333};latlong.LK={latitude:7,longitude:81};latlong.LR={latitude:6.5,longitude:-9.5};latlong.LS={latitude:-29.5,longitude:28.5};latlong.LT={latitude:55,longitude:24};latlong.LU={latitude:49.75,longitude:6};latlong.LV={latitude:57,longitude:25};latlong.LY={latitude:25,longitude:17};latlong.MA={latitude:32,longitude:-5};latlong.MC={latitude:43.7333,longitude:7.4};latlong.MD={latitude:47,longitude:29};latlong.ME={latitude:42.5,longitude:19.4};latlong.MG={latitude:-20,longitude:47};latlong.MH={latitude:9,longitude:168};latlong.MK={latitude:41.8333,longitude:22};latlong.ML={latitude:17,longitude:-4};latlong.MM={latitude:22,longitude:98};latlong.MN={latitude:46,longitude:105};latlong.MO={latitude:22.1667,longitude:113.55};latlong.MP={latitude:15.2,longitude:145.75};latlong.MQ={latitude:14.6667,longitude:-61};latlong.MR={latitude:20,longitude:-12};latlong.MS={latitude:16.75,longitude:-62.2};latlong.MT={latitude:35.8333,longitude:14.5833};latlong.MU={latitude:-20.2833,longitude:57.55};latlong.MV={latitude:3.25,longitude:73};latlong.MW={latitude:-13.5,longitude:34};latlong.MX={latitude:23,longitude:-102};latlong.MY={latitude:2.5,longitude:112.5};latlong.MZ={latitude:-18.25,longitude:35};latlong.NA={latitude:-22,longitude:17};latlong.NC={latitude:-21.5,longitude:165.5};latlong.NE={latitude:16,longitude:8};latlong.NF={latitude:-29.0333,longitude:167.95};latlong.NG={latitude:10,longitude:8};latlong.NI={latitude:13,longitude:-85};latlong.NL={latitude:52.5,longitude:5.75};latlong.NO={latitude:62,longitude:10};latlong.NP={latitude:28,longitude:84};latlong.NR={latitude:-.5333,longitude:166.9167};latlong.NU={latitude:-19.0333,longitude:-169.8667};latlong.NZ={latitude:-41,longitude:174};latlong.OM={latitude:21,longitude:57};latlong.PA={latitude:9,longitude:-80};latlong.PE={latitude:-10,longitude:-76};latlong.PF={latitude:-15,longitude:-140};latlong.PG={latitude:-6,longitude:147};latlong.PH={latitude:13,longitude:122};latlong.PK={latitude:30,longitude:70};latlong.PL={latitude:52,longitude:20};latlong.PM={latitude:46.8333,longitude:-56.3333};latlong.PR={latitude:18.25,longitude:-66.5};latlong.PS={latitude:32,longitude:35.25};latlong.PT={latitude:39.5,longitude:-8};latlong.PW={latitude:7.5,longitude:134.5};latlong.PY={latitude:-23,longitude:-58};latlong.QA={latitude:25.5,longitude:51.25};latlong.RE={latitude:-21.1,longitude:55.6};latlong.RO={latitude:46,longitude:25};latlong.RS={latitude:44,longitude:21};latlong.RU={latitude:60,longitude:100};latlong.RW={latitude:-2,longitude:30};latlong.SA={latitude:25,longitude:45};latlong.SB={latitude:-8,longitude:159};latlong.SC={latitude:-4.5833,longitude:55.6667};latlong.SD={latitude:15,longitude:30};latlong.SE={latitude:62,longitude:15};latlong.SG={latitude:1.3667,longitude:103.8};latlong.SH={latitude:-15.9333,longitude:-5.7};latlong.SI={latitude:46,longitude:15};latlong.SJ={latitude:78,longitude:20};latlong.SK={latitude:48.6667,longitude:19.5};latlong.SL={latitude:8.5,longitude:-11.5};latlong.SM={latitude:43.7667,longitude:12.4167};latlong.SN={latitude:14,longitude:-14};latlong.SO={latitude:10,longitude:49};latlong.SR={latitude:4,longitude:-56};latlong.ST={latitude:1,longitude:7};latlong.SV={latitude:13.8333,longitude:-88.9167};latlong.SY={latitude:35,longitude:38};latlong.SZ={latitude:-26.5,longitude:31.5};latlong.TC={latitude:21.75,longitude:-71.5833};latlong.TD={latitude:15,longitude:19};latlong.TF={latitude:-43,longitude:67};latlong.TG={latitude:8,longitude:1.1667};latlong.TH={latitude:15,longitude:100};latlong.TJ={latitude:39,longitude:71};latlong.TK={latitude:-9,longitude:-172};latlong.TM={latitude:40,longitude:60};latlong.TN={latitude:34,longitude:9};latlong.TO={latitude:-20,longitude:-175};latlong.TR={latitude:39,longitude:35};latlong.TT={latitude:11,longitude:-61};latlong.TV={latitude:-8,longitude:178};latlong.TW={latitude:23.5,longitude:121};latlong.TZ={latitude:-6,longitude:35};latlong.UA={latitude:49,longitude:32};latlong.UG={latitude:1,longitude:32};latlong.UM={latitude:19.2833,longitude:166.6};latlong.US={latitude:38,longitude:-97};latlong.UY={latitude:-33,longitude:-56};latlong.UZ={latitude:41,longitude:64};latlong.VA={latitude:41.9,longitude:12.45};latlong.VC={latitude:13.25,longitude:-61.2};latlong.VE={latitude:8,longitude:-66};latlong.VG={latitude:18.5,longitude:-64.5};latlong.VI={latitude:18.3333,longitude:-64.8333};latlong.VN={latitude:16,longitude:106};latlong.VU={latitude:-16,longitude:167};latlong.WF={latitude:-13.3,longitude:-176.2};latlong.WS={latitude:-13.5833,longitude:-172.3333};latlong.YE={latitude:15,longitude:48};latlong.YT={latitude:-12.8333,longitude:45.1667};latlong.ZA={latitude:-29,longitude:24};latlong.ZM={latitude:-15,longitude:30};latlong.ZW={latitude:-20,longitude:30}  
        }

        loadCountries();
        
      }],
    }; // return
  }]); //app.directive('searchFilterCountries
}); // define
