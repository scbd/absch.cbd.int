define(['app', 'lodash', 'views/forms/edit/edit', './directives/edit-biosafety-news.directive'], 
function (app, _) {
	app.controller("editBioSafetyNewsController", ["$scope", "$controller", function($scope, $controller) {
		$controller('editController', {
			$scope: $scope, 	
		});
   }]);
});
