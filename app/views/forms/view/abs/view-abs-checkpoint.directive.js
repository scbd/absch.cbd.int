 import app from '~/app';
import template from "text!./view-abs-checkpoint.directive.html";
import '~/views/directives/record-options';
 import _ from "lodash";
 import '~/views/forms/directives/view-terms-hierarchy';
import viewCheckpointT from '~/app-text/views/forms/view/abs/view-abs-checkpoint.json';

	// });
//	 require("app")
	// console.log(app);
//	return {
			app.directive("viewAbsCheckpoint", ['translationService', function (translationService) {
					
				return {
					restrict   : "EAC",
					template: template ,
					replace    : true,
					transclude : false,
					scope: {
						document: "=ngModel",
						locale  : "=",
						target  : "@linkTarget",
						allowDrafts : "@",
						hide:"@"
					},
					link : function ($scope)
					{
						translationService.set('viewCheckpointT', viewCheckpointT);
						$scope.contacts = undefined;
					},
					controller : ["$scope", "IStorage", function ($scope, storage)
					{
						
						
						//====================
						//
						//====================
						$scope.display = function(field) {
							
							if(!$scope.hide) return true; //show all fields

							return( $scope.hide.indexOf(field) >= 0 ? false : true);
						}

						//====================
						//
						//====================
						$scope.$watch("document.contacts", function()
						{
							if ($scope.document) {
								$scope.contacts = angular.fromJson(angular.toJson($scope.document.contacts));

								if ($scope.contacts)
									$scope.loadReferences($scope.contacts);
							}
						});

						//====================
						//
						//====================
						$scope.$watch("document.authoritiesToInform", function () {
							if ($scope.document) {
								$scope.authoritiesToInform = angular.fromJson(angular.toJson($scope.document.authoritiesToInform));

								if ($scope.authoritiesToInform)
									$scope.loadReferences($scope.authoritiesToInform);
							}
						});

						//====================
						//
						//====================
						$scope.loadReferences = function(targets) {

							angular.forEach(targets, function(ref){

								storage.documents.get(ref.identifier, { cache : true})
								.then(function(res){return res.data}).then(function (data){
										ref.document = data;
									})
									.catch(function(error){
										if (error.status == 404 && $scope.allowDrafts == "true") {

											storage.drafts.get(ref.identifier, { cache : true})
											.then(function(res){return res.data}).then(function (data){
													ref.document = data;
												})
												.catch(function(){
													ref.document  = undefined;
													ref.error     = error.data;
													ref.errorCode = error.status;
												});
										}

										ref.document  = undefined;
										ref.error     = error.data;
										ref.errorCode = error.status;

									});
							});
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

						// $scope.onResponsibleFunctionsTerms = function(terms) {
						// 	if(($scope.document||{}).responsibleFunctions){
						// 		_.forEach(terms, function(item){
						// 			if(item.broaderTerms.length == 0 || item.broaderTerms == []){
						// 				var parent =_.find($scope.document.responsibleFunctions, {identifier: item.identifier});
						// 				if(parent){
						// 					terms = _.filter(terms, function(t){
						// 						return !_.includes(item.narrowerTerms, t.identifier)
						// 					})
						// 				}
						// 			}
						// 		});
						// 		return terms;
						// 	}
						// };

					}]
				};
			}]);
		//}
 	
