import 'angular-vue'
import VueI18n from 'vue-i18n'
import 'components/scbd-branding/main';

export { default as template } from './vue-view-wrapper.html';

export default ['$scope', 'apiToken', '$route', 'component','realm', 'locale', function ($scope, apiToken, $route, component, realm, locale) {

  component = component.default || component;
  $scope.locale = locale;
  $scope.isBch = realm.is('BCH');
  $scope.tokenReader = function(){ return apiToken.get()}
  $scope.route       = { params : $route.current.params }
  $scope.vueOptions  = {
    components: { component },
    i18n: new VueI18n({ locale: 'en', fallbackLocale: 'en', messages: { en: {} } })
  };
}];
