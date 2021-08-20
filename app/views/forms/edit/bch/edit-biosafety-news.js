import app from 'app';
import _ from 'views/forms/edit/edit';
import '~/views/forms/edit/bch/directives/edit-biosafety-news.directive';
	export { default as template } from './edit-biosafety-news.html';

  export default ["$scope", "$controller", function($scope, $controller) {
		$controller('editController', {
			$scope: $scope, 	
		});
   }];

