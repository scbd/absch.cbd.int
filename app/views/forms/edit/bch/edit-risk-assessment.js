import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/bch/directives/edit-risk-assessment.directive';

	app.controller("editRiskAssessmentController", ["$scope", "$controller", function($scope, $controller) {
			
		$controller('editController', {
			$scope: $scope
		});
		
   }]);


