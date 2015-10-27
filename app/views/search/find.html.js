define(['app', 'underscore',
    'scbd-angularjs-services', 'scbd-angularjs-filters', 'scbd-angularjs-controls',
    '/app/js/common.js', '/app/services/app-config-service.js', '/app/services/search-service.js',
], function(app, _) {

    app.controller('newSearchController', ['$scope', '$http', '$filter', 'commonjs', '$location', 'appConfigService', 'searchService',
        function($scope, $http, $filter, commonjs, $location, appConfigService, searchService) {

            $scope.schemafacets = {};

            //**********************************************************
            function loadCountries() {
                  commonjs.getCountries()
                    .then(function(countries){

                        $scope.countries = countries;
                        var facetQuery = {query:'realm_ss:' + appConfigService.currentRealm.toLowerCase() +
                                                ' AND NOT version_s:* AND schema_s:(' + appConfigService.nationalSchemas.join(' ') + ')',
                                         fields: ['government_s'] };
                        return searchService.facets(facetQuery)
                            .then(function(facets){
                                _.map($scope.countries, function(country){
                                        var countryCode = country.code.toLowerCase();
                                        if(countryCode == 'eu')
                                            countryCode = 'eur';
                                        var facet = _.find(facets.government_s, {symbol:countryCode});
                                        if(facet){
                                            country.facetCount = facet.count;
                                        }
                                });

                            });
                });
            }
            function loadSchemaFacets(){

                var schemas = _.union(appConfigService.nationalSchemas,appConfigService.referenceSchemas);
                var facetQuery = {query:'realm_ss:' + appConfigService.currentRealm.toLowerCase() +
                                        ' AND NOT version_s:* AND schema_s:(' + schemas.join(' ') + ')',
                                 fields: ['schema_s'] };
                console.log(angular.fromJson(schemas));
                 searchService.facets(facetQuery)
                     .then(function(facets){
                         _.map(schemas, function(schema){
                                 var facet = _.find(facets.schema_s, {symbol:schema});
                                 if(facet){
                                     $scope[schema]  = {facetCount : facet.count};
                                 }
                         });
                     });
            }

            loadCountries();
            loadSchemaFacets();

            //**********************************************************
            $scope.navigateTo = function(to, event) {
                $location.path(to);
            };


    }]);

});
