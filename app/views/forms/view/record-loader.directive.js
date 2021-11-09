import app from 'app';
import _ from 'lodash';
import template from 'text!./record-loader.directive.html';
import 'components/scbd-angularjs-services/main';
import 'ngSmoothScroll';
import 'views/forms/view/view-history-directive';
import 'services/main';
import 'views/directives/document-metadata-directive';
import 'views/directives/party-status';
import 'views/forms/view/directives/view-record-reference.directive';
import 'views/directives/block-region-directive';
import 'views/directives/record-options';
import 'views/forms/directives/document-date';
import 'components/scbd-angularjs-controls/main';
import 'views/forms/view/directives/view-reference-records.directive';
import 'views/forms/directives/compare-val';
import printHeaderTemplate from 'text!./print-header.html';
import printFooterTemplate from 'text!./print-footer.html';
import shareRecord from '~/components/common/share-record.vue';

	app.run(function($templateCache){
		$templateCache.put('view-print-header.html', printHeaderTemplate)
		$templateCache.put('view-print-footer.html', printFooterTemplate)
	});

	app.directive('recordLoader', ["$route", 'IStorage', "authentication", "$q", "$location", "commonjs", "$timeout",
	"$filter", "$http", "apiToken", "realm", '$compile', 'searchService', "IWorkflows", "locale", 'ngMeta', '$routeParams','$rootScope',
	function ($route, storage, authentication, $q, $location, commonjs, $timeout, $filter,
		$http, apiToken, realm, $compile, searchService, IWorkflows, appLocale, ngMeta, $routeParams, $rootScope ) {
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
				api: '=?',
				documentInfo: "=?",
			},
			link: function ($scope, $element, $attr) {

				$scope.tokenReader = function(){ return apiToken.get()}
				if (!$scope.linkTarget || $scope.linkTarget == '')
					$scope.linkTarget = '_new';
				//debugger;
				$scope.internalDocument = undefined;
				$scope.internalDocumentInfo = undefined;
			
					var htmlDiff;
					$scope.realm = realm;
					$scope.isABS = realm.is('ABS');
					$scope.isBCH = realm.is('BCH');
				  $scope.isEmbed = $routeParams.embed;
					if(!$scope.locale)
						$scope.locale = appLocale;
					
					$scope.$watch("document", function (_new) {
						$scope.error = null;
						if(!_new)return;// due to cache loaddocument calls first before the first watch on documents gets called.
						$scope.internalDocument 	= _new;
						$scope.internalDocumentInfo = $scope.documentInfo || $scope.internalDocumentInfo;
						if ($scope.internalDocument && ($scope.internalDocument.schema || $scope.internalDocument.header)) {
							loadViewDirective($scope.internalDocument.schema || $scope.internalDocument.header.schema);
							checkIfPermitRevoked();
							loadWorkflowDetails();
							if($scope.internalDocumentInfo && $scope.internalDocumentInfo.workingDocumentLock)
								$scope.revisionNo = 'draft'
						}
					});

					$scope.shareVueComponent = {
						components:{shareRecord}
					}

					$scope.getQuery = function () {
						let query = $scope.internalDocument.info;
						const type = "document";
						return {type, query}
					}

					$scope.chDocumentId = function () {
						const id =$filter("uniqueID")($scope.internalDocument.info);
						return  id;
					}

					$scope.userStatus = function () {
						if ($rootScope.user && !$rootScope.user.isAuthenticated) {
						var signIn = $scope.$on('signIn', function (evt, data) {
							signIn();
						});
						$('#loginDialog').modal("show");
						return false;
						} else {
						return true;
						}
					}

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

						var documentID = $route.current.params.documentID||$route.current.params.documentId
						//documentSchema ? commonjs.integerToHex($route.current.params.documentID, documentSchema) : $route.current.params.documentID;

						if ($scope.revisionNo)
							documentRevision = $scope.revisionNo;

						if ($route.current.params.documentNumber)
							var documentID = $route.current.params.documentNumber;

						if (documentID && (/^bch/i.test(documentID) || /^abs/i.test(documentID) || /^chm\-nfp/i.test(documentID))) {
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
							_.includes(["MEETING", "NOTIFICATION", "PRESSRELEASE", "STATEMENT", "NEWS", "NEW", "ST", "NT", "MT", "PR", "MTD"], documentSchema.toUpperCase())) {
							$scope.loading = true;
							commonjs.getReferenceRecordIndex(documentSchema, documentID)
								.then(function (data) {
									$scope.internalDocument = data.data;
									$scope.loading = false;
								});
							loadViewDirective(documentSchema);
						}
						else if (documentID) {
							const skipRealm = _.includes(['focalpoint', 'nfp'], (documentSchema||'').toLowerCase()) 
							$scope.load(documentID, documentRevision, skipRealm);
						}
						$scope.loaderSchema = $filter("urlSchemaShortName")(documentSchema);
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
					$scope.load = function (identifier, version, skipRealm) {

						$scope.error = undefined;
						var qDocument;
						var qDocumentInfo;
						
						var config = {};						
						if(skipRealm)					
							config.headers = {realm : undefined};

						if (version == 'draft') {
							qDocument = storage.drafts.get(identifier, undefined, config).then(function (result) { return result.data || result });
							qDocumentInfo = storage.drafts.get(identifier, { info: true }, config).then(function (result) { return result.data || result });
						}
						else if (version == undefined) {		
							//'include-deleted':true
							qDocument = storage.documents.get(identifier, {}, config).then(function (result) { return result.data || result });
							qDocumentInfo = storage.documents.get(identifier, { info: true}, config).then(function (result) { return result.data || result });
						}
						else {
							//'include-deleted':false
							qDocument = storage.documents.get(identifier + '@' + version, {}, config).then(function (result) { return result.data || result });
							qDocumentInfo = storage.documents.get(identifier + '@' + version, {info: true }, config).then(function (result) { return result.data || result });

						}
						$scope.loading = true;
						$q.all([qDocument, qDocumentInfo]).then(function (results) {

							$scope.internalDocument = results[0];
							$scope.internalDocumentInfo = results[1];
							$scope.internalDocument.info = results[1];
							
							if (version)
								$scope.revisionNo = version

							checkIfPermitRevoked();
							loadWorkflowDetails()
		
							if (version)
								$scope.revisionNo = version

							loadViewDirective($scope.internalDocument.header.schema);
							$scope.error = undefined;
						}).catch(function (error) {
							if (error.status == 404 && version != 'draft') {
								$scope.load(identifier, 'draft', skipRealm);
								$scope.error = error;
							}								
						})
						.finally(function () {
							$scope.loading = false;
						})

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

					$scope.showDifference = async function(revision){
						if($scope.isComparing && !revision)return;
	
						if($scope.comparingRevision)// if comparingRevision has value meaning user compared a version, load the original document
							loadViewDirective($scope.internalDocument.header.schema);

						if(!$scope.showDifferenceOn || revision){
							$scope.isComparing = true;							
							$scope.showDifferenceOn = true;
							$scope.comparingRevision = revision;
							htmlDiff = (await import('~/services/main')).htmlDifference;
							loadViewDirective($scope.internalDocumentInfo.type, function(directiveHtml){
								return  { 
									divSelector 	: '#compareSchemaView',
									directiveHtml 	: directiveHtml.replace("ng-model='internalDocument'", "ng-model='prevDocument'")
								}
							})
							storage.documents.get($scope.internalDocumentInfo.identifier + '@' + (revision||$scope.internalDocumentInfo.latestRevision))
							.then(function (result) { 
								$scope.prevDocument = result.data
							}).then(compareWithPrev)	
						}	
						else{
							$scope.showDifferenceOn = false;
							loadViewDirective($scope.internalDocumentInfo.type);
						}					
					}

					$scope.loadRecordRevisions = function(){
						if(!$scope.recordRevisions){
							$scope.loadingRevisions = true;
							$scope.recordRevisions = [];
							var uniqueId = $filter("uniqueID")($scope.internalDocument);
							for (let i = 1; i < $scope.internalDocumentInfo.latestRevision; i++) {
								$scope.recordRevisions.push({ uniqueIdentifier : uniqueId.replace(/\-\d+$/, '-' + i),
															 revision:i})
								
							}
							$scope.loadingRevisions = false;
						}
					}

					$scope.updateComparison = function(){
						if($scope.showDifferenceButton && $scope.showDifferenceOn)
							loadViewDirective($scope.internalDocumentInfo.type).then(compareWithPrev);
					}


					$scope.closeComparison = function(){
						$scope.comparingRevision = undefined;
						loadViewDirective($scope.internalDocument.header.schema);
					}
					
					//==================================
					//
					//==================================

					function loadWorkflowDetails(){
						if ($scope.internalDocumentInfo?.workingDocumentLock) {
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
						else if($scope.internalDocumentInfo?.latestRevision > 1){
							$scope.showComparison = true;//$attr.showComparison == 'true'
						}		
					}

					function canEdit() {

						return authentication.getUser()
						.then(function(user){
							if (!user || !user.isAuthenticated)
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
						})
					};

					function compareWithPrev(){
						//timeout so that the directive is rendered.
						$timeout(function(){
										
							var view1 = $element.find('#compareSchemaView .compare-diff');

							_.forEach(view1, function(e, i){
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

					async function loadViewDirective(schema, beforeReplace) {

						if (!schema)
							return;

						var lschema = _.clone(schema);

						if (schema.toLowerCase() == 'modelcontractualclause' || schema.toLowerCase() == 'communityprotocol')
							lschema = 'resource';

						if (_.includes(["NEWS", "NEW",], lschema.toUpperCase()))
							lschema = lschema.toLowerCase();
						else if (_.includes(["NFP", "ST", "NT", "MT", "PR", "MTD"], lschema.toUpperCase()))
							lschema = $filter("mapSchema")(lschema);

						await fetchEditDirectives(lschema);

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
							$element.find(divSelector).empty().append($compile(directiveHtml)($scope));
							$timeout(function(){canEdit()}, 1000) //verify if user can edit to show edit button
						});

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

					async function fetchEditDirectives(schema){

						if(schema == 'absNationalReport'                ){ return await import('~/views/forms/view/abs/view-abs-national-report.directive') };
						if(schema == 'absCheckpoint'                    ){ return await import('~/views/forms/view/abs/view-abs-checkpoint.directive') };
						if(schema == 'absCheckpointCommunique'          ){ return await import('~/views/forms/view/abs/view-abs-checkpoint-communique.directive') };
						if(schema == 'absPermit'                        ){ return await import('~/views/forms/view/abs/view-abs-permit.directive') };
						if(schema == 'measure'                          ){ return await import('~/views/forms/view/abs/view-measure.directive') };
						if(schema == 'absNationalModelContractualClause'){ return await import('~/views/forms/view/abs/view-abs-national-model-contractual-clause.directive') };
						if(schema == 'absProcedure'                     ){ return await import('~/views/forms/view/abs/view-abs-procedure.directive') };
						if(schema == 'capacityBuildingInitiative'       ){ return await import('~/views/forms/view/view-capacity-building-initiative.directive') };
						if(schema == 'capacityBuildingResource'         ){ return await import('~/views/forms/view/view-capacity-building-resource.directive') };
						if(schema == 'contact'                          ){ return await import('~/views/forms/view/view-contact.directive') };
						if(schema == 'authority'                        ){ return await import('~/views/forms/view/view-authority.directive') };
						if(schema == 'supplementaryAuthority'           ){ return await import('~/views/forms/view/view-supplementary-authority.directive') };
						if(schema == 'database'                         ){ return await import('~/views/forms/view/view-database.directive') };
						if(schema == 'organization'                     ){ return await import('~/views/forms/view/view-organization.directive') };
						if(schema == 'resource'                         ){ return await import('~/views/forms/view/view-resource.directive') };
						if(schema == 'focalPoint'                       ){ return await import('~/views/forms/view/scbd/view-focalpoint.directive') };
						if(schema == 'meeting'                          ){ return await import('~/views/forms/view/scbd/view-meeting.directive') };
						if(schema == 'statement'                        ){ return await import('~/views/forms/view/scbd/view-statement.directive') };
						if(schema == 'pressRelease'                     ){ return await import('~/views/forms/view/scbd/view-pressrelease.directive') };
						if(schema == 'new'                              ){ return await import('~/views/forms/view/scbd/view-new.directive') };
						if(schema == 'notification'                     ){ return await import('~/views/forms/view/scbd/view-notification.directive') };
						if(schema == 'news'                             ){ return await import('~/views/forms/view/scbd/view-news.directive') };
						if(schema == 'biosafetyNews'                    ){ return await import('~/views/forms/view/bch/view-biosafety-news.directive') };
						if(schema == 'biosafetyLaw'                     ){ return await import('~/views/forms/view/bch/view-biosafety-law.directive') };
						if(schema == 'biosafetyDecision'                ){ return await import('~/views/forms/view/bch/view-biosafety-decision.directive') };
						if(schema == 'nationalRiskAssessment'           ){ return await import('~/views/forms/view/bch/view-risk-assessment.directive') };
						if(schema == 'cpbNationalReport2'               ){ return await import('~/views/forms/view/bch/view-national-report-2.directive') };
						if(schema == 'cpbNationalReport3'               ){ return await import('~/views/forms/view/bch/view-national-report-3.directive') };
						if(schema == 'cpbNationalReport4'               ){ return await import('~/views/forms/view/bch/view-national-report-4.directive') };
						if(schema == 'expert'                           ){ return await import('~/views/forms/view/bch/view-biosafety-expert.directive') };
						if(schema == 'expertAssignment'                 ){ return await import('~/views/forms/view/bch/view-expert-assignment.directive') };
						if(schema == 'independentRiskAssessment'        ){ return await import('~/views/forms/view/bch/view-risk-assessment.directive') };
						if(schema == 'modifiedOrganism'                 ){ return await import('~/views/forms/view/bch/view-lmo.directive') };
						if(schema == 'dnaSequence'                      ){ return await import('~/views/forms/view/bch/view-dna-sequence.directive') };
						if(schema == 'organism'                         ){ return await import('~/views/forms/view/bch/view-organism.directive') };
						if(schema == 'laboratoryDetection'              ){ return await import('~/views/forms/view/bch/view-laboratory-detection.directive') };
						if(schema == 'biosafetyExpert'                  ){ return await import('~/views/forms/view/bch/view-biosafety-expert.directive') };
						if(schema == 'countryProfile'                   ){ return await import('~/views/forms/view/bch/view-country-profile.directive') };
						if(schema == 'submission'                       ){ return await import('~/views/forms/view/view-submission.directive') };

					}

					$scope.api = {
						loadDocument: $scope.loadDocument,
						getDocument: function(){return $scope.internalDocument},
						getDocumentInfo : function(){$scope.internalDocumentInfo}
					}

					var queryString = $location.search();
					if(queryString ){
						$scope.printMode = queryString.print
						$scope.embed 	 = queryString.embed
					}

					if (!$scope.document)
						$scope.init();
			}
		}
	}]);

