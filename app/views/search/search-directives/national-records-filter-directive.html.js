define(['app', '/app/js/common.js', '/app/js/thesaurus-service.js'], function (app) {
    app.directive('searchNationalRecordsFilter', function () {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/search/search-directives/national-records-filter-directive.html',
            replace: true,
            scope: {
            },
            link: function ($scope, element, attrs, ngModelController) {
            },
            controller: ['$scope', '$element', 'thesaurusService',
                function ($scope, $element, thesaurusService) {


                    $scope.options  = {
                                    jurisdiction             : function () { return thesaurusService.getDomainTerms('jurisdiction')
                                                                                                    .then(function(o){ return $scope.updateFacets($scope.measure, 'msrJurisdiction',o); }); },
                                    status                   : function () { return thesaurusService.getDomainTerms('status')
                                                                                            .then(function(o){ return $scope.updateFacets($scope.measure,'msrStatus',o); }); },
                                    typeOfDocuments          : function () { return thesaurusService.getDomainTerms('typeOfDocuments')
                                                                                            .then(function(o){ return $scope.updateFacets($scope.measure,'msrType',o) }); },
                                    cnaJurisdictions         : function () { return thesaurusService.getDomainTerms('cnaJurisdictions')
                                                                                            .then(function (o) { return $scope.updateFacets($scope.authority,'cnaJurisdiction',o) }); },
                                    absGeneticResourceTypes  : function () { return thesaurusService.getDomainTerms('absGeneticResourceTypes')
                                                                                            .then(function (o) {return $scope.updateFacets($scope.authority,'cnaGeneticResourceTypes',Thesaurus.buildTree(o)) ;}); },
                                    keywords                 : function () { return thesaurusService.getDomainTerms('keywords')
                                                                                            .then(function (o) {return $scope.updateFacets($scope.absPermit,'permitkeywords',Thesaurus.buildTree(o)) ; }); },
                                    usage                    : function () { return thesaurusService.getDomainTerms('usage')
                                                                                            .then(function (o) { return $scope.updateFacets($scope.absPermit,'permitusage',o); }); },
                                    cpJurisdictions         : function () { return thesaurusService.getDomainTerms('cpJurisdictions')
                                                                                    .then(function(terms) {
                                                                                        return $scope.updateFacets($scope.absCheckpoint,'cpJurisdiction',terms);
                                                                                    }); },
                                    resourceTypes            : function () { return thesaurusService.getDomainTerms('resourceTypes')
                                                                                            .then(function(o){ return $scope.updateFacets($scope.resource,'vlrresourceTypes',Thesaurus.buildTree(o)); }); },

                                    countries                : function () { return thesaurusService.getDomainTerms('countries').then(function (o) { return $filter("orderBy")(o, "name"); }); },
                                    regions                  : function () { return $q.all([thesaurusService.getDomainTerms('countries'),
                                                                                            thesaurusService.getDomainTerms('regions')])
                                                                                      .then(function(o) {
                                                                                                    return Enumerable.from($filter("orderBy")(o[0], "name")).union(
                                                                                                        Enumerable.from($filter("orderBy")(o[1], "name"))).toArray();
                                                                                      });
                                                                            },
                                    absSubjects             : function () { return thesaurusService.getDomainTerms('absSubjects').then(function(o){ return o.data; }); },
                                                };


                }]
        }
    });
});
