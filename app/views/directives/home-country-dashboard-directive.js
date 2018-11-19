define(['app','text!views/directives/home-country-dashboard-directive.html', 'lodash', 'services/search-service', 'services/app-config-service', 'services/help-service',
'js/common', 'views/directives/block-region-directive'],
    function(app, template, _) {
        app.directive('homeCountryDashboard', function($http) {
            return {
                restrict: 'EAC',
                replace: true,
                template: template,
                controller: ['$scope', '$filter', 'realm', '$q', 'searchService', 'appConfigService', 'commonjs','$element', 'helpService',"$timeout", "$location",
                    function($scope, $filter, realm, $q, searchService, appConfigService, commonjs, $element, helpService, $timeout, $location) {

                       $scope.help = {};


                        $scope.hexToInteger = function(identifier){
                            return commonjs.hexToInteger(identifier);
                        }

                        $scope.goto = function(url, schema) {
                            $location.url(url+schema);
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
                        }

                        getInfo();

                        $scope.loadingNationalFacets = true;
                                                
                        $q.all([searchService.governmentSchemaFacets()])
                            .then(function(results) {
                                var nationalRecords = _(realm.schemas).map(function(schema, key){ 
                                    if(schema.type=='national' && key!= 'contact'){
                                        return {schema:key, countryCount :0, recordCount : 0, title : schema.title, shortCode : schema.shortCode };
                                    }
                                }).compact().value();
								_.each(results[0], function(country){

                                    _.each(nationalRecords, function(schema){
                                        schema.recordCount  += country.schemas[schema.schema]||0;
                                        schema.countryCount += (country.schemas[schema.schema] ? 1 : 0);
                                    })
								});
								$scope.nationalRecords = nationalRecords;
                                
                                $timeout(function(){
                                    $element.find('[data-toggle="tooltip"]').tooltip();
                                },100);
                            })
                            .finally(function() {
                                $scope.loadingNationalFacets = false;
                            });


                            var referenceSchemas = ['resource', 'capacityBuildingInitiative', 'modelContractualClause', 'communityProtocol']
                            var scbdSchemas      = ['new', 'notification', 'meeting', 'news']

                            if(realm.is('BCH'))
                                referenceSchemas = ['resource', 'modifiedOrganism', 'dnaSequence', 'organism']
                            var referenceRecords = _(_.union(referenceSchemas, scbdSchemas))
                                                    .map(function(schema){ 
                                                        // if(schema.type=='reference' || schema.type=='scbdSchemas'){
                                                            return {type:realm.schemas[schema].type, schema:schema, countryCount :0, recordCount : 0, title : realm.schemas[schema].title, shortCode : realm.schemas[schema].shortCode };
                                                        // }
                                                    }).compact().value();

                            var referenceRecordsQuery = {
                            fields: 'title_t, updatedDate_dt,createdDate_dt, schema_s,identifier_s,startDate_dt,endDate_dt,url_ss, uniqueIdentifier_s, eventCity_s, eventCountry_EN_t',
                            query: 'schema_s:(' + referenceSchemas.join(' ') + ' ' + scbdSchemas.join(' ')  + ')',
                            sort       : 'sort1_dt desc, updatedDate_dt desc',
                            rows       : 100,
                            groupField : 'schema_s',
                            groupLimit : 5,
                            groupSort  : 'sort1_dt desc, updatedDate_dt desc'
                        };


                        $scope.loadingRefFacets = true;

                        searchService.group(referenceRecordsQuery)
                            .then(function(data) {
                                _.each(data.data.grouped.schema_s.groups, function(group){
                                    referenceRecords[group.groupValue] = {
                                        recordCount : group.doclist.numFound,
                                        docs        : group.doclist.docs
                                    };
                                });
                                $scope.referenceRecords = referenceRecords;
                            })
                            .finally(function() {
                                $scope.loadingRefFacets = false;
                            });

                    }
                ]
            };

        });
    });
