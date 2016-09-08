define(['app', 'underscore', '/app/js/common.js', 'moment', 'scbd-angularjs-controls',
    '/app/views/register/directives/register-top-menu.js',
    '/app/services/search-service.js','/app/services/app-config-service.js',
], function (app) {

        "use strict";
        app.controller("adminPendingTasksCotroller", ["$scope", "$timeout", "searchService", "realm", "commonjs", "$q", "appConfigService", "$http", "$filter",
            function ($scope, $timeout, searchService, realm, commonjs, $q, appConfigService, $http, $filter) {
                $scope.filters = {};
                
                $scope.options = {
                    filterTypes: function () {
                        var types = [];
                        types.push({ 'identifier': 'authority', 'name': 'Competent National Authority' });
                        types.push({ 'identifier': 'measure', 'name': 'Legislative, administrative or policy measures' });
                        types.push({ 'identifier': 'database', 'name': 'National Websites and Databases' });
                        types.push({ 'identifier': 'absPermit', 'name': 'Internationally Recognized Certificate of Compliance' });
                        types.push({ 'identifier': 'absCheckpoint', 'name': 'Checkpoints' });
                        types.push({ 'identifier': 'absCheckpointCommunique', 'name': 'Checkpoint Communiqués' });
                        types.push({ 'identifier': 'resource', 'name': 'Virtual Library Record' });
                        return types;
                    },
                    filterCountries: function () {
                       return $http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }).then(function(o){
                            var countries = $filter("orderBy")(o.data, "name");
                            return countries;
                        });
                    },
                    filterDateTypes: function () {
                        var DateType = [];
                        DateType.push({ 'identifier': 'createdDate_dt:', 'name': 'Created On' });
                        DateType.push({ 'identifier': 'updatedDate_dt:', 'name': 'Updated On' });

                        return DateType;
                    },
                    filterPartyStatus: function () {
                        var status = [];
                        status.push({ 'identifier': '1', 'name': 'All' });
                        status.push({ 'identifier': '2', 'name': 'party' });
                        status.push({ 'identifier': '3', 'name': 'non-party' });
                        status.push({ 'identifier': '4', 'name': 'Ratified not yet party' });

                        return status;
                    }
                };

                $scope.loadFacets = function(){

                     var nationalRecordsQuery = {
                        rows : 300,
                        fields: 'government_s,schema_s',
                        query: 'schema_s:(' + appConfigService.nationalSchemas.join(' ') + ')'
                    };
                    var dateType = 'createdDate_dt:'
                    if($scope.filters.dateType){
                        dateType = $scope.filters.dateType;
                    }

                    if($scope.filters.startDate || $scope.filters.endDate) {
                        var startDate = $scope.filters.startDate ? $scope.filters.startDate + 'T00:00:00.000Z' : '*';
                        var endDate = $scope.filters.endDate ? $scope.filters.endDate + 'T23:59:59.999Z' : '*';

                        nationalRecordsQuery.query += ' AND ' + dateType + ' [ ' + startDate + ' TO ' + endDate + ' ]';
                    }
                    
                    if(!$scope.filters.regionalMeasures)
                        nationalRecordsQuery.query += ' AND NOT virtual_b:*' 
                    
                     if($scope.filters.countries)
                        nationalRecordsQuery.query += ' AND government_s:(' + $scope.filters.countries.join(' ') + ')';

                    $q.when(partyStatusQuery(), function(data){
                        
                        if(data){
                            nationalRecordsQuery.query += data;
                        }

                        $q.all([searchService.facetsPivot(nationalRecordsQuery)])
                                .then(function(results) {

                                    var nationalRecords = {	absCheckpoint		   : { countryCount :0, recordCount : 0 },
                                                            absCheckpointCommunique: { countryCount :0, recordCount : 0 },
                                                            absPermit:               { countryCount :0, recordCount : 0 },
                                                            authority:               { countryCount :0, recordCount : 0 },
                                                            database:                { countryCount :0, recordCount : 0 },
                                                            focalPoint:              { countryCount :0, recordCount : 0 },
                                                            measure:                 { countryCount :0, recordCount : 0 },
                                                            absNationalReport:       { countryCount :0, recordCount : 0 }
                                                        };
                                    _.each(results[0], function(country){
                                        nationalRecords.absCheckpoint.recordCount           += country.schemas.absCheckpoint||0;
                                        nationalRecords.absCheckpointCommunique.recordCount += country.schemas.absCheckpointCommunique||0;
                                        nationalRecords.absPermit.recordCount               += country.schemas.absPermit||0;
                                        nationalRecords.authority.recordCount               += country.schemas.authority||0;
                                        nationalRecords.database.recordCount                += country.schemas.database||0;
                                        nationalRecords.focalPoint.recordCount              += country.schemas.focalPoint||0;
                                        nationalRecords.measure.recordCount                 += country.schemas.measure||0;
                                        nationalRecords.absNationalReport.recordCount       += country.schemas.absNationalReport||0;

                                        nationalRecords.absCheckpoint.countryCount           += (country.schemas.absCheckpoint ? 1 : 0);
                                        nationalRecords.absCheckpointCommunique.countryCount += (country.schemas.absCheckpointCommunique ? 1 : 0);
                                        nationalRecords.absPermit.countryCount               += (country.schemas.absPermit ? 1 : 0);
                                        nationalRecords.authority.countryCount               += (country.schemas.authority ? 1 : 0);
                                        nationalRecords.database.countryCount                += (country.schemas.database ? 1 : 0);
                                        nationalRecords.focalPoint.countryCount              += (country.schemas.focalPoint ? 1 : 0);
                                        nationalRecords.measure.countryCount                 += (country.schemas.measure ? 1 : 0);
                                        nationalRecords.absNationalReport.countryCount       += (country.schemas.absNationalReport ? 1 : 0);
                                    });
                                    $scope.nationalRecords = nationalRecords;
                                    
                                })
                                .catch(function(error) {
                                    console.log(error);
                                })
                                .finally(function() {
                                    $scope.loadingNationalFacets = false;
                                });                       
                    });                    

                }

                $scope.loadFacets();


                function partyStatusQuery(){

                    if(!$scope.filters.partyStatus || $scope.filters.partyStatus == 1){
                        var defer = $q.defer();
                        defer.resolve();
                        return defer.promise;
                    }
                    else{

                       return $q.when(commonjs.getCountries())
                          .then(function(data){
                            
                             var countries = _.filter(data, function(country){

                                 if($scope.filters.partyStatus==2)
                                    return country.isNPParty;
                                else if($scope.filters.partyStatus==3)
                                    return !country.isNPParty;
                                else if($scope.filters.partyStatus==4)
                                    return country.isNPInbetweenParty;

                             });
                            var countryCodes = _.pluck(countries, 'code');
                            if(countryCodes.length == 0)
                                countryCodes.push('n-a');

                            var resultCountries = countryCodes.join(' ').toLowerCase()
                            return ' AND government_s:(' + resultCountries + ')';
                            
                          });
                    }

                }

            }]);
    });
