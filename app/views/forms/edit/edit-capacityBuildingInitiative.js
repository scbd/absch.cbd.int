import app from '~/app';
import _ from 'lodash';
import '~/views/forms/edit/edit';
import '~/views/forms/view/view-capacity-building-initiative.directive';
import '~/services/main';
import './directives/edit-capacity-building-initiative.directive';

export { default as template } from './edit-capacityBuildingInitiative.html';
  
export default ["$scope", '$routeParams', '$controller', function($scope, $routeParams, $controller) {
		
  $controller('editController', {
      $scope: $scope
  });

}];

