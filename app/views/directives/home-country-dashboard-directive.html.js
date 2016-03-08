define(['app', 'underscore', '/app/services/search-service.js', '/app/services/app-config-service.js', '/app/services/help-service.js',
'/app/js/common.js', './loading-directive.js'],
    function(app, _) {
        app.directive('homeCountryDashboard', function($http) {
            return {
                restrict: 'EAC',
                replace: true,
                templateUrl: '/app/views/directives/home-country-dashboard-directive.html',
                controller: ['$scope', '$filter', 'schemaTypes', 'realm', '$q', 'searchService', 'appConfigService', 'commonjs','$element', 'helpService',"$timeout",
                    function($scope, $filter, schemaTypes, realm, $q, searchService, appConfigService, commonjs, $element, helpService, $timeout) {

                     
                       
                       $scope.help = {};

                        //=========================================================================================
                        function getInfo() {
                            $scope.help = {
                                 nationalRecords : helpService.getInfo('nationalRecords')                                
                            };
                            $timeout(function(){
                                $element.find('[data-toggle="tooltip"]').tooltip();
                                
                            },50);    
                        }
                        
                        getInfo();
                        //=========================================================================================
                        $scope.wellChanged = function(facet) {
                            $scope.currentFacet = facet;
                        }

                        $scope.loadingNationalFacets = true;
                        
                        $q.when(searchService.governmentSchemaFacets())
                            .then(function(results) {

								var nationalRecords = {	absCheckpoint		   : { countryCount :0, recordCount : 0 },
														absCheckpointCommunique: { countryCount :0, recordCount : 0 },
														absPermit:               { countryCount :0, recordCount : 0 },
														authority:               { countryCount :0, recordCount : 0 },
														database:                { countryCount :0, recordCount : 0 },
														focalPoint:              { countryCount :0, recordCount : 0 },
														measure:                 { countryCount :0, recordCount : 0 }
													};
								_.each(results, function(country){
									nationalRecords.absCheckpoint.recordCount           += country.schemas.absCheckpoint||0;
									nationalRecords.absCheckpointCommunique.recordCount += country.schemas.absCheckpointCommunique||0;
									nationalRecords.absPermit.recordCount               += country.schemas.absPermit||0;
									nationalRecords.authority.recordCount               += country.schemas.authority||0;
									nationalRecords.database.recordCount                += country.schemas.database||0;
									nationalRecords.focalPoint.recordCount              += country.schemas.focalPoint||0;
									nationalRecords.measure.recordCount                 += country.schemas.measure||0;

									nationalRecords.absCheckpoint.countryCount           += (country.schemas.absCheckpoint ? 1 : 0);
									nationalRecords.absCheckpointCommunique.countryCount += (country.schemas.absCheckpointCommunique ? 1 : 0);
									nationalRecords.absPermit.countryCount               += (country.schemas.absPermit ? 1 : 0);
									nationalRecords.authority.countryCount               += (country.schemas.authority ? 1 : 0);
									nationalRecords.database.countryCount                += (country.schemas.database ? 1 : 0);
									nationalRecords.focalPoint.countryCount              += (country.schemas.focalPoint ? 1 : 0);
									nationalRecords.measure.countryCount                 += (country.schemas.measure ? 1 : 0);
								});
								$scope.nationalRecords = nationalRecords;
                            })
                            .catch(function(error) {
                                console.log(error);
                            })
                            .finally(function() {
                                $scope.loadingNationalFacets = false;
                            });


                        var referenceRecordsQuery = {
                            fields: 'title_t, createdDate_dt,schema_s,identifier_s,startDate_dt,endDate_s,url_ss',
                            query: 'schema_s:(' + appConfigService.referenceSchemas.join(' ') + ' ' +
                                   appConfigService.scbdSchemas.join(' ')  + ')',
                            sort       : 'startDate_dt asc, updatedDate_dt desc',
                            rows       : 100,
                            groupField : 'schema_s',
                            groupLimit : 5,
                            groupSort  : 'startDate_dt desc, updatedDate_dt desc'
                        };
                        
                        
                        $scope.loadingRefFacets = true;
                        
                        
                        
                        return searchService.group(referenceRecordsQuery)
                            .then(function(data) {
                                console.log(data);
                                var referenceRecords = {};
                                _.each(data.data.grouped.schema_s.groups, function(group){
                                    referenceRecords[group.groupValue] = {
                                        recordCount : group.doclist.numFound,
                                        docs        : group.doclist.docs
                                    };
                                });
                                $scope.referenceRecords = referenceRecords;
                            })
                            .catch(function(error) {
                                console.log(error);
                            })
                            .finally(function() {
                                $scope.loadingRefFacets = false;
                            });                        
                    
                    }
                ]
            };

        });
    });
