import app from '~/app';
import '~/views/register/directives/register-top-menu';
import '~/views/register/user-preferences/user-alerts';
import '~/views/search/search-directive';
import './user-setting';
import preferencesT from '~/app-text/views/register/user-preferences/preferences.json';

export { default as template } from './preferences.html';
export default ['$scope','translationService',
    function ($scope, translationService) {
        translationService.set('preferencesT', preferencesT);  
        $scope.tab = 'setting'
    }];


