define(['app', '/app/views/forms/edit/edit.js'], function (app) {

  app.controller("editMeasure", ["$scope", "authHttp", "guid", "$filter", "Thesaurus", "$q", "$location", "IStorage", "authentication", "Enumerable", "editFormUtility", "$routeParams", "$controller", function ($scope, $http, guid, $filter, thesaurus, $q, $location, storage, authentication, Enumerable, editFormUtility, $routeParams, $controller) {
    $controller('editController', {$scope: $scope});

    $scope.options  = {
      countries		: function() { return $http.get("/api/v2013/thesaurus/domains/countries/terms",								{ cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
      regions			: function() { return $http.get("/api/v2013/thesaurus/domains/regions/terms",								{ cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
      libraries		: function() { return $http.get("/api/v2013/thesaurus/domains/cbdClearingHouses/terms",						{ cache: true }).then(function(o){ return o.data; }); },
      languages		: function() { return $http.get("/api/v2013/thesaurus/domains/52AFC0EE-7A02-4EFA-9277-8B6C327CE21F/terms",	{ cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
     
	absMeasures		: function() { return $q.all([$http.get("/api/v2013/thesaurus/domains/50616B56-12F3-4C46-BC43-2DFC26679177/terms", { cache: true }), 
												   $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",   { cache: true })]).then(function(o) {
													var data = o[0].data;
													data.push(o[1].data)
													return  data;
												  })},				
	typeOfDocuments	: function() {return $q.all([$http.get("/api/v2013/thesaurus/domains/144CF550-7629-43F3-817E-CACDED34837E/terms", { cache: true }), 
															   $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",   { cache: true })]).then(function(o) {
																var data = o[0].data;
																data.push(o[1].data)
																return  data;
															  })},	
	jurisdiction	: function () { return $q.all([$http.get("/api/v2013/thesaurus/domains/7A56954F-7430-4B8B-B733-54B8A5E7FF40/terms", { cache: true }), 
												   $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",   { cache: true })]).then(function(o) {
													var data = o[0].data;
													data.push(o[1].data)
													return  data;
												  })
	},				
      status			: function() { return $http.get("/api/v2013/thesaurus/domains/ED7CDBD8-7762-4A84-82DD-30C01458A799/terms",	{ cache: true }).then(function(o){ return o.data; }); },
      regions			: function() { return $q.all([$http.get("/api/v2013/thesaurus/domains/regions/terms", { cache: true }), 
                              $http.get("/api/v2013/thesaurus/domains/countries/terms",   { cache: true })]).then(function(o) {
                              return Enumerable.from($filter("orderBy")(o[0].data, "name")).union(
                                   Enumerable.from($filter("orderBy")(o[1].data, "name"))).toArray();
                              })
      },
      documentLinksExt :        [{ model:"language",        title:"Language",         required:true, options: $http.get("/api/v2013/thesaurus/domains/ISO639-2/terms", { cache: true }).then(function(o){ return $scope.options.documentLinksExt       [0].options = $filter("orderBy")(o.data, "name"); }) }],
      documentTranslationsExt : [{ model:"language",        title:"Language",         required:true, options: $http.get("/api/v2013/thesaurus/domains/52AFC0EE-7A02-4EFA-9277-8B6C327CE21F/terms", { cache: true }).then(function(o){ return $scope.options.documentTranslationsExt[0].options = $filter("orderBy")(o.data, "name"); }) },
                     { model:"translationType", title:"Translation Type", required:true, options: $http.get("/api/v2013/thesaurus/domains/19E3C535-2919-4804-966C-E62728507291/terms", { cache: true }).then(function(o){ return $scope.options.documentTranslationsExt[1].options = $filter("orderBy")(o.data, "name"); }) },]
    };

    //==================================
    //
    //==================================
    $scope.getCleanDocument = function(document) {

      document = document || $scope.document;

      if (!document)
        return undefined;

      document = angular.fromJson(angular.toJson(document));

      if(document.expires!==undefined)
        delete document.expires;

      if (!$scope.isInLibrary("absch", document))
        document.absMeasures = undefined;

      if (!$scope.isInLibrary("bch", document)){
        document.cpbSubjectAreas = undefined;
        document.cpbSubjectLmos  = undefined;
      }

      if (!$scope.isJurisdictionRegional(document))
        document.jurisdictionRegions = undefined;

      if (!$scope.isJurisdictionSubNationalOrCommunity(document))
        document.jurisdictionName = undefined;

      if (!$scope.isNotLegallyBinded(document))
        document.adoption = undefined;

      if (!$scope.isLegallyBinded(document))
        document.entryIntoForce = undefined;

      if (!$scope.isRetired(document))
        document.retired = undefined;

      if (/^\s*$/g.test(document.notes))
        document.notes = undefined;

      return document
    };

    $scope.setDocument({libraries: [{ identifier: "cbdLibrary:abs-ch" }]});

    //==================================
	//
	//==================================
	$scope.isTypeOther = function (document) {
		document = document || $scope.document;

		if (!document || !document.type)
			return false;

		var qStatus = Enumerable.from([document.type]);

		return qStatus.any(function (o) { return o.identifier == "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED" });
	}
	
  }]);


	//============================================================
	//
	//
	//============================================================
	app.directive("editMeasureAbs", function () {
		return {
			restrict: "EAC",
			templateUrl: "/app/views/forms/edit/edit-measure.directive/abs",
			replace: true,
			transclude: false,
			require : "?ngModel",
			scope: {
				binding     : "=ngModel",
				locales     : "=",
				termsFn     : "&terms",
				required    : "@",
				layout      : "@"
			},
			link: function ($scope, $element, $attr, ngModelController) 
			{
				$scope.identifiers = null;
				$scope.sections    = null;
				$scope.terms       = null;
				$scope.rootTerms   = [];

				$scope.$watch("terms",        $scope.onTerms);
				$scope.$watch("binding",      $scope.load);
				$scope.$watch("binding", function() {
					ngModelController.$setViewValue($scope.binding);
				});

				$scope.$watch(function(){return angular.toJson($scope.identifiers) }, $scope.save); //use tojson to detect changes
				$scope.$watch(function(){return angular.toJson($scope.sections   ) }, $scope.save);

				$scope.init();
	
				if(!$attr["class"])
					$element.addClass("list-unstyled");

			},
			controller: ["$scope", "$q", "Thesaurus", "Enumerable", function ($scope, $q, thesaurus, Enumerable) 
			{
				//==============================
				//
				//==============================
				$scope.init = function() {
					$scope.setError(null);
					$scope.__loading = true;

					$q.when($scope.termsFn(), 
						function(data) { // on success
							$scope.__loading = false;
							$scope.terms     = data;
						}, function(error) { // on error
							$scope.__loading = false;
							$scope.setError(error);
						});
				}

				//==============================
				//
				//==============================
				$scope.load = function() 
				{
					if (!$scope.terms) // Not initialized
						return;

					var oNewIdentifiers = {};
					var oNewSections    = {};

					if(!$.isArray($scope.terms))
						throw "Type must be array";

					if($scope.binding) {

						if(!$.isArray($scope.binding))
							throw "Type must be array";

						for(var i=0; i<$scope.binding.length; ++i)
						{
							oNewIdentifiers[$scope.binding[i].identifier] = true;
							oNewSections   [$scope.binding[i].identifier] = $scope.binding[i].section
						}
					}

					if (!angular.equals(oNewIdentifiers,  $scope.identifiers)) $scope.identifiers = oNewIdentifiers;
					if (!angular.equals(oNewSections,     $scope.sections   )) $scope.sections    = oNewSections;
				}

				//==============================
				//
				//==============================
				$scope.save = function() 
				{
					if(!$scope.identifiers)
						return;

					var oNewBinding = [];

					angular.forEach($scope.terms, function(term, i) 
					{
						if(term==undefined) return //IE8 BUG

						if($scope.identifiers[term.identifier])
						{
							var oTerm = { identifier : term.identifier };

							if($scope.sections[term.identifier])
								oTerm.section = $scope.sections[term.identifier];

							oNewBinding.push(oTerm);
						}
					});

					if($.isEmptyObject(oNewBinding))
						oNewBinding = undefined;

					if(!angular.equals(oNewBinding, $scope.binding))
						$scope.binding = oNewBinding;
				}

				//==============================
				//
				//==============================
				$scope.isRequired = function()
				{
					return $scope.required!=undefined 
						&& $.isEmptyObject($scope.binding);
				}

				//==============================
				//
				//==============================
				$scope.onTerms = function(refTerms) {

					$scope.rootTerms = [];

					if(refTerms)
					{
						if (($scope.layout||"tree") == "tree") //Default layout
							$scope.rootTerms = thesaurus.buildTree(refTerms);
						else
							$scope.rootTerms = Enumerable.from(refTerms).Select("o=>{identifier : o.identifier, name : o.name, title : o.title, description : o.description}").ToArray();
					}

					$scope.load();
				}

				//==============================
				//
				//==============================
				$scope.setError = function(error) {
					if (!error) {
						$scope.error = null;
						return;
					}

					if (error.status == 404) $scope.error = "Terms not found";
					else                     $scope.error = error.data || "unkown error";
				}

				$scope.$emit("getDocumentInfo", {});
			}]
		}
	});

});
