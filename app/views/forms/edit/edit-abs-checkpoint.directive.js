define(['app'], function (app) {

app.directive("editAbsCheckpoint", [ function () {

	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/edit/edit-abs-checkpoint.directive.html",
		replace    : true,
		transclude : false,
		scope      : {},
		controller : ["$scope", "$q", "authHttp", "Enumerable", "$filter", "guid", "IStorage", "authentication", "editFormUtility", function ($scope, $q, $http, Enumerable, $filter, guid, storage, authentication, editFormUtility)
		{
			$scope.status   = "";
			$scope.error    = null;
			$scope.document = null;
			$scope.review   = { locale : "en" };
			$scope.options  = {
				countries		: function () { return $http.get("/api/v2013/thesaurus/domains/countries/terms",							{ cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
				jurisdictions	: function () {return $q.all([$http.get("/api/v2013/thesaurus/domains/D7BD5BDE-A6B9-4261-B788-16839CCC4F7E/terms", { cache: true }), 
															   $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",   { cache: true })]).then(function(o) {
																var data = o[0].data;
																data.push(o[1].data)
																return  data;
															  })
			}
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
					qDocument = editFormUtility.load(identifier, "absCheckpoint");
				}
				else {
					qDocument = {
						header: {
							identifier: guid(),
							schema   : "absCheckpoint",
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

				if(info.schema!="absCheckpoint")
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
			$scope.getCleanDocument = function(document) {

				document = document || $scope.document;

				if (!document)
					return undefined;

				document = angular.fromJson(angular.toJson(document));

				if (!$scope.isSubNational(document) && !$scope.isCommunity(document) && !$scope.isOthers(document)) {
					document.jurisdictionName = undefined;
				}
				if (document.informAllAuthorities !== false) {
					document.authoritiesToInform = undefined;
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
			$scope.isFieldValid = function (field) {
				if (field && $scope.validationReport && $scope.validationReport.errors)
					return !Enumerable.from($scope.validationReport.errors).any(function (x) { return x.property == field; });

				return true;
			};

			//==================================
			//
			//==================================
			$scope.isSubNational = function(document) {

				document = document || $scope.document;

				return document &&
					   document.jurisdiction &&
					   document.jurisdiction.identifier == "DEBB019D-8647-40EC-8AE5-10CA88572F6E";
			};
			
			//==================================
			//
			//==================================
			$scope.isOthers = function(document) {

				document = document || $scope.document;

				return document &&
					   document.jurisdiction &&
					   document.jurisdiction.identifier == "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED";
			};
			//==================================
			//
			//==================================
			$scope.isCommunity = function (document) {

				document = document || $scope.document;

				return document &&
					   document.jurisdiction &&
					   document.jurisdiction.identifier == "DEEEDB35-A34B-4755-BF77-D713017195E3";
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
								deferred.reject(e);
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
			
			$scope.$emit("getDocumentInfo", {});
		}]
	};
}]);
});