define(['app', 'lodash',
    'js/common',
    'components/scbd-angularjs-services/main',
    'services/search-service',
    'views/directives/block-region-directive',
    'components/scbd-angularjs-controls/main'
], function (app, _) {

    app.controller("CountryListController", ["$http", "$scope", "$element", "$location", "commonjs", "$q", 'searchService','$sce', 
    '$routeParams', '$compile', '$timeout', 'locale', 'realm', 'ngMeta',
        function ($http, $scope, $element, $location, commonjs, $q, searchService, $sce, $routeParams, $compile, 
            $timeout, locale, realm, ngMeta) {
            var regionRelations = {};            
            $scope.isBCH        = realm.is('BCH');
            $scope.isABS        = realm.is('ABS');    
            $scope.sortTerm     = "name.en";
            $scope.loading      = true;


            $scope.options = {
                regions  : commonjs.getRegions,
                countries: function(){
                    return $q.when(commonjs.getCountries())
                    .then(function(countries){
                            return _.sortBy(_.map(countries, function(country){
                                return _.extend(country, {identifier:country.code});
                            }), function(country){return country.name[locale];})
                    });
                }
            }

            $q.all([commonjs.getCountries(), searchService.governmentSchemaFacets()])
                .then(function (results) {

                    var headerCount = [];
                    _(realm.schemas).map(function(schema, key){ 
                        if(schema.type=='national' && key!= 'contact'){
                            headerCount.push({schema:key, count:0, title : schema.title, shortCode : schema.shortCode });
                        }
                    }).value();

                    var countries = results[0];
                    var countryFacets = results[1];
                    $scope.countries = _.map(countries, function (country) {
                        var facets = _.find(countryFacets, { government: country.code.toLowerCase() });
                        if (!facets)
                            facets = {};

                        country.schemas = {};
                        _.forEach(headerCount, function(headerSchema){
                            var count = (facets.schemas||{})[headerSchema.schema]||0;
                            headerSchema.count += count;
                            country.schemas[headerSchema.schema] = {
                                count:count, title : headerSchema.title, shortCode : headerSchema.shortCode
                            }
                        });
                        country.totalCount = facets.recordCount||0;
                        return country;
                    });
                    $scope.headerCount = headerCount;
                    $scope.loading = false;
                    $scope.countries
                    $scope.allcountries = _.clone($scope.countries);
                    $timeout(function(){$element.find('[data-toggle="tooltip"]').tooltip()}, 300);


                    ngMeta.resetMeta();  
                    var url   = realm.originalObject.baseURL + '/' + locale  + '/countries'
                    // ngMeta.setTag('description', summary || window.scbdApp.title);
                    ngMeta.setTag('canonical', $sce.trustAsResourceUrl(url))
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
                    var diff = _.difference(_.map(newVal, "identifier"), _.map(oldVal, "identifier"));
                    _.forEach(diff, $scope.filterRegion)
                }
            })   
           
            $scope.hasRegions = function(country){
                if(country && $scope.regions){
                    if(_.some($scope.regions, function(region){
                        if(regionRelations[region.identifier]){
                            var regionRels =  regionRelations[region.identifier].expandedRelatedTerms;
                            if(_.includes(regionRels, country.code.toLowerCase()))
                                return true;
                        }
                    })){
                        return true;;
                    }
                    return false;
                }

                return true;
            }

            $scope.hasCountries = function(country){
                if(country && $scope.countryFilter){
                    return _.includes(_.map($scope.countryFilter, 'identifier'), country.code);
                }

                return true;
            }

            $scope.getRegions = function(code){
                var countryReg = _.filter(regionRelations, function(region){
                    if(_.includes(_.map($scope.regions, 'identifier'), region.identifier)){
                        var regionRels =  regionRelations[region.identifier].expandedRelatedTerms;
                        return _.includes(regionRels, code.toLowerCase())
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
                    
                    if(!$scope.list || !($scope.headerCount||{}).length)
                        return;

                    var total = {};
                    angular.forEach($scope.list, function(country){
                        if(country.schemas){
                            _.forEach($scope.headerCount,function(counter){
                                total[counter.schema] = (total[counter.schema]||0) + (country.schemas[counter.schema].count||0);
                            });
                        }

                    });
                    _.forEach($scope.headerCount,function(counter){
                        counter.count = total[counter.schema]||0;
                    });

             }, true)

            //*************************************************************************************************************************************
            $scope.hasStatus = function (item) {

                if (!$scope.partyFilter || $scope.partyFilter === 'All') {
                    return true;
                }
                if ($scope.partyFilter === 'party') {
                    return item.isParty;
                }
                if ($scope.partyFilter === 'nonparty') {
                    return !item.isParty;
                }
                if ($scope.partyFilter === 'inbetween') {
                    return item.isInbetweenParty;
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

                if ($scope.sortTerm == "isParty")
                    return data.isParty + ' ' + data.entryIntoForce;
                else if ($scope.sortTerm == "!isParty")
                    return !!data.isParty + ' ' + data.name.en;
                else if ($scope.sortTerm == "name.en")
                    return data.name.en;
                else if (!data.schemas)
                    return ($scope.orderList ? -9999999 : 999999);
                else if (data.schemas[$scope.sortTerm]) {
                    return data.schemas[$scope.sortTerm].count ? data.schemas[$scope.sortTerm].count : ($scope.orderList ? -9999999 : 999999);
                }
                
            };

            //==================================================================================
            $scope.gotoCountryProfile = function (code, schema, evt) {
                if(schema){
                    evt.stopPropagation();
                    return $location.path('/countries/' + code.toUpperCase() + '/'+schema.shortCode);
                }
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
