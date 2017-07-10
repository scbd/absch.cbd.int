define(['app','underscore',
  'views/countries/country-profile-directive.html',
  'views/directives/block-region-directive',
  'js/common','scbd-angularjs-services/locale','ng-breadcrumbs',
  'css!libs/flag-icon-css/css/flag-icon.min',
  'css!./country-profile'
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
          require(['views/countries/country-map'], function(map){
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
