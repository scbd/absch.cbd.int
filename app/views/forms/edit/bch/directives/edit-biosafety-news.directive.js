import app from 'app';
import _ from 'lodash';
import template from 'text!./edit-biosafety-news.directive.html';
import 'views/forms/edit/edit';
import "views/forms/view/bch/view-biosafety-news.directive"; 
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


