define(['app', 'lodash', 'views/forms/edit/edit', 'views/forms/edit/bch/directives/edit-laboratory-detection.directive'], 
function (app, _) {

	app.controller("editLaboratoryDetectionController", ["$scope", "$controller", function($scope, $controller) {
	   	
		$controller('editController', {
			$scope: $scope
		});

   }]);

});
