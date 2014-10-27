define(['app', '/app/views/forms/edit/edit.js',
        '/app/views/forms/edit/permit-selection-directive.html.js'], function (app) {

  app.controller("editCheckpointCommunique", ["$scope", "authHttp", "$filter", "$q", "$controller", "IStorage","underscore","Thesaurus","Enumerable",
   function ($scope, $http, $filter, $q, $controller, storage, _, Thesaurus, Enumerable) {
    $controller('editController', {$scope: $scope});

    $scope.checkpointList = [];
    _.extend($scope.options, {
      permits         : function () {
            var permit = storage.documents.query("(type eq 'absPermit')",undefined,{cache:false});
            return $q.all(permit).then(function(o){
                  var permits =  [];
                  o.data.Items.forEach(function(permit){
                    permits.push({"title": permit.title.en, "identifier": permit.identifier});
                  });
                  return permits;
            });
        },
    keywords  : function () { return $q.all([$http.get("/api/v2013/thesaurus/domains/1A22EAAB-9BBC-4543-890E-DEF913F59E98/terms", { cache: true }),
                                            $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",   { cache: true })])
                                       .then(function (o) {
                                                  var data = o[0].data;
                                                  data.push(o[1].data)
                                                  return Thesaurus.buildTree(data);
                                        }); },
      checkpoints         : function () {
            var checkpoint = storage.documents.query("(type eq 'absCheckpoint')",undefined,{body:true,cache:false});
            return $q.all(checkpoint).then(function(o){
                 var checkpoints =  [];
                  o.data.Items.forEach(function(checkpoint){
                    checkpoints.push({"title": checkpoint.title.en,"identifier": checkpoint.identifier, "body": checkpoint.body});
                  });
                  $scope.checkpointList = checkpoints;
                  return checkpoints;
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
// console.log(document.permitNotAvailable, document.permitNotAvailable===true)
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
        document.keywords           		= undefined;
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

      if(!$scope.isOthers()){
        document.keywordOthers = undefined;
      }
      
      if(document.checkpointSelected){
            document.checkpoint = [];
            document.checkpointSelected.forEach(function(checkpoint){

                var selected = _.where($scope.checkpointList,{"identifier": checkpoint.identifier});
                if(selected && selected.length > 0 && selected[0].body)
                    selected = selected[0].body;
                    // console.log(_.isEmpty(selected));
                if(!_.isEmpty(selected))
                    document.checkpoint.push(selected);
            });
            if(_.isEmpty(document.checkpoint))
                document.checkpoint = undefined;
      }
      else
          document.checkpoint = undefined;
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

    $scope.isOthers = function(document) {

      document = document || $scope.document;
      if (!document || !document.keywords)
        return false;

      var qLibraries = Enumerable.from(document.keywords);

      return qLibraries.any(function (o) { return o.identifier == "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED"; });

    };


    $scope.setDocument();
  }]);
});
