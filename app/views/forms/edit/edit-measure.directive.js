require("app").directive("editMeasure", [ "authHttp", "Enumerable", "$filter", "$q", "guid", function ($http, Enumerable, $filter, $q, guid) {

	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/edit/edit-measure.directive.html",
		replace    : true,
		transclude : false,
		scope      : {},
		controller : ["$scope", "authHttp", "guid", "$filter", "Thesaurus", "$q", "$location", "IStorage", "authentication", "Enumerable", "editFormUtility", function ($scope, $http, guid, $filter, thesaurus, $q, $location, storage, authentication, Enumerable, editFormUtility)
		{
			$scope.status   = "";
			$scope.error    = null;
			$scope.document = null;
			$scope.tab      = "edit";
			$scope.review   = { locale: "en" };
			$scope.options  = {
				countries		: function() { return $http.get("/api/v2013/thesaurus/domains/countries/terms",								{ cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
				regions			: function() { return $http.get("/api/v2013/thesaurus/domains/regions/terms",								{ cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
				libraries		: function() { return $http.get("/api/v2013/thesaurus/domains/cbdClearingHouses/terms",						{ cache: true }).then(function(o){ return o.data; }); },
				languages		: function() { return $http.get("/api/v2013/thesaurus/domains/52AFC0EE-7A02-4EFA-9277-8B6C327CE21F/terms",	{ cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
				absMeasures		: function() { return $http.get("/api/v2013/thesaurus/domains/50616B56-12F3-4C46-BC43-2DFC26679177/terms",	{ cache: true }).then(function(o){ return o.data; }); },
				typeOfDocuments	: function() { return $http.get("/api/v2013/thesaurus/domains/144CF550-7629-43F3-817E-CACDED34837E/terms",	{ cache: true }).then(function(o){ return o.data; }); },
				jurisdiction	: function() { return $http.get("/api/v2013/thesaurus/domains/7A56954F-7430-4B8B-B733-54B8A5E7FF40/terms",	{ cache: true }).then(function(o){ return o.data; }); },
				status			: function() { return $http.get("/api/v2013/thesaurus/domains/ED7CDBD8-7762-4A84-82DD-30C01458A799/terms",	{ cache: true }).then(function(o){ return o.data; }); },
				regions			: function() { return $q.all([$http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }), 
															  $http.get("/api/v2013/thesaurus/domains/regions/terms",   { cache: true })]).then(function(o) {
																return Enumerable.from($filter("orderBy")(o[0].data, "name")).union(
																	   Enumerable.from($filter("orderBy")(o[1].data, "name"))).toArray();
															  })
				},
				documentLinksExt :        [{ model:"language",        title:"Language",         required:true, options: $http.get("/api/v2013/thesaurus/domains/ISO639-2/terms", { cache: true }).then(function(o){ return $scope.options.documentLinksExt       [0].options = $filter("orderBy")(o.data, "name"); }) }],
				documentTranslationsExt : [{ model:"language",        title:"Language",         required:true, options: $http.get("/api/v2013/thesaurus/domains/ISO639-2/terms", { cache: true }).then(function(o){ return $scope.options.documentTranslationsExt[0].options = $filter("orderBy")(o.data, "name"); }) },
										   { model:"translationType", title:"Translation Type", required:true, options: $http.get("/api/v2013/thesaurus/domains/19E3C535-2919-4804-966C-E62728507291/terms", { cache: true }).then(function(o){ return $scope.options.documentTranslationsExt[1].options = $filter("orderBy")(o.data, "name"); }) },]
			};



			//==================================
			//
			//==================================
			function load(identifier) {

				$scope.status = "loading";

				var qDocument = null;

				if(identifier) {
					qDocument = editFormUtility.load(identifier, "measure");
				}
				else {
					qDocument = {
						header: {
							identifier: guid(),
							schema   : "measure",
							languages: ["en"]
						},
						government: $scope.userGovernment() ? { identifier: $scope.userGovernment() } : undefined,
						libraries: [{ identifier: "cbdLibrary:abs-ch" }]
					};
				}

				$q.when(qDocument).then(function(doc) {

					$scope.tab    = "edit";
					$scope.status = "ready";
					$scope.document = doc;

				}).catch(function(err) {

					$scope.onError(err.data, err.status)
					throw err;

				});
			}

			//==================================
			//
			//==================================
			$scope.$on("loadDocument", function(evt, info) {

				if(info.schema!="measure")
					return;

				load(info.identifier);
			});

			//==================================
			//
			//==================================
			$scope.$on("documentInvalid", function(){
				$scope.tab = "review";
			});

			//==================================
			//
			//==================================
			$scope.$watch("tab", function(tab) {

				if(tab == "edit")   { $scope.prevTab = "edit";  $scope.nextTab = "absch"; }
				if(tab == "absch")  { $scope.prevTab = "edit";  $scope.nextTab = "review"; }
				if(tab == "review") { $scope.prevTab = "absch"; $scope.nextTab = "review"; }

				if(tab == "review") 
					validate();
			});


			//==================================
			//
			//==================================
			$scope.isInLibrary = function(name, document) {
				document = document || $scope.document;

				if (!document || !document.libraries)
					return false;

				var qLibraries = Enumerable.from(document.libraries);

				if(name=="chm"  ) return qLibraries.any(function(o){ return o.identifier == "cbdLibrary:chm"    });
				if(name=="absch") return qLibraries.any(function(o){ return o.identifier == "cbdLibrary:abs-ch" });
				if(name=="bch"  ) return qLibraries.any(function(o){ return o.identifier == "cbdLibrary:bch"    });
				if(name=="ebsa" ) return qLibraries.any(function(o){ return o.identifier == "cbdLibrary:ebsa"   });

				return false;
			}

			
			//==================================
			//
			//==================================
			$scope.isJurisdictionRegional = function(document) {
				document = document || $scope.document;

				if (!document || !document.jurisdiction)
					return false;

				var qJurisdiction = Enumerable.from([document.jurisdiction]);

				return qJurisdiction.any(function (o) { return o.identifier == "528B1187-F1BD-4479-9FB3-ADBD9076D361" });
			}

			//==================================
			//
			//==================================
			$scope.isJurisdictionSubNationalOrCommunity = function (document) {
				document = document || $scope.document;

				if (!document || !document.jurisdiction)
					return false;

				var qJurisdiction = Enumerable.from([document.jurisdiction]);

				var response  = qJurisdiction.any(function (o) { return o.identifier == "DEBB019D-8647-40EC-8AE5-10CA88572F6E" });
				    response |= qJurisdiction.any(function (o) { return o.identifier == "9627DF2B-FFAC-4F85-B075-AF783FF2A0B5" });

				return response;
			}

			//==================================
			//
			//==================================
			$scope.isNotLegallyBinded = function (document) {
				document = document || $scope.document;

				if (!document || !document.status)
					return false;

				var qStatus = Enumerable.from([document.status]);

				return qStatus.any(function (o) { return o.identifier == "C9E33B71-D92A-4AC1-96E3-A136A1FDF135" });
			}

			//==================================
			//
			//==================================
			$scope.isLegallyBinded = function (document) {
				document = document || $scope.document;

				if (!document || !document.status)
					return false;

				var qStatus = Enumerable.from([document.status]);

				return qStatus.any(function (o) { return o.identifier == "97D6C7E6-5EAD-48B2-BD8D-DAB77153FF9C" });
			}

			//==================================
			//
			//==================================
			$scope.isRetired = function (document) {
				document = document || $scope.document;

				if (!document || !document.status)
					return false;

				var qStatus = Enumerable.from([document.status]);

				return qStatus.any(function (o) { return o.identifier == "0F8F3A6D-1BF7-4468-8BFC-8DD52F7F6E50" });
			}

			//==================================
			//
			//==================================
			$scope.isLoading = function() {
				return $scope.status=="loading";
			}

			//==================================
			//
			//==================================
			$scope.hasError = function() {
				return $scope.error!=null;
			}

			//==================================
			//
			//==================================
			$scope.userGovernment = function() {
				return $scope.$root.user.government;
			};
		
			//==================================
			//
			//==================================
			$scope.getCleanDocument = function(document) {

				document = document || $scope.document;

				if (!document)
					return undefined;

				document = angular.fromJson(angular.toJson(document));

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

			//==================================
			//
			//==================================
			function validate() {

				$scope.validationReport = null;

				var oDocument = $scope.reviewDocument = $scope.getCleanDocument();

				return storage.documents.validate(oDocument).then(function(success) {
				
					$scope.validationReport = success.data;
					return !!(success.data && success.data.errors && success.data.errors.length);

				}).catch(function(error) {

					$scope.onError(error.data);
					return true;

				});
			}

			//==================================
			//
			//==================================
			$scope.isFieldValid = function(field) {
				if (field && $scope.validationReport && $scope.validationReport.errors)
					return !Enumerable.from($scope.validationReport.errors).any(function(x){return x.property==field})

				return true;
			}

			//==================================
			//
			//==================================
			$scope.onError = function(error, status)
			{
				$scope.status = "error";

				if (status == "notAuthorized") {
					$scope.status = "hidden";
					$scope.error  = "You are not authorized to modify this record";
				}
				else if (status == 404) {
					$scope.status = "hidden";
					$scope.error  = "Record not found.";
				}
				else if (status == "badSchema") {
					$scope.status = "hidden";
					$scope.error  = "Record type is invalid.";
				}
				else if (error.Message)
					$scope.error = error.Message
				else
					$scope.error = error;
			}
			
			//==================================
			//
			//==================================
			$scope.loadRecords = function(identifier, schema) {

				if (identifier) { //lookup single record
					var deferred = $q.defer();

					storage.documents.get(identifier, { info: "" })
						.then(function(r) {
							deferred.resolve(r.data);
						}, function(e) {
							if (e.status == 404) {
								storage.drafts.get(identifier, { info: "" })
									.then(function(r) { deferred.resolve(r.data)},
										  function(e) { deferred.reject (e)});
							}
							else {
								deferred.reject (e)
							}
						});
					return deferred.promise;
				}

				//Load all record of specified schema;

				var sQuery = "type eq '" + encodeURI(schema) + "'";

				return $q.all([storage.documents.query(sQuery, null, { cache: true }), 
							   storage.drafts   .query(sQuery, null, { cache: true })])
					.then(function(results) {
						var qResult = Enumerable.from (results[0].data.Items)
												.union(results[1].data.Items, "$.identifier");
						return qResult.toArray();
					});
			}
		}]
	}
}])


	//============================================================
	//
	//
	//============================================================
	.directive("editMeasureAbs", function () {
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
	})
;