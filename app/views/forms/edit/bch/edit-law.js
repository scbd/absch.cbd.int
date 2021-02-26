define(['app', 'lodash', 'views/forms/edit/bch/directives/edit-law.directive'], 
function (app, _) {

	app.controller("editLawController", ["$scope", "$controller", function($scope, $controller) {
		
		$controller('editController', {
			$scope: $scope
		});

		

   }]);

});