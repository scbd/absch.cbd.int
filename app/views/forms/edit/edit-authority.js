import app from 'app';
import 'views/forms/edit/directives/edit-authority.directive';
import 'views/forms/edit/edit';
import 'angular-vue';
import exportDetails from "~/components/export-details.vue";

export { default as template } from './edit-authority.html';

  export default ["$scope", "$controller", function($scope, $controller) {

        $controller('editController', {
            $scope: $scope
        });

        $scope.vueOptions = {
            components: { 
                exportDetails
            }
        };

    }];

