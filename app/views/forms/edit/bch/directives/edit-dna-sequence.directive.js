define(['app', 'lodash', 'text!./edit-dna-sequence.directive.html', 'views/forms/edit/edit', 'services/main',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-dna-sequence.directive", 'views/forms/directives/traits-selector.directive'], 
function (app, _, template) {

	app.directive("editDnaSequence", ["$controller", "thesaurusService", function($controller, thesaurusService) {
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
					family : thesaurusService.getDomainTerms('dnaSequenceFamily')
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
