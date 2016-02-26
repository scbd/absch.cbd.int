define(['app','underscore',
  'scbd-map/zoom-map', '/app/js/common.js',
  'scbd-angularjs-services/locale',
  'css!/app/libs/flag-icon-css/css/flag-icon.min.css',
  'css!./country-profile','./country-profile-directive.html.js'
], function(app, _) {

  app.controller("countryProfileController",
  ["$scope","$route", "$http", "$timeout", "$location","locale", 'ammap3Service', 'commonjs',
    function($scope,$route, $http, $timeout, $location,locale, ammap3Service,commonjs) {
      $scope.code      = $route.current.params.code;



      $http.get('https://api.cbd.int/api/v2013/countries/'+$scope.code.toUpperCase(), {
        cache: true,
      }).then(function(res) {
          $scope.country = res.data;
          $scope.country.code = $scope.country.code.toLowerCase();
          $scope.country.name = $scope.country.name[locale];
          $scope.country.cssClass='flag-icon-'+$scope.country.code;


      });
      commonjs.getCountries().then(function(countries){
          ammap3Service.eachCountry('zoom-map-country', function(mapCountry){
            var countryDetails = _.findWhere(countries, {code : mapCountry.id});
            if(countryDetails){
                if(countryDetails.isNPInbetweenParty)
                    mapCountry.colorReal= "#5cb85c";
                else if(countryDetails.isNPParty)
                    mapCountry.colorReal= "#337ab7";
                else if(countryDetails.isCBDParty)
                    mapCountry.colorReal= "#999";
                else
                    mapCountry.colorReal= "#FFF";
            }
            else
                mapCountry.colorReal= "#FFF";
          });
      });

    }
  ]);

});
