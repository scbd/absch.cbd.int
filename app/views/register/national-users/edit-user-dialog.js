

    export { default as template } from './edit-user-dialog.html';
export default ['$scope', 'user', function ($scope, user) {

        var _ctrl = this;

        _ctrl.user = user;

        _ctrl.save = function() {
            $scope.closeThisDialog(_ctrl.user);
        };
	}];

