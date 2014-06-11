define(['app', '/app/views/forms/edit/edit.js'], function (app) {

  app.controller("editMeasure", ["$scope", "authHttp", "guid", "$filter", "Thesaurus", "$q", "$location", "IStorage", "authentication", "Enumerable", "editFormUtility", "$routeParams", "$controller", function ($scope, $http, guid, $filter, thesaurus, $q, $location, storage, authentication, Enumerable, editFormUtility, $routeParams, $controller) {
    $controller('editController', {$scope: $scope});

    $scope.options  = {
      countries		: function() { return $http.get("/api/v2013/thesaurus/domains/countries/terms",								{ cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
      regions			: function() { return $http.get("/api/v2013/thesaurus/domains/regions/terms",								{ cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
      libraries		: function() { return $http.get("/api/v2013/thesaurus/domains/cbdClearingHouses/terms",						{ cache: true }).then(function(o){ return o.data; }); },
      languages		: function() { return $http.get("/api/v2013/thesaurus/domains/52AFC0EE-7A02-4EFA-9277-8B6C327CE21F/terms",	{ cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
      absMeasures		: function() { return $http.get("/api/v2013/thesaurus/domains/50616B56-12F3-4C46-BC43-2DFC26679177/terms",	{ cache: true }).then(function(o){ return o.data; }); },
      typeOfDocuments	: function() { return $http.get("/api/v2013/thesaurus/domains/144CF550-7629-43F3-817E-CACDED34837E/terms",	{ cache: true }).then(function(o){ return o.data; }); },
      jurisdiction	: function() { return $http.get("/api/v2013/thesaurus/domains/7A56954F-7430-4B8B-B733-54B8A5E7FF40/terms",	{ cache: true }).then(function(o){ return o.data; }); },
      status			: function() { return $http.get("/api/v2013/thesaurus/domains/ED7CDBD8-7762-4A84-82DD-30C01458A799/terms",	{ cache: true }).then(function(o){ return o.data; }); },
      regions			: function() { return $q.all([$http.get("/api/v2013/thesaurus/domains/regions/terms", { cache: true }), 
                              $http.get("/api/v2013/thesaurus/domains/countries/terms",   { cache: true })]).then(function(o) {
                              return Enumerable.from($filter("orderBy")(o[0].data, "name")).union(
                                   Enumerable.from($filter("orderBy")(o[1].data, "name"))).toArray();
                              })
      },
      documentLinksExt :        [{ model:"language",        title:"Language",         required:true, options: $http.get("/api/v2013/thesaurus/domains/ISO639-2/terms", { cache: true }).then(function(o){ return $scope.options.documentLinksExt       [0].options = $filter("orderBy")(o.data, "name"); }) }],
      documentTranslationsExt : [{ model:"language",        title:"Language",         required:true, options: $http.get("/api/v2013/thesaurus/domains/52AFC0EE-7A02-4EFA-9277-8B6C327CE21F/terms", { cache: true }).then(function(o){ return $scope.options.documentTranslationsExt[0].options = $filter("orderBy")(o.data, "name"); }) },
                     { model:"translationType", title:"Translation Type", required:true, options: $http.get("/api/v2013/thesaurus/domains/19E3C535-2919-4804-966C-E62728507291/terms", { cache: true }).then(function(o){ return $scope.options.documentTranslationsExt[1].options = $filter("orderBy")(o.data, "name"); }) },]
    };

    //==================================
    //
    //==================================
    $scope.getCleanDocument = function(document) {

      document = document || $scope.document;

      if (!document)
        return undefined;

      document = angular.fromJson(angular.toJson(document));

      if(document.expires!==undefined)
        delete document.expires;

      if (!$scope.isInLibrary("absch", document))
        document.absMeasures = undefined;

      if (!$scope.isInLibrary("bch", document)){
        document.cpbSubjectAreas = undefined;
        document.cpbSubjectLmos  = undefined;
      }

      if (!$scope.isJurisdictionRegional(document))
        document.jurisdictionRegions = undefined;

      if (!$scope.isJurisdictionSubNationalOrCommunity(document))
        document.jurisdictionName = undefined;

      if (!$scope.isNotLegallyBinded(document))
        document.adoption = undefined;

      if (!$scope.isLegallyBinded(document))
        document.entryIntoForce = undefined;

      if (!$scope.isRetired(document))
        document.retired = undefined;

      if (/^\s*$/g.test(document.notes))
        document.notes = undefined;

      return document
    };

  }]);
});
