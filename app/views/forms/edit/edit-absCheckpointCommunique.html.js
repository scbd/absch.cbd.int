define(['app', '/app/views/forms/edit/edit.js'], function (app) {

  app.controller("editCheckpointCommunique", ["$scope", "authHttp", "$filter", "$q", "$controller", "IStorage",
   function ($scope, $http, $filter, $q, $controller, storage) {
    $controller('editController', {$scope: $scope});

    _.extend($scope.options, {
      permits         : function () {
            var permit = storage.documents.query("(type eq 'absPermit')",undefined,{cache:false});
            return $q.all(permit).then(function(o){
                //console.log(o.data);
                  var permits =  [];
                  o.data.Items.forEach(function(permit){
                    permits.push({"title": permit.title.en, "identifier": permit.identifier});
                  });
                  //console.log(permits)
                  return permits;
            });
        }
    });

    //==================================
    //
    //==================================
    //I think this is shared with absCheckpoint... perhas I should put it in base?
    $scope.$watch("document.gisFiles", function () {

      var qLinks = [];
      var qGis = [];

      if ($scope.document)
        qLinks = $scope.document.gisFiles || [];

      /* global L: true */ // JSHint for leaflet

      angular.forEach(qLinks, function (link) {
        qGis.push($http.get(link.url).then(function (res) { return L.geoJson(res.data); }));
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

      if (document.permitNotAvailable===true) {
        document.permit = undefined;
      }
      else {
        document.originCountries			= undefined;
        document.responsibleAuthority		= undefined;
        document.subjectMatter				= undefined;
        document.specimen					= undefined;
        document.taxonomy					= undefined;
        document.gisFiles					= undefined;
        document.gisMapCenter				= undefined;
        document.geneticRessourceUsers		= undefined;
        document.referenceOfInformedConsent = undefined;
        document.referenceOfAgreedTerms		= undefined;
        document.personeToWhomGranted		= undefined;
        document.responsibleAuthorities     = undefined;
      }
      if(document.date=='')
          document.date = undefined;

      if(document.dateFrom=='')
          document.dateFrom = undefined;

      if(document.dateTo=='')
          document.dateTo = undefined;

      if (/^\s*$/g.test(document.notes))
        document.notes = undefined;

      return document;
    };

    //==================================
    //
    //==================================
    $scope.isPermitNotAvailable = function (document) {
      document = document || $scope.document;

      return document &&
           document.permitNotAvailable;
    };

    $scope.setDocument();
  }]);
});
