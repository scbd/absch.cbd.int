import app from 'app';
import 'views/forms/edit/edit';
import 'views/forms/edit/directives/edit-contact.directive';

    export { default as template } from './edit-contact.html';

  export default ["$scope", '$routeParams', '$controller', function($scope, $routeParams, $controller) {
		
		$controller('editController', {
            $scope: $scope
        });

	 }];

