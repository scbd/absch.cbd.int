import app from 'app';
import './directives/edit-authority.directive';
import 'views/forms/edit/edit';

export { default as template } from './edit-authority.html';
export default ["$scope", "$controller", function($scope, $controller) {

    $controller('editController', {
        $scope: $scope
    });
}];

