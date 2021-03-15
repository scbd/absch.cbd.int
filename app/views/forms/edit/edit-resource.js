import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import 'views/forms/edit/edit-resource-schema-base-directive';
import '.views/forms/edit/view/view-resource.directive';

  app.controller("editResource", ["$scope", "$http", "$filter", "Thesaurus", "$q", "Enumerable", "$controller", "IStorage", "$location",
                function ($scope, $http, $filter, Thesaurus, $q, Enumerable, $controller, storage, $location) {


    $scope.path=$location.path();

    //$scope.organizationsRef = [];
    $controller('editController', {$scope: $scope});

    _.extend($scope.options, {
        resourceTypes   : function() {
            return $q.when(
                          $http.get("/api/v2013/thesaurus/domains/7E688641-F642-4C46-A024-70ED76D3DF40/terms", { cache: true })
                      ).then(function(o) {
                          var data = o.data;
                          return  Thesaurus.buildTree(data);
                      });
        }
    });

    //============================================================
    //
    //============================================================
    $scope.setTarget16 = function (document) {

        document = document || $scope.document;

        if (!document)
            return undefined;

        if(document.aichiTargets){
            var hasTarget16 = _.find(document.aichiTargets, { "identifier": "AICHI-TARGET-16"});

            if(!hasTarget16)
                document.aichiTargets.push({identifier: "AICHI-TARGET-16"});

            $scope.document.aichiTargets = document.aichiTargets;
        }
        else {
            $scope.document.aichiTargets = [{identifier: "AICHI-TARGET-16"}];
        }
    };

    //==================================
    //
    //==================================
    $scope.getCleanDocument = function() {

      $scope.setTarget16();

      var document = $scope.document;

      if (!document)
        return undefined;

      document = angular.fromJson(angular.toJson(document));

      if (/^\s*$/g.test(document.notes))
        document.notes = undefined;

        document.languages = undefined;
        document.languageName = undefined;


      if(!$scope.isOtherSelected(document.resourceTypes))
          document.resourceTypeName = undefined;

      if(document.organizations && document.organizations.length <=0)
          document.organizations = undefined;

        var documentCopy = _.clone(document);

        delete documentCopy.organizationsRef;

        return $scope.sanitizeDocument(documentCopy);
    };


  }]);

