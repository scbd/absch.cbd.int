﻿define(['app', 'text!views/forms/view/record-loader.directive.html', 
	'components/scbd-angularjs-services/services/main', 'ngSmoothScroll',
	'components/scbd-angularjs-services/filters/scbd-filters',
	'./view-history-directive',
    'js/common',
    'views/directives/document-metadata-directive',
    'views/directives/party-status',
    'views/forms/view/view-default-reference.directive',
    'views/forms/view/view-contact-reference.directive',
	'services/search-service',
	'views/directives/block-region-directive',
	'views/directives/record-options','components/scbd-angularjs-services/services/locale',
	'views/forms/directives/document-date', 'components/scbd-angularjs-controls/form-control-directives/km-value-ml',
	'views/forms/view/view-reference-records.directive', 'views/forms/directives/compare-val'
], function (app, template) {

	app.directive('recordLoader', [function () {
		return {
			restrict: 'EAC',
			template: template,
			replace: true,
			transclude: false,
			scope: {
				linkTarget: "@",
				document: "=",
				locale: "=?",
				hide: "@",
				showDetails: "=",
				api: '=?'
			},
			link: function ($scope) {

				if (!$scope.linkTarget || $scope.linkTarget == '')
					$scope.linkTarget = '_new';
				//debugger;
				$scope.internalDocument = undefined;
				$scope.internalDocumentInfo = undefined;

				if (!$scope.document)
					$scope.init();
			},
			controller: ['$scope', "$route", 'IStorage', "authentication", "$q", "$location", "commonjs", "$timeout",
				"$filter", "$http", "$http", "realm", "$element", '$compile', 'searchService', "IWorkflows", "locale", 'ngMeta',
				function ($scope, $route, storage, authentication, $q, $location, commonjs, $timeout, $filter,
					$http, $httpAWS, realm, $element, $compile, searchService, IWorkflows, appLocale, ngMeta) {
					var htmlDiff;
					$scope.realm = realm;
					if(!$scope.locale)
						$scope.locale = appLocale;
					
					var schemaMapping = {

						absNationalReport			: 'views/forms/view/abs/view-abs-national-report.directive',
						absCheckpoint				: 'views/forms/view/abs/view-abs-checkpoint.directive',
						absCheckpointCommunique		: 'views/forms/view/abs/view-abs-checkpoint-communique.directive',
						absPermit					: 'views/forms/view/abs/view-abs-permit.directive',
						authorityreference			: 'views/forms/view/abs/view-authority-reference.directive',
						measure						: 'views/forms/view/abs/view-measure.directive',	
						absNationalModelContractualClause	: 'views/forms/view/abs/view-abs-national-model-contractual-clause.directive',
						absProcedure						: 'views/forms/view/abs/view-abs-procedure.directive',		

						capacityBuildingInitiative	: 'views/forms/view/view-capacity-building-initiative.directive',
						capacityBuildingResource	: 'views/forms/view/view-capacity-building-resource.directive',

						contact						: 'views/forms/view/view-contact.directive',
						contactreference			: 'views/forms/view/view-contact-reference.directive',
						authority					: 'views/forms/view/view-authority.directive',
						supplementaryAuthority		: 'views/forms/view/view-supplementary-authority.directive',
						database					: 'views/forms/view/view-database.directive',						
						organization				: 'views/forms/view/view-organization.directive',
						organizationreference		: 'views/forms/view/view-organization-reference.directive',
						resource					: 'views/forms/view/view-resource.directive',

						focalPoint					: 'views/forms/view/scbd/view-focalpoint.directive',
						meeting						: 'views/forms/view/scbd/view-meeting.directive',
						statement					: 'views/forms/view/scbd/view-statement.directive',
						pressRelease				: 'views/forms/view/scbd/view-pressrelease.directive',
						new							: 'views/forms/view/scbd/view-new.directive',
						notification				: 'views/forms/view/scbd/view-notification.directive',
						news						: 'views/forms/view/scbd/view-news.directive',

						"biosafetyLaw" 				: 'views/forms/view/bch/view-biosafety-law.directive',
						"biosafetyDecision" 		: 'views/forms/view/bch/view-biosafety-decision.directive',
						"nationalRiskAssessment" 	: 'views/forms/view/bch/view-risk-assessment.directive',
						"cpbNationalReport2" 		: 'views/forms/view/bch/view-national-report-2.directive',
						"cpbNationalReport3" 		: 'views/forms/view/bch/view-national-report-3.directive',
						"cpbNationalReport4" 		: 'views/forms/view/bch/view-national-report-4.directive',
						"expert" 					: 'views/forms/view/bch/view-expert.directive',
						"expertAssignment" 			: 'views/forms/view/bch/view-expert-assignment.directive',
						"independentRiskAssessment" : 'views/forms/view/bch/view-risk-assessment.directive',
						"modifiedOrganism" 			: 'views/forms/view/bch/view-lmo.directive',
						"dnaSequence" 				: 'views/forms/view/bch/view-dna-sequence.directive',
						"organism" 					: 'views/forms/view/bch/view-organism.directive'
					}

					$scope.$watch("document", function (_new) {
						$scope.error = null;
						$scope.internalDocument = _new;
						if ($scope.internalDocument && ($scope.internalDocument.schema || $scope.internalDocument.header)) {
							loadViewDirective($scope.internalDocument.schema || $scope.internalDocument.header.schema);
							checkIfPermitRevoked();
						}
					});


					$scope.getUserCountry = function (id) {
                        var term = {};
                        term.identifier = id
                        return $filter('term')(term);
					}
					//==================================
					//
					//==================================
					$scope.init = function () {

						if ($scope.internalDocument && !$scope.revisionNo)
							return;

						if ($scope.document || $scope.schema)
							return;

						var documentSchema = $route.current.params.documentSchema;
						var documentRevision = $route.current.params.revision;

						var documentID = $route.current.params.documentID
						//documentSchema ? commonjs.integerToHex($route.current.params.documentID, documentSchema) : $route.current.params.documentID;

						if ($scope.revisionNo)
							documentRevision = $scope.revisionNo;

						if ($route.current.params.documentNumber)
							var documentID = $route.current.params.documentNumber;

						if (documentID && (/^bch/i.test(documentID) || /^abs/i.test(documentID))) {
							documentID = documentID.replace(/-(dev|trg)/i, '');
							var docNum = documentID.split('-');
							if (docNum.length == 5) {
								documentID 		 = docNum[3];
								documentRevision = docNum[4];
							}
							else if (docNum.length == 4)
								documentID = docNum[3];

						}
						documentID = commonjs.integerToHex(documentID, documentSchema);

						$scope.loadDocument(documentSchema, documentID, documentRevision);
						// else
						// 	$scope.error = "documentID not specified";

					}


					//==================================
					//
					//==================================
					$scope.loadDocument = function (documentSchema, documentID, documentRevision) {

						if (documentSchema &&
							_.contains(["MEETING", "NOTIFICATION", "PRESSRELEASE", "STATEMENT", "NEWS", "NEW", "ST", "NT", "MT", "PR", "MTD"], documentSchema.toUpperCase())) {
							$scope.loading = true;
							commonjs.getReferenceRecordIndex(documentSchema, documentID)
								.then(function (data) {
									$scope.internalDocument = data.data;
									$scope.loading = false;
								});
							loadViewDirective(documentSchema);
						}
						else if (documentID) {
							// if(_.contains(['FOCALPOINT', 'NFP'], documentSchema.toUpperCase()))
							// 	documentID = commonjs.integerToHex(documentID);

							$scope.load(documentID, documentRevision);
						}
					};

					$scope.timeLaspe = 20;
					function closeWindow() {
						if ($scope.timeLaspe == 0)
							window.close();
						$scope.timeLaspe--;
						$timeout(function () { closeWindow(); }, 1000)
					}
					
					
					//==================================
					//
					//==================================
					$scope.load = function (identifier, version) {

						$scope.error = undefined;
						var qDocument;
						var qDocumentInfo;
						
						var config = {};						

						if (version == 'draft') {
							qDocument = storage.drafts.get(identifier, undefined, config).then(function (result) { return result.data || result });
							qDocumentInfo = storage.drafts.get(identifier, { info: true }, config).then(function (result) { return result.data || result });
						}
						else if (version == undefined) {							
							config.params = {skipRealmHeader : true};
							qDocument = storage.documents.get(identifier, {'include-deleted':true}, config).then(function (result) { return result.data || result });
							qDocumentInfo = storage.documents.get(identifier, { info: true, 'include-deleted':true }, config).then(function (result) { return result.data || result });
						}
						else {
							config.params = {skipRealmHeader : true};
							qDocument = storage.documents.get(identifier + '@' + version, {'include-deleted':true}, config).then(function (result) { return result.data || result });
							qDocumentInfo = storage.documents.get(identifier + '@' + version, {'include-deleted':true, info: true }, config).then(function (result) { return result.data || result });

						}
						$scope.loading = true;
						$q.all([qDocument, qDocumentInfo]).then(function (results) {

							$scope.internalDocument = results[0];
							$scope.internalDocumentInfo = results[1];
							$scope.internalDocument.info = results[1];
							checkIfPermitRevoked();
				
							if (version)
								$scope.revisionNo = version

							checkIfPermitRevoked();

							if ($scope.internalDocumentInfo.workingDocumentLock) {
								IWorkflows.get($scope.internalDocumentInfo.workingDocumentLock.lockID.replace('workflow-', ''))
									.then(function (workflow) {
										if (workflow && workflow.type.name == 'delete-record')
											$scope.workflowRequestType = "deletion";
										else
											$scope.workflowRequestType = "publishing";
									});
								if($scope.internalDocumentInfo.revision > 1)
									$scope.showDifferenceButton = true
							}				
							if (version)
								$scope.revisionNo = version

							loadViewDirective($scope.internalDocument.header.schema);
							// setMetaTags($scope.internalDocument);

						}).catch(function (error) {
							if (error.status == 404 && version != 'draft') {
								$scope.load(identifier, 'draft');
							}
						})
							.finally(function () {
								$scope.loading = false;
							})

					};

					//==================================
					//
					//==================================
					$scope.getUser = function () {

						if (!$scope.user)
							$q.when(authentication.getUser(), function (user) { $scope.user = user; });

						return $scope.user
					};

					//==================================
					//
					//==================================
					$scope.edit = function () {
						if (!$scope.canEdit())
							throw "Cannot edit form";

						var schema = $scope.internalDocumentInfo.type;
						var identifier = $scope.internalDocumentInfo.identifier;
						$timeout(function () {
							$location.path("/register/" + $filter("urlSchemaShortName")(schema) + "/" + identifier + '/edit');
						}, 1);

					}

					//==================================
					//
					//==================================
					$scope.canEdit = function () {

						if ($scope.getUser() && !$scope.getUser().isAuthenticated)
							return false;

						if (!$scope.internalDocumentInfo && $scope.internalDocument && $scope.internalDocument.info) {
							$scope.internalDocumentInfo = $scope.internalDocument.info;
						}

						if (!$scope.internalDocumentInfo)
							return false;
						if ($scope.internalCanEdit === undefined) {

							$scope.internalCanEdit = null; // avoid recall => null !== undefined

							var hasDraft = !!$scope.internalDocumentInfo.workingDocumentCreatedOn;
							var identifier = $scope.internalDocumentInfo.identifier;
							var schema = $scope.internalDocumentInfo.type;

							var qCanEdit = hasDraft
								? storage.drafts.security.canUpdate(identifier, schema)  // has draft
								: storage.drafts.security.canCreate(identifier, schema); // has no draft

							qCanEdit.then(function (isAllowed) {

								$scope.internalCanEdit = isAllowed || false;

							}).then(null, function (error) {

								$scope.internalCanEdit = false;
							});
						}

						return $scope.internalCanEdit === true;
					};

					$scope.loadRevision = function (val) {

						if ($scope.revisionNo != val) {
							$scope.revisionNo = val;
							//$scope.internalDocument = null
							$scope.init();
						}
					}

					$scope.$on('loadDocument', function (evt, evtData) {

						if (evtData.documentId && evtData.schema && !$scope.document) {

							$scope.loadDocument(evtData.schema, evtData.documentId);
						}
						if ($scope.document) {
							loadViewDirective(evtData.schema)
						}

					});

					$scope.showDifference = function(){
						if($scope.isComparing)return;

						if(!$scope.showDifferenceOn){
							$scope.isComparing = true;							
							$scope.showDifferenceOn = true;
							require(['js/html-difference'], function(diffParser){
								htmlDiff = diffParser;
								loadViewDirective($scope.internalDocumentInfo.type, function(directiveHtml){
									return  { 
										divSelector 	: '#compareSchemaView',
										directiveHtml 	: directiveHtml.replace("ng-model='internalDocument'", "ng-model='prevDocument'")
									}
								})
								storage.documents.get($scope.internalDocumentInfo.identifier + '@' + $scope.internalDocumentInfo.latestRevision)
									.then(function (result) { 
										$scope.prevDocument = result.data
									}).then(compareWithPrev)	
							})
						}	
						else{
							$scope.showDifferenceOn = false;
							loadViewDirective($scope.internalDocumentInfo.type);
						}					
					}
					$scope.updateComparision = function(){
						if($scope.showDifferenceButton && $scope.showDifferenceOn)
							loadViewDirective($scope.internalDocumentInfo.type).then(compareWithPrev);
					}

					function compareWithPrev(){
						//timeout so that the directive is rendered.
						$timeout(function(){
										
							var view1 = $element.find('#compareSchemaView .compare-diff');

							_.each(view1, function(e, i){
								var cssClasses = e.className.split(' ')
								var compareClass = _.find(cssClasses, function(c){
									if(/^compare_/.test(c))
										return c;
								})
								var newHtml = $element.find('#schemaView .compare-diff.' + compareClass);
								// console.log(newHtml.html())
								let output = htmlDiff(e.innerHTML, newHtml.html());
								newHtml.html(output);
							});
							$scope.isComparing = false;
						}, 300)
					}

					function loadViewDirective(schema, beforeReplace) {

						if (!schema)
							return;

						var lschema = _.clone(schema);

						if (schema.toLowerCase() == 'modelcontractualclause' || schema.toLowerCase() == 'communityprotocol')
							lschema = 'resource';

						if (_.contains(["NEWS", "NEW",], lschema.toUpperCase()))
							lschema = lschema.toLowerCase();
						else if (_.contains(["NFP", "ST", "NT", "MT", "PR", "MTD"], lschema.toUpperCase()))
							lschema = $filter("mapSchema")(lschema);

						var schemaDetails = schemaMapping[lschema];
						var defer = $q.defer();
						require([schemaDetails], function () {
							var divSelector = '#schemaView'
							var name 		= snake_case(lschema);
							var directiveHtml =
								"<DIRECTIVE ng-show='internalDocument' ng-model='internalDocument' document-info='internalDocumentInfo' link-target={{linkTarget}} locale='locale'></DIRECTIVE>"
									.replace(/DIRECTIVE/g, 'view-' + name);
							$scope.$apply(function () {
								if(typeof beforeReplace == 'function'){
									var dirInfo 	= beforeReplace(directiveHtml)
									divSelector 	= dirInfo.divSelector || divSelector;
									directiveHtml 	= dirInfo.directiveHtml || directiveHtml;
								}
								$element.find(divSelector).empty()
										.append($compile(directiveHtml)($scope));
								defer.resolve('')
							});
						});

						return defer.promise

					}
					function snake_case(name, separator) {

						separator = separator || '-';
						return name.replace(/[A-Z]/g, function (letter, pos) {
							return (pos ? separator : '') + letter.toLowerCase();
						});
					}

					function checkIfPermitRevoked() {

						if ($scope.internalDocument && $scope.internalDocument.header.schema == 'absPermit') {
							if ($scope.internalDocument.amendmentIntent == 1)
								$scope.isIRCCRevoked = true;
						}
					}

					function setMetaTags(document){
						ngMeta.resetMeta();   
						searchService.list({query:'identifier_s:'+document.header.identifier})
						.then(function(result){
							var indexDoc = result.data.response.docs[0];
							var schemaName = $filter('mapSchema')(document.header.schema);							
							ngMeta.setTitle(indexDoc.rec_countryName, ' | ' + schemaName);
							ngMeta.setTag('description', indexDoc.rec_summary || window.scbdApp.title);
						})
					} 

					$scope.api = {
						loadDocument: $scope.loadDocument,
						getDocument: function(){return $scope.internalDocument},
						getDocumentInfo : function(){$scope.internalDocumentInfo}
					}

					var queryString = $location.search();
					if(queryString && queryString.print){
						$scope.printMode = true;
						require(['css!/app/css/print-friendly'])
					}
				}]
		}
	}]);
});
