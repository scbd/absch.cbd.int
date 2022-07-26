import 'views/register/directives/register-top-menu';
import sharedLinks from '~/components/common/shared-links.vue';
export { default as template } from './shared-urls.html';
export default ['$scope','apiToken',
    function ($scope, apiToken) {
        $scope.tokenReader = function () { return apiToken.get() }
        $scope.shareVueComponent = {
            components: { sharedLinks }
        }
}];