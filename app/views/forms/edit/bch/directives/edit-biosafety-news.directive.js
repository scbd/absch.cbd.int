define(['app', 'lodash', 'text!./edit-biosafety-news.directive.html', 'views/forms/edit/edit', 'services/thesaurus-service',
	'views/forms/edit/document-selector', "views/forms/view/bch/view-biosafety-news.directive"], 
function (app, _, template) { 
	app.directive("editBiosafetyNews", ["$controller", "thesaurusService", function($controller, thesaurusService) {
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
                $scope.getCleanDocument = function(document) {

                     document = document || $scope.document; 
                     delete document['government']
                    if (!document)
						return undefined; 
						
					return $scope.sanitizeDocument(document);
				}; 
                $scope.setDocument({})
                .then(function(){
                    var document = $scope.document; 
                });    
			}
		} 
   }]);

});
