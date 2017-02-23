define(['text!./home-map.html',
  'app',
  'lodash',
  './party-status.js', '/app/services/search-service.js',
  '../block-region-directive.js'
], function(template, app, _, popoverTemplate) {
  'use strict';

  app.directive('homeMap', [function() {
    return {
      restrict: 'E',
      template: template,
      replace: true,
      scope: {},
      require: 'homeMap',
      link: function($scope, $element, $attr, homeMapCrl) { // jshint ignore:line

        $scope.showTagLine = 1;
        $scope.showPartyTagLine = 1;
        $element.find('[data-toggle="tooltip"]').tooltip();
        
        //=======================================================================
        $scope.toggleTooltip = function(){
             $element.find('[data-toggle="tooltip"]').tooltip('hide');
        }

      }, //link
      
      //=======================================================================
      //
      //=======================================================================
      controller: ['$scope', '$http', 'realm', '$q', '$filter', 'commonjs','$timeout', 'searchService', '$compile', '$element',
      function($scope, $http, realm, $q, $filter, commonjs,$timeout, searchService, $compile, $element) {

            $q.when(commonjs.getCountries(), function(countries) {

                $scope.numParty     = _.where(countries, {isNPParty:     true}).length;
                $scope.numNonParty  = countries.length -  $scope.numParty;
                $scope.numRatified  = _.where(countries, {isNPInbetweenParty:  true}).length;
                

            });

             // Delay loading map by 2 sec
            $scope.loadingMap = true;
            angular.element(document).ready(function () {
                require(['/app/views/countries/country-map.js'], function(map){
                    $scope.$apply(function(){
                        var mapElement = $element.find('#homeMap')
                        $compile(mapElement.contents())($scope);
                         $scope.loadingMap = false;
                    });
                });
            });
        }] //controlerr
    }; //return
  }]); //directive
}); //define
