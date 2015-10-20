define(['app', 'underscore', '/app/views/forms/edit/edit.js','/app/views/forms/edit/edit-resource-schema-base-directive.html.js'], function (app, _) {

  app.controller("editResource", ["$scope", "$http", "$filter", "Thesaurus", "$q", "Enumerable", "$controller", "IStorage", "$location",
                function ($scope, $http, $filter, Thesaurus, $q, Enumerable, $controller, storage, $location) {


    $scope.path=$location.path();

    //$scope.organizationsRef = [];
    $controller('editController', {$scope: $scope});

    _.extend($scope.options, {
      resourceTypes : function() {
        return $q.all([
          $http.get("/api/v2013/thesaurus/domains/83BA4728-A843-442B-9664-705F55A8EC52/terms", { cache: true }),
          $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",   { cache: true })
        ]).then(function(o) {
          var data = o[0].data;
          data.push(o[1].data)
          return  Thesaurus.buildTree(data);
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

        document.languages = undefined;
        document.languageName = undefined;

      if(!$scope.isOtherSelected(document.resourceTypes))
          document.resourceTypeName = undefined;

      if(document.organizations && document.organizations.length <=0)
          document.organizations = undefined;

        var documentCopy = _.clone(document)

        delete documentCopy.organizationsRef;
      return documentCopy;
    };


  }]);
});
