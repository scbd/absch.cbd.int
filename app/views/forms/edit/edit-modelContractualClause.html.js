define(['app', 'underscore', '/app/views/forms/edit/edit.js','/app/views/forms/edit/edit-resource-schema-base-directive.html.js'
       ], function (app, _) {

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
      },
      absSubjects   : function() {
        return $http.get("/api/v2013/thesaurus/domains/CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924/terms", { cache: true }).then(function(o){
          return o.data;
        });
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

      if(!$scope.isOtherSelected(document.languages))
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
