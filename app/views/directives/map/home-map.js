define(['text!./home-map.html',
  'app',
  'lodash',
  './party-status.js', '/app/services/search-service.js',
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
            $scope.loading = true;
            $timeout(function(){
                require(['scbd-map/ammap3',
                        'scbd-map/ammap3-service',
                        '/app/views/countries/search-map.js'], function(map){
                    $scope.loading = false;
                    $scope.$apply(function(){
                        var mapElement = $element.find('#homeMap')
                        $compile(mapElement.contents())($scope);
                        
                    });
                });
            }, 2000);
        }] //controlerr
    }; //return
  }]); //directive
}); //define
