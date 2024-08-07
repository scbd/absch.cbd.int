import '~/components/scbd-branding/main';
import { defineComponent, reactive } from 'vue';

export { default as template } from './vue-view-wrapper.html';

export default ['$scope', '$route', 'component', function ($scope, $route, component) {
  component = defineComponent(component.default || component);

  const locals = { ...$route.current.locals };

  delete locals.component;
  delete locals.$template; 
  delete locals.$scope;

  $scope.vueProps    = reactive({ ...locals });
  $scope.vueOptions  = {
    components: { viewComponent: component }
  };
}];
