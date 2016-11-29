define(['app',
  'lodash',
  'text!./pin-popup.html',
  './long-lat',
  './map-data',
], function(app, _, defaultPinPopOver) {
  'use strict';


  app.factory('ammap3Service', ["locale", "$q", "longLatServ", "mapData",  function(locale, $q, longLatServ, mapData) {

    var timeouts = [];

    var countries = null;
    var mapObject = {};
    var mapCtrls = {};
    var pinLibrary = ['default', 'invisi-pin'];
    var pinImgLibrary = [];
    pinImgLibrary['invisi-pixel'] = '/app/components/scbd-map/images/pins/invisi-pin.svg';

    var pinPopOverLibrary = [];
    pinPopOverLibrary['default'] = defaultPinPopOver;

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
         EH : 'MA', //Western Sahara
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


    //=======================================================================
    //
    //=======================================================================
    function loadCountries(mapId,data) {
      countries = data;
      return bindCountryData(mapId).then(function(mapCtrl) {

        mapCtrl.getMap().validateData();
        if (mapCtrl.getAttrs().zoomInOnLoad)
          mapCtrl.getMap().zoomIn();

        mapCtrl.pinMap();
        return;
      });
    }

    //=======================================================================
    //
    //=======================================================================
    function setMapObject(map) {
      mapObject = map;
    }

    //=======================================================================
    //
    //=======================================================================
    function bindCountryData(mapId) {
      var deferred = $q.defer();
      deferred.resolved = 0;

      var cancelId = setInterval(function() {
        if (mapCtrls[mapId] && countries) {
          clearInterval(cancelId);
          var image = {};
          var lat;
          var long;
          var country = 0;
          //mapData.initData(mapId);
          _.each(mapCtrls[mapId].getMap().dataProvider.areas, function(mapArea) {


            country = _.find(countries, function(c) {
              return (c.code === mapArea.id);
            });

            if (!country) {
              //country = normalizeCountryData({});
              country={};

              if(exceptionRegionMapping[mapArea.id]){
                  var cot = _.find(countries, function(c) {
                                return (c.code === exceptionRegionMapping[mapArea.id]);
                              });
                if(cot){
                    _.extend(country, cot);
                }
                country.exceptionCountry = cot.code.toLowerCase();

              }
              country.code = mapArea.id;
              country.codeLower = mapArea.id.toLowerCase();
            } else
              country.nameLocalized = country.name[locale];


            //mapCtrls[mapId].getMapObject(country.code).scbdData=country;
            long = mapCtrls[mapId].getMap().getAreaCenterLongitude(mapCtrls[mapId].getMapObject(mapArea.id));
            lat = mapCtrls[mapId].getMap().getAreaCenterLatitude(mapCtrls[mapId].getMapObject(mapArea.id));

            image.lat = lat;
            image.long = long;
            image.code = mapArea.id;
            //image =_.find(longLatServ.data, function(c){return(c[0]===country.code); });
            image.scbdData = country;
            mapData.loadImage(mapId, image);
          });

          deferred.resolved = 1;
          deferred.resolve(mapCtrls[mapId]);

          return deferred.promise;
        }

      }, 0);
      timeouts.push(cancelId)

     var timeout = setTimeout(function() {
                    clearInterval(cancelId);
                    if (mapId && mapCtrls[mapId] && !(mapCtrls[mapId].getMap() && countries))
                      throw ('Error: no controller or map initialazed on mapID:' + mapId + ' or no country data loaded');

                  }, 7000);
      timeouts.push(timeout);
      return deferred.promise;
    }

    //=======================================================================
    //
    //=======================================================================
    function setMapCtrl(mapCtrl) {

      if (mapCtrl.getCtrlMapId()) {
        if(mapCtrls[mapCtrl.getCtrlMapId()])
          mapCtrls[mapCtrl.getCtrlMapId()]={};
        mapCtrls[mapCtrl.getCtrlMapId()] = mapCtrl;


      } else
        throw "Error: thrying to register a map controler in the ammap3Service with out  a mapID";
    }



    //=======================================================================
    //
    //=======================================================================
    function getCountries() {
      var deferred = $q.defer();
      deferred.resolved = 0;

      ///TODO : switch to angular-$timeout
      var cancelId = setInterval(function() {
        if (countries) {

          deferred.resolve(countries);
          deferred.resolved = 1;
          clearInterval(cancelId);
          return deferred.promise;
        }
      }, 100);

      timeouts.push(cancelId);
      var timeout = setTimeout(function() {
                      if (!deferred.resolved) {
                        deferred.reject('Receiving country data timed out.');
                        clearInterval(cancelId);
                      }
                    }, 7000);      
      timeouts.push(timeout);
      return deferred.promise;
    }

    //=======================================================================
    //
    //=======================================================================
    function setGlobalClickListener(mapId, onClickToDo) {

    ///TODO : switch to angular-$timeout
      var cancelId = setInterval(function() {
        if (mapId && mapCtrls[mapId] && mapCtrls[mapId].getMap()) {
          clearInterval(cancelId);
          return mapCtrls[mapId].getMap().addListener("click", onClickToDo);
        }
      }, 500);
      timeouts.push(cancelId);
      var timeout = setTimeout(function() {
                      clearInterval(cancelId);
                      if (mapId && mapCtrls[mapId] && !mapCtrls[mapId].getMap())
                        throw (' setGlobalClickListener Error: no controller or map initialized on mapID:' + mapId);

                    }, 7000);      
      timeouts.push(timeout);  
    } //setGlobalClickListener

    //=======================================================================
    //
    //=======================================================================
    function setCountryClickListener(mapId, onClickToDo) {

    ///TODO : switch to angular-$timeout
      var cancelId = setInterval(function() {
        if (mapId && mapCtrls[mapId] && mapCtrls[mapId].getMap()) {
          clearInterval(cancelId);
          // console.log(mapCtrls[mapId].getMap());
          return mapCtrls[mapId].getMap().addListener("clickMapObject", onClickToDo);
        }
      }, 500);

      setTimeout(function() {
        clearInterval(cancelId);
        if (mapId && mapCtrls[mapId] && !mapCtrls[mapId].getMap())
          throw ('setGlobalClickListener:Error: no controller or map initialazed on mapID:' + mapId);

      }, 7000);
    } //setGlobalClickListener


    //=======================================================================
    //
    //=======================================================================
    function whenMapLoaded(mapId) {
      var deferred = $q.defer();
      deferred.resolved = 0;

      ///TODO : switch to angular-$timeout
      var cancelId = setInterval(function() {
        if (mapId && mapCtrls[mapId] && mapCtrls[mapId].getMap()) {

          deferred.resolve(mapCtrls[mapId].getMap());
          deferred.resolved = 1;
          clearInterval(cancelId);
          return deferred.promise;
        }
      }, 100);
      timeouts.push(cancelId);
      var timeout = setTimeout(function() {
                      if (!deferred.resolved) {
                        deferred.reject('Map is not loaded within 7 seconds.');
                        clearInterval(cancelId);
                      }
                    }, 7000);      
      timeouts.push(timeout);

      return deferred.promise;
    }
    //=======================================================================
    //
    //=======================================================================
    function whenMapCtrlLoaded(mapId) {
      var deferred = $q.defer();
      deferred.resolved = 0;

      ///TODO : switch to angular-$timeout
      var cancelId = setInterval(function() {
        if (mapId && mapCtrls[mapId]) {

          deferred.resolve(mapCtrls[mapId]);
          deferred.resolved = 1;
          clearInterval(cancelId);
          return deferred.promise;
        }
      }, 100);
      timeouts.push(cancelId);
      var timeout = setTimeout(function() {
                      if (!deferred.resolved) {
                        deferred.reject('Map Controler is not loaded within 7 seconds.');
                        clearInterval(cancelId);
                      }
                    }, 7000);
      timeouts.push(timeout);
      return deferred.promise;
    }
    //=======================================================================
    //'invisi-pixel''
    //=======================================================================
    function setPinImage(mapId, imgPathOrLibraryName) {
      if (!mapId) throw "setPinImage Error: trying to run setPinImage without specifiing a map instance with mapId";
      if (!imgPathOrLibraryName) throw "setPinImage Error: trying to run setPinImage without specifiing a and image";

      whenMapLoaded(mapId).then(
        function(mapInstance) {
          if (!mapInstance.scbdConfig) mapInstance.scbdConfig = {};

          if (pinImgLibrary[imgPathOrLibraryName])
            mapInstance.scbdConfig.pin = pinImgLibrary[imgPathOrLibraryName];
          else
            mapInstance.scbdConfig.pin = imgPathOrLibraryName;
        },
        function() {
          throw "setPinImage Error: map failed to load with mapId:" + mapId;
        }
      );

    } // setPinImage

    //=======================================================================
    //'invisi-pixel''
    //=======================================================================
    function setPinPopOver(mapId, template) {
      if (!mapId) throw "setPinPopover Error: trying to run setPinPopover without specifying a map instance with mapId";
      //if(!template) throw "setPinPopover Error: trying to run setPinPopover without specifying a popover html template";

      whenMapLoaded(mapId).then(
        function(mapInstance) {
          if (!mapInstance.scbdConfig) mapInstance.scbdConfig = {};


          if (!template)
            template = 'default';
          if (pinPopOverLibrary[template])
            mapInstance.scbdConfig.popOverTemplate = pinPopOverLibrary[template];
          else
            mapInstance.scbdConfig.popOverTemplate = template;
          mapInstance.scbdConfig.popOverTemplateTitle = ' ';
        },
        function() {
          throw "setPinPopover Error: map failed to load with mapId:" + mapId;
        }
      );

    } // setPinImage

    //=======================================================================
    //'invisi-pixel''
    //=======================================================================
    function setPinToPoint(mapId, long, lat) {
      if (!mapId) throw "setPinToPoint Error: trying to run setPinToPoint without specifiing a map instance with mapId";
      if (!(long && lat)) throw "setPinToPoint Error: trying to run setPinToPoint without specifiing long and lat";

      whenMapLoaded(mapId).then(
        function(mapInstance) {
          mapInstance.pinMap();
        },
        function() {
          throw "setPinPopover Error: map failed to load with mapId:" + mapId;
        }
      );

    } // setPinImage

    //=======================================================================
    //'invisi-pixel''
    //=======================================================================
    function openCountryPopup(mapId, cCode) {
      var image = _.find(mapCtrls[mapId].getMap().dataProvider.images, function(img) {

          if(img.scbdData && _.contains(img.scbdData.exceptionRegion, cCode)){
              console.log(img.scbdData);
          }

        if (img.scbdData && (img.scbdData.code === cCode ||
            (exceptionRegionMapping[cCode] &&  _.contains(img.scbdData.exceptionRegion, cCode) &&
             img.scbdData.code === exceptionRegionMapping[cCode])))
            return true;
        else
          return false;
      });
      if(!image){
        console.log('Country missing popover information:', cCode)
        return;
      };
      mapCtrls[mapId].closePopovers();
      //console.log('X',mapCtrls[mapId].getMap().moveDown());
      if (image.externalElement)
        setTimeout(function() {
          $(image.externalElement).children('#pin-' + cCode).popover('show');
        }, 100);
      else
        console.log('Country missing popover information:', cCode);

      setTimeout(function() {
        mapCtrls[mapId].getMap().moveUp();
      }, 100);

    } // setPinImage

    //=======================================================================
    //
    //=======================================================================
    function closePopovers(mapId) {

      mapCtrls[mapId].closePopovers();
    } // closePopovers
    //=======================================================================
    //
    //=======================================================================
    function clickMapObject(mapId, mapObject) {

      mapCtrls[mapId].getMap().clickMapObject(mapObject);
    } // closePopovers
    //=======================================================================
    //
    //=======================================================================
    function selectObject(mapId, mapObject) {

      mapCtrls[mapId].getMap().selectObject(mapObject);
    } // closePopovers
    //=======================================================================
    //
    //=======================================================================
    function getMapObject(mapId, objId) {

      return mapCtrls[mapId].getMapObject(objId);

    } // closePopovers
    //=======================================================================
    //
    //=======================================================================
    function validateData(mapId) {

      return mapCtrls[mapId].getMap().validateData();

    } // closePopovers
    //=======================================================================
    //
    //=======================================================================
    function zoomToMapArea(mapId, areaId) {
      if (!mapId) throw "zoomToMapArea Error: trying to run zoomToMapArea without specifiing a map instance with mapId";
      if (!areaId) throw "zoomToMapArea Error: trying to run zoomToMapArea without specifiing an areaId";

      whenMapCtrlLoaded(mapId).then(
        function(ctrl) {
          console.log(ctrl);
          ctrl.zoomToMapArea(areaId);
        },
        function() {
          throw "zoomToMapArea Error: map failed to load with mapId:" + mapId+" when attempting to zoomToMapArea";
        }
      );

    } // closePopovers
    //=======================================================================
    //
    //=======================================================================
    function eachCountry(mapId, callBack) {
      if(mapCtrls[mapId]){
        _.each(mapCtrls[mapId].getMap().dataProvider.areas, function(area) {
          if (area.id.length === 2) {
            callBack(area);

          }
        });
      }

    } // closePopovers
    //=======================================================================
    //
    //=======================================================================
    function randomCountry(mapId) {
      var i = 0;
      var country = {};
      var scbdParty = {};
      while (true) {
        country = _.sample(mapCtrls[mapId].getMap().dataProvider.areas);
        scbdParty = _.find(countries, function(c) {
          return (c.code === country.id);
        });
        if (country.id.length === 2 && scbdParty)
          return country;
        else
          i++;
        if (i >= 1000) throw 'Error not country found in ammap3-service.randomCountry';
      }
    } // randomCountry

    function clear(mapId){
        mapCtrls[mapId].getMap().clearMap();

        countries = null;
        mapObject = {};
        mapCtrls = {};
        pinLibrary = ['default', 'invisi-pin'];
        pinImgLibrary = [];
        pinImgLibrary['invisi-pixel'] = '/app/components/scbd-map/images/pins/invisi-pin.svg';

        pinPopOverLibrary = [];
        pinPopOverLibrary['default'] = defaultPinPopOver;

        _.map(timeouts, function(timeout){clearTimeout(timeout);})
    }

    return {
      validateData:validateData,
      getMapObject:getMapObject,
      zoomToMapArea:zoomToMapArea,
      randomCountry: randomCountry,
      eachCountry: eachCountry,
      clickMapObject: clickMapObject,
      selectObject: selectObject,
      closePopovers: closePopovers,
      openCountryPopup: openCountryPopup,
      setPinToPoint: setPinToPoint,
      setPinPopOver: setPinPopOver,
      setPinImage: setPinImage,
      setMapCtrl: setMapCtrl,
      setMapObject: setMapObject,
      //					registerWriteMap:registerWriteMap,
      loadCountries: loadCountries,
      getCountries: getCountries,
      setGlobalClickListener: setGlobalClickListener,
      setCountryClickListener: setCountryClickListener,

      clear                     : clear,
      exceptionRegionMapping    : exceptionRegionMapping
    };

  }]);
});
