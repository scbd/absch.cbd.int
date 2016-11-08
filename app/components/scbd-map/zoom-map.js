define(['text!./zoom-map.html', 'app', 'lodash',

  //'css!./zoomMap',
  'css!/app/libs/flag-icon-css/css/flag-icon.min.css',
  'ammap',
  'shim!./worldEUHigh[ammap]',
  'shim!ammap/themes/light[ammap]',
  'scbd-angularjs-services/locale',
  './ammap3-service',
  './map-data',
], function(template, app, _) {
  'use strict';

  app.directive('zoomMap', ['$timeout', '$http', 'locale', 'ammap3Service', 'mapData', '$interpolate','$location', function($timeout, $http, locale, ammap3Service, mapDataService, $interpolate,$location) {
    return {
      restrict: 'E',
      template: template,
      //replace: true,
      // scope: {
      //   zoomTo: '=zoomTo',
      // },
      require: '^zoomMap',
      //=======================================================================
      //
      //=======================================================================
      link: function($scope, $element, $attr, zoomMap) {

        if($attr.zoomTo)
          $scope.zoomTo=$attr.zoomTo;
        $scope.items = [];
        mapDataService.initData($attr.mapId);
        setAttributes();
        //if($element.find('#mapdiv')[0])
          $('#mapdiv').attr('id', $attr.mapId);
        //else console.log('#mapdiv');


        $scope.map = AmCharts.makeChart($attr.mapId, mapDataService.getMapData($attr.mapId)); //jshint ignore:line
        $scope.map.write($attr.mapId);

        $scope.map.addListener("clickMapObject", function(event) {

            if(event.mapObject.id != $scope.zoomTo){
                var countryCode = event.mapObject.id;
                if(ammap3Service.exceptionRegionMapping[event.mapObject.id]){
                    countryCode = ammap3Service.exceptionRegionMapping[event.mapObject.id];
                }
                $timeout(function(){
                    $location.url('/countries/'+countryCode.toLowerCase());
                });
            }
        });
        if ($scope.zoomTo)
          $scope.map.clickMapObject(zoomMap.getMapObject(_.clone($scope.zoomTo).toUpperCase()));
        //=======================================================================
        //
        //=======================================================================
        function setAttributes() {
          $scope.attr = {};

          if ($attr.mapId) {
            $scope.attr.mapId = $attr.mapId;

            ammap3Service.setMapCtrl(zoomMap);
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

          if ($attr.zoomControlRight)
            $scope.attr.zoomControlRight = $attr.zoomControlRight;

            if ($attr.zoomControlTop)
              $scope.attr.zoomControlTop = $attr.zoomControlTop;

              if ($attr.zoomControlAlpha)
                $scope.attr.zoomControlAlpha = $attr.zoomControlAlpha;

                if ($attr.homeButton)
                  $scope.attr.homeButton = $attr.homeButton;

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
        function zoomToMapArea(areaId) {
          var  mapObject={};

          mapObject= getMapObject(areaId.toUpperCase());

          $scope.map.clickMapObject(mapObject);
        }//
        //=======================================================================
        //
        //=======================================================================
        function writeMapZoomIn() {

          writeMap($scope.attr.mapId);
          $scope.map.zoomIn();
        }//
        this.zoomToMapArea = zoomToMapArea;
        this.clickMapObject = clickMapObject;
        this.getAttrs = getAttrs;
        this.writeMapZoomIn = writeMapZoomIn;
        this.getCtrlMapId = getCtrlMapId;
        this.getMapObject = getMapObject;
        this.getMap = getMap;
        this.writeMap = writeMap;
      }],
    }; // return
  }]); //app.directive('searchFilterCountries
}); // define
