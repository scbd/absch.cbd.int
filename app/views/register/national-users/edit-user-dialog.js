
import editUserDialogT from '~/app-text/views/register/national-user/edit-user-dialog.json';
    export { default as template } from './edit-user-dialog.html';
export default ['$scope', 'user', 'translationService', function ($scope, user, translationService) {
    translationService.set('editUserDialogT', editUserDialogT);
        var _ctrl = this;

        _ctrl.user = user;

        _ctrl.save = function() {
            $scope.closeThisDialog(_ctrl.user);
        };
	}];

