define(['app', 'lodash', 'views/forms/edit/edit', 'views/forms/edit/bch/directives/edit-biosafety-decision.directive'], 
function (app, _) {

	app.controller("editBiosafetyDecisionController", ["$scope", "$controller", function($scope, $controller) {
	   	
		$controller('editController', {
			$scope: $scope
		});

   }]);

});
