define(['app','underscore',
  '/app/js/common.js',
  'scbd-angularjs-services/locale','ng-breadcrumbs',
  'css!/app/libs/flag-icon-css/css/flag-icon.min.css',
  'css!./country-profile','./country-profile-directive.html.js',
  '../directives/block-region-directive.js'
], function(app, _) {

  app.controller("countryProfileController",
  ["$scope","$route", "$http", "$timeout", "$location","locale", 'commonjs', '$q', 'breadcrumbs', '$element', '$compile',
    function($scope,$route, $http, $timeout, $location,locale, commonjs, $q, breadcrumbs, $element, $compile) {
      $scope.code      = $route.current.params.code;
      

      $q.when(commonjs.getCountry($scope.code.toUpperCase()))
      .then(function(country){
          $scope.country = country;
          $scope.country.code = $scope.country.code.toLowerCase();
          $scope.country.name = $scope.country.name[locale];
          $scope.country.cssClass='flag-icon-'+$scope.country.code;
          breadcrumbs.options = { 'Country Profile': $scope.country.name };
      });
      if($scope.code.toUpperCase == 'GB')
            $element.find('[data-toggle="tooltip"]').tooltip(); 
      
      $scope.loadingMap = true;
      angular.element(document).ready(function () {
          require(['/app/views/countries/country-map.js'], function(map){
              $scope.$apply(function(){
                  var mapElement = $element.find('#Jumbotron')
                  $compile(mapElement.contents())($scope);
                    $scope.loadingMap = false;
              });
          });
      });

    }
  ]);

});