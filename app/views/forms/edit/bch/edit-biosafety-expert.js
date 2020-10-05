define(['app', 'lodash', 'views/forms/edit/edit', './directives/edit-biosafety-expert.directive'], 
function (app, _) {

	app.controller("editBiosafetyExpertController", ["$scope", "$controller", function($scope, $controller) {
	   	
		$controller('editController', {
			$scope: $scope
		});

   }]);

});
