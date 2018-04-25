define(['app', 'underscore',
    'js/common',
    'components/scbd-angularjs-services/filters/scbd-filters',
    'services/search-service',
    'views/directives/block-region-directive',
    'components/scbd-angularjs-services/services/locale',
    'components/scbd-angularjs-controls/form-control-directives/km-select'
], function (app, _) {

    app.controller("CountryListController", ["$http", "$scope", "$element", "$location", "commonjs", "$q", 'searchService','$filter', '$routeParams', '$compile', '$timeout', 'locale',
        function ($http, $scope, $element, $location, commonjs, $q, searchService, $filter, $routeParams, $compile, $timeout, locale) {
            var regionRelations = {};
            $scope.sortTerm = "name.en";
            $scope.regionFilter= [];

            var headerCount = {
                absCheckpoint: 0,
                absCheckpointCommunique: 0,
                absPermit: 0,
                authority: 0,
                database: 0,
                focalPoint: 0,
                measure: 0,
                absNationalReport: 0
            };
            $scope.options = {
                regions : commonjs.getRegions
            }
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
                            headerCount.absNationalReport += facets.schemas.absNationalReport || 0;
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

           //*************************************************************************************************************************************
            $scope.filterRegion = function (termID) {
                
                $scope.loading = true;
                
                if(!termID){
                    $scope.countries = $scope.allcountries;
                    $scope.loading = false;
                    return;
                }

                url = '/api/v2013/thesaurus/terms/' + termID + '?relations'
                var relationsQuery;
                if(regionRelations[termID]){
                    var deferred = $q.defer();
                    deferred.resolve({data:regionRelations[termID]});
                    relationsQuery = deferred.promise;
                }
                else
                    relationsQuery = $q.when($http.get(url));
                
                $q.when(relationsQuery)
                .then(function(o) {
                    regionRelations[termID] = o.data;
                });
            
                $scope.loading = false;
            };
            
            
            $scope.$watch('regions', function(newVal, oldVal){
                if(newVal){
                    console.log(newVal, oldVal)
                    var diff = _.difference(_.pluck(newVal, "identifier"), _.pluck(oldVal, "identifier"));
                    _.each(diff, $scope.filterRegion)
                }
            })   
           
            $scope.hasRegions = function(country){
                if(country && $scope.regions){
                    if(_.some($scope.regions, function(region){
                        if(regionRelations[region.identifier]){
                            var regionRels =  regionRelations[region.identifier].expandedRelatedTerms;
                            if(_.contains(regionRels, country.code.toLowerCase()))
                                return true;
                        }
                    })){
                        return true;;
                    }
                    return false;
                }

                return true;
            }
            $scope.getRegions = function(code){
                var countryReg = _.filter(regionRelations, function(region){
                    if(_.contains(_.map($scope.regions, 'identifier'), region.identifier)){                   
                        var regionRels =  regionRelations[region.identifier].expandedRelatedTerms;
                        return _.contains(regionRels, code.toLowerCase())
                    }
                });
                if(countryReg)
                    return _.map(countryReg, 'name').join(' / ');
                
                return '';
            }
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
                                    absNationalReport: 0
                                };

                    angular.forEach($scope.list, function(country){
                        $scope.total.absCheckpoint += country.schemas.absCheckpoint || 0;
                        $scope.total.absCheckpointCommunique += country.schemas.absCheckpointCommunique || 0;
                        $scope.total.absPermit += country.schemas.absPermit || 0;
                        $scope.total.authority += country.schemas.authority || 0;
                        $scope.total.database += country.schemas.database || 0;
                        $scope.total.focalPoint += country.schemas.focalPoint || 0;
                        $scope.total.measure += country.schemas.measure || 0;
                        $scope.total.absNationalReport += country.schemas.absNationalReport || 0;
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
                } else if ($scope.sortTerm == "NR") {
                    return data.schemas.absNationalReport ? data.schemas.absNationalReport : ($scope.orderList ? -9999999 : 999999);
                }
                
            };

            //==================================================================================
            $scope.gotoCountryProfile = function (code) {
                $location.path('/countries/' + code.toUpperCase());
            };
            
            if($scope.$root.deviceSize !== 'sm' && $scope.$root.deviceSize !== 'xs'){
                $scope.loadingMap = true;
                angular.element($element).ready(function () {
                    $timeout(function(){
                        require(['views/countries/country-map'], function(map){
                            $scope.$apply(function(){
                                var mapElement = $element.find('#Jumbotron')
                                mapElement.html('<span country-map></span>')
                                $compile(mapElement.contents())($scope);
                                $scope.loadingMap = false;
                            });
                        });
                    }, 500);
                });
            }

            $scope.export = function(){
                $scope.readyForExport = true;
                require(['tableexport'], function(){
                    $element.find('#forExport').tableExport({
                        formats: ["xlsx", "xls", "csv"],
                        filename: "ABSCH-Country-List",
                    });
                    $element.find('.xlsx').click();
                    $timeout(function(){                        
                        $scope.readyForExport = false;
                    }, 200)
                });  
            }
        }
    ]);

});
