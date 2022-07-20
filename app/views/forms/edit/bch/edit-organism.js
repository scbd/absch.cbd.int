import app from '~/app';
import '~/views/forms/edit/bch/directives/edit-organism.directive';

	export { default as template } from './edit-organism.html';

  export default ["$scope", "$controller", function($scope, $controller) {
		$controller('editController', {
			$scope: $scope
		});
   }];


