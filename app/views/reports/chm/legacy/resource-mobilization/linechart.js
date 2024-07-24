
import app from '~/app';
import _ from 'lodash';
//'amchart3', 'amchart3-serial', 'amchart3-theme-light'
import template from "text!./linechart.html";


  app.directive('linechart', ['$timeout', 'translationService',function(translationService) {
    return {
      restrict  : 'E',
      template  : template,
      transclude: true,
      scope     : {
        chartData    : ' =chartData',
        chartOptions : ' =chartOptions',
        chartYears   : '='
      },
      link: function($scope, $element, $attr) { //jshint ignore:line
     

        $scope.$watch('chartData', function() {
           initChart();
        });

        // =======================================================================
        //
        // =======================================================================
        function initChart() {

          if (_.isEmpty($scope.chartData)) return;

          $scope.chart = AmCharts.makeChart('chartdiv', { //jshint ignore:line
              "type": "serial",
              "theme": "light",
              "marginTop":0,
              "marginBottom": 0,
              "marginRight": 30,
              "dataProvider": $scope.chartData,
              "titles": [{
              			"text": $scope.chartOptions.title || 'Trend',
              			"size": 16
      		  }],
              "valueAxes": [{"title": $scope.chartOptions.yTitle}],
              "graphs": [{
                  "id":"g1",
                  "balloonText": "<b><span style='font-size:14px;'>[[value]]</span></b>",
                  "bullet": "none",
                  "bulletSize": 8,
                  "lineColor": "#d1655d",
                  "lineThickness": 2,
                  "negativeLineColor": "#637bb6",
                  "type": "step",
                  "noStepRisers":true,
                  "valueField": "value"
              }],

              "dataDateFormat": "YYYY",
              "categoryField": "year",
              "categoryAxis": {
                  "title":"Years",
                  "minPeriod": "YYYY",
                  "autoGridCount": false,
                  "parseDates": true,
                  "minorGridAlpha": 0.1,
                  "minorGridEnabled": true
              }
          });
        }
      },
      controller: ["$scope", function() {}],
    };
  }]);

