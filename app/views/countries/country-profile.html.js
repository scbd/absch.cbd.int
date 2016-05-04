define(['app','underscore',
  'scbd-map/zoom-map', '/app/js/common.js',
  'scbd-angularjs-services/locale','ng-breadcrumbs',
  'css!/app/libs/flag-icon-css/css/flag-icon.min.css',
  'css!./country-profile','./country-profile-directive.html.js'
], function(app, _) {

  app.controller("countryProfileController",
  ["$scope","$route", "$http", "$timeout", "$location","locale", 'ammap3Service', 'commonjs', '$q', 'breadcrumbs',
    function($scope,$route, $http, $timeout, $location,locale, ammap3Service,commonjs, $q, breadcrumbs) {
      $scope.code      = $route.current.params.code;
      $scope.$on('$destroy', function(){
          ammap3Service.clear('zoom-map-country');
      });

      $q.when(commonjs.getCountry($scope.code.toUpperCase()))
      .then(function(country){
          $scope.country = country;
          $scope.country.code = $scope.country.code.toLowerCase();
          $scope.country.name = $scope.country.name[locale];
          $scope.country.cssClass='flag-icon-'+$scope.country.code;
          breadcrumbs.options = { 'Country Profile': $scope.country.name };
      });
      $q.when(commonjs.getCountries()).then(function(countries){

        //   $timeout(function(){
              ammap3Service.eachCountry('zoom-map-country', function(mapCountry){
                var countryDetails = _.findWhere(countries, {code : mapCountry.id});
                if(countryDetails){
                    if(countryDetails.isNPInbetweenParty)
                        mapCountry.colorReal=mapCountry.baseSettings.color= "#EC971F";
                    else if(countryDetails.isNPParty)
                        mapCountry.colorReal=mapCountry.baseSettings.color= "#5F4586";
                  //   else if(countryDetails.isCBDParty)
                  //       mapCountry.colorReal= "#999";
                    else
                        mapCountry.colorReal=mapCountry.baseSettings.color= "#333";
                }
                else
                    mapCountry.colorReal=mapCountry.baseSettings.color= "#333";
              });
              ammap3Service.validateData('zoom-map-country');
        //   },1000);
      });

    }
  ]);

});
