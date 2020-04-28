define(['app', 'lodash', 'views/forms/edit/edit', './directives/edit-biosafety-decision.directive'], 
function (app, _) {

	app.controller("editBiosafetyDecisionController", ["$scope", "$controller", function($scope, $controller) {
	   	
		$controller('editController', {
			$scope: $scope
		});

   }]);

});
