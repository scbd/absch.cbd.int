import app from 'app';
import _ from 'lodash';
import '~/views/forms/edit/bch/directives/edit-modified-organism.directive';

	export { default as template } from './edit-modified-organism.html';

  export default ["$scope", "$controller", function($scope, $controller) {
		$controller('editController', {
			$scope: $scope
		});


   }];


