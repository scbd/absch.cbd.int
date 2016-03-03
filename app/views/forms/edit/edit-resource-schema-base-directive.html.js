define(['app', 'underscore',
        '../view/view-resource.directive.js'], function (app, _) {

	app.directive('editSchemaResourceBase', ["$q", "$timeout", function ($q, $timeout)
	{
		return {
			restrict: 'EAC',
			templateUrl: '/app/views/forms/edit/edit-resource-schema-base-directive.html',
			replace: true,
			controller: ["$scope", "$http", "$filter","IStorage", function ($scope, $http, $filter, storage)
			{

				var changeParentFor = ['F7D357FEC3884D388FD49CECBCFF5083', '3A02804CB9AB43F2BADF23B6BC0F5661']
				var newParent = '5427EB8F-5532-4AE2-88EE-5B9619917480';

				var cppToSkip = ["EC94899F15EE40C6A0F7D0B1F774A521","1D2710D3-75C8-475D-8634-F912F06DAF25",
								'F2E6038A-6E99-4BCE-9582-155B72CC7730','0C7D5977-E5B8-4311-A26F-94E775EFB137',
								'8C3BBBA1-3663-4F6E-B366-B70DC91391A3','4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C',
								'52D71068-71D3-4082-875D-D6190892E760','99018940-7B01-4BB7-996D-7C71A0B262F9',
								'1FCC6CA9-022F-42FD-BD02-43AE674FEB56','B8A150E054154AD3AD97856ABD485E90',
								'DCD2D478CAA24DC98FCCD71135BA6B6E','3BF57EA8-F709-454E-81B2-900BF09713F0',
								'6F81120F-99E1-4AC5-AD19-7BE8FBC3636C', 'A8B409C3-8A35-4FCA-BFCA-D0552FFEF69A',
								'73198F43-674C-4989-B742-6C2415282AA1', '822EC80937524039A912E87DC0041A89',
								'572585C7-824E-4F01-A9CE-40D999CEF393','A5541F43A5084AA0BEFF28D22BC53023',
								'54AF023578A64FA19301D04DB113CE13','658EC39AB6CC46D3AC6F955FD404673B',
								'FFBEBDD92D194903ADD28F8AEF42C552','D064BAD7C87D4868959CD3AC8C77D4B0',
								'52DFF282A99E43F999CCADE1F15E7A22','298DB8DACEF840389B7318B06EB4FD43',
								'3BA1D57B-82E4-4558-A51D-163238034FEE','E502A55855C24FE486CEA0538D1768B7']
				var vlrToSkip = ['3BA1D57B-82E4-4558-A51D-163238034FEE']
				var mccToSkip = ['EC94899F15EE40C6A0F7D0B1F774A521','1D2710D3-75C8-475D-8634-F912F06DAF25',
							'B8A150E054154AD3AD97856ABD485E90',
							'DCD2D478CAA24DC98FCCD71135BA6B6E','3BF57EA8-F709-454E-81B2-900BF09713F0',
							'6F81120F-99E1-4AC5-AD19-7BE8FBC3636C','A8B409C3-8A35-4FCA-BFCA-D0552FFEF69A',
							'822EC80937524039A912E87DC0041A89',
							'572585C7-824E-4F01-A9CE-40D999CEF393','A5541F43A5084AA0BEFF28D22BC53023',
							'54AF023578A64FA19301D04DB113CE13',	'D064BAD7C87D4868959CD3AC8C77D4B0',
							'52DFF282A99E43F999CCADE1F15E7A22',
							'3BA1D57B-82E4-4558-A51D-163238034FEE','68FEE55850674F82B938622A7B986A94',
							'572585C7-824E-4F01-A9CE-40D999CEF393', 'A5541F43A5084AA0BEFF28D22BC53023']
				var absSubjectsToSkip = [];

				if($scope.document_type=="modelContractualClause"){
					$scope.heading = "Article 19 & 20 tool";
					$scope.shortHeading = "MCC";
					absSubjectsToSkip = mccToSkip;
				}
				else if($scope.document_type=="resource"){
					$scope.heading = "Virtual Library Record";
					$scope.shortHeading = "VLR";
					absSubjectsToSkip = vlrToSkip;
				}
				else if($scope.document_type=="communityProtocol"){
					$scope.heading = "Community protocols and procedures and customary law";
					$scope.shortHeading = "CPP";
					absSubjectsToSkip = cppToSkip;
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
						return $http.get("/api/v2013/thesaurus/domains/CA9BBEA9-AAA7-4F2F-B3A3-7ED180DE1924/terms", { cache: true })
						.then(function(o){
								var subjects = o.data;

								_.each(subjects, function(subject){
									subject.narrowerTerms = _.without(subject.narrowerTerms, absSubjectsToSkip);
									subject.broaderTerms  = _.without(subject.broaderTerms, absSubjectsToSkip);
								});

								subjects = _.filter(subjects, function(subject){
									return !_.contains(absSubjectsToSkip, subject.identifier);
								});
								if($scope.document_type=="modelContractualClause" || $scope.document_type=="communityProtocol"){
									_.each(changeParentFor, function(item){
										var subject = _.findWhere(subjects, {'identifier':item});
										if(subject){
											subject.broaderTerms = [];
											subject.broaderTerms.push(newParent);
										}
										var parent = _.findWhere(subjects, {'identifier':newParent});
										parent.narrowerTerms.push(item);
									});
								}
								return subjects;
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

				function removeFromList(badSubjectList,validList){
					return _.without(validList,badSubjectList)
				}
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
