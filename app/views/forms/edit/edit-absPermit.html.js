define(['app', '/app/views/forms/edit/edit.js'], function (app) {

  app.controller("editAbsPermit", ["$scope", "authHttp", "Thesaurus", "guid", "$filter", "$q", "Enumerable", "editFormUtility", "$controller", function ($scope, $http, Thesaurus, guid, $filter, $q, Enumerable, editFormUtility, $controller) {
    $controller('editController', {$scope: $scope});

    $scope.options  = {
      countries	: function () { return $http.get("/api/v2013/thesaurus/domains/countries/terms",							{ cache: true }).then(function (o) { return $filter("orderBy")(o.data, "name"); }); },
      usage		: function () { return $http.get("/api/v2013/thesaurus/domains/A7B77788-8C90-4849-9327-E181E9522F3A/terms",	{ cache: true }).then(function (o) { return o.data; }); },
      keywords  : function () { return $q.all([$http.get("/api/v2013/thesaurus/domains/1A22EAAB-9BBC-4543-890E-DEF913F59E98/terms", { cache: true }),
                               $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",   { cache: true })])
                           .then(function (o) { 
                                      var data = o[0].data;
                                      data.push(o[1].data)
                                      return Thesaurus.buildTree(data); 
                                    }); },
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
    $scope.$on("loadDocument", function(evt, info) {

      if(info.schema!="absPermit")
        return;
      
      if(info.identifier)
          $q.when(editFormUtility.documentExists(info.identifier),function(exists){
              $scope.documentExists = exists;           
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
        //document.amendmentsDescription = undefined;
      }
      if (document.providerConfidential) {
        document.providers = undefined;
      }
      if (document.informedConsentConfidential) {
        document.informedConsents = undefined;
      }
      if (document.geneticResourcesConfidential) {
        document.geneticResources = undefined;
        document.specimen     = undefined;
        document.taxonomy     = undefined;
        document.gisFiles     = undefined;
        document.gisMapCenter   = undefined;
      }
      if(!$scope.documentExists){
        document.amendmentIntent = undefined;
        document.amendmentsDescription = undefined;
      }
      if(!$scope.isOthers()){
        document.keywordOthers = undefined;
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
    $scope.isOthers = function(document) {

      document = document || $scope.document;
      if (!document || !document.keywords)
        return false;

      var qLibraries = Enumerable.from(document.keywords);

      return qLibraries.any(function (o) { return o.identifier == "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED"; });
      
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
