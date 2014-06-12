define(['app', '/app/views/forms/edit/edit.js'], function (app) {

  app.controller("editResource", ["$scope", "authHttp", "guid", "$filter", "Thesaurus", "$q", "$location", "IStorage", "authentication", "Enumerable", "editFormUtility", "$routeParams", "$controller", function ($scope, $http, guid, $filter, thesaurus, $q, $location, storage, authentication, Enumerable, editFormUtility, $routeParams, $controller) {
    $controller('editController', {$scope: $scope});

    $scope.options  = {
      libraries     : function() { return $http.get("/api/v2013/thesaurus/domains/cbdLibraries/terms",                         { cache: true }).then(function(o){ return Enumerable.from(o.data).where("$.identifier!='cbdLibrary:bch'").toArray();});},
      languages     : function() { return $http.get("/api/v2013/thesaurus/domains/52AFC0EE-7A02-4EFA-9277-8B6C327CE21F/terms", { cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
      resourceTypes : function() { return $http.get("/api/v2013/thesaurus/domains/83BA4728-A843-442B-9664-705F55A8EC52/terms", { cache: true }).then(function(o){ return thesaurus.buildTree(o.data); }); },
      absSubjects   : function() { return $http.get("/api/v2013/thesaurus/domains/CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924/terms", { cache: true }).then(function(o){ return o.data; }); },
      regions       : function() { return $q.all([$http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }),
                            $http.get("/api/v2013/thesaurus/domains/regions/terms",   { cache: true })]).then(function(o) {
                              return Enumerable.from($filter("orderBy")(o[0].data, "name")).union(
                                   Enumerable.from($filter("orderBy")(o[1].data, "name"))).toArray();
                       });
                    },
    
      documentLinksExt :        [{ model:"language", title:"Language", required:true, options: $http.get("/api/v2013/thesaurus/domains/ISO639-2/terms", { cache: true }).then(function(o){ return $scope.options.documentLinksExt       [0].options = $filter("orderBy")(o.data, "name"); }) }],
    };

    //==================================
    //
    //==================================
    $scope.getCleanDocument = function(document) {

      document = document || $scope.document;

      if (!document)
        return undefined;

      document = angular.fromJson(angular.toJson(document));

      if (/^\s*$/g.test(document.notes))
        document.notes = undefined;

      return document;
    };

    $scope.setDocument(true);
  }]);
});
