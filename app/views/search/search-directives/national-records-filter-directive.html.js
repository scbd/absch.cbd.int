define(['app', '/app/js/common.js', '/app/services/thesaurus-service.js'], function (app) {
    app.directive('searchNationalRecordsFilter', function () {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/search/search-directives/national-records-filter-directive.html',
            //replace: true,
            require: '^searchLeftMenu',
            scope: {
            },
            link: function ($scope, element, attrs, searchLeftMenuCtrl) {

                $scope.searchLeftMenuCtrl = searchLeftMenuCtrl;

            },
            controller: ['$scope', '$element', 'thesaurusService', 'commonjs', 'searchService', 'realm',
                function ($scope, $element, thesaurusService, commonjs, searchService, realm) {

                    $scope.filters = {};

                    $scope.options  = {
                                    jurisdiction             : function () { return loadDomainWithFacets('jurisdiction','measure','jurisdiction_s'); },
                                    status                   : function () { return loadDomainWithFacets('status','measure','status_s'); },
                                    typeOfDocuments          : function () { return loadDomainWithFacets('typeOfDocuments', 'measure','type_s'); },
                                    cnaJurisdictions         : function () { return loadDomainWithFacets('cnaJurisdictions', 'authority', 'jurisdiction_s'); },
                                    absGeneticResourceTypes  : function () { return loadDomainWithFacets('absGeneticResourceTypes', 'authority','absGeneticResourceTypes_s') },
                                    keywords                 : function () { return loadDomainWithFacets('keywords', 'permit', 'keywords_ss'); },
                                    usage                    : function () { return loadDomainWithFacets('usage', 'permit', 'usage_REL_ss'); },
                                    cpJurisdictions         : function () { return  loadDomainWithFacets('cpJurisdictions', 'checkpoint', 'jurisdiction_s') },

                                    countries                : function () { return thesaurusService.getDomainTerms('countries').then(function (o) { return $filter("orderBy")(o, "name"); }); },
                                    regions                  : function () { return $q.all([thesaurusService.getDomainTerms('countries'),
                                                                                            thesaurusService.getDomainTerms('regions')])
                                                                                      .then(function(o) {
                                                                                                    return Enumerable.from($filter("orderBy")(o[0], "name")).union(
                                                                                                        Enumerable.from($filter("orderBy")(o[1], "name"))).toArray();
                                                                                      });
                                                                            },

                                                };
                    $scope.filters = {
                        focalPoint              : { identifier: 'focalPoint',               title: 'National Focal Points', type:'nationalRecord',
                                                            subFilters : [
                                                                            { name: 'fpFocalPointType',     type: 'multiselect' , field: 'type_ss'},
                                                                            // { name: 'focalPointNP',         type: 'checkbox',  field: 'type_ss', value : 'NP-FP OR schema_s:ABS-FP' },
                                                                            // { name: 'focalPointCBD'  ,      type: 'checkbox' , field: 'type_ss', value : ['CBD-FP1', 'CBD-FP1']}
                                                            ]
                                                        },
                        authority               : { identifier: 'authority',                title: 'Competent National Authorities' ,type:'nationalRecord',
                                                           subFilters : [
                                                                            { name: 'cnaResponsibleForAll',     type: 'radio' , field: 'absResposibleForAll_b'},
                                                                            { name: 'cnaJurisdiction',          type: 'multiselect', field: 'absJurisdiction_s' },
                                                                            { name: 'cnaGeneticResourceTypes',  type: 'multiselect' , field: 'absGeneticResourceTypes_ss'}
                                                                        ]
                                                         },
                        database                : { identifier: 'database',                 title: 'National Websites and Databases',type:'nationalRecord', count: 0 },
                        measure                 : { identifier: 'measure',                  title: 'Legislative, administrative and policy measures', count: 0,type:'nationalRecord',
                                                           subFilters : [
                                                                            { name: 'msrJurisdiction', type: 'multiselect', field: 'jurisdiction_s' },
                                                                            { name: 'msrStatus', type: 'multiselect', field: 'status_s' },
                                                                            { name: 'msrType', type: 'multiselect', field: 'type_s' },

                                                                            { name: 'msrAdoptionDate', type: 'calendar' , field: 'adoption_s'},
                                                                            { name: 'msrRetirementDate', type: 'calendar' , field: 'retired_s'},
                                                                            { name: 'msrEntryinForceDate', type: 'calendar' , field: 'entryIntoForce_s'},
                                                                            { name: 'mssApplicationDate', type: 'calendar' , field: 'limitedApplication_s'}
                                                                        ]
                                                        },
                        absPermit               : { identifier: 'absPermit',                title: 'Internationally Recognized Certificates of Compliance' ,type:'nationalRecord',
                                                           subFilters : [
                                                                            //{ name: 'permitAuthority',  type: 'reference' , field: 'jurisdiction_s'},
                                                                            { name: 'permitusage',          type: 'multiselect' , field: 'usage_REL_ss'},
                                                                            { name: 'permitkeywords',       type: 'multiselect' , field: 'keywords_ss'},
                                                                            { name: 'permitExpiryDate',     type: 'calendar' , field: 'expiration_s'},
                                                                            { name: 'permitIssuanceDate',   type: 'calendar' , field: 'date_s'},
                                                                            { name: 'amendmentIntent',      type: 'radio' , field: 'amendmentIntent_i'}
                                                                        ]
                                                         },
                        absCheckpoint           :{ identifier: 'absCheckpoint',            title: 'Checkpoints' ,type:'nationalRecord',
                                                           subFilters : [
                                                                            { name: 'cpInformAllAuthorities', type: 'yesno' , field: 'informAllAuthorities_b'},
                                                                            { name: 'cpJurisdiction',      type: 'multiselect', field: 'jurisdiction_s' }
                                                                        ]
                                                          },
                        absCheckpointCommunique : { identifier: 'absCheckpointCommunique',  title: 'Checkpoint Communiqués' ,type:'nationalRecord',
                                                           subFilters : [
                                                                            { name: 'cpcoriginCountries',      type: 'multiselect', field: 'originCountries_ss' }
                                                                        ]
                                                           }

                    };

                    var filterWatch = $scope.$watch('filters', function(newVal){
                                            $scope.searchLeftMenuCtrl.actions.buildQuery(newVal,nationalSchema);
                                      }, true);

                    var nationalSchema = [ "absPermit", "absCheckpoint", "absCheckpointCommunique", "authority", "measure", "database","focalPoint"];

                    function loadDomainWithFacets(domainTerm, schema, facetField){
                            return thesaurusService
                                    .getDomainTerms(domainTerm)
                                    .then(function(domainTermData){
                                        var facetQuery = {query:'realm_ss:' + realm.value.toLowerCase() + ' AND NOT version_s:* AND schema_s:' + schema, fields: [facetField] };
                                        return searchService.facets(facetQuery)
                                            .then(function(facets){
                                                    return commonjs.updateFacets(facets[facetField], domainTermData);
                                            });
                                    });
                    }

                }]
        }
    });
});
