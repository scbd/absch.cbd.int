define(['app','underscore',
  'scbd-map/zoom-map',
  'scbd-angularjs-services/locale',
  'css!/app/libs/flag-icon-css/css/flag-icon.min.css',
  'css!./country-profile',
], function(app, _) {

  app.controller("countryProfileController", ["$scope","$route", "$http", "$timeout", "$location","locale",
    function($scope,$route, $http, $timeout, $location,locale) {
      $scope.code      = $route.current.params.code;



      $http.get('https://api.cbd.int/api/v2013/countries/'+$scope.code.toUpperCase(), {
        cache: true,
      }).then(function(res) {
          $scope.country = res.data;
          $scope.country.code = $scope.country.code.toLowerCase();
          $scope.country.name = $scope.country.name[locale];
          $scope.country.cssClass='flag-icon-'+$scope.country.code;


      });
      // ammap3Service.zoomToMapArea('zoom-map-country', $scope.code);
      // ammap3Service.setCountryClickListener('zoom-map-country',
      //   function(event) {
      //     if(event.mapObject.id != $scope.zoomTo)
      //     $timeout(function(){
      //         $location.url('/countries/'+event.mapObject.id.toLowerCase());
      //     });
      //   });
    }
  ]);

});
