import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import 'views/forms/edit/edit-resource-schema-base-directive';
import '.views/forms/edit/view/view-resource.directive';

  app.controller("editModelContractualClause", ["$scope", "$http", "$filter", "Thesaurus", "$q", "Enumerable", "$controller", "IStorage", "$location",
                function ($scope, $http, $filter, Thesaurus, $q, Enumerable, $controller, storage, $location) {


    $scope.path=$location.path();

    //$scope.organizationsRef = [];
    $controller('editController', {$scope: $scope});

    _.extend($scope.options, {
      resourceTypes : function() {
        return $q.when($http.get("/api/v2013/thesaurus/domains/840427E5-E5AC-4578-B238-C81EAEEDBDD8/terms", { cache: true })).then(function(o) {
          return  Thesaurus.buildTree(o.data);
        })
      }, mccKeywords : function() {
        return $q.when($http.get("/api/v2013/thesaurus/domains/ABS-A1920-Keywords/terms", { cache: true })).then(function(o) {
          return  Thesaurus.buildTree(o.data);
        })
      }

    });
    //==================================
    //
    //==================================
    $scope.getCleanDocument = function() {

      var document = $scope.document;

      if (!document)
        return undefined;

      document = angular.fromJson(angular.toJson(document));

      if (/^\s*$/g.test(document.notes))
        document.notes = undefined;

      document.aichiTargets = undefined;

      if(!$scope.isOtherSelected(document.languages))
          document.languageName = undefined;

      if(!$scope.isOtherSelected(document.resourceTypes))
          document.resourceTypeName = undefined;


      if(document.organizations && document.organizations.length <=0)
          document.organizations = undefined;

        var documentCopy = _.clone(document)

        delete documentCopy.organizationsRef;
        return $scope.sanitizeDocument(documentCopy);
    };




  }]);

