import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import 'views/forms/edit/edit-resource-schema-base-directive';
import 'views/forms/view/view-resource.directive';

  export { default as template } from './edit-communityProtocol.html';

  export default ["$scope", "$http", "$filter", "Thesaurus", "$q", "Enumerable", "$controller", "IStorage", "$location",
                function ($scope, $http, $filter, Thesaurus, $q, Enumerable, $controller, storage, $location) {


    $scope.path=$location.path();

    //$scope.organizationsRef = [];
    $controller('editController', {$scope: $scope});

    _.extend($scope.options, {
      resourceTypes : function() {
        return $q.when($http.get("/api/v2013/thesaurus/domains/ED9BE33E-B754-4E31-A513-002316D0D602/terms", { cache: true })).then(function(o) {
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

//============================================================
    //
    //============================================================
    $scope.setDocument({aichiTargets: [{identifier: "AICHI-TARGET-16"}]}, true)
    .then(function(doc){
        if(doc.keywords)
            $scope.keywords = _.map(doc.keywords, function(t){return { value: t};});

        if(doc.countryRegions){
            $scope.setCountryRegions (doc.countryRegions)
        }
    });


  }];

