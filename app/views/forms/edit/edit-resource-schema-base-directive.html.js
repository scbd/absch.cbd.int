define(['app'], function (app) {

	app.directive('editSchemaResourceBase', ["$q", "$timeout", function ($q, $timeout)
	{
		return {
			restrict: 'EAC',
			templateUrl: '/app/views/forms/edit/edit-resource-schema-base-directive.html',
			replace: true,
			controller: ["$scope", "$http", "$filter","IStorage", function ($scope, $http, $filter, storage)
			{


				if($scope.document_type=="modelContractualClause"){
					$scope.heading = "Article 19 & 20 tool";
					$scope.shortHeading = "MCC";
				}
				else if($scope.document_type=="resource"){
					$scope.heading = "Virtual Library Record";
					$scope.shortHeading = "VLR";
				}
				else if($scope.document_type=="communityProtocol"){
					$scope.heading = "Community protocols and procedures and customary law";
					$scope.shortHeading = "CPP";
				}

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

				//if(_.contains(['modelContractualClause', 'resource', 'communityProtocol'],$scope.type))
					$scope.setDocument({libraries: [{ identifier: "cbdLibrary:abs-ch" }]}, true);
				// else
				// 	$scope.setDocument({}, true);

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
			}]
		};
	}])

});
