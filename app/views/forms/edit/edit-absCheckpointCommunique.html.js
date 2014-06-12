define(['app', '/app/views/forms/edit/edit.js'], function (app) {

  app.controller("editCheckpointCommunique", ["$scope", "authHttp", "guid", "$filter", "Thesaurus", "$q", "$location", "IStorage", "authentication", "Enumerable", "editFormUtility", "$routeParams", "$controller", function ($scope, $http, guid, $filter, thesaurus, $q, $location, storage, authentication, Enumerable, editFormUtility, $routeParams, $controller) {
    $controller('editController', {$scope: $scope});

    $scope.options  = {
      countries		: function () { return $http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }).then(function (o) { return $filter("orderBy")(o.data, "name"); }); },
      permits         : function () { return $http.get("/api/v2013/index/select?cb=1400692102906&fl=identifier_s,title_t,createdDate_dt,&q=realm_ss:absch AND schema_s:absPermit AND NOT version_s:*&start=0&wt=json",  { cache: true })
                  .then(function(o){ 
                    console.log(o.data);
                       
                        var permits =  [];
                        o.data.response.docs.forEach(function(permit){
                           
                          permits.push({"title": permit.title_t, "identifier": permit.identifier_s});
                        }); 
                        console.log(permits);
                        return	permits;
                      });},
    };

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
      }

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
