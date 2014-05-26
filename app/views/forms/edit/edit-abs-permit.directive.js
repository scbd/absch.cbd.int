define(['app'], function (app) {

app.directive("editAbsPermit", [ function () {

	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/edit/edit-abs-permit.directive.html",
		replace    : true,
		transclude : false,
		scope      : {},
		controller : ["$scope", "$q", "authHttp", "Enumerable", "$filter", "guid", "IStorage", "authentication", "editFormUtility", "Thesaurus", function ($scope, $q, $http, Enumerable, $filter, guid, storage, authentication, editFormUtility, Thesaurus)
		{
			$scope.tab = "edit";
			$scope.status   = "";
			$scope.error    = null;
			$scope.document = null;
			$scope.review   = { locale : "en" };
			$scope.options  = {
				countries	: function () { return $http.get("/api/v2013/thesaurus/domains/countries/terms",							{ cache: true }).then(function (o) { return $filter("orderBy")(o.data, "name"); }); },
				usage		: function () { return $http.get("/api/v2013/thesaurus/domains/A7B77788-8C90-4849-9327-E181E9522F3A/terms",	{ cache: true }).then(function (o) { return o.data; }); },
				keywords	: function () { return $http.get("/api/v2013/thesaurus/domains/1A22EAAB-9BBC-4543-890E-DEF913F59E98/terms", { cache: true }).then(function (o) { return Thesaurus.buildTree(o.data); }); },
			};


			//==================================
			//
			//==================================
			$scope.scrollToTop = function() {
        		$("body, html").animate({scrollTop: 0}, "slow");
      		};


			//==================================
			//
			//==================================
			function load(identifier) {

				$scope.status = "loading";

				var qDocument = null;

				if(identifier) {
					qDocument = editFormUtility.load(identifier, "absPermit");


				}
				else {
					qDocument = {
						header: {
							identifier: guid(),
							schema   : "absPermit",
							languages: ["en"]
						},
						government: $scope.userGovernment() ? { identifier: $scope.userGovernment() } : undefined
					};
				}

				$q.when(qDocument).then(function(doc) {

					$scope.tab    = "edit";
					$scope.status = "ready";
					$scope.document = doc;

				}).catch(function(err) {

					$scope.onError(err.data, err.status);
					throw err;

				});
			}

			//==================================
			//
			//==================================
			$scope.$on("loadDocument", function(evt, info) {

				if(info.schema!="absPermit")
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

				if(tab == "review")
					validate();
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

			//==================================
			//
			//==================================
			$scope.getCleanDocument = function(document) {

				document = document || $scope.document;

				if (!document)
					return undefined;

				document = angular.fromJson(angular.toJson(document));

				if (!document.consentGranted) {
					document.consentInformation = undefined;
					document.consentDocuments = undefined;
				}

				if (!document.mutuallyAgreedTermsEstablished) {
					document.mutuallyAgreedTermsInformation = undefined;
					document.mutuallyAgreedTermsDocuments = undefined;
				}

				if (document.gisFiles && document.gisFiles.length===0) {
					document.gisFiles = undefined;
				}

				if (document.amendedPermits && document.amendedPermits.length===0) {
					document.amendedPermits = undefined;
				}

				if (!document.amendedPermits) {
					document.consentedAmendment = undefined;
					document.amendmentsDescription = undefined;
				}
				if (document.providerConfidential) {
					document.providers = undefined;
				}
				if (document.informedConsentConfidential) {
					document.informedConsents = undefined;
				}
				if (document.geneticResourcesConfidential) {
					document.geneticResources	= undefined;
					document.specimen			= undefined;
					document.taxonomy			= undefined;
					document.gisFiles			= undefined;
					document.gisMapCenter		= undefined;
				}

				if (/^\s*$/g.test(document.notes))
					document.notes = undefined;

				return document;
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
					return !Enumerable.from($scope.validationReport.errors).any(function(x){return x.property==field;});

				return true;
			};

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
					$scope.error = error.Message;
				else
					$scope.error = error;
			};
			
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
									.then(function(r) { deferred.resolve(r.data);},
										  function(e) { deferred.reject (e);});
							}
							else {
								deferred.reject (e);
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
			};

			//==================================
			//
			//==================================
			$scope.isCommercial = function (document) {
				document = document || $scope.document;

				if (!document || !document.usage)
					return false;

				var qLibraries = Enumerable.from(document.usage);

				return qLibraries.Any(function (o) { return o.identifier == "5E833A3F-87D1-4ADD-8701-9F1B76383017"; });
			};

			//==================================
			//
			//==================================
			$scope.isLoading = function() {
				return $scope.status=="loading";
			};

			//==================================
			//
			//==================================
			$scope.hasError = function() {
				return $scope.error!==null;
			};

			//==================================
			//
			//==================================
			$scope.userGovernment = function() {
				return $scope.$root.user.government;
			};

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
			$scope.saveContact = function() {

				if(!$scope.editedProperty)
					return;

				$scope.document[$scope.editedProperty] = clone($scope.editedContact);
			};

			//==================================
			//
			//==================================
			function clone(entity)
			{
				return angular.fromJson(angular.toJson(entity));
			}
			
			$scope.$emit("getDocumentInfo", {});
		}]
	};
}]);
});