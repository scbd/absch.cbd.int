import app from 'app';
import _ from 'lodash';
import 'views/forms/edit/edit';
import '~/views/forms/edit/bch/directives/edit-biosafety-expert.directive';

	export { default as template } from './edit-biosafety-expert.html';

  export default ["$scope", "$controller", function($scope, $controller) {
	   	
		$controller('editController', {
			$scope: $scope
		});

   }];


