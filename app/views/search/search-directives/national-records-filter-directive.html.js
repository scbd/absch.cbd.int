define(['app', '/app/js/common.js'], function (app) {
    app.directive('searchFilterSchemas', function () {
        return {
            restrict: 'EAC',
            templateUrl: '/app/views/search/search-directives/national-records-filter-directive.html',
            replace: true,
            scope: {
            },
            link: function ($scope, element, attrs, ngModelController) {
            },
            controller: ['$scope', '$element',
                function ($scope, $element) {
                    
                    
                    $scope.options  = {
                                    jurisdiction             : function () { return $http.get("/api/v2013/thesaurus/domains/7A56954F-7430-4B8B-B733-54B8A5E7FF40/terms",  { cache: true })
                                                                                            .then(function(o){ return $scope.updateFacets($scope.measure, 'msrJurisdiction',o.data); }); },
                                    status                   : function () { return $http.get("/api/v2013/thesaurus/domains/ED7CDBD8-7762-4A84-82DD-30C01458A799/terms",  { cache: true })
                                                                                            .then(function(o){ return $scope.updateFacets($scope.measure,'msrStatus',o.data) }); },
                                    typeOfDocuments          : function () { return $http.get("/api/v2013/thesaurus/domains/144CF550-7629-43F3-817E-CACDED34837E/terms",  { cache: true })
                                                                                            .then(function(o){ return $scope.updateFacets($scope.measure,'msrType',o.data) }); },
                                    cnaJurisdictions         : function () { return $http.get("/api/v2013/thesaurus/domains/D7BD5BDE-A6B9-4261-B788-16839CCC4F7E/terms", { cache: true })
                                                                                            .then(function (o) { return $scope.updateFacets($scope.authority,'cnaJurisdiction',o.data) }); },
                                    absGeneticResourceTypes  : function () { return $http.get("/api/v2013/thesaurus/domains/1A22EAAB-9BBC-4543-890E-DEF913F59E98/terms", { cache: true })
                                                                                            .then(function (o) {
                        
                                                                                            return $scope.updateFacets($scope.authority,'cnaGeneticResourceTypes',Thesaurus.buildTree(o.data)) ;
                                                                                                }); },
                                    keywords                 : function () { return $http.get("/api/v2013/thesaurus/domains/1A22EAAB-9BBC-4543-890E-DEF913F59E98/terms", { cache: true })
                                                                                            .then(function (o) {return $scope.updateFacets($scope.absPermit,'permitkeywords',Thesaurus.buildTree(o.data)) ; }); },
                                    usage                    : function () { return $http.get("/api/v2013/thesaurus/domains/A7B77788-8C90-4849-9327-E181E9522F3A/terms", { cache: true })
                                                                                            .then(function (o) { return $scope.updateFacets($scope.absPermit,'permitusage',o.data); }); },
                                    cpJurisdictions         : function () { return $q.all([$http.get("/api/v2013/thesaurus/domains/D7BD5BDE-A6B9-4261-B788-16839CCC4F7E/terms", { cache: true }),
                                                                                    $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",   { cache: true })]).then(function(o) {
                                                                                        var data = o[0].data;
                                                                                        data.push(o[1].data)
                                                                                        return $scope.updateFacets($scope.absCheckpoint,'cpJurisdiction',data);
                                                                                    }); },
                                    resourceTypes            : function () { return $http.get("/api/v2013/thesaurus/domains/83BA4728-A843-442B-9664-705F55A8EC52/terms", { cache: true })
                                                                                            .then(function(o){ return $scope.updateFacets($scope.resource,'vlrresourceTypes',Thesaurus.buildTree(o.data)); }); },
                        
                                    countries                : function () { return $http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }).then(function (o) { return $filter("orderBy")(o.data, "name"); }); },
                                    regions                  : function () { return $q.all([$http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }),
                                                                                    $http.get("/api/v2013/thesaurus/domains/regions/terms",   { cache: true })]).then(function(o) {
                                                                                                    return Enumerable.from($filter("orderBy")(o[0].data, "name")).union(
                                                                                                        Enumerable.from($filter("orderBy")(o[1].data, "name"))).toArray();
                                                                                });
                                                                            },
                                        absSubjects             : function () { return $http.get("/api/v2013/thesaurus/domains/CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924/terms", { cache: true }).then(function(o){ return o.data; }); },
                                        languages               : function () { return $http.get("/api/v2013/thesaurus/domains/ISO639-2/terms", { cache: true }).then(function(o){
                                                                                            return $filter("orderBy")(o.data, "name");
                                                                                            })},
                                        meetingYear             : function () {
                                                                                var year = [];
                                                                                year.push({'identifier':'[' + moment().add('days',1).format("YYYY-MM-DD")+ 'T00:00:00Z TO *]','name' : 'Upcoming meetings'});
                                                                                year.push({'identifier':'[* TO ' + moment().format("YYYY-MM-DD") + 'T00:00:00Z ]','name' : 'Previous meetings'});
                                                                                for (var i=moment().year(); i>= 2009; i--)
                                                                                    year.push({'identifier':'['+i + '-01-01T00:00:00Z TO ' + i + '-12-31T00:00:00Z]','name' : '' + i});
                        
                                                                                return year;
                                                                            },
                                    mccResourceTypes            : function () { return $http.get("/api/v2013/thesaurus/domains/840427E5-E5AC-4578-B238-C81EAEEDBDD8/terms", { cache: true })
                                                                                            .then(function(o){ return $scope.updateFacets($scope.modelContractualClause,'mccresourceTypes',Thesaurus.buildTree(o.data)); }); },
                                    
                                    cppResourceTypes            : function () { return $http.get("/api/v2013/thesaurus/domains/ED9BE33E-B754-4E31-A513-002316D0D602/terms", { cache: true })
                                                                                            .then(function(o){ return $scope.updateFacets($scope.modelContractualClause,'cppresourceTypes',Thesaurus.buildTree(o.data)); }); },
                                    };
                    
                    
                }]
        }
    });
});
		