define(['app', 'lodash','text!views/forms/edit/edit-resource-schema-base-directive.html','services/role-service',
'./organization-selector'
], function (app, _, template) {
	app.directive('convertToNumber', function() {
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, ngModel) {
			ngModel.$parsers.push(function(val) {
				return parseInt(val, 10);
			});
			ngModel.$formatters.push(function(val) {
				return '' + val;
			});
			}
		};
	});
	app.directive('editSchemaResourceBase', ["$q", "$timeout", "Thesaurus", function ($q, $timeout, Thesaurus)
	{
		return {
			restrict: 'EAC',
			template: template ,
			replace: true,
			controller: ["$rootScope", "$scope", "$http", "$filter","IStorage", "roleService", "realm","thesaurusService", function ($rootScope, $scope, $http, $filter, storage, roleService, realm,thesaurusService)
			{

				$scope.isABS = realm.is('ABS');
				$scope.isBCH = realm.is('BCH');
				$scope.user = $rootScope.user;
				$scope.isNationalUser = false;
				$scope.keywords = [{}];

				if ($scope.user.isAuthenticated) {
					$scope.isNationalUser =  roleService.isNationalUser();
				}

				$scope.displayMCCWarning = false;
				
				var changeParentFor = ['F7D357FEC3884D388FD49CECBCFF5083', '3A02804CB9AB43F2BADF23B6BC0F5661'];
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
								'3BA1D57B-82E4-4558-A51D-163238034FEE','E502A55855C24FE486CEA0538D1768B7'];
				var vlrToSkip = ['3BA1D57B-82E4-4558-A51D-163238034FEE', '35E029ED-D92F-41C8-9CDC-52F3F35D7E36',
								 'D570A745-D8C3-4698-BB77-0A90C140F3F2', '47DD3FF6-D369-4E64-B0BC-5DADF3B70C95',
							     '29C670AB-C198-484F-A2ED-9BAB1DAC7431', '507D46E0-DC49-47F0-B273-26ECD9CC8948',
							 	 'EAE641FD-6A82-4C15-84CD-0F12ABA5CBC1', 'DFEECF62-EC3D-4F5C-BAC6-2FD308F81277',
							 	 '9EC60226-A7E4-441E-AC7D-2580F111EC3B'];
				var mccToSkip = ['EC94899F15EE40C6A0F7D0B1F774A521','1D2710D3-75C8-475D-8634-F912F06DAF25',
							'B8A150E054154AD3AD97856ABD485E90',
							'DCD2D478CAA24DC98FCCD71135BA6B6E','3BF57EA8-F709-454E-81B2-900BF09713F0',
							'6F81120F-99E1-4AC5-AD19-7BE8FBC3636C','A8B409C3-8A35-4FCA-BFCA-D0552FFEF69A',
							'822EC80937524039A912E87DC0041A89',
							'572585C7-824E-4F01-A9CE-40D999CEF393','A5541F43A5084AA0BEFF28D22BC53023',
							'54AF023578A64FA19301D04DB113CE13',	'D064BAD7C87D4868959CD3AC8C77D4B0',
							'52DFF282A99E43F999CCADE1F15E7A22',
							'3BA1D57B-82E4-4558-A51D-163238034FEE','68FEE55850674F82B938622A7B986A94',
							'572585C7-824E-4F01-A9CE-40D999CEF393', 'A5541F43A5084AA0BEFF28D22BC53023'];
				var absSubjectsToSkip = [];

				_.extend($scope.options, {
					languages     : function() {
						return $q.all([
						$http.get("/api/v2013/thesaurus/domains/52AFC0EE-7A02-4EFA-9277-8B6C327CE21F/terms", { cache: true }),
						$http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",   { cache: true })
						]).then(function(o) {
						var data = $filter("orderBy")(o[0].data, "name");
						data.push(o[1].data);
						return  data;
						});
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
                    	mapping: function(item){ return item.identifier;},
						options: $http.get("/api/v2013/thesaurus/domains/ISO639-2/terms", { cache: true }).then(function(o){
							$scope.options.documentLinksExt[0].options = $filter("orderBy")(o.data, "name");
							_.each($scope.options.documentLinksExt[0].options, function(element) {
									element.__value = element.name;
								});
							return $scope.options.documentLinksExt[0].options;
						})
					}],
					aichiTargets    : function() { return $http.get("/api/v2013/thesaurus/domains/AICHI-TARGETS/terms", 					   { cache: true }).then(function(o){ return o.data; }); },
					absKeyAreas     : function() { return $http.get("/api/v2013/thesaurus/domains/2B2A5166-F949-4B1E-888F-A7976E76320B/terms", { cache: true }).then(function(o){return o.data;});},
					fileFormats 	: function() { return $http.get("/api/v2013/thesaurus/domains/D2D97AB3-4D20-41D4-8CBE-B21C33924823/terms", { cache: true }).then(function(o){ return Thesaurus.buildTree(o.data); }); },
	 			    purposes 	    : function() { return $http.get("/api/v2013/thesaurus/domains/E712C9CD-437E-454F-BA72-E7D20E4C28ED/terms", { cache: true }).then(function(o){ return Thesaurus.buildTree(o.data); }); },
	 			    targetGroups    : function() { return $http.get("/api/v2013/thesaurus/domains/AFB155C4-93A6-402C-B812-CFC7488ED651/terms", { cache: true }).then(function(o){ return o.data; }); },
	 			    expertiseLevels : function() { return $http.get("/api/v2013/thesaurus/domains/1B57D9C3-F5F8-4875-94DC-93E427F3BFD8/terms", { cache: true }).then(function(o){ return o.data; }); },
					bchSubjects 	: function() { return $http.get("/api/v2013/thesaurus/domains/043C7F0D-2226-4E54-A56F-EE0B74CCC984/terms", { cache: true }).then(function(o){ return o.data; }); },
					bchLanguages 	: function() { return $http.get("/api/v2013/thesaurus/domains/ISO639-2/terms", { cache: true }).then(function(o){ return o.data; }); },
					resourceTypes: function() {return thesaurusService.getDomainTerms('resourceTypes')},

				});
				$scope.years = [];
				var end = new Date().getFullYear();
				for (var i = end; i > (end-100) ; i--) {
					$scope.years.push({id:i, name: i});
				} 
				$scope.monthNames = ['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September','October', 'November', 'December'];
				//============================================================
				//
				//============================================================
				$scope.setDocument({aichiTargets: [{identifier: "AICHI-TARGET-16"}]}, true);

				//============================================================
				//
				//============================================================
			    $scope.IsCapacityBuilding = function(document) {

			        document = document || $scope.document;

			        if (!document || !document.purpose)
			            return false;

			        var purposes = _.map(document.purpose, 'identifier');

			        return _.contains(purposes, 'A5C5ADE8-2061-4AB8-8E2D-1E6CFF5DD793') || // Assessing capacity-building needs
			               _.contains(purposes, '3813BA1A-2DE7-4DD5-8415-3B2C6737E567') || // Designing capacity building initiatives
			               _.contains(purposes, '5054AC52-E738-4694-A403-6490FE7D4CF4') || // Monitoring and evaluation of capacity-building initiatives and products
			               _.contains(purposes, '05FA6F66-F942-4713-BB4C-DA032C111188') || // Providing technical guidance
			               _.contains(purposes, '9F48AEA0-EE28-4B6F-AB91-E0E088A8C6B7') || // Raising awareness
			               _.contains(purposes, '5831C357-95CA-4F09-963B-DF9E8AFD8C88');   // Training/learning
			    };

                //============================================================
				//
				//============================================================
			    $scope.IsLiterature = function(document) {

			        document = document || $scope.document;

			        if (!document || !document.purpose)
			            return false;

			        var purposes = _.map(document.purpose, 'identifier');

			        return _.contains(purposes, 'C1B32F41-89D1-4EDC-8EF2-335362B91F8D'); // Literature

			    };

				//==================================
				//
				//==================================
				$scope.getCleanDocument = function(document) {

					document = document || $scope.document;
					if (!document)
						return undefined;
					if(!_.isEmpty($scope.keywords))
						document.keywords = _($scope.keywords).pluck('value').compact().value();
					if(_.isEmpty(document.keywords))
						document.keywords = undefined;
					return $scope.sanitizeDocument(document);
				};

				$scope.addItem = function(type){
					type.push({});
				}
				$scope.removeItem = function(type, $index){
					if(type.length>1) 
						type.splice($index, 1)
				}
				$q.when($scope.setDocument({}, true))
				.then(function(doc){
					if(doc.keywords)
						$scope.keywords = _.map(doc.keywords, function(t){return { value: t};});
				});
                //============================================================
				//
				//============================================================
			    $scope.IsTarget16 = function(document) {

			        document = document || $scope.document;

			        if (!document || !document.aichiTargets)
			            return false;

			        var aichiTargets = _.map(document.aichiTargets, 'identifier');

			        return _.contains(aichiTargets, 'AICHI-TARGET-16');

			    };
				//============================================================
				//
				//============================================================
				$scope.$watch('document.header.schema',function(newValue) {

					if(newValue=="modelContractualClause"){
						$scope.heading      = "Article 19 & 20 tool";
						$scope.shortHeading = "MCC";
						$scope.isMcc        = true;
						absSubjectsToSkip   = mccToSkip;
					}
					else if(newValue=="resource"){
						$scope.heading      = "Virtual Library Record";
						$scope.shortHeading = "VLR";
						$scope.isResource   = true;
						absSubjectsToSkip   = vlrToSkip;
					}
					else if(newValue=="communityProtocol"){
						$scope.heading      = "Community protocols and procedures and customary law";
						$scope.shortHeading = "CPP";
						$scope.isCpp        = true;
						absSubjectsToSkip   = cppToSkip;
					}
				});
				$scope.$watch('document.resourceTypes',function(newValue) {
					if (newValue && _.indexOf((_.map(newValue, "identifier")), '48D40B9E207B43948D95A0BA8F0D710F') >= 0)
						$scope.displayMCCWarning = true;
					else
						$scope.displayMCCWarning = false;
				});


				//============================================================
				//
				//============================================================
				function removeFromList(badSubjectList,validList){
					return _.without(validList,badSubjectList);
				}
				
				//==================================
				//
				//==================================
				$scope.loadRecords = function(identifier) {


					if (identifier) { //lookup single record
						var deferred = $q.defer();
						storage.documents.get(identifier)
							.then(function(r) {
								deferred.resolve(r.data);
							}, function(e) {
								if (e.status == 404) {
									storage.drafts.get(identifier)
										.then(function(r) { deferred.resolve(r.data);},
											function(e) { deferred.reject (e);});
								}
								else {
									deferred.reject (e);
								}
							});
						return deferred.promise;
					}

				};
			}]
		};
	}]);

});
