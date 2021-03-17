import app from 'app';
import _ from 'lodash';
import template from 'text!./edit-laboratory-detection.directive.html';
import 'views/forms/edit/edit';
import 'services/main';
import 'views/forms/edit/document-selector';
import "views/forms/view/bch/view-laboratory-detection.directive";
import 'views/forms/directives/view-terms-hierarchy';

	app.directive("editLaboratoryDetection", ["$controller", "thesaurusService", function($controller, thesaurusService) {
		return {
			restrict   : "EA",
			template: template,
			replace    : true,
			require    : '?ngModel',
			scope:{
				onPostSubmitFn   : "&onPostSubmit"
			},
			link: function($scope, $element, $attr){
				$scope.self = $scope;

				$scope.self.detectionMethods = [];
				$scope.scientificNameSynonyms = [{}];
				$scope.commonNames = [{}];
				$scope.container        = $attr.container;
    			$scope.isDialog         = $attr.isDialog;  
				$scope.type 			= $attr.documentType;    
				$controller('editController', {
					$scope: $scope
				});
				
				$scope.synonymNames = [{}];


				_.extend($scope.options, {	
					services 			: function(){ return thesaurusService.getDomainTerms('services', {other:true, otherType:'lstring'}) },
					lmoTypes 			: function(){ return thesaurusService.getDomainTerms('typeOfOrganisms', {other:true, otherType:'lstring', narrowerOf:'8DAB2400-CF00-44B2-ADCF-49AABF66B9B0'}) },
					detectionMethods 	: function(){ 
						return thesaurusService.getDomainTerms('detectionMethods', {other:true, otherType:'lstring'})
						.then(function(detectionMethods){
							return thesaurusService.getTerms('other')
							.then(function(otherTerm){
								_.forEach(detectionMethods, function(method){

									if(method.narrowerTerms.length){
										var otherTermCopy = angular.copy(otherTerm);
										otherTermCopy.identifier = method.identifier + '#' + otherTermCopy.identifier
										otherTermCopy.type = 'lstring';
										otherTermCopy.multiple = true;
										method.narrowerTerms.push(otherTermCopy.identifier)
										detectionMethods.push(otherTermCopy);
									}
								})
								return detectionMethods;
							})
						})
					}				
				});
				
				//==================================
				//
				//==================================
				$scope.getCleanDocument = function(document) {

					document = document || $scope.document;

					if (!document)
						return undefined;

					if (/^\s*$/g.test(document.notes))
						document.notes = undefined;

					if((document.traits||[]).length == 0)
						document.traits = undefined;
						
					if(!_.isEmpty($scope.synonymNames))
						document.synonymNames = _($scope.synonymNames).map('value').compact().value();
					if(_.isEmpty(document.synonymNames))
						document.synonymNames = undefined;		
					
					if($scope.detectionMethods){
						document.detectionMethods = [];
						_.forEach($scope.detectionMethods, function(method){
							var newMethod = _.extend({}, method);
							if(newMethod.customValue && newMethod.identifier!='5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'){
								newMethod.identifier = newMethod.identifier.replace(/\#.*/, '')
							}
							
							document.detectionMethods.push(newMethod);
						})
					}
						
					return $scope.sanitizeDocument(document);
				};

				$scope.setDocument({}, true)
				.then(function(doc){
					
					if(doc.synonymNames)
						$scope.synonymNames = _.map(doc.synonymNames, function(t){return { value: t}});

					if(doc.detectionMethods){
						$scope.detectionMethods=[];
						_.forEach(doc.detectionMethods, function(method){
							if(method.customValue && method.identifier!='5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'){
								method.identifier += '#5B6177DD-5E5E-434E-8CB7-D63D67D5EBED'
							}

							$scope.detectionMethods.push(method);
						})
					}
				});

				$scope.isDonorMandatory = function(){
					return !!$scope.document.isSynthetic;
				}
				$scope.removeItem = function(type, $index){
					if(type.length>1)
						type.splice($index, 1)
				}

			}
		}

   }]);


