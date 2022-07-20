import template from 'text!./home-map.html';
import app from '~/app';
import _ from 'lodash';
import popoverTemplate from '~/views/directives/block-region-directive';
import '~/services/main';
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
        $element.find('[data-bs-toggle="tooltip"]').tooltip();
        
        //=======================================================================
        $scope.toggleTooltip = function(){
             $element.find('[data-bs-toggle="tooltip"]').tooltip('hide');
        }

      }, //link
      
      //=======================================================================
      //
      //=======================================================================
      controller: ['$scope', '$http', 'realm', '$q', '$filter', 'commonjs','$timeout', 'searchService', '$compile', '$element', '$rootScope',
      function($scope, $http, realm, $q, $filter, commonjs,$timeout, searchService, $compile, $element, $rootScope) {

            $scope.isBCH          = realm.is('BCH');
            $scope.isABS          = realm.is('ABS');  
            
            

            if($rootScope.deviceSize !== 'sm' && $rootScope.deviceSize !== 'xs'){
              // Delay loading map by 2 sec
              $scope.loadingMap = true;
              angular.element(document).ready(async function () {
                await import('~/views/countries/country-map')
                $scope.$apply(function(){
                    var mapElement = $element.find('#homeMap')
                    $compile(mapElement.append('<country-map zoom-to="{{code}}" style="min-height:650px" ></country-map>'))($scope);
                    $scope.loadingMap = false;
                });
              });
            }

           

        }] //controlerr
    }; //return
  }]); //directive

