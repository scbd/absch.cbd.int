define(['text!./ammap3.html', 'text!./default-template.html','app', 'lodash',
  'css!./ammap3',
  'css!/app/libs/flag-icon-css/css/flag-icon.min.css',
  'ammap',
  'shim!./worldEUHigh[ammap]',
  'shim!ammap/themes/light[ammap]',
  'css!./mappin.css',
  'scbd-angularjs-services/locale',
  './ammap3-service',
  './map-data',
  'scbd-angularjs-filters',
], function(template, defaultTemplate, app, _) {
  'use strict';

  app.directive('ammap3', ['$timeout', '$http', 'locale', 'ammap3Service', 'mapData', '$interpolate', '$filter', 'localeService',
   function($timeout, $http, locale, ammap3Service, mapDataService, $interpolate, $filter, localeService) {
    return {
      restrict: 'E',
      template: template,
      replace: true,
      require: '^ammap3',
      //=======================================================================
      //
      //=======================================================================
      link: function($scope, $element, $attr, ammap3) {
        $scope.items = [];
        mapDataService.initData($attr.mapId);
        setAttributes();
        $('#mapdiv').attr('id', $attr.mapId);

        $scope.map = AmCharts.makeChart($attr.mapId, mapDataService.getMapData($attr.mapId)); //jshint ignore:line
        $scope.map.write($attr.mapId);
        //=======================================================================
        //
        //=======================================================================
        function setAttributes() {
          $scope.attr = {};

          if ($attr.mapId) {
            $scope.attr.mapId = $attr.mapId;
            ammap3Service.setMapCtrl(ammap3);
          } else {
            throw "you must set a map ID for your map instance";
          }

          if ($attr.color)
            $scope.attr.color = $attr.color;
          else
            $scope.attr.color = '#000000';

          if ($attr.selectedColor)
            $scope.attr.selectedColor = $attr.selectedColor;
          else
            $scope.attr.selectedColor = '#000000';

          if ($attr.rollOverColor)
            $scope.attr.rollOverColor = $attr.rollOverColor;
          else
            $scope.attr.rollOverColor = '#000000';

          if ($attr.height)
            $scope.attr.height = $attr.height;
          else
            $scope.attr.height = '500px';

          $element.find('#mapdiv').css('height', $scope.attr.height);

          if ($attr.width)
            $scope.attr.width = $attr.width;
          else
            $scope.attr.width = '100%';

          $element.find('#mapdiv').css('width', $scope.attr.width);
          if ($attr.zoomInOnLoad)
            $scope.attr.zoomInOnLoad = $attr.zoomInOnLoad;

          if ($attr.miniMap)
            $scope.attr.miniMap = $attr.miniMap;
          else
            $scope.attr.miniMap = 'false';
          mapDataService.setAttrubutes($scope.attr.mapId, $scope.attr);
        }

        $scope.$on('$destroy', function(){
              $scope.map.clearMap();
              $('#' + $attr.mapId).remove();
              $scope.map = undefined;
        });
      }, //link



      //=======================================================================
      //
      //=======================================================================
      controller: ['$scope', function($scope) {

        //=======================================================================
        //
        //=======================================================================
        function closePopovers(pin) {
          // get map object
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

        } //closePopovers(pin)

        //=======================================================================
        // this function will take current images on the map and create HTML elements for them
        //=======================================================================
        function updateCustomMarkers() {
          // get map object

          var map = $scope.map;

          // go through all of the images
          for (var x in map.dataProvider.images) {
            if (x === '0') continue;

            var image = map.dataProvider.images[x];

            if ('undefined' == typeof image.externalElement && image.scbdData) {
              image.externalElement = generateMarker(x);
            }

            if ('undefined' !== typeof image.externalElement) {
              // reposition the element accoridng to coordinates
              image.externalElement.style.top = map.latitudeToY(image.latitude) + 'px';
              image.externalElement.style.left = map.longitudeToX(image.longitude) + 'px';
            }
          }
          $scope.map.addListener("positionChanged", updateCustomMarkers);
        } //updateCustomMarkers

        //=======================================================================
        //
        //=======================================================================
        function generateMarker(imageIndex) {
          return makeMarker(imageIndex, 'pin', 'pin-invisi', '/app/components/scbd-map/images/pins/invisi-pin.svg');
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
         var template = defaultTemplate
          if($scope.map && $scope.map.scbdConfig && $scope.map.scbdConfig.popOverTemplate)
            template = $scope.map.scbdConfig.popOverTemplate;

          popoverTemplateParsed = $interpolate(template)(image.scbdData);

          return {
            html: true,
            trigger: 'click',
            placement: 'top',
            title: ($scope.map.scbdConfig||{}).popOverTemplateTitle,
            template: popoverTemplateParsed,
          };
        } //$scope.legendHide

        //=======================================================================
        //
        //=======================================================================
        function progressColorMap(mapTypeFunction) {

          hideAreas();

          _.each($scope.items, function(country) {

            if (!_.isEmpty(country.docs))
              _.each(country.docs, function(schema) {
                if (mapTypeFunction) mapTypeFunction(country, schema, $scope.schema);
              });
            else mapTypeFunction(country);
          });
          $scope.map.validateData(); // updates map with color changes
        } //progressColorMap

        //=======================================================================
        //
        //=======================================================================
        function pinMap() {
          updateCustomMarkers();
        } //progressColorMap

        //=======================================================================
        //
        //=======================================================================
        function partiesMap(country) {
          genTreatyCombinations();

          changeAreaColor(country.code, getPartyColor(country));
          buildProgressBaloonParties(country);

          legendTitle($scope.schema);

        } // aichiMap

        // //=======================================================================
        // //
        // //=======================================================================
        function changeAreaColor(id, color, area) {
          if (!area)
            area = getMapObject(id);
          area.colorReal = area.originalColor = color;

          if (id === 'DK') {
            var area2 = getMapObject('GL');
            area2.colorReal = area.colorReal;
            area2.originalColor = area.originalColor;
          }

        } //getMapObject

        // //=======================================================================
        // // changes color of all un colored areas
        // //=======================================================================
        function hideAreas(color) {
          // Walkthrough areas
          if (!color) color = '#dddddd';
          _.each($scope.map.dataProvider.areas, function(area) {
            if (area.id !== 'divider1') {
              area.colorReal = area.originalColor = color;
              area.mouseEnabled = true;
              area.balloonText = '[[title]]';
            }
          });
        } //hideAreas(color)

        // //=======================================================================
        // //
        // //=======================================================================
        function getMapObject(id) {

          var index = _.findIndex($scope.map.dataProvider.areas, function(area) {
            return area.id === id;
          });
          return $scope.map.dataProvider.areas[index];
        } //getMapObject

        // //=======================================================================
        // //
        // //=======================================================================
        function getMap() {

          return $scope.map;
        } //getMapObject

        //=======================================================================
        //
        //=======================================================================
        function writeMap(elementId) {
          $scope.map.write(elementId);
        } // writeMap

        //=======================================================================
        //
        //=======================================================================
        function getCtrlMapId() {
          return $scope.attr.mapId;
        } // writeMap

        //=======================================================================
        //
        //=======================================================================
        function getAttrs() {
          return $scope.attr;
        } // writeMap

        // //=======================================================================
        // //
        // //=======================================================================
        function clickMapObject(object) {
          $scope.map.clickMapObject(object);
        } //getMapObject

        //=======================================================================
        //
        //=======================================================================
        function writeMapZoomIn() {
          writeMap();
          $scope.map.zoomIn();
        }//

        this.clickMapObject = clickMapObject;
        this.getAttrs = getAttrs;
        this.writeMapZoomIn = writeMapZoomIn;
        this.pinMap = pinMap;
        this.getCtrlMapId = getCtrlMapId;
        this.closePopovers = closePopovers;
        this.getMapObject = getMapObject;
        this.getMap = getMap;
        this.writeMap = writeMap;
        this.generatePopover = generatePopover;
        this.progressColorMap = progressColorMap;
      }],
    }; // return
  }]); //app.directive('searchFilterCountries
}); // define
