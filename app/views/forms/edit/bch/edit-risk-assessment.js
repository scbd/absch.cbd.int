define(['app', 'lodash', 'views/forms/edit/bch/directives/edit-risk-assessment.directive'], 
function (app, _) {

	app.controller("editRiskAssessmentController", ["$scope", "$controller", function($scope, $controller) {
			
		$controller('editController', {
			$scope: $scope
		});
		
   }]);

});
