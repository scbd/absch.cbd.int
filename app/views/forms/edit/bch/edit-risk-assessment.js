import app from '~/app';
import _ from 'lodash';
import '~/views/forms/edit/bch/directives/edit-risk-assessment.directive';

	export { default as template } from './edit-risk-assessment.html';

  export default ["$scope", "$controller", "$routeParams", function($scope, $controller, $routeParams) {
			
		$controller('editController', {
			$scope: $scope
		});
		$scope.isNational = $routeParams.isNational;
   }];


