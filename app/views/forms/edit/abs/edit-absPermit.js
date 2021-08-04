import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import 'services/main';
import 'views/forms/view/abs/view-abs-permit.directive';

  export { default as template } from './edit-absPermit.html';

  export default ["$scope", "realm", "$http", "Thesaurus", "guid", "$filter", "$q", "Enumerable",
                                    "editFormUtility", "$controller","IStorage","$location", "commonjs",
   function ($scope, realm, $http, Thesaurus, guid, $filter, $q, Enumerable, editFormUtility, $controller, storage, $location, commonjs) {
    $controller('editController', {$scope: $scope});

    $scope.path= $location.path();

    _.extend($scope.options, {
      usages		: function () { return $http.get("/api/v2013/thesaurus/domains/A7B77788-8C90-4849-9327-E181E9522F3A/terms",	{ cache: true }).then(function (o) { return o.data; }); },
      keywords  : function () { return $q.all([$http.get("/api/v2013/thesaurus/domains/1A22EAAB-9BBC-4543-890E-DEF913F59E98/terms", { cache: true }),
                               $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",   { cache: true })])
                           .then(function (o) {
                                      var data = o[0].data;
                                      data.push(o[1].data)
                                      return Thesaurus.buildTree(data);
                                    }); },
     permits    : function () {return commonjs.loadSchemaDocumentsForDropdown('absPermit', $scope.document.header.identifier);},
    });


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

      $scope.onContactQuery = function(searchText){
  
          var queryOptions = {
          schemas : ['contact', 'authority'],
          realm : realm.value,
          searchText: searchText,
          query : `(schema_s:authority AND government_s:${$scope.document.government.identifier}) OR (schema_s:contact)`
          }
          return $scope.onBuildDocumentSelectorQuery(queryOptions);
      }

       $scope.onBuildQuery = function(searchText, schema){
        
           var queryOptions = {
               schemas	  : [schema],
               realm     : realm.value,
               searchText: searchText
           }
           if ($scope.document && $scope.document.government)
                queryOptions.government = $scope.document.government.identifier;

           return $scope.onBuildDocumentSelectorQuery(queryOptions);
       }


       $scope.onBuildHideSelfQuery = function(searchText){
         
          var queryOptions = {
              schemas	  : ['absPermit'],
              realm     : realm.value,
              fieldQueries : [],
              searchText: searchText
          }
          //queryOptions.identifier = (($scope.document||{​​​​​}​​​​​).header||{​​​​​}​​​​​).identifier
          if ($scope.document && $scope.document.government)
                queryOptions.government = $scope.document.government.identifier;

          return $scope.onBuildDocumentSelectorQuery(queryOptions);
        }
    //==================================
    //
    //==================================
    $scope.$on("loadDocument", function(evt, info) {

      if(info.schema!="absPermit")
        return;

      if(info.identifier)//$scope.status=="loading"
          $q.when(editFormUtility.documentExists(info.identifier),function(exists){
              $scope.documentExists = exists;
             
              //amendment intent should be entered by users for every edit/ clear it on load if any from previous update
              if($scope.document.amendmentIntent != undefined){                
                if($scope.document.amendmentIntent == 1)
                  $scope.isIRCCRevoked = true;
                  
                if(!$scope.isIRCCRevoked)  
                  $scope.document.amendmentIntent = undefined;
              }

              if(!$scope.isIRCCRevoked && $scope.document.amendmentDescription)
                $scope.document.amendmentDescription = undefined;

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
      
      if (!document.picGranted) {
        document.picInformation = undefined;
        document.picDocuments = undefined;
      }

      if (!document.matEstablished) {
        document.matInformation = undefined;
        document.matDocuments = undefined;
      }

      if (document.gisFiles && document.gisFiles.length===0) {
        document.gisFiles = undefined;
      }

      if (document.amendedPermits && document.amendedPermits.length===0) {
        document.amendedPermits = undefined;
      }

      if (!document.amendedPermits) {
        document.consentedAmendment = undefined;
        //document.amendmentDescription = undefined;
      }
      if (document.providersConfidential) {
        document.providers = undefined;
      }
      if (document.entitiesToWhomPICGrantedConfidential) {
        document.entitiesToWhomPICGranted = undefined;
      }
      if(document.usagesConfidential){
          document.usages = undefined;
      }
      if (document.dateOfExpiry=="") {
        document.dateOfExpiry = undefined;
      }
      if (document.subjectMatterConfidential) {
        document.subjectMatter = undefined;
      }
      if(!$scope.documentExists){
        document.amendmentIntent = undefined;
        document.amendmentDescription = undefined;
      }
      else
        document.amendmentIntent = 0;

      if(!$scope.isOthers()){
        document.keywordOther = undefined;
      }
      if (/^\s*$/g.test(document.notes))
        document.notes = undefined;

      return $scope.sanitizeDocument(document);
    };


    //==================================
    //
    //==================================
    $scope.isCommercial = function (document) {
      document = document || $scope.document;

      if (!document || !document.usages)
        return false;

      var qLibraries = Enumerable.from(document.usages);

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
  }];

