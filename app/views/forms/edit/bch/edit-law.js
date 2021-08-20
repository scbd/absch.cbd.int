import app from 'app';
import _ from 'lodash';
import '~/views/forms/edit/bch/directives/edit-law.directive';

	export { default as template } from './edit-law.html';

  export default ["$scope", "$controller", function($scope, $controller) {
		
		$controller('editController', {
			$scope: $scope
		});

		

   }];

