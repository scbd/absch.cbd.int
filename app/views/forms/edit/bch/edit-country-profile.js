import app from '~/app';
import '~/views/forms/edit/bch/directives/edit-country-profile.directive';

	export { default as template } from './edit-country-profile.html';

  export default ["$scope",   "$controller",
	function($scope,  $controller,  IStorage, $routeParams, ngDialog,searchService) {
		$controller('editController', {
			$scope: $scope , 
		}); 
   }];

