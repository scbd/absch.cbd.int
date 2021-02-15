define(['app','lodash','views/forms/edit/edit', '../view/view-capacity-building-resource.directive'], function (app,_) {

  app.controller("editCapacityBuildingResource", ["$scope", "$http", "$filter", "$q", "$routeParams", "$controller","$location", "Thesaurus", "Enumerable", function ($scope, $http, $filter, $q, $routeParams, $controller,$location, thesaurus, Enumerable) {

    $controller('editController', {$scope: $scope});

    $scope.path = $location.path();



    $scope.options  = {
        libraries     : function() { return $http.get("/api/v2013/thesaurus/domains/cbdLibraries/terms",                         { cache: true }).then(function(o){ return Enumerable.From(o.data).Where("$.identifier!='cbdLibrary:bch'").ToArray();});},
        languages     : function() { return $http.get("/api/v2013/thesaurus/domains/52AFC0EE-7A02-4EFA-9277-8B6C327CE21F/terms", { cache: true }).then(function(o){ return $filter('orderBy')(o.data, 'name'); }); },

        regions: function() {
           return $q.all([
               $http.get("/api/v2013/thesaurus/domains/regions/terms", {
                   cache: true
               }),
               $http.get("/api/v2013/thesaurus/domains/countries/terms", {
                   cache: true
               })
           ]).then(function(o) {
               return Enumerable.from($filter("orderBy")(o[0].data, "name")).union(
                   Enumerable.from($filter("orderBy")(o[1].data, "name"))
               ).toArray();
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
                 return thesaurus.buildTree(o.data);
             });
         },
         targetGroups : function () {return $http.get("/api/v2013/thesaurus/domains/AFB155C4-93A6-402C-B812-CFC7488ED651/terms", { cache: true }).then(function(o){return o.data;});},
         expertiseLevels : function () {return $http.get("/api/v2013/thesaurus/domains/1B57D9C3-F5F8-4875-94DC-93E427F3BFD8/terms", { cache: true }).then(function(o){return o.data;});},
         purposes : function() { return $http.get("/api/v2013/thesaurus/domains/E712C9CD-437E-454F-BA72-E7D20E4C28ED/terms", { cache: true }).then(function(o){ return thesaurus.buildTree(o.data); }); },
         fileFormats : function() { return $http.get("/api/v2013/thesaurus/domains/D2D97AB3-4D20-41D4-8CBE-B21C33924823/terms", { cache: true }).then(function(o){ return thesaurus.buildTree(o.data); }); },
         resourceTypes : function() { return $http.get("/api/v2013/thesaurus/domains/7E688641-F642-4C46-A024-70ED76D3DF40/terms", { cache: true }).then(function(o){ return thesaurus.buildTree(o.data); }); },

    };


    //==================================
    //
    //==================================
    $scope.getCleanDocument = function(document) {

        document = document || $scope.document;

        if (!document)
          return undefined;

        if (/^\s*$/g.test(document.notes))
          document.notes = undefined;

        return $scope.sanitizeDocument(document);
      };

    $scope.setDocument({});
  }]);
});
