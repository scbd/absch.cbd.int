define(['app', 'lodash', 'text!./edit-biosafety-news.directive.html', 'views/forms/edit/edit',
	"views/forms/view/bch/view-biosafety-news.directive"], 
function (app, _, template) { 
	app.directive("editBiosafetyNews", ["$controller", function($controller) {
		return {
			restrict   : "EA",
			template: template,
			replace    : true,
			require    : '?ngModel',
			scope:{
				onPostSubmitFn   : "&onPostSubmit"
			},
			link: function($scope, $element, $attr){  
				$scope.container        = $attr.container;
    			$scope.isDialog         = $attr.isDialog;  
				$scope.type 			= $attr.documentType;  
                $controller('editController', {
                    $scope: $scope
                }); 
                $scope.getCleanDocument = function(document) {
                     document = document || $scope.document;  
                    if (!document)
						return undefined; 
						
					return $scope.sanitizeDocument(document);
				}; 
                $scope.setDocument({},true) 
			}
		} 
   }]);

});
