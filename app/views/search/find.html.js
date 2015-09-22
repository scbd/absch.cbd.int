define(['app', 'underscore',
    'scbd-angularjs-services', 'scbd-angularjs-filters', 'scbd-angularjs-controls', '/app/js/common.js',
], function(app, _) {

    app.controller('newSearchController', ['$scope', '$http', '$filter', 'commonjs', '$location',
        function($scope, $http, $filter, commonjs, $location) {
     
            //**********************************************************
            function loadCountries() {
                  commonjs.getCountries()
                    .then(function(countries){
                      
                        $scope.countries = countries;


                    });
            }
            loadCountries();


            //**********************************************************
            $scope.navigateTo = function(to, event) {
                $location.path(to);
            };
          

    }]);

});
