define([], function() {

    return ['$scope', '$http', 'government', '$q', function ($scope, $http, government, $q) {

        var _ctrl = this;

        var pendingRequest = null;

        _ctrl.search = function() {

            if(pendingRequest) {
                pendingRequest.resolve();
                pendingRequest = null;
            }

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

            }).finally(function(){

                delete _ctrl.loading;

            });
        };

        _ctrl.save = function() {

            delete _ctrl.user.new;

            $scope.closeThisDialog(_ctrl.user);
        };
	}];
});
