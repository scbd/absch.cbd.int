import app from '~/app';
import _ from 'lodash';
// import ammap3,ammap3', 'ammap3WorldHigh', 'ammap-theme', 'ammap-export','ammap-ex-fabric','ammap-ex-filesaver',
//'ammap-ex-pdfmake','ammap-ex-vfs-fonts','ammap-ex-jszip','ammap-ex-xlsx']
import template from "text!./ammap3.html";
import ammap3T from '~/app-text/views/reports/chm/reporting-display/ammap3.json';

  app.directive('ammap3', ['$timeout','translationService', function($timeout,translationService) {
    return {
      restrict: 'EAC',
      template: template,
      replace: true,
      require: ['^reportingDisplay', '^ammap3'],
      scope: {
        items: '=ngModel',
        schema: '=schema',
        zoomTo: '=zoomTo',
        debug: '=debug'

      },
      link: function($scope, $element, $attr, requiredDirectives) {

        translationService.set('ammap3T', ammap3T );

        var reportingDIsplay = requiredDirectives[0];
        var ammap3 = requiredDirectives[1];
        $scope.legendTitle = "All Reporting to the CBD";
        $scope.leggends = {
          aichiTarget: [{
            id: -1,
            title: 'Not Reported',
            visible: true,
            color: '#dddddd'
          },
          {
            id: 0,
            title: 'Unknown',
            visible: true,
            color: '#908d8d'
          }, {
            id: 1,
            title: 'Moving Away',
            visible: true,
            color: '#6c1c67'
          }, {
            id: 2,
            title: 'No Progress',
            visible: true,
            color: '#ee1d23'
          }, {
            id: 3,
            title: 'Insufficient Rate',
            visible: true,
            color: '#fec210'
          }, {
            id: 4,
            title: 'Meet Target',
            visible: true,
            color: '#109e49'
          }, {
            id: 5,
            title: 'Exceeded Target',
            visible: true,
            color: '#1074bc'
          }, ],
          nationalReport: [

            {
              id: 0,
              title: 'Not Reported',
              visible: true,
              color: '#dddddd'
            }, {
              id: 1,
              title: 'Reported',
              visible: true,
              color: '#428bca'
            },

          ],
          default: [{
            id: 0,
            title: 'Not Reported',
            visible: true,
            color: '#dddddd'
          }, {
            id: 1,
            title: 'Reported',
            visible: true,
            color: '#428bca'
          }, ],
        };
        //generates new map with new data
        $scope.$watch('items', function() {
          ammap3.generateMap($scope.schema);
        });
        //external zoomToMap
        $scope.$watch('zoomTo', function() {
          zoomTo();
        }); //
        initMap();

        ammap3.writeMap();

        $scope.$on('customHome', function(event) {
          $timeout(function() {
            $scope.map.clickMapObject($scope.map.dataProvider);
          });
        });

        $scope.map.addListener("clickMapObject", function(event) {
          //  $scope.$apply(function(){
          //      reportingDIsplay.showCountryResultList(event.mapObject.id);
          //  });
          //                 $scope.$apply();
          // reportingDIsplay.showCountryResultList(event.mapObject.id);
          var id = event.mapObject.id;
          if(event.mapObject.id === 'GL')
          {
              $scope.map.clickMapObject(ammap3.getMapObject('DK'));
              id = 'DK';
          }
          if(event.mapObject.id === 'FO')
          {
              $scope.map.clickMapObject(ammap3.getMapObject('DK'));
              id = 'DK';
          }
          if(event.mapObject.id === 'SJ')
          {
              $scope.map.clickMapObject(ammap3.getMapObject('NO'));
              id = 'NO';
          }
          if(event.mapObject.id === 'EH')
          {
              $scope.map.clickMapObject(ammap3.getMapObject('MA'));
              id = 'MA';
          }
          if(event.mapObject.id === 'TW')
          {
              $scope.map.clickMapObject(ammap3.getMapObject('CN'));
              id = 'CN';
          }

          $scope.$evalAsync(function() {
            reportingDIsplay.showCountryResultList(id);
          });

        }); //

        $scope.map.addListener("homeButtonClicked", function() {
          $timeout(function() {
            reportingDIsplay.showCountryResultList('show');
          });
        });

        //=======================================================================
        //
        //=======================================================================
        function zoomTo() {
          if ($scope.zoomTo[0])
            $scope.map.clickMapObject(ammap3.getMapObject($scope.zoomTo[0]));
        } //$scope.legendHide

        //=======================================================================
        //
        //=======================================================================
        function initMap() {
          $scope.mapData = {
            "type": "map",
            "theme": "light",
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
              "autoZoom": true,
              "selectedColor": "#7fc3f4",
              "rollOverColor": "#423f3f",
              "selectable": true,
              "color": "#428bca",
            },
            "smallMap": {},
            "export": {
              "libs": { "autoLoad": false},
              "enabled": true,
              "position": "bottom-right"
            },
          }; //
        } //$scope.initMap
      }, //link

      controller: ["$scope", function($scope) {
        //=======================================================================
        //
        //=======================================================================
        function generateMap(schema) {

          if (!schema) return;
          if (schema.indexOf('AICHI-TARGET-') > -1){
            progressColorMap(aichiMap);
            if(!$scope.items || _.isEmpty($scope.items) ||  $scope.items.length <=0)
              legendTitle(null, null, schema);
          }
          else
            progressColorMap(defaultMap);
        } //$scope.legendHide

        //=======================================================================
        //
        //=======================================================================
        function restLegend(legend) {

          _.each(legend, function(legendItem) {
            legendItem.visible = true;
          });
        } //$scope.legendHide

        function averageAssessmentProgress(docs){
          if(docs.length == 1)
            return progressToNumber(docs[0].progress_EN_t);

          var progressCount = { 0:0,1:0,2:0,3:0,4:0,5:0 }
          _.each(docs, function(d){
            var num = progressToNumber(d.progress_EN_t);
            progressCount[num]++;
          });
          var count = _.reduce(progressCount, function(count, n, k){
                        return count += (n * (parseInt(k)));
                      }, 0);
          var validDocs = _.filter(docs, function(doc){
            return !_.includes(["Unknown"], doc.progress_EN_t)
          });
          return Math.round(count/validDocs.length);

        }
        //=======================================================================
        //
        //=======================================================================
        function progressToNumber(progress) {
                      
          switch (progress.trim()) {
            case "On track to exceed target":
              return 5;
            case "On track to achieve target":
              return 4;
            case "Progress towards target but at an  insufficient rate":
              return 3;
            case "No significant change":
              return 2;
            case "Moving away from target":
              return 1;
            case "Unknown":
                return 0;
          }
        } //progressToNumber(progress)

        //=======================================================================
        //
        //=======================================================================
        $scope.legendHide = function(legendItem) {
          var area2 ={};
          var area3 ={};

          _.each($scope.map.dataProvider.areas, function(area) {

                  if(area.id.toUpperCase()==='DK'){
                           area2 = getMapObject('gl');
                           //area2.originalColor = area.originalColor;
                           area2.colorReal = area.colorReal;
                           area2.mouseEnabled = area.mouseEnabled;
                           area3 = getMapObject('fo');
                           //area2.originalColor = area.originalColor;
                           area3.colorReal = area.colorReal;
                           area3.mouseEnabled = area.mouseEnabled;
                  }
                  if (area.id.toUpperCase() === 'NO') {
                    area2 = getMapObject('sj');
                    //area2.originalColor = area.originalColor;
                    area2.colorReal = area.colorReal;
                    area2.mouseEnabled = area.mouseEnabled;
                  }
                  if (area.id.toUpperCase() === 'MA') {
                    area2 = getMapObject('eh');
                    //area2.originalColor = area.originalColor;
                    area2.colorReal = area.colorReal;
                    area2.mouseEnabled = area.mouseEnabled;
                  }
                  if (area.id.toUpperCase() === 'CN') {
                    area2 = getMapObject('tw');
                    //area2.originalColor = area.originalColor;
                    area2.colorReal = area.colorReal;
                    area2.mouseEnabled = area.mouseEnabled;
                  }

                  if (legendItem.color === area.originalColor && area.mouseEnabled === true)  {
                    area.colorReal = '#FFFFFF';
                    area.mouseEnabled = false;

                  } else if (legendItem.color === area.originalColor && area.mouseEnabled === false ) {
                    area.colorReal = legendItem.color;
                    area.mouseEnabled = true;

                  }

          });
          if (legendItem.visible)
            legendItem.visible = false;
          else
            legendItem.visible = true;
          $scope.map.validateData();
        }; //$scope.legendHide

        //=======================================================================
        //
        //=======================================================================
        function toggleLegend(legend, color) { //jshint ignore:line

          var index = _.findIndex(legend, function(legendItem) {
            return legendItem.color == 'color';
          });
          legend[index].visible = false;
        } //toggleLeggend

        //=======================================================================
        //
        //=======================================================================
        function writeMap(mapData) {

          if (!mapData) mapData = getMapData();
          $scope.map = AmCharts.makeChart("mapdiv", mapData); //jshint ignore:line
          $scope.map.write("mapdiv");
        } // writeMap

        //=======================================================================
        //
        //=======================================================================
        function progressColorMap(mapTypeFunction) {

          hideAreas();
          $scope.legendTitle = ""; // rest legend title
          _.each($scope.items, function(country) {
            _.each(country.docs, function(schema) {
              if (mapTypeFunction) mapTypeFunction(country, schema, $scope.schema);
            });
          });
          $scope.map.validateData(); // updates map with color changes
        } //progressColorMap

        //=======================================================================
        //
        //=======================================================================
        function aichiMap(country, schema, schemaName) {
         
          averageAssessmentProgress(schema);
          changeAreaColor(country.identifier, progressToColor(averageAssessmentProgress(schema)));
          buildProgressBaloon(country, averageAssessmentProgress(schema));
          legendTitle(country, schema, schemaName);
          restLegend($scope.leggends.aichiTarget);
        } // aichiMap

        //=======================================================================
        //
        //=======================================================================
        function defaultMap(country, schema, schemaName) {

          changeAreaColor(country.identifier, '#428bca');
          buildBaloon(country);
          legendTitle(country, schema, schemaName);
          restLegend($scope.leggends.default);
        }

        //=======================================================================
        //
        //=======================================================================
        function legendTitle(country, schema, schemaName) {

          if (schemaName.indexOf('AICHI-TARGET-') > -1) {
            $scope.legendTitle = aichiTargetReadable(schemaName) + " Assessments";
          } else if (schemaName == 'nr5' || schemaName == 'nr4' || schemaName == 'nr3' || schemaName == 'nr2' || schemaName == 'nr1') {
            $scope.legendTitle = schema[0].reportType_EN_t;

          } else if (schemaName == 'nr6') {
            $scope.legendTitle = schema[0].schema_EN_t + ' (2014-2018)';

          } else if (schemaName == 'nbsaps') {
            $scope.legendTitle = 'National Biodiversity Strategies and Action Plans';

          } else if (schemaName == 'nationalIndicator') {
            $scope.legendTitle = 'National Indicators';

          } else if (schemaName == 'nationalTarget') {
            $scope.legendTitle = 'National Targets';

          } else if (schemaName == 'resourceMobilisation') {
            $scope.legendTitle = 'Financial Reporting Framework: Reporting on baseline and progress towards 2015';
          } else if (schemaName == 'resourceMobilisation2020') {
            $scope.legendTitle = 'Financial Reporting Framework: Reporting on progress towards 2020';
          }
           else if (schemaName == 'all') {
            $scope.legendTitle = 'All Reporting';
          }
        } //legendTitle

        // //=======================================================================
        // //
        // //=======================================================================
        function changeAreaColor(id, color,area) {
          if(!area)
            area = getMapObject(id);
            area.colorReal = area.originalColor = color;
          if(id.toUpperCase()==='DK'){
              var area2 = getMapObject('GL');
              area2.colorReal = area.colorReal;
              area2.originalColor = area.originalColor;
              var area3 = getMapObject('FO');
              area3.colorReal = area.colorReal;
              area3.originalColor = area.originalColor;
          }
          if (area.id.toUpperCase() === 'NO') {
            var area4 = getMapObject('SJ');
            area4.colorReal = area.colorReal;
            area4.originalColor = area.originalColor;
          }
          if (area.id.toUpperCase() === 'MA') {
            var area5 = getMapObject('EH');
            area5.colorReal = area.colorReal;
            area5.originalColor= area.originalColor;
          }
          if(area.id.toUpperCase()==='CN'){
            var area6 = getMapObject('TW');
            area6.colorReal = area.colorReal;
            area6.originalColor = area.originalColor;
          }
        } //getMapObject

        // //=======================================================================
        // //
        // //=======================================================================
        function aichiTargetReadable(target) {

          return target.replace("-", " ").replace("-", " ").toLowerCase().replace(/\b./g, function(m) {
            return m.toUpperCase();
          });
        } //aichiTargetReadable

        // //=======================================================================
        // // c
        // //=======================================================================
        function buildProgressBaloon(country, progress) {

          var area = getMapObject(country.identifier);
          var progressIcon = getProgressIcon(progress);
          area.balloonText = "<div class='panel panel-default' ><div class='panel-heading' style='font-weight:bold; font-size:medium; white-space: nowrap;'><i class='flag-icon flag-icon-" + country.identifier + " ng-if='country.isEUR'></i>&nbsp;";
          var euImg = "<img src='app/images/flags/Flag_of_Europe.svg' style='width:25px;hight:21px;' ng-if='country.isEUR'></img>&nbsp;";
          var progressImage = progressIcon ? ("<img style='float:right;width:60px;hight:60px;' src='" + progressIcon + "' />")  : ''
          var balloonText2 = area.title + "</div> <div class='panel-body' style='text-align:left;'>" + 
            progressImage + getProgressText(progress) + "</div> </div>"

          if (country.isEUR)
            area.balloonText += euImg;
          area.balloonText += balloonText2;
        } //buildProgressBaloon

        // //=======================================================================
        // // c
        // //=======================================================================
        function buildBaloon(country) {

          var area = getMapObject(country.identifier);
          area.balloonText = "<div class='panel panel-default' ><div class='panel-heading' style='font-weight:bold; font-size:large;''>";
          var euImg = "<img src='app/images/flags/Flag_of_Europe.svg' style='width:25px;hight:21px;' ng-if='country.isEUR'></img>";
          if (country.isEUR)
            area.balloonText += euImg + area.title + "</div>";
          else
            area.balloonText += "<i class='flag-icon flag-icon-" + country.identifier + " ng-if='country.isEUR'></i>&nbsp;" + area.title + "</div>";
          var balloonBody = '';

          if (country.docs.nationalReport && !country.docs.nationalReport.length)
            delete country.docs.nationalReport;

          // console.log('Object.keys(country.docs).length',Object.keys(country.docs).length);
          if (Object.keys(country.docs).length == 1) {

            _.each(country.docs, function(schema, schemaName) {

              switch (schemaName) {
                case 'nationalReport6':
                  if ($scope.schema !== 'all')
                    balloonBody = " <div class='panel-body' style='text-align:left;'>" + country.docs.nationalReport6[0].schema_EN_t + " (2014-2018)</div>";
                  break;                
                case 'nationalReport':
                  if ($scope.schema !== 'all')
                    balloonBody = " <div class='panel-body' style='text-align:left;'>" + country.docs.nationalReport[0].reportType_EN_t + "</div>";
                  break;
                case 'nbsaps':
                  if ($scope.schema !== 'all')
                    balloonBody = " <div class='panel-body' style='text-align:left;'>" + country.docs.nbsaps[0].title_t + "</div>";
                  break;
                case 'nationalIndicator':
                  if ($scope.schema !== 'all')
                    balloonBody = " <div class='panel-body' style='text-align:left;'>" + country.docs.nationalIndicator[0].title_t + "</div>";
                  break;
                case 'nationalTarget':
                  if ($scope.schema !== 'all')
                    balloonBody = " <div class='panel-body' style='text-align:left;'>" + country.docs.nationalTarget[0].title_t + "</div>";
                  break;
                case 'resourceMobilisation':
                  if ($scope.schema !== 'all')
                    balloonBody = " <div class='panel-body' style='text-align:left;'>" + country.docs.resourceMobilisation[0].title_t + "</div>";
                  break;
                case 'resourceMobilisation2020':
                  if ($scope.schema !== 'all')
                    balloonBody = " <div class='panel-body' style='text-align:left;'>" + country.docs.resourceMobilisation2020[0].title_t + "</div>";
                  break;                  
              }
            }); //_.each
          }
          area.balloonText += balloonBody;
        } //getMapObject

        // //=======================================================================
        // // c
        // //=======================================================================
        function getProgressIcon(progress) {

          switch (progress) {
            case 1:
              return 'app/img/ratings/36A174B8-085A-4363-AE11-E34163A9209C.png';
            case 2:
              return 'app/img/ratings/2D241E0A-1D17-4A0A-9D52-B570D34B23BF.png';
            case 3:
              return 'app/img/ratings/486C27A7-6BDF-460D-92F8-312D337EC6E2.png';
            case 4:
              return 'app/img/ratings/E49EF94E-0590-486C-903B-68C5E54EC089.png';
            case 5:
              return 'app/img/ratings/884D8D8C-F2AE-4AAC-82E3-5B73CE627D45.png';
          }
        } //getProgressIcon(progress)

        // //=======================================================================
        // //
        // //=======================================================================
        function getProgressText(progress, target) {

          switch (progress) {
            case progress < 0 :
                return "Not reported";
            case 0:
                return "Unknown";
            case 1:
              return 'Moving away from target' + ' (things are getting worse rather than better).';
            case 2:
              return 'No significant overall progress towards target' + ' (overall, we are neither moving towards the target nor moving away from it).';
            case 3:
              return 'Progress towards target' + ' but at an insufficient rate (unless we increase our efforts the target will not be met by its deadline).';
            case 4:
              return 'On track to achieve target' + ' (if we continue on our current trajectory we expect to achieve the target by 2020).';
            case 5:
              return 'On track to exceed target (we expect to achieve the target before its deadline).';
          }
        } //getProgressText(progress, target)

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
            return area.id === id.toUpperCase();
          });
          return $scope.map.dataProvider.areas[index];
        } //getMapObject

        //=======================================================================
        //
        //=======================================================================
        function progressToColor(progress) {

          switch (progress) {
            case 5:
              return '#1074bc';
            case 4:
              return '#109e49';
            case 3:
              return '#fec210';
            case 2:
              return '#ee1d23';
            case 1:
              return '#6c1c67';
            case 0:
              return '#908d8d'
            case -1:
              return '#dddddd'
          }
        } //readQueryString

        //=======================================================================
        //
        //=======================================================================
        function getMapData() {

          return $scope.mapData;
        }

        //=======================================================================
        //
        //=======================================================================
        function setMapData(name, value) {
          if (name && !value) $scope.mapData = name;
          else
            $scope.mapData[name] = value;
        }

        function homeButton() {
          $scope.map.fire("homeButtonClicked", {
            type: "homeButtonClicked",
            chart: $scope.map
          });
        }

        this.homeButton = homeButton;
        this.getMapObject = getMapObject;
        this.getMapObject = getMapObject;
        this.writeMap = writeMap;
        this.getMapData = getMapData;
        this.setMapData = setMapData;
        this.generateMap = generateMap;
        this.progressColorMap = progressColorMap;
      }],
    }; // return
  }]); //app.directive('searchFilterCountries

