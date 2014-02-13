
require("app").directive("editAuthority", [function () {

	return {
		restrict   : "EAC",
		templateUrl: "/app/views/forms/edit/edit-authority.directive.html",
		replace    : true,
		transclude : false,
		scope      : {},
		controller : ["$scope", "authHttp", "guid", "$filter", "Thesaurus", "$q", "$location", "IStorage", "authentication", "Enumerable", "editFormUtility", function ($scope, $http, guid, $filter, thesaurus, $q, $location, storage, authentication, Enumerable, editFormUtility)
		{

			$scope.status   = "";
			$scope.error    = null;
			$scope.document = null;
			$scope.tab      = "help";
			$scope.review   = { locale : "en" };
			$scope.options  = {
				countries					: function () { return $http.get("/api/v2013/thesaurus/domains/countries/terms",            { cache: true }).then(function(o){ return $filter("orderBy")(o.data, "name"); }); },
				organizationTypes			: function () { return $http.get("/api/v2013/thesaurus/domains/Organization%20Types/terms", { cache: true }).then(function(o){ return o.data; }); },
				cbdSubjects					: function () { return $http.get("/api/v2013/thesaurus/domains/CBD-SUBJECTS/terms",         { cache: true }).then(function(o){ return o.data; }); },
				libraries					: function () { return $http.get("/api/v2013/thesaurus/domains/cbdLibraries/terms",         { cache: true }).then(function(o){ return o.data; }); },
				absJurisdictions			: function () { return $http.get("/api/v2013/thesaurus/domains/51A113E9-071F-440A-83DC-E3499B7C646D/terms", { cache: true }).then(function (o) { return o.data; }); },
				absGeneticResourceTypes		: function () { return $http.get("/api/v2013/thesaurus/domains/20945FA8-C24C-4AF6-B3D9-367592AFDF48/terms", { cache: true }).then(function (o) { return thesaurus.buildTree(o.data); }); },
				absGeneticResourceAreas		: function () { return $http.get("/api/v2013/thesaurus/domains/545CD54C-CFF3-41E8-A003-FDD278426A3A/terms", { cache: true }).then(function (o) { return thesaurus.buildTree(o.data); }); },
				cpbFunctions				: function () { return $http.get("/api/v2013/thesaurus/domains/Subject Areas/terms",        { cache: true }).then(function (o) { return o.data; }); },
				cpbOrganismTypes			: function () { return $http.get("/api/v2013/thesaurus/domains/TypeOfOrganisms/terms",      { cache: true }).then(function (o) { return o.data; }); },
				absFunctions				: function () { return $http.get("/api/v2013/thesaurus/domains/8102E184-E282-47F7-A49F-4C219B0EE235/terms", { cache: true }).then(function (o) { return o.data; }); },
			};

			//==================================
			//
			//==================================
		    $scope.CompletedEvent = function () { console.log("Completed Event called"); };
		    $scope.ExitEvent = function () { console.log("Exit Event called"); };
		    $scope.ChangeEvent = function () { console.log("Change Event called"); };
		    $scope.BeforeChangeEvent = function () { console.log("Before Change Event called"); };

		    $scope.IntroOptions = {
		        steps: [

                    {
                        element: "#helpTip1",
                        intro: "save as draft or save for real",
                        position: "right"
                    },
                    {
		                element: "#helpTip1",
		                intro: "official languages",
		                position: "left"
		            },
                    
                    {
                        element: "#helpTip2",
                        intro: "form page navigation",
                        position: "bottom"
                    },
                    {
                        element: "#helpTip4",
                        intro: "Check to see if they have been added. If not, first <a target='_new_contact_' href='/managementcentre/edit/contact'>click here to add them.</a> (new window)",
                        position: "left"
                    },
                    {
                        element: "#helpTip5",
                        intro: "general info section. Enter the name of the CNA here.",
                        position: "left"
                    }
		        ],
		        showStepNumbers: false,
		        exitOnOverlayClick: true,
		        exitOnEsc: true,
		        nextLabel: "<strong>next</strong>",
		        prevLabel: "<span style='color:green'>Previous</span>",
		        skipLabel: "Exit",
		        doneLabel: "Done",
		        showButtons: false,
		        showBullets:false

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
				return authentication.getUser().government;
			};

			//==================================
			//
			//==================================
			function load(identifier) {

				$scope.status = "loading";

				var qDocument = null;

				if(identifier) {
					qDocument = editFormUtility.load(identifier, "authority");
				}
				else {
					qDocument = {
						header: {
							identifier: guid(),
							schema: "authority",
							languages: ["en"]
						},
						government: $scope.userGovernment() ? { identifier: $scope.userGovernment() } : undefined,
						libraries: [{ identifier: "cbdLibrary:abs-ch" }] //Force to ABS
					};
				}

				$q.when(qDocument).then(function(doc) {

					$scope.tab    = "help";
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

				if(info.schema!="authority")
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

				if(tab == "help")           { $scope.prevTab = "help";           $scope.nextTab = "edit"; }
				if(tab == "edit")           { $scope.prevTab = "help";           $scope.nextTab = "absch"; }
				if(tab == "absch")          { $scope.prevTab = "edit";           $scope.nextTab = "additionalInfo"; }
				if(tab == "additionalInfo") { $scope.prevTab = "absch";          $scope.nextTab = "review"; }
				if(tab == "review")         { $scope.prevTab = "additionalInfo"; $scope.nextTab = "review"; }
				
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

				if(name=="chm"  ) return qLibraries.any(function(o){ return o.identifier == "cbdLibrary:chm";    });
				if(name=="absch") return qLibraries.any(function(o){ return o.identifier == "cbdLibrary:abs-ch"; });
				if(name=="bch"  ) return qLibraries.any(function(o){ return o.identifier == "cbdLibrary:bch";    });
				if(name=="ebsa" ) return qLibraries.any(function(o){ return o.identifier == "cbdLibrary:ebsa";   });

				return false;
			};

			//==================================
			//
			//==================================
			$scope.allowJurisdictionName = function(document) {

				document = document || $scope.document;

				if (!document || !document.absJurisdiction)
					return false;

				var qabsJurisdictions = Enumerable.from([document.absJurisdiction]);

				return qabsJurisdictions.Any(function (o) { return o.identifier == "DEBB019D-8647-40EC-8AE5-10CA88572F6E"; });
			};

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
			$scope.getCleanDocument = function(document) {

				document = document || $scope.document;

				if (!document)
					return undefined;

				document = angular.fromJson(angular.toJson(document));

				if (!$scope.isInLibrary("absch", document)){
				    document.responsibilities        = undefined;
					document.absJurisdiction         = undefined;
					document.absJurisdictionName     = undefined;
					document.absGeneticResourceTypes = undefined;
					document.absGeneticResourceAreas = undefined;
					document.absResponsibilities     = undefined;
				}

				if (!$scope.allowJurisdictionName(document))
					document.absJurisdictionName = undefined;

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
		}]
	};
}]);