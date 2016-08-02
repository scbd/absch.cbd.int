define(['app', 'underscore', '/app/services/search-service.js', '/app/services/app-config-service.js', '/app/services/help-service.js',
'/app/js/common.js', './block-region-directive.js'],
    function(app, _) {
        app.directive('homeCountryDashboard', function($http) {
            return {
                restrict: 'EAC',
                replace: true,
                templateUrl: '/app/views/directives/home-country-dashboard-directive.html',
                controller: ['$scope', '$filter', 'realm', '$q', 'searchService', 'appConfigService', 'commonjs','$element', 'helpService',"$timeout", "$location",
                    function($scope, $filter, realm, $q, searchService, appConfigService, commonjs, $element, helpService, $timeout, $location) {

                       $scope.help = {};


                        $scope.hexToInteger = function(identifier){
                            return commonjs.hexToInteger(identifier);
                        }

                        $scope.goto = function(url) {
                            $location.url(url);
                        }


                        //=========================================================================================
                        function getInfo() {
                            $scope.help = {
                                 nationalRecords : helpService.getInfo('nationalRecords'),

                                 scbdRecords : helpService.getInfo('scbdRecords'),
                                 nfp : helpService.getInfo('nfp'),
                                 cna : helpService.getInfo('cna'),
                                 msr : helpService.getInfo('msr'),
                                 ndb : helpService.getInfo('ndb'),
                                 ircc : helpService.getInfo('ircc'),
                                 cp : helpService.getInfo('cp'),
                                 cpc : helpService.getInfo('cpc'),
                                 nr : helpService.getInfo('nr'),
                                 referenceRecords : helpService.getInfo('referenceRecords'),
                                 a19a20 : helpService.getInfo('a19a20'),
                                 cpp : helpService.getInfo('cpp'),
                                 cbr : helpService.getInfo('cbr'),
                                 cbi : helpService.getInfo('cbi'),
                                 vlr : helpService.getInfo('vlr'),
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
                        
                        // on home page measure count
                        // check trello card https://trello.com/c/tJbtvjl8
                        //
                        var virtualQuery = {
                            query : 'virtual_b:*', fields: ['schema_s']
                        }
                        var virtualRegionalMeasureCount = searchService.facets(virtualQuery, 'virtualRegionalMeasureCount');
                        
                        $q.all([searchService.governmentSchemaFacets(), virtualRegionalMeasureCount])
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
                                if(results[1] && results[1].schema_s && results[1].schema_s.length > 0){
                                    var virtualRegionalCont = _.first(results[1].schema_s)
                                    if(virtualRegionalCont.symbol == 'measure'){
                                        if(nationalRecords.measure.recordCount > 0)
                                            nationalRecords.measure.recordCount = nationalRecords.measure.recordCount - virtualRegionalCont.count
                                    }                                                                
                                }
								$scope.nationalRecords = nationalRecords;
                                
                            })
                            .catch(function(error) {
                                console.log(error);
                            })
                            .finally(function() {
                                $scope.loadingNationalFacets = false;
                            });


                        var referenceRecordsQuery = {
                            fields: 'title_t, updatedDate_dt,schema_s,identifier_s,startDate_dt,endDate_dt,url_ss, uniqueIdentifier_s, eventCity_s, eventCountry_EN_t',
                            query: 'schema_s:(' + appConfigService.referenceSchemas.join(' ') + ' ' +
                                   appConfigService.scbdSchemas.join(' ')  + ')',
                            sort       : 'sort1_dt desc, updatedDate_dt desc',
                            rows       : 100,
                            groupField : 'schema_s',
                            groupLimit : 5,
                            groupSort  : 'sort1_dt desc, updatedDate_dt desc'
                        };


                        $scope.loadingRefFacets = true;



                        searchService.group(referenceRecordsQuery)
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
