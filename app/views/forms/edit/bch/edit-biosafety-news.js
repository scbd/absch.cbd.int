define(['app', 'views/forms/edit/edit', './directives/edit-biosafety-news.directive'], 
function (app, _) {
	app.controller("editBiosafetyNewsController", ["$scope", "$controller", function($scope, $controller) {
		$controller('editController', {
			$scope: $scope, 	
		});
   }]);
});
