define(['app', '/app/views/forms/edit/edit.js'], function (app) {

  app.controller("editAbsCheckpoint", ["$scope", "authHttp", "guid", "$filter", "Thesaurus", "$q", "$location", "IStorage", "authentication", "Enumerable", "editFormUtility", "$routeParams", "$controller", function ($scope, $http, guid, $filter, thesaurus, $q, $location, storage, authentication, Enumerable, editFormUtility, $routeParams, $controller) {
    $controller('editController', {$scope: $scope});

    $scope.options  = {
      countries		: function () { return $http.get("/api/v2013/thesaurus/domains/countries/terms",							{ cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
      jurisdictions	: function () { return $http.get("/api/v2013/thesaurus/domains/D7BD5BDE-A6B9-4261-B788-16839CCC4F7E/terms",	{ cache: true }).then(function(o){ return o.data; }); }
    };

    //==================================
    //
    //==================================
    $scope.isSubNational = function(document) {

      document = document || $scope.document;

      return document &&
           document.jurisdiction &&
           document.jurisdiction.identifier == "DEBB019D-8647-40EC-8AE5-10CA88572F6E";
    };

    //==================================
    //
    //==================================
    $scope.isCommunity = function (document) {

      document = document || $scope.document;

      return document &&
           document.jurisdiction &&
           document.jurisdiction.identifier == "DEEEDB35-A34B-4755-BF77-D713017195E3";
    };

    //==================================
    //
    //==================================
    $scope.getCleanDocument = function(document) {

      document = document || $scope.document;

      if (!document)
        return undefined;

      document = angular.fromJson(angular.toJson(document));

      if (!$scope.isSubNational(document) || !$scope.isCommunity(document)) {
        document.jurisdictionName = undefined;
      }
      if (document.informAllAuthorities !== false) {
        document.authoritiesToInform = undefined;
      }

      if (/^\s*$/g.test(document.notes))
        document.notes = undefined;

      return document;
    };


  }]);
});
