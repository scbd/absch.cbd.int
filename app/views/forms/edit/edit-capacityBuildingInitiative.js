define(['app', 'underscore', 'views/forms/edit/edit', '../view/view-capacity-building-initiative.directive',
'./organization-selector'], function (app, _) {

  app.controller("editCapacityBuildingInitiative", ["$scope", "$http", "$filter", "$q", "$routeParams", "$controller","$location", "Thesaurus", "Enumerable", "underscore", function ($scope, $http, $filter, $q, $routeParams, $controller,$location, Thesaurus, Enumerable, _) {

    $controller('editController', {$scope: $scope});
   
    $scope.path = $location.path();

    $scope.options  = {
        libraries     : function() { return $http.get("/api/v2013/thesaurus/domains/cbdLibraries/terms",                         { cache: true }).then(function(o){ return Enumerable.From(o.data).Where("$.identifier!='cbdLibrary:bch'").ToArray();});},
        languages     : function() { return $http.get("/api/v2013/thesaurus/domains/52AFC0EE-7A02-4EFA-9277-8B6C327CE21F/terms", { cache: true }).then(function(o){ return $filter('orderBy')(o.data, 'name'); }); },
        cbiTypes      : function() { return $http.get("/api/v2013/thesaurus/domains/D935D0C8-F5A5-43B8-9E06-45A57BF3C731/terms", 	 { cache: true }).then(function(o){ return Thesaurus.buildTree(o.data); }); },

        chmregions       : function() { return $q.all([$http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }),
                                                    $http.get("/api/v2013/thesaurus/domains/regions/terms",   { cache: true })]).then(function(o) {
                                                        return Enumerable.from($filter('orderBy')(o[0].data, 'name')).Union(
                                                               Enumerable.from($filter('orderBy')(o[1].data, 'name'))).ToArray();
                                                   }); },

        regions: function() {
           return $q.all([$http.get("/api/v2013/thesaurus/domains/regions/terms", {cache: true})]).then(function(o) {
               return Enumerable.from($filter("orderBy")(o[0].data, "name")).toArray();
           });
        },
        countries: function() {
            return $q.all([$http.get("/api/v2013/thesaurus/domains/countries/terms", {cache: true})]).then(function(o) {
                return Enumerable.from($filter("orderBy")(o[0].data, "name")).toArray();
            });
         },
        status : function () {
             return $http.get("/api/v2013/thesaurus/domains/4E7731C7-791E-46E9-A579-7272AF261FED/terms", { cache: true })
             .then(function(o){
                 return Thesaurus.buildTree(o.data);
             });
        },
        categories : function () {
            return $http.get("/api/v2013/thesaurus/domains/579F448B-ECA8-4258-B130-3EAA68056D1F/terms", { cache: true })
            .then(function(o){
              return Thesaurus.buildTree(o.data);
            });
        },
        fundingSources : function () {
            return $http.get("/api/v2013/thesaurus/domains/Capacity Building Project Funding Types/terms", { cache: true })
            .then(function(o){
              return Thesaurus.buildTree($filter('orderBy')(o.data, 'name'));
            });
        },
        absKeyAreas : function () {
            return $http.get("/api/v2013/thesaurus/domains/2B2A5166-F949-4B1E-888F-A7976E76320B/terms", { cache: true })
                .then(function(o){
                    return o.data;
                });
        },

         aichiTargets : function () {
             return $http.get("/api/v2013/thesaurus/domains/AICHI-TARGETS/terms", { cache: true })
             .then(function(o){
                 return Thesaurus.buildTree(o.data);
             });
         },

         geographicScope : function () {
             return $http.get("/api/v2013/thesaurus/domains/4D4413D8-36F9-4CD2-8CC1-4F3C866DDE5A/terms", { cache: true })
             .then(function(o){
                 return Thesaurus.buildTree(o.data);
             });
         },
         targetGroups : function () {
             return $http.get("/api/v2013/thesaurus/domains/AFB155C4-93A6-402C-B812-CFC7488ED651/terms", { cache: true })
             .then(function(o){
                 return o.data;
             });
         },
    };

    $scope.isGlobalOrRegional = function () {
        if($scope.document && $scope.document.geographicScope && $scope.document.geographicScope.scope){
            return _.contains(['56B8CEB7-56B5-436B-99D9-AA7C4622F326', 'C7D6719B-8AD9-4EB1-A472-B0B858DE0F56'], $scope.document.geographicScope.scope.identifier);
        }
        return false;
    };

    $scope.isNational = function () {
        if($scope.document && $scope.document.geographicScope && $scope.document.geographicScope.scope){
            return $scope.document.geographicScope.scope.identifier == "20B2CC6D-646D-4FD5-BD53-D652BA3FA088";
        }
        return false;
    };
    //============================================================
    //
    //============================================================
    $scope.isSubnational = function () {
        if($scope.document && $scope.document.geographicScope && $scope.document.geographicScope.scope){
            return $scope.document.geographicScope.scope.identifier == "DEBB019D-8647-40EC-8AE5-10CA88572F6E";
        }
        return false;
    };



    //============================================================
    //
    //============================================================
    $scope.isCommunity = function () {
        if($scope.document && $scope.document.geographicScope && $scope.document.geographicScope.scope){
            return $scope.document.geographicScope.scope.identifier == "9627DF2B-FFAC-4F85-B075-AF783FF2A0B5";
        }
        return false;
    };

    //============================================================
    //
    //============================================================
    $scope.isPartofBroaderInitiative = function () {
        if($scope.document && $scope.document.type){
            return $scope.document.type.identifier == "8E66C5C7-194C-4A27-9218-26ED003E6D30";
        }
        return false;
    };

    //============================================================
    //
    //============================================================
    $scope.isSelfFunding = function () {
        if($scope.document && $scope.document.fundingSourceTypes){
            return !_.isEmpty(_.where($scope.document.fundingSourceTypes, { identifier: "AFDE8912-E398-4194-95BA-FE488DCC891A"}));
        }
        return false;
    };

    $scope.isProposedOrApproved = function(){

        if($scope.document && $scope.document.status)
            return _.contains(['73E2AC27-D964-487C-A4E6-0997BB27AF01','851B10ED-AE62-4F28-B178-6D40389CC8DB'], $scope.document.status.identifier)
        return false;
    }

    //============================================================
    //
    //============================================================
    $scope.clearDates = function () {
        if($scope.document && ($scope.document.startDate || $scope.document.endDate))
        {
            $scope.document.startDate = undefined;
            $scope.document.endDate   = undefined;
        }
    };

    //============================================================
    //
    //============================================================
    $scope.clearDuration = function () {
        console.log('clear duration');
        if($scope.document && $scope.document.duration)
            $scope.document.duration = undefined;
    };

    // $scope.$watch('document.geographicScope.scope', function(newVal){
    //     if(!$scope.document)
    //         return;
    //     if($scope.isGlobalOrRegional() && $scope.isNational())
    //         return;
    //     if(!$scope.isGlobalOrRegional())
    //         $scope.geographicalRegions = undefined;
    //     if(!$scope.isNational())
    //         $scope.geographicalCountries = undefined;
    // })

    //==================================
    //
    //==================================
    $scope.getCleanDocument = function(document) {

        document = document || $scope.document;

        if (!document)
          return undefined;

        if (/^\s*$/g.test(document.notes))
          document.notes = undefined;

        if(!document.geographicScope)
            document.geographicScope = {};
        if(!$scope.isGlobalOrRegional())
            delete document.geographicScope.regions;
        if(!$scope.isGlobalOrRegional() && !$scope.isNational())
            delete document.geographicScope.countries;

        if(_.isEmpty(document.geographicScope))
            document.geographicScope = undefined;

        if(document.capacityBuildingsType && !document.capacityBuildingsType.isBroaderProjectPart)
            document.capacityBuildingsType.broaderProjectPart = undefined;

        if(document.status && !$scope.isProposedOrApproved()){
            document.durationPeriod = undefined;
            document.durationText = undefined;
        }
            
        if((document.durationText||'').trim() == '')
            document.durationText = undefined;
        

        if(document.type)
            delete document.type;
        if(document.duration)
            delete document.duration;
        if(document.geographicScope && document.geographicScope.regionsOrCountries)
            delete document.geographicScope.regionsOrCountries;
        if(document.typeInfo)
            delete document.typeInfo;
            
        return document;
    };
    
    $scope.updateCapacityType = function(type, val){        
        if(val==true){
            if(type!='isProjectProgramme')
                $scope.document.capacityBuildingType.isProjectProgramme = false;
            if(type!='isBroaderProjectPart'){
                $scope.document.capacityBuildingType.isBroaderProjectPart = false;
                $scope.document.capacityBuildingType.broaderProjects= undefined;
            }
            if(type!='isStandaloneProject')
                $scope.document.capacityBuildingType.isStandaloneProject = false;
        }
    }
    
    $scope.setDocument({
        libraries: [{ identifier: "cbdLibrary:abs-ch" }],
        aichiTargets: [{identifier: "AICHI-TARGET-16"}]
    }, true);

  }]);
});
