import app from '~/app';
import _ from 'lodash';
import template from "text!./view-record-reference.directive.html";
import '~/components/scbd-angularjs-services/main';
import viewRecordReferenceT from '~/app-text/views/forms/view/directives/view-record-reference.json';
import {documentIdWithoutRevision} from '~/components/scbd-angularjs-services/services/utilities.js';
import { sleep } from '~/services/composables/utils.js';

app.directive("viewRecordReference", ["IStorage", '$timeout', 'translationService', '$rootScope', 'searchService', 'solr',
	 function (storage, $timeout, translationService, $rootScope, searchService, solr) {
	return {
		restrict: "EA",
		template: template ,
		replace: true,
		transclude: {
			default:'?default',
			extra:'?extra'
		},
		scope: {
			model: "=ngModel",
			locale: "=",
			target: "@linkTarget",
			onDocumentLoadFn: '&onDocumentLoad'
		},
		link:function($scope, $element, $attr){
			translationService.set('viewRecordReferenceT', viewRecordReferenceT);

			$scope.self = $scope;
			$scope.hideSchema = $attr.hideSchema=='true'
			
			$scope.options = {
				hideSchema 					: $attr.hideSchema=='true',
				isNFP 	   					: false,
				isCNA 	   					: false,
				isContactTypePerson   		: false,
				isContactTypeOrganization 	: false,
				showContact					: $attr.collapse==='true' ? false:true
			}
				
			$scope.$watch('model', function(newValue, oldValue){
		        if(newValue){

					$scope.refreshRecord($scope.model.identifier||$scope.model);
		        }
		    });

			$scope.refreshRecord = function(identifier, cacheBuster){
				$scope.loading = true;
				return loadReferenceDocument(identifier, cacheBuster)
				.then(function(data) {
					$scope.document = data;
					
					if($scope.document){
						$scope.options.isNFP 	   					= $scope.document.schema_s == 'focalPoint';
						$scope.options.isCNA 	   					= isCNA(data);
						$scope.options.isContactTypePerson   		= isContactTypePerson(data) && !$scope.isNFP;
						$scope.options.isContactTypeOrganization 	= !$scope.options.isContactTypePerson && !$scope.isNFP;

						if(_.isEmpty($scope.document.workingDocumentSummary))
							$scope.document.workingDocumentSummary = undefined;
						if(_.isEmpty($scope.document.summary))
							$scope.document.summary = undefined;

						if(data.workingDocumentLock){
							$timeout(function(){$element.find("[data-bs-toggle='tooltip']").tooltip({trigger: 'hover'})}, 100);
						}
						if($scope.onDocumentLoadFn)
							$scope.onDocumentLoadFn({document:data});

						if(data.type && !_.includes(["organization", "contact"  , "authority"], data.type))
							$scope.showSummary = true;
					}
				})
				.finally(function(){$scope.loading = false;});
			}

			async function getLatestVersion(identifier) {
				let latestRevisionIdentifier = identifier;
				const identifierWithoutRevision = documentIdWithoutRevision(identifier);
				const queryParameters = {
					query: `identifier_s:${solr.escape(identifierWithoutRevision)}`,
					rowsPerPage: 1,
					fields: 'identifier_s,_revision_i,uniqueIdentifier_s',
				};
			
				try {
					const searchServiceResult = await searchService.list(queryParameters, null);
			
					if (searchServiceResult.data.response.docs.length) {
						const { _revision_i: latestRevision, uniqueIdentifier_s: uniqueIdentifier } = searchServiceResult.data.response.docs[0];
						latestRevisionIdentifier = `${identifierWithoutRevision}@${latestRevision}`;
					}
				} catch (error) {
					console.error('Error fetching latest version:', error);
				}
			
				return latestRevisionIdentifier;
			}

			function loadReferenceDocument(identifier, cacheBuster){
				
				//cacheBuster used only to bust cache for contactOrganization reference.

				let headers = {};
				var focalPointRegex = /^52000000cbd022/;
				if($attr.skipRealm == 'true' || focalPointRegex.test(identifier))// special case for NFP, as NFP belong to CHM realm
					headers = { realm:undefined }
					
				return storage.documents.get(identifier, { info : true}, {headers})
						.then(function(result){
							//TODO: throw error if the documentType != 'focalPoint'
							if(result?.data?.body?.contactOrganization){
								// Get the latest version of contactOrganization
								let contactOrganizationIdentifier = result.data.body.contactOrganization.identifier;

								return getLatestVersion(result.data.body.contactOrganization.identifier)
								.then(function(contactOrganizationResult) {
									contactOrganizationIdentifier = contactOrganizationResult; 
								
									return storage.documents.get(contactOrganizationIdentifier, { info : true, cacheBuster})
									.then(function(organizationDetails){
										result.data.body.contactOrganizationDetail = { ...organizationDetails.data.body, info:organizationDetails.data,  deletedOn:organizationDetails.data.deletedOn};
										return result.data;
									})
								
								}).catch(function(error) {
									console.error('Error:', error);
								});

								
							}
							return result.data;
						})
						.catch(function(error, code){
							if (error.status == 404) {
								return loadDraftDocument(identifier);
							};
						});
			}

			function loadDraftDocument(identifier, count){
				return storage.drafts.get(identifier, { info : true, body:true})
						.then(function(result){
							$scope.errorCode = undefined;
							var document = result.data;
							count = count||1
							if($attr.waitForWorkflow=='true' && !document.workingDocumentLock && count <= 5){
								return $timeout(function(){return loadDraftDocument(identifier, count++);}, 2000);
							}
							else{
								if(!document.body){
									document.body = { header : { schema: result.data.type} }
								}
								return document;
							}
						})
						.catch(function(error, code){
							if (error.status == 404)$scope.errorCode = 404;
							else
								$scope.error = true;
						});
			}


			function isCNA(doc) {
				if(!doc)
					return false;

				const document = doc.body || doc;
				return document.header && document.header.schema==='authority';	
			};

			function isContactTypePerson(doc) {
				if(!doc)
					return false;
				if(doc.body.type==="person")
					return true;
				if(!doc.type && (doc.firstName))
					return true; //default behaviour
				return false;
			};

			// if the parent directive finds that there is a latest version of the linked record fetch the latest one
			// since http calls are cached.
			$rootScope.$on('evt:updateLinkedRecordRevision', async function(evt, ids){
				
				const identifier = documentIdWithoutRevision($scope.model?.identifier);
				const currentId = ids.find(e=>e.identifier == identifier)
				
				if(currentId?.latestRevision > currentId?.currentRevision){					
					if($scope.loading) //TODO: use canceler instead of this.
						await sleep(500);
					$scope.revisionLoading = true;
					try {
						await $scope.refreshRecord(`${currentId.identifier}@${currentId.latestRevision}`, new Date().getTime());
					} finally {
						$scope.revisionLoading = false;
					}
				}
				
			});
		 }
	};
}]);

