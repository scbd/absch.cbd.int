define(['app', 'lodash', 'text!./edit-laboratory-detection.directive.html', 'views/forms/edit/edit', 'services/thesaurus-service',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-laboratory-detection.directive",
	'views/forms/directives/view-terms-hierarchy'], 
function (app, _, template) {

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
					detectionMethods 	: function(){ return thesaurusService.getDomainTerms('detectionMethods', {other:true, otherType:'lstring'}) },
					lmoTypes 			: function(){ return thesaurusService.getDomainTerms('typeOfOrganisms', {other:true, otherType:'lstring'}) }					
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
						document.synonymNames = _($scope.synonymNames).pluck('value').compact().value();
					if(_.isEmpty(document.synonymNames))
						document.synonymNames = undefined;		
					
						
					return $scope.sanitizeDocument(document);
				};

				$scope.setDocument({}, true)
				.then(function(doc){
					
					if(doc.synonymNames)
						$scope.synonymNames = _.map(doc.synonymNames, function(t){return { value: t}});

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

});
