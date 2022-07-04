import searchUserDialogT from '~/app-text/views/register/national-user/search-user-dialog.json';
    export { default as template } from './search-user-dialog.html';
export default ['$scope', '$http', 'government', '$q', 'translationService',
    function ($scope, $http, government, $q, translationService) {
        translationService.set('searchUserDialogT', searchUserDialogT);
        var _ctrl = this;

        var pendingRequest = null;

        _ctrl.search = function() {

            if(pendingRequest) {
                pendingRequest.resolve();
                pendingRequest = null;
            }

            delete _ctrl.error;

            if($scope.form.$invalid || !_ctrl.email)
                return;

            _ctrl.loading = true;

            var email = _ctrl.email.toLowerCase();

            pendingRequest = $q.defer();

            $http.get('/api/v2013/users/national', { params : { q : { email : email } }, timeout:  pendingRequest.promise }).then(function(res) {
                _ctrl.user = res.data[0] || {
                    government : government,
                    email : email,
                    roles : [],
                    new:true
                };

            }).catch(function(err){

                if(err && err.status==-1)
                    return; // request canceled

                _ctrl.error = err.data || err;
                _ctrl.error.url = ((err||{}).config||{}).url;

            }).finally(function(){

                delete _ctrl.loading;

            });
        };

        _ctrl.save = function() {

            delete _ctrl.user.new;

            $scope.closeThisDialog(_ctrl.user);
        };
	}];

