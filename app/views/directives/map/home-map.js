define(['text!./home-map.html','app', 'lodash', 'views/directives/block-region-directive', 'services/main'
], function(template, app, _, popoverTemplate) {
  ;

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
      controller: ['$scope', '$http', 'realm', '$q', '$filter', 'commonjs','$timeout', 'searchService', '$compile', '$element', '$rootScope',
      function($scope, $http, realm, $q, $filter, commonjs,$timeout, searchService, $compile, $element, $rootScope) {

            $scope.isBCH          = realm.is('BCH');
            $scope.isABS          = realm.is('ABS');  
            
            $q.when(commonjs.getCountries(), function(countries) {

              if($scope.options.isBch){
                  $scope.numRatified  = _.filter(countries, {isInbetweenParty:  true}).length;
                  $scope.numParty     = _.filter(countries, {isParty:     true}).length;
              }
              else {                
                  $scope.numRatified  = _.filter(countries, {isInbetweenParty:  true}).length;
                  $scope.numParty     = _.filter(countries, {isParty:     true}).length;
              }
              $scope.numNonParty  = countries.length -  $scope.numParty;
                

            });

            if($rootScope.deviceSize !== 'sm' && $rootScope.deviceSize !== 'xs'){
              // Delay loading map by 2 sec
              $scope.loadingMap = true;
              angular.element(document).ready(function () {
                  require(['views/countries/country-map'], function(map){
                      $scope.$apply(function(){
                          var mapElement = $element.find('#homeMap')
                          $compile(mapElement.append('<country-map zoom-to="{{code}}" height="350px" ></country-map>'))($scope);
                          $scope.loadingMap = false;
                      });
                  });
              });
            }

            $scope.options = {
              isBch       : realm.is('BCH'),
              isAbs       : realm.is('ABS'),
              protocol    : realm.protocol,
              protocolShortName  :realm.protocolShortName,
              chShortName :realm.chShortName,
              chLongName  :realm.chLongName
            }

        }] //controlerr
    }; //return
  }]); //directive
}); //define
