import app from 'app';
import _ from 'lodash';
import template from 'text!./edit-dna-sequence.directive.html';
import 'views/forms/edit/edit';
import 'services/main';
import 'views/forms/edit/document-selector';
import "~/views/forms/view/bch/view-dna-sequence.directive";
import '~/views/forms/directives/traits-selector.directive';
import editDnaSequenceT from '~/app-text/views/forms/edit/bch/directives/edit-dna-sequence.json';

app.directive("editDnaSequence", ["$controller", "thesaurusService", "realm", "translationService", function ($controller, thesaurusService, realm, translationService) {
		return {
			restrict   : "EA",
			template: template,
			replace    : true,
			require    : '?ngModel',
			scope:{
				onPostSubmitFn   : "&onPostSubmit"
			},
			link: function($scope, $element, $attr){
				translationService.set('editDnaSequenceT', editDnaSequenceT);
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

					if(document?.family?.identifier!='1ECB698D-3F3D-41BC-BEBD-DD5C734BCDCF'){
						document.proteinName = undefined ;
						document.biologicalFunction = undefined ;
						document.traits = undefined ;
					}	
						
					return $scope.sanitizeDocument(document);
				};
				$scope.onBuildOrganismQuery = function(searchText){
					
                    var queryOptions = {
						realm     : realm.value,
						schemas	  : ['organism'],
                        searchText: searchText
                    }
					
					return $scope.onBuildDocumentSelectorQuery(queryOptions);
                }
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


