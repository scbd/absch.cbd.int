define(['app','underscore',
  '/app/js/common.js', 'jqvmap', 'jqvmapworld',
  '/app/views/countries/countries-left-menu-directive.html.js',
  '/app/views/countries/country-map-list-directive.html.js', '/app/views/directives/help-directive.html.js',
], function(app, _) {

  app.controller("CountriesMapController", ["$scope", "$http", "$filter", "commonjs", "$q",
    function($scope, $http, $filter, commonjs, $q) {


        $scope.statusFilter = function(data){

            $scope.$broadcast('updateMap', {data:data});

        }

    }
  ]);

});
