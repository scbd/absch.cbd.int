define(['app', 'underscore',
    '/app/js/common.js',
    'scbd-angularjs-filters',
    '/app/services/search-service.js',
    '../directives/block-region-directive.js',
    'scbd-map/ammap3',
    'scbd-map/ammap3-service',
    '/app/views/countries/search-map.js'
], function (app, _) {

    app.controller("CountryListController", ["$http", "$scope", "$element", "$location", "commonjs", "$q", 'searchService','$filter', '$routeParams', '$compile', '$timeout',
        function ($http, $scope, $element, $location, commonjs, $q, searchService, $filter, $routeParams, $compile, $timeout) {
            $scope.sortTerm = "name.en";

            $scope.regionFilter= [];
            $scope.rfilter="Regional groups";

            var headerCount = {
                absCheckpoint: 0,
                absCheckpointCommunique: 0,
                absPermit: 0,
                authority: 0,
                database: 0,
                focalPoint: 0,
                measure: 0,
                nationalReport: 0
            };

            $scope.loading = true;

            $q.all([commonjs.getCountries(), searchService.governmentSchemaFacets()])
                .then(function (results) {
                    var countries = results[0];
                    var countryFacets = results[1];
                    $scope.countries = _.map(countries, function (country) {
                        var facets = _.findWhere(countryFacets, { government: country.code.toLowerCase() });
                        if (!facets)
                            facets = {};
                        if (facets.schemas) {
                            headerCount.absCheckpoint += facets.schemas.absCheckpoint || 0;
                            headerCount.absCheckpointCommunique += facets.schemas.absCheckpointCommunique || 0;
                            headerCount.absPermit += facets.schemas.absPermit || 0;
                            headerCount.authority += facets.schemas.authority || 0;
                            headerCount.database += facets.schemas.database || 0;
                            headerCount.focalPoint += facets.schemas.focalPoint || 0;
                            headerCount.measure += facets.schemas.measure || 0;
                            headerCount.nationalReport += facets.schemas.nationalReport || 0;
                        }
                        return {
                       
                            code: country.code,
                            name: country.name,
                            isNPParty: country.isNPParty,
                            isNPInbetweenParty: country.isNPInbetweenParty,
                            isNPSignatory: country.isNPSignatory,
                            entryIntoForce: country.entryIntoForce,
                            schemas: facets.schemas || {},
                            totalCount: facets.recordCount
                        };
                    });
                    $scope.headerCount = headerCount;
                    $element.find('[data-toggle="tooltip"]').tooltip();
                    $scope.loading = false;
                    $scope.countries
                    $scope.allcountries = _.clone($scope.countries);
                });

               

                $q.when(commonjs.getRegions(), function(regions) {
                        _.each(regions, function(region, index){
                            addRegionFilter(region);
                        });
                });


             //===============================================================================================================================
            function addRegionFilter(region, parent){
                
                var level = region.narrowerTerms && region.identifier != '5E5B7AA4-2420-4147-825B-0820F7EC5A4B' && region.identifier != '3D0CCC9A-A0A1-4399-8FA2-41D4D649DB0E' ? region.narrowerTerms.length : 0;
                
                var item =  {
                    name: region.title.en,
                    id:region.identifier,
                    level: level,
                };
                $scope.regionFilter.push(item);

                _.each(region.narrowerTerms,function(narrower){
                    addRegionFilter(narrower, region.identifier);
                });
            }
           //*************************************************************************************************************************************
            $scope.filterRegion = function (termID) {
                
                $scope.loading = true;
                
                if(!termID){
                    $scope.rfilter = "Regional groups";
                    $scope.countries = $scope.allcountries;
                    $scope.loading = false;
                    return;
                }

                url = '/api/v2013/thesaurus/terms/' + termID + '?relations'
                var test = $q.when($http.get(url)).then(function(o) {
                    
                     $scope.rfilter = o.data.name;
                     var rels = o.data.expandedRelatedTerms;
                     var filteredcountries= [];

                     _.each(rels,function(r){
                           _.each($scope.allcountries, function(x){
                               if(x.code.toLowerCase() == r.toLowerCase())
                                 filteredcountries.push(x); 
                             });
                    });
                    $scope.countries = filteredcountries;
                });
            
                $scope.loading = false;
            };
            
            
                
           

            //*************************************************************************************************************************************
            $scope.setPartyFilter = function (pfilter) {
                $scope.partyFilter = pfilter;
                 $scope.filterCountries;
            };

            if ($routeParams.status) {
                var status = $routeParams.status;
                if (status === 'party' || status === 'inbetween' || status === 'nonparty')
                    $scope.setPartyFilter(status);
            }
            else
                $scope.setPartyFilter('All');

            //*************************************************************************************************************************************
            $scope.$watch('list', function () {
                    $scope.total = {
                                    absCheckpoint: 0,
                                    absCheckpointCommunique: 0,
                                    absPermit: 0,
                                    authority: 0,
                                    database: 0,
                                    focalPoint: 0,
                                    measure: 0,
                                    nationalReport: 0
                                };

                    angular.forEach($scope.list, function(country){
                        $scope.total.absCheckpoint += country.schemas.absCheckpoint || 0;
                        $scope.total.absCheckpointCommunique += country.schemas.absCheckpointCommunique || 0;
                        $scope.total.absPermit += country.schemas.absPermit || 0;
                        $scope.total.authority += country.schemas.authority || 0;
                        $scope.total.database += country.schemas.database || 0;
                        $scope.total.focalPoint += country.schemas.focalPoint || 0;
                        $scope.total.measure += country.schemas.measure || 0;
                        $scope.total.nationalReport += country.schemas.nationalReport || 0;
                    })
             }, true)

            //*************************************************************************************************************************************
            $scope.hasStatus = function (item) {

                if (!$scope.partyFilter || $scope.partyFilter === 'All') {
                    return true;
                }
                if ($scope.partyFilter === 'party') {
                    return item.isNPParty;
                }
                if ($scope.partyFilter === 'nonparty') {
                    return !item.isNPParty;
                }
                if ($scope.partyFilter === 'inbetween') {
                    return item.isNPInbetweenParty;
                }
            };


            //==================================================================================
            $scope.sortTable = function (term, order) {

                if ($scope.sortTerm == term) {
                    $scope.orderList = !$scope.orderList;
                } else {
                    $scope.sortTerm = term;
                    $scope.orderList = true;
                }

                if (order == "ASC")
                    $scope.orderList = false;

                if (order == "DESC")
                    $scope.orderList = true;

            };

            //==================================================================================
            $scope.sortTermFilter = function (data) {

                if ($scope.sortTerm == "isNPParty")
                    return data.isNPParty + ' ' + data.entryIntoForce;
                else if ($scope.sortTerm == "!isNPParty")
                    return !!data.isNPParty + ' ' + data.name.en;
                else if ($scope.sortTerm == "name.en")
                    return data.name.en;
                else if (!data.schemas)
                    return ($scope.orderList ? -9999999 : 999999);
                else if ($scope.sortTerm == "CNA") {
                    return data.schemas.authority ? data.schemas.authority : ($scope.orderList ? -9999999 : 999999);
                } else if ($scope.sortTerm == "CP") {
                    return data.schemas.absCheckpoint ? data.schemas.absCheckpoint : ($scope.orderList ? -9999999 : 999999);
                } else if ($scope.sortTerm == "CPC") {
                    return data.schemas.absCheckpointCommunique ? data.schemas.absCheckpointCommunique : ($scope.orderList ? -9999999 : 999999);
                } else if ($scope.sortTerm == "IRCC") {
                    return data.schemas.absPermit ? data.schemas.absPermit : ($scope.orderList ? -9999999 : 999999);
                } else if ($scope.sortTerm == "MSR") {
                    return data.schemas.measure ? data.schemas.measure : ($scope.orderList ? -9999999 : 999999);
                } else if ($scope.sortTerm == "NDB") {
                    return data.schemas.database ? data.schemas.database : ($scope.orderList ? -9999999 : 999999);
                } else if ($scope.sortTerm == "NFP") {
                    return data.schemas.focalPoint ? data.schemas.focalPoint : ($scope.orderList ? -9999999 : 999999);
                }
            };

            //==================================================================================
            $scope.gotoCountryProfile = function (code) {
                $location.path('/countries/' + code);
            };
            
            // $scope.loadingMap = true;
            // $timeout(function(){
            //     require(['scbd-map/ammap3',
            //              'scbd-map/ammap3-service',
            //              '/app/views/countries/search-map.js'], function(map){ 
            //         $scope.loadingMap = false;                  
            //         $scope.$apply(function(){
            //             var mapElement = $element.find('#Jumbotron')
            //             $compile(mapElement.contents())($scope);
                        
            //         });
            //     });
            // }, 2000);

        }
    ]);

});
