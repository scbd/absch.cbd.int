define(['app', 'lodash', 'views/forms/edit/edit', './directives/edit-news.directive'], 
function (app, _) {

	app.controller("editNewsController", ["$scope", "$controller", function($scope, $controller) {
	   	
		$controller('editController', {
			$scope: $scope
		});

   }]);

});