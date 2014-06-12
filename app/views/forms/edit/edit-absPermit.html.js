define(['app', '/app/views/forms/edit/edit.js'], function (app) {

  app.controller("editAbsPermit", ["$scope", "authHttp", "guid", "$filter", "Thesaurus", "$q", "$location", "IStorage", "authentication", "Enumerable", "editFormUtility", "$routeParams", "$controller", function ($scope, $http, guid, $filter, Thesaurus, $q, $location, storage, authentication, Enumerable, editFormUtility, $routeParams, $controller) {
    $controller('editController', {$scope: $scope});

    $scope.options  = {
      countries	: function () { return $http.get("/api/v2013/thesaurus/domains/countries/terms",							{ cache: true }).then(function (o) { return $filter("orderBy")(o.data, "name"); }); },
      usage		: function () { return $http.get("/api/v2013/thesaurus/domains/A7B77788-8C90-4849-9327-E181E9522F3A/terms",	{ cache: true }).then(function (o) { return o.data; }); },
      keywords	: function () { return $http.get("/api/v2013/thesaurus/domains/1A22EAAB-9BBC-4543-890E-DEF913F59E98/terms", { cache: true }).then(function (o) { return Thesaurus.buildTree(o.data); }); },
    };

    //==================================
    //
    //==================================
    $scope.$watch("document.gisFiles", function () {

      var qLinks = [];
      var qGis = [];

      if ($scope.document)
        qLinks = $scope.document.gisFiles || [];

      /* global L: true */ // JSHint for leaflet

      angular.forEach(qLinks, function (link) {
        qGis.push($http.get(link.url).then(function (res) {
          return L.geoJson(res.data);
        }));
      });

      $q.all(qGis).then(function (layers) {
        $scope.gisLayer = layers;
      });
    });

    //==================================
    //
    //==================================
    $scope.getCleanDocument = function(document) {

      document = document || $scope.document;

      if (!document)
        return undefined;

      document = angular.fromJson(angular.toJson(document));

      if (!document.consentGranted) {
        document.consentInformation = undefined;
        document.consentDocuments = undefined;
      }

      if (!document.mutuallyAgreedTermsEstablished) {
        document.mutuallyAgreedTermsInformation = undefined;
        document.mutuallyAgreedTermsDocuments = undefined;
      }

      if (document.gisFiles && document.gisFiles.length===0) {
        document.gisFiles = undefined;
      }

      if (document.amendedPermits && document.amendedPermits.length===0) {
        document.amendedPermits = undefined;
      }

      if (!document.amendedPermits) {
        document.consentedAmendment = undefined;
        document.amendmentsDescription = undefined;
      }
      if (document.providerConfidential) {
        document.providers = undefined;
      }
      if (document.informedConsentConfidential) {
        document.informedConsents = undefined;
      }
      if (document.geneticResourcesConfidential) {
        document.geneticResources	= undefined;
        document.specimen			= undefined;
        document.taxonomy			= undefined;
        document.gisFiles			= undefined;
        document.gisMapCenter		= undefined;
      }

      if (/^\s*$/g.test(document.notes))
        document.notes = undefined;

      return document;
    };

    //==================================
    //
    //==================================
    $scope.isCommercial = function (document) {
      document = document || $scope.document;

      if (!document || !document.usage)
        return false;

      var qLibraries = Enumerable.from(document.usage);

      return qLibraries.Any(function (o) { return o.identifier == "5E833A3F-87D1-4ADD-8701-9F1B76383017"; });
    };

    //This edit contact stuff should NOT be here... it should probably be in a directive or something.
    //==================================
    //
    //==================================
    $scope.editContact = function(property) {

      $scope.editedProperty = property;
      $scope.editedContact  = clone($scope.document[property] || { source : guid(),  type: "organization" });
    };

    //==================================
    //
    //==================================
    $scope.saveContact = function() {

      if(!$scope.editedProperty)
        return;

      $scope.document[$scope.editedProperty] = clone($scope.editedContact);
    };

    $scope.setDocument();
  }]);
});
