define(['app', 'lodash', 'text!./edit-country-profile.directive.html', 'views/forms/edit/edit',
	"views/forms/view/bch/view-country-profile.directive"], 
function (app, _, template) { 
	app.directive("editCountryProfile", ["$controller", function($controller) {
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
                $scope.setDocument({}) 
			}
		} 
   }]);

});
