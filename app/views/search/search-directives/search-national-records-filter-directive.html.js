define(['app'], function (app) {
app.directive('searchNationalRecordsFilter', function ($http) {
    return {
        restrict: 'EAC',
        templateUrl: '/app/views/search/search-directives/search-national-records-filter-directive.html',
        replace: true,
        scope: {
              filter: '=filter',
        },
        link: function ($scope, element, attrs, ngModelController)
        {
        },
        controller : ['$scope', '$element', '$location', 'Thesaurus', "IStorage", "guid", "$q", "Enumerable", "$filter","underscore","realm","$routeParams",
         function ($scope, $element, $location, Thesaurus, storage, guid, $q, Enumerable, $filter,_,realm, $routeParams)
        {   
            $scope.nationalSearch = {
                NFP : {
                    // type : {
                    //     field : 'type_ss'
                    // }
                },
                CNA : {
                    // type : {
                    //     field : 'type_ss'
                    // }
                },
                MSR : {
                    // type : {
                    //     field : 'type_ss'
                    // }
                },
                IRCC : {
                    // type : {
                    //     field : 'type_ss'
                    // }
                },
                CP : {
                    // type : {
                    //     field : 'type_ss'
                    // }
                }
            };
            $scope.collections = {};
            $scope.showNationalFilters = true;
            $scope.showReferenceFilters = true;
            $scope.expanded = false;
            $scope.selectedItems = [];
            //$scope.facet = $scope.field.replace('_s', ''); // TODO: replace @field by @facet

            $scope.expandSearch = 0;
            $scope.msrAdoptionDate= '*:*'
            $scope.msrRetirementDate= '*:*'
            $scope.msrEntryinForceDate= '*:*'
            $scope.mssApplicationDate= '*:*'

            $scope.permitIssuanceDate= '*:*'
            $scope.permitExpiryDate= '*:*'
            $scope.focalPointQuery = '';

            $scope.options  = {
               statuses                 : function () { return $http.get("/api/v2013/thesaurus/domains/ED7CDBD8-7762-4A84-82DD-30C01458A799/terms",  { cache: true })
                                                                    .then(function(o){  $scope.collections.status = o.data }); },
               types                    : function () { return $http.get("/api/v2013/thesaurus/domains/144CF550-7629-43F3-817E-CACDED34837E/terms",  { cache: true })
                                                                    .then(function(o){  $scope.collections.types = o.data; }); },
               jurisdictions            : function () { return $http.get("/api/v2013/thesaurus/domains/D7BD5BDE-A6B9-4261-B788-16839CCC4F7E/terms", { cache: true })
                                                                    .then(function (o) { $scope.collections.jurisdictions = o.data; }); },
               absGeneticResourceTypes  : function () { return $http.get("/api/v2013/thesaurus/domains/1A22EAAB-9BBC-4543-890E-DEF913F59E98/terms", { cache: true })
                                                                    .then(function (o) {

                                                                       return $scope.updateFacets($scope.authority,'cnaGeneticResourceTypes',Thesaurus.buildTree(o.data)) ;
                                                                         }); },
               keywords                 : function () { return $http.get("/api/v2013/thesaurus/domains/1A22EAAB-9BBC-4543-890E-DEF913F59E98/terms", { cache: true })
                                                                    .then(function (o) { $scope.collections.keywords = Thesaurus.buildTree(o.data); }); },
               usage                    : function () { return $http.get("/api/v2013/thesaurus/domains/A7B77788-8C90-4849-9327-E181E9522F3A/terms", { cache: true })
                                                                    .then(function (o) { return $scope.updateFacets($scope.absPermit,'permitusage',o.data); }); },
               countries                : function () { return $http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }).then(function (o) { $scope.collections.countries = $filter("orderBy")(o.data, "name");return $scope.collections.countries; }); },
               regions                  : function () { return $q.all([$http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }),
                                                            $http.get("/api/v2013/thesaurus/domains/regions/terms",   { cache: true })]).then(function(o) {
                                                                           return $scope.collections.regions = $filter("orderBy")(o[1].data, "name");
                                                                                   // Enumerable.from($filter("orderBy")(o[0].data, "name")).union(
                                                                                   // Enumerable.from($filter("orderBy")(o[1].data, "name"))).toArray();
                                                                             
                                                           });
                                                      },
                absSubjects             : function () { return $http.get("/api/v2013/thesaurus/domains/CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924/terms", { cache: true }).then(function(o){ return o.data; }); },
                languages               : function () { return $http.get("/api/v2013/thesaurus/domains/ISO639-2/terms", { cache: true }).then(function(o){
                                                                      return $filter("orderBy")(o.data, "name");
                                                                    })},
            };

            

            $scope.focalPoint              = { identifier: 'focalPoint',               title: 'National Focal Points',
                                                subFilters : [
                                                                { name: 'focalPointNP',         type: 'checkbox',  field: 'type_ss', value : 'NP-FP OR schema_s:ABS-FP' },
                                                                { name: 'focalPointCBD'  ,      type: 'checkbox' , field: 'type_ss', value : ['CBD-FP1', 'CBD-FP1']}
                                                ]
                                             };
            $scope.authority               = { identifier: 'authority',                title: 'Competent National Authorities' ,
                                               subFilters : [
                                                                { name: 'cnaResponsibleForAll',     type: 'radio' , field: 'absResposibleForAll_b'},
                                                                { name: 'cnaJurisdiction',          type: 'multiselect', field: 'absJurisdiction_s' },
                                                                { name: 'cnaGeneticResourceTypes',  type: 'multiselect' , field: 'absGeneticResourceTypes_ss'}
                                                            ]
                                             };
            $scope.database                = { identifier: 'database',                 title: 'National Websites and Databases', count: 0 };
            $scope.measure                 = { identifier: 'measure',                  title: 'Legislative, administrative and policy measures', count: 0,
                                               subFilters : [
                                                                { name: 'msrJurisdiction', type: 'multiselect', field: 'jurisdiction_s' },
                                                                { name: 'msrStatus', type: 'multiselect', field: 'status_s' },
                                                                { name: 'msrType', type: 'multiselect', field: 'type_s' },

                                                                { name: 'msrAdoptionDate', type: 'calendar' , field: 'adoption_s'},
                                                                { name: 'msrRetirementDate', type: 'calendar' , field: 'retired_s'},
                                                                { name: 'msrEntryinForceDate', type: 'calendar' , field: 'entryIntoForce_s'},
                                                                { name: 'mssApplicationDate', type: 'calendar' , field: 'limitedApplication_s'}
                                                            ]
                                            };
            $scope.absPermit               = { identifier: 'absPermit',                title: 'Permits and their equivalent' ,
                                               subFilters : [
                                                                //{ name: 'permitAuthority',  type: 'reference' , field: 'jurisdiction_s'},
                                                                { name: 'permitusage',          type: 'multiselect' , field: 'usage_REL_ss'},
                                                                { name: 'permitkeywords',       type: 'multiselect' , field: 'keywords_ss'},
                                                                { name: 'permitExpiryDate',     type: 'calendar' , field: 'expiration_s'},
                                                                { name: 'permitIssuanceDate',   type: 'calendar' , field: 'date_s'},
                                                                { name: 'amendmentIntent',      type: 'radio' , field: 'amendmentIntent_i'}
                                                            ]
                                             };
            $scope.absCheckpoint           = { identifier: 'absCheckpoint',            title: 'Checkpoints' ,
                                               subFilters : [
                                                                { name: 'cpInformAllAuthorities', type: 'yesno' , field: 'informAllAuthorities_b'},
                                                                { name: 'cpJurisdiction',      type: 'multiselect', field: 'jurisdiction_s' }
                                                            ]
                                              };
            $scope.absCheckpointCommunique = { identifier: 'absCheckpointCommunique',  title: 'Checkpoint Communiqués' ,
                                               subFilters : [
                                                                { name: 'cpcoriginCountries',      type: 'multiselect', field: 'originCountries_ss' }
                                                            ]
                                               };

            $scope.resource                = { identifier: 'resource',                 title: 'Virtual Library Record' , type:'reference',
                                               subFilters : [
                                                                { name: 'vlrpublicationYear', type: 'multiselect', field: 'publicationYear_is'},
                                                                { name: 'vlrresourceTypes',   type: 'multiselect' , field: 'resourceTypes_ss'},
                                                                { name: 'vlrRegions',         type: 'multiselect', field: 'regions_ss' },
                                                                { name: 'vlrLanguages',       type: 'multiselect', field: 'resourceLinksLanguage_ss' }
                                                            ]
                                               };
            $scope.organization            = { identifier: 'organization',             title: 'ABS Related Organizations', type:'reference' };
            $scope.meeting                 = { identifier: 'meeting',                  title: 'Meetings &amp; Meeting Outcomes ({{meeting.count}})', type:'reference',
                                               subFilters : [
                                                                { name: 'mtgRange', type: 'select', field: 'startDate_dt'},
                                                            ]
                                             };
            $scope.notification            = { identifier: 'notification',             title: 'Notifications', type:'reference' };
            $scope.pressRelease            = { identifier: 'pressRelease',             title: 'Press Releases', type:'reference' };
            $scope.statement               = { identifier: 'statement',                title: 'Statements' , type:'reference'};
            $scope.news                    = { identifier: 'news',                     title: 'News', type:'reference' };
            $scope.modelContractualClause  = { identifier: 'modelContractualClause', title : "Model Contractual Clauses, Codes of Conduct, Guidelines, Best Practices and Standards", type:'reference',
                                               subFilters : [
                                                            { name: 'mccresourceTypes',   type: 'multiselect' , field: 'resourceTypes_ss'}
                                                        ]
                                             }
            $scope.communityProtocol  = { identifier: 'communityProtocol', title : "Community protocols procedures and customary laws ", type:'reference',
                                               subFilters : [
                                                            { name: 'cppresourceTypes',   type: 'multiselect' , field: 'resourceTypes_ss'}
                                                        ]
                                             }
                                             
            
            $scope.terms  = [ $scope.focalPoint, $scope.authority, $scope.database, $scope.measure, $scope.absPermit, $scope.absCheckpoint,
                              $scope.absCheckpointCommunique, $scope.resource, $scope.organization, $scope.meeting, $scope.notification,
                              $scope.pressRelease, $scope.statement, $scope.news, $scope.modelContractualClause, $scope.communityProtocol ];
            



        }]
    }
});

});
