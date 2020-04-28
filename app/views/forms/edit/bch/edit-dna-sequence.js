define(['app', 'lodash', 'views/forms/edit/edit', 'views/forms/edit/bch/directives/edit-dna-sequence.directive'], 
function (app, _) {

	app.controller("editDnaSequenceController", ["$scope", "$controller", function($scope, $controller) {
		
		$controller('editController', {
			$scope: $scope
		});
		

   }]);

});
