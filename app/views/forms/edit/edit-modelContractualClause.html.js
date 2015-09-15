define(['app', 'underscore', '/app/views/forms/edit/edit.js','/app/views/forms/edit/edit-resource-schema-base-directive.html.js'
       ], function (app, _) {

  app.controller("editModelContractualClause", ["$scope", "$http", "$filter", "Thesaurus", "$q", "Enumerable", "$controller", "IStorage", "$location",
                function ($scope, $http, $filter, Thesaurus, $q, Enumerable, $controller, storage, $location) {


    $scope.path=$location.path();

    //$scope.organizationsRef = [];
    $controller('editController', {$scope: $scope});

    _.extend($scope.options, {
      languages     : function() {
        return $q.all([
          $http.get("/api/v2013/thesaurus/domains/52AFC0EE-7A02-4EFA-9277-8B6C327CE21F/terms", { cache: true }),
          $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",   { cache: true })
        ]).then(function(o) {
          var data = $filter("orderBy")(o[0].data, "name");
          data.push(o[1].data)
          return  data;
        })
      },
      resourceTypes : function() {
        return $q.all([
          $http.get("/api/v2013/thesaurus/domains/840427E5-E5AC-4578-B238-C81EAEEDBDD8/terms", { cache: true }),
          $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",   { cache: true })
        ]).then(function(o) {
          var data = o[0].data;
          data.push(o[1].data)
          return  Thesaurus.buildTree(data);
        })
      },
      absSubjects   : function() {
        return $http.get("/api/v2013/thesaurus/domains/CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924/terms", { cache: true }).then(function(o){
          return o.data;
        });
      },
      documentLinksExt : [{
        model:"language",
        title:"Language",
        required:true,
        options: $http.get("/api/v2013/thesaurus/domains/ISO639-2/terms", { cache: true }).then(function(o){
            $scope.options.documentLinksExt[0].options = $filter("orderBy")(o.data, "name");
              _.each($scope.options.documentLinksExt[0].options, function(element) {
                    element.__value = element.name;
                  });
              return $scope.options.documentLinksExt[0].options;
        })
      }],
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


        var documentCopy = _.clone(document)

        delete documentCopy.organizationsRef;
      
      return documentCopy;
    };
    
    if(_.contains(['modelContractualClause', 'resource'],$scope.type))
      $scope.setDocument({libraries: [{ identifier: "cbdLibrary:abs-ch" }]}, true);
    else
      $scope.setDocument({}, true);
      
    $scope.$on("loadDocument", function(evt, info) {
        var loadRecords = [];
        _.each($scope.document.organizations, function(org){
            loadRecords.push($scope.loadRecords(org.identifier));
        });
        $q.all(loadRecords).then(function(data){
            $scope.document.organizationsRef = data;
        })
    });

    $scope.$watch("document.organizationsRef", function(newValue){

        if(newValue){
            $scope.document.organizations = [];
            _.each(newValue, function(org){
                $scope.document.organizations.push({identifier: org.header.identifier})
            });

        }
    });

    // //==================================
	// //
	// //==================================
	$scope.loadRecords = function(identifier) {


		if (identifier) { //lookup single record
			var deferred = $q.defer();

			storage.documents.get(identifier)
				.then(function(r) {
					deferred.resolve(r.data);
				}, function(e) {
					if (e.status == 404) {
						storage.drafts.get(identifier)
							.then(function(r) { deferred.resolve(r.data)},
								  function(e) { deferred.reject (e)});
					}
					else {
						deferred.reject (e)
					}
				});
			return deferred.promise;
		}

	}


  }]);
});
