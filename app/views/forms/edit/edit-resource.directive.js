require("app").directive("editResource", [ function () {

	return {
		restrict   : 'EAC',
		templateUrl: '/app/views/forms/edit/edit-abs-permit.resource.directive.html',
		replace    : true,
		transclude : false,
		scope: {
			cmsParams : "&"
		},
		controller : ["$scope", "$q", "authHttp", "Enumerable", "$filter", "guid", "IStorage", "authentication", "editFormUtility", "Thesaurus", function ($scope, $q, $http, Enumerable, $filter, guid, storage, authentication, editFormUtility, thesaurus)
		{
			$scope.status   = "";
			$scope.error    = null;
			$scope.document = null;
			$scope.review   = { locale: "en" };
			$scope.options  = {
				libraries     : function() { return $http.get("/api/v2013/thesaurus/domains/cbdLibraries/terms",                         { cache: true }).then(function(o){ return Enumerable.From(o.data).Where("$.identifier!='cbdLibrary:bch'").ToArray();})},
				languages     : function() { return $http.get("/api/v2013/thesaurus/domains/52AFC0EE-7A02-4EFA-9277-8B6C327CE21F/terms", { cache: true }).then(function(o){ return $filter('orderBy')(o.data, 'name'); }); },
				resourceTypes : function() { return $http.get("/api/v2013/thesaurus/domains/83BA4728-A843-442B-9664-705F55A8EC52/terms", { cache: true }).then(function(o){ return thesaurus.buildTree(o.data) }); },
				cbdSubjects   : function() { return $http.get("/api/v2013/thesaurus/domains/CBD-SUBJECTS/terms",                         { cache: true }).then(function(o){ return o.data; }); },
				aichiTargets  : function() { return $http.get("/api/v2013/thesaurus/domains/AICHI-TARGETS/terms",                        { cache: true }).then(function(o){ return o.data; }); },
				absSubjects   : function() { return $http.get("/api/v2013/thesaurus/domains/CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924/terms", { cache: true }).then(function(o){ return o.data; }); },
				bchSubjects   : function() { return $http.get("/api/v2013/thesaurus/domains/043C7F0D-2226-4E54-A56F-EE0B74CCC984/terms", { cache: true }).then(function(o){ return o.data; }); },
				bchRaSubjects : function() { return $http.get("/api/v2013/thesaurus/domains/69B43BB5-693B-4ED9-8FE0-95895E144142/terms", { cache: true }).then(function(o){ return o.data; }); },
				ebsaSubjects  : function() { return []; },
				regions       : function() { return $q.all([$http.get("/api/v2013/thesaurus/domains/countries/terms", { cache: true }), 
														    $http.get("/api/v2013/thesaurus/domains/regions/terms",   { cache: true })]).then(function(o) {
														    	return Enumerable.from($filter('orderBy')(o[0].data, 'name')).union(
																	   Enumerable.from($filter('orderBy')(o[1].data, 'name'))).toArray();
														   }) }

			//==================================
			//
			//==================================
			$scope.isInLibrary = function(name, document) {
				document = document || $scope.document;

				if (!document || !document.libraries)
					return false;

				var qLibraries = Enumerable.From(document.libraries);

				if(name=="chm"  ) return qLibraries.Any(function(o){ return o.identifier == "cbdLibrary:chm"    });
				if(name=="absch") return qLibraries.Any(function(o){ return o.identifier == "cbdLibrary:abs-ch" });
				if(name=="bch"  ) return qLibraries.Any(function(o){ return o.identifier == "cbdLibrary:bch"    });
				if(name=="ebsa" ) return qLibraries.Any(function(o){ return o.identifier == "cbdLibrary:ebsa"   });

				return false;
			}

			//==================================
			//
			//==================================
			$scope.IsBchRa = function(document) {
				document = document || $scope.document;

				if (!document || !document.bchSubjects)
					return false;

				var qLibraries = Enumerable.from(document.bchSubjects);

				return qLibraries.any(function(o) {
					return o.identifier == "FBAF958B-14BF-45DD-BC6D-D34A9953BCEF"  //Risk assessment
					    || o.identifier == "6F28D3FB-7CCE-4FD0-8C29-FB0306C52BD0"; //Risk assessment and risk management
				});
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
				return authentication.user().government;
			};

			//==================================
			//
			//==================================
			$scope.init = function() {
				if ($scope.document)
					return;

				$scope.status = "loading";

				var identifier = URI().search(true).uid;
				var promise = null;

				if(identifier)
					promise = editFormUtility.load(identifier, "resource");
				else
					promise = $q.when({
						header: {
							identifier: guid(),
							schema   : "resource",
							languages: ["en"]
						}
					}).then(function(doc){
						if ($scope.cmsParams() && $scope.cmsParams().defaultLibrary)
							doc.libraries = [{ identifier: $scope.cmsParams().defaultLibrary }];
						return doc;
					});


				promise.then(
					function(doc) {
						$scope.status = "ready";
						$scope.document = doc;
					}).then(null, 
					function(err) {
						$scope.onError(err.data, err.status)
						throw err;
					});
			}

			//==================================
			//
			//==================================
			$scope.tab = function(tab, show) {

				var oTabNames    = [];
				var sActiveTab   = $('.tab-content:first > .tab-pane.active').attr("id");
				var qActiveTab   = $('#editFormPager a[data-toggle="tab"]:not(:first):not(:last)').filter('[href="#'+sActiveTab+'"]');

				if (tab == "-") tab = (qActiveTab.prevAll(":not(:hidden):not(:last)").attr("href")||"").replace("#", "");
				if (tab == "+") tab = (qActiveTab.nextAll(":not(:hidden):not(:last)").attr("href")||"").replace("#", "");

				if(!tab)
					return undefined;

				if (show)
					$('#editFormPager a[data-toggle="tab"][href="#review"]:first').tab('show');

				return {
					'name' : tab,
					'active': sActiveTab == tab
				}
			}

			//==================================
			//
			//==================================
			$scope.onTab  = function(tab) {
				var fn = function() {
					if (tab == 'review')
						$scope.validate();

					if (!$('body').is(":animated"))
						$('body').stop().animate({ scrollTop: 0 }, 600);
				};

				if ($scope.$root.$$phase == '$apply' || $scope.$root.$$phase == '$digest')
					fn();
				else
					$scope.$apply(fn);
			}

			//==================================
			//
			//==================================
			$scope.onPreSaveDraft = function() {
				return $scope.cleanUp();
			}

			//==================================
			//
			//==================================
			$scope.onPrePublish = function() {
				return $scope.validate(false).then(function(hasError) {
					if (hasError)
						$scope.tab("review", true)
					return hasError;
				});
			}

			//==================================
			//
			//==================================
			$scope.onPostWorkflow = function(data) {
				window.location = "/managementcentre/my-pending-items";
			};

			//==================================
			//
			//==================================
			$scope.onPostPublish = function(data) {
				window.location = "/database/record?documentID="+data.documentID;
			};

			//==================================
			//
			//==================================
			$scope.onPostSaveDraft = function(data) {
				window.location = "/managementcentre/edit-draft/";
			};

			//==================================
			//
			//==================================
			$scope.onPostClose = function() {
				window.location = "/managementcentre/";
			};

			//==================================
			//
			//==================================
			$scope.cleanUp = function(document) {
				document = document || $scope.document;

				if (!document)
				return $q.when(true);

				if (!$scope.isInLibrary("absch", document)) {
					document.absSubjects = undefined;
				}

				if (!$scope.isInLibrary("bch", document)) {
					document.bchSubjects       = undefined;
					document.bchRaRecommend    = undefined;
					document.bchRaSubjects     = undefined;
					document.bchRaForLmo       = undefined;
					document.organisms         = undefined;
					document.genes             = undefined;
					document.modifiedOrganisms = undefined;
				}

				if (!$scope.isInLibrary("chm", document)) {
					document.cbdSubjects  = undefined;
					document.aichiTargets = undefined;
				}

				if (!$scope.isInLibrary("ebsa", document)) {
					document.ebsaSubjects = undefined;
				}

				if (/^\s*$/g.test(document.notes))
					document.notes = undefined;

				return $q.when(false);
			};

			//==================================
			//
			//==================================
			$scope.validate = function(clone) {

				$scope.validationReport = null;

				var oDocument = $scope.document;

				if (clone !== false)
					oDocument = angular.fromJson(angular.toJson(oDocument));

				return $scope.cleanUp(oDocument).then(function(cleanUpError) {
					return storage.documents.validate(oDocument).then(
						function(success) {
							$scope.validationReport = success.data;
							return cleanUpError || !!(success.data && success.data.errors && success.data.errors.length);
						},
						function(error) {
							$scope.onError(error.data);
							return true;
						}
					);
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
}]);