import app from '~/app';
import '~/views/forms/edit/directives/edit-resource.directive'

export { default as template } from './edit-resource.html';
export default ["$scope", "$controller", function($scope, $controller) {

  $controller('editController', {
      $scope: $scope
  });

}];
