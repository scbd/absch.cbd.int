import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import 'views/forms/edit/bch/directives/edit-biosafety-decision.directive';

	export { default as template } from './edit-biosafety-decision.html';

  export default ["$scope", "$controller", function($scope, $controller) {
	   	
		$controller('editController', {
			$scope: $scope
		});

   }];


