import app from 'app';
import vue from 'vue';
import 'views/search/directives/edit-authority.directive';
import 'views/search/edit/edit';
import 'angular-vue';
import EmbdFrame from "~/components/embed/emb-frame.vue";

export { default as template } from './file.html';

  export default ["$scope", "$controller", function($scope, $controller) {

        $controller('file', {
            $scope: $scope
        });

        $scope.vueOptions = {
            components: { 
                EmbdFrame
            }
        };

    }];