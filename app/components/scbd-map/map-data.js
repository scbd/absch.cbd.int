define(['app', 'lodash'], function(app, _) {
  'use strict';

  app.factory('mapData', [function() {
    var mapData = {};

    if (window.innerWidth <= 600)
      var isXS = true;

    var images = {};

    var euImageLabel = {
      "label": "European Union",
      "latitude": -3.02,
      "longitude": -167.66
    }
	;




    //=======================================================================
    //
    //=======================================================================
    function initData(mapId) {
      mapData = {};
      images = {};
      var zoomTop = '10';
      var zoomRight = '10';
      if (isXS) {
        zoomTop = '40%';
        zoomRight = 10;
      }
      mapData[mapId] = {
        "type": "map",
        "theme": "light",
        "zoomDuration":0,
        "responsive": {
          "enabled": true
        },
        "dataProvider": {
          "map": "worldEUHigh",
          "getAreasFromMap": true,
        },
        "areasSettings": {
          "alpha": 1,
          "autoZoom": true,
          "selectedColor": '#1fa65d',
          "rollOverColor": '#000000',
          "selectable": true,
          "color": '#000000',
          "outlineThickness": 2.5,
          "outlineColor": '#1fa65d',
        },
        "smallMap": {
          "enabled": false,
          "rectangleColor": '#069554',
          "backgroundAlpha": 0.5,
          "mapColor": '#069554',

        },
        "zoomControl": {
          "right": zoomRight,
          "top": zoomTop,
          "buttonFillAlpha": 1,
          "panStepSize":.25,
        },
        "export": {
          "libs": {
            "autoLoad": false,
          },
          "enabled": false,
          "position": "top-right",
          "buttonFillAlpha": 1,
        },
      }; //
      mapData[mapId].dataProvider.images=[];
      mapData[mapId].dataProvider.images.push(euImageLabel);
    } //$scope.initMap

    function setAttrubutes(mapId,attrs){
          if(attrs.color)
              mapData[mapId].areasSettings.color=attrs.color;

          if(attrs.selectedColor)
              mapData[mapId].areasSettings.selectedColor=attrs.selectedColor;

          if(attrs.rollOverColor)
              mapData[mapId].areasSettings.rollOverColor=attrs.rollOverColor;

              if (attrs.zoomControlRight)
                  mapData[mapId].zoomControl.right = attrs.zoomControlRight;

                if (attrs.zoomControlTop)
                  mapData[mapId].zoomControl.top = attrs.zoomControlTop;

                  if (attrs.zoomControlAlpha)
                    mapData[mapId].zoomControl.buttonFillAlpha = String(attrs.zoomControlAlpha);
          if(attrs.homeButton==='false'  || attrs.homeButton==='true' )
            mapData[mapId].zoomControl.homeButtonEnabled = attrs.homeButton;


          // if(attrs.smallMap.enabled)
          //     mapData[mapId].smallMap.enabled=attrs.smallMap.enabled;


    }
    //=======================================================================
    //
    //=======================================================================
    function loadImage(mapId,image) {
        if(!mapData[mapId].dataProvider.images[0]) mapData[mapId].dataProvider.images.push(euImageLabel);
        mapData[mapId].dataProvider.images.push({latitude:image.lat,longitude:image.long,scbdData:image.scbdData});

    }
    //=======================================================================
    //
    //=======================================================================
    function getMapData(mapId) {
        return mapData[mapId];
    }

    return {
      initData:initData,
      getMapData:getMapData,
      setAttrubutes:setAttrubutes,
      mapData: mapData,
      loadImage:loadImage
    };

  }]);
});