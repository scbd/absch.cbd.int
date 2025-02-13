import '~/views/register/directives/register-top-menu';
import adminTags from '~/components/common/admin-tags.vue';
export { default as template } from './admin-tags.html';
export default ['$scope',
    function ($scope) {
    $scope.tagsVueComponent = {
        components: { adminTags }
    }
}];
